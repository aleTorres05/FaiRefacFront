import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function Addcar({ closeModal, isModalOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [carPicture, setCarPicture] = useState(null);

  const handleImageChange = (event) => {
    carPicture(event.target.files[0]);
  };

  const submitForm = (data) => {
    onSubmit(data, carPicture);
  };

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
              {...register("marca", { required: true })}
              className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
            />
            {errors.marca && (
              <span className="text-red-500">Marca es obligatorio</span>
            )}
          </div>

          <div className="mb-14">
            <label className="block font-chakra text-sm font-medium mb-1">
              MODELO
            </label>
            <input
              type="text"
              {...register("modelo", { required: true })}
              className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
            />
            {errors.modelo && (
              <span className="text-red-500">Modelo es obligatorio</span>
            )}
          </div>
          <div className="mb-14">
            <label className="block font-chakra text-sm font-medium mb-1">
              Versión
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
              Año
            </label>
            <input
              type="tel"
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
              {...register("nickname", { required: true })}
              className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
            />
            {errors.nickname && (
              <span className="text-red-500">Nickname es obligatorio</span>
            )}
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
            type="submit"
            className="w-full md:w-64 py-2 bg-[#D26528] text-white font-bold"
          >
            ACTUALIZAR INFORMACIÓN
          </button>
        </form>
      </div>
    </div>
  );
}
