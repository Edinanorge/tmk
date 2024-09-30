import { Link } from "../../navigation";
import logo from "../../public/logo.png";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/">
      <Image src={logo} alt="Logo" className="h-20 w-full" />
    </Link>
  );
}
