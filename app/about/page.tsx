import Image from "next/image";
import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Who am I?",
  description: "Product designer and problem solver, positively shaping the human experience",
};

export default function About() {
  return (
    <FadeIn className="home">
      <div className="hero-section page-header-section">
        <div className="horizontal-container-right-to-top">
          <div className="hero-text-container">
            <div className="page-title-container no-botttom-padding">
              <div className="page-title">
                {/* Page titles read as artwork rather than prose — see
                    styles/custom.css section 14. */}
                <h1 className="hero-title-text main-page" data-graphic-text>
                  Who am I?
                </h1>
              </div>
              <div className="title-image">
                {/* width/height are the SVG's own dimensions — it is portrait,
                    344x407, and was declared 400x280: a landscape box for a
                    portrait drawing. The width/height *attributes* are then
                    neutralised by the :where(img[data-nimg]) reset in
                    custom.css, so .image-1262's max-height:280px sizes it the
                    way it sizes the export's plain <img>. Renders 176x208. */}
                <Image
                  src="/images/Me-on-laptop.svg"
                  alt="Girl with dark hair sitting on beanbag chair with laptop next to small side table with steaming green cup. Image adapted from catalyststuff on Freepik"
                  width={344}
                  height={407}
                  className="image-1262"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section about">
        <div className="subsection">
          <div className="container-680">
            <div className="main-text">
              <p>
                Hi, I&apos;m Julie (she/her), a Brooklyn-based product designer who
                {" "}
                {"{codes}"}. Currently, I&apos;m on a happiness journey, inspired by
                the{" "}
                <a
                  href="https://www.coursera.org/learn/the-science-of-well-being"
                  className="inline-link"
                >
                  Science of Well-Being
                </a>
                , and learning about the human brain. My goal is to{" "}
                <strong>joyfully shape the human experience through design</strong>.
              </p>
              <p>
                As a designer, I&apos;m{" "}
                {/* The export closes </strong> after "AI", leaving "’s
                    potential." unbolded — kept as-is rather than tidied. */}
                <strong>
                  excited about transforming legacy industries though technology and
                  designing ethical and inclusive products that leverage AI
                </strong>
                &rsquo;s potential.
              </p>
            </div>
            <div className="container-680">
              <div className="section-heading-wrapper">
                <h2 className="main-section-header">How I work</h2>
              </div>
              <div className="w-layout-grid _3-x-1-card-grid-shrinkng">
                <div className="icon-media-card">
                  <div className="display-icon-wrapper">
                    <Image src="/images/Lightbulb.svg" alt="" width={48} height={48} />
                  </div>
                  <div className="grid-item-single-title">Learn</div>
                </div>
                <div className="icon-media-card">
                  <div className="display-icon-wrapper">
                    <Image src="/images/Chat.svg" alt="" width={48} height={48} />
                  </div>
                  <div className="grid-item-single-title">Communicate</div>
                </div>
                <div className="icon-media-card">
                  <div className="display-icon-wrapper">
                    <Image src="/images/Flower.svg" alt="" width={48} height={48} />
                  </div>
                  <div className="grid-item-single-title">Adapt</div>
                </div>
              </div>
              <div className="main-text">
                <p>
                  <strong>
                    Learn
                    <br />
                  </strong>
                  When getting started, I build a strong understanding of the user,
                  industry, and stakeholders
                </p>
                <p>
                  <strong>
                    Communicate
                    <br />
                  </strong>
                  I engage early and often with users, engineers, and stakeholders to
                  make sure my work is aligned with product, development, and
                  business goals
                </p>
                <p>
                  <strong>
                    Adapt
                    <br />
                  </strong>
                  I readily adapt to changing priorities and deadlines, iterating
                  based on insights from data and user feedback
                </p>
              </div>
            </div>
          </div>
          <div className="container-680">
            <div className="heading-and-body-container">
              <h2 id="learning" className="main-section-header">
                My background and interests
              </h2>
              <div className="main-text">
                <p>
                  Before I entered tech, I studied social sciences 🧠, journalism 📰,
                  and architecture 📐, and worked in communications 📝 and education
                  🍎. I blend my{" "}
                  <a href="https://liberalarts.utexas.edu/plan2/about-plan-ii/">
                    interdisciplinary background
                  </a>{" "}
                  to tie together my technical knowledge with creative
                  problem-solving.
                </p>
              </div>
            </div>
            <div className="display-icon-wrapper">
              <Image src="/images/BookOpen.svg" alt="" width={48} height={48} />
            </div>
            <div className="main-text">
              <p>
                A lifelong learner, I&rsquo;m always curious about something new.
                Recently, I&apos;ve learned about how{" "}
                <a href="https://www.youtube.com/watch?v=Gg3YQbNxtaY">
                  downward learning
                </a>
                , or learning from someone more junior, creates stronger leaders. A
                big factor behind this is that{" "}
                <strong>
                  downward learners really look at the world from others&apos;
                  perspective, a critical skill when designing
                </strong>
                . It made me reflect on how I listen to and ask questions - if
                someone doesn&apos;t understand a concept, how can I better
                understand their struggles? It&apos;s something I want to actively
                practice, because it{" "}
                <strong>embraces two of my core values</strong> - empathy and
                humility.
              </p>
            </div>
          </div>
          <div className="container-680">
            <div className="display-icon-wrapper">
              <Image src="/images/Nature.svg" alt="" width={40} height={40} className="image-127" />
              <Image src="/images/Food.svg" alt="" width={40} height={40} className="image-129" />
              <Image src="/images/Plus.svg" alt="" width={40} height={40} className="image-128" />
            </div>
            <div className="main-text">
              <p>
                I&rsquo;m passionate about social issues such as climate change,
                education, healthcare. I&apos;m also interested fitness, fintech, and
                enterprise platforms.
              </p>
            </div>
          </div>
          <div id="hobbies" className="container-680">
            <div className="display-icon-wrapper">
              <Image src="/images/Sports.svg" alt="" width={40} height={40} className="image" />
              <Image src="/images/Microphone.svg" alt="" width={40} height={40} className="image-131" />
              <Image src="/images/GlobeAsia.svg" alt="" width={40} height={40} className="image-132" />
            </div>
            <div className="main-text">
              <p>
                In my free time you&apos;ll find me playing ultimate frisbee 🥏,
                climbing fake rocks 🧗, skiing ⛷, listening to podcasts 🎧, reading
                📖, drawing 🖌️, at a comedy show 🎭, and seeking out new places ✈️
                and activities 💃. (Can you tell I have many hobbies?)
              </p>
              <p>
                <a href="mailto:juliespaik@gmail.com" className="inline-link">
                  Say hello
                </a>
                ! I enjoy meeting people and would love to get to know you and share
                our experiences. Let&apos;s chat about design, something new
                you&rsquo;ve learned, or any one of my many hobbies (and potential
                future hobbies :D)!
              </p>
            </div>
          </div>
          <div className="container-680">
            <div className="section-heading-wrapper">
              <h2 className="main-section-header">My favorite podcasts to learn from</h2>
            </div>
            <div className="content-container">
              <div className="thumbnail-container-left-align">
                {/* w-inline-block is display:inline-block. Without it these
                    anchors are display:inline, so the cover images sit on the
                    text baseline and the row gains a descender-sized gap. */}
                <a
                  href="https://open.spotify.com/show/3i5TCKhc6GY42pOWkpWveG?si=3fcc0eec46e549c5"
                  className="w-inline-block"
                >
                  <Image
                    src="/images/image-125.png"
                    alt="the happiness lab podcast cover image"
                    width={104}
                    height={104}
                    className="podcast-image"
                  />
                </a>
                <a
                  href="https://open.spotify.com/show/20Gf4IAauFrfj7RBkjcWxh?si=08b70767ecaf4ffa"
                  target="_blank"
                  rel="noreferrer"
                  className="w-inline-block"
                >
                  <Image
                    src="/images/hidden-brain.png"
                    alt="hidden brain podcast cover image"
                    width={104}
                    height={104}
                    className="podcast-image"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
