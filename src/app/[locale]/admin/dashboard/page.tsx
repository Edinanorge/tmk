"use client";

import { redirect } from "next/navigation";
import eventsData from "../../../../../data/events.json";
import { useState } from "react";
import Image from "next/image";

export default function DashboardPage() {
  const isLoggedIn = true;
  const [eventList, setEventList] = useState(eventsData);
  const [selectedEvent, setSelectedEvent] = useState<(typeof eventList)[0] | null>(null);
  const [form, setForm] = useState({ name: "", description: "", date: "", image: "", location: "" });

  if (!isLoggedIn) {
    redirect("/admin");
  }

  const handleModify = (event: (typeof eventList)[0]) => {
    setSelectedEvent(event);
    setForm({
      name: event.translations.hu.title,
      description: event.translations.hu.description,
      date: event.date,
      image: event.image || "",
      location: event.location,
    });
  };

  const handleSave = async () => {
    if (!selectedEvent) return;

    const res = await fetch("/api/events/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedEvent.id, ...form }),
    });

    const data = await res.json();
    if (data.success) {
      setEventList(data.updatedData);
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
              {eventList.map((event) => (
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
              <div className="bg-white p-6 rounded w-[50vw]">
                <h2 className="text-xl font-bold mb-4">Modify Event</h2>

                {/* Image preview with upload button overlay */}
                <div className="relative mb-6">
                  <Image
                    src={form.image || "/placeholder.png"}
                    alt="Event image"
                    width={600}
                    height={400}
                    className="w-full object-cover rounded"
                  />
                  <label className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded cursor-pointer">
                    Upload
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
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Form inputs */}
                <label className="block font-semibold">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border p-2 rounded mb-4"
                />

                <label className="block font-semibold">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border p-2 rounded mb-4 resize-y"
                  rows={4}
                />
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <label className="block font-semibold">Date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full border p-2 rounded"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block font-semibold">Location</label>
                    <input
                      type="text"
                      value={form.location || ""}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setSelectedEvent(null)}>
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-primary text-white rounded" onClick={handleSave}>
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
