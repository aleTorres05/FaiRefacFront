import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { login } from "@/pages/api/login";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
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
      if (response.error === "Verify your email to login.") {
        window.localStorage.setItem("email", data.email);
        toast.error("Es necesario verificar su correo electrónico.");
        router.push(`/email-verification`);
        return;
      } else if (response.token) {
        window.localStorage.setItem("email", data.email);
        window.localStorage.setItem("token", response.token);
        toast.success("Bienvenido.");
        router.push(`/dashboard`);
      } else {
        toast.error("Correo o Contraseña incorrecto.");
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
        <div className="w-full md:w-[660px] h-[66px] flex flex-col ">
          <label className="color-[#EDEDED] font-chakra text-[16px] font-bold leading-normal uppercase">
            CORREO
          </label>
          <input
            type="email"
            name="email"
            className="text-[#C2C2C2] outline-none font-mulish text-[14px] font-normal mt-4 leading-normal bg-transparent border-b border-b-[#343434] border-b-1"
            required
            {...register("email", {
              required: { value: true, message: "Email requerido." },
            })}
          />
          {errors.email && (
              <span className="text-red-500">Correo electronico es obligatorio.</span>
            )}
        </div>
        <div className="relative w-full md:w-[660px] mt-4 h-[66px] flex flex-col">
          <label
            className="color-[#EDEDED] font-chakra text-[16px] font-bold leading-normal uppercase"
          >
            CONTRASEÑA
          </label>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="text-[#C2C2C2] outline-none font-mulish text-[14px] font-normal mt-4 leading-normal bg-transparent border-b border-b-[#343434] border-b-1"
            required
            {...register("password", {
              required: { value: true, message: "Contraseña requerida." },
            })}
          />
          {errors.password && (
              <span className="text-red-500">Contraseña requerida.</span>
            )}
            <div
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-1 md:right-4 top-8 cursor-pointer"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#D16527] mt-5 font-chakra w-[190px] h-[41px] uppercase"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
