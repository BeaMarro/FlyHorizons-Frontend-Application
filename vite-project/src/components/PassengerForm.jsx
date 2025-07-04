import React, { useState } from "react";
import { Form, Row, Col, Card, Alert } from "react-bootstrap";
import ActionButton from "./form/ActionButton";
import InputControl from "./form/InputControl";

function PassengerForm({ onSubmit, numberOfPassengers }) {
    const [passengers, setPassengers] = useState([]);
    
    // Passenger information
    const [fullName, setFullName] = useState("");
    const [passportNumber, setPassportNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    
    // Form state
    const [currentPassenger, setCurrentPassenger] = useState(1);
    const [isComplete, setIsComplete] = useState(false);
    const [error, setError] = useState("");

    const formatDateToISO = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split(".")[0] + "Z"; // Remove milliseconds for cleaner format
    };    

    const addPassenger = () => {
        if (fullName.trim() !== "" && passportNumber.trim() !== "" && dateOfBirth !== "") {
            const dateOfBirthFormatted = formatDateToISO(dateOfBirth);
            
            const passenger = {
                full_name: fullName,
                passport_number: passportNumber,
                date_of_birth: dateOfBirthFormatted,
                email: email
            };
            
            setPassengers((prevPassengers) => {
                const updatedPassengers = [...prevPassengers, passenger];

                if (updatedPassengers.length === numberOfPassengers) {
                    setIsComplete(true);
                }
                return updatedPassengers;
            });

            setError("");

            // Reset fields for next passenger
            setFullName("");
            setPassportNumber("");
            setDateOfBirth("");
            setEmail("");

            // Update passenger count
            setCurrentPassenger((prev) => prev + 1);
        } else {
            setError("Please fill in all the passenger details.");
        }
    };

    const handleSubmit = () => {
        if (isComplete) {
            onSubmit(passengers);
        } else {
            addPassenger();
        }
    };

    return (
        <Card className="mb-4 p-3">
            <Card.Header>
                <h5>Passenger {currentPassenger} of {numberOfPassengers}</h5>
            </Card.Header>
            <Card.Body>
                <Form>
                    {error && <Alert variant="danger">{error}</Alert>}
                    
                    {isComplete ? (
                        <div className="mb-3">
                            <Alert variant="success">
                                All {numberOfPassengers} passenger details have been added!
                            </Alert>
                            <h6>Passenger Summary:</h6>
                            {passengers.map((passenger, index) => (
                                <div key={index} className="mb-2">
                                    <strong>Passenger {index + 1}:</strong> {passenger.full_name}, 
                                    Passport Number: {passenger.passport_number}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <Row>
                                <Col xs={12}>
                                    <InputControl
                                        label="Full Name"
                                        type="text"
                                        value={fullName}
                                        onChange={setFullName}
                                    />
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col md={6} xs={12}>
                                    <InputControl
                                        label="Passport Number"
                                        type="text"
                                        value={passportNumber}
                                        onChange={setPassportNumber}
                                    />
                                </Col>
                                
                                <Col md={6} xs={12}>
                                    <InputControl
                                        label="Date of Birth"
                                        type="date"
                                        value={dateOfBirth}
                                        onChange={setDateOfBirth}
                                    />
                                </Col>

                                <Col md={6} xs={12}>
                                    <InputControl
                                        label="Email"
                                        type="text"
                                        value={email}
                                        onChange={setEmail}
                                    />
                                </Col>
                            </Row>
                        </>
                    )}
                    
                    <ActionButton 
                        text={isComplete ? "Confirm" : "Continue"} 
                        size="sm" 
                        onClick={handleSubmit} 
                    />
                </Form>
            </Card.Body>
        </Card>
    );
}

export default PassengerForm;