import Link from "next/link";

export default function Home() {

return (

<main className="min-h-screen">

{/* HERO */}

<section className="
relative
overflow-hidden
text-center
py-24
px-6
">

<div className="
absolute
inset-0
bg-gradient-to-b
from-[#1f1f1f]
to-[#111]
-z-10
"></div>


<div className="max-w-5xl mx-auto">


<p className="
text-[#f5b800]
font-bold
tracking-widest
mb-4
text-lg
">
ANNT LOGISTICS
</p>


<h1 className="
text-5xl
md:text-7xl
font-bold
leading-tight
mb-6
">

Compra fácil.

<br />

<span className="text-[#f5b800]">
Recibe rápido.
</span>

</h1>



<p className="
text-gray-400
text-xl
max-w-3xl
mx-auto
mb-10
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
">


<Link
href="/productos"
className="
btn-gold
shadow-[0_0_35px_rgba(245,184,0,0.35)]
"
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


</div>

</section>




{/* PRODUCTO DESTACADO */}


<section className="
px-6
py-16
">


<div className="
max-w-5xl
mx-auto
bg-[#181818]
border
border-[#333]
rounded-3xl
p-10
flex
flex-col
md:flex-row
items-center
justify-between
gap-8
hover:border-[#f5b800]
transition
">


<div>


<span className="
bg-[#f5b800]
text-black
px-4
py-1
rounded-full
font-bold
text-sm
">

NEW

</span>



<h2 className="
text-4xl
font-bold
mt-5
">

Premium Store

</h2>


<p className="
text-gray-400
mt-4
max-w-xl
">

Productos seleccionados con calidad,
precio competitivo y envío seguro.

</p>


<Link
href="/productos"
className="
inline-block
mt-6
btn-gold
"
>
Explorar colección
</Link>


</div>



<div className="
text-8xl
animate-pulse
">

🚀

</div>


</div>


</section>





{/* CATEGORIAS */}


<section className="
px-6
py-16
">


<h2 className="
text-4xl
font-bold
text-center
mb-10
">

Explora nuestras categorías

</h2>



<div className="
grid
md:grid-cols-4
gap-6
max-w-6xl
mx-auto
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
hover:-translate-y-3
hover:border-[#f5b800]
hover:shadow-[0_0_25px_rgba(245,184,0,0.20)]
transition-all
duration-300
cursor-pointer
">


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


))

}


</div>


</section>





{/* CONFIANZA */}


<section className="
text-center
px-6
py-20
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
<br/>
Trabajamos para llevar tus productos hasta donde estés.

</p>


</section>


</main>

);

}