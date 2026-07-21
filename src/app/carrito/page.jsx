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
      suma + Number(producto.precio) * producto.cantidad,
    0
  );


  return (
    <main className="p-5">

      <h1 className="text-3xl font-bold mb-6">
        🛒 Mi Carrito
      </h1>


      {
        carrito.length === 0 ? (

          <div className="text-center">

            <p className="text-xl font-bold">
              Tu carrito está vacío 🛒
            </p>

            <p className="mt-3">
              Agrega productos desde nuestro catálogo
              y empieza tu compra.
            </p>


            <Link
              href="/productos"
              className="
              btn-gold
              inline-block
              mt-5
              "
            >
              🛍️ Ver productos
            </Link>

          </div>


        ) : (


          <div className="grid gap-5">


            {
              carrito.map((producto)=>(

                <div

                  key={`${producto.id}-${producto.talla}-${producto.color}`}

                  className="
                  card-dark
                  p-5
                  flex
                  flex-col
                  md:flex-row
                  gap-5
                  hover:border-[#f5b800]
                  transition
                  "

                >


                  <img

                    src={producto.imagen}

                    alt={producto.nombre}

                    className="
                    w-full
                    md:w-32
                    h-32
                    object-contain
                    bg-white
                    rounded-xl
                    "

                  />


                  <div className="flex-1">


                    <h2 className="text-xl font-bold">
                      {producto.nombre}
                    </h2>


                    <p className="mt-2">
                      S/ {Number(producto.precio).toFixed(2)}
                    </p>


                    {
                      producto.talla && (
                        <p className="mt-2">
                          👕 Talla: {producto.talla}
                        </p>
                      )
                    }


                    {
                      producto.color && (
                        <p>
                          🎨 Color: {producto.color}
                        </p>
                      )
                    }



                    <div className="
                    flex
                    items-center
                    gap-4
                    mt-5
                    ">


                      <button

                        onClick={() =>
                          cambiarCantidad(
                            producto.id,
                            producto.talla,
                            producto.color,
                            producto.cantidad - 1
                          )
                        }

                        className="
                        w-9
                        h-9
                        rounded-lg
                        border
                        border-[#444]
                        hover:border-[#f5b800]
                        "

                      >
                        -
                      </button>



                      <span className="font-bold text-lg">
                        {producto.cantidad}
                      </span>



                      <button

                        onClick={() =>
                          cambiarCantidad(
                            producto.id,
                            producto.talla,
                            producto.color,
                            producto.cantidad + 1
                          )
                        }

                        className="
                        w-9
                        h-9
                        rounded-lg
                        border
                        border-[#444]
                        hover:border-[#f5b800]
                        "

                      >
                        +
                      </button>


                    </div>



                    <button

                      onClick={() =>
                        eliminarCarrito(
                          producto.id,
                          producto.talla,
                          producto.color
                        )
                      }

                      className="
                      mt-5
                      text-red-400
                      hover:text-red-300
                      font-bold
                      "

                    >
                      🗑️ Eliminar producto

                    </button>


                  </div>


                </div>


              ))
            }



            <div className="
            card-dark
            p-5
            rounded-xl
            mt-5
            ">


              <h2 className="text-2xl font-bold">
                Resumen del pedido
              </h2>


              <p className="mt-3 text-xl">
                Total:
              </p>


              <p className="text-2xl font-bold text-[#f5b800]">
                S/ {total.toFixed(2)}
              </p>



              <Link

                href="/checkout"

                className="
                block
                text-center
                mt-6
                btn-gold
                "

              >
                💳 Continuar compra

              </Link>



              <Link

                href="/productos"

                className="
                block
                text-center
                mt-4
                border
                border-[#f5b800]
                text-[#f5b800]
                py-3
                rounded-xl
                font-bold
                hover:bg-[#f5b800]
                hover:text-black
                transition
                "

              >
                ← Seguir comprando

              </Link>


            </div>


          </div>


        )
      }


    </main>
  );

}