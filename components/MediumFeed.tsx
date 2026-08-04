"use client";

import { useEffect, useState } from "react";

/* Port of the inline <script> in the export's writing.html.

   The export's writing.html contains no post content — the markup ships a
   single empty <a class="article-card"> template and this script replaces the
   container's innerHTML at runtime from the Medium RSS feed. So there is no
   static list to migrate; the fetch IS the page's content source. Keeping it
   client-side (rather than snapshotting the posts into the repo, or moving the
   fetch server-side) means new Medium posts appear without a redeploy, which
   is how the live site behaves today. */

// Medium's RSS has no CORS headers, so the export proxies it through rss2json.
// Same endpoint and feed URL as the export.
const FEED_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/designing-with-julie";

// The export renders 8 at a time and listens for clicks on `#load-more` to
// reveal the next batch — but no element with that id exists anywhere in the
// export, so the handler is dead code and the page only ever shows the first
// 8. Kept at 8 to match; the feed currently returns fewer than that, so every
// post shows either way.
const ARTICLES_PER_LOAD = 8;

// The export only trusts images from Medium's own CDN and falls back to a
// default asset otherwise. Ported as-is; the fallback image is served locally
// here instead of from Webflow's CDN.
const ALLOWED_IMAGE_DOMAINS = ["cdn-images-1.medium.com"];
const DEFAULT_IMAGE_URL = "/images/default-image.png";

type FeedItem = {
  title: string;
  link: string;
  pubDate: string;
  content: string;
};

type Article = {
  title: string;
  link: string;
  date: string;
  imageUrl: string;
};

function isAllowedImageUrl(url: string) {
  try {
    return ALLOWED_IMAGE_DOMAINS.includes(new URL(url).hostname);
  } catch {
    return false;
  }
}

/* The feed gives each post's body as an HTML string; the card image is just
   its first <img>. The export parses that with DOMParser, which is also the
   safe way to do it here — it builds an inert document that never executes
   scripts or loads subresources, and we only ever read an attribute off it.
   Nothing from the feed is injected as HTML. */
function extractImageUrl(content: string) {
  const doc = new DOMParser().parseFromString(content, "text/html");
  const src = doc.querySelector("img")?.getAttribute("src");
  return src && isAllowedImageUrl(src) ? src : DEFAULT_IMAGE_URL;
}

export default function MediumFeed() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetch(FEED_URL)
      .then((res) => res.json())
      .then((data: { items?: FeedItem[] }) => {
        if (cancelled) return;
        setArticles(
          (data.items ?? []).slice(0, ARTICLES_PER_LOAD).map((item) => ({
            title: item.title,
            link: item.link,
            date: new Date(item.pubDate).toLocaleDateString(),
            imageUrl: extractImageUrl(item.content),
          }))
        );
      })
      .catch((error) =>
        console.error("Error fetching Medium articles:", error)
      );

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div id="medium-articles-container" className="w-layout-grid blog-cards-grid">
      {articles.map((article) => (
        <a
          key={article.link}
          href={article.link}
          target="_blank"
          rel="noreferrer"
          className="article-card w-inline-block"
        >
          <div className="article-card-media">
            {/* Plain <img>, not next/image: these are third-party URLs known
                only at runtime, so they'd need a remotePatterns entry in
                next.config and would be proxied through the optimizer on every
                request for no benefit — Medium already serves them resized.
                The export uses a plain <img> here too. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.imageUrl}
              loading="lazy"
              alt=""
              className="article-image"
            />
          </div>
          <div className="article-card-body">
            <div className="article-card-text">
              <div className="article-title-wrapper">
                <p className="article-date">{article.date}</p>
                <h3 className="article-title">{article.title}</h3>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
