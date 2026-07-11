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
ciudad:"",
pago:"Yape"

});



const [comprobante,setComprobante]=useState("");

const [subiendo,setSubiendo]=useState(false);

const [enviando,setEnviando]=useState(false);



const total = carrito.reduce(

(sum,p)=>sum + Number(p.precio)*p.cantidad,

0

);




const subirComprobante = async(e)=>{


const archivo=e.target.files[0];

if(!archivo)return;


setSubiendo(true);



const nombreArchivo =
"comprobantes/"+Date.now()+"-"+archivo.name;



const {error}=await supabase.storage

.from("imagenes")

.upload(nombreArchivo,archivo);



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



if(

!datos.nombre ||

!datos.telefono ||

!datos.direccion ||

!datos.ciudad

){

alert("Completa todos tus datos de entrega");

return;

}



setEnviando(true);



const pedido={


id:crypto.randomUUID(),


cliente:{


nombre:datos.nombre,

telefono:datos.telefono,

direccion:datos.direccion,

ciudad:datos.ciudad


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

📦 Datos de entrega

</h2>



<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Nombre completo"

value={datos.nombre}

onChange={(e)=>setDatos({...datos,nombre:e.target.value})}

/>




<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Teléfono"

value={datos.telefono}

onChange={(e)=>setDatos({...datos,telefono:e.target.value})}

/>




<textarea

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Dirección completa"

value={datos.direccion}

onChange={(e)=>setDatos({...datos,direccion:e.target.value})}

/>



<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Ciudad"

value={datos.ciudad}

onChange={(e)=>setDatos({...datos,ciudad:e.target.value})}

/>




<h2 className="text-xl font-bold">

Método de pago

</h2>




<select

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mt-3"

value={datos.pago}

onChange={(e)=>setDatos({...datos,pago:e.target.value})}

>


<option>Yape</option>

<option>Plin</option>

<option>Prexpe</option>

<option>Transferencia BCP</option>

<option>Transferencia BBVA</option>


</select>




</div>








<div className="bg-[#181818] border border-[#333] rounded-xl p-6">


<h2 className="text-2xl font-bold mb-5">

🛒 Resumen del pedido

</h2>




{carrito.map((p)=>(


<div

key={p.id}

className="border-b border-[#333] pb-3 mb-3"

>


<p className="font-bold">

{p.nombre}

</p>


<p>

Cantidad: {p.cantidad}

</p>


{p.talla && (

<p>
👕 Talla: {p.talla}
</p>

)}



{p.color && (

<p>
🎨 Color: {p.color}
</p>

)}



</div>


))}






<p className="text-3xl font-bold mt-5">

Total:

<span className="text-[#f5b800]">

{" "}S/ {total.toFixed(2)}

</span>

</p>







<div className="mt-6 bg-[#111] border border-[#333] rounded-xl p-5">


<h3 className="text-xl font-bold text-[#f5b800]">

💳 Datos de pago

</h3>



<div className="mt-4 space-y-4">


<div>

📱 Yape / Plin / Prexpe

<p className="font-bold">

907025944

</p>

</div>



<div>

🏦 BCP Soles

<p>

Cuenta:
<br/>

37507956352075

</p>

<p>

CCI:

<br/>

00237510795635207541

</p>

</div>




<div>

🏦 BBVA Soles

<p>

Cuenta:

<br/>

0011-0814-0278664916

</p>


<p>

CCI:

<br/>

01181400027866491616

</p>

</div>




<div>

👤 Titular:

<p className="text-[#f5b800] font-bold">

Jhonatan Antoni Aquiño López

</p>

</div>



</div>


</div>






<p className="mt-6">

📷 Subir comprobante de pago

</p>




<input

type="file"

accept="image/*"

onChange={subirComprobante}

className="mt-3"

/>



{subiendo && (

<p>

⏳ Subiendo comprobante...

</p>

)}




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