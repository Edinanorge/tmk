import { useTranslations } from "next-intl";
import Hero from "@/components/hero";
import hero from "../../../../public/hero.jpg";
import Wrapper from "@/components/wrapper";
import { Montserrat } from "@next/font/google";

export default function EventList() {
  const t = useTranslations("event_page");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Hero title={t("title")} heroImage={hero.src} height="half" />
      <div>Comming soon...</div>
    </main>
  );
}
