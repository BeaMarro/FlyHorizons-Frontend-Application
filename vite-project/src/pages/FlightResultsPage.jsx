import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import BookingStatusBar from "../components/booking/BookingStatusBar";
import FlightSearchInfo from "../components/flight/FlightSearchInfo";
import FlightCard from "../components/flight/FlightCard";
import FlightAPI from "../api/FlightAPI";

function FlightResultsPage() {
    const navigate = useNavigate(); 
    const location = useLocation();

    const { tripType, departure, destination, departureDate, returnDate, passengers } = location.state || {};

    const [totalCost, setTotalCost] = useState("0");
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState([]);

    const getFilteredFlights = async (departureAirport, arrivalAirport, departureDate) => {
        setIsLoading(true);
        try {
            const response = await FlightAPI.filterFlightsByAll({
                departureAirport,
                arrivalAirport,
                departureDate,
            });
            setFilteredFlights(response);
            console.log("Filtered Flights Response:", response);
        } catch (error) {
            console.error('An error occurred:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelect = (flight) => {
        // Can select just one flight for simplicity reasons, this could be modified in the future
        setSelectedFlight(flight);
        const totalPrice = flight.base_price * passengers;
        setTotalCost(totalPrice);
    };
        
    const handleProceed = () => {        
        if (selectedFlight) { // Ensures that a flight was selected
            navigate("/class", { 
                state: { 
                    tripType,
                    departure,
                    destination,
                    departureDate,
                    returnDate,
                    passengers,
                    flight: selectedFlight,
                    totalCost
                }});
        }
    }

    useEffect(() => {
        getFilteredFlights(departure, destination, departureDate);
    }, [departure, destination, departureDate]);

    return (
        <Container>
            <BookingStatusBar title="Your Booking" totalCost={totalCost} />
            
            <FlightSearchInfo
                tripType={tripType}
                departure={departure}
                destination={destination}
                departureDate={departureDate}
                returnDate={returnDate}
                passengers={passengers}
                isEditable={true}
            />

            <div>
                {isLoading ? (
                    <p>Loading flights...</p>
                ) : filteredFlights.length > 0 ? (
                    filteredFlights.map((flight) => (
                        <FlightCard 
                            flight={flight}
                            departureDate={departureDate}
                            handleSelect={handleSelect}
                            handleProceed={handleProceed}
                        />
                    ))
                ) : (
                    <p>No flights available.</p>
                )}
            </div>

        </Container>
    );
}

export default FlightResultsPage;