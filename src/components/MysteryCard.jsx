function MysteryCard({ card, onReveal }) {
  return (
    <div
      style={{
        width: "280px",
        padding: "20px",
        border: "2px solid #444",
        borderRadius: "20px",
        background: "#111",
        color: "white",
        textAlign: "center",
      }}
    >
      <h2>❓ Carta Misteriosa</h2>

      <p>Imagen bloqueada</p>

      <p>{card.recuerdo}</p>

      <button onClick={onReveal}>
        Revelar carta
      </button>
    </div>
  );
}

export default MysteryCard;