"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { useOrders } from "@/context/OrderContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Notification from "@/components/Notification";

export default function Checkout() {
  const { carrito, limpiarCarrito } = useCart();
  const { usuario } = useUser();
  const { agregarPedido } = useOrders();
  const router = useRouter();

  const [datos, setDatos] = useState({
    nombre: usuario?.nombre || "",
    dni: "",
    telefono: usuario?.telefono || "",
    direccion: usuario?.direccion || "",
    ciudad: "",
    pago: "Yape",
  });

  const [comprobante, setComprobante] = useState("");
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [subiendo, setSubiendo] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [notificacion, setNotificacion] = useState("");

  const total = carrito.reduce(
    (sum, p) => sum + Number(p.precio) * p.cantidad,
    0
  );

  // ==========================
  // SUBIR COMPROBANTE
  // ==========================

  const subirComprobante = async (e) => {
    const archivo = e.target.files?.[0];

    if (!archivo) return;

    setSubiendo(true);

    try {
      const nombre =
        "comprobantes/" + Date.now() + "-" + archivo.name;

      const { error } = await supabase.storage
        .from("imagenes")
        .upload(nombre, archivo);

      if (error) throw error;

      const url = supabase.storage
        .from("imagenes")
        .getPublicUrl(nombre)
        .data.publicUrl;

      setComprobante(url);
      setNombreArchivo(archivo.name);
    } catch (error) {
      console.error(error);
      alert("Error subiendo comprobante");
    } finally {
      setSubiendo(false);
    }
  };

  // ==========================
  // CONFIRMAR COMPRA
  // ==========================

  const confirmarCompra = async (e) => {
    e.preventDefault();

    if (!comprobante) {
      alert("Sube tu comprobante de pago");
      return;
    }

    if (
      !datos.nombre ||
      !datos.dni ||
      !datos.telefono ||
      !datos.direccion ||
      !datos.ciudad
    ) {
      alert("Completa todos tus datos incluyendo DNI");
      return;
    }

    setEnviando(true);

    try {
      const pedido = {
        id: crypto.randomUUID(),

        cliente: {
          nombre: datos.nombre,
          dni: datos.dni,
          telefono: datos.telefono,
          direccion: datos.direccion,
          ciudad: datos.ciudad,
        },

        productos: carrito,
        total,
        estado: "Esperando pago",
        pago: datos.pago,
        comprobante,
        fecha: new Date().toISOString(),
        tiempo_entrega: "Pendiente",
      };

      // GUARDAR PEDIDO
      const guardado = await agregarPedido(pedido);

      if (!guardado) {
        alert("No se pudo guardar el pedido");
        return;
      }

      // ENVIAR NOTIFICACIÓN A TELEGRAM
      try {
        const respuestaTelegram = await fetch("/api/telegram", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: datos.nombre,
            telefono: datos.telefono,
            direccion: `${datos.direccion}, ${datos.ciudad}`,
            total: total.toFixed(2),
          }),
        });

        if (!respuestaTelegram.ok) {
          console.error(
            "El pedido se guardó, pero Telegram no pudo enviar la notificación"
          );
        }
      } catch (errorTelegram) {
        console.error(
          "Error enviando notificación a Telegram:",
          errorTelegram
        );
      }

      limpiarCarrito();

      setNotificacion(
        "Pedido confirmado correctamente. ANNT LOGISTICS ya está preparando tu compra."
      );

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Error confirmando pedido:", error);
      alert("Ocurrió un error al confirmar el pedido");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
        💳 Checkout
        <span className="text-[#f5b800]"> ANNT LOGISTICS</span>
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* DATOS DE ENTREGA */}

        <div className="card-dark p-6">
          <h2 className="text-2xl font-bold mb-6">
            📦 Datos de entrega
          </h2>

          <input
            className="input-style"
            placeholder="Nombre completo"
            value={datos.nombre}
            onChange={(e) =>
              setDatos({
                ...datos,
                nombre: e.target.value,
              })
            }
          />

          <input
            className="input-style"
            placeholder="DNI"
            maxLength="8"
            value={datos.dni}
            onChange={(e) =>
              setDatos({
                ...datos,
                dni: e.target.value.replace(/\D/g, ""),
              })
            }
          />

          <input
            className="input-style"
            placeholder="Teléfono"
            value={datos.telefono}
            onChange={(e) =>
              setDatos({
                ...datos,
                telefono: e.target.value,
              })
            }
          />

          <textarea
            className="input-style"
            placeholder="Dirección completa"
            value={datos.direccion}
            onChange={(e) =>
              setDatos({
                ...datos,
                direccion: e.target.value,
              })
            }
          />

          <input
            className="input-style"
            placeholder="Ciudad"
            value={datos.ciudad}
            onChange={(e) =>
              setDatos({
                ...datos,
                ciudad: e.target.value,
              })
            }
          />

          <h3 className="text-xl font-bold mt-5">
            💳 Método de pago
          </h3>

          <select
            className="input-style"
            value={datos.pago}
            onChange={(e) =>
              setDatos({
                ...datos,
                pago: e.target.value,
              })
            }
          >
            <option>Yape</option>
            <option>Plin</option>
            <option>Prexpe</option>
            <option>Transferencia BCP</option>
            <option>Transferencia BBVA</option>
          </select>
        </div>

        {/* RESUMEN DEL PEDIDO */}

        <div className="card-dark p-6">
          <h2 className="text-2xl font-bold mb-6">
            🛒 Resumen del pedido
          </h2>

          {carrito.map((p) => (
            <div
              key={p.id}
              className="border-b border-[#333] pb-4 mb-4"
            >
              <div className="flex gap-4">
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="w-20 h-20 bg-white rounded-xl object-contain"
                />

                <div>
                  <p className="font-bold">{p.nombre}</p>

                  <p>Cantidad: {p.cantidad}</p>

                  {p.talla && <p>👕 Talla: {p.talla}</p>}

                  {p.color && <p>🎨 Color: {p.color}</p>}
                </div>
              </div>
            </div>
          ))}

          <p className="text-3xl font-bold mt-6">
            Total:
            <span className="text-[#f5b800]">
              {" "}
              S/ {total.toFixed(2)}
            </span>
          </p>

          {/* DATOS DE PAGO */}

          <div className="mt-8 bg-[#111] border border-[#333] rounded-2xl p-5">
            <h3 className="text-xl font-bold text-[#f5b800]">
              💳 Datos de pago
            </h3>

            <p className="mt-4">
              📱 Yape / Plin / Prexpe
              <br />
              <b>907025944</b>
            </p>

            <p className="mt-4">
              🏦 BCP Soles
              <br />
              <b>37507956352075</b>
            </p>

            <p className="mt-4">
              🏦 BBVA Soles
              <br />
              <b>0011-0814-0278664916</b>
            </p>

            <p className="mt-4">
              👤 Titular:
              <br />
              <span className="text-[#f5b800] font-bold">
                Jhonatan Antoni Aquiño López
              </span>
            </p>
          </div>

          {/* SUBIR COMPROBANTE */}

          <div className="mt-6">
            <label className="block text-center bg-[#f5b800] text-black font-bold py-4 rounded-xl cursor-pointer hover:bg-[#ffd700] transition">
              📤 Subir comprobante

              <input
                type="file"
                accept="image/*"
                onChange={subirComprobante}
                className="hidden"
              />
            </label>

            {subiendo && (
              <p className="text-yellow-400 mt-3">
                ⏳ Subiendo...
              </p>
            )}

            {nombreArchivo && (
              <p className="text-green-400 mt-3 font-bold">
                ✅ {nombreArchivo}
              </p>
            )}
          </div>

          {/* CONFIRMAR COMPRA */}

          <button
            onClick={confirmarCompra}
            disabled={enviando || subiendo}
            className="mt-6 w-full btn-gold py-4"
          >
            {enviando
              ? "⏳ Enviando pedido..."
              : "✅ Confirmar compra"}
          </button>
        </div>
      </div>

      {notificacion && (
        <Notification
          mensaje={notificacion}
          onClose={() => setNotificacion("")}
        />
      )}
    </main>
  );
}