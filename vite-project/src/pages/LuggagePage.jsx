import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import BookingStatusBar from "../components/booking/BookingStatusBar";
import FlightSearchInfo from "../components/flight/FlightSearchInfo";
import cargoLuggageSmall from "../assets/cargo luggage small.png";
import cargoLuggageLarge from "../assets/cargo luggage large.png";
import sportEquipment from "../assets/sport equipment.png";
import babyCarrier from "../assets/baby carrier.png";
import ActionButton from "../components/form/ActionButton";
import LuggageQuantityCard from "../components/LuggageQuantityCard";
import SelectedLuggageCard from "../components/SelectedLuggageCard";

function LuggagePage() {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        tripType,
        departure,
        destination,
        departureDate,
        returnDate,
        passengers,
        flight,
        selectedClass,
        updatedCost
    } = location.state || {};

    const [smallCargoLuggageQuantity, setSmallCargoLuggageQuantity] = useState(0);
    const [largeCargoLuggageQuantity, setLargeCargoLuggageQuantity] = useState(0);
    const [sportsEquipmentQuantity, setSportsEquipmentQuantity] = useState(0);
    const [babyCarrierQuantity, setBabyCarrierQuantity] = useState(0);
    const [totalLuggageCost, setTotalLuggageCost] = useState(0);

    const LUGGAGE_PRICING = {
        Cargo20kg: 20,
        Cargo30kg: 40,
        SportsEquipment: 50,
        BabyCarrier: 35,
    };

    useEffect(() => {
        const newLuggageCost =
            smallCargoLuggageQuantity * LUGGAGE_PRICING.Cargo20kg +
            largeCargoLuggageQuantity * LUGGAGE_PRICING.Cargo30kg +
            sportsEquipmentQuantity * LUGGAGE_PRICING.SportsEquipment +
            babyCarrierQuantity * LUGGAGE_PRICING.BabyCarrier;

        setTotalLuggageCost(newLuggageCost);
    }, [
        smallCargoLuggageQuantity,
        largeCargoLuggageQuantity,
        sportsEquipmentQuantity,
        babyCarrierQuantity
    ]);

    const handleProceed = () => {
        let selectedLuggages = [
            ...Array(passengers).fill("SmallBag"),
            ...Array(passengers).fill("CabinBag"),
            ...Array(Number(smallCargoLuggageQuantity)).fill("Cargo20kg"),
            ...Array(Number(largeCargoLuggageQuantity)).fill("Cargo30kg"),
            ...Array(Number(sportsEquipmentQuantity)).fill("SportsEquipment"),
            ...Array(Number(babyCarrierQuantity)).fill("BabyCarrier"),
        ];

        navigate("/seating", {
            state: {
                tripType,
                departure,
                destination,
                departureDate,
                returnDate,
                passengers,
                flight,
                selectedClass,
                selectedLuggages,
                totalCost: updatedCost + totalLuggageCost
            }
        });
    };

    return (
        <Container>
            <BookingStatusBar title="Your Fare" totalCost={updatedCost + totalLuggageCost} />

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

                <SelectedLuggageCard
                    totalSmallBags={passengers}
                    totalCabinBags={passengers}
                    totalSmallCargo={smallCargoLuggageQuantity}
                    totalLargeCargo={largeCargoLuggageQuantity}
                    sportEquipment={sportsEquipmentQuantity}
                    babyCarrier={babyCarrierQuantity}
                />
            </Container>

            <h3 className="left">Select your luggage</h3>
            <p>
                A Cabin luggage and a Small bag are included for every passenger. Please see below
                to purchase additional luggage for your trip.
            </p>

            <Container className="d-flex justify-content-center">
                <LuggageQuantityCard
                    image={cargoLuggageSmall}
                    title={"Cargo Luggage (20 KG)"}
                    pricing={"€20"}
                    value={smallCargoLuggageQuantity}
                    setValue={setSmallCargoLuggageQuantity}
                />

                <LuggageQuantityCard
                    image={cargoLuggageLarge}
                    title={"Cargo Luggage (30 KG)"}
                    pricing={"€40"}
                    value={largeCargoLuggageQuantity}
                    setValue={setLargeCargoLuggageQuantity}
                />

                <LuggageQuantityCard
                    image={sportEquipment}
                    title={"Sports Equipment"}
                    pricing={"€50"}
                    value={sportsEquipmentQuantity}
                    setValue={setSportsEquipmentQuantity}
                />

                <LuggageQuantityCard
                    image={babyCarrier}
                    title={"Baby Carrier"}
                    pricing={"€35"}
                    value={babyCarrierQuantity}
                    setValue={setBabyCarrierQuantity}
                />
            </Container>

            {selectedClass != null && (
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

export default LuggagePage;