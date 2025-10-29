import { Button } from "react-bootstrap";


export default function ShowMoreButton({ canShowMore, onClick }) {
  if (!canShowMore) return null;
  return (
    <div className="text-center mt-4">
      <Button variant="outline-secondary" onClick={onClick}>
        Show more
      </Button>
    </div>
  );
}
