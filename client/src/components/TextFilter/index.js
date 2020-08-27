import React from "react";

export default function TextFilter({handleFilter}) {
  return (
    <>
      <input type="text" onChange={handleFilter}/>
    </>
  );
}
