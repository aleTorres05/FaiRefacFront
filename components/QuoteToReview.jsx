import clsx from "clsx"


export default function QuoteToReview({quote, onClick, isSelected}) {
    return (
        <li 
        onClick={onClick}
        className={clsx("mb-4 p-4 cursor-pointer rounded-md",
            isSelected ? "bg-[#D26528]" : "bg-[#161616]"
        )}>
            <h3 className="font-semibold font-mulish text-lg">
                COTIZACIÓN {`${quote.car.brand} ${quote.car.model} ${quote.car.version} ${quote.car.year}`.toUpperCase()}
            </h3>
            <p className="font-mulish">
                {quote.items.map((item, index) => (
                    <span key={item._id}>
                        {item.quantity} {item.concept}{index < quote.items.length - 1 ? ", " : ""}
                    </span>
                ))}
            </p>
        </li>
    )
}