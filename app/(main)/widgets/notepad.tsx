"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

interface NotepadWidgetProps {
  content: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const NotepadWidget = ({
  content,
  onChange,
  placeholder,
}: NotepadWidgetProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "w-full rounded-md border-0 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md flex flex-col h-full">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        placeholder={placeholder}
        className="prose prose-sm max-w-none p-4 flex-grow overflow-auto"
      />
    </div>
  );
};

const Toolbar = ({ editor }: { editor: Editor }) => {
  const setAlignment = useCallback(
    (alignment: "left" | "center" | "right") => {
      // @ts-expect-error error
      editor.chain().focus().setTextAlign(alignment).run();
    },
    [editor]
  );

  if (!editor) {
    return null;
  }

  return (
    <div className="border-b p-2 flex flex-wrap gap-1 w-full fuck">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(editor.isActive("bold") ? "bg-accent" : "")}
        aria-label="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(editor.isActive("italic") ? "bg-accent" : "")}
        aria-label="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(editor.isActive("bulletList") ? "bg-accent" : "")}
        aria-label="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(editor.isActive("orderedList") ? "bg-accent" : "")}
        aria-label="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <div className="h-6 w-px bg-border mx-1" />

      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(
          editor.isActive("heading", { level: 1 }) ? "bg-accent" : ""
        )}
        aria-label="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(
          editor.isActive("heading", { level: 2 }) ? "bg-accent" : ""
        )}
        aria-label="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </Button>

      <div className="h-6 w-px bg-border mx-1" />

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setAlignment("left")}
        className={cn(
          editor.isActive({ textAlign: "left" }) ? "bg-accent" : ""
        )}
        aria-label="Align Left"
      >
        <AlignLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setAlignment("center")}
        className={cn(
          editor.isActive({ textAlign: "center" }) ? "bg-accent" : ""
        )}
        aria-label="Align Center"
      >
        <AlignCenter className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setAlignment("right")}
        className={cn(
          editor.isActive({ textAlign: "right" }) ? "bg-accent" : ""
        )}
        aria-label="Align Right"
      >
        <AlignRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default NotepadWidget;
