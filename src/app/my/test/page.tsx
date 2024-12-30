"use client";

import styles from "./testPage.module.scss";
import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Markdown } from "tiptap-markdown";
import Toolbar from "@/components/toolbar";

const TestPage: React.FC = () => {
  const [text, setText] = useState("");

  const [editorReady, setEditorReady] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.extend({ inclusive: false }).configure({
        openOnClick: false,
      }),
      Markdown,
    ],
    content: text,
    onUpdate({ editor }) {
      setText(editor.getHTML());
    },
  });

  useEffect(() => {
    setEditorReady(true);
  }, []);

  if (!editorReady) {
    return null;
  }

  return (
    <>
      <div className={styles.wrap}>
        {editor && <Toolbar editor={editor} />}
        <EditorContent editor={editor} className={styles.editor} />
      </div>
    </>
  );
};

export default TestPage;
