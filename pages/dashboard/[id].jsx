import Header from "@/components/Header";
import clsx from "clsx";
import { useEffect, useState } from "react";
import ClientCar from "@/components/ClientCar";
import ClientQuotes from "@/components/ClientQuotes";
import { getByID } from "../api/user";
import { useRouter } from "next/router";
import { Toaster, toast } from "sonner";

export default function UserDashboard() {
  const router = useRouter();

  const { id } = router.query;
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (id) {
      console.log("este es un id", id);
      getByID(id, token)
        .then((user) => {
          setUser(user);
          console.log(user);
        })
        .catch((e) => {
          //toast and send back to login
          toast.error("Wrong password or Username");
          router.push("/login");
          console.log(e);
        });
    }
  }, [id]);

  return (
    <>
      <Toaster position="top-center" />
      {user.isClient && (
        <main className=" mt-[18px] mx-[32px] grid lg:grid-cols-12 md:grid-cols-12  ">
          <Header />
          <div className="bg-black w-full h-fit md:p-2 lg:col-start-1 lg:col-end-5 md:col-start-1 md:col-end-5 p-2 rounded-2xl mt-2 md:h-screen lg:h-full  md:flex-col lg:mt-4 lg:p-3 xl:col-start-1 xl:col-end-4 2xl:col-start-1 2xl:col-end-4 ">
            <div>
              <div className="flex flex-row mb-1 md:flex-row lg:mb-10 justify-start lg:mr-3 ">
                <img
                  className="lg:w-[80px] lg:h-[80px] h-[20%] w-[20%] md:h-[40%] md:w-[40%] rounded-full"
                  src="https://api.dicebear.com/9.x/adventurer/svg?seed=Mackenzie"
                  alt="avatar"
                />
                <div className="flex flex-col md:justify-center md:flex-col justify-center xl:w-full  2xl:w-full xl:p-2 2xl:p-2">
                  <h4 className="font-chakra font-bold lg:h-[24px] md:h-[20px] xl:text-[25px] 2xl:text-[25px] md:w-[100%] md:mb-2 uppercase  xl:w-[full] 2xl:w-[full]">
                    Juan Perez
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
                  "lg:w-[90%] font-chakra  xl:text-[25px] 2xl:text-[25px] font-semibold lg:h-[50px] md:w-[80%] w-[35%] h-[30px]  md:h-[40px]  xl:w-[90%] 2xl:w-[90%]",
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
            {isSelected.cotizaciones && <ClientQuotes />}
          </div>
        </main>
      )}
      {user.isRepairshop && (
        <main className=" mt-[18px] mx-[32px] flex flex-col gap-4">
          <Header />
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-12 gap-0 p-3 md:p-0">
            <div className="bg-black col-start-1 col-end-13 p-3 sm:w-full h-fit md:p-2 md:col-start-1 md:col-end-5 lg:col-start-1 lg:col-end-4 xl:col-start-1 xl:col-end-4 2xl:col-start-1 2xl:col-end-4 rounded-2xl mt-2 md:h-screen lg:h-screen md:flex-col lg:mt-4 lg:p-3">
              <div>
                <div className="flex flex-row mb-1 md:flex-row lg:mb-10 justify-start lg:mr-3 ">
                  <img
                    className="lg:w-[80px] lg:h-[80px] h-[20%] w-[20%] md:h-[40%] md:w-[40%] rounded-full"
                    src="https://api.dicebear.com/9.x/adventurer/svg?seed=Mackenzie"
                    alt="avatar"
                  />
                  <div className="flex flex-col mb-2 md:h-full md:flex-col justify-center xl:w-full  2xl:w-full xl:p-2 2xl:p-2">
                    <h4 className="font-chakra font-bold lg:h-fit md:h-fit xl:text-[25px] 2xl:text-[25px] md:w-[100%] md:mb-2 uppercase  xl:w-[full] 2xl:w-[full]">
                      Refaccionaria FaiRefac
                    </h4>
                    <p className="font-mulish text-[10px] font-semibold lg:h-[15px] md:h-[20px] md:w-[100%] xl:text-[15px] 2xl:text-[15px] xl:w-[full] 2xl:w-[full]">
                      Calle 213 av. kodemia
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-9 md:gap-6 md:flex-col justify-center md:mt-4 md:items-center  mb-2.5">
                <button
                  onClick={() => handleButtonSelection("inicio")}
                  className={clsx(
                    " w-[50%] font-chakra text-xs md:text-[20px] lg:text-xl lg:w-[90%] xl:text-[25px]  2xl:text-[25px] font-semibold lg:h-[50px] md:w-[80%] h-[30px]  md:h-[40px]  xl:w-[90%] 2xl:w-[90%]",
                    isSelected.inicio
                      ? "bg-[#D26528] text-white"
                      : "bg-white text-black"
                  )}
                >
                  Inicio
                </button>
                <button
                  onClick={() => handleButtonSelection("panelCotizaciones")}
                  className={clsx(
                    " w-[50%] font-chakra leading-3 lg:leading-none text-xs md:text-[20px] lg:text-lg  xl:text-[22px] 2xl:text-[25px] font-semibold lg:h-[50px] md:w-[80%] h-[30px]  md:h-[40px]  xl:w-[90%] 2xl:w-[90%] lg:w-[90%]",
                    isSelected.panelCotizaciones
                      ? "bg-[#D26528] text-white"
                      : "bg-white text-black"
                  )}
                >
                  Panel de <br />
                  Cotizaciones
                </button>
              </div>
            </div>
            <div className="bg-black h-full col-start-1 col-end-13 md:p-2 p-4 lg:col-start-4 lg:col-end-13 md:col-start-5 md:col-end-13 md:ml-4 rounded-2xl mt-2 md:h-fit lg:h-fit  md:flex-col  lg:mt-4 lg:p-8  xl:col-start-4 xl:col-end-13 2xl:col-start-4 2xl:col-end-13 xl:p-7">
              {isSelected.inicio && <RepairShopOption />}
              {isSelected.panelCotizaciones && <Quote />}
            </div>
          </div>
        </main>
      )}
    </>
  );
}
