"use client";

import Link from "next/link";
import { useProducts } from "@/context/ProductContext";

export default function Home() {
  const { productos } = useProducts();

  const destacados = productos?.slice(0, 4) || [];

  const categorias = [
    {
      nombre: "Electrónica",
      icono: "💻",
    },
    {
      nombre: "Moda",
      icono: "👕",
    },
    {
      nombre: "Hogar",
      icono: "🏠",
    },
    {
      nombre: "Accesorios",
      icono: "✨",
    },
    {
      nombre: "Gaming",
      icono: "🎮",
    },
    {
      nombre: "Belleza",
      icono: "💄",
    },
  ];

  return (
    <main className="min-h-screen">

      {/* HERO */}
      <section className="text-center px-6 py-20">
        <h1 className="text-5xl md:text-7xl font-bold">
          ANNT <span className="text-[#f5b800]">LOGISTICS</span>
        </h1>

        <h2 className="text-3xl md:text-5xl font-bold mt-6">
          Compra fácil.
          <br />
          Recibe rápido.
        </h2>

        <p className="text-gray-400 mt-6 text-lg">
          Descubre productos de tecnología, moda y hogar
          <br />
          con una experiencia de compra moderna, segura y rápida.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            href="/productos"
            className="btn-gold px-8 py-4"
          >
            🛒 Ver productos
          </Link>

          <Link
            href="/productos"
            className="
              border
              border-[#f5b800]
              text-[#f5b800]
              font-bold
              px-8
              py-4
              rounded-xl
              hover:bg-[#f5b800]
              hover:text-black
              transition
            "
          >
            Comprar ahora
          </Link>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-10">
          🔥 Productos destacados
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destacados.map((producto: any) => (
            <div
              key={producto.id}
              className="
                card-dark
                p-5
                hover:-translate-y-2
                transition
                duration-300
              "
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="
                  w-full
                  h-52
                  object-contain
                  bg-white
                  rounded-2xl
                "
              />

              <h3 className="font-bold text-xl mt-4">
                {producto.nombre}
              </h3>

              <p className="text-[#f5b800] font-bold text-xl mt-2">
                S/ {Number(producto.precio).toFixed(2)}
              </p>

              <Link
                href="/productos"
                className="block text-center mt-5 btn-gold"
              >
                Ver producto
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORÍAS ANIMADAS */}
      <section className="py-16 overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-10">
          Explora nuestras categorías
        </h2>

        <div className="flex gap-6 w-max animate-scroll">
          {[...categorias, ...categorias].map((cat, index) => (
            <Link
              key={index}
              href={`/productos?categoria=${encodeURIComponent(cat.nombre)}`}
              className="
                card-dark
                w-52
                p-8
                text-center
                hover:border-[#f5b800]
                hover:-translate-y-3
                transition
                duration-300
                cursor-pointer
              "
            >
              <div className="text-5xl">
                {cat.icono}
              </div>

              <h3 className="font-bold text-xl mt-4">
                {cat.nombre}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* CONFIANZA */}
      <section className="text-center px-6 py-20">
        <h2 className="text-4xl font-bold">
          La nueva forma de comprar online
        </h2>

        <p className="text-gray-400 mt-5 text-lg">
          Seguridad, rapidez y logística inteligente.
          <br />
          Trabajamos para llevar tus productos hasta donde estés.
        </p>
      </section>

    </main>
  );
}