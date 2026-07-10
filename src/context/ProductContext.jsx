"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


const ProductContext = createContext();



export function ProductProvider({children}) {


  const [productos, setProductos] = useState([]);




  // Cargar productos desde Supabase

  const cargarProductos = async ()=>{


    const { data, error } = await supabase

      .from("productos")

      .select("*")

      .order("id", { ascending:false });



    if(error){

      console.log("ERROR CARGANDO PRODUCTOS:", error);

    } else {


      console.log("PRODUCTOS DESDE SUPABASE:", data);


      setProductos(data || []);

    }


  };





  useEffect(()=>{


    cargarProductos();


  },[]);






  // Guardar producto

  const agregarProducto = async(producto)=>{


    console.log("ENVIANDO PRODUCTO:", producto);



    const { data, error } = await supabase

      .from("productos")

      .insert([producto])

      .select();





    if(error){


      console.log("ERROR GUARDANDO PRODUCTO:", error);


      alert(
        "Error guardando producto. Revisa consola."
      );


      return;

    }





    console.log("PRODUCTO GUARDADO:", data);



    setProductos([

      data[0],

      ...productos

    ]);



    alert("✅ Producto guardado en Supabase");


  };







  return (

    <ProductContext.Provider

      value={{

        productos,

        agregarProducto,

        cargarProductos

      }}

    >

      {children}


    </ProductContext.Provider>

  );


}





export function useProducts(){


  return useContext(ProductContext);


}