import { useState } from "react";
import { changeStatusById } from "@/pages/api/repairShopQuote";
import { toast } from "sonner";

export default function FollowUpRepairshopQuoteModal({
  quote,
  closeModal,
  onUpdate,
}) {
  const [loading, setLoading] = useState(false);

  const { street, extNum, intNum, neighborhood, city, state, zipCode } =
    quote.mechanic.address;

  const { brand, year, version, model } = quote.car;

  const token = localStorage.getItem("token");

  const getStatusLabel = (status) => {
    switch (status) {
      case "initial":
        return "Pendiente";
      case "review":
        return "Cotizada";
      case "paid":
        return "Pagada";
      case "rejected":
        return "Rechazada";
      case "sent":
        return "Enviada";
      case "delivered":
        return "Entregado";
      default:
        return "Desconocido";
    }
  };

  const address = `${street} #${extNum} ${
    intNum ? `Int. ${intNum}` : ""
  }, Col. ${neighborhood}, ${city}, ${state}, C.P. ${zipCode}`;

  const handleStatusChange = async () => {
    setLoading(true);
    try {
      const response = await changeStatusById(quote._id, token);
      const updatedQuote = {
        _id: quote._id,
        status: response.data.updateRepairShopQuote.status,
      };
      onUpdate(updatedQuote);
      toast.success("Status de la cotización actualizado con éxito.");
    } catch (error) {
      toast.error(`${error.message}`);
    } finally {
      setLoading(false);
      closeModal();
      window.location.reload();
    }
  };

  const handleQuoteSelection = () => {
    onQuoteSelection(quote);
    closeModal();
  };

  const renderButtonOrMessage = () => {
    switch (quote.status) {
      case "paid":
        return (
          <button
            onClick={handleStatusChange}
            className="mt-4 bg-[#D26528] text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Actualizando..." : "Enviar pedido"}
          </button>
        );
      case "sent":
        return (
          <button
            onClick={handleStatusChange}
            className="mt-4 bg-[#D26528] text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Actualizando..." : "Confirmar entrega"}
          </button>
        );
      case "rejected":
        return (
          <p className="mt-4 text-red-500">
            La cotización fue rechazada por el cliente.
          </p>
        );
      case "initial":
        return (
          <p className="mt-4 text-[#D26528]">
            Dirigete a cotizaciones pendientes para cotizar este pedido.
          </p>
        );
      case "review":
        return (
          <p className="mt-4 text-yellow-500">
            Cotización en espera de respuesta por parte del cliente.
          </p>
        );
      case "delivered":
        return (
          <p className="mt-4 text-green-500">
            La cotización fue entregada al taller mecánico.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div className="relative mt-51 md:mt-4 bg-[#161616] p-8 w-full md:w-3/4 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
        <img
          src={
            "https://fairefac-assets.s3.us-east-2.amazonaws.com/Close-orange.png"
          }
          alt="Cerrar"
          className="absolute top-4 right-4 cursor-pointer w-6 h-6"
          onClick={closeModal}
        />
        <h2 className="text-lg font-bold font-chakra mb-4">
          DETALLES DE LA COTIZACIÓN
        </h2>
        <p className="font-mulish">
          <strong>Mecánico:</strong> {quote.mechanic.firstName}{" "}
          {quote.mechanic.lastName}
        </p>
        <p className="font-mulish">
          <strong>Taller:</strong> {quote.mechanic.workshopName}
        </p>
        <p className="font-mulish">
          <strong>Teléfono:</strong> {quote.mechanic.phoneNumber}
        </p>
        <p className="font-mulish">
          <strong>Dirección:</strong> {address}
        </p>
        <p className="font-mulish">
          <strong>Status:</strong> {getStatusLabel(quote.status)}
        </p>
        <p className="font-mulish">
          <strong>Auto:</strong>{" "}
          {`${brand.toUpperCase()} ${model.toUpperCase()} ${version.toUpperCase()} ${year}`}
        </p>
        <p className="font-mulish">
          <strong>Refacciones:</strong>
        </p>
        <ul className="font-mulish">
          {quote.items.map((item) => (
            <li key={item._id}>
              {item.quantity} {item.concept}
              {item.brand ? `, Marca: ${item.brand}` : " "}
            </li>
          ))}
        </ul>
        {renderButtonOrMessage()}
      </div>
    </div>
  );
}
