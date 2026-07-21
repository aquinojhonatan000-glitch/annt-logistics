"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [mensajeCarrito, setMensajeCarrito] = useState("");

  // Cargar carrito
  useEffect(() => {
    const guardado = localStorage.getItem("carrito");

    if (guardado) {
      setCarrito(JSON.parse(guardado));
    }
  }, []);

  // Guardar carrito
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Agregar producto
  const agregarCarrito = (producto) => {
    setCarrito((actual) => {
      const existe = actual.find(
        (item) =>
          item.id === producto.id &&
          item.talla === producto.talla &&
          item.color === producto.color
      );

      if (existe) {
        return actual.map((item) =>
          item.id === producto.id &&
          item.talla === producto.talla &&
          item.color === producto.color
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        );
      }

      return [
        ...actual,
        {
          ...producto,
          cantidad: 1,
        },
      ];
    });

    setMensajeCarrito(`✅ ${producto.nombre} agregado al carrito`);

    setTimeout(() => {
      setMensajeCarrito("");
    }, 3000);
  };

  // Eliminar producto
  const eliminarCarrito = (id, talla, color) => {
    setCarrito((actual) =>
      actual.filter(
        (producto) =>
          !(
            producto.id === id &&
            producto.talla === talla &&
            producto.color === color
          )
      )
    );
  };

  // Cambiar cantidad
  const cambiarCantidad = (id, talla, color, cantidad) => {
    setCarrito((actual) =>
      actual.map((producto) =>
        producto.id === id &&
        producto.talla === talla &&
        producto.color === color
          ? {
              ...producto,
              cantidad: cantidad < 1 ? 1 : cantidad,
            }
          : producto
      )
    );
  };

  // Vaciar carrito
  const limpiarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarCarrito,
        eliminarCarrito,
        cambiarCantidad,
        limpiarCarrito,
        mensajeCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}