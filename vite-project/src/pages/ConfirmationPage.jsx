import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import FlightAPI from "../api/FlightAPI";
import Loader from "../components/Loader";
import BookingConfirmationCard from "../components/booking/BookingConfirmationCard";

function ConfirmationPage() {
    const location = useLocation();

    const { bookingPosted } = location.state || {};

    const [flight, setFlight] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchFlightByFlightCode = async (flightCode) => {
        try {
            const response = await FlightAPI.getByFlightCode(flightCode);
            setFlight(response);
            setIsLoading(false);
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    };

    useEffect(() => {
        fetchFlightByFlightCode(bookingPosted.flight_code);
    }, [bookingPosted]);

    return (
        <div className="confirmation-booking-background">
            {isLoading ? (
                <Loader />
            ) : (
                <Container>
                    <h1>Thank you for booking a flight with <b>FlyHorizons</b>.</h1>
                    <p>We wish you a pleasant flight!</p>

                    <h1>Your Booking:</h1>

                    <Container className="d-flex justify-content-center align-items-center">
                        <BookingConfirmationCard booking={bookingPosted} flight={flight} />
                    </Container>
                </Container>
            )}
        </div>
    );
}

export default ConfirmationPage;