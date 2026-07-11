"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import CountdownProduct from "@/components/CountdownProduct";


export default function Productos(){

const { carrito, agregarCarrito } = useCart();

const { productos } = useProducts();

const pathname = usePathname();


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
"Otros"

];



const ofertaActiva=(fecha)=>{

if(!fecha) return false;

return new Date(fecha)>new Date();

};



const seleccionar=(id,campo,valor)=>{

setSelecciones((prev)=>({

...prev,

[id]:{

...prev[id],

[campo]:valor

}

}));

};




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



return(

<main className="px-6 py-10">



{/* ANUNCIO LIQUID GLASS */}

<div
className="
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-8
mb-10
shadow-xl
"
>


<h1 className="
text-4xl
font-bold
">

🛍️ Catálogo

<span className="text-[#f5b800]">
 ANNT LOGISTICS
</span>

</h1>


<p className="mt-4 text-gray-300">

Todos nuestros productos están sujetos a disponibilidad,
proveedores y costos de importación.

</p>


<p className="mt-2">

🚚 Entrega estimada: 6 a 15 días hábiles

</p>



<a

href="https://wa.me/51907025944"

target="_blank"

className="
inline-block
mt-5
bg-green-500/90
backdrop-blur-lg
border
border-white/20
text-white
font-bold
px-6
py-3
rounded-xl
hover:bg-green-600
transition
"

>

💬 WhatsApp: 907025944

</a>


</div>






<input

className="
w-full
bg-[#181818]
border
border-[#333]
p-4
rounded-2xl
mb-6
"

placeholder="🔎 Buscar productos..."

value={busqueda}

onChange={(e)=>setBusqueda(e.target.value)}

/>







<div className="flex flex-wrap gap-3 mb-8">


{

categorias.map((cat)=>(


<button

key={cat}

onClick={()=>setCategoria(cat)}

className={`
px-5
py-2
rounded-full
border

${
categoria===cat

?

"bg-[#f5b800] text-black font-bold"

:

"bg-[#181818] border-[#333]"

}

`}

>


{cat}


</button>


))

}


</div>







<div className="
grid
md:grid-cols-2
lg:grid-cols-3
gap-6
">


{

productosFiltrados.map((producto)=>(


<div

key={producto.id}

className="
card-dark
p-5
relative
hover:-translate-y-2
transition
"


>



{

ofertaActiva(producto.descuento_hasta)&&(

<span className="
absolute
top-4
left-4
bg-red-500
px-3
py-1
rounded-full
font-bold
">

🔥 OFERTA

</span>

)

}





<img

src={producto.imagen}

alt={producto.nombre}

className="
w-full
h-80
object-contain
bg-white
rounded-2xl
"

/>





<p className="text-sm text-gray-400 mt-3">

{producto.categoria}

</p>




<h2 className="text-xl font-bold">

{producto.nombre}

</h2>




<p className="text-gray-300">

{producto.descripcion}

</p>







{

ofertaActiva(producto.descuento_hasta)

?

(

<div className="mt-3">


<p className="
line-through
text-gray-400
">

S/ {Number(producto.precio_original).toFixed(2)}

</p>


<p className="
text-3xl
font-bold
text-[#f5b800]
">

S/ {Number(producto.precio).toFixed(2)}

</p>


</div>

)


:

(

<p className="
text-3xl
font-bold
text-[#f5b800]
mt-3
">

S/ {Number(producto.precio).toFixed(2)}

</p>

)


}







{

ofertaActiva(producto.descuento_hasta)&&(

<CountdownProduct

fecha={producto.descuento_hasta}

/>

)

}





<button


onClick={()=>{


const elegido =
selecciones[producto.id] || {};



agregarCarrito({

...producto,

talla:elegido.talla || "",

color:elegido.color || "",

cantidad:1

});


}}


className="
mt-6
w-full
btn-gold
"


>


🛒 Agregar al carrito


</button>



</div>


))


}


</div>







{

carrito.length>0 &&
pathname!=="/carrito" &&

(

<div className="
fixed
bottom-5
right-5
bg-[#f5b800]
text-black
font-bold
px-6
py-4
rounded-2xl
shadow-xl
">


🛒 {carrito.length} producto(s)


<a

href="/carrito"

className="
block
underline
mt-2
"

>

Ver carrito

</a>


</div>

)

}




</main>


);


}