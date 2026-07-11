"use client";

import { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";


export default function Admin(){


const {
productos,
agregarProducto,
eliminarProducto
}=useProducts();



const productoInicial={

nombre:"",
descripcion:"",
categoria:"",
precio:"",
precio_original:"",
descuento:"",
descuento_hasta:"",
stock:"",
tallas:"",
colores:"",
imagen:"",

};



const [producto,setProducto]=useState(productoInicial);

const [subiendo,setSubiendo]=useState(false);

const [guardando,setGuardando]=useState(false);





const ofertaActiva=(fecha)=>{

if(!fecha)return false;

return new Date(fecha)>new Date();

};






const subirImagen=async(e)=>{


const archivo=e.target.files?.[0];


if(!archivo)return;


setSubiendo(true);



const nombreArchivo=

Date.now()+"-"+archivo.name.replace(/\s+/g,"-");




const {error}=await supabase.storage

.from("imagenes")

.upload(nombreArchivo,archivo);




if(error){

alert("Error subiendo imagen");

setSubiendo(false);

return;

}





const {data}=supabase.storage

.from("imagenes")

.getPublicUrl(nombreArchivo);




setProducto(prev=>({

...prev,

imagen:data.publicUrl

}));


setSubiendo(false);


};









const guardarProducto=async(e)=>{


e.preventDefault();



if(!producto.nombre){

alert("Escribe el nombre del producto");

return;

}


if(!producto.imagen){

alert("Sube una imagen");

return;

}


if(!producto.precio){

alert("Escribe el precio");

return;

}



setGuardando(true);




try{


await agregarProducto({

...producto,


precio:Number(producto.precio),



precio_original:

producto.precio_original

?

Number(producto.precio_original)

:

null,




descuento:

producto.descuento

?

Number(producto.descuento)

:

0,




stock:

producto.stock

?

Number(producto.stock)

:

0,




descuento_hasta:

producto.descuento_hasta

?

new Date(producto.descuento_hasta).toISOString()

:

null,


});





setProducto(productoInicial);



alert("✅ Producto guardado");



}catch(error){

console.log(error);

alert("Error guardando producto");


}finally{


setGuardando(false);


}



};







return(


<main className="
min-h-screen
bg-[#111]
text-white
p-8
">



<h1 className="
text-4xl
font-bold
mb-8
text-[#f5b800]
">

⚙️ ANNT LOGISTICS ADMIN

</h1>





<Link

href="/admin/pedidos"

className="
inline-flex
bg-[#f5b800]
text-black
font-bold
px-6
py-3
rounded-xl
mb-10
"

>

📦 Ver pedidos de clientes

</Link>






<div className="
card-dark
p-6
mb-10
">


<h2 className="
text-2xl
font-bold
mb-6
">

🛍️ Agregar producto

</h2>





<form onSubmit={guardarProducto}>




<input

className="admin-input"

placeholder="Nombre del producto"

value={producto.nombre}

onChange={(e)=>setProducto({

...producto,

nombre:e.target.value

})}

/>





<textarea

className="admin-input"

placeholder="Descripción"

value={producto.descripcion}

onChange={(e)=>setProducto({

...producto,

descripcion:e.target.value

})}

/>





<input

className="admin-input"

placeholder="Categoría"

value={producto.categoria}

onChange={(e)=>setProducto({

...producto,

categoria:e.target.value

})}

/>





<input

className="admin-input"

type="number"

placeholder="Precio oferta"

value={producto.precio}

onChange={(e)=>setProducto({

...producto,

precio:e.target.value

})}

/>





<input

className="admin-input"

type="number"

placeholder="Precio original"

value={producto.precio_original}

onChange={(e)=>setProducto({

...producto,

precio_original:e.target.value

})}

/>





<input

className="admin-input"

type="number"

placeholder="Descuento %"

value={producto.descuento}

onChange={(e)=>setProducto({

...producto,

descuento:e.target.value

})}

/>





<input

className="admin-input"

type="datetime-local"

value={producto.descuento_hasta}

onChange={(e)=>setProducto({

...producto,

descuento_hasta:e.target.value

})}

/>





<input

className="admin-input"

type="number"

placeholder="Stock"

value={producto.stock}

onChange={(e)=>setProducto({

...producto,

stock:e.target.value

})}

/>





<input

className="admin-input"

placeholder="Tallas (Ej: S,M,L)"

value={producto.tallas}

onChange={(e)=>setProducto({

...producto,

tallas:e.target.value

})}

/>





<input

className="admin-input"

placeholder="Colores (Ej: Negro,Azul)"

value={producto.colores}

onChange={(e)=>setProducto({

...producto,

colores:e.target.value

})}

/>





<input

type="file"

accept="image/*"

onChange={subirImagen}

/>





{
producto.imagen && (

<img

src={producto.imagen}

className="
w-40
h-40
object-contain
bg-white
rounded-xl
mt-5
"

/>

)

}





<button

disabled={subiendo || guardando}

className="
w-full
btn-gold
mt-6
"

>


{

guardando

?

"Guardando..."

:

"➕ Guardar producto"

}


</button>




</form>



</div>








<h2 className="
text-3xl
font-bold
mb-5
">

📦 Productos publicados

</h2>






{

productos.map((p)=>(



<div

key={p.id}

className="
card-dark
p-5
mb-5
"


>


<img

src={p.imagen}

className="
w-40
h-40
bg-white
object-contain
rounded-xl
"

/>



<h3 className="
text-xl
font-bold
mt-4
">

{p.nombre}

</h3>



<p className="text-[#f5b800] text-xl font-bold">

S/ {p.precio}

</p>



<p>

Stock: {p.stock}

</p>



<button

onClick={()=>eliminarProducto(p.id)}

className="
mt-4
bg-red-600
px-5
py-2
rounded-xl
font-bold
"

>

🗑️ Eliminar

</button>



</div>


))


}



</main>


);


}