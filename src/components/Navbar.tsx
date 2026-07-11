"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const {
    usuario,
    cerrarSesion
  } = useUser();

  const router = useRouter();

  const salir = () => {
    cerrarSesion();
    router.push("/login");
  };


  return (

    <nav className="
      flex
      items-center
      justify-between
      px-6
      py-4
      bg-black
      border-b
      border-[#333]
    ">

      {/* LOGO */}
      <Link href="/">
        <Image
          src="/logo.png"
          alt="ANNT LOGISTICS"
          width={140}
          height={70}
          className="
            w-32
            md:w-40
            h-auto
            object-contain
          "
          priority
        />
      </Link>

{/* MENÚ */}
<div className="flex items-center gap-6">

  <Link 
    href="/"
    className="text-white hover:text-[#f5b800] transition"
  >
    Inicio
  </Link>

  <Link 
    href="/productos"
    className="text-white hover:text-[#f5b800] transition"
  >
    Productos
  </Link>

  <Link 
    href="/carrito"
    className="text-white hover:text-[#f5b800] transition"
  >
    Carrito
  </Link>

  <Link 
    href="/contacto"
    className="text-white hover:text-[#f5b800] transition"
  >
    Contacto
  </Link>


  {
    usuario ? (

      <>
        <Link
          href="/perfil"
          className="
          bg-[#181818]
          border
          border-[#333]
          hover:border-[#f5b800]
          text-white
          px-4
          py-2
          rounded-xl
          "
        >
          👤 {usuario.nombre}
        </Link>


        {
          usuario.rol === "admin" && (
            <Link
              href="/admin"
              className="
              text-[#f5b800]
              font-bold
              "
            >
              ⚙️ Admin
            </Link>
          )
        }


        <button
          onClick={salir}
          className="
          bg-red-600
          text-white
          px-4
          py-2
          rounded-xl
          "
        >
          Cerrar sesión
        </button>

      </>

    ) : (

      <Link
        href="/login"
        className="
        bg-[#f5b800]
        text-black
        px-5
        py-2
        rounded-xl
        font-bold
        "
      >
        Iniciar sesión
      </Link>

    )
  }

</div>
     

    </nav>

  );

}