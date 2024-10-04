export default function RepairShopOptionCard() {
  const panelOptions = [
    {
      image:
        "https://fairefac-assets.s3.us-east-2.amazonaws.com/repairshop-2.webp",
      name: "Hola Refaccionaria FaiRefac",
    },
    {
      image:
        "https://fairefac-assets.s3.us-east-2.amazonaws.com/show-quotes.png",
      name: "Total de Cotizaciones: 420",
    },
    {
      image: "https://fairefac-assets.s3.us-east-2.amazonaws.com/sales.png",
      name: "Resumen de Ventas del Día",
    },
    {
      image:
        "https://fairefac-assets.s3.us-east-2.amazonaws.com/month-sales.png",
      name: "Ventas Mensuales Destacadas:",
    },
    {
      image: "https://fairefac-assets.s3.us-east-2.amazonaws.com/quotes.png",
      name: "Ventas Mensuales Destacadas:",
    },
  ];

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {panelOptions.slice(0, 2).map((option, idx) => {
            return (
              <div
                key={`option-top-${idx}`}
                className="relative w-full h-[30vh] p-2 mb-3 rounded-lg md:p-2 lg:p-2 lg:h-[30vh] xl:h-[30vh] 2xl:h-[30vh] bg-cover bg-center flex items-end"
                style={{ backgroundImage: `url(${option.image})` }}
                id={`option-top-${idx}`}
              >
                <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
                <p className="font-chakra z-10 w-[70%] font-bold p-2 text-white border-t-2 border-[#D16527] sm:left-3 md:text-md lg:text-xl xl:text-2xl xl:font-semibold xl:border-t-4">
                  {option.name}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
          {panelOptions.slice(2).map((option, idx) => {
            return (
              <div
                key={`option-bottom-${idx}`}
                className="relative w-full h-[30vh] p-2 mb-3 rounded-lg md:p-2 lg:p-2 lg:h-[30vh] xl:h-[30vh] 2xl:h-[30vh] bg-cover bg-center flex items-end "
                style={{ backgroundImage: `url(${option.image})` }}
                id={`option-bottom-${idx}`}
              >
                <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
                <p className="font-chakra z-10 w-[70%] font-bold p-2 text-white border-t-2 border-[#D16527] sm:left-3 md:text-md lg:text-xl xl:text-2xl xl:font-semibold xl:border-t-4">
                  {option.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
