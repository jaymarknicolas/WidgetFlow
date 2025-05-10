"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between p-3 bg-white border rounded-md shadow-sm group">
      <div className="flex items-center gap-3 flex-1">
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
        />
        <label
          htmlFor={`todo-${todo.id}`}
          className={`flex-1 cursor-pointer ${
            todo.completed ? "text-muted-foreground line-through" : ""
          }`}
        >
          {todo.text}
        </label>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="h-4 w-4 text-destructive" />
        <span className="sr-only">Delete</span>
      </Button>
    </li>
  );
}
