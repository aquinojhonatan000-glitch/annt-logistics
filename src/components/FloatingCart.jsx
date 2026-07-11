"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";


export default function FloatingCart(){


const { carrito } = useCart();

const pathname = usePathname();



if(
!carrito ||
carrito.length===0 ||
pathname === "/carrito" ||
pathname === "/checkout"
){

return null;

}




const total = carrito.reduce(

(sum,item)=>

sum + Number(item.precio) * item.cantidad,

0

);




return (


<div

className="
fixed
bottom-6
right-6
z-50
w-80
bg-[#181818]
border
border-[#f5b800]
rounded-3xl
p-5
shadow-[0_0_35px_rgba(245,184,0,0.25)]
fade-up
"

>




<div className="flex items-center justify-between mb-3">



<h3 className="text-xl font-bold text-white">

🛒 Carrito

</h3>



<span

className="
bg-[#f5b800]
text-black
px-3
py-1
rounded-full
font-bold
text-sm
"

>

{carrito.length}

</span>



</div>





<p className="text-gray-300 mb-4">

Productos seleccionados

</p>





<div

className="
text-2xl
font-bold
text-[#f5b800]
mb-5
"

>


S/ {total.toFixed(2)}


</div>





<Link

href="/carrito"

className="
block
text-center
btn-gold
"

>


Ver carrito 🛒


</Link>




</div>


);


}