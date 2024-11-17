import { useRouter } from "next/router";

export default function DescriptionCard({ currentPage }) {
  const router = useRouter();
  const descriptionOptions =
    router.pathname === "/"
      ? [
          {
            icon: "https://fairefac-assets.s3.us-east-2.amazonaws.com/Icon-piston.png",
            description:
              "Cotiza refacciones: Ingresa la lista de piezas que necesitas.",
          },
          {
            icon: "https://fairefac-assets.s3.us-east-2.amazonaws.com/Icon-money+(1).png",
            description:
              "Compara precios: Revisa las ofertas de refaccionarias cercanas.",
          },
          {
            icon: "https://fairefac-assets.s3.us-east-2.amazonaws.com/Icon-car.png",
            description:
              "Compra y recibe: Selecciona la mejor opción y nosotros nos encargamos del envío al taller.",
          },
        ]
      : [
          {
            icon: "https://fairefac-assets.s3.us-east-2.amazonaws.com/Icon-piston.png",
            description:
              "Amplía tu alcance y atrae más clientes en tu zona para impulsar las ventas de tu refaccionaria.",
          },
          {
            icon: "https://fairefac-assets.s3.us-east-2.amazonaws.com/Icon-money+(1).png",
            description:
              "Vende más sin costos ocultos: no cobramos comisiones a tu negocio por las ventas realizadas.",
          },
          {
            icon: "https://fairefac-assets.s3.us-east-2.amazonaws.com/Icon-car.png",
            description:
              "Optimiza tus entregas con tu propio equipo; nosotros nos encargamos de generar las ventas.",
          },
        ];
  return (
    <>
      <section className="lg:flex lg:flex-col col-start-1 col-end-13 h-fit lg:h-fit md:h-fit ">
        <h2 className=" font-chakra mb-2 text-[25px] w-[80%] lg:mb-[70px] lg:text-[36px] font-bold uppercase xl:text-[35px] 2xl:text-[40px]">
          ¿Cómo Funciona?
        </h2>
        <div className="lg:flex lg:flex-row md:flex-row sm:flex-wrap md:flex-wrap md:justify-center lg:w-full lg:justify-evenly  justify-between flex flex-col h-[100%]">
          {descriptionOptions.map((option, idx) => {
            return (
              <div
                key={`description-card-${idx}`}
                className="bg-[#302F2F] md:w-[44%] md:mr-9 flex flex-row gap-5 align-middle lg:flex-row mb-4 h-fit p-5  justify-center relative lg:w-[280px] lg:h-[200px] rounded-2xl xl:w-[30%] 2xl:w-[30%]"
              >
                <Image
                  className=" h-[50px] w-[50px] lg:w-[60px] lg:h-[60px] lg:absolute lg:top-5 lg:left-5 lg:mb-9"
                  src={option.icon}
                  alt="logo"
                />
                <p className=" md:text-md xl:text-lg font-semibold font-mulish lg:top-[45%] lg:relative lg:left-1  lg:text-wrap">
                  {option.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
