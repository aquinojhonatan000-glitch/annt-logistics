"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import Link from "next/link";
import CountdownProduct from "@/components/CountdownProduct";


export default function Productos() {


const { carrito, agregarCarrito } = useCart();

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


<h1 className="
text-4xl
font-bold
mb-3
text-center
">

🛍️ Catálogo ANNT LOGISTICS

</h1>



<p className="
text-center
text-gray-400
mb-8
">

Precios sujetos a disponibilidad del producto,
proveedor y costos de importación.

<br/>

🚚 Entrega estimada: 6 a 15 días hábiles.

</p>





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
outline-none
"

placeholder="🔎 Buscar productos..."

value={busqueda}

onChange={(e)=>setBusqueda(e.target.value)}

/>





<div className="
flex
gap-3
flex-wrap
mb-10
">


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
transition


${
categoria===cat

?

"bg-[#f5b800] text-black font-bold border-[#f5b800]"

:

"bg-[#181818] border-[#333] hover:border-[#f5b800]"

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
gap-8
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
duration-300
"


>


{

ofertaActiva(producto.descuento_hasta) && (

<span className="
absolute
top-4
left-4
bg-red-600
px-3
py-1
rounded-full
font-bold
text-sm
">

🔥 OFERTA

</span>

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
mb-5
"

/>



<p className="
text-[#f5b800]
font-bold
">

{producto.categoria}

</p>



<h2 className="
text-xl
font-bold
mt-2
">

{producto.nombre}

</h2>



{

producto.descripcion && (

<p className="
text-gray-400
mt-3
">

{producto.descripcion}

</p>

)

}







{

ofertaActiva(producto.descuento_hasta)

&&

Number(producto.descuento)>0

&&

(

<div className="
mt-4
">


<span className="
text-gray-400
line-through
mr-3
">

S/ {Number(producto.precio_original).toFixed(2)}

</span>



<span className="
bg-red-600
px-3
py-1
rounded-full
text-sm
font-bold
">

-{producto.descuento}% OFF

</span>


</div>

)

}





<p className="
text-3xl
font-bold
text-[#f5b800]
mt-3
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

<CountdownProduct 

fecha={producto.descuento_hasta}

/>

)

}








{

producto.tallas && (

<div className="mt-5">

<p>👕 Talla</p>


<div className="flex gap-2 flex-wrap mt-2">


{

producto.tallas.split(",").map((talla)=>{


const tallaLimpia=talla.trim();



return (

<button

key={tallaLimpia}

onClick={()=>seleccionar(producto.id,"talla",tallaLimpia)}

className={`

px-3
py-1
rounded-lg
border

${
selecciones[producto.id]?.talla===tallaLimpia

?

"bg-[#f5b800] text-black"

:

"bg-[#111]"

}

`}

>

{tallaLimpia}

</button>


)


})

}


</div>

</div>

)

}







{

producto.colores && (

<div className="mt-5">

<p>🎨 Color</p>


<div className="flex gap-2 flex-wrap mt-2">


{

producto.colores.split(",").map((color)=>{


const colorLimpio=color.trim();



return (

<button

key={colorLimpio}

onClick={()=>seleccionar(producto.id,"color",colorLimpio)}

className={`

px-3
py-1
rounded-lg
border

${
selecciones[producto.id]?.color===colorLimpio

?

"bg-[#f5b800] text-black"

:

"bg-[#111]"

}

`}

>

{colorLimpio}

</button>


)


})

}


</div>

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

color:elegido.color || ""

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


carrito.length > 0 && (


<div className="
fixed
bottom-5
right-5
bg-[#181818]
border
border-[#f5b800]
rounded-2xl
p-5
shadow-2xl
w-80
z-50
">


<h3 className="
font-bold
text-xl
mb-2
">

🛒 Tu carrito

</h3>



<p className="text-gray-300">

{carrito.length} producto(s)

</p>



<p className="
text-[#f5b800]
text-2xl
font-bold
my-3
">

S/

{

carrito.reduce(

(total,item)=>

total + Number(item.precio),

0

).toFixed(2)

}

</p>




<Link

href="/carrito"

className="
block
text-center
bg-[#f5b800]
text-black
font-bold
py-3
rounded-xl
hover:bg-[#ffd700]
transition
"

>

Ver carrito 🛒


</Link>


</div>


)

}




</main>

);

}