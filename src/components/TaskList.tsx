"use client";

import { useEffect, useState } from "react";

// Defining the shape of our data so TypeScript can help us catch errors
type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  user?: { name: string; email: string }; // The user data is included because we are an ADMIN!
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // The browser automatically attaches the HTTP-only cookie to this request
        const res = await fetch("/api/tasks");
        if (!res.ok) throw new Error("Failed to fetch tasks");
        
        const data = await res.json();
        setTasks(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p className="mt-4 text-sm text-gray-500 animate-pulse">Loading tasks...</p>;
  if (error) return <p className="mt-4 text-sm text-red-500">Error: {error}</p>;
  if (tasks.length === 0) return <p className="mt-4 text-sm text-gray-500">No tasks found in the system.</p>;

  return (
    <div className="mt-4 flex flex-col gap-3">
      {tasks.map((task) => (
        <div key={task.id} className="rounded border border-gray-200 bg-gray-50 p-3">
          <h3 className="font-bold text-gray-800">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          
          {/* Because the backend sees we are an ADMIN, it included the user data! */}
          {task.user && (
            <p className="mt-2 text-xs font-semibold text-blue-600">
              Assigned to: {task.user.name} ({task.user.email})
            </p>
          )}
        </div>
      ))}
    </div>
  );
}