import React from "react";

import css from "./style.module.css";
import TransactionButton from "../TransactionButton";

export default function Transaction({
  transaction,
  handleDelete,
  handleEdit,
  id,
}) {
  return (
    <>
      <div className={css.transaction}>
        <span className={css.day}>{transaction.day}</span>
        <div className={css.info}>
          <p>{transaction.category}</p>
          <span>{transaction.description}</span>
        </div>
        <span className={css.value}> R${transaction.value}</span>
        <div className={css.buttons}>
          <TransactionButton
            type="edit"
            id={id}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            href="#modal"
          />
          <TransactionButton
            type="delete"
            id={id}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      </div>
    </>
  );
}
