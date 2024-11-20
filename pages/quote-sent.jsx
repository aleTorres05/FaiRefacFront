import { useRouter } from "next/router";

export default function QuoteSent() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard");
  };

  return (
      <main className="flex flex-1 w-full h-screen flex-col justify-center items-center">
        <div className="p-5 md:p-20 lg:p-52">
          <i className="fa-solid fa-circle-check text-[120px] mb-10" />
          <h3 className="font-chakra  font-bold text-2xl leading-normal uppercase">
            ¡Tu solicitud de cotización ha sido enviada con éxito!
          </h3>

          <div className="my-4">
            <p className="text-xl">
              Ahora, espera a recibir las mejores propuestas de las
              refaccionarias. Nuestro equipo trabaja para que encuentres la
              opción ideal.
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <i className="fa-solid text-[#D16527]/70 fa-circle-info text-xl"></i>
            <span className="text-[#D16527]/70">
              Podrás visualizar las cotizaciones disponibles en el ícono de
              notificaciones. Una vez que hayas revisado y tomado una decisión,
              el aviso desaparecerá automáticamente.
            </span>
          </div>
          <button
            onClick={handleClick}
            className="bg-[#D16527] font-chakra w-[190px] h-[41px] uppercase mt-10"
          >
            cerrar
          </button>
        </div>
      </main>
  );
}
