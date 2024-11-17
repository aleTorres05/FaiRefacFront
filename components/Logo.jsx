import Link from "next/link";
import { useRouter } from "next/router";


export default function Logo() {
  const router = useRouter();

  // Define el enlace según la ruta actual
  const logoHref = router.pathname === "/dashboard" ? "/dashboard" : "/";

  return (
    <div className="w-1/4 ml-5">
      <Link href={logoHref}>
        <img
          className="h-8 lg:h-[35px] lg:w-[155px] mb-2 lg:mb-3 lg:ml-3 cursor-pointer"
          src="https://fairefac-assets.s3.us-east-2.amazonaws.com/FR-Logo.png"
          alt="logo"
        />
      </Link>
    </div>
  );
}
