import { NextResponse } from "next/server";

export async function POST(request) {

  try {

    const body = await request.json();

    console.log(
      "DATOS COMPLETOS:",
      JSON.stringify(body, null, 2)
    );


    const productos = body.productos?.map((producto) => {

      return `🛍️ ${producto.nombre}
Cantidad: ${producto.cantidad}
${producto.talla ? `👕 Talla: ${producto.talla}` : ""}
${producto.color ? `🎨 Color: ${producto.color}` : ""}`;

    }).join("\n\n");


    const mensaje = `
🛒 NUEVO PEDIDO ANNT LOGISTICS

👤 Cliente:
${body.nombre}

🪪 DNI:
${body.dni}

📱 Teléfono:
${body.telefono}

📍 Dirección:
${body.direccion}

💳 Pago:
${body.pago}

📦 Productos:
${productos || "Sin productos"}

💰 Total:
S/ ${body.total}
`;


    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    console.log("TOKEN EXISTE:", !!token);
console.log("CHAT ID:", chatId);


    // ENVIAR TEXTO DEL PEDIDO
    const respuesta = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: mensaje,
        }),
      }
    );


    const data = await respuesta.json();


    // ENVIAR COMPROBANTE COMO IMAGEN
    if (body.comprobante) {

      const foto = await fetch(
        `https://api.telegram.org/bot${token}/sendPhoto`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            photo: body.comprobante,
            caption: "📄 Comprobante de pago ANNT LOGISTICS",
          }),
        }
      );


      const resultadoFoto = await foto.json();

      console.log(
        "Respuesta foto Telegram:",
        resultadoFoto
      );

    }


    console.log(
      "Respuesta Telegram:",
      data
    );


    return NextResponse.json(data);


  } catch (error) {

    console.log(
      "Error Telegram:",
      error
    );


    return NextResponse.json(
      {
        error: "Error Telegram"
      },
      {
        status:500
      }
    );

  }

}