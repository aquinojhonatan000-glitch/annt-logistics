"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const OrderContext = createContext();



export function OrderProvider({ children }) {


  const [pedidos, setPedidos] = useState([]);





  // Cargar pedidos

  const cargarPedidos = async () => {


    const { data, error } = await supabase

      .from("pedidos")

      .select("*")

      .order("id", { ascending: false });



    if (error) {

      console.log("ERROR PEDIDOS:", error);

      return;

    }



    setPedidos(data || []);


  };







  useEffect(() => {

    cargarPedidos();

  }, []);







  // Crear pedido

  const agregarPedido = async (pedido) => {



    const { data, error } = await supabase

      .from("pedidos")

      .insert([

        {

          numero_pedido: pedido.id,

          cliente: pedido.cliente,

          productos: pedido.productos,

          total: pedido.total,

          estado: pedido.estado,

          pago: pedido.pago,

          comprobante: pedido.comprobante || "",

          fecha: pedido.fecha,

          tiempo_entrega: "Pendiente"

        }

      ])

      .select();





    if (error) {

      console.log("ERROR GUARDANDO PEDIDO:", error);

      alert("Error guardando pedido");

      return;

    }





    setPedidos((prev) => [

      data[0],

      ...prev

    ]);



  };








  // Cambiar estado del pedido

  const cambiarEstado = async (id, estado) => {



    const { error } = await supabase

      .from("pedidos")

      .update({

        estado: estado

      })

      .eq("id", id);





    if (error) {

      console.log("ERROR CAMBIANDO ESTADO:", error);

      return;

    }





    setPedidos((prev) =>

      prev.map((pedido) =>

        pedido.id === id

        ?

        {

          ...pedido,

          estado: estado

        }

        :

        pedido

      )

    );


  };









  // Cambiar tiempo de entrega

  const cambiarTiempoEntrega = async (id, tiempo) => {



    const { error } = await supabase

      .from("pedidos")

      .update({

        tiempo_entrega: tiempo

      })

      .eq("id", id);





    if (error) {

      console.log("ERROR TIEMPO ENTREGA:", error);

      return;

    }





    setPedidos((prev) =>

      prev.map((pedido) =>

        pedido.id === id

        ?

        {

          ...pedido,

          tiempo_entrega: tiempo

        }

        :

        pedido

      )

    );



  };







  return (


    <OrderContext.Provider

      value={{


        pedidos,

        agregarPedido,

        cambiarEstado,

        cambiarTiempoEntrega,

        cargarPedidos


      }}


    >


      {children}


    </OrderContext.Provider>


  );


}







export function useOrders() {


  return useContext(OrderContext);


}