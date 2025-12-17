"use client";

import { redirect } from "next/navigation";
import eventsData from "../../../../../data/events.json";
import { useState } from "react";
import Image from "next/image";

export default function DashboardPage() {
  const isLoggedIn = true;

  const [eventList, setEventList] = useState(eventsData);
  const [selectedEvent, setSelectedEvent] = useState<(typeof eventList)[0] | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    date: "",
    image: "",
    location: "",
  });

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
      {/* Top bar */}
      <div className="bg-primary h-[100px] fixed top-0 left-0 right-0 z-40 md:static" />

      <div className="min-h-screen flex pt-[100px] md:pt-0">
        {/* Sidebar (desktop only) */}
        <aside className="hidden md:flex w-64 bg-primary text-white px-6 pt-20 flex-col">
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
        <main className="flex-1 bg-gray-100 p-4 sm:p-6 md:p-8 pt-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Events</h2>

          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
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
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-tertiary transition"
                      >
                        Szerkesztés
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE CARDS ================= */}
          <div className="md:hidden space-y-4">
            {eventList.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">ID</span>
                  <span className="font-medium">{event.id}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Name</span>
                  <span className="font-medium text-right">{event.translations.hu.title}</span>
                </div>

                <div className="flex justify-between mb-4">
                  <span className="text-sm text-gray-500">Date</span>
                  <span className="font-medium">{event.date}</span>
                </div>

                <button
                  onClick={() => handleModify(event)}
                  className="w-full bg-primary text-white py-2 rounded hover:bg-tertiary transition"
                >
                  Szerkesztés
                </button>
              </div>
            ))}
          </div>

          {/* ================= MODAL ================= */}
          {selectedEvent && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
              <div className="bg-white w-full h-full sm:h-auto sm:max-w-2xl p-4 sm:p-6 rounded overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Modify Event</h2>

                {/* Image */}
                <div className="relative mb-6">
                  <Image
                    src={form.image || "/placeholder.png"}
                    alt="Event image"
                    width={600}
                    height={400}
                    className="w-full object-cover rounded"
                  />
                  <label className="absolute bottom-2 right-2 bg-black/60 text-white px-3 py-1 rounded cursor-pointer text-sm">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          const reader = new FileReader();
                          reader.onload = (ev) =>
                            setForm({
                              ...form,
                              image: ev.target?.result as string,
                            });
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>

                {/* Form */}
                <label className="block font-semibold">Name</label>
                <input
                  className="w-full border p-2 rounded mb-4"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                />

                <label className="block font-semibold">Description</label>
                <textarea
                  className="w-full border p-2 rounded mb-4 resize-y"
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                />

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <label className="block font-semibold">Date</label>
                    <input
                      type="date"
                      className="w-full border p-2 rounded"
                      value={form.date}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block font-semibold">Location</label>
                    <input
                      className="w-full border p-2 rounded"
                      value={form.location}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          location: e.target.value,
                        })
                      }
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
