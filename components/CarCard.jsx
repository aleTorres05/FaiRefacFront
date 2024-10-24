import { useState, useEffect } from "react";
import CarDetail from "./CarDetail";
import { getByID } from "@/pages/api/user";
import { toast } from "sonner";
import { useRouter } from "next/router";
import clsx from "clsx";

export default function CarCard() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };
  const numOfPages = Math.round(userDetails.client?.cars.length / carsPerPage);

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
      <div className="flex flex-col ">
        {currentCars?.map((car, idx) => (
          <div
            key={`car-${idx}`}
            className="relative w-full h-[220px] mb-3 rounded-lg lg:p-2 lg:h-[100%] xl:h-[100%] 2xl:h-[100%] cursor-pointer"
            id={`car-${idx}`}
            onClick={() => openModal(car)}
          >
            <img
              className="opacity-50 rounded-lg h-full w-full"
              src={car?.carPicture}
              alt="car"
            />
            <p className="font-chakra absolute bottom-3 border-t-2 border-[#D16527] left-3 lg:left-4 lg:bottom-4 xl:h-[10%] xl:w-fit xl:text-2xl xl:font-semibold xl:border-t-4 xl:left-7">
              {`${car.brand} ${car.model} ${car.version} ${car.year}`}
            </p>
          </div>
        ))}
        {currentPage === numOfPages && (
          <div>
            <button className="opacity-50 rounded-lg h-full w-full">
              <img
                className="opacity-80 rounded-lg h-full w-full "
                src="https://fairefac-assets.s3.us-east-2.amazonaws.com/add-car-icon.png"
                alt="Add Car"
              />
            </button>
          </div>
        )}

        {isModalOpen && (
          <CarDetail selectedCar={selectedCar} closeModal={closeModal} />
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
    </>
  );
}
