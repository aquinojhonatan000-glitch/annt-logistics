"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";


export default function Carrito() {


const {
carrito,
eliminarCarrito,
cambiarCantidad
}=useCart();





const total = carrito.reduce(

(suma,producto)=>

suma + Number(producto.precio) * producto.cantidad,

0

);






return(


<main className="min-h-screen bg-[#111] text-white p-8">



<h1 className="text-4xl font-bold mb-8">

🛒 Mi Carrito ANNT LOGISTICS

</h1>





{carrito.length===0 ? (


<div className="bg-[#181818] border border-[#333] rounded-xl p-6">


<h2 className="text-2xl font-bold">

Tu carrito está vacío

</h2>



<p className="text-gray-400 mt-3">

Agrega productos desde el catálogo.

</p>


<Link

href="/productos"

className="inline-block mt-5 bg-[#f5b800] text-black px-6 py-3 rounded-lg font-bold"

>

🛍️ Ver productos

</Link>


</div>



):(



<div>




<div className="grid gap-5">



{carrito.map((producto)=>(



<div

key={producto.id}

className="bg-[#181818] border border-[#333] rounded-xl p-5 flex flex-col md:flex-row justify-between gap-5"

>






<div className="flex gap-5">


<img

src={producto.imagen}

alt={producto.nombre}

className="w-28 h-28 object-cover rounded-lg"

/>



<div>


<h2 className="text-xl font-bold">

{producto.nombre}

</h2>




<p className="text-[#f5b800] text-xl font-bold">

S/ {producto.precio}

</p>






{producto.talla && (

<p className="text-gray-300 mt-2">

👕 Talla: {producto.talla}

</p>

)}





{producto.color && (

<p className="text-gray-300">

🎨 Color: {producto.color}

</p>

)}





</div>



</div>







<div className="flex flex-col items-center">


<p className="font-bold mb-2">

Cantidad

</p>



<div className="flex items-center gap-3">


<button

onClick={()=>cambiarCantidad(

producto.id,

producto.cantidad-1

)}

className="border border-[#444] px-3 py-1 rounded"

>

-

</button>





<span className="font-bold">

{producto.cantidad}

</span>





<button

onClick={()=>cambiarCantidad(

producto.id,

producto.cantidad+1

)}

className="border border-[#444] px-3 py-1 rounded"

>

+

</button>



</div>






<button

onClick={()=>eliminarCarrito(producto.id)}

className="text-red-400 mt-4"

>

🗑️ Eliminar

</button>



</div>





</div>


))}



</div>








<div className="bg-[#181818] border border-[#333] rounded-xl p-6 mt-8">


<h2 className="text-3xl font-bold">

Total:

<span className="text-[#f5b800]">

{" "}S/ {total.toFixed(2)}

</span>


</h2>




<Link

href="/checkout"

className="mt-6 block text-center bg-[#f5b800] text-black font-bold py-4 rounded-xl hover:bg-yellow-400"

>

💳 Continuar compra

</Link>



</div>





</div>


)}




</main>


);


}