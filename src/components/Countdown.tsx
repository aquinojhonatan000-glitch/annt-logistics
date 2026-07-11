"use client";

import { useEffect, useState } from "react";

export default function Countdown(){

  const fechaFinal = new Date("2026-07-15T23:59:59").getTime();

  const [tiempo, setTiempo] = useState("");

  useEffect(()=>{

    const intervalo = setInterval(()=>{

      const ahora = new Date().getTime();
      const diferencia = fechaFinal - ahora;


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

  },[]);


  return (
    <div className="bg-red-600 text-white px-5 py-3 rounded-xl font-bold text-center">
      🔥 Oferta termina en: {tiempo}
    </div>
  );
}