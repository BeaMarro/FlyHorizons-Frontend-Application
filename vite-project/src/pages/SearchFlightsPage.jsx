import React, { useEffect, useState } from "react";
import { Form, Container } from "react-bootstrap";
import ActionButton from "../components/form/ActionButton";
import InputControl from "../components/form/InputControl";
import { useNavigate } from "react-router-dom";
import AirportAPI from "../api/AirportAPI";
import FlightAPI from "../api/FlightAPI";
import SelectDepartureAirport from "../components/airport/form/SelectDepartureAirport";
import SelectArrivalAirport from "../components/airport/form/SelectArrivalAirport";
import Loader from "../components/Loader";

function SearchFlightsPage() {
    const navigate = useNavigate(); 

    // Loading State
    const [isLoading, setIsLoading] = useState(false)

    // Airport data
    const [airports, setAirports] = useState([])
    const [arrivalAirports, setArrivalAirports] = useState([])

    // User flight input data
    const [tripType, setTripType] = useState("Return Trip");
    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [passengers, setPassengers] = useState(1);

    const getAllAirports = async () => {
        try {
            const response = await AirportAPI.getAll()
            setAirports(response);
        } catch (error) {
            console.error('An error occurred:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getAirportsByDeparture = async () => {
        try {
            // Only done if the departure airport has been selected
            if (departure != "") {
                // Reset the arrival airports
                setArrivalAirports([]); 

                // Get arrival airport codes
                const response = await FlightAPI.filterFlightsByDeparture(departure)
                const arrivalAirportCodes = response.map(flight => flight.arrival)
                
                // Get airports by arrival airport codes
                if (arrivalAirportCodes.length >= 1) {
                    for (const arrivalAirportCode of arrivalAirportCodes) {
                        const airport = await AirportAPI.getByIATACode(arrivalAirportCode);
                        setArrivalAirports(prevAirports => [...prevAirports, airport]);
                    }
                }
                else {
                    // No departures from the given airport
                    setArrivalAirports([])
                }
            }
            else {
                setArrivalAirports([])
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAllAirports();
    }, [])

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            await getAirportsByDeparture();
            setIsLoading(false);
        };
        fetch();
    }, [departure]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Search button clicked...");
        console.log({ tripType, departure, destination, departureDate, returnDate, passengers });
        
        navigate("/flights", { 
            state: { 
                tripType,
                departure,
                destination,
                departureDate,
                returnDate,
                passengers
            }
        });
    };

    return (
        <div className="search-flights-background">
            {isLoading &&
                <Loader />
            }
            <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
                <h1>Make a Booking</h1>
                <Container className="card">
                    <Form>
                        {/* Trip Type Selection */}
                        <Container className="d-flex mb-3">
                            <Form.Check
                                type="checkbox"
                                id="returnTrip"
                                name="tripType"
                                label="Return Trip"
                                value="Return Trip"
                                checked={tripType === "Return Trip"}
                                onChange={(e) => setTripType(e.target.value)}
                                className="me-3"
                            />
                            <Form.Check
                                type="checkbox"
                                id="oneWay"
                                name="tripType"
                                label="One Way"
                                value="One Way"
                                checked={tripType === "One Way"}
                                onChange={(e) => setTripType(e.target.value)}
                            />
                        </Container>

                        {/* Departure Airport */}
                        <Container>
                            <p>Departure Airport</p>
                            <SelectDepartureAirport airports={airports} setDepartureAirport={setDeparture} />
                        </Container>
                            
                        {/* Arrival Airport */}
                        {departure !== "" && arrivalAirports.length > 0 && !isLoading && (
                            <Container>
                                <p>Arrival Airport</p>
                                    <SelectArrivalAirport
                                        arrivalAirports={arrivalAirports}
                                        setArrivalAirport={setDestination}
                                    />
                            </Container>
                        )}

                        {/* Date Pickers */}
                        <Container className="d-flex">
                            <InputControl
                                label="Departure Date"
                                type="date"
                                value={departureDate}
                                onChange={setDepartureDate}
                            />
                            {tripType === "Return Trip" && (
                                <InputControl
                                    label="Return Date"
                                    type="date"
                                    value={returnDate}
                                    onChange={setReturnDate}
                                />
                            )}
                        </Container>

                        {/* Passengers Field */}
                        <Container className="d-flex">
                            <InputControl
                                label="Passengers"
                                type="number"
                                value={passengers}
                                onChange={(value) => setPassengers(Math.max(1, value))}
                            />
                        </Container>

                        {/* Search Button */}
                        <ActionButton text="Search" size="sm" type="submit" onClick={handleSubmit} />
                    </Form>
                </Container>
            </Container> 
        </div>
    );
}

export default SearchFlightsPage;