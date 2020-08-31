import React from "react";

import css from "./style.module.css";

export default function ModalForm({
  closeModal,
  transaction,
  modalType,
  handleEdit,
}) {
  const [type, setType] = React.useState(transaction.type);
  const [sendTransaction, setSendTransaction] = React.useState(transaction);

  const handleTypeChange = (event) => {
    if (modalType === "edit") {
      setType(transaction.type);
      const alteredTransaction = sendTransaction;
      alteredTransaction.type = type;
      setSendTransaction(alteredTransaction);
      return;
    }
    setType(event.target.value);
    const alteredTransaction = sendTransaction;
    alteredTransaction.type = type;
    setSendTransaction(alteredTransaction);
  };

  const handleCategoryChange = (event) => {
    const alteredTransaction = sendTransaction;
    alteredTransaction.category = event.target.value;
    setSendTransaction(alteredTransaction);
  };

  const handleDescriptionChange = (event) => {
    const alteredTransaction = sendTransaction;
    alteredTransaction.description = event.target.value;
    setSendTransaction(alteredTransaction);
  };

  const handleValueChange = (event) => {
    const alteredTransaction = sendTransaction;
    alteredTransaction.value = event.target.value;
    setSendTransaction(alteredTransaction);
  };

  const handleDateChange = (event) => {
    const alteredTransaction = sendTransaction;
    alteredTransaction.yearMonthDay = event.target.value;
    alteredTransaction.year = event.target.value.slice(0, 4);
    alteredTransaction.month = event.target.value.slice(5, 7);
    alteredTransaction.day = event.target.value.slice(8, 10);
    setSendTransaction(alteredTransaction);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (modalType === "edit") {
      handleEdit(sendTransaction);
    }
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
          <div className={css.radioInput}>
            <label>
              <input
                type="radio"
                name="expense"
                value="-"
                checked={type === "-"}
                onSelect={handleTypeChange}
                className={css.radioOption}
              />
              <span>Despesa</span>
            </label>
            <label>
              <input
                type="radio"
                name="expense"
                value="+"
                checked={type === "+"}
                onSelect={handleTypeChange}
                className={css.radioOption}
              />
              <span>Receita</span>
            </label>
          </div>
        </div>
        <label htmlFor="description">{"Descrição"}</label>
        <input
          type="text"
          id="description"
          defaultValue={transaction.description}
          onChange={handleDescriptionChange}
        />
        <label htmlFor="category">{"Categoria"}</label>
        <input
          type="text"
          id="category"
          defaultValue={transaction.category}
          onChange={handleCategoryChange}
        />
        <label htmlFor="value">{"Valor"}</label>
        <input
          type="number"
          id="value"
          min="0"
          defaultValue={transaction.value}
          onChange={handleValueChange}
        />
        <input
          type="date"
          id="date"
          defaultValue={transaction.yearMonthDay}
          onChange={handleDateChange}
        />
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
