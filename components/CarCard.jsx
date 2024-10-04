import { useState, useEffect } from "react";
import CarDetail from "./CarDetail";

export default function CarCard() {
  const carDetails = [
    {
      image: "https://acnews.blob.core.windows.net/imgnews/large/NAZ_68778115360b49c0858a0f0bde1e74bb.jpg",
      name: "Audi A1 2022 Sport",
      model: "A1",
      brand: "Audi",
      year: "2022",
      version: "Sport",
    },
    {
      image:
        "https://www.excelenciasdelmotor.com/sites/default/files/u7/Seat-Leon-729x486-c44abb6e2a3f69a9.jpg",
      name: "Seat Ibiza Sport 2008",
      model: "Ibiza",
      brand: "SEAT",
      year: "2008",
      version: "Sport"
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Tesla_Model_3_%282023%29_Autofr%C3%BChling_Ulm_IMG_9282.jpg/640px-Tesla_Model_3_%282023%29_Autofr%C3%BChling_Ulm_IMG_9282.jpg",
      name: "Tesla Model S 2020",
      model: "Model S",
      brand: "Tesla",
      year: "2022",
      version: ""
    },
    {
      image:
        "https://autodealerluna.mx/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-03-at-3.27.12-PM.jpeg",
      name: "Chevorlet Cheyenne 2018",
      model: "Cheyenne",
      brand: "Chevrolet",
      year: "2018",
      version: ""
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const openModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <>
      <div className="flex flex-col ">
        {carDetails.map((car, idx) => (
          <div
            key={`car-${idx}`}
            className="relative w-full h-[220px] mb-3 rounded-lg lg:p-2 lg:h-[100%] xl:h-[100%] 2xl:h-[100%]"
            id={`car-${idx}`}
            onClick={() => openModal(car)}
          >
            <img className="opacity-50 rounded-lg h-full w-full" src={car.image} alt="car" />
            <p className="font-chakra absolute bottom-3 border-t-2 border-[#D16527] left-3 lg:left-4 lg:bottom-4 xl:h-[10%] xl:w-fit xl:text-2xl xl:font-semibold xl:border-t-4 xl:left-7">
              {car.name}
            </p>
          </div>
        ))}

        {/* Modal */}
        {isModalOpen && (
          <CarDetail selectedCar={selectedCar} closeModal={closeModal} />
        )}
      </div>
    </>
  );
}
