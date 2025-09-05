import React from "react";
import hero from "../../../../public/hero.jpg";

export const metadata = {
  title: "Admin Panel",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex-1 bg-center bg-cover bg-no-repeat">{children}</main>;
}
