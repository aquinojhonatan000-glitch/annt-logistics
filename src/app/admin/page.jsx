
"use client";

import Link from "next/link";

export default function Admin() {

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white p-6 md:p-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          ⚙️ ANNT LOGISTICS ADMIN
        </h1>


        <div className="grid md:grid-cols-2 gap-5">


          <Link
            href="/admin/pedidos"
            className="
            bg-[#f5b800]
            text-black
            font-bold
            px-6
            py-6
            rounded-2xl
            text-xl
            "
          >
            📦
            <br />
            Ver pedidos de clientes
          </Link>



          <Link
            href="/admin/productos"
            className="
            bg-[#222]
            text-white
            font-bold
            px-6
            py-6
            rounded-2xl
            text-xl
            "
          >
            🛍️
            <br />
            Administrar productos
          </Link>


        </div>


      </div>

    </main>
  );
}