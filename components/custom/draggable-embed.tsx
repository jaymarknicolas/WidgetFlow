"use client";

import { useDrag } from "react-dnd";
import { Card, CardContent } from "@/components/ui/card";
import { IoLogoYoutube } from "react-icons/io5";

export function DraggableEmbed() {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "EMBED",
    item: { id: "embed-widget" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    // @ts-expect-error "ref" is a valid prop
    <div ref={drag} className="cursor-grab">
      <Card
        className={`shadow-md p-2 transition ${
          isDragging ? "opacity-50 scale-95" : "opacity-100"
        }`}
      >
        <CardContent className="text-center p-0">
          <IoLogoYoutube className="w-5 h-5 text-red-500" />
        </CardContent>
      </Card>
    </div>
  );
}
