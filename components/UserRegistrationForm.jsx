import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { create } from "@/pages/api/user";

export default function UserRegistrationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    isClient: false,
    isRepairShop: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    setError,
  } = useForm();

  async function onSubmit(data) {
    try {
      if (!data.isClient && !data.isRepairShop) {
        toast.error(
          'Debes seleccionar al menos una opción "CLIENTE" o "REFACCIONARIA".'
        );
        return;
      }
      if (!data.email || !data.password || !data.confirmPassword) {
        toast.error("Por favor, completa todos los campos.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        toast.error("Por favor, ingresa un correo electrónico válido.");
        return;
      }
      if (data.password !== data.confirmPassword) {
        toast.error("Las contraseñas no coinciden.");
        return;
      }
      await create(data);

      toast.success(
        "Registro exitoso, valida tu correo electronico para poder continuar."
      );
      localStorage.setItem("email", data.email);

      router.push(`/email-verification`);
    } catch (error) {
      toast.error(error.message || "Ocurrió un error inesperado");
      router.push("/signup");
    }
  }

  return (
    <main className="flex justify-center items-center flex-col min-w-[320px]  w-full min-h-dvh gap-4 p-7 md:p-8 lg:p-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm md:max-w-[660px]"
      >
        <div className="mb-14 flex  flex-col md:flex-row justify-between ">
          <button
            type="button"
            onClick={() => {
              setValue("isClient", true);
              setValue("isRepairShop", false);
              setFormData({
                isClient: true,
                isRepairShop: false,
              });
            }}
            className={clsx(
              "py-2 px-4 mr-2 w-full mb-14 md:mb-0 md:w-64 text-white font-chakra font-bold",
              formData.isClient ? "bg-[#D26528]" : "bg-[#030303]"
            )}
          >
            CLIENTE
          </button>

          <button
            type="button"
            onClick={() => {
              setValue("isClient", false);
              setValue("isRepairShop", true);
              setFormData({
                isClient: false,
                isRepairShop: true,
              });
            }}
            className={clsx(
              "py-2 px-4 mr-2 w-full md:w-64 text-white font-chakra font-bold",
              formData.isRepairShop ? "bg-[#D26528]" : "bg-[#030303]"
            )}
          >
            REFACCIONARIA
          </button>
        </div>

        <div className="mb-14">
          <label className="block text-sm font-chakra font-medium mb-1">
            CORREO ELECTRONICO
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528] focus:border-[#D26528] font-mulish"
            {...register("email", {
              required: { value: true, message: "Email requerido." },
            })}
          />
          {errors.email && (
              <span className="text-red-500">Correo electronico es obligatorio.</span>
            )}
        </div>

        <div className="mb-14 relative">
          <label className="block text-sm font-chakra font-medium mb-1">CONTRASEÑA</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528] focus:border-[#D26528] font-mulish"
            {...register("password", {
              required: { value: true, message: "Contraseña requerida." },
            })}
            />
            {errors.password && (
              <span className="text-red-500">Contraseña es obligatoria.</span>
            )}
          <div
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-1 md:right-4 top-4 cursor-pointer"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </div>
        </div>

        <div className="mb-14 relative">
          <label className="block text-sm font-chakra font-medium mb-1">
            CONFIRMAR CONTRASEÑA
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            required
            className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528] focus:border-[#D26528] font-mulish"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Confirmación de contraseña requerida.",
              },
            })}
          />
          {errors.confirmPassword && (
              <span className="text-red-500">Confirmar contraseña es obligatoria.</span>
            )}
          <div
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-1 md:right-4 top-4 cursor-pointer"
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </div>
        </div>

        <button
          type="submit"
          className="w-full md:w-64 py-2 bg-[#D26528] text-white font-bold font-chakra"
        >
          CREAR USUARIO
        </button>
      </form>
    </main>
  );
}
