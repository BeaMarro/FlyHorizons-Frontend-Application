import React from "react";
import "../../styles/FlightSearchInfo.css";
import { Card } from "react-bootstrap";

function SelectedSeatsCard({ selectedSeats }) {
    return (
        <Card className="d-flex align-items-center mini-card">
            <div className="me-4">
                <p><b>Selected Seats:</b></p>
                {selectedSeats.length > 0 ? (
                    <ul>
                        {selectedSeats.map((seat, index) => (
                            <li key={index}>{seat.row} {seat.column}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No seats have been selected yet.</p>
                )}
            </div>
        </Card>
    );
}

export default SelectedSeatsCard;