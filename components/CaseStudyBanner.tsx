import Image from "next/image";

type CaseStudyBannerProps = {
  // Absent on brainsprout, which uses the bare .project-banner-section.
  color?: "blue" | "green" | "purple" | "orange";
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
  /* The export gives each banner image its own class — image-1257 on bank-green
     and vac, image-122 on the accessibility page, none on the rest. These are
     load-bearing, not cosmetic: .image-1257 is height:100% at desktop and
     max-height:180px at the narrowest breakpoint, and .image-122 differs again.
     An earlier version of this component applied a blanket inline
     `width:100%; height:auto`, which — being inline — beat every one of those
     rules and made all six banners size identically. */
  imageClassName?: string;
  // Mirrors the export's own sizes attribute, which differs per image.
  sizes: string;
  eagerLoad?: boolean;
  /* vac-redesign wraps its banner image in a Webflow lightbox anchor. The
     lightbox itself needs webflow.js, which we don't run, so the anchor gets no
     href — but it must stay an <a>. The export's stylesheet has a bare element
     rule, `a { max-width: 100%; max-height: 100% }`, and that max-height is
     what gives this wrapper a definite height for the image's `height: 100%`
     to resolve against. Rendered as a <div> it collapsed to the image's
     intrinsic size — 441x273 instead of 598x370. */
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
    <Image
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
