"use client";

import DropZone from "@/components/custom/dropzone";
import WidgetPanel from "./widgets/widget-panel";
import NotepadWidget from "./widgets/notepad";
import YoutubeEmbedWidget from "./widgets/youtube-embed";
import PomodoroEmbedWidget from "./widgets/pomodoro/pomodoro";
import RandomLofiYoutubeEmbedWidget from "./widgets/random-lofi-videos";
import TodoApp from "./widgets/todos/todo-app";

const App = () => {
  const widgetConfigs = [
    {
      type: "NOTEPAD",
      id: "notepad-widget",
      initialContent: "Type something...",
      placeholder: "Type something...",
      style: { backgroundColor: "#d1fae5" },
      height: 300,
      width: 500,
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
      height: 500,
      width: 500,
      component: ({
        content,
        placeholder,
      }: {
        content: string;
        onChange: (content: string) => void;
        placeholder?: string;
      }) => <YoutubeEmbedWidget content={content} placeholder={placeholder} />,
    },
    {
      type: "POMODORO",
      id: "pomodoro-widget",
      initialContent: "🗒️ New Notepad",
      placeholder: "Notepad...",
      style: { backgroundColor: "#d1fae5" },
      height: 470,
      width: 450,
      component: ({
        content,
        placeholder,
      }: {
        content: string;
        onChange: (content: string) => void;
        placeholder?: string;
      }) => <PomodoroEmbedWidget content={content} placeholder={placeholder} />,
    },
    {
      type: "LOFI",
      id: "lofi-embed-widget",
      initialContent: "🗒️ New Notepad",
      placeholder: "Notepad...",
      style: { backgroundColor: "#d1fae5" },
      height: 320,
      width: 450,
      component: ({
        placeholder,
      }: {
        content: string;
        onChange: (content: string) => void;
        placeholder?: string;
      }) => <RandomLofiYoutubeEmbedWidget placeholder={placeholder} />,
    },
    {
      type: "TODO",
      id: "todo-widget",
      initialContent: "🗒️ New Notepad",
      placeholder: "Notepad...",
      style: { backgroundColor: "#d1fae5" },
      height: 320,
      width: 450,
      component: ({}: {
        content: string;
        onChange: (content: string) => void;
        placeholder?: string;
      }) => <TodoApp />,
    },
  ];

  const handleItemsChange = () => {
    // console.log("Items updated:", items);
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
