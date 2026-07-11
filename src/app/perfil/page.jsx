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

<main className="min-h-screen bg-[#111] text-white p-8 flex items-center justify-center">

<div className="bg-[#181818] p-8 rounded-xl text-center">

<h1 className="text-3xl font-bold mb-5">
👤 No has iniciado sesión
</h1>


<a

href="/login"

className="bg-[#f5b800] text-black px-6 py-3 rounded-xl font-bold"

>

Iniciar sesión

</a>


</div>

</main>

);

}





const guardar=()=>{

actualizarUsuario({

...usuario,

...datos

});


setEditar(false);

};





const misPedidos = pedidos.filter(

(pedido)=>

pedido.cliente?.correo?.toLowerCase() === usuario.correo?.toLowerCase()

);







return(


<main className="min-h-screen bg-[#111] text-white p-8">



<h1 className="text-4xl font-bold mb-8">

👤 Mi Perfil ANNT

</h1>




<section className="bg-[#181818] border border-[#333] rounded-xl p-6">



<div className="flex items-center gap-5 mb-6">


<div className="w-28 h-28 rounded-full bg-[#f5b800] text-black flex items-center justify-center text-5xl font-bold">

{usuario.nombre?.charAt(0) || "U"}

</div>



<h2 className="text-3xl font-bold">

{usuario.nombre}

</h2>


</div>





{
editar ?


(


<>


<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

value={datos.nombre}

onChange={(e)=>

setDatos({

...datos,

nombre:e.target.value

})

}

/>




<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

value={datos.telefono}

onChange={(e)=>

setDatos({

...datos,

telefono:e.target.value

})

}

/>




<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

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

className="bg-[#f5b800] text-black px-6 py-3 rounded-xl font-bold"

>

💾 Guardar cambios

</button>



</>


)


:


(


<>


<p>

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

className="mt-5 bg-[#f5b800] text-black px-6 py-3 rounded-xl font-bold"

>

✏️ Editar perfil

</button>



</>


)

}



</section>







<section className="mt-10">


<h2 className="text-3xl font-bold mb-5">

📦 Mis pedidos

</h2>




{

misPedidos.length===0 ?


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

className="bg-[#181818] border border-[#333] rounded-xl p-6 mb-6"

>



<h3 className="text-xl font-bold">

📦 Pedido #{pedido.numero_pedido || pedido.id}

</h3>




<p className="mt-3">

📅 Fecha:

{" "}

{new Date(pedido.fecha).toLocaleDateString()}

</p>





<p className="text-[#f5b800] font-bold mt-3">

🚚 Estado:

{" "}

{pedido.estado}

</p>





<p className="text-[#f5b800] font-bold mt-2">

⏳ Entrega:

{" "}

{pedido.tiempo_entrega || "6-15 días hábiles"}

</p>







<h3 className="text-xl font-bold mt-5">

🛒 Productos

</h3>





{

pedido.productos?.map((producto,index)=>(



<div

key={index}

className="flex gap-4 bg-[#111] border border-[#333] rounded-xl p-4 mt-4"

>




<img

src={producto.imagen}

alt={producto.nombre}

className="w-24 h-24 object-cover rounded-lg"

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





<p className="text-2xl font-bold mt-5">

💰 Total:

{" "}

S/ {Number(pedido.total).toFixed(2)}

</p>






<div className="mt-5 bg-[#111] p-4 rounded-xl">


{

pedido.estado==="Esperando pago" &&

"💳 Estamos verificando tu pago"

}



{

pedido.estado==="Preparando pedido" &&

"📦 Tu pedido está siendo preparado"

}



{

pedido.estado==="En camino" &&

"🚚 Tu pedido está en camino"

}



{

pedido.estado==="Entregado" &&

"✅ Pedido entregado correctamente"

}



</div>




</div>



))


)

}



</section>





</main>


);

}