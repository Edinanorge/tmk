"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import heroImage from "../../../../public/hero.jpg";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true"); // jelzés, hogy belépett
      router.push("/admin/dashboard");
    } else {
      setError("Hibás felhasználónév vagy jelszó");
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center h-[80vh] pt-16">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="absolute inset-0 -z-10">
          <Image src={heroImage} alt="Hero image" layout="fill" objectFit="cover" />
        </div>
        <h1 className="text-secondary mb-2">Admin Login</h1>
        {error && (
          <div className="p-1 bg-white">
            <p className="text-red-600 text-sm text-light">{error}</p>
          </div>
        )}
        <input
          className="py-2 px-4 rounded"
          type="text"
          placeholder="Felhasználónév"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="py-2 px-4 rounded"
          type="password"
          placeholder="Jelszó"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="inline-block shadow-md bg-tertiary hover:bg-primary  px-4 py-2 text-white hover:text-white rounded-md mt-2"
        >
          Bejelentkezés
        </button>
      </form>
    </div>
  );
}
