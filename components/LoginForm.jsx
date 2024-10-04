import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Por favor, completa todos los campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    toast.success("Bienvenido.");
    router.push("/repairShop/1");
  };

  return (
    <div className="flex flex-col px-[32px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
        <div className="w-full md:w-[660px] h-[66px] flex flex-col gap-[15px]">
          <label
            className="color-[#EDEDED] font-chakra text-[16px] font-bold leading-normal uppercase"
            htmlFor=""
          >
            CORREO
          </label>
          <input
            type="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-[#C2C2C2] outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
          />
        </div>
        <div className="w-full md:w-[660px] h-[66px] flex flex-col gap-[15px]">
          <label
            htmlFor=""
            className="color-[#EDEDED] font-chakra text-[16px] font-bold leading-normal uppercase"
          >
            CONTRASEÑA
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-[#C2C2C2] outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
          />
        </div>
        <button
          type="submit"
          className="bg-[#D16527] mt-5 font-chakra w-[190px] h-[41px] uppercase"
        >
          Iniciar sesión
        </button>
        <button className="lg:hidden bg-[#fff] font-chakra w-[190px] h-[41px] text-[#000] uppercase">
          Resgitrarse
        </button>
      </form>
    </div>
  );
}
