import React, { useState } from "react";
import { Button } from "react-bootstrap";

function Seat({ isAvailable, column, row, handleSelectSeat }) {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        // Cannot select a seat that is unavailable
        if (!isAvailable) return;
        setIsSelected(!isSelected);

        const seat = {
            row,
            column,
            available: false
        }
        handleSelectSeat(seat);
    };

    const isCorridorSeat = column === "C"; 

    return (
        <>
            <Button 
                variant={isSelected ? "primary" : isAvailable ? "success" : "danger"} 
                onClick={handleClick}
                disabled={!isAvailable} // Disables the button if seat is unavailable
                // Adds spacing to represent the corridor to seats in columns "C"
                style={{ marginRight: isCorridorSeat ? "15px" : "0" }}
            >
                {column}
            </Button>
        </>
    );
}

export default Seat;