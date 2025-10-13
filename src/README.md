# NexGenPPF - Sistema de Gestión de Entrenamientos y Productos

**NexGenPPF** es un proyecto diseñado para gestionar la selección de productos de protección automotriz y arquitectónica de manera interactiva y visual.  

---

## 🚀 Tecnologías utilizadas

- **React.js** (con Hooks, Context API, useEffect, useState, etc.)
- **React Router DOM** (para la navegación entre páginas)
- **Bootstrap 5 + React-Bootstrap** (para diseño responsivo)
- **LocalStorage** (para persistencia de datos del carrito)
- **Fetch API** (para conectar con APIs externas)
- **JSON local** (catálogo propio de productos)
- **Dragon Ball Z API** (para cargar productos de ejemplo)

---

## 🛒 Sistema de Carrito (Cart System)

El carrito está implementado con **React Context API** y `localStorage`, lo que permite:
- Agregar productos desde cualquier página mediante un evento global `cart:add`.
- Mostrar el conteo total de productos en la barra superior (badge del carrito).
- Visualizar los productos agregados, modificar cantidades, eliminar items o vaciar todo.
- Calcular automáticamente el subtotal del pedido.

**Características técnicas del carrito:**
- `CartContext.jsx`: gestiona los estados globales del carrito (`cart`, `total`, `addItem`, `removeItem`, etc.)
- `Cart.jsx`: página que muestra el detalle del carrito con tabla de productos y resumen de compra.
- `CartItemsTable.jsx`: tabla dinámica con botones `+`, `−` y `Quitar`.
- `SummaryCard.jsx`: componente lateral que resume el total y permite “Finalizar compra”.
- Eventos globales `cart:add` y `cart:changed` para sincronización con la Navbar.
- Persistencia automática mediante `localStorage`.

---

## 🧠 Lógica principal de productos

Los productos pueden provenir de 3 fuentes:
1. **Catálogo local (`catalog.json`)**  
   Contiene categorías (automotive, window, architectural) y subcategorías.
2. **Extras creados por el usuario (AdminPanel)**  
   Se guardan en `localStorage` y se integran al catálogo.
3. **API pública de Dragon Ball Z**  
   Se cargan productos de ejemplo con nombre, imagen y precio aleatorio.



---


| Name   | Last Name    | Email              |
| ------ | ------------ | ------------------ |
| Yesika | Perez Ravelo | yesikapr@gmail.com |

[LinkedIn](https://www.linkedin.com/in/yesikaperezravelo/)

![imagenPerfil](https://firebasestorage.googleapis.com/v0/b/productyesfitness.appspot.com/o/python1.png?alt=media&token=c58f28bc-7f30-4139-abfc-6e16645b5a93)