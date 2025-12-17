import { useTranslations } from "next-intl";
import { Link } from "../../navigation";
import { FaFacebook } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import Image from "next/image";
import logo from "../../public/logo.png";

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
    { name: "Admin", href: "/admin" },
    { name: t("important_links.link_privacy_policy"), href: "/privacy-policy" },
  ];

  return (
    <footer className="bg-gradient-to-b from-tertiary to-black text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-6 md:px-12">
        {/* Grid content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo + Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Image src={logo} alt="Logo" className="w-52 md:w-56 h-auto" priority />
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{t("navigation.title")}</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{t("important_links.title")}</h4>
            <ul className="space-y-2">
              {importantLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{t("newsletter.title") || "Stay Updated"}</h4>
            <div className="flex flex-col gap-4">
              {/* Newsletter input */}
              <div className="flex">
                <input
                  type="email"
                  placeholder={t("newsletter.placeholder") || "Your email"}
                  className="px-3 py-2 rounded-l-md w-full bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary/80 transition-colors">
                  {t("newsletter.subscribe") || "Subscribe"}
                </button>
              </div>

              {/* Social links */}
              <div className="flex gap-2">
                <Link href="https://www.facebook.com/profile.php?id=61557698976054" passHref>
                  <div className="p-4 rounded-full bg-gray-800 hover:bg-primary transition-colors cursor-pointer">
                    <FaFacebook className="text-xl" />
                  </div>
                </Link>
                <Link href="mailto:trmk.info@gmail.com">
                  <div className="p-4 rounded-full bg-gray-800 hover:bg-primary transition-colors cursor-pointer">
                    <IoMail className="text-xl" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>
            {t("copyright")} <span className="text-white">{t("org_number")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
