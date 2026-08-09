/* Every screenshot on this page opens the zoom — the component renders the
   same <img> next/image did, plus the attributes that make it operable.
   See components/ZoomableImage.tsx. The hero banner is the one exception:
   it's a transparent-PNG mockup, and the zoom's frame paints a near-white
   backing that would show through the empty regions around the devices.
   It's opted out via zoomable={false} on CaseStudyBanner below. */
import ZoomableImage from "@/components/ZoomableImage";
import type { Metadata } from "next";
import CaseStudyBanner from "@/components/CaseStudyBanner";
import CaseStudyHero from "@/components/CaseStudyHero";
import ProgressBar from "@/components/ProgressBar";

export const metadata: Metadata = {
  title: "GPE case study",
};

/* data-page identifies which exported HTML file's page-level custom code
   applies. bank-green-gpe.html carries a `.section.footer` background rule in
   an inline <style>; the shared Footer lives in the root layout, so custom.css
   scopes that rule by this attribute. */
export default function BankGreen() {
  return (
    <div className="project" data-page="bank-green-gpe">
      <ProgressBar />
      <CaseStudyBanner
        color="green"
        imageSrc="/images/trio.png"
        imageAlt=""
        width={1840}
        height={800}
        imageClassName="banner-image-contain"
        sizes="(max-width: 1840px) 100vw, 1840px"
        zoomable={false}
      />
      <CaseStudyHero
        title="Bank Green"
        tagline="How can we reduce the time it takes to rate a bank?"
        description={
          <p>
            Bank Green&apos;s mission is to fight climate change by
            decarbonizing the banking industry
          </p>
        }
        roles={[
          { label: "My role", value: "Lead UX research & design" },
          { label: "Tools", value: "Figma, FigJam, Miro" },
          {
            label: "TEAM",
            value: (
              <>
                1 product designer (me)
                <br />
                1 head of engineering/co-founder
                <br />
                2 senior engineers
              </>
            ),
          },
        ]}
      />

      <div className="project-section fixed">
        <div className="container-1232">
          <div className="center-middle-aligner">
            <div className="container-content-center">
              <p className="paragraph-display-thin">
                In order to speed up the bank rating process, engineers had
                developed an AI chatbot tool to help the ratings team. However{" "}
                <strong>no one was using the tool</strong>. With over 10,000
                banks to rate an an average of 3.5 hours to complete a rating,
                we needed an intuitive solution the raters could use.
                <br />
                <br />
                To address this,{" "}
                <strong>
                  I led user research, updated flows, and collaborated closely
                  with engineers
                </strong>{" "}
                to meet technical constraints and{" "}
                <strong>speed up the process from 2.5 hours to 1 hour</strong>{" "}
                to set the foundation for speeding up the process further with
                AI.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky-section">
        <ZoomableImage
          src="/images/Web-screens-grid.png"
          alt="Image of grid of screenshots on light green background"
          width={1440}
          height={982}
          className="sticky-image"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <div className="project-section">
        <div className="container-1232">
          <div className="container-800">
            <div className="heading-and-body-container">
              <h2>
                Bank ratings power 2 strategies that pressure banks to defund
                fossil fuels
              </h2>
              <p>
                Our rating system scores banks on their sustainability by
                looking at criteria like their policies and funded projects.
              </p>
            </div>
          </div>
          <div className="w-layout-grid _2-x-1-grid">
            <div className="card">
              <p className="display-callout">01</p>
              <div className="container-title-and-list">
                <p className="list-card-title">Consumer campaigns</p>
                <ul role="list">
                  <li>
                    Inform people - how&rsquo;s their bank doing on
                    sustainability?
                  </li>
                  <li>
                    Empower people to move their money and/or pressure banks
                    to divest from fossil fuels
                  </li>
                </ul>
              </div>
            </div>
            <div className="card">
              <p className="display-callout">02</p>
              <div className="container-title-and-list">
                <p className="list-card-title">Accreditation</p>
                <ul role="list">
                  <li>
                    Accreditation for green banks (like LEED does for green
                    buildings) establishes consumer trust in banks commitment
                    to divesting from fossil fuels
                  </li>
                  <li>Provides Bank Green with a path for revenue</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section hug-height">
        <div className="container-1232">
          <div className="container-800">
            <div className="heading-and-body-container">
              <h2>Raters use an inefficient bank rating process</h2>
              <p>
                Raters use 3 different tools to rate banks. The complete
                rating and review process to rate a bank is error-prone and
                takes around 3.5 hours
              </p>
            </div>
          </div>
          <div className="_3-x-1-card-grid">
            <div className="captioned-image">
              <div className="image-wrapper">
                <ZoomableImage
                  src="/images/tool-screenshot.png"
                  alt="A screenshot of a spreadsheet with a green background."
                  width={784}
                  height={856}
                  className="one-third-image"
                  style={{ height: "auto" }}
                />
              </div>
              <div className="caption-wrapper">
                {/* Empty in the export too; .caption-title's 4px top/bottom
                    margins are the reason it is there. */}
                <p className="caption-title" />
                <p className="caption">
                  Multiple spreadsheets to calculate bank ratings
                </p>
              </div>
            </div>
            <div className="captioned-image">
              <div className="image-wrapper">
                <ZoomableImage
                  src="/images/tool-screenshot-1.png"
                  alt="A screenshot of a computer screen with a kanban style board of bank items"
                  width={784}
                  height={856}
                  className="one-third-image"
                  style={{ height: "auto" }}
                />
              </div>
              <div className="caption-wrapper">
                {/* Empty in the export too; .caption-title's 4px top/bottom
                    margins are the reason it is there. */}
                <p className="caption-title" />
                <p className="caption">
                  Nuclino to track rated status and store source documents
                </p>
              </div>
            </div>
            <div className="captioned-image">
              <div className="image-wrapper">
                <ZoomableImage
                  src="/images/tool-screenshot-2.png"
                  alt="A computer screen with a list of items on it."
                  width={784}
                  height={856}
                  className="one-third-image"
                  style={{ height: "auto" }}
                />
              </div>
              <div className="caption-wrapper">
                {/* Empty in the export too; .caption-title's 4px top/bottom
                    margins are the reason it is there. */}
                <p className="caption-title" />
                <p className="caption">
                  Internal dashboard to manage relevant bank data on our
                  website
                </p>
              </div>
            </div>
          </div>
          <div className="left-align-container">
            <div className="container-680">
              <p>
                Multiple spreadsheets containing formulas and instructions are
                duplicated for different bank regions,{" "}
                <strong>
                  making it difficult to track updates in methodology and
                  instructions for different sets of banks
                </strong>
                . The complicated process makes it difficult to train new
                raters.
              </p>
              <p>
                Given that there are over 10,000 banks in just the
                Anglosphere, we need a more efficient way to rate banks.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="project-section fixed">
        <div className="container-1232">
          <div className="container-680">
            <div className="middle-aligner">
              <div className="heading-and-body-container">
                <div className="eyebrow-and-headline-container">
                  <p className="eyebrow">Problem statement</p>
                  <h2>
                    How might we simplify and speed up the bank rating
                    process?
                  </h2>
                </div>
                <div>
                  <p>We set some goals to address our problems:</p>
                  <ul role="list">
                    <li>
                      Simplify process by having a single touchpoint to rate
                      banks, track status, and store sources
                    </li>
                    <li>
                      Reduce bank rating time by 80-90% (from 2.5 hours to
                      &lt;30 min)
                    </li>
                    <li>
                      Create self-explanatory process to reduce need for
                      training new rater
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="project-section brainsprout">
        <div className="container-1232">
          <div className="eyebrow-and-headline-container">
            <p className="eyebrow">Solution</p>
          </div>
          <div className="horizontal-container">
            <div className="center-section">
              <div className="container-center">
                <h2 className="callout">Green Policy Evaluator (GPE)</h2>
                <p className="paragraph-centered">
                  GPE is an AI tool used to research and rate banks,
                  potentially qualifying them for the Bank Green Alliance
                  accreditation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="project-section hug-height">
        <div className="container-1232">
          <div className="container-680">
            <div className="heading-and-body-container">
              <div className="eyebrow-and-headline-container">
                <p className="eyebrow">Process</p>
                <h2>Phase 1: Migrating from spreadsheet to a web-app</h2>
              </div>
              <div>
                <p>
                  <strong>
                    Phase 1 violated several design heuristics, resulting in
                    confusion from users
                  </strong>
                </p>
                <p>
                  This project started before design was brought in, driven by
                  engineers. Engineers migrated segments of the spreadsheet
                  process to a low-code frontend in Retool, which addressed
                  some pain points. However, there were still many points of
                  improvement:
                </p>
                <ul role="list">
                  <li>
                    Inconsistent application of visibility of system status
                    (NNG heuristic 1)
                  </li>
                  <li>
                    Included irrelevant information without clear visual
                    hierarchy (NNG heuristic 8)
                  </li>
                  <li>
                    No feedback to help users recognize and recover from
                    errors (NNG heuristic 9)
                  </li>
                  <li>
                    Lacked clear documentation, requiring a lot of
                    hand-holding for new users (NNG heuristic 10)
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container-800">
            <div className="image-with-heading">
              <p>
                <strong>Initial migration attempt</strong>
              </p>
              <div className="image-wrapper">
                <ZoomableImage
                  src="/images/Annotation-v1.png"
                  alt="Screenshot of page with annotations on the side"
                  width={1648}
                  height={1176}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="project-section hug-height">
        <div className="container-1232">
          <div className="container-680">
            <div className="heading-and-body-container">
              <h3>Phase 1 research, evaluation, and redesign</h3>
              <p>
                As design joined in later in the process, I had to
                collaborate heavily to ensure that feedback was implemented
                properly.
              </p>
            </div>
          </div>
          <div className="container-800">
            <div className="image-with-heading">
              <p>
                <strong>Phase 1 evaluation and iterations</strong>
              </p>
              <div className="captioned-image">
                <div className="image-wrapper">
                  <ZoomableImage
                    src="/images/Annotation-v2.png"
                    alt="Image of webpage with annotations on the side"
                    width={1649}
                    height={1112}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="caption-wrapper">
                  <p className="caption">
                    Feedback to use visual hierarchy to show association
                    between database tool and relevant criteria section
                    implemented
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container-800">
            <div className="captioned-image">
              <div className="image-wrapper">
                <ZoomableImage
                  src="/images/Annotation-v3.png"
                  alt="Image of webpage with annotations on the side"
                  width={1648}
                  height={1150}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="caption-wrapper">
                <p className="caption">
                  Reduced horizontal form navigation, however there were
                  continued struggles to get design updates fully into
                  development
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="project-section hug-height">
        <div className="container-1232">
          <div className="section-heading-wrapper">
            <h3>Before and after redesign</h3>
          </div>
          <div className="container-800">
            {/* Same .comparison contract as /vac-redesign's pairs, on this
                page's own grid class. --pair-aspect: both images are 797x703,
                so the two aspects are the same 1.134 and each fills its track
                exactly. Declared rather than left to default, because the
                default is no shared height at all. */}
            <div
              className="w-layout-grid _2-x-1-grid-real comparison"
              style={{ "--pair-aspect": "1.134" } as React.CSSProperties}
            >
              <div className="captioned-image">
                <div className="image-wrapper border-radius">
                  <ZoomableImage
                    src="/images/image-frame-large.png"
                    alt="Screenshot of an app created in Retool showing a data table on top half of screen and form section on bottom half of screen"
                    width={797}
                    height={703}
                    loading="eager"
                    className="one-third-image"
                    style={{ height: "auto" }}
                  />
                </div>
                <div className="caption-wrapper">
                  <h3 className="caption-title">
                    <strong className="caption-title">Engineer version</strong>
                  </h3>
                  <p className="caption">
                    The initial iterations left important information out of
                    the initial viewport, and had a lot of visual clutter
                  </p>
                </div>
              </div>
              <div className="captioned-image">
                <div className="image-wrapper border-radius">
                  <ZoomableImage
                    src="/images/image-frame-large-1.png"
                    alt="A screenshot of a website page with a green background."
                    width={797}
                    height={703}
                    loading="eager"
                    className="one-third-image"
                    style={{ height: "auto" }}
                  />
                </div>
                <div className="caption-wrapper">
                  <h3 className="caption-title">
                    <strong className="caption-title">Redesign</strong>
                  </h3>
                  <p className="caption">
                    I interviewed 3 raters and discussed with team members to
                    clarify and simplify the interface
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container-680">
            <div className="body-text-container">
              <p>
                The redesign, based on user feedback and design evaluation,
                improves visual hierarchy, reduces visual clutter, and
                increases users&apos; efficiency of use.
              </p>
              <p>
                <strong>Implemented improvements:</strong>
              </p>
              <p>Help and documentation</p>
              <ul role="list">
                <li>
                  Moved instructions into prominent area for new raters to
                  view when needed
                </li>
              </ul>
              <p>Visibility of system status</p>
              <ul role="list">
                <li>
                  Keep action buttons fixed at bottom - previously, users
                  would miss the save button and lose changes
                </li>
              </ul>
              <p>Aesthetic and minimalist design</p>
              <ul role="list">
                <li>
                  Used navigation to display relevant bank information,
                  eliminating unnecessary table view while a user rates banks
                </li>
                <li>
                  Consolidated horizontal tabs and corresponding summary items
                  into a vertical navigation style list of rating criteria
                </li>
              </ul>
              <p>Help users recognize, diagnose, and recover from errors</p>
              <ul role="list">
                <li>
                  Added error messages and alerts to inform users of ways to
                  recover
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section">
        <div className="container-1232">
          <div className="container-800">
            <div className="heading-and-body-container">
              <h3>Phase 1 redesign outcomes</h3>
              <ul role="list">
                <li>
                  Built foundation for moving process to a single platform for
                  full bank rating cycle
                </li>
                <li>Reduced rating time from 2.5 to 1 hour</li>
                <li>Eliminated calculation and formula errors</li>
                <li>
                  Saved experienced raters time by reducing need for training
                  (dependency)
                </li>
              </ul>
            </div>
          </div>
          <div className="container-800">
            <div className="heading-and-body-container">
              <h3>Persisting issues after redesign</h3>
              <ul role="list">
                <li>Raters still have to use 2 tools</li>
                <li>Goal is &lt;30 min, currently at 1 hour</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky-section">
        <ZoomableImage
          src="/images/user-flows.png"
          alt="background image of a grid of flow charts"
          width={2880}
          height={1620}
          className="sticky-image"
          style={{ width: "100%", height: "auto" }}
        />
        <div className="full-overlay" />
        <div className="container-1232-absolute">
          {/* Same centre-940 structure as the overview block at the top of the
              page, so both land on one left edge — see section 19 of
              styles/custom.css. */}
          <div className="center-middle-aligner">
            <div className="container-content-center">
              <h2>User flows and technical constraints inform error handling</h2>
              <p>
                I started my process by drawing out user flows and getting
                feedback from users and engineers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="project-section">
        <div className="container-1232">
          <div className="top-content">
            <div className="heading-and-body-container">
              <h3>Anticipating sticky points</h3>
              <p>
                My engineering background helped drive conversations, asking
                about asynchronous capability and error times, which helped me
                identify 2 main sticky points that would inform the flows and
                designs.
              </p>
            </div>
          </div>
          <div className="w-layout-grid _2-x-1-grid-real">
            <div className="card">
              <p className="display-callout">01</p>
              <div className="container-title-and-list">
                <p className="list-card-title">Asynchronous actions</p>
                <p>
                  What can be done asynchronously?
                  <br />
                  How do we inform users when a process is completed?
                </p>
              </div>
            </div>
            <div className="card">
              <p className="display-callout">02</p>
              <div className="container-title-and-list">
                <p>
                  <strong className="list-card-title">
                    Complex error handling
                  </strong>
                </p>
                <p>
                  When should we inform users about errors?
                  <br />
                  ➜ Identified 3 possible points in flow to handle errors
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="project-section hug-height">
        <div className="container-1232">
          <div className="container-800">
            <div className="heading-and-body-container">
              <div className="eyebrow-and-headline-container">
                <p className="eyebrow">Designs</p>
                <h2>Translating engineering and user feedback to designs</h2>
              </div>
              <p>
                <strong>
                  Asynchronous flows
                  <br />
                </strong>
                I determined that storing and processing documents can be
                done asynchronously, and designed to allow users to continue
                other actions on the app, such as updating rating criteria.
                Users can clearly see the progress of uploads when the upload
                modal is closed, and receive alerts when an upload process is
                terminated.
              </p>
            </div>
            <div className="image-with-heading">
              <p>
                Upload errors include things like errors in user input, file
                format or size, and bad URL links. These errors are handled
                within the upload modal. This way, small errors won&rsquo;t
                cause the longer document processing and storage upload
                actions to fail at a later time.
              </p>
              <div className="image-wrapper">
                <ZoomableImage
                  src="/images/modal-errors.png"
                  alt="A screenshot of a document upload page with a red X in the lower right corner."
                  width={3009}
                  height={1891}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
          <div className="container-800">
            <div className="image-with-heading">
              <p>
                Document processing errors are backend heavy and include
                errors like unreadable formats and failure to store to Azure.
                These errors might occur 5-10 minutes after a user attempts to
                upload a document.
              </p>
              <p>
                To address these, I used a persistent alert, along with an
                alerts page to track a history of failed uploads and actions
                to recover from errors after leaving and returning to app.
              </p>
              <div className="image-wrapper">
                <ZoomableImage
                  src="/images/Asynchronous-flow.png"
                  alt="Flow chart of webpages leading to another"
                  width={10564}
                  height={4870}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="project-section dark">
        <div className="container-1232">
          <div className="top-content">
            <div className="slide-header">
              <h2 className="light">Outcomes</h2>
            </div>
          </div>
          <div className="horizontal-middle-container">
            <div className="_3-x-1-text-grid">
              <div className="card">
                <div className="card-media">
                  <div className="card-data-wrapper">
                    <div className="display-callout light">01</div>
                  </div>
                </div>
                <div className="card-info text-card">
                  <p className="light">
                    <strong className="list-card-title light">
                      Reduced rating time
                    </strong>
                  </p>
                  <p className="light">
                    Raters reported spending about 1 hour to fully rate a
                    bank, down from 2.5 hours (the final goal being 20-30
                    minutes). Save an extra ~5-10 minutes with new upload
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-media">
                  <div className="card-data-wrapper">
                    <div className="display-callout light">02</div>
                  </div>
                </div>
                <div className="card-info text-card">
                  <p className="list-card-title">
                    <strong className="list-card-title light">
                      Reduced from 3 tools to 1
                    </strong>
                  </p>
                  <p className="light">
                    Increase efficiency of use - the upload document feature
                    eliminated the use of a third-party tool used to track
                    sources, eliminating confusion and reducing time raters
                    spent on remembering different logins and tools
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-media">
                  <div className="card-data-wrapper">
                    <div className="display-callout light">03</div>
                  </div>
                </div>
                <div className="card-info text-card">
                  <p className="light">
                    <strong className="list-card-title light">
                      Positive user feedback
                    </strong>
                  </p>
                  <p className="light">
                    New raters had fewer questions when rating a bank for the
                    first time. Users mentioned the new interface was easier
                    to use
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section fixed dark">
        <div className="container-1232">
          <div className="side-text-horizontal-container">
            <div className="left-middle-half-width-container">
              <div className="slide-left-header">
                <div className="middle-aligner">
                  <h2 className="light">Next steps</h2>
                </div>
              </div>
            </div>
            <div className="right-middle-half-width-container">
              <ul role="list" className="blue-bullet-list">
                <li className="list-item-colored-bullet top-align">
                  The next phase will use AI to parse uploaded documents to
                  pre-fill in criteria to speed up bank rating
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="project-section hug-height dark">
        <div className="container-1232">
          <div className="top-content">
            <div className="slide-header">
              <h2 className="light">Key learnings</h2>
            </div>
          </div>
          <div className="horizontal-middle-container">
            <div className="_3-x-1-text-grid">
              <div className="card">
                <div className="card-media">
                  <div className="card-data-wrapper">
                    <div className="display-callout light">01</div>
                  </div>
                </div>
                <div className="card-info text-card">
                  <p className="list-card-title light">
                    New design constraints
                  </p>
                  <p className="light">
                    Designing for Retool was a new experience. I learned to
                    ask about Retool&rsquo;s limitations, which informed my
                    decisions when it came to flows such as auto-save
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-media">
                  <div className="card-data-wrapper">
                    <div className="display-callout light">02</div>
                  </div>
                </div>
                <div className="card-info text-card">
                  <p className="list-card-title light">Unique challenges</p>
                  <p className="light">
                    Something I enjoy about designing for Bank Green is the
                    opportunity to be creative when solving problems, since
                    there often isn&rsquo;t direct precedent for me to get
                    inspiration from. I enjoyed learning about the unique role
                    of the rater and being able to improve their daily
                    workflow.
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-media">
                  <div className="card-data-wrapper">
                    <div className="display-callout light">03</div>
                  </div>
                </div>
                <div className="card-info text-card">
                  <p className="list-card-title light">
                    Engineer-driven process
                  </p>
                  <p className="light">
                    Being part of a product and engineering team that&rsquo;s
                    led by an engineer means that it&rsquo;s extremely
                    critical for me as a designer to stay proactive when
                    asking questions, planning ahead, and communicating with
                    the team, otherwise users and I may find unexpected,
                    confusing changes pop up!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
