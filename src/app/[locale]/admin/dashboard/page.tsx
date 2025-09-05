"use client";

import { redirect } from "next/navigation";
import eventsData from "../../../../../data/events.json";
import { useState } from "react";

export default function DashboardPage() {
  const isLoggedIn = true;
  const [events, setEvents] = useState(eventsData);
  const [selectedEvent, setSelectedEvent] = useState<{
    id: number;
    name: string;
    description: String;
    date: string;
    image?: string;
  } | null>(null);
  const [form, setForm] = useState({ name: "", description: "", date: "", image: "" });
  if (!isLoggedIn) {
    redirect("/admin");
  }
  const handleModify = (event: (typeof events)[0]) => {
    setSelectedEvent(event);
    setForm({
      name: event.translations.hu.title,
      description: event.translations.hu.description,
      date: event.date,
      image: event.image || "",
    });
  };

  const handleSave = async () => {
    const res = await fetch("/api/events/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedEvent.id, ...form }),
    });
    const data = await res.json();
    if (data.success) {
      setEvents(data.updatedData); // frissítjük a state-et
      setSelectedEvent(null);
    }
  };
  return (
    <>
      <div className="bg-primary h-[100px]"></div>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-primary text-white px-6 pt-20 flex flex-col">
          <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
          <nav className="flex flex-col gap-4">
            <a href="#" className="hover:text-gray-300">
              Dashboard
            </a>
            <a href="#" className="hover:text-gray-300">
              Events
            </a>
            <a href="#" className="hover:text-gray-300">
              Settings
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 bg-gray-100 pt-20">
          <h2 className="text-3xl font-bold mb-6">Events</h2>

          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{event.id}</td>
                  <td className="py-3 px-6">{event.translations.hu.title}</td>
                  <td className="py-3 px-6">{event.date}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleModify(event)}
                      className="bg-primary text-white px-4 py-2 rounded hover:bg-tertiary"
                    >
                      Szerkesztés
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal */}
          {selectedEvent && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded w-100">
                <h3 className="text-xl font-bold mb-4">Modify Event</h3>

                {/* Form inputs */}
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border p-2 rounded mb-4"
                />
                <label className="block mb-2">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border p-2 rounded mb-4 resize-y"
                  rows={4}
                />
                <label className="block mb-2">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border p-2 rounded mb-4"
                />

                <label className="block mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setForm({ ...form, image: ev.target?.result as string });
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                  className="mb-4"
                />

                {form.image && <img src={form.image} className="mb-4 w-full h-32 object-cover rounded" />}

                <div className="flex justify-end gap-2">
                  <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setSelectedEvent(null)}>
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
