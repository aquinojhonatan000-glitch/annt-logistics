"use client";

import { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { useOrders } from "@/context/OrderContext";
import { supabase } from "@/lib/supabase";


export default function Admin(){


const {
productos,
agregarProducto,
eliminarProducto
}=useProducts();


const {
pedidos,
cambiarEstado,
cambiarTiempoEntrega
}=useOrders();



const [producto,setProducto]=useState({

nombre:"",
categoria:"",
precio:"",
precio_original:"",
descuento:"",
imagen:""

});


const [subiendo,setSubiendo]=useState(false);



const subirImagen=async(e)=>{


const archivo=e.target.files[0];

if(!archivo)return;


setSubiendo(true);


const nombreArchivo=

Date.now()+"-"+archivo.name;



const {error}=await supabase.storage

.from("imagenes")

.upload(
nombreArchivo,
archivo
);



if(error){

alert("Error subiendo imagen");

console.log(error);

setSubiendo(false);

return;

}



const url=supabase.storage

.from("imagenes")

.getPublicUrl(nombreArchivo)

.data.publicUrl;



setProducto({

...producto,

imagen:url

});


setSubiendo(false);


};



const guardarProducto=(e)=>{


e.preventDefault();



if(!producto.imagen){

alert("Sube una imagen");

return;

}



agregarProducto({

...producto,

precio:Number(producto.precio),

precio_original:Number(producto.precio_original),

descuento:Number(producto.descuento)

});



setProducto({

nombre:"",
categoria:"",
precio:"",
precio_original:"",
descuento:"",
imagen:""

});


};



return(

<main className="min-h-screen bg-[#111] text-white p-8">


<h1 className="text-3xl font-bold mb-8">

⚙️ ANNT LOGISTICS ADMIN

</h1>



<div className="bg-[#181818] p-6 rounded-xl border border-[#333] mb-10">


<h2 className="text-xl font-bold mb-5">

🛍️ Agregar producto

</h2>



<form onSubmit={guardarProducto}>


<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Nombre"

value={producto.nombre}

onChange={(e)=>setProducto({

...producto,

nombre:e.target.value

})}

/>



<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Categoría"

value={producto.categoria}

onChange={(e)=>setProducto({

...producto,

categoria:e.target.value

})}

/>



<input

type="number"

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Precio actual"

value={producto.precio}

onChange={(e)=>setProducto({

...producto,

precio:e.target.value

})}

/>



<input

type="number"

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Precio anterior"

value={producto.precio_original}

onChange={(e)=>setProducto({

...producto,

precio_original:e.target.value

})}

/>



<input

type="number"

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Descuento %"

value={producto.descuento}

onChange={(e)=>setProducto({

...producto,

descuento:e.target.value

})}

/>



<input

type="file"

accept="image/*"

onChange={subirImagen}

className="mb-4"

/>



{subiendo && <p>⏳ Subiendo...</p>}



{producto.imagen &&

<img

src={producto.imagen}

className="w-40 rounded-lg mb-4"

/>

}



<button

className="w-full bg-[#f5b800] text-black font-bold py-3 rounded-lg"

>

➕ Guardar producto

</button>


</form>


</div>



<div className="bg-[#181818] p-6 rounded-xl mb-10">


<h2 className="text-xl font-bold mb-5">

📦 Productos

</h2>



{productos?.map((p)=>(


<div

key={p.id}

className="border border-[#333] p-4 rounded-xl mb-4"

>


<img

src={p.imagen}

className="w-32 h-32 object-cover rounded-lg"

/>


<h3 className="font-bold mt-3">

{p.nombre}

</h3>



<p>

S/ {p.precio}

</p>


{p.descuento > 0 && (

<p className="text-[#f5b800]">

🔥 {p.descuento}% descuento

</p>

)}



<button

onClick={()=>eliminarProducto(p.id)}

className="mt-3 bg-red-600 px-4 py-2 rounded-lg"

>

🗑️ Eliminar

</button>



</div>


))}



</div>





<h2 className="text-xl font-bold mb-5">

📦 Pedidos de clientes

</h2>



{pedidos.map((pedido)=>(

<div

key={pedido.id}

className="bg-[#181818] border border-[#333] rounded-xl p-6 mb-5"

>


<p>📦 {pedido.numero_pedido}</p>

<p>👤 {pedido.cliente?.nombre}</p>

<p>Total: S/ {pedido.total}</p>



<select

className="bg-[#111] p-3 rounded-lg mt-3"

value={pedido.estado}

onChange={(e)=>

cambiarEstado(

pedido.id,

e.target.value

)

}

>

<option>Esperando pago</option>

<option>Preparando pedido</option>

<option>En camino</option>

<option>Entregado</option>

</select>



</div>

))}



</main>

);

}