/* The banner screenshot opens the zoom, on every case study. In the export
   only vac-redesign's banner was a lightbox (hence lightboxWrapper below);
   the others are the same kind of image and now behave the same way. */
import ZoomableImage from "@/components/ZoomableImage";

type CaseStudyBannerProps = {
  // Absent on brainsprout, which uses the bare .project-banner-section.
  color?: "blue" | "green" | "purple" | "orange";
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
  /* The export gives each banner image its own class — banner-image-contain on bank-green
     and vac, banner-image-fixed-height on the accessibility page, none on the rest. These are
     load-bearing, not cosmetic: .banner-image-contain is height:100% at desktop and
     max-height:180px at the narrowest breakpoint, and .banner-image-fixed-height differs again.
     An earlier version of this component applied a blanket inline
     `width:100%; height:auto`, which — being inline — beat every one of those
     rules and made all six banners size identically. */
  imageClassName?: string;
  // Mirrors the export's own sizes attribute, which differs per image.
  sizes: string;
  eagerLoad?: boolean;
  /* vac-redesign wraps its banner image in the export's lightbox anchor. The
     anchor is now purely a sizing device — the zoom it used to trigger lives
     on the image itself (see components/ZoomableImage.tsx for why it sits
     there and not on a wrapper) — but it must still be an <a>. The export's
     stylesheet has a bare element rule, `a { max-width: 100%; max-height:
     100% }`, and that max-height is what gives this wrapper a definite height
     for the image's `height: 100%` to resolve against. Rendered as a <div> it
     collapsed to the image's intrinsic size — 441x273 instead of 598x370. */
  lightboxWrapper?: boolean;
};

export default function CaseStudyBanner({
  color,
  imageSrc,
  imageAlt,
  width,
  height,
  imageClassName,
  sizes,
  eagerLoad,
  lightboxWrapper,
}: CaseStudyBannerProps) {
  const image = (
    <ZoomableImage
      src={imageSrc}
      alt={imageAlt}
      width={width}
      height={height}
      sizes={sizes}
      loading={eagerLoad ? "eager" : "lazy"}
      className={imageClassName}
    />
  );

  return (
    <div className={`project-banner-section${color ? ` ${color}` : ""}`}>
      <div className="container-project-banner">
        <div className="project-header-image-wrapper">
          <div className="cover-screenshot-wrapper">
            {lightboxWrapper ? (
              <a className="project-hero w-inline-block">{image}</a>
            ) : (
              image
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
