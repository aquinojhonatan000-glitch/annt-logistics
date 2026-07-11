"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const ProductContext = createContext();


export function ProductProvider({children}) {


const [productos,setProductos] = useState([]);



const cargarProductos = async()=>{


const {data,error}=await supabase

.from("productos")

.select("*")

.order("created_at",{ascending:false});



if(error){

console.log("ERROR CARGANDO PRODUCTOS:",error);

return;

}



setProductos(data || []);


};




useEffect(()=>{

cargarProductos();

},[]);





// CREAR PRODUCTO

const agregarProducto = async(producto)=>{


const {data,error}=await supabase

.from("productos")

.insert([producto])

.select();



if(error){

console.log("ERROR GUARDANDO PRODUCTO:",error);

alert(error.message);

return;

}



setProductos([

data[0],

...productos

]);



alert("✅ Producto guardado");


};






// ELIMINAR PRODUCTO

const eliminarProducto = async(id)=>{


const confirmar = confirm(
"¿Eliminar este producto?"
);


if(!confirmar)return;



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



setProductos(

productos.filter(

(producto)=>producto.id !== id

)

);



alert("🗑️ Producto eliminado");


};






// ACTUALIZAR PRODUCTO

const actualizarProducto = async(id,cambios)=>{


const {data,error}=await supabase

.from("productos")

.update(cambios)

.eq("id",id)

.select();



if(error){

console.log(error);

alert(error.message);

return;

}



setProductos(

productos.map((p)=>

p.id===id ? data[0] : p

)

);


};






return(

<ProductContext.Provider

value={{

productos,

agregarProducto,

eliminarProducto,

actualizarProducto,

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