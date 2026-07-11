"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const OrderContext = createContext(null);



export function OrderProvider({ children }) {


const [pedidos,setPedidos] = useState([]);




// Estados disponibles

const estadosPedido = [

"Pendiente de pago",

"Pago confirmado",

"Orden aceptada",

"Orden rechazada",

"Preparando pedido",

"Salió del aeropuerto",

"Pasando aduanas",

"Aduanas correctamente",

"En tránsito",

"En agencia",

"En ruta de entrega",

"Entregado"

];





// Cargar pedidos

const cargarPedidos = async()=>{


const {data,error}=await supabase

.from("pedidos")

.select("*")

.order("fecha",{ascending:false});



if(error){

console.log(
"ERROR CARGANDO PEDIDOS:",
error
);

return;

}



setPedidos(data || []);



};





useEffect(()=>{

cargarPedidos();

},[]);






// Crear pedido

const agregarPedido = async(pedido)=>{


const fechaActual = new Date().toISOString();



const primerEstado = {

estado:"Pendiente de pago",

fecha:new Date().toLocaleDateString("es-PE"),

hora:new Date().toLocaleTimeString("es-PE"),

descripcion:
"Pedido creado, esperando confirmación de pago"

};





const pedidoGuardar={


numero_pedido:pedido.id,


cliente:{

nombre:pedido.cliente?.nombre || "",

dni:pedido.cliente?.dni || "",

telefono:pedido.cliente?.telefono || "",

direccion:pedido.cliente?.direccion || "",

ciudad:pedido.cliente?.ciudad || "",

correo:pedido.cliente?.correo || ""

},



productos:JSON.parse(

JSON.stringify(
pedido.productos || []
)

),



total:Number(
pedido.total || 0
),



estado:"Pendiente de pago",



historial_estado:[

primerEstado

],



pago:

pedido.pago || "Yape",



comprobante:

pedido.comprobante || "",



fecha:

fechaActual,



tiempo_entrega:

pedido.tiempo_entrega || "6-15 días hábiles"



};






const {data,error}=await supabase

.from("pedidos")

.insert([pedidoGuardar])

.select();




if(error){

console.log(
"ERROR GUARDANDO PEDIDO:",
error
);

return false;

}





setPedidos((prev)=>[

data?.[0],

...prev

]);



return true;


};









// Cambiar estado

const cambiarEstado = async(id, estado)=>{


const pedidoActual = pedidos.find(

(p)=>p.id===id

);



if(!pedidoActual)return;




const nuevoEstado={


estado:estado,


fecha:new Date().toLocaleDateString("es-PE"),


hora:new Date().toLocaleTimeString("es-PE"),


descripcion:

`Pedido actualizado a: ${estado}`


};





const historialNuevo=[

...(pedidoActual.historial_estado || []),

nuevoEstado

];






const {error}=await supabase

.from("pedidos")

.update({

estado:estado,

historial_estado:historialNuevo

})

.eq("id",id);






if(error){

console.log(

"ERROR CAMBIANDO ESTADO:",

error

);

return;

}





setPedidos((prev)=>

prev.map((pedido)=>

pedido.id===id

?

{

...pedido,

estado:estado,

historial_estado:historialNuevo

}

:

pedido

)

);



};









// Cambiar tiempo de entrega

const cambiarTiempoEntrega = async(id, tiempo)=>{


const {error}=await supabase

.from("pedidos")

.update({

tiempo_entrega:tiempo

})

.eq("id",id);




if(error){

console.log(
"ERROR CAMBIANDO TIEMPO:",
error
);

return;

}





setPedidos((prev)=>

prev.map((pedido)=>

pedido.id===id

?

{

...pedido,

tiempo_entrega:tiempo

}

:

pedido

)

);



};








return(

<OrderContext.Provider

value={{

pedidos,

agregarPedido,

cambiarEstado,

cambiarTiempoEntrega,

cargarPedidos,

estadosPedido

}}

>

{children}

</OrderContext.Provider>

);



}






export function useOrders(){

return useContext(OrderContext);

}