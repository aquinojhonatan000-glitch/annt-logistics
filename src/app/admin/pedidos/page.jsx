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
p-10
text-center
text-xl
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
text-2xl
font-bold
mb-5
">

🛒 Pedido #{pedido.id.slice(0,8)}

</h2>



<div className="
mb-6
bg-[#111]
p-4
rounded-xl
border
border-[#333]
">


<h3 className="
font-bold
text-[#f5b800]
mb-3
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
📱 Teléfono:
{" "}
{pedido.cliente?.telefono}
</p>


<p>
📍 Dirección:
{" "}
{pedido.cliente?.direccion}
</p>


<p>
🏙️ Ciudad:
{" "}
{pedido.cliente?.ciudad}
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


<p className="
font-bold
text-lg
">

{producto.nombre}

</p>



<p>
Cantidad:
{producto.cantidad}
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



<p className="
text-[#f5b800]
font-bold
">

S/ {Number(producto.precio).toFixed(2)}

</p>


</div>


</div>


))


}





<div className="
mt-6
text-3xl
font-bold
">


💰 Total:

<span className="
text-[#f5b800]
">

S/ {Number(pedido.total).toFixed(2)}

</span>


</div>






{

pedido.comprobante && (


<div className="
mt-6
">


<h3 className="
font-bold
text-xl
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
Pago confirmado
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

value={
pedido.tiempo_entrega || "Pendiente"
}

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
1-3 días
</option>

<option>
3-7 días
</option>

<option>
6-15 días hábiles
</option>


</select>





</div>



))


)


}



</main>


);


}