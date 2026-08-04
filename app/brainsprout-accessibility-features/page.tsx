import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CaseStudyBanner from "@/components/CaseStudyBanner";
import ProgressBar from "@/components/ProgressBar";

export const metadata: Metadata = {
  title: "BrainSprout - Online learning accessibility",
  description:
    "Case study of designing accessibility in online learning to lower barriers for marginalized communities",
};

export default function BrainSproutAccessibility() {
  return (
    <div className="project">
      <ProgressBar />
      <CaseStudyBanner
        color="purple"
        imageSrc="/images/reading-lesson---text-large.png"
        imageAlt="Screen of website with reading content and illustration of a cute girl"
        width={3040}
        height={1980}
        imageClassName="image-122"
        sizes="(max-width: 3040px) 100vw, 3040px"
      />

      <div className="project-section-hero">
        <div className="container-1232">
          <div className="project-header-text">
            <div className="content-title">
              <div className="container-title">
                <h1 className="hero-title-text case-study-hero-title long-name">
                  BrainSprout - accessibility
                </h1>
              </div>
              <p className="tagline-text">
                Lowering barriers for marginalized communities and
                neurodivergent learners with inclusive features
              </p>
            </div>
          </div>
        </div>
        <div className="container-1232">
          <div className="horizontal-container">
            <div className="grid-left-top-content">
              <div>
                <p>
                  BrainSprout is a comprehensive learning web app designed to
                  create an engaging and inclusive learning experience for
                  career professionals.
                </p>
                <p>
                  This project focuses on addressing accessibility in online
                  learning to lower barriers for marginalized communities.
                </p>
                <p>
                  This is the second part of a larger project. See part 1{" "}
                  <Link href="/brainsprout">here</Link>.
                </p>
              </div>
              <div className="column-role">
                <div className="project-role-details">
                  <div className="project-role">
                    <div className="eyebrow green">My role</div>
                    <p>UX/UI Research &amp; Design</p>
                  </div>
                  <div className="project-role">
                    <div className="eyebrow green">Tools</div>
                    <p>Figma, FigJam, Miro, Lookback, ChatGPT</p>
                  </div>
                </div>
                <div className="body-text-container">
                  <p className="container-quote">Mento Design Academy project</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section _w-radius light-purple">
        <div className="subsection-intro intro">
          <div className="container-1224">
            <div className="container-680">
              <div className="container-title-and-list">
                <div className="eyebrow-and-headline-container">
                  <h2 className="eyebrow">Problem</h2>
                  <div className="heading-container">
                    <h3 className="h3-thinn">
                      Online learning falls short of its potential to
                      positively impact millions, especially those lacking
                      access to traditional education
                    </h3>
                  </div>
                </div>
                <p className="container-quote">
                  Current solutions don&rsquo;t fully address accessibility
                  issues, deepening the digital and learning divide between
                  marginalized groups and those with fewer barriers.
                </p>
              </div>
              <div className="container-title-and-list">
                <div className="eyebrow-and-headline-container">
                  <h2 className="eyebrow">Solution</h2>
                  <div className="heading-container h4-container">
                    <h3 className="h3-thinn">
                      Reduce barriers in online learning for marginalized
                      communities
                    </h3>
                  </div>
                </div>
                <p className="container-quote">
                  BrainSprout prioritizes accessibility features, enabling
                  students achieve their learning goals and fully benefit
                  from online education
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="section1" className="section-first">
        <div className="project-subsection">
          <div className="container-680">
            <div className="container-title-and-list">
              <div className="section-heading-wrapper">
                <h2 className="eyebrow">Research</h2>
              </div>
              <div className="section-heading-wrapper">
                <h2>
                  Online learning has the potential to democratize education,
                  bridging the global skills gap
                </h2>
              </div>
            </div>
            <div className="content-container">
              <div className="body-text-container">
                <p className="container-quote">
                  In my American Dilemmas college course, we studied societal
                  issues such as education. It was clear that education can
                  significantly lower barriers for people, close income gaps,
                  and help build a better society.
                </p>
              </div>
              <div className="body-text-container">
                <p>
                  <strong>
                    Non-inclusive digital design deepens the digital divide
                    for disabled individuals
                  </strong>
                </p>
                <p className="container-quote">
                  In the U.S., 1 in 7 individuals have some form of learning
                  disability - 10 million people in just one country. This
                  indicates a large, untouched market that could benefit from
                  online learning.
                </p>
                <p>
                  <strong>
                    Limited technology resources disproportionately affect
                    children from low-income families
                  </strong>
                </p>
              </div>
            </div>
          </div>
          <div className="container-680">
            <div className="content-container">
              <div className="heading-container h4-container">
                <h3>Widening inequality in education extends into adulthood</h3>
              </div>
              <div className="image-wrapper-small">
                <Image
                  src="/images/NYT-image.png"
                  alt="Image from The New York Times showing school children standing on different platform levels to depict educational inequality"
                  width={708}
                  height={385}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="image-caption-wrapper">
                  Image source:{" "}
                  <a
                    href="https://www.nytimes.com/2016/08/28/opinion/sunday/the-good-news-about-educational-inequality.html"
                    className="link image-caption"
                  >
                    NYT
                  </a>
                </div>
              </div>
              <div className="body-text-container">
                <p className="container-quote">
                  Research highlights increasing gaps in education inequality
                  in K-12 students, a widening disparity that&rsquo;s
                  reflected in the participation of adult learning between
                  low and high-skilled adults. Disadvantaged students are
                  also more likely to lack reliable internet and digital
                  skills, continuously leaving them further behind.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="project-subsection">
          <div className="container-1232">
            <div className="grid-with-heading">
              <div className="container-680">
                <div className="heading-container">
                  <h3>Three features to improve accessibility</h3>
                </div>
              </div>
              <div className="w-layout-grid _3-x-1-text-grid">
                <div className="grid-block no-border">
                  <div className="container-title-and-list">
                    <div className="centered-heading">
                      <p>
                        <strong>Offline access</strong>
                      </p>
                    </div>
                    <div className="grid-item-bottom">
                      <ul role="list" className="list-mobile">
                        <li>
                          Students should be able to download materials to
                          access and study offline later
                        </li>
                        <li>
                          Increases access for students in areas with
                          unreliable or no internet, lowering geographic and
                          economic barriers
                        </li>
                        <li>
                          Allows continuous learning so students can study in
                          environments where internet access isn&rsquo;t
                          available, such as subways or remote work sites
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="grid-block no-border">
                  <div className="container-title-and-list">
                    <div className="centered-heading">
                      <p>
                        <strong>Video transcripts</strong>
                      </p>
                    </div>
                    <div className="grid-item-bottom">
                      <ul role="list" className="list-mobile">
                        <li>
                          Can help hearing-impaired students and non-native
                          speakers understand course material more
                          effectively
                        </li>
                        <li>Reading option improves retention and comprehension</li>
                        <li>Allows students to skim content more quickly</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="grid-block no-border">
                  <div className="container-title-and-list">
                    <div className="centered-heading">
                      <p>
                        <strong>Multiformat lessons</strong>
                      </p>
                    </div>
                    <div className="grid-item-bottom">
                      <ul role="list" className="list-mobile">
                        <li>
                          Offer material in various formats, such as videos,
                          podcasts, readings, and interactive modules
                        </li>
                        <li>
                          Helps cater to different learning styles and
                          preferences and enhances accessibility
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="project-subsection top-spacing">
          <div className="container-680">
            <div className="content-container">
              <div className="heading-container h4-container">
                <h3>
                  Competitors often overlook the needs of marginalized
                  communities
                </h3>
              </div>
              <div className="body-text-container">
                <p>
                  I analyzed competitors&rsquo; features, to see whether they
                  included key accessibility features I identified during my
                  research. My analysis revealed mixed results. Features vary
                  widely across devices and applications, even within a
                  single company.
                </p>
              </div>
            </div>
            <div className="content-container">
              <div className="container-title-and-list">
                <h4>Feature: Offline access</h4>
                <p>Only Coursera allows for downloading content on web for offline access</p>
              </div>
              <div className="image-wrapper-small">
                <Image
                  src="/images/01-Competitor-analysis---offline-content.png"
                  alt="Competitive analysis table"
                  width={322}
                  height={289}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
          <div className="container-680">
            <div className="content-container">
              <div className="container-title-and-list">
                <h4>Feature: Video transcript</h4>
                <p>Only Coursera has transcripts on mobile devices</p>
              </div>
              <div className="image-wrapper-small">
                <Image
                  src="/images/02-Competitor-analysis---video-transcripts.png"
                  alt="Competitive analysis table of video transcripts"
                  width={322}
                  height={289}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
            <div className="content-container">
              <div className="body-text-container">
                <p>
                  Only Coursera allows downloading of transcripts, and only
                  on web
                </p>
              </div>
              <div className="image-wrapper-small">
                <Image
                  src="/images/03-Competitor-analysis---offline-transcript.png"
                  alt="Competitive analysis table"
                  width={354}
                  height={321}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
          <div className="container-680">
            <div className="content-container">
              <div className="section-heading-wrapper">
                <h4>Feature: Multi-format content</h4>
              </div>
              <div className="body-text-container">
                <p>Only half the examined competitors have multiple lesson formats</p>
                <div className="image-wrapper-small">
                  <Image
                    src="/images/03-Competitor-analysis---offline-transcript.png"
                    alt="Competitive analysis table"
                    width={354}
                    height={321}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
            </div>
            <div className="content-container">
              <div className="body-text-container">
                <p>
                  No competitor has an audio only option for videos on web,
                  Coursera only allows for an audio only option when
                  connected to the internet.
                </p>
              </div>
              <div className="image-wrapper-small">
                <Image
                  src="/images/05-Competitor-analysis---audio-only-for-video.png"
                  alt="Competitive analysis table"
                  width={354}
                  height={321}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
            <div className="body-text-container">
              <p>
                I found competitors&rsquo; features lack consistency in
                accessibility and offline content availability. Moreover,
                they don&rsquo;t include alternative formats for reading
                content, further restricting accessibility for some
                Learners.
              </p>
            </div>
          </div>
        </div>

        <div className="project-subsection">
          <div className="container-1232">
            <div className="container-680">
              <div className="heading-and-body-container">
                <h3>
                  Users share format preferences, accessibility struggles and
                  helpful tools
                </h3>
                <div className="body-text-container">
                  <p className="container-quote">
                    To get firsthand insight into people&rsquo;s experiences
                    with online learning, I reached out to various social
                    media groups, chat groups, and my personal network,
                    recruiting people to share their experiences with me.
                  </p>
                  <p className="container-quote">
                    I interviewed 9 participants for 30 minutes
                  </p>
                </div>
              </div>
            </div>
            <div className="grid-with-heading">
              <div className="heading-container">
                <h4>
                  Chatting with users showed the importance of multiformat
                  online courses.
                </h4>
              </div>
              <div className="w-layout-grid grid-quad-item">
                <div className="media-card">
                  <div className="grid-item-quote">
                    <p>
                      <em>&ldquo;I prefer audio, because I look at the computer all day&rdquo;</em>
                    </p>
                  </div>
                  <p className="quoter">Participant 1</p>
                </div>
                <div className="media-card">
                  <div className="grid-item-quote">
                    <p>
                      <em>
                        &ldquo;I like to have it in written down because then
                        I can refer back to it more easily&rdquo;
                      </em>
                    </p>
                  </div>
                  <p className="quoter">Participant 2</p>
                </div>
                <div className="media-card">
                  <div className="grid-item-quote">
                    <p className="centered-text">
                      <em>&ldquo;I need visuals&rdquo;</em>
                    </p>
                  </div>
                  <p className="quoter">Participant 3</p>
                </div>
                <div className="media-card">
                  <div className="grid-item-quote">
                    <p>
                      <em>
                        &ldquo;I like videos most because it&rsquo;s easier
                        to follow and less boring&rdquo;
                      </em>
                    </p>
                  </div>
                  <p className="quoter">Participant 4</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container-800">
            <div className="grid-with-heading">
              <div className="heading-container h4-container">
                <h4>
                  Users shared tools like text-to-speech helped people with
                  ADHD and dyslexia stay focused
                </h4>
              </div>
              <div className="w-layout-grid double-item-grid quotes">
                <div className="media-card">
                  <div className="grid-item-quote">
                    <p>
                      <em>&ldquo;I use Speechify to help me focus on long readings&rdquo;</em>
                    </p>
                  </div>
                  <p className="quoter">Participant 5, has ADHD</p>
                </div>
                <div className="media-card">
                  <div className="grid-item-quote">
                    <p>
                      <em>
                        &ldquo;You can remember things better if you can read
                        and listen to it at the same time&rdquo;
                      </em>
                    </p>
                  </div>
                  <p className="quoter">
                    Participant 6, has family member with dyslexia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="section3" className="section">
        <div className="project-subsection">
          <div className="container-680">
            <div className="content-container">
              <div className="container-title-and-list">
                <div className="section-heading-wrapper">
                  <h2 className="eyebrow">Design</h2>
                </div>
                <div className="heading-container">
                  <h2>Research helped uncover key accessibility features</h2>
                </div>
              </div>
              <div className="heading-container h4-container">
                <h3>
                  <a href="https://www.weforum.org/videos/bionic-reading-could-help-you-become-a-faster-and-more-effective-reader/">
                    Bionic text
                  </a>{" "}
                  a strategy I discovered in an #adhd channel of one of my
                  Slack groups
                </h3>
              </div>
              <div className="lightbox-wrapper">
                <Image
                  src="/images/Course-Module-Page---bionic-reading.png"
                  alt="A website wireframe with a page titled Discovery Phase."
                  width={1520}
                  height={990}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
          <div className="container-680">
            <div className="content-container">
              <div className="heading-container h4-container">
                <h3>Option to download content for offline access</h3>
              </div>
              <div className="screenshot-wrapper">
                <Image
                  src="/images/Course-Module-Page---Downloads-Tab.png"
                  alt="A website wireframe with a course on design."
                  width={1520}
                  height={990}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
          <div className="container-680">
            <div className="content-container">
              <div className="heading-container h4-container">
                <h3>
                  Transcripts and audio only for videos, both also
                  downloadable for offline access
                </h3>
              </div>
              <div className="screenshot-wrapper">
                <Image
                  src="/images/video---open-transcript.png"
                  alt="A website page with a black background and white text."
                  width={1520}
                  height={990}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-subsection">
        <div className="container-680">
          <div className="content-container">
            <div className="container-title-and-list">
              <div className="section-heading-wrapper">
                <h2 className="eyebrow">ITERATIONS</h2>
                <h2>
                  Observations and testing inspired me to include 2
                  additional features
                </h2>
              </div>
            </div>
            <div className="heading-container h4-container">
              <h4>Font-size options</h4>
            </div>
            <div className="lightbox-wrapper">
              <Image
                src="/images/reading---all-expanded.png"
                alt="A website wireframe with a course on design."
                width={1520}
                height={990}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
        <div className="container-680">
          <div className="content-container">
            <div className="heading-container h4-container">
              <h4>Text-to-speech audio player for reading lessons</h4>
            </div>
            <div className="lightbox-wrapper">
              <Image
                src="/images/MacBook-Pro-14_---26.png"
                alt="A website wireframe with a course on design."
                width={1520}
                height={990}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div id="section4" className="section">
        <div className="subsection-last">
          <div className="container-1232 full">
            <div className="container-680">
              <div className="body-text-container">
                <div className="container-quote">
                  Overall feedback was that users appreciated the
                  comprehensive features, and were excited to learn about new
                  ones like Bionic text.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="project-subsection">
          <div className="container-680">
            <div className="container-title-and-list">
              <div className="section-heading-wrapper">
                <h2 className="eyebrow">Final designs</h2>
                <h2>Putting it all together in high fidelity</h2>
              </div>
            </div>
            <div className="content-container">
              <div className="heading-container h4-container">
                <h4>Bionic text options to help neurodivergent Learners focus on text</h4>
              </div>
              <div className="lightbox-wrapper">
                <div className="grid-image-wrapper screenshots video-wrapper">
                  <div
                    style={{ paddingTop: "56.17021276595745%" }}
                    className="w-embed-youtubevideo full-video"
                  >
                    <iframe
                      src="https://www.youtube.com/embed/99QcEGCvoDI?rel=0&controls=1&autoplay=0&mute=0&start=0"
                      frameBorder={0}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "auto",
                      }}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title="BrainSprout bionic text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-680">
            <div className="content-container">
              <div className="heading-container h4-container">
                <h4>Adjustable text size to help those with visual impairments</h4>
              </div>
              <div className="lightbox-wrapper">
                <div className="grid-image-wrapper screenshots video-wrapper">
                  <div
                    style={{ paddingTop: "56.17021276595745%" }}
                    className="w-embed-youtubevideo full-video"
                  >
                    <iframe
                      src="https://www.youtube.com/embed/TE_njeA3Ce8?rel=0&controls=1&autoplay=0&mute=0&start=0"
                      frameBorder={0}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "auto",
                      }}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title="BrainSprout large text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-680">
            <div className="content-container">
              <div className="heading-container h4-container">
                <h4>Audio option for enhanced accessibility and flexibility</h4>
              </div>
              <div className="lightbox-wrapper">
                <div className="grid-image-wrapper screenshots video-wrapper">
                  <div
                    style={{ paddingTop: "56.17021276595745%" }}
                    className="w-embed-youtubevideo full-video"
                  >
                    <iframe
                      src="https://www.youtube.com/embed/7GX2uat3ZaM?rel=0&controls=1&autoplay=0&mute=0&start=0"
                      frameBorder={0}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "auto",
                      }}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title="BrainSprout audio option"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-680">
            <div className="content-container">
              <div className="container-680">
                <div className="container-title-and-list">
                  <h4>Options for video lessons</h4>
                  <div className="body-text-container">
                    <p>Features:</p>
                    <ul role="list">
                      <li>View transcript</li>
                      <li>Download in multiple formats</li>
                      <li>Play audio only</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="lightbox-wrapper">
                <Image
                  src="/images/final---video-lesson-options.png"
                  alt="Screen depicting a video still with 2 cartoon robot characters are holding a box with a heart on it"
                  width={2268}
                  height={1536}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
          <div className="container-680">
            <div className="content-container">
              <div className="container-680">
                <div className="container-title-and-list">
                  <div className="section-heading-wrapper">
                    <h4>Downloads available for multiple formats</h4>
                  </div>
                  <div className="body-text-container">
                    <ul role="list">
                      <li>
                        Transcripts are available in .docx format which can
                        be opened with various apps and is screen reader
                        friendly
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="lightbox-wrapper">
                <Image
                  src="/images/final---multiple-format-downloads-available.png"
                  alt="Screen depicting a video still with 2 cartoon robot characters are holding a box with a heart on it"
                  width={3024}
                  height={2048}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="section5" className="section">
        <div className="project-subsection subsection-text-only">
          <div className="container-680">
            <div className="content-container">
              <div className="section-heading-wrapper">
                <h2 className="eyebrow">Takeaways</h2>
                <h2>Final thoughts and future visions</h2>
              </div>
              <div className="body-text-container">
                <div className="heading-container">
                  <h4>Key learnings</h4>
                </div>
                <ul role="list">
                  <li>
                    Although the initial recruitment for the project did not
                    specifically focus on differently-abled and
                    neurodivergent learners, several participants mentioned
                    or required accessibility features. This underscores the
                    prevalence of accessibility needs and importance of
                    gaining a comprehensive understanding of all
                    learners&rsquo; unique needs within the online learning
                    landscape.
                  </li>
                </ul>
              </div>
            </div>
            <div className="content-container">
              <div className="heading-container">
                <h4>Caveats</h4>
              </div>
              <div className="body-text-container">
                <ul role="list">
                  <li>
                    Online recruitment of interview participants meant the
                    participants were less likely to struggle with digital
                    skills and reliable internet access, so I had to base
                    some of my decisions solely on secondary research
                  </li>
                  <li>
                    I didn&rsquo;t have any users wanting to use mobile for
                    online learning, except for one person towards the end of
                    my design process, limiting insights into preferences and
                    behaviors of mobile learners.
                  </li>
                </ul>
              </div>
            </div>
            <div className="content-container">
              <div className="body-text-container">
                <div className="heading-container">
                  <h4>Impact and future opportunities</h4>
                </div>
                <ul role="list">
                  <li>
                    With 10 million people in just the U.S who have a
                    learning disability, and millions more with limited
                    access to traditional forms of education, there is a
                    large, untouched market that can benefit from an online
                    platform that prioritizes accessibility and inclusivity.
                    <ul role="list">
                      <li>
                        Actively engaging with people from diverse
                        socioeconomic communities can provide opportunities
                        to both help close the educational and skills gap
                      </li>
                      <li>
                        I would like to do further research with people who
                        do use mobile apps for online learning - there are
                        millions of users according to Apple&rsquo;s App
                        Store
                      </li>
                      <li>
                        I would also like to do more targeted research and
                        interview more neurodivergent people to learn more
                        about their learning needs, regardless of whether
                        they participate in online learning
                      </li>
                      <li>Add and test engaging congratulations messages and stuff</li>
                      <li>Other languages</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
