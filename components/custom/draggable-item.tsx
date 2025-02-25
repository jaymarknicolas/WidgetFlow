"use client";

import { useDrag } from "react-dnd";
import { Card, CardContent } from "@/components/ui/card";

const DraggableItem = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TEXT",
    item: { id: "text-widget" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    // @ts-expect-error "ref" is a valid prop

    <div ref={drag} className="cursor-grab">
      <Card
        className={`shadow-md p-3 transition ${
          isDragging ? "opacity-50 scale-95" : "opacity-100"
        }`}
      >
        <CardContent className="text-center p-0">
          📝 Drag this notepad
        </CardContent>
      </Card>
    </div>
  );
};

export default DraggableItem;
