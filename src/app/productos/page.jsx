"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import CountdownProduct from "@/components/CountdownProduct";

export default function Productos() {

  const { carrito, agregarCarrito } = useCart();
  const { productos } = useProducts();

  const pathname = usePathname();

  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [selecciones, setSelecciones] = useState({});
  const [imagenActual, setImagenActual] = useState(null);
  const [indiceImagen, setIndiceImagen] = useState(0);


  const categorias = [
    "Todos",
    "Moda",
    "Zapatillas",
    "Tecnologia",
    "Hogar y Cocina",
    "Uso diario",
    "Belleza",
    "Accesorios",
    "Gaming",
    "Deportes",
    "Herramientas",
    "Juguetes",
    "Bebés",
    "Automóvil",
    "Shampoos",
    "Jabones",
    "Detergentes",
    "Toallitas Humedas",
     "Ropa",
      "Libros",
      "Envios de 2 a 3 dias ",
      "Limpieza",
      "Otros",
      
  ];


  const ofertaActiva = (producto) => {

    if (!producto.descuento_hasta) return false;
    if (!producto.descuento) return false;

    return new Date(producto.descuento_hasta) > new Date();

  };


  const seleccionar = (id, campo, valor) => {

    setSelecciones(prev => ({

      ...prev,

      [id]: {

        ...prev[id],

        [campo]: valor

      }

    }));

  };


  const productosFiltrados = productos.filter((producto)=>{

    const coincideNombre =
    producto.nombre
    ?.toLowerCase()
    .includes(busqueda.toLowerCase());


    const coincideCategoria =
    categoria === "Todos" ||
   producto.categoria?.toLowerCase().trim() === categoria.toLowerCase().trim();


    return coincideNombre && coincideCategoria;

  });



  return (

    <main className="p-5">


      <h1 className="text-3xl font-bold mb-3">
        🛍️ Catálogo
      </h1>


      <p>
        Todos nuestros productos están sujetos a disponibilidad,
        proveedores y costos de importación.
      </p>

      <p>
  🚚 Entrega estimada: 6 a 15 días hábiles.
  <br />
  Cualquier inconveniente con el pedido, se le hará saber por medio de WhatsApp.
</p>

<br />

<a
  href="https://wa.me/51907025944"
  target="_blank"
  className="
    inline-block
    mt-5
    bg-green-500
    px-6
    py-3
    rounded-xl
    font-bold
  "
>
  💬 WhatsApp: 907025944
</a>



      <input

      className="
      w-full
      bg-[#181818]
      border
      border-[#333]
      p-4
      rounded-2xl
      my-6
      "

      placeholder="🔎 Buscar productos..."

      value={busqueda}

      onChange={(e)=>setBusqueda(e.target.value)}

      />



      <div className="flex flex-wrap gap-3 mb-8">

      {categorias.map(cat=>(

        <button

        key={cat}

        onClick={()=>setCategoria(cat)}

        className={`
        px-5
        py-2
        rounded-full
        border

        ${
        categoria===cat
        ?
        "bg-[#f5b800] text-black font-bold"
        :
        "bg-[#181818]"
        }

        `}

        >

        {cat}

        </button>

      ))}

      </div>



      <div className="grid md:grid-cols-3 gap-6">


      {productosFiltrados.map((producto)=>(


      <div

      key={producto.id}

      className="
      card-dark
      p-5
      rounded-2xl
      relative
      "

      >



      {ofertaActiva(producto) && (

        <span

        className="
        absolute
        top-4
        left-4
        z-10
        bg-red-500
        text-white
        px-3
        py-1
        rounded-full
        font-bold
        "

        >

        🔥 OFERTA -{producto.descuento}%

        </span>

      )}




      <div
className=
{
producto.imagenes?.length > 1
?
"grid grid-cols-2 gap-3"
:
"grid grid-cols-1"
}
>


      {
producto.imagenes?.length > 0

?

producto.imagenes.map((img,index)=>(

<img

key={index}

src={img}

alt={producto.nombre}

onClick={()=>{

setImagenActual(producto.imagenes);

setIndiceImagen(index);

}}

className="
w-full
h-40
object-contain
bg-white
rounded-2xl
cursor-pointer
"

/>

))

:

<img

src={
producto.imagen ||
"/producto.png"
}

alt={producto.nombre}

onClick={()=>{

setImagenActual([producto.imagen]);

setIndiceImagen(0);

}}

className="
w-full
h-80
object-contain
bg-white
rounded-2xl
cursor-pointer
"

/>

}


      </div>



      <p className="mt-4 text-yellow-400">
      {producto.categoria}
      </p>


      <h2 className="text-xl font-bold">
      {producto.nombre}
      </h2>


      <p>
      {producto.descripcion}
      </p>



      <div className="mt-4">


      {ofertaActiva(producto) ? (

        <>

        <del>
        S/ {Number(producto.precio_original).toFixed(2)}
        </del>

        <p className="text-xl font-bold">
        S/ {Number(producto.precio).toFixed(2)}
        </p>

        </>


      ):(

        <p className="text-xl font-bold">
        S/ {Number(producto.precio).toFixed(2)}
        </p>

      )}


      </div>




      {ofertaActiva(producto) && (

        <CountdownProduct
        fecha={producto.descuento_hasta}
        />

      )}





{producto.tallas && (
  <>
    <p className="mt-4 mb-2 font-semibold text-gray-300">
      👕 Tallas:
    </p>

    <div className="flex gap-2 flex-wrap">
      {producto.tallas.split(",").map((talla) => (
        <button
          key={talla}
          onClick={() =>
            seleccionar(producto.id, "talla", talla.trim())
          }
          className={`
            px-4
            py-2
            border
            rounded-lg
            cursor-pointer

            ${
              selecciones[producto.id]?.talla === talla.trim()
                ? "bg-[#f5b800] text-black font-bold border-yellow-400"
                : "bg-transparent"
            }
          `}
        >
          {talla.trim()}
        </button>
      ))}
    </div>
  </>
)}

{producto.colores && (
  <>
    <p className="mt-4 mb-2 font-semibold text-gray-300">
      🎨 Colores:
    </p>

    <div className="flex gap-2 flex-wrap">
      {producto.colores.split(",").map((color) => (
        <button
          key={color}
          onClick={() =>
            seleccionar(producto.id, "color", color.trim())
          }
          className={`
            px-4
            py-2
            border
            rounded-lg
            cursor-pointer
            ${
              selecciones[producto.id]?.color === color.trim()
                ? "bg-[#f5b800] text-black font-bold border-yellow-400"
                : "bg-transparent"
            }
          `}
        >
          {color.trim()}
        </button>
      ))}
    </div>
  </>
)}




      <button

      onClick={()=>{

      const elegido = selecciones[producto.id] || {};


      if(producto.tallas && !elegido.talla){

        alert("Selecciona una talla");

        return;

      }


      agregarCarrito({

        ...producto,

        talla:elegido.talla || "",

        color:elegido.color || "",

        cantidad:1

      });


      }}

      className="
      mt-6
      w-full
      btn-gold
      "

      >

      🛒 Agregar al carrito

      </button>



      </div>


      ))}


      </div>




      {productosFiltrados.length===0 && (

      <p>
      No hay productos en la categoría "{categoria}"
      </p>

      )}




      {carrito.length>0 && pathname!=="/carrito" && (

      <div

      className="
      fixed
      bottom-5
      right-5
      bg-[#f5b800]
      text-black
      font-bold
      px-6
      py-4
      rounded-2xl
      shadow-xl
      z-50
      "

      >

      🛒 {carrito.length} producto(s)


      <a

      href="/carrito"

      className="
      block
      underline
      mt-2
      "

      >

      Ver carrito

      </a>


      </div>

      )}


{imagenActual && (

<div
className="
fixed
inset-0
bg-black/80
z-50
flex
items-center
justify-center
"
onClick={()=>setImagenActual(null)}
>

<img

src={imagenActual[indiceImagen]}

className="
max-h-[90vh]
max-w-[90vw]
object-contain
rounded-xl
"

/>



</div>

)}
    </main>

  );

}