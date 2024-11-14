import Header from "@/components/Header";
import MetodosDePago from "@/components/paymentInfoForm";
import CheckoutSummary from "@/components/CheckoutSummary";

export default function Login() {
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
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}
