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
  const [carsPerPage] = useState(3);
  const [currentCars, setCurrentCars] = useState([]);
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
  };

  const carDetailsCloseModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedCar(null);
  };

  const addCarOpenModal = (car) => {
    setSelectedCar(car);
    setIsAddCarModalOpen(true);
  };

  const addCarCloseModal = () => {
    setIsAddCarModalOpen(false);
  };

  const numOfPages = userDetails.client?.cars.length
    ? Math.ceil(userDetails.client?.cars.length / carsPerPage)
    : 1;

  const handdleCarsPerPage = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (pageNum == 1) {
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
      <div className="flex flex-wrap px-5 md:px-10 md:py-5 lg:px-1 h-auto lg:h-[40vh] justify-start items-center gap-3">
        {currentCars?.map((car, idx) => (
          <div
            key={`car-${idx}`}
            className="relative w-full h-[220px] rounded-lg lg:w-[48%] lg:h-[100%] cursor-pointer"
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
            className="flex align-middle items-center justify-center h-[220px] w-full lg:w-[48%] lg:p-2 cursor-pointer bg-[#272727]"
            style={{
              clipPath:
                "polygon(10% 0%, 100% 0%, 100% 70%, 90% 100%, 0% 100%, 0% 30%)",
            }}
            onClick={() => addCarOpenModal()}
          >
            {/* Ícono de Font Awesome */}
            <i className="fas fa-plus text-orange-500 text-6xl"></i>
          </div>
        )}
      </div>

      <div className="p-3">
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
        <CarDetail
          client={userDetails.client}
          selectedCar={selectedCar}
          closeModal={carDetailsCloseModal}
        />
      )}
      {isAddCarModalOpen && (
        <AddCar closeModal={addCarCloseModal} user={userDetails} />
      )}
    </>
  );
}
