import React from "react";
import { useParams } from "react-router-dom";

function Category() {
  let { cat }: { cat: string } = useParams();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Category: {cat}</h1>
    </div>
  );
}

export default Category;
