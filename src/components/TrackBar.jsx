import React from 'react';
import { Layers, Sparkles, Terminal, Lock, CheckCircle2 } from 'lucide-react';
import { TRACKS } from '../data/lessonsData';
import { isLessonUnlocked } from '../utils/exerciseValidator';

const TRACK_ICONS = {
  html: Layers,
  css: Sparkles,
  javascript: Terminal,
};

export function TrackBar({
  currentTrackId,
  onSelectTrack,
  currentLessonId,
  onSelectLesson,
  lessons = [],
  completedLessons = [],
}) {
  const currentTrackLessons = lessons.filter((l) => l.trackId === currentTrackId);

  return (
    <div className="track-bar">
      <div className="track-tabs">
        {TRACKS.map((track) => {
          const Icon = TRACK_ICONS[track.id] || Layers;
          const trackLessons = lessons.filter((l) => l.trackId === track.id);
          const completedCount = trackLessons.filter((l) => completedLessons.includes(l.id)).length;
          const pct = trackLessons.length > 0 ? Math.round((completedCount / trackLessons.length) * 100) : 0;
          const isActive = currentTrackId === track.id;

          return (
            <button
              key={track.id}
              className={`track-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTrack(track.id)}
            >
              <Icon size={16} style={{ color: track.color }} />
              <span>{track.title}</span>
              <span className="track-pct">{pct}%</span>
            </button>
          );
        })}
      </div>

      <div className="lesson-ribbon">
        {currentTrackLessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isUnlocked = isLessonUnlocked(lesson.id, lessons, completedLessons);
          const isActive = lesson.id === currentLessonId;

          return (
            <button
              key={lesson.id}
              className={`lesson-chip ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${
                !isUnlocked ? 'locked' : ''
              }`}
              disabled={!isUnlocked}
              onClick={() => isUnlocked && onSelectLesson(lesson.id)}
              title={
                !isUnlocked
                  ? 'Complete previous lesson to unlock'
                  : isCompleted
                  ? 'Completed lesson'
                  : 'In progress'
              }
            >
              {isCompleted ? (
                <CheckCircle2 size={13} />
              ) : !isUnlocked ? (
                <Lock size={12} />
              ) : (
                <span>{lesson.order}.</span>
              )}
              <span>{lesson.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
