import { useState } from "react";
import MysteryCard from "../components/MysteryCard";
import { starterCard } from "../data/cards";

function CardScreen() {

  const [card, setCard] = useState(starterCard);

  const revealCard = () => {
    setCard({
      ...card,
      imagenBloqueada: false
    });
  };

  return (

    <div>

      {card.imagenBloqueada ? (

        <MysteryCard
          card={card}
          onReveal={revealCard}
        />

      ) : (

        <div
          style={{
            color:"white",
            background:"#111",
            padding:"20px",
            textAlign:"center"
          }}
        >

          <h1>🐻 {card.animal}</h1>

          <p>Clan: {card.clan}</p>

          <p>Nivel: {card.nivel}</p>

          <p>⭐ {card.rareza}</p>

        </div>

      )}

    </div>

  );

}

export default CardScreen;