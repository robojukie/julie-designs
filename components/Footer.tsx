import Image from "next/image";

export default function Footer() {
  return (
    <div className="section footer">
      {/* w-container carries the auto side margins and clearfix from
          webflow.css. Its max-width:940px is overridden by the more specific
          .container-1232.full, so it only contributes the centring. */}
      <div className="container-1232 full footer-holder w-container">
        <div className="footer-holder top container large">
          <div className="footer-text-wrapper">
            <div className="footer-text">thanks for stopping by!</div>
          </div>
          <div className="image-wrapper">
            <Image
              src="/images/smiling-dot.svg"
              alt=""
              width={64}
              height={64}
              className="image-1260"
            />
          </div>
        </div>
        <div className="footer-holder bottom">
          <div className="social-wrapper">
            <a
              href="https://www.linkedin.com/in/juliepaik/"
              target="_blank"
              rel="noreferrer"
              className="social-link nav-link"
            >
              LinkedIn
            </a>
            <div className="social-link social-divider">|</div>
            <a
              href="https://medium.com/designing-with-julie"
              target="_blank"
              rel="noreferrer"
              className="social-link nav-link"
            >
              Medium
            </a>
            <div className="social-link social-divider">|</div>
            <a
              href="https://github.com/robojukie"
              target="_blank"
              rel="noreferrer"
              className="social-link nav-link"
            >
              Github
            </a>
            <div className="social-link social-divider">|</div>
            <a
              href="mailto:juliespaik@gmail.com?subject=Hello!"
              className="social-link email nav-link"
            >
              say hello!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
