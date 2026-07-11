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

<main className="min-h-screen">


<h1 className="text-4xl font-bold mb-6">
🛍️ Catálogo ANNT LOGISTICS
</h1>



<div className="
bg-[#181818]
border
border-[#333]
rounded-2xl
p-5
mb-8
">

<h2 className="
text-xl
font-bold
text-[#f5b800]
">

🚚 Compra segura y atención personalizada

</h2>


<p className="text-gray-300 mt-3">

Todos nuestros productos están sujetos a disponibilidad,
proveedores y costos de importación.

</p>


<p className="text-gray-300 mt-2">

📦 Entrega estimada: <b>6 a 15 días hábiles</b>

</p>


<p className="text-gray-300 mt-2">

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
outline-none
"

placeholder="🔎 Buscar productos..."

value={busqueda}

onChange={(e)=>setBusqueda(e.target.value)}

/>




<div className="
flex
flex-wrap
gap-3
mb-8
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

ofertaActiva(producto.descuento_hasta) && (

<span className="
badge-offer
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



<p className="text-gray-400">

{producto.categoria}

</p>



<h2 className="
text-xl
font-bold
mt-2
">

{producto.nombre}

</h2>




<p className="
text-gray-300
mt-2
">

{producto.descripcion}

</p>




{

ofertaActiva(producto.descuento_hasta)
&&
Number(producto.descuento)>0
&&

(

<div className="mt-3">

<span className="
line-through
text-gray-400
">

S/ {Number(producto.precio_original).toFixed(2)}

</span>


<span className="
ml-3
bg-red-600
px-3
py-1
rounded-full
text-white
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

S/ {

ofertaActiva(producto.descuento_hasta)

?

Number(producto.precio).toFixed(2)

:

Number(producto.precio_original || producto.precio).toFixed(2)

}

</p>




{

ofertaActiva(producto.descuento_hasta) && (

<CountdownProduct
fecha={producto.descuento_hasta}
/>

)

}





{

producto.tallas && (

<div className="mt-4">

<p>👕 Talla</p>


<div className="flex gap-2 flex-wrap mt-2">


{

producto.tallas.split(",").map((talla)=>{


const t=talla.trim();


return (

<button

key={t}

onClick={()=>seleccionar(producto.id,"talla",t)}

className="
border
px-3
py-1
rounded-lg
"

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

<div className="mt-4">


<p>🎨 Color</p>


<div className="flex gap-2 flex-wrap mt-2">


{

producto.colores.split(",").map((color)=>{


const c=color.trim();


return (

<button

key={c}

onClick={()=>seleccionar(producto.id,"color",c)}

className="
border
px-3
py-1
rounded-lg
"

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


const elegido =
selecciones[producto.id] || {};


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
border-[#f5b800]
rounded-2xl
p-5
shadow-xl
z-50
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