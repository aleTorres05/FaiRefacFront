export default function Footer() {
  return (
    <>
      <footer className="border-t col-start-1 col-end-13 h-fit flex flex-col border-gray-700 pt-8 my-6">
        <div className="flex flex-col justify-evenly ">
          <div>
            <img
              className="h-[55px] w-[50%] md:w-[30%] md:h-[65px] xl:w-[25%] 2xl:w-[20%]"
              src="https://fairefac-assets.s3.us-east-2.amazonaws.com/FR-Logo.png"
              alt="logo"
            />
          </div>
          <div className="flex flex-row justify-between flex-wrap my-4 md:justify-between xl:justify-evenly 2xl:justify-evenly">
            <div className="md:w-1/3 lg:w-[33%] xl:w-[33%] 2xl:w-[33%] ">
              <h3 className="font-chakra text-2xl border-b-2 w-fit border-[#D16527] font-bold mb-2 xl:text-2xl 2xl:text-3xl ">
                EQUIPO
              </h3>
              <ul className=" font-chakra w-[100%] md:w-[100%] md:text-xl font-semibold xl:text-2xl 2xl:text-3xl xl:font-medium">
                <li>GERARDO URIAS</li>
                <li>YAIR GUADARRAMAS</li>
                <li>FERNANDO OCAMPO</li>
                <li>KEVIN CALDERON</li>
                <li>ALEJANDRO TORRES</li>
              </ul>
            </div>
            <div className="md:w-1/3 lg:w-[33%] xl:w-[33%] 2xl:w-[33%] ">
              <h3 className="font-chakra text-2xl border-b-2 w-fit border-[#D16527] font-bold mb-2">
                GITHUB
              </h3>
              <ul className=" font-chakra w-[100%] md:w-[100%] md:text-xl font-semibold xl:text-2xl 2xl:text-3xl xl:font-medium">
                <li>@GURDINY</li>
                <li>@YAIRGG95</li>
                <li>@FERCHAS98</li>
                <li>@ZENCALDERON</li>
                <li>@ALETORRES05</li>
              </ul>
            </div>
            <div className="flex flex-col mt-6 h-sreen  md:w-1/3 md:mt-0 lg:w-[33%] xl:w-[33%] 2xl:w-[33%]  justify-around">
              <h3 className="font-bold mb-2 font-chakra text-2xl border-b-2 w-fit border-[#D16527]">
                SUSCRÍBETE
              </h3>
              <p className="font-mulish w-[100%] md:w-[100%] md:text-xl font-semibold xl:text-[23px] 2xl:text-[27px]">
                Recibe ofertas y noticias en tu correo
              </p>
              <button className="bg-[#D16527] font-chakra w-[50%] text-white px-4 py-2 rounded mt-2">
                SUSCRÍBETE
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
