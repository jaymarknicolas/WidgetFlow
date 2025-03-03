"use client";
import DraggableItem from "./draggable-item";
import { PiNotepadFill, PiTextTBold } from "react-icons/pi";
import { IoLogoYoutube } from "react-icons/io5";

const WidgetPanel = () => {
  return (
    <div
      className="flex gap-4 p-4 bg-gray-100 rounded-lg fixed z-10 bottom-4 w-[50%]  left-[50%] justify-center ease-in-out widget-panel "
      style={{
        transform: "translateX(-50%)",
      }}
    >
      <DraggableItem
        type="TEXT"
        id="text-widget"
        icon={<PiTextTBold className="w-5 h-5 text-blue-500" />}
      />
      <DraggableItem
        type="NOTEPAD"
        id="notepad-widget"
        icon={<PiNotepadFill className="w-5 h-5 text-orange-500" />}
      />
      <DraggableItem
        type="EMBED"
        id="embed-widget"
        icon={<IoLogoYoutube className="w-5 h-5 text-red-500" />}
      />
    </div>
  );
};

export default WidgetPanel;
