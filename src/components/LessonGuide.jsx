import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronRight, CheckCircle2, BookOpen } from 'lucide-react';

export function LessonGuide({ lesson }) {
  const [hintsOpen, setHintsOpen] = useState(false);

  if (!lesson) {
    return (
      <aside className="guide-column">
        <div style={{ padding: '24px', color: '#94a3b8' }}>Select a lesson to begin.</div>
      </aside>
    );
  }

  // Helper to render markdown-like theory without external library
  const renderTheory = (theoryText) => {
    if (!theoryText) return null;
    const lines = theoryText.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeContent = [];

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${index}`}>
              <code>{codeContent.join('\n')}</code>
            </pre>
          );
          codeContent = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(<h3 key={index}>{line.replace('### ', '')}</h3>);
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={index}>
            {formatInlineCode(line.replace('- ', ''))}
          </li>
        );
      } else if (line.trim().length > 0) {
        elements.push(
          <p key={index}>
            {formatInlineCode(line)}
          </p>
        );
      }
    });

    if (inCodeBlock && codeContent.length > 0) {
      elements.push(
        <pre key="code-end">
          <code>{codeContent.join('\n')}</code>
        </pre>
      );
    }

    return elements;
  };

  // Helper for inline `code` highlights
  const formatInlineCode = (text) => {
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i}>{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <aside className="guide-column">
      <div className="guide-header">
        <div className="lesson-meta-badges">
          <span className="badge-tag highlight">{lesson.trackId.toUpperCase()}</span>
          <span className="badge-tag">Lesson {lesson.order} of 5</span>
          <span className="badge-tag">{lesson.difficulty}</span>
        </div>
        <h1 className="guide-title">{lesson.title}</h1>
        <p className="guide-shortDesc">{lesson.shortDesc}</p>
      </div>

      <div className="guide-content">
        <div>
          <div className="section-label">
            <BookOpen size={14} />
            <span>Theory & Concepts</span>
          </div>
          <div className="theory-text">
            {renderTheory(lesson.theory)}
          </div>
        </div>

        <div>
          <div className="section-label">
            <CheckCircle2 size={14} />
            <span>Exercise Objectives</span>
          </div>
          <div className="instruction-list">
            {lesson.instructions.map((step, idx) => (
              <div key={idx} className="instruction-item">
                <span className="step-number">{idx + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {lesson.hints && lesson.hints.length > 0 && (
          <div className="hints-drawer">
            <div
              className="hints-header"
              onClick={() => setHintsOpen((prev) => !prev)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={15} style={{ color: '#f59e0b' }} />
                <span>Need a Hint? ({lesson.hints.length})</span>
              </div>
              {hintsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>

            {hintsOpen && (
              <div className="hints-body">
                {lesson.hints.map((hint, idx) => (
                  <div key={idx} className="hint-chip">
                    {formatInlineCode(hint)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
