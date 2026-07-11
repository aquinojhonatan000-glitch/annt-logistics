"use client";

import { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";


export default function Admin(){

const {
productos,
agregarProducto,
eliminarProducto
}=useProducts();



const productoInicial={
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

if(!fecha)return false;

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

console.log(error);

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

?

Number(producto.precio_original)

:

null,



descuento:

producto.descuento

?

Number(producto.descuento)

:

0,



stock:

producto.stock

?

Number(producto.stock)

:

0,



descuento_hasta:

producto.descuento_hasta

?

new Date(producto.descuento_hasta).toISOString()

:

null,


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

<main className="
min-h-screen
bg-[#111]
text-white
p-6
md:p-10
">


<h1 className="
text-4xl
font-black
mb-8
text-[#f5b800]
">

⚙️ ANNT LOGISTICS ADMIN

</h1>



<Link

href="/admin/pedidos"

className="
inline-flex
items-center
bg-[#f5b800]
text-black
font-bold
px-6
py-3
rounded-xl
mb-10
hover:bg-[#ffd700]
transition
"

>

📦 Ver pedidos de clientes

</Link>





<div className="
bg-[#181818]
border
border-[#333]
rounded-3xl
p-6
shadow-xl
mb-10
">


<h2 className="
text-2xl
font-bold
mb-6
">

🛍️ Agregar producto

</h2>



<form onSubmit={guardarProducto}>


<input

className="
admin-input
"

placeholder="Nombre del producto"

value={producto.nombre}

onChange={(e)=>setProducto({

...producto,

nombre:e.target.value

})}

/>



<textarea

className="
admin-input
h-32
"

placeholder="Descripción del producto"

value={producto.descripcion}

onChange={(e)=>setProducto({

...producto,

descripcion:e.target.value

})}

/>



<input

className="
admin-input
"

placeholder="Categoría (Tecnología, Moda...)"

value={producto.categoria}

onChange={(e)=>setProducto({

...producto,

categoria:e.target.value

})}

/>



<div className="grid md:grid-cols-2 gap-4">


<input

type="number"

step="0.01"

className="
admin-input
"

placeholder="Precio oferta"

value={producto.precio}

onChange={(e)=>setProducto({

...producto,

precio:e.target.value

})}

/>



<input

type="number"

step="0.01"

className="
admin-input
"

placeholder="Precio original"

value={producto.precio_original}

onChange={(e)=>setProducto({

...producto,

precio_original:e.target.value

})}

/>


</div>
<div className="grid md:grid-cols-2 gap-4">


<input

type="number"

className="admin-input"

placeholder="Descuento %"

value={producto.descuento}

onChange={(e)=>setProducto({

...producto,

descuento:e.target.value

})}

/>



<input

type="number"

className="admin-input"

placeholder="Stock"

value={producto.stock}

onChange={(e)=>setProducto({

...producto,

stock:e.target.value

})}

/>


</div>





<div className="
bg-[#111]
border
border-[#333]
rounded-2xl
p-4
mb-5
">


<label className="
text-[#f5b800]
font-bold
">

⏰ Final de oferta

</label>



<input

type="datetime-local"

className="admin-input mt-3"

value={producto.descuento_hasta}

onChange={(e)=>setProducto({

...producto,

descuento_hasta:e.target.value

})}

/>


</div>






<input

className="admin-input"

placeholder="Tallas: S,M,L,XL"

value={producto.tallas}

onChange={(e)=>setProducto({

...producto,

tallas:e.target.value

})}

/>





<input

className="admin-input"

placeholder="Colores: Negro, Blanco"

value={producto.colores}

onChange={(e)=>setProducto({

...producto,

colores:e.target.value

})}

/>






<div className="
bg-[#111]
border
border-[#333]
rounded-2xl
p-5
">


<p className="font-bold mb-3">

🖼️ Imagen del producto

</p>



<input

type="file"

accept="image/*"

onChange={subirImagen}

/>



{subiendo && (

<p className="text-yellow-400 mt-3">

⏳ Subiendo imagen...

</p>

)}



{producto.imagen && (

<img

src={producto.imagen}

className="
w-52
h-52
object-contain
bg-white
rounded-2xl
mt-5
"

/>

)}


</div>






<button

disabled={subiendo || guardando}

className="
w-full
mt-6
bg-[#f5b800]
text-black
font-black
py-4
rounded-xl
hover:bg-[#ffd700]
transition
"

>


{

guardando

?

"⏳ Guardando..."

:

"➕ Guardar producto"

}


</button>



</form>


</div>








<h2 className="
text-3xl
font-black
mb-6
">

📦 Productos publicados

</h2>







<div className="
grid
md:grid-cols-2
xl:grid-cols-3
gap-6
">


{

productos?.map((p)=>(


<div

key={p.id}

className="
bg-[#181818]
border
border-[#333]
rounded-3xl
p-5
hover:border-[#f5b800]
hover:-translate-y-2
transition
duration-300
"

>



<div className="relative">


<img

src={p.imagen}

alt={p.nombre}

className="
w-full
h-64
object-contain
bg-white
rounded-2xl
"

/>



{

ofertaActiva(p.descuento_hasta) && (

<span className="
absolute
top-3
left-3
bg-red-600
px-4
py-1
rounded-full
font-bold
">

🔥 OFERTA

</span>

)

}



</div>





<h3 className="
text-xl
font-bold
mt-5
">

{p.nombre}

</h3>





<p className="
text-gray-400
mt-2
">

{p.categoria}

</p>





<p className="
text-[#f5b800]
font-black
text-2xl
mt-3
">

S/ {

ofertaActiva(p.descuento_hasta)

?

Number(p.precio).toFixed(2)

:

Number(
p.precio_original || p.precio
).toFixed(2)

}


</p>







{

ofertaActiva(p.descuento_hasta)
&& Number(p.descuento)>0 && (

<p className="
text-red-400
font-bold
">

🔥 {p.descuento}% OFF

</p>

)

}






{

p.descuento_hasta && (

<p className="text-gray-300 mt-3">


{

ofertaActiva(p.descuento_hasta)

?

"⏰ Oferta termina: "

+

new Date(
p.descuento_hasta
).toLocaleString()

:

"⌛ Oferta finalizada - Precio normal"

}


</p>

)

}






<p className="mt-3">

📦 Stock: {p.stock}

</p>






<button

onClick={()=>eliminarProducto(p.id)}

className="
mt-5
bg-red-600
px-5
py-3
rounded-xl
font-bold
hover:bg-red-700
transition
"

>

🗑️ Eliminar

</button>



</div>



))


}


</div>



</main>

);

}