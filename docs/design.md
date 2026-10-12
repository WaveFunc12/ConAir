# Conair site, design notes (v1, 2026-10-12)

Design read: premium one-page site for villa / luxury-apartment owners, with TikTok phone traffic. Cold luxury, engineering-clean. Dials: variance 7, motion 6, density 3.

- Palette: porcelain #EEF1F1 (page), mist #DDE4E5, paper #F7F9F9, night #0F2430 (text + the one dark block), steel #546670, frost #1B6FA6 (only accent, CTAs), frost-hi #7CC4EE (on dark), heat #E39A55 (only as "hot" data in the temperature story).
- Type: IBM Plex Sans Hebrew only, self-hosted (public/assets/fonts). Display 100-200, emphasis 500.
- Radius rule: controls pill, panels/photos 20px, inputs 12px.
- Signature moment: hero thermostat counts 31 to 22 while the photo cools; pinned story "מנוע אחד. כל הבית." (6 split units become 1 roof unit + hidden pipes + per-room temps).
- Sections: header island, hero, brands, property tabs, story (dark, pinned), systems bento, projects (horizontal pan desktop / swipe phone), process timeline + "before the plaster" callout, quotes (PLACEHOLDER invented names), FAQ, contact form (Netlify Forms, name="contact"), footer, phone dock.
- Tracking: ?src=tiktok or utm_source=tiktok goes into hidden field "source" and the WhatsApp text.
- Assumptions to confirm: WhatsApp = 050-999-0735; quotes are placeholders; photos are the old site's 768-1080px originals (need sharper originals from the owner); no years/project counts invented.
- Libraries: gsap 3.12.5 + ScrollTrigger, lenis 1.1.13 (public/assets/js). Reduced motion and no-JS show the final states.
