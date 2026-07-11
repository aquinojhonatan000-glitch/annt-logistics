"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useOrders } from "@/context/OrderContext";

export default function Perfil(){

const {
usuario,
actualizarUsuario
}=useUser();

const {
pedidos
}=useOrders();



const [editar,setEditar]=useState(false);



const [datos,setDatos]=useState({

nombre: usuario?.nombre || "",

telefono: usuario?.telefono || "",

direccion: usuario?.direccion || ""

});



if(!usuario){

return(
<div className="p-10 text-center">

<h2 className="text-2xl font-bold">
👤 No has iniciado sesión
</h2>

<a
href="/login"
className="
inline-block
mt-5
bg-[#f5b800]
text-black
px-6
py-3
rounded-xl
font-bold
"
>
Iniciar sesión
</a>

</div>
);

}



const guardar=()=>{

actualizarUsuario({

...usuario,

...datos

});

setEditar(false);

};



// Buscar pedidos del cliente

const misPedidos = pedidos.filter((pedido)=>{

const correoPedido =
pedido.cliente?.correo?.toLowerCase();

const correoUsuario =
usuario.correo?.toLowerCase();



const telefonoPedido =
pedido.cliente?.telefono;

const telefonoUsuario =
usuario.telefono;



const nombrePedido =
pedido.cliente?.nombre?.toLowerCase();

const nombreUsuario =
usuario.nombre?.toLowerCase();



return (

correoPedido === correoUsuario

||

telefonoPedido === telefonoUsuario

||

nombrePedido === nombreUsuario

);

});



return(

<main className="px-6 py-10">


<h1 className="text-4xl font-bold mb-10">
👤 Mi Perfil ANNT
</h1>



<div className="
bg-[#181818]
border
border-[#333]
rounded-2xl
p-6
mb-10
">


<div className="
w-20
h-20
rounded-full
bg-[#f5b800]
text-black
flex
items-center
justify-center
text-4xl
font-bold
">

{usuario.nombre?.charAt(0) || "U"}

</div>



<h2 className="text-2xl font-bold mt-4">
{usuario.nombre}
</h2>



{
editar ?

(

<>

<input
className="
w-full
bg-[#111]
border
border-[#333]
p-3
rounded-lg
mb-4
mt-5
"
value={datos.nombre}
onChange={(e)=>

setDatos({

...datos,

nombre:e.target.value

})

}
/>



<input
className="
w-full
bg-[#111]
border
border-[#333]
p-3
rounded-lg
mb-4
"
value={datos.telefono}
onChange={(e)=>

setDatos({

...datos,

telefono:e.target.value

})

}
/>



<input
className="
w-full
bg-[#111]
border
border-[#333]
p-3
rounded-lg
mb-4
"
value={datos.direccion}
onChange={(e)=>

setDatos({

...datos,

direccion:e.target.value

})

}
/>



<button

onClick={guardar}

className="
bg-[#f5b800]
text-black
px-6
py-3
rounded-xl
font-bold
"

>

💾 Guardar cambios

</button>


</>

)


:

(

<>

<p className="mt-5">
📧 {usuario.correo}
</p>


<p>
📞 {usuario.telefono || "Sin teléfono"}
</p>


<p>
📍 {usuario.direccion || "Sin dirección"}
</p>



<button

onClick={()=>setEditar(true)}

className="
mt-5
bg-[#f5b800]
text-black
px-6
py-3
rounded-xl
font-bold
"

>

✏️ Editar perfil

</button>


</>

)

}


</div>




<h2 className="text-3xl font-bold mb-6">
📦 Mis pedidos
</h2>




{

misPedidos.length === 0 ?


(

<p className="text-gray-400">
No tienes pedidos todavía.
</p>

)


:


(

misPedidos.map((pedido)=>(

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


<h3 className="text-xl font-bold">
📦 Pedido #{pedido.numero_pedido || pedido.id}
</h3>



<p className="mt-3">
📅 Fecha:
{" "}
{new Date(pedido.fecha).toLocaleDateString()}
</p>



<p className="mt-2 text-[#f5b800] font-bold">
🚚 Estado actual:
{" "}
{pedido.estado}
</p>



<p>
⏳ Entrega:
{" "}
{pedido.tiempo_entrega || "6-15 días hábiles"}
</p>





{/* SEGUIMIENTO */}

{

pedido.historial_estado &&

<div className="
mt-6
bg-[#111]
border
border-[#333]
rounded-xl
p-5
">


<h3 className="text-xl font-bold mb-5">
📍 Seguimiento del pedido
</h3>



{

pedido.historial_estado.map((historia,index)=>(

<div

key={index}

className="
border-l-2
border-[#f5b800]
pl-4
mb-5
"

>


<p className="
font-bold
text-[#f5b800]
">

{historia.estado}

</p>


<p>
📅 {historia.fecha}
</p>


<p>
🕒 {historia.hora}
</p>


<p className="text-gray-400 text-sm">
{historia.descripcion}
</p>


</div>

))

}



</div>

}






<h3 className="text-xl font-bold mt-8 mb-4">
🛒 Productos
</h3>



{

pedido.productos?.map((producto,index)=>(


<div

key={index}

className="
flex
gap-4
items-center
bg-[#111]
border
border-[#333]
rounded-xl
p-4
mb-4
"

>


<img

src={producto.imagen}

alt={producto.nombre}

className="
w-24
h-24
object-cover
rounded-lg
"

/>


<div>

<p className="font-bold">
{producto.nombre}
</p>


<p>
Cantidad: {producto.cantidad}
</p>



{

producto.talla &&

<p>
👕 Talla: {producto.talla}
</p>

}



{

producto.color &&

<p>
🎨 Color: {producto.color}
</p>

}



</div>


</div>


))

}




<p className="text-2xl font-bold text-[#f5b800] mt-5">

💰 Total:

{" "}

S/ {Number(pedido.total).toFixed(2)}

</p>



</div>


))

)

}



</main>

);

}