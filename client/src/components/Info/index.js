import React from "react";

import css from "./style.module.css";

export default function Info({ entries, income, expense, balance }) {
  if (balance > 0) {
    return (
      <div className={css.flex}>
        <p>
          <b>Lançamentos: {entries}</b>
        </p>
        <p>
          <b>
            Receitas: <span className={css.positive}>R${income}</span>
          </b>
        </p>
        <p>
          <b>
            Despesas: <span className={css.negative}>R${expense}</span>
          </b>
        </p>
        <p>
          <b>
            Saldo: <span className={css.positive}>R${balance}</span>
          </b>
        </p>
      </div>
    );
  }
  return (
    <div className={css.flex}>
      <p>
        <b>Lançamentos: {entries}</b>
      </p>
      <p>
        <b>
          Receitas: <span className={css.positive}>R${income}</span>
        </b>
      </p>
      <p>
        <b>
          Despesas: <span className={css.negative}>R${expense}</span>
        </b>
      </p>
      <p>
        <b>
          Saldo: <span className={css.negative}>R${balance}</span>
        </b>
      </p>
    </div>
  );
}
