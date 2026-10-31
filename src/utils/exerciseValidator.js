/**
 * Exercise Validation Engine for WebDev LMS Platform
 * Genuine automated evaluation of student code against DOM, CSS, and JS criteria.
 */

/**
 * Normalizes color strings for reliable style comparisons (rgb, hex)
 */
export function normalizeColor(val) {
  if (!val) return '';
  const trimmed = String(val).trim().toLowerCase();
  // If hex 6 chars e.g. #38bdf8 -> rgb(56, 189, 248)
  if (/^#([0-9a-f]{6})$/i.test(trimmed)) {
    const r = parseInt(trimmed.slice(1, 3), 16);
    const g = parseInt(trimmed.slice(3, 5), 16);
    const b = parseInt(trimmed.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }
  return trimmed.replace(/\s*,\s*/g, ', ');
}

/**
 * Checks whether computed style matches expected value(s)
 */
export function styleMatches(actual, expected) {
  if (actual === undefined || actual === null) return false;
  const actualStr = String(actual).trim().toLowerCase();

  const matchSingle = (exp) => {
    const expStr = String(exp).trim().toLowerCase();
    if (actualStr === expStr) return true;
    if (normalizeColor(actualStr) === normalizeColor(expStr)) return true;
    // Allow matching without quotes e.g. "border-box" vs border-box
    if (actualStr.replace(/['"]/g, '') === expStr.replace(/['"]/g, '')) return true;
    return false;
  };

  if (Array.isArray(expected)) {
    return expected.some(matchSingle);
  }
  return matchSingle(expected);
}

/**
 * Validates a lesson's code against its declared validation rules.
 * Supports both live browser iframe context and headless DOM environments (Vitest / Happy-DOM).
 *
 * @param {Object} lesson - Lesson definition with validationRules
 * @param {Object} code - { html, css, js }
 * @param {Object} [context] - Optional { doc, win }
 * @returns {Promise<{ overallPassed: boolean, passedCount: number, totalCount: number, results: Array<{ id: string, description: string, passed: boolean, message: string }> }>}
 */
export async function validateExercise(lesson, code, context = null) {
  const { validationRules = [] } = lesson;
  const html = code?.html || '';
  const css = code?.css || '';
  const js = code?.js || '';

  let doc = context?.doc;
  let win = context?.win;

  let createdContainer = null;

  // If no document context provided, construct a clean simulated DOM environment
  if (!doc) {
    if (typeof window !== 'undefined' && window.document) {
      doc = window.document.implementation.createHTMLDocument('Sandbox');
      win = window;
    } else {
      // Fallback for non-browser Node environments
      throw new Error('No DOM environment available for exercise evaluation');
    }

    // Attach CSS in a style tag
    const styleEl = doc.createElement('style');
    styleEl.textContent = css;
    doc.head.appendChild(styleEl);

    // Attach HTML into body
    doc.body.innerHTML = html;

    // Execute JS inside this isolated document context if provided
    if (js && js.trim().length > 0) {
      try {
        const scriptFn = new Function('document', 'window', js);
        scriptFn(doc, win);
      } catch (err) {
        // We do not throw here; runtime exceptions will be caught by behavioral assertions
      }
    }
  }

  const results = [];

  for (const rule of validationRules) {
    try {
      if (rule.type === 'ELEMENT_EXISTS') {
        const el = doc.querySelector(rule.selector);
        const passed = Boolean(el);
        results.push({
          id: rule.id,
          description: rule.description,
          passed,
          message: passed ? `Element "${rule.selector}" verified` : `Element matching "${rule.selector}" not found`,
        });
      } else if (rule.type === 'ELEMENT_TEXT') {
        const el = doc.querySelector(rule.selector);
        if (!el) {
          results.push({
            id: rule.id,
            description: rule.description,
            passed: false,
            message: `Element "${rule.selector}" not found`,
          });
          continue;
        }

        const actualText = el.textContent.trim();
        let passed = false;
        if (rule.ignoreCase) {
          passed = actualText.toLowerCase().includes(String(rule.text).toLowerCase());
        } else {
          passed = actualText.includes(String(rule.text));
        }

        results.push({
          id: rule.id,
          description: rule.description,
          passed,
          message: passed ? `Text matches "${rule.text}"` : `Text "${actualText}" does not contain expected "${rule.text}"`,
        });
      } else if (rule.type === 'ELEMENT_ATTRIBUTE') {
        const el = doc.querySelector(rule.selector);
        if (!el) {
          results.push({
            id: rule.id,
            description: rule.description,
            passed: false,
            message: `Element "${rule.selector}" not found`,
          });
          continue;
        }

        const actualAttr = el.getAttribute(rule.attribute);
        const passed = actualAttr !== null && actualAttr.trim() === String(rule.expectedValue).trim();
        results.push({
          id: rule.id,
          description: rule.description,
          passed,
          message: passed
            ? `Attribute [${rule.attribute}="${rule.expectedValue}"] verified`
            : `Attribute [${rule.attribute}] has value "${actualAttr || 'null'}", expected "${rule.expectedValue}"`,
        });
      } else if (rule.type === 'COMPUTED_STYLE') {
        const el = doc.querySelector(rule.selector);
        if (!el) {
          results.push({
            id: rule.id,
            description: rule.description,
            passed: false,
            message: `Element "${rule.selector}" not found to check styles`,
          });
          continue;
        }

        let computedVal = '';
        if (win && typeof win.getComputedStyle === 'function') {
          const comp = win.getComputedStyle(el);
          computedVal = comp[rule.property] || comp.getPropertyValue?.(rule.property) || '';
        }

        // Fallback: Check inline or stylesheet rules if computed style is empty in Happy-DOM
        let matched = styleMatches(computedVal, rule.expectedValue);
        if (!matched && css) {
          const propHyphenated = rule.property.replace(/([A-Z])/g, '-$1').toLowerCase();
          const regex = new RegExp(`${rule.selector.replace('.', '\\.')}[^{]*\\{[^}]*${propHyphenated}\\s*:\\s*([^;]+);?`, 'i');
          const m = css.match(regex);
          if (m && m[1]) {
            const rawVal = m[1].trim();
            matched = styleMatches(rawVal, rule.expectedValue);
          }
        }

        results.push({
          id: rule.id,
          description: rule.description,
          passed: Boolean(matched),
          message: matched
            ? `Style property "${rule.property}" matches expected criteria`
            : `Style "${rule.property}" value is "${computedVal || 'none'}", expected "${Array.isArray(rule.expectedValue) ? rule.expectedValue.join(' or ') : rule.expectedValue}"`,
        });
      } else if (rule.type === 'CUSTOM') {
        const customRes = rule.test({ doc, win, html, css, js });
        results.push({
          id: rule.id,
          description: rule.description,
          passed: Boolean(customRes?.pass),
          message: customRes?.message || (customRes?.pass ? 'Condition satisfied' : 'Check failed'),
        });
      }
    } catch (ruleErr) {
      results.push({
        id: rule.id,
        description: rule.description,
        passed: false,
        message: `Evaluation error: ${ruleErr.message}`,
      });
    }
  }

  const passedCount = results.filter((r) => r.passed).length;
  const overallPassed = validationRules.length > 0 && passedCount === validationRules.length;

  return {
    overallPassed,
    passedCount,
    totalCount: validationRules.length,
    results,
  };
}

/**
 * Calculates progress percentage for a specific track
 */
export function calculateTrackProgress(lessons, completedLessonIds = [], trackId) {
  const trackLessons = lessons.filter((l) => l.trackId === trackId);
  if (trackLessons.length === 0) return 0;
  const completedCount = trackLessons.filter((l) => completedLessonIds.includes(l.id)).length;
  return Math.round((completedCount / trackLessons.length) * 100);
}

/**
 * Calculates overall progress percentage across all lessons
 */
export function calculateOverallProgress(lessons, completedLessonIds = []) {
  if (!lessons || lessons.length === 0) return 0;
  const uniqueCompleted = completedLessonIds.filter((id) => lessons.some((l) => l.id === id));
  return Math.round((uniqueCompleted.length / lessons.length) * 100);
}

/**
 * Determines whether a lesson is unlocked for the user.
 * - Order 1 in any track is always unlocked.
 * - Order N is unlocked if Order N-1 in the same track is completed.
 */
export function isLessonUnlocked(lessonId, lessons, completedLessonIds = []) {
  const target = lessons.find((l) => l.id === lessonId);
  if (!target) return false;
  if (target.order === 1) return true;

  // Find previous lesson in the same track
  const prevLesson = lessons.find(
    (l) => l.trackId === target.trackId && l.order === target.order - 1
  );

  if (!prevLesson) return true;
  return completedLessonIds.includes(prevLesson.id);
}

/**
 * Generates sandboxed HTML document string for the live preview iframe.
 * Includes virtual console interception and error listener.
 */
export function assemblePreviewDoc(html, css, js) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      /* Student CSS */
      ${css || ''}
    </style>
    <script>
      // Sandboxed error handler
      window.onerror = function(msg, url, line, col) {
        window.parent.postMessage({
          type: 'LMS_CONSOLE_EVENT',
          level: 'error',
          message: 'Error (' + line + ':' + col + '): ' + msg
        }, '*');
      };
    </script>
  </head>
  <body>
    <!-- Student HTML -->
    ${html || ''}

    <script>
      try {
        ${js || ''}
      } catch (err) {
        console.error('Runtime error: ' + err.message);
      }
    </script>
  </body>
</html>`;
}
