"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import Link from "next/link";
import CountdownProduct from "@/components/CountdownProduct";


export default function Productos() {


const { carrito, agregarCarrito, mensajeCarrito } = useCart();
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



const ofertaActiva=(fecha)=>{

if(!fecha) return false;

return new Date(fecha) > new Date();

};





const productosFiltrados=productos.filter((producto)=>{


const nombre=producto.nombre
?.toLowerCase()
.includes(busqueda.toLowerCase());


const cat=
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


<main className="min-h-screen bg-[#111111] text-white p-8">



<h1 className="text-4xl font-bold mb-6">
🛍️ Catálogo ANNT LOGISTICS
</h1>



<div className="bg-yellow-500 text-black rounded-xl p-5 mb-6 font-bold">


📢 Aviso importante ANNT LOGISTICS


<p className="mt-3 font-normal">
Algunos precios pueden variar según disponibilidad del producto,
proveedor y costos de importación.
</p>


<p className="mt-3 font-normal">
🚚 Entrega estimada: 6 a 15 días hábiles.
</p>


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

className={`px-5 py-2 rounded-full border ${
categoria===cat
?"bg-[#f5b800] text-black font-bold"
:"bg-[#181818] border-[#333]"
}`}

>

{cat}

</button>


))}


</div>






<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">





{productosFiltrados.map((producto)=>(



<div

key={producto.id}

className="bg-[#181818] border border-[#333] rounded-2xl p-5 hover:border-[#f5b800] transition"

>



<img

src={producto.imagen}

alt={producto.nombre}

className="w-full h-80 object-contain rounded-xl bg-white"

/>




<p className="text-[#f5b800] mt-3 text-sm font-bold">

{producto.categoria}

</p>




<h2 className="text-xl font-bold mt-2">

{producto.nombre}

</h2>





{producto.descripcion && (

<p className="text-gray-400 text-sm mt-3 leading-relaxed line-clamp-3">

{producto.descripcion}

</p>

)}







<div className="mt-4">



{ofertaActiva(producto.descuento_hasta) &&

Number(producto.descuento)>0 && (


<div className="flex gap-3 items-center">


<span className="text-gray-400 line-through">

S/ {Number(producto.precio_original).toFixed(2)}

</span>



<span className="bg-red-600 px-2 py-1 rounded text-sm font-bold">

-{producto.descuento}% OFF

</span>



</div>


)}





<p className="text-2xl font-bold text-[#f5b800]">


S/ {ofertaActiva(producto.descuento_hasta)

? Number(producto.precio).toFixed(2)

: Number(producto.precio_original || producto.precio).toFixed(2)

}


</p>





{ofertaActiva(producto.descuento_hasta) && (

<CountdownProduct fecha={producto.descuento_hasta}/>

)}



</div>







{producto.tallas && (


<div className="mt-4">


<p>
👕 Talla:
</p>


<div className="flex flex-wrap gap-2 mt-2">


{producto.tallas.split(",").map((talla)=>{


const tallaLimpia=talla.trim();


return (

<button

key={tallaLimpia}

onClick={()=>seleccionar(producto.id,"talla",tallaLimpia)}

className={`px-3 py-1 rounded border ${
selecciones[producto.id]?.talla===tallaLimpia
?"bg-[#f5b800] text-black"
:"bg-[#111]"
}`}

>

{tallaLimpia}

</button>

);


})}


</div>


</div>


)}






{producto.colores && (


<div className="mt-4">


<p>
🎨 Color:
</p>


<div className="flex flex-wrap gap-2 mt-2">


{producto.colores.split(",").map((color)=>{


const colorLimpio=color.trim();


return (


<button

key={colorLimpio}

onClick={()=>seleccionar(producto.id,"color",colorLimpio)}

className={`px-3 py-1 rounded border ${
selecciones[producto.id]?.color===colorLimpio
?"bg-[#f5b800] text-black"
:"bg-[#111]"
}`}

>

{colorLimpio}

</button>


);


})}


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



agregarCarrito({

...producto,

talla:elegido.talla || "",

color:elegido.color || "",

});


}}



className="mt-5 w-full bg-[#f5b800] text-black py-3 rounded-xl font-bold hover:bg-yellow-400 transition"


>


🛒 Agregar al carrito


</button>




</div>


))}



</div>






{mensajeCarrito && (


<div className="fixed bottom-5 right-5 bg-[#181818] border border-[#f5b800] p-5 rounded-xl shadow-xl">


<p className="font-bold mb-3">

✅ Producto agregado

</p>



<Link

href="/carrito"

className="bg-[#f5b800] text-black px-5 py-2 rounded-lg font-bold block"

>

🛒 Ver carrito

</Link>


</div>


)}



</main>


);


}