"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const UserContext = createContext();


export function UserProvider({children}) {

const [usuario,setUsuario] = useState(null);


// cargar usuario guardado

useEffect(()=>{

const guardado = localStorage.getItem("usuario");

if(guardado){

setUsuario(JSON.parse(guardado));

}

},[]);



// iniciar sesión

const iniciarSesion = async(correo, contraseña)=>{


const {data,error}=await supabase.auth.signInWithPassword({

email:correo,

password:contraseña

});


if(error){

console.log("ERROR LOGIN:",error);

return false;

}



const {data:perfil,error:perfilError}=await supabase

.from("perfiles")

.select("*")

.eq("id",data.user.id)

.single();



if(perfilError){

console.log("ERROR PERFIL:",perfilError);

return false;

}



const usuarioCompleto={

id:data.user.id,

correo:data.user.email,

nombre:perfil.nombre,

rol:perfil.rol,

telefono:perfil.telefono || "",

direccion:perfil.direccion || ""

};



setUsuario(usuarioCompleto);


localStorage.setItem(

"usuario",

JSON.stringify(usuarioCompleto)

);



return true;


};





// registrar usuario nuevo

const registrarUsuario = async(datos)=>{


const {data,error}=await supabase.auth.signUp({

email:datos.correo,

password:datos.contraseña

});


if(error){

console.log("ERROR REGISTRO:",error);

return false;

}



const {error:perfilError}=await supabase

.from("perfiles")

.insert({

id:data.user.id,

nombre:datos.nombre,

correo:datos.correo,

rol:"cliente"

});



if(perfilError){

console.log("ERROR CREANDO PERFIL:",perfilError);

return false;

}



return true;


};





// actualizar datos del perfil

const actualizarUsuario=(datos)=>{


setUsuario(datos);


localStorage.setItem(

"usuario",

JSON.stringify(datos)

);


};





// cerrar sesión

const cerrarSesion=async()=>{


await supabase.auth.signOut();


setUsuario(null);


localStorage.removeItem("usuario");


};





return(

<UserContext.Provider

value={{

usuario,

iniciarSesion,

registrarUsuario,

actualizarUsuario,

cerrarSesion

}}

>

{children}

</UserContext.Provider>

);

}



export function useUser(){

return useContext(UserContext);

}