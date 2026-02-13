import { JsonEditor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import React from 'react';

interface PlaceholderProps {
  value: Record<string, any>
  setValue: (value: Record<string, any>) => void
}

function Placeholder({ value, setValue }: Readonly<PlaceholderProps>) {
  React.useEffect(() => {
    const element = document.querySelector('.jsoneditor');
    console.log('JSONEditor element:', element);
    if (element) {
      // recupera elemento padre del JSONEditor
      const parent = element.parentElement;
      console.log('JSONEditor parent:', parent);
      if (parent) {
        // imposta altezza 100% al genitore per far sì che il JSONEditor occupi tutto lo spazio disponibile
        parent.classList.add('h-[calc(100vh-10rem)]');
      }
    }
  }, [])
  return (
    <div className="w-full h-[calc(100vh-10rem)] bg-white rounded-lg shadow-md p-4 flex flex-col">
      <p className="italic text-sm">Inserire i valori dei placeholder in formato JSON (esempio: {"{"} "nome": "Mario" {"}"})</p>
      <JsonEditor
        style={{ height: '100%' }}
        value={value}
        mode="code"
        onChange={(json: any) => setValue(json)}
      />
    </div>
  )
}

export default Placeholder
