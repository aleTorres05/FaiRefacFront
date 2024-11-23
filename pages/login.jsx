import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <div className="h-[100vh] flex flex-col">
      <div className="flex flex-1 flex-col justify-center md:items-center">
        <h1 className="text-center font-chakra text-[32px] uppercase font-bold leading-normal mb-[50px]">
          <span className="text-[#FFF]">Bienvenido a Fai</span>
          <span className="text-[#D16527]">Refac</span>
        </h1>
        <LoginForm />
        <div className="flex w-full  justify-center  px-[32px]  mt-5">
          <div>
            <p className="text-base font-mulish">
              ¿Aún no tienes cuenta?
              <Link href="/signup" className="text-[#D16527] underline ml-1">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
