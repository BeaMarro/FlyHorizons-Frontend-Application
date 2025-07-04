import React, { useState, useRef } from "react";
import { Form, Card, Alert, Row, Col } from "react-bootstrap";
import ActionButton from "./form/ActionButton";
import InputControl from "./form/InputControl";

function PaymentForm({ amount, onSubmit }) {
  const [IBAN, setIBAN] = useState("");
  const [CVV, setCVV] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);

  const currency = "EUR";

  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!IBAN || !CVV || !firstName || !lastName) {
      setError("Please fill in all fields.");
      return;
    }

    setError(null);

    const nonce = crypto.randomUUID(); // Generate a unique string
    const timestamp = new Date().toISOString(); // Current UTC time ISO 8601 format

    const paymentJSON = {
      iban: IBAN,
      cvv: CVV,
      first_name: firstName,
      last_name: lastName,
      amount: amount,
      currency: currency,
      nonce: nonce,
      timestamp: timestamp,
    };

    onSubmit(paymentJSON);
  };

  return (
    <Card className="mb-4 p-3">
      <Card.Header>
        <h5>Payment Information</h5>
      </Card.Header>
      <Card.Body>
        <p>Please enter your payment information. It will be processed once your flight booking is submitted.</p>
        <p>Total cost: <b>€{amount}</b>.</p>

        <Form onSubmit={handleSubmit} ref={formRef}>
          {error && <Alert variant="danger">{error}</Alert>}

          <p><b>Bank Card Details:</b></p>
          <Row>
            <Col md={3}>
              <InputControl label="IBAN" type="text" value={IBAN} onChange={setIBAN} />
            </Col>
            <Col md={3}>
              <InputControl label="CVV" type="text" value={CVV} onChange={setCVV} />
            </Col>
          </Row>

          <p><b>Cardholder Name:</b></p>
          <Row>
            <Col md={3}>
              <InputControl label="First Name" type="text" value={firstName} onChange={setFirstName} />
            </Col>
            <Col md={3}>
              <InputControl label="Last Name" type="text" value={lastName} onChange={setLastName} />
            </Col>
          </Row>

          {/* This button actually submits the form but is hidden */}
          <button type="submit" style={{ display: "none" }} />

          {/* Use ActionButton to simulate a click on the hidden button */}
          <ActionButton
            text="Submit Payment"
            className="mt-3"
            onClick={() => formRef.current?.requestSubmit()}
          />
        </Form>
      </Card.Body>
    </Card>
  );
}

export default PaymentForm;