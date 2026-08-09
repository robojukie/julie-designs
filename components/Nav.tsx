"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { scrollToSection } from "@/lib/scroll-to-section";

// Matches CSS "ease", used by the Webflow IX2 "Nav enter/exit only" actions.
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// The menu icon is a Lottie (documents/menu-lottie.json in the export), not a
// CSS hamburger: frames 0-30 are the two diagonal slashes, frame ~37 is the X.
// IX2 "mobile menu open" (a-110) runs the clip to 25% then 30.9%; "mobile menu
// close" (a-111) runs it back to 25%. At 120 total frames that's 30 and 37.08.
const MENU_FRAME_CLOSED = 30;
const MENU_FRAME_OPEN = 37.08;

// menu-lottie.json is 120 frames at 29.97fps, so the 7.08-frame closed->open
// segment runs in ~236ms at native speed. IX2 asks for 360ms (a-110's second
// group, and a-111's only group), so slow the clip to match rather than
// letting it play at whatever speed the file happens to be authored at.
const MENU_FPS = 29.97;
const MENU_DURATION_MS = 360;
const MENU_SPEED =
  (MENU_FRAME_OPEN - MENU_FRAME_CLOSED) / MENU_FPS / (MENU_DURATION_MS / 1000);

// The home page's work section. The export's "work" link is plain
// href="index.html"; deep-linking it to the section is ours.
const WORK_SECTION_ID = "projects-list";
const WORK_HREF = `/#${WORK_SECTION_ID}`;

const LINKS = [
  { href: WORK_HREF, label: "work" },
  { 
    href: "/documents/Julie-Paik-resume.pdf", 
    label: "resume", 
    external: true,
    target: "_blank",
    rel: "noopener noreferrer"
  },
  { href: "/writing", label: "writing" },
  { href: "/about", label: "about" },
];

export default function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuLottieRef = useRef<LottieRefCurrentProps>(null);
  const [menuAnimation, setMenuAnimation] = useState<object | null>(null);
  const menuIconPrimed = useRef(false);

  useEffect(() => {
    fetch("/documents/menu-lottie.json")
      .then((res) => res.json())
      .then(setMenuAnimation);
  }, []);

  // Driven off `mobileOpen` rather than the click handler so the icon also
  // follows the route-change reset below.
  useEffect(() => {
    const lottie = menuLottieRef.current;
    if (!lottie || !menuAnimation) return;
    if (!menuIconPrimed.current) {
      menuIconPrimed.current = true;
      lottie.setSpeed(MENU_SPEED);
      // Rest at frame 30 (IX2's 25%), not frame 0. Frames 0-30 are the icon
      // drawing itself in; the closed hamburger is the state at 25%, which is
      // also where "mobile menu close" returns to. Priming at 0 made the first
      // tap traverse 37 frames (~1.2s) instead of 7 (~0.36s) — the delay.
      lottie.goToAndStop(mobileOpen ? MENU_FRAME_OPEN : MENU_FRAME_CLOSED, true);
      return;
    }
    lottie.playSegments(
      mobileOpen
        ? [[MENU_FRAME_CLOSED, MENU_FRAME_OPEN]]
        : [[MENU_FRAME_OPEN, MENU_FRAME_CLOSED]],
      true
    );
  }, [mobileOpen, menuAnimation]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      const goingDown = y > lastScrollY.current;
      if (y < 60) {
        setHidden(false);
      } else {
        setHidden(goingDown);
      }
      lastScrollY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Publish the hidden state so anything else pinned below the navbar can move
     with it. The navbar keeps its 60px slot in the sticky stack and only
     TRANSLATES out of view, so a second sticky element offset by that 60px
     would otherwise hang below an empty band once the nav slid away.

     A data attribute on <html> rather than context or a store: the only
     consumer is CSS, this runs on every scroll direction change, and
     re-rendering this subtree to move an unrelated element elsewhere on the
     page would be the expensive way to do it. See .project-nav in
     styles/custom.css. */
  useEffect(() => {
    document.documentElement.dataset.navHidden = hidden ? "true" : "false";
  }, [hidden]);


  /* Keep `#projects-list` in the URL only while the work section is actually
     the section being viewed.

     Without this, the hash is sticky: navigating about -> work puts
     /#projects-list in the URL, and after scrolling back up the "work" link
     still points at the URL you are already on, so clicking it is a no-op and
     the section becomes unreachable from the nav.

     The test is "the section spans the middle of the viewport", not "any part
     of it is visible" — the section starts 613px down a 900px viewport, so it
     is already partly on screen at the top of the page and a plain visibility
     check would tag the hash on immediately at load.

     A scroll listener rather than an IntersectionObserver: the component
     already tracks scroll for the show/hide behaviour, one getBoundingClientRect
     per event is cheap, and unlike IO this is verifiable in the harness used to
     test it.

     replaceState, not pushState: this reflects where you are, it should not add
     history entries you then have to click Back through. */
  useEffect(() => {
    if (pathname !== "/") return;
    const section = document.getElementById(WORK_SECTION_ID);
    if (!section) return;

    const sync = () => {
      const rect = section.getBoundingClientRect();
      const middle = window.innerHeight / 2;
      const inSection = rect.top <= middle && rect.bottom >= middle;
      const has = window.location.hash === `#${WORK_SECTION_ID}`;
      if (inSection === has) return;
      window.history.replaceState(
        null,
        "",
        inSection
          ? `#${WORK_SECTION_ID}`
          : window.location.pathname + window.location.search
      );
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [pathname]);

  /* Scroll to the work section ourselves when we're already on the home page.
     The hash sync above is what makes the link clickable again, but this also
     covers the case where the hash happens to still be set — clicking "work"
     should always take you to the work section, never do nothing.

     scrollToSection owns the easing; see lib/scroll-to-section.ts. Its timing is
     deliberately independent of the page-transition timing in FadeIn.tsx. */
  const handleWorkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return; // let the router handle the cross-page jump
    const section = document.getElementById(WORK_SECTION_ID);
    if (!section) return;
    event.preventDefault();
    setMobileOpen(false);
    scrollToSection(section);
  };

  // Close the mobile menu on navigation. Done as a render-phase adjustment
  // rather than an effect: React applies it before painting, so the panel never
  // flashes open on the new route, and it also covers back/forward navigation
  // (which an onClick on the links would miss).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  return (
    <motion.div
      className="navbar w-nav"
      animate={{ y: hidden ? -60 : 0 }}
      transition={{ duration: hidden ? 0.4 : 0.3, ease: EASE }}
    >
      {/* The w-* classes are Webflow's base framework (styles/webflow.css) and
          carry real layout mechanics the custom stylesheet never duplicates —
          w-nav-link is position:relative/display:inline-block, w-nav-menu is
          float:right. The export's markup carries them, so ours must too.
          `data-collapse` is deliberately omitted: the base show/hide rules are
          scoped to it, and we drive the mobile menu from React state instead. */}
      <div className="container-1232 full container-nav w-container">
        <Link
          href="/"
          className={`brand social-link w-nav-link ${pathname === "/" ? "w--current" : ""}`}
        >
          Julie Paik
        </Link>
        <nav className={`nav-menu w-nav-menu ${mobileOpen ? "navMenuOpen" : ""}`}>
          <div className="nav-menu-dropdown">
            {LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  /* The resume is a PDF — opening it in the same tab replaces
                     the site and leaves Back as the only way home. */
                  target="_blank"
                  rel="noreferrer"
                  className="nav-link top-nav w-nav-link"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={link.href === WORK_HREF ? handleWorkClick : undefined}
                  className={`nav-link top-nav w-nav-link ${
                    link.href === "/about" ? "last" : ""
                  } ${pathname === link.href ? "w--current" : ""}`}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="nav-button">
              <a href="mailto:juliepaiktx@gmail.com" className="nav-link cta w-nav-link">
                Say hi!
              </a>
            </div>
          </div>
        </nav>
        {/* Kept as a real <button> for accessibility rather than the export's
            Lottie-in-a-div, but carrying the ported .menu-button class so the
            208px clip window (overflow:hidden + the icon's -88/-75 offset)
            behaves exactly as it does on the live site. */}
        <button
          type="button"
          className="menuButton menu-button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <div className="menu-animation" aria-hidden="true">
            {menuAnimation && (
              <Lottie
                lottieRef={menuLottieRef}
                animationData={menuAnimation}
                loop={false}
                autoplay={false}
              />
            )}
          </div>
        </button>
      </div>
    </motion.div>
  );
}
