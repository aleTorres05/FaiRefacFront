import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

export default function Navbar({ setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const NavLinks = () => {
    return (
      <>
        {isOpen ? (
          <Link href="/" onClick={() => setCurrentPage("home")}>
            Home
          </Link>
        ) : (
          <Link
            className="text-[#D16527] border-b-2 border-[#D16527]"
            href="/"
            onClick={() => setCurrentPage("home")}
          >
            Home
          </Link>
        )}

        <Link href="#" onClick={() => setCurrentPage("impulsa")}>
          Impulsa tu Refaccionaria
        </Link>
        <Link href="/signup">Registrate</Link>
        {isOpen ? (
          <button className="bg-[#D16527] px-6 py-2 w-[90%] h-[30%] custom-btn">
            <Link href="/login">Login</Link>
          </button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </>
    );
  };

  return (
    <nav className="mb-2 sm:w-1/3 flex justify-end md:w-1/3 lg:w-1/2 lg:mr-8 xl:w-1/3 2xl:w-1/3 lg:mb-3">
      <div className="hidden w-full justify-between lg:justify-around lg:flex md:hidden xl:justify-evenly">
        <NavLinks />
      </div>
      <div className="lg:hidden">
        <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
      </div>
      {isOpen && (
        <div className="fixed h-full w-screen bg-black-50 backdrop-blur-sm top-0 right-0 lg:hidden">
          <div className="text-white items-center bg-[#302F2F] flex-col absolute right-3 top-4 h-auto p-8 gap-4 z-50 flex">
            <button
              className="text-[#D16527] absolute right-2 top-2 cursor-pointer"
              onClick={toggleNavbar}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
            <Logo />
            <NavLinks />
          </div>
        </div>
      )}
    </nav>
  );
}
