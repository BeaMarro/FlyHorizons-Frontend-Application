import React from "react";
import { Button } from "react-bootstrap";

function ActionButton({ text, size, onClick }) {
    return (
        <Button variant="primary" size={size} className="small-action-button" onClick={onClick}>
            {text}
        </Button>
    );
}

export default ActionButton;