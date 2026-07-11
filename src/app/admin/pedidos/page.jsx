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

<main className="px-6 py-10">

<h1 className="text-4xl font-bold mb-10">
📦 Pedidos ANNT LOGISTICS
</h1>



{
pedidos.length === 0 ? (

<p>
No hay pedidos todavía
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


<h2 className="text-xl font-bold">
🛒 Pedido #{pedido.numero_pedido || String(pedido.id).slice(0,8)}
</h2>



<h3 className="font-bold mt-5">
👤 Datos del cliente
</h3>


<p>
Nombre: {pedido.cliente?.nombre}
</p>

<p>
📱 {pedido.cliente?.telefono}
</p>

<p>
📍 {pedido.cliente?.direccion}
</p>





<h3 className="font-bold mt-6">
📦 Productos
</h3>



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


{
producto.talla && (

<p>
👕 Talla: {producto.talla}
</p>

)

}



{
producto.color && (

<p>
🎨 Color: {producto.color}
</p>

)

}



<p>
Cantidad: {producto.cantidad}
</p>


<p>
S/ {Number(producto.precio).toFixed(2)}
</p>


</div>


</div>


))

}





<p className="
text-xl
font-bold
text-[#f5b800]
mt-5
">

💰 Total:

{" "}

S/ {Number(pedido.total).toFixed(2)}

</p>





{
pedido.comprobante && (

<div className="mt-5">

<h3 className="font-bold">
🧾 Comprobante de pago
</h3>


<img

src={pedido.comprobante}

className="
w-64
rounded-xl
border
border-[#333]
mt-3
"

/>


</div>

)

}






<h3 className="font-bold mt-6">
🚚 Estado del pedido
</h3>



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






<h3 className="font-bold mt-6">
⏳ Tiempo estimado
</h3>



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







<a

href={`https://wa.me/51${pedido.cliente?.telefono}?text=${encodeURIComponent(

`
🚚 ANNT LOGISTICS

Hola ${pedido.cliente?.nombre || "cliente"} 👋

Tu pedido #${pedido.numero_pedido || pedido.id} fue actualizado.

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






<h3 className="font-bold mt-8">
📍 Historial
</h3>




{
pedido.historial_estado?.map((historial,index)=>(


<div

key={index}

className="
mt-3
border-l-2
border-[#f5b800]
pl-4
"

>

<p className="text-[#f5b800] font-bold">

✅ {historial.estado}

</p>


<p>
📅 {historial.fecha}
</p>


<p>
🕒 {historial.hora}
</p>


<p className="text-gray-400">
{historial.descripcion}
</p>


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