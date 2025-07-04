import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import FlightSearchInfo from "../components/flight/FlightSearchInfo";
import ActionButton from "../components/form/ActionButton";
import BookingStatusBar from "../components/booking/BookingStatusBar";
import BookingAPI from "../api/BookingAPI";
import TokenManager from "../api/TokenManager";
import PaymentForm from "../components/PaymentForm";

function PaymentPage() {
    const navigate = useNavigate(); 
    const location = useLocation();

    const { tripType, departure, destination, departureDate, returnDate, passengers, flight, selectedClass, selectedLuggages, selectedSeats, totalCost, bookingPassengers } = location.state || {};
    
    const [paymentDetails, setPaymentDetails] = useState(null)

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

    const handleProceed = async () => {
        if (bookingPassengers.length === passengers) {
            // Construct the Booking object
            const booking = {
                user_id: TokenManager.getClaims().account_id, // Logged in userID
                flight_code: flight.flight_code,
                flight_class: selectedClass,
                luggage: selectedLuggages,
                seats: selectedSeats,
                passengers: bookingPassengers,
                payment: paymentDetails,
            }

            console.log("Booking:", booking)
    
            try {
                const bookingPosted = await postBooking(booking);
                navigate("/confirmation", { 
                    state: {
                        bookingPosted 
                    }
                });
            } catch (error) {
                alert("Something went wrong while making your booking, please try again later");
            }
        }
    };

    const handlePaymentSubmit = (paymentJSON) => {
        console.log("Received payment details:", paymentJSON);
        setPaymentDetails(paymentJSON);
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
                <PaymentForm amount={totalCost} onSubmit={handlePaymentSubmit} />        
                {paymentDetails != null && (
                <Container className="text-center mt-3">
                    <ActionButton text="Submit Booking" size="md" variant="primary" onClick={handleProceed} />
                </Container>
                )}
            </Container>
        </Container>
    );
}

export default PaymentPage;