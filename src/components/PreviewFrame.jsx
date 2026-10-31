import React, { forwardRef } from 'react';
import { Eye, RefreshCw } from 'lucide-react';
import { assemblePreviewDoc } from '../utils/exerciseValidator';

export const PreviewFrame = forwardRef(function PreviewFrame(
  { code = { html: '', css: '', js: '' }, onRefresh = () => {} },
  ref
) {
  const srcDoc = assemblePreviewDoc(code.html, code.css, code.js);

  return (
    <section className="preview-column">
      <div className="preview-bar">
        <div className="preview-bar-title">
          <Eye size={14} style={{ color: '#38bdf8' }} />
          <span>Live Render Preview</span>
        </div>
        <button
          className="secondary-action-btn"
          onClick={onRefresh}
          title="Force reload preview frame"
          style={{ padding: '3px 8px' }}
        >
          <RefreshCw size={12} />
          <span>Reload</span>
        </button>
      </div>

      <iframe
        ref={ref}
        className="preview-iframe"
        title="WebDev LMS Sandbox Preview"
        sandbox="allow-scripts allow-modals"
        srcDoc={srcDoc}
      />
    </section>
  );
});
