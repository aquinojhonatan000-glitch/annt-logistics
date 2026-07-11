"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const { usuario, cerrarSesion } = useUser();

  const router = useRouter();

  const salir = () => {
    cerrarSesion();
    router.push("/login");
  };


  const linkStyle = `
    px-5
    py-2
    rounded-2xl
    bg-white/10
    backdrop-blur-xl
    border
    border-white/20
    text-gray-200
    font-medium
    transition
    duration-300
    hover:text-[#f5b800]
    hover:border-[#f5b800]
    hover:shadow-[0_0_25px_rgba(245,184,0,0.6)]
  `;


  return (

    <nav className="
      flex
      items-center
      justify-between
      px-12
      py-2
      mx-4
      mt-4
      rounded-3xl
      bg-white/5
      backdrop-blur-2xl
      border
      border-white/10
      shadow-[0_8px_40px_rgba(0,0,0,0.45)]
    ">


      {/* LOGO LIBRE */}

      <Link 
        href="/"
        className="
          flex
          items-center
        "
      >
        <Image
          src="/logo.png"
          alt="ANNT LOGISTICS"
          width={340}
          height={150}
          className="
            w-80
            md:w-[22rem]
            h-auto
            object-contain
            drop-shadow-[0_0_35px_rgba(245,184,0,0.5)]
            hover:scale-105
            transition
            duration-500
          "
          priority
        />
      </Link>



      {/* MENU LIQUID GLASS */}

      <div className="
        flex
        items-center
        gap-4
      ">


        <Link href="/" className={linkStyle}>
          Inicio
        </Link>


        <Link href="/productos" className={linkStyle}>
          Productos
        </Link>


        <Link href="/carrito" className={linkStyle}>
          Carrito
        </Link>


        <Link href="/contacto" className={linkStyle}>
          Contacto
        </Link>



        {
          usuario ? (

            <>


              <Link
                href="/perfil"
                className={linkStyle}
              >
                👤 {usuario.nombre}
              </Link>



              {
                usuario.rol === "admin" && (

                  <Link
                    href="/admin"
                    className="
                      px-5
                      py-2
                      rounded-2xl
                      bg-[#f5b800]/20
                      backdrop-blur-xl
                      border
                      border-[#f5b800]
                      text-[#f5b800]
                      font-bold
                      hover:shadow-[0_0_25px_rgba(245,184,0,0.7)]
                      transition
                    "
                  >
                    ⚙️ Admin
                  </Link>

                )
              }



              <button
                onClick={salir}
                className="
                  px-5
                  py-2
                  rounded-2xl
                  bg-red-500/20
                  backdrop-blur-xl
                  border
                  border-red-400/40
                  text-white
                  hover:bg-red-600/40
                  transition
                "
              >
                Cerrar sesión
              </button>


            </>


          ) : (


            <Link
              href="/login"
              className="
                px-6
                py-2
                rounded-2xl
                bg-[#f5b800]/20
                backdrop-blur-xl
                border
                border-[#f5b800]
                text-[#f5b800]
                font-bold
                hover:bg-[#f5b800]
                hover:text-black
                hover:shadow-[0_0_30px_rgba(245,184,0,0.8)]
                transition
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