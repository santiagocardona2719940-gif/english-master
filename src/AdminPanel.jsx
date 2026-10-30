import { useEffect, useMemo, useState } from "react";
import { supabase } from "./lib/supabase.js";
import "./AdminPanel.css";

const ADMIN_EMAIL = "santiago.cardona2719940@gmail.com";
const NIVELES = ["Principiante", "Intermedio", "Avanzado"];

const lineaVacia = () => ({ speaker: "", en: "", es: "" });

export default function AdminPanel({ volver = () => {} }) {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [ideaIA, setIdeaIA] = useState("");
  const [cantidadIA, setCantidadIA] = useState("10");
  const [generandoIA, setGenerandoIA] = useState(false);
  const [items, setItems] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({
    title: "", category: "Vida diaria", level: "Principiante",
    dialogue: [lineaVacia()], published: false
  });

  const esAdmin = session?.user?.email?.toLowerCase() === ADMIN_EMAIL;

  useEffect(() => {
    let activo = true;
    supabase.auth.getSession().then(({ data }) => {
      if (activo) {
        setSession(data.session);
        setCargando(false);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => {
      activo = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const cargarItems = async () => {
    setError("");
    const { data, error: err } = await supabase
      .from("content_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (err) {
      setError(err.message);
      return;
    }
    setItems(data || []);
  };

  useEffect(() => {
    if (esAdmin) cargarItems();
  }, [esAdmin]);

  const cambiarCampo = (campo, valor) => setForm((prev) => ({ ...prev, [campo]: valor }));
  const cambiarLinea = (index, campo, valor) => {
    setForm((prev) => ({
      ...prev,
      dialogue: prev.dialogue.map((line, i) => i === index ? { ...line, [campo]: valor } : line)
    }));
  };

  const nuevo = () => {
    setEditandoId(null);
    setForm({ title: "", category: "Vida diaria", level: "Principiante", dialogue: [lineaVacia()], published: false });
    setMensaje("");
    setError("");
  };

  const editar = (item) => {
    setEditandoId(item.id);
    setForm({
      title: item.title || "",
      category: item.category || "Vida diaria",
      level: item.level || "Principiante",
      dialogue: Array.isArray(item.dialogue) && item.dialogue.length
        ? item.dialogue.map((line) => ({ speaker: line.speaker || "", en: line.en || "", es: line.es || "" }))
        : [lineaVacia()],
      published: Boolean(item.published)
    });
    setMensaje("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const generarConIA = async () => {
    if (!ideaIA.trim()) {
      setError("Escribe una idea para la historia.");
      return;
    }
    setGenerandoIA(true);
    setError("");
    setMensaje("");
    try {
      const { data: authData } = await supabase.auth.getSession();
      const token = authData?.session?.access_token;
      if (!token) throw new Error("Tu sesión terminó. Cierra sesión e inicia nuevamente.");

      const respuesta = await fetch("/api/generate-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ idea: ideaIA.trim(), level: form.level, lines: Number(cantidadIA) }),
      });
      const resultado = await respuesta.json().catch(() => ({}));
      if (!respuesta.ok) throw new Error(resultado.error || "No se pudo generar la historia.");

      setEditandoId(null);
      setForm((prev) => ({
        ...prev,
        title: resultado.title || "Nueva historia",
        category: resultado.category || "Vida diaria",
        level: resultado.level || prev.level,
        dialogue: Array.isArray(resultado.dialogue) && resultado.dialogue.length
          ? resultado.dialogue.map((line) => ({
              speaker: line.speaker || "Narrador",
              en: line.en || "",
              es: line.es || "",
            }))
          : [lineaVacia()],
        published: false,
      }));
      setMensaje("¡Historia creada! Revísala y después pulsa Guardar historia.");
      setIdeaIA("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.message || "Ocurrió un error al generar la historia.");
    } finally {
      setGenerandoIA(false);
    }
  };

  const guardar = async (event) => {
    event.preventDefault();
    setGuardando(true);
    setError("");
    setMensaje("");
    const limpio = {
      title: form.title.trim(),
      category: form.category.trim(),
      level: form.level,
      dialogue: form.dialogue
        .map((line) => ({ speaker: line.speaker.trim() || "Narrador", en: line.en.trim(), es: line.es.trim() }))
        .filter((line) => line.en || line.es),
      published: form.published,
      updated_at: new Date().toISOString()
    };
    if (!limpio.title || !limpio.category || limpio.dialogue.length === 0) {
      setError("Escribe un título, una categoría y al menos una línea de diálogo.");
      setGuardando(false);
      return;
    }
    const request = editandoId
      ? supabase.from("content_items").update(limpio).eq("id", editandoId)
      : supabase.from("content_items").insert(limpio);
    const { error: err } = await request;
    setGuardando(false);
    if (err) {
      setError(err.message);
      return;
    }
    const textoConfirmacion = form.published ? "Contenido guardado y publicado." : "Borrador guardado.";
    nuevo();
    setMensaje(textoConfirmacion);
    await cargarItems();
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este contenido?")) return;
    const { error: err } = await supabase.from("content_items").delete().eq("id", id);
    if (err) { setError(err.message); return; }
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (editandoId === id) nuevo();
    setMensaje("Contenido eliminado.");
  };

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    setItems([]);
    nuevo();
  };

  if (cargando) return <main className="admin-shell"><p>Comprobando sesión...</p></main>;

  if (!session || !esAdmin) {
    return (
      <main className="admin-shell">
        <header className="admin-header">
          <button type="button" className="admin-back" onClick={volver}>← Volver</button>
          <span className="admin-kicker">ENGLISH MASTER · PRIVADO</span>
        </header>
        <section className="admin-login">
          <div className="admin-mark">🔐</div>
          <h1>Administrar contenido</h1>
          <p>Inicia sesión con la cuenta autorizada para crear y publicar historias.</p>
          <form onSubmit={async (e) => {
            e.preventDefault(); setError(""); setGuardando(true);
            const { data, error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
            setGuardando(false);
            if (err) setError(err.message);
            else { setSession(data.session); setPassword(""); }
          }}>
            <label>Correo administrador</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
            {error && <p className="admin-error">{error}</p>}
            <button className="admin-primary" disabled={guardando}>{guardando ? "Ingresando..." : "Iniciar sesión"}</button>
          </form>
          <p className="admin-footnote">Solo la cuenta autorizada puede modificar el contenido.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <button type="button" className="admin-back" onClick={volver}>← Volver a English Master</button>
        <div><span className="admin-kicker">PANEL PRIVADO</span><h1>Administrar contenido</h1></div>
        <button type="button" className="admin-logout" onClick={cerrarSesion}>Cerrar sesión</button>
      </header>

      <div className="admin-layout">
        <section className="admin-editor">
          <section className="admin-line" style={{ marginBottom: 24, border: "1px solid rgba(50, 220, 220, .35)", background: "rgba(20, 180, 180, .06)" }}>
            <span className="admin-kicker">CREACIÓN INTELIGENTE</span>
            <h2 style={{ marginTop: 6 }}>✨ Crear historia con IA</h2>
            <p className="admin-muted">Escribe una idea. La IA preparará el título y el diálogo en inglés y español.</p>
            <label>¿De qué quieres la historia?</label>
            <textarea value={ideaIA} onChange={(e) => setIdeaIA(e.target.value)} placeholder="Ej. Un joven llega a Nueva York y busca su primer trabajo..." rows="3" />
            <div className="admin-fields-row">
              <div>
                <label>Nivel de inglés</label>
                <select value={form.level} onChange={(e) => cambiarCampo("level", e.target.value)}>
                  {NIVELES.map((n) => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label>Número de líneas</label>
                <select value={cantidadIA} onChange={(e) => setCantidadIA(e.target.value)}>
                  <option value="8">8 líneas</option>
                  <option value="10">10 líneas</option>
                  <option value="15">15 líneas</option>
                  <option value="20">20 líneas</option>
                </select>
              </div>
            </div>
            <button type="button" className="admin-primary" onClick={generarConIA} disabled={generandoIA || !ideaIA.trim()}>
              {generandoIA ? "Creando tu historia..." : "✨ Generar historia"}
            </button>
            <p className="admin-footnote">La historia aparecerá abajo para que puedas revisarla. No se publica ni se guarda hasta que tú lo decidas.</p>
          </section>
          <div className="admin-section-heading">
            <div><span className="admin-kicker">{editandoId ? "EDITANDO" : "NUEVO CONTENIDO"}</span><h2>{editandoId ? "Editar historia" : "Crear historia"}</h2></div>
            <button type="button" className="admin-secondary" onClick={nuevo}>Limpiar</button>
          </div>
          <form onSubmit={guardar}>
            <label>Título</label>
            <input value={form.title} onChange={(e) => cambiarCampo("title", e.target.value)} placeholder="Ej. Una conversación en el aeropuerto" required />
            <div className="admin-fields-row">
              <div><label>Categoría</label><input value={form.category} onChange={(e) => cambiarCampo("category", e.target.value)} placeholder="Ej. Viajes" required /></div>
              <div><label>Nivel</label><select value={form.level} onChange={(e) => cambiarCampo("level", e.target.value)}>{NIVELES.map((n) => <option key={n}>{n}</option>)}</select></div>
            </div>
            <div className="admin-dialogue-heading"><h3>Diálogo bilingüe</h3><button type="button" className="admin-secondary" onClick={() => cambiarCampo("dialogue", [...form.dialogue, lineaVacia()])}>+ Agregar línea</button></div>
            {form.dialogue.map((line, index) => (
              <article className="admin-line" key={index}>
                <div className="admin-line-top"><strong>Línea {index + 1}</strong><button type="button" className="admin-remove" disabled={form.dialogue.length === 1} onClick={() => cambiarCampo("dialogue", form.dialogue.filter((_, i) => i !== index))}>Quitar</button></div>
                <label>Personaje</label><input value={line.speaker} onChange={(e) => cambiarLinea(index, "speaker", e.target.value)} placeholder="Ej. Ana" />
                <label>Inglés</label><textarea value={line.en} onChange={(e) => cambiarLinea(index, "en", e.target.value)} placeholder="Write the sentence in English" rows="2" />
                <label>Español</label><textarea value={line.es} onChange={(e) => cambiarLinea(index, "es", e.target.value)} placeholder="Escribe la traducción en español" rows="2" />
              </article>
            ))}
            <label className="admin-publish-toggle"><input type="checkbox" checked={form.published} onChange={(e) => cambiarCampo("published", e.target.checked)} /> Publicar inmediatamente</label>
            {error && <p className="admin-error">{error}</p>}
            {mensaje && <p className="admin-success">{mensaje}</p>}
            <button className="admin-primary" disabled={guardando}>{guardando ? "Guardando..." : editandoId ? "Guardar cambios" : "Guardar historia"}</button>
          </form>
        </section>

        <aside className="admin-list">
          <div className="admin-section-heading"><div><span className="admin-kicker">BIBLIOTECA EN LA NUBE</span><h2>Contenido guardado ({items.length})</h2></div><button type="button" className="admin-secondary" onClick={cargarItems}>Actualizar</button></div>
          {items.length === 0 ? <p className="admin-muted">Todavía no has creado contenido.</p> : items.map((item) => (
            <article className="admin-item" key={item.id}>
              <div className="admin-item-meta"><span>{item.level}</span><span className={item.published ? "is-published" : "is-draft"}>{item.published ? "Publicado" : "Borrador"}</span></div>
              <h3>{item.title}</h3><p>{item.category} · {(item.dialogue || []).length} líneas</p>
              <div className="admin-item-actions"><button type="button" onClick={() => editar(item)}>Editar</button><button type="button" className="danger" onClick={() => eliminar(item.id)}>Eliminar</button></div>
            </article>
          ))}
        </aside>
      </div>
    </main>
  );
}
