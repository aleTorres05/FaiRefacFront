import Link from "next/link";

export default function Introduction({ currentPage }) {
  const introductionText =
    currentPage === "home"
      ? {
          title: "Encuentra las mejores refacciones y envíalas a tu taller",
          description:
            "Compara precios entre refaccionarias cercanas y obtén las piezas que necesitas al mejor precio.",
          buttonText: "Cotiza Ya!",
          imageSrc:
            "https://fairefac-assets.s3.us-east-2.amazonaws.com/Car+driving-amico+3+(1).png",
        }
      : {
          title: "Aumenta tus ventas ofreciendo refacciones de calidad",
          description:
            "Haz que tu refaccionaria llegue a más clientes locales con nuestras herramientas de comparación de precios y gestión de envíos.",
          buttonText: "Regístrate Ahora!",
          imageSrc:
            "https://fairefac-assets.s3.us-east-2.amazonaws.com/Car+driving-amico+3+(1).png",
        };

  return (
    <>
      <section className="flex flex-wrap mb-3 mt-[30px] md:flex-row md:h-fit items-center gap-[18px] lg:h-fit justify-between col-start-1 col-end-13">
        <div className="lg:flex lg:flex-row md:w-full lg:h-fit xl:h-fit 2xl:h-fit">
          <div className="w-full mb-2 items-center lg:w-1/2 lg:content-center xl:content-center 2xl:content-center">
            <h2 className="font-chakra text-[30px] md:text-[37px] lg:text-[40px] 2xl:items-center leading-normal uppercase font-semibold mb-2 xl:text-[45px] 2xl:text-[50px] xl:mb-4 2xl:mb-4">
              {introductionText.title}
            </h2>
            <p className="font-mulish text-[18px] mb-3 md:text-[20px] lg:text-[22px] md:w-full leading-normal font-normal xl:text-[30px] 2xl:text-[35px] xl:mb-9 2xl:mb-10">
              {introductionText.description}
            </p>
            <Link href="/signup">
              <button className="bg-[#D16527] h-[40px] w-[60%] text-lg px-6 py-2 md:h-[45px] md:w-[25%] lg:w-[50%] lg:h-[10%]">
                <p className="font-chakra font-bold uppercase xl:text-[25px] 2xl:text-[30px]">
                  {introductionText.buttonText}
                </p>
              </button>
            </Link>
          </div>
          <div className="w-full md:h-fit lg:w-1/2 lg:h-fit">
            <img
              className="w-full md:h-[100%] md:w-[98%] lg:ml-3 lg:h-[70%]"
              src={introductionText.imageSrc}
              alt="logo"
            />
          </div>
        </div>
      </section>
    </>
  );
}
