import React, { useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import AirportAPI from "../../api/AirportAPI";

function AirportForm({ show, handleClose }) {
  const [IATACode, setIATACode] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const postAirport = async (airport) => {
    try {
        const response = await AirportAPI.postAirport(airport);
        return response.data;
    } catch (error) {
        console.error("An error occurred:", error.message);
        throw error;
    }
  };

  const handleCreateAirport = async () => {
    // Construct airport object
    const airport = {
      "iata_code": IATACode,
      "name": name,
      "city": city,
      "country": country
    }

    console.log("Airport object:")
    console.log(airport)

    // Post to the Airport API
    await postAirport(airport);

    // Reload the page
    window.location.reload();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Airport Management</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="formIATACode">
                <Form.Label>Airport Code - <i>IATA Code</i></Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setIATACode(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Form.Group>
            </Col>
           </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateAirport}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AirportForm;