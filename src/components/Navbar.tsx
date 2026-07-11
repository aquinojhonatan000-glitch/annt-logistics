"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Navbar(){

  const {
    usuario,
    cerrarSesion
  } = useUser();

  const router = useRouter();

  const salir = ()=>{
    cerrarSesion();
    router.push("/login");
  };

  return (

    <nav className="flex items-center justify-between px-6 py-4 bg-[#181818] shadow">

      {/* LOGO */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="ANNT LOGISTICS"
          width={140}
          height={70}
          className="w-28 md:w-36 h-auto object-contain"
          priority
        />
      </Link>


      {/* MENÚ */}
      <div className="flex items-center gap-6 text-white font-semibold">

        <Link 
          href="/"
          className="hover:text-[#f5b800] transition"
        >
          Inicio
        </Link>


        <Link 
          href="/productos"
          className="hover:text-[#f5b800] transition"
        >
          Productos
        </Link>


        <Link 
          href="/carrito"
          className="hover:text-[#f5b800] transition"
        >
          Carrito
        </Link>


        <Link 
          href="/contacto"
          className="hover:text-[#f5b800] transition"
        >
          Contacto
        </Link>


        {
          usuario ? (
            <>

              <Link
                href="/perfil"
                className="bg-white text-black px-4 py-2 rounded-xl hover:bg-gray-200 transition"
              >
                👤 {usuario.nombre}
              </Link>


              {
                usuario.rol === "admin" && (
                  <Link
                    href="/admin"
                    className="text-[#f5b800] font-bold"
                  >
                    ⚙️ Admin
                  </Link>
                )
              }


              <button
                onClick={salir}
                className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-red-600 transition"
              >
                Cerrar sesión
              </button>

            </>
          ) : (

            <Link
              href="/login"
              className="bg-[#f5b800] text-black px-5 py-2 rounded-xl font-bold hover:bg-yellow-400 transition"
            >
              Iniciar sesión
            </Link>

          )
        }

      </div>

    </nav>

  );
}