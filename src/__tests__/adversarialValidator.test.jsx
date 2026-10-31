import { describe, it, expect } from 'vitest';
import {
  validateExercise,
  normalizeColor,
  styleMatches,
  calculateTrackProgress,
  calculateOverallProgress,
  isLessonUnlocked,
  assemblePreviewDoc
} from '../utils/exerciseValidator';

describe('Adversarial Stress Tests - LMS Exercise Validator', () => {
  describe('CSS Color Normalization & Style Matching Stress Harness', () => {
    it('normalizes 6-character lowercase and uppercase hex codes to rgb', () => {
      expect(normalizeColor('#38bdf8')).toBe('rgb(56, 189, 248)');
      expect(normalizeColor('#38BDF8')).toBe('rgb(56, 189, 248)');
      expect(normalizeColor('#FFFFFF')).toBe('rgb(255, 255, 255)');
      expect(normalizeColor('#000000')).toBe('rgb(0, 0, 0)');
    });

    it('normalizes whitespace in rgb and supports 3-char hex codes', () => {
      expect(normalizeColor('rgb(  56 ,  189  ,248 )')).toBe('rgb(56, 189, 248)');
      expect(normalizeColor('rgb(255,   255,   255)')).toBe('rgb(255, 255, 255)');
      expect(normalizeColor('#fff')).toBe('rgb(255, 255, 255)');
      expect(normalizeColor('#000')).toBe('rgb(0, 0, 0)');
    });

    it('matches color styles across hex and rgb formats bidirectionally for standard and shorthand formatting', () => {
      expect(styleMatches('rgb(56, 189, 248)', '#38bdf8')).toBe(true);
      expect(styleMatches('#38bdf8', 'rgb(56, 189, 248)')).toBe(true);
      expect(styleMatches('#38BDF8', 'rgb(56, 189, 248)')).toBe(true);
      // Now passes on inner spaces due to whitespace normalization
      expect(styleMatches('rgb(  56 , 189 , 248 )', '#38bdf8')).toBe(true);
      expect(styleMatches('#fff', 'rgb(255, 255, 255)')).toBe(true);
    });

    it('handles quoted vs unquoted string style matching', () => {
      expect(styleMatches('"border-box"', 'border-box')).toBe(true);
      expect(styleMatches("'monospace'", 'monospace')).toBe(true);
      expect(styleMatches('Arial', '"Arial"')).toBe(true);
    });

    it('returns false for null or undefined actual style values without crashing', () => {
      expect(styleMatches(null, '16px')).toBe(false);
      expect(styleMatches(undefined, '#fff')).toBe(false);
    });
  });

  describe('DOM Validation Assertions Edge Cases', () => {
    it('handles case-sensitive vs case-insensitive text assertions correctly', async () => {
      const lesson = {
        validationRules: [
          {
            id: 'case_sensitive_check',
            type: 'ELEMENT_TEXT',
            selector: 'h1',
            text: 'Hello World',
            ignoreCase: false,
          },
          {
            id: 'case_insensitive_check',
            type: 'ELEMENT_TEXT',
            selector: 'p',
            text: 'welcome here',
            ignoreCase: true,
          },
        ],
      };

      // Exact case for h1, lowercase for p
      const goodCode = {
        html: '<h1>Hello World</h1><p>WELCOME HERE TO ALL</p>',
        css: '',
        js: '',
      };
      const resPass = await validateExercise(lesson, goodCode);
      expect(resPass.overallPassed).toBe(true);

      // Wrong case for h1
      const badCode = {
        html: '<h1>hello world</h1><p>WELCOME HERE</p>',
        css: '',
        js: '',
      };
      const resFail = await validateExercise(lesson, badCode);
      expect(resFail.overallPassed).toBe(false);
      expect(resFail.results[0].passed).toBe(false); // Case sensitive failed
      expect(resFail.results[1].passed).toBe(true);  // Case insensitive passed
    });

    it('handles missing elements gracefully across all rule types', async () => {
      const lesson = {
        validationRules: [
          { id: 'rule_exists', type: 'ELEMENT_EXISTS', selector: '.ghost' },
          { id: 'rule_text', type: 'ELEMENT_TEXT', selector: '.ghost', text: 'hi' },
          { id: 'rule_attr', type: 'ELEMENT_ATTRIBUTE', selector: '.ghost', attribute: 'href', expectedValue: '#' },
          { id: 'rule_style', type: 'COMPUTED_STYLE', selector: '.ghost', property: 'color', expectedValue: 'red' },
        ],
      };

      const emptyCode = { html: '<div>No ghost here</div>', css: '', js: '' };
      const res = await validateExercise(lesson, emptyCode);
      expect(res.overallPassed).toBe(false);
      expect(res.passedCount).toBe(0);
      expect(res.results.every((r) => !r.passed)).toBe(true);
    });

    it('handles malformed CSS selector syntax without crashing the runner', async () => {
      const lesson = {
        validationRules: [
          {
            id: 'invalid_selector',
            type: 'ELEMENT_EXISTS',
            selector: 'div[invalid==selector]]',
          },
        ],
      };

      const code = { html: '<div>Valid</div>', css: '', js: '' };
      const res = await validateExercise(lesson, code);
      expect(res.overallPassed).toBe(false);
      expect(res.results[0].passed).toBe(false);
      expect(res.results[0].message).toContain('Evaluation error:');
    });

    it('catches exceptions inside CUSTOM validation rules safely', async () => {
      const lesson = {
        validationRules: [
          {
            id: 'exploding_rule',
            type: 'CUSTOM',
            test: () => {
              throw new Error('Fatal rule failure inside custom evaluator');
            },
          },
        ],
      };

      const code = { html: '<p>Test</p>', css: '', js: '' };
      const res = await validateExercise(lesson, code);
      expect(res.overallPassed).toBe(false);
      expect(res.results[0].passed).toBe(false);
      expect(res.results[0].message).toContain('Fatal rule failure');
    });
  });

  describe('Extreme & Malformed Student Inputs', () => {
    it('handles severely broken student HTML without crashing', async () => {
      const lesson = {
        validationRules: [
          { id: 'h1_check', type: 'ELEMENT_EXISTS', selector: 'h1' },
        ],
      };

      const brokenHtmls = [
        '<div class="unclosed-tag<h1>Some text',
        '<<<<>>>>><><><<<>>',
        '<!-- unclosed comment <h1>Title</h1>',
        '<script>console.log("embedded");</script><h1>Valid Tag</h1>',
        'A'.repeat(50000), // Very large payload
      ];

      for (const html of brokenHtmls) {
        const res = await validateExercise(lesson, { html, css: '', js: '' });
        expect(res).toBeDefined();
        expect(typeof res.overallPassed).toBe('boolean');
        expect(Array.isArray(res.results)).toBe(true);
      }
    });

    it('handles broken student JS syntax and runtime errors without crashing validation', async () => {
      const lesson = {
        validationRules: [
          { id: 'div_check', type: 'ELEMENT_EXISTS', selector: 'div#app' },
        ],
      };

      const brokenJsList = [
        'function { broken syntax !!!',
        'throw new Error("Instant student crash");',
        'window.nonExistentMethod.call();',
        'while (false) {}',
      ];

      for (const js of brokenJsList) {
        const res = await validateExercise(lesson, {
          html: '<div id="app">App Ready</div>',
          css: '',
          js,
        });
        expect(res.overallPassed).toBe(true); // HTML assertion passes despite JS syntax/runtime error
      }
    });

    it('handles null, undefined, or empty code object', async () => {
      const lesson = {
        validationRules: [
          { id: 'check', type: 'ELEMENT_EXISTS', selector: 'body' },
        ],
      };

      const resNull = await validateExercise(lesson, null);
      expect(resNull).toBeDefined();

      const resEmpty = await validateExercise(lesson, {});
      expect(resEmpty).toBeDefined();
    });
  });

  describe('Progress Tracking & Unlocking Edge Cases', () => {
    it('prevents progress inflation past 100% when completed IDs contain duplicates', () => {
      const mockLessons = [
        { id: 'l1', trackId: 'html', order: 1 },
        { id: 'l2', trackId: 'html', order: 2 },
      ];

      // Array with duplicate IDs e.g. repeated sync or multiple completion events
      const duplicates = ['l1', 'l1', 'l1', 'l2', 'l2'];
      const overall = calculateOverallProgress(mockLessons, duplicates);
      // Hardened: deduplicates completed IDs and properly reports 100%
      expect(overall).toBe(100);

      // calculateTrackProgress also reports 100%
      const track = calculateTrackProgress(mockLessons, duplicates, 'html');
      expect(track).toBe(100);
    });

    it('handles unknown or empty trackId gracefully', () => {
      const mockLessons = [{ id: 'l1', trackId: 'html', order: 1 }];
      expect(calculateTrackProgress(mockLessons, ['l1'], '')).toBe(0);
      expect(calculateTrackProgress(mockLessons, ['l1'], 'non-existent')).toBe(0);
      expect(calculateTrackProgress([], ['l1'], 'html')).toBe(0);
    });

    it('handles lesson unlocking with missing or invalid IDs', () => {
      const mockLessons = [
        { id: 'l1', trackId: 'html', order: 1 },
        { id: 'l2', trackId: 'html', order: 2 },
      ];
      expect(isLessonUnlocked('non-existent', mockLessons, [])).toBe(false);
      expect(isLessonUnlocked('l2', mockLessons, null || [])).toBe(false);
      expect(isLessonUnlocked('l2', mockLessons, ['l1'])).toBe(true);
    });
  });
});
