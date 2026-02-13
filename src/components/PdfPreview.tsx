import React from 'react';
import { PDFViewer, Document, Page, StyleSheet } from '@react-pdf/renderer';
import { Html } from 'react-pdf-html';

interface PdfPreviewProps {
  value: string;
  props: Record<string, any>;
}

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
      <PDFViewer width="100%" className="rounded-lg shadow-md h-[calc(100vh-10rem)]">
        {MyDocument}
      </PDFViewer>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
});

export default PdfPreview;
