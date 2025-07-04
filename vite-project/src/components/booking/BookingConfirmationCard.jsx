import React from "react";
import { Card } from "react-bootstrap";
import "../../styles/BookingConfirmationCard.css"

function BookingConfirmationCard({ booking, flight }) {    
    // Group luggage items count
    const luggageCount = booking.luggage.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {});
   
    return (
        <Card className="confirmation-booking-card">
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
            </Card.Body>
            <Card.Footer>
                <p><i>A confirmation email has been sent to all of the Booking passengers.</i></p>
            </Card.Footer>
        </Card>
    );
}

export default BookingConfirmationCard;