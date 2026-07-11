"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import Link from "next/link";

export default function Productos() {

const { carrito, agregarCarrito, mensajeCarrito } = useCart();

const { productos } = useProducts();

const [busqueda, setBusqueda] = useState("");

const [categoria, setCategoria] = useState("Todos");

const [selecciones, setSelecciones] = useState({});


const categorias = [
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
"Otros"
];


const productosFiltrados = productos.filter((producto)=>{

const nombre = producto.nombre
?.toLowerCase()
.includes(busqueda.toLowerCase());


const cat =
categoria === "Todos" ||
producto.categoria === categoria;


return nombre && cat;

});



const seleccionar=(id,campo,valor)=>{

setSelecciones({

...selecciones,

[id]:{

...selecciones[id],

[campo]:valor

}

});

};



return (

<main className="min-h-screen bg-[#111] text-white p-8">


<h1 className="text-4xl font-bold mb-5">

🛍️ Catálogo ANNT LOGISTICS

</h1>
<div className="bg-yellow-500 text-black rounded-xl p-5 mb-6 font-bold">

📢 Aviso importante ANNT LOGISTICS
<p className="mt-2 font-normal">
Algunos precios pueden variar según disponibilidad del producto,
proveedor, descuentos ya vencidos y costos de importación.
</p>

<p className="mt-2 font-normal">
🚚 Entrega estimada: 6 a 15 días hábiles.
</p>

</div>

<div className="mb-5 font-bold text-xl">

🛒 Carrito: {carrito.length} productos

</div>





<input

className="w-full bg-[#181818] border border-[#333] p-3 rounded-lg mb-6"

placeholder="Buscar productos..."

value={busqueda}

onChange={(e)=>setBusqueda(e.target.value)}

/>





<div className="flex flex-wrap gap-3 mb-8">


{categorias.map((cat)=>(

<button

key={cat}

onClick={()=>setCategoria(cat)}

className={

`px-5 py-2 rounded-full border ${
categoria===cat

?

"bg-[#f5b800] text-black font-bold"

:

"bg-[#181818] border-[#333]"

}`

}

>

{cat}

</button>

))}


</div>





<div className="grid md:grid-cols-3 gap-6">



{productosFiltrados.map((producto)=>(



<div

key={producto.id}

className="bg-[#181818] border border-[#333] rounded-xl p-5"

>




<img

src={producto.imagen}

alt={producto.nombre}

className="w-full h-80 object-contain rounded-lg bg-white"

/>





<p className="text-[#f5b800] mt-3">

{producto.categoria}

</p>



<h2 className="text-xl font-bold">

{producto.nombre}

</h2>



<p className="text-2xl font-bold mt-2">

S/ {producto.precio}

</p>





{producto.tallas && (

<div className="mt-4">

<p className="mb-2">

👕 Talla:

</p>


<div className="flex flex-wrap gap-2">


{producto.tallas.split(",").map((talla)=>(


<button

key={talla}

onClick={()=>seleccionar(producto.id,"talla",talla)}

className={

`px-3 py-1 rounded border ${
selecciones[producto.id]?.talla===talla

?

"bg-[#f5b800] text-black"

:

"bg-[#111]"

}`

}

>

{talla}

</button>


))}


</div>

</div>

)}





{producto.colores && (

<div className="mt-4">

<p className="mb-2">

🎨 Color:

</p>


<div className="flex flex-wrap gap-2">


{producto.colores.split(",").map((color)=>(


<button

key={color}

onClick={()=>seleccionar(producto.id,"color",color)}

className={

`px-3 py-1 rounded border ${
selecciones[producto.id]?.color===color

?

"bg-[#f5b800] text-black"

:

"bg-[#111]"

}`

}

>

{color}

</button>


))}


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

color:elegido.color || ""

});


}}


className="mt-5 w-full bg-[#f5b800] text-black py-3 rounded-lg font-bold"

>

🛒 Agregar al carrito

</button>



</div>



))}


</div>





{mensajeCarrito && (

<div className="fixed bottom-5 right-5 bg-[#181818] border border-[#f5b800] p-5 rounded-xl shadow-xl">


<p className="font-bold mb-3">

✅ Producto agregado al carrito

</p>



<Link

href="/carrito"

className="block text-center bg-[#f5b800] text-black px-5 py-2 rounded-lg font-bold"

>

🛒 Ver carrito

</Link>



</div>

)}



</main>

);

}