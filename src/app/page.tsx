"use client";

import Link from "next/link";
import { useProducts } from "@/context/ProductContext";


export default function Home() {


const { productos } = useProducts();


const destacados = productos?.slice(0,4) || [];



return (

<main className="min-h-screen px-6 md:px-12 py-12">



{/* HERO */}

<section className="
text-center
max-w-5xl
mx-auto
py-16
">


<p className="
text-[#f5b800]
font-bold
text-xl
mb-5
">

ANNT LOGISTICS

</p>



<h1 className="
text-5xl
md:text-7xl
font-bold
leading-tight
">

Compra fácil.

<br />

<span className="text-[#f5b800]">

Recibe rápido.

</span>


</h1>




<p className="
text-gray-400
text-lg
md:text-xl
max-w-3xl
mx-auto
mt-8
">

Descubre productos de tecnología, moda y hogar
con una experiencia de compra moderna,
segura y rápida.


</p>




<div className="
flex
justify-center
gap-5
flex-wrap
mt-10
">


<Link
href="/productos"
className="btn-gold"
>

🛒 Ver productos

</Link>




<Link
href="/productos"
className="
border
border-[#f5b800]
text-[#f5b800]
font-bold
px-8
py-4
rounded-xl
hover:bg-[#f5b800]
hover:text-black
transition
"
>

Comprar ahora

</Link>


</div>


</section>







{/* PRODUCTOS DESTACADOS */}


<section className="mb-20">


<h2 className="
text-3xl
md:text-4xl
font-bold
mb-10
">

🔥 Productos destacados

</h2>



<div className="
grid
sm:grid-cols-2
lg:grid-cols-4
gap-6
">


{

destacados.map((producto)=>(


<div

key={producto.id}

className="
card-dark
p-5
hover:-translate-y-2
transition
"

>


<img

src={producto.imagen}

alt={producto.nombre}

className="
w-full
h-52
object-contain
bg-white
rounded-2xl
"

/>



<h3 className="
font-bold
text-lg
mt-5
">

{producto.nombre}

</h3>




<p className="
text-[#f5b800]
font-bold
text-2xl
mt-3
">

S/ {Number(producto.precio).toFixed(2)}

</p>




<Link

href="/productos"

className="
block
text-center
mt-5
btn-gold
"

>

Ver producto

</Link>



</div>


))


}


</div>


</section>









{/* CATEGORIAS */}



<section className="mb-20">


<h2 className="
text-3xl
md:text-4xl
font-bold
mb-10
text-center
">

Explora nuestras categorías

</h2>




<div className="
grid
md:grid-cols-4
gap-6
">


{

[

{
nombre:"Tecnología",
icono:"💻"
},

{
nombre:"Moda",
icono:"👕"
},

{
nombre:"Hogar",
icono:"🏠"
},

{
nombre:"Accesorios",
icono:"✨"
}


].map((cat)=>(


<div

key={cat.nombre}

className="
card-dark
p-8
text-center
hover:-translate-y-2
transition
cursor-pointer
"

>


<div className="text-5xl mb-4">

{cat.icono}

</div>



<h3 className="text-xl font-bold">

{cat.nombre}

</h3>


</div>


))

}


</div>


</section>








{/* CONFIANZA */}



<section className="
text-center
max-w-3xl
mx-auto
pb-10
">


<h2 className="
text-4xl
font-bold
mb-5
">

La nueva forma de comprar online

</h2>



<p className="
text-gray-400
text-lg
">

Seguridad, rapidez y logística inteligente.
Trabajamos para llevar tus productos hasta donde estés.


</p>



</section>



</main>


);

}