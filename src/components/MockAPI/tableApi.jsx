import React from "react";


export default function ProductsTableMockAPI({ items = [], onEdit, onDelete, loading }) {
  if (loading) return <p>Cargando...</p>;
  if (!items.length) return <p>No hay productos.</p>;


  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Título</th>
            <th>Descripción</th>
            <th className="text-end">Precio</th>
            <th className="text-end">Stock</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map(p => (
            <tr key={p.id}>
              <td style={{ width: 80 }}>
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8 }}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                ) : null}
              </td>
              <td>{p.title}</td>
              <td className="text-truncate" style={{ maxWidth: 320 }}>{p.description}</td>
              <td className="text-end">${Number(p.price).toFixed(2)}</td>
              <td className="text-end">{p.stock}</td>
              <td className="text-end">
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(p)}>
                  Editar
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(p.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
