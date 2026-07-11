"use client";

import { useEffect } from "react";


export default function WelcomeToast({nombre,onClose}){


useEffect(()=>{

const timer=setTimeout(()=>{

onClose();

},3000);


return ()=>clearTimeout(timer);


},[onClose]);



return (

<div

className="
fixed
top-6
right-6
z-50
bg-[#181818]
border
border-[#f5b800]
text-white
rounded-2xl
px-6
py-5
shadow-[0_0_40px_rgba(245,184,0,.35)]
fade-up
"

>


<h2 className="
text-xl
font-bold
text-[#f5b800]
">

✨ Bienvenido a ANNT LOGISTICS

</h2>



<p className="mt-2 text-gray-300">

Hola {nombre}, nos alegra verte nuevamente.

</p>



<p className="mt-2 text-sm">

🚚 Compra fácil · Entrega segura · Productos seleccionados

</p>



</div>

);


}