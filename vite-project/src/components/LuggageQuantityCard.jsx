import React from "react";
import { Card, Container, Image } from 'react-bootstrap';
import InputControl from "./form/InputControl";
import "../styles/LuggageQuantityCard.css";

function LuggageQuantityCard({ image, title, pricing, value, setValue }) {
    return (
        <Container className="d-flex justify-content-center">
            <Card className="luggage-card">
                <Card.Body className="d-flex flex-column">
                    <Image src={image} alt="Luggage Icon" />
                    <Card.Title>
                        </Card.Title>

                        <Container className="mt-auto d-flex justify-content-center">
                            <InputControl
                                label={`${title} ${pricing}`}
                                type="number"
                                value={value}
                                onChange={(value) => setValue(value)}
                            />
                        </Container>
                    </Card.Body>
                </Card>
        </Container>
    );
}

export default LuggageQuantityCard;