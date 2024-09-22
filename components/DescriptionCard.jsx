import Image from "next/image";
import IconDollarSign from "../assets/images/Icon-dollar.png";
import IconSuspention from "../assets/images/Icon-suspention.png";
import IconCar from "../assets/images/Icon-car.png";

export default function DescriptionCard() {
  const descriptionOptions = [
    {
      icon: IconSuspention,
      description:
        "Cotiza Refacciones: Ingresa la lista de piezas que necesitas.",
    },
    {
      icon: IconDollarSign,
      description:
        "Compara precios: Revisa las ofertas de refaccionarias cercanas.",
    },
    {
      icon: IconCar,
      description:
        "Compra y recibe: Selecciona la mejor opción y nosotros nos encargamos del envío al taller.",
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
                className="bg-[#302F2F] md:w-[44%] md:mr-9 flex flex-col lg:flex-row mb-4 h-[100%] p-5  justify-center relative lg:w-[280px] lg:h-[200px] rounded-2xl xl:w-[30%] 2xl:w-[30%]"
              >
                <Image
                  className=" h-[50px] w-[50px] mb-2 lg:w-[60px] lg:h-[60px] lg:absolute lg:top-5 lg:left-5 lg:mb-9"
                  src={option.icon}
                  alt="logo"
                />
                <p className=" font-mulish lg:top-[45%] lg:relative lg:left-1  lg:text-wrap">
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
