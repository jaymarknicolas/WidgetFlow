"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropZone from "@/components/custom/dropzone";

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        <DropZone />
      </div>
    </DndProvider>
  );
}
