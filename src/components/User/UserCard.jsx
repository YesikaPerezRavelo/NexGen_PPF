import { useContext } from "react";
import { Card, Spinner, Alert } from "react-bootstrap";
import { UserContext } from "../../context/UserContext.jsx";


export default function UserCard() {
  const { user, loadingUser, userError } = useContext(UserContext);


  if (loadingUser) {
    return (
      <div className="d-flex justify-content-center my-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }


  if (userError) return <Alert variant="danger">{userError}</Alert>;
  if (!user) return null;


  const fullName = `${user.name?.first ?? ""} ${user.name?.last ?? ""}`.trim();


  return (
    <div className="d-flex justify-content-center mt-4">
      <Card style={{ width: 320 }} className="shadow-sm">
        <Card.Img
          variant="top"
          src={user.picture?.large}
          alt={fullName || "Usuario"}
          onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/320x320")}
        />
        <Card.Body>
          <Card.Title className="mb-2">{fullName || "Usuario"}</Card.Title>
          <Card.Text className="mb-0">
            <strong>Email: </strong>{user.email}<br />
            <strong>Ciudad: </strong>{user.location?.city}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
