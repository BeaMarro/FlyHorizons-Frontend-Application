import React, { useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import FlightAPI from "../../api/FlightAPI";

const dayToNumber = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
};

const numberToDay = Object.entries(dayToNumber).reduce((acc, [day, num]) => {
  acc[num] = day;
  return acc;
}, {});

function FlightForm({ show, handleClose }) {
  const [flightCode, setFlightCode] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [duration, setDuration] = useState(0);
  const [departureTime, setDepartureTime] = useState("");
  const [departureDays, setDepartureDays] = useState([]);
  const [basePrice, setBasePrice] = useState(0);

  const postFlight = async (flight) => {
    try {
        const response = await FlightAPI.postFlight(flight);
        return response.data;
    } catch (error) {
        console.error("An error occurred:", error.message);
        throw error;
    }
  };

  const handleCreateFlightSchedule = async () => {
    // Format departure_time as RFC 3339 (e.g., "1970-01-01T14:30:00Z")
    const formattedDepartureTime = departureTime
      ? `1970-01-01T${departureTime}:00Z`
      : "";

    // Construct flight object
    const flight = {
      "flight_code": flightCode,
      "departure": departure,
      "arrival": arrival,
      "duration_in_minutes": parseInt(duration),
      "departure_time": formattedDepartureTime,
      "departure_days": departureDays,
      "base_price": parseInt(basePrice)
    }

    // Post to the Flight API
    await postFlight(flight);

    // Reload the page
    window.location.reload();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Flight Management</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="formFlightCode">
                <Form.Label>Flight Code (FH + Number)</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setFlightCode(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formDeparture">
                <Form.Label>Departure</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setDeparture(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formArrival">
                <Form.Label>Arrival</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setArrival(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formDuration">
                <Form.Label>Duration (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setDuration(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formDepartureTime">
                <Form.Label>Departure Time</Form.Label>
                <Form.Control
                  type="time"
                  onChange={(e) => setDepartureTime(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formBasePrice">
                <Form.Label>Base Price</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setBasePrice(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-2" controlId="formDepartureDays">
            <Form.Label>Departure Days</Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {Object.keys(dayToNumber).map((day) => {
                const dayNum = dayToNumber[day];
                return (
                  <Form.Check
                    inline
                    key={day}
                    label={day}
                    type="checkbox"
                    id={`day-${day}`}
                    value={dayNum}
                    checked={departureDays.includes(dayNum)}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setDepartureDays((prev) =>
                        e.target.checked
                          ? [...prev, value]
                          : prev.filter((d) => d !== value)
                      );
                    }}
                  />
                );
              })}
            </div>
          </Form.Group>

          {departureDays.length > 0 && (
            <div className="mt-2">
              <strong>Selected Days:</strong>{" "}
              {departureDays
                .sort((a, b) => a - b)
                .map((num) => numberToDay[num])
                .join(", ")}
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateFlightSchedule}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FlightForm;