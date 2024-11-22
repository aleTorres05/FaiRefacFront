import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import MechanicForm from "@/components/MechanicForm";
import { getAllMechanics } from "./api/mechanic";
import { useForm, useFieldArray } from "react-hook-form";
import {
  cancelQuoteLink,
  createQuote,
  createQuoteLinkToken,
  validateCanceledLink,
  validateToken,
} from "./api/quote";
import clsx from "clsx";

export default function QuoteForm() {
  const router = useRouter();

  const [isMechanicFormOpen, setIsMechanicFormOpen] = useState(false);
  const [mechanics, setMechanics] = useState([]);
  const [quoteToken, setQuoteToken] = useState({});
  const handleOpenMechanicForm = () => setIsMechanicFormOpen(true);
  const handleCloseMechanicForm = () => setIsMechanicFormOpen(false);
  const [car, setCar] = useState(null);
  const [client, setClient] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const { token } = router.query;

  const [filterText, setFilterText] = useState(""); // Search filter text
  const [selectedMechanic, setSelectedMechanic] = useState(""); // Selected mechanic ID
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown visibility

  const handleInputChange = (e) => {
    setFilterText(e.target.value);
    setIsDropdownOpen(true); // Open dropdown on typing
  };

  const handleOptionClick = (mechanic) => {
    setSelectedMechanic(mechanic._id); // Set selected mechanic ID
    setFilterText(mechanic.workshopName); // Display mechanic name
    setIsDropdownOpen(false); // Close dropdown
  };

  // Filter mechanics based on search input
  const filteredMechanics = mechanics.filter((mechanic) =>
    mechanic.workshopName.toLowerCase().includes(filterText.toLowerCase())
  );

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ defaultValues: { items: [{ concept: "", quantity: 1 }] } });

  const { fields, append, remove } = useFieldArray({
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
      toast.error("Error decoding token:", error);
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
      validateCanceledLink(token, router).then((response) => {
        console.log(response);
      });
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
          router.push("/");
          toast.error("Session Expirada, Solicite Nuevo Enlace");
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
    const token = await createQuoteLinkToken(client, car);
    setQuoteToken({ token });

    navigator.clipboard
      .writeText(`${currentUrl}?token=${token}`)
      .then(() => {
        toast.success("URL copiada al portapapeles");
        router.push("/dashboard");
      })
      .catch((err) => {
        toast.error("Error al copiar la URL: ", err);
      });
  }

  async function handleCancelQuote() {
    if (token) {
      await cancelQuoteLink(token);
      setTimeout(() => {
        toast.warning("Este Enlace ha sido Cancelado Solicite uno nuevo");
        router.push("/");
      }, 1000);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex flex-col w-full p-4 justify-center md:items-center min-h-screen">
      <h1 className="font-chakra mb-14 md:mb-[80px] w-full text-center text-[32px] font-bold">
        SOLICITA UNA COTIZACIÓN
      </h1>
      <div className="flex flex-row w-full mb-14 md:max-w-[692px] justify-end items-center">
        {!token ? (
          <div className="w-full flex flex-row items-center relative group cursor-pointer">
            <img
              className="h-[50px]"
              src="https://fairefac-assets.s3.us-east-2.amazonaws.com/Copy.png"
              alt="copy-icon"
              onClick={handleCopyUrl}
            />
            <p className="font-chakra">Copiar Enlace</p>
            <div className=" font-chakra text-center text-wrap font-semibold absolute bottom-full  transform-translate-x-1/2 md:transform-translate-x-1/3 mb-2 hidden group-hover:block bg-[#D16527] text-white text-xs lg:text-sm rounded py-1 px-2 z-10 ">
              Este Enlace se le envia a tu Mecanico, Haz Click para copiarlo.
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-row items-center">
            <p className=""> Session expira en: {formatTime(timeLeft)}</p>
          </div>
        )}
        <div className="flex flex-col min-w-[150px] md:min-w-[250px] items-center">
          <label
            htmlFor="mechanic-select"
            className="block text-white w-full font-chakra font-bold"
          >
            SELECCIONA UN TALLER
          </label>
          <div className="relative w-full flex flex-row">
            <div className="mr-2 font-chakra">
              <input
                type="text"
                placeholder="Buscar taller..."
                value={filterText}
                onChange={handleInputChange}
                onClick={() => setIsDropdownOpen(true)}
                className="w-full px-4 py-2 border-b border-b-[#D16527] outline-none rounded bg-transparent text-white"
              />

              {isDropdownOpen && (
                <ul className="absolute z-10 w-full border border-[#D16527] bg-black rounded shadow max-h-40 overflow-y-auto">
                  {filteredMechanics.map((mechanic) => (
                    <li
                      key={mechanic._id}
                      onClick={() => handleOptionClick(mechanic)}
                      className="px-4 py-2 text-white hover:bg-[#D16527] font-medium  cursor-pointer"
                    >
                      {mechanic.workshopName}
                    </li>
                  ))}
                  {filteredMechanics.length === 0 && (
                    <li className="px-4 py-2 text-gray-400">
                      No se encontraron talleres
                    </li>
                  )}
                </ul>
              )}
            </div>
            <button
              className="bg-[#D16527] text-white font-chakra min-w-[50px] max-h-10 p-2 rounded-md"
              type="button"
              onClick={handleOpenMechanicForm}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex h-full justify-center"></div>
      </div>

      <MechanicForm
        isOpen={isMechanicFormOpen}
        onClose={handleCloseMechanicForm}
      />
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col gap-4 my-4 items-center md:w-[80%]"
      >
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Refacción"
              className="text-white text-base outline-none font-mulish text-[14px] font-normal leading-normal md:min-w-[600px] md:max-w-[850px] w-full bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
              {...register(`items.${index}.concept`, {
                required: "Refacción es requerida",
              })}
            />

            <div className="flex items-center">
              <button
                type="button"
                className="font-chakra p-2 border"
                onClick={() => {
                  const currentValue = watch(`items.${index}.quantity`) || 1;
                  setValue(
                    `items.${index}.quantity`,
                    Math.max(1, currentValue - 1)
                  );
                }}
              >
                -
              </button>
              <input
                type="text"
                className="font-chakra px-2 bg-transparent text-center w-10 "
                {...register(`items.${index}.quantity`, {
                  valueAsNumber: true,
                })}
              />

              <button
                type="button"
                className="font-chakra p-2 border"
                onClick={() => {
                  const currentValue = watch(`items.${index}.quantity`) || 1;
                  setValue(`items.${index}.quantity`, currentValue + 1);
                }}
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
            {errors?.items?.[index]?.concept && (
              <span className="text-red-500 font-chakra">
                {errors.items[index].concept.message}
              </span>
            )}
          </div>
        ))}

        <div className="w-full flex flex-col md:flex-row items-center mt-[10%] justify-evenly">
          <button
            type="button"
            onClick={() => append({ concept: "", quantity: 1 })}
            className="bg-[#D16527] w-[70%] md:mb-3 sm:w-[60%] md:h-[15%] md:w-[40%] lg:w-[20%] md:text-lg font-chakra font-bold text-white p-2"
          >
            AGREGAR PIEZA
          </button>
        </div>
        <button
          type="submit"
          disabled={fields.length === 0}
          className={clsx(
            " self-center md:self-end md:mt-[10%] w-[70%] md:mr-3 sm:w-[60%] md:h-[15%] md:w-[40%] lg:w-[20%] md:text-lg font-chakra font-bold text-white p-2",
            fields.length === 0 ? "bg-[#787776]" : "bg-[#D16527]"
          )}
        >
          SOLICITAR COTIZACIÓN
        </button>
        <button
          type="button"
          onClick={handleCancelQuote}
          className=" self-center bg-[#D16527] md:self-end md:mt-2 w-[70%] md:mr-3 sm:w-[60%] md:h-[15%] md:w-[40%] lg:w-[20%] md:text-lg font-chakra font-bold text-white p-2"
        >
          CANCELAR COTIZACIÓN
        </button>
      </form>
    </div>
  );
}
