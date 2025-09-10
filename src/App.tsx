import { useState } from 'react';
import Editor from './components/Editor';
import CodePreview from './components/CodePreview';
import PdfPreview from './components/PdfPreview';

function App() {
  // Stato per il contenuto dell'editor
  const [value, setValue] = useState('');
  const [props, setProps] = useState<Record<string, any>>({});
  const [propsJson, setPropsJson] = useState('{}');

  const handlePropsChange = (json: string) => {
    setPropsJson(json);
    try {
      setProps(JSON.parse(json));
    } catch (e) {
      console.error('Invalid JSON', e);
      setProps({});
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-gray-800">React-PDF Editor (ALPHA)</h1>
      </header>
      
      <main className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Colonna 1: Editor */}
        <div className="lg:col-span-1 h-full grid grid-rows-2 gap-4 p-2">
          <Editor value={value} setValue={setValue} />
          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Placeholder (JSON)</h2>
            <textarea
              className="w-full flex-grow border border-gray-300 rounded-lg p-3 text-base font-mono"
              value={propsJson}
              onChange={(e) => handlePropsChange(e.target.value)}
            />
          </div>
        </div>

        {/* Colonna 2: Anteprime */}
        <div className="h-full grid grid-rows-2 gap-4 p-2">
          {/* Anteprima del codice */}
          <div className="row-span-1 h-full">
            <CodePreview value={value} props={props} />
          </div>
          
          {/* Anteprima del PDF */}
          <div className="row-span-1 h-full">
            <PdfPreview value={value} props={props} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;