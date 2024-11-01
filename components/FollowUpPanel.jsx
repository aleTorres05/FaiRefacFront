import { useState } from "react";

export default function FollowUpPanel({ repairShop }) {
    const [quotes, setQuotes] = useState(repairShop?.quotes || []);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const totalPages = Math.ceil(quotes.length / rowsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const displayedQuotes = quotes.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div className="overflow-x-auto w-full bg-[#161616]">
            <table className="min-w-full text-center border border-[#282525]">
                <thead className="border-b border-[#282525]">
                    <tr className="border-b border-[#282525]">
                        <th className="border-r border-[#282525]">Cotización</th>
                        <th className="border-r border-[#282525]">Taller</th>
                        <th className="border-r border-[#282525]">Teléfono</th>
                        <th className="border-r border-[#282525]">Status</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedQuotes.map((quote) => (
                        <tr key={quote._id} className="border-b border-[#282525]">
                            <td className="border-r border-[#282525]">
                                <p>{quote.mechanic.firstName} {quote.mechanic.lastName}</p>
                                <p>
                                    {quote.items.map((item, index) => (
                                        <span key={item._id}>
                                            {item.quantity} {item.concept}
                                            {index < quote.items.length - 1 ? ", " : ""}
                                        </span>
                                    ))}
                                </p>
                            </td>
                            <td className="border-r border-[#282525]">
                                <p>{quote.mechanic.workshopName}</p>
                            </td>
                            <td className="border-r border-[#282525]">
                                <p>{quote.mechanic.phoneNumber}</p>
                            </td>
                            <td className="border-r border-[#282525]">
                                <p>{quote.status}</p>
                            </td>
                            <td>
                                <button className="bg-[#D26528] text-white px-2 py-1 rounded">
                                    {quote.status === "initial" ? "Enviar" : "Entregado"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center space-x-2 mt-4">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Anterior
                </button>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Siguiente
                </button>
            </div>
        </div>
    );
}

