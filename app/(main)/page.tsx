"use client";

import DropZone from "@/components/custom/dropzone";
import WidgetPanel from "./widgets/widget-panel";
import NotepadWidget from "./widgets/notepad";
import YoutubeEmbedWidget from "./widgets/youtube-embed";

const App = () => {
  const widgetConfigs = [
    // {
    //   type: "TEXT",
    //   id: "text-widget",
    //   initialContent: "📝 New Note",
    //   placeholder: "Write something...",
    //   style: { backgroundColor: "#fef3c7" },
    //   component: TextWidget,
    // },
    {
      type: "NOTEPAD",
      id: "notepad-widget",
      initialContent: "🗒️ New Notepad",
      placeholder: "Notepad...",
      style: { backgroundColor: "#d1fae5" },
      component: ({
        content,
        onChange,
        placeholder,
      }: {
        content: string;
        onChange: (content: string) => void;
        placeholder?: string;
      }) => (
        <NotepadWidget
          content={content}
          onChange={onChange}
          placeholder={placeholder}
        />
      ),
    },
    {
      type: "EMBED",
      id: "embed-widget",
      initialContent: "🗒️ New Notepad",
      placeholder: "Notepad...",
      style: { backgroundColor: "#d1fae5" },
      component: ({
        content,
        placeholder,
      }: {
        content: string;
        onChange: (content: string) => void;
        placeholder?: string;
      }) => <YoutubeEmbedWidget content={content} placeholder={placeholder} />,
    },
  ];

  // @ts-expect-error "onItemsChange" is a valid prop
  const handleItemsChange = (items) => {
    console.log("Items updated:", items);
  };

  return (
    <div className="p-4 relative">
      <WidgetPanel />
      <DropZone
        widgetConfigs={widgetConfigs}
        onItemsChange={handleItemsChange}
      />
    </div>
  );
};

export default App;
