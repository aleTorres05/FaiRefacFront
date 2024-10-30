import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import MechanicForm from "@/components/MechanicForm";
import { getAllMechanics } from "./api/mechanic";
import { useForm, useFieldArray } from "react-hook-form";

export default function QuoteForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isMechanicFormOpen, setIsMechanicFormOpen] = useState(false);
  const [mechanics, setMechanics] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState("");
  const handleOpenMechanicForm = () => setIsMechanicFormOpen(true);
  const handleCloseMechanicForm = () => setIsMechanicFormOpen(false);

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

  useEffect(() => {
    getAllMechanics()
      .then((mechanics) => {
        setMechanics(mechanics);
      })
      .catch((e) => {
        toast.error("Algo salio mal: ", e);
        throw new Error(e);
      });
  }, []);

  const handleMechanicChange = (e) => {
    setSelectedMechanic(e.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
    // router.push("/quote-sent");
    // console.log("Cotización enviada", { selectedMechanic, items });
  };

  const handleSaveMechanic = (newMechanic) => {
    setMechanics([...mechanics, newMechanic]);
  };

  const handleCopyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success("URL copiada al portapapeles");
      })
      .catch((err) => {
        toast.error("Error al copiar la URL: ", err);
      });
  };

  return (
    <div className="flex flex-col w-full p-4 justify-center md:items-center min-h-screen">
      <h1 className="font-chakra mb-14 md:mb-[80px] w-full text-center text-[32px] font-bold">
        SOLICITA UNA COTIZACIÓN
      </h1>
      <div className="flex flex-row w-full mb-14 md:max-w-[692px] justify-end items-center">
        <div className="w-full">
          <img
            className="h-[50px]"
            src="https://fairefac-assets.s3.us-east-2.amazonaws.com/Copy.png"
            alt="copy-icon"
            onClick={handleCopyUrl}
          />
        </div>
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
        onSubmit={handleSubmit(onSubmit)}
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
                  if (field.quantity === 0) {
                    remove(index);
                  }
                  update(index, {
                    ...field,
                    quantity: Math.max(0, field.quantity - 1),
                  });
                }}
                className="p-2 border"
              >
                -
              </button>
              <input
                type="text"
                value={field.quantity}
                readOnly
                className="px-2 bg-transparent text-center w-10 "
                {...register(`items.${index}.quantity`, {
                  valueAsNumber: true,
                })}
              />

              <button
                type="button"
                onClick={() =>
                  update(index, { ...field, quantity: field.quantity + 1 })
                }
                className="p-2 border"
              >
                +
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
