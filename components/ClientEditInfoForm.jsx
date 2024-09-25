import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function ClientEditInfoForm() {
  const router = useRouter();
  const { id } = router.query;

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();

  return (
    <>
      <section className="font-chakra flex flex-col h-fit  col-start-2 col-end-12 w-[100%] md:col-start-3 md:col-end-11 xl:col-start-3 xl:col-end-10">
        <div className="mb-6">
          <h1 className="text-3xl text-center font-bold">Cliente</h1>
        </div>
        <div>
          <form className="flex flex-col w-[100%]">
            <p className="mb-1 text-lg font-semibold md:text-xl md:mb-1 md:mt-2">
              Nombre:
            </p>
            <input
              className="h-1/3 w-[100%] mb-2 p-2 bg-transparent border-b-2"
              placeholder="Escribe tu nombre"
              type="text"
              required
              {...register("Nombre", {
                required: { value: true, message: "Nombre Required" },
              })}
            />
            <p className="mb-1 text-lg font-semibold md:text-xl md:mb-1 md:mt-2">
              Apellido:
            </p>
            <input
              className=" h-1/3 w-[100%] mb-2 p-2 bg-transparent border-b-2"
              placeholder="Escribe tu apellido"
              type="text"
              required
              {...register("Apellido", {
                required: { value: true, message: "Apellido Required" },
              })}
            />
            <p className="mb-1 text-lg font-semibold md:text-xl md:mb-1 md:mt-2">
              Telefono:
            </p>
            <input
              className=" h-1/3 w-[100%] mb-2 p-2 bg-transparent border-b-2"
              placeholder="Escribe tu numero telefonico"
              type="text"
              required
              {...register("Telefono", {
                required: { value: true, message: "Telefono Required" },
              })}
            />
            <button className="w-[50%] mt-2 text-sm font-bold  bg-[#D16527] h-[50px] rounded-md text-white md:w-[35%] md:text-lg md:mt-4">
              Actualizar Datos
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
