"use client";

import { useDrag } from "react-dnd";

export function DraggableEmbed() {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "EMBED",
    item: { id: "embed-widget" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      //   @ts-expect-error "ref" is not a valid prop
      ref={drag}
      className={`p-2 border rounded cursor-grab ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      🌐 Embed Link
    </div>
  );
}
