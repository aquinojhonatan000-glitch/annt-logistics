"use client";

import { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ProductosAdmin() {
  const { productos, agregarProducto, eliminarProducto } = useProducts();

  const productoInicial = {
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: "",
    precio_original: "",
    descuento: "",
    descuento_hasta: "",
    stock: "",
    tallas: "",
    colores: "",
    imagen: "",
  };

  const [producto, setProducto] = useState(productoInicial);
  const [linkProducto, setLinkProducto] = useState("");
  const [importando, setImportando] = useState(false);
  const [subiendo, setSubiendo] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const importarProducto = async () => {
    if (!linkProducto.trim()) {
      alert("Pega el link del producto");
      return;
    }

    setImportando(true);

    try {
      const respuesta = await fetch("/api/importar-producto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: linkProducto,
        }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.error || "No se pudo importar");
      }

      setProducto((prev) => ({
        ...prev,
        nombre: data.nombre || prev.nombre,
        descripcion: data.descripcion || prev.descripcion,
        imagen: data.imagen || prev.imagen,
      }));

      alert("✅ Producto importado");
    } catch (error) {
      console.error(error);
      alert("No se pudo importar el producto");
    } finally {
      setImportando(false);
    }
  };

  const subirImagen = async (e) => {
    const archivo = e.target.files?.[0];

    if (!archivo) return;

    setSubiendo(true);

    const nombreArchivo =
      Date.now() + "-" + archivo.name.replace(/\s+/g, "-");

    const { error } = await supabase.storage
      .from("imagenes")
      .upload(nombreArchivo, archivo);

    if (error) {
      alert("Error subiendo imagen");
      setSubiendo(false);
      return;
    }

    const { data } = supabase.storage
      .from("imagenes")
      .getPublicUrl(nombreArchivo);

    setProducto((prev) => ({
      ...prev,
      imagen: data.publicUrl,
    }));

    setSubiendo(false);
  };

  const guardarProducto = async (e) => {
    e.preventDefault();

    if (!producto.nombre) {
      alert("Escribe el nombre del producto");
      return;
    }

    if (!producto.imagen) {
      alert("Agrega una imagen");
      return;
    }

    if (!producto.precio) {
      alert("Escribe el precio");
      return;
    }

    setGuardando(true);

    try {
      await agregarProducto({
        ...producto,
        precio: Number(producto.precio),
        precio_original: producto.precio_original
          ? Number(producto.precio_original)
          : null,
        descuento: producto.descuento
          ? Number(producto.descuento)
          : 0,
        stock: producto.stock
          ? Number(producto.stock)
          : 0,
        descuento_hasta: producto.descuento_hasta
          ? new Date(producto.descuento_hasta).toISOString()
          : null,
      });

      setProducto(productoInicial);
      setLinkProducto("");

      alert("✅ Producto guardado");
    } catch (error) {
      console.error(error);
      alert("Error guardando producto");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          ⚙️ ANNT LOGISTICS ADMIN
        </h1>

        <div className="flex gap-3 flex-wrap mb-10">
          <Link
            href="/admin"
            className="bg-[#222] px-6 py-3 rounded-xl font-bold"
          >
            🏠 Panel principal
          </Link>

          <Link
            href="/admin/pedidos"
            className="bg-[#f5b800] text-black px-6 py-3 rounded-xl font-bold"
          >
            📦 Ver pedidos
          </Link>
        </div>

        <section className="bg-[#181818] border border-[#333] rounded-2xl p-6 mb-10">
          <h2 className="text-2xl font-bold mb-4">
            🔗 Importar producto
          </h2>

          <p className="text-gray-400 mb-4">
            Pega el enlace del producto para intentar importar su nombre,
            descripción e imagen.
          </p>

          <input
            type="url"
            placeholder="Pega el link de Temu, AliExpress u otra tienda"
            value={linkProducto}
            onChange={(e) => setLinkProducto(e.target.value)}
            className="w-full bg-[#111] border border-[#333] p-4 rounded-xl mb-4"
          />

          <button
            type="button"
            onClick={importarProducto}
            disabled={importando}
            className="bg-[#f5b800] text-black font-bold px-6 py-3 rounded-xl disabled:opacity-50"
          >
            {importando ? "Importando..." : "Importar producto"}
          </button>
        </section>

        <form
          onSubmit={guardarProducto}
          className="bg-[#181818] border border-[#333] rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold mb-6">
            🛍️ Agregar producto
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="bg-[#111] border border-[#333] p-4 rounded-xl"
              placeholder="Nombre del producto"
              value={producto.nombre}
              onChange={(e) =>
                setProducto({ ...producto, nombre: e.target.value })
              }
            />

            <input
              className="bg-[#111] border border-[#333] p-4 rounded-xl"
              placeholder="Categoría"
              value={producto.categoria}
              onChange={(e) =>
                setProducto({ ...producto, categoria: e.target.value })
              }
            />

            <input
              type="number"
              step="0.01"
              className="bg-[#111] border border-[#333] p-4 rounded-xl"
              placeholder="Precio de venta"
              value={producto.precio}
              onChange={(e) =>
                setProducto({ ...producto, precio: e.target.value })
              }
            />

            <input
              type="number"
              step="0.01"
              className="bg-[#111] border border-[#333] p-4 rounded-xl"
              placeholder="Precio original"
              value={producto.precio_original}
              onChange={(e) =>
                setProducto({
                  ...producto,
                  precio_original: e.target.value,
                })
              }
            />

            <input
              type="number"
              className="bg-[#111] border border-[#333] p-4 rounded-xl"
              placeholder="Descuento %"
              value={producto.descuento}
              onChange={(e) =>
                setProducto({ ...producto, descuento: e.target.value })
              }
            />

            <input
              type="number"
              className="bg-[#111] border border-[#333] p-4 rounded-xl"
              placeholder="Stock"
              value={producto.stock}
              onChange={(e) =>
                setProducto({ ...producto, stock: e.target.value })
              }
            />

            <input
              className="bg-[#111] border border-[#333] p-4 rounded-xl"
              placeholder="Tallas separadas por coma"
              value={producto.tallas}
              onChange={(e) =>
                setProducto({ ...producto, tallas: e.target.value })
              }
            />

            <input
              className="bg-[#111] border border-[#333] p-4 rounded-xl"
              placeholder="Colores separados por coma"
              value={producto.colores}
              onChange={(e) =>
                setProducto({ ...producto, colores: e.target.value })
              }
            />

            <input
              type="datetime-local"
              className="bg-[#111] border border-[#333] p-4 rounded-xl"
              value={producto.descuento_hasta}
              onChange={(e) =>
                setProducto({
                  ...producto,
                  descuento_hasta: e.target.value,
                })
              }
            />

            <input
              type="file"
              accept="image/*"
              onChange={subirImagen}
              className="bg-[#111] border border-[#333] p-4 rounded-xl"
            />
          </div>

          <textarea
            className="w-full bg-[#111] border border-[#333] p-4 rounded-xl mt-4 min-h-32"
            placeholder="Descripción"
            value={producto.descripcion}
            onChange={(e) =>
              setProducto({
                ...producto,
                descripcion: e.target.value,
              })
            }
          />

          {subiendo && (
            <p className="mt-4 text-[#f5b800]">Subiendo imagen...</p>
          )}

          {producto.imagen && (
            <div className="mt-6">
              <p className="font-bold mb-3">Vista previa:</p>

              <img
                src={producto.imagen}
                alt={producto.nombre || "Producto"}
                className="w-52 h-52 object-contain bg-white rounded-xl"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={guardando || subiendo}
            className="mt-6 bg-[#f5b800] text-black font-bold px-8 py-4 rounded-xl disabled:opacity-50"
          >
            {guardando ? "Guardando..." : "Guardar producto"}
          </button>
        </form>

        {productos.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold mb-6">
              📋 Productos publicados
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              {productos.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#181818] border border-[#333] rounded-2xl p-5"
                >
                  {item.imagen && (
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-full h-48 object-contain bg-white rounded-xl mb-4"
                    />
                  )}

                  <h3 className="font-bold text-lg">
                    {item.nombre}
                  </h3>

                  <p className="text-[#f5b800] font-bold mt-2">
                    S/ {Number(item.precio).toFixed(2)}
                  </p>

                  <button
                    type="button"
                    onClick={() => eliminarProducto(item.id)}
                    className="mt-4 bg-red-600 px-5 py-2 rounded-xl font-bold"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}