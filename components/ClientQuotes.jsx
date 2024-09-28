import { useState, useEffect } from "react";
import QuoteTable from "@/components/QuoteTable";
import QuotesList from "@/components/QuotesList";


const initialQuotes = [
    {
      items: [
        {
          concept: "Amortiguadores delanteros",
          quantity: 2,
          brand: "KyB",
          unitPrice: 1300,
          _id: "66e6dabdd708e9213ac1e254",
        },
        {
          concept: "Bases de amortiguador",
          quantity: 2,
          brand: "DAI",
          unitPrice: 500,
          _id: "66e6dabdd708e9213ac1e255",
        },
      ],
      totalPrice: 3600,
      _id: "66e6dabdd708e9213ac1e378",
    },
    {
      items: [
        {
          concept: "Pastillas de freno",
          quantity: 4,
          brand: "Brembo",
          unitPrice: 800,
          _id: "66e6dabdd708e9213ac1e256",
        },
        {
          concept: "Discos de freno",
          quantity: 2,
          brand: "Brembo",
          unitPrice: 1200,
          _id: "66e6dabdd708e9213ac1e257",
        },
      ],
      totalPrice: 4000,
      _id: "66e6dabdd708e9213ac1e379",
    },
    {
      items: [
        {
          concept: "Filtro de aire",
          quantity: 1,
          brand: "Mann Filter",
          unitPrice: 300,
          _id: "66e6dabdd708e9213ac1e258",
        },
        {
          concept: "Aceite sintético 5W30",
          quantity: 5,
          brand: "Castrol",
          unitPrice: 900,
          _id: "66e6dabdd708e9213ac1e259",
        },
      ],
      totalPrice: 4800,
      _id: "66e6dabdd708e9213ac1e380",
    },
    {
      items: [
        {
          concept: "Batería",
          quantity: 1,
          brand: "LTH",
          unitPrice: 3200,
          _id: "66e6dabdd708e9213ac1e260",
        },
        {
          concept: "Terminales de batería",
          quantity: 2,
          brand: "Bosch",
          unitPrice: 150,
          _id: "66e6dabdd708e9213ac1e261",
        },
      ],
      totalPrice: 3500,
      _id: "66e6dabdd708e9213ac1e381",
    },
    {
      items: [
        {
          concept: "Llanta 195/65 R15",
          quantity: 4,
          brand: "Michelin",
          unitPrice: 2200,
          _id: "66e6dabdd708e9213ac1e262",
        },
      ],
      totalPrice: 8800,
      _id: "66e6dabdd708e9213ac1e382",
    },
    {
      items: [
        {
          concept: "Amortiguadores traseros",
          quantity: 2,
          brand: "Monroe",
          unitPrice: 1400,
          _id: "66e6dabdd708e9213ac1e263",
        },
        {
          concept: "Mangueras de freno",
          quantity: 2,
          brand: "Continental",
          unitPrice: 450,
          _id: "66e6dabdd708e9213ac1e264",
        },
      ],
      totalPrice: 3700,
      _id: "66e6dabdd708e9213ac1e383",
    },
  ];

  export default function ClientQuotes() {
    const [quotes, setQuotes] = useState(initialQuotes);
    const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isModalOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
    
        return () => {
          document.body.style.overflow = "";
        };
      }, [isModalOpen]);
  
    const handleQuoteChange = (index) => {
      setSelectedQuoteIndex(index);
      setIsModalOpen(true);
    };
  
    const handleDeleteItem = (itemId) => {
      const updatedQuotes = quotes.map((quote, index) => {
        if (index === selectedQuoteIndex) {
          const updatedItems = quote.items.filter(item => item._id !== itemId);
          const updatedTotalPrice = updatedItems.reduce(
            (acc, item) => acc + item.unitPrice * item.quantity,
            0
          );
          return { ...quote, items: updatedItems, totalPrice: updatedTotalPrice };
        }
        return quote;
      });
      setQuotes(updatedQuotes);
    };

    const closeModal = () => {
        setIsModalOpen(false); 
      };
  
    return (
        <div>
      <h2 className="font-chakra font-bold text-[24px] mt-8 mb-4">COTIZACIONES A ELEGIR</h2>
      <QuotesList
        quotes={quotes}
        selectedQuoteIndex={selectedQuoteIndex}
        handleQuoteChange={handleQuoteChange}
      />

      <div className={`${isModalOpen ? 'blur-sm' : ''}`}>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative mt-51 md:mt-4 bg-[#161616] p-8 w-full md:w-3/4 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
            {/* Icono de cerrar */}
            <img
              src={"https://fairefac-assets.s3.us-east-2.amazonaws.com/Close-orange.png"}
              alt="Cerrar"
              className="absolute top-4 right-4 cursor-pointer w-6 h-6"
              onClick={closeModal}
            />
            <h2 className="font-chakra font-bold text-[24px] mb-4">COTIZACION SELECCIONADA</h2>
            <QuoteTable quote={quotes[selectedQuoteIndex]} onDeleteItem={handleDeleteItem} />
          </div>
        </div>
      )}
    </div>
    );
  }