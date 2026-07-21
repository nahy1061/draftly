# Draftly

A privacy-first resume builder that runs entirely in the browser. No accounts, no servers, no data ever leaves your machine. Build, preview, and export a polished resume in minutes.

> 🔗 **Live Demo:** https://draftly-pearl.vercel.app/

## Screenshots

<!-- Add screenshots here -->

## Features

- **4 professional templates** — Professional, Modern, Minimal, and ATS-Friendly
- **Live preview** — see changes reflected instantly as you type
- **Click-to-edit** — click any section in the preview to jump straight to its form
- **Drag to reorder** — rearrange resume sections in both the editor and preview
- **Skip sections** — hide sections you don't need without losing their data
- **Swipe navigation** — swipe left/right on mobile to move between sections
- **Print / Save PDF** — exports directly via the browser print dialog, no third-party service
- **Auto-save** — all data is saved to localStorage automatically on every change
- **Dark mode** — full dark/light theme toggle with preference persistence
- **100% client-side** — nothing is sent to any server

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI |
| Vite | Build tool & dev server |
| Tailwind CSS v4 | Styling |
| Formik + Yup | Form state & validation |
| dnd-kit | Drag-and-drop section reordering |
| react-to-print | PDF export via browser print |
| react-router-dom v7 | Client-side routing |
| localStorage | Persistence (no backend) |

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

```bash
# Production build
npm run build

# Preview the production build locally
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Builder/          # Header, main layout, edit + preview columns
│   ├── ResumeForm/       # Per-section form components (education, experience, etc.)
│   ├── ResumePreview/
│   │   ├── sections/     # Per-section preview renderers
│   │   ├── shared/       # Drag, scale, click-to-edit wrappers
│   │   └── templates/    # Professional, Modern, Minimal, ATS templates
│   ├── SectionPicker/    # Reorder / skip sections modal
│   └── SkillInput/       # Tag-style input for skills and interests
├── context/
│   ├── ResumeContext.jsx  # Global resume state (useReducer + localStorage)
│   ├── BuilderNavContext.jsx  # Active section, tab, and nav logic
│   └── ThemeContext.jsx   # Dark/light mode
├── hooks/
│   ├── useAutoEditEntry.js    # Opens an entry for edit when clicked in preview
│   ├── useLocalStorage.js     # Auto-persists state to localStorage
│   ├── useSectionDragDrop.js  # dnd-kit sensors and drag end handler
│   └── useSwipeNavigation.js  # Touch swipe → section navigation
├── pages/
│   ├── Home.jsx          # Landing page
│   └── Builder.jsx       # Main builder page
└── utils/
    ├── calculateDuration.js   # Human-readable duration from date range
    ├── constants.js           # Shared labels and proficiency levels
    ├── formatDate.js          # "YYYY-MM" → "Jan 2024"
    ├── generateID.js          # crypto.randomUUID wrapper
    ├── sectionMeta.js         # List of sections that hold multiple entries
    └── validationSchemas.js   # Yup schemas for all forms
```

## Data & Privacy

All resume data is stored exclusively in your browser's `localStorage` under the key `draftly-resume`. Clearing site data or using a different browser will clear your resume. There is no sync, no backup, and no external requests.

## Known Limitations

- **No cross-device sync** — data lives in localStorage, so switching browsers or devices starts from scratch
- **No undo/redo** — changes are applied immediately with no history to step back through
- **PDF quality is browser-dependent** — print output can vary slightly between Chrome, Firefox, and Safari
- **No image export** — only browser print / Save as PDF is supported, not direct PNG/JPG download
- **localStorage cap** — browsers typically limit localStorage to ~5MB; very large profile photos encoded as base64 can hit this
- **No resume import** — there's no way to load an existing resume file; you start from scratch each time
