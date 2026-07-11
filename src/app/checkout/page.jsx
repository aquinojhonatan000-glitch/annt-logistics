"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { useOrders } from "@/context/OrderContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function Checkout(){


const { carrito, limpiarCarrito } = useCart();

const { usuario } = useUser();

const { agregarPedido } = useOrders();

const router = useRouter();



const [datos,setDatos]=useState({

nombre: usuario?.nombre || "",

telefono: usuario?.telefono || "",

direccion: usuario?.direccion || "",

pago:"Yape"

});



const [comprobante,setComprobante]=useState("");

const [subiendo,setSubiendo]=useState(false);

const [enviando,setEnviando]=useState(false);





const total = carrito.reduce(

(sum,p)=>sum + Number(p.precio)*p.cantidad,

0

);






const subirComprobante=async(e)=>{


const archivo=e.target.files[0];


if(!archivo)return;



setSubiendo(true);



const nombreArchivo=

"comprobantes/"+Date.now()+"-"+archivo.name;





const {error}=await supabase.storage

.from("imagenes")

.upload(

nombreArchivo,

archivo

);





if(error){

console.log(error);

alert("Error subiendo comprobante");

setSubiendo(false);

return;

}






const url=supabase.storage

.from("imagenes")

.getPublicUrl(nombreArchivo)

.data.publicUrl;





setComprobante(url);



setSubiendo(false);



};







const confirmarCompra=async(e)=>{


e.preventDefault();



if(!comprobante){

alert("Sube tu comprobante de pago");

return;

}



setEnviando(true);





const pedido={


id:crypto.randomUUID(),


cliente:{

nombre:datos.nombre,

telefono:datos.telefono,

direccion:datos.direccion

},


productos:carrito,


total,


estado:"Esperando pago",


pago:datos.pago,


comprobante,


fecha:new Date().toISOString(),


tiempo_entrega:"Pendiente"


};





await agregarPedido(pedido);





limpiarCarrito();



alert("✅ Pedido enviado correctamente");



router.push("/");


};








return(


<main className="min-h-screen bg-[#111] text-white p-8">



<h1 className="text-4xl font-bold mb-8">

💳 Checkout ANNT LOGISTICS

</h1>






<div className="grid md:grid-cols-2 gap-8">






<div className="bg-[#181818] border border-[#333] rounded-xl p-6">


<h2 className="text-2xl font-bold mb-5">

Datos de entrega

</h2>




<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Nombre"

value={datos.nombre}

onChange={(e)=>setDatos({

...datos,

nombre:e.target.value

})}

/>





<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Teléfono"

value={datos.telefono}

onChange={(e)=>setDatos({

...datos,

telefono:e.target.value

})}

/>






<textarea

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Dirección"

value={datos.direccion}

onChange={(e)=>setDatos({

...datos,

direccion:e.target.value

})}

/>






<h2 className="text-xl font-bold">

Método de pago

</h2>





<select

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mt-3"

value={datos.pago}

onChange={(e)=>setDatos({

...datos,

pago:e.target.value

})}

>

<option>Yape</option>

<option>Plin</option>

<option>Transferencia</option>

</select>





</div>









<div className="bg-[#181818] border border-[#333] rounded-xl p-6">



<h2 className="text-2xl font-bold mb-5">

Resumen del pedido

</h2>





{carrito.map((p)=>(


<div key={p.id} className="mb-4">


<p className="font-bold">

{p.nombre}

</p>


<p>

Cantidad: {p.cantidad}

</p>


{p.talla && <p>👕 {p.talla}</p>}


{p.color && <p>🎨 {p.color}</p>}


</div>


))}






<p className="text-3xl font-bold mt-5">

Total:

<span className="text-[#f5b800]">

{" "}S/ {total.toFixed(2)}

</span>

</p>






<img

src="/qr.png"

className="w-48 mt-5 rounded-lg"

/>





<p className="mt-5">

📷 Subir comprobante

</p>




<input

type="file"

accept="image/*"

onChange={subirComprobante}

className="mt-3"

/>




{subiendo && <p>⏳ Subiendo...</p>}







<button

onClick={confirmarCompra}

disabled={enviando}

className="mt-6 w-full bg-[#f5b800] text-black font-bold py-4 rounded-xl"

>


{enviando ? "Enviando..." : "✅ Confirmar compra"}


</button>




</div>







</div>





</main>


);


}