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





return (


<main className="
min-h-screen
px-6
py-10
">



<h1 className="
text-4xl
md:text-5xl
font-bold
mb-10
text-center
">

🛒 Mi Carrito

<span className="text-[#f5b800]">
 ANNT LOGISTICS
</span>


</h1>






{

carrito.length===0 ? (



<div className="
card-dark
p-10
text-center
max-w-xl
mx-auto
">


<h2 className="
text-2xl
font-bold
mb-4
">

Tu carrito está vacío 🛒

</h2>



<p className="
text-gray-400
mb-6
">

Agrega productos desde nuestro catálogo
y empieza tu compra.

</p>




<Link

href="/productos"

className="
btn-gold
inline-block
"

>

🛍️ Ver productos


</Link>


</div>



):(



<div className="
grid
lg:grid-cols-3
gap-8
">






<div className="
lg:col-span-2
space-y-5
">



{


carrito.map((producto)=>(



<div

key={producto.id}

className="
card-dark
p-5
flex
flex-col
md:flex-row
gap-5
hover:border-[#f5b800]
transition
"

>



<img

src={producto.imagen}

alt={producto.nombre}

className="
w-full
md:w-32
h-32
object-contain
bg-white
rounded-xl
"

/>





<div className="
flex-1
">



<h2 className="
text-xl
font-bold
">

{producto.nombre}

</h2>




<p className="
text-[#f5b800]
text-2xl
font-bold
mt-2
">

S/ {Number(producto.precio).toFixed(2)}

</p>





{

producto.talla && (

<p className="text-gray-300 mt-2">

👕 Talla: {producto.talla}

</p>

)

}




{

producto.color && (

<p className="text-gray-300">

🎨 Color: {producto.color}

</p>

)

}





<div className="
flex
items-center
gap-4
mt-5
">


<span>
Cantidad:
</span>



<button

onClick={()=>cambiarCantidad(
producto.id,
producto.cantidad-1
)}

className="
w-9
h-9
rounded-lg
border
border-[#444]
hover:border-[#f5b800]
"

>

-

</button>



<span className="
font-bold
text-xl
">

{producto.cantidad}

</span>




<button

onClick={()=>cambiarCantidad(
producto.id,
producto.cantidad+1
)}

className="
w-9
h-9
rounded-lg
border
border-[#444]
hover:border-[#f5b800]
"

>

+

</button>



</div>






<button

onClick={()=>eliminarCarrito(producto.id)}

className="
mt-5
text-red-400
hover:text-red-300
font-bold
"

>

🗑️ Eliminar producto


</button>




</div>



</div>



))

}





</div>










<div className="
card-dark
p-6
h-fit
sticky
top-5
">


<h2 className="
text-2xl
font-bold
mb-5
">

Resumen del pedido

</h2>




<div className="
flex
justify-between
text-gray-300
mb-3
">

<span>
Productos:
</span>


<span>
{carrito.length}
</span>


</div>





<div className="
border-t
border-[#333]
pt-5
flex
justify-between
items-center
">

<span className="
text-xl
font-bold
">

Total

</span>


<span className="
text-3xl
font-bold
text-[#f5b800]
">

S/ {total.toFixed(2)}

</span>


</div>






<Link

href="/checkout"

className="
block
text-center
mt-6
btn-gold
"

>

💳 Continuar compra


</Link>






<Link

href="/productos"

className="
block
text-center
mt-4
border
border-[#f5b800]
text-[#f5b800]
py-3
rounded-xl
font-bold
hover:bg-[#f5b800]
hover:text-black
transition
"

>

← Seguir comprando


</Link>



</div>






</div>



)

}





</main>


);


}