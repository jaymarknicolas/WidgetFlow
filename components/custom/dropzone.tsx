"use client";

import { useDrop } from "react-dnd";
import { useState } from "react";
import { Rnd } from "react-rnd";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { formatUrl } from "@/lib/utils";

interface DroppedItem {
  id: string;
  type: string;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface WidgetConfig {
  id: string;
  type: string;
  initialContent: string;
  placeholder?: string;
  style?: React.CSSProperties;
  component: React.ComponentType<{
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
  }>;
}

interface DropZoneProps {
  widgetConfigs: WidgetConfig[];
  onItemsChange?: (items: DroppedItem[]) => void;
}

const DropZone = ({ widgetConfigs, onItemsChange }: DropZoneProps) => {
  const [items, setItems] = useState<DroppedItem[]>([]);

  const [{ isOver }, drop] = useDrop({
    accept: widgetConfigs.map((config) => config.type),
    drop: (item: { id: string }) => {
      const widgetConfig = widgetConfigs.find((config) => {
        return config.id === item.id;
      });

      console.log("widgetConfig");
      console.log(widgetConfig);
      console.log("widgetConfig");
      if (!widgetConfig) return;

      if (widgetConfig.type === "EMBED") {
        widgetConfig.initialContent = formatUrl(
          prompt("Enter a URL to embed:") || ""
        );
      }
      const newItem: DroppedItem = {
        id: crypto.randomUUID(),
        type: widgetConfig.type,
        content: widgetConfig.initialContent,
        x: 50 + items.length * 20,
        y: 50 + items.length * 20,
        width: 250,
        height: 150,
      };

      console.log(newItem);
      if (newItem.type === "EMBED" && !isValidUrl(newItem.content)) {
        alert("Invalid URL. Please enter a valid link.");
        return;
      }

      setItems((prev) => {
        const newItems = [...prev, newItem];
        onItemsChange?.(newItems);
        return newItems;
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const removeItem = (id: string) => {
    setItems((prev) => {
      const newItems = prev.filter((item) => item.id !== id);
      onItemsChange?.(newItems);
      return newItems;
    });
  };

  const updateContent = (id: string, newContent: string) => {
    setItems((prev) => {
      const newItems = prev.map((item) =>
        item.id === id ? { ...item, content: newContent } : item
      );
      onItemsChange?.(newItems);
      return newItems;
    });
  };

  return (
    <div className="w-full h-auto p-0">
      <div
        // @ts-expect-error "ref" is a valid prop
        ref={drop as React.RefObject<HTMLDivElement>}
        className={`relative transition-all p-6 min-h-screen dropzone ${
          isOver ? "bg-blue-100 border-blue-500" : "bg-gray-50 border-gray-300"
        }`}
      >
        {items.map((item, index) => {
          const widgetConfig = widgetConfigs.find(
            (config) => config.type === item.type
          );

          if (!widgetConfig) return null;

          const WidgetComponent = widgetConfig.component;

          return (
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
                setItems((prev) => {
                  const newItems = prev.map((i, idx) =>
                    idx === index ? { ...i, x: d.x, y: d.y } : i
                  );
                  onItemsChange?.(newItems);
                  return newItems;
                });
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                setItems((prev) => {
                  const newItems = prev.map((i, idx) =>
                    idx === index
                      ? {
                          ...i,
                          width: parseFloat(ref.style.width),
                          height: parseFloat(ref.style.height),
                          x: position.x,
                          y: position.y,
                        }
                      : i
                  );
                  onItemsChange?.(newItems);
                  return newItems;
                });
              }}
            >
              <Card
                className="shadow-lg border cursor-move drag-handle w-full h-full flex items-center justify-center relative"
                style={widgetConfig.style}
              >
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  onClick={() => removeItem(item.id)}
                >
                  <X size={16} />
                </button>

                <CardContent className="w-full h-full flex items-center justify-center p-4 border-none">
                  <WidgetComponent
                    content={item.content}
                    onChange={(newContent) =>
                      updateContent(item.id, newContent)
                    }
                    placeholder={widgetConfig.placeholder}
                  />
                </CardContent>
              </Card>
            </Rnd>
          );
        })}
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

export default DropZone;
