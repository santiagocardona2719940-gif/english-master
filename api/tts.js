export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
  const englishVoiceId = process.env.ELEVENLABS_ENGLISH_VOICE_ID?.trim();
  const spanishVoiceId = process.env.ELEVENLABS_SPANISH_VOICE_ID?.trim();

  const getConfig = (idioma) => {
    const esEspanol = String(idioma).toLowerCase().startsWith("es");

    return {
      esEspanol,
      voiceId: esEspanol ? spanishVoiceId : englishVoiceId,
      modelId: "eleven_multilingual_v2",
    };
  };

  if (req.method === "GET") {
    const { esEspanol, voiceId, modelId } = getConfig(req.query?.test || "en");
    const missing = [];

    if (!apiKey) missing.push("ELEVENLABS_API_KEY");

    if (!voiceId) {
      missing.push(
        esEspanol
          ? "ELEVENLABS_SPANISH_VOICE_ID"
          : "ELEVENLABS_ENGLISH_VOICE_ID"
      );
    }

    return res.status(missing.length ? 503 : 200).json({
      ok: missing.length === 0,
      provider: "elevenlabs",
      idioma: esEspanol ? "español" : "inglés",
      model: modelId,
      voiceConfigured: Boolean(voiceId),
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
      error: "El texto supera el límite de 5000 caracteres.",
    });
  }

  const { esEspanol, voiceId, modelId } = getConfig(idioma);

  if (!apiKey || !voiceId) {
    const missing = [];

    if (!apiKey) missing.push("ELEVENLABS_API_KEY");

    if (!voiceId) {
      missing.push(
        esEspanol
          ? "ELEVENLABS_SPANISH_VOICE_ID"
          : "ELEVENLABS_ENGLISH_VOICE_ID"
      );
    }

    return res.status(503).json({
      error: "Falta la configuración de ElevenLabs.",
      missing,
    });
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: texto.trim(),
          model_id: modelId,
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
      console.error("ElevenLabs error:", response.status, detail);

      let mensaje = detail;

      try {
        const json = JSON.parse(detail);
        mensaje = json?.detail?.message || json?.detail || json?.message || detail;

        if (typeof mensaje !== "string") {
          mensaje = JSON.stringify(mensaje);
        }
      } catch {
        // Conserva el mensaje original.
      }

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
    res.setHeader("X-TTS-Provider", "elevenlabs");
    res.setHeader("X-TTS-Model", modelId);

    return res.status(200).send(audio);
  } catch (error) {
    console.error("Error conectando con ElevenLabs:", error);

    return res.status(500).json({
      error: "No se pudo conectar con ElevenLabs.",
      detail: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}