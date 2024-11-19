export default function SpinnerLoading() {
  return (
    <div className=" flex flex-row justify-center items-center h-screen w-full ">
      <img
        className="animate-spin  h-[20px] w-[20px] md:h-[40px] md:w-[40px] lg:h-[60px] lg:w-[60px] xl:h-[80px] xl:w-[80px]  mr-3 rounded-full"
        src="https://fairefac-assets.s3.us-east-2.amazonaws.com/meta-logo-FR.png"
        alt=""
      />
      <p className="font-chakra text-md md:text-lg lg:text-xl xl:text-3xl font-semibold">
        Cargando...
      </p>
    </div>
  );
}
