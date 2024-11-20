import { useState, useEffect } from "react";
import CarDetail from "./CarDetail";
import { getByID } from "@/pages/api/user";
import { toast } from "sonner";
import AddCar from "./AddCar";
import clsx from "clsx";

export default function CarCard() {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(4);
  const [currentCars, setCurrentCars] = useState([]);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);

  let indexLastCar = currentPage * carsPerPage;
  let indexFirstCar = indexLastCar - carsPerPage;

  useEffect(() => {
    const userid = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    getByID(userid, token)
      .then((user) => {
        setUserDetails(user);
        const cars = user.client?.cars.slice(indexFirstCar, indexLastCar);
        setCurrentCars(cars);
      })
      .catch((e) => {
        toast.error(e);
      });
  }, [currentPage]);

  const carDetialsOpenModal = (car) => {
    setSelectedCar(car);
    setIsDetailsModalOpen(true);
    setIsDetailsVisible(true);
  };

  const carDetailsCloseModal = () => {
    setIsDetailsVisible(false);
    setTimeout(() => {
      setIsDetailsModalOpen(false);
      setSelectedCar(null);
    }, 300);
  };

  const addCarOpenModal = () => {
    setIsAddCarModalOpen(true);
    setIsAddVisible(true);
  };

  const addCarCloseModal = () => {
    setIsAddVisible(false);
    setTimeout(() => setIsAddCarModalOpen(false), 300);
  };

  const numOfPages = userDetails.client?.cars.length
    ? Math.ceil(userDetails.client?.cars.length / carsPerPage)
    : 1;

  const handdleCarsPerPage = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (pageNum === 1) {
      const cars = userDetails.client?.cars.slice(0, carsPerPage);
      setCurrentCars(cars);
    } else {
      indexFirstCar = parseInt(userDetails.client?.cars.length / pageNum);
      indexLastCar = indexFirstCar + carsPerPage;
      setCurrentCars(
        userDetails.client?.cars.slice(indexFirstCar, indexLastCar)
      );
    }
  };

  return (
    <>
      <div className="flex flex-wrap  px-5 md:px-10 md:py-5 lg:px-1  justify-start gap-3">
        {currentCars?.map((car, idx) => (
          <div
            key={`car-${idx}`}
            className="relative w-full  rounded-lg  lg:w-[48%] cursor-pointer"
            id={`car-${idx}`}
            onClick={() => carDetialsOpenModal(car)}
          >
            <img
              className="opacity-50 rounded-lg h-full w-full"
              src={car?.carPicture}
              alt="car"
            />
            <p className="font-chakra absolute bottom-3 border-t-2 border-[#D16527] left-3 lg:left-4">
              {car?.nickname !== "null"
                ? car.nickname
                : `${car.brand} ${car.model} ${car.version} ${car.year}`}
            </p>
          </div>
        ))}
        {currentPage === numOfPages && (
          <div
            className={clsx(
              "w-full  flex align-middle items-center justify-center",
              currentCars.length % 2 === 0 ? "lg:w-[97%]" : "lg:w-[48%]"
            )}
          >
            <div
              className="flex  align-middle items-center justify-center h-[100px] w-[100%] lg:h-[100%] lg:p-2 cursor-pointer bg-[#272727] hover:bg-[#fff]"
              style={{
                clipPath:
                  "polygon(10% 0%, 100% 0%, 100% 70%, 90% 100%, 0% 100%, 0% 30%)",
              }}
              onClick={() => addCarOpenModal()}
            >
              <i className="fas fa-plus text-orange-500 text-6xl"></i>
            </div>
          </div>
        )}
      </div>
      <div className=" p-3">
        {Array.from({ length: numOfPages }, (_, index) => (
          <button
            onClick={() => handdleCarsPerPage(index + 1)}
            className={clsx(
              "border font-chakra border-[#D26528] mr-2 h-[100%] w-[9%] md:w-[10%] lg:w-[8%] xl:w-[5%]  hover:bg-[#D26528]",
              currentPage === index + 1 ? "bg-[#D26528]" : "bg-black"
            )}
            key={index}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {isDetailsModalOpen && (
        <div
          className={clsx(
            "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
            isDetailsVisible ? "animate-fadeIn" : "animate-fadeOut"
          )}
        >
          <CarDetail
            client={userDetails.client}
            selectedCar={selectedCar} // Pasa el coche seleccionado
            closeModal={carDetailsCloseModal}
          />
        </div>
      )}

      {isAddCarModalOpen && (
        <div
          className={clsx(
            "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
            isAddVisible ? "animate-fadeIn" : "animate-fadeOut"
          )}
        >
          <AddCar closeModal={addCarCloseModal} user={userDetails} />
        </div>
      )}
    </>
  );
}
