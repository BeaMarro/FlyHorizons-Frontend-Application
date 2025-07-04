import React from "react";
import { Button, Card } from "react-bootstrap";
import "../../styles/BookingInformationCard.css"
import BookingAPI from "../../api/BookingAPI";
import { useNavigate } from "react-router-dom";

function BookingInformationCard({ booking, flight }) {    
    if (!booking) {
        return <h2>Error: No booking details available.</h2>;
    }

    // Group luggage items count
    const luggageCount = booking.luggage.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {});

    const deleteBooking = async (id) => {
        try {
          if (await BookingAPI.deleteBookingByID(id)) {
                window.location.reload()
            }
        } catch (error) {
          console.error("Error deleting booking:", error);
        }
    };

    return (
        <Card>
            <Card.Header>
                <h5>Flight: {booking.flight_code}</h5>
            </Card.Header>
            <Card.Body>
                <p>
                    <strong>Departing from:</strong> {flight.departure}  
                    <br />
                    <strong>Arriving at:</strong> {flight.arrival}
                </p>

                <p>
                    <strong>Class:</strong> {booking.flight_class === 0 ? "Economy" : booking.flight_class === 1 ? "Business" : "Unknown"}
                </p>

                <p>
                    <strong>Luggage:</strong>
                    <ul>
                        {Object.entries(luggageCount).map(([luggageType, count], index) => (
                            <li key={index}>
                                {luggageType} x {count}
                            </li>
                        ))}
                    </ul>
                </p>

                <p>
                    <strong>Passengers ({booking.passengers.length}):</strong>
                    <ul>
                        {booking.passengers.map((passenger, index) => (
                            <li key={index}>
                                {passenger.full_name} (Passport: {passenger.passport_number})
                            </li>
                        ))}
                    </ul>
                </p>

                <p>
                    <strong>Seats:</strong>
                    <ul>
                        {booking.seats.map((seat, index) => (
                            <li key={index}>
                               {seat.row} {seat.column}
                            </li>
                        ))}
                    </ul>
                </p>

                <Button
                    variant="danger"
                    onClick={() => deleteBooking(booking.id)}
                    >
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
}

export default BookingInformationCard;