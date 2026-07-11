"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


const OrderContext = createContext();



export function OrderProvider({ children }) {


const [pedidos, setPedidos] = useState([]);




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



console.log(
"PEDIDOS CARGADOS:",
data
);



setPedidos(data || []);



};





useEffect(()=>{

cargarPedidos();

},[]);







// Crear pedido

const agregarPedido = async(pedido)=>{



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





total:Number(pedido.total || 0),





estado:
pedido.estado || "Esperando pago",






pago:
pedido.pago || "Yape",





comprobante:
pedido.comprobante || "",





fecha:
pedido.fecha || new Date().toISOString(),





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

alert(
"❌ ANNT LOGISTICS: Error guardando pedido"
);

return false;

}



setPedidos((prev)=>[
data?.[0],
...prev
]);

return true;

};









// Cambiar estado pedido


const cambiarEstado=async(id,estado)=>{



const {error}=await supabase

.from("pedidos")

.update({

estado

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

estado

}

:

pedido

)

);





};









// Cambiar tiempo entrega


const cambiarTiempoEntrega=async(id,tiempo)=>{



const {error}=await supabase

.from("pedidos")

.update({

tiempo_entrega:tiempo

})

.eq("id",id);






if(error){


console.log(
"ERROR TIEMPO ENTREGA:",
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


cargarPedidos


}}


>


{children}



</OrderContext.Provider>



);



}







export function useOrders(){


return useContext(OrderContext);


}