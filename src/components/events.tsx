import { useTranslations, useLocale } from "next-intl";
import { Montserrat } from "@next/font/google";
import Wrapper from "./wrapper";
import EventList from "./eventList";
import rowEventsData from "../../data/events.json";

const fontH2 = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Events() {
  const t = useTranslations("homepage.upcoming_events");
  const locale = useLocale();

  const today = new Date();

  const localizedEvents = rowEventsData
    .map((event) => ({
      ...event,
      dateObj: new Date(event.date),
      title: event.translations[locale as "en" | "hu" | "no"]?.title || event.translations["hu"].title,
      description:
        event.translations[locale as "en" | "hu" | "no"]?.description || event.translations["hu"].description,
      labels: {
        date: event.translations[locale as "en" | "hu" | "no"]?.datesubtitle || event.translations["hu"].datesubtitle,
        location:
          event.translations[locale as "en" | "hu" | "no"]?.locationsubtitle ||
          event.translations["hu"].locationsubtitle,
        time: event.translations[locale as "en" | "hu" | "no"]?.timesubtitle || event.translations["hu"].timesubtitle,
      },
      responsible: Array.isArray(event.responsible) ? event.responsible : [event.responsible],
    }))
    .filter((event) => event.dateObj >= today)
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
    .slice(0, 3);

  return (
    <div className="bg-light w-full mt-10">
      <Wrapper>
        <h2 className={`text-center text-primary ${fontH2.className} font-bold pb-5`}>{t("title")}</h2>
        {localizedEvents.length === 0 ? (
          <p className="flex items-center justify-center gap-2 text-center text-gray-600 text-sm sm:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-4 w-4 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 2v4m8-4v4M3 10h18M5 6h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
              />
            </svg>

            {t("no_events", { defaultMessage: "No upcoming events" })}
          </p>
        ) : (
          <EventList events={localizedEvents} />
        )}
      </Wrapper>
    </div>
  );
}
