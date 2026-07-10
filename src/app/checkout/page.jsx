"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { useUser } from "@/context/UserContext";

export default function Checkout() {
  const router = useRouter();

  const { carrito, limpiarCarrito } = useCart();
  const { agregarPedido } = useOrders();
  const { usuario } = useUser();

  const [datosEntrega, setDatosEntrega] = useState({
    nombre: usuario?.nombre || "",
    telefono: usuario?.telefono || "",
    direccion: usuario?.direccion || "",
    ciudad: "",
  });

  const [pago, setPago] = useState("Yape / Plin");
  const [comprobante, setComprobante] = useState("");

  const total = carrito.reduce(
    (suma, producto) =>
      suma + producto.precio * producto.cantidad,
    0
  );

  const subirComprobante = (e) => {
    const archivo = e.target.files[0];

    if (!archivo) return;

    const lector = new FileReader();

    lector.onload = () => {
      setComprobante(lector.result);
    };

    lector.readAsDataURL(archivo);
  };

  const confirmarPedido = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const numeroPedido =
      "ANNT-" + Math.floor(Math.random() * 1000000);

    const nuevoPedido = {
      id: numeroPedido,

      productos: carrito,

      total,

      estado: "Esperando pago",

      pago,

      cliente: {
        ...datosEntrega,
        correo: usuario?.correo || "",
      },

      comprobante,

      fecha: new Date().toLocaleString(),
    };

    agregarPedido(nuevoPedido);

    if (limpiarCarrito) {
      limpiarCarrito();
    }

    alert(
      `✅ Pedido creado correctamente

Número: ${numeroPedido}`
    );

    router.push("/perfil");
  };

  return (
    <main className="min-h-screen bg-[#111] text-white p-8">

      <h1 className="text-5xl font-bold mb-8">
        Finalizar
        <span className="text-[#f5b800]">
          {" "}Compra
        </span>
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        <section className="bg-[#181818] border border-[#333] rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            📍 Dirección de entrega
          </h2>

          <input
            className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"
            placeholder="Nombre completo"
            value={datosEntrega.nombre}
            onChange={(e) =>
              setDatosEntrega({
                ...datosEntrega,
                nombre: e.target.value,
              })
            }
          />

          <input
            className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"
            placeholder="Teléfono"
            value={datosEntrega.telefono}
            onChange={(e) =>
              setDatosEntrega({
                ...datosEntrega,
                telefono: e.target.value,
              })
            }
          />

          <input
            className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"
            placeholder="Dirección"
            value={datosEntrega.direccion}
            onChange={(e) =>
              setDatosEntrega({
                ...datosEntrega,
                direccion: e.target.value,
              })
            }
          />

          <input
            className="w-full bg-[#111] border border-[#333] p-3 rounded-lg"
            placeholder="Ciudad"
            value={datosEntrega.ciudad}
            onChange={(e) =>
              setDatosEntrega({
                ...datosEntrega,
                ciudad: e.target.value,
              })
            }
          />

        </section>

        <section className="bg-[#181818] border border-[#333] rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-5">
            💳 Método de pago
          </h2>

          <select
            value={pago}
            onChange={(e) => setPago(e.target.value)}
            className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-5"
          >
            <option>Yape / Plin</option>
            <option>Transferencia bancaria</option>
            <option>Tarjeta</option>
            <option>Pago contra entrega</option>
          </select>

          <div className="bg-[#111] rounded-xl p-5">

            <p>📱 Yape / Plin: <b>907025944</b></p>

            <p className="mt-2">
              🏦 BBVA Perú
            </p>

            <p>
              Cuenta: <b>0011-0814-0278664916</b>
            </p>

            <p>
              CCI:
              <b> 01181400027866491616</b>
            </p>

            <img
              src="/qr.png"
              alt="QR"
              className="w-48 mt-5 rounded-lg"
            />

          </div>

          <h3 className="font-bold mt-6">
            📎 Subir comprobante
          </h3>

          <input
            type="file"
            accept="image/*"
            onChange={subirComprobante}
            className="w-full mt-3"
          />

          {comprobante && (
            <img
              src={comprobante}
              alt="Comprobante"
              className="w-48 mt-4 rounded-lg"
            />
          )}

          <h2 className="text-2xl font-bold mt-8">
            🛒 Resumen del pedido
          </h2>
                    {carrito.length === 0 ? (

            <p className="text-gray-400 mt-4">
              No hay productos en el carrito.
            </p>

          ) : (

            carrito.map((producto) => (

              <div
                key={producto.id}
                className="flex justify-between border-b border-[#333] py-3"
              >

                <div>

                  <p className="font-bold">
                    {producto.nombre}
                  </p>

                  <p className="text-gray-400 text-sm">
                    Cantidad: {producto.cantidad}
                  </p>

                </div>

                <div className="font-bold">

                  S/ {(producto.precio * producto.cantidad).toFixed(2)}

                </div>

              </div>

            ))

          )}

          <div className="mt-8">

            <p className="text-3xl font-bold">

              Total:

              <span className="text-[#f5b800]">

                {" "}S/ {total.toFixed(2)}

              </span>

            </p>

            <button

              onClick={confirmarPedido}

              className="w-full mt-8 bg-[#f5b800] text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition"

            >

              🚚 Confirmar pedido

            </button>

          </div>

        </section>

      </div>

    </main>

  );

}