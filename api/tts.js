
export default async function handler(req, res) {
  const required = [
    "ELEVENLABS_API_KEY",
    "ELEVENLABS_ENGLISH_VOICE_ID",
    "ELEVENLABS_SPANISH_VOICE_ID",
  ];

  const missing = required.filter((name) => !process.env[name]);

  res.setHeader("Cache-Control", "no-store");

  if (req.method === "GET") {
    return res.status(missing.length ? 503 : 200).json({
      ok: missing.length === 0,
      provider: "elevenlabs",
      missing,
      message: missing.length
        ? "Faltan variables de entorno."
        : "Las variables existen; falta comprobar la autenticación y el audio.",
    });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

  if (missing.length) {
    return res.status(503).json({
      error: "Faltan variables de entorno.",
      missing,
    });
  }

  const { texto, idioma = "en-US" } = req.body || {};

  if (typeof texto !== "string" || !texto.trim()) {
    return res.status(400).json({ error: "No se recibió texto para pronunciar." });
  }

  if (texto.length > 5000) {
    return res.status(400).json({ error: "El texto supera los 5000 caracteres." });
  }

  const esEspanol = String(idioma).toLowerCase().startsWith("es");
  const voiceId = esEspanol
    ? process.env.ELEVENLABS_SPANISH_VOICE_ID
    : process.env.ELEVENLABS_ENGLISH_VOICE_ID;

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
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
      const detail = (await response.text()).slice(0, 1500);
      console.error("ElevenLabs respondió con error:", response.status, detail);

      return res.status(502).json({
        error: "ElevenLabs no pudo generar el audio.",
        providerStatus: response.status,
        detail,
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
    console.error("Error de conexión con ElevenLabs:", error);

    return res.status(500).json({
      error: "No se pudo conectar con ElevenLabs.",
    });
  }
}
