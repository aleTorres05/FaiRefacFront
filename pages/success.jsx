import Header from "@/components/Header";
import clsx from "clsx";
import { useRouter } from "next/router";

export default function ConfimPayment() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/clients/1");
  };

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col justify-center items-center my-5">
        <div className="p-5">
          <i className="fa-solid fa-circle-check text-[120px] mb-10 text-[#6D9E31]" />
          <h3 className="font-chakra font-bold text-2xl leading-normal uppercase">
            ¡Tu pago ha sido Exitoso!
          </h3>

          <button
            onClick={handleClick}
            className="bg-[#D16527] font-chakra w-[190px] h-[41px] uppercase mt-10"
          >
            Ver Recibo
          </button>

          <div className="mt-6">
            <p className="text-base">
              Puedes revisar los detalles de tu compra en tu correo o hacer clic
              aquí para
              <a href="/thank-you" className="text-[#6D9E31] underline ml-1">
                ver la página de confirmación.
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
