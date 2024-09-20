import LoginForm from "@/components/LoginForm";
import Header from "@/components/Header";

export default function Login() {
  return (
    <div className="h-[100vh] flex flex-col">
      {/* Header siempre en la parte superior */}
      <Header className="fixed top-0 left-0 w-full" />

      {/* Contenedor centrado */}
      <div className="flex flex-1 flex-col justify-center md:items-center">
        <button className="hidden lg:block lg:absolute right-5 top-[15%] bg-[#D16527] font-chakra w-[190px] h-[41px] text-[#fff] uppercase">
          Resgitrarse
        </button>

        <h1 className="text-[#FFF] text-center font-chakra text-[32px] font-bold leading-normal mb-[50px]">
          Welcome to the FaiRefac
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
