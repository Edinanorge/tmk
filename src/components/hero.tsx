import Image from "next/image";
import { Abril_Fatface } from "@next/font/google";

interface HeroProps {
  title: string;
  subtitle?: string;
  heroImage: string;
  height?: "full" | "half";
}

const fontH1 = Abril_Fatface({
  subsets: ["latin"],
  weight: ["400"],
});

const Hero: React.FC<HeroProps> = ({ title, subtitle, heroImage, height = "full" }) => {
  const heightClass = height === "half" ? "h-[60vh] w-full" : "h-[90vh]  w-full";
  return (
    <div className="flex flex-col  w-full  shadow-md shadow-secondary">
      <section className={`relative w-full flex flex-col items-center justify-center ${heightClass} pt-16`}>
        <div className="absolute inset-0 -z-10 ">
          <Image src={heroImage} alt="Hero image" layout="fill" objectFit="cover" />
        </div>
        <div className="text-center text-white px-10 xl:px-40 xxl:px-120">
          <h1 className={`pt-5 ${fontH1.className} xl:text-[64px] leading-none pb-5`}>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </section>
    </div>
  );
};

export default Hero;
