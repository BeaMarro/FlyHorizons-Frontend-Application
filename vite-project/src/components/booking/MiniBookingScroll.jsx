import React, { useEffect, useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import BookingInformationCard from "./BookingInformationCard";
import FlightAPI from "../../api/FlightAPI";

function MiniBookingScroll({ bookings }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [flight, setFlight] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getFlight = async (flightCode) => {
    try {
      const fetchedFlight = await FlightAPI.getByFlightCode(flightCode);
      console.log("Flight:", fetchedFlight);
      return fetchedFlight;
    } catch (error) {
      console.error("Error fetching flight:", error);
      return null;
    }
  };

  const handleModalToggle = async (booking) => {
    if (booking) {
      setSelectedBooking(booking);
      setIsLoading(true);
      setShowModal(true);
      const fetchedFlight = await getFlight(booking.flight_code);
      setFlight(fetchedFlight);
      setIsLoading(false);
    } else {
      setSelectedBooking(null);
      setFlight(null);
      setShowModal(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Bookings:", bookings);
  }, [bookings]);

  return (
    <Container className="mini-booking-scroll">
      {bookings.map((booking, index) => (
        <div key={index} className="booking-card">
          <p><b>Booking for Flight Number:</b> {booking.flight_code}</p>
          <Button onClick={() => handleModalToggle(booking)}>View</Button>
        </div>
      ))}

      <Modal show={showModal} onHide={() => handleModalToggle(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <p>Loading...</p>
          ) : selectedBooking ? (
            <BookingInformationCard
              booking={selectedBooking}
              flight={flight}
            />
          ) : (
            <p>No booking selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleModalToggle(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default MiniBookingScroll;