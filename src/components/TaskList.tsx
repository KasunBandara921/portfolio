"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // 1. Import Framer Motion

type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  user?: { name: string; email: string };
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
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
  if (tasks.length === 0) return <p className="mt-4 text-sm text-gray-500">No tasks found.</p>;

  return (
    <div className="mt-4 flex flex-col gap-3">
      {/* We use the second parameter 'index' in the map function to create a staggered delay! */}
      {tasks.map((task, index) => (
        <motion.div
          key={task.id}
          // 2. Start invisible and 20px lower than normal
          initial={{ opacity: 0, y: 20 }} 
          // 3. Animate to fully visible and its natural position
          animate={{ opacity: 1, y: 0 }} 
          // 4. Add a slight delay based on the item's position in the list (index)
          transition={{ 
            delay: index * 0.8, // Item 1 delays 0s, Item 2 delays 0.1s, Item 3 delays 0.2s...
            type: "spring",     // Gives it a nice, natural bounce
            stiffness: 260,
            damping: 20 
          }}
          className="rounded border border-gray-200 bg-gray-50 p-3 shadow-sm"
        >
          <h3 className="font-bold text-gray-800">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          
          {task.user && (
            <p className="mt-2 text-xs font-semibold text-blue-600">
              Assigned to: {task.user.name} ({task.user.email})
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}