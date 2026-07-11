"use client";

import Link from "next/link";
import Image from "next/image";
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

<nav className="
sticky top-0 z-50
w-full
bg-[#111111]/85
backdrop-blur-xl
border-b border-[#333]
shadow-[0_5px_25px_rgba(0,0,0,0.4)]
">


<div className="
flex
items-center
justify-between
px-6
py-4
max-w-7xl
mx-auto
">


{/* LOGO */}

<Link 
href="/"
className="
flex
items-center
hover:scale-105
transition
duration-300
"
>

<Image

src="/logo.png"

alt="ANNT LOGISTICS"

width={140}

height={70}

className="
w-32
md:w-40
h-auto
object-contain
"

priority

/>

</Link>




{/* MENÚ */}

<div className="
flex
items-center
gap-5
md:gap-8
text-gray-300
font-semibold
">


<Link 
href="/"
className="
hover:text-[#f5b800]
transition
duration-300
"
>
Inicio
</Link>



<Link 
href="/productos"
className="
hover:text-[#f5b800]
transition
duration-300
"
>
Productos
</Link>



<Link 
href="/carrito"
className="
hover:text-[#f5b800]
transition
duration-300
"
>
Carrito
</Link>



<Link 
href="/contacto"
className="
hover:text-[#f5b800]
transition
duration-300
"
>
Contacto
</Link>





{
usuario ? (

<>


<Link

href="/perfil"

className="
bg-[#181818]
border
border-[#333]
hover:border-[#f5b800]
text-white
px-4
py-2
rounded-xl
transition
duration-300
"

>

👤 {usuario.nombre}

</Link>





{

usuario.rol === "admin" && (

<Link

href="/admin"

className="
text-[#f5b800]
font-bold
hover:scale-105
transition
"

>

⚙️ Admin

</Link>

)

}





<button

onClick={salir}

className="
bg-red-600
hover:bg-red-500
text-white
px-4
py-2
rounded-xl
font-bold
transition
duration-300
"

>

Cerrar sesión

</button>



</>


):(



<Link

href="/login"

className="
bg-[#f5b800]
hover:bg-[#ffd700]
text-black
px-5
py-2
rounded-xl
font-bold
shadow-[0_0_25px_rgba(245,184,0,0.35)]
transition
duration-300
"

>

Iniciar sesión

</Link>



)

}



</div>



</div>


</nav>


);

}