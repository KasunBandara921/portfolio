"use client";

import { useEffect, useState } from "react";

type Event = {
  id: string;
  title: string;
  date: string;
  type: string;
};

// We pass the role into the component to determine what the user is allowed to see
export default function CompanyCalendar({ role }: { role: string }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("HOLIDAY");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, type }),
    });

    if (res.ok) {
      window.location.reload(); // Refresh to show the new event
    } else {
      alert("Failed to create event. Are you sure you are an Admin?");
    }
    setIsSaving(false);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* RBAC UI: Only render this form if the user is an ADMIN */}
      {role === "ADMIN" && (
        <form onSubmit={handleAddEvent} className="rounded border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-3 font-semibold text-blue-800">Add New Calendar Event</h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Event Name (e.g., Independence Day)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 rounded border px-3 py-2 text-sm"
              required
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded border px-3 py-2 text-sm"
              required
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded border bg-white px-3 py-2 text-sm"
            >
              <option value="HOLIDAY">Holiday</option>
              <option value="EVENT">Company Event</option>
            </select>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
            >
              {isSaving ? "Saving..." : "Add"}
            </button>
          </div>
        </form>
      )}

      {/* The Calendar List view (Visible to EVERYONE) */}
      <div className="flex flex-col gap-2">
        {events.length === 0 ? (
          <p className="text-sm text-gray-500">No upcoming events scheduled.</p>
        ) : (
          events.map((evt) => (
            <div key={evt.id} className="flex items-center justify-between rounded border border-gray-200 bg-white p-3 shadow-sm">
              <div className="flex items-center gap-3">
                <span className={`rounded px-2 py-1 text-xs font-bold ${evt.type === 'HOLIDAY' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                  {evt.type}
                </span>
                <span className="font-medium text-gray-800">{evt.title}</span>
              </div>
              <span className="text-sm font-semibold text-gray-600">
                {new Date(evt.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}