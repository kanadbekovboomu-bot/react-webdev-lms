import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { TrackBar } from './components/TrackBar';
import { LessonGuide } from './components/LessonGuide';
import { CodeEditorPane } from './components/CodeEditorPane';
import { PreviewFrame } from './components/PreviewFrame';
import { TestResultsDrawer } from './components/TestResultsDrawer';
import { AuthModal } from './components/AuthModal';
import { TRACKS, LESSONS } from './data/lessonsData';
import {
  validateExercise,
  calculateOverallProgress,
  calculateTrackProgress,
  isLessonUnlocked,
} from './utils/exerciseValidator';
import { storageService } from './services/storageAdapter';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => storageService.getCurrentUser());
  const [isCloudSynced, setIsCloudSynced] = useState(() => storageService.isCloudSynced());
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [currentTrackId, setCurrentTrackId] = useState('html');
  const [currentLessonId, setCurrentLessonId] = useState('html-skeleton');
  const [activeEditorTab, setActiveEditorTab] = useState('html');

  // Completed lesson IDs
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const cached = localStorage.getItem('lms_completed_lessons');
      return cached ? JSON.parse(cached) : [];
    } catch (e) {
      return [];
    }
  });

  // Code store per lesson: { [lessonId]: { html, css, js } }
  const [codeStore, setCodeStore] = useState(() => {
    try {
      const cached = localStorage.getItem('lms_code_store');
      return cached ? JSON.parse(cached) : {};
    } catch (e) {
      return {};
    }
  });

  // Validation state
  const [validationResults, setValidationResults] = useState([]);
  const [overallPassed, setOverallPassed] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const iframeRef = useRef(null);

  // Active lesson object
  const currentLesson = LESSONS.find((l) => l.id === currentLessonId) || LESSONS[0];

  // Current code for active lesson
  const currentCode = codeStore[currentLesson.id] || { ...currentLesson.starterCode };

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = storageService.onAuthChange(async (user) => {
      setCurrentUser(user);
      setIsCloudSynced(storageService.isCloudSynced());

      if (user) {
        // Load cloud/offline progress
        const progressDoc = await storageService.fetchLMSProgress(user.uid);
        if (progressDoc && Array.isArray(progressDoc.completedLessons)) {
          setCompletedLessons((prev) => {
            const merged = Array.from(new Set([...prev, ...progressDoc.completedLessons]));
            localStorage.setItem('lms_completed_lessons', JSON.stringify(merged));
            return merged;
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Save completed lessons to storage when changed
  useEffect(() => {
    try {
      localStorage.setItem('lms_completed_lessons', JSON.stringify(completedLessons));
    } catch (e) {}

    if (currentUser?.uid) {
      const trackPercentages = {
        html: calculateTrackProgress(LESSONS, completedLessons, 'html'),
        css: calculateTrackProgress(LESSONS, completedLessons, 'css'),
        javascript: calculateTrackProgress(LESSONS, completedLessons, 'javascript'),
      };

      storageService.saveLMSProgress(currentUser.uid, {
        completedLessons,
        currentTrack: currentTrackId,
        lastActiveLessonId: currentLessonId,
        trackPercentages,
      });
    }
  }, [completedLessons, currentTrackId, currentLessonId, currentUser]);

  // Persist code changes
  const handleCodeChange = (tab, newContent) => {
    setCodeStore((prev) => {
      const existing = prev[currentLesson.id] || { ...currentLesson.starterCode };
      const updated = {
        ...prev,
        [currentLesson.id]: {
          ...existing,
          [tab]: newContent,
        },
      };
      try {
        localStorage.setItem('lms_code_store', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Reset to starter code
  const handleResetCode = () => {
    setCodeStore((prev) => {
      const updated = {
        ...prev,
        [currentLesson.id]: { ...currentLesson.starterCode },
      };
      try {
        localStorage.setItem('lms_code_store', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    setValidationResults([]);
    setOverallPassed(false);
  };

  // Switch Track
  const handleSelectTrack = (trackId) => {
    setCurrentTrackId(trackId);
    // Find first unlocked lesson in that track
    const trackLessons = LESSONS.filter((l) => l.trackId === trackId);
    const firstAvailable =
      trackLessons.find((l) => !completedLessons.includes(l.id) && isLessonUnlocked(l.id, LESSONS, completedLessons)) ||
      trackLessons[0];

    if (firstAvailable) {
      setCurrentLessonId(firstAvailable.id);
      setValidationResults([]);
      setOverallPassed(completedLessons.includes(firstAvailable.id));
      // Auto-switch editor tab to match track
      if (trackId === 'html') setActiveEditorTab('html');
      else if (trackId === 'css') setActiveEditorTab('css');
      else if (trackId === 'javascript') setActiveEditorTab('js');
    }
  };

  // Switch Lesson
  const handleSelectLesson = (lessonId) => {
    setCurrentLessonId(lessonId);
    setValidationResults([]);
    setOverallPassed(completedLessons.includes(lessonId));
  };

  // Check Solution / Run Validation
  const handleCheckSolution = async () => {
    setIsValidating(true);
    try {
      let iframeContext = null;
      if (iframeRef.current?.contentDocument) {
        iframeContext = {
          doc: iframeRef.current.contentDocument,
          win: iframeRef.current.contentWindow,
        };
      }

      const evalResult = await validateExercise(currentLesson, currentCode, iframeContext);
      setValidationResults(evalResult.results);
      setOverallPassed(evalResult.overallPassed);

      if (evalResult.overallPassed) {
        if (!completedLessons.includes(currentLesson.id)) {
          setCompletedLessons((prev) => [...prev, currentLesson.id]);
        }
      }
    } catch (err) {
      console.error('Validation execution error:', err);
    } finally {
      setIsValidating(false);
    }
  };

  // Next Lesson Navigation
  const handleNextLesson = () => {
    const currentIndex = LESSONS.findIndex((l) => l.id === currentLesson.id);
    if (currentIndex >= 0 && currentIndex < LESSONS.length - 1) {
      const nextLesson = LESSONS[currentIndex + 1];
      setCurrentTrackId(nextLesson.trackId);
      setCurrentLessonId(nextLesson.id);
      setValidationResults([]);
      setOverallPassed(completedLessons.includes(nextLesson.id));
      if (nextLesson.trackId === 'html') setActiveEditorTab('html');
      else if (nextLesson.trackId === 'css') setActiveEditorTab('css');
      else if (nextLesson.trackId === 'javascript') setActiveEditorTab('js');
    }
  };

  const hasNextLesson =
    LESSONS.findIndex((l) => l.id === currentLesson.id) < LESSONS.length - 1;

  const overallProgress = calculateOverallProgress(LESSONS, completedLessons);

  return (
    <div className="app-container">
      <Header
        overallProgress={overallProgress}
        completedCount={completedLessons.length}
        totalLessons={LESSONS.length}
        isCloudSynced={isCloudSynced}
        user={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onSignOut={async () => {
          await storageService.signOutUser();
          setCurrentUser(null);
        }}
      />

      <TrackBar
        currentTrackId={currentTrackId}
        onSelectTrack={handleSelectTrack}
        currentLessonId={currentLessonId}
        onSelectLesson={handleSelectLesson}
        lessons={LESSONS}
        completedLessons={completedLessons}
      />

      <main className="workspace-container">
        <LessonGuide lesson={currentLesson} />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <CodeEditorPane
            activeTab={activeEditorTab}
            onChangeTab={setActiveEditorTab}
            code={currentCode}
            onChangeCode={handleCodeChange}
            onResetCode={handleResetCode}
            onCheckSolution={handleCheckSolution}
            isRunning={isValidating}
          />

          <TestResultsDrawer
            results={validationResults}
            overallPassed={overallPassed}
            totalCount={currentLesson.validationRules?.length || 0}
            passedCount={validationResults.filter((r) => r.passed).length}
            hasNextLesson={hasNextLesson}
            onNextLesson={handleNextLesson}
          />
        </div>

        <PreviewFrame
          ref={iframeRef}
          code={currentCode}
          onRefresh={() => {
            if (iframeRef.current) {
              iframeRef.current.srcdoc = iframeRef.current.srcdoc;
            }
          }}
        />
      </main>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
        }}
      />
    </div>
  );
}
