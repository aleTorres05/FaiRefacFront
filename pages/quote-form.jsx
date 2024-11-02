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
      return decoded.exp - currentTime; // Time left in seconds
    } catch (error) {
      console.error("Error decoding token:", error);
      return 0; // Return 0 if there's an error, indicating expiration
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`; // e.g., "5:09"
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
      // Update time left every second
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

  const handleSaveMechanic = (newMechanic) => {
    setMechanics([...mechanics, newMechanic]);
  };

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
    <div className="flex flex-col w-full p-4 justify-center md:items-center min-h-screen">
      <h1 className="font-chakra mb-14 md:mb-[80px] w-full text-center text-[32px] font-bold">
        SOLICITA UNA COTIZACIÓN
      </h1>
      <div className="flex flex-row w-full mb-14 md:max-w-[692px] justify-end items-center">
        {!token ? (
          <div className="w-full flex flex-row items-center">
            <img
              className="h-[50px]"
              src="https://fairefac-assets.s3.us-east-2.amazonaws.com/Copy.png"
              alt="copy-icon"
              onClick={handleCopyUrl}
            />
            <p className="font-chakra">Copiar Enlace</p>
          </div>
        ) : (
          <div className="w-full flex flex-row items-center">
            <p className=""> Session expira en: {formatTime(timeLeft)}</p>
          </div>
        )}
        <div className="flex flex-col mr-4 sm:mr-9 min-w-[150px] md:min-w-[250px] items-center">
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
            className="text-[#C2C2C2] w-full outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
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
        <div className="flex h-full justify-center my-auto">
          <button
            className="bg-[#D16527] text-white font-chakra min-w-[50px] max-h-10 p-2 rounded-md"
            type="button"
            onClick={handleOpenMechanicForm}
          >
            +
          </button>
        </div>
      </div>

      <MechanicForm
        isOpen={isMechanicFormOpen}
        onClose={handleCloseMechanicForm}
        onSave={handleSaveMechanic}
      />
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col gap-4 my-4"
      >
        {fields.map((field, index) => (
          <div key={index} className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Refacción"
              className="text-white text-base outline-none font-mulish text-[14px] font-normal leading-normal md:min-w-[600px] md:max-w-[850px] w-full bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
              {...register(`items.${index}.concept`, {
                required: { value: true, message: "Refaccion es Requerida" },
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
                className="font-chakra px-2 bg-transparent text-center w-10 "
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

        <div className="w-full flex justify-center">
          <button
            type="button"
            onClick={() => append({ concept: "", quantity: 1 })}
            className="bg-[#D16527] md:mt-6 md:mb-14 w-[250px] font-chakra font-bold text-white p-2 rounded-md"
          >
            AGREGAR PIEZA
          </button>
        </div>

        <div className="w-full flex justify-center md:justify-end">
          <button
            type="submit"
            className="bg-[#D16527] w-[250px] font-chakra font-bold text-white p-2 rounded-md mt-4"
          >
            SOLICITAR COTIZACIÓN
          </button>
        </div>
      </form>
    </div>
  );
}
