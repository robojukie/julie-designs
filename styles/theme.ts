/* Hand-maintained mirror of the CSS custom properties in styles/tokens.css,
   exposing them to JS/TS consumers (Motion animation values, inline styles).
   Every value is a var() reference into that file, so consumers stay in sync
   with the actual CSS without duplicating literals. Keep in lockstep with
   tokens.css. */

export const fonts = {
  textBodyFont: "var(--text-body-font)",
  headingFont: "var(--heading-font)",
} as const;

export const fontSize = {
  textSizeBodyDesktop125: "var(--text-size--body-desktop-1-25)",
  textSizeDisplayDesktopLarge: "var(--text-size--display-desktop-large)",
  textSizeHeadingH2Desktop: "var(--text-size--heading-h2-desktop)",
  textSizeHeadingH2Mobile: "var(--text-size--heading-h2-mobile)",
  textSizeHeadingH3Desktop: "var(--text-size--heading-h3-desktop)",
  textSizeHeadingH3Mobile: "var(--text-size--heading-h3-mobile)",
  textSizeTitleDesktop15: "var(--text-size--title-desktop-1-5)",
  textSizeTitleMobile: "var(--text-size--title-mobile)",
  textBodyTextSm: "var(--text--body-text-sm)",
  textSizeBodyMobile: "var(--text-size--body-mobile)",
  textSizeNavLinkPText: "var(--text-size--nav-link-p-text)",
  textFarewell: "var(--text--farewell)",
  textImageCaption: "var(--text--image-caption)",
  textPageTitleSmallSize: "var(--text--page-title-small-size)",
  textPageTitleSmallHeight: "var(--text--page-title-small-height)",
  textDisplayMed: "var(--text--display-med)",
  textSizeHeroLarge: "var(--text-size--hero-large)",
  textSizeHeroSmall: "var(--text-size--hero-small)",
  textSizeDisplayDesktopRegular: "var(--text-size--display-desktop-regular)",
  textSizeHeroXsmall: "var(--text-size--hero-xsmall)",
  textSizeDisplayMobile: "var(--text-size--display-mobile)",
  textPageSubtitleSm: "var(--text--page-subtitle-sm)",
  textPageSubtitleSmHeight: "var(--text--page-subtitle-sm-height)",
  h4Small: "var(--h4-small)",
  h4SmallHeight: "var(--h4-small-height)",
  textSizeEyebrowDesktop: "var(--text-size--eyebrow-desktop)",
  textSizeEyebrowMobile: "var(--text-size--eyebrow-mobile)",
  textSizeLabelMobile: "var(--text-size--label-mobile)",
  textSizeCaptionDesktop1125: "var(--text-size--caption-desktop-1-125)",
  textSizeCaptionMobile: "var(--text-size--caption-mobile)",
  textH3: "var(--text--h3)",
  textSizeHighlightDesktop: "var(--text-size--highlight-desktop)",
  textSizeHighlightDesktop80Height: "var(--text-size--highlight-desktop-80-height)",
  textSizeHighlightMobileCallout: "var(--text-size--highlight-mobile-callout)",
  textSizeHighlightMobileCallout72: "var(--text-size--highlight-mobile-callout-72)",
  textLight: "var(--text--light)",
  textSizeDisplayTablet: "var(--text-size--display-tablet)",
  textSizeDisplayThinDesktopLong: "var(--text-size--display-thin-desktop-long)",
  textSizeDisplayThinMobile: "var(--text-size--display-thin-mobile)",
} as const;

export const lineHeight = {
  textHeightBodyDesktopHeight18: "var(--text-height--body-desktop-height-1-8)",
  textHeightDisplayDesktopLargeHeight: "var(--text-height--display-desktop-large-height)",
  textHeightHeadingH2DesktopHeight: "var(--text-height--heading-h2-desktop-height)",
  textHeightHeadingH2MobileHeight: "var(--text-height--heading-h2-mobile-height)",
  textHeightHeadingH3DesktopHeight: "var(--text-height--heading-h3-desktop-height)",
  textHeightHeadingH3MobileHeight: "var(--text-height--heading-h3-mobile-height)",
  textHeightTitleDesktopHeight: "var(--text-height--title-desktop-height)",
  textHeightTitleMobileHeight: "var(--text-height--title-mobile-height)",
  textHeightBodyMobileHeight: "var(--text-height--body-mobile-height)",
  textHeightNavLinkHeight: "var(--text-height--nav-link-height)",
  textHeightImageCaptionHeight: "var(--text-height--image-caption-height)",
  textHeightDisplayTabletHeight: "var(--text-height--display-tablet-height)",
  textHeightHeroLargeHeight: "var(--text-height--hero-large-height)",
  textHeightHeroSmallHeight: "var(--text-height--hero-small-height)",
  textHeightDisplayDesktopRegularHeight: "var(--text-height--display-desktop-regular-height)",
  textHeightEyebrowDesktopHeight: "var(--text-height--eyebrow-desktop-height)",
  textHeightEyebrowMobileHeight: "var(--text-height--eyebrow-mobile-height)",
  textHeightLabelMobileHeight: "var(--text-height--label-mobile-height)",
  textHeightCaptionDesktopHeight16: "var(--text-height--caption-desktop-height-1-6)",
  textHeightCaptionMobileHeight: "var(--text-height--caption-mobile-height)",
  textHeightLabelDesktopLargeHeight: "var(--text-height--label-desktop-large-height)",
  textHeightDisplayMobileHeight: "var(--text-height--display-mobile-height)",
  textHeightDisplayThinDesktopLongHeight: "var(--text-height--display-thin-desktop-long-height)",
  textHeightDisplayThinMobileHeight: "var(--text-height--display-thin-mobile-height)",
} as const;

export const fontWeight = {
  textWeighttH2200: "var(--text-weightt--h2-200)",
  textWeighttBody300: "var(--text-weightt--body-300)",
  textWeighttEyebrow500: "var(--text-weightt--eyebrow-500)",
  textWeighttCaption200: "var(--text-weightt--caption-200)",
  textWeighttTitle500: "var(--text-weightt--title-500)",
  textWeighttDisplayWeight: "var(--text-weightt--display-weight)",
} as const;

export const colors = {
  ogColorsBlack1000: "var(--og-colors--black-1000)",
  colorPeach300: "var(--color--peach--300)",
  colorNeutralWarm400: "var(--color--neutral--warm--400)",
  colorBeige600: "var(--color--beige--600)",
  ogColorsBlackOg: "var(--og-colors--black-og)",
  colorBeige300: "var(--color--beige--300)",
  colorNeutralCool400: "var(--color--neutral--cool--400)",
  colorNeutral800: "var(--color--neutral--800)",
  colorNeutral100: "var(--color--neutral--100)",
  colorNeutralWarm200: "var(--color--neutral--warm--200)",
  colorPeach600: "var(--color--peach--600)",
  colorPinkColor: "var(--color--pink--color)",
} as const;

export const backgroundColors = {
  backgroundColorBackgroundCaseStudy: "var(--background-color--background-case-study)",
  backgroundColorBackgroundMain: "var(--background-color--background-main)",
  backgroundColorBackgroundBrainSprout: "var(--background-color--background-brain-sprout)",
  backgroundColorBackgroundLightPurple: "var(--background-color--background-light-purple)",
  backgroundColorBackgroundAccentBankgreen: "var(--background-color--background-accent-bankgreen)",
  backgroundColorBackgroundBlue: "var(--background-color--background-blue)",
  backgroundColorBackgroundLightBlue: "var(--background-color--background-light-blue)",
  backgroundColorBackgroundDarkBlue: "var(--background-color--background-dark-blue)",
} as const;

export const accents = {
  accentsBoldAccentHeading: "var(--accents--bold--accent-heading)",
  accentsBoldAccentHover: "var(--accents--bold--accent-hover)",
  accentsBoldMainBrandColor: "var(--accents--bold--main-brand-color)",
  accentsBoldSecondaryBrandColor: "var(--accents--bold--secondary-brand-color)",
  accentsBoldMainBrandDark: "var(--accents--bold--main-brand-dark)",
  accentsBoldAccent: "var(--accents--bold--accent)",
  accentsBoldBrainsproutLightestGreen: "var(--accents--bold--brainsprout-lightest-green)",
  accentsBoldAccentGreen: "var(--accents--bold--accent-green)",
  accentsBoldAccentDeepBlue: "var(--accents--bold--accent-deep-blue)",
  accentsBoldGreen: "var(--accents--bold--green)",
  accentsBoldPink: "var(--accents--bold--pink)",
  accentsBoldBlue: "var(--accents--bold--blue)",
} as const;

export const textColors = {
  textColorsTextPrimary: "var(--text-colors--text-primary)",
  textColorsTextLight: "var(--text-colors--text-light)",
  textColorsMutedDarkBlue: "var(--text-colors--muted-dark-blue)",
} as const;

export const surfaces = {
  surface: "var(--surface)",
} as const;

export const widths = {
  widthContainer680: "var(--width--container-680)",
  widthContainer800: "var(--width--container-800)",
  widthContainer1232: "var(--width--container-1232)",
  widthContainer1224: "var(--width--container-1224)",
  widthVideoWidth: "var(--width--video-width)",
} as const;

export const radii = {
  largeRadius: "var(--large-radius)",
  smallRadius: "var(--small-radius)",
  radiusXs: "var(--radius-xs)",
  radiusSm: "var(--radius-sm)",
  radiusMd: "var(--radius-md)",
  radiusLg: "var(--radius-lg)",
  radiusFull: "var(--radius-full)",
  radiusBanner: "var(--radius-banner)",
} as const;

export const shadows = {
  shadowColor: "var(--shadow-color)",
} as const;

export const misc = {
  light: "var(--light)",
  navLinkColor: "var(--nav-link-color)",
  translucentWhite: "var(--translucent-white)",
  divider: "var(--divider)",
  darkDarkDarkGrayBlue: "var(--dark-dark-dark-gray-blue)",
  beige: "var(--beige)",
} as const;

export const theme = {
  fonts,
  fontSize,
  lineHeight,
  fontWeight,
  colors,
  backgroundColors,
  accents,
  textColors,
  surfaces,
  widths,
  radii,
  shadows,
  misc,
} as const;

export default theme;
