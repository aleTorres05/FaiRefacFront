import { deleteItemRepairShopQuote } from "@/pages/api/quote";
import { useState } from "react";
import { toast } from "sonner";
import Item from "./Item";

export default function QuoteTable({
  quote,
  onQuoteRejected,
  repairShopQuoteID,
  token,
}) {
  const [itemList, setItemList] = useState(quote.items);

  async function handleDeleteItem(itemId) {
    try {
      const response = await deleteItemRepairShopQuote(
        repairShopQuoteID,
        itemId,
        token
      );
      console.log(response);
      if (response?.success) {
        onQuoteRejected();
        setItemList((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
      } else {
        toast.error("Error al Eliminar Pieza:", response.error);
      }
    } catch (error) {
      toast.error("Error al Eliminar Pieza:", error);
    }
  }
  return (
    <div className="quote-table">
      <div className="flex justify-between bg-[#D26528] text-center py-2">
        <div className="w-1/3">Refacción</div>
        <div className="hidden md:block w-1/4">Precio</div>
        <div className="w-1/4">Cantidad</div>
        <div className="w-1/4 relative">Subtotal</div>
      </div>

      {/* Items */}
      {itemList?.map((item) => (
        <Item
          key={item._id}
          item={item}
          onDelete={() => handleDeleteItem(item._id)}
        />
      ))}
    </div>
  );
}
