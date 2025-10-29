import { Spinner } from "react-bootstrap";


export default function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center py-5">
      <Spinner animation="border" />
    </div>
  );
}
