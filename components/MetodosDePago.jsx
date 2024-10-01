export default function MetodosDePago() {
  return (
    <div className="flex flex-col px-[32px] my-5">
      <form action="" className="flex flex-col gap-[20px]">
        <div className="w-full md:w-[660px] h-[66px] flex flex-col gap-[15px]">
          <label
            className="color-[#EDEDED] font-chakra text-[16px] font-bold leading-normal uppercase"
            htmlFor="card-number"
          >
            Número de tarjeta
          </label>
          <input
            id="card-number"
            placeholder="Número de tarjeta"
            type="text"
            maxLength="19"
            className="text-[#C2C2C2] outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
            onInput={(e) => {
              e.target.value = e.target.value
                .replace(/\s?/g, "")
                .replace(/(\d{4})/g, "$1 ")
                .trim();
            }}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-[80%] h-[66px] flex flex-col gap-[15px]">
            <label
              className="color-[#EDEDED] font-chakra text-[16px] font-bold leading-normal uppercase"
              htmlFor="expiry-date"
            >
              Fecha de expiración
            </label>
            <input
              id="expiry-date"
              placeholder="MM/AA"
              type="text"
              maxLength="5"
              className="text-[#C2C2C2] outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/\D/g, "")
                  .replace(/(\d{2})(\d{2})/, "$1/$2")
                  .slice(0, 5);
              }}
            />
          </div>

          <div className="w-full md:w-[20%] h-[66px] flex flex-col gap-[15px]">
            <label
              className="color-[#EDEDED] font-chakra text-[16px] font-bold leading-normal uppercase"
              htmlFor="cvv"
            >
              CVV
            </label>
            <input
              id="cvv"
              placeholder="CVV"
              type="password"
              maxLength="3"
              className="text-[#C2C2C2] outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
            />
          </div>
        </div>

        <div className="w-full md:w-[660px] h-[66px] flex flex-col gap-[15px]">
          <label
            className="color-[#EDEDED] font-chakra text-[16px] font-bold leading-normal uppercase"
            htmlFor="card-name"
          >
            Nombre en la tarjeta
          </label>
          <input
            id="card-name"
            placeholder="Nombre completo"
            type="text"
            className="text-[#C2C2C2] outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
          />
        </div>

        <div className="w-full md:w-[660px] h-[66px] flex flex-col gap-[15px]">
          <label
            className="color-[#EDEDED] font-chakra text-[16px] font-bold leading-normal uppercase"
            htmlFor="email"
          >
            Correo
          </label>
          <input
            id="email"
            placeholder="Correo electrónico"
            type="email"
            className="text-[#C2C2C2] outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
          />
        </div>
      </form>
    </div>
  );
}
