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
          <p className="text-center text-gray-600">{t("no_events")}</p>
        ) : (
          <EventList events={localizedEvents} />
        )}
      </Wrapper>
    </div>
  );
}
