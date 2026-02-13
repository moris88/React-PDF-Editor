import { Document, Page, View, Text, StyleSheet, PDFViewer } from '@react-pdf/renderer';

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

// Funzione per render HTML in PDF: tabelle vs testo
const renderHTML = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const elements = Array.from(doc.body.childNodes);

  return elements.map((el, idx) => {
    if (el.nodeName === 'TABLE') {
      // Render tabella
      const rows = Array.from((el as Element).querySelectorAll('tr')).map((tr) =>
        Array.from(tr.querySelectorAll('th, td')).map((cell) => cell.textContent || '')
      );

      return (
        <View key={idx} style={styles.table}>
          {rows.map((row, ri) => (
            <View key={ri} style={styles.tableRow}>
              {row.map((cell, ci) => (
                <Text key={ci} style={styles.tableCell}>{cell}</Text>
              ))}
            </View>
          ))}
        </View>
      );
    } else if (el.nodeName === 'P') {
      return <Text key={idx} style={styles.paragraph}>{el.textContent}</Text>;
    } else if (el.nodeName === 'H1') {
      return <Text key={idx} style={styles.heading1}>{el.textContent}</Text>;
    } else if (el.nodeName === 'H2') {
      return <Text key={idx} style={styles.heading2}>{el.textContent}</Text>;
    } else {
      // fallback
      return <Text key={idx}>{el.textContent}</Text>;
    }
  });
};

function PdfPreview({ value, props }: Readonly<PdfPreviewProps>) {
  const html = replacePlaceholders(value, props);

  return (
    <PDFViewer width="100%" className="rounded-lg shadow-md h-[calc(100vh-10rem)]">
      <Document>
        <Page size="A4" style={styles.page}>
          {renderHTML(html)}
        </Page>
      </Document>
    </PDFViewer>
  );
};

const styles = StyleSheet.create({
  page: { padding: 20 },
  paragraph: { marginBottom: 8 },
  heading1: { fontSize: 24, marginBottom: 8 },
  heading2: { fontSize: 20, marginBottom: 6 },
  table: {
    display: 'table' as any,
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
  },
  tableRow: { flexDirection: 'row' },
  tableCell: { flex: 1, borderWidth: 1, borderColor: '#000', padding: 4 },
});

export default PdfPreview;