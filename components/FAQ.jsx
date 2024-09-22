import React, { useState } from "react";
import { ThumbsUp, ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  const questions = [
    {
      question:
        "¿CÓMO SÉ QUE ESTOY OBTENIENDO EL MEJOR PRECIO EN LAS REFACCIONES?",
      answer:
        "Compara múltiples cotizaciones de refaccionarias cercanas en tiempo real y elige la opción que mejor se ajuste a tu presupuesto.",
    },
    {
      question: "¿PUEDO CONFIAR EN LAS MARCAS DE REFACCIONES QUE OFRECEN?",
      answer: "Respuesta a la segunda pregunta...",
    },
    {
      question: "¿QUÉ SUCEDE DESPUÉS DE SELECCIONAR UNA COTIZACIÓN?",
      answer: "Respuesta a la tercera pregunta...",
    },
  ];

  return (
    <>
      <section className="col-start-1 col-end-13">
        <h2 className="font-chakra font-bold text-5xl mb-4">FAQ's:</h2>
        <div className="rounded-lg mb-3">
          {questions.map((q, index) => (
            <div
              key={index}
              className="mb-4 border bg-[#302F2F] font-semibold rounded-lg "
            >
              <button
                className="flex justify-between items-center w-full p-4 rounded-lg"
                onClick={() => toggleQuestion(index)}
              >
                <span className="text-xl">{q.question}</span>
                {expandedQuestion === index ? (
                  <ChevronUp className="text-[#D16527]" />
                ) : (
                  <ChevronDown className="text-[#D16527]" />
                )}
              </button>
              {expandedQuestion === index && (
                <div className="bg-[#898585] p-4 mt-2 border-4 text-xl">
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
