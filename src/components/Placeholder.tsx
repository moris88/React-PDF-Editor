import { JsonEditor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';

interface PlaceholderProps {
  value: Record<string, any>
  setValue: (value: Record<string, any>) => void
}

function Placeholder({ value, setValue }: PlaceholderProps) {
  return (
    <div className="w-full h-[calc(100vh-10rem)] bg-white rounded-lg shadow-md p-4 flex flex-col">
      <p className="italic text-sm">Inserire i valori dei placeholder in formato JSON (esempio: {"{"} "nome": "Mario" {"}"})</p>
      <JsonEditor
        value={value}
        mode="code"
        onChange={(json: any) => setValue(json)}
      />
    </div>
  )
}

export default Placeholder
