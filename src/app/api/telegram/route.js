import { NextResponse } from "next/server";

export async function POST(request) {

  try {

    const body = await request.json();

    const mensaje = `
🛒 NUEVO PEDIDO ANNT LOGISTICS

👤 Cliente:
${body.nombre}

📱 Teléfono:
${body.telefono}

📍 Dirección:
${body.direccion}

💰 Total:
S/ ${body.total}
`;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;


    const respuesta = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          chat_id:chatId,
          text:mensaje
        })
      }
    );


    const data = await respuesta.json();


    return NextResponse.json(data);


  } catch(error){

    console.log(error);

    return NextResponse.json(
      {
        error:"Error Telegram"
      },
      {
        status:500
      }
    );

  }

}