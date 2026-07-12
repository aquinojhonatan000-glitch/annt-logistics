export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return Response.json(
        { error: "Falta el enlace del producto" },
        { status: 400 }
      );
    }

    const parsedUrl = new URL(url);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return Response.json(
        { error: "Enlace no válido" },
        { status: 400 }
      );
    }

    const respuesta = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131 Safari/537.36",
        "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
      },
      cache: "no-store",
    });

    if (!respuesta.ok) {
      return Response.json(
        { error: "No se pudo acceder a la página del producto" },
        { status: 400 }
      );
    }

    const html = await respuesta.text();

    const obtenerMeta = (property) => {
      const expresiones = [
        new RegExp(
          `<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`,
          "i"
        ),
        new RegExp(
          `<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`,
          "i"
        ),
        new RegExp(
          `<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`,
          "i"
        ),
      ];

      for (const expresion of expresiones) {
        const resultado = html.match(expresion);

        if (resultado?.[1]) {
          return resultado[1]
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");
        }
      }

      return "";
    };

    const nombre =
      obtenerMeta("og:title") ||
      obtenerMeta("twitter:title");

    const descripcion =
      obtenerMeta("og:description") ||
      obtenerMeta("description") ||
      obtenerMeta("twitter:description");

    const imagen =
      obtenerMeta("og:image") ||
      obtenerMeta("twitter:image");

    if (!nombre && !imagen) {
      return Response.json(
        {
          error:
            "La tienda bloqueó la importación automática de este producto",
        },
        { status: 422 }
      );
    }

    return Response.json({
      nombre,
      descripcion,
      imagen,
    });
  } catch (error) {
    console.error("Error importando producto:", error);

    return Response.json(
      { error: "Error al importar el producto" },
      { status: 500 }
    );
  }
}