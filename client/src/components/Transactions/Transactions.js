import React from "react";

import Transaction from "./Transaction";
import css from "./style.module.css";

export default function Transactions({
  transactions,
  handleDelete,
  handleOpenModalEdit,
}) {
  return (
    <ul>
      {transactions.map((transaction) => {
        if (transaction.type === "-") {
          return (
            <li key={transaction._id} className={css.negativo}>
              <Transaction
                transaction={transaction}
                handleDelete={handleDelete}
                handleOpenModalEdit={handleOpenModalEdit}
                id={transaction._id}
              />
            </li>
          );
        } else {
          return (
            <li key={transaction._id} className={css.positivo}>
              <Transaction
                transaction={transaction}
                handleDelete={handleDelete}
                handleOpenModalEdit={handleOpenModalEdit}
                id={transaction._id}
              />
            </li>
          );
        }
      })}
    </ul>
  );
}
