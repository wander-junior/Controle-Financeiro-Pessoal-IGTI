import React from "react";
import Modal from "react-modal";
import axios from "axios";

import DataSelection from "../DataSelection";
import TextFilter from "../TextFilter";
import Info from "../Info";
import css from "./style.module.css";
import ModalForm from "../ModalForm";
import PeriodButton from "../PeriodButton";

const api = axios.create({ baseURL: "api" });

const btnClasses = `waves-effect waves-light btn ${css.button}`;

const customStyles = {
  overlay: {
    zIndex: 1000,
  },
  content: {
    maxHeight: "425px",
    maxWidth: "450px",
    margin: "0 auto",
  },
};

export default function Header({
  currentPeriod,
  setCurrentPeriod,
  handleSelect,
  handleFilter,
  entries,
  income,
  expense,
  balance,
  handleForceRender
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
        console.log(response);
        closeModal();
        handleForceRender();
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
      <div className={css.periodSelection}>
        <PeriodButton
          ButtonType="<"
          currentPeriod={currentPeriod}
          setCurrentPeriod={setCurrentPeriod}
        />
        <DataSelection
          currentPeriod={currentPeriod}
          handleSelect={handleSelect}
        />
        <PeriodButton
          ButtonType=">"
          currentPeriod={currentPeriod}
          setCurrentPeriod={setCurrentPeriod}
        />
      </div>

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
