import clsx from "clsx";

export default function DashboardButtons({ isSelected, handleButtonSelection, repairShop }) {
  return (
    <div className="bg-black col-start-1 col-end-13 p-3 sm:w-full h-fit md:p-2 md:col-start-1 md:col-end-5 lg:col-start-1 lg:col-end-4 xl:col-start-1 xl:col-end-4 2xl:col-start-1 2xl:col-end-4 rounded-2xl mt-2 md:h-screen lg:h-screen md:flex-col lg:mt-4 lg:p-3">
    <div>
      <div className="flex flex-row mb-1 md:flex-row lg:mb-10 justify-start lg:mr-3 ">
        <img
          className="lg:w-[80px] lg:h-[80px] h-[20%] w-[20%] md:h-[40%] md:w-[40%] rounded-full"
          src={repairShop?.profilePicture}
          alt="avatar"
        />
        <div className="flex flex-col mb-2 md:h-full md:flex-col justify-center xl:w-full 2xl:w-full xl:p-2 2xl:p-2">
          <h4 className="font-chakra font-bold lg:h-fit md:h-fit xl:text-[25px] 2xl:text-[25px] md:w-[100%] md:mb-2 uppercase xl:w-[full] 2xl:w-[full]">
            {repairShop?.companyName || "Nombre de la Refaccionaria"}
          </h4>
          <p className="font-mulish text-[10px] font-semibold lg:h-[15px] md:h-[20px] md:w-[100%] xl:text-[15px] 2xl:text-[15px] xl:w-[full] 2xl:w-[full]">
            {`${repairShop?.address?.street || "Calle"}, ${repairShop?.address?.extNum || "Número"} ${repairShop?.address?.intNum ? `Int. ${repairShop.address.intNum}` : ""}, ${repairShop?.address?.neighborhood || "Colonia"}, ${repairShop?.address?.zipCode || "Código Postal"}, ${repairShop?.address?.city || "Ciudad"}, ${repairShop?.address?.state || "Estado"}`}
          </p>
        </div>
      </div>
    </div>
    <div className="flex flex-row gap-9 md:gap-6 md:flex-col justify-center md:mt-4 md:items-center mb-2.5">
      <button
        onClick={() => handleButtonSelection("pendingQuotes")}
        className={clsx(
          "w-[50%] font-chakra leading-3 lg:leading-none text-xs md:text-[20px] lg:text-lg xl:text-[22px] 2xl:text-[25px] font-semibold lg:h-[50px] md:w-[80%] h-[30px] md:h-[40px] xl:w-[90%] 2xl:w-[90%] lg:w-[90%]",
          isSelected.pendingQuotes ? "bg-[#D26528] text-white" : "bg-white text-black"
        )}
      >
        COTIZACIONES PENDIENTES
      </button>
      <button
        onClick={() => handleButtonSelection("followUpPanel")}
        className={clsx(
          "w-[50%] font-chakra leading-3 lg:leading-none text-xs md:text-[20px] lg:text-lg xl:text-[22px] 2xl:text-[25px] font-semibold lg:h-[50px] md:w-[80%] h-[30px] md:h-[40px] xl:w-[90%] 2xl:w-[90%] lg:w-[90%]",
          isSelected.followUpPanel ? "bg-[#D26528] text-white" : "bg-white text-black"
        )}
      >
        PANEL DE SEGUIMIENTO
      </button>
    </div>
  </div>
  );
}
