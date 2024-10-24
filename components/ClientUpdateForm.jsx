import { useForm } from "react-hook-form";
import { useState } from "react";

export default function ClientUpdateForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [profilePicture, setProfilePicture] = useState(null);

  const handleImageChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const submitForm = (data) => {
    onSubmit(data, profilePicture);
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="w-full max-w-sm md:max-w-[660px]"
    >
      <div className="mb-14">
        <label className="block text-sm font-medium font-chakra mb-1">
          NOMBRE
        </label>
        <input
          type="text"
          {...register("firstName", { required: true })}
          className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
        />
        {errors.firstName && (
          <span className="text-red-500">Nombre es obligatorio</span>
        )}
      </div>

      <div className="mb-14">
        <label className="block text-sm font-medium mb-1">APELLIDO</label>
        <input
          type="text"
          {...register("lastName", { required: true })}
          className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
        />
        {errors.lastName && (
          <span className="text-red-500">Apellido es obligatorio</span>
        )}
      </div>

      <div className="mb-14">
        <label className="block text-sm font-medium mb-1">TELÉFONO</label>
        <input
          type="tel"
          {...register("phoneNumber", {
            required: "Teléfono es obligatorio",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "El teléfono debe tener 10 dígitos.",
            },
          })}
          className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
        />
        {errors.phoneNumber && (
          <span className="text-red-500">{errors.phoneNumber.message}</span>
        )}
      </div>
      <div className="mb-10">
        <label className="block text-sm font-medium font-chakra mb-1">
          FOTO DE PERFIL
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
        {profilePicture && (
          <span className="ml-4 font-chakra text-sm">
            {profilePicture.name}
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
  );
}
