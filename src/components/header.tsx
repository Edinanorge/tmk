"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { VscClose } from "react-icons/vsc";
import { CiMenuFries } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Logo from "./logo";
import LanguageSwitcher from "./languageSwitcher";

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations("homepage");

  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const langPrefix = pathname.split("/")[1];

  const navLinks = [
    { name: t("navigation.link_about"), href: `/${langPrefix}/about` },
    { name: t("navigation.link_events"), href: `/${langPrefix}/events` },
    { name: t("navigation.link_contact"), href: `/${langPrefix}/contact` },
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

  const handleLinkClick = () => {
    setToggle(false);
  };
  return (
    <header
      className={`fixed top-0 w-full z-20 transition-colors duration-300 flex justify-between px-5 md:px-10 py-4 ${
        scrolled || toggle ? "bg-primary shadow-lg  " : "bg-transparent"
      }`}
    >
      <Logo />
      <div className="flex items-center pr-2">
        <nav className="flex justify-between items-center ">
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
            <div className="absolute top-20 right-0 w-full bg-primary p-6 flex flex-col items-center md:hidden z-10 text-center ">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={handleLinkClick}
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
        <LanguageSwitcher />
      </div>
    </header>
  );
}
