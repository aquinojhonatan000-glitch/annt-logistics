"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import Link from "next/link";
import CountdownProduct from "@/components/CountdownProduct";


export default function Productos() {

const { carrito, agregarCarrito, mensajeCarrito } = useCart();
const { productos } = useProducts();


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

return new Date(fecha) > new Date();

};



const productosFiltrados = productos.filter((producto)=>{

const nombre = producto.nombre
?.toLowerCase()
.includes(busqueda.toLowerCase());


const cat =
categoria==="Todos" ||
producto.categoria===categoria;


return nombre && cat;

});



const seleccionar=(id,campo,valor)=>{

setSelecciones((prev)=>({

...prev,

[id]:{

...prev[id],

[campo]:valor

}

}));

};




return (

<main className="min-h-screen px-5 md:px-10 py-10">



<h1 className="text-4xl md:text-5xl font-bold mb-8">

🛍️ Catálogo 

<span className="text-[#f5b800]">
 ANNT LOGISTICS
</span>

</h1>



<div className="
bg-[#181818]
border
border-[#333]
rounded-3xl
p-6
mb-8
shadow-xl
">

<h2 className="text-xl font-bold text-[#f5b800]">
📢 Aviso importante
</h2>


<p className="text-gray-400 mt-3">

Precios sujetos a disponibilidad del producto,
proveedor y costos de importación.

</p>


<p className="text-gray-400 mt-3">

🚚 Entrega estimada: 6 a 15 días hábiles.

</p>

</div>




<input

className="
w-full
bg-[#181818]
border
border-[#333]
p-4
rounded-2xl
mb-8
focus:border-[#f5b800]
"

placeholder="🔎 Buscar productos..."

value={busqueda}

onChange={(e)=>setBusqueda(e.target.value)}

/>




<div className="
flex
flex-wrap
gap-3
mb-10
">


{categorias.map((cat)=>(

<button

key={cat}

onClick={()=>setCategoria(cat)}

className={`
px-5
py-2
rounded-full
border
transition
${

categoria===cat

?

"bg-[#f5b800] text-black font-bold"

:

"bg-[#181818] border-[#333] hover:border-[#f5b800]"

}

`}

>

{cat}

</button>

))}


</div>





<div className="
grid
sm:grid-cols-2
lg:grid-cols-3
gap-8
">


{productosFiltrados.map((producto)=>(


<div

key={producto.id}

className="
card-dark
p-5
fade-up
relative
"

>


{ofertaActiva(producto.descuento_hasta) && (

<span className="
absolute
top-5
left-5
badge-offer
">

🔥 OFERTA

</span>

)}




<img

src={producto.imagen}

alt={producto.nombre}

className="
product-image
w-full
h-80
object-contain
"

/>




<p className="text-[#f5b800] mt-5 font-bold">

{producto.categoria}

</p>



<h2 className="text-2xl font-bold mt-2">

{producto.nombre}

</h2>




{producto.descripcion && (

<p className="
text-gray-400
mt-3
text-sm
line-clamp-3
">

{producto.descripcion}

</p>

)}




<div className="mt-5">


{

ofertaActiva(producto.descuento_hasta)

&&

Number(producto.descuento)>0

&&

(

<div>

<p className="
text-gray-400
line-through
">

S/ {Number(producto.precio_original).toFixed(2)}

</p>


<span className="badge-offer">

-{producto.descuento}% OFF

</span>

</div>

)

}



<p className="
text-3xl
font-bold
text-[#f5b800]
mt-2
">

S/

{

ofertaActiva(producto.descuento_hasta)

?

Number(producto.precio).toFixed(2)

:

Number(producto.precio_original || producto.precio).toFixed(2)

}

</p>


{

ofertaActiva(producto.descuento_hasta)

&&

(

<CountdownProduct fecha={producto.descuento_hasta}/>

)

}


</div>





{producto.tallas && (

<div className="mt-5">

<p className="mb-2">
👕 Talla
</p>


<div className="flex flex-wrap gap-2">

{

producto.tallas.split(",").map((talla)=>(


<button

key={talla}

onClick={()=>seleccionar(producto.id,"talla",talla.trim())}

className="
px-3
py-1
rounded-lg
border
bg-[#111]
"

>

{talla.trim()}

</button>


))

}

</div>

</div>

)}







{producto.colores && (

<div className="mt-5">

<p className="mb-2">
🎨 Color
</p>


<div className="flex flex-wrap gap-2">


{

producto.colores.split(",").map((color)=>(


<button

key={color}

onClick={()=>seleccionar(producto.id,"color",color.trim())}

className="
px-3
py-1
rounded-lg
border
bg-[#111]
"

>

{color.trim()}

</button>


))

}


</div>

</div>

)}






<button

onClick={()=>{

const elegido = selecciones[producto.id] || {};


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






{mensajeCarrito && (

<div className="
fixed
bottom-5
right-5
bg-[#181818]
border
border-[#f5b800]
rounded-2xl
p-5
shadow-xl
z-50
">


<p className="font-bold mb-3">

✅ Producto agregado

</p>


<Link

href="/carrito"

className="
btn-gold
block
text-center
"

>

🛒 Ver carrito

</Link>


</div>

)}



</main>


);

}