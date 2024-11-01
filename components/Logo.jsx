import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../assets/images/Logo.png";

export default function Logo() {
  const router = useRouter();

  // Define el enlace según la ruta actual
  const logoHref = router.pathname === "/dashboard" ? "/dashboard" : "/";

  return (
    <div>
      <Link href={logoHref}>
        <Image
          className="sm:h-[30px] sm:w-[155px] lg:h-[35px] lg:w-[155px] mb-2 lg:mb-3 lg:ml-3 cursor-pointer"
          src={logo}
          alt="logo"
        />
      </Link>
    </div>
  );
}
