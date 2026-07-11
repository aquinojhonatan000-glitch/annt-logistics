"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";

export default function Productos() {

  const { carrito, agregarCarrito } = useCart();

  const { productos } = useProducts();

  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");


  const categorias = [
    "Todos",
    "Moda",
    "Zapatillas",
    "Electrónica",
    "Hogar",
    "Belleza",
    "Accesorios",
    "Gaming",
    "Mascotas",
    "Deportes",
    "Oficina",
    "Herramientas",
    "Juguetes",
    "Bebés",
    "Automóvil",
    "Otros",
  ];



  const productosFiltrados = productos.filter((producto)=>{

    const coincideNombre =
      producto.nombre
      ?.toLowerCase()
      .includes(busqueda.toLowerCase());


    const coincideCategoria =
      categoria === "Todos" ||
      producto.categoria === categoria;


    return coincideNombre && coincideCategoria;

  });



  return (

    <main className="min-h-screen bg-[#111] text-white p-8">


      <h1 className="text-4xl font-bold mb-5">
        🛍️ Catálogo ANNT LOGISTICS
      </h1>


      <p className="mb-5 text-lg">
        🛒 Carrito: {carrito.length} productos
      </p>



      <input

        type="text"

        placeholder="Buscar productos..."

        className="w-full bg-[#181818] border border-[#333] text-white p-3 rounded-lg mb-6"

        value={busqueda}

        onChange={(e)=>setBusqueda(e.target.value)}

      />



      <div className="flex gap-3 mb-8 flex-wrap">


        {categorias.map((cat)=>(


          <button

            key={cat}

            onClick={()=>setCategoria(cat)}

            className={`px-5 py-2 rounded-full border transition ${
              
              categoria === cat

              ? "bg-[#f5b800] text-black font-bold"

              : "bg-[#181818] border-[#333] hover:bg-[#f5b800] hover:text-black"

            }`}

          >

            {cat}

          </button>


        ))}


      </div>





      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">



        {productosFiltrados.map((producto)=>(



          <div

            key={producto.id}

            className="bg-[#181818] border border-[#333] rounded-xl p-5 shadow"

          >



            <img

              src={producto.imagen}

              alt={producto.nombre}

              className="w-full h-48 object-cover rounded-lg"

            />



            <p className="text-gray-400 mt-3">

              {producto.categoria}

            </p>



            <h2 className="text-xl font-bold">

              {producto.nombre}

            </h2>



            {producto.descripcion && (

              <p className="text-gray-300 text-sm mt-2">

                {producto.descripcion}

              </p>

            )}






            <div className="mt-3">


              {producto.precio_original > 0 && (

                <p className="text-gray-500 line-through">

                  S/ {producto.precio_original}

                </p>

              )}



              <p className="text-[#f5b800] text-2xl font-bold">

                S/ {producto.precio}

              </p>



              {producto.descuento > 0 && (

                <p className="text-red-400 font-bold">

                  🔥 {producto.descuento}% descuento

                </p>

              )}


            </div>





            {producto.stock !== undefined && (

              <p className="mt-3 text-gray-300">

                📦 Stock: {producto.stock}

              </p>

            )}





            {producto.tallas && (

              <p className="text-gray-300">

                👕 Tallas: {producto.tallas}

              </p>

            )}





            {producto.colores && (

              <p className="text-gray-300">

                🎨 Colores: {producto.colores}

              </p>

            )}





            <button

              onClick={()=>agregarCarrito(producto)}

              className="mt-5 w-full bg-[#f5b800] hover:bg-yellow-500 text-black py-3 rounded-lg font-bold"

            >

              🛒 Agregar al carrito

            </button>



          </div>



        ))}



      </div>



    </main>


  );

}