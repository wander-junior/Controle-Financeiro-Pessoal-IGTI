import React from "react";

import PERIODS from "../../helpers/periods";

const customStyle = {
  margin: "5px 15px",
};

export default function PeriodButton({
  ButtonType,
  currentPeriod,
  setCurrentPeriod,
}) {
  const handleClick = () => {
    const found = PERIODS.findIndex((period) => period === currentPeriod);
    ButtonType === ">"
      ? setCurrentPeriod(PERIODS[found + 1])
      : setCurrentPeriod(PERIODS[found - 1]);
  };

  return (
    <>
      <button
        className="waves-effect waves-light btn"
        onClick={handleClick}
        style={customStyle}
      >
        {ButtonType}
      </button>
    </>
  );
}
