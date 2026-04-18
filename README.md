# Eco Pantry

Eco Pantry is a mobile-first prototype that helps people decide what to cook using food they already have at home.

Live site: https://pjsamuel3.github.io/eco-pantry/

## Product goal (PR #1 spec)

Let users quickly take or upload a kitchen photo, confirm detected ingredients, and get practical meal ideas with simple steps.

## Target users

- Teenagers and beginner cooks
- Busy parents and households
- Students and time-poor users

## MVP scope

- Mobile-first web app for iPhone Safari and modern browsers
- Capture or upload a food photo
- AI-assisted ingredient detection (with user verification)
- Editable ingredient list (add/remove/confirm)
- Meal suggestions from available ingredients
- Basic recipe details, substitutions, and missing ingredient hints
- Clear caveat to verify ingredients before cooking

## Out of scope (MVP)

- User accounts
- Persistent pantry inventory
- Barcode scanning
- Automatic expiry/date tracking
- Grocery API integrations
- Native app packaging

## Technical constraints

- Static GitHub Pages deployment
- Single-file app (`index.html`) with embedded CSS/JS
- No framework/build tooling
- No client-side secret exposure (use proxy/serverless endpoint for AI in shared environments)
