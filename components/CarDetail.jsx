import { useEffect } from "react";
import { useRouter } from "next/router";

export default function CarDetail({ selectedCar, closeModal, isModalOpen }) {
  const router = useRouter();

  const handleQuoteClick = () => {
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
        {/* Mostrar información del carro seleccionado */}
        {selectedCar && (
          <div>
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
            <div className="max-w-[320px] mx-auto justify-evenly">
              <div className="flex flex-col md:flex-row justify-between md:mb-4 font-chakra text-xl">
                <p>
                  <strong>Marca:</strong> {selectedCar.brand}
                </p>
                <p>
                  <strong>Modelo:</strong> {selectedCar.model}
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-between mb-4 font-chakra text-xl">
                <p>
                  <strong>Año:</strong> {selectedCar.year}
                </p>
                <p>
                  <strong>Versión:</strong> {selectedCar.version || "N/A"}
                </p>
              </div>
            </div>
            <div className="w-full text-center">
              <button
                className="w-[250px] py-2 bg-[#D16527] text-white font-chakra font-semibold rounded-md"
                onClick={handleQuoteClick}
              >
                COTIZAR
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
