import React from "react";

const MechanicForm = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="bg-[#222] p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="font-bold text-white">F</span>
          </div>
          <span className="font-bold text-orange-500">FAIREFAC</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline">HOME</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white text-black rounded-lg p-8 w-full max-w-md">
          <form className="space-y-6">
            <div>
              <label className="block font-bold mb-2" htmlFor="nombre">
                NOMBRE DEL MECÁNICO
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Nombre"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-2" htmlFor="taller">
                NOMBRE DEL TALLER
              </label>
              <input
                id="taller"
                type="text"
                placeholder="Taller"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-2" htmlFor="direccion">
                DIRECCIÓN DEL TALLER
              </label>
              <input
                id="direccion"
                type="text"
                placeholder="Dirección"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-2" htmlFor="celular">
                CELULAR
              </label>
              <input
                id="celular"
                type="text"
                placeholder="Celular"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
            >
              ACTUALIZAR
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default MechanicForm;
