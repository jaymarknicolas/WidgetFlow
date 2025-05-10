import { useDrop } from "react-dnd";

interface TrashZoneProps {
  onDropItem: (id: string) => void;
}

const TrashZone = ({ onDropItem }: TrashZoneProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: "DROPPABLE_WIDGET", // generic type, should match your widget drag source type
    drop: (item: { id: string }) => {
      onDropItem(item.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      // @ts-expect-error "ref" is a valid prop
      ref={drop as React.RefObject<HTMLDivElement>}
      className={`fixed bottom-4 right-4 w-32 h-32 rounded-full flex items-center justify-center z-50 transition-all duration-300
        ${
          isOver
            ? "bg-red-500 text-white scale-110"
            : "bg-gray-200 text-gray-700"
        }
      `}
    >
      🗑️ Trash
    </div>
  );
};

export default TrashZone;
