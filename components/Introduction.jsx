import carImage from "../assets/images/CarDriving.png";
import Image from "next/image";

export default function Introduction() {
  return (
    <>
      <section className="flex items-center gap-[18px]  justify-between lg:col-start-1 lg:col-end-13 lg:mt-[50px] lg:mb-[73px]">
        <div className="lg:mr-[18px] lg:h-[90%] lg:w-[45%] items-center ">
          <h2 className="font-chakra lg:text-[45px] leading-normal	uppercase font-semibold	lg:mb-[12px]">
            Encuentra las mejores refacciones y envialas a tu taller
          </h2>
          <p className=" font-mulish lg:text-[25px] leading-normal font-normal	lg:w-[455px] lg:h-[110px] lg:mb-[32px]">
            Compara precios entre refaccionarias cercanas y óbten las piezas que
            necesitas al mejor precio.
          </p>
          <button className=" px-6 py-2  lg:w-[195px] lg:h-[60px]">
            <p className=" font-chakra lg:text-[18px] font-bold	uppercase">
              Contiza Ya!
            </p>
          </button>
        </div>
        <div className="w-[50%]">
          <Image
            className="lg:w-[550px] lg:h-[550px]"
            src={carImage}
            alt="logo"
          />
        </div>
      </section>
    </>
  );
}
