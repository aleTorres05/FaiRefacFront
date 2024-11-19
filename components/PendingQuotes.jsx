import { useState, useEffect, useMemo } from "react";
import QuoteToReview from "./QuoteToReview";
import RepairShopQuoteModal from "./RepairShopQuoteModal";
import clsx from "clsx";

export default function PendingQuotes({ quotes, setQuotes }) {
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const quotesPerPage = 6;

  const initialQuotes = useMemo(() => {
    return quotes?.filter((quote) => quote.status === "initial");
  }, [quotes]);

  const totalPages = Math.ceil(initialQuotes.length / quotesPerPage);

  const displayedQuotes = initialQuotes.slice(
    (currentPage - 1) * quotesPerPage,
    currentPage * quotesPerPage
  );

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  useEffect(() => {
    document.body.style.overflow = selectedQuote ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedQuote]);

  return displayedQuotes.length === 0 ? (
    <div className="flex flex-col items-center  text-white">
      <h2 className="text-base md:text-2xl font-chakra uppercase font-bold mb-4 p-8 lg:p-16">
        No tienes cotizaciones pendientes en este momento. Tan pronto como un
        cliente solicite una cotización, podrás gestionarla y enviar tu
        propuesta por aquí.
      </h2>
    </div>
  ) : (
    <main>
      <h2 className="font-chakra font-bold text-[24px] mb-4">
        COTIZACIONES PENDIENTES
      </h2>
      <ul>
        {displayedQuotes?.map((quote) => (
          <QuoteToReview
            key={quote._id}
            quote={quote}
            onClick={() => handleQuoteClick(quote)}
            isSelected={selectedQuote?._id === quote._id}
          />
        ))}
      </ul>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            onClick={() => handlePageChange(index + 1)}
            className={clsx(
              "border font-chakra border-[#D26528] mr-2 h-[100%] w-[9%] md:w-[10%] lg:w-[8%] xl:w-[5%] hover:bg-[#D26528]",
              currentPage === index + 1 ? "bg-[#D26528]" : "bg-black"
            )}
            key={index}
          >
            {index + 1}
          </button>
        ))}
      </div>
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
