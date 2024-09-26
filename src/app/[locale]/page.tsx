import { useTranslations } from "next-intl";

import Services from "@/components/services";
import About from "@/components/about";
import Events from "@/components/events";
import Hero from "@/components/hero";
import Cta from "@/components/cta";
import hero from "../../../public/hero.jpg";

export default function Home() {
  const t = useTranslations("homepage");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-brand">
      <Hero
        title={t("hero_section.welcome_message")}
        subtitle={t("hero_section.explore_events")}
        heroImage={hero.src}
        height="full"
      />
      <Services />
      <About />
      <Events />
      <Cta />
    </main>
  );
}
