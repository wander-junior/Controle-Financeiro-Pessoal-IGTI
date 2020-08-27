import React from "react";
import css from "./style.module.css";

export default function EditModal({ closeModal }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h4>Edição de lançamento</h4>
        <button
          className="waves-effect waves-light red btn"
          onClick={closeModal}
        >
          X
        </button>
      </div>
      <form>
        <div>
          <label>
            <input type="radio" name="expense" value="-" />
            <span>Despesa</span>
          </label>
          <label>
            <input type="radio" name="expense" value="+" />
            <span>Receita</span>
          </label>
        </div>
        <label htmlFor="description">{"Descrição"}</label>
        <input type="text" id="description" />
        <label htmlFor="category">{"Categoria"}</label>
        <input type="text" id="category" />
        <label htmlFor="value">{"Valor"}</label>
        <input type="number" id="value" min="0" />
        <input type="date" id="date" />
        <input
          className="waves-effect waves-light btn"
          type="submit"
          value="Enviar"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}
