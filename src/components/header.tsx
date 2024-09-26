"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { VscClose } from "react-icons/vsc";
import { CiMenuFries } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import logo from "../../public/logo.png";

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations("homepage");

  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: t("navigation.link_about"), href: "/about" },
    { name: t("navigation.link_events"), href: "/events" },
    { name: t("navigation.link_contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-20 transition-colors duration-300 ${
        scrolled ? "bg-primary shadow-lg " : "bg-transparent"
      }`}
    >
      <nav className="flex justify-between items-center px-5 md:px-10 py-4">
        <Link href="/">
          <Image src={logo} alt="Logo" className="h-20 w-full" />
        </Link>

        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`${
                    isActive ? "underline underline-offset-8" : ""
                  } text-white hover:underline underline-offset-8  transition-all`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="md:hidden">
          <button onClick={() => setToggle(!toggle)}>
            {toggle ? <VscClose className="text-white h-6 w-6" /> : <CiMenuFries className="text-white h-6 w-6" />}
          </button>
        </div>

        {toggle && (
          <div className="absolute top-16 right-0 w-full bg-primary p-6 flex flex-col items-center md:hidden z-10">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`${
                        isActive ? "underline underline-offset-8" : ""
                      } text-white hover:underline underline-offset-8 transition-all `}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
