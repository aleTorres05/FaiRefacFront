import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Logo() {
  const router = useRouter();
  const [allowedRoutes, setAllowedRoutes] = useState([
    "/dashboard",
    "/cancel",
    "/success",
    "/email-verification",
    "/quote-form",
    "/quote-sent",
    "/update-info",
  ]);

  const logoHref = allowedRoutes.includes(router.pathname) ? "/dashboard" : "/";

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
