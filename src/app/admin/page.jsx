"use client";

import { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { useOrders } from "@/context/OrderContext";
import { supabase } from "@/lib/supabase";

export default function Admin() {

  const { agregarProducto } = useProducts();

  const { 
    pedidos, 
    cambiarEstado,
    cambiarTiempoEntrega
  } = useOrders();



  const [producto,setProducto] = useState({

    nombre:"",
    categoria:"",
    precio:"",
    imagen:""

  });



  const [subiendo,setSubiendo] = useState(false);





  const subirImagen = async(e)=>{


    const archivo = e.target.files[0];


    if(!archivo) return;



    setSubiendo(true);



    const nombreArchivo =
    Date.now()+"-"+archivo.name;



    const {error} = await supabase.storage

    .from("imagenes")

    .upload(
      nombreArchivo,
      archivo
    );



    if(error){

      console.log(error);

      alert("❌ Error subiendo imagen");

      setSubiendo(false);

      return;

    }




    const url = supabase.storage

    .from("imagenes")

    .getPublicUrl(nombreArchivo)

    .data.publicUrl;



    setProducto({

      ...producto,

      imagen:url

    });



    setSubiendo(false);



    alert("✅ Imagen subida correctamente");


  };







  const guardarProducto=(e)=>{


    e.preventDefault();



    if(!producto.imagen){

      alert("Sube una imagen primero");

      return;

    }



    agregarProducto({

      ...producto,

      precio:Number(producto.precio)

    });




    setProducto({

      nombre:"",
      categoria:"",
      precio:"",
      imagen:""

    });



  };







return (

<main className="min-h-screen bg-[#111] text-white p-8">


<h1 className="text-4xl font-bold mb-8">

⚙️ ANNT LOGISTICS ADMIN

</h1>





<section className="bg-[#181818] border border-[#333] rounded-2xl p-6 max-w-xl">


<h2 className="text-2xl font-bold mb-5">

🛍️ Agregar producto

</h2>



<form onSubmit={guardarProducto}>


<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Nombre del producto"

value={producto.nombre}

onChange={(e)=>
setProducto({
...producto,
nombre:e.target.value
})
}

/>



<input

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Categoría"

value={producto.categoria}

onChange={(e)=>
setProducto({
...producto,
categoria:e.target.value
})
}

/>




<input

type="number"

className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"

placeholder="Precio"

value={producto.precio}

onChange={(e)=>
setProducto({
...producto,
precio:e.target.value
})
}

/>





<label>

Imagen del producto

</label>



<input

type="file"

accept="image/*"

onChange={subirImagen}

className="w-full mt-3 mb-4"

/>




{subiendo && (

<p>

⏳ Subiendo imagen...

</p>

)}




{producto.imagen && (

<img

src={producto.imagen}

className="w-40 h-40 object-cover rounded-lg mb-5"

/>

)}






<button

className="w-full bg-[#f5b800] text-black font-bold py-3 rounded-lg"

>

➕ Guardar producto

</button>



</form>


</section>









<section className="mt-12">


<h2 className="text-3xl font-bold mb-6">

📦 Pedidos de clientes

</h2>





{pedidos.length===0 ? (

<p>

No hay pedidos todavía.

</p>


):(



pedidos.map((pedido)=>(


<div

key={pedido.id}

className="bg-[#181818] border border-[#333] rounded-xl p-6 mb-5"

>



<h3 className="text-2xl font-bold">

📦 {pedido.numero_pedido}

</h3>



<p>

🕒 {pedido.fecha}

</p>





<h4 className="font-bold mt-4">

👤 Cliente

</h4>


<p>

Nombre: {pedido.cliente?.nombre}

</p>


<p>

📞 {pedido.cliente?.telefono}

</p>


<p>

📍 {pedido.cliente?.direccion}

</p>


<p>

🏙️ {pedido.cliente?.ciudad}

</p>






<h4 className="font-bold mt-4">

💳 Pago

</h4>


<p>

Método: {pedido.pago}

</p>




{pedido.comprobante && (

<div className="mt-3">

<p>

🧾 Comprobante

</p>


<img

src={pedido.comprobante}

className="w-64 rounded-lg mt-2"

/>


</div>

)}






<h4 className="font-bold mt-5">

🛒 Productos

</h4>




{pedido.productos?.map((producto)=>(

<p key={producto.id}>

• {producto.nombre} x {producto.cantidad}

</p>

))}






<p className="text-[#f5b800] text-2xl font-bold mt-4">

Total: S/ {pedido.total.toFixed(2)}

</p>







<p className="font-bold mt-5">

🚚 Estado:

</p>



<select

className="bg-[#111] border border-[#333] p-3 rounded-lg mt-2"

value={pedido.estado}

onChange={(e)=>

cambiarEstado(

pedido.id,

e.target.value

)

}

>


<option>

Esperando pago

</option>


<option>

Preparando pedido

</option>


<option>

En camino

</option>


<option>

Entregado

</option>


</select>







<p className="font-bold mt-5">

⏳ Tiempo aproximado de entrega:

</p>



<select

className="bg-[#111] border border-[#333] p-3 rounded-lg mt-2"

value={pedido.tiempo_entrega || "Pendiente"}

onChange={(e)=>

cambiarTiempoEntrega(

pedido.id,

e.target.value

)

}

>


<option>

Pendiente

</option>


<option>

1-2 días

</option>


<option>

3-5 días

</option>


<option>

5-7 días

</option>


<option>

10-15 días

</option>


<option>

Más de 15 días

</option>



</select>





</div>


))


)}


</section>



</main>


);


}