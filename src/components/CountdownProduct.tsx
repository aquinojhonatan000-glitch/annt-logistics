"use client";

import { useEffect, useState } from "react";

export default function CountdownProduct({
  fecha
}:{
  fecha:string;
}){

  const [tiempo,setTiempo] = useState("");

  useEffect(()=>{

    const intervalo = setInterval(()=>{

      const ahora = new Date().getTime();
      const final = new Date(fecha).getTime();

      const diferencia = final - ahora;


      if(diferencia <= 0){
        setTiempo("Oferta terminada");
        clearInterval(intervalo);
        return;
      }


      const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
      );

      const horas = Math.floor(
        (diferencia / (1000 * 60 * 60)) % 24
      );

      const minutos = Math.floor(
        (diferencia / (1000 * 60)) % 60
      );

      const segundos = Math.floor(
        (diferencia / 1000) % 60
      );


      setTiempo(
        `${dias}d ${horas}h ${minutos}m ${segundos}s`
      );


    },1000);


    return ()=>clearInterval(intervalo);


  },[fecha]);


  return (
    <p className="text-red-400 font-bold mt-2">
      🔥 Oferta termina en: {tiempo}
    </p>
  );

}