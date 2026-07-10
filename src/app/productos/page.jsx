"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { useRouter } from "next/navigation";


export default function Productos() {


const { carrito, agregarCarrito } = useCart();

const { productos } = useProducts();

const router = useRouter();



const [busqueda, setBusqueda] = useState("");

const [categoria, setCategoria] = useState("Todos");





const categorias = [

"Todos",

...new Set(productos.map((producto)=>producto.categoria))

];






const productosFiltrados = productos.filter((producto)=>{


const coincideNombre =

producto.nombre

.toLowerCase()

.includes(busqueda.toLowerCase());




const coincideCategoria =

categoria === "Todos" ||

producto.categoria === categoria;




return coincideNombre && coincideCategoria;



});







const comprarAhora = (producto)=>{


agregarCarrito(producto);


router.push("/carrito");


};







return (



<main className="min-h-screen bg-[#111111] text-white p-8">





<h1 className="text-5xl font-bold mb-6">

Catálogo

<span className="text-[#f5b800]">

{" "}ANNT LOGISTICS

</span>


</h1>






<p className="text-gray-400 mb-8">

🛒 Productos en carrito:

<span className="text-[#f5b800] font-bold">

{" "}{carrito.length}

</span>

</p>






<input


type="text"


placeholder="Buscar productos..."


className="w-full bg-[#181818] border border-[#333] p-4 rounded-xl mb-6"


value={busqueda}


onChange={(e)=>setBusqueda(e.target.value)}


/>







<div className="flex gap-3 mb-10 flex-wrap">



{categorias.map((cat)=>(


<button


key={cat}


onClick={()=>setCategoria(cat)}


className={

categoria===cat

?

"px-5 py-2 rounded-full bg-[#f5b800] text-black"

:

"px-5 py-2 rounded-full border border-[#444]"

}


>


{cat}


</button>



))}


</div>








<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">






{productosFiltrados.map((producto)=>(



<div


key={producto.id}


className="bg-[#181818] border border-[#333] rounded-2xl p-5"


>





<img


src={producto.imagen}


alt={producto.nombre}


className="w-full h-48 object-cover rounded-xl"


/>






<p className="text-[#f5b800] mt-4">


{producto.categoria}


</p>





<h2 className="text-xl font-bold mt-2">


{producto.nombre}


</h2>





<p className="text-2xl font-bold mt-3">


S/ {producto.precio}


</p>







<button


onClick={()=>agregarCarrito(producto)}


className="mt-5 w-full bg-[#333] py-3 rounded-xl"


>


🛒 Agregar al carrito


</button>







<button


onClick={()=>comprarAhora(producto)}


className="mt-3 w-full bg-[#f5b800] text-black font-bold py-3 rounded-xl"


>


⚡ Comprar ahora


</button>







</div>



))}



</div>





</main>



);


}