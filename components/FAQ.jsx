import React, { useState } from "react";
import { ThumbsUp, ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ({ currentPage }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  const questions =
    currentPage === "home"
      ? [
          {
            question:
              "¿CÓMO SÉ QUE ESTOY OBTENIENDO EL MEJOR PRECIO EN LAS REFACCIONES?",
            answer:
              "Compara múltiples cotizaciones de refaccionarias cercanas en tiempo real y elige la opción que mejor se ajuste a tu presupuesto.",
          },
          {
            question:
              "¿PUEDO CONFIAR EN LAS MARCAS DE REFACCIONES QUE OFRECEN?",
            answer:
              "¡Sí, puedes confiar! Todas nuestras refacciones provienen de refaccionarias de confianza. Además, te ofrecemos comparaciones para que elijas la mejor opción con total seguridad.",
          },
          {
            question: "¿QUÉ SUCEDE DESPUÉS DE SELECCIONAR UNA COTIZACIÓN?",
            answer:
              "Después de seleccionar una cotización, las refaccionarias se encargaran de procesar tu pedido y coordinar el envío de las refacciones directamente a tu taller, listas para ser instaladas.",
          },
        ]
      : [
          {
            question:
              "¿CÓMO PUEDO GARANTIZAR QUE LOS CLIENTES ME ENCUENTREN MÁS RÁPIDO?",
            answer:
              "Optimizamos la visibilidad de tu refaccionaria para que los clientes cercanos te encuentren fácilmente a través de nuestra plataforma.",
          },
          {
            question: "¿NECESITO PAGAR UNA COMISIÓN POR VENDER MIS PRODUCTOS?",
            answer:
              "No cobramos comisión a las refaccionarias. Solo cobramos a los usuarios por el uso de nuestra plataforma, lo que significa más ingresos para ti.",
          },
          {
            question:
              "¿QUIÉN SE ENCARGA DE LA ENTREGA DE LAS REFACCIONES QUE VENDEN?",
            answer:
              "Puedes usar tus propios repartidores o solicitar ayuda externa. Nosotros solo facilitamos el proceso de venta, mientras tú manejas la entrega.",
          },
        ];
  return (
    <>
      <section className="col-start-1 col-end-13">
        <h2 className="font-chakra text-3xl font-bold md:text-5xl mb-4">
          FAQs:
        </h2>
        <div className="rounded-lg mb-3">
          {questions.map((q, index) => (
            <div
              key={`index-${index}`}
              className="mb-4 border bg-[#302F2F] md:font-semibold rounded-lg "
            >
              <button
                className="flex font-chakra justify-between items-center w-full p-4 rounded-lg"
                onClick={() => toggleQuestion(index)}
              >
                <span className="text-sm text-start md:text-xl">
                  {q.question}
                </span>
                {expandedQuestion === index ? (
                  <ChevronUp className="text-[#D16527] h-[50px] w-[50px] " />
                ) : (
                  <ChevronDown className="text-[#D16527] h-[50px] w-[50px]" />
                )}
              </button>
              {expandedQuestion === index && (
                <div className="bg-[#898585] font-mulish p-4 mt-2 border-4 text-xl">
                  {q.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
