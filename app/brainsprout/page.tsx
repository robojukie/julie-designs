/* Every screenshot on this page opens the zoom — the component renders the
   same <img> next/image did, plus the attributes that make it operable.
   See components/ZoomableImage.tsx. */
import ZoomableImage from "@/components/ZoomableImage";
import Link from "next/link";
import type { Metadata } from "next";
import CaseStudyBanner from "@/components/CaseStudyBanner";
import CaseStudyHero from "@/components/CaseStudyHero";
import ProgressBar from "@/components/ProgressBar";

export const metadata: Metadata = {
  title: "BrainSprout - Online learning app",
  description:
    "BrainSprout is a comprehensive online learning web app designed to create an engaging and inclusive learning experience for career professionals",
};

export default function BrainSprout() {
  return (
    <div className="project">
      <ProgressBar />
      <CaseStudyBanner
        imageSrc="/images/video-full-width_1.webp"
        imageAlt="Screenshot of video lesson"
        width={2292}
        height={1560}
        sizes="(max-width: 2292px) 100vw, 2292px"
      />
      <CaseStudyHero
        title="BrainSprout"
        tagline="Designing an easy-to-navigate online learning app"
        description={
          <p>
            BrainSprout is a comprehensive learning web app designed to
            create an engaging and inclusive learning experience for career
            professionals. This is the first part of a larger project. See
            part 2{" "}
            <Link href="/brainsprout-accessibility-features">here</Link>.
          </p>
        }
        roles={[
          { label: "My role", value: "UX/UI Research & Design" },
          { label: "Tools", value: "Figma, FigJam, Miro, Lookback, ChatGPT" },
        ]}
      />

      <div className="section">
        <div className="project-subsection">
          <div className="container-1232">
            <div className="container-680">
              <div className="container-6-column">
                <div className="list-card">
                  <div className="card-info text-card">
                    <h2 className="eyebrow">Problem</h2>
                    <h2>
                      Learners struggle to achieve their goals effectively
                      with current online tools
                    </h2>
                    <p>
                      Online learning has the potential to help close
                      widening educational and economical gaps, but current
                      solutions don&rsquo;t provide consistent features to
                      keep learners engaged, particularly for long courses.
                      Learners struggle to stay focused and have difficulty
                      managing course load and time expectations, resulting
                      in burnout and quitting.
                    </p>
                  </div>
                </div>
                <div className="list-card">
                  <div className="card-info text-card">
                    <h2 className="eyebrow">Solution</h2>
                    <h2>
                      Prioritize features that help lower barriers for people
                      to achieve their goals
                    </h2>
                    <p>
                      BrainSprout offers a comprehensive online learning
                      system with a minimal interface that helps Learners
                      stay focused and engaged. It provides features for
                      people of various learning types, and strives to
                      address challenges effectively.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div id="section1" className="project-subsection">
          <div className="container-1232">
            <div className="container-680">
              <div className="container-title-and-list">
                <div className="eyebrow-and-headline-container">
                  <h2 className="eyebrow">Discovery</h2>
                  <h2>Diving deep into research</h2>
                  <div className="body-text-container">
                    <div className="container-quote">
                      To dig past my surface-level knowledge around the topic
                      of online learning, I dove into research and competitor
                      analysis
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-title-and-list">
                <div className="heading-container extra-padding">
                  <h3>
                    Education is the most powerful weapon which you can use to
                    change the world
                  </h3>
                </div>
                <div className="body-text-container">
                  <div className="container-quote">
                    In my American Dilemmas college course, we studied
                    societal issues such as education. It was clear that
                    education can significantly lower barriers for people,
                    close income gaps, and help build a better society.
                  </div>
                </div>
              </div>
              <div className="content-container">
                <div className="heading-container h4-container">
                  <h3>
                    Widening inequality in education extends into adulthood
                  </h3>
                </div>
                <div className="image-wrapper-small">
                  <ZoomableImage
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
                      className="link-accent-bold"
                    >
                      NYT
                    </a>
                  </div>
                </div>
                <div className="body-text-container">
                  <div className="container-quote">
                    Research highlights increasing gaps in education
                    inequality in K-12 students, a widening disparity
                    that&rsquo;s reflected in the participation of adult
                    learning between low and high-skilled adults.
                    Disadvantaged students are also more likely to lack
                    reliable internet and digital skills, continuously leaving
                    them further behind.
                  </div>
                </div>
              </div>
              <div className="content-container">
                <div className="heading-container h4-container">
                  <h3>
                    Digging deeper, I discovered online students are older
                    than I had expected
                  </h3>
                </div>
                <div className="body-text-container">
                  <div className="container-quote">
                    I was surprised to find nearly half of students in U.S.
                    higher education are over 25 and the average online
                    student is 32 years old.
                  </div>
                </div>
                <div className="image-wrapper-small">
                  <ZoomableImage
                    src="/images/online-learning-statistics.png"
                    alt="Online learning statistics"
                    width={1160}
                    height={480}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="container-1232">
            <div className="grid-with-heading-vertical">
              <div className="container-680">
                <div className="centered-heading">
                  <h2>Top challenges of online learners</h2>
                </div>
              </div>
              <div className="w-layout-grid _3-x-1-card-grid">
                <div className="grid-block grid-item-w-background-image">
                  <div className="container-title-and-list">
                    <div className="centered-heading">
                      <p>
                        <strong>Motivation</strong>
                      </p>
                    </div>
                    <div className="item-with-image-background background-motivation-icon">
                      <ul role="list">
                        <li>Feelings of isolation</li>
                        <li>Lack of support</li>
                        <li>Lack of engagement</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="grid-block grid-item-w-background-image">
                  <div className="container-title-and-list">
                    <div className="centered-heading">
                      <p>
                        <strong>Time</strong>
                      </p>
                    </div>
                    <div className="item-with-image-background background-time-icon">
                      <ul role="list">
                        <li>Struggles with work life balance</li>
                        <li>Balancing work and studies</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="grid-block grid-item-w-background-image">
                  <div className="container-title-and-list">
                    <div className="centered-heading">
                      <p>
                        <strong>Technical challenges</strong>
                      </p>
                    </div>
                    <div className="item-with-image-background background-tech-background">
                      <ul role="list">
                        <li>Reliable internet at home</li>
                        <li>Computer and digital tools at home</li>
                        <li>Digital skills</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-680">
                <div className="body-text-container">
                  <div className="body-italics note">
                    Note: Financial obstacles are outside of the scope of this
                    project.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-1232 full">
            <div className="container-680">
              <div className="body-text-container">
                <p>
                  Additionally, as an avid online learner since 2014, it was
                  only fitting that I choose online learning to pursue my UX
                  career. However, during this time, I faced challenges and
                  frustrations myself.
                </p>
              </div>
            </div>
            <div className="grid-2-col-first">
              <div className="column column-media">
                <div className="image-wrapper-grid">
                  <ZoomableImage
                    src="/images/screenshot-of-bootcamp-w-annotation.png"
                    alt="Thinkific platform with expanded left menu displaying course overview but no time estimates"
                    width={1716}
                    height={895}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="column column-text">
                <p>
                  <strong>Bootcamp frustrations:</strong>
                </p>
                <ul role="list">
                  <li>Bootcamp course had many long lessons</li>
                  <li>No time estimates in overview</li>
                  <li>Difficult to track assignments and feedback</li>
                </ul>
              </div>
            </div>
            <div className="grid-2-col-last">
              <div className="column column-media">
                <div className="image-wrapper-grid">
                  <ZoomableImage
                    src="/images/screenshot-of-coursera-w-annotation.png"
                    alt='"My courses" page of Coursera, showing 3 courses and pagination of 25 pages to click through'
                    width={1437}
                    height={895}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="column column-text">
                <p>
                  <strong>Coursera frustrations:</strong>
                </p>
                <ul role="list">
                  <li>Only 3 enrolled courses viewable at a time</li>
                  <li>
                    Forced to click through twenty-five pages to go through
                    all my enrolled courses!
                  </li>
                  <li>
                    No clear indication that saving is a paid plan only
                    feature
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container-1232">
            <div className="container-680">
              <div className="container-title-and-list">
                <div className="heading-container h4-container">
                  <h3>
                    Scouting the competitors revealed inconsistent and lacking
                    solutions
                  </h3>
                </div>
                <div className="body-text-container">
                  <p>I researched competitors to learn:</p>
                  <ul role="list">
                    <li>What current solutions are already out there?</li>
                    <li>
                      Where do they not match the needs of online Learners?
                    </li>
                    <li>What sets one apart from another?</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="image-wrapper-full">
              <ZoomableImage
                src="/images/Feature-analysis.png"
                alt="Competitor analysis table showing Coursera, Udemy, LinkedIn Learning, and Khan Academy with different feature availability for things like downloading content and transcript for videos"
                width={1599}
                height={306}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="container-680">
              <div className="body-text-container">
                <div className="container-quote">
                  Competitor analysis shows that current solutions vary
                  widely across devices and applications, even within a
                  single company. I wanted to ensure that features stay
                  consistent for my solution. However, due to a lack of
                  mobile participants, I&rsquo;ve focused on having
                  comprehensive web app features for this project.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="section2" className="section">
        <div className="project-subsection">
          <div className="container-1232">
            <div className="container-680">
              <div className="content-container">
                <div className="eyebrow-and-headline-container">
                  <h2 className="eyebrow">Ideation</h2>
                  <h2>To retain information, we need to stay engaged</h2>
                </div>
                <div className="body-text-container">
                  <p>
                    I reached out to various social media groups, chat groups,
                    and my personal network to recruit people and spoke with 9
                    participants to help me understand real challenges.
                  </p>
                </div>
              </div>
              <div className="content-container">
                <div className="body-text-container">
                  <h3>Interviews highlighted 3 user needs</h3>
                </div>
                <div className="body-text-container">
                  <div className="heading-container h4-container">
                    <h4>1. Staying focused</h4>
                  </div>
                  <ul role="list">
                    <li>
                      Participants want to stay engaged with their lessons, in
                      order to retain information better
                    </li>
                    <li>
                      Participants dread lengthy lectures and readings,
                      preferring shorter formats.
                    </li>
                    <li>
                      Participants shared tools that helped them stay focused,
                      such as text-to-speech players.
                    </li>
                  </ul>
                </div>
                <div className="image-wrapper-small">
                  <ZoomableImage
                    src="/images/screenshot-of-speechify-widget.png"
                    alt="Screenshot of website with Speechify Chrome extension in use"
                    width={1431}
                    height={749}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="content-container">
                <div className="body-text-container">
                  <div className="heading-container h4-container">
                    <h4>2. Tracking progress and feedback</h4>
                  </div>
                  <ul role="list">
                    <li>
                      Learners wanted to see they progress and feedback as
                      they worked, to keep them motivated and organized
                    </li>
                    <li>
                      Learners wanted accurate time estimates for lessons and
                      courses, in order to manage expectations and plan their
                      schedules
                    </li>
                  </ul>
                </div>
              </div>
              <div className="content-container">
                <div className="body-text-container">
                  <div className="heading-container h4-container">
                    <h4>3. Searching with uncertainty</h4>
                  </div>
                  <ul role="list">
                    <li>
                      Learners wanted to find content even when they
                      couldn&rsquo;t remember exact terminology
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="section3" className="section">
        <div className="project-subsection">
          <div className="container-1232">
            <div className="container-680">
              <div className="content-container">
                <div className="container-title-and-list">
                  <div className="eyebrow-and-headline-container">
                    <h2 className="eyebrow">design</h2>
                    <h2>Refining 5 ideas with testing</h2>
                  </div>
                  <div className="body-text-container">
                    <p>
                      I conducted concept and usability tests to evaluate my
                      designs with 7 participants. The data from the user
                      testing uncovered 5 major areas for improvement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-container">
              <div className="container-680">
                <div className="body-text-container">
                  <div className="heading-container h4-container">
                    <h3>
                      1. A floating audio player and simplified reading
                      indicator helped reduce clutter
                    </h3>
                  </div>
                  <p>
                    Initially, the inspiration from my original design
                    didn&rsquo;t translate well.
                  </p>
                </div>
              </div>
              <div className="grid-2-col-first">
                <div className="column column-media _2-items">
                  <div className="image-wrapper-grid image-wrapper-with-2-images">
                    <ZoomableImage
                      src="/images/01-before-screen-of-audio-player-and-reading-indicator.png"
                      alt="Screen of first reading features implementation feature"
                      width={1440}
                      height={1024}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
                <div className="column column-text">
                  <p>
                    <strong>Concept testing the original idea</strong>
                  </p>
                  <p>
                    <strong>Idea 1</strong>: Audio player
                  </p>
                  <p>
                    <strong>Idea 2: </strong>Reading progress indicator with
                    clicking to bookmark
                  </p>
                  <p>
                    <strong>Feedback: </strong>
                  </p>
                  <ul role="list">
                    <li>
                      The audio and progress indicator took up a lot of
                      screen real estate, distracting users from the lesson
                    </li>
                    <li>
                      Participants were confused and thought the progress
                      indicator correlated with the audio player. They were
                      also unable to discover how to use it to bookmark
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="grid-2-col-last">
              <div className="column column-media">
                <div className="image-wrapper-grid-stack">
                  <ZoomableImage
                    src="/images/02-iteration-1-screen-of-audio-player-and-reading-indicator.png"
                    alt="Screen of first iteration of  reading lesson features"
                    width={1440}
                    height={1024}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="column column-text">
                <p>
                  <strong>Iteration 1: </strong>
                </p>
                <ul role="list" className="rich-list">
                  <li>Moved audio player to use empty white space on side</li>
                  <li>Reduced reading indicator to a progress line</li>
                </ul>
                <p>
                  <strong>Feedback: </strong>
                </p>
                <ul role="list">
                  <li>
                    Users still found the progress reading indicator
                    confusing, the bookmarks were hard to see and the
                    triangle marker was confusing
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container-1232">
            <div className="content-container">
              <div className="container-680">
                <div className="heading-container h4-container">
                  <h3>
                    2. Using proximity established a closer relationship
                    between the reading and progress indicator
                  </h3>
                </div>
              </div>
              <div className="grid-2-col-first">
                <div className="column column-media">
                  <div className="image-wrapper-grid-stack">
                    <ZoomableImage
                      src="/images/04-_before_-screen-of-reading-indicator-high-fidelity.png"
                      alt="High fidelity screen of reading lesson with vertical reading progress indicator aligned close to page margin"
                      width={1440}
                      height={1024}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
                <div className="column column-text">
                  <p>
                    <strong>Usability testing my design</strong>
                  </p>
                  <p>
                    <strong>Before:</strong>
                  </p>
                  <ul role="list" className="rich-list">
                    <li>
                      Rotated reading indicator vertically to take advantage
                      of white space in margin
                    </li>
                    <li>
                      Used pins instead of bookmarks so they could stack more
                      easily. Took a small risk, since I wasn&rsquo;t sure if
                      users would pick up on what this would be
                    </li>
                  </ul>
                  <p>
                    Continued struggles with executing the progress indicator
                    and bookmarking feature
                  </p>
                  <p>
                    <strong>Feedback: </strong>
                  </p>
                  <ul role="list">
                    <li>
                      &ldquo;I saw it, but I didn&rsquo;t know what it was, so
                      I ignored it&rdquo;
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-2-col-last">
                <div className="column column-media">
                  <div className="image-wrapper-grid-stack">
                    <ZoomableImage
                      src="/images/03-_after_-screen-of-reading-indicator-high-fidelity.png"
                      alt="High fidelity screen of reading lesson with vertical reading progress indicator aligned close to right margin of reading lesson"
                      width={1440}
                      height={1024}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
                <div className="column column-text">
                  <p>
                    <strong>After:</strong>
                  </p>
                  <ul role="list" className="rich-list">
                    <li>Moving indicator closer to text eliminated confusion</li>
                    <li>
                      Hovering over the indicator prompts helpful tooltip and
                      pin to bookmark
                    </li>
                  </ul>
                  <p>
                    After much thinking and pacing, I had a lightbulb 💡moment
                    and finally found an effective solution that users liked!
                  </p>
                  <p>
                    <strong>Feedback: </strong>
                  </p>
                  <ul role="list">
                    <li>
                      Users said that they thought they&rsquo;d quickly
                      understand and get used to pins for the bookmarking
                      feature
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="container-1232">
            <div className="content-container">
              <div className="container-680">
                <div className="body-text-container">
                  <div className="heading-container h4-container">
                    <h3>
                      3. Comprehensive search displays related content in the
                      side pane
                    </h3>
                  </div>
                  <p>
                    I wanted to digitally mimic the idea of dog-earing, so if
                    a user were reading a lesson and wanted to quickly review
                    a related concept they remembered, they could quickly
                    search and <strong>view both the concept and the original page</strong>{" "}
                    (like holding your place in a book while you flip through
                    other pages for a term or reference)
                  </p>
                </div>
              </div>
              <div className="grid-2-col-first">
                <div className="column column-media">
                  <div className="image-wrapper-grid-stack">
                    <ZoomableImage
                      src="/images/05-before-screen-of-search-feature.png"
                      alt='Screen of "dog earing" idea attempt'
                      width={1440}
                      height={1024}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
                <div className="column column-text">
                  <p>
                    <strong>Concept testing &ldquo;dog-earing&rdquo; idea</strong>
                  </p>
                  <p>
                    <strong>Before:</strong>
                  </p>
                  <ul role="list" className="rich-list">
                    <li>Search results would open on left</li>
                    <li>
                      Original page users were on would continue to display
                      on right
                    </li>
                  </ul>
                  <p>
                    <strong>Feedback: </strong>
                  </p>
                  <ul role="list">
                    <li>
                      Idea did not translate well digitally and users were
                      confused
                    </li>
                    <li>
                      Users expected right pane to display information
                      correlating with selected search result on left
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-long-text grid-2-col-last">
                <div className="column column-media">
                  <div className="image-wrapper-grid-stack">
                    <ZoomableImage
                      src="/images/06-after-screen-of-search-feature.png"
                      alt="Screen of updated search flow"
                      width={1440}
                      height={1024}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
                <div className="column column-text">
                  <p>
                    <strong>After:</strong>
                  </p>
                  <ul role="list">
                    <li>
                      Updated the flow to display content in the right pane
                      that correlates with the selected result in the left
                      pane
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="container-1232">
            <div className="content-container">
              <div className="container-680">
                <div className="body-text-container">
                  <div className="heading-container h4-container">
                    <h3>
                      4. Used an internal discussion feature, rather than
                      third-party chat apps
                    </h3>
                  </div>
                  <p>
                    I wasn&rsquo;t sure if it would be worth the time and
                    investment of developing an internal discussion tool when
                    there are so many robust apps like Discord and Slack. I
                    wanted to see if users would enjoy using an advanced
                    third-party app.
                  </p>
                </div>
              </div>
              <div className="grid-2-col-first">
                <div className="column column-media">
                  <div className="image-wrapper-grid-stack">
                    <ZoomableImage
                      src="/images/07-screen-of-video-lesson-using-external-discussion-feature.png"
                      alt="Screen of external discussion feature exploration"
                      width={1440}
                      height={1104}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
                <div className="column column-text">
                  <p>
                    <strong>Concept testing discussion feature options</strong>
                  </p>
                  <p>
                    <strong>Feedback:</strong>
                  </p>
                  <ul role="list">
                    <li>
                      Users valued being able to ask questions directly from
                      the lesson page without having to navigate elsewhere or
                      download other tools
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-long-text grid-2-col-last">
                <div className="column column-media">
                  <div className="image-wrapper-grid-stack">
                    <ZoomableImage
                      src="/images/08-screen-of-video-lesson-using-internal-discussion-feature.png"
                      alt="Screen of updated discussion feature to internal"
                      width={1440}
                      height={1024}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
                <div className="column column-text">
                  <p>
                    <strong>After:</strong>
                  </p>
                  <ul role="list">
                    <li>
                      Discussion feature is internal, based on previous user
                      feedback
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="subsection-last">
            <div className="container-1232 full">
              <div className="container-680">
                <div className="heading-container h4-container">
                  <h3>5. Separated assignments page into 2 sections</h3>
                </div>
              </div>
              <div className="grid-long-text grid-2-col-first">
                <div className="column column-media">
                  <div className="image-wrapper-grid-stack">
                    <ZoomableImage
                      src="/images/09-before-screen-of-assignments.png"
                      alt="Screen of assignments page before"
                      width={1440}
                      height={1062}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
                <div className="column column-text">
                  <p>
                    <strong>Before:</strong>
                  </p>
                  <ul role="list">
                    <li>One section with all submitted and upcoming assignments</li>
                  </ul>
                  <p>
                    <strong>Feedback:</strong>
                  </p>
                  <ul role="list">
                    <li>
                      Users liked the concept of having a single source to
                      see assignments and feedback
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-long-text grid-2-col-last">
                <div className="column column-media">
                  <div className="image-wrapper-grid-stack">
                    <ZoomableImage
                      src="/images/10-after-screen-of-assignments.png"
                      alt="Screen of assignments page after"
                      width={1440}
                      height={1062}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
                <div className="column column-text">
                  <p>
                    My pilot run of usability testing sparked the idea to
                    create an &ldquo;upcoming work&rdquo; section
                  </p>
                  <p>
                    <strong>After:</strong>
                  </p>
                  <ul role="list" className="rich-list">
                    <li>
                      Divided assignments page into 2 sections - one for
                      submitted work and another for upcoming
                    </li>
                  </ul>
                  <p>
                    <strong>Feedback:</strong>
                  </p>
                  <ul role="list">
                    <li>Users found the division useful</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="section4" className="section">
        <div className="project-subsection">
          <div className="container-1232 full">
            <div className="container-title-and-list">
              <div className="eyebrow-and-headline-container">
                <h2 className="eyebrow">Final designs</h2>
                <h2>Putting it all together in high fidelity</h2>
              </div>
            </div>
            <div className="grid-long-text grid-2-col-first">
              <div className="column column-media double-image">
                <div className="dual-images-stacked">
                  <div className="dual-lightbox-video-wrapper">
                    <div
                      style={{ paddingTop: "56.17021276595745%" }}
                      className="w-embed-youtubevideo full-video"
                    >
                      <iframe
                        src="https://www.youtube.com/embed/939MqAISjYM?rel=0&controls=1&autoplay=0&mute=0&start=0"
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
                        title="BrainSprout reading progress indicator"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="column column-text">
                <div className="heading-container h4-container">
                  <p>
                    <strong>
                      Subtle yet impactful interactions let users access many
                      features without distracting screen clutter
                    </strong>
                  </p>
                </div>
                <div className="body-text-container">
                  <ul role="list">
                    <li>
                      The main navigation disappears and lesson options bar
                      compresses and &ldquo;sticks&rdquo; to the top as a
                      user scrolls down
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="grid-long-text grid-2-col-first">
              <div className="column column-media double-image">
                <div className="dual-images-stacked">
                  <div className="dual-lightbox-image-wrapper">
                    <ZoomableImage
                      src="/images/00-more-options-for-reading-lessons.png"
                      alt="Screen of reading lesson options expanded"
                      width={1532}
                      height={1044}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
              </div>
              <div className="column column-text">
                <div className="body-text-container">
                  <ul role="list">
                    <li>
                      Users are able to access more features under the
                      &ldquo;more options&rdquo; button, such as downloading
                      lessons
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="project-subsection">
          <div className="container-1232 full">
            <div className="grid-long-text grid-2-col-first">
              <div className="column column-media">
                <div className="lightbox-wrapper">
                  <ZoomableImage
                    src="/images/01-Features-to-help-users-retain-information.png"
                    alt="Reading lesson screen with audio player open and text highlighted to show bookmarking feature"
                    width={1512}
                    height={1024}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="column column-text">
                <div className="heading-container h4-container">
                  <p>
                    <strong>
                      Features to help users retain information
                    </strong>
                  </p>
                </div>
                <div className="body-text-container">
                  <ul role="list">
                    <li>
                      Audio option help users stay engaged with content,
                      especially valuable for neurodivergent learners
                    </li>
                    <li>
                      Reading progress indicator and bookmarking allow users
                      to see how long they have left, mark important
                      sections, and return to a lesson with ease
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="project-subsection">
          <div className="container-1232 full">
            <div className="grid-long-text grid-2-col-first long-shot">
              <div className="column column-media double-image">
                <div className="dual-lightbox-image-wrapper">
                  <ZoomableImage
                    src="/images/02-Time-estimates-on-course-overview_1.webp"
                    alt="Final design screen of course overview with progress and time tracking"
                    width={1512}
                    height={1838}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="column column-text">
                <div className="heading-container h4-container">
                  <p>
                    <strong>
                      Time estimates and progress indicators help learners
                      with time management and motivation
                    </strong>
                  </p>
                </div>
                <div className="body-text-container">
                  <ul role="list">
                    <li>
                      Course overview page with detailed time estimates,
                      including a learner&rsquo;s progress
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="grid-long-text grid-2-col-first">
              <div className="column column-media double-image">
                <div className="dual-lightbox-image-wrapper">
                  <ZoomableImage
                    src="/images/03-Time-estimates-on-lesson-side-outline-navigation_1.webp"
                    alt="Final design screen of video lesson with app side navigation expanded"
                    width={1512}
                    height={1024}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="column column-text">
                <div className="body-text-container">
                  <ul role="list">
                    <li>
                      Collapsible side navigation with time estimates so
                      learners can easily navigate through a lesson
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="project-subsection">
          <div className="container-1232 full">
            <div className="grid-long-text grid-2-col-first long-shot">
              <div className="column column-media">
                <div className="lightbox-wrapper">
                  <ZoomableImage
                    src="/images/04-Assignments-page.png"
                    alt="Final design screen of assignments page"
                    width={1512}
                    height={1838}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="column column-text">
                <div className="heading-container h4-container">
                  <p>
                    <strong>
                      Assignment tracking help learners track feedback easily
                      and stay motivated
                    </strong>
                  </p>
                </div>
                <div className="body-text-container">
                  <ul role="list">
                    <li>Single page source for assignments and feedback</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="project-subsection">
          <div className="container-1232 full">
            <div className="grid-long-text grid-2-col-first">
              <div className="column column-media">
                <div className="lightbox-wrapper">
                  <ZoomableImage
                    src="/images/05-Selected-search-result.png"
                    alt="Final design screen of selected search result"
                    width={1512}
                    height={1024}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="column column-text">
                <div className="heading-container h4-container">
                  <p>
                    <strong>
                      Comprehensive search helps users find information with
                      uncertainty
                    </strong>
                  </p>
                </div>
                <div className="body-text-container">
                  <ul role="list">
                    <li>
                      Searching displays matching results from the entire
                      course, including lesson titles, transcripts, etc.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="container-1232">
            <div className="container-680">
              <div className="content-container">
                <div className="heading-container h4-container">
                  <h3>Accessibility and Inclusivity</h3>
                </div>
                <div className="body-text-container">
                  <p>
                    In addition to these solutions, I worked on including
                    inclusive features for lessons (bionic text, audio only
                    options, etc). Check out{" "}
                    <Link href="/brainsprout-accessibility-features" className="link-accent">
                      <strong>this case study</strong>
                    </Link>{" "}
                    to learn more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="section5" className="section">
        <div className="project-subsection subsection-text-only">
          <div className="container-1232">
            <div className="container-680">
              <div className="container-title-and-list">
                <div className="heading-container">
                  <h2 className="eyebrow">Conclusion</h2>
                </div>
                <div className="heading-container">
                  <h2>Final thoughts and future visions</h2>
                </div>
                <div className="body-text-container">
                  <div className="heading-container h4-container">
                    <h3>Key takeaways</h3>
                  </div>
                  <ul role="list">
                    <li>
                      I really enjoyed working on a project that has the
                      potential to positively impact people
                    </li>
                    <li>
                      I learned the importance of adapting to new findings
                      based on ongoing research and feedback, recognizing
                      potential flaws in original success metrics
                      <ul role="list">
                        <li>
                          For example, online completion rates of online
                          courses are not a good measure of success, since
                          not everyone&rsquo;s goal is to complete a course,
                          but to learn something specific
                        </li>
                      </ul>
                    </li>
                    <li>
                      Interactions and user flows are much more complex than
                      I had imagined and I definitely gained an appreciation
                      for competing products already out there!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="project-subsection subsection-text-only">
          <div className="container-1232">
            <div className="container-680">
              <div className="body-text-container">
                <div className="heading-container h4-container">
                  <h3>Caveats</h3>
                </div>
                <ul role="list">
                  <li>
                    Limited resources skewed my interview participants to
                    higher-income individuals with post-secondary degrees or
                    white-collar jobs
                  </li>
                  <li>
                    Studies with more diverse socioeconomic backgrounds might
                    alter findings on common user challenges
                  </li>
                  <li>
                    Limited interview pool did not use mobile devices despite
                    millions of users leaving reviews for various learning
                    apps
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="project-subsection subsection-text-only">
          <div className="container-1232">
            <div className="container-680">
              <div className="body-text-container">
                <div className="heading-container h4-container">
                  <h3>Going forward</h3>
                </div>
                <p>
                  There are SO many potential areas to explore going forward!
                  Including&hellip;
                </p>
                <ul role="list">
                  <li>
                    How AI can help learners with scheduling and answering
                    questions in discussion forums
                  </li>
                  <li>
                    Talk to a more diverse group of people, including
                    socioeconomically disadvantaged, to understand their
                    unique challenges
                  </li>
                  <li>
                    Mobile solutions are a must - consider inclusivity and
                    the{" "}
                    <a href="https://blog.google/technology/next-billion-users/">
                      <strong>Next Billion Users</strong>
                    </a>
                  </li>
                  <li>
                    How can we provide more accurate time estimates for
                    lessons? Perhaps a feedback and rating strategy?
                  </li>
                  <li>
                    Implement a nudging and scheduling feature. Nudging can
                    help improve engagement by 30%!
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
