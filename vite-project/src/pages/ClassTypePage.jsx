import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import BookingStatusBar from "../components/booking/BookingStatusBar";
import FlightSearchInfo from "../components/flight/FlightSearchInfo";
import SelectFlightClass from "../components/SelectFlightClass";
import ActionButton from "../components/form/ActionButton";
import economy from "../assets/class economy.png";
import business from "../assets/class business.png";

function ClassTypePage() {
    const navigate = useNavigate(); 
    const location = useLocation();

    const { tripType, departure, destination, departureDate, returnDate, passengers, flight, totalCost } = location.state || {};

    const [selectedClass, setSelectedClass] = useState(null);
    const [updatedCost, setUpdatedCost] = useState(totalCost)

    const handleSelect = (flightClassNumber) => {
        setSelectedClass(flightClassNumber)

        // Increase the total price if the business class is selected
        if (flightClassNumber == 1) {
            const totalPrice = totalCost + (100 * passengers)
            setUpdatedCost(totalPrice)
        }
    };

    const handleProceed = () => {
        if (selectedClass != null) {
            navigate("/luggage", { 
                state: { 
                    tripType,
                    departure,
                    destination,
                    departureDate,
                    returnDate,
                    passengers,
                    flight,
                    selectedClass,
                    updatedCost
                }});
        }
    };

    useEffect(() => {
    }, [updatedCost]);

    return (
        <Container>
            <BookingStatusBar title="Your Fare" totalCost={updatedCost} />

            <FlightSearchInfo
                tripType={tripType}
                departure={departure}
                destination={destination}
                departureDate={departureDate}
                returnDate={returnDate}
                passengers={passengers}
                isEditable={false}
            />

            <h3 className="left">Select the Fare that suits you best</h3>
            <Container className="d-flex justify-content-center">
                <SelectFlightClass
                    backgroundImage={economy}
                    title={"Economy"}
                    pricing={"Included"}
                    bulletPoints={[
                        "Basic seating",
                        "Simple refreshments included",
                        "No access to airport business lounge"
                    ]}
                    selected={selectedClass === 0} // Check if Economy is selected
                    handleSelect={() => handleSelect(0)}
                />

                <SelectFlightClass
                    backgroundImage={business}
                    title={"Business"}
                    pricing={"+€100"}
                    bulletPoints={[
                        "Larger, more comfortable seating",
                        "Delicious meal",
                        "Access to airport business lounge"
                    ]}
                    selected={selectedClass === 1} // Check if Business is selected
                    handleSelect={() => handleSelect(1)}
                />
            </Container>

            {/* Show Proceed Button When Selected */}
            {selectedClass !== null && (
                <Container className="text-center mt-3">
                    <ActionButton text="Proceed" size="md" variant="primary" onClick={handleProceed} />
                </Container>
            )}
        </Container>
    );
}

export default ClassTypePage;