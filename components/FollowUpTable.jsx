import clsx from "clsx"; 

export default function FollowUpTable({ quotes, onQuoteClick, statusFilter, onStatusFilterChange }) {

    function getStatusStyle(status) {
        switch (status) {
          case 'initial':
            return { text: 'Pendiente', colorClass: 'bg-orange-500 text-white' };
          case 'review':
            return { text: 'Cotizada', colorClass: 'bg-yellow-500 text-white' };
          case 'paid':
            return { text: 'Pagada', colorClass: 'bg-green-500 text-white' };
          case 'rejected':
            return { text: 'Rechazada', colorClass: 'bg-red-500 text-white' };
          case 'sent':
            return { text: 'Enviada', colorClass: 'bg-blue-500 text-white' };
          case 'delivered':
            return { text: 'Entregado', colorClass: 'bg-purple-500 text-white' };
          default:
            return { text: 'Desconocido', colorClass: 'bg-gray-500 text-white' };
        }
      }


    return (
      <div className="min-w-full font-mulish border border-[#282525]">
        <div className="flex border-b  border-[#282525] font-bold">
          <div className="flex-1 border-r font-chakra border-[#282525] py-2">COTIZACIÓN DE:</div>
          
          <div className="flex-1 border-r hidden md:block font-chakra border-[#282525] py-2">TELÉFONO</div>
          <div className="flex-1 border-r text-center font-chakra border-[#282525] py-2">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="bg-[#161616] text-white border border-[#282525] rounded px-2 py-1"
          >
            <option value="">STATUS</option>
            <option value="initial">PENDIENTE</option>
            <option value="review">COTIZADA</option>
            <option value="paid">PAGADA</option>
            <option value="rejected">RECHAZADA</option>
            <option value="sent">ENVIADA</option>
            <option value="delivered">ENTREGADO</option>
          </select>
        </div>
        </div>
        {quotes.map((quote) => {
        const { text, colorClass } = getStatusStyle(quote.status);
        return (
          <div
            key={quote._id}
            className="flex border-b border-[#282525] py-2 cursor-pointer"
            onClick={() => onQuoteClick(quote)}
          >
            <div className="flex-1 border-r border-[#282525] px-2">
              <p>{quote.mechanic.firstName} {quote.mechanic.lastName}</p>
              <p>{quote.mechanic.workshopName}</p>
            </div>
            
            <div className="flex-1 border-r hidden md:block border-[#282525] px-2">
              <p>{quote.mechanic.phoneNumber}</p>
            </div>
            <div className="flex-1 text-center px-2">
              <span className={clsx("px-2 py-1 min-w-24 bg-opacity-75 rounded-full text-xs", colorClass)}>
                {text}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}