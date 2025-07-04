import React, { useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import FlightAPI from "../../api/FlightAPI";

function FlightsTable({ flights }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [modalMode, setModalMode] = useState("view");

  const handleOpen = (flight, mode) => {
    setSelectedFlight({ ...flight });
    setModalMode(mode);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedFlight(null);
  };

  const handleDelete = async (flightCode) => {
    try {
      await FlightAPI.deleteFlightByFlightCode(flightCode);
      window.location.reload();
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      await FlightAPI.putFlight(selectedFlight);
      window.location.reload();
      handleClose();
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const handleChange = (event, key) => {
    let value;
  
    if (key === "departure_days") {
      // Split the departure days into a list of integer using a comma
      value = event.target.value.split(",").map((day) => parseInt(day.trim(), 10));
    } else if (key === "duration_in_minutes" || key === "base_price") {
      value = parseInt(event.target.value, 10);
    } else {
      value = event.target.value;
    }
  
    setSelectedFlight((prevFlight) => ({
      ...prevFlight,
      [key]: value,
    }));
  };

  return (
    <>
      <div style={{ maxHeight: "350px", overflowY: "auto", width: "calc(100% + 50px)" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Flight Code</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(flights) && flights.length > 0 ? (
              flights.map((flight) => (
                <tr key={flight.flight_code}>
                  <td>{flight.flight_code}</td>
                  <td>{flight.departure}</td>
                  <td>{flight.arrival}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleOpen(flight, "view")}>
                      View
                    </Button>
                    <Button variant="warning" onClick={() => handleOpen(flight, "update")}>
                      Update
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(flight.flight_code)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No flights available.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

        {selectedFlight && (
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{modalMode === "view" ? "View Flight" : "Update Flight"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {Object.keys(selectedFlight).map((key) => (
                <div key={key}>
                  <strong>{key}:</strong>{" "}
                  <input
                    type="text"
                    value={selectedFlight[key]}
                    onChange={(event) => handleChange(event, key)}
                    disabled={modalMode === "view"}
                    className="form-control my-2"
                  />
                </div>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {modalMode === "update" && (
                <Button onClick={handleUpdate} variant="success">
                  Save Changes
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        )}
    </>
  );
}

export default FlightsTable;