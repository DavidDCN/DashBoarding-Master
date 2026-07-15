"use client";

import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Trash2, Plus } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type Todo = {
  id: string;
  task: string;
  completed: boolean;
  created_at: string;
};

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  // READ — fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching todos:", error.message);
    } else {
      setTodos(data as Todo[]);
    }
    setLoading(false);
  };

  // CREATE — insert a new todo
  const addTodo = async () => {
    if (!newTask.trim()) return;

    const { data, error } = await supabase
      .from("todos")
      .insert([{ task: newTask, completed: false }])
      .select();

    if (error) {
      console.error("Error adding todo:", error.message);
    } else if (data) {
      setTodos((prev) => [data[0] as Todo, ...prev]);
      setNewTask("");
    }
  };

  // UPDATE — toggle completed status
  const toggleTodo = async (id: string, completed: boolean) => {
    const { error } = await supabase
      .from("todos")
      .update({ completed: !completed })
      .eq("id", id);

    if (error) {
      console.error("Error updating todo:", error.message);
    } else {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t))
      );
    }
  };

  // DELETE — remove a todo
  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
      console.error("Error deleting todo:", error.message);
    } else {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">Todo List</h1>

      {/* CREATE FORM */}
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <Button onClick={addTodo}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* LIST */}
      <ScrollArea className="max-h-[400px] mt-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {loading && (
            <p className="text-sm text-muted-foreground">Loading tasks...</p>
          )}

          {!loading && todos.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No tasks yet. Add one above.
            </p>
          )}

          {todos.map((todo) => (
            <Card key={todo.id} className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() =>
                      toggleTodo(todo.id, todo.completed)
                    }
                  />
                  <label
                    className={`text-sm ${
                      todo.completed
                        ? "line-through text-muted-foreground"
                        : ""
                    }`}
                  >
                    {todo.task}
                  </label>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TodoList;