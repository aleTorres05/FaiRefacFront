import Link from "next/link";
import { useRouter } from "next/router";
import DropdownMenu from "./DropdownMenu";
import { User, Bell } from "lucide-react";

export default function NavLinks({
  setCurrentPage,
  handleLogout,
  isLoggedIn,
  client,
  repairShop
}) {
  const router = useRouter();

  const userInfo = client || repairShop;

  if (router.pathname === "/dashboard" && isLoggedIn) {
    return (
      <div className="fixed top-10 right-7 flex items-center space-x-5">
        <div className="flex w-full justify-end">
          <DropdownMenu
            trigger={
              <User className="w-6 h-6 hover:text-[#D16527] transition-colors" />
            }
          >
            <div className="p-6 bg-[#302F2F] rounded-md w-full content-fit text-white">
              <div className="flex items-center flex-col mb-4">
                <img
                  src={userInfo?.profilePicture}
                  alt="logo"
                  className="w-16 h-16 rounded-full mb-2"
                />
                <p className="font-chakra">
                ¡Hola! {userInfo?.companyName || userInfo?.firstName}
                </p>
                <button className="bg-[#D16527] text-white uppercase w-full py-2 mt-4 rounded-md font-bold" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
              </div>
            </div>
          </DropdownMenu>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Link
          href="/"
          onClick={() => setCurrentPage("home")}
          className="hover:text-[#D16527] font-mulish transition-colors"
        >
          Home
        </Link>
        <Link
          href=""
          onClick={() => setCurrentPage("impulsa")}
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
        <Link
          href="/login"
          className="hover:text-[#D16527] font-mulish transition-colors"
        >
          Login
        </Link>
      </div>
    );
  }
}
