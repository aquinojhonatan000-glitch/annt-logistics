"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const OrderContext = createContext();


export function OrderProvider({ children }) {


const [pedidos, setPedidos] = useState([]);



// cargar pedidos desde Supabase

const cargarPedidos = async()=>{


const {data,error}=await supabase

.from("pedidos")

.select("*")

.order("created_at",{ascending:false});



if(error){

console.log("ERROR CARGANDO PEDIDOS:",error);

return;

}



setPedidos(data || []);


};




useEffect(()=>{


cargarPedidos();


},[]);





// crear pedido

const agregarPedido = async(pedido)=>{


const {data,error}=await supabase

.from("pedidos")

.insert([{


numero_pedido:pedido.id,


cliente:{

...pedido.cliente,

correo:pedido.cliente.correo

},


productos:pedido.productos,


total:pedido.total,


estado:"Esperando pago",


pago:pedido.pago,


comprobante:pedido.comprobante || "",


fecha:pedido.fecha,


tiempo_entrega:"6-15 días hábiles"


}])

.select();





if(error){


console.log("ERROR GUARDANDO PEDIDO:",error);


alert("Error guardando pedido");


return;


}




setPedidos((prev)=>[

data[0],

...prev

]);



};








// cambiar estado

const cambiarEstado=async(id,estado)=>{


const {error}=await supabase

.from("pedidos")

.update({

estado

})

.eq("id",id);



if(error){

console.log(error);

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









// cambiar tiempo

const cambiarTiempoEntrega=async(id,tiempo)=>{


const {error}=await supabase

.from("pedidos")

.update({

tiempo_entrega:tiempo

})

.eq("id",id);



if(error){

console.log(error);

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