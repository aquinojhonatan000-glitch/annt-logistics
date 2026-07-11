"use client";

import Link from "next/link";
import { useProducts } from "@/context/ProductContext";


export default function Home() {


const { productos } = useProducts();


const destacados = productos?.slice(0,4) || [];



const categorias=[

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
},

{
nombre:"Gaming",
icono:"🎮"
},

{
nombre:"Belleza",
icono:"💄"
},

];



return (


<main className="min-h-screen px-6 py-10">



{/* HERO */}

<section className="
text-center
py-16
hero-glow
rounded-3xl
">


<h1 className="
text-5xl
md:text-6xl
font-black
text-[#f5b800]
mb-6
">

ANNT LOGISTICS

</h1>



<h2 className="
text-4xl
font-bold
mb-4
">

Compra fácil.

<br/>

Recibe rápido.

</h2>



<p className="
max-w-2xl
mx-auto
text-gray-300
text-lg
">

Descubre productos de tecnología, moda y hogar
con una experiencia de compra moderna,
segura y rápida.

</p>



<div className="
flex
justify-center
gap-5
mt-8
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


<section className="mt-16">


<h2 className="
text-3xl
font-bold
text-[#f5b800]
mb-8
">

🔥 Productos destacados

</h2>



<div className="
grid
md:grid-cols-4
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
duration-300
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
text-xl
mt-4
">

{producto.nombre}

</h3>



<p className="
text-[#f5b800]
font-bold
text-2xl
mt-2
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







{/* CATEGORIAS ANIMADAS */}


<section className="
mt-20
overflow-hidden
">


<h2 className="
text-3xl
font-bold
text-center
text-[#f5b800]
mb-10
">

Explora nuestras categorías

</h2>




<div className="
flex
gap-6
w-max
animate-scroll
hover:[animation-play-state:paused]
">


{[...categorias,...categorias].map((cat,index)=>(


<div

key={index}

className="
card-dark
w-52
p-8
text-center
hover:border-[#f5b800]
hover:-translate-y-3
transition
duration-300
cursor-pointer
"

>


<div className="
text-5xl
mb-4
">

{cat.icono}

</div>



<h3 className="
text-xl
font-bold
">

{cat.nombre}

</h3>



</div>


))}



</div>


</section>








{/* CONFIANZA */}


<section className="
mt-20
text-center
py-10
">


<h2 className="
text-3xl
font-bold
mb-5
">

La nueva forma de comprar online

</h2>



<p className="
text-gray-300
max-w-2xl
mx-auto
">

Seguridad, rapidez y logística inteligente.
Trabajamos para llevar tus productos hasta donde estés.

</p>



</section>



</main>


);

}