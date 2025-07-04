import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../styles/BookingStatusBar.css"

function BookingStatusBar({ title, totalCost }) {
    return (
        <Container className="top-spacing">
            <Row>
                <Col>
                    <h4 className="left"><b>{title}</b></h4>
                </Col>
                <Col>
                    <h4 className="right">Total: <b>€{totalCost}</b></h4>
                </Col>
            </Row>
        </Container>
    );
}

export default BookingStatusBar;