import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { repairShopQuoteUpdateById } from "@/pages/api/repairShopQuote";
import RepairShopItem from "./RepairShopItem";

export default function RepairShopQuoteTable({ items, quoteId, closeModal, onUpdateQuote }) {
  const { 
    handleSubmit,
    watch,
    control,
    formState: { errors },
   } = useForm();

  const [itemTotals, setItemTotals] = useState({});
  const token = localStorage.getItem("token");

  const onSubmit = async (data) => {
    try {
      const updatedItems = items.map((item) => ({
        _id: item._id,
        unitPrice: parseFloat(data[`unitPrice-${item._id}`]),
        brand: data[`brand-${item._id}`],
      }));

      const response = await repairShopQuoteUpdateById(
        quoteId,
        token,
        updatedItems
      );
      onUpdateQuote(response.data?.updatedQuote);
      toast.success("Cotización enviada con éxito");
      closeModal();
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  const total = Object.values(itemTotals).reduce((acc, curr) => acc + curr, 0);
  const subtotal = total - total * 0.16 || 0;
  const iva = total * 0.16;

  const updateItemTotal = (i, totalPrice) => {
    setItemTotals((prevTotals) => ({
      ...prevTotals,
      [i]: totalPrice,
    }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="quote-table">
        <div className="flex justify-between bg-[#D26528] text-center py-2">
          <div className="w-1/3">Refacción</div>
          <div className="hidden md:block w-1/4">Precio unitario</div>
          <div className="w-1/4">Cantidad</div>
          <div className="w-1/4 relative">Subtotal</div>
        </div>

        {items.map((item) => (
          <RepairShopItem
            key={item._id}
            item={item}
            updateItemTotal={updateItemTotal}
            control={control}
            errors={errors}
          />
        ))}

        <div className="p-8 flex bg-[#302F2F]">
          <div className="min-w-52 md:min-w-80 lg:w-[400px] mx-auto">
            <div className="border-b border-[#343434] flex justify-between py-2">
              <div className="flex justify-start">
                <p className="font-chakra">SUBTOTAL</p>
              </div>
              <div className="flex justify-end">
                <p className="font-chakra">$ {subtotal.toFixed(2) || 0}</p>
              </div>
            </div>

            <div className="border-b border-[#343434] flex justify-between py-2">
              <div className="flex justify-start">
                <p className="font-chakra">IVA</p>
              </div>
              <div className="flex justify-end">
                <p className="font-chakra">$ {iva.toFixed(2) || 0}</p>
              </div>
            </div>

            <div className="flex justify-between py-2">
              <div className="flex justify-start">
                <p className="font-chakra">TOTAL</p>
              </div>
              <div className="flex justify-end">
                <p className="font-chakra">$ {total.toFixed(2) || 0}</p>
              </div>
            </div>

            <div className="text-center py-4">
              <button type="submit" className="bg-[#150801] hover:bg-[#D26528] text-white px-4 py-2 font-chakra rounded">
                ENVIAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
