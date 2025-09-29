import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function PasswordToggleInput({
  name = "password",
  value,
  onChange,
  placeholder = "Contraseña *",
  required = true,
}) {
  const [show, setShow] = useState(false);


  return (
    <InputGroup>
      <Form.Control
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      <Button variant="outline-secondary" onClick={() => setShow((s) => !s)}>
        {show ? <FaEyeSlash /> : <FaEye />}
      </Button>
    </InputGroup>
  );
}
