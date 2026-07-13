"use client";

import { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ProductosAdmin(){

const {
productos,
agregarProducto,
eliminarProducto,
actualizarProducto
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
imagenes:[],
};

const [producto,setProducto]=useState(productoInicial);
const [subiendo,setSubiendo]=useState(false);
const [guardando,setGuardando]=useState(false);
const [editando,setEditando]=useState(null);


// ==========================
// PEGAR IMAGEN COPIADA
// ==========================

const pegarImagen=async()=>{

try{

setSubiendo(true);


const items = await navigator.clipboard.read();


for(const item of items){


const tipoImagen=item.types.find(tipo=>
tipo.startsWith("image/")
);


if(!tipoImagen) continue;


const blob=await item.getType(tipoImagen);


const extension=
tipoImagen.split("/")[1]?.replace("jpeg","jpg")
||"png";


const nombreArchivo=
`producto-${Date.now()}.${extension}`;



const {error}=await supabase.storage
.from("imagenes")
.upload(nombreArchivo,blob,{
contentType:tipoImagen
});


if(error) throw error;



const {data}=supabase.storage
.from("imagenes")
.getPublicUrl(nombreArchivo);



setProducto(prev=>({

...prev,

imagenes:[
...prev.imagenes,
data.publicUrl
]

}));

alert("✅ Imagen pegada correctamente");


return;

}


alert("No hay imagen copiada");


}catch(error){

console.log(error);

alert("No se pudo pegar la imagen");


}finally{

setSubiendo(false);

}

};



// ==========================
// SUBIR IMAGEN DESDE PC
// ==========================

const subirImagen=async(e)=>{


const archivo=e.target.files?.[0];


if(!archivo)return;


setSubiendo(true);



try{


const nombreArchivo=
Date.now()+"-"+archivo.name.replace(/\s+/g,"-");



const {error}=await supabase.storage
.from("imagenes")
.upload(nombreArchivo,archivo);



if(error) throw error;



const {data}=supabase.storage
.from("imagenes")
.getPublicUrl(nombreArchivo);



setProducto(prev=>({

...prev,

imagenes:[
...prev.imagenes,
data.publicUrl
]

}));


}catch(error){


console.log(error);

alert("Error subiendo imagen");


}finally{


setSubiendo(false);


}


};

// ==========================
// EDITAR PRODUCTO
// ==========================

const editarProducto=(p)=>{

setEditando(p.id);

setProducto({

nombre:p.nombre || "",
descripcion:p.descripcion || "",
categoria:p.categoria || "",
precio:p.precio || "",
precio_original:p.precio_original || "",
descuento:p.descuento || "",
descuento_hasta:p.descuento_hasta
? p.descuento_hasta.slice(0,16)
: "",
stock:p.stock || "",
tallas:p.tallas || "",
colores:p.colores || "",
imagenes:p.imagenes || [],
});

};


// ==========================
// GUARDAR PRODUCTO
// ==========================

const guardarProducto=async(e)=>{


e.preventDefault();

console.log("PRODUCTO A GUARDAR:", producto);

if(producto.imagenes.length===0){

alert("Agrega una imagen");

return;

}

if(!producto.precio){

alert("Escribe el precio");

return;

}



setGuardando(true);


try{

if(editando){

await actualizarProducto(
editando,
{

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

}

);

setEditando(null);

}
else{


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


}



setProducto(productoInicial);


alert("✅ Producto guardado");



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
bg-black
text-white
p-8
">


<h1 className="
text-3xl
font-bold
mb-6
">
⚙️ ANNT LOGISTICS ADMIN
</h1>



<div className="
flex
gap-3
flex-wrap
mb-10
">


<Link
href="/admin"
className="
bg-[#222]
px-6
py-3
rounded-xl
font-bold
"
>

🏠 Panel principal

</Link>



<Link
href="/admin/pedidos"
className="
bg-[#f5b800]
text-black
px-6
py-3
rounded-xl
font-bold
"
>

📦 Ver pedidos

</Link>


</div>




<form

onSubmit={guardarProducto}

className="
bg-[#181818]
border
border-[#333]
rounded-2xl
p-6
"


>


<h2 className="
text-2xl
font-bold
mb-6
">

🛍️ Agregar producto

</h2>




<div className="
grid
md:grid-cols-2
gap-4
">





<input

className="
bg-[#111]
border
border-[#333]
p-4
rounded-xl
"

placeholder="Nombre del producto"

value={producto.nombre}

onChange={(e)=>setProducto({

...producto,

nombre:e.target.value

})}

/>






<input

className="
bg-[#111]
border
border-[#333]
p-4
rounded-xl
"

placeholder="Categoría"

value={producto.categoria}

onChange={(e)=>setProducto({

...producto,

categoria:e.target.value

})}

/>






<input

type="number"

className="
bg-[#111]
border
border-[#333]
p-4
rounded-xl
"

placeholder="Precio"

value={producto.precio}

onChange={(e)=>setProducto({

...producto,

precio:e.target.value

})}

/>






<input

type="number"

className="
bg-[#111]
border
border-[#333]
p-4
rounded-xl
"

placeholder="Precio original"

value={producto.precio_original}

onChange={(e)=>setProducto({

...producto,

precio_original:e.target.value

})}

/>






<input

type="number"

className="
bg-[#111]
border
border-[#333]
p-4
rounded-xl
"

placeholder="Descuento %"

value={producto.descuento}

onChange={(e)=>setProducto({

...producto,

descuento:e.target.value

})}

/>






<input

type="number"

className="
bg-[#111]
border
border-[#333]
p-4
rounded-xl
"

placeholder="Stock"

value={producto.stock}

onChange={(e)=>setProducto({

...producto,

stock:e.target.value

})}

/>






<input

className="
bg-[#111]
border
border-[#333]
p-4
rounded-xl
"

placeholder="Tallas (S,M,L)"

value={producto.tallas}

onChange={(e)=>setProducto({

...producto,

tallas:e.target.value

})}

/>






<input

className="
bg-[#111]
border
border-[#333]
p-4
rounded-xl
"

placeholder="Colores"

value={producto.colores}

onChange={(e)=>setProducto({

...producto,

colores:e.target.value

})}

/>





<input

type="datetime-local"

className="
bg-[#111]
border
border-[#333]
p-4
rounded-xl
"

value={producto.descuento_hasta}

onChange={(e)=>setProducto({

...producto,

descuento_hasta:e.target.value

})}

/>
{/* VISTA PREVIA DE IMÁGENES */}

<div className="mt-5 grid grid-cols-3 gap-3">

{producto.imagenes.map((img,index)=>(

<div
key={index}
className="relative"
>

<img

src={img}

className="
w-full
h-24
object-cover
rounded-xl
"

/>


<button

type="button"

onClick={()=>{

setProducto(prev=>({

...prev,

imagenes:
prev.imagenes.filter((_,i)=>i!==index)

}));

}}

className="
absolute
top-1
right-1
bg-red-500
px-2
rounded-full
"

>

❌

</button>


</div>

))}

</div>


</div>





<textarea

className="
w-full
bg-[#111]
border
border-[#333]
p-4
rounded-xl
mt-4
min-h-32
"

placeholder="Descripción del producto"

value={producto.descripcion}

onChange={(e)=>setProducto({

...producto,

descripcion:e.target.value

})}


/>
<div className="
flex
gap-4
mt-6
flex-wrap
">


<button

type="button"

onClick={pegarImagen}

disabled={subiendo}

className="
bg-[#f5b800]
text-black
font-bold
px-6
py-4
rounded-xl
"

>

📋 {subiendo ? "Subiendo..." : "Pegar imagen"}

</button>




<label

className="
bg-[#333]
px-6
py-4
rounded-xl
font-bold
cursor-pointer
"

>

📁 Subir imagen



<input

type="file"

accept="image/*"

className="hidden"

onChange={subirImagen}

/>



</label>



</div>





{producto.imagen && (

<div className="mt-6">


<p className="font-bold mb-3">

Vista previa:

</p>


<img

src={producto.imagen}

alt="Producto"

className="
w-52
h-52
object-contain
bg-white
rounded-xl
"

/>


</div>

)}





<button

type="submit"

disabled={guardando}

className="
mt-8
bg-[#f5b800]
text-black
font-bold
px-8
py-4
rounded-xl
"

>

{

guardando

?

"Guardando..."

:

"Guardar producto"

}


</button>



</form>





{productos.length > 0 && (

<section className="mt-10">


<h2 className="
text-2xl
font-bold
mb-6
">

📋 Productos publicados

</h2>





<div className="
grid
md:grid-cols-2
gap-5
">


{

productos.map((item)=>(


<div

key={item.id}

className="
bg-[#181818]
border
border-[#333]
rounded-2xl
p-5
"

>


{item.imagenes?.length > 0 ? (

<div className="grid grid-cols-2 gap-3">

{item.imagenes.map((img,index)=>(

<img

key={index}

src={img}

alt={item.nombre}

className="
w-full
h-32
object-contain
bg-white
rounded-xl
"

/>

))}

</div>

) : item.imagen && (

<img

src={item.imagen}

alt={item.nombre}

className="
w-full
h-48
object-contain
bg-white
rounded-xl
mb-4
"

/>

)}





<h3 className="font-bold text-lg">

{item.nombre}

</h3>




<p className="
text-[#f5b800]
font-bold
mt-2
">

S/ {Number(item.precio).toFixed(2)}

</p>




<button

onClick={()=>eliminarProducto(item.id)}

className="
mt-4
bg-red-600
px-5
py-2
rounded-xl
font-bold
"

>

🗑️ Eliminar

</button>




</div>


))


}



</div>


</section>


)}



</main>


);


}