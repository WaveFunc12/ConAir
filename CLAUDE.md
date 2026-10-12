# ConAir website: guide for Claude

This repo is the new website for **קון אייר (CONAIR)**, a central air-conditioning business (VRF, multi-split, fan-coil/chiller, AC planning) for villas, luxury apartments, offices and commercial buildings. Old site: https://www.conair.co.il (WordPress). Built by Gal (GitHub `WaveFunc12`) and Kuhn together; each works with their own Claude.

## Team rules (read first)
1. **Never push without asking the human you work with.** Show them the change first (screenshots or a local preview), push only after an explicit yes.
2. **Every push includes a handoff file** in `docs/handoff/YYYY-MM-DD-short-name.md` written for the other person's Claude: what changed and why, decisions made, assumptions, what is still open, how to continue. Read the latest handoff files before you start.
3. Work on a branch and open a pull request unless the human explicitly asks to push to `main`.
4. User-facing text on the site is **Hebrew only, RTL**. Do not mix English words into Hebrew copy; brand names in Hebrew letters (תדיראן, דייקין, טושיבה, מיצובישי, אל־ג'י, סמסונג, וי־אר־אף).
5. **No real people's names** in demo content. The owner's name is not public, never put it on the site. Placeholder testimonials use invented names and must be replaced with real, approved quotes.
6. No em-dashes in site copy.

## Stack and layout
Static site, no build step. Netlify publishes `public/` (see `netlify.toml`). Netlify Forms collects the contact form (`name="contact"`).

```
public/
  index.html                 one-page home (all sections)
  privacy/  accessibility/   legal pages (same header/footer markup as home)
  404.html  robots.txt  favicon.svg
  assets/css/site.css        all styles, tokens at the top
  assets/js/site.js          all behavior (vanilla + GSAP), home-only parts guarded
  assets/js/gsap.min.js, ScrollTrigger.min.js (3.12.5), lenis.min.js (1.1.13)  self-hosted
  assets/fonts/              IBM Plex Sans Hebrew (Hebrew + Latin subsets), self-hosted
  assets/img/                project photos (webp) + greyscale brand logos (png) + og.jpg
docs/design.md               design system and decisions
docs/plan/                   first plan + grey wireframe (superseded by the built design)
docs/handoff/                one file per push, newest last
tools/shoot.js               Playwright screenshot script (desktop 1440 + phone 390)
```

Header and footer markup is duplicated in `index.html`, `privacy/index.html`, `accessibility/index.html`, `404.html`. If you change one, change all four (links on the sub pages are `/#section`).

## Design system (keep it)
- Palette tokens in `:root` of site.css: porcelain `#EEF1F1` page, night `#0F2430` text and the single dark section, frost `#1B6FA6` the only accent (CTAs), frost-hi `#7CC4EE` accent on dark, heat `#E39A55` only for "hot" temperatures in the story.
- One typeface: IBM Plex Sans Hebrew. Display weights 100-200, emphasis 500.
- Radius rule: buttons/chips pill, panels/photos 20px, inputs 12px.
- One CTA label for contact intent everywhere: "תיאום ביקור". WhatsApp is the secondary channel.
- Motion: hero thermostat counts 31° to 22° while the photo cools; pinned story section (6 split units become 1 roof unit, pipes draw, per-room temps); horizontal project pan on desktop; timeline fill. All of it is skipped with `prefers-reduced-motion` and the no-JS state shows final content.

## Behavior worth knowing
- `?src=tiktok` (or `utm_source=tiktok`) is stored in the hidden form field `source` and added to the WhatsApp prefilled text. Use it on the TikTok link.
- Choosing a property tab also preselects "סוג הנכס" in the form.
- Form posts to `/` (Netlify Forms). Locally it shows the error message, that is expected.

## Before launch on the real domain
- Remove `<meta name="robots" content="noindex">` from all pages and change `robots.txt` to allow crawling.
- Point www.conair.co.il to Netlify; old WordPress URLs are redirected in `netlify.toml`.
- Set Netlify form notifications to the business email.
- Replace placeholder testimonials, get sharper original photos (current ones are 768-1080px from the old site), confirm WhatsApp number (assumed same as phone 050-999-0735).

## How to check your work
```
cd public && python3 -m http.server 8765
node tools/shoot.js        # writes screenshots; edit OUT path inside
```
Check: no horizontal scroll at 390px, no console errors, hero CTA above the fold at 1280x720 and 390x844, reduced-motion renders all states.
