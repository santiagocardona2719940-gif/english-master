export const esAzul = (pieza) => {
  return pieza && pieza === pieza.toUpperCase()
}

export const esRojo = (pieza) => {
  return pieza && pieza === pieza.toLowerCase()
}

export const caminoLibre = (
  tablero,
  desdeFila,
  desdeCol,
  hastaFila,
  hastaCol
) => {

  const dx = Math.sign(
    hastaCol - desdeCol
  )

  const dy = Math.sign(
    hastaFila - desdeFila
  )

  let f = desdeFila + dy
  let c = desdeCol + dx

  while (

    f !== hastaFila
    ||
    c !== hastaCol

  ) {

    if (tablero[f][c]) {

      return false

    }

    f += dy
    c += dx

  }

  return true

}

export const copiarTablero = (tablero) => {

  return tablero.map(
    fila => [...fila]
  )

}

export const encontrarRey = (
  tablero,
  color
) => {

  const rey =
    color === "azul"
      ? "K"
      : "k"

  for (let f = 0; f < 8; f++) {

    for (let c = 0; c < 8; c++) {

      if (tablero[f][c] === rey) {

        return [f, c]

      }

    }

  }

  return null

}

export const reyEnJaque = (
  tablero,
  color
) => {

  const rey =
    encontrarRey(
      tablero,
      color
    )

  if (!rey) return false

  const [rf, rc] = rey

  for (let f = 0; f < 8; f++) {

    for (let c = 0; c < 8; c++) {

      const pieza =
        tablero[f][c]

      if (!pieza) continue

      if (
        color === "azul"
        &&
        esRojo(pieza)
      ) {

        if (

          movimientoValido(
            tablero,
            f,
            c,
            rf,
            rc
          )

        ) {

          return true

        }

      }

      if (
        color === "rojo"
        &&
        esAzul(pieza)
      ) {

        if (

          movimientoValido(
            tablero,
            f,
            c,
            rf,
            rc
          )

        ) {

          return true

        }

      }

    }

  }

  return false

}

export const movimientoSeguro = (
  tablero,
  f,
  c,
  ff,
  cc,
  color
) => {

  const copia =
    copiarTablero(tablero)

  copia[ff][cc] =
    copia[f][c]

  copia[f][c] = ""

  return !reyEnJaque(
    copia,
    color
  )

}

export const movimientoValido = (
  tablero,
  desdeFila,
  desdeCol,
  hastaFila,
  hastaCol
) => {

  const pieza =
    tablero[desdeFila][desdeCol]

  if (!pieza) return false

  const destino =
    tablero[hastaFila][hastaCol]

  // no comer misma pieza
  if (
    destino &&
    (
      (
        esAzul(pieza)
        &&
        esAzul(destino)
      )
      ||
      (
        esRojo(pieza)
        &&
        esRojo(destino)
      )
    )
  ) {
    return false
  }

  const dx =
    hastaCol - desdeCol

  const dy =
    hastaFila - desdeFila

  const absX = Math.abs(dx)
  const absY = Math.abs(dy)
  if(dx===0 && dy===0){
return false
}
  // PEON AZUL
  if (pieza === "P") {

    if (
      dx === 0
      &&
      dy === -1
      &&
      !destino
    ) {

      return true

    }

    // doble paso inicial
    if (

      desdeFila === 6
      &&
      dx === 0
      &&
      dy === -2
      &&
      !destino
      &&
      !tablero[5][desdeCol]

    ) {

      return true

    }

    if (

      absX === 1
      &&
      dy === -1
      &&
      destino
      &&
      esRojo(destino)

    ) {

      return true

    }

    return false

  }

  // PEON ROJO
  if (pieza === "p") {

    if (
      dx === 0
      &&
      dy === 1
      &&
      !destino
    ) {

      return true

    }

    // doble paso inicial
    if (

      desdeFila === 1
      &&
      dx === 0
      &&
      dy === 2
      &&
      !destino
      &&
      !tablero[2][desdeCol]

    ) {

      return true

    }

    if (

      absX === 1
      &&
      dy === 1
      &&
      destino
      &&
      esAzul(destino)

    ) {

      return true

    }

    return false

  }

  // TORRE
  if (
    pieza.toLowerCase() === "r"
  ) {

    if (
      dx !== 0
      &&
      dy !== 0
    ) {

      return false

    }

    return caminoLibre(
      tablero,
      desdeFila,
      desdeCol,
      hastaFila,
      hastaCol
    )

  }

  // ALFIL
  if (
    pieza.toLowerCase() === "b"
  ) {

    if (
      absX !== absY
    ) {

      return false

    }

    return caminoLibre(
      tablero,
      desdeFila,
      desdeCol,
      hastaFila,
      hastaCol
    )

  }

  // CABALLO
  if (
    pieza.toLowerCase() === "n"
  ) {

    return (

      (
        absX === 2
        &&
        absY === 1
      )

      ||

      (
        absX === 1
        &&
        absY === 2
      )

    )

  }

  // REINA
  if (
    pieza.toLowerCase() === "q"
  ) {

    const valido = (

      dx === 0
      ||
      dy === 0
      ||
      absX === absY

    )

    if (!valido) {

      return false

    }

    return caminoLibre(
      tablero,
      desdeFila,
      desdeCol,
      hastaFila,
      hastaCol
    )

  }

  // REY
  if (
    pieza.toLowerCase() === "k"
  ) {

    return (

      absX <= 1
      &&
      absY <= 1

    )

  }

  return false

}

export const hayJaque = (
  tablero,
  color
) => {

  let rey = null

  for (let f = 0; f < 8; f++) {

    for (let c = 0; c < 8; c++) {

      const pieza =
        tablero[f][c]

      if (
        color === "azul"
        &&
        pieza === "K"
      ) {

        rey = [f, c]

      }

      if (
        color === "rojo"
        &&
        pieza === "k"
      ) {

        rey = [f, c]

      }

    }

  }

  if (!rey) return false

  for (let f = 0; f < 8; f++) {

    for (let c = 0; c < 8; c++) {

      const pieza =
        tablero[f][c]

      if (!pieza) continue

      if (
        color === "azul"
        &&
        esRojo(pieza)
      ) {

        if (

          movimientoValido(
            tablero,
            f,
            c,
            rey[0],
            rey[1]
          )

        ) {

          return true

        }

      }

      if (
        color === "rojo"
        &&
        esAzul(pieza)
      ) {

        if (

          movimientoValido(
            tablero,
            f,
            c,
            rey[0],
            rey[1]
          )

        ) {

          return true

        }

      }

    }

  }

  return false

}
export const hayJaqueMate = (tablero,color) => {

const rey =
color==="azul"
? "K"
: "k"

let existe=false

for(let f=0;f<8;f++){

for(let c=0;c<8;c++){

if(tablero[f][c]===rey){

existe=true

}

}

}

return !existe

}
export const moverIA = (
  tableroActual,
  setTablero,
  setTurno,
  playSound,
  hayJaque
) => {

  setTimeout(() => {

    let movimientos = []

    for (let f = 0; f < 8; f++) {

      for (let c = 0; c < 8; c++) {

        const pieza =
          tableroActual[f][c]

        if (!pieza) continue

        if (!esRojo(pieza))
          continue

        for (let ff = 0; ff < 8; ff++) {

          for (let cc = 0; cc < 8; cc++) {

            if (

              movimientoValido(
                tableroActual,
                f,
                c,
                ff,
                cc
              )

              &&

              movimientoSeguro(
                tableroActual,
                f,
                c,
                ff,
                cc,
                "rojo"
              )

            ) {

              movimientos.push({

                from: [f, c],
                to: [ff, cc]

              })

            }

          }

        }

      }

    }

    if (movimientos.length === 0) {

      alert("🏆 GANASTE")

      return

    }

    const random =

      movimientos[
        Math.floor(
          Math.random() *
          movimientos.length
        )
      ]

    const nuevo =
      tableroActual.map(
        row => [...row]
      )

    const [f, c] =
      random.from

    const [ff, cc] =
      random.to

    nuevo[ff][cc] =
      nuevo[f][c]

    nuevo[f][c] = ""

    // coronación peón rojo
    if (

      nuevo[ff][cc] === "p"
      &&
      ff === 7

    ) {

      nuevo[ff][cc] = "q"

    }

    setTablero(nuevo)

    playSound()

    if (
      hayJaque(
        nuevo,
        "azul"
      )
    ) {

      alert(
        "⚠️ JAQUE AL AZUL"
      )

    }

    setTurno("azul")

  }, 700)

}