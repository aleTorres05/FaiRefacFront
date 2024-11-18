import Header from "./Header";
import DashboardButtons from "./DashboardButtons";
import PendingQuotes from "./PendingQuotes";
import FollowUpPanel from "./FollowUpPanel";
import { useState, useEffect } from "react";
import { createAccountLink, activateStripeAccount } from "@/pages/api/user";
import { toast } from "sonner";
import { useRouter } from "next/router";

export default function RepairShopDashboard({ user }) {
  const [isSelected, setIsSelected] = useState({
    pendingQuotes: true,
    followUpPanel: false,
    updatePaymentInfo: false,
  });

  const router = useRouter();

  const handleButtonSelection = (option) => {
    setIsSelected({
      pendingQuotes: option === "pendingQuotes",
      followUpPanel: option === "followUpPanel",
      updatePaymentInfo: option === "updatePaymentInfo",
    });
  };

  const { repairShop } = user;
  const [quotes, setQuotes] = useState(repairShop?.quotes || []);

  const handleUpdatePaymentInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Es necesario iniciar sesión para acceder a esta página.");
      router.push("/login");
      return;
    }
    try {
      const response = await createAccountLink(repairShop._id, token);
      toast.info("Redireccionando a Stripe...");
      window.location.href = response.accountLink;
    } catch (error) {
      toast.error(error.message || "Ocurrió un error inesperado");
    }
  };

  useEffect(() => {
    const updateStripeStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Es necesario iniciar sesión para acceder a esta página.");
        router.push("/login");
        return;
      }
      try {
        await activateStripeAccount(repairShop._id, token);
        repairShop.stripeAccountActive = true;
        toast.success("Cuenta Stripe activada exitosamente.");
        window.location.reload();
      } catch (error) {
        toast.error(
          error.message ||
            "Ocurrió un error al actualizar la información de pago."
        );
      }
    };

    if (!repairShop?.stripeAccountActive) {
      updateStripeStatus();
    }
  }, [repairShop, router]);

  if (!repairShop?.stripeAccountActive) {
    return (
      <div className="flex flex-col items-center text-center justify-center text-white">
        <h2 className="text-2xl font-chakra uppercase font-bold mb-4 p-8">
          Por favor, accede a nuestra plataforma de pagos para completar tu
          información y habilitar la recepción de transferencias. Si ya has
          completado el registro de tu cuenta en Stripe, espera unos momentos
          mientras verificamos que tu cuenta esté configurada correctamente para
          recibir pagos.
        </h2>
        <button
          onClick={handleUpdatePaymentInfo}
          className="bg-[#D16527] font-semibold px-6 py-2 font-chakra uppercase rounded-md"
        >
          Actualizar
        </button>
      </div>
    );
  }

  return (
    <div className="md:mt-[18px] md:mx-[32px] flex flex-col md:gap-4">
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-0 p-3 md:p-0">
        <DashboardButtons
          isSelected={isSelected}
          handleButtonSelection={handleButtonSelection}
          repairShop={repairShop}
        />

        <div className="bg-black h-fit col-start-1 col-end-13 md:p-2 p-4 lg:col-start-4 lg:col-end-13 md:col-start-3 md:col-end-13 md:ml-4 rounded-2xl mt-2 md:h-screen md:flex-col lg:mt-4 lg:p-8 xl:col-start-4 xl:col-end-13 2xl:col-start-4 2xl:col-end-13 xl:p-7">
          {isSelected.pendingQuotes && (
            <PendingQuotes quotes={quotes} setQuotes={setQuotes} />
          )}
          {isSelected.followUpPanel && (
            <FollowUpPanel repairShop={repairShop} />
          )}
          {isSelected.updatePaymentInfo && (
            <main className="flex flex-col items-center  h-screen bg-black text-white">
              <h2 className="text-base md:text-2xl font-chakra uppercase font-bold mb-4 md:p-8 lg:p-16">
                En Stripe podrás actualizar tu información. Recuerda que es
                importante mantener tus datos actualizados, ya que recibirás tus
                pagos en esta cuenta.
              </h2>
              <button
                onClick={handleUpdatePaymentInfo}
                className="bg-[#D16527] font-semibold px-6 py-2 font-chakra uppercase rounded-md"
              >
                Actualizar
              </button>
            </main>
          )}
        </div>
      </div>
    </div>
  );
}
