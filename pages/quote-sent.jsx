import Header from "@/components/Header";
import clsx from "clsx";

export default function QuoteSent() {
  return (
    <>
      <Header />
      <main className="flex h-[90vh] flex-1 flex-col justify-center items-center">
        <div className="p-5">
          <i className="fa-solid fa-circle-check text-[120px] mb-10" />
          <h3 className="font-chakra  font-bold text-2xl leading-normal uppercase">
            Haz soliictado una cotización
          </h3>

          <div className="my-4">
            <p className="text-xl">2 de mayo del 2024 11:46</p>
            <p className="text-[#D16527]">Solicitada</p>
          </div>
          <div className="flex flex-row items-center gap-3">
            <i className="fa-solid fa-circle-info text-xl"></i>
            <span>
              Una vez aceptada la cotización, la solicitud quedará cancelada
            </span>
          </div>
          <button className="bg-[#D16527] font-chakra w-[190px] h-[41px] uppercase mt-10">
            cerrar
          </button>
        </div>
      </main>
    </>
  );
}
