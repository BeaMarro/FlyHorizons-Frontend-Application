import React from "react";
import { Card, Container, Row, Col } from 'react-bootstrap';
import "../styles/SelectFlightClass.css";
import ActionButton from "./form/ActionButton";

function SelectFlightClass({ backgroundImage, title, pricing, bulletPoints, selected, handleSelect }) {
    return (
        <Container className="d-flex justify-content-center">
            <Row className="align-items-center">
                <Col md={6}>
                    <Card
                        className="flight-class-card"
                        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
                    >
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>
                                <Container className="flight-class-info">
                                    <p>{title} <b>{pricing}</b></p>
                                </Container>
                            </Card.Title>

                            <Container className="mt-auto d-flex justify-content-center">
                                {selected ? (
                                    <ActionButton
                                        text="Selected"
                                        size="sm"
                                        type="submit"
                                        onClick={handleSelect} // No toggle logic here, it's controlled by parent
                                    />
                                ) : (
                                    <ActionButton
                                        text="Select"
                                        size="sm"
                                        type="submit"
                                        onClick={handleSelect}
                                    />
                                )}
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <ul className="left">
                        {bulletPoints && bulletPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default SelectFlightClass;