
export default async function handler(req, res) {
  const required = [
    "ELEVENLABS_API_KEY",
    "ELEVENLABS_ENGLISH_VOICE_ID",
    "ELEVENLABS_SPANISH_VOICE_ID",
  ];

  const missing = required.filter((name) => !process.env[name]);

  if (req.method === "GET") {
    res.setHeader("Cache-Control", "no-store");
    return res.status(missing.length ? 503 : 200).json({
      ok: missing.length === 0,
      provider: "elevenlabs",
      missing,
      message: missing.length
        ? "Faltan variables de voz en la configuración."
        : "El servicio de voz está configurado.",
    });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

  if (missing.length) {
    return res.status(503).json({
      error: "Falta configurar el servicio de voz neuronal.",
      missing,
    });
  }

  const { texto, idioma = "en-US" } = req.body || {};

  if (typeof texto !== "string" || !texto.trim()) {
    return res.status(400).json({ error: "Falta el texto que se va a pronunciar." });
  }

  if (texto.length > 5000) {
    return res.status(400).json({ error: "El texto supera el límite de 5000 caracteres." });
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
          text: texto,
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
      console.error("Error del proveedor de voz:", response.status, detail);
      return res.status(502).json({
        error: "El proveedor de voz no pudo generar el audio. Revisa la clave y los ID de voz.",
      });
    }

    const audio = Buffer.from(await response.arrayBuffer());
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(audio);
  } catch (error) {
    console.error("Error al generar voz:", error);
    return res.status(500).json({ error: "No se pudo conectar con el servicio de voz." });
  }
}
