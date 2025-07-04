import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import BookingStatusBar from "../components/booking/BookingStatusBar";
import FlightSearchInfo from "../components/flight/FlightSearchInfo";
import ActionButton from "../components/form/ActionButton";
import AirplaneSeatMap from "../components/seat/AirplaneSeatMap";
import SelectedSeatsCard from "../components/seat/SelectedSeatsCard";
import SeatAPI from "../api/SeatAPI";

function SeatingPage() {
    const navigate = useNavigate(); 
    const location = useLocation();

    const { tripType, departure, destination, departureDate, returnDate, passengers, flight, selectedClass, selectedLuggages, totalCost } = location.state || {};

    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const fetchSeatsByFlightCode = async (flightCode) => {
        try {
            const response = await SeatAPI.getSeatsByFlightCode(flightCode)
            setSeats(response)
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    }

    const handleSeatSelection = (seat) => {
        const isSeatAlreadySelected = selectedSeats.some(
            (selectedSeat) => selectedSeat.row === seat.row && selectedSeat.column === seat.column
        );

        if (isSeatAlreadySelected) {
            // Deselect the seat
            setSelectedSeats(selectedSeats.filter(
                (selectedSeat) => selectedSeat.row !== seat.row || selectedSeat.column !== seat.column
            ));
        } else if (selectedSeats.length < passengers) {
            // Select the seat if the limit is not reached
            setSelectedSeats([...selectedSeats, seat]);
        } else {
            alert("You have reached the maximum number of passengers.");
        }
    };

    const handleProceed = () => {
        if (selectedSeats.length >= 1) {
            navigate("/passengers", { 
                state: { 
                    tripType,
                    departure,
                    destination,
                    departureDate,
                    returnDate,
                    passengers,
                    flight,
                    selectedClass,
                    selectedLuggages,
                    selectedSeats,
                    totalCost
                }});
        }
    };

    useEffect(() => {
        fetchSeatsByFlightCode(flight.flight_code);
    }, [flight]);

    return (
        <Container>
            <BookingStatusBar title="Your Fare" totalCost={totalCost} />

            <Container className="d-flex justify-content-center">
                <FlightSearchInfo
                    tripType={tripType}
                    departure={departure}
                    destination={destination}
                    departureDate={departureDate}
                    returnDate={returnDate}
                    passengers={passengers}
                    isEditable={false}
                />

                <SelectedSeatsCard
                    selectedSeats={selectedSeats}
                />
            </Container>

            <AirplaneSeatMap seats={seats} handleSeatSelection={handleSeatSelection} selectedSeats={selectedSeats} />
        
            {selectedSeats.length > 0 && (
                <Container className="text-center mt-3">
                    <ActionButton text="Proceed" size="md" variant="primary" onClick={handleProceed} />
                </Container>
            )}
        </Container>
    );
}

export default SeatingPage;