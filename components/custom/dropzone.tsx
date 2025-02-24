"use client";

import { useDrop } from "react-dnd";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DroppedItem {
  id: string;
  type: "TEXT" | "EMBED";
  content: string;
}

const DropZone = () => {
  const [items, setItems] = useState<DroppedItem[]>([]);
  const [layout, setLayout] = useState<"grid" | "list" | "masonry">("grid");

  const [{ isOver }, drop] = useDrop({
    accept: ["TEXT", "EMBED"],
    drop: (item: { id: string }) => {
      console.log("Dropped item:", item);

      if (item.id === "text-widget") {
        setItems((prev) => [
          ...prev,
          { id: crypto.randomUUID(), type: "TEXT", content: "Dropped Text!" },
        ]);
      } else if (item.id === "embed-widget") {
        const url = prompt("Enter a URL to embed:");
        if (url && isValidUrl(url)) {
          setItems((prev) => [
            ...prev,
            { id: crypto.randomUUID(), type: "EMBED", content: url },
          ]);
        } else {
          alert("Invalid URL. Please enter a valid link.");
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className="w-full min-h-screen p-6 border-2">
      {/* Layout Selection */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Drop Items Here</h2>
        <Select onValueChange={(value) => setLayout(value as any)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grid">Grid</SelectItem>
            <SelectItem value="list">List</SelectItem>
            <SelectItem value="masonry">Masonry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Drop Zone */}
      <div
        //   @ts-expect-error "ref" is not a valid prop
        ref={drop}
        className={`transition-all border-2 p-6 ${
          isOver ? "bg-blue-100 border-blue-500" : "bg-gray-50 border-gray-300"
        }`}
      >
        {/* Dynamic Layout */}
        <div className={getLayoutClass(layout)}>
          {items.map(({ id, type, content }) => (
            <Card key={id} className="p-3">
              <CardContent className="text-center">
                {type === "TEXT" ? (
                  <p>{content}</p>
                ) : (
                  <iframe
                    src={content}
                    className="w-full h-40 border"
                    title={`Embed ${id}`}
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Function to return layout classes
const getLayoutClass = (layout: "grid" | "list" | "masonry") => {
  switch (layout) {
    case "grid":
      return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4";
    case "list":
      return "flex flex-col gap-4";
    case "masonry":
      return "columns-1 sm:columns-2 md:columns-3 gap-4"; // Masonry-like layout using CSS columns
    default:
      return "";
  }
};

// URL Validation Function
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export default DropZone;
