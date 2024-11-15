import { useState } from "react";
import { useRouter } from "next/router";
import NavLinks from "./NavLinks";
import { Menu, X } from "lucide-react";
import { toast } from "sonner";

export default function Navbar({ setCurrentPage, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleNavbar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Sesión cerrada, vuelve pronto.");
    router.push("/");
  };

  const client = user.isClient ? user.client : null;
  const repairShop = user.isRepairShop ? user.repairShop : null;

  const isVisible = router.pathname === "/" || router.pathname === "/dashboard" || router.pathname === "/login" || router.pathname === "/signup"

  return (
    <nav className="mb-2 mt-1 mr-2 md:mr-6 lg:mr-8 sm:w-1/3 flex justify-end text-end md:w-1/3 lg:w-full xl:w-1/3 2xl:w-1/3 lg:mb-3">
      <div className="hidden justify-between lg:flex">
        <NavLinks
          setCurrentPage={setCurrentPage}
          handleLogout={handleLogout}
          client={client}
          repairShop={repairShop}
        />
      </div>
      {isVisible && ( 
        <div className="lg:hidden">
          <button
            onClick={toggleNavbar}
            className="hover:text-[#D16527] transition-colors"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      )}
      {isOpen && (
        <div className="fixed h-full w-screen bg-black-50 backdrop-blur-sm top-0 right-0 lg:hidden">
          <div className="text-white items-center bg-[#302F2F] flex-col absolute right-5 top-1 h-auto p-10 gap-4 z-50 flex">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white absolute top-1 right-1"
            >
              <X />
            </button>
            <NavLinks
              setCurrentPage={setCurrentPage}
              handleLogout={handleLogout}
              client={client}
              repairShop={repairShop}
            />
          </div>
        </div>
      )}
    </nav>
  );
}
