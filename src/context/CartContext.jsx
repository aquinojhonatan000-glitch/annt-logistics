"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();


export function CartProvider({ children }) {


const [carrito,setCarrito] = useState([]);

const [mensajeCarrito,setMensajeCarrito] = useState("");



// cargar carrito

useEffect(()=>{


const guardado = localStorage.getItem("carrito");


if(guardado){

setCarrito(JSON.parse(guardado));

}


},[]);





// guardar carrito

useEffect(()=>{


localStorage.setItem(

"carrito",

JSON.stringify(carrito)

);


},[carrito]);








// agregar producto

const agregarCarrito = (producto)=>{


setCarrito((actual)=>{


const existe = actual.find(

(item)=>item.id === producto.id

);



if(existe){


return actual.map((item)=>


item.id === producto.id

?

{

...item,

cantidad:item.cantidad + 1

}

:

item


);


}



return [

...actual,

{

...producto,

cantidad:1

}

];


});




// mensaje flotante

setMensajeCarrito(

`✅ ${producto.nombre} agregado al carrito`

);



// quitar mensaje después de 3 segundos

setTimeout(()=>{


setMensajeCarrito("");


},3000);



};








// eliminar producto

const eliminarCarrito = (id)=>{


setCarrito((actual)=>


actual.filter(

(producto)=>producto.id !== id

)


);


};








// cambiar cantidad

const cambiarCantidad = (id,cantidad)=>{


setCarrito((actual)=>


actual.map((producto)=>


producto.id === id

?

{

...producto,

cantidad:cantidad < 1 ? 1 : cantidad

}

:

producto


)


);


};








// vaciar carrito

const limpiarCarrito = ()=>{


setCarrito([]);


};








return(


<CartContext.Provider


value={{

carrito,

agregarCarrito,

eliminarCarrito,

cambiarCantidad,

limpiarCarrito,

mensajeCarrito

}}



>


{children}


</CartContext.Provider>


);


}







export function useCart(){


return useContext(CartContext);


}