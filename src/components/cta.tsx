import { useTranslations } from "next-intl";
import contact from "../../public/contact.jpg";
import Link from "next/link";

export default function Cta() {
  const t = useTranslations("homepage.contact_us_cta");
  return (
    <section className="text-center p-10 md:p-40 bg-primary w-full text-light">
      <h2 className="text-light">{t("title")}</h2>
      <h4 className="p-3">{t("description")} </h4>
      <p className="font-bold ">{t("e-mail")}</p>
      <h4 className="text-light mt-5">{t("cta_description")}</h4>
      <Link
        href="https://docs.google.com/forms/d/e/1FAIpQLSdrgwje3sKJhWfTzO8S5yBjqoSMM1PR21TpyhucGxrHkt8vqQ/viewform?fbclid=IwY2xjawIFln1leHRuA2FlbQIxMAABHadWj1bwvDt-NiNw9_oGJNyRD6T5x1g9FOOs8xonBqC8teo-3iml6UBaTw_aem_VknI24L65nojxtaJsfqpgw"
        target="_blank"
        className="inline-block bg-light text-primary py-2 px-8 rounded-lg hover:bg-primary-dark transition-all"
      >
        {t("cta_button")}
      </Link>
    </section>
   
  );
}
