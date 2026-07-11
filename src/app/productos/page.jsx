"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import CountdownProduct from "@/components/CountdownProduct";

export default function Productos() {

const { carrito, agregarCarrito } = useCart();

const { productos } = useProducts();

const pathname = usePathname();


const [busqueda,setBusqueda] = useState("");

const [categoria,setCategoria] = useState("Todos");

const [selecciones,setSelecciones] = useState({});



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



const ofertaActiva=(fecha)=>{

if(!fecha) return false;

return new Date(fecha)>new Date();

};



const seleccionar=(id,campo,valor)=>{

setSelecciones((prev)=>({

...prev,

[id]:{

...prev[id],

[campo]:valor

}

}));

};



const productosFiltrados = productos.filter((producto)=>{

const nombre =
producto.nombre
?.toLowerCase()
.includes(busqueda.toLowerCase());


const cat =
categoria==="Todos" ||
producto.categoria===categoria;


return nombre && cat;

});



return (

<main className="min-h-screen px-6 py-10">


<div className="
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-8
shadow-2xl
mb-8
">

<h1 className="
text-4xl
font-bold
mb-4
">

🛍️ Catálogo 
<span className="text-[#f5b800]">
ANNT LOGISTICS
</span>

</h1>


<p className="text-gray-300">

Todos nuestros productos están sujetos a disponibilidad,
proveedores y costos de importación.

</p>


<p className="mt-4">

🚚 Entrega estimada: 6 a 15 días hábiles

</p>


<a

href="https://wa.me/51907025944"

target="_blank"

className="
inline-block
mt-5
bg-green-500/90
backdrop-blur-lg
border
border-white/20
text-white
font-bold
px-6
py-3
rounded-xl
hover:bg-green-600
transition
"

>

💬 WhatsApp: 907025944

</a>

</div>

<p className="mb-4 text-gray-300">

Todos nuestros productos están sujetos a disponibilidad,
proveedores y costos de importación.

</p>



<p className="mb-6">

🚚 Entrega estimada: 6 a 15 días hábiles

</p>



<a

href="https://wa.me/51907025944"

target="_blank"

className="
inline-block
mb-6
bg-green-500
text-white
font-bold
px-6
py-3
rounded-xl
"

>

💬 WhatsApp: 907025944

</a>



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



<div className="flex flex-wrap gap-3 mb-8">


{

categorias.map((cat)=>(

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

))

}


</div>





<div className="
grid
md:grid-cols-3
lg:grid-cols-4
gap-6
">


{

productosFiltrados.map((producto)=>(


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


{

ofertaActiva(producto.descuento_hasta)&&(

<div className="
absolute
top-3
left-3
bg-red-500
px-3
py-1
rounded-full
font-bold
">

🔥 OFERTA

</div>

)

}



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



<p className="
text-sm
text-gray-400
mt-4
">

{producto.categoria}

</p>



<h2 className="
font-bold
text-xl
">

{producto.nombre}

</h2>



<p className="
text-gray-300
">

{producto.descripcion}

</p>




<div className="mt-3">


{

ofertaActiva(producto.descuento_hasta)

?

(

<>

<p className="
line-through
text-gray-400
">

S/ {Number(producto.precio_original).toFixed(2)}

</p>


<p className="
text-3xl
font-bold
text-[#f5b800]
">

S/ {Number(producto.precio).toFixed(2)}

</p>

</>

)


:


(

<p className="
text-3xl
font-bold
text-[#f5b800]
">

S/ {Number(producto.precio_original || producto.precio).toFixed(2)}

</p>

)

}


</div>





{

ofertaActiva(producto.descuento_hasta)&&(

<CountdownProduct

fecha={producto.descuento_hasta}

/>

)

}





{

producto.tallas && (

<div className="flex gap-2 mt-4 flex-wrap">


{

producto.tallas.split(",").map((talla)=>{

const t=talla.trim();


return (

<button

key={t}

onClick={()=>seleccionar(producto.id,"talla",t)}

className={`

border
px-3
py-1
rounded-lg

${
selecciones[producto.id]?.talla===t

?

"bg-[#f5b800] text-black"

:

"bg-[#111]"

}

`}

>

{t}

</button>

)

})

}


</div>

)

}





{

producto.colores && (

<div className="flex gap-2 mt-3 flex-wrap">


{

producto.colores.split(",").map((color)=>{

const c=color.trim();


return (

<button

key={c}

onClick={()=>seleccionar(producto.id,"color",c)}

className={`

border
px-3
py-1
rounded-lg

${
selecciones[producto.id]?.color===c

?

"bg-[#f5b800] text-black"

:

"bg-[#111]"

}

`}

>

{c}

</button>

)

})

}


</div>

)

}





<button

onClick={()=>{


const elegido=selecciones[producto.id] || {};



if(producto.tallas && !elegido.talla){

alert("Selecciona una talla");

return;

}



if(producto.colores && !elegido.color){

alert("Selecciona un color");

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


))

}


</div>





{

carrito.length>0 && pathname !== "/carrito" && (

<div className="
fixed
bottom-5
right-5
bg-[#f5b800]
text-black
p-5
rounded-xl
font-bold
">


🛒 Tu carrito:

{carrito.length} producto(s)


<a

href="/carrito"

className="
block
mt-2
underline
"

>

Ver carrito

</a>


</div>

)

}



</main>

);

}