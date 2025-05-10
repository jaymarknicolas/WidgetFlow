"use client";
import DraggableItem from "./draggable-item";
import { PiNotepadFill } from "react-icons/pi";
import { IoLogoYoutube } from "react-icons/io5";
import { PiTimerFill } from "react-icons/pi";
import { FaRandom } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";

const WidgetPanel = () => {
  return (
    <div
      className="flex gap-4 p-4 bg-gray-100 rounded-lg fixed z-10 bottom-4 w-[50%]  left-[50%] justify-center ease-in-out widget-panel "
      style={{
        transform: "translateX(-50%)",
      }}
    >
      <DraggableItem
        type="LOFI"
        id="lofi-embed-widget"
        icon={<FaRandom className="w-5 h-5 text-slate-500" />}
      />
      <DraggableItem
        type="NOTEPAD"
        id="notepad-widget"
        icon={<PiNotepadFill className="w-5 h-5 text-slate-500" />}
      />
      <DraggableItem
        type="EMBED"
        id="embed-widget"
        icon={<IoLogoYoutube className="w-5 h-5 text-slate-500" />}
      />
      <DraggableItem
        type="POMODORO"
        id="pomodoro-widget"
        icon={<PiTimerFill className="w-5 h-5 text-slate-500" />}
      />
      <DraggableItem
        type="TODO"
        id="todo-widget"
        icon={<LuListTodo className="w-5 h-5 text-slate-500" />}
      />
    </div>
  );
};

export default WidgetPanel;
