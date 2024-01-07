// import React from "react";

interface TotalProps {
  total: number;
}

const Total = (props: TotalProps) => {
  return (
    <>
      <h1>{props.total}</h1>
    </>
  );
};

export default Total;
