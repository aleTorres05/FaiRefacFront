import { getUserByEmail } from "@/pages/api/user";
import { useEffect, useState } from "react";
import Header from "./Header";
import clsx from "clsx";
import ClientCar from "./ClientCar";
import ClientQuotes from "./ClientQuotes";

export default function ClientDashboard() {
  const [isSelected, setIsSelected] = useState({
    coches: true,
    cotizaciones: false,
  });

  const handleButtonSelection = (option) => {
    setIsSelected({
      coches: option === "coches",
      cotizaciones: option === "cotizaciones",
    });
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (!token || !email) {
      toast.error("Es necesario iniciar sesión para acceder a esta página.");
      router.push("/login");
    } else {
      getUserByEmail(email, token)
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          toast.error(error.message || "Ocurrió un error inesperado");
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          router.push("/login");
        });
    }
  }, []);

  return (
    <>
      <main className=" mt-[18px] mx-[32px] grid lg:grid-cols-12 md:grid-cols-12  ">
        <Header />
        <div className="bg-black col-start-1 col-end-12 h-fit md:p-2 lg:col-start-1 lg:col-end-5 md:col-start-1 md:col-end-5 p-2 rounded-2xl mt-2 md:h-screen lg:h-full  md:flex-col lg:mt-4 lg:p-3 xl:col-start-1 xl:col-end-4 2xl:col-start-1 2xl:col-end-4 ">
          <div>
            <div className="flex flex-row mb-1 md:flex-row lg:mb-10 justify-start lg:mr-3 ">
              <img
                className="mr-3 lg:w-[80px] lg:h-[80px] h-[20%] w-[20%] md:h-[40%] md:w-[40%] rounded-full"
                src={user.client?.profilePicture}
                alt="avatar"
              />
              <div className="flex flex-col flex-wrap md:justify-center md:flex-col justify-center xl:w-full  2xl:w-full xl:p-2 2xl:p-2">
                <h4 className="font-chakra font-bold lg:h-[24px] md:h-[20px] md:text-[12px] lg:text-[17px] xl 2xl:text-[25px] md:w-[100%] md:mb-2 uppercase  xl:w-[full] 2xl:w-[full]">
                  {`${user.client?.firstName} ${user.client?.lastName}`}
                </h4>
                <p className="font-mulish text-[10px] font-semibold lg:h-[15px] md:h-[20px] md:w-[100%] xl:text-[15px] 2xl:text-[15px] xl:w-[full] 2xl:w-[full]">
                  Calle 213 av. kodemia
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-9 md:gap-6 md:flex-col justify-center md:mt-4 md:items-center  mb-2.5">
            <button
              onClick={() => handleButtonSelection("coches")}
              className={clsx(
                "lg:w-[90%] font-chakra xl:text-[25px]  2xl:text-[25px] font-semibold lg:h-[50px] md:w-[80%] w-[35%] h-[30px]  md:h-[40px]  xl:w-[90%] 2xl:w-[90%]",
                isSelected.coches
                  ? "bg-[#D26528] text-white"
                  : "bg-white text-black"
              )}
            >
              Coches
            </button>
            <button
              onClick={() => handleButtonSelection("cotizaciones")}
              className={clsx(
                "lg:w-[90%] font-chakra text-[12px] xl:text-[25px] 2xl:text-[25px] font-semibold lg:h-[50px] md:w-[80%] w-[35%] h-[30px]  md:h-[40px]  xl:w-[90%] 2xl:w-[90%]",
                isSelected.cotizaciones
                  ? "bg-[#D26528] text-white"
                  : "bg-white text-black"
              )}
            >
              Cotizaciones
            </button>
          </div>
        </div>
        <div className="bg-black h-fit col-start-1 col-end-13 md:p-2 p-3.5 lg:col-start-5 lg:col-end-13 md:col-start-5 md:col-end-13 md:ml-4 rounded-2xl mt-2 md:h-fit lg:h-fit  md:flex-col  lg:mt-4 lg:p-3  xl:col-start-4 xl:col-end-13 2xl:col-start-4 2xl:col-end-13 xl:p-7">
          {isSelected.coches && <ClientCar />}
          {isSelected.cotizaciones && (
            <ClientQuotes carsList={user.client?.cars} />
          )}
        </div>
      </main>
    </>
  );
}
