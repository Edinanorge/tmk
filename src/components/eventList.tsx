"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

type Translation = {
  title: string;
  description: string;
  locationsubtitle: string;
  timesubtitle: string;
  datesubtitle: string;
};

type Event = {
  id: string | number;
  image?: string;
  date: string;
  location: string;
  time: string;
  translations: {
    en: Translation;
    hu?: Translation;
    no?: Translation;
    [key: string]: Translation | undefined;
  };
};

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
  const locale = useLocale();
  const today = new Date();

  return (
    <ul className="space-y-6">
      {events.map((event) => {
        const translation = event.translations[locale as "en" | "hu" | "no"] || event.translations.en;

        const date = new Date(event.date);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" });

        const isPast = date < today;
        const status = isPast ? "Past Event" : "Upcoming";

        return (
          <li
            key={event.id}
            className="mt-8 grid grid-cols-1  md:grid-cols-1 lg:[grid-template-columns:1fr_1fr] gap-10 items-start justify-center  "
          >
            <Image
              src={event.image || "/placeholder.png"}
              alt={translation.title}
              width={600}
              height={400}
              unoptimized
              className="rounded-md object-cover"
            />

            <div className="flex-1">
              <div className="font-bold text-primary pt-2 flex flex-row justify-start items-end gap-3 mb-10">
                <div className="text-5xl">{day}</div>
                <div className="text-3xl">{month}</div>
                <div className="text-5xl">2025</div>
              </div>

              <h3 className="text-2xl font-bold mb-2 text-[#1a3e2d] flex items-center gap-3">
                {translation.title}{" "}
                <span
                  className={`px-3 py-1 text-sm rounded-lg ${
                    isPast ? "bg-gray-300 text-gray-800" : "bg-green-200 text-green-800"
                  }`}
                >
                  {status}
                </span>
              </h3>

              <p className=" text-gray-700">
                <strong>{translation.locationsubtitle}:</strong> {event.location}
              </p>
              <p className=" text-gray-700">
                <strong>{translation.timesubtitle}:</strong> {event.time}
              </p>
              <p className=" text-gray-700">
                <strong>{translation.datesubtitle}:</strong> {date.toLocaleDateString()}
              </p>
              <p className="text-gray-800 mt-2">{translation.description}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
