"use client";

import { useDrag } from "react-dnd";
import { Card, CardContent } from "@/components/ui/card";

interface DraggableItemProps {
  type: string;
  id: string;
  icon: React.ReactNode;
}

const DraggableItem = ({ type, id, icon }: DraggableItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      //   @ts-expect-error "ref" is a valid prop
      ref={drag}
      className="cursor-grab hover:-translate-y-1 hover:transition-all hover:delay-100"
    >
      <Card
        className={`shadow-md p-2 transition ${
          isDragging ? "opacity-50 scale-95" : "opacity-100"
        }`}
      >
        <CardContent className="text-center p-0">{icon}</CardContent>
      </Card>
    </div>
  );
};

export default DraggableItem;
