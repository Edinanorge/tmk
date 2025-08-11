import Hero from "@/components/hero";
import { useTranslations } from "next-intl";
import hero from "../../../../public/hero.jpg";
import Wrapper from "@/components/wrapper";

export const metadata = {
  title: "Lépj kapcsolatba velünk!",
};

export default function Contact() {
  const t = useTranslations("contact_page");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-center xl:text-start">
      <Hero title={t("introduction.title")} heroImage={hero.src} height="half" />
      <Wrapper>
        <h2 className="text-primary ">{t("introduction.subtitle")}</h2>
        <p className=" ">{t("introduction.description")}</p>
        <div className="my-8 pl-4">
          <p className="font-bold ">{t("contact_info.email_title")}</p>
          <p>{t("contact_info.email_address")}</p>
        </div>

        <h3 className="">{t("contact_info.description")}</h3>
      </Wrapper>
    </main>
  );
}
