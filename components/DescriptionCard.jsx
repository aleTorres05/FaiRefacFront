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
        <h2 className="lg:mb-[70px] text-[36px] font-bold uppercase">
          ¿Cómo Funciona?
        </h2>
        <div className="lg:flex lg:flex-row">
          {descriptionOptions.map((option, idx) => {
            return (
              <div className="bg-[#302F2F] lg:mr-[92px] p-5 justify-center flex flex-col lg:w-[370px] gap-5 lg:h-[240px] rounded-2xl">
                <Image
                  className="lg:w-[70px] lg:h-[70px] top-0 left-0"
                  src={option.icon}
                  alt="logo"
                />
                <p>{option.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
