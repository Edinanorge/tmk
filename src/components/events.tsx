import { useTranslations } from "next-intl";
import { Montserrat } from "@next/font/google";
import Wrapper from "./wrapper";

const fontH2 = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Events() {
  const t = useTranslations("homepage.upcoming_events");
  return (
    <div className="bg-light w-full mt-10">
      <Wrapper>
        <h2 className={`text-center text-primary ${fontH2.className} font-bold pb-5`}>{t("title")}</h2>
        <div className="h-80 w-full bg-tertiary my-5"></div>
        <div className="h-80 w-full bg-tertiary my-5"></div>
        <div className="h-80 w-full bg-tertiary my-5"></div>
      </Wrapper>
    </div>
  );
}
