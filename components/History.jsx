export default function History() {
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
          <blockquote className=" font-mulish border-l-2 border-[#D16527] text-justify pl-4 italic xl:h-[50%] xl:text-[21px] 2xl:h-[60%] 2xl:text-[25px]  md:h-fit">
            "Siempre he confiado en mi mecánico de confianza, pero después de
            probar 3 talleres y cotizar con ellos, descubrí que estaba mal.
            Ahora con esta app, puedo comparar fácilmente los precios y marcas
            de diferentes refaccionarias cercanas."
            <p className="mt-2">- JUAN PÉREZ</p>
          </blockquote>
          <button className="font-chakra font-semibold bg-[#D16527] h-[10%] w-[40%] xl:h-[12%] xl:w-[30%] 2xl:h-[12%] 2xl:w-[25%]">
            Crear Cuenta
          </button>
        </div>
      </section>
    </>
  );
}
