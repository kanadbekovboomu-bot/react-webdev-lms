import { describe, it, expect, beforeEach } from 'vitest';
import {
  validateExercise,
  calculateOverallProgress,
  calculateTrackProgress,
  isLessonUnlocked,
  assemblePreviewDoc,
  normalizeColor,
  styleMatches,
} from '../utils/exerciseValidator';
import { LESSONS } from '../data/lessonsData';

describe('WebDev LMS Exercise Validator Engine', () => {
  describe('Color and Style Matching Helpers', () => {
    it('normalizes hex to rgb', () => {
      expect(normalizeColor('#38bdf8')).toBe('rgb(56, 189, 248)');
      expect(normalizeColor('#ffffff')).toBe('rgb(255, 255, 255)');
      expect(normalizeColor('#fff')).toBe('rgb(255, 255, 255)');
      expect(normalizeColor('#000')).toBe('rgb(0, 0, 0)');
      expect(normalizeColor('rgb( 56, 189, 248 )')).toBe('rgb(56, 189, 248)');
    });

    it('matches color styles across hex and rgb formats', () => {
      expect(styleMatches('rgb(56, 189, 248)', '#38bdf8')).toBe(true);
      expect(styleMatches('rgb( 56, 189, 248 )', '#38bdf8')).toBe(true);
      expect(styleMatches('rgb(255, 255, 255)', '#fff')).toBe(true);
      expect(styleMatches('#38bdf8', 'rgb(56, 189, 248)')).toBe(true);
      expect(styleMatches('border-box', 'border-box')).toBe(true);
    });

    it('matches value against an array of allowed values', () => {
      expect(styleMatches('16px', ['16px', '16px 16px'])).toBe(true);
      expect(styleMatches('none', ['16px', '20px'])).toBe(false);
    });
  });

  describe('HTML Track Exercise Validation', () => {
    it('validates html-skeleton lesson solution successfully', async () => {
      const lesson = LESSONS.find((l) => l.id === 'html-skeleton');
      expect(lesson).toBeDefined();

      const result = await validateExercise(lesson, lesson.solutionCode);
      expect(result.overallPassed).toBe(true);
      expect(result.passedCount).toBe(result.totalCount);
      expect(result.results.every((r) => r.passed)).toBe(true);
    });

    it('fails html-skeleton when main heading is missing or wrong text', async () => {
      const lesson = LESSONS.find((l) => l.id === 'html-skeleton');
      const faultyCode = {
        html: '<div><h1>Wrong Title</h1><p>This is a long description paragraph.</p><h2>Getting Started</h2></div>',
        css: '',
        js: '',
      };

      const result = await validateExercise(lesson, faultyCode);
      expect(result.overallPassed).toBe(false);
      const h1Rule = result.results.find((r) => r.id === 'h1_exists');
      expect(h1Rule.passed).toBe(false);
    });

    it('fails html-skeleton when paragraph text is too short (< 10 chars)', async () => {
      const lesson = LESSONS.find((l) => l.id === 'html-skeleton');
      const faultyCode = {
        html: '<div><h1>Welcome to WebDev LMS</h1><p>Short</p><h2>Getting Started</h2></div>',
        css: '',
        js: '',
      };

      const result = await validateExercise(lesson, faultyCode);
      expect(result.overallPassed).toBe(false);
      const pRule = result.results.find((r) => r.id === 'p_exists');
      expect(pRule.passed).toBe(false);
    });

    it('validates html-links-images solution successfully', async () => {
      const lesson = LESSONS.find((l) => l.id === 'html-links-images');
      const result = await validateExercise(lesson, lesson.solutionCode);
      expect(result.overallPassed).toBe(true);
      expect(result.passedCount).toBe(3);
    });

    it('fails html-links-images when image alt attribute is missing', async () => {
      const lesson = LESSONS.find((l) => l.id === 'html-links-images');
      const faultyCode = {
        html: '<div class="card"><a href="https://developer.mozilla.org" target="_blank">MDN</a><img src="https://images.unsplash.com/photo-1"></div>',
        css: '',
        js: '',
      };

      const result = await validateExercise(lesson, faultyCode);
      expect(result.overallPassed).toBe(false);
      const imgRule = result.results.find((r) => r.id === 'img_src_alt');
      expect(imgRule.passed).toBe(false);
    });

    it('validates html-lists-containers solution successfully', async () => {
      const lesson = LESSONS.find((l) => l.id === 'html-lists-containers');
      const result = await validateExercise(lesson, lesson.solutionCode);
      expect(result.overallPassed).toBe(true);
    });

    it('validates html-forms solution successfully', async () => {
      const lesson = LESSONS.find((l) => l.id === 'html-forms');
      const result = await validateExercise(lesson, lesson.solutionCode);
      expect(result.overallPassed).toBe(true);
    });
  });

  describe('CSS Track Exercise Validation', () => {
    it('validates css-selectors-colors solution successfully', async () => {
      const lesson = LESSONS.find((l) => l.id === 'css-selectors-colors');
      const result = await validateExercise(lesson, lesson.solutionCode);
      expect(result.overallPassed).toBe(true);
    });

    it('validates css-box-model solution successfully', async () => {
      const lesson = LESSONS.find((l) => l.id === 'css-box-model');
      const result = await validateExercise(lesson, lesson.solutionCode);
      expect(result.overallPassed).toBe(true);
    });

    it('validates css-flexbox-basics solution successfully', async () => {
      const lesson = LESSONS.find((l) => l.id === 'css-flexbox-basics');
      const result = await validateExercise(lesson, lesson.solutionCode);
      expect(result.overallPassed).toBe(true);
    });

    it('validates css-flexbox-alignment solution successfully', async () => {
      const lesson = LESSONS.find((l) => l.id === 'css-flexbox-alignment');
      const result = await validateExercise(lesson, lesson.solutionCode);
      expect(result.overallPassed).toBe(true);
    });

    it('validates css-grid-responsive solution successfully', async () => {
      const lesson = LESSONS.find((l) => l.id === 'css-grid-responsive');
      const result = await validateExercise(lesson, lesson.solutionCode);
      expect(result.overallPassed).toBe(true);
    });
  });

  describe('JavaScript Track Exercise Validation', () => {
    it('validates js-variables-strings solution successfully', async () => {
      const lesson = LESSONS.find((l) => l.id === 'js-variables-strings');
      const result = await validateExercise(lesson, lesson.solutionCode);
      expect(result.overallPassed).toBe(true);
    });

    it('validates js-dom-manipulation solution successfully', async () => {
      const lesson = LESSONS.find((l) => l.id === 'js-dom-manipulation');
      const result = await validateExercise(lesson, lesson.solutionCode);
      expect(result.overallPassed).toBe(true);
    });

    it('validates js-event-handling interactive click simulation', async () => {
      const lesson = LESSONS.find((l) => l.id === 'js-event-handling');
      const result = await validateExercise(lesson, lesson.solutionCode);
      expect(result.overallPassed).toBe(true);
    });

    it('validates js-dynamic-elements solution successfully', async () => {
      const lesson = LESSONS.find((l) => l.id === 'js-dynamic-elements');
      const result = await validateExercise(lesson, lesson.solutionCode);
      expect(result.overallPassed).toBe(true);
    });

    it('validates js-array-iteration solution successfully', async () => {
      const lesson = LESSONS.find((l) => l.id === 'js-array-iteration');
      const result = await validateExercise(lesson, lesson.solutionCode);
      expect(result.overallPassed).toBe(true);
    });
  });

  describe('Progress Tracking Calculations', () => {
    it('calculates 0% when no lessons are completed', () => {
      expect(calculateOverallProgress(LESSONS, [])).toBe(0);
      expect(calculateTrackProgress(LESSONS, [], 'html')).toBe(0);
      expect(calculateTrackProgress(LESSONS, [], 'css')).toBe(0);
      expect(calculateTrackProgress(LESSONS, [], 'javascript')).toBe(0);
    });

    it('calculates 100% when all 15 lessons are completed', () => {
      const allIds = LESSONS.map((l) => l.id);
      expect(calculateOverallProgress(LESSONS, allIds)).toBe(100);
      expect(calculateTrackProgress(LESSONS, allIds, 'html')).toBe(100);
      expect(calculateTrackProgress(LESSONS, allIds, 'css')).toBe(100);
      expect(calculateTrackProgress(LESSONS, allIds, 'javascript')).toBe(100);
    });

    it('calculates accurate partial progress and rounds correctly', () => {
      // 5 HTML lessons completed out of 15 total = 33.333% -> 33%
      const htmlIds = LESSONS.filter((l) => l.trackId === 'html').map((l) => l.id);
      expect(calculateOverallProgress(LESSONS, htmlIds)).toBe(33);
      expect(calculateTrackProgress(LESSONS, htmlIds, 'html')).toBe(100);
      expect(calculateTrackProgress(LESSONS, htmlIds, 'css')).toBe(0);

      // 2 CSS lessons completed out of 5 = 40%
      const twoCss = ['css-selectors-colors', 'css-box-model'];
      expect(calculateTrackProgress(LESSONS, twoCss, 'css')).toBe(40);
    });

    it('handles empty lessons or unknown track gracefully without NaN', () => {
      expect(calculateOverallProgress([], ['some-id'])).toBe(0);
      expect(calculateTrackProgress(LESSONS, ['some-id'], 'unknown-track')).toBe(0);
    });
  });

  describe('Lesson Unlocking Hierarchy', () => {
    it('always unlocks order 1 lessons in every track', () => {
      expect(isLessonUnlocked('html-skeleton', LESSONS, [])).toBe(true);
      expect(isLessonUnlocked('css-selectors-colors', LESSONS, [])).toBe(true);
      expect(isLessonUnlocked('js-variables-strings', LESSONS, [])).toBe(true);
    });

    it('locks order 2 lesson until order 1 in same track is completed', () => {
      expect(isLessonUnlocked('html-links-images', LESSONS, [])).toBe(false);
      expect(isLessonUnlocked('html-links-images', LESSONS, ['css-selectors-colors'])).toBe(false);
      expect(isLessonUnlocked('html-links-images', LESSONS, ['html-skeleton'])).toBe(true);
    });

    it('progressively unlocks lessons as sequence is completed', () => {
      const completed = ['html-skeleton', 'html-links-images'];
      expect(isLessonUnlocked('html-lists-containers', LESSONS, completed)).toBe(true);
      expect(isLessonUnlocked('html-semantic-layout', LESSONS, completed)).toBe(false);
    });
  });

  describe('Preview Document Sandbox Assembler', () => {
    it('assembles a sandboxed HTML document string embedding css and js', () => {
      const doc = assemblePreviewDoc('<h1>Hello World</h1>', 'h1 { color: red; }', 'console.log("ready");');
      expect(doc).toContain('<!DOCTYPE html>');
      expect(doc).toContain('h1 { color: red; }');
      expect(doc).toContain('<h1>Hello World</h1>');
      expect(doc).toContain('console.log("ready");');
      expect(doc).toContain('LMS_CONSOLE_EVENT');
    });
  });
});
