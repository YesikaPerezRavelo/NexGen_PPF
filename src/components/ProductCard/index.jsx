// import React from "react";
// import PropTypes from "prop-types";
// import { Card, Button, Badge } from "react-bootstrap";


// export default function ProductCard({
//   item,
//   onAdd,
//   imageHeight = 350,
//   variant = "default",
//   showOrigin = true,
// }) {
//   const title = item.title ?? item.name ?? "Producto";
//   const imgSrc = item.image; // respetamos exactamente lo que viene del JSON
//   const price = Number(item.price ?? 0);

//   const handleAdd = () => {
//     const payload = {
//       id: item.id,
//       title,
//       price,
//       image: imgSrc,
//       qty: 1,
//       meta: item.meta ?? item._category ? { category: item._category, subcategory: item._subcategory ?? item.__sub } : item.meta,
//     };
//     onAdd?.(payload);
//   };

//   const handleImgError = (e) => {
//     // fallback visual si la ruta está rota (no sobrescribimos si image viene bien)
//     // reemplazá el path por el que prefieras (o dejá vacío para mostrar espacio)
//     e.currentTarget.onerror = null;
//     e.currentTarget.src = "/images/testingImg.jpg";
//   };

//   return (
//     <Card className={variant === "compact" ? "h-100 product-card-compact shadow-sm" : "h-100 shadow-sm"}>
//       <div className="ratio ratio-1x1 bg-light">
//         <img
//           src={imgSrc}
//           alt={title}
//           loading="lazy"
//           style={{ objectFit: "cover", height: imageHeight }}
//           onError={handleImgError}
//         />
//       </div>

//       <Card.Body className="d-flex flex-column">
//         <Card.Title className="fs-6 mb-1 text-truncate" title={title}>
//           {title}
//         </Card.Title>

//         {showOrigin && item._origin && (
//           <div className="mb-2">
//             <Badge bg={item._origin === "api" ? "info" : item._origin === "extra" ? "success" : "secondary"}>
//               {item._origin.toUpperCase()}
//             </Badge>
//           </div>
//         )}

//         <div className="mt-auto d-flex justify-content-between align-items-center">
//           <span className="fw-bold">${price.toFixed(2)}</span>
//           <Button size="sm" onClick={handleAdd}>
//             Add to Cart
//           </Button>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// }

// ProductCard.propTypes = {
//   item: PropTypes.object.isRequired,
//   onAdd: PropTypes.func,
//   imageHeight: PropTypes.number,
//   variant: PropTypes.oneOf(["default", "compact"]),
//   showOrigin: PropTypes.bool,
// };