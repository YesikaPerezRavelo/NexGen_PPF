import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { DEFAULT_IMAGE } from "../../constants/shop";


export default function ProductCard({ item, onAdd }) {
  if (!item) return null;


  const safeImage = item?.image || DEFAULT_IMAGE;
  const safeName = item?.name || "Desconocido";
  const safePrice = Number.isFinite(Number(item?.price)) ? Number(item.price) : 2000;


  const handleImgError = (e) => {
    if (e.currentTarget.src.endsWith(DEFAULT_IMAGE)) return;
    e.currentTarget.src = DEFAULT_IMAGE;
    e.currentTarget.style.opacity = 1;
  };


  const handleAddClick = () => {
    // Si onAdd no es función, no explota
    if (typeof onAdd === "function") {
      onAdd({
        id: item.id,
        name: safeName,
        image: safeImage,
        price: safePrice,
        _origin: item?._origin ?? "api",
      });
    }
  };


  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        src={safeImage}
        alt={safeName}
        style={{ objectFit: "contain", height: 450 }}
        loading="lazy"
        onError={handleImgError}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-1">{safeName}</Card.Title>
        <div className="mb-2">
          <span className="text-muted">Price: </span>
          <strong>US${safePrice.toLocaleString()}</strong>
          <div>
            <small className="text-secondary">{item?._origin || "API"}</small>
          </div>
        </div>
        <Button variant="dark" className="mt-auto" onClick={handleAddClick}>
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
}


ProductCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _origin: PropTypes.string,
  }),
  onAdd: PropTypes.func,
};


ProductCard.defaultProps = {
  item: null,
  onAdd: undefined,
};
