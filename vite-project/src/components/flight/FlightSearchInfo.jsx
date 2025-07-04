import React from "react";
import { Link } from "react-router-dom";
import ActionButton from "../form/ActionButton";
import "../../styles/FlightSearchInfo.css";
import { Card } from "react-bootstrap";

function FlightSearchInfo({ tripType, departure, destination, departureDate, returnDate, passengers, isEditable }) {
    const isReturnTrip = tripType.toLowerCase() === "return trip";

    return (
        <Card className="d-flex align-items-center mini-card">
            <div className="me-4">
                <p><b>Type:</b> {tripType}</p>
                <p><b>Departure:</b> {departure}</p>
                {isReturnTrip && <p><b>Arrival:</b> {destination}</p>}
                <p><b>Departure Date:</b> {departureDate}</p>
                {isReturnTrip && <p><b>Return Date:</b> {returnDate}</p>}
                <p><b>Passengers:</b> {passengers}</p>
            </div>

            {isEditable &&
                <Link to="/search-flights">
                    <ActionButton text="Modify Search" size="sm" />
                </Link>
            }
        </Card>
    );
}

export default FlightSearchInfo;