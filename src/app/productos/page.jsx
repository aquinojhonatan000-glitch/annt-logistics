"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";

export default function Productos() {

const { carrito, agregarCarrito } = useCart();

const { productos } = useProducts();


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



const productosFiltrados=productos.filter((producto)=>{


const nombre=

producto.nombre
?.toLowerCase()
.includes(busqueda.toLowerCase());


const cat=

categoria==="Todos" ||
producto.categoria===categoria;


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


<p className="mb-5">
🛒 Carrito: {carrito.length} productos
</p>



<input

className="w-full bg-[#181818] border border-[#333] p-3 rounded-lg mb-6"

placeholder="Buscar productos..."

value={busqueda}

onChange={(e)=>setBusqueda(e.target.value)}

/>





<div className="flex gap-3 flex-wrap mb-8">


{categorias.map((cat)=>(

<button

key={cat}

onClick={()=>setCategoria(cat)}

className={`px-5 py-2 rounded-full border ${
categoria===cat
?
"bg-[#f5b800] text-black"
:
"bg-[#181818]"
}`}

>

{cat}

</button>

))}


</div>





<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">


{productosFiltrados.map((producto)=>(


<div

key={producto.id}

className="bg-[#181818] border border-[#333] rounded-xl p-5"

>



<img

src={producto.imagen}

className="w-full h-48 object-cover rounded-lg"

/>



<p className="text-gray-400 mt-3">
{producto.categoria}
</p>



<h2 className="text-xl font-bold">
{producto.nombre}
</h2>



<p className="text-gray-300 text-sm">
{producto.descripcion}
</p>




<p className="text-[#f5b800] text-2xl font-bold mt-3">

S/ {producto.precio}

</p>





{producto.tallas && (

<div className="mt-4">

<p>
👕 Selecciona talla:
</p>


<div className="flex gap-2 flex-wrap mt-2">


{producto.tallas.split(",").map((talla)=>(

<button

key={talla}

onClick={()=>seleccionar(
producto.id,
"talla",
talla
)}

className={`px-3 py-1 border rounded ${
selecciones[producto.id]?.talla===talla
?
"bg-[#f5b800] text-black"
:
"bg-[#111]"
}`}

>

{talla}

</button>


))}


</div>


</div>

)}





{producto.colores && (

<div className="mt-4">


<p>
🎨 Selecciona color:
</p>


<div className="flex gap-2 flex-wrap mt-2">


{producto.colores.split(",").map((color)=>(


<button

key={color}

onClick={()=>seleccionar(
producto.id,
"color",
color
)}

className={`px-3 py-1 border rounded ${
selecciones[producto.id]?.color===color
?
"bg-[#f5b800] text-black"
:
"bg-[#111]"
}`}

>

{color}

</button>


))}


</div>


</div>

)}






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



agregarCarrito(

producto,

elegido.talla || "",

elegido.color || ""

);


}}

className="mt-5 w-full bg-[#f5b800] text-black py-3 rounded-lg font-bold"

>

🛒 Agregar al carrito

</button>




</div>


))}


</div>


</main>


);


}