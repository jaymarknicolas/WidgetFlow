"use client";

import { useDrag } from "react-dnd";
import { Card, CardContent } from "@/components/ui/card";

const DraggableItem = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TEXT", // Matches the DropZone type
    item: { id: "text-widget" }, // Unique identifier for dropped items
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    //   @ts-ignore
    <div ref={drag} className="cursor-grab">
      <Card
        className={`shadow-md p-3 transition ${
          isDragging ? "opacity-50 scale-95" : "opacity-100"
        }`}
      >
        <CardContent className="text-center">
          Drag this text to the dashboard
        </CardContent>
      </Card>
    </div>
  );
};

export default DraggableItem;
