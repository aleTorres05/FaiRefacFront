import Header from "@/components/Header";
import { useRouter } from "next/router";

export default function ConfimPayment() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard")
  }

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col justify-center items-center my-5">
        <div className="p-5">
          <i className="fa-solid fa-times-circle text-[120px] mb-10 text-red-600" />
          <h3 className="font-chakra font-bold text-2xl leading-normal uppercase">
            ¿Aún no estas listo?
          </h3>

          <div className="my-4">
            <p className="text-xl">Puedes dirigirte al boton de cotizaciones e intentarlo más tarde.</p>
          </div>

          <button className="bg-[#D16527] font-chakra w-[190px] h-[41px] uppercase mt-10" onClick={handleClick}>
            Volver
          </button>

          <div className="mt-6">
            <p className="text-base">
              Si tienes alguna duda, contacta a nuestro equipo de soporte enviando un correo a
              <a href="mailto:fairefac@gmail.com" className="text-[#6D9E31] underline ml-1">
              fairefac@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
