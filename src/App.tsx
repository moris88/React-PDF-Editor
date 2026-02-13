import { useState } from 'react';
import Editor from './components/Editor';
import CodePreview from './components/CodePreview';
import PdfPreview from './components/PdfPreview';
import Placeholder from './components/Placeholder';

function App() {
  // Stato per il contenuto dell'editor
  const [value, setValue] = useState('');
  const [props, setProps] = useState<Record<string, any>>({});
  const [propsJson, setPropsJson] = useState<Record<string, any>>({});
  const [type, setType] = useState<'code HTML' | 'preview PDF' | 'placeholder' | 'editor'>('editor');

  const handlePropsChange = (json: Record<string, any>) => {
    setPropsJson(json);
    try {
      setProps(json);
    } catch (e) {
      console.error('Invalid JSON', e);
      setProps({});
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen font-sans flex flex-col">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-gray-800">React-PDF Editor (ALPHA)</h1>
      </header>
      
      <section className="p-4 flex flex-col gap-6">
        {/* Tab di navigazione */}
        <div className="flex gap-4">
          {['editor', 'placeholder', 'code HTML', 'preview PDF'].map((tab) => (
            <button
              key={tab}
              onClick={() => setType(tab as 'code HTML' | 'preview PDF' | 'placeholder' | 'editor')}
              className={`px-4 py-2 rounded-md font-medium cursor-pointer hover:bg-blue-600 hover:text-white ${
                type === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Editor */}
        {type === 'editor' && <Editor value={value} setValue={setValue} />}

        {/* Placeholder JSON */}
        {type === 'placeholder' && <Placeholder value={propsJson} setValue={handlePropsChange} />}
        
        {/* CodePreview */}
        {type === 'code HTML' && <CodePreview value={value} props={props} />}

        {/* PdfPreview */}
        {type === 'preview PDF' && <PdfPreview value={value} props={props} />}
      </section>
    </main>
  );
}

export default App;