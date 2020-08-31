import React from "react";

import css from "./style.module.css";
import TransactionButton from "../TransactionButton";

export default function Transaction({
  transaction,
  handleDelete,
  handleOpenModalEdit,
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
            btnType="edit"
            transaction={transaction}
            id={id}
            handleDelete={handleDelete}
            handleOpenModalEdit={handleOpenModalEdit}
            href="#modal"
          />
          <TransactionButton
            btnType="delete"
            transaction={transaction}
            id={id}
            handleDelete={handleDelete}
            handleOpenModalEdit={handleOpenModalEdit}
          />
        </div>
      </div>
    </>
  );
}
