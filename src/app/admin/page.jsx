"use client";

import { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Admin() {

const {
productos,
agregarProducto,
eliminarProducto,
} = useProducts();



const productoInicial = {
nombre:"",
descripcion:"",
categoria:"",
precio:"",
precio_original:"",
descuento:"",
descuento_hasta:"",
stock:"",
tallas:"",
colores:"",
imagen:"",
};



const [producto,setProducto]=useState(productoInicial);
const [subiendo,setSubiendo]=useState(false);
const [guardando,setGuardando]=useState(false);



const ofertaActiva=(fecha)=>{

if(!fecha) return false;

return new Date(fecha)>new Date();

};




const subirImagen=async(e)=>{

const archivo=e.target.files?.[0];

if(!archivo)return;


setSubiendo(true);


const nombreArchivo=
Date.now()+"-"+archivo.name.replace(/\s+/g,"-");



const {error}=await supabase.storage
.from("imagenes")
.upload(nombreArchivo,archivo);



if(error){

alert("Error subiendo imagen");

setSubiendo(false);

return;

}



const {data}=supabase.storage
.from("imagenes")
.getPublicUrl(nombreArchivo);



setProducto(prev=>({

...prev,

imagen:data.publicUrl

}));


setSubiendo(false);

};





const guardarProducto=async(e)=>{

e.preventDefault();



if(!producto.nombre.trim()){

alert("Escribe el nombre del producto");

return;

}



if(!producto.imagen){

alert("Sube una imagen");

return;

}



if(!producto.precio){

alert("Escribe el precio");

return;

}



setGuardando(true);



try{


await agregarProducto({

...producto,

precio:Number(producto.precio),

precio_original:
producto.precio_original
?Number(producto.precio_original)
:null,


descuento:
producto.descuento
?Number(producto.descuento)
:0,


stock:
producto.stock
?Number(producto.stock)
:0,


descuento_hasta:
producto.descuento_hasta
?new Date(producto.descuento_hasta).toISOString()
:null,


});



setProducto(productoInicial);


alert("✅ Producto guardado correctamente");


}catch(error){

console.log(error);

alert("Error guardando producto");


}finally{

setGuardando(false);

}


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


<h2 className="text-2xl font-bold mb-6">
🛍️ Agregar producto
</h2>




<form onSubmit={guardarProducto}>


<input
className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"
placeholder="Nombre del producto"
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
step="0.01"
className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"
placeholder="Precio oferta"
value={producto.precio}
onChange={(e)=>setProducto({...producto,precio:e.target.value})}
/>





<input
type="number"
step="0.01"
className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"
placeholder="Precio original"
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





<div className="bg-[#111] border border-[#333] rounded-xl p-4 mb-4">


<label className="font-bold text-[#f5b800]">

⏰ Final de oferta

</label>



<input

type="datetime-local"

className="w-full bg-[#181818] border border-[#333] p-3 rounded-lg mt-2"

value={producto.descuento_hasta}

onChange={(e)=>setProducto({...producto,descuento_hasta:e.target.value})}

/>


</div>





<input

type="number"

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Stock"

value={producto.stock}

onChange={(e)=>setProducto({...producto,stock:e.target.value})}

/>





<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Tallas"

value={producto.tallas}

onChange={(e)=>setProducto({...producto,tallas:e.target.value})}

/>





<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Colores"

value={producto.colores}

onChange={(e)=>setProducto({...producto,colores:e.target.value})}

/>





<input

type="file"

accept="image/*"

onChange={subirImagen}

/>



{producto.imagen && (

<img
src={producto.imagen}
className="w-48 h-48 bg-white rounded-xl mt-4 object-contain"
/>

)}




<button

disabled={subiendo||guardando}

className="w-full bg-[#f5b800] text-black font-bold py-4 rounded-xl mt-5"

>


{guardando?"Guardando...":"➕ Guardar producto"}


</button>




</form>


</div>





<h2 className="text-2xl font-bold mb-5">
📦 Productos
</h2>





{productos?.map((p)=>(


<div
key={p.id}
className="bg-[#181818] border border-[#333] p-5 rounded-xl mb-5"
>


<img
src={p.imagen}
className="w-40 h-40 bg-white object-contain rounded-lg"
/>



<h3 className="text-xl font-bold mt-3">
{p.nombre}
</h3>




<p className="text-[#f5b800] font-bold text-xl">

S/ {

ofertaActiva(p.descuento_hasta)

?

Number(p.precio).toFixed(2)

:

Number(p.precio_original || p.precio).toFixed(2)

}

</p>





{ofertaActiva(p.descuento_hasta)&&Number(p.descuento)>0&&(

<p className="text-red-400 font-bold">
🔥 {p.descuento}% OFF
</p>

)}





{p.descuento_hasta&&(

<p className="text-gray-300 mt-2">

{

ofertaActiva(p.descuento_hasta)

?

"⏰ Oferta hasta: "+new Date(p.descuento_hasta).toLocaleString()

:

"⌛ Oferta finalizada"

}


</p>

)}





<p className="mt-2">
📦 Stock: {p.stock}
</p>




<button

onClick={()=>eliminarProducto(p.id)}

className="mt-4 bg-red-600 px-5 py-2 rounded-lg font-bold"

>

🗑️ Eliminar

</button>




</div>


))}





</main>


);

}