import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QUESTIONS = [
  {
    key: "gender",
    q: "¿Para quién buscas la fragancia?",
    options: [
      { label: "Hombre", value: "hombre" },
      { label: "Mujer", value: "mujer" },
      { label: "Unisex", value: "unisex" },
    ],
  },
  {
    key: "category",
    q: "¿Qué ambiente olfativo prefieres?",
    options: [
      { label: "Fresco y cítrico", value: "Cítrico" },
      { label: "Cálido y especiado", value: "Especiado" },
      { label: "Dulce y floral", value: "Floral" },
      { label: "Elegante y amaderado", value: "Amaderado" },
      { label: "Intenso y oriental", value: "Oriental" },
      { label: "Fresco y acuático", value: "Acuático" },
    ],
  },
  {
    key: "style",
    q: "¿Prefieres algo icónico y reconocido, o una joya de nicho por descubrir?",
    options: [
      { label: "Icónico y reconocido", value: "bestseller" },
      { label: "Nicho, algo diferente", value: "" },
    ],
  },
  {
    key: "budget",
    q: "¿Cuál es tu presupuesto aproximado?",
    options: [
      { label: "Hasta RD$ 2,500", value: "0-2500" },
      { label: "RD$ 2,500 – 4,500", value: "2500-4500" },
      { label: "Más de RD$ 4,500", value: "4500-99999" },
      { label: "No tengo límite definido", value: "" },
    ],
  },
];

export default function Discover() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const question = QUESTIONS[step];

  const choose = (value) => {
    const next = { ...answers, [question.key]: value };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      finish(next);
    }
  };

  const finish = (final) => {
    const params = new URLSearchParams();
    if (final.gender) params.set("gender", final.gender);
    if (final.category) params.set("category", final.category);
    if (final.style === "bestseller") params.set("sort", "bestseller");
    if (final.budget) {
      const [min, max] = final.budget.split("-");
      params.set("minPrice", min);
      params.set("maxPrice", max);
    }
    navigate(`/catalogo?${params.toString()}`);
  };

  return (
    <div className="quiz-page">
      <div className="quiz-eyebrow">Descubre tu fragancia</div>
      <div className="quiz-progress">
        {QUESTIONS.map((_, i) => (
          <span key={i} className={`quiz-dot${i <= step ? " active" : ""}`} />
        ))}
      </div>
      <h2 className="quiz-question">{question.q}</h2>
      <div className="quiz-options">
        {question.options.map((opt) => (
          <button key={opt.label} className="quiz-option" onClick={() => choose(opt.value)}>
            {opt.label}
          </button>
        ))}
      </div>
      {step > 0 && (
        <button className="quiz-back" onClick={() => setStep(step - 1)}>← Volver</button>
      )}
      <p className="quiz-step-count">Pregunta {step + 1} de {QUESTIONS.length}</p>
    </div>
  );
}
