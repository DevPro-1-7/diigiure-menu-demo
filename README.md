# Suqiure — Landing Page

A premium, bilingual (Arabic / English) landing page for **Suqiure**, a desktop supermarket-management application by **Diigiure**.

Pure HTML5 + CSS3 + Vanilla JavaScript. No build step, no frameworks, no backend. Open `index.html` in a browser and it works.

## Structure

```
suqiure-landing/
├── index.html          All page markup and content structure
├── style.css           Design tokens + all component styles
├── script.js           Translations, interactive demo logic, language switch
├── assets/
│   ├── logo/            Place a real Suqiure logo file here if you have one
│   ├── screenshots/      Place real product screenshots here (see below)
│   └── icons/            Reserved for any custom icon assets
└── README.md
```

Icons throughout the page are inline SVG (no icon-font/library dependency), which keeps the page light and lets them inherit the purple accent color automatically.

## Refinement pass (Premium Experience Upgrade)

This is a second pass on top of the original landing page — nothing structural was rebuilt, it was elevated:

- **Real logo integrated.** The Suqiure logo you supplied now drives the navbar, footer, hero, favicon, and social-share metadata — colors untouched, nothing redrawn. `assets/logo/` contains the two source files plus generated favicons/touch-icons/OG image (all produced from your originals, not fabricated).
- **Hero elevated.** A small logo emblem now sits above the headline (logo → headline → interface, one visual system), plus a very light particle layer and a one-time orchestrated entrance animation (logo, then headline, then copy, then CTAs, then the interface mockup — staggered, not simultaneous).
- **Navbar goes compact on scroll** with a touch more blur, instead of just gaining a border.
- **Interactive preview now crossfades** between POS / Inventory / Products / Purchases / Reports instead of swapping instantly, and the "Screens" showcase does the same.
- **Reports got a real data-viz upgrade**: an animated SVG line chart ("Sales overview") that draws itself in, plus a top-products ranking list with animated bars — replacing the plain bar chart. KPI numbers count up.
- **New "From chaos to control" section** — the same five modules shown scattered and dim, then settling into an aligned, glowing row once you scroll to them. Built entirely from real UI chips, no illustrations.
- **Download button has real feedback**: it shows "Preparing your download…" briefly before handing off to `DOWNLOAD_URL`, instead of just being a static link.
- **Metadata done properly**: real title ("Suqiure — The Supermarket Operating System"), description, Open Graph + Twitter card tags, and a full favicon/touch-icon set — no more default "Vite App" style placeholders.
- Everything above is still plain HTML/CSS/vanilla JS — no charting library, no animation library, no framework.



1. **Download link.** Open `script.js` and set the real installer URL:
   ```js
   const DOWNLOAD_URL = "YOUR_DOWNLOAD_LINK";
   ```
   Until this is set, the "Download Suqiure for Windows" button safely links back to the download section instead of a broken URL.

2. **Version, release date, file size.** These are intentionally left out of the download section (only "Windows 10 / 11" and a placeholder note are shown) because the brief didn't provide real values. Once you have them, add them next to the existing `.download-meta` entries in `index.html`.

3. **Real product screenshots.** The "See Suqiure in action" section and the hero/preview mockups are currently built from live HTML/CSS components styled to resemble Suqiure's real modules (sales, inventory, products, reports), since no screenshot files were supplied. If you have real screenshots:
   - Drop them into `assets/screenshots/`.
   - In `index.html`, replace the `#screenHost` template calls in `script.js` (`screenTemplate()`) with `<img>` tags pointing at your files, or extend the switcher to swap image `src` instead of re-rendering HTML.

4. **Footer links.** No Instagram/website/contact links were provided, so the footer only shows the brand name, tagline, and copyright. Add real links only when you have them — never placeholder ones.

5. **Logo.** Already wired in from your two source files (`assets/logo/logo-icon.png` and `logo-horizontal.png`). If you get an updated logo later, just replace those two files with the same filenames and everything downstream (navbar, footer, hero emblem, favicons, OG image) will pick it up — or re-run the same crop/resize steps for a new file.

## Language & direction

- Click the "EN / عربي" button in the navbar to switch languages.
- Switching updates all text, flips the page direction (`dir="ltr"` ↔ `dir="rtl"`), and re-renders the demo data (product names, statuses, etc.) in the selected language — no page reload.
- The chosen language is remembered via `localStorage` (`suqiure-lang`) for the next visit.

## Interactive product preview

The "Everything your supermarket needs" section simulates five real Suqiure modules entirely client-side:

- **Point of Sale** — click products to add them to a live cart, remove items, choose a payment method, and complete a sale (a demo confirmation only — no real transaction).
- **Inventory** — a filterable table (All / In Stock / Low Stock / Out of Stock).
- **Products** — a card grid with price, quantity, and barcode.
- **Purchases** — a demo purchase-order list with supplier, date, total, and status.
- **Reports** — summary KPIs and a small animated bar chart, built with plain CSS/DOM — no charting library.

All data here is clearly marked "Demo data" and exists to demonstrate the interface, not to represent real transactions.

## Performance & compatibility

- Two Google Fonts are loaded (Plus Jakarta Sans for Latin script, IBM Plex Sans Arabic for Arabic) — everything else is system-drawn (SVG, CSS gradients), so there are no heavy image assets to load.
- No animation or charting libraries; all motion is CSS transitions/keyframes plus a small amount of vanilla JS, and `prefers-reduced-motion` is respected.
- Fully responsive from desktop down to mobile (the navbar collapses to a simple menu, grids stack, and no horizontal overflow is introduced).
