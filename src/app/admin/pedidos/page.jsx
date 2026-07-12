"use client";

import { useOrders } from "@/context/OrderContext";

export default function PedidosAdmin(){

const {
pedidos,
cambiarEstado,
cambiarTiempoEntrega,
estadosPedido
}=useOrders();


const tiempos=[

"Pendiente",
"1-3 días",
"4-7 días",
"8-15 días",
"15-30 días"

];


return (

<main className="min-h-screen px-6 py-10">


<h1 className="
text-4xl
font-bold
mb-8
">

📦 Pedidos ANNT LOGISTICS

</h1>



{
pedidos.length === 0 ? (

<p className="text-gray-400 text-xl">
No hay pedidos todavía.
</p>

)

:

(

pedidos.map((pedido)=>(

<div

key={pedido.id}

className="
bg-[#181818]
border
border-[#333]
rounded-2xl
p-6
mb-8
"


>


{/* DATOS CLIENTE */}

<div className="
bg-[#111]
border
border-[#333]
rounded-xl
p-4
mb-6
">


<h2 className="
text-xl
font-bold
text-[#f5b800]
mb-3
">

👤 Datos del cliente

</h2>


<p>
Nombre:
{" "}
<b>{pedido.cliente?.nombre}</b>
</p>


<p>
🪪 DNI:
{" "}
<b>{pedido.cliente?.dni}</b>
</p>


<p>
📱 Teléfono:
{" "}
<b>{pedido.cliente?.telefono}</b>
</p>


<p>
📍 Dirección:
{" "}
<b>{pedido.cliente?.direccion}</b>
</p>


<p>
🏙️ Ciudad:
{" "}
<b>{pedido.cliente?.ciudad}</b>
</p>


</div>





{/* PRODUCTOS */}

<h2 className="
text-xl
font-bold
mb-4
">

🛒 Productos

</h2>



{
pedido.productos?.map((producto,index)=>(


<div

key={index}

className="
flex
gap-5
items-center
border-b
border-[#333]
py-4
"


>


<img

src={producto.imagen}

alt={producto.nombre}

className="
w-24
h-24
object-contain
bg-white
rounded-xl
"

/>



<div>


<p className="font-bold">

{producto.nombre}

</p>


<p>

Cantidad:
{" "}
{producto.cantidad}

</p>



{
producto.talla && (

<p>
👕 Talla:
{" "}
{producto.talla}
</p>

)

}



{
producto.color && (

<p>
🎨 Color:
{" "}
{producto.color}
</p>

)

}



</div>



</div>


))

}







{/* TOTAL */}

<p className="
text-3xl
font-bold
mt-6
">

💰 Total:

<span className="text-[#f5b800]">

{" "}
S/ {Number(pedido.total).toFixed(2)}

</span>


</p>







{/* COMPROBANTE */}

{
pedido.comprobante && (

<div className="mt-5">

<p className="font-bold mb-2">

📄 Comprobante

</p>


<img

src={pedido.comprobante}

className="
w-64
rounded-xl
border
border-[#333]
"

 />

</div>

)

}







{/* ESTADO */}

<select

className="
w-full
bg-[#111]
border
border-[#333]
p-3
rounded-xl
mt-6
"

value={pedido.estado}

onChange={(e)=>

cambiarEstado(
pedido.id,
e.target.value
)

}


>


{
estadosPedido.map((estado)=>(


<option

key={estado}

value={estado}

>

{estado}

</option>


))

}


</select>







{/* TIEMPO ENTREGA */}

<select

className="
w-full
bg-[#111]
border
border-[#333]
p-3
rounded-xl
mt-3
"

value={pedido.tiempo_entrega || "Pendiente"}

onChange={(e)=>

cambiarTiempoEntrega(
pedido.id,
e.target.value
)

}

>


{
tiempos.map((tiempo)=>(


<option

key={tiempo}

value={tiempo}

>

{tiempo}

</option>


))

}


</select>







{/* WHATSAPP */}

<a


href={`https://wa.me/51${pedido.cliente?.telefono}?text=${encodeURIComponent(

`
🚚 ANNT LOGISTICS

Hola ${pedido.cliente?.nombre || "cliente"} 👋

Tu pedido #${pedido.numero_pedido || pedido.id}
fue actualizado.

📦 Estado:
${pedido.estado}

📅 Fecha:
${new Date().toLocaleDateString("es-PE")}

🕒 Hora:
${new Date().toLocaleTimeString("es-PE")}

Gracias por comprar con ANNT LOGISTICS.
`

)}`}


target="_blank"

rel="noopener noreferrer"


className="
inline-block
mt-6
bg-green-500
text-white
font-bold
px-6
py-3
rounded-xl
hover:bg-green-600
transition
"


>


📲 Avisar por WhatsApp


</a>







{/* HISTORIAL */}

{
pedido.historial_estado?.map((historial,index)=>(


<div

key={index}

className="
mt-4
border-l-2
border-[#f5b800]
pl-4
"

>

✅ {historial.estado}

</div>


))

}



</div>


))

)

}


</main>


);

}