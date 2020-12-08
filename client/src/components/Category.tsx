import React from "react";
import { useParams } from "react-router-dom";
import { Container, Jumbotron } from "reactstrap";

function Category() {
  let { cat }: { cat: string } = useParams();
  return (
    <Container style={{ color: "black" }}>
      <Jumbotron>
        <h1>Category: {cat}</h1>
      </Jumbotron>
    </Container>
  );
}

export default Category;
