import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import htmlLang from "react-syntax-highlighter/dist/esm/languages/hljs/xml";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import prettier from "prettier/standalone";
import parserHtml from "prettier/plugins/html";

// registra linguaggio html
SyntaxHighlighter.registerLanguage("html", htmlLang);

interface CodePreviewProps {
  props: Record<string, any>;
  value: string;
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function CodePreview({ value, props }: Readonly<CodePreviewProps>) {
  const [code, setCode] = React.useState(value);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const processCode = async () => {
      let replacedValue = value;

      Object.entries(props).forEach(([key, val]) => {
        const re = new RegExp(`\\{\\{\\s*${escapeRegExp(key)}\\s*\\}\\}`, "g");
        replacedValue = replacedValue.replace(re, String(val));
      });

      try {
        replacedValue = await prettier.format(replacedValue, {
          parser: "html",
          plugins: [parserHtml],
        });
      } catch { 
        // Se la formattazione fallisce, mantieni il codice originale
      }

      setCode(replacedValue);
    };

    processCode();
  }, [value, props]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      console.error("Copy failed");
    }
  };

  return (
    <div className="w-full h-[calc(100vh-10rem)] bg-white rounded-lg shadow-md p-4 flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <p className="italic text-sm">
          Codice HTML generato (con sostituzione dei placeholder)
        </p>

        <button
          onClick={handleCopy}
          className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition"
        >
          {copied ? "Copiato ✓" : "Copia codice"}
        </button>
      </div>

      {/* Code */}
      <div className="flex-1 overflow-auto">
        <SyntaxHighlighter
          language="html"
          style={docco}
          showLineNumbers
          wrapLongLines
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodePreview;