import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import "./ButtonAll.css";


/**
 * Reusable Bootstrap Button component
 *
 * Props:
 * - to: string → navega internamente con react-router
 * - href: string → enlace externo
 * - type: "button" | "submit" | "reset"
 * - variant: Bootstrap variant (primary, danger, dark, etc.)
 * - outline: boolean → usa outline-variant
 * - size: "sm" | "lg" (opcional)
 * - className: string → clases adicionales
 * - block: boolean → ocupa todo el ancho
 * - rounded: "0"–"5" | "pill" → redondeado personalizado
 * - disabled: boolean
 * - loading: boolean → muestra spinner y desactiva botón
 * - onClick: función
 */
export default function BsButton({
  children,
  to,
  href,
  type = "button",
  variant = "dark",
  outline = false,
  size,
  className = "",
  onClick,
  disabled = false,
  block = false,
  rounded = "3",
  loading = false,
}) {
  const v = outline ? `outline-${variant}` : variant;
  const classes = `${className} ${block ? "w-30" : "w-30"} rounded-${rounded} border-2`.trim();
  const commonProps = {
    variant: v,
    size,
    className: classes,
    onClick,
    disabled: disabled || loading,
    type,
  };


  const content = loading ? (
    <>
      <Spinner size="sm" animation="border" className="me-2" />
      Cargando...
    </>
  ) : (
    children
  );


  if (to) {
    return (
      <Button as={Link} to={to} {...commonProps}>
        {content}
      </Button>
    );
  }


  if (href) {
    return (
      <Button as="a" href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
        {content}
      </Button>
    );
  }


  return <Button {...commonProps}>{content}</Button>;
}


BsButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
  outline: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  rounded: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loading: PropTypes.bool,
};
