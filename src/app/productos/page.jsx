"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import CountdownProduct from "@/components/CountdownProduct";


export default function Productos(){

const { carrito, agregarCarrito } = useCart();

const { productos } = useProducts();

const pathname = usePathname();


const [busqueda,setBusqueda]=useState("");

const [categoria,setCategoria]=useState("Todos");

const [selecciones,setSelecciones]=useState({});



const categorias=[

"Todos",
"Moda",
"Zapatillas",
"Electrónica",
"Hogar",
"Belleza",
"Accesorios",
"Gaming",
"Mascotas",
"Deportes",
"Oficina",
"Herramientas",
"Juguetes",
"Bebés",
"Automóvil",
"Otros",

];



// OFERTA ACTIVA

const ofertaActiva=(producto)=>{

if(!producto.descuento_hasta) return false;

if(!producto.descuento) return false;


return new Date(producto.descuento_hasta)>new Date();

};



// SELECCIONAR TALLA Y COLOR

const seleccionar=(id,campo,valor)=>{

setSelecciones(prev=>({

...prev,

[id]:{

...prev[id],

[campo]:valor

}

}));

};



// FILTRO

const productosFiltrados=productos.filter((producto)=>{


const coincideNombre=

producto.nombre
?.toLowerCase()
.includes(busqueda.toLowerCase());



const coincideCategoria=

categoria==="Todos" ||

producto.categoria
?.trim()
.toLowerCase()
===
categoria.trim()
.toLowerCase();



return coincideNombre && coincideCategoria;


});



return(

<main className="p-6">
{/* ANUNCIO */}

<div
className="
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-8
mb-10
shadow-xl
"
>

<h1 className="text-4xl font-bold">

🛍️ Catálogo{" "}

<span className="text-[#f5b800]">
ANNT LOGISTICS
</span>

</h1>


<p className="mt-4 text-gray-300">

Todos nuestros productos están sujetos a disponibilidad,
proveedores y costos de importación.

</p>


<p className="mt-2">

🚚 Entrega estimada: 6 a 15 días hábiles

</p>


<a
href="https://wa.me/51907025944"
target="_blank"
className="
inline-block
mt-5
bg-green-500
px-6
py-3
rounded-xl
font-bold
"
>

💬 WhatsApp: 907025944

</a>


</div>





{/* BUSCADOR */}

<input

className="
w-full
bg-[#181818]
border
border-[#333]
p-4
rounded-2xl
mb-6
"

placeholder="🔎 Buscar productos..."

value={busqueda}

onChange={(e)=>setBusqueda(e.target.value)}

/>





{/* CATEGORIAS */}

<div className="flex flex-wrap gap-3 mb-8">


{categorias.map(cat=>(

<button

key={cat}

onClick={()=>setCategoria(cat)}

className={`
px-5
py-2
rounded-full
border

${
categoria===cat
?
"bg-[#f5b800] text-black font-bold"
:
"bg-[#181818]"
}

`}

>

{cat}

</button>


))}


</div>





{/* PRODUCTOS */}

<div
className="
grid
md:grid-cols-2
lg:grid-cols-3
gap-6
"
>


{productosFiltrados.map((producto)=>(


<div

key={producto.id}

className="
card-dark
p-5
relative
hover:-translate-y-2
transition
"

>



{/* OFERTA */}

{ofertaActiva(producto) && (

<span

className="
absolute
top-4
left-4
z-10
bg-red-500
text-white
px-3
py-1
rounded-full
font-bold
"

>

🔥 OFERTA -{producto.descuento}%

</span>

)}




<img

src={producto.imagen}

alt={producto.nombre}

className="
w-full
h-80
object-contain
bg-white
rounded-2xl
"

/>




<p className="text-sm text-gray-400 mt-3">

{producto.categoria}

</p>



<h2 className="text-xl font-bold">

{producto.nombre}

</h2>



<p className="text-gray-300 mt-2">

{producto.descripcion}

</p>





{/* PRECIOS */}

{ofertaActiva(producto) ? (


<div className="mt-4">


<p className="
line-through
text-gray-400
">

S/
{Number(producto.precio_original).toFixed(2)}

</p>



<p className="
text-3xl
font-bold
text-[#f5b800]
">

S/
{Number(producto.precio).toFixed(2)}

</p>


</div>


):(


<p className="
text-3xl
font-bold
text-[#f5b800]
mt-4
">

S/
{Number(producto.precio).toFixed(2)}

</p>


)}






{/* CONTADOR */}

{ofertaActiva(producto) && (

<CountdownProduct

fecha={producto.descuento_hasta}

/>

)}
{/* TALLAS */}

{producto.tallas && (

<div className="mt-5">

<p className="font-bold mb-2">
📏 Talla:
</p>


<div className="flex flex-wrap gap-2">


{producto.tallas.split(",").map((talla)=>(

<button

key={talla}

type="button"

onClick={()=>seleccionar(
producto.id,
"talla",
talla.trim()
)}

className={`
px-4
py-2
rounded-lg
border

${
selecciones[producto.id]?.talla===talla.trim()

?

"bg-[#f5b800] text-black font-bold"

:

"bg-[#222]"
}

`}

>

{talla.trim()}

</button>


))}


</div>

</div>

)}






{/* COLORES */}

{producto.colores && (

<div className="mt-5">


<p className="font-bold mb-2">
🎨 Color:
</p>


<div className="flex flex-wrap gap-2">


{producto.colores.split(",").map((color)=>(


<button

key={color}

type="button"

onClick={()=>seleccionar(
producto.id,
"color",
color.trim()
)}

className={`
px-4
py-2
rounded-lg
border

${
selecciones[producto.id]?.color===color.trim()

?

"bg-[#f5b800] text-black font-bold"

:

"bg-[#222]"
}

`}

>

{color.trim()}

</button>


))}


</div>


</div>


)}






{/* BOTON CARRITO */}

<button

type="button"

onClick={()=>{


const elegido = selecciones[producto.id] || {};



if(producto.tallas && !elegido.talla){

alert("Selecciona una talla");

return;

}



agregarCarrito({

...producto,

talla:elegido.talla || "",

color:elegido.color || "",

cantidad:1

});


}}

className="
mt-6
w-full
btn-gold
"

>

🛒 Agregar al carrito

</button>



</div>


))}


</div>






{/* SIN PRODUCTOS */}

{productosFiltrados.length===0 && (

<p className="
text-center
text-gray-400
text-xl
mt-12
">

No hay productos en la categoría "{categoria}"

</p>

)}







{/* CARRITO FLOTANTE */}

{carrito.length>0 && pathname!=="/carrito" && (

<div

className="
fixed
bottom-5
right-5
bg-[#f5b800]
text-black
font-bold
px-6
py-4
rounded-2xl
shadow-xl
z-50
"

>


🛒 {carrito.length} producto(s)


<a

href="/carrito"

className="
block
underline
mt-2
"

>

Ver carrito

</a>


</div>


)}



</main>


);


}