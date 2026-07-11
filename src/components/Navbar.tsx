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

  return (
    <nav className="bg-[#111] border-b border-[#333] px-4 md:px-8 py-3">
      <div className="flex items-center justify-between gap-4">

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

        {/* USUARIO */}
        <div className="flex items-center gap-3 flex-wrap justify-end">
          {usuario ? (
            <>
              <Link
                href="/perfil"
                className="bg-[#181818] px-4 py-2 rounded-xl"
              >
                👤 {usuario.nombre}
              </Link>

              {usuario.rol === "admin" && (
                <Link
                  href="/admin"
                  className="text-[#f5b800] font-bold"
                >
                  ⚙️ Admin
                </Link>
              )}

              <button
                onClick={salir}
                className="bg-red-500 px-4 py-2 rounded-xl font-bold text-white"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-[#f5b800] text-black px-5 py-2 rounded-xl font-bold"
            >
              Iniciar sesión
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}