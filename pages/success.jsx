import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { getPaymentIfonBySessionId } from "./api/quote";
import SpinnerLoading from "@/components/SpinnerLoading";

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    if (!session_id) {
      toast.error("No se ha proporcionado información de pago válida.");
      router.push("/dashboard"); 
      return;
    }

    const fetchPaymentInfo = async () => {
      if (session_id) {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            toast.error(
              "Es necesario iniciar sesión para acceder a esta página."
            );
            router.push("/login");
            return;
          }

          const data = await getPaymentIfonBySessionId(session_id, token);
          setPaymentInfo(data);
        } catch (error) {
          toast.error(
            error.message ||
              "Hubo un problema al obtener la información de pago."
          );
          localStorage.removeItem("token");
          router.push("/login");
        }
      }
    };

    fetchPaymentInfo();
  }, [session_id, router]);

  const handleClick = () => {
    router.push("/dashboard");
  };

  return (
    <>
      {paymentInfo ? (
        <main className="flex flex-1 flex-col justify-center items-center my-5">
          <div className="p-5">
            <i className="fa-solid fa-circle-check text-[120px] mb-10 text-[#6D9E31]" />
            <h3 className="font-chakra font-bold text-2xl leading-normal uppercase">
              ¡Tu pago ha sido Exitoso!
            </h3>

            <p className="font-mulish text-base">
              ID de pago: {paymentInfo.paymentId}
            </p>
            <button
              onClick={handleClick}
              className="bg-[#D16527] font-chakra w-[190px] h-[41px] uppercase mt-10"
            >
              Volver
            </button>

            <div className="mt-6">
              <p className="font-mulish text-base">
                Puedes revisar los detalles de tu compra en tu correo o hacer
                clic aquí para
                <a
                  href={paymentInfo.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6D9E31] underline ml-1"
                >
                  ver el recibo de compra.
                </a>
              </p>
            </div>
          </div>
        </main>
      ) : (
        <SpinnerLoading/>
      )}
    </>
  );
}
