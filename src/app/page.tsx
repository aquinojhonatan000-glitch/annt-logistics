import Link from "next/link";

export default function Home() {

return (

<main className="min-h-screen bg-[#111111] text-white">


{/* HERO */}

<section className="px-8 py-24 text-center">


<div className="max-w-5xl mx-auto">


<p className="text-[#f5b800] font-bold tracking-widest mb-5">
ANNT LOGISTICS
</p>



<h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">

Compra fácil.

<br />

<span className="text-[#f5b800]">
Recibe rápido.
</span>

</h1>



<p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">

Descubre productos de tecnología, moda y hogar
con una experiencia de compra moderna,
segura y rápida.

</p>




<div className="flex justify-center gap-5 flex-wrap">


<Link
href="/productos"
className="bg-[#f5b800] text-black font-bold px-8 py-4 rounded-2xl hover:bg-yellow-400 transition shadow-lg"
>

🛒 Ver productos

</Link>



<Link
href="/productos"
className="border border-[#f5b800] text-[#f5b800] font-bold px-8 py-4 rounded-2xl hover:bg-[#f5b800] hover:text-black transition"
>

Comprar ahora

</Link>


</div>


</div>


</section>





{/* CATEGORIAS */}

<section className="px-8 py-16">


<h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">

Explora nuestras categorías

</h2>



<div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">


{[
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
bg-[#181818]
border border-[#2b2b2b]
rounded-3xl
p-8
text-center
hover:border-[#f5b800]
hover:-translate-y-2
transition-all
duration-300
cursor-pointer
"


>


<div className="text-4xl mb-4">

{cat.icono}

</div>



<h3 className="text-xl font-bold">

{cat.nombre}

</h3>



</div>


))}


</div>


</section>






{/* CONFIANZA */}


<section className="px-8 py-20 text-center">


<div className="max-w-4xl mx-auto bg-[#181818] border border-[#2b2b2b] rounded-3xl p-10">


<h2 className="text-4xl font-bold mb-5">

La nueva forma de comprar online

</h2>



<p className="text-gray-400 text-lg">

Seguridad, rapidez y logística inteligente.
Trabajamos para llevar tus productos hasta donde estés.

</p>



<div className="grid md:grid-cols-3 gap-6 mt-10">


<div>
<p className="text-3xl">🚚</p>
<p className="font-bold mt-2">
Envíos seguros
</p>
</div>


<div>
<p className="text-3xl">🔒</p>
<p className="font-bold mt-2">
Compra protegida
</p>
</div>


<div>
<p className="text-3xl">⚡</p>
<p className="font-bold mt-2">
Proceso rápido
</p>
</div>


</div>


</div>


</section>




</main>

);

}