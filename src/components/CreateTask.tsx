"use client";

import { useState } from "react";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // The browser automatically attaches your secure HTTP-only token here!
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) throw new Error("Failed to create task");

      setMessage("Task created successfully!");
      setTitle("");
      setDescription("");
      
      // A simple way to refresh the page so the TaskList updates immediately
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-700">Log a New Task</h2>
      
      {message && (
        <div className={`mb-4 rounded p-2 text-sm ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <input
            type="text"
            placeholder="Task Title (e.g., Update Database Schema)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Task Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded bg-blue-600 py-2 text-sm font-bold text-white transition hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isLoading ? "Saving..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}