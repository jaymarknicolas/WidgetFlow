import { Card, CardContent } from "@/components/ui/card";
import DraggableItem from "./draggable-item";

const CustomSidebar = () => {
  return (
    <aside className="w-1/4 p-4 bg-gray-100 h-screen flex flex-col gap-4">
      <h2 className="text-lg font-bold">Widgets</h2>
      <DraggableItem />
    </aside>
  );
};

export default CustomSidebar;
