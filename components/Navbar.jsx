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

// Componente de Diálogo de Alerta
function AlertDialog({ trigger, title, description, onConfirm }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>{trigger}</div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm">
            <h2 className="text-lg font-bold text-black">{title}</h2>
            <p className="my-4 text-black">{description}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Cambia a true para simular autenticación
  const router = useRouter();
  const userName = "Usuario123"; // Nombre de usuario de ejemplo
  const userEmail = "usuario@example.com"; // Ejemplo de correo del usuario

  // Ejemplo de datos para quotes y repairshop
  const quotes = [{ id: 1 }, { id: 2 }]; // Ejemplo de cotizaciones pendientes
  const repairshop = { status: "initial" }; // Estado inicial de repairshop

  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        title: "Nueva oferta",
        message: "¡50% de descuento!",
        read: false,
        time: "hace 5 minutos",
      },
      {
        id: 2,
        title: "Pedido enviado",
        message: "Tu pedido #123 ha sido enviado",
        read: false,
        time: "hace 1 hora",
      },
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter((n) => !n.read).length);
  }, []);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const markNotificationAsRead = (notificationId) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.push("/"); // Redirige al home
  };

  const NavLinks = () => {
    if (router.pathname === "/dashboard" && isLoggedIn) {
      return (
        <>
          <DropdownMenu
            trigger={
              <div className="relative">
                <Bell className="w-6 h-6 hover:text-[#D16527] transition-colors" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
            }
          >
            <div className="p-4">
              <p className="font-bold">Notificaciones</p>
              <hr />
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-2 cursor-pointer ${
                      !notif.read ? "bg-blue-50" : ""
                    } mb-1`}
                    onClick={() => markNotificationAsRead(notif.id)}
                  >
                    <div className="font-medium">{notif.title}</div>
                    <div className="text-sm text-gray-600">{notif.message}</div>
                    <div className="text-xs text-gray-400">{notif.time}</div>
                  </div>
                ))
              ) : (
                <p>No hay notificaciones</p>
              )}
            </div>
          </DropdownMenu>
          <DropdownMenu
            trigger={
              <User className="w-6 h-6 hover:text-[#D16527] transition-colors" />
            }
          >
            <div className="p-4">
              <p className="font-bold text-black">{userName}</p>
              <p className="text-gray-500 text-sm">{userEmail}</p>{" "}
              {/* Muestra el email */}
              <hr className="my-2" />
              <Link href="/profile" className="block py-2 text-black">
                Perfil
              </Link>
              <AlertDialog
                trigger={
                  <div className="text-red-500 cursor-pointer py-2 flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Cerrar Sesión
                  </div>
                }
                title="¿Estás seguro de cerrar sesión?"
                description="."
                onConfirm={handleLogout}
              />
            </div>
          </DropdownMenu>
        </>
      );
    } else {
      return (
        <>
          <Link href="/" className="hover:text-[#D16527] transition-colors">
            Home
          </Link>
          <Link
            href="/boost"
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
          <div className="text-white items-center bg-[#302F2F] flex-col absolute right-3 top-4 h-auto p-8 gap-4 z-50 flex">
            <button
              className="text-[#D16527] absolute right-2 top-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={toggleNavbar}
            >
              <X />
            </button>
            <Logo />
            <NavLinks />
          </div>
        </div>
      )}
    </nav>
  );
}
