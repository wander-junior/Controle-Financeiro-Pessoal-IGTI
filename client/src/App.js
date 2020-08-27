import React from "react";
import axios from "axios";
import Modal from "react-modal";

import PERIODS from "./helpers/periods";
import Transactions from "./components/Transactions/Transactions";
import Header from "./components/Header";

import M from "materialize-css";
import EditModal from "./components/EditModal";

const api = axios.create({ baseURL: "api" });

const customStyles = {
  overlay: { zIndex: 1000 },
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

  const handleEdit = () => {
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
        handleEdit={handleEdit}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <EditModal closeModal={closeModal}/>
      </Modal>
    </div>
  );
}
