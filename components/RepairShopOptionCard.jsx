export default function RepairShopOptionCard() {
  const panelOptions = [
    {
      image:
        "https://acnews.blob.core.windows.net/imgnews/large/NAZ_68778115360b49c0858a0f0bde1e74bb.jpg",
      name: "Hola Refaccionaria FaiRefac",
    },
    {
      image:
        "https://www.excelenciasdelmotor.com/sites/default/files/u7/Seat-Leon-729x486-c44abb6e2a3f69a9.jpg",
      name: "Total de Cotizaciones: 420",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Tesla_Model_3_%282023%29_Autofr%C3%BChling_Ulm_IMG_9282.jpg/640px-Tesla_Model_3_%282023%29_Autofr%C3%BChling_Ulm_IMG_9282.jpg",
      name: "Resumen de Ventas del Día",
    },
    {
      image:
        "https://autodealerluna.mx/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-03-at-3.27.12-PM.jpeg",
      name: "Ventas Mensuales Destacadas:",
    },
  ];

  return (
    <>
      <div className="flex flex-col md:grid md:grid-cols-2">
        {panelOptions.map((option, idx) => {
          return (
            <div
              key={`option-${idx}`}
              className="relative w-full sm:h-[220px] mb-3 rounded-lg md:p-2 lg:p-2 lg:h-[100%] xl:h-[100%] 2xl:h-[100%]"
              id={`option-${idx}`}
            >
              <img
                className=" opacity-50 rounded-lg h-fit sm:h-full w-full"
                src={option.image}
                alt="option"
              />
              <p className=" font-chakra w-[70%] font-bold absolute bottom-2 left-2 sm:bottom-3 border-t-2 border-[#D16527] sm:left-3 md:text-md lg:text-xl lg:left-4 lg:bottom-6 xl:h-[10%] xl:w-fit xl:text-2xl xl:font-semibold xl:border-t-4 xl:left-7">
                {option.name}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
