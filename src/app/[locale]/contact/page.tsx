import Hero from "@/components/hero";
import { useTranslations } from "next-intl";
import hero from "../../../../public/hero.jpg";

export const metadata = {
  title: "Lépj kapcsolatba velünk!",
};

export default function Contact() {
  const t = useTranslations("contact_page");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Hero title={t("introduction.title")} heroImage={hero.src} height="half" />
      <div className="p-10 md:p-24 ">
        <p className="text-primary font-light md:text-[36px] ">{t("introduction.description")}</p>
        <div className="my-8 pl-4">
          <p className="font-bold ">{t("contact_info.email_title")}</p>
          <p>{t("contact_info.email_address")}</p>
        </div>

        <h2 className="">{t("contact_info.description")}</h2>
      </div>
    </main>
  );
}
