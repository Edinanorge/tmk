"use client";

import { useTranslations } from "next-intl";
import Hero from "@/components/hero";
import hero from "../../../../public/hero.jpg";
import Wrapper from "@/components/wrapper";
import rowEventsData from "../../../../data/events.json";
import { usePathname } from "next/navigation";
import Image from "next/image";

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Hero title={t("introduction.title")} heroImage={hero.src} height="half" />
      <Wrapper>
        <h2 className="text-primary">{t("introduction.subtitle")}</h2>
        <p>{t("introduction.description")}</p>

        <section className="mt-8">
          <ul>
            {eventsData.map((event) => (
              <li key={event.id} className="mb-6 ">
                <div className="mt-8 grid grid-cols-1 md:grid-cols-1 lg:[grid-template-columns:auto_1fr_1fr] gap-10 items-center justify-center ">
                  <p className="text-lg text-gray-500 text-center">{event.date}</p>
                  <div className=" p-5 rounded w-[500] ">
                    <Image
                      src={event.image}
                      alt={event.translations[currentLanguage]?.title || "No Title"}
                      width={200}
                      height={200}
                      objectFit="cover"
                      className="m-auto"
                      unoptimized
                    />
                  </div>

                  <div className="">
                    <h4 className="text-lg font-bold">{event.translations[currentLanguage]?.title || "No Title"}</h4>
                    <p className="text-lg text-gray-500">
                      {event.translations[currentLanguage]?.locationsubtitle || " "}
                    </p>
                    <p>{event.location}</p>
                    <p className="text-lg text-gray-500">{event.translations[currentLanguage]?.timesubtitle || " "}</p>
                    <p>{event.time}</p>
                    <p>{event.translations[currentLanguage]?.description || "No Description"}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </Wrapper>
    </main>
  );
}
