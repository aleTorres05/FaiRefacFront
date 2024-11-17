import React, { useState } from "react";
import { ThumbsUp, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/router";

export default function FAQ({ currentPage }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const router = useRouter();

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  const questions =
    router.pathname === "/"
      ? [
          {
            question:
              "¿CÓMO SÉ QUE ESTOY OBTENIENDO EL MEJOR PRECIO EN LAS REFACCIONES?",
            answer:
              "Con nuestra app, puedes comparar cotizaciones en tiempo real de varias refaccionarias cercanas. Además, puedes combinar las mejores opciones para cada pieza en un solo pedido, optimizando calidad y precio.",
          },
          {
            question:
              "¿PUEDO CONFIAR EN LAS MARCAS DE REFACCIONES QUE OFRECEN?",
            answer:
              "¡Por supuesto! Trabajamos con refaccionarias verificadas que garantizan la calidad de sus productos. En cada cotización, se detalla la marca de las refacciones para que elijas entre opciones basadas en calidad, precio, o ambas.",
          },
          {
            question: "¿QUÉ SUCEDE DESPUÉS DE SELECCIONAR UNA COTIZACIÓN?",
            answer:
              "Tu pedido será gestionado por las refaccionarias seleccionadas. Ellas se encargarán de preparar las piezas y coordinar la entrega directa a tu taller, asegurando un servicio rápido y confiable.",
          },
        ]
      : [
          {
            question: "¿CÓMO PUEDO GARANTIZAR QUE MIS VENTAS AUMENTARÁN?",
            answer:
              "Nuestra plataforma aumenta tu visibilidad ante clientes potenciales en tu área. Al permitirles comparar precios y calidad, atraerás más ventas al destacarte por tu competitividad. Además, la experiencia positiva de los clientes genera fidelidad y recomendaciones.",
          },
          {
            question: "¿NECESITO PAGAR UNA COMISIÓN POR VENDER MIS PRODUCTOS?",
            answer:
              "No, no cobramos comisiones por tus ventas. Los clientes pagan una pequeña tarifa por usar la plataforma, lo que significa que todas tus ganancias son para ti.",
          },
          {
            question:
              "¿QUIÉN SE ENCARGA DE LA ENTREGA DE LAS REFACCIONES QUE VENDEN?",
            answer:
              "Tú decides. Puedes utilizar tu equipo de repartidores o contratar un servicio externo. La plataforma facilita la venta, mientras tú mantienes el control sobre las entregas.",
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
