import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { send, verify } from "@/pages/api/opt";
import { getUserByEmail } from "@/pages/api/user";

export default function VerifyEmail() {
  const [code, setCode] = useState(Array(6).fill(""));
  const [userEmail, setUserEmail] = useState("");
  const inputsRef = useRef([]);
  const router = useRouter();

  const handleInputChange = (index, value) => {
    if (value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
      return;
    }

    const isNumeric = /^[+-]?\d+(\.\d+)?$/.test(value);
    if (!isNumeric) {
      toast.warning("Agrega solo digitos");
      value = "";
    }
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    setUserEmail(email);

    send(email)
      .then((response) => {
        toast.success("OTP Enviado a tu Correo");
      })
      .catch((e) => {
        toast.error("Algo salio mal: ", e);
        router.push("/login");
        throw new Error(e);
      });
  }, []);

  async function handleConfirmClick() {
    try {
      if (code.some((digit) => digit === "")) {
        toast.error(
          "Por favor, completa todos los dígitos antes de confirmar."
        );
        return;
      }

      const response = await verify(userEmail, code.join(""));
      if (response.message === "User was successfyly verified.") {
        toast.success("Código validado correctamente. Bienvenido a FaiRefac.");
        router.push(`/login`);
      } else {
        toast.warning("El OTP no coicide. Intente de nuevo");
      }
    } catch (error) {
      toast.error(error);
      throw new Error(error);
    }
  }

  return (
    <div className="flex justify-center md:items-center min-h-screen">
      <main className="w-full md:h-[300px] max-w-full md:max-w-[630px] md:bg-[#282525] p-4 flex flex-col items-center justify-center gap-6 md:clip-custom">
        <h1 className="font-chakra font-bold text-white text-2xl md:text-3xl">
          VALIDA TU CORREO
        </h1>
        <h2 className="text-white font-mulish text-lg md:text-xl">
          Ingresa los 6 dígitos enviados a tu correo
        </h2>

        <div className="flex justify-center w-full max-w-[300px] md:max-w-[490px] gap-2 md:gap-4">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-[39px] h-[39px] md:w-[65px] md:h-[65px] bg-transparent border-b border-[#343434] text-center text-white text-lg focus:outline-none focus-visible:border-[#D26528] focus:border-[#D26528] font-mulish"
            />
          ))}
        </div>

        <button
          onClick={handleConfirmClick}
          className="mt-6 w-full max-w-80 md:w-[239px] py-2 bg-[#D26528] text-white font-chakra font-bold text-lg"
        >
          CONFIRMAR CORREO
        </button>
      </main>
    </div>
  );
}
