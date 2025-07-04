import React, { useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import AirportAPI from "../../api/AirportAPI";

function AirportsTable({ airports }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [modalMode, setModalMode] = useState("view");

  const handleOpen = (airport, mode) => {
    setSelectedAirport({ ...airport });
    setModalMode(mode);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedAirport(null);
  };

  const handleDelete = async (IATACode) => {
    try {
      await AirportAPI.deleteByIATACode(IATACode);
      window.location.reload();
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      await AirportAPI.putAirport(selectedAirport);
      window.location.reload();
      handleClose();
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const handleChange = (event, key) => {
    setSelectedAirport((prevAirport) => ({
      ...prevAirport,
      [key]: event.target.value
    }));
  };

  return (
    <>
      <div style={{ maxHeight: "350px", overflowY: "auto", width: "calc(100% + 50px)" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>IATA Code</th>
              <th>City</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(airports) && airports.length > 0 ? (
              airports.map((airport) => (
                <tr key={airport.iata_code}>
                  <td>{airport.iata_code}</td>
                  <td>{airport.city}</td>
                  <td>{airport.country}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleOpen(airport, "view")}>
                      View
                    </Button>{" "}
                    <Button variant="warning" onClick={() => handleOpen(airport, "update")}>
                      Update
                    </Button>{" "}
                    <Button variant="danger" onClick={() => handleDelete(airport.iata_code)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No airports available.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {selectedAirport && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalMode === "view" ? "View Airport" : "Update Airport"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {Object.keys(selectedAirport).map((key) => (
              <div key={key}>
                <strong>{key}:</strong>{" "}
                <input
                  type="text"
                  value={selectedAirport[key]}
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

export default AirportsTable;