"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Login(){

const { actualizarUsuario } = useUser();

const router = useRouter();


const [modo,setModo] = useState("login");


const [datos,setDatos] = useState({

nombre:"",
correo:"",
contraseña:""

});



const enviar = async(e)=>{

e.preventDefault();



if(modo==="registro"){



const {data,error}=await supabase.auth.signUp({

email:datos.correo,

password:datos.contraseña

});


if(error){

alert(error.message);

return;

}



const usuarioNuevo={

id:data.user.id,

nombre:datos.nombre,

correo:datos.correo,

rol:"cliente",

telefono:"",

direccion:""

};



const {error:perfilError}=await supabase

.from("perfiles")

.upsert(usuarioNuevo);



if(perfilError){

console.log(perfilError);

alert("Error creando perfil");

return;

}



actualizarUsuario(usuarioNuevo);


alert("✅ Cuenta creada correctamente");


router.push("/perfil");



}else{



const {data,error}=await supabase.auth.signInWithPassword({

email:datos.correo,

password:datos.contraseña

});


if(error){

alert("❌ Correo o contraseña incorrectos");

return;

}



console.log("UID AUTH:",data.user.id);




let {data:perfil,error:perfilError}=await supabase

.from("perfiles")

.select("*")

.eq("id",data.user.id)

.single();





// Si no existe perfil lo crea automáticamente

if(perfilError){


const nuevoPerfil={

id:data.user.id,

nombre:data.user.email.split("@")[0],

correo:data.user.email,

rol:"cliente",

telefono:"",

direccion:""

};



const {error:crearError}=await supabase

.from("perfiles")

.insert(nuevoPerfil);



if(crearError){

console.log(crearError);

alert("No se pudo crear perfil");

return;

}



perfil=nuevoPerfil;


}




const usuarioCompleto={

id:data.user.id,

nombre:perfil.nombre,

correo:data.user.email,

telefono:perfil.telefono || "",

direccion:perfil.direccion || "",

rol:perfil.rol || "cliente"

};



actualizarUsuario(usuarioCompleto);



localStorage.setItem(

"usuario",

JSON.stringify(usuarioCompleto)

);




alert("✅ Bienvenido a ANNT LOGISTICS");




if(usuarioCompleto.rol==="admin"){

router.push("/admin");

}else{

router.push("/perfil");

}



}



};



return(

<main className="min-h-screen bg-[#111] text-white flex items-center justify-center p-8">


<div className="bg-[#181818] border border-[#333] rounded-2xl p-8 w-full max-w-md">



<h1 className="text-4xl font-bold text-center mb-8">

ANNT

<span className="text-[#f5b800]">

{" "}LOGISTICS

</span>

</h1>




<h2 className="text-2xl font-bold text-center mb-6">

{modo==="login"
?
"Iniciar sesión"
:
"Crear cuenta"}

</h2>




<form onSubmit={enviar}>



{modo==="registro" && (

<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Nombre completo"

value={datos.nombre}

onChange={(e)=>setDatos({

...datos,

nombre:e.target.value

})}

/>

)}




<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Correo electrónico"

type="email"

value={datos.correo}

onChange={(e)=>setDatos({

...datos,

correo:e.target.value

})}

/>





<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-6"

placeholder="Contraseña"

type="password"

value={datos.contraseña}

onChange={(e)=>setDatos({

...datos,

contraseña:e.target.value

})}

/>




<button

className="w-full bg-[#f5b800] text-black font-bold py-3 rounded-xl"

>

{modo==="login"
?
"Entrar"
:
"Registrarme"}

</button>



</form>




<button

onClick={()=>setModo(

modo==="login"
?
"registro"
:
"login"

)}

className="mt-6 w-full text-[#f5b800]"

>

{modo==="login"
?
"Crear una cuenta nueva"
:
"Ya tengo una cuenta"}

</button>



</div>


</main>

);

}