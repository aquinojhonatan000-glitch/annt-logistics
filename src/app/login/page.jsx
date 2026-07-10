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


const crearPerfil = async(usuario,nombre)=>{

const perfil = {

id: usuario.id,
nombre: nombre || usuario.email.split("@")[0],
correo: usuario.email,
rol:"cliente",
telefono:"",
direccion:""

};


const {error}=await supabase

.from("perfiles")

.upsert(perfil);



if(error){

console.log("ERROR PERFIL:",error);

alert(
"Error creando perfil: " + error.message
);

return null;

}


return perfil;

};



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



if(!data.user){

alert("Usuario creado. Inicia sesión.");

return;

}



const perfil = await crearPerfil(

data.user,

datos.nombre

);



if(!perfil){

return;

}



actualizarUsuario(perfil);


localStorage.setItem(

"usuario",

JSON.stringify(perfil)

);



alert("✅ Cuenta creada correctamente");

router.push("/perfil");



}else{


const {data,error}=await supabase.auth.signInWithPassword({

email:datos.correo,

password:datos.contraseña

});


if(error){

alert(error.message);

return;

}



let perfil;



const {data:perfilDB,error:perfilError}=await supabase

.from("perfiles")

.select("*")

.eq("id",data.user.id)

.single();



if(perfilError){


perfil = await crearPerfil(

data.user,

data.user.email.split("@")[0]

);



if(!perfil){

return;

}



}else{


perfil = perfilDB;


}



const usuario={

id:data.user.id,

nombre:perfil.nombre,

correo:data.user.email,

telefono:perfil.telefono || "",

direccion:perfil.direccion || "",

rol:perfil.rol || "cliente"

};



actualizarUsuario(usuario);


localStorage.setItem(

"usuario",

JSON.stringify(usuario)

);



alert("✅ Bienvenido a ANNT LOGISTICS");



if(usuario.rol==="admin"){

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

ANNT <span className="text-[#f5b800]">LOGISTICS</span>

</h1>


<h2 className="text-2xl font-bold text-center mb-6">

{modo==="login" ? "Iniciar sesión" : "Crear cuenta"}

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

{modo==="login" ? "Entrar" : "Registrarme"}

</button>


</form>



<button

onClick={()=>setModo(

modo==="login" ? "registro" : "login"

)}

className="mt-6 w-full text-[#f5b800]"

>

{modo==="login" ? "Crear una cuenta" : "Ya tengo cuenta"}

</button>


</div>

</main>

);

}