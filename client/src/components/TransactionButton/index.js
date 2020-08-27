import React from "react";

export default function TransactionButton({ type, id, handleDelete, handleEdit }) {
  const handleButtonClick = (event) => {
    if (event.target.innerText === "delete") {
      handleDelete(id);
      return;
    }
    handleEdit();

  };
  return (
    <>
      <i className="material-icons" onClick={handleButtonClick}>
        {type}
      </i>
    </>
  );
}
