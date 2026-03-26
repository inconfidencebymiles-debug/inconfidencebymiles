# Changes Summary: QR Hub Page + Reseñas Blocks

## TASK 1: Created `qr.html`
- New mobile-first hub page (QR code destination / Linktree replacement)
- Dark speakeasy aesthetic matching carta pages
- Same CSS variables, fonts (Zodiak + General Sans), max-width 540px
- Logo, intro text, 6 link buttons (menus, Google review, WhatsApp, Instagram)
- Cookie consent banner (Spanish), anti-copy script, Perplexity ASCII art comment

## TASK 2: Fixed "Metuzalem" → "Matusalem"
- `carta.html` line 252: "Metuzalem 15 Rum" → "Matusalem 15 Rum"
- (Note: the occurrence was in carta.html, not carta-miles.html)

## TASK 3: Added "Reseñas & sorpresa" block
- Inserted before `<footer class="carta__footer">` in:
  - `carta.html`
  - `carta-miles.html`
  - `carta-tapas.html`
- Block includes heading, two paragraphs, and Google review CTA button

## TASK 4: Changed "← Volver al sitio" link target
- `carta.html`: `href="./"` → `href="./qr"`
- `carta-miles.html`: `href="./"` → `href="./qr"`
- `carta-tapas.html`: `href="./"` → `href="./qr"`

## TASK 5: Replaced Linktree URLs with `./qr`
- 15 files updated (all had `https://linktr.ee/miles.lounge.barcelona`):
  - index.html, ca.html, en.html, fr.html
  - agencias.html, agencias-ca.html, agencias-en.html, agencias-fr.html
  - eventos.html, eventos-ca.html, eventos-en.html, eventos-fr.html
  - inconfidence.html, inconfidence-en.html, inconfidence-fr.html
- Also removed `target="_blank" rel="noopener noreferrer"` since links are now internal
- Link text ("Menu" / "Menú") preserved as-is
