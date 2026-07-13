"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const ProductContext = createContext();


export function ProductProvider({ children }) {

  const [productos, setProductos] = useState([]);


  // ==========================
  // CARGAR PRODUCTOS
  // ==========================

  const cargarProductos = async () => {

    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .order("created_at", { ascending: false });


    if(error){

      console.log(
        "ERROR CARGANDO PRODUCTOS:",
        error
      );

      return;

    }


    setProductos(data || []);

  };



  useEffect(()=>{

    cargarProductos();

  },[]);



  // ==========================
  // AGREGAR PRODUCTO
  // ==========================

  const agregarProducto = async(producto)=>{


    const { data,error } = await supabase
      .from("productos")
      .insert([producto])
      .select();



    if(error){

      console.log(
        "ERROR GUARDANDO PRODUCTO:",
        error
      );

      alert(error.message);

      return false;

    }



    setProductos(prev=>[
      data[0],
      ...prev
    ]);



    alert("✅ Producto guardado");


    return true;

  };





  // ==========================
  // ELIMINAR PRODUCTO
  // ==========================

  const eliminarProducto = async(id)=>{


    if(!confirm("¿Eliminar este producto?"))
      return;



    const {error}=await supabase
      .from("productos")
      .delete()
      .eq("id",id);



    if(error){

      console.log(
        "ERROR ELIMINANDO PRODUCTO:",
        error
      );

      alert(error.message);

      return;

    }



    setProductos(prev=>
      prev.filter(
        producto=>producto.id !== id
      )
    );



    alert("🗑️ Producto eliminado");

  };





  // ==========================
  // EDITAR / ACTUALIZAR PRODUCTO
  // ==========================

 const actualizarProducto = async(
id,
cambios
)=>{

const { data,error } = await supabase
.from("productos")
.update(cambios)
.eq("id",id)
.select();


if(error){

console.log(
"ERROR ACTUALIZANDO PRODUCTO:",
error
);

alert(error.message);

return false;

}


setProductos(prev=>

prev.map(producto=>

producto.id === id
?
{
...producto,
...cambios
}
:
producto

)

);


alert("✅ Producto actualizado");


return true;

};



  return (

    <ProductContext.Provider

      value={{

        productos,

        agregarProducto,

        eliminarProducto,

        actualizarProducto,

        cargarProductos,

      }}

    >

      {children}

    </ProductContext.Provider>

  );

}



export function useProducts(){

  return useContext(ProductContext);

}