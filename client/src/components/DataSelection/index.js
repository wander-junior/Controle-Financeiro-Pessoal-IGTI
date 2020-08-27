import React from 'react';

import PERIODS from '../../helpers/periods';

export default function DataSelection({currentPeriod, handleSelect}) {
  const options = [];
  PERIODS.forEach((period) => {
    options.push({
      label: period,
      option: period
    })
  })

  return (
    <select value={currentPeriod} onChange={handleSelect}>
      {PERIODS.map((period) => {
        return <option key={period}>{period}</option>
      })}
    </select>
  );
}
