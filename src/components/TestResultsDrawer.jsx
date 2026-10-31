import React from 'react';
import { CheckCircle2, XCircle, Sparkles, ArrowRight } from 'lucide-react';

export function TestResultsDrawer({
  results = [],
  overallPassed = false,
  totalCount = 0,
  passedCount = 0,
  hasNextLesson = false,
  onNextLesson = () => {},
}) {
  if (results.length === 0) {
    return (
      <div className="results-drawer">
        <div className="results-header">
          <div className="results-title">
            <span>Validation Status</span>
          </div>
        </div>
        <div style={{ fontSize: '0.82rem', color: '#64748b', fontStyle: 'italic' }}>
          Click "Check Solution" to test your code against the exercise requirements.
        </div>
      </div>
    );
  }

  return (
    <div className="results-drawer">
      <div className="results-header">
        <div className="results-title">
          <span>
            Validation Criteria: {passedCount} of {totalCount} Passed
          </span>
        </div>
        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: '600',
            color: overallPassed ? '#34d399' : '#fb7185',
          }}
        >
          {overallPassed ? 'ALL TESTS PASSED' : 'CRITERIA PENDING'}
        </span>
      </div>

      <div className="rules-list">
        {results.map((r) => (
          <div
            key={r.id}
            className={`rule-result-item ${r.passed ? 'passed' : 'failed'}`}
          >
            {r.passed ? (
              <CheckCircle2 size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
            ) : (
              <XCircle size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
            )}
            <div>
              <div style={{ fontWeight: '600' }}>{r.description}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>{r.message}</div>
            </div>
          </div>
        ))}
      </div>

      {overallPassed && (
        <div className="celebration-box">
          <div className="celebration-left">
            <Sparkles size={22} style={{ color: '#34d399' }} />
            <div>
              <div className="celebration-text-title">Lesson Completed!</div>
              <div className="celebration-text-sub">
                Your progress has been recorded and synced.
              </div>
            </div>
          </div>

          {hasNextLesson && (
            <button className="next-lesson-btn" onClick={onNextLesson}>
              <span>Next Lesson</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
