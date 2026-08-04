# juliepaik.com

Julie Paik's design portfolio — a Next.js (App Router) + TypeScript rebuild migrated from my Webflow site

Main and staging branches are deployed on Vercel

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **[Motion](https://motion.dev)** (`motion/react`)
- **lottie-react**
- **next/font**
- Plain CSS

## Tools

- **Claude Code**
- **Claude Design**

## Pages

| Route                                 | Notes                                                      |
| ------------------------------------- | ---------------------------------------------------------- |
| `/`                                   | Home — hero, four project cards                            |
| `/about`                              |                                                            |
| `/writing`                            | Post list fetched live from the Medium RSS feed at runtime |
| `/bank-green-gpe`                     | Case study                                                 |
| `/vac-redesign`                       | Case study                                                 |
| `/brainsprout`                        | Case study                                                 |
| `/brainsprout-accessibility-features` | Case study sub-page                                        |
| `/401`                                | Password-gate page, visual replica only (see NOTES.md)     |
| 404                                   | `app/not-found.tsx`                                        |
