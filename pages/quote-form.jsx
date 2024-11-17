import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import MechanicForm from "@/components/MechanicForm";
import { getAllMechanics } from "./api/mechanic";
import { useForm, useFieldArray } from "react-hook-form";
import { createQuote, createQuoteLinkToken, validateToken } from "./api/quote";

export default function QuoteForm() {
  const router = useRouter();

  const [isMechanicFormOpen, setIsMechanicFormOpen] = useState(false);
  const [mechanics, setMechanics] = useState([]);
  const [quoteToken, setQuoteToken] = useState({});
  const [selectedMechanic, setSelectedMechanic] = useState("");
  const handleOpenMechanicForm = () => setIsMechanicFormOpen(true);
  const handleCloseMechanicForm = () => setIsMechanicFormOpen(false);
  const [car, setCar] = useState(null);
  const [client, setClient] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const { token } = router.query;

  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setError,
  } = useForm({ defaultValues: { items: [{ concept: "", quantity: 1 }] } });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "items",
  });

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const getTokenExpirationTime = (token) => {
    try {
      const decoded = parseJwt(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp - currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return 0;
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const isTokenExpired = (token) => {
    try {
      if (token) {
        const decoded = parseJwt(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  useEffect(() => {
    const carSelected = sessionStorage.getItem("carSelected");
    const clientSelected = sessionStorage.getItem("client");

    if (carSelected && clientSelected) {
      const clientCar = JSON.parse(carSelected);
      const client = JSON.parse(clientSelected);
      setCar(clientCar._id);
      setClient(client._id);
    } else if (token && !isTokenExpired(token)) {
      const intervalId = setInterval(() => {
        const newTimeLeft = getTokenExpirationTime(token);
        setTimeLeft(newTimeLeft);

        if (newTimeLeft <= 0) {
          clearInterval(intervalId);
          router.push("/");
          toast.error("Session Expirada, Solicite Nuevo Enlace");
        }
      }, 1000);

      return () => clearInterval(intervalId);
    } else if (!token && isTokenExpired(token)) {
      const intervalId = setInterval(() => {
        if (isTokenExpired(token)) {
          clearInterval(intervalId);
          router.push("/timeOutPage");
          toast.error("Session Expirada, Solicite Nuevo Enlace2");
        }
      }, 60000);

      return () => clearInterval(intervalId);
    }

    getAllMechanics()
      .then((mechanics) => {
        setMechanics(mechanics);
      })
      .catch((e) => {
        toast.error("Algo salio mal: ", e);
        throw new Error(e);
      });
  }, [token, router.isReady]);

  const handleMechanicChange = (e) => {
    setSelectedMechanic(e.target.value);
  };

  async function submitForm(data) {
    try {
      if (!selectedMechanic) {
        toast.warning("Selecciona un Mecanico");
        return;
      }
      if (token) {
        const tokenValidated = await validateToken(token, router);
        setCar(tokenValidated.carId);
      }

      const response = await createQuote(car, selectedMechanic, data);
      if (response.success) {
        router.push("/quote-sent");
      }
    } catch (error) {}
  }

  async function handleCopyUrl() {
    const currentUrl = window.location.href;
    if (quoteToken) {
      setQuoteToken({});
    }
    console.log(client, car);
    const token = await createQuoteLinkToken(client, car);
    setQuoteToken({ token });

    navigator.clipboard
      .writeText(`${currentUrl}?token=${token}`)
      .then(() => {
        toast.success("URL copiada al portapapeles");
      })
      .catch((err) => {
        toast.error("Error al copiar la URL: ", err);
      });
  }

  return (
    <div className="flex flex-col w-full px-4 md:px-10 justify-center md:items-center min-h-screen">
      <h1 className="font-chakra mb-10 md:mb-16 w-full text-center text-[24px] md:text-[32px] font-bold">
        SOLICITA UNA COTIZACIÓN
      </h1>
      <div className="flex flex-col md:flex-row w-full mb-14 md:max-w-[692px] justify-between items-center">
        {!token ? (
          <div
            className="relative"
            onMouseEnter={() => setIsInfoVisible(true)} // Mostrar modal al pasar el cursor
            onMouseLeave={() => setIsInfoVisible(false)} // Ocultar modal al salir del contenedor
          >
            {/* Botón con evento hover */}
            <button className="flex flex-row items-center">
              <img
                className="h-[40px] md:h-[50px]"
                src="https://fairefac-assets.s3.us-east-2.amazonaws.com/Copy.png"
                alt="copy-icon"
                onClick={handleCopyUrl}
              />
              <p className="font-chakra ml-2">Copiar Link</p>
            </button>
            {/* Modal informativo pequeño */}
            {isInfoVisible && (
              <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 bg-black text-white p-2 rounded-md shadow-lg text-sm w-[200px] text-center z-50">
                ¿No estás seguro de qué refacciones necesitas? Haz clic para
                compartir con tu mecánico.
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full md:justify-end">
            <p className="font-mulish text-[12px] md:text-[14px]">
              Sesión expira en: {formatTime(timeLeft)}
            </p>
          </div>
        )}
        <div className="flex flex-col w-full mt-4 md:mt-0 sm:w-1/2">
          <label
            htmlFor="mechanic-select"
            className="block text-white w-full font-chakra font-bold"
          >
            SELECCIONA UN TALLER
          </label>
          <select
            id="mechanic-select"
            value={selectedMechanic}
            onChange={handleMechanicChange}
            className="text-[#C2C2C2] w-full outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434]"
          >
            <option className="text-white font-mulish" value="" disabled>
              Selecciona un taller
            </option>
            {mechanics.map((mechanic) => (
              <option key={mechanic._id} value={mechanic._id}>
                {mechanic.workshopName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex h-full justify-center mt-4 md:mt-0">
          <button
            className="bg-[#D16527] text-white font-chakra min-w-[50px] max-h-10 p-2"
            type="button"
            onClick={handleOpenMechanicForm}
          >
            +
          </button>
        </div>
      </div>

      <MechanicForm
        className="popup-container"
        isOpen={isMechanicFormOpen}
        onClose={handleCloseMechanicForm}
      />

      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col gap-4 my-4 w-full max-w-lg md:max-w-3xl mx-auto"
      >
        {fields.map((field, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-4"
          >
            <input
              type="text"
              placeholder="Refacción"
              className="text-white text-base outline-none font-mulish text-[14px] font-normal leading-normal w-full md:w-3/4 bg-transparent pb-3 border-b border-b-[#343434]"
              {...register(`items.${index}.concept`, {
                required: { value: true, message: "Refacción es requerida" },
              })}
            />
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  update(index, {
                    ...field,
                    quantity: Math.max(1, field.quantity - 1),
                  });
                }}
                className="font-chakra p-2 border"
              >
                -
              </button>
              <input
                type="text"
                value={field.quantity}
                readOnly
                className="font-chakra px-2 bg-transparent text-center w-10"
                {...register(`items.${index}.quantity`, {
                  valueAsNumber: true,
                })}
              />
              <button
                type="button"
                onClick={() =>
                  update(index, { ...field, quantity: field.quantity + 1 })
                }
                className="font-chakra p-2 border"
              >
                +
              </button>
              <button
                onClick={() => {
                  remove(index);
                }}
                className="font-chakra p-2 border-2 border-[#D16527] ml-4"
                type="button"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

        <div className="w-full flex justify-center mt-4">
          <button
            type="button"
            onClick={() => append({ concept: "", quantity: 1 })}
            className="bg-[#D16527] w-[200px] md:w-[250px] font-chakra font-bold text-white p-2"
          >
            AGREGAR PIEZA
          </button>
        </div>

        <div className="w-full flex justify-center md:justify-end mt-4">
          <button
            type="submit"
            className="bg-[#D16527] w-[200px] md:w-[250px] font-chakra font-bold text-white p-2"
          >
            SOLICITAR COTIZACIÓN
          </button>
        </div>
      </form>
    </div>
  );
}
