import Link from "next/link";


export default function Home() {

  return (

    <main className="min-h-screen bg-[#111111] text-white">


      {/* HERO */}

      <section className="px-8 py-20 text-center">


        <h1 className="text-5xl md:text-7xl font-bold mb-6">

          Compra fácil.
          <br />

          <span className="text-[#f5b800]">
            Recibe rápido.
          </span>

        </h1>



        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">

          ANNT LOGISTICS conecta productos,
          tecnología y soluciones de envío
          en una experiencia de compra moderna.

        </p>



        <div className="flex justify-center gap-5 flex-wrap">


          <Link
            href="/productos"
            className="bg-[#f5b800] text-black font-bold px-8 py-4 rounded-xl hover:bg-[#ffd700] transition"
          >
            Ver productos
          </Link>



          <Link
            href="/productos"
            className="border border-[#f5b800] text-[#f5b800] font-bold px-8 py-4 rounded-xl hover:bg-[#f5b800] hover:text-black transition"
          >
            Comprar ahora
          </Link>


        </div>


      </section>





      {/* CATEGORIAS */}


      <section className="px-8 py-10">


        <h2 className="text-3xl font-bold mb-8">
          Categorías
        </h2>



        <div className="grid md:grid-cols-4 gap-6">


          {[
            "Tecnología",
            "Moda",
            "Hogar",
            "Accesorios"
          ].map((cat)=>(


            <div
              key={cat}
              className="bg-[#181818] border border-[#2b2b2b] rounded-2xl p-8 text-center hover:border-[#f5b800] transition"
            >

              <h3 className="text-xl font-bold">
                {cat}
              </h3>

            </div>


          ))}


        </div>


      </section>





      {/* CONFIANZA */}


      <section className="px-8 py-16 text-center">


        <h2 className="text-4xl font-bold mb-5">

          La nueva forma de comprar online

        </h2>


        <p className="text-gray-400">

          Seguridad, rapidez y logística inteligente.

        </p>


      </section>



    </main>

  );

}