import { useState } from "react";
import { useRouter } from "next/router";
import MechanicForm from "@/components/MechanicForm";

export default function QuoteForm() {
  const router = useRouter();
  const [isMechanicFormOpen, setIsMechanicFormOpen] = useState(false);
  const [mechanics, setMechanics] = useState([
    {
        firstName: "Eduardo",
        lastName: "Valdez",
        workshopName: "Speed Pro",
        phoneNumber: "5545641201",
        address: {
          street: "Av. Siempre Viva",
          extNum: "123",
          intNum: "A",
          neighborhood: "Centro",
          zipCode: "08100",
          city: "Ciudad de México",
          state: "CDMX",
          _id: "66e6c4ba6412f327751b6a66"
        },
        _id: "66e6c4ba6412f327751b6a65",
        __v: 0
      },
      {
        firstName: "Mario",
        lastName: "López",
        workshopName: "AutoMaster",
        phoneNumber: "5523456789",
        address: {
          street: "Insurgentes",
          extNum: "1500",
          intNum: "B",
          neighborhood: "Roma Norte",
          zipCode: "06700",
          city: "Ciudad de México",
          state: "CDMX",
          _id: "66e6c4ba6412f327751b6a67"
        },
        _id: "66e6c4ba6412f327751b6a68",
        __v: 0
      },
  ]);

  const [selectedMechanic, setSelectedMechanic] = useState(""); 
  const [items, setItems] = useState([{ concept: "", quantity: 1 }]);

  const handleOpenMechanicForm = () => setIsMechanicFormOpen(true);
  const handleCloseMechanicForm = () => setIsMechanicFormOpen(false);

  
  const handleMechanicChange = (e) => {
    setSelectedMechanic(e.target.value);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { concept: "", quantity: 1 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/quote-sent')
    console.log("Cotización enviada", { selectedMechanic, items });
  };

  const handleSaveMechanic = (newMechanic) => {
    setMechanics([...mechanics, newMechanic]);
  };

  return (
    <div className="flex flex-col w-full p-4 justify-center md:items-center min-h-screen">
      <h1 className="font-chakra md:mb-[80px] w-full text-center text-[32px] font-bold">SOLICITA UNA COTIZACIÓN</h1> 
      <div className="flex flex-row w-full justify-end items-end">
            <div className="flex flex-col mr-9 mb-8">
                <label htmlFor="mechanic-select" className="block text-white font-chakra font-bold">
                    SELECCIONA UN TALLER
                </label>
                <select
                  id="mechanic-select"
                  value={selectedMechanic}
                  onChange={handleMechanicChange}
                  className="text-[#C2C2C2] outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                >
                  <option className="text-white font-mulish" value="" disabled>Selecciona un taller</option>
                  {mechanics.map((mechanic) => (
                    <option key={mechanic._id} value={mechanic._id}>
                      {mechanic.workshopName}
                    </option>
                  ))}
                </select>
            </div>
            <div className="flex h-full justify-center my-auto">
            <button
                className="bg-[#D16527] text-white font-chakra min-w-[50px] max-h-10 p-2 rounded-md"
                type="button"
                onClick={handleOpenMechanicForm}>+</button>
            </div>
        </div>


      <MechanicForm
        isOpen={isMechanicFormOpen}
        onClose={handleCloseMechanicForm}
        onSave={handleSaveMechanic}
      /> 
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-4">

        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <input
              type="text"
              value={item.concept}
              onChange={(e) => handleItemChange(index, "concept", e.target.value)}
              placeholder="Refacción"
              className="text-white text-base outline-none font-mulish text-[14px] font-normal leading-normal md:min-w-[600px] md:max-w-[850px] w-full bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
            />
            <div className="flex items-center">
              <button
                type="button"
                onClick={() =>
                  handleItemChange(index, "quantity", Math.max(1, item.quantity - 1))
                }
                className="p-2 border"
              >
                -
              </button>
              <span className="px-2">{item.quantity}</span>
              <button
                type="button"
                onClick={() => handleItemChange(index, "quantity", item.quantity + 1)}
                className="p-2 border"
              >
                +
              </button>
            </div>
          </div>
        ))}

        <div className="w-full flex justify-center">
        <button
          type="button"
          onClick={addItem}
          className="bg-[#D16527] md:mt-6 md:mb-14 w-[250px] font-chakra font-bold text-white p-2 rounded-md"
        >AGREGAR PIEZA</button>
        </div>

        <div className="w-full flex justify-center md:justify-end">
        <button
          type="submit"
          className="bg-[#D16527] w-[250px] font-chakra font-bold text-white p-2 rounded-md mt-4"
        >
          SOLICITAR COTIZACIÓN
        </button>
        </div>
      </form>
    </div>
  );
}

