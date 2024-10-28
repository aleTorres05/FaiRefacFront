import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { addCar } from "@/pages/api/user";
import { toast } from "sonner";
import { useRouter } from "next/router";

export default function Addcar({ closeModal, isModalOpen, user }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [carPicture, setCarPicture] = useState(null);

  const handleImageChange = (event) => {
    setCarPicture(event.target.files[0]);
  };

  async function submitForm(data) {
    try {
      const clientId = user.client._id;
      const token = localStorage.getItem("token");
      const carAdded = await addCar(clientId, data, carPicture, token);
      if (!carAdded.success) {
        toast.error("Algo salio mal intenta de nuevo");
      } else {
        window.location.reload();
        toast.success(
          `Tu ${data.brand} ${data.model} ha sido agregado con exito!`
        );
      }
    } catch (error) {
      toast.error(error.message || "Error al agregar el carro.");
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative mt-51 md:mt-4 bg-[#161616] p-8 w-full md:w-3/4 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
        <img
          src={
            "https://fairefac-assets.s3.us-east-2.amazonaws.com/Close-orange.png"
          }
          alt="Cerrar"
          className="absolute top-4 right-4 cursor-pointer w-6 h-6"
          onClick={closeModal}
        />
        <h2 className="font-chakra font-bold text-center text-[24px] mb-4">
          Agrega un Carro
        </h2>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="w-full max-w-sm md:max-w-[660px]"
        >
          <div className="mb-14">
            <label className="block font-chakra text-sm font-medium mb-1">
              MARCA
            </label>
            <input
              type="text"
              {...register("brand", { required: true })}
              className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
            />
            {errors.brand && (
              <span className="text-red-500">Marca es obligatorio</span>
            )}
          </div>

          <div className="mb-14">
            <label className="block font-chakra text-sm font-medium mb-1">
              MODELO
            </label>
            <input
              type="text"
              {...register("model", { required: true })}
              className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
            />
            {errors.model && (
              <span className="text-red-500">Modelo es obligatorio</span>
            )}
          </div>

          <div className="mb-14">
            <label className="block font-chakra text-sm font-medium mb-1">
              VERSIÓN
            </label>
            <input
              type="text"
              {...register("version", { required: true })}
              className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
            />
            {errors.version && (
              <span className="text-red-500">Versión es obligatorio</span>
            )}
          </div>

          <div className="mb-14">
            <label className="block font-chakra text-sm font-medium mb-1">
              AÑO
            </label>
            <input
              {...register("year", {
                required: "Año es obligatorio",
                pattern: {
                  value: /^[0-9]{4}$/,
                  message: "El año debe tener 4 dígitos.",
                },
              })}
              className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
            />
            {errors.year && (
              <span className="text-red-500">Año es obligatorio</span>
            )}
          </div>

          <div className="mb-14">
            <label className="block font-chakra text-sm font-medium mb-1">
              NICKNAME
            </label>
            <input
              type="text"
              {...register("nickname")}
              className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
            />
          </div>

          <div className="mb-10">
            <label className="block text-sm font-medium font-chakra mb-1">
              FOTO DEL AUTOMOVIL
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer w-full md:w-64 bg-[#302F2F] text-center text-white py-2 px-4 font-bold font-chakra rounded-md inline-block"
            >
              SELECCIONAR ARCHIVO
            </label>
            {carPicture && (
              <span className="ml-4 font-chakra text-sm">
                {carPicture.name}
              </span>
            )}
          </div>
          <button
            onClick={handleSubmit(submitForm)}
            type="submit"
            className="w-full md:w-64 py-2 bg-[#D26528] text-white font-bold font-chakra"
          >
            AGREGAR CARRO
          </button>
        </form>
      </div>
    </div>
  );
}
