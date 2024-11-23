import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import NavLinks from "./NavLinks";
import { Menu, X } from "lucide-react";
import { toast } from "sonner";

export default function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef(null);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    toast.success("Sesión cerrada, vuelve pronto.");
    closeMenu();
    router.push("/");
  };

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const client = user?.isClient ? user.client : null;
  const repairShop = user?.isRepairShop ? user.repairShop : null;

  return (
    <nav className="mb-2 mt-1 mr-2 md:mr-6 lg:mr-8 sm:w-1/3 flex justify-end text-end md:w-1/3 lg:w-full xl:w-1/3 2xl:w-1/3 lg:mb-3">
      <div className="hidden justify-between lg:flex">
        <NavLinks
          handleLogout={handleLogout}
          client={client}
          repairShop={repairShop}
        />
      </div>
      <div className="lg:hidden">
        <button
          onClick={toggleNavbar}
          className="hover:text-[#D16527] transition-colors"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isOpen && (
        <div className="fixed h-full w-screen bg-black-50 backdrop-blur-sm top-0 right-0 lg:hidden">
          <div
            ref={menuRef}
            className="text-white items-center bg-[#302F2F] flex-col absolute right-5 top-1 h-auto p-10 gap-4 z-50 flex"
          >
            <button
              onClick={closeMenu}
              className="text-white absolute top-1 right-1"
            >
              <X />
            </button>
            <NavLinks
              handleLogout={handleLogout}
              client={client}
              repairShop={repairShop}
              closeMenu={closeMenu}
            />
          </div>
        </div>
      )}
    </nav>
  );
}
