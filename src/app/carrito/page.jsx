"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";


export default function Carrito() {


  const {
    carrito,
    eliminarCarrito,
    cambiarCantidad
  } = useCart();




  const total = carrito.reduce(
    (suma, producto) =>
      suma + producto.precio * producto.cantidad,
    0
  );



  return (


    <main className="min-h-screen bg-[#111111] text-white p-8">



      <h1 className="text-4xl font-bold mb-6">
        🛒 Mi Carrito
      </h1>





      {carrito.length === 0 ? (



        <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-6">


          <h2 className="text-2xl font-bold">
            Tu carrito está vacío
          </h2>


          <p className="mt-3 text-gray-400">
            Agrega productos desde el catálogo.
          </p>


        </div>



      ) : (



        <div>



          <div className="grid gap-5">



            {carrito.map((producto)=>(



              <div

                key={producto.id}

                className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-5 flex items-center justify-between"

              >



                <div className="flex items-center gap-5">



                  <img

                    src={producto.imagen}

                    alt={producto.nombre}

                    className="w-24 h-24 object-cover rounded-lg"

                  />



                  <div>


                    <h2 className="text-xl font-bold">

                      {producto.nombre}

                    </h2>



                    <p className="text-[#f5b800] font-bold">

                      S/ {producto.precio}

                    </p>



                  </div>



                </div>






                <div className="text-center">


                  <p className="mb-2 font-bold">
                    Cantidad
                  </p>



                  <div className="flex items-center gap-3">


                    <button

                      onClick={() =>
                        cambiarCantidad(
                          producto.id,
                          producto.cantidad - 1
                        )
                      }

                      className="border border-[#444] px-3 py-1 rounded"

                    >
                      -
                    </button>




                    <span className="font-bold">

                      {producto.cantidad}

                    </span>




                    <button

                      onClick={() =>
                        cambiarCantidad(
                          producto.id,
                          producto.cantidad + 1
                        )
                      }

                      className="border border-[#444] px-3 py-1 rounded"

                    >
                      +
                    </button>



                  </div>




                  <button

                    onClick={() =>
                      eliminarCarrito(producto.id)
                    }

                    className="text-red-400 mt-3"

                  >

                    ❌ Eliminar

                  </button>



                </div>



              </div>



            ))}



          </div>






          <div className="mt-8 text-3xl font-bold">

            Total:

            <span className="text-[#f5b800]">

              {" "}S/ {total.toFixed(2)}

            </span>


          </div>







          <Link

            href="/checkout"

            className="mt-6 block text-center bg-[#f5b800] text-black font-bold px-8 py-4 rounded-xl hover:bg-[#ffd700]"

          >

            💳 Comprar ahora

          </Link>




        </div>



      )}



    </main>


  );

}