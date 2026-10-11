import React from 'react';

/**
 * Parses emphasis syntax (***bold-italic***, **bold-italic**, or *italic*)
 * into properly styled HTML elements with zero raw asterisks leaking into the UI.
 * Emphasized keywords are formatted in bold italic (matching LaTeX \textbf{\textit{...}}).
 */
export function formatEmphasizedText(text: string): React.ReactNode {
  if (!text) return null;

  // Match 1 to 3 asterisks surrounding text that does not start or end with whitespace
  const regex = /(\*{1,3}[^\s*](?:[^*]*?[^\s*])?\*{1,3})/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith('***') && part.endsWith('***') && part.length > 6) {
      const content = part.slice(3, -3);
      return (
        <strong
          key={i}
          style={{
            fontWeight: 700,
            fontStyle: 'italic',
            color: 'var(--fp-text)',
          }}
        >
          {content}
        </strong>
      );
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      const content = part.slice(2, -2);
      return (
        <strong
          key={i}
          style={{
            fontWeight: 700,
            fontStyle: 'italic',
            color: 'var(--fp-text)',
          }}
        >
          {content}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      const content = part.slice(1, -1);
      return (
        <em
          key={i}
          style={{
            fontStyle: 'italic',
          }}
        >
          {content}
        </em>
      );
    }

    // Strip any loose, stray asterisks so none ever show up as unpleasant text
    const cleaned = part.replace(/\*/g, '');
    return cleaned ? <React.Fragment key={i}>{cleaned}</React.Fragment> : null;
  });
}
