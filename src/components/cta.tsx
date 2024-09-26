import { useTranslations } from "next-intl";

export default function Cta() {
  const t = useTranslations("homepage.contact_us_cta");
  return (
    <section className="text-center p-20 bg-primary w-full text-light">
      <h2 className=" text-light ">{t("title")}</h2>
      <p className="p-3">{t("description")} </p>
      <p className="font-bold">{t("e-mail")}</p>
    </section>
  );
}
