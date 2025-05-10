"use client";

import type React from "react";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TodoItem from "./todo-item";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
    };

    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (activeTab === "active") return !todo.completed;
    if (activeTab === "completed") return todo.completed;
    return true;
  });

  return (
    <Card className="shadow-lg h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold text-center">
          Todo List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addTodo} className="flex space-x-2 mb-6">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <PlusCircle className="h-5 w-5" />
            <span className="sr-only">Add task</span>
          </Button>
        </form>

        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {filteredTodos.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                {activeTab === "all"
                  ? "Add your first task!"
                  : activeTab === "active"
                  ? "No active tasks"
                  : "No completed tasks"}
              </p>
            ) : (
              <ul className="space-y-2">
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </ul>
            )}
          </TabsContent>
        </Tabs>

        {todos.length > 0 && (
          <div className="mt-4 text-sm text-muted-foreground text-center">
            {todos.filter((t) => !t.completed).length} items left
          </div>
        )}
      </CardContent>
    </Card>
  );
}
