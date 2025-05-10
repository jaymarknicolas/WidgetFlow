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
  height: number;
  width: number;
}

interface DropZoneProps {
  widgetConfigs: WidgetConfig[];
  onItemsChange?: (items: DroppedItem[]) => void;
}

const DropZone = ({ widgetConfigs, onItemsChange }: DropZoneProps) => {
  const [items, setItems] = useState<DroppedItem[]>([]);

  const [{ isOver }, drop] = useDrop({
    accept: widgetConfigs.map((config) => config.type),
    drop: (item: { id: string }, monitor) => {
      const widgetConfig = widgetConfigs.find((config) => {
        return config.id === item.id;
      });

      const clientOffset = monitor.getClientOffset(); // mouse position on screen
      const dropTarget = document.querySelector(".dropzone") as HTMLElement;
      const dropRect = dropTarget.getBoundingClientRect();

      const x = (clientOffset?.x || 0) - dropRect.left;
      const y = (clientOffset?.y || 0) - dropRect.top;

      if (!widgetConfig) return;

      if (widgetConfig.type === "EMBED") {
        widgetConfig.initialContent = formatUrl(
          prompt("Enter a URL to embed:") || ""
        );
      }

      console.log(widgetConfig);
      const newItem: DroppedItem = {
        id: crypto.randomUUID(),
        type: widgetConfig.type,
        content: widgetConfig.initialContent,
        x,
        y,
        width: widgetConfig.width,
        height: widgetConfig.height,
      };

      // console.log(newItem);
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
        className={`relative transition-all p-6 min-h-screen dropzone grid-layout ${
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
                className="shadow-lg border cursor-move drag-handle w-full h-full flex items-center justify-center relative group overflow-hidden"
                style={widgetConfig.style}
              >
                <div className="z-50 absolute left-1/2 -translate-x-1/2 -top-[50px] opacity-0 px-10 py-6 group-hover:opacity-100 group-hover:-top-3 backdrop-blur-sm transition-all duration-200 ease-in-out backdrop-grayscale bg-slate-300/50 rounded-bl-full rounded-br-full">
                  <X
                    className=" bg-red-500 text-white hover:bg-red-600  cursor-pointer rounded-full absolute bottom-2 left-0 translate-x-[115%] transition-all"
                    onClick={() => removeItem(item.id)}
                  />
                </div>

                <CardContent className="w-full h-full flex items-center justify-center p-0 border-none widget-wrapper">
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
