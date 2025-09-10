import React, { useEffect, useRef, useMemo } from 'react';
import prism from 'prismjs';

interface CodePreviewProps {
  props: Record<string, any>;
  value: string;
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const CodePreview: React.FC<CodePreviewProps> = ({ value, props }) => {
  const codeEl = useRef<HTMLElement | null>(null);

  const { code } = useMemo(() => {
    // 1) Sostituisci i placeholder {{name}} con i valori reali
    let replacedValue = value;
    Object.entries(props).forEach(([key, val]) => {
      const re = new RegExp(`\\{\\{\\s*${escapeRegExp(key)}\\s*\\}\\}`, 'g');
      replacedValue = replacedValue.replace(re, String(val));
    });

    // 2) Escape backticks per il template literal
    const escapedHtml = replacedValue.replace(/`/g, '\\`');

    // 3) Indenta per la preview
    const indentedHtml = escapedHtml
      .split('\n')
      .map(line => '      ' + line)
      .join('\n');

    // 4) Genera il codice usando @react-pdf/renderer-html
    const code = `import React from 'react';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import { Html } from '@react-pdf/renderer-html';

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Html>
      {\`
      ${indentedHtml}
      \`}
      </Html>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
});

export default MyDocument;
`;

    return { code };
  }, [value, props]);

  useEffect(() => {
    if (!codeEl.current) return;
    codeEl.current.textContent = code;
    prism.highlightElement(codeEl.current);
  }, [code]);

  return (
    <div className="w-full h-full bg-gray-800 text-white font-mono text-sm rounded-lg p-4 overflow-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-300">React-PDF Code</h2>
      <pre>
        <code ref={codeEl} className="language-javascript" />
      </pre>
    </div>
  );
};

export default CodePreview;
