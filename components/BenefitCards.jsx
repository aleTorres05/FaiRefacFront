export default function BenefitCards() {
  const benefitOptions = [
    {
      title: "Ahorro de Tiempo",
      description:
        "Encuentra las mejores opciones sin necesidad de visitar múltiples refaccionarias.",
    },
    {
      title: "Transparencia",
      description:
        "Encuentra las mejores opciones sin necesidad de visitar múltiples refaccionarias.",
    },
    {
      title: "Entrega Directa",
      description:
        "Las refacciones llegan directamente al taller, listas para ser instaladas.",
    },
  ];
  return (
    <>
      <section className="lg:col-start-1 lg:col-end-13 lg:mt-[98px] lg:h-[450px]">
        <div>
          <h2 className="uppercase font-chakra text-[36px] mb-[35px] font-bold lg:h-[50px]">
            Beneficios
          </h2>
        </div>
        <div className="lg:flex lg:flex-row  bg-[#070606] lg:h-[100%] rounded-xl justify-evenly items-center ">
          {benefitOptions.map((option, idx) => {
            return (
              <div className="flex flex-col lg:w-[300px] ">
                <div className=" border-b-2 border-b-[#D16527] mb-[27px] lg:w-[200px]  text-[18px]">
                  <h4 className="uppercase font-chakra font-semibold mb-[13px]">
                    {option.title}
                  </h4>
                </div>
                <div className="border-y-[3px] border-y-[#302F2F] lg:w-[300px] lg:m lg:h-[240px] ">
                  <p className=" font-mulish my-[74px] lg:w-[280px]">
                    {option.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}