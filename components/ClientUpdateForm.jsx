import { useForm } from "react-hook-form";

export default function ClientUpdateForm({ onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm md:max-w-[660px]">
      <div className="mb-14">
        <label className="block text-sm font-medium mb-1">NOMBRE</label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
        />
        {errors.name && <span className="text-red-500">Este campo es obligatorio</span>}
      </div>

      <div className="mb-14">
        <label className="block text-sm font-medium mb-1">APELLIDO</label>
        <input
          type="text"
          {...register("lastName", { required: true })}
          className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
        />
        {errors.lastName && <span className="text-red-500">Este campo es obligatorio</span>}
      </div>

      <div className="mb-14">
        <label className="block text-sm font-medium mb-1">TELÉFONO</label>
        <input
          type="tel"
          {...register("phone", { required: true })}
          className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
        />
        {errors.phone && <span className="text-red-500">Este campo es obligatorio</span>}
      </div>

      <button type="submit" className="w-full md:w-64 py-2 bg-[#D26528] text-white font-bold">
        ACTUALIZAR INFORMACIÓN
      </button>
    </form>
  );
}
