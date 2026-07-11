"use client";

import { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { useOrders } from "@/context/OrderContext";
import { supabase } from "@/lib/supabase";

export default function Admin() {

  const {
    productos,
    agregarProducto,
    eliminarProducto
  } = useProducts();

  const {
    pedidos,
    cambiarEstado,
    cambiarTiempoEntrega
  } = useOrders();

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: "",
    precio_original: "",
    descuento: "",
    stock: "",
    tallas: "",
    colores: "",
    imagen: ""
  });

  const [subiendo, setSubiendo] = useState(false);

  const subirImagen = async (e) => {

    const archivo = e.target.files[0];

    if (!archivo) return;

    setSubiendo(true);

    const nombreArchivo =
      Date.now() + "-" + archivo.name;

    const { error } = await supabase.storage
      .from("imagenes")
      .upload(nombreArchivo, archivo);

    if (error) {
      console.log(error);
      alert("Error subiendo imagen");
      setSubiendo(false);
      return;
    }

    const url = supabase.storage
      .from("imagenes")
      .getPublicUrl(nombreArchivo)
      .data.publicUrl;

    setProducto({
      ...producto,
      imagen: url
    });

    setSubiendo(false);
  };

  const guardarProducto = async (e) => {

    e.preventDefault();

    if (!producto.imagen) {
      alert("Sube una imagen");
      return;
    }

    await agregarProducto({
      ...producto,
      precio: Number(producto.precio),
      precio_original: Number(producto.precio_original),
      descuento: Number(producto.descuento),
      stock: Number(producto.stock)
    });

    setProducto({
      nombre: "",
      descripcion: "",
      categoria: "",
      precio: "",
      precio_original: "",
      descuento: "",
      stock: "",
      tallas: "",
      colores: "",
      imagen: ""
    });
  };

  return (
    <main className="min-h-screen bg-[#111] text-white p-8">

      <h1 className="text-3xl font-bold mb-8">
        ⚙️ ANNT LOGISTICS ADMIN
      </h1>

      <div className="bg-[#181818] border border-[#333] p-6 rounded-xl mb-10">

        <h2 className="text-xl font-bold mb-5">
          🛍️ Agregar producto
        </h2>

        <form onSubmit={guardarProducto}>

          <input
            className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"
            placeholder="Nombre del producto"
            value={producto.nombre}
            onChange={(e) =>
              setProducto({
                ...producto,
                nombre: e.target.value
              })
            }
          />

          <textarea
            className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"
            placeholder="Descripción del producto"
            value={producto.descripcion}
            onChange={(e) =>
              setProducto({
                ...producto,
                descripcion: e.target.value
              })
            }
          />

          <input
            className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"
            placeholder="Categoría"
            value={producto.categoria}
            onChange={(e) =>
              setProducto({
                ...producto,
                categoria: e.target.value
              })
            }
          />

          <input
            type="number"
            className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"
            placeholder="Precio actual"
            value={producto.precio}
            onChange={(e) =>
              setProducto({
                ...producto,
                precio: e.target.value
              })
            }
          />

          <input
            type="number"
            className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"
            placeholder="Precio anterior"
            value={producto.precio_original}
            onChange={(e) =>
              setProducto({
                ...producto,
                precio_original: e.target.value
              })
            }
          />

          <input
            type="number"
            className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"
            placeholder="Descuento (%)"
            value={producto.descuento}
            onChange={(e) =>
              setProducto({
                ...producto,
                descuento: e.target.value
              })
            }
          />

          <input
            type="number"
            className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"
            placeholder="Stock disponible"
            value={producto.stock}
            onChange={(e) =>
              setProducto({
                ...producto,
                stock: e.target.value
              })
            }
          />

          <input
            className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"
            placeholder="Tallas (Ej: S,M,L,XL o 39,40,41)"
            value={producto.tallas}
            onChange={(e) =>
              setProducto({
                ...producto,
                tallas: e.target.value
              })
            }
          />

          <input
            className="w-full bg-[#111] border border-[#333] p-3 rounded-lg mb-4"
            placeholder="Colores (Ej: Negro,Blanco,Azul)"
            value={producto.colores}
            onChange={(e) =>
              setProducto({
                ...producto,
                colores: e.target.value
              })
            }
          />

          <input
            type="file"
            accept="image/*"
            onChange={subirImagen}
            className="mb-4"
          />

          {subiendo && (
            <p>⏳ Subiendo imagen...</p>
          )}

          {producto.imagen && (
            <img
              src={producto.imagen}
              className="w-40 rounded-lg mb-4"
              alt="Vista previa"
            />
          )}

          <button
            className="w-full bg-[#f5b800] text-black font-bold py-3 rounded-lg"
          >
            ➕ Guardar producto
          </button>

        </form>

      </div>
            <h2 className="text-2xl font-bold mb-5">
        📦 Productos
      </h2>

      {productos?.map((p) => (

        <div
          key={p.id}
          className="border border-[#333] p-5 rounded-xl mb-5 bg-[#181818]"
        >

          <img
            src={p.imagen}
            alt={p.nombre}
            className="w-32 h-32 object-cover rounded-lg"
          />

          <h3 className="text-xl font-bold mt-3">
            {p.nombre}
          </h3>

          <p className="text-gray-300 mt-2">
            {p.descripcion}
          </p>

          <p className="mt-2">
            💲 Precio: <strong>S/ {p.precio}</strong>
          </p>

          {p.precio_original > 0 && (
            <p className="text-gray-400 line-through">
              Antes: S/ {p.precio_original}
            </p>
          )}

          {p.descuento > 0 && (
            <p className="text-[#f5b800] font-bold">
              🔥 {p.descuento}% de descuento
            </p>
          )}

          <p className="mt-2">
            📦 Stock: {p.stock}
          </p>

          {p.tallas && (
            <p>
              👕 Tallas: {p.tallas}
            </p>
          )}

          {p.colores && (
            <p>
              🎨 Colores: {p.colores}
            </p>
          )}

          <button
            onClick={() => eliminarProducto(p.id)}
            className="mt-4 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
          >
            🗑️ Eliminar producto
          </button>

        </div>

      ))}

      <h2 className="text-2xl font-bold mt-10 mb-5">
        📦 Pedidos de clientes
      </h2>

      {pedidos.length === 0 ? (

        <p>No hay pedidos todavía.</p>

      ) : (

        pedidos.map((pedido) => (

          <div
            key={pedido.id}
            className="bg-[#181818] border border-[#333] rounded-xl p-6 mb-5"
          >

            <p>
              📦 Pedido: {pedido.numero_pedido}
            </p>

            <p>
              💰 Total: S/ {pedido.total}
            </p>

            <div className="mt-4">

              <label className="block mb-2">
                Estado del pedido
              </label>

              <select
                className="bg-[#111] border border-[#333] p-3 rounded-lg w-full"
                value={pedido.estado}
                onChange={(e) =>
                  cambiarEstado(
                    pedido.id,
                    e.target.value
                  )
                }
              >
                <option>Esperando pago</option>
                <option>Preparando pedido</option>
                <option>En camino</option>
                <option>Entregado</option>
              </select>

            </div>

            <div className="mt-4">

              <label className="block mb-2">
                Tiempo estimado
              </label>

              <select
                className="bg-[#111] border border-[#333] p-3 rounded-lg w-full"
                value={pedido.tiempo_entrega || "Pendiente"}
                onChange={(e) =>
                  cambiarTiempoEntrega(
                    pedido.id,
                    e.target.value
                  )
                }
              >
                <option>Pendiente</option>
                <option>1-2 días</option>
                <option>3-5 días</option>
                <option>5-7 días</option>
                <option>10-15 días</option>
                <option>Más de 15 días</option>
              </select>

            </div>

          </div>

        ))

      )}

    </main>
  );
}