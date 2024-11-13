export default function Item({ item, onDelete }) {
  return (
    <div className="border-b flex justify-between py-2">
      <div className="w-1/3">
        <p className="font-chakra">{item?.concept.toUpperCase()}</p>
        <p className="font-mulish">Marca: {item?.brand}</p>
        <div className="sm:block md:hidden text-left mt-2">
          <p className="font-chakra">$ {item?.unitPrice?.toFixed(2)}</p>
        </div>
      </div>
      <div className="md:w-1/4 font-chakra md:mt-6 xl:mt-3 text-center flex justify-center">
        <p className="hidden md:block">$ {item?.unitPrice?.toFixed(2)}</p>
      </div>
      <div className="w-1/2 md:w-1/4 text-center flex justify-center">
        <div className="flex ml-5 mt-8 md:mt-4 xl:mt-1 items-center justify-center border border-gray-700 h-10 w-10 font-chakra">
          {item?.quantity}
        </div>
      </div>
      <div className="font-chakra w-1/2 md:w-1/4 flex flex-row items-center justify-end relative">
        <p className="lg:mr-2 xl:mr-14">
          $ {(item?.unitPrice * item?.quantity).toFixed(2)}
        </p>
        <img
          src="https://fairefac-assets.s3.us-east-2.amazonaws.com/Frame+65.png"
          alt="Eliminar"
          className="w-[20px] h-[20px] cursor-pointer"
          onClick={() => onDelete(item?._id)}
        />
      </div>
    </div>
  );
}
