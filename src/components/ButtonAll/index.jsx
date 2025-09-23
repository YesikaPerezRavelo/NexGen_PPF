// components/common/BsButton.jsx
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";


/**
 * Props:
 * - to: string (usa Link de react-router)
 * - href: string (enlace externo)
 * - type: "button" | "submit" (por defecto "button")
 * - variant: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link"
 * - outline: boolean (usa outline-variant)
 * - size: "sm" | "lg" (por defecto none)
 * - className: string extra
 */
export default function ButtonAll({
  children,
  to,
  href,
  type = "button",
  variant = "dark",
  outline = false,
  size, // "sm" | "lg"
  className = "",
  onClick,
  disabled = false,
}) {
  const v = outline ? `outline-${variant}` : variant;


  // Link interno con router
  if (to) {
    return (
      <Button
        as={Link}
        to={to}
        variant={v}
        size={size}
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Button>
    );
  }


  // Enlace externo
  if (href) {
    return (
      <Button
        as="a"
        href={href}
        target="_self"
        rel="noopener"
        variant={v}
        size={size}
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Button>
    );
  }


  // Botón nativo
  return (
    <Button
      type={type}
      variant={v}
      size={size}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
