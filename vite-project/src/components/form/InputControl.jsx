import React from "react";
import { Form, FloatingLabel } from 'react-bootstrap';
import "../../styles/InputControl.css"

function InputControl({ label, type, value, onChange }) {
    return (
        <FloatingLabel
            controlId="floatingInput"
            label={label}
            className="mb-3"
        >
            <Form.Control 
                className="input-control"
                type={type}
                placeholder={label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </FloatingLabel>
    );
}

export default InputControl;