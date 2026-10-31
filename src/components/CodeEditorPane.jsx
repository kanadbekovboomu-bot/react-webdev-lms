import React, { useRef } from 'react';
import { RotateCcw, Play, CheckCircle2, AlertCircle } from 'lucide-react';

const TAB_CONFIG = [
  { key: 'html', label: 'index.html', dotColor: '#f97316' },
  { key: 'css', label: 'style.css', dotColor: '#38bdf8' },
  { key: 'js', label: 'script.js', dotColor: '#eab308' },
];

export function CodeEditorPane({
  activeTab = 'html',
  onChangeTab = () => {},
  code = { html: '', css: '', js: '' },
  onChangeCode = () => {},
  onResetCode = () => {},
  onCheckSolution = () => {},
  isRunning = false,
}) {
  const textareaRef = useRef(null);

  const currentCode = code[activeTab] || '';
  const linesCount = Math.max(currentCode.split('\n').length, 18);
  const lineNumbers = Array.from({ length: linesCount }, (_, i) => i + 1);

  // Handle smart keystrokes: Tab key (2 spaces) and bracket completion
  const handleKeyDown = (e) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const updated = currentCode.substring(0, start) + '  ' + currentCode.substring(end);
      onChangeCode(activeTab, updated);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset code to starter boilerplate for this lesson? Any unverified changes will be discarded.')) {
      onResetCode();
    }
  };

  return (
    <section className="editor-column">
      <div className="editor-tabs-bar">
        <div className="editor-tabs">
          {TAB_CONFIG.map((tab) => (
            <button
              key={tab.key}
              className={`editor-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => onChangeTab(tab.key)}
            >
              <span
                className="editor-tab-dot"
                style={{ backgroundColor: tab.dotColor }}
              />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="editor-actions">
          <button
            className="secondary-action-btn"
            onClick={handleReset}
            title="Reset to lesson starter code"
          >
            <RotateCcw size={13} />
            <span>Reset Code</span>
          </button>

          <button
            className="primary-run-btn"
            onClick={onCheckSolution}
            disabled={isRunning}
            title="Execute automated validation checks"
          >
            <Play size={13} fill="#04121d" />
            <span>{isRunning ? 'Validating...' : 'Check Solution'}</span>
          </button>
        </div>
      </div>

      <div className="editor-textarea-wrapper">
        <div className="editor-line-numbers">
          {lineNumbers.map((num) => (
            <div key={num}>{num}</div>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          className="code-textarea"
          value={currentCode}
          onChange={(e) => onChangeCode(activeTab, e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          aria-label={`Code editor for ${activeTab}`}
        />
      </div>
    </section>
  );
}
