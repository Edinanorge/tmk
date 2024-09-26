import { useTranslations } from "next-intl";
import { Link } from "../../navigation";
import logo from "../../public/logo.png";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="bg-tertiary">
      <div className="flex justify-center ">
        <Link href="/">
          <Image src={logo} alt="Logo" className="" />
        </Link>
      </div>

      <div className="p-2 pl-5 text-sm text-white  ">
        <span>{t("copyright")}</span>
        <span className="font-bold pl-2">{t("org_number")}</span>
      </div>
    </footer>
  );
}
