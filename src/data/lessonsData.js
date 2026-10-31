// Comprehensive curriculum data for LMS platform: 3 tracks x 5 lessons = 15 structured lessons

export const TRACKS = [
  {
    id: 'html',
    title: 'HTML Fundamentals',
    description: 'Master semantic markup, document architecture, forms, and web content structuring.',
    icon: 'Layers',
    color: '#f97316', // Orange
  },
  {
    id: 'css',
    title: 'Modern CSS Styling',
    description: 'Learn modern selectors, the box model, Flexbox alignment, and responsive Grid layouts.',
    icon: 'Sparkles',
    color: '#06b6d4', // Cyan
  },
  {
    id: 'javascript',
    title: 'JavaScript Programming',
    description: 'Write dynamic client-side logic, interact with the DOM, and handle user events.',
    icon: 'Terminal',
    color: '#eab308', // Amber/Yellow
  },
];

export const LESSONS = [
  // ==========================================
  // TRACK 1: HTML Fundamentals (5 Lessons)
  // ==========================================
  {
    id: 'html-skeleton',
    trackId: 'html',
    order: 1,
    title: 'Document Skeleton & Headings',
    shortDesc: 'Structure a valid HTML5 document skeleton with essential headings and paragraphs.',
    difficulty: 'Beginner',
    estimatedTime: '10 min',
    theory: `### HTML5 Document Architecture

Every modern web page begins with a standard document skeleton:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Page Title</title>
  </head>
  <body>
    <h1>Main Heading</h1>
    <p>A descriptive paragraph of text.</p>
  </body>
</html>
\`\`\`

- \`<!DOCTYPE html>\`: Informs browsers that this document uses HTML5 standards.
- \`<html>\`: The root container element enclosing all page markup.
- \`<head>\`: Holds metadata, document title, and external stylesheets.
- \`<body>\`: Contains all visible page contents rendered to users.
- \`<h1>\` through \`<h6>\`: Hierarchical heading elements where \`<h1>\` represents the primary title.`,
    instructions: [
      'Create an <h1> heading with the text "Welcome to WebDev LMS".',
      'Add a <p> paragraph element underneath with at least 10 characters describing your learning goal.',
      'Add an <h2> sub-heading with the text "Getting Started".',
    ],
    hints: [
      'Use <h1>Welcome to WebDev LMS</h1> for the main heading.',
      'Wrap your text inside <p>...</p> tags.',
      'Sub-headings use <h2>Getting Started</h2>.',
    ],
    starterCode: {
      html: `<!-- Create your document skeleton and content below -->
<div class="content-wrapper">
  
</div>`,
      css: `body {
  font-family: system-ui, -apple-system, sans-serif;
  color: #f8fafc;
  background-color: #0f172a;
  padding: 24px;
}

.content-wrapper {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: #38bdf8;
  font-size: 2rem;
  margin-bottom: 8px;
}

h2 {
  color: #94a3b8;
  font-size: 1.4rem;
  margin-top: 20px;
}

p {
  color: #cbd5e1;
  line-height: 1.6;
}`,
      js: `// No JavaScript required for this lesson`,
    },
    solutionCode: {
      html: `<div class="content-wrapper">
  <h1>Welcome to WebDev LMS</h1>
  <p>I am learning full-stack web development to build modern responsive web applications.</p>
  <h2>Getting Started</h2>
</div>`,
      css: `body {
  font-family: system-ui, -apple-system, sans-serif;
  color: #f8fafc;
  background-color: #0f172a;
  padding: 24px;
}

.content-wrapper {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: #38bdf8;
  font-size: 2rem;
  margin-bottom: 8px;
}

h2 {
  color: #94a3b8;
  font-size: 1.4rem;
  margin-top: 20px;
}

p {
  color: #cbd5e1;
  line-height: 1.6;
}`,
      js: ``,
    },
    validationRules: [
      {
        id: 'h1_exists',
        description: 'Contains an <h1> heading with text "Welcome to WebDev LMS"',
        type: 'ELEMENT_TEXT',
        selector: 'h1',
        text: 'Welcome to WebDev LMS',
        ignoreCase: true,
      },
      {
        id: 'p_exists',
        description: 'Contains a <p> paragraph with at least 10 characters',
        type: 'CUSTOM',
        test: ({ doc }) => {
          const p = doc.querySelector('p');
          if (!p) return { pass: false, message: 'Missing <p> paragraph tag.' };
          const len = p.textContent.trim().length;
          return {
            pass: len >= 10,
            message: len >= 10 ? 'Paragraph meets length criteria' : `Paragraph text too short (${len}/10 chars minimum).`,
          };
        },
      },
      {
        id: 'h2_exists',
        description: 'Contains an <h2> heading with text "Getting Started"',
        type: 'ELEMENT_TEXT',
        selector: 'h2',
        text: 'Getting Started',
        ignoreCase: true,
      },
    ],
  },

  {
    id: 'html-links-images',
    trackId: 'html',
    order: 2,
    title: 'Hyperlinks & Media Assets',
    shortDesc: 'Embed functional hyperlinks with href attributes and accessible images with alt descriptions.',
    difficulty: 'Beginner',
    estimatedTime: '12 min',
    theory: `### Hyperlinks & Image Elements

Hyperlinks connect documents across the web via the \`<a>\` (anchor) tag:
\`\`\`html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Visit Website</a>
\`\`\`
- \`href\`: Specifies the hyperlink destination URL.
- \`target="_blank"\`: Opens the link in a new browser tab.

Images are embedded using the self-closing \`<img>\` tag:
\`\`\`html
<img src="https://picsum.photos/400/250" alt="Mountain landscape at sunset" width="400">
\`\`\`
- \`src\`: The URL or path of the graphic asset.
- \`alt\`: Screen-reader and fallback description for web accessibility. Never omit the alt attribute!`,
    instructions: [
      'Create an <a> anchor tag pointing to "https://developer.mozilla.org" with text "MDN Web Docs".',
      'Add target="_blank" attribute to the anchor tag so it opens in a new tab.',
      'Add an <img> tag with src="https://images.unsplash.com/photo-1555066931-4365d14bab8c" and a descriptive alt attribute (e.g. "Computer code on screen").',
    ],
    hints: [
      'Use <a href="https://developer.mozilla.org" target="_blank">MDN Web Docs</a>',
      'The img tag looks like <img src="..." alt="..."> and does not require a closing tag.',
    ],
    starterCode: {
      html: `<div class="card">
  <h2>Web Development Resources</h2>
  <!-- Add your link and image below -->

</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #090d16;
  color: #f1f5f9;
  padding: 24px;
}

.card {
  max-width: 480px;
  margin: 0 auto;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 20px;
}

h2 {
  margin-top: 0;
  color: #38bdf8;
}

a {
  display: inline-block;
  color: #38bdf8;
  font-weight: 600;
  margin-bottom: 16px;
  text-decoration: underline;
}

img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
}`,
      js: `// No JS required`,
    },
    solutionCode: {
      html: `<div class="card">
  <h2>Web Development Resources</h2>
  <a href="https://developer.mozilla.org" target="_blank">MDN Web Docs</a>
  <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c" alt="Computer code on screen">
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #090d16;
  color: #f1f5f9;
  padding: 24px;
}

.card {
  max-width: 480px;
  margin: 0 auto;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 20px;
}

h2 {
  margin-top: 0;
  color: #38bdf8;
}

a {
  display: inline-block;
  color: #38bdf8;
  font-weight: 600;
  margin-bottom: 16px;
  text-decoration: underline;
}

img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
}`,
      js: ``,
    },
    validationRules: [
      {
        id: 'link_href',
        description: 'Contains an <a> tag linking to "https://developer.mozilla.org"',
        type: 'ELEMENT_ATTRIBUTE',
        selector: 'a',
        attribute: 'href',
        expectedValue: 'https://developer.mozilla.org',
      },
      {
        id: 'link_target',
        description: 'Anchor element has target="_blank"',
        type: 'ELEMENT_ATTRIBUTE',
        selector: 'a',
        attribute: 'target',
        expectedValue: '_blank',
      },
      {
        id: 'img_src_alt',
        description: 'Contains an <img> with non-empty src and descriptive alt attribute',
        type: 'CUSTOM',
        test: ({ doc }) => {
          const img = doc.querySelector('img');
          if (!img) return { pass: false, message: 'Missing <img> element.' };
          const src = img.getAttribute('src');
          const alt = img.getAttribute('alt');
          if (!src || src.trim().length === 0) return { pass: false, message: 'Image is missing src attribute.' };
          if (!alt || alt.trim().length === 0) return { pass: false, message: 'Image must have a descriptive alt attribute for accessibility.' };
          return { pass: true, message: 'Image has valid src and alt attributes.' };
        },
      },
    ],
  },

  {
    id: 'html-lists-containers',
    trackId: 'html',
    order: 3,
    title: 'Lists & Structural Containers',
    shortDesc: 'Organize related information into ordered and unordered lists with semantic containers.',
    difficulty: 'Beginner',
    estimatedTime: '10 min',
    theory: `### HTML Lists & Content Organization

Lists are fundamental for rendering navigation items, steps, and feature highlights:
- **Unordered List** (\`<ul>\`): Bulleted collection of items where order does not matter.
- **Ordered List** (\`<ol>\`): Numbered sequence where order is meaningful.
- **List Item** (\`<li>\`): The child item element nested directly inside \`<ul>\` or \`<ol>\`.

\`\`\`html
<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>

<ol>
  <li>Step One</li>
  <li>Step Two</li>
</ol>
\`\`\`

Containers like \`<div class="card">\` group elements together for styling and layout purposes.`,
    instructions: [
      'Create an unordered list (<ul>) with at least 3 list items (<li>) listing skills you want to learn (e.g. HTML, CSS, JavaScript).',
      'Create an ordered list (<ol>) with 2 list items (<li>) representing study steps.',
      'Wrap both lists inside a container with class="curriculum-box".',
    ],
    hints: [
      'Wrap elements in <div class="curriculum-box"> ... </div>.',
      'Inside the container, add <ul><li>HTML</li><li>CSS</li><li>JavaScript</li></ul>.',
      'Add <ol><li>Read theory</li><li>Complete exercises</li></ol>.',
    ],
    starterCode: {
      html: `<!-- Add your lists and container below -->
`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0b1120;
  color: #e2e8f0;
  padding: 24px;
}

.curriculum-box {
  background: #1e293b;
  border-left: 4px solid #38bdf8;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  margin: 0 auto;
}

ul, ol {
  padding-left: 24px;
  margin-bottom: 16px;
}

li {
  margin-bottom: 6px;
  color: #94a3b8;
}`,
      js: ``,
    },
    solutionCode: {
      html: `<div class="curriculum-box">
  <h3>Core Web Skills</h3>
  <ul>
    <li>Semantic HTML</li>
    <li>Responsive CSS</li>
    <li>Dynamic JavaScript</li>
  </ul>
  <h3>Action Plan</h3>
  <ol>
    <li>Study the fundamentals</li>
    <li>Build portfolio projects</li>
  </ol>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0b1120;
  color: #e2e8f0;
  padding: 24px;
}

.curriculum-box {
  background: #1e293b;
  border-left: 4px solid #38bdf8;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  margin: 0 auto;
}

ul, ol {
  padding-left: 24px;
  margin-bottom: 16px;
}

li {
  margin-bottom: 6px;
  color: #94a3b8;
}`,
      js: ``,
    },
    validationRules: [
      {
        id: 'container_box',
        description: 'Contains a container element with class="curriculum-box"',
        type: 'ELEMENT_EXISTS',
        selector: '.curriculum-box',
      },
      {
        id: 'ul_items',
        description: 'Contains a <ul> with at least 3 <li> child elements',
        type: 'CUSTOM',
        test: ({ doc }) => {
          const ul = doc.querySelector('ul');
          if (!ul) return { pass: false, message: 'Missing <ul> element.' };
          const items = ul.querySelectorAll('li');
          return {
            pass: items.length >= 3,
            message: items.length >= 3 ? 'Found 3+ items in unordered list' : `Found ${items.length} items; need at least 3.`,
          };
        },
      },
      {
        id: 'ol_items',
        description: 'Contains an <ol> with at least 2 <li> child elements',
        type: 'CUSTOM',
        test: ({ doc }) => {
          const ol = doc.querySelector('ol');
          if (!ol) return { pass: false, message: 'Missing <ol> element.' };
          const items = ol.querySelectorAll('li');
          return {
            pass: items.length >= 2,
            message: items.length >= 2 ? 'Found 2+ items in ordered list' : `Found ${items.length} items; need at least 2.`,
          };
        },
      },
    ],
  },

  {
    id: 'html-semantic-layout',
    trackId: 'html',
    order: 4,
    title: 'Semantic Layout Elements',
    shortDesc: 'Structure modern web applications using semantic HTML5 elements for SEO and accessibility.',
    difficulty: 'Intermediate',
    estimatedTime: '15 min',
    theory: `### Semantic HTML5 Layout Structure

Semantic tags clearly convey meaning to search engines, browsers, and assistive screen readers:
- \`<header>\`: Introductory content or branding at the top.
- \`<nav>\`: Container for major navigation links.
- \`<main>\`: The primary, unique content of the page (only one per document).
- \`<article>\`: Self-contained, independently distributable content (e.g. blog post, card).
- \`<footer>\`: Bottom information such as copyright and metadata.

\`\`\`html
<header>
  <nav><a href="#home">Home</a></nav>
</header>
<main>
  <article>
    <h2>Article Title</h2>
    <p>Content goes here...</p>
  </article>
</main>
<footer><p>&copy; 2026</p></footer>
\`\`\``,
    instructions: [
      'Create a <header> element containing a <nav> with at least 2 navigation links (<a> tags).',
      'Add a <main> element containing an <article> with a heading and a paragraph.',
      'Add a <footer> element at the bottom containing copyright text.',
    ],
    hints: [
      'Structure: <header><nav><a href="#1">Tab 1</a><a href="#2">Tab 2</a></nav></header>',
      'Next add: <main><article><h3>Title</h3><p>Text</p></article></main>',
      'Finish with: <footer><p>&copy; 2026 LMS</p></footer>',
    ],
    starterCode: {
      html: `<!-- Build semantic layout below -->
`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
  margin: 0;
  padding: 16px;
}

header {
  background: #1e293b;
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 16px;
}

nav a {
  color: #38bdf8;
  margin-right: 16px;
  text-decoration: none;
  font-weight: 500;
}

main {
  background: #1e293b;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 16px;
}

article h3 {
  color: #38bdf8;
  margin-top: 0;
}

footer {
  text-align: center;
  color: #64748b;
  font-size: 0.9rem;
}`,
      js: ``,
    },
    solutionCode: {
      html: `<header>
  <nav>
    <a href="#home">Home</a>
    <a href="#courses">Courses</a>
  </nav>
</header>
<main>
  <article>
    <h3>Semantic HTML Architecture</h3>
    <p>Semantic tags improve accessibility and enable search engines to index web content efficiently.</p>
  </article>
</main>
<footer>
  <p>&copy; 2026 WebDev LMS Platform</p>
</footer>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
  margin: 0;
  padding: 16px;
}

header {
  background: #1e293b;
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 16px;
}

nav a {
  color: #38bdf8;
  margin-right: 16px;
  text-decoration: none;
  font-weight: 500;
}

main {
  background: #1e293b;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 16px;
}

article h3 {
  color: #38bdf8;
  margin-top: 0;
}

footer {
  text-align: center;
  color: #64748b;
  font-size: 0.9rem;
}`,
      js: ``,
    },
    validationRules: [
      {
        id: 'header_nav',
        description: 'Contains a <header> with nested <nav> holding at least 2 <a> links',
        type: 'CUSTOM',
        test: ({ doc }) => {
          const header = doc.querySelector('header');
          if (!header) return { pass: false, message: 'Missing <header> element.' };
          const nav = header.querySelector('nav');
          if (!nav) return { pass: false, message: 'Missing <nav> inside <header>.' };
          const links = nav.querySelectorAll('a');
          return {
            pass: links.length >= 2,
            message: links.length >= 2 ? 'Found 2+ nav links' : `Found ${links.length} links; need at least 2.`,
          };
        },
      },
      {
        id: 'main_article',
        description: 'Contains a <main> element with an enclosed <article>',
        type: 'CUSTOM',
        test: ({ doc }) => {
          const main = doc.querySelector('main');
          if (!main) return { pass: false, message: 'Missing <main> tag.' };
          const article = main.querySelector('article');
          if (!article) return { pass: false, message: 'Missing <article> inside <main>.' };
          return { pass: true, message: 'Semantic <main> and <article> verified.' };
        },
      },
      {
        id: 'footer_exists',
        description: 'Contains a <footer> element',
        type: 'ELEMENT_EXISTS',
        selector: 'footer',
      },
    ],
  },

  {
    id: 'html-forms',
    trackId: 'html',
    order: 5,
    title: 'Interactive User Forms',
    shortDesc: 'Build accessible web forms with labeled text inputs, placeholder attributes, and submit buttons.',
    difficulty: 'Intermediate',
    estimatedTime: '15 min',
    theory: `### HTML Forms & User Input

Forms allow users to input data and interact with web services:
\`\`\`html
<form id="signup-form">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" placeholder="Enter username" required>
  
  <label for="email">Email Address:</label>
  <input type="email" id="email" name="email" placeholder="you@domain.com" required>

  <button type="submit">Register Now</button>
</form>
\`\`\`
- \`<form>\`: The wrapper element managing input serialization and submissions.
- \`<label for="inputId">\`: Associates readable text with an input for screen readers and click targeting.
- \`<input type="...">\`: Defines input controls (e.g. text, email, password, checkbox).
- \`<button type="submit">\`: Triggers the form submission event.`,
    instructions: [
      'Create a <form> element with id="user-form".',
      'Inside the form, add a <label> with text "Full Name:".',
      'Add an <input type="text"> with name="fullName" and placeholder="John Doe".',
      'Add a <button type="submit"> with text "Submit Profile".',
    ],
    hints: [
      'Wrap your inputs inside <form id="user-form"> ... </form>.',
      'Add <label>Full Name:</label>',
      'Add <input type="text" name="fullName" placeholder="John Doe">',
      'Add <button type="submit">Submit Profile</button>',
    ],
    starterCode: {
      html: `<div class="form-card">
  <h2>User Registration</h2>
  <!-- Add your form below -->

</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0b1120;
  color: #f1f5f9;
  padding: 24px;
}

.form-card {
  max-width: 440px;
  margin: 0 auto;
  background: #1e293b;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #334155;
}

h2 {
  margin-top: 0;
  color: #38bdf8;
  font-size: 1.3rem;
}

label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 6px;
  color: #94a3b8;
  font-weight: 500;
}

input[type="text"] {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
  border-radius: 6px;
  border: 1px solid #475569;
  background-color: #0f172a;
  color: #ffffff;
  font-size: 0.95rem;
  margin-bottom: 16px;
}

button[type="submit"] {
  background-color: #0284c7;
  color: #ffffff;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
}`,
      js: `// Form submission event hook
document.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Form submitted successfully!');
});`,
    },
    solutionCode: {
      html: `<div class="form-card">
  <h2>User Registration</h2>
  <form id="user-form">
    <label for="fullName">Full Name:</label>
    <input type="text" id="fullName" name="fullName" placeholder="John Doe">
    <button type="submit">Submit Profile</button>
  </form>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0b1120;
  color: #f1f5f9;
  padding: 24px;
}

.form-card {
  max-width: 440px;
  margin: 0 auto;
  background: #1e293b;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #334155;
}

h2 {
  margin-top: 0;
  color: #38bdf8;
  font-size: 1.3rem;
}

label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 6px;
  color: #94a3b8;
  font-weight: 500;
}

input[type="text"] {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
  border-radius: 6px;
  border: 1px solid #475569;
  background-color: #0f172a;
  color: #ffffff;
  font-size: 0.95rem;
  margin-bottom: 16px;
}

button[type="submit"] {
  background-color: #0284c7;
  color: #ffffff;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
}`,
      js: ``,
    },
    validationRules: [
      {
        id: 'form_id',
        description: 'Contains a <form> with id="user-form"',
        type: 'ELEMENT_EXISTS',
        selector: 'form#user-form',
      },
      {
        id: 'input_name',
        description: 'Contains an <input type="text"> with name="fullName" and placeholder',
        type: 'CUSTOM',
        test: ({ doc }) => {
          const form = doc.querySelector('form#user-form');
          if (!form) return { pass: false, message: 'Missing form#user-form.' };
          const input = form.querySelector('input[type="text"]');
          if (!input) return { pass: false, message: 'Missing input[type="text"] in form.' };
          const nameAttr = input.getAttribute('name');
          const placeholder = input.getAttribute('placeholder');
          if (nameAttr !== 'fullName') return { pass: false, message: 'Input must have name="fullName".' };
          if (!placeholder) return { pass: false, message: 'Input must have a placeholder attribute.' };
          return { pass: true, message: 'Text input configured correctly.' };
        },
      },
      {
        id: 'submit_button',
        description: 'Contains a <button type="submit"> with text "Submit Profile"',
        type: 'ELEMENT_TEXT',
        selector: 'button[type="submit"]',
        text: 'Submit Profile',
        ignoreCase: true,
      },
    ],
  },

  // ==========================================
  // TRACK 2: Modern CSS Styling (5 Lessons)
  // ==========================================
  {
    id: 'css-selectors-colors',
    trackId: 'css',
    order: 1,
    title: 'CSS Selectors, Typography & Colors',
    shortDesc: 'Apply class selectors, customize typography, and set high-contrast color palettes.',
    difficulty: 'Beginner',
    estimatedTime: '10 min',
    theory: `### CSS Selectors and Color Styling

CSS rules target HTML elements to apply aesthetic styles:
\`\`\`css
/* Element Selector */
h1 {
  font-family: sans-serif;
}

/* Class Selector */
.highlight {
  color: #06b6d4;
  background-color: rgba(6, 182, 212, 0.1);
}

/* ID Selector */
#main-card {
  background-color: #1e293b;
}
\`\`\`
- Colors can be specified via HEX codes (\`#38bdf8\`), RGB/RGBA (\`rgba(15, 23, 42, 0.9)\`), or HSL.
- \`font-size\` controls text scale, while \`line-height\` improves readability.`,
    instructions: [
      'Target the .highlight class in CSS and set color to #38bdf8 (light blue).',
      'Target the .card container and set its background-color to #1e293b.',
      'Set the border-radius of .card to 12px.',
    ],
    hints: [
      'In style.css, write: .highlight { color: #38bdf8; }',
      'Add background-color: #1e293b; inside the .card rule.',
      'Add border-radius: 12px; inside the .card rule.',
    ],
    starterCode: {
      html: `<div class="card">
  <h2>Frontend Architecture</h2>
  <p>Learn how to craft clean user interfaces with <span class="highlight">modern CSS selectors</span>.</p>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
  padding: 30px;
}

.card {
  max-width: 480px;
  margin: 0 auto;
  padding: 24px;
  border: 1px solid #334155;
  /* Add background-color and border-radius here */
}

h2 {
  margin-top: 0;
  color: #f1f5f9;
}

.highlight {
  font-weight: 700;
  /* Add color here */
}`,
      js: ``,
    },
    solutionCode: {
      html: `<div class="card">
  <h2>Frontend Architecture</h2>
  <p>Learn how to craft clean user interfaces with <span class="highlight">modern CSS selectors</span>.</p>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
  padding: 30px;
}

.card {
  max-width: 480px;
  margin: 0 auto;
  padding: 24px;
  border: 1px solid #334155;
  background-color: #1e293b;
  border-radius: 12px;
}

h2 {
  margin-top: 0;
  color: #f1f5f9;
}

.highlight {
  font-weight: 700;
  color: #38bdf8;
}`,
      js: ``,
    },
    validationRules: [
      {
        id: 'highlight_color',
        description: '.highlight has color set to #38bdf8 (rgb(56, 189, 248))',
        type: 'COMPUTED_STYLE',
        selector: '.highlight',
        property: 'color',
        expectedValue: ['rgb(56, 189, 248)', '#38bdf8'],
      },
      {
        id: 'card_bg',
        description: '.card has background-color set to #1e293b (rgb(30, 41, 59))',
        type: 'COMPUTED_STYLE',
        selector: '.card',
        property: 'backgroundColor',
        expectedValue: ['rgb(30, 41, 59)', '#1e293b'],
      },
      {
        id: 'card_radius',
        description: '.card has border-radius of 12px',
        type: 'COMPUTED_STYLE',
        selector: '.card',
        property: 'borderRadius',
        expectedValue: '12px',
      },
    ],
  },

  {
    id: 'css-box-model',
    trackId: 'css',
    order: 2,
    title: 'The CSS Box Model',
    shortDesc: 'Understand margin, padding, borders, and how box-sizing: border-box stabilizes dimensions.',
    difficulty: 'Beginner',
    estimatedTime: '12 min',
    theory: `### The CSS Box Model

Every element in CSS is rendered as a rectangular box comprising four concentric layers:
1. **Content**: The text, image, or children inside the element.
2. **Padding**: Transparent spacing immediately surrounding the content.
3. **Border**: The stroke encircling the padding.
4. **Margin**: Transparent clearance separating the element from sibling elements.

\`\`\`css
* {
  box-sizing: border-box; /* Crucial! Padding & border are included in total width */
}

.box {
  width: 300px;
  padding: 20px;
  border: 2px solid #38bdf8;
  margin: 24px auto;
}
\`\`\``,
    instructions: [
      'In .box, set padding to 24px.',
      'Set border to "2px solid #0284c7".',
      'Set margin-bottom to 20px.',
      'Ensure box-sizing is set to border-box.',
    ],
    hints: [
      'Write: padding: 24px;',
      'Write: border: 2px solid #0284c7;',
      'Write: margin-bottom: 20px;',
      'Write: box-sizing: border-box;',
    ],
    starterCode: {
      html: `<div class="container">
  <div class="box">
    <h3>Box Model Component</h3>
    <p>Notice how padding provides internal breathing room, while margins create external separation.</p>
  </div>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #090d16;
  color: #f1f5f9;
  padding: 20px;
}

.container {
  max-width: 500px;
  margin: 0 auto;
}

.box {
  background-color: #1e293b;
  border-radius: 8px;
  /* Configure padding, border, margin-bottom, and box-sizing below */
}

h3 {
  margin-top: 0;
  color: #38bdf8;
}

p {
  color: #94a3b8;
  margin: 0;
}`,
      js: ``,
    },
    solutionCode: {
      html: `<div class="container">
  <div class="box">
    <h3>Box Model Component</h3>
    <p>Notice how padding provides internal breathing room, while margins create external separation.</p>
  </div>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #090d16;
  color: #f1f5f9;
  padding: 20px;
}

.container {
  max-width: 500px;
  margin: 0 auto;
}

.box {
  background-color: #1e293b;
  border-radius: 8px;
  padding: 24px;
  border: 2px solid #0284c7;
  margin-bottom: 20px;
  box-sizing: border-box;
}

h3 {
  margin-top: 0;
  color: #38bdf8;
}

p {
  color: #94a3b8;
  margin: 0;
}`,
      js: ``,
    },
    validationRules: [
      {
        id: 'box_padding',
        description: '.box has padding of 24px',
        type: 'COMPUTED_STYLE',
        selector: '.box',
        property: 'paddingTop',
        expectedValue: '24px',
      },
      {
        id: 'box_border',
        description: '.box has a 2px border width',
        type: 'COMPUTED_STYLE',
        selector: '.box',
        property: 'borderTopWidth',
        expectedValue: '2px',
      },
      {
        id: 'box_margin_bottom',
        description: '.box has margin-bottom of 20px',
        type: 'COMPUTED_STYLE',
        selector: '.box',
        property: 'marginBottom',
        expectedValue: '20px',
      },
      {
        id: 'box_sizing',
        description: '.box has box-sizing: border-box',
        type: 'COMPUTED_STYLE',
        selector: '.box',
        property: 'boxSizing',
        expectedValue: 'border-box',
      },
    ],
  },

  {
    id: 'css-flexbox-basics',
    trackId: 'css',
    order: 3,
    title: 'Flexbox Layout Basics',
    shortDesc: 'Align child elements with display: flex, justify-content, align-items, and gap.',
    difficulty: 'Intermediate',
    estimatedTime: '15 min',
    theory: `### CSS Flexible Box Layout (Flexbox)

Flexbox provides one-dimensional alignment along the main axis and cross axis:
\`\`\`css
.nav-container {
  display: flex;
  justify-content: space-between; /* Main axis alignment */
  align-items: center;            /* Cross axis alignment */
  gap: 16px;                      /* Spacing between items */
}
\`\`\`
- \`display: flex\`: Turns the container into a flex context.
- \`justify-content\`: \`center\`, \`space-between\`, \`flex-start\`, \`flex-end\`.
- \`align-items\`: \`center\`, \`stretch\`, \`flex-start\`, \`flex-end\`.
- \`gap\`: Cleaner and more reliable than manual margins for spacing child elements.`,
    instructions: [
      'In .toolbar, set display to flex.',
      'Set justify-content to space-between.',
      'Set align-items to center.',
      'Add a gap of 16px between items.',
    ],
    hints: [
      'Add display: flex;',
      'Add justify-content: space-between;',
      'Add align-items: center;',
      'Add gap: 16px;',
    ],
    starterCode: {
      html: `<div class="toolbar">
  <div class="logo">⚡ CodeFlow</div>
  <div class="nav-links">
    <button class="btn">Dashboard</button>
    <button class="btn">Settings</button>
  </div>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0b1120;
  color: #f8fafc;
  padding: 24px;
}

.toolbar {
  background-color: #1e293b;
  padding: 16px 24px;
  border-radius: 10px;
  border: 1px solid #334155;
  /* Add Flexbox properties here */
}

.logo {
  font-weight: 700;
  font-size: 1.2rem;
  color: #38bdf8;
}

.btn {
  background: #334155;
  color: #ffffff;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 8px;
}`,
      js: ``,
    },
    solutionCode: {
      html: `<div class="toolbar">
  <div class="logo">⚡ CodeFlow</div>
  <div class="nav-links">
    <button class="btn">Dashboard</button>
    <button class="btn">Settings</button>
  </div>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0b1120;
  color: #f8fafc;
  padding: 24px;
}

.toolbar {
  background-color: #1e293b;
  padding: 16px 24px;
  border-radius: 10px;
  border: 1px solid #334155;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.logo {
  font-weight: 700;
  font-size: 1.2rem;
  color: #38bdf8;
}

.btn {
  background: #334155;
  color: #ffffff;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 8px;
}`,
      js: ``,
    },
    validationRules: [
      {
        id: 'toolbar_display',
        description: '.toolbar has display: flex',
        type: 'COMPUTED_STYLE',
        selector: '.toolbar',
        property: 'display',
        expectedValue: 'flex',
      },
      {
        id: 'toolbar_justify',
        description: '.toolbar has justify-content: space-between',
        type: 'COMPUTED_STYLE',
        selector: '.toolbar',
        property: 'justifyContent',
        expectedValue: 'space-between',
      },
      {
        id: 'toolbar_align',
        description: '.toolbar has align-items: center',
        type: 'COMPUTED_STYLE',
        selector: '.toolbar',
        property: 'alignItems',
        expectedValue: 'center',
      },
      {
        id: 'toolbar_gap',
        description: '.toolbar has gap of 16px',
        type: 'COMPUTED_STYLE',
        selector: '.toolbar',
        property: 'gap',
        expectedValue: ['16px', '16px 16px'],
      },
    ],
  },

  {
    id: 'css-flexbox-alignment',
    trackId: 'css',
    order: 4,
    title: 'Flex Direction & Wrap Control',
    shortDesc: 'Control orientation and multi-line wrapping with flex-direction and flex-wrap.',
    difficulty: 'Intermediate',
    estimatedTime: '14 min',
    theory: `### Flex Direction and Multi-Row Wrapping

By default, Flexbox aligns items horizontally along a row (\`flex-direction: row\`).
You can change the primary flow to vertical or allow items to wrap smoothly:
\`\`\`css
.card-stack {
  display: flex;
  flex-direction: column; /* Stack children vertically */
  gap: 12px;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;        /* Wrap children onto new rows */
  gap: 8px;
}
\`\`\``,
    instructions: [
      'In .tags-container, set display to flex.',
      'Enable wrapping with flex-wrap: wrap.',
      'Add a gap of 10px.',
    ],
    hints: [
      'Add display: flex;',
      'Add flex-wrap: wrap;',
      'Add gap: 10px;',
    ],
    starterCode: {
      html: `<div class="wrapper">
  <h3>Technology Tags</h3>
  <div class="tags-container">
    <span class="tag">HTML5</span>
    <span class="tag">CSS3</span>
    <span class="tag">JavaScript</span>
    <span class="tag">TypeScript</span>
    <span class="tag">React</span>
    <span class="tag">Vite</span>
    <span class="tag">Tailwind</span>
    <span class="tag">Node.js</span>
  </div>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0b1120;
  color: #f1f5f9;
  padding: 24px;
}

.wrapper {
  max-width: 320px;
  background: #1e293b;
  padding: 20px;
  border-radius: 10px;
  margin: 0 auto;
}

h3 {
  margin-top: 0;
  color: #38bdf8;
}

.tags-container {
  /* Set display, flex-wrap, and gap here */
}

.tag {
  background: #0f172a;
  color: #38bdf8;
  border: 1px solid #334155;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}`,
      js: ``,
    },
    solutionCode: {
      html: `<div class="wrapper">
  <h3>Technology Tags</h3>
  <div class="tags-container">
    <span class="tag">HTML5</span>
    <span class="tag">CSS3</span>
    <span class="tag">JavaScript</span>
    <span class="tag">TypeScript</span>
    <span class="tag">React</span>
    <span class="tag">Vite</span>
    <span class="tag">Tailwind</span>
    <span class="tag">Node.js</span>
  </div>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0b1120;
  color: #f1f5f9;
  padding: 24px;
}

.wrapper {
  max-width: 320px;
  background: #1e293b;
  padding: 20px;
  border-radius: 10px;
  margin: 0 auto;
}

h3 {
  margin-top: 0;
  color: #38bdf8;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  background: #0f172a;
  color: #38bdf8;
  border: 1px solid #334155;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}`,
      js: ``,
    },
    validationRules: [
      {
        id: 'tags_display',
        description: '.tags-container has display: flex',
        type: 'COMPUTED_STYLE',
        selector: '.tags-container',
        property: 'display',
        expectedValue: 'flex',
      },
      {
        id: 'tags_wrap',
        description: '.tags-container has flex-wrap: wrap',
        type: 'COMPUTED_STYLE',
        selector: '.tags-container',
        property: 'flexWrap',
        expectedValue: 'wrap',
      },
      {
        id: 'tags_gap',
        description: '.tags-container has gap: 10px',
        type: 'COMPUTED_STYLE',
        selector: '.tags-container',
        property: 'gap',
        expectedValue: ['10px', '10px 10px'],
      },
    ],
  },

  {
    id: 'css-grid-responsive',
    trackId: 'css',
    order: 5,
    title: 'CSS Grid & Responsive Columns',
    shortDesc: 'Build modern two-dimensional layouts using CSS Grid and repeat() column structures.',
    difficulty: 'Intermediate',
    estimatedTime: '15 min',
    theory: `### CSS Grid Layout

CSS Grid is designed for two-dimensional grid layouts:
\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal fraction columns */
  gap: 20px;
}
\`\`\`
- \`display: grid\`: Defines a grid formatting context.
- \`repeat(3, 1fr)\`: Creates three columns each occupying 1 fraction of available space.
- \`gap\`: Provides consistent row and column spacing simultaneously.`,
    instructions: [
      'In .dashboard-grid, set display to grid.',
      'Configure 3 equal columns using grid-template-columns: repeat(3, 1fr).',
      'Add a gap of 16px between grid cells.',
    ],
    hints: [
      'Write: display: grid;',
      'Write: grid-template-columns: repeat(3, 1fr);',
      'Write: gap: 16px;',
    ],
    starterCode: {
      html: `<div class="dashboard-grid">
  <div class="stat-card">
    <div class="stat-num">1,240</div>
    <div class="stat-label">Active Students</div>
  </div>
  <div class="stat-card">
    <div class="stat-num">98.4%</div>
    <div class="stat-label">Completion Rate</div>
  </div>
  <div class="stat-card">
    <div class="stat-num">15</div>
    <div class="stat-label">Interactive Lessons</div>
  </div>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
  padding: 24px;
}

.dashboard-grid {
  max-width: 680px;
  margin: 0 auto;
  /* Add grid properties below */
}

.stat-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

.stat-num {
  font-size: 1.8rem;
  font-weight: 700;
  color: #38bdf8;
  margin-bottom: 6px;
}

.stat-label {
  color: #94a3b8;
  font-size: 0.85rem;
}`,
      js: ``,
    },
    solutionCode: {
      html: `<div class="dashboard-grid">
  <div class="stat-card">
    <div class="stat-num">1,240</div>
    <div class="stat-label">Active Students</div>
  </div>
  <div class="stat-card">
    <div class="stat-num">98.4%</div>
    <div class="stat-label">Completion Rate</div>
  </div>
  <div class="stat-card">
    <div class="stat-num">15</div>
    <div class="stat-label">Interactive Lessons</div>
  </div>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
  padding: 24px;
}

.dashboard-grid {
  max-width: 680px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

.stat-num {
  font-size: 1.8rem;
  font-weight: 700;
  color: #38bdf8;
  margin-bottom: 6px;
}

.stat-label {
  color: #94a3b8;
  font-size: 0.85rem;
}`,
      js: ``,
    },
    validationRules: [
      {
        id: 'grid_display',
        description: '.dashboard-grid has display: grid',
        type: 'COMPUTED_STYLE',
        selector: '.dashboard-grid',
        property: 'display',
        expectedValue: 'grid',
      },
      {
        id: 'grid_columns',
        description: '.dashboard-grid defines 3 columns',
        type: 'CUSTOM',
        test: ({ doc, win }) => {
          const el = doc.querySelector('.dashboard-grid');
          if (!el) return { pass: false, message: 'Missing .dashboard-grid element.' };
          const cols = win.getComputedStyle(el).gridTemplateColumns;
          // In computed style, repeat(3, 1fr) evaluates to 3 pixel values e.g. "150px 150px 150px" or contains 3 components
          const parts = cols ? cols.split(' ').filter(Boolean) : [];
          const pass = parts.length === 3 || cols.includes('repeat(3');
          return {
            pass,
            message: pass ? '3 grid columns configured' : `Detected columns: ${cols || 'none'} (expected 3 columns)`,
          };
        },
      },
      {
        id: 'grid_gap',
        description: '.dashboard-grid has gap of 16px',
        type: 'COMPUTED_STYLE',
        selector: '.dashboard-grid',
        property: 'gap',
        expectedValue: ['16px', '16px 16px'],
      },
    ],
  },

  // ==========================================
  // TRACK 3: JavaScript Programming (5 Lessons)
  // ==========================================
  {
    id: 'js-variables-strings',
    trackId: 'javascript',
    order: 1,
    title: 'Variables & String Interpolation',
    shortDesc: 'Declare constants, format template literals, and output strings into DOM elements.',
    difficulty: 'Beginner',
    estimatedTime: '10 min',
    theory: `### Modern JavaScript: Variables & Template Literals

Use \`const\` for values that do not get reassigned, and \`let\` for variables that change:
\`\`\`javascript
const courseName = 'Fullstack Web Development';
let studentCount = 42;

// Template Literals use backticks (\`) and \${expression}
const message = \`Welcome to \${courseName}! Currently \${studentCount} students are enrolled.\`;

// Display inside an HTML element
document.querySelector('#output').textContent = message;
\`\`\`
Template literals avoid error-prone string concatenation (\`+\`) and support multiline strings natively.`,
    instructions: [
      'In script.js, declare a constant named course with the value "Web Development LMS".',
      'Declare a constant named student with your name or "Alex".',
      'Use a template literal to construct the string: `Student ${student} enrolled in ${course}`',
      'Set the textContent of the #greeting element to that message.',
    ],
    hints: [
      'const course = "Web Development LMS";',
      'const student = "Alex";',
      'document.querySelector("#greeting").textContent = `Student ${student} enrolled in ${course}`;',
    ],
    starterCode: {
      html: `<div class="card">
  <h2>Student Enrollment Status</h2>
  <div id="greeting" class="status-box">Awaiting student data...</div>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0b1120;
  color: #f1f5f9;
  padding: 24px;
}

.card {
  max-width: 460px;
  margin: 0 auto;
  background: #1e293b;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #334155;
}

h2 {
  margin-top: 0;
  color: #38bdf8;
}

.status-box {
  background: #0f172a;
  border: 1px solid #475569;
  padding: 14px;
  border-radius: 6px;
  color: #38bdf8;
  font-weight: 500;
}`,
      js: `// Declare your variables and update #greeting below:
`,
    },
    solutionCode: {
      html: `<div class="card">
  <h2>Student Enrollment Status</h2>
  <div id="greeting" class="status-box">Awaiting student data...</div>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0b1120;
  color: #f1f5f9;
  padding: 24px;
}

.card {
  max-width: 460px;
  margin: 0 auto;
  background: #1e293b;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #334155;
}

h2 {
  margin-top: 0;
  color: #38bdf8;
}

.status-box {
  background: #0f172a;
  border: 1px solid #475569;
  padding: 14px;
  border-radius: 6px;
  color: #38bdf8;
  font-weight: 500;
}`,
      js: `const course = "Web Development LMS";
const student = "Alex";
document.querySelector("#greeting").textContent = \`Student \${student} enrolled in \${course}\`;`,
    },
    validationRules: [
      {
        id: 'greeting_text',
        description: '#greeting text contains "Student" and "enrolled in Web Development LMS"',
        type: 'CUSTOM',
        test: ({ doc }) => {
          const el = doc.querySelector('#greeting');
          if (!el) return { pass: false, message: 'Missing #greeting element.' };
          const txt = el.textContent.trim();
          const hasStudent = txt.toLowerCase().includes('student');
          const hasCourse = txt.includes('Web Development LMS');
          const hasEnrolled = txt.toLowerCase().includes('enrolled');
          const pass = hasStudent && hasCourse && hasEnrolled;
          return {
            pass,
            message: pass ? 'Greeting successfully formatted' : `Current text: "${txt}" does not match required format.`,
          };
        },
      },
    ],
  },

  {
    id: 'js-dom-manipulation',
    trackId: 'javascript',
    order: 2,
    title: 'DOM Querying & Class Toggling',
    shortDesc: 'Select elements with querySelector and toggle styles via classList.add/remove.',
    difficulty: 'Beginner',
    estimatedTime: '12 min',
    theory: `### DOM Element Selection & Class Manipulation

The Document Object Model (DOM) provides APIs to query and manipulate rendered elements:
\`\`\`javascript
// Select first element matching CSS selector
const badge = document.querySelector('.badge');

// Modify text content
badge.textContent = 'Active Status';

// Manage CSS classes
badge.classList.add('online');
badge.classList.remove('offline');
badge.classList.toggle('highlight');
\`\`\`
Separating CSS styling into classes and toggling them with JavaScript keeps visual design decoupled from application logic.`,
    instructions: [
      'Select the element with id="badge" using document.querySelector("#badge").',
      'Change its textContent to "Verified Completed".',
      'Add the CSS class "success" to the badge element using classList.add("success").',
    ],
    hints: [
      'const badge = document.querySelector("#badge");',
      'badge.textContent = "Verified Completed";',
      'badge.classList.add("success");',
    ],
    starterCode: {
      html: `<div class="card">
  <h2>Assignment Status</h2>
  <div id="badge" class="badge">In Progress</div>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
  padding: 24px;
}

.card {
  max-width: 440px;
  margin: 0 auto;
  background: #1e293b;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
}

.badge {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  background: #334155;
  color: #94a3b8;
  font-weight: 600;
  transition: all 0.2s ease;
}

.badge.success {
  background: #059669;
  color: #ecfdf5;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
}`,
      js: `// Query #badge, update text, and add "success" class below:
`,
    },
    solutionCode: {
      html: `<div class="card">
  <h2>Assignment Status</h2>
  <div id="badge" class="badge">In Progress</div>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
  padding: 24px;
}

.card {
  max-width: 440px;
  margin: 0 auto;
  background: #1e293b;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
}

.badge {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  background: #334155;
  color: #94a3b8;
  font-weight: 600;
  transition: all 0.2s ease;
}

.badge.success {
  background: #059669;
  color: #ecfdf5;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
}`,
      js: `const badge = document.querySelector("#badge");
badge.textContent = "Verified Completed";
badge.classList.add("success");`,
    },
    validationRules: [
      {
        id: 'badge_text',
        description: '#badge textContent is updated to "Verified Completed"',
        type: 'ELEMENT_TEXT',
        selector: '#badge',
        text: 'Verified Completed',
        ignoreCase: true,
      },
      {
        id: 'badge_class',
        description: '#badge has the class "success"',
        type: 'CUSTOM',
        test: ({ doc }) => {
          const el = doc.querySelector('#badge');
          if (!el) return { pass: false, message: 'Missing #badge element.' };
          const has = el.classList.contains('success');
          return {
            pass: has,
            message: has ? '#badge has class success' : 'Class "success" is missing on #badge.',
          };
        },
      },
    ],
  },

  {
    id: 'js-event-handling',
    trackId: 'javascript',
    order: 3,
    title: 'Event Listeners & Counter Logic',
    shortDesc: 'Listen to button clicks with addEventListener and mutate reactive counters.',
    difficulty: 'Intermediate',
    estimatedTime: '15 min',
    theory: `### DOM Event Handling

Web pages respond to user interactions using event listeners:
\`\`\`javascript
const btn = document.querySelector('#action-btn');
const counterDisplay = document.querySelector('#counter');

let count = 0;

btn.addEventListener('click', () => {
  count += 1;
  counterDisplay.textContent = count;
});
\`\`\`
- \`addEventListener(eventType, callback)\` registers a handler without overwriting other handlers.
- Common events: \`'click'\`, \`'input'\`, \`'keydown'\`, \`'submit'\`.`,
    instructions: [
      'In script.js, attach a click event listener to the button with id="increment-btn".',
      'Each time the button is clicked, increment the counter value by 1.',
      'Update the textContent of the #count-display element to show the new number.',
    ],
    hints: [
      'let count = 0;',
      'const display = document.querySelector("#count-display");',
      'document.querySelector("#increment-btn").addEventListener("click", () => { count++; display.textContent = count; });',
    ],
    starterCode: {
      html: `<div class="counter-card">
  <h2>Interactive Click Counter</h2>
  <div class="display-box">
    Count: <span id="count-display">0</span>
  </div>
  <button id="increment-btn" class="action-btn">Increment +1</button>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0b1120;
  color: #f1f5f9;
  padding: 24px;
}

.counter-card {
  max-width: 400px;
  margin: 0 auto;
  background: #1e293b;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  border: 1px solid #334155;
}

h2 {
  margin-top: 0;
  color: #38bdf8;
}

.display-box {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 20px 0;
  color: #f8fafc;
}

#count-display {
  color: #38bdf8;
}

.action-btn {
  background: #0284c7;
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.action-btn:hover {
  background: #0369a1;
}`,
      js: `// Add click event listener to #increment-btn below:
`,
    },
    solutionCode: {
      html: `<div class="counter-card">
  <h2>Interactive Click Counter</h2>
  <div class="display-box">
    Count: <span id="count-display">0</span>
  </div>
  <button id="increment-btn" class="action-btn">Increment +1</button>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0b1120;
  color: #f1f5f9;
  padding: 24px;
}

.counter-card {
  max-width: 400px;
  margin: 0 auto;
  background: #1e293b;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  border: 1px solid #334155;
}

h2 {
  margin-top: 0;
  color: #38bdf8;
}

.display-box {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 20px 0;
  color: #f8fafc;
}

#count-display {
  color: #38bdf8;
}

.action-btn {
  background: #0284c7;
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.action-btn:hover {
  background: #0369a1;
}`,
      js: `let count = 0;
const display = document.querySelector("#count-display");
const btn = document.querySelector("#increment-btn");

btn.addEventListener("click", () => {
  count += 1;
  display.textContent = count;
});`,
    },
    validationRules: [
      {
        id: 'click_simulation',
        description: 'Clicking #increment-btn increases #count-display value',
        type: 'CUSTOM',
        test: ({ doc }) => {
          const btn = doc.querySelector('#increment-btn');
          const display = doc.querySelector('#count-display');
          if (!btn) return { pass: false, message: 'Missing #increment-btn.' };
          if (!display) return { pass: false, message: 'Missing #count-display.' };

          const initialVal = parseInt(display.textContent.trim(), 10) || 0;
          btn.click(); // Dispatch click event
          const afterOneClick = parseInt(display.textContent.trim(), 10);
          btn.click(); // Dispatch 2nd click
          const afterTwoClicks = parseInt(display.textContent.trim(), 10);

          const pass = afterOneClick === initialVal + 1 && afterTwoClicks === initialVal + 2;
          return {
            pass,
            message: pass ? 'Click events successfully increment counter' : `Counter after 2 clicks: ${afterTwoClicks} (expected ${initialVal + 2})`,
          };
        },
      },
    ],
  },

  {
    id: 'js-dynamic-elements',
    trackId: 'javascript',
    order: 4,
    title: 'Dynamic Element Creation & Append',
    shortDesc: 'Construct DOM nodes dynamically with document.createElement and appendChild.',
    difficulty: 'Intermediate',
    estimatedTime: '15 min',
    theory: `### Dynamic Element Creation in JavaScript

JavaScript can generate new elements programmatically and attach them into the DOM tree:
\`\`\`javascript
// 1. Create a new DOM node
const newItem = document.createElement('li');

// 2. Set content and attributes
newItem.textContent = 'Dynamic List Item';
newItem.classList.add('item-highlight');

// 3. Mount into parent element
const listContainer = document.querySelector('#item-list');
listContainer.appendChild(newItem);
\`\`\`
This pattern is foundational for building live feeds, shopping carts, and interactive lists.`,
    instructions: [
      'Write a function or code that creates a new <li> element.',
      'Set its textContent to "Completed Milestone".',
      'Add class="task-done" to the new <li>.',
      'Append the new <li> inside the unordered list with id="task-list".',
    ],
    hints: [
      'const li = document.createElement("li");',
      'li.textContent = "Completed Milestone";',
      'li.classList.add("task-done");',
      'document.querySelector("#task-list").appendChild(li);',
    ],
    starterCode: {
      html: `<div class="card">
  <h2>Task Tracker</h2>
  <ul id="task-list">
    <li>Review project goals</li>
  </ul>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
  padding: 24px;
}

.card {
  max-width: 440px;
  margin: 0 auto;
  background: #1e293b;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #334155;
}

h2 {
  margin-top: 0;
  color: #38bdf8;
}

ul {
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
  color: #cbd5e1;
}

li.task-done {
  color: #34d399;
  font-weight: 600;
  list-style-type: '✓ ';
}`,
      js: `// Dynamically create and append the new <li> element below:
`,
    },
    solutionCode: {
      html: `<div class="card">
  <h2>Task Tracker</h2>
  <ul id="task-list">
    <li>Review project goals</li>
  </ul>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
  padding: 24px;
}

.card {
  max-width: 440px;
  margin: 0 auto;
  background: #1e293b;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #334155;
}

h2 {
  margin-top: 0;
  color: #38bdf8;
}

ul {
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
  color: #cbd5e1;
}

li.task-done {
  color: #34d399;
  font-weight: 600;
  list-style-type: '✓ ';
}`,
      js: `const li = document.createElement("li");
li.textContent = "Completed Milestone";
li.classList.add("task-done");
document.querySelector("#task-list").appendChild(li);`,
    },
    validationRules: [
      {
        id: 'li_appended',
        description: 'New <li> with class "task-done" is appended to #task-list',
        type: 'CUSTOM',
        test: ({ doc }) => {
          const list = doc.querySelector('#task-list');
          if (!list) return { pass: false, message: 'Missing #task-list element.' };
          const items = list.querySelectorAll('li.task-done');
          if (items.length === 0) return { pass: false, message: 'No <li> with class="task-done" found in #task-list.' };
          const item = items[0];
          const hasText = item.textContent.includes('Completed Milestone');
          return {
            pass: hasText,
            message: hasText ? 'Dynamic element successfully mounted' : `Item found but text is "${item.textContent}" (expected "Completed Milestone")`,
          };
        },
      },
    ],
  },

  {
    id: 'js-array-iteration',
    trackId: 'javascript',
    order: 5,
    title: 'Array Iteration & List Rendering',
    shortDesc: 'Iterate data arrays using forEach to render dynamic collections into the UI.',
    difficulty: 'Intermediate',
    estimatedTime: '15 min',
    theory: `### Rendering Dynamic Arrays into the DOM

Modern web apps constantly render collections of data (products, messages, search results):
\`\`\`javascript
const courses = ['HTML Basics', 'CSS Layouts', 'Modern JavaScript'];
const container = document.querySelector('#catalog');

courses.forEach((course) => {
  const card = document.createElement('div');
  card.className = 'course-badge';
  card.textContent = course;
  container.appendChild(card);
});
\`\`\`
The \`.forEach()\` method executes a callback for each item in the array, making DOM rendering concise and reproducible.`,
    instructions: [
      'In script.js, you are given an array: const frameworks = ["React", "Vue", "Angular", "Svelte"];',
      'Use frameworks.forEach() to iterate over each framework.',
      'For each item, create a <div> element with class="framework-pill".',
      'Set its textContent to the framework name and append it to #frameworks-container.',
    ],
    hints: [
      'frameworks.forEach(name => {',
      '  const pill = document.createElement("div");',
      '  pill.className = "framework-pill";',
      '  pill.textContent = name;',
      '  container.appendChild(pill);',
      '});',
    ],
    starterCode: {
      html: `<div class="card">
  <h2>Frontend Frameworks</h2>
  <div id="frameworks-container" class="pills-grid">
    <!-- Framework pills will be rendered dynamically here -->
  </div>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0b1120;
  color: #f1f5f9;
  padding: 24px;
}

.card {
  max-width: 480px;
  margin: 0 auto;
  background: #1e293b;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #334155;
}

h2 {
  margin-top: 0;
  color: #38bdf8;
}

.pills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.framework-pill {
  background: #0f172a;
  border: 1px solid #38bdf8;
  color: #38bdf8;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}`,
      js: `const frameworks = ["React", "Vue", "Angular", "Svelte"];
const container = document.querySelector("#frameworks-container");

// Iterate through frameworks and render each pill:
`,
    },
    solutionCode: {
      html: `<div class="card">
  <h2>Frontend Frameworks</h2>
  <div id="frameworks-container" class="pills-grid">
  </div>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background-color: #0b1120;
  color: #f1f5f9;
  padding: 24px;
}

.card {
  max-width: 480px;
  margin: 0 auto;
  background: #1e293b;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #334155;
}

h2 {
  margin-top: 0;
  color: #38bdf8;
}

.pills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.framework-pill {
  background: #0f172a;
  border: 1px solid #38bdf8;
  color: #38bdf8;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}`,
      js: `const frameworks = ["React", "Vue", "Angular", "Svelte"];
const container = document.querySelector("#frameworks-container");

frameworks.forEach((name) => {
  const pill = document.createElement("div");
  pill.className = "framework-pill";
  pill.textContent = name;
  container.appendChild(pill);
});`,
    },
    validationRules: [
      {
        id: 'pills_rendered',
        description: 'All 4 framework pills (.framework-pill) are rendered into #frameworks-container',
        type: 'CUSTOM',
        test: ({ doc }) => {
          const container = doc.querySelector('#frameworks-container');
          if (!container) return { pass: false, message: 'Missing #frameworks-container.' };
          const pills = container.querySelectorAll('.framework-pill');
          if (pills.length < 4) {
            return { pass: false, message: `Rendered ${pills.length}/4 framework pills.` };
          }
          const texts = Array.from(pills).map((p) => p.textContent.trim());
          const expected = ['React', 'Vue', 'Angular', 'Svelte'];
          const missing = expected.filter((name) => !texts.includes(name));
          return {
            pass: missing.length === 0,
            message: missing.length === 0 ? 'All 4 framework pills verified' : `Missing: ${missing.join(', ')}`,
          };
        },
      },
    ],
  },
];
