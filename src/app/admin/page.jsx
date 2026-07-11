"use client";

import { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";


export default function Admin() {


const {
productos,
agregarProducto,
eliminarProducto
}=useProducts();



const [producto,setProducto]=useState({

nombre:"",
descripcion:"",
categoria:"",
precio:"",
precio_original:"",
descuento:"",
stock:"",
tallas:"",
colores:"",
imagen:""

});



const [subiendo,setSubiendo]=useState(false);



const subirImagen=async(e)=>{


const archivo=e.target.files[0];


if(!archivo)return;


setSubiendo(true);



const nombreArchivo =
Date.now()+"-"+archivo.name;



const {error}=await supabase.storage

.from("imagenes")

.upload(nombreArchivo,archivo);



if(error){

console.log(error);

alert("Error subiendo imagen");

setSubiendo(false);

return;

}



const url=supabase.storage

.from("imagenes")

.getPublicUrl(nombreArchivo)

.data.publicUrl;



setProducto({

...producto,

imagen:url

});


setSubiendo(false);


};





const guardarProducto=async(e)=>{


e.preventDefault();



if(!producto.imagen){

alert("Sube una imagen");

return;

}



await agregarProducto({

...producto,

precio:Number(producto.precio),

precio_original:Number(producto.precio_original),

descuento:Number(producto.descuento),

stock:Number(producto.stock)

});



setProducto({

nombre:"",
descripcion:"",
categoria:"",
precio:"",
precio_original:"",
descuento:"",
stock:"",
tallas:"",
colores:"",
imagen:""

});


};





return(


<main className="min-h-screen bg-[#111] text-white p-8">



<h1 className="text-4xl font-bold mb-8">

⚙️ ANNT LOGISTICS ADMIN

</h1>




<Link

href="/admin/pedidos"

className="inline-block bg-[#f5b800] text-black font-bold px-6 py-3 rounded-xl mb-8"

>

📦 Ver pedidos de clientes

</Link>





<div className="bg-[#181818] border border-[#333] p-6 rounded-xl mb-10">


<h2 className="text-2xl font-bold mb-5">

🛍️ Agregar producto

</h2>




<form onSubmit={guardarProducto}>



<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Nombre producto"

value={producto.nombre}

onChange={(e)=>setProducto({...producto,nombre:e.target.value})}

/>



<textarea

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Descripción"

value={producto.descripcion}

onChange={(e)=>setProducto({...producto,descripcion:e.target.value})}

/>



<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Categoría"

value={producto.categoria}

onChange={(e)=>setProducto({...producto,categoria:e.target.value})}

/>



<input

type="number"

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Precio"

value={producto.precio}

onChange={(e)=>setProducto({...producto,precio:e.target.value})}

/>



<input

type="number"

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Precio anterior"

value={producto.precio_original}

onChange={(e)=>setProducto({...producto,precio_original:e.target.value})}

/>



<input

type="number"

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Descuento %"

value={producto.descuento}

onChange={(e)=>setProducto({...producto,descuento:e.target.value})}

/>



<input

type="number"

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Stock"

value={producto.stock}

onChange={(e)=>setProducto({...producto,stock:e.target.value})}

/>



<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Tallas S,M,L o 39,40"

value={producto.tallas}

onChange={(e)=>setProducto({...producto,tallas:e.target.value})}

/>



<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Colores Negro,Blanco"

value={producto.colores}

onChange={(e)=>setProducto({...producto,colores:e.target.value})}

/>



<input

type="file"

accept="image/*"

onChange={subirImagen}

className="mb-4"

/>



{subiendo && <p>⏳ Subiendo imagen...</p>}



{producto.imagen && (

<img

src={producto.imagen}

className="w-40 rounded-lg mb-4"

/>

)}



<button

className="w-full bg-[#f5b800] text-black font-bold py-3 rounded-lg"

>

➕ Guardar producto

</button>



</form>


</div>





<h2 className="text-3xl font-bold mb-5">

📦 Productos

</h2>





{

productos.map((p)=>(


<div

key={p.id}

className="bg-[#181818] border border-[#333] p-5 rounded-xl mb-5"

>


<img

src={p.imagen}

className="w-32 h-32 object-cover rounded-lg"

/>



<h3 className="text-xl font-bold mt-3">

{p.nombre}

</h3>



<p>

S/ {p.precio}

</p>



<p>

📦 Stock: {p.stock}

</p>



<button

onClick={()=>eliminarProducto(p.id)}

className="mt-4 bg-red-600 px-5 py-2 rounded-lg"

>

🗑️ Eliminar

</button>



</div>


))


}



</main>


);


}