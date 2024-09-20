export default function LoginForm() {
  return (
    <div className="flex flex-col px-[32px]">
      <form action="" className="flex flex-col gap-[20px]">
        <div className="w-full md:w-[660px] h-[66px] flex flex-col gap-[15px]">
          <label
            className="color-[#EDEDED] font-chakra text-[16px] font-bold leading-normal uppercase"
            htmlFor=""
          >
            Correo
          </label>
          <input
            placeholder="Correo electronico"
            type="mail"
            className="text-[#C2C2C2] outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
          />
        </div>
        <div className="w-full md:w-[660px] h-[66px] flex flex-col gap-[15px]">
          <label
            htmlFor=""
            className="color-[#EDEDED] font-chakra text-[16px] font-bold leading-normal uppercase"
          >
            Contraseña
          </label>
          <input
            placeholder="Escribe tu contraseña"
            type="password"
            className="text-[#C2C2C2] outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
          />
        </div>
        <button
          type="submit"
          className="bg-[#D16527] mt-5 font-chakra w-[190px] h-[41px] uppercase"
        >
          Iniciar sesión
        </button>
        <button className="lg:hidden bg-[#fff] font-chakra w-[190px] h-[41px] text-[#000] uppercase">
          Resgitrarse
        </button>
      </form>
    </div>
  );
}
