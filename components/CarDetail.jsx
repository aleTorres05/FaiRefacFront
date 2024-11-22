import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function CarDetail({
  client,
  selectedCar,
  closeModal,
  isModalOpen,
}) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleQuoteClick = () => {
    sessionStorage.setItem("client", JSON.stringify(client));
    sessionStorage.setItem("carSelected", JSON.stringify(selectedCar));
    router.push(`/quote-form`);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative mt-51 md:mt-4 bg-[#161616] p-8 w-full md:w-3/4 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
        <img
          src={
            "https://fairefac-assets.s3.us-east-2.amazonaws.com/Close-orange.png"
          }
          alt="Cerrar"
          className="absolute top-4 right-4 cursor-pointer w-6 h-6"
          onClick={closeModal}
        />
        <h2 className="font-chakra uppercase font-bold text-center text-[24px] mb-4 border-b-2 border-[#D16527]">
          Información del Carro
        </h2>
        {selectedCar && (
          <div className=" justify-items-center w-full">
            <div className="max-w-[520px] mx-auto mb-4 ">
              <img
                src={selectedCar.carPicture}
                alt={selectedCar.name}
                className="w-full h-auto md:mb-4 rounded-xl"
              />
              <h2 className=" text-center mb-3 font-chakra text-3xl font-bold capitalize">
                {selectedCar?.nickname != "null" ? selectedCar.nickname : ""}
              </h2>
            </div>
            <div className="w-full md:max-w-[320px] mb-4  flex flex-row md:flex-col mx-auto justify-evenly">
              <div className="flex flex-col md:flex-row justify-evenly md:mb-4 font-chakra ">
                <p className="text-sm md:text-lg lg:text-xl">
                  <strong>Marca:</strong> {selectedCar.brand}
                </p>
                <p className="text-sm md:text-lg lg:text-xl">
                  <strong>Modelo:</strong> {selectedCar.model}
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-evenly md:mb-4 font-chakra">
                <p className="text-sm md:text-lg lg:text-xl">
                  <strong>Año:</strong> {selectedCar.year}
                </p>
                <p className="text-sm md:text-lg lg:text-xl">
                  <strong>Versión:</strong> {selectedCar.version || "N/A"}
                </p>
              </div>
            </div>
            <div className="w-full my-2 md:p-2 text-center items-center justify-center flex flex-col md:flex-row">
              <button
                className="font-chakra border-2 border-[#D16527] flex flex-row w-[50%] md:w-[30%] lg:w-[20%] bg-[#D16527] justify-center py-2 font-semibold text-white md:mr-4 mb-2 md:mb-0"
                onClick={handleQuoteClick}
              >
                COTIZAR
              </button>
              <button
                onClick={toggleDropdown}
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                class="bg-transparent font-chakra flex flex-row w-[50%] md:w-[30%] lg:w-[20%] hover:bg-[#D16527] justify-center py-2 font-semibold text-white border-2 border-[#D16527]"
                type="button"
              >
                COTIZACIONES
                <svg
                  class="w-2.5 h-2.5 ml-2 mt-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
            </div>
            {isDropdownOpen && (
              <div id="dropdown" className="w-[100%]">
                <table
                  aria-labelledby="dropdownDefaultButton"
                  className="table-fixed w-full font-chakra border-collapse border-2 border-[#D16527] mb-3"
                >
                  <thead>
                    <tr className="bg-[#D16527]">
                      <th className="border border-gray-300 text-xs md:text-md lg:text-lg uppercase px-4 py-2">
                        Items
                      </th>
                      <th className="border border-gray-300 text-xs md:text-md lg:text-lg uppercase px-4 py-2">
                        Ticket
                      </th>
                      <th className="border border-gray-300 text-xs md:text-md lg:text-lg uppercase px-4 py-2">
                        Status
                      </th>
                      <th className="border border-gray-300 text-xs md:text-md lg:text-lg uppercase px-4 py-2">
                        Total Paid
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCar.quotes
                      ?.filter((quote) => quote.totalFaiRefacFee > 0)
                      .map((quote) => (
                        <tr key={quote._id} className="text-center">
                          <td className="border text-start text-xs md:text-md lg:text-lg border-gray-300 px-2 py-2">
                            {quote.items?.map((item) => (
                              <p key={item._id}>
                                {item.concept} (x{item.quantity})
                              </p>
                            ))}
                          </td>
                          <td className="border border-gray-300 px-2 py-2 text-xs md:text-md lg:text-lg">
                            <a
                              href={quote.ticketUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              View Ticket
                            </a>
                          </td>
                          <td className="border border-gray-300 px-2 py-2 text-xs md:text-md lg:text-lg capitalize">
                            {quote.status}
                          </td>
                          <td className="border border-gray-300 px-2 py-2 text-xs md:text-md lg:text-lg">
                            ${quote.totalFaiRefacFee.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
