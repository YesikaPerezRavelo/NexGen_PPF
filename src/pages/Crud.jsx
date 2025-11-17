// src/pages/Crud.jsx (o como se llame ese archivo)
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CrudProductos from "../components/MockAPI/crudApi";


export default function CrudPage() {
  const navigate = useNavigate();


  return (
    <div
      className="container py-5"
      style={{ maxWidth: "900px", marginTop: "5rem" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold m-0">
          Admin <span className="text-danger">API products</span>
        </h2>


        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => navigate("/admin")}
        >
          JSON products
        </Button>
      </div>


      <CrudProductos />
    </div>
  );
}
