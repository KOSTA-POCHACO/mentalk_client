"use client";

import React from "react";
import styles from "./toolbar.module.scss";
import { Editor } from "@tiptap/react";

type ToolbarProps = {
  editor: Editor;
};

const Toolbar = ({ editor }: ToolbarProps) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.itemBox}>
        {/* H1 버튼 */}
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.h1} ${
            editor.isActive("heading", { level: 2 })
              ? styles.active
              : styles.none
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <span className="material-symbols-outlined">format_h1</span>
        </button>
        {/* H2 버튼 */}
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.h2} ${
            editor.isActive("heading", { level: 3 })
              ? styles.active
              : styles.none
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <span className="material-symbols-outlined">format_h2</span>
        </button>
      </div>
      <div className={styles.line} />
      <div className={styles.itemBox}>
        {/* Bold 버튼 */}
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.bold} ${
            editor.isActive("bold") ? styles.active : styles.none
          }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <span className="material-symbols-outlined">format_bold</span>
        </button>
        {/* Italic 버튼 */}
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.italic} ${
            editor.isActive("italic") ? styles.active : styles.none
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          <span className="material-symbols-outlined">format_italic</span>
        </button>
        {/* Strike 버튼 */}
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.strike} ${
            editor.isActive("strike") ? styles.active : styles.none
          }`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          <span className="material-symbols-outlined">strikethrough_s</span>
        </button>
      </div>
      <div className={`${styles.line} `} />
      <div className={styles.itemBox}>
        {/* Bullet List 버튼 */}
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.bulleted} ${
            editor.isActive("bulletList") ? styles.active : styles.none
          }`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <span className="material-symbols-outlined">
            format_list_bulleted
          </span>
        </button>
        {/* Numbered List 버튼 */}
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.numbered} ${
            editor.isActive("orderedList") ? styles.active : styles.none
          }`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <span className="material-symbols-outlined">
            format_list_numbered
          </span>
        </button>
      </div>
      <div className={styles.line} />
      <div className={styles.itemBox}>
        {/* Link 버튼 */}
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.link} ${
            editor.isActive("link") ? styles.active : styles.none
          }`}
          onClick={() => {}}
        >
          <span className="material-symbols-outlined">link</span>
        </button>
        {/* Divider 버튼 */}
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.newline} ${styles.none}`}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <span className="material-symbols-outlined">horizontal_rule</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
