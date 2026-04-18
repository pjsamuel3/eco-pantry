# Copilot Instructions — Eco Pantry

## What this is
Eco Pantry is a mobile-first prototype that helps people photograph available kitchen ingredients and get practical meal ideas quickly.

Hosted on GitHub Pages at https://pjsamuel3.github.io/eco-pantry/.

**Audience:** Teenagers, parents, students, and busy households using iPhone Safari in the kitchen.

---

## Stack — keep it simple
- **Single file:** everything in `index.html` — CSS in `<style>`, JS in `<script>`
- **No build tools, no frameworks, no npm**
- **Google Fonts only** as external dependency
- **Unsplash** for open-source photography (free, no attribution required)
- **GitHub Pages** compatible — no server-side code, relative paths only

---

## Design system

### Colour tokens
```css
--bg:          #f6faf7   /* page background */
--ink:         #16221f   /* primary text */
--accent:      #2b7a69   /* primary action colour */
--accent-bg:   #e3f3ef   /* tint of accent */
--hi:          #d47934   /* highlight / tag colour */
--card-bg:     #ffffff   /* card surface */
--card-border: #d6e3de   /* card border */
--muted:       #5c6f68   /* metadata, labels */
```

### Typography
| Role | Font | Usage |
|------|------|-------|
| Display | Fraunces | Hero title, section headings |
| Body | Inter | Descriptions, notes |
| UI | Inter | Card titles, buttons, nav |
| Mono | IBM Plex Mono | Tags, dates, metadata |

### Card colour rails
Left-edge 4px bar signals category:
- `rail-accent`  → Primary flow items
- `rail-green`   → Positive/success indicators
- `rail-blue`    → Informational notes
- `rail-hi`      → Low-confidence or warning states

### Badges
```html
<span class="badge badge-accent">[Label]</span>
<span class="badge badge-free">Free</span>
<span class="badge badge-warn">⚠️ Warning</span>
<span class="badge badge-book">Book ahead</span>
```

---

## Content structure

### Section IDs
| ID | Description |
|----|-------------|
| `#photo-title` | Photo upload/capture and processing states |
| `#ingredient-title` | Editable detected ingredients and manual additions |

### Adding a new card
```html
<article class="card fade-up">
  <div class="rail rail-accent"></div>
  <div class="card-inner">
    <span class="card-emoji" aria-hidden="true">🎯</span>
    <div class="card-body">
      <div class="card-row1">
        <h3 class="card-title">Title</h3>
        <div class="badges"><span class="badge badge-free">Free</span></div>
      </div>
      <p class="card-desc">Description.</p>
      <div class="card-meta"><span>🕐 Hours</span></div>
      <div class="card-actions">
        <a href="URL" target="_blank" rel="noopener" class="btn btn-primary">📍 Map</a>
      </div>
    </div>
  </div>
</article>
```

### Section chapter headers
Each section opens with a full-width photo header. Add a class to `.chapter-header`:
```css
.hero {
  background-color: var(--accent); /* fallback — always keep */
  background-image: linear-gradient(rgba(22,34,31,.62), rgba(22,34,31,.62)), url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1400&q=80');
}
```

---

## Conventions
- **Mobile-first:** 375px base, `@media (min-width: 640px)` for larger screens
- **Animations:** `.fade-up` class + `IntersectionObserver` adds `.in`
- **External links:** always `target="_blank" rel="noopener"`
- **Accessibility:** sections use `aria-labelledby` pointing to `h2`; backgrounds use `role="img" aria-label="..."`
- **No JS libraries** — vanilla only
- **No inline hex values** — all colours from CSS tokens

---

## PR workflow
- Branch: `feature/`, `fix/`, `content/`
- One logical change per PR
- Merge to `main` → auto-deploys (~60 seconds)
