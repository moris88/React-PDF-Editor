import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'

// Iconoir
import {
  Bold, Italic, Underline, Strikethrough,
  List as ListBullets, NumberedListLeft as ListNumbers,
  Table as TableIcon, Link as LinkIcon, MediaImage as ImageIcon,
  Trash as TrashIcon, Label as LabelIcon,
  LongArrowUpLeft as UndoIcon, LongArrowUpRight as RedoIcon,
  TableRows, Table2Columns as TableColumns,
} from 'iconoir-react'

interface EditorProps {
  value: string
  setValue: (value: string) => void
}

function Editor({ value, setValue }: Readonly<EditorProps>) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      Link,
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    onUpdate: ({ editor }) => setValue(editor.getHTML())
  })

  React.useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) return null

  const insertTablePrompt = () => {
    const rows = parseInt(prompt('Numero di righe', '2') || '2', 10)
    const cols = parseInt(prompt('Numero di colonne', '2') || '2', 10)
    if (rows > 0 && cols > 0) {
      editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()
      // forza larghezza 100%
      editor.commands.updateAttributes('table', { style: 'width:100%; table-layout: fixed;' })
    }
  }

  const classNameButton = "px-4 py-2 rounded-md font-medium cursor-pointer hover:bg-blue-600 hover:text-white bg-gray-200 text-gray-700"

  return (
    <div className="w-full h-[calc(100vh-10rem)] bg-white rounded-lg shadow-md p-4 flex flex-col">
      <p className="italic text-sm mb-2">
        Inserire il testo del documento (si possono utilizzare i placeholder definiti nel JSON, esempio &quot;{'{{'}nome{'}}'}&quot;)
      </p>

      {/* Toolbar */}
      <div className="mb-2 flex flex-wrap gap-1">
        <div className="flex gap-1 mr-6">
          <button
            title="Annulla modifica"
            onClick={() => editor.chain().focus().undo().run()}
            className={classNameButton}
          >
            <UndoIcon />
          </button>

          <button
            title="Ripeti modifica"
            onClick={() => editor.chain().focus().redo().run()}
            className={classNameButton}
          >
            <RedoIcon />
          </button>
        </div>
        <button title="Grassetto" onClick={() => editor.chain().focus().toggleBold().run()} className={classNameButton}><Bold /></button>
        <button title="Corsivo" onClick={() => editor.chain().focus().toggleItalic().run()} className={classNameButton}><Italic /></button>
        <button title="Sottolineato" onClick={() => editor.chain().focus().toggleUnderline().run()} className={classNameButton}><Underline /></button>
        <button title="Barrato" onClick={() => editor.chain().focus().toggleStrike().run()} className={classNameButton}><Strikethrough /></button>
        <button title="Lista puntata" onClick={() => editor.chain().focus().toggleBulletList().run()} className={classNameButton}><ListBullets /></button>
        <button title="Lista numerata" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={classNameButton}><ListNumbers /></button>

        {/* Tabella */}
        <button title="Inserisci tabella" onClick={insertTablePrompt} className={classNameButton}><TableIcon /></button>

        <button title="Inserisci riga sopra" onClick={() => editor.chain().focus().addRowBefore().run()} className={classNameButton}><TableRows /></button>
        <button title="Inserisci riga sotto" onClick={() => editor.chain().focus().addRowAfter().run()} className={classNameButton}><TableRows /></button>
        <button title="Inserisci colonna a sinistra" onClick={() => editor.chain().focus().addColumnBefore().run()} className={classNameButton}><TableColumns /></button>
        <button title="Inserisci colonna a destra" onClick={() => editor.chain().focus().addColumnAfter().run()} className={classNameButton}><TableColumns /></button>
        <button title="Elimina tabella" onClick={() => editor.chain().focus().deleteTable().run()} className={classNameButton}><TrashIcon /></button>

        {/* Placeholder */}
        <button
          title="Inserisci placeholder"
          onClick={() => {
            const placeholder = prompt('Inserisci nome del placeholder (es. nome)')?.trim();
            if (placeholder) {
              // Inserisce {{placeholder}} nel punto corrente del cursore
              editor.chain().focus().insertContent(`{{${placeholder}}}`).run();
            }
          }}
          className={classNameButton}
        >
          <LabelIcon />
        </button>

        {/* Link */}
        <button title="Inserisci link" onClick={() => {
          const url = prompt('Inserisci URL') || ''
          editor.chain().focus().setLink({ href: url }).run()
        }} className={classNameButton}><LinkIcon /></button>

        {/* Immagine */}
        <button title="Inserisci immagine" onClick={() => {
          const url = prompt('URL immagine') || ''
          editor.chain().focus().setImage({ src: url }).run()
        }} className={classNameButton}><ImageIcon /></button>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-auto border border-gray-300 rounded-lg">
        <EditorContent editor={editor} className="w-full h-full p-3" />
      </div>

      {/* CSS bordi tabella */}
      <style>{`
        .ProseMirror table {
          border-collapse: collapse;
          width: 100%;
          table-layout: fixed;
        }
        .ProseMirror th,
        .ProseMirror td {
          border: 1px solid #999;
          padding: 6px;
          word-wrap: break-word;
        }
        .ProseMirror th {
          background-color: #f3f3f3;
        }
      `}</style>
    </div>
  )
}

export default Editor