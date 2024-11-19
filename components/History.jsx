import Link from "next/link";
import { useRouter } from "next/router";

export default function History({ currentPage }) {
  const router = useRouter();
  const descriptionOptions =
    router.pathname === "/"
      ? [
          {
            description:
            "Siempre me pregunté si realmente estaba obteniendo los mejores precios por mis refacciones. Al usar esta app, descubrí que cada refaccionaria maneja precios y marcas diferentes. Gracias a la posibilidad de combinar cotizaciones, pude solicitar piezas a varias refaccionarias en un solo pedido, obteniendo la mejor calidad al mejor precio.",
            user: "Cliente de FaiRefac",
          },
        ]
      : [
          {
            description:
            "Nuestra refaccionaria ha experimentado un aumento del 30% en ventas gracias a esta plataforma. Los clientes ahora pueden comparar precios y calidad, lo que nos ha permitido destacar frente a la competencia en nuestra área.",
            user: "Refaccionaria afiliada a FaiRefac",
          },
        ];
  return (
    <>
      <section className="flex flex-col w-full h-fit col-start-1 col-end-13 mt-4 mb-4 md:flex-row md:w-full md:h-fit">
        <div className="md:w-[100%]">
          <img
            className="md:h-[90%] md:w-[100%] xl:h-[70%] 2xl:h-[70%]"
            src="https://fairefac-assets.s3.us-east-2.amazonaws.com/Good+team-pana+7.png"
            alt=""
          />
        </div>
        <div className="mt-2 mb-3 h-[400px]  justify-around md:w-[100%] md:h-[400px] flex flex-col ">
          <h2 className="font-chakra text-2xl font-bold xl:text-4xl">
            HISTORIA:
          </h2>
          {descriptionOptions.map((option, idx) => {
            return (
              <blockquote
                key={`history-card-${idx}`}
                className=" font-mulish border-l-2 border-[#D16527] text-justify pl-4 italic xl:h-[50%] xl:text-[21px] 2xl:h-[60%] 2xl:text-[25px]  md:h-fit"
              >
                {" "}
                {option.description}
                <p className="mt-2">- {option.user}</p>
              </blockquote>
            );
          })}

          <button className="font-chakra font-semibold bg-[#D16527] h-[10%] w-[50%] text-lg xl:h-[12%] xl:w-[30%] 2xl:h-[12%] 2xl:w-[25%]">
            <Link href="/signup">Crear Cuenta</Link>
          </button>
        </div>
      </section>
    </>
  );
}
