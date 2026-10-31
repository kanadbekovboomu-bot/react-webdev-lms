import React from 'react';
import { BookOpen, User, LogOut, CheckCircle2 } from 'lucide-react';

export function Header({
  overallProgress = 0,
  completedCount = 0,
  totalLessons = 15,
  isCloudSynced = false,
  user = null,
  onOpenAuth = () => {},
  onSignOut = () => {},
}) {
  return (
    <header className="app-header">
      <div className="brand-section">
        <div className="brand-logo">
          <BookOpen size={20} />
          <span>WebDev LMS</span>
        </div>
        <span className="brand-badge">Fullstack Academy</span>
      </div>

      <div className="header-center">
        <div className="overall-progress-bar-bg" title={`${overallProgress}% completed`}>
          <div
            className="overall-progress-bar-fill"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <span className="progress-text">
          {completedCount} / {totalLessons} Lessons ({overallProgress}%)
        </span>
      </div>

      <div className="header-right">
        <div
          className={`sync-badge ${isCloudSynced ? 'live' : ''}`}
          title={isCloudSynced ? 'Synchronized with Cloud Firestore' : 'Running in Offline / Demo Mode with LocalStorage'}
        >
          <span className="sync-dot" />
          <span>{isCloudSynced ? 'Cloud Synced' : 'Demo Mode'}</span>
        </div>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="user-btn" onClick={onOpenAuth} title="User Account">
              <User size={15} />
              <span>{user.displayName || user.email || 'Student'}</span>
            </button>
            <button
              className="user-btn"
              onClick={onSignOut}
              title="Sign Out"
              style={{ padding: '6px 8px' }}
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <button className="user-btn" onClick={onOpenAuth}>
            <User size={15} />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}
