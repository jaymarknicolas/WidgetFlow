"use client";

import { useDrop } from "react-dnd";
import { useState } from "react";
import { Rnd } from "react-rnd";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

interface DroppedItem {
  id: string;
  type: "TEXT" | "EMBED" | "NOTEPAD";
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const DropZone = () => {
  const [items, setItems] = useState<DroppedItem[]>([]);

  const [{ isOver }, drop] = useDrop({
    accept: ["TEXT", "EMBED", "NOTEPAD"],
    drop: (item: { id: string }) => {
      console.log("Dropped item:", item);

      const newItem: DroppedItem = {
        id: crypto.randomUUID(),
        type:
          item.id === "text-widget"
            ? "TEXT"
            : item.id === "notepad-widget"
            ? "NOTEPAD"
            : "EMBED",
        content:
          item.id === "text-widget"
            ? "📝 New Note"
            : item.id === "notepad-widget"
            ? "🗒️ New Notepad"
            : formatUrl(prompt("Enter a URL to embed:") || ""),
        x: 50 + items.length * 20,
        y: 50 + items.length * 20,
        width: 250,
        height: 150,
      };

      if (newItem.type === "EMBED" && !isValidUrl(newItem.content)) {
        alert("Invalid URL. Please enter a valid link.");
        return;
      }

      setItems((prev) => [...prev, newItem]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  // Removes an item by ID
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Updates the content of a note or notepad
  const updateContent = (id: string, newContent: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, content: newContent } : item
      )
    );
  };

  return (
    <div className="w-full h-auto p-0">
      <div
        // @ts-expect-error "ref" is a valid prop
        ref={drop as React.RefObject<HTMLDivElement>}
        className={`relative transition-all p-6 min-h-screen ${
          isOver ? "bg-blue-100 border-blue-500" : "bg-gray-50 border-gray-300"
        }`}
      >
        <h2 className="text-lg font-bold mb-4">📌 Drag & Drop Notepad</h2>

        {items.map((item, index) => (
          <Rnd
            key={item.id}
            default={{
              x: item.x,
              y: item.y,
              width: item.width,
              height: item.height,
            }}
            bounds="parent"
            enableResizing={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }}
            dragHandleClassName="drag-handle"
            onDragStop={(e, d) => {
              setItems((prev) =>
                prev.map((i, idx) =>
                  idx === index ? { ...i, x: d.x, y: d.y } : i
                )
              );
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              setItems((prev) =>
                prev.map((i, idx) =>
                  idx === index
                    ? {
                        ...i,
                        width: parseFloat(ref.style.width),
                        height: parseFloat(ref.style.height),
                        x: position.x,
                        y: position.y,
                      }
                    : i
                )
              );
            }}
          >
            {item.type === "TEXT" || item.type === "NOTEPAD" ? (
              <Card className="shadow-lg border cursor-move drag-handle w-full h-full flex items-center justify-center relative bg-orange-100">
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  onClick={() => removeItem(item.id)}
                >
                  <X size={16} />
                </button>

                <CardContent className="w-full h-full flex items-center justify-center p-4 border-none">
                  <textarea
                    className="w-full h-full p-2  rounded-md resize-none focus-visible:border-none outline-none bg-orange-50"
                    value={item.content}
                    onChange={(e) => updateContent(item.id, e.target.value)}
                    placeholder={
                      item.type === "TEXT" ? "Write something..." : "Notepad..."
                    }
                  />
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg bg-white border cursor-move drag-handle w-full h-full flex items-center justify-center relative">
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  onClick={() => removeItem(item.id)}
                >
                  <X size={16} />
                </button>

                <CardContent className="w-full h-full flex items-center justify-center p-4">
                  <iframe
                    src={item.content}
                    className="w-full h-full border"
                    title={`Embed ${item.id}`}
                  />
                </CardContent>
              </Card>
            )}
          </Rnd>
        ))}
      </div>
    </div>
  );
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const formatUrl = (url: string) => {
  if (!url.startsWith("http")) {
    return `https://${url}`;
  }
  return url;
};

export default DropZone;
