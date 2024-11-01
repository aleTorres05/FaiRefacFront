import RepairShopQuoteTable from "./RepairShopQuoteTable";
export default function RepairShopQuoteModal({ selectedQuote, closeModal, onUpdateQuote }) {
    const { mechanic, items, _id } = selectedQuote
  return (
    <div 
    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
    onClick={(e) => e.target === e.currentTarget && closeModal()}>
      <div className="relative mt-51 md:mt-4 bg-[#161616] p-8 w-full md:w-3/4 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
        <img
          src={
            "https://fairefac-assets.s3.us-east-2.amazonaws.com/Close-orange.png"
          }
          alt="Cerrar"
          className="absolute top-4 right-4 cursor-pointer w-6 h-6"
          onClick={closeModal}
        />
        <h3 className="font-chakra font-bold text-[24px]">
          COTIZACIÓN{" "}
          {`${selectedQuote?.car.brand} ${selectedQuote?.car.model} ${selectedQuote?.car.version} ${selectedQuote?.car.year}`.toUpperCase()}
        </h3>
        <p className="font-mulish text-[20px] mb-4">Taller: {`${mechanic.workshopName}, dudas llamar a ${mechanic.firstName} ${mechanic.lastName} Tel. ${mechanic.phoneNumber}`}</p>
        <RepairShopQuoteTable 
        items={items} 
        quoteId={_id}
        closeModal={closeModal}
        onUpdateQuote={onUpdateQuote}/>
      </div>
    </div>
  );
}
