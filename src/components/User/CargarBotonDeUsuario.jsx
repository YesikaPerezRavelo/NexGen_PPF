import { useContext } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";


export default function CargarBotonDeUsuario() {
  const { fetchRandomUser, loadingUser } = useContext(UserContext);


  return (
    <div className="d-flex justify-content-center mt-3">
      <Button variant="primary" onClick={fetchRandomUser} disabled={loadingUser}>
        {loadingUser ? "Cargando..." : "Cargar Nuevo Usuario"}
      </Button>
    </div>
  );
}
