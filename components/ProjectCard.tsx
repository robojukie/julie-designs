import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  href: string;
  disabled?: boolean;
  thumbnailSrc: string;
  thumbnailAlt: string;
  /* Unique per card (novinopath-thumbnail, vac-thumbnail, etc.). Rendered as
     the img's id since each thumbnail appears once per page — matches how CSS
     scopes per-card overrides. */
  thumbnailId: string;
  width: number;
  height: number;
  /* Mirrors the `sizes` attribute on the corresponding <img> in the export.
     Without it next/image can pick a variant narrower than the 384px wrapper,
     and since the thumbnails are `width:auto` + `max-width:100%` (which clamps
     down but never scales up) the image then renders too small for its card. */
  sizes: string;
  eagerLoad?: boolean;
  badge?: string;
  /* Home wraps the card text in `.thumbnail-title`; the archive page (an
     earlier revision of the same grid) uses `.content-title`. Both classes
     exist in the export's CSS with different padding, so the class is a prop
     rather than something to normalise away. */
  detailsClassName?: string;
  eyebrow: string;
  title: string;
  description: string;
};

// The hover scale (1 -> 1.05) from the "Scale/Reset X on hover" IX2 action
// lists lives in CSS (styles/home.css) rather than here. Two reasons: the img
// must stay a *direct* flex child of .home-card-image-wrapper — an extra wrapper
// element un-blockifies it and leaves an inline-baseline gap under the image —
// and a CSS transition can't freeze the way a rAF-driven one can.
export default function ProjectCard({
  href,
  disabled,
  thumbnailSrc,
  thumbnailAlt,
  thumbnailId,
  width,
  height,
  sizes,
  eagerLoad,
  badge,
  detailsClassName = "thumbnail-title",
  eyebrow,
  title,
  description,
}: ProjectCardProps) {
  const thumbnail = (
    <div className="home-thumbnail">
      <div className="home-card-image-wrapper">
        <Image
          src={thumbnailSrc}
          alt={thumbnailAlt}
          width={width}
          height={height}
          sizes={sizes}
          loading={eagerLoad ? "eager" : "lazy"}
          id={thumbnailId}
          /* The export sizes these from the image's intrinsic width (`width:auto`
             + `max-width:100%`), which always lands on the wrapper width since
             every source is wider than the 384px card. That doesn't survive
             next/image: it emits w-descriptors larger than the source file and
             never upscales, so the browser applies density correction and
             reports a *fraction* of the real intrinsic width (a 512px source
             tagged 1080w reports ~242px), leaving the image too small for its
             card. Sizing from the container reproduces the export's result
             without depending on intrinsic width at all. */
          style={{ width: "100%", height: "auto" }}
        />
        {badge && (
          <div className="badge">
            <p className="badge-text">{badge}</p>
          </div>
        )}
      </div>
    </div>
  );

  const details = (
    <div className="home-project-details">
      <div className={detailsClassName}>
        <div className="container-title">
          <h2 className="eyebrow-thumbnail">{eyebrow}</h2>
          <h3 className="headline-h3">{title}</h3>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );

  if (disabled) {
    return (
      <a href={href} className="container-project-link w-inline-block">
        <div className="container-project-list-item">
          {thumbnail}
          {details}
        </div>
      </a>
    );
  }

  return (
    <Link href={href} className="container-project-link w-inline-block">
      <div className="container-project-list-item">
        {thumbnail}
        {details}
      </div>
    </Link>
  );
}
