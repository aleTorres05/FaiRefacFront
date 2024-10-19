import { useRouter } from "next/router";
import Header from "@/components/Header";
import MetodosDePago from "@/components/MetodosDePago";

export default function Login() {

  const router = useRouter();

  const handleClick = () => {
    router.push('/comfirm-payment')
}

  return (
    <div className="h-[100vh] flex flex-col">
      <Header className="fixed top-0 left-0 w-full" />

      <div className="flex flex-1 flex-col md:flex-row justify-center md:items-center">
        <div>
          <h1 className="text-[#FFF] text-center font-chakra text-[32px] font-bold leading-normal mb-[50px]">
            Metodos de Pago
          </h1>
          <MetodosDePago />
        </div>
        <div>
          <div className="bg-[#949494] p-5 mt-5 md:m-0">
            <h3 className="font-chakra uppercase font-bold text-[23px] leading-[32px] text-center text-white">
              Resumen de cotización
            </h3>
            <div className="my-5">
              <div className="flex border-b-[2px] h-[8vh] items-center border-black justify-between">
                <p className="font-mulish text-[14px]">Subtotal</p>
                <p className="font-chakra text-[15px] font-[600]">$ 1,300.00</p>
              </div>
              <div className="flex border-b-[2px] h-[8vh] items-center border-black justify-between">
                <p className="font-mulish text-[14px]">Entrega</p>
                <p className="font-chakra text-[15px] font-[600]">$ 1,300.00</p>
              </div>
              <div className="flex border-b-[2px] h-[8vh] items-center border-black justify-between">
                <p className="font-mulish text-[14px]">IVA</p>
                <p className="font-chakra text-[15px] font-[600]">$ 1,300.00</p>
              </div>
              <div className="flex  h-[8vh] items-center justify-between">
                <p className="font-mulish text-[14px]">TOLTAL</p>
                <p className="font-chakra text-[15px] font-[600]">$ 1,300.00</p>
              </div>
            </div>
            <div className="flex justify-center">
              <button onClick={handleClick} className="bg-black w-[190px] h-[41px]">Pagar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
