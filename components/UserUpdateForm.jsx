import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import ClientUpdateForm from "./ClientUpdateForm";
import RepairShopUpdateForm from "./RepairShopUpdateForm";
import {
  getByID,
  updateUserClient,
  updateUserRepairShop,
} from "@/pages/api/user";

export default function UserUpdateForm() {
  const router = useRouter();
  const [user, setUser] = useState(null);

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
        toast.error(
          err.message || "Error al obtener la información del usuario"
        );
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (data, profilePicture) => {
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      if (user.isClient) {
        await updateUserClient(id, data, profilePicture, token);
      } else {
        await updateUserRepairShop(id, data, profilePicture, token);
      }
      toast.success("Datos actualizados correctamente.");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message || "Error al actualizar los datos.");
    }
  };

  return (
    <main className="flex justify-center items-center flex-col min-w-[320px] w-full min-h-dvh gap-4 p-5">
      <h1 className="text-[#FFF] text-center font-chakra text-[32px] font-bold leading-normal mb-[50px]">
        ACTUALIZA TU INFORMACIÓN
      </h1>
      {user ? (
        user.isClient ? (
          <ClientUpdateForm onSubmit={handleSubmit} />
        ) : user.isRepairShop ? (
          <RepairShopUpdateForm onSubmit={handleSubmit} />
        ) : null
      ) : (
        <p className="text-[#FFF] text-center font-chakra text-[32px] font-bold leading-normal mb-[50px]">
          CARGANDO DATOS DEL USUARIO...
        </p>
      )}
    </main>
  );
}
