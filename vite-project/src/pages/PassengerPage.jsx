import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import FlightSearchInfo from "../components/flight/FlightSearchInfo";
import ActionButton from "../components/form/ActionButton";
import BookingStatusBar from "../components/booking/BookingStatusBar";
import PassengerForm from "../components/PassengerForm";
import BookingAPI from "../api/BookingAPI";
import TokenManager from "../api/TokenManager";

function PassengerPage() {
    const navigate = useNavigate(); 
    const location = useLocation();

    const { tripType, departure, destination, departureDate, returnDate, passengers, flight, selectedClass, selectedLuggages, selectedSeats, totalCost } = location.state || {};
    
    const [bookingPassengers, setBookingPassengers] = useState([])

    const handleSubmit = (passengers) => {
        setBookingPassengers(passengers)
    };

    const postBooking = async (booking) => {
        try {
            const response = await BookingAPI.postBooking(booking);
            console.log("Booking successful:", response.data);
            return response.data;
        } catch (error) {
            console.error("An error occurred:", error.message);
            throw error;
        }
    };

    const handleProceed = () => {
        if (selectedSeats.length >= 1) {
            navigate("/payment", { 
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
                    totalCost,
                    bookingPassengers
                }});
        }
    };

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
            </Container>

            <Container>
                <PassengerForm onSubmit={handleSubmit} numberOfPassengers={passengers} />
            
                {bookingPassengers.length === passengers && (
                    <Container className="text-center mt-3">
                        <ActionButton text="Proceed" size="md" variant="primary" onClick={handleProceed} />
                    </Container>
                )}
            </Container>
        </Container>
    );
}

export default PassengerPage;