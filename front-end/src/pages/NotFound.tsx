import { FC } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/NotFound.css";

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <section className="not-found">
      <h1>404 - Página Não Encontrada</h1>
      <p>A página que você está tentando acessar não existe ou foi movida.</p>
      <button onClick={() => navigate("/home")} className="back-button">
        Voltar para a Página Inicial
      </button>
    </section>
  );
};

export default NotFoundPage;
