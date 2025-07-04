import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import "../../styles/InputControl.css"

function SelectInputControl({ options, value, title, onChange }) {
  return (
    <FloatingLabel controlId="floatingSelect" label={title}>
      <Form.Select
        aria-label="Floating label select example"
        className="input-control"
        value={value}
        onChange={(e) => onChange(e.target.value)} // Pass selected IATA code
      >
        <option disabled value="">
          {title}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.iata_code}>
            {option.city}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  );
}

export default SelectInputControl;