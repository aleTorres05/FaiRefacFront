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
      <section className="lg:flex lg:flex-col lg:col-start-1 lg:col-end-13 lg:w-[100%] ">
        <h2 className=" font-chakra lg:mb-[70px] text-[36px] font-bold uppercase">
          ¿Cómo Funciona?
        </h2>
        <div className="lg:flex lg:flex-row justify-between">
          {descriptionOptions.map((option, idx) => {
            return (
              <div
                key={`description-card-${idx}`}
                className="bg-[#302F2F] p-5 justify-center relative lg:w-[370px] lg:h-[240px] rounded-2xl"
              >
                <Image
                  className="lg:w-[70px] lg:h-[70px] absolute lg:top-5 lg:left-5 lg:mb-[22px]"
                  src={option.icon}
                  alt="logo"
                />
                <p className="absolute top-[45%]">{option.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
