import React from "react";
import CrudProductos from "../components/MockAPI/crudApi";


export default function ProductosPage() {
  return (
    <div className="container py-5" style={{ maxWidth: "600px" ,  marginTop: "5rem" }}>
      <CrudProductos />
    </div>
  );
}
