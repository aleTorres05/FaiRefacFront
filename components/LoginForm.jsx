import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { login } from "@/pages/api/login";
import { useForm } from "react-hook-form";
import { getUserByEmail } from "@/pages/api/user";

export default function LoginForm() {
  const [userData, setUserData] = useState({});
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();

  async function onSubmit(data) {
    try {
      if (!data.email || !data.password) {
        toast.error("Por favor, completa todos los campos.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        toast.error("Por favor, ingresa un correo electrónico válido.");
        return;
      }
      const response = await login(data.email, data.password, router);
      if (response.token) {
        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("email", data.email);
        toast.success("Bienvenido.");
        const user = await getUserByEmail(data.email, response.token);
        router.push(`/dashboard`);
      }
    } catch (error) {
      toast.error(error.message || "Ocurrió un error inesperado");
    }
  }

  return (
    <div className="flex flex-col px-[32px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[20px]"
      >
        <div className="w-full md:w-[660px] h-[66px] flex flex-col gap-[15px]">
          <label className="color-[#EDEDED] font-chakra text-[16px] font-bold leading-normal uppercase">
            CORREO
          </label>
          <input
            type="mail"
            className="text-[#C2C2C2] outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
            required
            {...register("email", {
              required: { value: true, message: "Email Required" },
            })}
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
            className="text-[#C2C2C2] outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
            required
            {...register("password", {
              required: { value: true, message: "Password Required" },
            })}
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
