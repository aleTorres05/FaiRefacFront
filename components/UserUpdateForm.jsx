import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner"
import ClientUpdateForm from "./ClientUpdateForm";
import RepairShopUpdateForm from "./RepairShopUpdateForm";
import { getByID } from "@/pages/api/user";

export default function UserUpdateForm() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!id || !token) {
      toast.error("Es necesario iniciar sesión para acceder a esta página.");
      router.push("/login"); 
      return;
    }

    
    const fetchUserData = async () => {
      try {
        const user = await getByID(id, token);
        setUser(user);
        toast.success("Datos de usuario cargados exitosamente");
      } catch (err) {
        console.error(err);
        setError(err.message || "Error al obtener la información del usuario");
        toast.error(err.message || "Error al obtener la información del usuario");
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = (data) => {
    router.push("/dashboard");
    console.log(data);
  };

  return (
    <main className="flex justify-center items-center flex-col min-w-[320px] w-full min-h-dvh gap-4 p-5">
      {user ? ( 
        user.isClient ? (
          <ClientUpdateForm onSubmit={handleSubmit} />
        ) : (
          <RepairShopUpdateForm onSubmit={handleSubmit} />
        )
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
    </main>
  );
}

