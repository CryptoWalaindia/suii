# CryptoWala — Static Pages Developer Guide

> **Who this is for**: Anyone adding new Glossary series or entirely new sections (Learn, Blog, FAQ, etc.) to the CryptoWala site in the same editorial style.

---

## Table of Contents

1. [Project Architecture Overview](#1-project-architecture-overview)
2. [Adding a New Glossary Series](#2-adding-a-new-glossary-series)
3. [Adding a Brand-New Section](#3-adding-a-brand-new-section)
4. [Design System — CSS Tokens](#4-design-system--css-tokens)
5. [HTML Page Template](#5-html-page-template)
6. [Header & Footer HTML Snippets](#6-header--footer-html-snippets)
7. [Schema.org (SEO + AI) Patterns](#7-schemaorg-seo--ai-patterns)
8. [Vite Dev Server — Adding New Routes](#8-vite-dev-server--adding-new-routes)
9. [Adding Nav Links to the Main Site Header](#9-adding-nav-links-to-the-main-site-header)
10. [Quick Checklist for Any New Page](#10-quick-checklist-for-any-new-page)

---

## 1. Project Architecture Overview

```
suii-main/
├── src/
│   └── App.tsx              ← React SPA (main landing page only)
├── public/                  ← Static files served as-is by Vite
│   ├── glossary/
│   │   ├── index.html       ← /glossary/   (hub page)
│   │   ├── series-1/
│   │   │   └── index.html   ← /glossary/series-1/
│   │   └── series-2/ … series-7/
│   └── images/
└── vite.config.ts           ← Custom middleware routes static pages
```

**Key rule**: Everything inside `public/` is served as static HTML at its exact path.
`public/glossary/index.html` → `https://cryptowala.ai/glossary/`
`public/learn/index.html`    → `https://cryptowala.ai/learn/`

The **Vite dev server** has a custom middleware plugin (`staticGlossaryPlugin`) in `vite.config.ts` that serves these HTML files *before* the React SPA fallback intercepts them.

---

## 2. Adding a New Glossary Series

### Step A — Drop your PDF in

Put the new PDF in:
```
public/glossary/Glossary Series 8.pdf
```

### Step B — Extract text

Run the extraction script (Python + pdfplumber required):

```powershell
python "C:\Users\ummeh\.gemini\antigravity-ide\brain\a714e9e9-c052-44f8-97e4-57f3ab32b0ee\scratch\extract_glossary.py"
```

This reads all PDFs in `public/glossary/*.pdf` and saves raw text to `glossary_raw.json`.

> **Or** — if you have the content as plain text, skip extraction and go straight to Step C.

### Step C — Update SERIES_META in the build script

Open:
```
C:\Users\ummeh\.gemini\antigravity-ide\brain\a714e9e9-c052-44f8-97e4-57f3ab32b0ee\scratch\build_glossary.py
```

Find the `SERIES_META` dictionary and add your new series:

```python
SERIES_META = {
    1: {"title": "Bitcoin Basics", "desc": "..."},
    # ... existing series ...
    8: {
        "title": "Your New Series Title",
        "desc": "One-sentence description of what this series covers."
    },
}
```

Also update the `range(1, 8)` calls in the build script to `range(1, 9)` — there are **two** places:

```python
# In build_index_page():
for i in range(1, 9):   # was range(1, 8)

# In the MAIN BUILD section at the bottom:
for i in range(1, 9):   # was range(1, 8)
```

### Step D — Rebuild all pages

```powershell
python "C:\Users\ummeh\.gemini\antigravity-ide\brain\a714e9e9-c052-44f8-97e4-57f3ab32b0ee\scratch\build_glossary.py"
```

This regenerates `public/glossary/index.html` (with Series 8 card) and creates `public/glossary/series-8/index.html`.

---

### PDF Content Structure (what the parser expects)

The parser works best when each term in the PDF follows this heading structure exactly:

```
{number}. /glossary/{slug}
Meta Title
{Page title for Google}
Meta Description
{150-160 char description}
H1
{Full question, e.g. "What Is Bitcoin?"}
Quick Answer
{1-2 sentence plain answer}
Direct Definition
{Formal definition paragraph}
Simple Meaning
{Analogy or simplified explanation}
Why {Term} Matters
{Why it's important}
How {Term} Works
{How it functions}
Real-World Example
{Asha/Rahul example}
Common Misunderstanding
{What people get wrong}
Beginner Safety Note          ← optional
{Safety advice if applicable}
FAQs
{Question 1?}
{Answer 1}
{Question 2?}
{Answer 2}
Related Terms
● Term A
● Term B
```

> If the PDF uses a different structure, the parser will still extract what it can — sections it cannot find will simply be skipped.

---

## 3. Adding a Brand-New Section

Covers adding a completely new type of page — e.g., `/learn/`, `/blog/`, `/faq/`, `/about/`.

### Step A — Create the folder in `public/`

```
public/
└── learn/
    ├── index.html               ← /learn/   (hub page)
    └── what-is-bitcoin/
        └── index.html           ← /learn/what-is-bitcoin/
```

### Step B — Write the HTML using the page template

Copy the template from **Section 5** of this guide.
Copy the shared CSS from **Section 4** into the `<style>` tag.

### Step C — Update vite.config.ts to serve the new route

Open `vite.config.ts` and add your new path to the condition in `staticGlossaryPlugin`:

```typescript
// Find this in the middleware:
if (url.startsWith('/glossary/') || url === '/glossary') {

// Expand it:
if (
  url.startsWith('/glossary/') || url === '/glossary' ||
  url.startsWith('/learn/')    || url === '/learn'    ||
  url.startsWith('/faq/')      || url === '/faq'
) {
```

> ⚠️ Restart `yarn dev` after every change to `vite.config.ts`.

### Step D — Add a nav link to the React header

Open `src/App.tsx` and add a new `<a>` inside the left cluster `<div>`:

```tsx
{/* Left cluster: CONTACT + GLOSSARY + LEARN */}
<div style={{ display: "flex", alignItems: "center", gap: "40px" }}>

  {/* CONTACT dropdown — don't touch this */}
  <div ref={contactRef} ...>...</div>

  <a href="/glossary/" className="text-base md:text-lg font-semibold tracking-wide hover:text-gray-600 transition-colors" style={{ textDecoration: "none" }}>
    GLOSSARY
  </a>

  {/* NEW */}
  <a href="/learn/" className="text-base md:text-lg font-semibold tracking-wide hover:text-gray-600 transition-colors" style={{ textDecoration: "none" }}>
    LEARN
  </a>

</div>
```

Also add the same link to `header_html()` in `build_glossary.py`, then rebuild so glossary pages also show it.

---

## 4. Design System — CSS Tokens

Paste this block into every new page `<style>` tag.

```css
/* ── RESET ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body {
  background: #fff;
  color: #000;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; }
a:hover { opacity: 0.6; }

/*
  COLOUR PALETTE (black/white only)
  --black:        #000000    headings, card hover bg
  --white:        #ffffff    page bg, inverted text
  --gray-dark:    #1a1a1a    body text
  --gray-mid:     #555555    subtitles, card descriptions
  --gray-light:   #888888    section labels, meta text
  --gray-border:  #e5e7eb    dividers, card grid lines
  --gray-faint:   #f0f0f0    subtle term dividers

  TYPOGRAPHY SCALE
  Hero heading:    clamp(56px, 8vw, 96px)  font-weight:900  letter-spacing:-0.02em
  Page heading:    clamp(36px, 5vw, 64px)  font-weight:900  letter-spacing:-0.02em
  Term name:       clamp(22px, 3vw, 32px)  font-weight:900  text-transform:uppercase
  Section label:   10px  font-weight:700  letter-spacing:0.2em  text-transform:uppercase  color:#888
  Body text:       15px  line-height:1.75  color:#1a1a1a
  Small/nav text:  12-13px  font-weight:700  letter-spacing:0.1em

  SPACING SCALE
  Page padding desktop:  80px horizontal
  Page padding mobile:   24px horizontal
  Hero section:          64px top, 48px bottom
  Content sections:      48px top, 80px bottom
  Card inner padding:    36px 32px
  Vertical section gap:  24-32px

  CARD HOVER PATTERN
  Default:    background:#fff  color:#000
  Hover:      background:#000  color:#fff
  Transition: background 0.18s, color 0.18s
*/

/* ── HEADER ── */
.site-header {
  position: relative; z-index: 100;
  display: flex; justify-content: space-between; align-items: center;
  padding: 24px 80px;
  border-bottom: 1px solid #e5e7eb;
}
.header-left { display: flex; align-items: center; gap: 40px; }
.nav-link {
  font-size: 15px; font-weight: 600; letter-spacing: 0.08em;
  text-transform: uppercase; cursor: pointer; transition: opacity 0.15s;
  text-decoration: none; color: #000;
}
.nav-link.active { border-bottom: 2px solid #000; padding-bottom: 2px; }
.nav-link:hover { opacity: 0.5; }

/* ── FOOTER ── */
.site-footer {
  width: 100%; text-align: center;
  padding: 32px 24px; border-top: 1px solid #e5e7eb; margin-top: 80px;
}
.site-footer p { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 10px; }
.footer-links { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
.footer-links a { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
.footer-links a:hover { opacity: 0.5; }

@media (max-width: 768px) {
  .site-header { padding: 18px 24px; }
  .header-left { gap: 20px; }
  .nav-link { font-size: 13px; }
}
```

### Google Font import (always at the very top of `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
```

---

## 5. HTML Page Template

Copy-paste this skeleton for any new page. Replace ALL_CAPS placeholders.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="32x32" href="/images/suii 2.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">

  <title>PAGE TITLE | CryptoWala</title>
  <meta name="description" content="150-160 CHAR DESCRIPTION">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <link rel="canonical" href="https://www.cryptowala.ai/PATH/">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.cryptowala.ai/PATH/">
  <meta property="og:title" content="PAGE TITLE | CryptoWala">
  <meta property="og:description" content="DESCRIPTION">
  <meta property="og:image" content="https://www.cryptowala.ai/images/suii 2.png">

  <!-- See Section 7 for the right schema type -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "SECTION NAME | CryptoWala",
    "url": "https://www.cryptowala.ai/PATH/",
    "publisher": { "@type": "Organization", "name": "CryptoWala", "url": "https://www.cryptowala.ai" }
  }
  </script>

  <style>
    /* ── Paste full CSS from Section 4 here ── */

    .page-hero {
      padding: 64px 80px 48px;
      border-bottom: 1px solid #e5e7eb;
    }
    .page-hero h1 {
      font-size: clamp(56px, 8vw, 96px);
      font-weight: 900; letter-spacing: -0.02em; line-height: 1; margin-bottom: 20px;
    }
    .page-hero .subtitle {
      font-size: 13px; font-weight: 500; letter-spacing: 0.2em;
      text-transform: uppercase; color: #555;
    }

    /* Card grid for hub pages */
    .card-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1px; background: #e5e7eb;
      border-bottom: 1px solid #e5e7eb;
    }
    .card {
      display: flex; align-items: flex-start; gap: 20px;
      padding: 36px 32px; background: #fff;
      transition: background 0.18s, color 0.18s;
      text-decoration: none; color: #000;
    }
    .card:hover { background: #000; color: #fff; }
    .card-arrow { font-size: 18px; align-self: flex-end; transition: transform 0.18s; }
    .card:hover .card-arrow { transform: translateX(4px); }

    /* Article body for detail pages */
    .article-body {
      max-width: 800px; margin: 0 auto; padding: 48px 80px 80px;
    }
    .breadcrumb {
      font-size: 11px; letter-spacing: 0.15em;
      text-transform: uppercase; color: #888; margin-bottom: 16px;
    }
    .breadcrumb a { color: #888; }
    .article-body h1 {
      font-size: clamp(32px, 4vw, 52px);
      font-weight: 900; letter-spacing: -0.02em; margin-bottom: 16px;
    }
    .article-body hr { border: none; border-top: 2px solid #000; margin-bottom: 32px; }
    .article-body p { font-size: 15px; line-height: 1.75; color: #1a1a1a; margin-bottom: 20px; }
    .article-body h2 { font-size: 20px; font-weight: 700; margin: 32px 0 12px; }
    .back-link {
      display: block; padding: 24px 80px; width: 100%;
      font-size: 12px; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; border-top: 1px solid #e5e7eb;
    }
    .back-link:hover { opacity: 0.5; }

    @media (max-width: 1024px) { .card-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px)  { .article-body { padding: 32px 24px 60px; } .back-link { padding: 20px 24px; } }
    @media (max-width: 640px)  { .card-grid { grid-template-columns: 1fr; } .page-hero { padding: 40px 24px 32px; } }
  </style>
</head>
<body>

  <header class="site-header">
    <div class="header-left">
      <a href="/" class="nav-link" id="nav-contact">CONTACT</a>
      <a href="/glossary/" class="nav-link" id="nav-glossary">GLOSSARY</a>
      <!-- Add more links here as you create new sections -->
    </div>
    <a href="/" class="nav-link" id="nav-about">ABOUT</a>
  </header>

  <main>

    <!-- ═══ HUB / INDEX PAGE ═══ -->
    <div class="page-hero">
      <h1>SECTION TITLE</h1>
      <p class="subtitle">SHORT SUBTITLE IN UPPERCASE</p>
    </div>

    <div class="card-grid">
      <a href="/section/item-1/" class="card" id="card-item-1">
        <div>
          <div style="font-size:52px;font-weight:900;letter-spacing:-0.04em;line-height:1;margin-bottom:12px">01</div>
          <div style="font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:4px">ITEM LABEL</div>
          <div style="font-size:15px;font-weight:600;margin-bottom:8px">Item Title</div>
          <div style="font-size:13px;line-height:1.6;color:#555;transition:color 0.18s">Short description.</div>
        </div>
        <div class="card-arrow">→</div>
      </a>
      <!-- Repeat for each item -->
    </div>

    <!-- ═══ DETAIL / ARTICLE PAGE (use instead of hub) ═══ -->
    <!--
    <div class="article-body">
      <p class="breadcrumb"><a href="/section/">SECTION</a> &nbsp;/&nbsp; ITEM TITLE</p>
      <h1>ARTICLE HEADING</h1>
      <hr>
      <p>Your content here...</p>
      <h2>Subheading</h2>
      <p>More content...</p>
    </div>
    <a href="/section/" class="back-link">← BACK TO SECTION</a>
    -->

  </main>

  <footer class="site-footer">
    <p>©2025 - 2026. CRYPTOWALA.</p>
    <div class="footer-links">
      <span>ALL RIGHTS RESERVED.</span>
      <a href="/T&C CryptoWala.pdf" target="_blank" rel="noopener noreferrer">LEGAL.</a>
      <a href="/Privacy Policy CryptoWala.pdf" target="_blank" rel="noopener noreferrer">PRIVACY.</a>
      <a href="/Risk_Disclosure_CryptoWala.pdf" target="_blank" rel="noopener noreferrer">RISK.</a>
    </div>
  </footer>

</body>
</html>
```

---

## 6. Header & Footer HTML Snippets

### Header — mark current section as active

```html
<header class="site-header">
  <div class="header-left">
    <a href="/" class="nav-link" id="nav-contact">CONTACT</a>
    <a href="/glossary/" class="nav-link active" id="nav-glossary">GLOSSARY</a>
    <!-- add: <a href="/learn/" class="nav-link" id="nav-learn">LEARN</a> -->
  </div>
  <a href="/" class="nav-link" id="nav-about">ABOUT</a>
</header>
```

Add `active` class to whichever link matches the current page.
This adds a `border-bottom: 2px solid #000` underline automatically.

### Footer — same on every page

```html
<footer class="site-footer">
  <p>©2025 - 2026. CRYPTOWALA.</p>
  <div class="footer-links">
    <span>ALL RIGHTS RESERVED.</span>
    <a href="/T&C CryptoWala.pdf" target="_blank" rel="noopener noreferrer">LEGAL.</a>
    <a href="/Privacy Policy CryptoWala.pdf" target="_blank" rel="noopener noreferrer">PRIVACY.</a>
    <a href="/Risk_Disclosure_CryptoWala.pdf" target="_blank" rel="noopener noreferrer">RISK.</a>
  </div>
</footer>
```

---

## 7. Schema.org (SEO + AI) Patterns

### Hub / index page

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Learn Bitcoin | CryptoWala",
  "description": "Educational articles on Bitcoin and crypto for Indian beginners.",
  "url": "https://www.cryptowala.ai/learn/",
  "publisher": { "@type": "Organization", "name": "CryptoWala", "url": "https://www.cryptowala.ai" }
}
```

### Glossary series

```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "CryptoWala Glossary Series 8: Title",
  "url": "https://www.cryptowala.ai/glossary/series-8/",
  "publisher": { "@type": "Organization", "name": "CryptoWala", "url": "https://www.cryptowala.ai" },
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "name": "Term Name",
      "description": "Short definition.",
      "url": "https://www.cryptowala.ai/glossary/series-8/#term-slug"
    }
  ]
}
```

### Article / blog post

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What Is Bitcoin? A Beginner Guide for Indians",
  "description": "...",
  "url": "https://www.cryptowala.ai/learn/what-is-bitcoin/",
  "datePublished": "2026-06-08",
  "dateModified": "2026-06-08",
  "author": { "@type": "Organization", "name": "CryptoWala" },
  "publisher": {
    "@type": "Organization",
    "name": "CryptoWala",
    "logo": "https://www.cryptowala.ai/images/suii 2.png"
  }
}
```

### Breadcrumb (include on every sub-page)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home",    "item": "https://www.cryptowala.ai" },
    { "@type": "ListItem", "position": 2, "name": "Learn",   "item": "https://www.cryptowala.ai/learn/" },
    { "@type": "ListItem", "position": 3, "name": "Article", "item": "https://www.cryptowala.ai/learn/what-is-bitcoin/" }
  ]
}
```

---

## 8. Vite Dev Server — Adding New Routes

Edit `vite.config.ts`. Find the `isStaticRoute` check in `staticGlossaryPlugin` and extend it:

```typescript
const isStaticRoute =
  url.startsWith('/glossary/') || url === '/glossary' ||
  url.startsWith('/learn/')    || url === '/learn'    ||   // add
  url.startsWith('/faq/')      || url === '/faq'      ||   // add
  url.startsWith('/blog/')     || url === '/blog'          // add

if (isStaticRoute) { ... }
```

> Always restart `yarn dev` after editing `vite.config.ts`.

---

## 9. Adding Nav Links to the Main Site Header

In `src/App.tsx`, add `<a>` tags inside the left cluster `<div>`:

```tsx
{/* Left cluster */}
<div style={{ display: "flex", alignItems: "center", gap: "40px" }}>

  <div ref={contactRef} style={{ position: "relative" }}>...</div>

  <a href="/glossary/"
     className="text-base md:text-lg font-semibold tracking-wide hover:text-gray-600 transition-colors"
     style={{ textDecoration: "none" }}>
    GLOSSARY
  </a>

  {/* NEW SECTION */}
  <a href="/learn/"
     className="text-base md:text-lg font-semibold tracking-wide hover:text-gray-600 transition-colors"
     style={{ textDecoration: "none" }}>
    LEARN
  </a>

</div>
```

Also update `header_html()` in `build_glossary.py` to include the new link, then rebuild all glossary pages:

```powershell
python "C:\Users\ummeh\.gemini\antigravity-ide\brain\a714e9e9-c052-44f8-97e4-57f3ab32b0ee\scratch\build_glossary.py"
```

---

## 10. Quick Checklist for Any New Page

### New section hub (e.g. /learn/)
- [ ] Create `public/learn/index.html` from the template in Section 5
- [ ] Add `url.startsWith('/learn/')` to `vite.config.ts` middleware
- [ ] Restart `yarn dev`
- [ ] Add `<a href="/learn/">LEARN</a>` in `src/App.tsx` left cluster
- [ ] Add Schema.org `CollectionPage` JSON-LD in `<head>`
- [ ] Add `<link rel="canonical">` and OG tags
- [ ] Test at `http://localhost:5173/learn/` — must show HTML, not React app
- [ ] Update `context.md`

### New detail/article page (e.g. /learn/what-is-bitcoin/)
- [ ] Create `public/learn/what-is-bitcoin/index.html`
- [ ] Include breadcrumb: `LEARN / WHAT IS BITCOIN`
- [ ] Add Schema.org `Article` or `DefinedTerm` JSON-LD
- [ ] Add `<link rel="canonical">`
- [ ] Add `← BACK TO LEARN` link at the bottom
- [ ] Link to it from the hub `index.html`
- [ ] Test it loads in dev server
- [ ] Update `context.md`

### New Glossary series (e.g. Series 8)
- [ ] Drop PDF into `public/glossary/`
- [ ] Re-run `extract_glossary.py` to update `glossary_raw.json`
- [ ] Add entry to `SERIES_META` dict in `build_glossary.py`
- [ ] Update `range(1, 8)` → `range(1, 9)` in two places in build script
- [ ] Run `python build_glossary.py`
- [ ] Verify `/glossary/` shows Series 8 card
- [ ] Verify `/glossary/series-8/` loads with all terms
- [ ] Update `context.md`

---

## Reference — Scripts & Files

| Item | Path |
|---|---|
| PDF extractor | `.gemini/antigravity-ide/brain/.../scratch/extract_glossary.py` |
| HTML builder | `.gemini/antigravity-ide/brain/.../scratch/build_glossary.py` |
| Raw JSON cache | `.gemini/antigravity-ide/brain/.../scratch/glossary_raw.json` |
| Vite config | `suii-main/vite.config.ts` |
| React header | `suii-main/src/App.tsx` |
| Glossary pages | `suii-main/public/glossary/` |
| This guide | `suii-main/ADDING_NEW_PAGES.md` |

---

*Last updated: 2026-06-08 · CryptoWala*
