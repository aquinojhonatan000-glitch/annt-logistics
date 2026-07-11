"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
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

<main className="space-y-8">



<section className="
card-dark
p-6
">

<h2 className="text-2xl font-bold">
🚚 Compra segura y atención personalizada
</h2>


<p className="text-gray-300 mt-3">

Todos nuestros productos están sujetos a disponibilidad,
proveedores y costos de importación.

</p>


<p className="mt-3">
📦 Entrega estimada: 6 a 15 días hábiles
</p>


<p className="mt-3">
💬 ¿Tienes dudas antes de comprar?
Nuestro equipo está disponible por WhatsApp.
</p>



<a

href="https://wa.me/51907025944"

target="_blank"

className="
inline-block
mt-4
bg-green-500
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


</section>





<input

className="
w-full
bg-[#181818]
border
border-[#333]
p-4
rounded-2xl
outline-none
"

placeholder="🔎 Buscar productos..."

value={busqueda}

onChange={(e)=>setBusqueda(e.target.value)}

/>





<div className="flex flex-wrap gap-3">


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

"bg-[#f5b800] text-black font-bold"

:

"bg-[#181818] border-[#333]"

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
duration-300
"


>



{

ofertaActiva(producto.descuento_hasta)&&(

<span className="badge-offer">

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
"

/>





<p className="text-gray-400 mt-3">

{producto.categoria}

</p>



<h2 className="text-xl font-bold">

{producto.nombre}

</h2>



<p className="text-gray-300 mt-2">

{producto.descripcion}

</p>




<p className="
text-3xl
font-bold
text-[#f5b800]
mt-4
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

ofertaActiva(producto.descuento_hasta)&&(

<CountdownProduct
fecha={producto.descuento_hasta}
/>

)

}







{
producto.tallas && (

<div className="mt-5">


<p>
👕 Talla
</p>


<div className="flex flex-wrap gap-2 mt-2">


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

</div>

)

}





{
producto.colores && (

<div className="mt-5">


<p>
🎨 Color
</p>



<div className="flex flex-wrap gap-2 mt-2">


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

</div>

)

}






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

carrito.length>0 && (

<div className="
fixed
bottom-5
right-5
bg-[#181818]
border
border-[#333]
rounded-2xl
p-5
shadow-xl
">


<p className="font-bold">

🛒 Tu carrito

</p>


<p>

{carrito.length} producto(s)

</p>



<a

href="/carrito"

className="
block
mt-3
bg-[#f5b800]
text-black
font-bold
px-5
py-3
rounded-xl
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