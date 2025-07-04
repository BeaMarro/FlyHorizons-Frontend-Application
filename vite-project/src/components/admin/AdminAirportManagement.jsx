import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Loader from "../Loader";
import AirportsTable from "../airport/AirportsTable";
import AirportAPI from "../../api/AirportAPI";
import AirportForm from "../airport/AirportForm";

function AdminAirportManagement() {
  const [showModal, setShowModal] = useState(false);
  const [airports, setAirports] = useState(null);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const getAirports = async () => {
    try {
      const response = await AirportAPI.getAll();
      setAirports(response);
    } catch (error) {
      console.error("An error occurred while fetching airports:", error.message);
    }
  };

  useEffect(() => {
    getAirports();
  }, []);

  return (
    <div className="p-4">      
      {airports === null ? (
        <Loader />
      ) : (
        <>
          <Button variant="primary" onClick={handleOpen} className="mb-3">
            Add Airport
          </Button>
          <AirportsTable airports={airports} />
        </>
      )}

      <AirportForm show={showModal} handleClose={handleClose} />
    </div>
  );
}

export default AdminAirportManagement;