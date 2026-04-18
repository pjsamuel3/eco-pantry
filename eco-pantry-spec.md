# Eco Pantry — Product Spec for Rapid MVP

Version: 0.1  
Status: Draft for AI-assisted prototyping  
Primary goal: Create a fast prototype that can be hosted on GitHub Pages and used on an iPhone as quickly as possible.

---

## 1. Executive summary

Eco Pantry is a mobile-first app that helps people decide what to cook using food they already have in their kitchen.

A user takes a photo of ingredients in a pantry, cupboard, fridge, or on a counter. The app uses AI to identify likely ingredients and then suggests simple meals based on those ingredients. The product is aimed at reducing food waste, saving time, and helping less experienced cooks make practical meals from what is already available.

The fastest route to a usable prototype is:

1. Build a mobile-first web app.
2. Host the frontend on GitHub Pages.
3. Let users upload or capture a photo.
4. Send the image to an AI service for ingredient extraction.
5. Generate meal suggestions from the detected ingredients.
6. Return easy recipes with substitutions and missing-item hints.

This avoids the complexity of native mobile development in the first iteration while still working on iPhone through Safari.

---

## 2. Product vision

Help households turn leftover or overlooked food into useful meals before the food is wasted.

---

## 3. Problem statement

People often have enough food at home to make a meal, but they do not know:

- what ingredients they already have
- what those ingredients can become
- which items should be used first
- whether some items may be nearing expiry

This leads to food waste, unnecessary shopping trips, decision fatigue, and frustration.

---

## 4. Target users

### Primary users

- Teenagers or young people, around 14–15+, who do not know what to cook
- Busy parents who need quick meal ideas from existing ingredients
- Households trying to reduce waste and save money

### Secondary users

- Students
- Shared households
- Time-poor professionals
- Sustainability-conscious consumers

---

## 5. Core user value

A user should be able to point the app at food they already have and quickly get realistic meal suggestions without manually entering a full inventory.

---

## 6. Product principles

- **Fast to prototype**: prioritize a working demo over perfect accuracy
- **Low-friction**: minimal typing, photo-first workflow
- **Useful over clever**: suggestions should be practical and simple
- **Mobile-first**: designed for phone usage in the kitchen
- **Incremental intelligence**: start with image-to-ingredient extraction, then add date awareness and pantry memory later

---

## 7. Scope decision

The conversation contains two possible implementation directions:

1. GitHub Pages + quick prototype
2. React Native + direct camera integration

For the MVP, choose **GitHub Pages + mobile-first web app**.

### Why

- It is the fastest way to get a prototype running
- It can still use the iPhone camera through browser upload/capture
- It avoids App Store and native build overhead
- AI tools can scaffold it quickly using static hosting constraints

### Technical implication

Because GitHub Pages only hosts static files, any AI call must go through:

- a serverless backend, or
- a proxy API endpoint, or
- a temporary manual API key during local development only

For production or shared testing, do **not** expose private API keys in client-side code.

---

## 8. MVP definition

### MVP goal

Recognize food from a user photo and return meal suggestions based on the identified ingredients.

### Included in MVP

- Mobile-first UI
- Capture photo or upload image
- Send image to AI for ingredient recognition
- Show editable detected ingredient list
- Generate meal suggestions from that list
- Show simple recipe instructions
- Highlight likely missing ingredients
- Show confidence caveat: “Check ingredients before cooking”

### Explicitly out of scope for MVP

- Persistent pantry inventory
- Automatic barcode scanning
- Automatic expiry date reading
- Real-time camera streaming recognition
- Shopping list integration
- Grocery APIs such as Oda
- User accounts
- Payment or subscriptions
- Native app packaging

---

## 9. Phase 2 definition

Phase 2 adds pantry intelligence.

### Included in Phase 2

- Date extraction from packaging where visible
- Manual correction of dates
- Pantry inventory stored per device/user
- Prioritization of foods that expire sooner
- “Use these first” suggestions
- Basic shopping list generation based on low or missing staples

---

## 10. Future roadmap

### Phase 3

- Barcode scanning
- Pantry memory over time
- Staple-item preferences
- Household profiles
- Better recipe personalization

### Phase 4

- Grocery basket generation
- Integration with Norwegian grocery APIs such as Oda if commercially and technically feasible
- Nutrition filters
- Cost estimation
- Native app or React Native build
- On-device AI exploration for live recognition

---

## 11. Primary user stories

### MVP user stories

- As a user, I want to take a photo of food in my kitchen so I do not need to type everything manually.
- As a user, I want the app to identify likely ingredients so I can see what the system thinks I have.
- As a user, I want to edit the ingredient list so I can correct mistakes.
- As a user, I want meal suggestions using those ingredients so I can cook something quickly.
- As a user, I want recipes that are simple and practical so I can actually make them.
- As a user, I want to know which ingredients are essential and which are optional.

### Phase 2 user stories

- As a user, I want the app to recognize expiry or best-before dates when possible.
- As a user, I want the app to prioritize ingredients that should be used soon.
- As a user, I want the app to remember my pantry over time so I do not need to rescan everything constantly.

---

## 12. MVP user flow

### Flow A: Photo to meal suggestion

1. User opens Eco Pantry on phone.
2. User taps “Take photo” or “Upload photo”.
3. User captures pantry, fridge, or countertop image.
4. App sends image to AI ingredient extraction service.
5. App displays detected ingredients as removable/editable tags.
6. User confirms or edits ingredients.
7. User taps “Suggest meals”.
8. App sends normalized ingredient list to recipe generation prompt/service.
9. App returns 3–5 meal suggestions.
10. User opens one suggestion.
11. App shows:
   - meal title
   - why it matches the ingredients
   - ingredients used
   - missing optional ingredients
   - short cooking steps
   - estimated time

### Flow B: Manual correction

1. AI detects “soy sauce”, “rice”, “tuna”, “salad”.
2. User adds “beans” manually.
3. User removes incorrect ingredient.
4. Suggestions refresh.

---

## 13. Functional requirements

### 13.1 Photo input

The app must:

- allow image upload from photo library
- allow direct camera capture on mobile browsers where supported
- compress image client-side before upload if possible
- show upload/processing state

### 13.2 Ingredient extraction

The app must:

- send the image to an AI service capable of image understanding
- request a structured list of visible food items and condiments
- return a normalized ingredient list
- distinguish between high-confidence and low-confidence detections where possible

### 13.3 Ingredient editing

The app must:

- show detected items as editable chips/tags
- allow add/remove/edit
- allow users to mark staple items manually

### 13.4 Meal suggestion generation

The app must:

- generate 3–5 meal suggestions from available ingredients
- prefer simple meals over aspirational or chef-style recipes
- prioritize low-complexity cooking steps
- include substitutions and optional extras
- clearly state when a suggestion requires one or two extra common items

### 13.5 Recipe display

Each recipe should include:

- title
- summary
- estimated cook time
- ingredients used from pantry
- optional missing ingredients
- 4–8 short steps
- difficulty level
- “why this works” explanation

### 13.6 Error handling

The app must:

- handle no-image-selected state
- handle failed AI response gracefully
- handle low-confidence recognition with a manual-entry fallback
- warn users that ingredient recognition may be imperfect

---

## 14. Non-functional requirements

### Performance

- First meaningful interaction on mobile should feel quick
- Ingredient extraction response target: under 10 seconds for prototype
- Recipe generation response target: under 8 seconds for prototype

### Usability

- One-thumb friendly layout
- Minimal text input
- Large buttons for kitchen use
- Clear contrast and readable typography

### Security

- No secret API keys in GitHub Pages frontend
- Use serverless backend or proxy for model access
- Do not store user photos unless explicitly required

### Privacy

- Default posture: process photo transiently and discard it
- Explain that images may be sent to an AI provider for analysis in prototype mode

### Maintainability

- Keep codebase simple and modular
- Prefer plain React + TypeScript + minimal dependencies
- Keep AI prompts in version-controlled files

---

## 15. Recommended architecture for the prototype

### Frontend

- **Framework**: React + TypeScript + Vite
- **Hosting**: GitHub Pages
- **Styling**: simple CSS modules or Tailwind if AI scaffolding speed is more important
- **State**: React state or Zustand

### Backend for AI calls

One of these options:

#### Option A — recommended for quick prototype
- GitHub Pages frontend
- Small serverless function on Cloudflare Workers, Vercel Functions, or Netlify Functions
- Function securely calls AI API

#### Option B — local-only demo
- Frontend runs locally with environment variables during development
- Not suitable for public deployment

### AI services

Two AI tasks are needed:

1. **Image understanding**: detect likely ingredients from the uploaded photo
2. **Recipe generation**: generate meals from the ingredient list

A single multimodal model may handle both, but the app should treat them as separate steps in code.

### Data storage for MVP

- No backend database required
- Keep session data in memory
- Optional: use localStorage for recent ingredients or preferences

---

## 16. Suggested information architecture

### Screens

1. **Home**
   - app title
   - short value proposition
   - button: take/upload photo
   - link: enter ingredients manually

2. **Processing**
   - spinner/loading state
   - message: identifying ingredients

3. **Detected ingredients**
   - editable ingredient tags
   - add ingredient input
   - button: suggest meals

4. **Meal suggestions**
   - cards for 3–5 meal ideas
   - short summary and cook time

5. **Recipe details**
   - steps
   - ingredient usage
   - optional additions

6. **Empty/error state**
   - helpful fallback and retry

---

## 17. UX notes for AI prototyping

The interface should feel simple, friendly, and practical.

### Tone

- non-judgmental
- helpful
- easy for inexperienced cooks

### Visual style

- clean
- modern
- kitchen-friendly
- not overloaded

### Example UI copy

- “What can I cook from this?”
- “We found these ingredients”
- “Use these before they go to waste”
- “Quick meals from what you already have”

---

## 18. AI prompt design guidance

### Ingredient extraction prompt intent

The model should:

- identify visible food items, condiments, packaged goods, and leftovers
- output a structured JSON array
- avoid overclaiming
- include confidence notes if uncertain

### Example output shape

```json
{
  "ingredients": [
    { "name": "tuna", "confidence": 0.92, "source": "visible can label" },
    { "name": "rice", "confidence": 0.71, "source": "container of cooked rice" },
    { "name": "soy sauce", "confidence": 0.89, "source": "bottle label" }
  ],
  "notes": [
    "Some items may be occluded or partially visible"
  ]
}
```

### Recipe generation prompt intent

The model should:

- generate simple meal ideas based primarily on available ingredients
- prefer realistic home cooking
- include optional substitutions
- keep instructions short
- avoid unsafe food assumptions

### Example output shape

```json
{
  "meals": [
    {
      "title": "Tuna Fried Rice",
      "time_minutes": 15,
      "difficulty": "easy",
      "uses": ["tuna", "rice", "soy sauce"],
      "optional_missing": ["egg", "spring onion"],
      "summary": "A fast stir-fry using leftover rice and pantry staples.",
      "steps": [
        "Heat a pan with a little oil.",
        "Add rice and break up any clumps.",
        "Stir in tuna and a splash of soy sauce.",
        "Add optional egg or chopped onion if available.",
        "Cook until hot and serve."
      ]
    }
  ]
}
```

---

## 19. Phase 2 requirements: date awareness

### Goal

Help users use food before it expires.

### Features

- Attempt OCR/date extraction from packaging
- Detect patterns like:
  - best before
  - use by
  - expiry date
- Allow user confirmation because OCR will often be unreliable
- Sort ingredients by urgency
- Add labels such as:
  - use today
  - use soon
  - safe for later

### Important caveat

Date recognition should be advisory only in early versions. The app must not make strong food safety claims.

---

## 20. Constraints and decisions

### Constraint 1: GitHub Pages

GitHub Pages cannot securely run secret AI API calls directly from static frontend code.

**Decision**: keep the frontend on GitHub Pages, but use a lightweight serverless proxy for AI requests.

### Constraint 2: Speed of delivery

A native iOS or React Native app will slow down the first prototype.

**Decision**: build mobile web first, then revisit Expo/React Native later.

### Constraint 3: Accuracy

Photo-based recognition will be imperfect, especially in cluttered fridges.

**Decision**: make ingredient correction a first-class part of the UX.

---

## 21. Acceptance criteria for MVP

The MVP is successful if:

1. A user can open the app on iPhone in Safari.
2. A user can capture or upload a kitchen image.
3. The app returns a list of detected ingredients.
4. The user can edit that list.
5. The app generates at least 3 recipe suggestions.
6. Each recipe includes title, time estimate, and steps.
7. The prototype can be deployed publicly as a frontend on GitHub Pages.

---

## 22. Suggested repo structure

```text
eco-pantry/
  README.md
  docs/
    index.html
  src/
    components/
      IngredientChips.tsx
      MealCard.tsx
      PhotoUploader.tsx
      RecipeView.tsx
    pages/
      Home.tsx
      Results.tsx
    lib/
      api.ts
      prompts.ts
      types.ts
      normalize.ts
    styles/
    App.tsx
    main.tsx
  public/
  functions/           # if using a serverless platform outside GitHub Pages build
  spec/
    eco-pantry-spec.md
```

Note: if using Vite for GitHub Pages deployment, configure the correct `base` path.

---

## 23. Recommended tech stack

### Fastest reasonable stack

- React
- TypeScript
- Vite
- GitHub Pages for frontend
- Serverless function for AI proxy
- OpenAI-compatible multimodal endpoint or other image-capable LLM

### Optional extras

- PWA manifest for “Add to Home Screen”
- localStorage for recent scans
- lightweight icon library

---

## 24. Suggested build sequence

### Step 1 — initialize project

- Create Vite React TypeScript app
- Configure GitHub Pages deployment
- Create mobile-first layout

### Step 2 — image input

- Add take photo/upload component
- Add preview state
- Add processing/loading state

### Step 3 — AI ingredient extraction

- Build serverless endpoint
- Send image to multimodal model
- Parse JSON response into ingredient tags

### Step 4 — ingredient confirmation

- Render editable tags
- Add manual add/remove
- Normalize obvious duplicates

### Step 5 — recipe generation

- Send confirmed ingredients to recipe prompt
- Render 3–5 meal cards
- Build detail view

### Step 6 — deployment

- Deploy frontend to GitHub Pages
- Deploy backend function separately
- Verify use on iPhone Safari

### Step 7 — polish

- Empty states
- Errors
- Better copy
- Basic saved session

---

## 25. AI coding assistant prompt starter

Use this when asking an AI coding tool to scaffold the app:

```text
Build a mobile-first React + TypeScript + Vite web app called Eco Pantry.

Goal:
A user uploads or captures a photo of food in their pantry, fridge, or kitchen. The app sends the image to a backend API for ingredient detection, then shows an editable list of ingredients, then generates 3-5 simple meal suggestions using those ingredients.

Constraints:
- Frontend must be static-hostable on GitHub Pages
- Do not expose secret API keys in the frontend
- Assume AI calls go through a separate serverless backend endpoint
- Optimize for iPhone Safari usage
- Keep the UI simple, clean, and practical

Features:
- Home screen with upload/camera input
- Loading state during image analysis
- Editable ingredient chip list
- Meal suggestion cards
- Recipe detail view with short steps, cook time, difficulty, used ingredients, and optional missing ingredients
- Error and empty states

Technical requirements:
- Use React + TypeScript
- Use a minimal dependency approach
- Create reusable components
- Define strong TypeScript types for ingredients and meals
- Keep API logic in a separate lib/api.ts file
- Make the design responsive and mobile-first

Please generate:
1. project structure
2. component files
3. TypeScript types
4. placeholder API client functions
5. starter CSS
6. GitHub Pages deployment notes
```

---

## 26. Example data model

```ts
export type DetectedIngredient = {
  id: string;
  name: string;
  confidence?: number;
  source?: string;
};

export type MealSuggestion = {
  id: string;
  title: string;
  summary: string;
  timeMinutes: number;
  difficulty: 'easy' | 'medium';
  uses: string[];
  optionalMissing: string[];
  steps: string[];
};
```

---

## 27. Risks and mitigations

### Risk: poor recognition in messy kitchen photos
**Mitigation**: editable ingredient list and manual input fallback.

### Risk: secret leakage in static hosting
**Mitigation**: use a serverless proxy for all AI requests.

### Risk: hallucinated recipes from weak ingredient detection
**Mitigation**: recipe generation must use confirmed ingredient list, not raw image.

### Risk: scope creep into inventory, OCR, barcode scanning
**Mitigation**: hold these for later phases and keep MVP narrow.

### Risk: users trust food safety advice too much
**Mitigation**: show clear disclaimers; do not make strong safety claims.

---

## 28. Success metrics for prototype

For a prototype, success can be measured qualitatively:

- Can a user understand the flow without explanation?
- Does the app detect at least some correct ingredients from a typical fridge/pantry photo?
- Are the resulting meal ideas practical enough that a user would try one?
- Can the prototype run on an iPhone via GitHub Pages-hosted frontend plus backend proxy?

---

## 29. Final recommendation

Do not start with React Native.

Start with a **mobile web prototype** that behaves well on iPhone, hosted on **GitHub Pages**, with a tiny **serverless AI backend**. That gives the fastest path from concept to live prototype while preserving a clean upgrade path toward:

- React Native / Expo
- barcode scanning
- expiry date recognition
- pantry history
- grocery API integration

---

## 30. One-sentence product definition

Eco Pantry helps users turn a quick photo of the food they already have into realistic meal suggestions, starting with a lightweight mobile web prototype and expanding later into pantry intelligence.

