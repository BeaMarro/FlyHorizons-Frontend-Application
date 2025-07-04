import React, { useEffect, useState } from "react";
import { Card, Image, Container, Row, Col } from "react-bootstrap";
import DateTimeUtilities from "../utilities/DateTimeUtilities";
import "../../styles/FlightCard.css";
import airplaneIcon from "../../assets/airplane icon.png";
import ActionButton from "../form/ActionButton";
import AirportAPI from "../../api/AirportAPI";

function FlightCard({ flight, departureDate, handleSelect, handleProceed }) {
    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [isSelected, setIsSelected] = useState(false);
    const [departureAirportName, setDepartureAirportName] = useState("");
    const [arrivalAirportName, setArrivalAirportName] = useState("");

    const formatDepartureTime = () => {
        const time = DateTimeUtilities.convertToTime(flight.departure_time);
        setDepartureTime(time);
    };

    const calculateArrivalTime = () => {
        const totalTime = DateTimeUtilities.addMinutesToTime(
            flight.departure_time,
            flight.duration_in_minutes
        );
        setArrivalTime(totalTime);
    };

    const getAirport = async (IATACode) => {
        try {
            const response = await AirportAPI.getByIATACode(IATACode);
            return response;
        } catch (error) {
            console.error("An error occurred while fetching airport data:", error.message);
            throw error;
        }
    };

    useEffect(() => {
        formatDepartureTime();

        const fetchAirports = async () => {
            try {
                const departure = flight.departure
                const arrival = flight.arrival

                const depAirport = await getAirport(departure);
                const arrAirport = await getAirport(arrival);

                setDepartureAirportName(depAirport.city);
                setArrivalAirportName(arrAirport.city);
            } catch (error) {
                console.error("Failed to fetch airport names.");
            }
        };

        fetchAirports();
    }, [flight]);

    useEffect(() => {
        if (departureTime) {
            calculateArrivalTime();
        }
    }, [departureTime]);

    const handleFlightSelection = () => {
        setIsSelected(true);
        handleSelect(flight);
    };

    return (
        <Container>
            <h5>
                {departureDate} · {departureAirportName} to {arrivalAirportName} ·{" "}
                <b>€{flight.base_price}</b>
            </h5>
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <Container className="text-container">
                                <p className="mini-heading">{departureTime}</p>
                                <p>{departureAirportName}</p>
                            </Container>
                        </Col>

                        <Col>
                            <Container className="text-container">
                                <p>{flight.flight_code}</p>
                                <p>
                                    {DateTimeUtilities.convertMinutesToTime(flight.duration_in_minutes)}
                                </p>
                                <Image src={airplaneIcon} />
                            </Container>
                        </Col>

                        <Col>
                            <Container className="d-flex justify-content-between align-items-center">
                                <Container className="text-container">
                                    <p className="mini-heading">{arrivalTime}</p>
                                    <p>{arrivalAirportName}</p>
                                </Container>

                                <Container>
                                    {!isSelected ? (
                                        <ActionButton
                                            text="Select"
                                            size="sm"
                                            type="submit"
                                            onClick={handleFlightSelection}
                                        />
                                    ) : (
                                        <ActionButton
                                            text="Selected"
                                            size="sm"
                                            variant="success"
                                            disabled
                                        />
                                    )}
                                </Container>
                            </Container>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {isSelected && (
                <Container className="text-center mt-3">
                    <ActionButton
                        text="Proceed"
                        size="md"
                        variant="primary"
                        onClick={handleProceed}
                    />
                </Container>
            )}
        </Container>
    );
}

export default FlightCard;