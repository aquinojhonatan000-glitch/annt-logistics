"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";


export default function Navbar(){


const {
  usuario,
  cerrarSesion
} = useUser();


const router = useRouter();





const salir = ()=>{


  cerrarSesion();


  router.push("/login");


};






return (

<nav className="bg-[#111111] text-white border-b border-[#222] px-8 py-5 flex items-center justify-between">



<Link
href="/"
className="text-2xl font-bold"
>

ANNT

<span className="text-[#f5b800]">

 LOGISTICS

</span>


</Link>







<div className="flex items-center gap-6">



<Link href="/">
Inicio
</Link>



<Link href="/productos">
Productos
</Link>



<Link href="/carrito">
🛒 Carrito
</Link>



<Link href="/contacto">
Contacto
</Link>






{
usuario ? (


<>



<Link

href="/perfil"

className="bg-[#181818] px-4 py-2 rounded-xl"

>

👤 {usuario.nombre}


</Link>





{
usuario.rol==="admin" && (


<Link

href="/admin"

className="text-[#f5b800] font-bold"

>

⚙️ Admin

</Link>


)

}






<button

onClick={salir}

className="bg-red-500 px-4 py-2 rounded-xl font-bold"

>

Cerrar sesión

</button>



</>



):(



<Link

href="/login"

className="bg-[#f5b800] text-black px-5 py-2 rounded-xl font-bold"

>

Iniciar sesión

</Link>



)

}




</div>



</nav>


);


}