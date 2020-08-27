import React from "react";
import DataSelection from "../DataSelection";
import TextFilter from "../TextFilter";
import Info from "../Info";

export default function Header({
  currentPeriod,
  handleSelect,
  handleFilter,
  entries,
  income,
  expense,
  balance,
}) {
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
      <TextFilter handleFilter={handleFilter} />
    </div>
  );
}
