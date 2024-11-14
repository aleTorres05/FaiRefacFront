import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X, Bell, User, LogOut } from "lucide-react";
import Logo from "./Logo";

// Componente de Menú Desplegable
function DropdownMenu({ trigger, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md">
          {children}
        </div>
      )}
    </div>
  );
}

// Componente de alerta cierre de sesión
function AlertDialog({ trigger, title, description, onConfirm }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
    localStorage.removeItem("token");
  };

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>{trigger}</div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#000000] p-6 rounded-md shadow-lg max-w-sm">
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <p className="my-4 text-black">{description}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-white text-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-[#D16527] text-white rounded-md"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar({ setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Cambia a true para simular autenticación
  const router = useRouter();
  const userName = "Usuario123"; // Nombre de usuario de ejemplo
  const userEmail = "usuario@example.com"; // Ejemplo de correo del usuario

  // Ocultar Navbar en las páginas específicas
  if (
    ["/update-info", "/email-verification", "/success", "/cancel"].includes(
      router.pathname
    )
  ) {
    return null;
  }


  const toggleNavbar = () => setIsOpen(!isOpen);


  const handleLogout = () => {
    setIsLoggedIn(false);
    router.push("/"); // Redirige al home
  };

  const NavLinks = () => {
    if (router.pathname === "/dashboard" && isLoggedIn) {
      return (
        <div className="fixed top-10 right-7 flex items-center space-x-5">
          <div className="flex w-full justify-end">
            {/* Ícono de Usuario */}
          <DropdownMenu
            trigger={
              <User className="w-6 h-6 hover:text-[#D16527] transition-colors" />
            }
          >
            <div className="p-6 bg-[#302F2F] rounded-md w-full content-fit text-white">
              <div className="flex items-center flex-col mb-4">
                <img
                  src="https://fairefac-assets.s3.us-east-2.amazonaws.com/FR-Logo.png" 
                  alt="logo"
                  className="w-16 h-16 rounded-full mb-2"
                />
              </div>

              <AlertDialog
                trigger={
                  <button className="bg-[#D16527] text-white uppercase w-full py-2 mt-4 rounded-md font-bold">
                    Cerrar sesion
                  </button>
                }
                title="¿Estás seguro de cerrar sesión?"
                description=""
                onConfirm={handleLogout}
              />
            </div>
          </DropdownMenu>
          </div>
        </div>
      );
    } else {
      return (
        <>
          {isOpen ? (
            <Link href="/" onClick={() => setCurrentPage("home")}>
              Home
            </Link>
          ) : (
            <Link
              className="hover:text-[#D16527] transition-colors"
              href="/"
              onClick={() => setCurrentPage("home")}
            >
              Home
            </Link>
          )}{" "}
          {/* Impulsa tu Refaccionaria */}
          <Link
            href="#"
            onClick={() => setCurrentPage("impulsa")}
            className="hover:text-[#D16527] transition-colors"
          >
            Impulsa tu Refaccionaria
          </Link>
          <Link
            href="/signup"
            className="hover:text-[#D16527] transition-colors"
          >
            Registrate
          </Link>
          <Link
            href="/login"
            className="hover:text-[#D16527] transition-colors"
          >
            Login
          </Link>
        </>
      );
    }
  };

  return (
    <nav className="mb-2 sm:w-1/3 flex justify-end md:w-1/3 lg:w-1/2 lg:mr-8 xl:w-1/3 2xl:w-1/3 lg:mb-3">
      <div className="hidden w-full justify-between lg:flex">
        <NavLinks />
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
          <div className="text-white items-center bg-[#302F2F] flex-col absolute right-5 top-1 h-auto p-10 gap-4 z-50 flex">
            {/* Botón "X" para cerrar el menú móvil */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-white absolute top-1 right-1"
            >
              <X />
            </button>
            <NavLinks />
          </div>
        </div>
      )}
    </nav>
  );
}
