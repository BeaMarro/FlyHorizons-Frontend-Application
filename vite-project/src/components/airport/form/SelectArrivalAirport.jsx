import React, { useState } from "react";
import { Card, ListGroup, Row, Col, Nav, Tab } from "react-bootstrap";

function SelectArrivalAirport({ arrivalAirports, setArrivalAirport }) {
  const defaultCountry = "The Netherlands" // Set the default country
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);

  // Filter airports based on selected country
  const filteredAirports = arrivalAirports.filter(
    (airport) => airport.country === selectedCountry
  );

  const handleAirportClick = (airport) => {
    setArrivalAirport(airport.iata_code);
  };

  return (
    <Row>
      <Col sm={3}>
        {/* Countries */}
        <Tab.Container id="left-tabs-example" defaultActiveKey={defaultCountry}>
          <Nav variant="pills" className="flex-column">
            {[...new Set(arrivalAirports.map((airport) => airport.country))].map((country) => (
              <Nav.Item key={country}>
                <Nav.Link eventKey={country} onClick={() => setSelectedCountry(country)}>
                  {country}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Tab.Container>
      </Col>

      <Col sm={9}>
        {/* Airports for each country present */}
        <Card>
          <ListGroup variant="flush">
            {filteredAirports.map((airport, index) => (
              <ListGroup.Item 
                key={index} 
                onClick={() => handleAirportClick(airport)}
                style={{ cursor: "pointer" }}
              >
                {airport.name} ({airport.iata_code}) - {airport.city}, {airport.country}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default SelectArrivalAirport;