export default function QuotesList({ quotes, selectedQuoteIndex, handleQuoteChange }) {
    return (
      <div className="quote-list">
        <ul className="space-y-2">
          {quotes.map((quote, index) => (
            <li
              key={quote._id}
              className={`p-4 cursor-pointer rounded-md text-center ${
                selectedQuoteIndex === index ? 'bg-[#D26528] text-white' : 'bg-[#161616]'
              }`}
              onClick={() => handleQuoteChange(index)}
            >
              <div className="font-bold font-chakra">COTIZACIÓN {index + 1}</div>
              <div className="font-bold font-chakra">PRECIO TOTAL: $ {quote.totalPrice.toFixed(2)}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }