import React from "react";

export default function TransactionButton({ btnType, transaction, id, handleDelete, handleOpenModalEdit }) {
  const handleButtonClick = (event) => {
    if (event.target.innerText === "delete") {
      handleDelete(id);
      return;
    }
    handleOpenModalEdit(id, transaction);

  };
  return (
    <>
      <i className="material-icons" onClick={handleButtonClick}>
        {btnType}
      </i>
    </>
  );
}
