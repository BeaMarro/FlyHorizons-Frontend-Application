import React from "react";
import { Container } from "react-bootstrap";
import Seat from "./Seat";

function AirplaneSeatMap({ seats, handleSeatSelection, selectedSeats }) {
    // Group seats by row
    const groupedSeats = seats.reduce((acc, seat) => {
        if (!acc[seat.row]) acc[seat.row] = [];
        acc[seat.row].push(seat);
        return acc;
    }, {});

    return (
        <Container>
        <h3>Choose your seating</h3>
        <Container className="d-flex justify-content-center align-items-center">
            <Container>
                {Object.entries(groupedSeats).map(([row, rowSeats]) => (
                    <div key={row}>
                        {rowSeats.map((seat) => (
                            <Seat
                                key={`${seat.row}-${seat.column}`}
                                isAvailable={seat.available}
                                column={seat.column}
                                row={seat.row}
                                handleSelectSeat={() => handleSeatSelection(seat)}
                                isSelected={selectedSeats.some(
                                    (selectedSeat) => selectedSeat.row === seat.row && selectedSeat.column === seat.column
                                )}
                            />
                        ))}
                    </div>
                ))}
            </Container>
        </Container>
        </Container>
    );
}

export default AirplaneSeatMap;