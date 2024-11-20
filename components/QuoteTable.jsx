import { deleteItemRepairShopQuote } from "@/pages/api/quote";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Item from "./Item";

export default function QuoteTable({
  quote,
  currencyFormatter,
  token,
  onQuoteRejected,
  closeModal,
}) {
  const [itemList, setItemList] = useState(quote.items);

  useEffect(() => {
    setItemList(quote.items);
  }, [quote.items]);

  async function handleDeleteItem(itemId) {
    try {
      const response = await deleteItemRepairShopQuote(
        quote._id,
        itemId,
        token
      );

      if (response?.success) {
        setItemList((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
        onQuoteRejected();
        closeModal();
        toast.success("Pieza eliminada correctamente");
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
      {itemList?.map((item, index) => (
        <Item
          currencyFormatter={currencyFormatter}
          key={item._id}
          item={item}
          itemListLength={itemList.length}
          onDelete={() => handleDeleteItem(item._id)}
        />
      ))}
    </div>
  );
}
