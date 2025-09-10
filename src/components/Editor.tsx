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
    <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Editor</h2>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        className="h-[calc(100%-100px)]"
      />
    </div>
  );
};

export default Editor;
