import { useForm } from "react-hook-form"
import { useEffect } from "react";

export default function RepairShopItem({item, updateItemTotal }) {

    const { quantity, _id } = item
    
    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
        watch,
    } = useForm();
    
    const unitPrice = watch("unitPrice", 0);
    const itemTotalPrice = quantity * unitPrice

    useEffect(() => {
        updateItemTotal(_id, itemTotalPrice);
    }, [itemTotalPrice, _id, updateItemTotal]);
    
    return (
    <div className="border-b flex justify-between py-2">
        <div className="w-1/3">
          <p className="font-chakra">{item?.concept.toUpperCase()}</p>
          <div className="flex flex-col md:flex-row">
            <p className="font-mulish mr-2">Marca: </p>
            <input
            type="text"
            {...register("brand", { required: true })}
            className="w-full md:w-1/2 md:text-center border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
            />
          </div>
          <div className="sm:block md:hidden text-left mt-2 flex flex-row">
          <p className="font-chakra mr-1">$ </p>
          <input
            type="text"
            {...register("unitPrice", { required: true })}
            className="w-full md:w-1/2 md:text-center border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
            />
        </div>
        </div>
        <div className="md:w-1/4 font-chakra md:mt-6 xl:mt-3 text-center flex justify-center">
        <div className="flex flex-row justify-center">
        <p className="hidden text-center align-middle md:block">$ </p>
        <input
            type="text"
            {...register("unitPrice", { required: true })}
            className="hidden md:block w-full md:w-1/2 md:text-center border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528]"
            />
        </div>
        </div>
        <div className="w-1/2 md:w-1/4 text-center flex justify-center">
          <div className="flex ml-5 mt-8 md:mt-4 xl:mt-1 items-center justify-center border border-gray-700 h-10 w-10 font-chakra">
            {quantity}
          </div>
        </div>
        <div className="font-chakra w-1/2 md:w-1/4 flex flex-row items-center justify-end relative">
          <p className="lg:mr-2 xl:mr-14">$ {itemTotalPrice.toFixed(2)} </p>
          
        </div>
      </div>
    )
}