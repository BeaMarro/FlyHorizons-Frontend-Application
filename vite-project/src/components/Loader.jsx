import React from "react";
import "../styles/Loader.css";
import { Container, Spinner } from "react-bootstrap";

function Loader() {
  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Spinner animation="border" size="lg" variant="primary" className="me-3" />
      <h4>Loading...</h4>
    </Container>
  );
}

export default Loader;