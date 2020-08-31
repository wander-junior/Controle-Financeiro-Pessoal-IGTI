import React from "react";
import Modal from "react-modal";
import axios from "axios";

import DataSelection from "../DataSelection";
import TextFilter from "../TextFilter";
import Info from "../Info";
import css from "./style.module.css";
import ModalForm from "../ModalForm";

const api = axios.create({ baseURL: "api" });

const btnClasses = `waves-effect waves-light btn ${css.button}`;

const customStyles = {
  overlay: { zIndex: 1000 },
};

export default function Header({
  currentPeriod,
  handleSelect,
  handleFilter,
  entries,
  income,
  expense,
  balance,
}) {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const transactionDefault = {
    type: "-",
    value: 0,
    day: day,
    month: String(today.getMonth() + 1).padStart(2, "0"),
    year: today.getFullYear(),
    yearMonthDay: `${year}-${month}-${day}`,
    description: "Nova descrição",
    category: "Nova categoria",
  };

  const handleButtonClick = () => {
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAdd = async (data) => {
    const url = `transaction`;
    await api
      .post(url, data)
      .then((response) => {
        console.log(response)
        closeModal();
      })
      .catch((error) => {
        alert(
          `Não foi possível adicionar essa transação. Erro: ${error.message}`
        );
      });
  };

  return (
    <div>
      <h1 className="center">Bootcamp Full Stack - Desafio Final</h1>
      <h2 className="center">Controle Financeiro Pessoal</h2>
      <DataSelection
        currentPeriod={currentPeriod}
        handleSelect={handleSelect}
      />
      <Info
        entries={entries}
        income={income}
        expense={expense}
        balance={balance}
      />
      <div className={css.filterContainer}>
        <button className={btnClasses} onClick={handleButtonClick}>
          + NOVO LANÇAMENTO
        </button>
        <TextFilter handleFilter={handleFilter} />
      </div>
      <Modal
        isOpen={isAddModalOpen}
        style={customStyles}
        onRequestClose={closeModal}
      >
        <ModalForm
          transaction={transactionDefault}
          modalType="add"
          closeModal={closeModal}
          handleTransaction={handleAdd}
        />
      </Modal>
    </div>
  );
}
