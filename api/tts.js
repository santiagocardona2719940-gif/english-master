
export default async function handler(req, res) {
  const required = [
    "ELEVENLABS_API_KEY",
    "ELEVENLABS_ENGLISH_VOICE_ID",
    "ELEVENLABS_SPANISH_VOICE_ID",
  ];

  const missing = required.filter(
    (name) => !process.env[name]?.trim()
  );

  res.setHeader("Cache-Control", "no-store");

  if (req.method === "GET") {
    return res.status(missing.length ? 503 : 200).json({
      ok: missing.length === 0,
      provider: "elevenlabs",
      missing,
      message: missing.length
        ? "Faltan variables de configuración."
        : "Las variables existen; falta comprobar que ElevenLabs genere el audio.",
    });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({
      error: "Método no permitido.",
    });
  }

  if (missing.length) {
    return res.status(503).json({
      error: "Faltan variables de configuración.",
      missing,
    });
  }

  const { texto, idioma = "en-US" } = req.body || {};

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

  const esEspanol = String(idioma)
    .toLowerCase()
    .startsWith("es");

  const voiceId = esEspanol
    ? process.env.ELEVENLABS_SPANISH_VOICE_ID.trim()
    : process.env.ELEVENLABS_ENGLISH_VOICE_ID.trim();

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
      const detail = await response.text();
      console.error(
        "ElevenLabs error:",
        response.status,
        detail
      );

      let mensaje = detail;

      try {
        const parsed = JSON.parse(detail);
        mensaje =
          parsed?.detail?.message ||
          parsed?.detail ||
          parsed?.message ||
          detail;

        if (typeof mensaje !== "string") {
          mensaje = JSON.stringify(mensaje);
        }
      } catch {}

      return res.status(502).json({
        error: "ElevenLabs rechazó la solicitud de audio.",
        providerStatus: response.status,
        detail: String(mensaje).slice(0, 700),
      });
    }

    const audio = Buffer.from(await response.arrayBuffer());

    if (!audio.length) {
      return res.status(502).json({
        error: "ElevenLabs devolvió un audio vacío.",
      });
    }

    res.setHeader("Content-Type", "audio/mpeg");
    return res.status(200).send(audio);
  } catch (error) {
    console.error("Error conectando con ElevenLabs:", error);

    return res.status(500).json({
      error: "No se pudo conectar con el servicio de voz.",
      detail:
        error instanceof Error
          ? error.message
          : "Error desconocido",
    });
  }
}
