# WebDev LMS Platform — Minimalist React Web Development Academy

A sleek, minimalist, and interactive Learning Management System (LMS) built with React and Vite. Designed to teach foundational and intermediate frontend development skills through structured curriculum tracks, live multi-tab code editing, sandboxed preview rendering, and an automated exercise validation engine.

![WebDev LMS](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80)

---

## 🚀 Key Features

### 1. Progressive 3-Track Curriculum (15 Interactive Lessons)
- **HTML Fundamentals (5 Lessons)**:
  - Document Skeleton & Headings
  - Hyperlinks & Accessible Media Assets
  - Lists & Structural Containers
  - Semantic HTML5 Layout (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`)
  - Interactive User Forms with Validations
- **Modern CSS Styling (5 Lessons)**:
  - CSS Selectors, High-Contrast Palettes & Typography
  - The CSS Box Model (`margin`, `padding`, `border`, `box-sizing: border-box`)
  - Flexbox Layout Basics (`display: flex`, `justify-content`, `align-items`, `gap`)
  - Flex Direction & Multi-Row Wrapping (`flex-direction`, `flex-wrap`)
  - Responsive CSS Grid Columns (`display: grid`, `repeat(3, 1fr)`)
- **JavaScript Programming (5 Lessons)**:
  - Variables & String Interpolation with Template Literals
  - DOM Element Selection & Dynamic Class Toggling (`classList.add`)
  - Interactive Event Listeners & Counter Logic
  - Programmatic Element Creation (`document.createElement`, `appendChild`)
  - Dynamic Array Iteration & List Rendering (`forEach`)

### 2. Live Multi-Tab Code Editor & Workspace
- **Three Dedicated Panes**: Multi-tab code editor supporting `index.html`, `style.css`, and `script.js`.
- **Developer Experience**:
  - Dynamic line-number gutter.
  - Smart tab handling (2-space soft tabs).
  - Reset to starter code action with confirmation safeguards.
  - Real-time preview reload.

### 3. Sandboxed Live Preview Engine
- Isolated `<iframe>` preview environment (`sandbox="allow-scripts allow-modals"`).
- Live evaluation of student HTML markup, embedded `<style>` sheets, and client `<script>` logic.
- Runtime error trapping without crashing the host application.

### 4. Automated Exercise Validation Engine
- Evaluates student solutions against rigorous criteria:
  - DOM element structure and hierarchy assertions.
  - TextContent matching (substring, regex, case-insensitive).
  - Attribute validation (`href`, `alt`, `target`, `name`, `placeholder`).
  - Computed style inspection (`color`, `display`, `grid-template-columns`, `box-sizing`, `gap`).
  - Interactive JS simulation (dispatches real DOM events and tests state mutation).
- Instant assertion checklist feedback (Passed ✅ / Failed ❌).
- Celebration banner upon passing with smooth transition to the next lesson.

### 5. Progress Tracking & Prerequisite Unlocking
- Real-time overall and track-specific percentage progress bars.
- Prerequisite unlocking: each track's first lesson is unlocked; subsequent lessons unlock sequentially upon completing preceding exercises.
- Completed lesson badges and visual indicators.

### 6. Firebase Authentication & Cloud Firestore Persistence
- **Dual Authentication**:
  - One-click Anonymous / Guest sign-in.
  - Email & Password registration and login.
- **Resilient Storage Architecture**:
  - Connects to Cloud Firestore collection `lms_progress/{userId}` when live credentials are provided.
  - Transparent, zero-crash fallback to browser `localStorage` when offline or in demo mode.
  - UI header connection badge (`● Cloud Synced` vs `○ Local Demo Mode`).

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler**: [Vite 8](https://vite.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/) + [Happy-DOM](https://github.com/capricorn86/happy-dom)
- **Backend / Persistence**: Firebase Modular SDK (Auth + Firestore) & LocalStorage Fallback Adapter
- **Styling**: Minimalist Modern CSS (Slate / Zinc dark palette with high-contrast accents)

---

## 📂 Project Architecture

```
react-webdev-lms/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx                       # Master state management & workspace coordinator
    ├── index.css                     # Minimalist dark theme design system
    ├── components/
    │   ├── Header.jsx                # Top bar with progress metric & auth triggers
    │   ├── TrackBar.jsx              # Track tabs & sequential lesson chips
    │   ├── LessonGuide.jsx           # Theory guide, instructions checklist, hints drawer
    │   ├── CodeEditorPane.jsx        # Multi-tab editor with line numbers & actions
    │   ├── PreviewFrame.jsx          # Sandboxed live rendering iframe
    │   ├── TestResultsDrawer.jsx     # Automated test report & completion celebration
    │   └── AuthModal.jsx             # Firebase / Guest auth dialog
    ├── data/
    │   └── lessonsData.js            # Curriculum specifications for 15 lessons
    ├── services/
    │   ├── firebase.js               # Firebase modular configuration & environment checks
    │   └── storageAdapter.js         # Unified resilient storage interface (Cloud / Local)
    ├── utils/
    │   └── exerciseValidator.js      # Headless DOM & style assertion engine
    └── __tests__/
        └── exerciseValidator.test.jsx # 28 Vitest unit & integration tests
```

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm / npm.cmd

### Installation
```bash
# Clone the repository
git clone https://github.com/kanadbekovboomu-bot/react-webdev-lms.git
cd react-webdev-lms

# Install dependencies
npm.cmd install
```

### Running the Application
```bash
# Start Vite development server
npm.cmd run dev
```

### Running Tests
```bash
# Run Vitest test suite
npm.cmd test
```

### Building for Production
```bash
# Build optimized production bundle
npm.cmd run build
```

---

## 🧪 Testing Verification

The test suite covers:
- HTML assertions (tags, attributes, text, nested structure).
- CSS computed style comparisons (RGB/Hex normalization, Flexbox, Grid, Box Model).
- JavaScript runtime executions (dynamic element creation, click simulations, array loops).
- Progress percentage mathematics & edge cases.
- Sequential lesson prerequisite unlocking.
- Sandboxed preview document generation.

Run `npm.cmd test` to verify that all 28 tests pass with 100% pass rate.

---

## 📄 License
MIT License. Built for education and portfolio showcase.
