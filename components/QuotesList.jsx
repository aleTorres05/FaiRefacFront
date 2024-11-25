import { useEffect, useState } from "react";
import { rejectQuote } from "@/pages/api/quote";
import { toast } from "sonner";

export default function QuotesList({
  quotes,
  carQuoteId,
  selectedQuoteIdx,
  handleQuoteChange,
  onQuoteRejected,
  currencyFormatter,
}) {
  const [quoteList, setQuoteList] = useState(quotes);

  useEffect(() => {
    setQuoteList(quotes); // Sync initial quotes prop to local state
  }, [quotes]);

  async function handleChangeStatus(repairShopQuoteId) {
    try {
      const token = localStorage.getItem("token");
      const response = await rejectQuote(carQuoteId, repairShopQuoteId, token);

      if (response?.success) {
        setQuoteList((prevQuotes) =>
          prevQuotes.filter((quote) => quote._id !== repairShopQuoteId)
        );
        onQuoteRejected();

        toast.success("Cotización Eliminada Correctamente");
      } else {
        toast.error("Error al Emilinar Cotización:", response.error);
      }
    } catch (error) {
      toast.error("Error al Emilinar Cotización:", error);
    }
  }

  return (
    <div className="quote-list mb-8 mt-2">
      <ul className="space-y-2">
        {quoteList.map((quote, index) => (
          <div className="flex flex-row w-full " key={index}>
            <li
              className={`p-4 cursor-pointer rounded-md text-center flex flex-row w-[95%] ${
                selectedQuoteIdx === index
                  ? "bg-[#D26528] text-white"
                  : "bg-[#161616]"
              }`}
              onClick={() => handleQuoteChange(quote, index)}
            >
              <div className="font-bold font-chakra w-1/2">
                <p className="justify-self-start">COTIZACIÓN {index + 1}</p>
              </div>
              <div className="font-bold font-chakra w-1/2 ">
                <p className="justify-self-start">
                  PRECIO TOTAL:{" "}
                  {currencyFormatter.format(
                    quote.items?.reduce(
                      (acc, item) => acc + item.itemTotalPrice,
                      0
                    ) || 0
                  )}
                </p>
              </div>
            </li>
            <div className="justify-items-center ml-1 w-[5%]">
              <button
                onClick={() => handleChangeStatus(quote._id)}
                className="justify-self-center w-full h-full bg-[#D26528] justify-center"
              >
                <img
                  src="https://fairefac-assets.s3.us-east-2.amazonaws.com/Frame+65.png"
                  alt="Eliminar"
                  className="w-[35px] h-[35px] cursor-pointer justify-self-center "
                />
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
