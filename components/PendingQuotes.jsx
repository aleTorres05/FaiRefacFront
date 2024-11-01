import { useState, useEffect, useMemo } from "react";
import QuoteToReview from "./QuoteToReview";
import RepairShopQuoteModal from "./RepairShopQuoteModal";

export default function PendingQuotes({ quotes, setQuotes }) {
  const [selectedQuote, setSelectedQuote] = useState(null);

  const initialQuotes = useMemo(() => {
    return quotes?.filter((quote) => quote.status === "initial");
  }, [quotes]);

  const handleQuoteClick = (quote) => {
    setSelectedQuote(quote);
  };

  const closeModal = () => {
    setSelectedQuote(null);
  };

  const updateQuotes = (updatedQuote) => {
    setQuotes((quotes) =>
      quotes.filter((quote) => quote._id !== updatedQuote?._id)
    );
  };

  useEffect(() => {
    document.body.style.overflow = selectedQuote ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedQuote]);

  return (
    <main>
      <h2 className="font-chakra font-bold text-[24px] mb-4">
        COTIZACIONES PENDIENTES
      </h2>
      <ul>
        {initialQuotes?.map((quote) => (
          <QuoteToReview
            key={quote._id}
            quote={quote}
            onClick={() => handleQuoteClick(quote)}
            isSelected={selectedQuote?._id === quote._id}
          />
        ))}
      </ul>
      {selectedQuote && (
        <RepairShopQuoteModal
          selectedQuote={selectedQuote}
          closeModal={closeModal}
          onUpdateQuote={updateQuotes}
        />
      )}
      
    </main>
  );
}
