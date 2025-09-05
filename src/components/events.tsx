import { useTranslations, useLocale } from "next-intl";
import { Montserrat } from "@next/font/google";
import Wrapper from "./wrapper";
import EventList from "./eventList";
import eventsData from "../../data/events.json";

const fontH2 = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Events() {
  const t = useTranslations("homepage.upcoming_events");
  const locale = useLocale();

  const today = new Date();

  const localizedEvents = eventsData
    .map((event) => ({
      ...event,
      dateObj: new Date(event.date),
      title: event.translations[locale]?.title || event.translations["hu"].title,
      description: event.translations[locale]?.description || event.translations["hu"].description,
      labels: {
        date: event.translations[locale]?.datesubtitle || event.translations["hu"].datesubtitle,
        location: event.translations[locale]?.locationsubtitle || event.translations["hu"].locationsubtitle,
        time: event.translations[locale]?.timesubtitle || event.translations["hu"].timesubtitle,
      },
    }))

    .filter((event) => event.dateObj >= today)

    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())

    .slice(0, 3);

  return (
    <div className="bg-light w-full mt-10">
      <Wrapper>
        <h2 className={`text-center text-primary ${fontH2.className} font-bold pb-5`}>{t("title")}</h2>
        <EventList events={localizedEvents} />
      </Wrapper>
    </div>
  );
}
