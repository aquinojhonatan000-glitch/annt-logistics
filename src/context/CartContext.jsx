"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();


export function CartProvider({ children }) {


  const [carrito, setCarrito] = useState([]);


  // Cargar carrito guardado
  useEffect(() => {

    const carritoGuardado = localStorage.getItem("carrito");

    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }

  }, []);



  // Guardar carrito automáticamente
  useEffect(() => {

    localStorage.setItem(
      "carrito",
      JSON.stringify(carrito)
    );

  }, [carrito]);




  const agregarCarrito = (producto) => {


    setCarrito((actual) => {


      const existe = actual.find(
        (item) => item.id === producto.id
      );



      if (existe) {

        return actual.map((item) =>
          item.id === producto.id
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


  };




  const eliminarCarrito = (id) => {


    setCarrito((actual) =>
      actual.filter(
        (producto) => producto.id !== id
      )
    );


  };





  const cambiarCantidad = (id, cantidad) => {


    setCarrito((actual) =>
      actual.map((producto) =>
        producto.id === id
          ? {
              ...producto,
              cantidad: cantidad < 1 ? 1 : cantidad,
            }
          : producto
      )
    );


  };





  return (

    <CartContext.Provider

      value={{
        carrito,
        agregarCarrito,
        eliminarCarrito,
        cambiarCantidad,
      }}

    >

      {children}

    </CartContext.Provider>

  );


}





export function useCart() {

  return useContext(CartContext);

}