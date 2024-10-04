import { useState } from "react";

export default function MechanicForm({ isOpen, onClose, onSave }) {
  const [mechanic, setMechanic] = useState({
    firstName: "",
    lastName: "",
    workshopName: "",
    phoneNumber: "",
    address: {
      street: "",
      extNum: "",
      intNum: "",
      neighborhood: "",
      zipCode: "",
      city: "",
      state: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMechanic({
      ...mechanic,
      [name]: value
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setMechanic({
      ...mechanic,
      address: {
        ...mechanic.address,
        [name]: value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(mechanic); 
    onClose(); 
  };

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative mt-0 bg-[#161616] p-8 w-full md:w-3/4 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
        <img
          src={"https://fairefac-assets.s3.us-east-2.amazonaws.com/Close-orange.png"}
          alt="Cerrar"
          className="absolute top-4 right-4 cursor-pointer w-6 h-6"
          onClick={onClose} 
        />
        <h2 className="font-chakra font-bold text-center text-[24px] mb-4">AGREGAR MECÁNICO</h2>
        <div className="w-full flex justify-center">
          <form className="w-full max-w-lg text-c p-4" onSubmit={handleSubmit}>
            {/* Información personal */}
            <div className="mb-4">
              <label className="block font-bold font-chakra mb-2">NOMBRE</label>
              <input
                type="text"
                name="firstName"
                value={mechanic.firstName}
                onChange={handleChange}
                className="text-[#C2C2C2] w-full outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                required
              />
            </div>
  
            <div className="mb-4">
              <label className="block font-bold font-chakra mb-2">APELLIDO</label>
              <input
                type="text"
                name="lastName"
                value={mechanic.lastName}
                onChange={handleChange}
                className="text-[#C2C2C2] w-full outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                required
              />
            </div>
  
            <div className="mb-4">
              <label className="block font-bold font-chakra mb-2">NOMBRE DEL TALLER</label>
              <input
                type="text"
                name="workshopName"
                value={mechanic.workshopName}
                onChange={handleChange}
                className="text-[#C2C2C2] w-full outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                required
              />
            </div>
  
            {/* Dirección */}
            <h3 className="text-lg font-bold font-chakra mb-2 md:mb-8">DIRECCIÓN</h3>
  
            <div className="mb-4">
              <label className="block font-bold font-chakra mb-2">CALLE</label>
              <input
                type="text"
                name="street"
                value={mechanic.address.street}
                onChange={handleAddressChange}
                className="text-[#C2C2C2] w-full outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                required
              />
            </div>
  
            <div className="flex flex-col md:flex-row mb-4">
              <div className="md:flex-1">
                <label className="block font-bold font-chakra mb-2">NÚMERO EXTERIOR</label>
                <input
                  type="text"
                  name="extNum"
                  value={mechanic.address.extNum}
                  onChange={handleAddressChange}
                  className="text-[#C2C2C2] outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                  required
                />
              </div>
              <div className="md:flex-1">
                <label className="block font-bold font-chakra mb-2">NÚMERO INTERIOR</label>
                <input
                  type="text"
                  name="intNum"
                  value={mechanic.address.intNum}
                  onChange={handleAddressChange}
                  className="text-[#C2C2C2] outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                />
              </div>
            </div>
  
            <div className="mb-4">
              <label className="block font-bold font-chakra mb-2">COLONIA</label>
              <input
                type="text"
                name="neighborhood"
                value={mechanic.address.neighborhood}
                onChange={handleAddressChange}
                className="text-[#C2C2C2] w-full outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                required
              />
            </div>
  
            <div className="mb-4">
              <label className="block font-bold font-chakra mb-2">CÓDIGO POSTAL</label>
              <input
                type="text"
                name="zipCode"
                value={mechanic.address.zipCode}
                onChange={handleAddressChange}
                className="text-[#C2C2C2] w-full outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                required
              />
            </div>
  
            <div className="mb-4">
              <label className="block font-bold font-chakra mb-2">CIUDAD</label>
              <input
                type="text"
                name="city"
                value={mechanic.address.city}
                onChange={handleAddressChange}
                className="text-[#C2C2C2] w-full outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                required
              />
            </div>
  
            <div className="mb-4">
              <label className="block font-bold font-chakra mb-2">ESTADO</label>
              <input
                type="text"
                name="state"
                value={mechanic.address.state}
                onChange={handleAddressChange}
                className="text-[#C2C2C2] w-full outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                required
              />
            </div>
  
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-black p-2 rounded-md mr-2"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-[#D16527] text-white p-2 rounded-md"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

