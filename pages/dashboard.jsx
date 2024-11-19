import ClientDashboard from "@/components/ClientDashboard";
import RepairShopDashboard from "@/components/RepairShopDashboard";
import { useEffect, useState } from "react";
import { getUserByEmail } from "./api/user";
import { toast } from "sonner";
import { useRouter } from "next/router";
import SpinnerLoading from "@/components/SpinnerLoading";

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [carListQuotes, setCarListQuotes] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (!token || !email) {
      toast.error("Es necesario iniciar sesión para acceder a esta página.");
      router.push("/login");
    } else {
      getUserByEmail(email, token)
        .then((user) => {
          setUser(user);

          if (!user.verifiedEmail) {
            toast.error("Es necesario verificar su correo electrónico.");
            setTimeout(() => {
              router.push("/email-verification");
            }, 1000);
            return;
          }

          if (
            user.isClient &&
            (!user.client || Object.keys(user.client).length === 0)
          ) {
            toast.error("Es necesario actualizar su información como cliente.");
            setTimeout(() => {
              router.push("/update-info");
            }, 1000);
            return;
          }
          if (user.isClient) {
            const clientCarWithQuotes = user?.client?.cars?.filter(
              (car) => car.quotes.length > 0
            );
            setCarListQuotes(clientCarWithQuotes);
          }

          if (
            user.isRepairShop &&
            (!user.repairShop || Object.keys(user.repairShop).length === 0)
          ) {
            toast.error(
              "Es necesario actualizar su información como refaccionaria."
            );
            setTimeout(() => {
              router.push("/update-info");
            }, 1000);
          }
        })
        .catch((error) => {
          toast.error(error.message || "Ocurrió un error inesperado");
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          router.push("/login");
        });
    }
  }, []);

  return (
    <>
      {user ? (
        user.isClient ? (
          <ClientDashboard user={user} clientCarWithQuotes={carListQuotes} />
        ) : user.isRepairShop ? (
          <RepairShopDashboard user={user} />
        ) : null
      ) : (
        <SpinnerLoading />
      )}
    </>
  );
}
