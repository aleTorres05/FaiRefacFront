import Header from "@/components/Header";
import clsx from "clsx";
import { useRouter } from "next/router";

export default function ConfimPayment() {
  const router = useRouter();

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col justify-center items-center my-5">
        <div className="p-5">
          <i className="fa-solid fa-times-circle text-[120px] mb-10 text-red-600" />
          <h3 className="font-chakra font-bold text-2xl leading-normal uppercase">
            Si aún no estas listo, te esperamos.
          </h3>

          <div className="my-4">
            <p className="text-xl">Tu cotización este en espera para pagarse</p>
          </div>

          <div className="my-6">
            <p className="text-lg">
              Si deseas intentar el pago nuevamente, puedes hacer clic en el
              botón de abajo.
            </p>
          </div>

          <button className="bg-red-600 font-chakra w-[190px] h-[41px] uppercase mt-10 mr-5">
            reintentar pago
          </button>
          <button className="bg-[#D16527] font-chakra w-[190px] h-[41px] uppercase mt-10">
            Escritorio
          </button>

          <div className="mt-6">
            <p className="text-base">
              Si tienes alguna duda, contacta a nuestro equipo de soporte o
              visita nuestra
              <a href="/support" className="text-[#6D9E31] underline ml-1">
                página de ayuda.
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
