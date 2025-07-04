import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import FlightForm from "../flight-management/FlightForm";
import FlightsTable from "../flight-management/FlightsTable";
import FlightAPI from "../../api/FlightAPI";
import Loader from "../Loader";

function AdminFlightManagement() {
  const [showModal, setShowModal] = useState(false);
  const [flights, setFlights] = useState(null);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const getFlights = async () => {
    try {
      const response = await FlightAPI.getAllFlights();
      setFlights(response);
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  useEffect(() => {
    getFlights();
  }, []);

  return (
    <div className="p-4">      
      {flights === null ? (
        <Loader />
      ) : (
        <>
          <Button variant="primary" onClick={handleOpen} className="mb-3">
            Add Flight Schedule
          </Button>
          <FlightsTable flights={flights} />
        </>
      )}

      <FlightForm show={showModal} handleClose={handleClose} />
    </div>
  );
}

export default AdminFlightManagement;