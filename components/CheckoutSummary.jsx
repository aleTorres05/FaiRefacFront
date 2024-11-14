import { useRouter } from "next/router";

export default function CheckoutSummary() {
  const router = useRouter();
  const { subtotal, fairRefacFee, iva, total } = router.query;

  const handleClick = () => {
    router.push("/comfirm-payment");
  };

  return (
    <div className="bg-[#949494] p-5 mt-5 md:m-0">
      <h3 className="font-chakra uppercase font-bold text-[23px] leading-[32px] text-center text-white">
        Resumen de cotización
      </h3>
      <div className="my-5">
        <div className="flex border-b-[2px] h-[8vh] items-center border-black justify-between">
          <p className="font-mulish text-[14px]">Subtotal</p>
          <p className="font-chakra text-[15px] font-[600]">{subtotal}</p>
        </div>
        <div className="flex border-b-[2px] h-[8vh] items-center border-black justify-between">
          <p className="font-mulish text-[14px]">Comissión FairRefac</p>
          <p className="font-chakra text-[15px] font-[600]">{fairRefacFee}</p>
        </div>
        <div className="flex border-b-[2px] h-[8vh] items-center border-black justify-between">
          <p className="font-mulish text-[14px]">IVA</p>
          <p className="font-chakra text-[15px] font-[600]">{iva}</p>
        </div>
        <div className="flex  h-[8vh] items-center justify-between">
          <p className="font-mulish text-[14px]">TOLTAL</p>
          <p className="font-chakra text-[15px] font-[600]">{total}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <button onClick={handleClick} className="bg-black w-[190px] h-[41px]">
          Pagar
        </button>
      </div>
    </div>
  );
}
