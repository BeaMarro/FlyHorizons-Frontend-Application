import React from "react";
import "../styles/FlightSearchInfo.css";
import { Card } from "react-bootstrap";

function SelectedLuggageCard({ totalSmallBags, totalCabinBags, totalSmallCargo, totalLargeCargo, totalSportsEquipment, totalBabyCarriers }) {
    return (
        <Card className="d-flex align-items-center mini-card">
            <div className="me-4">
                <p><b>Selected Luggage:</b></p>
                {totalSmallBags > 0 && 
                    <p><b>Small Bags</b> x {totalSmallBags}</p>
                }
                {totalCabinBags > 0 && 
                    <p><b>Cabin Bags</b> x {totalCabinBags}</p>
                }
                {totalSmallCargo > 0 && 
                    <p><b>Small Cargo</b> x {totalSmallCargo}</p>
                }
                {totalLargeCargo > 0 && 
                    <p><b>Large Cargo</b> x {totalLargeCargo}</p>
                }
                {totalSportsEquipment > 0 && 
                    <p><b>Sports Equipment</b> x {totalSportsEquipment}</p>
                }
                {totalBabyCarriers > 0 && 
                    <p><b>Baby Carriers</b> x {totalBabyCarriers}</p>
                }
            </div>
        </Card>
    );
}

export default SelectedLuggageCard;