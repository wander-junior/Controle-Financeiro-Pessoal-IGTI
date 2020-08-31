import React from "react";
import axios from "axios";
import Modal from "react-modal";

import PERIODS from "./helpers/periods";

import Transactions from "./components/Transactions/Transactions";
import Header from "./components/Header";
import ModalForm from "./components/ModalForm";

import M from "materialize-css";

const api = axios.create({ baseURL: "api" });

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    zIndex: 1000,
  },
  content: {
    maxHeight: "425px",
    maxWidth: "450px",
    margin: "auto",
  }
};

export default function App() {
  const [currentPeriod, setCurrentPeriod] = React.useState(PERIODS[0]);
  const [textFilter, setTextFilter] = React.useState("");
  const [balance, setBalance] = React.useState(0);
  const [income, setIncome] = React.useState(0);
  const [expense, setExpense] = React.useState(0);
  const [transactions, setTransactions] = React.useState([]);
  const [forceRender, setForceRender] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalId, setModalId] = React.useState("");
  const [tmpTransaction, setTmpTransaction] = React.useState({});

  React.useEffect(() => {
    const fetchPeriods = async () => {
      const url = "/transaction/date";
      const periodUrl = `${url}/${currentPeriod}`;
      const { data } = await api.get(periodUrl);

      let total = 0;
      let localIncome = 0;
      let localExpense = 0;
      let transactionsFiltered = data.filter(
        (transaction) =>
          transaction.description.toLowerCase().indexOf(textFilter) !== -1
      );
      transactionsFiltered.forEach((transaction) => {
        if (transaction.type === "+") {
          total += transaction.value;
          localIncome += transaction.value;
        } else {
          total -= transaction.value;
          localExpense += transaction.value;
        }
      });
      setBalance(total);
      setIncome(localIncome);
      setExpense(localExpense);
      setTransactions(transactionsFiltered);
    };
    fetchPeriods();
  }, [currentPeriod, textFilter, forceRender]);

  const handleSelectChange = (event) => {
    setCurrentPeriod(event.target.value);
  };

  const handleFilterChange = (event) => {
    setTextFilter(event.target.value);
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja apagar o registro?")) {
      const url = `transaction/${id}`;
      api
        .delete(url)
        .then(() => {
          setForceRender(!forceRender);
        })
        .catch((_) => {
          alert("Não foi possível deletar essa transação");
        });
    }
  };

  const handleEdit = async (data) => {
    const url = `transaction/${data._id}`;
    await api
      .put(url, { data })
      .then(() => {
        setForceRender(!forceRender);
        console.log(url);
        console.log(data);
      })
      .catch((error) => {
        alert(
          `Não foi possível alterar essa transação. Erro: ${error.message}`
        );
      });
  };

  const handleOpenModalEdit = (id, transaction) => {
    setModalId(id);
    const transactionCopy = Object.assign({}, transaction);
    setTmpTransaction(transactionCopy);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <div className="container">
      <Header
        currentPeriod={currentPeriod}
        handleSelect={handleSelectChange}
        handleFilter={handleFilterChange}
        entries={transactions.length}
        income={income}
        expense={expense}
        balance={balance}
      />
      <Transactions
        transactions={transactions}
        handleDelete={handleDelete}
        handleOpenModalEdit={handleOpenModalEdit}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ModalForm
          modalId={modalId}
          transaction={tmpTransaction}
          closeModal={closeModal}
          modalType="edit"
          handleTransaction={handleEdit}
        />
      </Modal>
    </div>
  );
}
