import { NextResponse } from "next/server";

export async function POST(request) {

try {

const body = await request.json();


const productos = body.productos?.map((producto)=>{

return `
🛍️ ${producto.nombre}
Cantidad: ${producto.cantidad}
${producto.talla ? `👕 Talla: ${producto.talla}` : ""}
${producto.color ? `🎨 Color: ${producto.color}` : ""}
`;

}).join("\n");



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

${productos}


💰 Total:
S/ ${body.total}


📄 Comprobante:
${body.comprobante}


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


}catch(error){


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