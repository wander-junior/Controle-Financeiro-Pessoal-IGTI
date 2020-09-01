import React from "react";

import PERIODS from "../../helpers/periods";

export default function DataSelection({ currentPeriod, handleSelect }) {
  return (
    <select value={currentPeriod} onChange={handleSelect}>
      {PERIODS.map((period) => {
        return <option key={period}>{period}</option>;
      })}
    </select>
  );
}
