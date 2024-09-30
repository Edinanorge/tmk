import { useTranslations } from "next-intl";
import { Link } from "../../navigation";
import { FaFacebook } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

import logo from "../../public/logo.png";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-tertiary">
      <div className="flex flex-col justify-center items-center">
        <Link href="/">
          <Image src={logo} alt="Logo" className="" />
        </Link>

        <div className="flex gap-2">
          <Link href="https://www.facebook.com/profile.php?id=61557698976054" passHref>
            <div className="cursor-pointer">
              <FaFacebook />
            </div>
          </Link>
          <Link href="mailto:trmk.info@gmail.com" legacyBehavior>
            <div className="cursor-pointer">
              <IoMail />
            </div>
          </Link>
        </div>
      </div>

      <div className="p-2 pl-5 text-sm text-white  ">
        <span>{t("copyright")}</span>
        <span className="font-bold pl-2">{t("org_number")}</span>
      </div>
    </footer>
  );
}
