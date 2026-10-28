
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  const required = [
    "ELEVENLABS_API_KEY",
    "ELEVENLABS_ENGLISH_VOICE_ID",
    "ELEVENLABS_SPANISH_VOICE_ID",
  ];

  const missing = required.filter(
    (name) => !process.env[name]?.trim()
  );

  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({
      error: "Método no permitido.",
    });
  }

  if (missing.length) {
    return res.status(503).json({
      ok: false,
      error: "Faltan variables de configuración.",
      missing,
    });
  }

  const test = String(req.query?.test || "").toLowerCase();

  // GET normal: comprobar únicamente la configuración.
  if (req.method === "GET" && !test) {
    return res.status(200).json({
      ok: true,
      provider: "elevenlabs",
      configured: true,
      message:
        "Variables presentes. Para probar el audio abre ?test=en o ?test=es.",
    });
  }

  if (req.method === "GET" && !["en", "es"].includes(test)) {
    return res.status(400).json({
      error: "Prueba inválida. Usa ?test=en o ?test=es.",
    });
  }

  const texto =
    req.method === "GET"
      ? test === "es"
        ? "Hola. Esta es una prueba de voz en español."
        : "Hello. This is an English voice test."
      : req.body?.texto;

  const idioma =
    req.method === "GET"
      ? test === "es" ? "es" : "en"
      : req.body?.idioma || "en-US";

  if (typeof texto !== "string" || !texto.trim()) {
    return res.status(400).json({
      error: "Falta el texto que se va a pronunciar.",
    });
  }

  if (texto.length > 5000) {
    return res.status(400).json({
      error: "El texto supera los 5000 caracteres.",
    });
  }

  const esEspanol = String(idioma).toLowerCase().startsWith("es");

  const voiceId = (
    esEspanol
      ? process.env.ELEVENLABS_SPANISH_VOICE_ID
      : process.env.ELEVENLABS_ENGLISH_VOICE_ID
  ).trim();

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY.trim(),
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: texto.trim(),
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.45,
            similarity_boost: 0.8,
            style: 0.25,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const raw = await response.text();
      console.error("ElevenLabs rechazó la solicitud:", response.status, raw);

      let detail = raw;
      try {
        const parsed = JSON.parse(raw);
        detail =
          parsed?.detail?.message ||
          parsed?.detail?.status ||
          parsed?.detail ||
          parsed?.message ||
          raw;

        if (typeof detail !== "string") {
          detail = JSON.stringify(detail);
        }
      } catch {}

      // La prueba devuelve diagnóstico en JSON.
      if (req.method === "GET") {
        return res.status(502).json({
          ok: false,
          provider: "elevenlabs",
          providerStatus: response.status,
          detail: String(detail).slice(0, 700),
          language: esEspanol ? "es" : "en",
        });
      }

      return res.status(502).json({
        error: "ElevenLabs rechazó la solicitud de audio.",
        providerStatus: response.status,
        detail: String(detail).slice(0, 700),
      });
    }

    const audio = Buffer.from(await response.arrayBuffer());

    if (!audio.length) {
      return res.status(502).json({
        ok: false,
        error: "ElevenLabs devolvió un audio vacío.",
      });
    }

    // La prueba GET confirma que se generó audio, sin mostrarlo como JSON.
    if (req.method === "GET") {
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Content-Disposition", 'inline; filename="voice-test.mp3"');
      return res.status(200).send(audio);
    }

    res.setHeader("Content-Type", "audio/mpeg");
    return res.status(200).send(audio);
  } catch (error) {
    console.error("Error conectando con ElevenLabs:", error);

    return res.status(500).json({
      ok: false,
      error: "No se pudo conectar con el servicio de voz.",
      detail:
        error instanceof Error ? error.message : "Error desconocido",
    });
  }
}
