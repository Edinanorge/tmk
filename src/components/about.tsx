import { useTranslations } from "next-intl";
import Link from "next/link";
import { Montserrat } from "@next/font/google";
import Wrapper from "./wrapper";

const fontH2 = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
});

export default function About() {
  const t = useTranslations("homepage.about_us");
  return (
    <Wrapper>
      <div className="flex flex-col md:flex-row justify-center gap-5">
        <div className="flex-1 bg-tertiary p-5"></div>
        <div className="flex-1">
          <h2 className={fontH2.className}>{t("title")}</h2>
          <p className="pb-5">{t("description")}</p>
          <Link
            href="/about"
            className=" inline-block shadow-md bg-primary hover:bg-tertiary  px-4 py-2 text-light hover:text-white rounded-md  "
          >
            {t("link_about")}
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}
