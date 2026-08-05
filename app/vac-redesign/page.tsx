/* Every screenshot on this page opens the zoom — the component renders the
   same <img> next/image did, plus the attributes that make it operable.
   See components/ZoomableImage.tsx. The hero banner is the one exception:
   it's a transparent-PNG mockup, and the zoom's frame paints a near-white
   backing that would show through the empty regions around the laptop and
   phone. It's opted out via zoomable={false} on CaseStudyBanner below. */
import ZoomableImage from "@/components/ZoomableImage";
import type { Metadata } from "next";
import CaseStudyBanner from "@/components/CaseStudyBanner";
import ProgressBar from "@/components/ProgressBar";

export const metadata: Metadata = {
  title: "Vineyard App Camp",
};

export default function VACRedesign() {
  return (
    <div className="project">
      <ProgressBar />
      <CaseStudyBanner
        color="orange"
        imageSrc="/images/VAC-Hero-w-mobile.png"
        imageAlt=""
        width={1322}
        height={818}
        imageClassName="image-1257"
        sizes="(max-width: 1322px) 100vw, 1322px"
        lightboxWrapper
        zoomable={false}
      />

      <div className="project-section-hero">
        <div className="container-1232">
          <div className="project-header-text">
            <div className="content-title">
              <div className="container-title">
                <h1 className="hero-title-text case-study-hero-title">
                  Vineyard App Camp
                </h1>
              </div>
              <p className="tagline-text">
                How can we improve employee productivity?
              </p>
            </div>
          </div>
        </div>
        <div className="container-1232">
          <div className="container-stacking">
            <div className="grid-left-top-content">
              <div>
                <p>
                  Vineyard App Camp (VAC) partners with 400+ schools to teach
                  1000+ specialized classes by hiring non-traditional teachers.
                </p>
                <p>
                  Directors (VAC employees) use a SaaS platform with 8000+
                  teachers in the system to manage all logistics
                </p>
                <p>
                  This is a responsive web application, therefore the bulk of
                  this case study will focus on web with some adjacent
                  examples of the mobile experience.
                </p>
              </div>
              <div className="column-role">
                <div className="project-role-details">
                  <div className="project-role">
                    <h2 className="eyebrow">My role</h2>
                    <div className="body-text-container">
                      <p>Sole designer, UX research &amp; design</p>
                    </div>
                  </div>
                  <div className="project-role">
                    <h2 className="eyebrow">Tools</h2>
                    <div className="text">
                      <p>Figma, FigJam, Miro, Whimsical, ChatGPT</p>
                    </div>
                  </div>
                  <div className="project-role">
                    <div className="eyebrow">TEAM</div>
                    <div className="text">
                      <p>
                        1 product designer (me)
                        <br />
                        1 Non-technical co-founder
                        <br />
                        1 Engineering co-founder
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="drawing-frame">
              <div className="card-media">
                <div className="card-image-wrapper vac-intro-drawing-wrapper">
                  <ZoomableImage
                    src="/images/VAC-structure-1.png"
                    alt="Illustration of a person, teacher, and school with arrows pointing from person to school and teacher, and a double arrow between teacher and school"
                    width={680}
                    height={380}
                    sizes="(max-width: 680px) 100vw, 680px"
                    className="vac-illustration"
                    style={{ height: "auto" }}
                  />
                </div>
              </div>
              <div className="image-caption-wrapper">
                <p className="image-caption centered">The organization</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section fixed">
        <div className="container-1232">
          <div className="center-middle-aligner">
            <div className="container-content-center">
              <p className="paragraph-display-thin">
                Employees were growing increasingly frustrated with the
                tooling required for their job. They wasted time looking for
                information, struggled to guess what visual elements
                represented, and <strong>lost out on potential hires</strong>.
                <br />
                <br />
                To address this, I{" "}
                <strong>led a complete transformation of the app</strong>,
                starting by identifying the root problems and overhauling
                workflows and app design.
                <br />
                <br />
                <strong>The result was</strong>{" "}
                <strong>an intuitive experience</strong>, even for new and
                non-tech savvy employees{" "}
                <strong>that allowed them to close more contracts.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="project-narrow-margin-section full-height accent-background">
        <div className="container-1232">
          <div className="horizontal-container">
            <div className="left-bottom-title">
              <p className="callout blue-accent">
                &ldquo;it&apos;s a little clunky, that&apos;s a nice way of
                putting it&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section hug-height">
        <div className="container-1232">
          <div className="top-content">
            <div className="slide-header">
              <h2>Starting point</h2>
            </div>
            <p>Live dashboard before redesign</p>
          </div>
          <div className="horizontal-container">
            <div className="image-wrapper-800">
              <ZoomableImage
                src="/images/old-dashboard-v2.png"
                alt="Screenshot of VAC's original dashboard showing a disorganized hodgepodge of information"
                width={580}
                height={378}
                sizes="(max-width: 991px) 100vw, 800px"
                unoptimized
                className="image-single border"
                style={{ height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="project-section hug-height">
        <div className="container-1232">
          <div className="top-content">
            <div className="slide-header">
              <h2>Redesign after research</h2>
            </div>
          </div>
          <div className="horizontal-container">
            <div className="image-wrapper-800">
              <ZoomableImage
                src="/images/vac-dashboard-03.png"
                alt="A computer screen with a list of names and times for classes and teachers."
                width={1512}
                height={982}
                sizes="(max-width: 1512px) 100vw, 1512px"
                className="image-single border"
                style={{ height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="project-section">
        <div className="container-1232">
          <div className="top-content">
            <div className="slide-header">
              <h2>Impact</h2>
            </div>
          </div>
          <div className="horizontal-middle-container-copy">
            <div className="_2-x-1-grid">
              <div className="card">
                <div className="card-media">
                  <div className="card-data-wrapper">
                    <div className="callout">-20 steps</div>
                  </div>
                </div>
                <div className="card-info text-card">
                  <p>
                    Over 20 steps were cut out of 3 workflows, including
                    consolidating flows for a more seamless experience
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-media">
                  <div className="card-data-wrapper">
                    <div className="callout">39%</div>
                  </div>
                </div>
                <div className="card-info text-card">
                  <p>
                    Percentage of time saved for sub assignment flow based off
                    user interviews and usability testing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-narrow-margin-section-dark">
        <div className="container-1232">
          <div className="horizontal-container">
            <div className="left-bottom-title">
              <h2 className="callout light">
                Understanding Directors&rsquo; tasks and struggles
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section">
        <div className="container-1232">
          <div className="top-content">
            <div className="slide-header">
              <h2>Current struggles</h2>
            </div>
          </div>
          <div className="horizontal-middle-container">
            <div className="_3-x-1-text-grid">
              <div className="card">
                <div className="card-info text-card">
                  <p className="body-title">Wasted time</p>
                  <p className="card-quote">
                    &ldquo;takes a minute to two minutes [to load], which
                    might not seem like a lot of time, but when you&apos;re on
                    a call with another Director{" "}
                    <strong>it can be so cumbersome</strong>&rdquo;
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-info text-card">
                  <p className="body-title">Clients lack trust in VAC</p>
                  <p className="card-quote">
                    &ldquo;feels very ancient and it feels a little bit
                    nonprofessional&rdquo;
                  </p>
                  <p className="card-quote">
                    &rdquo;a lot of what we do is making sure we don&apos;t
                    seem like a scam&rdquo;
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-info text-card">
                  <p className="body-title">Disrupts workflow</p>
                  <p className="card-quote">
                    &ldquo;really challenging to not have to do things twice,
                    you know I really try to optimize my time&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section">
        <div className="container-1232">
          <div className="top-content">
            <div className="slide-header">
              <h2>Screenshots of original app</h2>
            </div>
            <p>
              Employees are constantly dealing with a bug-riddled app that has
              no system feedback when things don&rsquo;t go according to
              plan. In addition, they have to work extra hard to appear
              legitimate when reaching out to schools and potential teachers.
            </p>
          </div>
          <div className="horizontal-middle-container">
            <div className="_3-x-1-card-grid">
              <div className="media-card">
                <div className="card-media">
                  <div className="card-image-wrapper">
                    <ZoomableImage
                      src="/images/old-dashboard--screenshot.png"
                      alt="Screen with list of schools and other information"
                      width={387}
                      height={203}
                      sizes="387px"
                      unoptimized
                      className="screenshot-shadow bordered"
                      style={{ height: "auto" }}
                    />
                  </div>
                </div>
              </div>
              <div className="media-card">
                <div className="card-media">
                  <div className="card-image-wrapper">
                    <ZoomableImage
                      src="/images/Schedule-screenshot.png"
                      alt="Screen with list of schools"
                      width={386}
                      height={204}
                      sizes="386px"
                      unoptimized
                      className="screenshot-shadow bordered"
                      style={{ height: "auto" }}
                    />
                  </div>
                </div>
              </div>
              <div className="media-card">
                <div className="card-media">
                  <div className="card-image-wrapper">
                    <ZoomableImage
                      src="/images/og-calendar-view.png"
                      alt="Screenshot of webpage showing an orange calendar view"
                      width={768}
                      height={402}
                      sizes="(max-width: 479px) 100vw, 386px"
                      unoptimized
                      className="screenshot-shadow bordered"
                      style={{ height: "auto" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section">
        <div className="container-1232">
          <div className="side-text-horizontal-container">
            <div className="left-middle-half-width-container">
              <h2>Potential improvements</h2>
              <p>
                A research-based redesign can help{" "}
                <strong>reduce cognitive load</strong> for employees while{" "}
                <strong>cutting down on task time</strong>
              </p>
            </div>
            <div className="right-middle-half-width-container">
              <div className="list-card">
                <div className="card-info text-card">
                  <p className="list-card-title">Reduce steps to save time</p>
                  <p>
                    Reduce number of steps for each workflows and organize
                    information in a more intuitive manner so users can find
                    information easily
                  </p>
                </div>
              </div>
              <div className="list-card">
                <div className="card-info text-card">
                  <p className="list-card-title">Increase trust in actions</p>
                  <p>
                    Present appropriate feedback immediately when there are
                    system errors and provide suggestions to recover from
                    errors
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section">
        <div className="container-1232">
          <div className="side-text-horizontal-container">
            <div className="left-middle-half-width-container">
              <h2>Goals</h2>
            </div>
            <div className="right-middle-half-width-container">
              <div className="list-card">
                <div className="card-info text-card">
                  <p className="list-card-title">
                    Goal 1: Simplify workflows
                  </p>
                  <p>
                    Directors struggled to efficiently complete tasks due to a
                    convoluted user flows and inconsistent app behavior.
                    Different users used different flows to complete similar
                    tasks, creating confusion in communication and training.
                    <br />
                    My goal was to simplify user flows to speed up training
                    and improve efficiency.
                  </p>
                </div>
              </div>
              <div className="list-card">
                <div className="card-info text-card">
                  <p className="list-card-title">
                    Goal 2: Extract and organize important info
                  </p>
                  <p>
                    Directors struggled with finding important information on
                    the page.
                    <br />
                    My goal was to organize and improve the information
                    architecture related to their main tasks, so that they
                    weren&apos;t wasting time clicking on multiple items
                    before finding what they were looking for.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-narrow-margin-section-dark">
        <div className="container-1232">
          <div className="horizontal-container">
            <div className="left-bottom-title">
              <h2 className="eyebrow light">Goal 1</h2>
              <h2 className="callout light">Simplify workflows</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section">
        <div className="container-1232">
          <div className="side-text-horizontal-container">
            <div className="left-middle-half-width-container">
              <h2>Simplify workflows</h2>
              <p>
                <strong>I identified 3 primary workflows</strong> every
                Director had in common that would make the biggest impact,
                consulting with stakeholders through my decision making.
              </p>
            </div>
            <div className="right-middle-half-width-container">
              <div className="image-4-col-wrapper">
                <div className="card-media">
                  <ZoomableImage
                    src="/images/Employee-task-list-1.png"
                    alt="List of prioritized employee tasks"
                    width={680}
                    height={641}
                    sizes="100vw"
                    className="image-pc"
                    style={{ height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section hug-height blue-accent">
        <div className="container-1232">
          <div className="top-content">
            <div className="eyebrow-header">
              <h2 className="eyebrow">Goal 1: Simplify workflows</h2>
              <h3>Flow 1: Attendance check</h3>
            </div>
          </div>
          <div className="vertical-container">
            <div className="image-wrapper-800">
              <ZoomableImage
                src="/images/og-attendance-flow-blurred.png"
                alt="Screenshot of screenshot flows going from login to a difficult to navigate dashboard to a difficult to view and navigate calendar, with a zoomed in shot of the current teacher attendance section"
                width={1301}
                height={791}
                sizes="100vw"
                className="image-single"
                style={{ height: "auto" }}
              />
              <div className="card-info-centered">
                <p className="caption center">Screenshots of original flow</p>
              </div>
            </div>
            <div className="bottom-text-content">
              <ul role="list">
                <li>
                  Attendance section too small to see content clearly and
                  there&rsquo;s no separator between content
                </li>
                <li>
                  Teacher attendance is found under &ldquo;Afterschool Weekly
                  Calendar
                </li>
                <li>
                  Director can&rsquo;t update confirmation on their end, having
                  to manually track attendance status
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section hug-height blue-accent">
        <div className="container-1232">
          <div className="top-content">
            <div className="slide-header">
              <h3>Attendance check flow update</h3>
            </div>
            <div className="rich-text-block">
              <p>
                My changes allow users to find information and take action
                they expect and need without confusing navigation
              </p>
            </div>
          </div>
          <div className="vertical-container">
            <div className="captioned-image">
              <div className="image-wrapper">
                <ZoomableImage
                  src="/images/Attendance-flow-before.png"
                  alt="Flow chart"
                  width={820}
                  height={219}
                  sizes="100vw"
                  unoptimized
                  className="image-max300h"
                />
              </div>
              <div className="caption-wrapper">
                <p className="caption-title">Before</p>
                <p className="caption">
                  Users have to use a button to navigate to attendance checks
                  that shows no indication attendance checks are part of the
                  page
                </p>
              </div>
            </div>
            <div className="captioned-image">
              <div className="image-wrapper">
                <ZoomableImage
                  src="/images/Attendance-flow-after.png"
                  alt="Flow chart"
                  width={820}
                  height={241}
                  sizes="100vw"
                  unoptimized
                  className="image-max300h"
                />
              </div>
              <div className="caption-wrapper">
                <p className="caption-title">After</p>
                <p className="caption">
                  Directors can now update attendance status directly from the
                  home page
                  <br />
                  Areas to improve user flow:
                  <br />
                  A: Eliminate extra step to view attendance
                  <br />
                  B: Allow Director to track teacher&rsquo;s attendance
                  correctly on platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section fixed blue-accent">
        <div className="container-1232">
          <div className="top-content">
            <div className="slide-header">
              <h3>Redesigned attendance check screen</h3>
            </div>
          </div>
          <div className="horizontal-container">
            <div className="image-wrapper-800">
              <div className="image-800w">
                <ZoomableImage
                  src="/images/vac-dashboard-04.png"
                  alt="A screenshot of a website with a list of classes and teachers and a button to confirm."
                  width={1079}
                  height={701}
                  sizes="100vw"
                  className="border"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section hug-height">
        <div className="container-1232">
          <div className="top-content">
            <div className="eyebrow-header">
              <h2 className="eyebrow">Goal 1: Simplify workflows</h2>
              <h2>Flow 2: Assign substitutes</h2>
            </div>
            <p>Requesting and assigning subs are broken into disjointed flows</p>
          </div>
          <div className="vertical-container">
            <div className="top-content">
              <h3>Simplifying substitute assignment</h3>
              <p>
                I streamlined the 3 flows involved for substitute assignment
                ingo a single flow and reduced the overall process by over 10
                steps.
              </p>
            </div>
            <div className="horizontal-container">
              <div className="_2-x-1-grid">
                <div className="media-card">
                  <div className="card-media">
                    <div className="card-image-wrapper">
                      <ZoomableImage
                        src="/images/Assign-sub-before.png"
                        alt="Steps to assign a sub"
                        width={440}
                        height={746}
                        sizes="440px"
                        unoptimized
                        className="process-image"
                        style={{ height: "auto" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="media-card">
                  <div className="card-media">
                    <div className="card-image-wrapper">
                      <ZoomableImage
                        src="/images/Assign-sub-after.png"
                        alt="Number of steps to assign a sub"
                        width={772}
                        height={416}
                        sizes="100vw"
                        className="process-image"
                        style={{ height: "auto" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section">
        <div className="container-1232">
          <div className="top-content">
            <div className="eyebrow-header">
              <h3>A more readable sub requests page</h3>
            </div>
            <p>Requesting and assigning subs are broken into disjointed flows</p>
          </div>
          <div className="horizontal-container">
            <div className="_2-x-1-grid">
              <div className="captioned-image">
                <div className="image-wrapper">
                  <div className="image-container-left-align">
                    <ZoomableImage
                      src="/images/og-subreq-page-blurred.png"
                      alt="Screenshot of webpage showing a list of teachers"
                      width={600}
                      height={336}
                      sizes="100vw"
                      unoptimized
                      className="image-max300h"
                    />
                  </div>
                </div>
                <div className="caption-wrapper">
                  <p className="caption-title">Before</p>
                  <p className="caption">
                    The original page used text that was too small to read,
                    had inconsistent us of font for links and text, an
                    inefficient layout, and unclear actions.
                  </p>
                </div>
              </div>
              <div className="captioned-image">
                <div className="image-wrapper left-align">
                  {/* The export wraps this image in a Webflow lightbox anchor.
                      The lightbox needs webflow.js, which we don't run, so the
                      anchor gets no href — but it must stay an <a>: the
                      stylesheet's bare `a { max-width: 100%; max-height: 100% }`
                      is what .image-max300h's `height: 100%` resolves against. */}
                  <a className="lightbox-link-5 w-inline-block">
                    <ZoomableImage
                      src="/images/vac-dashboard-06.png"
                      alt="A computer screen displaying sub requests for a teacher."
                      width={1512}
                      height={982}
                      sizes="(max-width: 1512px) 100vw, 1512px"
                      className="image-max300h"
                    />
                  </a>
                </div>
                <div className="caption-wrapper">
                  <p className="caption-title">After</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section hug-height blue-accent">
        <div className="container-1232">
          <div className="top-content">
            <div className="eyebrow-header">
              <h2 className="eyebrow">Goal 1: Simplify workflows</h2>
              <h2>Flow 3: Assign teachers</h2>
            </div>
            <ul role="list">
              <li>Reduced flows by 2-9 steps (depending on decisions)</li>
              <li>Eliminated repetitive steps</li>
            </ul>
          </div>
          <div className="vertical-container">
            <div className="media-card">
              <div className="card-media">
                <ZoomableImage
                  src="/images/Teacher-assignment-flow-before.png"
                  alt="Flow chart"
                  width={2820}
                  height={489}
                  sizes="100vw"
                  className="image-max300h"
                />
              </div>
              <div className="card-info">
                <p className="card-description-title">Before</p>
              </div>
            </div>
            <div className="media-card">
              <div className="card-media">
                <ZoomableImage
                  src="/images/Teacher-assignment-flow-after.png"
                  alt="Flow chart"
                  width={2556}
                  height={447}
                  sizes="100vw"
                  className="image-max300h"
                />
              </div>
              <div className="card-info">
                <p className="card-description-title">After</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section hug-height blue-accent">
        <div className="container-1232">
          <div className="top-content">
            <div className="eyebrow-header">
              <h3>Teacher assignment entry point</h3>
            </div>
          </div>
          <div className="horizontal-container">
            <div className="_2-x-1-grid">
              <div className="captioned-image">
                <div className="image-wrapper">
                  <div className="image-container-left-align">
                    <ZoomableImage
                      src="/images/og-schools-classes-page.png"
                      alt="Screenshot of webpage showing a list of classes"
                      width={613}
                      height={330}
                      sizes="100vw"
                      unoptimized
                      className="image-max300h"
                    />
                  </div>
                </div>
                <div className="caption-wrapper">
                  <p className="caption-title">Before</p>
                  <p className="caption">
                    The original page used text that was too small to read,
                    had inconsistent us of font for links and text, an
                    inefficient layout, and unclear actions.
                  </p>
                </div>
              </div>
              <div className="captioned-image">
                <div className="image-wrapper left-align">
                  {/* Lightbox anchor, as above — load-bearing for height: 100%. */}
                  <a className="w-inline-block">
                    <ZoomableImage
                      src="/images/vac-dashboard-09.png"
                      alt="A computer screen displaying teacher assignment page"
                      width={1512}
                      height={982}
                      sizes="(max-width: 1512px) 100vw, 1512px"
                      className="image-max300h"
                    />
                  </a>
                </div>
                <div className="caption-wrapper">
                  <p className="caption-title">After</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-narrow-margin-section-dark">
        <div className="container-1232">
          <div className="horizontal-container">
            <div className="left-bottom-title">
              <h2 className="eyebrow light">Goal 2</h2>
              <h2 className="callout light">
                Extract and organize important information
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section">
        <div className="container-1232">
          <div className="top-content">
            <div className="eyebrow-header">
              <h2>Home page redesign</h2>
            </div>
          </div>
          <div className="horizontal-container">
            <div className="side-text-horizontal-container">
              <div className="slide-image-side-container">
                <ZoomableImage
                  src="/images/vac-dashboard-01.png"
                  alt="A screenshot of a computer screen showing a list of names and times for classes and teachers."
                  width={1512}
                  height={982}
                  sizes="(max-width: 1512px) 100vw, 1512px"
                  className="hifi-half border"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="slide-text-side-container stacking">
                <div className="list-card">
                  <div className="card-info text-card">
                    <p className="card-description-title">
                      Added overview to home page
                    </p>
                    <p className="card-description">
                      The previous home page had unclear sections and labels
                      leading to primary tasks. The updated home page allows
                      users to see their top tasks right away
                    </p>
                  </div>
                </div>
                <div className="list-card">
                  <div className="card-info text-card">
                    <p className="card-description-title">
                      Added side navigation
                    </p>
                    <p className="card-description">
                      Side navigation creates information hierarchy, making it
                      easier to find information
                    </p>
                  </div>
                </div>
                <div className="list-card">
                  <div className="card-info text-card">
                    <p className="card-description-title">
                      Room for future features
                    </p>
                    <p className="card-description">
                      The new format allows for additional features to be
                      added in an organized and intuitive way
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section">
        <div className="container-1232">
          <div className="top-content">
            <div className="eyebrow-header">
              <h2>Added table view</h2>
            </div>
          </div>
          <div className="horizontal-container">
            <div className="side-text-horizontal-container">
              <div className="slide-image-side-container">
                <ZoomableImage
                  src="/images/vac-table.png"
                  alt="A computer screen displaying a list of teachers"
                  width={912}
                  height={492}
                  sizes="100vw"
                  className="hifi-half border"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="slide-text-side-container stacking">
                <div className="list-card">
                  <div className="card-info text-card">
                    <p className="card-description-title">
                      Highlights important information for quick browsing
                    </p>
                  </div>
                </div>
                <div className="list-card">
                  <div className="card-info text-card">
                    <p className="card-description-title">
                      Filters help users identify primary information
                    </p>
                  </div>
                </div>
                <div className="list-card">
                  <div className="card-info text-card">
                    <p className="card-description-title">
                      Move away from unreadable calendar to table
                    </p>
                    <p className="card-description">
                      A table shows relevant important information for quick
                      browsing and filters help users identify primary
                      information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section hug-height">
        <div className="container-1232">
          <div className="top-content">
            <div className="eyebrow-header">
              <h2>Updated teacher profile view</h2>
            </div>
          </div>
          <div className="horizontal-container">
            <div className="side-text-horizontal-container">
              <div className="slide-image-side-container">
                <ZoomableImage
                  src="/images/vac-dashboard-08.png"
                  alt="A website page with a list of teachers and their contact information."
                  width={1512}
                  height={982}
                  sizes="(max-width: 1512px) 100vw, 1512px"
                  className="hifi-half border"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="slide-text-side-container stacking">
                <div className="list-card">
                  <div className="card-info text-card">
                    <p className="card-description-title">
                      Browsable list eliminates unwanted clicks
                    </p>
                  </div>
                </div>
                <div className="list-card">
                  <div className="card-info text-card">
                    <p className="card-description-title">
                      Details that matter reduces cognitive load
                    </p>
                    <p className="card-description">
                      Information is organized into sections and tabs,
                      allowing users to easily find what they need
                    </p>
                  </div>
                </div>
                <div className="list-card">
                  <div className="card-info text-card">
                    <p className="card-description-title">
                      Two-pane view and tabs reduces cognitive load
                    </p>
                    <p className="card-description">
                      Allows Directors to browse with ease and reduces
                      cognitive load when looking for data
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section dark">
        <div className="container-1232">
          <div className="top-content">
            <div className="eyebrow-header">
              <h2 className="eyebrow light phrase">
                A little more about my process...
              </h2>
              <h2 className="light">Design iterations: home page</h2>
            </div>
          </div>
          <div className="horizontal-container">
            <div className="_2-x-1-grid">
              <div className="media-card">
                <div className="card-media">
                  <div className="card-image-wrapper _2-x-1-image-fixed-height-wrapper">
                    <ZoomableImage
                      src="/images/image-65.png"
                      alt="Screen with grid of options"
                      width={800}
                      height={528}
                      sizes="100vw"
                      className="_2x1-image-fixed-height"
                    />
                  </div>
                </div>
                <div className="card-info">
                  <p className="card-description-title light">
                    Concept testing new dashboard
                  </p>
                  <p className="card-description light">
                    Realized primary information from &ldquo;Today&rdquo; and
                    &ldquo;Sub requests&rdquo; could be further extracted
                  </p>
                </div>
              </div>
              <div className="media-card">
                <div className="card-media">
                  <div className="card-image-wrapper _2-x-1-image-fixed-height-wrapper">
                    <ZoomableImage
                      src="/images/vac-dashboard-01.png"
                      alt="A screenshot of a computer screen showing a list of names and times for classes and teachers."
                      width={1512}
                      height={982}
                      sizes="(max-width: 1512px) 100vw, 1512px"
                      className="_2x1-image-fixed-height"
                    />
                  </div>
                </div>
                <div className="card-info">
                  <p className="card-description-title light">
                    Eliminated extra navigation step
                  </p>
                  <p className="card-description light">
                    First view after logging displays immediately actionable
                    information
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section dark">
        <div className="container-1232">
          <div className="top-content">
            <div className="eyebrow-header">
              <h2 className="light">
                Design iterations: teacher/sub assigning options
              </h2>
            </div>
          </div>
          <div className="horizontal-container">
            <div className="_2-x-1-grid">
              <div className="media-card">
                <div className="card-media">
                  <div className="card-image-wrapper _2-x-1-image-fixed-height-wrapper">
                    <ZoomableImage
                      src="/images/image.png"
                      alt="Screen with list of teachers"
                      width={800}
                      height={558}
                      sizes="100vw"
                      className="_2x1-image-fixed-height"
                    />
                  </div>
                </div>
                <div className="card-info">
                  <p className="card-description-title light">
                    Concept testing teacher assignment flows
                  </p>
                  <p className="card-description light">
                    Will the simplified flows cover everything employees need
                    to accomplish their tasks?
                  </p>
                </div>
              </div>
              <div className="media-card">
                <div className="card-media">
                  <div className="card-image-wrapper _2-x-1-image-fixed-height-wrapper">
                    <ZoomableImage
                      src="/images/suggested-teachers-zoom.png"
                      alt="A computer screen displaying a table with teacher details"
                      width={1670}
                      height={982}
                      sizes="100vw"
                      className="_2x1-image-fixed-height"
                    />
                  </div>
                </div>
                <div className="card-info">
                  <p className="card-description-title light">
                    Adding nearby teachers section
                  </p>
                  <p className="card-description light">
                    Half of the users mentioned distance as a primary factor
                    in assigning permanent and substitute teachers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section dark">
        <div className="container-1232">
          <div className="top-content">
            <div className="eyebrow-header">
              <h2 className="light">
                Design iterations: from card to table view for easier
                skimmability
              </h2>
            </div>
          </div>
          <div className="horizontal-container">
            <div className="_2-x-1-grid">
              <div className="media-card">
                <div className="card-media">
                  <div className="card-image-wrapper _2-x-1-image-fixed-height-wrapper">
                    <ZoomableImage
                      src="/images/image-85.png"
                      alt="Screen with grid of teachers"
                      width={800}
                      height={521}
                      sizes="100vw"
                      className="_2x1-image-fixed-height"
                    />
                  </div>
                </div>
                <div className="card-info">
                  <p className="card-description-title light">
                    Card view of attendance checks
                  </p>
                  <p className="card-description light">
                    The original version took up lots of screen space
                  </p>
                </div>
              </div>
              <div className="media-card">
                <div className="card-media">
                  <div className="card-image-wrapper _2-x-1-image-fixed-height-wrapper">
                    <ZoomableImage
                      src="/images/vac-table.png"
                      alt="A computer screen displaying a list of teachers"
                      width={912}
                      height={492}
                      sizes="100vw"
                      className="_2x1-image-fixed-height"
                    />
                  </div>
                </div>
                <div className="card-info">
                  <p className="card-description-title light">
                    Table view of attendance checks
                  </p>
                  <p className="card-description light">
                    Table rows allow data to be more easily scannable and
                    leaves space for other sections like overview and tasks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section">
        <div className="container-1232">
          <div className="top-content">
            <div className="slide-header">
              <h2>Outcome</h2>
              <p>
                Employees were much happier with the redesigned flows and
                designs
              </p>
            </div>
          </div>
          <div className="horizontal-middle-container">
            <div className="_3-x-1-text-grid">
              <div className="card">
                <div className="card-info text-card">
                  <p className="body-title">Time saving</p>
                  <p className="card-quote">
                    &ldquo;
                    <strong>[the new design] has interview notes</strong>,
                    which right now I can&rsquo;t access unless I open in a
                    separate window, which again just takes more time&rdquo;
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-info text-card">
                  <p className="body-title">Improve trust with clean UI</p>
                  <p className="card-quote">
                    &ldquo;this is super clean looking and nice and{" "}
                    <strong>
                      if I have to share my screen to show a school schedule,
                      to my eyes it looks much more appealing
                    </strong>
                    &rdquo;
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-info text-card">
                  <p className="body-title">Functional</p>
                  <p className="card-quote">
                    &ldquo;it has all the right information that I want to
                    see&rdquo;
                  </p>
                  <p className="card-quote">
                    &ldquo;I love that the [student] feedback [section] is
                    already there&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section dark full-height">
        <div className="container-1232">
          <div className="side-text-horizontal-container">
            <div className="left-middle-half-width-container">
              <div className="slide-left-header">
                <div className="middle-aligner">
                  <div className="container-eyebrow-and-heading">
                    <div className="wrapper-heading-and-blurb">
                      <h2 className="light">Constraints</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-middle-half-width-container">
              <ul role="list" className="blue-bullet-list">
                <li className="list-item-colored-bullet">
                  Engineering team of 1
                </li>
                <li className="list-item-colored-bullet mobile-2-lines">
                  Lack of consensus between stakeholders
                </li>
                <li className="list-item-colored-bullet">
                  Limited time with users
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section dark full-height">
        <div className="container-1232">
          <div className="side-text-horizontal-container">
            <div className="left-middle-half-width-container">
              <div className="slide-left-header">
                <div className="middle-aligner">
                  <div className="container-eyebrow-and-heading">
                    <div className="wrapper-heading-and-blurb">
                      <h2 className="light">Reflections</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-middle-half-width-container">
              <p className="light">
                I now have a better appreciation for collaborative and
                communicative teams. I also learned I really enjoy projects
                where I get to learn about a new type of job and industry and
                solving niche problem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
