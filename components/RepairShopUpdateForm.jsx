import { useForm } from "react-hook-form";

export default function RepairShopUpdateForm({ onSubmit }) {
    
    const { 
    register,
    handleSubmit,
    formState: { errors }
    } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm md:max-w-[660px]">
      {/* Nombre de la Refaccionaria */}
      <div className="mb-10">
        <label className="block text-sm font-medium mb-1">NOMBRE DE LA REFACCIONARIA</label>
        <input
          type="text"
          {...register("refaccionariaName", { required: true })}
          className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
        />
        {errors.refaccionariaName && <span className="text-red-500">Este campo es obligatorio</span>}
      </div>

      {/* Teléfono */}
      <div className="mb-10">
        <label className="block text-sm font-medium mb-1">TELÉFONO</label>
        <input
          type="tel"
          {...register("phone", { required: true })}
          className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
        />
        {errors.phone && <span className="text-red-500">Este campo es obligatorio</span>}
      </div>

      {/* Calle */}
      <div className="mb-10">
        <label className="block text-sm font-medium mb-1">CALLE</label>
        <input
          type="text"
          {...register("street", { required: true })}
          className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
        />
        {errors.street && <span className="text-red-500">Este campo es obligatorio</span>}
      </div>

      {/* Número Exterior e Interior */}
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="w-full mb-10 ">
          <label className="block text-sm font-medium mb-1">NÚMERO EXTERIOR</label>
          <input
            type="text"
            {...register("exteriorNumber", { required: true })}
            className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
          />
          {errors.exteriorNumber && <span className="text-red-500">Este campo es obligatorio</span>}
        </div>
        <div className="w-full mb-10">
          <label className="block text-sm font-medium mb-1">NÚMERO INTERIOR</label>
          <input
            type="text"
            {...register("interiorNumber")}
            className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
          />
        </div>
      </div>

      {/* Colonia y Código Postal */}
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="w-full mb-10">
          <label className="block text-sm font-medium mb-1">COLONIA</label>
          <input
            type="text"
            {...register("colonia", { required: true })}
            className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
          />
          {errors.colonia && <span className="text-red-500">Este campo es obligatorio</span>}
        </div>
        <div className="w-full mb-10">
          <label className="block text-sm font-medium mb-1">CÓDIGO POSTAL</label>
          <input
            type="text"
            {...register("postalCode", { required: true })}
            className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
          />
          {errors.postalCode && <span className="text-red-500">Este campo es obligatorio</span>}
        </div>
      </div>

      {/* Delegación o Municipio */}
      <div className="mb-10">
        <label className="block text-sm font-medium mb-1">DELEGACIÓN O MUNICIPIO</label>
        <input
          type="text"
          {...register("municipality", { required: true })}
          className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
        />
        {errors.municipality && <span className="text-red-500">Este campo es obligatorio</span>}
      </div>

      {/* Estado */}
      <div className="mb-10">
        <label className="block text-sm font-medium mb-1">ESTADO</label>
        <input
          type="text"
          {...register("state", { required: true })}
          className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
        />
        {errors.state && <span className="text-red-500">Este campo es obligatorio</span>}
      </div>

      <button type="submit" className="w-full md:w-64 py-2 bg-[#D26528] text-white font-bold">
        ACTUALIZAR INFORMACIÓN
      </button>
    </form>
  );
}
