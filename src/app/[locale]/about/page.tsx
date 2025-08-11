export const metadata = {
  title: "Rólunk",
};

import Hero from "@/components/hero";
import { useTranslations } from "next-intl";
import hero from "../../../../public/hero.jpg";
import about1 from "../../../../public/About1.png";
import about2 from "../../../../public/About2.png";
import about3 from "../../../../public/About3.png";
import Wrapper from "@/components/wrapper";
import Image from "next/image";

export default function About() {
  const t = useTranslations("about_page");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-center md:text-start">
      <Hero title={t("introduction.title")} heroImage={hero.src} height="half" />
      <Wrapper>
        <div className="flex flex-col md:flex-row gap-10 mb-20">
          <div className="flex-1 zoom-image ">
            <Image src={about1} alt="About us" sizes="100%" objectFit="cover" className="image" />
          </div>
          <div className="flex-1">
            <h2>{t("mission.title")}</h2>
            <p>{t("mission.description")}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 ">
          <div className="flex-1">
            <h2>{t("activities.title")}</h2>
            <p>{t("activities.description")}</p>
          </div>
          <div className="flex-1 zoom-image ">
            <Image src={about2} alt="About us" sizes="100%" objectFit="cover" className="image" />
          </div>
        </div>
      </Wrapper>

      <div className="bg-primary py-20">
        <Wrapper>
          <h2 className=" font-normal text-light text-[20px] md:text-[32px]">{t("join_us.description")}</h2>
        </Wrapper>
      </div>

      <Wrapper>
        <div className="flex flex-col md:flex-row gap-10  ">
          <div className="flex-1">
            <h2>{t("join_us.title")}</h2>
            <p>{t("join_us.cta")}</p>
          </div>
          <div className="flex-1 zoom-image ">
            <Image src={about3} alt="About us" sizes="100%" objectFit="cover" className="image" />
          </div>
        </div>
      </Wrapper>
    </main>
  );
}
