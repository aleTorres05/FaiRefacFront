import { useForm } from "react-hook-form";
import { useState } from "react";

export default function RepairShopUpdateForm({ onSubmit }) {
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
      <div className="mb-10">
        <label className="block text-sm font-medium font-chakra mb-1">
          NOMBRE DE LA REFACCIONARIA
        </label>
        <input
          type="text"
          {...register("companyName", { required: true })}
          className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
        />
        {errors.companyName && (
          <span className="text-red-500">
            Nombre de la refaccionaria es obligatorio
          </span>
        )}
      </div>

      <div className="mb-10">
        <label className="block text-sm font-medium font-chakra mb-1">
          TELÉFONO
        </label>
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
          CALLE
        </label>
        <input
          type="text"
          {...register("address.street", { required: true })}
          className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
        />
        {errors.address?.street && (
          <span className="text-red-500">Calle es obligatoria</span>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="w-full mb-10 ">
          <label className="block text-sm font-medium font-chakra mb-1">
            NÚMERO EXTERIOR
          </label>
          <input
            type="text"
            {...register("address.extNum", { required: true })}
            className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
          />
          {errors.address?.extNum && (
            <span className="text-red-500">Número exterior es obligatorio</span>
          )}
        </div>
        <div className="w-full mb-10">
          <label className="block text-sm font-medium font-chakra mb-1">
            NÚMERO INTERIOR
          </label>
          <input
            type="text"
            {...register("address.intNum")}
            className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="w-full mb-10">
          <label className="block text-sm font-medium font-chakra mb-1">
            COLONIA
          </label>
          <input
            type="text"
            {...register("address.neighborhood", { required: true })}
            className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
          />
          {errors.address?.neighborhood && (
            <span className="text-red-500">Colonia es obligatoria</span>
          )}
        </div>
        <div className="w-full mb-10">
          <label className="block text-sm font-medium font-chakra mb-1">
            CÓDIGO POSTAL
          </label>
          <input
            type="text"
            {...register("address.zipCode", {
              required: "Código postal es obligatorio",
              pattern: {
                value: /^[0-9]{5}$/,
                message: "El código postal debe tener 5 dígitos",
              },
            })}
            className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
          />
          {errors.address?.zipCode && (
            <span className="text-red-500">
              {errors.address.zipCode.message}
            </span>
          )}
        </div>
      </div>

      <div className="mb-10">
        <label className="block text-sm font-medium font-chakra mb-1">
          DELEGACIÓN O MUNICIPIO
        </label>
        <input
          type="text"
          {...register("address.city", { required: true })}
          className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
        />
        {errors.address?.city && (
          <span className="text-red-500">
            Delegación o Municipio es obligatorio
          </span>
        )}
      </div>

      <div className="mb-10">
        <label className="block text-sm font-medium font-chakra mb-1">
          ESTADO
        </label>
        <input
          type="text"
          {...register("address.state", { required: true })}
          className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
        />
        {errors.address?.state && (
          <span className="text-red-500">Estado es obligatorio</span>
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
        className="w-full md:w-64 py-2 bg-[#D26528] text-white  font-chakra font-bold"
      >
        ACTUALIZAR INFORMACIÓN
      </button>
    </form>
  );
}
