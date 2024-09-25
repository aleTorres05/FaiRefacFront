export default function DetallesDelCarro() {
  return (
    <div className="flex flex-col p-[32px] m-5 bg-white rounded-xl">
      <div className="flex flex-row gap-5">
        <div className="w-[30%] md:w-[50%] ">
          <div className="rounded-full bg-slate-500 w-[100px] h-[100px]"></div>
        </div>
        <div className="ml-[20px] w-[70%] md:w-[50%]">
          <h3 className="text-[#000] font-chakra font-bold text-[24px] uppercase">
            Nombre:
          </h3>
          <p className="text-[#000] font-chakra text-[16px] font-semibold">
            {" "}
            Ford Focus
          </p>
          <h3 className="text-[#000] font-chakra font-bold text-[24px] uppercase">
            Año:
          </h3>
          <p className="text-[#000] font-chakra text-[16px] font-semibold">
            {" "}
            2015
          </p>
          <h3 className="text-[#000] font-chakra font-bold text-[24px] uppercase">
            Modelo:
          </h3>
          <p className="text-[#000] font-chakra text-[16px] font-semibold">
            {" "}
            Focus
          </p>
          <h3 className="text-[#000] font-chakra font-bold text-[24px] uppercase">
            Cotizar:
          </h3>
          <p className="text-[#000] font-chakra text-[16px] font-semibold">
            {" "}
            Ford Focus
          </p>
        </div>
      </div>
      <div className="mt-[50px]">
        <div>
          <form action="" className="flex flex-col gap-[20px]">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full md:w-[300px] h-[66px] flex flex-col gap-[15px]">
                <label
                  className="text-[#000] font-chakra text-[16px] font-bold leading-normal uppercase"
                  htmlFor="from-date"
                >
                  Desde
                </label>
                <input
                  id="from-date"
                  type="date"
                  className="text-[#000] outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                />
              </div>

              <div className="w-full md:w-[300px] h-[66px] flex flex-col gap-[15px]">
                <label
                  className="text-[#000] font-chakra text-[16px] font-bold leading-normal uppercase"
                  htmlFor="to-date"
                >
                  Hasta
                </label>
                <input
                  id="to-date"
                  type="date"
                  className="text-[#000] outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#D16527] mt-5 font-chakra w-[190px] h-[41px] uppercase"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
