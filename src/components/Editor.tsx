import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
  value: string;
  setValue: (value: string) => void;
}

function Editor({ value, setValue }: Readonly<EditorProps>) {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'color', 'background',
    'link', 'image'
  ];

  return (
    <div className="w-full h-[calc(100vh-10rem)] bg-white rounded-lg shadow-md p-4 flex flex-col">
      <p className="italic text-sm">Inserire il testo del documento (si possono utilizzare i placeholder definiti nel JSON, esempio &quot;{'{{'}nome{'}}'}&quot;)</p>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        className="w-full h-[calc(100vh-16rem)]"
      />
    </div>
  );
};

export default Editor;
