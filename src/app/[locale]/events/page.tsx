import { useTranslations } from "next-intl";
import Hero from "@/components/hero";
import hero from "../../../../public/hero.jpg";

export default function EventList() {
  const t = useTranslations("homepage");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Hero title={t("upcoming_events.title")} heroImage={hero.src} height="half" />

      <ul>
        <li>event 1</li>
        <li>event 2</li>
      </ul>
    </main>
  );
}
