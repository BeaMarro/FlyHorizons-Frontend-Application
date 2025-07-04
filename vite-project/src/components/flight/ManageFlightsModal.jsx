import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function FlightScheduler() {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <Button variant="primary" onClick={handleModalToggle}>
        Open Scheduler
      </Button>

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalToggle}>
        <Modal.Header closeButton>
          <Modal.Title>Flight Scheduler</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Scheduling flights</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalToggle}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FlightScheduler;