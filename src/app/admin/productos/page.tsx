"use client";

import { useState } from "react";

export default function ProductosAdmin(){

const [link,setLink] = useState("");

return (

<div className="p-8">

<h1 className="text-3xl font-bold mb-6">
Agregar producto
</h1>


<div className="max-w-xl space-y-4">


<input
type="text"
placeholder="Pega el link de Temu, AliExpress..."
value={link}
onChange={(e)=>setLink(e.target.value)}
className="w-full border p-3 rounded"
/>


<button
className="bg-black text-white px-6 py-3 rounded"
>
Importar producto
</button>


</div>

</div>

);

}