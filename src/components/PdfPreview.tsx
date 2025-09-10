import React from 'react';
import { PDFViewer, Document, Page, StyleSheet } from '@react-pdf/renderer';
import { Html } from 'react-pdf-html';

interface PdfPreviewProps {
  value: string;
  props: Record<string, any>;
}

// Funzione per sostituire i placeholder {{name}} con i valori reali
const replacePlaceholders = (html: string, props: Record<string, any>) => {
  let replaced = html;
  Object.entries(props).forEach(([key, val]) => {
    const re = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
    replaced = replaced.replace(re, String(val));
  });
  return replaced;
};

const PdfPreview: React.FC<PdfPreviewProps> = ({ value, props }) => {
  const replacedHtml = replacePlaceholders(value, props);

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Html>
          {replacedHtml}
        </Html>
      </Page>
    </Document>
  );

  return (
    <div className="w-full h-full border-4 border-[#3b3b3b] rounded-lg bg-[#3b3b3b]">
      <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
        {MyDocument}
      </PDFViewer>
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
});

export default PdfPreview;
