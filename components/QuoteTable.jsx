import Item from "./Item";  // Asegúrate de importar el componente Item correctamente

export default function QuoteTable({ quote, onDeleteItem }) {
  

  return (
    <div className="quote-table">
      <div className="flex justify-between bg-[#D26528] text-center py-2">
        <div className="w-1/3">Refacción</div>
        <div className="hidden md:block w-1/4">Precio</div>
        <div className="w-1/4">Cantidad</div>
        <div className="w-1/4 relative">Subtotal</div>
      </div>
      
      {/* Items */}
      {quote.items.map((item) => (
        <Item 
          key={item._id} 
          item={item} 
          onDelete={() => onDeleteItem(item._id)} 
        />
      ))}
      
      <div className="p-8 flex bg-[#302F2F]">
        <div className="min-w-52 md:min-w-80 lg:w-[400px] mx-auto">
          <div className="border-b border-[#343434] flex justify-between py-2">
            <div className="flex justify-start">
              <p className="font-chakra">ENTREGA</p>
            </div>
            <div className="flex justify-end">
              <p className="font-chakra">GRATIS</p>
            </div>
          </div>

          <div className="border-b border-[#343434] flex justify-between py-2">
            <div className="flex justify-start">
              <p className="font-chakra">SUBTOTAL</p>
            </div>
            <div className="flex justify-end">
              <p className="font-chakra">
                $ {(quote.totalPrice - quote.totalPrice * 0.16).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="border-b border-[#343434] flex justify-between py-2">
            <div className="flex justify-start">
              <p className="font-chakra">IVA</p>
            </div>
            <div className="flex justify-end">
              <p className="font-chakra">
                $ {(quote.totalPrice * 0.16).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex justify-between py-2">
            <div className="flex justify-start">
              <p className="font-chakra">TOTAL</p>
            </div>
            <div className="flex justify-end">
              <p className="font-chakra">$ {quote.totalPrice.toFixed(2)}</p>
            </div>
          </div>

          <div className="text-center py-4">
            <button className="bg-[#150801] text-white px-4 py-2 font-chakra rounded">
              PAGAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

