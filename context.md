# Project Context

## Overview
CryptoWala application.

## Tech Stack
React, Vite, Tailwind CSS.

## Recent Changes
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
