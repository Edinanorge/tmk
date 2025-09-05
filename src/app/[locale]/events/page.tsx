"use client";

import { useTranslations } from "next-intl";
import Hero from "@/components/hero";
import hero from "../../../../public/hero.jpg";
import Wrapper from "@/components/wrapper";

import rowEventsData from "../../../../data/events.json";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useMemo } from "react";

type Language = "en" | "hu" | "no";

type EventTranslation = {
  title: string;
  description: string;
  datesubtitle: string;
  locationsubtitle: string;
  timesubtitle: string;
};

type Event = {
  id: number;
  translations: Record<Language, EventTranslation>;
  date: string;
  location: string;
  time: string;
  image: string;
  category: string;
  responsible: string[];
};

const eventsData = rowEventsData as Event[];

export default function EventList() {
  const t = useTranslations("event_page");
  const pathname = usePathname();
  const currentLanguage = (pathname.split("/")[1] || "en") as Language;

  const today = new Date();
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  // 🔹 compute filtered events once when filter changes
  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const date = new Date(event.date);
      const isPast = date < today;

      if (filter === "upcoming") return !isPast;
      if (filter === "past") return isPast;
      return true;
    });
  }, [filter]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero title={t("introduction.title")} heroImage={hero.src} height="half" />
      <Wrapper>
        <h2 className="text-primary">{t("introduction.subtitle")}</h2>
        <p>{t("introduction.description")}</p>

        {/* 🔹 Filter buttons */}
        <div className="flex justify-start gap-4 mt-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-sm rounded font-semibold transition ${
              filter === "all" ? "bg-primary text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilter("upcoming")}
            className={`px-4 py-2 text-sm rounded font-semibold transition ${
              filter === "upcoming" ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter("past")}
            className={`px-4 py-2 text-sm rounded font-semibold transition ${
              filter === "past" ? "bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Past
          </button>
        </div>

        {/* 🔹 Events list */}
        <section className="mt-8">
          <ul>
            {filteredEvents.map((event) => {
              const date = new Date(event.date);
              const isPast = date < today;
              const status = isPast ? "Past Event" : "Upcoming";

              return (
                <li key={event.id} className="mb-6">
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-1 lg:[grid-template-columns:auto_1fr_1fr] gap-10 items-center justify-center">
                    <p className="text-lg text-gray-600 font-bold text-center">{date.toLocaleDateString()}</p>

                    <div className="p-5 rounded w-[500]">
                      <Image
                        src={event.image}
                        alt={event.translations[currentLanguage]?.title || "No Title"}
                        width={500}
                        height={300}
                        className="m-auto object-cover rounded-md"
                        unoptimized
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-bold flex items-center gap-3">
                        {event.translations[currentLanguage]?.title || "No Title"}
                        <span
                          className={`px-3 py-1 text-sm rounded-lg ${
                            isPast ? "bg-gray-300 text-gray-800" : "bg-green-200 text-green-800"
                          }`}
                        >
                          {status}
                        </span>
                      </h4>

                      <p className="text-lg text-gray-500">
                        {event.translations[currentLanguage]?.locationsubtitle || " "}
                      </p>
                      <p>{event.location}</p>

                      <p className="text-lg text-gray-500">
                        {event.translations[currentLanguage]?.timesubtitle || " "}
                      </p>
                      <p>{event.time}</p>

                      <p>{event.translations[currentLanguage]?.description || "No Description"}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {filteredEvents.length === 0 && <p className="text-center text-gray-500 mt-6">No events found.</p>}
        </section>
      </Wrapper>
    </main>
  );
}
