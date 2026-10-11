---
name: forest-pixel-ui
description: Design system and build guide for websites, web apps, dashboards and landing pages with a nostalgic 8-bit / neo-brutalist look (hard 2px borders, hard offset shadows, graph-paper grids, mono micro-labels, square pixel icons, stepped "retro" motion) painted in a forest palette (moss #596a48, charcoal #212528, sage #999788, stone #c9c1b6, bark #403b35) with a matching energized leaf-green dark mode and a modern typeface (Space Grotesk + JetBrains Mono). Use this skill whenever the user asks for a retro, 8-bit, pixel, nostalgic, arcade, neo-brutalist, forest, earthy or green-themed UI, mentions "like quake.cash" or shares a screenshot of a bordered cream dashboard, or wants a light/dark themed site in this style — even if they never say "8-bit" or name this skill. Also use it for restyling an existing page into this look.
---

# Forest Pixel UI

A visual system that keeps the **structure** of 8-bit / neo-brutalist interfaces (everything is a hard-edged box, nothing is soft) but swaps the usual neon-arcade colors for a calm **forest palette**, and keeps the typography **modern** so the page feels nostalgic without feeling like a museum piece.

The reference look: a warm paper-colored dashboard, black 2px frames around every region, a single loud strip across the top (the ticker), three stat cells separated by hard dividers, tabs with a thick underline, and an empty state sitting on graph paper with a chunky button. This skill reproduces that grammar in greens.

## What's bundled

- `assets/forest-pixel.css` — the full system: tokens, light + dark themes, and every component (`.fp-*` classes). **Start from this file.** Copy it into a `<style>` block when delivering a single HTML file; link it only for multi-file projects.
- `assets/starter.html` — a working dashboard page (nav, ticker, stats, tabs, graph-paper panel, forms, table, modal, theme toggle, pixel icons, mobile layout). Copy it, then replace the content. It is the fastest route to something that already looks right.

Read the CSS file before writing any markup so you use the existing classes instead of re-inventing them.

## Workflow

1. **Pin down the subject, not the style.** The style is decided. Only ask a question if you truly don't know what the site is *for* (a dashboard, a portfolio, a game landing page...). Otherwise state your assumption in one line and build.
2. **Copy `starter.html` + `forest-pixel.css`** and strip the sampler sections you don't need.
3. **Compose with the layout recipe below.** Use real content and real copy; the grid and borders carry the design, so placeholder text makes it look empty.
4. **Keep both themes working.** Every color must come from a `--fp-*` semantic token, never a raw hex in a component. That is what makes dark mode automatic and correct.
5. **Run the checklist at the end** before delivering.
6. **Delivery format:** one self-contained `.html` file. Fonts come from Google Fonts (`Space Grotesk`, `JetBrains Mono`) with system fallbacks already in the CSS, so the page still looks right offline. No remote images; draw icons as pixel SVG (recipe below).

## Palette

The five base colors come from the user's Forest palette. The rest are extensions with the same warm, slightly desaturated undertone so nothing looks pasted in.

| Raw color | Hex | Used as |
|---|---|---|
| Moss | `#596a48` | Light-mode primary; dark-mode **shadow** color |
| Charcoal | `#212528` | Light-mode ink + borders; dark-mode card surface |
| Sage | `#999788` | Decoration and disabled states only (fails contrast as text) |
| Stone | `#c9c1b6` | Dark-mode borders |
| Bark | `#403b35` | Light-mode muted text |

Semantic tokens (what components actually use):

| Token | Light | Dark | Role |
|---|---|---|---|
| `--fp-bg` | `#e3dccf` | `#171a1c` | Page |
| `--fp-surface` | `#f3efe6` | `#212528` | Cards, panels, nav |
| `--fp-surface-2` | `#ebe5d8` | `#2a3033` | Hover rows, inset areas |
| `--fp-text` | `#212528` | `#e9e4d8` | Body text, icons |
| `--fp-muted` | `#403b35` | `#a5a393` | Labels, secondary text |
| `--fp-border` | `#212528` | `#c9c1b6` | Every frame and divider |
| `--fp-shadow` | `#212528` | `#596a48` | Hard offset shadows |
| `--fp-primary` | `#596a48` | `#8fbf63` | Main buttons, active tab, "good" |
| `--fp-on-primary` | `#ffffff` | `#171a1c` | Text on primary |
| `--fp-accent` | `#e6b93e` | `#f0c24a` | The ticker strip, warnings |
| `--fp-danger` | `#a8412c` | `#ee7d5f` | Destructive actions, errors |

**Why dark mode flips the primary to leaf green (`#8fbf63`):** moss `#596a48` is only ~3.0:1 against the dark page (and 2.6:1 on the dark card surface), which is too dim for a button label or an active-tab underline. Leaf green keeps the same hue family but is bright enough to feel alive on charcoal, and the `--fp-shadow` switching to moss gives dark mode its forest "glow" using a hard offset instead of a blur.

Measured contrast (WCAG): light text on surface 13.5:1, white on moss 5.9:1, ink on sun 8.4:1, white on rust 6.1:1; dark text on surface 12.2:1, muted on surface 6.1:1, ink on leaf 8.2:1, ink on ember 6.4:1, stone border on page 9.8:1. All body-text pairs clear AA.

**Color discipline.** Forest palettes are low-contrast by nature, so hierarchy has to come from borders and a *single* loud accent:
- One ticker/accent strip per page, at most. Its rarity is what makes it work.
- Green means "primary / positive". Don't also use it for decoration or you lose the signal.
- Danger color only for destructive actions and errors.
- Never put `--fp-primary` text directly on `--fp-bg` in dark mode without checking; use `--fp-text` for text and let green live in fills, underlines and icons.
- No gradients, no transparency tricks, no glows. The only soft thing allowed is the faint graph-paper grid.

## Typography (modern on purpose)

- **Space Grotesk** (400–700) for headings, body, buttons, big numbers. Geometric and a little quirky, so it reads modern while still having personality next to the pixel details.
- **JetBrains Mono** (400–700) for micro-labels, nav cells, badges, table headers, the ticker. This is the "terminal / HUD" voice that carries the retro feel.
- Do **not** use a pixel/bitmap font for headings or body: the brief is nostalgic *with a modern font*. The nostalgia comes from the boxes, shadows, grid and icons.
- Micro-labels: 11px mono, uppercase, `letter-spacing: .08em`, muted color. Big numbers: 700 weight, `tabular-nums`, tight tracking.
- Both fonts cover French accents (é è ê ç à œ) if the content is French.
- Alternatives if the user asks for a different feel: Sora, Outfit or DM Sans in place of Space Grotesk; IBM Plex Mono or Geist Mono in place of JetBrains Mono.

## The 8-bit grammar (what makes it feel right)

1. **Square everything.** `border-radius: 0` globally (already in the CSS). Round shapes break the spell, including LED dots (`.fp-led` is a square).
2. **2px frames** on every region, in `--fp-border`. Panels get a **6px bottom border** like a platform floor.
3. **Hard offset shadows**: `4px 4px 0 var(--fp-shadow)`, never blurred. Buttons lift on hover (`translate(-2px,-2px)`) and **press in** on active (`translate(4px,4px)`, shadow to 0), like a physical arcade button.
4. **Stepped motion.** Transitions use `steps(2, jump-none)` and animations use `steps()`; smooth easing looks modern, stepped looks 8-bit. Keep durations short (80ms).
5. **Graph paper** (`.fp-gridpaper`, 40px grid at ~7% opacity) behind empty states and hero areas, as in the reference.
6. **Pixel icons**, not icon fonts or rounded SVG sets (recipe below).
7. **Mono micro-labels** above every value, with a tiny pixel icon beside them.
8. **Stepped progress bars** (`.fp-progress`): a row of blocks like a health bar, not a smooth fill.
9. Optional garnish, used sparingly: a blinking block cursor `▌` (`.fp-blink`) in the ticker, a 4px dither strip (`.fp-dither`), stepped corners on fill-only tags (`.fp-pixel-corners`).

## Layout recipe (from the reference)

Top to bottom inside `.fp-shell` (max 1160px):

1. **Nav** `.fp-nav`: brand left (22px, 700, with a pixel icon), then bordered mono cells (`.fp-nav__cell`), the account cell in bold, and the theme switch last.
2. **Ticker** `.fp-ticker`: full-width accent strip glued to the nav's bottom edge, one line of live-feeling info.
3. **Stats** `.fp-stats`: three `.fp-stat` cells split by 2px dividers, each with label + icon on top and a big value near the bottom.
4. **Tabs** `.fp-tabs` / `.fp-tab`: text tabs, active one gets a 3px primary underline. A square `.fp-led` after a tab signals "new".
5. **Panel** `.fp-panel.fp-gridpaper` holding content, or `.fp-empty`: pixel icon, one sentence, one primary button.
6. Everything else (cards, tables, forms, modal, toast) from the CSS file.

For non-dashboard sites (landing page, portfolio, docs), keep the same atoms and change the arrangement: a hero is just a big `.fp-card` on grid paper with an `h1`, a ticker strip above it, and a primary + secondary button pair; feature sections are `.fp-stats`-style bordered cells; pricing or team grids are rows of `.fp-card`.

**Responsive:** below 720px stats stack with horizontal dividers, secondary nav cells hide (`fp-nav__cell--hide-sm`; add a menu button cell if the site has many links), panel padding tightens. Wide tables go inside `.fp-table-wrap` so only the table scrolls. The page body must never scroll sideways; test at 320px.

## Theme switching

Light/dark is driven by `data-theme` on `<html>`, falling back to the OS preference when unset. `starter.html` already contains the pieces: an inline `<head>` script that applies the saved theme before first paint, the two-button `.fp-theme` switch with `aria-pressed`, and the click handler. Wrap `localStorage` in try/catch (it can be unavailable). If you edit a token value, edit it in **both** dark blocks of the CSS (the media-query block and the `[data-theme="dark"]` block) and keep them identical.

## Pixel icon recipe

Draw icons as ASCII grids and render them as SVG rects with `shape-rendering="crispEdges"` and `fill="currentColor"`, so they inherit the theme color. `starter.html` has a `pixelIcon(name, size)` helper and ready icons: `tree, coin, trophy, star, heart, leaf, moon, sun`. To add one, add another 8-row string array, e.g.:

```js
key: ['..####..','.######.','###..###','##.##.##','##.##.##','###..###','.######.','..####..']
```

Render at an integer multiple of the grid (an 8-wide icon at 16, 24, 32 or 40px) or edges blur. Stay at 8×8 or 9×9 to keep the chunky look; detail makes it look like a modern icon set. Contextual icons (a leaf for "eco", a coin for money) beat generic ones.

## Accessibility (the style makes this easy to get wrong)

- Focus ring is a 3px solid `--fp-focus` outline with 3px offset; don't remove it. Heavy borders do not replace a focus state.
- Hover/press feedback uses movement, not just color, which also helps color-blind users.
- Icon-only buttons need `aria-label`; decorative pixel SVGs get `aria-hidden="true"`.
- Sage `#999788` and unstyled moss-on-dark fail as text; use them for decoration only.
- Respect `prefers-reduced-motion` (already handled for buttons and blink).
- Real `<button>`, `<nav>`, `<table>`, `<dialog>` elements, not styled divs.

## Final checklist

- [ ] Every region has a 2px `--fp-border` frame; no radius anywhere.
- [ ] Shadows are hard offsets only; no blur, no gradient fills.
- [ ] No hard-coded hex values in components: all through `--fp-*` tokens.
- [ ] Light and dark both checked; dark uses leaf green + moss shadows, not the light-mode moss for buttons.
- [ ] Exactly one accent (ticker) strip; green reserved for primary/positive.
- [ ] Fonts are Space Grotesk + JetBrains Mono, not a pixel font.
- [ ] Icons are pixel SVG at integer scale.
- [ ] No horizontal scroll at 320px; stats stack on mobile.
- [ ] Buttons lift on hover and press in on active.

## Anti-patterns

Rounded corners or pill buttons; drop-shadows with blur; purple/neon "cyberpunk" colors; a bitmap font for body text; emoji instead of pixel icons; pure `#000` / `#fff` surfaces (they fight the warm palette); many different accent colors; heavy decorative pixel art that competes with content. The look works because it is disciplined: boxes, one shadow style, one accent.
