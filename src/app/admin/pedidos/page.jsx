"use client";

import { useOrders } from "@/context/OrderContext";


export default function PedidosAdmin(){


const {
pedidos,
cambiarEstado,
cambiarTiempoEntrega
}=useOrders();




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
text-[#f5b800]
mb-8
">

📦 Pedidos ANNT LOGISTICS

</h1>




{

pedidos.length === 0 ? (


<div className="
card-dark
p-6
text-center
">

No hay pedidos todavía

</div>


):(



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



<h2 className="
text-xl
font-bold
text-[#f5b800]
mb-5
">

🛒 Pedido #{String(pedido.id).slice(0,8)}

</h2>





<div className="
bg-[#111]
rounded-xl
p-4
mb-6
">


<h3 className="
text-xl
font-bold
mb-4
">

👤 Datos del cliente

</h3>



<p>
Nombre:
{" "}
<b>
{pedido.cliente?.nombre || "Sin nombre"}
</b>
</p>



<p>
🪪 DNI:
{" "}
<b>
{pedido.cliente?.dni || "No registrado"}
</b>
</p>



<p>
📱 Teléfono:
{" "}
{pedido.cliente?.telefono || "-"}
</p>



<p>
📍 Dirección:
{" "}
{pedido.cliente?.direccion || "-"}
</p>



<p>
🏙️ Ciudad:
{" "}
{pedido.cliente?.ciudad || "-"}
</p>



</div>







<h3 className="
text-xl
font-bold
mb-4
">

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



<p className="text-[#f5b800] font-bold">

S/ {Number(producto.precio).toFixed(2)}

</p>



<p>

Cantidad: {producto.cantidad}

</p>



</div>




</div>


))


}





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







{

pedido.comprobante && (


<div className="mt-6">


<h3 className="
text-xl
font-bold
mb-3
">

🧾 Comprobante de pago

</h3>



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


<option>
Esperando pago
</option>


<option>
Pagado
</option>


<option>
Preparando pedido
</option>


<option>
Enviado
</option>


<option>
Entregado
</option>


</select>








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


<option>
Pendiente
</option>


<option>
1-3 días hábiles
</option>


<option>
4-7 días hábiles
</option>


<option>
6-15 días hábiles
</option>


<option>
Entregado
</option>


</select>





</div>


))


)

}



</main>


);


}