import Header from "@/components/Header";
import clsx from "clsx";
import { useRouter } from "next/router";

export default function ConfimPayment() {

  const router = useRouter();

  const handleClick = () => {
    router.push('/clients/1')
}

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col justify-center items-center my-5">
        <div className="p-5">
          <i className="fa-solid fa-circle-check text-[120px] mb-10 text-[#6D9E31]" />
          <h3 className="font-chakra font-bold text-2xl leading-normal uppercase">
            ¡Tu pago ha sido Exitoso!
          </h3>

          <div className="my-4">
            <p className="text-xl">2 de mayo del 2024 11:46</p>
            <p className="text-[#D16527]">Folio: 1515181815</p>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-5">
            <div className="my-6">
              <h4 className="font-bold text-lg">Datos del Usuario:</h4>
              <p className="text-base">Nombre: Juan Pérez</p>
              <p className="text-base">Correo: juan.perez@example.com</p>
              <p className="text-base">Teléfono: +52 123 456 7890</p>
              <p className="text-base">
                Dirección: Av. Siempre Viva 123, Ciudad de México
              </p>
            </div>

            <div className="my-6">
              <h4 className="font-bold text-lg">Resumen de la Compra:</h4>
              <ul className="list-disc list-inside">
                <li className="text-base">Filtro de Aceite - $250.00</li>
                <li className="text-base">Pastillas de Freno - $1,200.00</li>
                <li className="text-base">Bujías - $320.00</li>
                <li className="text-base">Total: $1,770.00 MXN</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-5">
            <div className="my-6">
              <h4 className="font-bold text-lg">Método de Pago:</h4>
              <p className="text-base">
                Tarjeta de Crédito (VISA) terminada en **** 4242
              </p>
              <p className="text-base">Pago realizado a través de PayPal</p>
            </div>

            <div className="my-6">
              <h4 className="font-bold text-lg">Detalles de Envío:</h4>
              <p className="text-base">Envío Estándar (3-5 días hábiles)</p>
              <p className="text-base">Costo de Envío: $150.00 MXN</p>
            </div>
          </div>
          <button onClick={handleClick} className="bg-[#D16527] font-chakra w-[190px] h-[41px] uppercase mt-10">
            cerrar
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
