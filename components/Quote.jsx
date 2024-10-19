export default function Quote() {
  return (
    <div className="flex flex-1 flex-col mt-[18px]">
      <h1 className="font-chakra uppercase font-bold text-[36px]">
        Cotizaciones
      </h1>
      <h3 className="font-chakra uppercase font-bold text-[24px]">
        Cotizacion 1
      </h3>

      <div>
        <div className="container flex flex-col gap-0 md:mt-5">
          {/* Tabla Escritorio */}
          <div className="w-full mx-auto p-4  md:p-0 hidden md:flex md:flex-col ">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-orange border border-none">
                <thead className="">
                  <tr className="bg-[#D16527] h-[10vh]">
                    <th className="px-4 py-2 text-left">imgn</th>
                    <th className="px-4 py-2 text-left">Refacción</th>
                    <th className="px-4 py-2 text-left">Precio</th>
                    <th className="px-4 py-2 text-left">Cantidad</th>
                    <th className="px-4 py-2 text-left">Subtotal</th>
                    <th className="px-4 py-2 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b h-[10vh]">
                    <td className="px-4 py-2">
                      <img
                        width="100"
                        height="100"
                        src=""
                        alt="Refacción 1"
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2">Filtro de Aire</td>
                    <td className="px-4 py-2">$50.00</td>
                    <td className="px-4 py-2">
                      <div className="flex flex-row w-[60%] items-center justify-between space-y-0 gap-4 p-4 shadow-lg">
                        <button className="text-2xl text-white">
                          <i className="fas fa-minus"></i>-
                        </button>

                        <span className="text-lg font-semibold">1</span>

                        <button className="text-2xl text-white">
                          <i className="fas fa-plus"></i>+
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2">$50.00</td>
                    <td className="px-4 py-2">
                      <button className="text-red-600 hover:text-red-800">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>

                  <tr className="border-b h-[10vh]">
                    <td className="px-4 py-2">
                      <img
                        width="100"
                        height="100"
                        src=""
                        alt="Refacción 2"
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2">Bujía</td>
                    <td className="px-4 py-2">$20.00</td>
                    <td className="px-4 py-2">
                      <div className="flex flex-row w-[60%] items-center justify-between space-y-0 gap-4 p-4 shadow-lg">
                        <button className="text-2xl text-white">
                          <i className="fas fa-minus"></i>-
                        </button>

                        <span className="text-lg font-semibold">1</span>

                        <button className="text-2xl text-white">
                          <i className="fas fa-plus"></i>+
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2">$40.00</td>
                    <td className="px-4 py-2">
                      <button className="text-red-600 hover:text-red-800">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>

                  <tr className="border-b h-[10vh]">
                    <td className="px-4 py-2">
                      <img
                        width="100"
                        height="100"
                        src=""
                        alt="Refacción 3"
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2">Aceite Motor</td>
                    <td className="px-4 py-2">$30.00</td>
                    <td className="px-4 py-2">
                      <div className="flex flex-row w-[60%] items-center justify-between space-y-0 gap-4 p-4 shadow-lg">
                        <button className="text-2xl text-white">
                          <i className="fas fa-minus"></i>-
                        </button>

                        <span className="text-lg font-semibold">1</span>

                        <button className="text-2xl text-white">
                          <i className="fas fa-plus"></i>+
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2">$90.00</td>
                    <td className="px-4 py-2">
                      <button className="text-red-600 hover:text-red-800">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-strat">
              <nav className="inline-flex  gap-5 -space-x-px">
                <a href="#" className="px-3 py-2 text-white bg-[#D16527] borde">
                  1
                </a>
                <a
                  href="#"
                  className="px-3 py-2 text-white bg-transparent border"
                >
                  2
                </a>
                <a
                  href="#"
                  className="px-3 py-2 text-white bg-transparent border"
                >
                  Siguiente
                </a>
              </nav>
            </div>
          </div>
          {/* Tabla mobile */}
          <div className="md:hidden">
            <div className="flex flex-col">
              <div className="p-2 w-full mt-5 bg-[rgba(0,0,0,0.42)] flex gap-2 flex-row">
                <div className="flex flex-col w-[80%] justify-center">
                  <p className="font-chakra uppercase font-bold text-sm">
                    amortiguador delantero
                  </p>
                  <p className="font-mulish text-sm">Marca: KyB</p>
                  <p className="font-chakra uppercase font-bold ">$ 1,300.00</p>
                </div>
                <div className="flex w-[20%] flex-col items-center space-y-2 p-4 shadow-lg">
                  <button className="text-2xl text-white">
                    <i className="fas fa-plus"></i>+
                  </button>

                  <span className="text-lg font-semibold">1</span>

                  <button className="text-2xl text-white">
                    <i className="fas fa-minus"></i>-
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="p-2 w-full mt-5 bg-[rgba(0,0,0,0.42)] flex gap-2 flex-row">
                <div className="flex flex-col w-[80%] justify-center">
                  <p className="font-chakra uppercase font-bold text-sm">
                    amortiguador delantero
                  </p>
                  <p className="font-mulish text-sm">Marca: KyB</p>
                  <p className="font-chakra uppercase font-bold ">$ 1,300.00</p>
                </div>
                <div className="flex w-[20%] flex-col items-center space-y-2 p-4 shadow-lg">
                  <button className="text-2xl text-white hover:text-green-800">
                    <i className="fas fa-plus"></i>+
                  </button>

                  <span className="text-lg font-semibold">1</span>

                  <button className="text-2xl text-white hover:text-red-800">
                    <i className="fas fa-minus"></i>-
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Tabla de pago */}
          <div className="bg-[#949494]  p-5 mt-5">
            <h3 className="font-chakra uppercase font-bold text-[23px] leading-[32px] text-center text-white">
              Resumen de cotización
            </h3>
            <div className="my-5">
              <div className="flex border-b-[2px] h-[8vh] items-center border-black justify-between">
                <p className="font-mulish text-[14px]">Subtotal</p>
                <p className="font-chakra text-[15px] font-[600]">$ 1,300.00</p>
              </div>
              <div className="flex border-b-[2px] h-[8vh] items-center border-black justify-between">
                <p className="font-mulish text-[14px]">Entrega</p>
                <p className="font-chakra text-[15px] font-[600]">$ 1,300.00</p>
              </div>
              <div className="flex border-b-[2px] h-[8vh] items-center border-black justify-between">
                <p className="font-mulish text-[14px]">IVA</p>
                <p className="font-chakra text-[15px] font-[600]">$ 1,300.00</p>
              </div>
              <div className="flex  h-[8vh] items-center justify-between">
                <p className="font-mulish text-[14px]">TOLTAL</p>
                <p className="font-chakra text-[15px] font-[600]">$ 1,300.00</p>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="bg-black w-[190px] h-[41px]">Enviar</button>
            </div>
          </div>
        </div>
      </div>

      <h3 className="font-chakra uppercase font-bold text-[24px] mt-5">
        Cotizacion 1
      </h3>
      <div className="w-full mx-auto p-4">
        <div className="overflow-x-auto">
          <h4 className="font-chakra font-bold w-full">
            Cotización de Fernando
          </h4>
          <table className="min-w-full bg-transparent">
            <thead className="bg-transparent">
              <tr>
                <th className="px-4 py-2 text-left">Refacción</th>
                <th className="px-4 py-2 text-left">Precio</th>
                <th className="px-4 py-2 text-left">Cantidad</th>
                <th className="px-4 py-2 text-left">Subtotal</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">Filtro de Aire</td>
                <td className="px-4 py-2">$50.00</td>
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">$100.00</td>
                <td className="px-4 py-2">
                  <button className="bg-[#D16527] w-[100px] h-[40px] text-white">
                    Acción
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-start">
          <nav className="inline-flex  gap-5 -space-x-px">
            <a href="#" className="px-3 py-2 text-white bg-[#D16527] borde">
              1
            </a>
            <a href="#" className="px-3 py-2 text-white bg-transparent border">
              2
            </a>
            <a href="#" className="px-3 py-2 text-white bg-transparent border">
              Siguiente
            </a>
          </nav>
        </div>
      </div>

      <h3 className="font-chakra uppercase font-bold text-[24px] mt-5">
        Cotizacion 1
      </h3>
      <div className="w-full mx-auto p-4">
        <div className="overflow-x-auto">
          <h4 className="font-chakra font-bold w-full">
            Cotización de Fernando
          </h4>
          <table className="min-w-full bg-transparent">
            <thead className="bg-transparent">
              <tr>
                <th className="px-4 py-2 text-left">Refacción</th>
                <th className="px-4 py-2 text-left">Precio</th>
                <th className="px-4 py-2 text-left">Cantidad</th>
                <th className="px-4 py-2 text-left">Subtotal</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">Filtro de Aire</td>
                <td className="px-4 py-2">$50.00</td>
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">$100.00</td>
                <td className="px-4 py-2">
                  <button className="bg-[#D16527] w-[100px] h-[40px] text-white">
                    Acción
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-start">
          <nav className="inline-flex  gap-5 -space-x-px">
            <a href="#" className="px-3 py-2 text-white bg-[#D16527] borde">
              1
            </a>
            <a href="#" className="px-3 py-2 text-white bg-transparent border">
              2
            </a>
            <a href="#" className="px-3 py-2 text-white bg-transparent border">
              Siguiente
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
