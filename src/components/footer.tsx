import { useTranslations } from "next-intl";
import { Link } from "../../navigation";
import { FaFacebook } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

import logo from "../../public/logo.png";
import Image from "next/image";

// export default function Footer() {
//   const t = useTranslations("footer");

//   return (
//     <footer className="bg-tertiary">
//       <div className="flex flex-col justify-center items-center">
//         <Link href="/">
//           <Image src={logo} alt="Logo" />
//         </Link>

//         <div className="flex  gap-4 mb-4 text-white ">
//           <Link href="https://www.facebook.com/profile.php?id=61557698976054" passHref>
//             <div className="cursor-pointer text-center">
//               <FaFacebook className="text-[25px]" />
//             </div>
//           </Link>
//           <Link href="mailto:trmk.info@gmail.com" legacyBehavior>
//             <div className="cursor-pointer">
//               <IoMail className="text-[25px]" />
//             </div>
//           </Link>
//         </div>
//       </div>

//       <div className="p-2 pl-5 text-sm text-white  ">
//         <span>{t("copyright")}</span>
//         <span className="font-bold pl-2">{t("org_number")}</span>
//       </div>
//     </footer>
//   );
// }

export default function Footer() {
  const t = useTranslations("footer");

  const navLinks = [
    { name: t("navigation.link_home"), href: "/" },
    { name: t("navigation.link_about"), href: "/about" },
    { name: t("navigation.link_events"), href: "/events" },
    { name: t("navigation.link_contact"), href: "/contact" },
  ];

  const importantLinks = [
    { name: "VIPPS", href: "https://www.vipps.no/" },
    { name: t("important_links.link_code_of_conduct"), href: "/code-of-conduct" },
    { name: t("important_links.link_privacy_policy"), href: "/privacy-policy" },
  ];

  return (
    <footer className="bg-tertiary text-white py-8">
      <div className="container mx-auto px-6 md:px-12">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 md:justify-between">
          <div className="w-[100px]">
            <h4 className="font-bold mb-2">{t("navigation.title")}</h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:justify-center">
            <Link href="/">
              <Image src={logo} alt="Logo" className="h-48 w-auto" />
            </Link>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="https://www.facebook.com/profile.php?id=61557698976054" passHref>
                <FaFacebook className="text-2xl cursor-pointer hover:text-primary transition-colors" />
              </Link>
              <Link href="mailto:trmk.info@gmail.com">
                <IoMail className="text-2xl cursor-pointer hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          {/* Important Links */}
          <div className="w-[150px]">
            <h4 className="font-bold mb-2">{t("important_links.title")}</h4>
            <ul className="flex flex-col gap-2">
              {importantLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 text-center text-sm border-t-2  ">
          <p>
            {t("copyright")} <span className="font-bold">{t("org_number")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
