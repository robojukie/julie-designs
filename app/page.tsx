"use client";

import { useRef } from "react";
import HeroTitle from "@/components/HeroTitle";
import type { HiLottieHandle } from "@/components/HiLottie";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  const hiLottieRef = useRef<HiLottieHandle>(null);

  return (
    <div className="home">
      <div className="hero-section page-header-section">
        <div className="horizontal-container-right-to-top home">
          <div className="hero-text-container">
            {/* Trigger now covers all of "Hi I'm Julie", not just the icon —
                onClick doubles as the mobile trigger, since there's no hover there. */}
            <div
              className="page-title-container home"
              /* The wordmark reads as artwork, not prose: unselectable, and
                 the cursor keeps its resting dot rather than switching to the
                 text caret. Set here, on the wrapper around both the "Hi"
                 Lottie and the letters, because user-select inherits — one
                 attribute covers the whole mark. See styles/custom.css
                 section 14. */
              data-graphic-text
              onMouseEnter={() => hiLottieRef.current?.replay()}
              onClick={() => hiLottieRef.current?.replay()}
            >
              <HeroTitle ref={hiLottieRef} />
            </div>
            <FadeIn className="container-680 home-subtitle home-content">
              <div className="tagline-text">
                <p className="paragraph-home">
                  I&apos;m a product designer who{" "}
                  <a
                    href="https://github.com/robojukie"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <strong>codes</strong>
                  </a>
                  {", "}
                  specializing in B2B enterprise products
                </p>
                <p className="paragraph-home">
                  I love{" "}
                  <a href="https://www.juliepaik.com/about/#learning">
                    <strong>learning</strong>
                  </a>{" "}
                  and have{" "}
                  <a href="https://www.juliepaik.com/about/#hobbies">
                    <strong>many hobbies</strong>
                  </a>{" "}
                  that inspire my design process, hopefully sparking a smile along
                  the way :)
                </p>
                <p className="font-primary paragraph-home">
                  Currently designing at NovinoPath (laboratory information system,
                  EMR integration, AI image management system)
                </p>
              </div>
            </FadeIn>
          </div>
          <div className="captioned-image-home">
            <div className="image-credit">Image adapted from catalyststuff on Freepik</div>
          </div>
        </div>
      </div>
      <FadeIn id="projects-list" className="work home-content">
        <div className="work-wrapper">
          <div className="container-1224">
            <div className="project-grid">
              <div className="container-projects-pair">
                <ProjectCard
                  href="#"
                  disabled
                  thumbnailSrc="/images/NovinoPath-thumbnail-02.png"
                  thumbnailAlt=""
                  thumbnailClassName="novinopath-thumbnail"
                  width={768}
                  height={768}
                  sizes="(max-width: 767px) 100vw, 768px"
                  badge="Coming soon"
                  eyebrow="Product Design, Research, Product"
                  title="NovinoPath"
                  description="Scoping and streamlining multi-user information system"
                />
                <ProjectCard
                  href="/vac-redesign"
                  thumbnailSrc="/images/VAC-thumbnail.png"
                  thumbnailAlt=""
                  thumbnailClassName="vac-thumbnail"
                  width={768}
                  height={768}
                  sizes="(max-width: 767px) 100vw, 768px"
                  eyebrow="UX /UI Design"
                  title="Vineyard App Camp"
                  description="Streamlined complex workflows to increase company growth potential"
                />
              </div>
              <div className="container-projects-pair">
                <ProjectCard
                  href="/bank-green-gpe"
                  thumbnailSrc="/images/bank-green-thumbnail.png"
                  thumbnailAlt="Screenshot of Bank Green upload document site"
                  thumbnailClassName="bank-green-thumbnail"
                  width={768}
                  height={768}
                  sizes="(max-width: 767px) 100vw, 768px"
                  eyebrow="Product Design"
                  title="Bank Green"
                  description="Sped up bank sustainability ratings process by 40% and set stage for AI automation"
                />
                <ProjectCard
                  href="/brainsprout"
                  thumbnailSrc="/images/brainsprout-thumbnail.png"
                  thumbnailAlt="Screenshot of two cartoon robot characters holding a box with a heart on it."
                  thumbnailClassName="brainsprout-1-thumbnail"
                  width={512}
                  height={512}
                  sizes="(max-width: 512px) 100vw, 512px"
                  eagerLoad
                  eyebrow="Product Design"
                  title="BrainSprout"
                  description="Designing a comprehensive online learning web app"
                />
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
