import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { User, Bell, LogOut } from "lucide-react";

export default function NavLinks({ handleLogout, client, repairShop }) {
  const router = useRouter();
  const userInfo = client || repairShop;
  const [allowedRoutes, setAllowedRoutes] = useState([
    "/dashboard",
    "/cancel",
    "/success",
    "/email-verification",
    "/quote-form",
    "/quote-sent",
    "/update-info",
  ]);

  const getNotificationCount = () => {
    if (repairShop) {
      return repairShop.quotes.filter((quote) => quote.status === "initial")
        .length;
    } else if (client) {
      return client.cars.reduce((acc, car) => {
        return (
          acc +
          car.quotes.reduce((quoteAcc, quote) => {
            const reviewCount = quote.repairShopQuotes.filter(
              (rsQuote) => rsQuote.status === "review"
            ).length;
            return quoteAcc + reviewCount;
          }, 0)
        );
      }, 0);
    }
    return 0;
  };

  const notificationCount = getNotificationCount();

  return (
    <div className="flex flex-col lg:flex-row items-center lg:space-x-5 w-full lg:w-auto">
      {(router.pathname === "/" ||
        router.pathname === "/repairshop-benefits" ||
        router.pathname === "/login" ||
        router.pathname === "/signup") && (
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start w-full space-y-4 lg:space-y-0 lg:space-x-5">
          <Link
            href="/"
            className="hover:text-[#D16527] font-mulish transition-colors"
          >
            Home
          </Link>
          <Link
            href="/repairshop-benefits"
            className="hover:text-[#D16527] font-mulish transition-colors"
          >
            Impulsa tu Refaccionaria
          </Link>
          <Link
            href="/signup"
            className="hover:text-[#D16527] font-mulish transition-colors"
          >
            Regístrate
          </Link>
          {userInfo ? (
            <Link
              href="/dashboard"
              className="hover:text-[#D16527] font-mulish transition-colors"
            >
              Mi cuenta
            </Link>
          ) : (
            <Link
              href="/login"
              className="hover:text-[#D16527] font-mulish transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      )}

      {userInfo && allowedRoutes.includes(router.pathname) && (
        <div className="flex flex-col lg:flex-row  lg:justify-start w-full lg:space-x-5 space-y-4 lg:space-y-0">
          <div className="flex flex-row hover:text-[#D16527] transition-colors cursor-pointer">
            <div className="relative">
              <Bell className="w-6 h-6 mr-2 " />
              {notificationCount > 0 && (
                <div className="absolute top-0 right-2 w-3 h-3 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                  {notificationCount}
                </div>
              )}
            </div>
            <p className="font-mulish lg:hidden ">Cotizaciones pendientes</p>
          </div>

          <div className="flex flex-row hover:text-[#D16527] transition-colors cursor-pointer">
            <User className="w-6 h-6 mr-2" />
            <p className="font-mulish lg:hidden">Mi cuenta</p>
          </div>
          <div
            className="flex flex-row hover:text-[#D16527] transition-colors cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="w-6 h-6 mr-2" />
            <p className="font-mulish lg:hidden">Cerrar sesión</p>
          </div>
        </div>
      )}
    </div>
  );
}
