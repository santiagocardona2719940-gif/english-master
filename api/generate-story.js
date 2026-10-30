
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    return res.status(503).json({
      error: "Falta configurar OPENAI_API_KEY en las variables de entorno de Vercel.",
    });
  }

  const authorization = req.headers.authorization || "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : "";

  const supabaseUrl = (
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    ""
  ).replace(/\/$/, "");

  const publishableKey =
    req.headers.apikey ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!token || !supabaseUrl || !publishableKey) {
    return res.status(401).json({
      error: "No se pudo verificar tu sesión de administrador.",
    });
  }

  try {
    const authResponse = await fetch(
      `${supabaseUrl}/auth/v1/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          apikey: publishableKey,
        },
      }
    );

    if (!authResponse.ok) {
      return res.status(401).json({
        error: "Tu sesión no es válida. Inicia sesión nuevamente.",
      });
    }

    const user = await authResponse.json();

    if (
      (user.email || "").toLowerCase() !==
      "santiago.cardona2719940@gmail.com"
    ) {
      return res.status(403).json({
        error: "Esta función está reservada para el administrador.",
      });
    }

    const {
      idea,
      level = "Principiante",
      lines = 10,
    } = req.body || {};

    const cantidad = Number(lines);

    if (
      typeof idea !== "string" ||
      idea.trim().length < 5 ||
      idea.length > 500
    ) {
      return res.status(400).json({
        error: "Escribe una idea de entre 5 y 500 caracteres.",
      });
    }

    if (
      !["Principiante", "Intermedio", "Avanzado"].includes(level)
    ) {
      return res.status(400).json({
        error: "Selecciona un nivel válido.",
      });
    }

    if (![8, 10, 15, 20].includes(cantidad)) {
      return res.status(400).json({
        error: "Selecciona 8, 10, 15 o 20 líneas.",
      });
    }

    const schema = {
      type: "object",
      properties: {
        title: { type: "string" },
        category: { type: "string" },
        level: {
          type: "string",
          enum: ["Principiante", "Intermedio", "Avanzado"],
        },
        dialogue: {
          type: "array",
          items: {
            type: "object",
            properties: {
              speaker: { type: "string" },
              en: { type: "string" },
              es: { type: "string" },
            },
            required: ["speaker", "en", "es"],
            additionalProperties: false,
          },
        },
      },
      required: ["title", "category", "level", "dialogue"],
      additionalProperties: false,
    };

    const aiResponse = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          instructions:
            "Eres un autor y profesor experto en enseñar inglés a hispanohablantes. Crea historias breves, naturales, entretenidas y educativas. Devuelve exclusivamente los datos solicitados. Cada intervención debe tener una frase en inglés natural y su traducción fiel al español latinoamericano. Usa vocabulario y gramática adecuados al nivel solicitado. Alterna personajes cuando sea diálogo. Evita traducciones literales extrañas. No agregues numeración dentro de las frases.",
          input: `Crea una historia basada en esta idea: ${idea.trim()}
Nivel: ${level}.
Debe contener exactamente ${cantidad} intervenciones.
Devuelve el título, una categoría corta, el nivel y el diálogo bilingüe.`,
          text: {
            format: {
              type: "json_schema",
              name: "english_master_story",
              strict: true,
              schema,
            },
          },
          max_output_tokens: 4000,
        }),
      }
    );

    const payload = await aiResponse.json().catch(() => ({}));

    if (!aiResponse.ok) {
      const detail =
        payload?.error?.message ||
        "El servicio de IA no pudo crear la historia.";

      return res
        .status(aiResponse.status === 429 ? 429 : 502)
        .json({ error: detail });
    }

    const outputText = (payload.output || [])
      .flatMap((item) => item.content || [])
      .find((item) => item.type === "output_text")?.text;

    if (!outputText) {
      return res.status(502).json({
        error: "La IA no devolvió una historia. Inténtalo otra vez.",
      });
    }

    const story = JSON.parse(outputText);

    if (
      !Array.isArray(story.dialogue) ||
      story.dialogue.length !== cantidad
    ) {
      return res.status(502).json({
        error: "La historia llegó incompleta. Inténtalo nuevamente.",
      });
    }

    return res.status(200).json(story);

  } catch (error) {
    console.error("Error generando historia:", error);

    return res.status(500).json({
      error: "Ocurrió un error al crear la historia. Inténtalo nuevamente.",
    });
  }
}
