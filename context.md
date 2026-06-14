# Project Context

## Overview
CryptoWala application.

## Tech Stack
React, Vite, Tailwind CSS.

## Recent Changes
- 2026-06-14
  - Summary: Repositioned BLOGS link to the right side of the header
  - Details:
    - Moved the BLOGS link from the left-side navigation cluster (`CONTACT` + `GLOSSARY`) to the right-side navigation cluster (`BLOGS` + `ABOUT`), placing it directly to the left of the `ABOUT` button.
    - Updated `src/App.tsx` header structure by creating a right-aligned flex container to hold both the `BLOGS` link and `ABOUT` dropdown button.
    - Processed all 76 static HTML glossary pages and 11 blog pages in `public/` to modify their header HTML and CSS, adding the `.header-right` styling container to maintain layout consistency site-wide.
  - Reason: User requested that BLOGS be placed on the left side of ABOUT in the header navigation.
  - Files Affected: `src/App.tsx`, all 76 static glossary HTML pages (under `public/glossary/`), and all 11 blog HTML pages (under `public/blogs/`).

- 2026-06-14
  - Summary: Added Blogs section — 11 static HTML pages (hub + 10 blog articles)
  - Details:
    - Created `public/blogs/index.html` — hub page with 10 blog cards in a 2-column grid, Schema.org `Blog` JSON-LD, editorial black/white design matching glossary style
    - Created 10 individual blog pages at `/blogs/<slug>/index.html` — each with: focused `<title>`, meta description, canonical URL, Schema.org `BlogPosting` JSON-LD, `BreadcrumbList` JSON-LD, PDF content extracted and rendered as structured HTML, prev/next article navigation
    - Blog articles cover: Bitcoin SIP guide, how SIP works, SIP vs volatile markets, Bitcoin SIP vs Mutual Fund SIP (×2), Bitcoin SIP vs Trading, Dollar-Cost Averaging, Bitcoin crash & SIP, 30% crypto tax India, ITR reporting guide
    - Updated `vite.config.ts`: extended `staticGlossaryPlugin()` middleware to also handle `/blogs/` routes
    - Updated `src/App.tsx`: added BLOGS nav link to left header cluster (after GLOSSARY)
    - Updated all 76 glossary HTML pages: added BLOGS nav link to their static headers
    - Generation done via Python script `scratch/build_blogs.py` using pdfplumber
  - Reason: User provided 10 blog PDFs in `public/blogs/` and requested they be published to a /blogs/ section using the same pattern as the Glossary section
  - Files Affected: `vite.config.ts`, `src/App.tsx`, `public/blogs/index.html`, `public/blogs/*/index.html` (10 new sub-pages), all 76 `public/glossary/` HTML files (header update)


  - Summary: Split each glossary series into individual term sub-pages (68 sub-pages created)
  - Details:
    - Created 68 individual `index.html` files at `/glossary/series-N/term-slug/` URLs (one per term)
    - Each term sub-page has: focused `<title>` (`What is X?`), meta description, canonical URL, Schema.org `DefinedTerm` JSON-LD, `FAQPage` JSON-LD, 4-level BreadcrumbList, full term content, prev/next term navigation
    - Updated all 7 series index pages from long-scroll format to term directory grid (cards linking to sub-pages)
    - Related term links updated from `#hash` fragments to real sub-page URLs (e.g., `/glossary/series-1/blockchain/`)
    - `vite.config.ts` unchanged — existing `staticGlossaryPlugin()` middleware already handles all `/glossary/` sub-paths
    - Generation done via Node.js script `scratch/generate-glossary-subpages.js`
    - Series breakdown: S1(10) + S2(12) + S3(10) + S4(10) + S5(10) + S6(8) + S7(8) = 68 terms
  - Reason: User wanted each glossary term to be directly crawlable by AI models (ChatGPT, Perplexity, Gemini, Claude) at a dedicated URL instead of a hash anchor on a shared series page
  - Files Affected: `public/glossary/series-1/` through `series-7/` (68 new sub-directories + 7 updated series index.html files)

- 2026-06-08
  - Summary: Added Glossary section — 8 static HTML pages with 68 crypto terms
  - Details:
    - Extracted text content from 7 Glossary PDF files (public/glossary/*.pdf) using pdfplumber
    - Generated `public/glossary/index.html` — hub page with 7 series cards (01-07), hover invert effect, Schema.org DefinedTermSet JSON-LD
    - Generated `public/glossary/series-1/` through `series-7/index.html` — each with: A-Z sticky sidebar, breadcrumb nav, per-term sections (Quick Answer, Definition, Simple Meaning, Why It Matters, How It Works, Example, Misunderstanding, Safety Note, FAQs, Related Terms), Schema.org DefinedTerm JSON-LD per term, BreadcrumbList schema
    - All pages: Inter font (Google), pure black/white editorial aesthetic, responsive grid, canonical URLs, OG tags
    - Modified `src/App.tsx` header: added GLOSSARY link (plain anchor to /glossary/) immediately right of CONTACT in a shared left flex container
    - Modified `vite.config.ts`: added staticGlossaryPlugin() middleware to serve /glossary/* from public/ HTML files before SPA fallback
    - Renamed public/Glossary → public/glossary (via copy-delete) for Linux case-sensitivity compatibility
    - Total: 68 terms across 7 series, fully crawlable by AI engines (ChatGPT, Claude, Gemini, Perplexity) and indexable by Google
  - Reason: User requested a Glossary section for AI crawlability, SEO discoverability, and content authority for CryptoWala
  - Files Affected: `src/App.tsx`, `vite.config.ts`, `public/glossary/index.html`, `public/glossary/series-1/index.html` through `series-7/index.html`


  - Summary: Updated contact email address site-wide
  - Details: Replaced all instances of `info@cryptowala.ai` with `contact@cryptowala.com` across 2 files — the visible contact dropdown link (both `href` and display text) in `App.tsx`, and the `email` field in both JSON-LD structured data schemas (Organization and FinancialService) in `index.html`.
  - Reason: User requested the contact email be changed from `info@cryptowala.ai` to `contact@cryptowala.com`.
  - Files Affected: `src/App.tsx`, `index.html`

- 2026-03-03
  - Summary: Fixed CONTACT and ABOUT header dropdowns
  - Details: Switched from unreliable CSS group-hover to React useState click-toggle dropdowns. Added `useRef` + `mousedown` listener to close on outside click. Fixed unclickable buttons by adding `position: relative; z-index: 10` to the header — the `main` element's negative margins were overlapping and blocking pointer events on the header.
  - Reason: Hover-based dropdowns were flickering due to mouse gap between trigger and panel. Buttons were unclickable due to main element overlapping header via negative margins.
  - Files Affected: `src/App.tsx`

- 2026-03-03
  - Summary: Fixed hover CSS mechanics on header links
  - Details: Restructured the parent-child relationships of the "ABOUT" and "CONTACT" header links in `App.tsx`. Added `p-2 -m-2` on the `group` parent to bridge the physical gap between the link and the absolute menu so the `group-hover` state doesn't drop when the mouse moves between them.
  - Reason: User reported that the hover menus weren't displaying, which happens when the mouse leaves the trigger target before reaching the menu.
  - Files Affected: `src/App.tsx`

- 2026-03-03
  - Summary: Added hover menu to About link
  - Details: Implemented a pure CSS (Tailwind `group-hover`) dropdown menu on the "ABOUT" header link in `App.tsx`. When hovered, it reveals a right-aligned mission statement paragraph about the CryptoWala platform.
  - Reason: User requested that an "about us" mission statement be shown when hovering over the "ABOUT" text.
  - Files Affected: `src/App.tsx`

- 2026-03-03
  - Summary: Added hover menu to Contact link
  - Details: Implemented a pure CSS (Tailwind `group-hover`) dropdown menu on the "CONTACT" header link in `App.tsx`. When hovered, it reveals an email address and phone number placeholder inside an absolute-positioned, shadow-styled box.
  - Reason: User requested that contact details (email and phone) be shown when hovering over the "CONTACT" text.
  - Files Affected: `src/App.tsx`

- 2026-03-03
  - Summary: Increased font size of header links
  - Details: Updated `App.tsx` header link containers from `text-sm` to `text-base md:text-lg`.
  - Reason: User requested "CONTACT" and "ABOUT" be made a bit bigger in size.
  - Files Affected: `src/App.tsx`

- 2026-03-03
  - Summary: Adjusted header padding inwards
  - Details: Increased horizontal padding on the header in `App.tsx` from `px-8` to `px-12 md:px-24`. 
  - Reason: User requested "CONTACT" be moved slightly right and "ABOUT" be moved slightly left, pulling them inward from the edges of the screen.
  - Files Affected: `src/App.tsx`

- 2026-03-03
  - Summary: Moved "ABOUT" link to the right side of header
  - Details: Updated `App.tsx` header to `justify-between`. Placed "CONTACT" in a left-aligned flex container and "ABOUT" in a right-aligned flex container.
  - Reason: User requested that the "ABOUT" link be moved from the left side to the right side of the header.
  - Files Affected: `src/App.tsx`

- 2026-03-03
  - Summary: Shifted the main content block upwards
  - Details: Changed `mt-8 md:mt-16` to `-mt-8 md:-mt-16` on the `<main>` element in `App.tsx` to pull the logo and text cluster significantly higher up the page, towards the header.
  - Reason: User requested that the logo and text cluster be moved upward.
  - Files Affected: `src/App.tsx`

- 2026-03-03
  - Summary: Reverted negative margins and fixed overlap
  - Details: Removed `-mb-8 md:-mb-12` and `-mt-2 md:-mt-4` which caused the text to overlap into the logo icon on the user's screen. Restored standard `mt-2` and `mt-4` margins to keep them close but legible.
  - Reason: The previous negative margin adjustment actually broke the UI by forcing the text into the logo graphic itself.
  - Files Affected: `src/App.tsx`

- 2026-03-03
  - Summary: Applied negative margins to bypass logo padding
  - Details: Added `-mb-8 md:-mb-12` to the `img` and removed `gap` to pull the title much closer, overriding the native whitespace inside the `logo.svg` file. Also added `-mt-2 md:-mt-4` to the subtitle to keep it tightly grouped.
  - Reason: User noticed the built-in padding of the SVG logo was preventing the text from getting close enough. Negative margins force the visual elements closer together.
  - Files Affected: `src/App.tsx`

- 2026-03-03
  - Summary: Reduced spacing between logo and text
  - Details: Updated `App.tsx` by changing the main content layout gaps. Reduced `gap-8` to `gap-2` and `mb-12` to `mb-2` while adding slight `mt-2` margins to bring the "CRYPTOWALA Application Launching Soon" text significantly closer to the newly enlarged logo.
  - Reason: User requested that the title and subtitle be moved upward, closer to the logo.
  - Files Affected: `src/App.tsx`

- 2026-03-03
  - Summary: Refined header and logo layout
  - Details: Removed "VIEWING NOW" and "NEWS" elements from the header in `App.tsx` keeping only left-aligned links. Increased the size of `logo.svg` from `h-40 md:h-64` to `h-56 md:h-80` and added `mt-16 md:mt-24` to the main element to push the logo further down the page.
  - Reason: User requested removing extra header elements to make it cleaner and requested the logo be larger and pushed further down.
  - Files Affected: `src/App.tsx`

- 2026-03-03
  - Summary: Complete layout overhaul based on design inspiration
  - Details: Completely redesigned `App.tsx` layout to match a provided minimalist inspiration image. Added a `header` element with navigation placeholders (ABOUT, CONTACT, NEWS) and a central "VIEWING NOW" text. Restructured the main content to emphasize the logo and bold "CRYPTOWALA" title without a divider line. Redesigned the footer to a solid, bold layout with explicit copyright and inline legal links separated by dots. Removed the previous subtle background gradient to enforce a stark, pure white and black aesthetic.
  - Reason: User provided an image of a brand layout ("TWENTY ONE / XXI") and requested inspiration be drawn from it to fill out the empty space.
  - Files Affected: `src/App.tsx`

- 2026-03-03
  - Summary: Added footer legal links and subtle visual enhancements
  - Details: Updated `App.tsx` with a fixed footer containing links to the `Privacy Policy`, `Terms & Conditions`, and `Risk Disclosure` PDFs stored in the `public/` folder. Also slightly polished the visual appeal by applying a `bg-gradient-to-br from-white to-gray-50` background to add subtle depth, and added a predefined `animate-fade-in-up` class to the central content for a smooth load interaction.
  - Reason: User requested adding links to legal documents in the footer and asked for ideas to make the page less empty. The enhancements maintain the minimal aesthetic while providing a more premium feel.
  - Files Affected: `src/App.tsx`

- 2026-03-03
  - Summary: Increased length of grey divider line
  - Details: Updated `App.tsx` padding on the divider from `w-16` to `w-32 md:w-48` to extend its horizontal length.
  - Reason: User felt the divider line was too short and needed to be increased.
  - Files Affected: `src/App.tsx`

- 2026-03-03
  - Summary: Increased logo size in header
  - Details: Updated `App.tsx` to double the size of the logo from `h-16` to `h-32 md:h-40` for better visibility, and adjusted margin/flex styling to accommodate.
  - Reason: User requested the logo be made much larger.
  - Files Affected: `src/App.tsx`

- 2026-03-03
  - Summary: Updated logo source and launch text
  - Details: Changed the logo source in `App.tsx` from `CRYPTOWALA.png` to `logo.svg`. Also updated the launching text from "Launching Soon" to "Application Launching Soon".
  - Reason: User requested to use the specific `logo.svg` from the public folder and adjusted the phrasing.
  - Files Affected: `src/App.tsx`

- 2026-03-03
  - Summary: Renamed App to CryptoWala and added Logo
  - Details: Updated `App.tsx` and `context.md` to change all instances of "Suii Finance" to "CryptoWala", and included the `CRYPTOWALA.png` logo in the main view.
  - Reason: User clarified the application is for CryptoWala and requested the logo be attached before the title.
  - Files Affected: `src/App.tsx`, `context.md`

- 2026-03-03
  - Summary: Reset landing page to minimal 'Launching Soon' view
  - Details: Removed all complex UI sections, animations, and dark mode features. Replaced `App.tsx` with a single minimal view stating "Launching Soon". Cleared out `index.css` leaving only Tailwind directives to enforce a plain white background.
  - Reason: User requested a complete reset to a minimal, plain white landing page for a finance application aesthetic.
  - Files Affected: `src/App.tsx`, `src/index.css`

- 2026-03-03
  - Summary: Initial creation of context.md
  - Details: Created context.md file to track changes as requested by user rules.
  - Reason: Adhering to project context rules to maintain a log of significant changes.
  - Files Affected: `context.md`
