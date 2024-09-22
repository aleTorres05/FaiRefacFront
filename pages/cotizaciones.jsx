import Header from "@/components/Header";
import Image from "next/image";

export default function Login() {
  return (
    <div className="h-[100vh] flex flex-col ">
      <Header className="fixed top-0 left-0 w-full" />

      <div className="flex flex-1 flex-col mt-[18px] mx-[32px]">
        <h1 className="font-chakra uppercase font-bold text-[36px]">
          Cotizaciones
        </h1>
        <h3 className="font-chakra uppercase font-bold text-[24px]">
          Cotizacion 1
        </h3>

        <div>
          <div className="flex flex-col md:flex-row gap-0 md:mt-5">
            {/* Tabla Escritorio */}
            <div class="container mx-auto p-4 md:p-0 hidden md:flex md:flex-col ">
              <div class="overflow-x-auto">
                <table class="min-w-full bg-orange border border-none">
                  <thead class="">
                    <tr className="bg-[#D16527] h-[10vh]">
                      <th class="px-4 py-2 text-left">Imagen</th>
                      <th class="px-4 py-2 text-left">Refacción</th>
                      <th class="px-4 py-2 text-left">Precio</th>
                      <th class="px-4 py-2 text-left">Cantidad</th>
                      <th class="px-4 py-2 text-left">Subtotal</th>
                      <th class="px-4 py-2 text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b h-[10vh]">
                      <td class="px-4 py-2">
                        <Image
                          width="100"
                          height="100"
                          src=""
                          alt="Refacción 1"
                          class="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td class="px-4 py-2">Filtro de Aire</td>
                      <td class="px-4 py-2">$50.00</td>
                      <td class="px-4 py-2">
                        <div class="flex flex-row w-[60%] items-center justify-between space-y-2 p-4 shadow-lg">
                          <button class="text-2xl text-white">
                            <i class="fas fa-plus"></i>+
                          </button>

                          <span class="text-lg font-semibold">1</span>

                          <button class="text-2xl text-white">
                            <i class="fas fa-minus"></i>-
                          </button>
                        </div>
                      </td>
                      <td class="px-4 py-2">$50.00</td>
                      <td class="px-4 py-2">
                        <button class="text-red-600 hover:text-red-800">
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>

                    <tr class="border-b h-[10vh]">
                      <td class="px-4 py-2">
                        <Image
                          width="100"
                          height="100"
                          src=""
                          alt="Refacción 2"
                          class="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td class="px-4 py-2">Bujía</td>
                      <td class="px-4 py-2">$20.00</td>
                      <td class="px-4 py-2">
                        <div class="flex flex-row w-[60%] items-center justify-between space-y-2 p-4 shadow-lg">
                          <button class="text-2xl text-white">
                            <i class="fas fa-plus"></i>+
                          </button>

                          <span class="text-lg font-semibold">1</span>

                          <button class="text-2xl text-white">
                            <i class="fas fa-minus"></i>-
                          </button>
                        </div>
                      </td>
                      <td class="px-4 py-2">$40.00</td>
                      <td class="px-4 py-2">
                        <button class="text-red-600 hover:text-red-800">
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>

                    <tr class="border-b h-[10vh]">
                      <td class="px-4 py-2">
                        <Image
                          width="100"
                          height="100"
                          src=""
                          alt="Refacción 3"
                          class="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td class="px-4 py-2">Aceite Motor</td>
                      <td class="px-4 py-2">$30.00</td>
                      <td class="px-4 py-2">
                        <div class="flex flex-row w-[60%] items-center justify-between space-y-2 p-4 shadow-lg">
                          <button class="text-2xl text-white">
                            <i class="fas fa-plus"></i>+
                          </button>

                          <span class="text-lg font-semibold">1</span>

                          <button class="text-2xl text-white">
                            <i class="fas fa-minus"></i>-
                          </button>
                        </div>
                      </td>
                      <td class="px-4 py-2">$90.00</td>
                      <td class="px-4 py-2">
                        <button class="text-red-600 hover:text-red-800">
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="mt-4 flex justify-strat">
                <nav class="inline-flex  gap-5 -space-x-px">
                  <a href="#" class="px-3 py-2 text-white bg-[#D16527] borde">
                    1
                  </a>
                  <a
                    href="#"
                    class="px-3 py-2 text-white bg-transparent border"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    class="px-3 py-2 text-white bg-transparent border"
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
                  <div className=" w-[20%] bg-white"></div>
                  <div className="flex flex-col w-[60%] justify-center">
                    <p className="font-chakra uppercase font-bold text-sm">
                      amortiguador delantero
                    </p>
                    <p className="font-mulish text-sm">Marca: KyB</p>
                    <p className="font-chakra uppercase font-bold ">
                      $ 1,300.00
                    </p>
                  </div>
                  <div class="flex w-[20%] flex-col items-center space-y-2 p-4 shadow-lg">
                    <button class="text-2xl text-white">
                      <i class="fas fa-plus"></i>+
                    </button>

                    <span class="text-lg font-semibold">1</span>

                    <button class="text-2xl text-white">
                      <i class="fas fa-minus"></i>-
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="p-2 w-full mt-5 bg-[rgba(0,0,0,0.42)] flex gap-2 flex-row">
                  <div className=" w-[20%] bg-white"></div>
                  <div className="flex flex-col w-[60%] justify-center">
                    <p className="font-chakra uppercase font-bold text-sm">
                      amortiguador delantero
                    </p>
                    <p className="font-mulish text-sm">Marca: KyB</p>
                    <p className="font-chakra uppercase font-bold ">
                      $ 1,300.00
                    </p>
                  </div>
                  <div class="flex w-[20%] flex-col items-center space-y-2 p-4 shadow-lg">
                    <button class="text-2xl text-white hover:text-green-800">
                      <i class="fas fa-plus"></i>+
                    </button>

                    <span class="text-lg font-semibold">1</span>

                    <button class="text-2xl text-white hover:text-red-800">
                      <i class="fas fa-minus"></i>-
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Tabla de pago */}
            <div className="bg-[#949494] p-5 mt-5 md:m-0">
              <h3 className="font-chakra uppercase font-bold text-[23px] leading-[32px] text-center text-white">
                Resumen de cotización
              </h3>
              <div className="my-5">
                <div className="flex border-b-[2px] h-[8vh] items-center border-black justify-between">
                  <p className="font-mulish text-[14px]">Subtotal</p>
                  <p className="font-chakra text-[15px] font-[600]">
                    $ 1,300.00
                  </p>
                </div>
                <div className="flex border-b-[2px] h-[8vh] items-center border-black justify-between">
                  <p className="font-mulish text-[14px]">Entrega</p>
                  <p className="font-chakra text-[15px] font-[600]">
                    $ 1,300.00
                  </p>
                </div>
                <div className="flex border-b-[2px] h-[8vh] items-center border-black justify-between">
                  <p className="font-mulish text-[14px]">IVA</p>
                  <p className="font-chakra text-[15px] font-[600]">
                    $ 1,300.00
                  </p>
                </div>
                <div className="flex  h-[8vh] items-center justify-between">
                  <p className="font-mulish text-[14px]">TOLTAL</p>
                  <p className="font-chakra text-[15px] font-[600]">
                    $ 1,300.00
                  </p>
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
        <div class="container mx-auto p-4">
          <div class="overflow-x-auto">
            <h4 className="font-chakra font-bold w-full">
              Cotización de Fernando
            </h4>
            <table class="min-w-full bg-transparent ">
              <thead class="bg-transparent font-chakra">
                <tr>
                  <th class="px-2 py-2 text-center">Refacción</th>
                  <th class="px-2 py-2 text-center">Precio</th>
                  <th class="px-2 py-2 text-center">Cantidad</th>
                  <th class="px-2 py-2 text-center">Subtotal</th>
                  <th class="px-2 py-2 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b-2 border-[#D16527]">
                  <td class="px-2 py-2 text-center">Filtro de Aire</td>
                  <td class="px-2 py-2 text-center">$50.00</td>
                  <td class="px-2 py-2 text-center">2</td>
                  <td class="px-2 py-2 text-center">$100.00</td>
                  <td class="px-2 py-2 text-center">
                    <button class="bg-[#D16527] w-[190px] h-[41px] text-white px-4 py-1 rounded hover:bg-black">
                      Acción
                    </button>
                  </td>
                </tr>
                <tr class="border-b-2 border-[#D16527]">
                  <td class="px-4 py-2 text-center">Filtro de Aire</td>
                  <td class="px-4 py-2 text-center">$50.00</td>
                  <td class="px-4 py-2 text-center">2</td>
                  <td class="px-4 py-2 text-center">$100.00</td>
                  <td class="px-4 py-2 text-center">
                    <button class="bg-[#D16527] w-[190px] h-[41px] text-white px-4 py-1 rounded hover:bg-black">
                      Acción
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-4 flex justify-start">
            <nav class="inline-flex  gap-5 -space-x-px">
              <a href="#" class="px-3 py-2 text-white bg-[#D16527] borde">
                1
              </a>
              <a href="#" class="px-3 py-2 text-white bg-transparent border">
                2
              </a>
              <a href="#" class="px-3 py-2 text-white bg-transparent border">
                Siguiente
              </a>
            </nav>
          </div>
        </div>

        <h3 className="font-chakra uppercase font-bold text-[24px] mt-5">
          Cotizacion 1
        </h3>
        <div class="container mx-auto p-4">
          <div class="overflow-x-auto">
            <h4 className="font-chakra font-bold w-full">
              Cotización de Fernando
            </h4>
            <table class="min-w-full bg-transparent ">
              <thead class="bg-transparent font-chakra">
                <tr>
                  <th class="px-2 py-2 text-center">Refacción</th>
                  <th class="px-2 py-2 text-center">Precio</th>
                  <th class="px-2 py-2 text-center">Cantidad</th>
                  <th class="px-2 py-2 text-center">Subtotal</th>
                  <th class="px-2 py-2 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b-2 border-[#D16527]">
                  <td class="px-2 py-2 text-center">Filtro de Aire</td>
                  <td class="px-2 py-2 text-center">$50.00</td>
                  <td class="px-2 py-2 text-center">2</td>
                  <td class="px-2 py-2 text-center">$100.00</td>
                  <td class="px-2 py-2 text-center">
                    <button class="bg-[#D16527] w-[190px] h-[41px] text-white px-4 py-1 rounded hover:bg-black">
                      Acción
                    </button>
                  </td>
                </tr>
                <tr class="border-b-2 border-[#D16527]">
                  <td class="px-4 py-2 text-center">Filtro de Aire</td>
                  <td class="px-4 py-2 text-center">$50.00</td>
                  <td class="px-4 py-2 text-center">2</td>
                  <td class="px-4 py-2 text-center">$100.00</td>
                  <td class="px-4 py-2 text-center">
                    <button class="bg-[#D16527] w-[190px] h-[41px] text-white px-4 py-1 rounded hover:bg-black">
                      Acción
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-4 flex justify-start">
            <nav class="inline-flex  gap-5 -space-x-px">
              <a href="#" class="px-3 py-2 text-white bg-[#D16527] borde">
                1
              </a>
              <a href="#" class="px-3 py-2 text-white bg-transparent border">
                2
              </a>
              <a href="#" class="px-3 py-2 text-white bg-transparent border">
                Siguiente
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
