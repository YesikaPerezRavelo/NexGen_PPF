import { Form } from "react-bootstrap";


export default function SearchBar({ q, setQ, placeholder = "Search characters..." }) {
  return (
    <Form className="mb-3">
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
    </Form>
  );
}
