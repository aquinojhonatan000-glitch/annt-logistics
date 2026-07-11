"use client";

import { useOrders } from "@/context/OrderContext";

export default function PedidosAdmin(){

const {
pedidos,
cambiarEstado,
cambiarTiempoEntrega
}=useOrders();



return(

<main className="min-h-screen bg-[#111] text-white p-8">


<h1 className="text-4xl font-bold mb-8">
📦 Pedidos de clientes
</h1>



{pedidos.length === 0 ? (

<div className="bg-[#181818] border border-[#333] p-6 rounded-xl">
No hay pedidos todavía.
</div>


):(



pedidos.map((pedido)=>(



<div

key={pedido.id}

className="bg-[#181818] border border-[#333] rounded-xl p-6 mb-6"

>



<h2 className="text-2xl font-bold text-[#f5b800]">
📦 Pedido #{pedido.numero_pedido || pedido.id}
</h2>




<div className="mt-5">

<h3 className="font-bold text-xl">
👤 Cliente
</h3>


<p>
Nombre: {pedido.cliente?.nombre}
</p>


<p>
📞 Teléfono: {pedido.cliente?.telefono}
</p>


<p>
📍 Dirección: {pedido.cliente?.direccion}
</p>


<p>
🏙️ Ciudad: {pedido.cliente?.ciudad}
</p>


</div>







<div className="mt-6">


<h3 className="font-bold text-xl mb-4">
🛒 Productos
</h3>



{pedido.productos?.map((producto,index)=>(


<div

key={index}

className="flex gap-5 items-center border-b border-[#333] py-4"

>



<img

src={producto.imagen}

alt={producto.nombre}

className="w-24 h-24 object-cover rounded-lg border border-[#333]"

/>




<div>


<p className="font-bold text-lg">

{producto.nombre}

</p>



<p>
Cantidad: {producto.cantidad}
</p>




{producto.talla && (

<p>
👕 Talla: {producto.talla}
</p>

)}




{producto.color && (

<p>
🎨 Color: {producto.color}
</p>

)}




<p className="text-[#f5b800] font-bold mt-2">

S/ {producto.precio}

</p>



</div>



</div>



))}



</div>






<div className="mt-6 text-2xl font-bold">

💰 Total:

<span className="text-[#f5b800]">

{" "}S/ {pedido.total}

</span>


</div>






<div className="mt-5">

<p>
💳 Método de pago: {pedido.pago}
</p>


</div>








{pedido.comprobante && (


<div className="mt-6">


<h3 className="font-bold">

🧾 Comprobante

</h3>


<img

src={pedido.comprobante}

className="w-64 rounded-xl mt-3 border border-[#333]"

/>


</div>


)}







<div className="mt-6">


<label className="font-bold">
🚚 Estado del pedido
</label>


<select

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mt-2"

value={pedido.estado}

onChange={(e)=>

cambiarEstado(

pedido.id,

e.target.value

)

}

>


<option>
Esperando pago
</option>


<option>
Preparando pedido
</option>


<option>
En camino
</option>


<option>
Entregado
</option>


</select>


</div>







<div className="mt-6">


<label className="font-bold">
⏳ Tiempo de entrega
</label>



<select

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mt-2"

value={pedido.tiempo_entrega || "Pendiente"}

onChange={(e)=>

cambiarTiempoEntrega(

pedido.id,

e.target.value

)

}

>


<option>
Pendiente
</option>


<option>
6-15 días hábiles
</option>


<option>
15-20 días hábiles
</option>


<option>
Más de 20 días hábiles
</option>


</select>



</div>





</div>



))

)}



</main>


);

}