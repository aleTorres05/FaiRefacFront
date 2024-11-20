import { useContext, useEffect, useState } from "react";
import { UserContext } from "./_app";
import ClientDashboard from "@/components/ClientDashboard";
import RepairShopDashboard from "@/components/RepairShopDashboard";
import { toast } from "sonner";
import { useRouter } from "next/router";
import SpinnerLoading from "@/components/SpinnerLoading";

export default function UserDashboard() {
  const router = useRouter();
  const user = useContext(UserContext);
  const [carListQuotes, setCarListQuotes] = useState();

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!token || !email) {
      toast.error("Es necesario iniciar sesión para acceder a esta página.");
      router.push("/login");
    }

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
      toast.error("Es necesario actualizar su información como refaccionaria.");
      setTimeout(() => {
        router.push("/update-info");
      }, 1000);
    }
  }, [user, router]);

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
