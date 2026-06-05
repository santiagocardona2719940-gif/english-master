import { useState, useEffect, useRef } from 'react'
import { frases } from './frases'
import { intermedio } from './intermedio'
import { academiaMesero } from './academiaMesero'
import { academiaBarista } from './academiaBarista'
import { academiaBartender } from './academiaBartender'
import { academiaHotel } from './academiaHotel'
import { academiaUber } from './academiaUber'
import { academiaCajero } from './academiaCajero'
import { academiaDelivery } from './academiaDelivery'
import { academiaPeluquero } from './academiaPeluquero'
import { cartasIniciales } from "./chessCards"
import { historia } from "./historia.js";
import { cartasHistoria } from "../public/cartasHistoria/assets/cartasHistoria.js";


import './App.css'

import {
movimientoValido,
esAzul,
esRojo,
hayJaque,
hayJaqueMate
} from "./chess.js"
import { poderes } from "./poderes"
function App() {

  const [checkpoint, setCheckpoint] = useState(0)
  const mezclarArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5)
}
  // 🔐 progreso segurof
  let progreso = {}
  try {
    progreso = JSON.parse(localStorage.getItem("progreso")) || {}
  } catch {
    progreso = {}
  }

  const generarDescripcion = (animal) => {
   console.log("APP OK")
console.log(intermedio)
    return `✨ ${animal} místico del reino ancestral
⚔️ guardián de energía secreta
🌌 su poder despierta cuando lo necesitas`
  }

  const [cartaNueva, setCartaNueva] = useState(null)
  const [modo, setModo] = useState("menu")
  const tableroInicial = [

["r","n","b","q","k","b","n","r"],
["p","p","p","p","p","p","p","p"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["P","P","P","P","P","P","P","P"],
["R","N","B","Q","K","B","N","R"]

]

const [tablero,setTablero] =
useState(tableroInicial)

const [seleccion,setSeleccion] =
useState(null)
const movimientoPosible = (fila,col) => {

if(!seleccion) return false

const [f,c] = seleccion
if(
f===fila &&
c===col
){
setSeleccion(null)
return
}  
return movimientoValido(
tablero,
f,
c,
fila,
col
)

}

const [energia,setEnergia] =
useState(10)

const [cartasAjedrez,setCartasAjedrez] =
useState([])
const [mazoBatalla,setMazoBatalla] =
useState([])

const [coleccionCartas,setColeccionCartas] =
useState([])

const [cartaSeleccionada,setCartaSeleccionada] =
useState(null)
const [modoCarta,setModoCarta] =
useState(false)
const [categoriaCarta,setCategoriaCarta] =
useState("")
const [turno,setTurno] =
useState("azul")
const [modoAjedrez,setModoAjedrez] =
useState("ia")
const [ultimaJugada,setUltimaJugada] =
useState(null)


const piezasUnicode = {

P:"♙",
R:"♖",
N:"♘",
B:"♗",
Q:"♕",
K:"♔",

p:"♟",
r:"♜",
n:"♞",
b:"♝",
q:"♛",
k:"♚"

}
const moverIA = (
tableroActual,
setTablero,
setTurno,
playSound,
hayJaque,
playLevelUp,
setDinero,
setGemas,
setCartas
) => {

setTimeout(()=>{

let movimientos=[]

for(let f=0;f<8;f++){

for(let c=0;c<8;c++){

const pieza =
tableroActual[f][c]

if(!pieza) continue

if(!esRojo(pieza))
continue

for(let ff=0;ff<8;ff++){

for(let cc=0;cc<8;cc++){

if(

movimientoValido(
tableroActual,
f,
c,
ff,
cc
)

){
if(

f===ff

&&

c===cc

){

continue

}
movimientos.push({

from:[f,c],
to:[ff,cc]

})

}

}

}

}

}

if(movimientos.length===0){

playLevelUp()

setDinero(prev=>prev+100)

setGemas(prev=>prev+5)

alert("♚ JAQUE MATE 🔥")

const nuevaCarta={

animal:"♟️ Rey conquistado",

deseo:"Ganaste una partida",

imagen:"/cards.png",

id:Date.now(),

tipo:"ajedrez"

}

setCartas(prev=>{

const nuevas=[
...prev,
nuevaCarta
]

localStorage.setItem(
"cartas",
JSON.stringify(nuevas)
)

return nuevas

})

return

}

let mejorMovimiento = movimientos[0]

let mejorValor = -999

movimientos.forEach(m => {

const [ff,cc] = m.to

const piezaObjetivo =
tableroActual[ff][cc]

let valor = 0

if(piezaObjetivo==="P") valor=1
if(piezaObjetivo==="N") valor=3
if(piezaObjetivo==="B") valor=3
if(piezaObjetivo==="R") valor=5
if(piezaObjetivo==="Q") valor=9
if(piezaObjetivo==="K") valor=100

if(valor > mejorValor){

mejorValor = valor

mejorMovimiento = m

}

})

const random = mejorMovimiento

const nuevo =
tableroActual.map(
row => [...row]
)

const [f,c] = random.from
const [ff,cc] = random.to

nuevo[ff][cc] =
nuevo[f][c]

nuevo[f][c] = ""

setTablero(nuevo)

setUltimaJugada([
[f,c],
[ff,cc]
])

playSound()

try{

if(hayJaque(nuevo,"azul")){

alert("⚠️ JAQUE AL AZUL")

}

}catch(e){

console.log(e)

}

setTurno("azul")
},700)

}


const clickCelda = (fila,col) => {



if(!seleccion){

const pieza = tablero[fila][col]
if(
modoCarta &&
cartaSeleccionada
){

alert(
"Poder activado: " +
cartaSeleccionada.nombre
)

setModoCarta(false)

return

}
if(!pieza) return

if(
(turno==="azul" && !esAzul(pieza))
||
(turno==="rojo" && esAzul(pieza))
){
return
}

setSeleccion([fila,col])

return

}

const [f,c] = seleccion

if(

movimientoValido(
tablero,
f,
c,
fila,
col
)

){

const nuevo =
tablero.map(
row => [...row]
)
const piezaCapturada =
nuevo[fila][col]
nuevo[fila][col] =
nuevo[f][c]

nuevo[f][c] = ""

setTablero(nuevo)

setSeleccion(null)

if(piezaCapturada){

playCapture()

}else{

playSound()

}

if(hayJaqueMate(nuevo,"rojo")){

playLevelUp()

alert("👑 JAQUE MATE 🔥")

setDinero(prev=>prev+200)

setGemas(prev=>prev+10)

setModo("menu")

return

}

if(modoAjedrez==="ia"){

setTurno("rojo")
console.log("LLAMANDO IA")
moverIA(
nuevo,
setTablero,
setTurno,
playSound,
hayJaque,
playLevelUp,
setDinero,
setGemas,
setCartas
)

}else{

setTurno(
turno==="azul"
? "rojo"
: "azul"
)

}

return

if(hayJaque(nuevo,"rojo")){

alert("⚠️ JAQUE AL ROJO")

}



}

setSeleccion(null)

}




  const [profesion, setProfesion] = useState("")
  const [i, setI] = useState(progreso.i || 0)
  const [vidas, setVidas] = useState(progreso.vidas || 3)
  const [puntos, setPuntos] = useState(progreso.puntos || 0)
  const [combo,setCombo]=useState(0)
  const [racha,setRacha]=useState(1)
  const [dinero, setDinero] = useState(0)
  const [gemas,setGemas]=useState(0)
  const [tiempo, setTiempo] = useState(500)
  const [estres, setEstres] = useState(0)
  const [respuesta, setRespuesta] = useState([])
  const [mezcladas, setMezcladas] = useState([])
  const [repeticiones, setRepeticiones] = useState(0)
  console.log("FRASE:", frases[i])
console.log("MEZCLADAS:", mezcladas)
  const [mensaje, setMensaje] = useState("")
  const [terminado, setTerminado] = useState(false)
  const [mostrarCofre, setMostrarCofre] = useState(false)
  
  const [datosCarta, setDatosCarta] = useState({
    animal: "",
    historia: "",
    deseo: ""
  })

  const [cartas, setCartas] = useState([])
  const [usuario,setUsuario]=useState(

JSON.parse(
localStorage.getItem("usuario")
)

||

{

nombre:"Jugador",
correo:"",
clan:"",
animalInicial:""

}

)

  const [recuerdo,setRecuerdo]=useState({

  animal:"",
  historia:"",
  emocion:""

   })
useEffect(() => {
  const guardadas = localStorage.getItem("cartas")

  if (guardadas) {

    const cartasGuardadas =
      JSON.parse(guardadas)

    setCartas(cartasGuardadas)

    setColeccionCartas(
      cartasGuardadas.map((carta,index)=>({

        id:index+1,

        nombre:carta.animal,

        energia:1,

        imagen:carta.imagen,

        descripcion:carta.deseo

      }))
    )

  }

}, [])

  const [imgUrl, setImgUrl] = useState("")

  // 🔥 INTERMEDIO
  const [iIntermedio, setIIntermedio] = useState(progreso.iIntermedio || 0)
  const [mensajeIntermedio, setMensajeIntermedio] = useState("")
  const [iMesero, setIMesero] = useState(0)
  const [capituloMesero, setCapituloMesero] = useState(0)
  const [iBarista,setIBarista]=useState(0)
const [capitulosComprados,
setCapitulosComprados]=useState(

JSON.parse(
localStorage.getItem(
"capitulosComprados"
)
)||[]

)
const [mensajeBarista,setMensajeBarista]=
useState("")

const [opcionesBarista,
setOpcionesBarista]=
useState([])
  const [mensajeMesero, setMensajeMesero] = useState("")
  const [evento, setEvento] = useState("")
  const eventosJuego=[

"⚡ Doble XP",
"💰 Propina extra",
"🎁 Carta misteriosa",
"🔥 Combo activo",
"⭐ Bonus secreto"
,
"🍸 Cliente VIP llegó",
"🎵 Música demasiado alta",
"💵 Propina enorme",
"🚨 Cliente molesto",
"🥤 Bebida derramada",
"👮 Inspección sorpresa",
"🎉 Fiesta privada",
"🔥 Hora pico"
]
  const [opcionesMesero, setOpcionesMesero] = useState([])
  const [escuchando, setEscuchando] = useState(false)
 



  const clientes=[



"😎 Turista",
"🤠 Cowboy",
"👵 Abuela",
"🕵️ Detective",
"🤖 Robot",
"👑 Rey"

]

const [cliente,setCliente]=
useState("😎")

  const [textoUsuario, setTextoUsuario] = useState("")
  const [resultadoVoz, setResultadoVoz] = useState([])
  const [opcionesMezcladas, setOpcionesMezcladas] = useState([])
  const climas=[

"☀️ Soleado",
"🌧️ Lluvia",
"⛈️ Tormenta",
"🌙 Noche",
"❄️ Nieve"

]

const [clima,setClima]=
useState("☀️ Soleado")
  const [logros,setLogros]=useState([])
  const recompensasJuego=[

// PRINCIPIANTE

{
modo:"aprender",
nivel:10,
animal:"📘 Primeras palabras",
poder:"+10 XP",
deseo:"Has aprendido frases básicas",
imagen:"/principiante1.png"
},

{
modo:"aprender",
nivel:20,
animal:"🗣️ Conversador",
poder:"+20 XP",
deseo:"Ahora entiendes conversaciones",
imagen:"/principiante2.png"
},

// INTERMEDIO

{
modo:"intermedio",
nivel:5,
animal:"💬 Conversación básica",
poder:"+10 monedas",
deseo:"Entiendes respuestas simples",
imagen:"/intermedio1.png"
},

// MESERO

{
modo:"meseroJuego",
nivel:10,
animal:"🍽️ Mesero aprendiz",
poder:"+15 monedas",
deseo:"Servicio inicial dominado",
imagen:"/mesero1.png"
},

// BARISTA

{
modo:"baristaJuego",
nivel:1,
animal:"🌆 Llegando a Nueva York",
poder:"Aprendiz",
deseo:"+10 experiencia",
imagen:"/cap1.png"
},

{
modo:"baristaJuego",
nivel:2,
animal:"📋 Primer trabajo",
poder:"Trabajador",
deseo:"+5 monedas",
imagen:"/cap2.png"
},

{
modo:"baristaJuego",
nivel:3,
animal:"☕ Primer café",
poder:"Espresso Inicial",
deseo:"+1 gema",
imagen:"/cap3.png"
},

// BARTENDER

{
modo:"bartenderJuego",
nivel:1,
animal:"🍸 Primer trago",
poder:"Aprendiz",
deseo:"+10 experiencia",
imagen:"/bartender1.png"
},

{
modo:"bartenderJuego",
nivel:2,
animal:"🔥 Servicio rápido",
poder:"Velocidad",
deseo:"+5 monedas",
imagen:"/bartender2.png"
},

{
modo:"bartenderJuego",
nivel:3,
animal:"👑 Maestro del Bar",
poder:"Propina extra",
deseo:"+1 gema",
imagen:"/bartender3.png"
},
// HOTEL
{
modo:"hotelJuego",
nivel:1,
animal:"🏨 Recepcionista",
poder:"Bienvenida",
deseo:"+10 experiencia",
imagen:"/hotel1.png"
},

// UBER
{
modo:"uberJuego",
nivel:1,
animal:"🚕 Conductor",
poder:"Ruta rápida",
deseo:"+10 experiencia",
imagen:"/uber1.png"
},

// DELIVERY
{
modo:"deliveryJuego",
nivel:1,
animal:"📦 Repartidor",
poder:"Entrega veloz",
deseo:"+10 experiencia",
imagen:"/delivery1.png"
},

// CAJERO
{
modo:"cajeroJuego",
nivel:1,
animal:"🛒 Cajero experto",
poder:"Cobro rápido",
deseo:"+10 experiencia",
imagen:"/cajero1.png"
},

// PELUQUERO
{
modo:"peluqueroJuego",
nivel:1,
animal:"💇 Estilista",
poder:"Nuevo corte",
deseo:"+10 experiencia",
imagen:"/peluquero1.png"
}
]

const desbloquearLogro=(nombre)=>{

if(!logros.includes(nombre)){

setLogros(prev=>[...prev,nombre])

playLevelUp()

alert("🏆 Nuevo logro: "+nombre)

}

}
const desbloquearCarta=(modoActual,nivelActual)=>{

const recompensa=

recompensasJuego.find(

r=>

r.modo===modoActual

&&

r.nivel===nivelActual

)
if(nivelActual % 15 === 0){

const nuevaCarta={

animal:"🏆 Checkpoint "+nivelActual,

poder:"+100 XP",

deseo:"Has alcanzado el nivel "+nivelActual,

imagen:"/cards.png",

id:Date.now(),

checkpoint:nivelActual,

tipo:modoActual

}

setCartas(prev=>{

const nuevas=[...prev,nuevaCarta]

localStorage.setItem(
"cartas",
JSON.stringify(nuevas)
)

return nuevas

})

setCartaNueva(nuevaCarta)

setMostrarCofre(true)

return

}
if(!recompensa)return

const existe=

cartas.some(

c=>

c.animal===recompensa.animal

)

if(existe)return
const imagenCarta = cartasHistoria[0].imagen

const nuevaCarta = {
  ...recompensa,
  imagen: imagenCarta,
  id: Date.now(),
  checkpoint: nivelActual,
  tipo: modoActual
}

setCartas(prev=>{

const nuevas=[

...prev,
nuevaCarta

]

localStorage.setItem(

"cartas",
JSON.stringify(nuevas)

)

return nuevas

})

setCartaNueva(
nuevaCarta
)

setMostrarCofre(
true
)

}
  // 💾 Guardar cartas SIN imagen pesada
  useEffect(()=>{

const random=

climas[
Math.floor(
Math.random()*climas.length
)
]

setClima(random)

},[iMesero])
  useEffect(() => {

  if (modo === "meseroJuego" && academiaMesero[0]?.frases[iMesero]) {

    setOpcionesMesero(
  mezclarArray(
    academiaMesero[0]?.frases[iMesero]?.opciones || []
  )
)

hablar(
  academiaMesero[0]?.frases[iMesero]?.pregunta
)
  }

}, [iMesero, modo])
 useEffect(()=>{

const academiaActual =

modo==="baristaJuego"
? academiaBarista :

modo==="bartenderJuego"
? academiaBartender :

modo==="hotelJuego"
? academiaHotel :

modo==="uberJuego"
? academiaUber :

modo==="deliveryJuego"
? academiaDelivery :

modo==="cajeroJuego"
? academiaCajero :

modo==="peluqueroJuego"
? academiaPeluquero :

null

const frase=
academiaActual?.[0]?.frases[iBarista]

if(

(
modo==="baristaJuego"

||

modo==="bartenderJuego"

||

modo==="hotelJuego"

||

modo==="uberJuego"

||

modo==="deliveryJuego"

||

modo==="cajeroJuego"

||

modo==="peluqueroJuego"

)

&&

frase

){

setOpcionesBarista(

mezclarArray(
frase?.opciones || []
)

)

if(frase){

hablar(
frase?.pregunta
)

}

}

},[iBarista,modo])
useEffect(() => {

  setCliente(

    clientes[
      Math.floor(
        Math.random() * clientes.length
      )
    ]

  )

}, [iMesero])
  // 💾 Guardar progreso
  useEffect(() => {
  localStorage.setItem("progreso", JSON.stringify({
    i,
    vidas,
    puntos,
    iIntermedio
  }))
}, [i, vidas, puntos, iIntermedio])
  useEffect(() => {
  if (modo === "intermedio" && intermedio[iIntermedio]) {
   hablar(intermedio[iIntermedio].pregunta)
  }
}, [iIntermedio, modo])
  
  useEffect(() => {
  if (modo === "intermedio" && intermedio[iIntermedio]) {
    setOpcionesMezcladas(
      mezclarArray(intermedio[iIntermedio].opciones)
    )
  }
}, [iIntermedio, modo])

useEffect(() => {

  if (modo !== "meseroJuego") return

  if (tiempo <= 0) {

    playWrong()

    setVidas(v => {

    if (v <= 1) {

  alert("💀 Game Over")

  setModo("menu")

  return 0
}

      return v - 1

    })

    setTiempo(10)

    return
  }

  const timer = setTimeout(() => {
    setTiempo(prev => prev - 1)
  }, 1000)

  return () => clearTimeout(timer)

}

, [tiempo, modo])
  // 🔊 voz
const hablar = (texto, onEnd) => {

  // 🚫 NO hablar si es la traducción (español)
  if (texto === intermedio[iIntermedio]?.traduccion) return

  // ✅ SOLO habla preguntas (inglés)
  const msg = new SpeechSynthesisUtterance(texto)
  msg.lang = "en-US"
  msg.rate = 0.85

  msg.onend = () => {
    if (onEnd) onEnd()
  }

  speechSynthesis.cancel()
  speechSynthesis.speak(msg)
}

  // 🚀 iniciar principiante
  const iniciarAprender = () => {
    setModo("aprender")
    setVidas(3)
    setRespuesta([])
    setMensaje("")
   setRepeticiones(0)
   hablar(frases[i][0])

const palabras = frases[i][0].split(" ")
    setMezcladas([...palabras].sort(() => Math.random() - 0.5))
  }

  // 🚀 iniciar intermedio
const iniciarIntermedio = () => {

  setModo("intermedio")

  setMensajeIntermedio("")

  setVidas(3)

}

  // 🔊 sonido
  
  const [ctx] = useState(() =>
    
    typeof window !== "undefined"
      ? new (window.AudioContext || window.webkitAudioContext)()
      : null
  )
const musicaRef = useRef(null)
const reproducirMusica=(ruta)=>{

if(!musicaRef.current)return

musicaRef.current.pause()

musicaRef.current.src=ruta

musicaRef.current.play()
.catch(()=>{})

}
  const playCorrect = () => {
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.frequency.value = 700 // sonido más alto (correcto)
  gain.gain.value = 0.1

  osc.start()
  osc.stop(ctx.currentTime + 0.2)
}

const playWrong = () => {
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.frequency.value = 200 // sonido grave (incorrecto)
  gain.gain.value = 0.1

  osc.start()
  osc.stop(ctx.currentTime + 0.3)
}
const playLevelUp = () => {
  if (!ctx) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.frequency.setValueAtTime(400, ctx.currentTime)

  osc.frequency.exponentialRampToValueAtTime(
    1000,
    ctx.currentTime + 0.4
  )

  gain.gain.value = 0.1

  osc.start()
  osc.stop(ctx.currentTime + 0.5)
}

const playCoin = () => {

 if(!ctx) return

 const osc=ctx.createOscillator()
 const gain=ctx.createGain()

 osc.connect(gain)
 gain.connect(ctx.destination)

 osc.frequency.value=900

 gain.gain.value=.08

 osc.start()

 osc.stop(ctx.currentTime+.1)

}
const playCapture = () => {

if(!ctx) return

const osc = ctx.createOscillator()
const gain = ctx.createGain()

osc.connect(gain)
gain.connect(ctx.destination)

osc.frequency.value = 120

gain.gain.value = 0.12

osc.start()

osc.frequency.exponentialRampToValueAtTime(
40,
ctx.currentTime + 0.3
)

osc.stop(ctx.currentTime + 0.3)

}
const playSound = () => {

  if(!ctx) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.frequency.value = 500
  gain.gain.value = 0.05

  osc.start()
  osc.stop(ctx.currentTime + 0.15)

}
const escucharRespuesta = (respuestaCorrecta) => {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition

  if (!SpeechRecognition) {

    alert("Tu navegador no soporta voz")

    return
  }

  const recognition = new SpeechRecognition()
recognition.continuous = false
recognition.interimResults = false
recognition.lang = "en-US"

recognition.onstart = () => {

setEscuchando(true)

if(modo==="vozBarista"){

setMensajeBarista("🎙️ escuchando...")

}else{

setMensajeMesero("🎙️ escuchando...")

}

}
  recognition.lang="en-US"
recognition.continuous=false

  recognition.interimResults = false

  recognition.maxAlternatives = 1



  recognition.start()

  recognition.onresult = (event) => {

    const texto =
      event.results[0][0].transcript.toLowerCase()

    setTextoUsuario(texto)

const palabrasCorrectas =
  respuestaCorrecta
    .toLowerCase()
    .split(" ")

const palabrasUsuario =
  texto.split(" ")

const comparacion =
  palabrasCorrectas.map((palabra, idx) => {

    return {
      texto: palabrasUsuario[idx] || "",

      correcta:

  palabrasUsuario[idx]
    ?.includes(palabra)

  ||

  palabra.includes(
    palabrasUsuario[idx] || ""
  )
    }

  })

setResultadoVoz(comparacion)
let errores = 0

comparacion.forEach(p => {

  if (!p.correcta) {

    errores++

  }

})

if (errores <= 2) {

if ((iMesero + 1) % 15 === 0) {

  setMostrarCofre(true)

 const nuevaCarta = {

  animal:
    "Mesero Nivel " +
    (iMesero + 1),

  deseo:
    "Checkpoint desbloqueado",

 imagen: imgUrl || "/cards.png",

  id: Date.now(),

  checkpoint: iMesero + 1,

  tipo: "vozMesero"

}

  setCartas(prev => {

    const nuevas = [
      ...prev,
      nuevaCarta
    ]

    localStorage.setItem(
      "cartas",
      JSON.stringify(nuevas)
    )

    return nuevas

  })

}

  playCorrect()

  if (errores === 0) {

   if(modo==="vozBarista"){
  setMensajeBarista(
    "🏆 pronunciación perfecta"
  )
}else{
  setMensajeMesero(
    "🏆 pronunciación perfecta"
  )
}

const next =
modo==="vozBarista"
? iBarista + 1
: iMesero + 1

desbloquearCarta(
"meseroJuego",
next
)


setCombo(prev=>prev+1)

setRacha(prev=>prev+1)

  } else {

    if(modo==="vozBarista"){
  setMensajeBarista(
    "✅ pasaste con pequeños errores"
  )
}else{
  setMensajeMesero(
    "✅ pasaste con pequeños errores"
  )
}

  }

  const next =
modo==="vozBarista"
? iBarista + 1
: iMesero + 1

  setTimeout(() => {

    if (
next >= (
modo==="vozBarista"
? academiaBarista[0]?.frases.length
: academiaMesero[0]?.frases.length
)
) {

     if(modo==="vozBarista"){
setMensajeBarista(
"🏆 ENTRENAMIENTO COMPLETADO"
)
}else{
setMensajeMesero(
"🏆 ENTRENAMIENTO COMPLETADO"
)
}

      return

    }

    if(modo==="vozBarista"){
  setIBarista(next)
}else{
  setIMesero(next)
}

    if(modo==="vozBarista"){
setMensajeBarista("")
}else{
setMensajeMesero("")
}

  }, 1500)

} else {

  playWrong()

  setMensajeMesero(
    "❌ demasiados errores"
  )

  setVidas(v => {

    if (v <= 1) {

      setIMesero(0)

      setModo("mesero")

      return 3

    }

    return v - 1

  })

}
   

    

    setEscuchando(false)

  }

 recognition.onerror = (e) => {

console.log(e)

setEscuchando(false)

if(modo==="vozBarista"){

setMensajeBarista(
"🎤 activa permisos del micrófono"
)

}else{

setMensajeMesero(
"🎤 activa permisos del micrófono"
)

}

}

}
const reiniciarJuego = () => {

localStorage.removeItem("cartas")
localStorage.removeItem("progreso")
localStorage.removeItem("capitulosComprados")

setCartas([])
setPuntos(0)
setDinero(0)
setGemas(0)

setVidas(3)

setI(0)
setIIntermedio(0)
setIMesero(0)
setIBarista(0)

setCombo(0)
setRacha(1)

setTiempo(30)
setEstres(0)

setCapitulosComprados([])

window.location.reload()

}

useEffect(()=>{

if(!musicaRef.current){

musicaRef.current=new Audio()

musicaRef.current.loop=true

musicaRef.current.volume=0.2

}

const musica=musicaRef.current

if(modo==="menu"){

musica.src=
"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"

}else if(
modo==="mesero" ||
modo==="meseroJuego"
){

musica.src=
"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"

}else if(
modo==="barista" ||
modo==="baristaJuego"
){

musica.src=
"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"

}else{

musica.src=
"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"

}

musica.load()

const iniciar=()=>{

musica.play().catch(()=>{})

}

document.addEventListener(
"click",
iniciar,
{once:true}
)

return ()=>{

musica.pause()

}

},[modo])
  return (
    
    

    <div className={`app ${modo === "aprender" ? "modo-juego" : ""}`}>
      
<button
onClick={()=>{

if(!musicaRef.current)return

if(
musicaRef.current.paused
){

musicaRef.current.play()

}else{

musicaRef.current.pause()

}

}}

style={{

position:"fixed",
bottom:"20px",
right:"20px",
zIndex:"9999",
width:"110px",
height:"110px",
borderRadius:"50%",
border:"none",
cursor:"pointer",
fontSize:"24px",
background:"#222"



}}

>

🎵 ON / OFF

</button>
{mostrarCofre && cartaNueva && (

<div className="cofre-modal">

<h1>
🎁 Carta desbloqueada
</h1>
<p>{cartaNueva.imagen}</p>
<img
  src={cartaNueva.imagen}
  alt={cartaNueva.animal}
  style={{
    width: "220px",
    height: "320px",
    objectFit: "cover",
    borderRadius: "20px",
    display: "block",
    margin: "0 auto"
  }}
/>
<h2>

{cartaNueva.animal}

</h2>

<p>

⚡ Poder:
{cartaNueva.poder}

</p>

<p>

✨ Recompensa:
{cartaNueva.deseo}

</p>

<button
onClick={()=>{

setMostrarCofre(false)

}}
>

Continuar

</button>

</div>

)}
      {/* 🎮 PRINCIPIANTE */}
      {modo === "aprender" && (
        <div className="game-container">

         
          

          {/* SIDEBAR */}
         <div className="sidebar">

  <div className="xp-container">
    <div
      className="xp-fill"
      style={{
        width:`${(puntos%10)*10}%`
      }}
    ></div>
  </div>

  <p className="xp-text">
    ⭐ Nivel {Math.floor(puntos/10)+1}
  </p>

  <h3>❤️ {vidas}</h3>
  <h3>⭐ {puntos}</h3>
  <h3>💵 ${dinero}</h3>
  <h3>💎 {gemas}</h3>
  <h3>🔥 {racha}</h3>

</div>
          {/* MAIN */}
          <div className="game-main">

            <h1>Modo Principiante</h1>
            
            <h2>
<h2>
{historia[0]?.titulo}
</h2>
</h2>
<p
style={{
fontSize:"20px",
color:"#ffd54f",
whiteSpace:"pre-wrap",
lineHeight:"1.8",
marginTop:"15px"
}}
>
<div
style={{
fontSize:"20px",
marginBottom:"20px"
}}
>

<p>🇪🇸 {historia[i]?.es}</p>

<p style={{color:"#8be9fd"}}>
🇺🇸 {historia[i]?.en}
</p>

</div>
</p>






{(
<div
style={{
fontSize:"22px",
fontFamily:"Georgia, serif",
color:"#ffd54f",
marginBottom:"25px",
whiteSpace:"pre-wrap",
lineHeight:"1.8"
}}
>

</div>
)}
                      {terminado && (
            <div style={{ color: "#00ff88", marginTop: "10px" }}>
              {frases[i]?.[1]}
            </div>
          )}

            <div>
                        {mezcladas.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const totalPalabras = frases[i][0].split(" ").length

                  if (respuesta.length < totalPalabras) {
                    setRespuesta([...respuesta, p])
                  }
                }}
              >
                {p}
              </button>
            ))}
            </div>

           <div className="respuesta-box">

✍️ {respuesta.join(" ")}

</div>
<button
onClick={()=>{
setRespuesta(prev=>prev.slice(0,-1))
}}
>
⌫ Borrar última palabra
</button>
<button
onClick={() => {

  if(repeticiones < 3){

    hablar(frases[i][0])

    setRepeticiones(prev => prev + 1)

    return

  }

  // compras extra

  if(dinero < 25){

    setMensaje("💰 Necesitas $25")

    return

  }

  setDinero(prev => prev - 25)

  hablar(frases[i][0])

  setMensaje("🔊 Repetición comprada por $25")

}}
>
🔊 Repetir frase
</button>
            <button onClick={() => {

              if (respuesta.length === 0) {
                setMensaje("⚠️ arma la frase")
                return
              }

              const correcta = frases[i][0]
              const resp = respuesta.join(" ")

                              if (resp === correcta) {

  setTerminado(true)

// 🔥 forzar render antes del cambio
setTimeout(() => {
  const next = i + 1

  if (next >= frases.length) {
   const mensajesAprender=[

"🔥 Excelente",
"⭐ Muy bien",
"🚀 Sigue así",
"💎 Perfecto",
"🏆 Correcto"

]

setMensaje(

mensajesAprender[
Math.floor(
Math.random()*mensajesAprender.length
)
]

)
    return
  }
setPuntos(prev=>prev+1)

setGemas(prev=>prev+1)

setRacha(prev=>prev+1)
desbloquearCarta(
  "aprender",
  i + 1
)
playCoin()
  setI(next)
  setRepeticiones(0)
  setCheckpoint(next)
  setRespuesta([])
  setTerminado(false)

  hablar(frases[next][0])

  setMezcladas(
    [...frases[next][0].split(" ")].sort(() => Math.random() - 0.5)
  )
}, 1200)
  


              } else {

                setMensaje("❌ incorrecto")
                setCombo(0)
                setRacha(1)
                  playWrong()
                  navigator.vibrate?.(200)
                setVidas(v => {

  const nuevas = v - 1

 if (nuevas <= 0) {

  alert("💀 GAME OVER")

  setI(0)

  setRespuesta([])

  setMezcladas(
    [...frases[0][0].split(" ")]
      .sort(() => Math.random() - 0.5)
  )

  setModo("menu")

  return 3
}

  return nuevas
})

                setRespuesta([])
                setMezcladas([...frases[i][0].split(" ")].sort(() => Math.random() - 0.5))
                hablar(frases[i][0])
              }

            }}>
              VALIDAR
            </button>

            <p>{mensaje}</p>

            <button onClick={() => {

  setModo("menu")

  setIIntermedio(0)

}}>
  ← volver
</button>

          </div>
        </div>
      )}

      {/* 💬 INTERMEDIO */}
      {modo === "intermedio" && (
  <div className="game-container">

   <div className="sidebar">

  <h3>❤️ {vidas}</h3>
  <h3>⭐ {puntos}</h3>
  <h3>💵 ${dinero}</h3>
  <h3>💎 {gemas}</h3>
  <h3>🔥 {racha}</h3>

</div>

    <div className="game-main">

      <h1>Modo Intermedio 💬</h1>

     <div className="pregunta-box">

<div className="pregunta-header">
💬 Conversación
</div>

<div className="pregunta-texto">
{intermedio[iIntermedio]?.pregunta}
</div>

</div>
       <button
  onClick={() =>
    hablar(intermedio[iIntermedio]?.pregunta)
  }
>
  🔊 Escuchar otra vez
</button>
      <p style={{ opacity: 0.7 }}>
        {intermedio[iIntermedio]?.traduccion}
      </p>

      {opcionesMezcladas.map((op, idx) => (
        <button key={idx} onClick={() => {

          if (op === intermedio[iIntermedio].correcta) {

            const mensajes=[

"🔥 Excelente",
"🚀 Increíble",
"⭐ Perfecto",
"🏆 Sigue así",
"💎 Genial"

]

setMensajeIntermedio(

mensajes[
Math.floor(
Math.random()*mensajes.length
)
]

)
            hablar(intermedio[iIntermedio].correcta)
            playCorrect()
            const tip = Math.floor(Math.random() * 15) + 5

           setDinero(prev => prev + tip)

playCoin()
            navigator.vibrate?.(100)

                      setPuntos(prev => {
              const nuevo = prev + 1

              if (nuevo % 10 === 0) {
                setMostrarCofre(true)
              }

              return nuevo
            })

            const next = iIntermedio + 1
              desbloquearCarta(
"intermedio",
next
)
            if (next >= intermedio.length) {
              setMensajeIntermedio("🏆 terminaste")
              return
            }

            setTimeout(() => {
              setIIntermedio(next)
              setMensajeIntermedio("")
            }, 2500)

          } else {

            playWrong()
            navigator.vibrate?.(200)

            setMensajeIntermedio("❌ incorrecto")

            setVidas(v => {
              const nuevas = v - 1

             if (nuevas <= 0) {

  alert("💀 Perdiste")

  setI(checkpoint)

  setVidas(3)

  setRespuesta([])

  setMezcladas(
    [...frases[checkpoint][0].split(" ")]
      .sort(() => Math.random() - 0.5)
  )

  return 3
}

              return nuevas
            })

          }

        }}>
          {op}
        </button>
      ))}

     {mensajeIntermedio && (

<div className="feedback-box">

{mensajeIntermedio}

</div>

)}
{mensajeIntermedio && mensajeIntermedio !== "❌ incorrecto" && (
  <p
    style={{
      color:"#00ff88",
      fontWeight:"bold",
      marginTop:"10px"
    }}
  >
    🇪🇸 {intermedio[iIntermedio]?.traduccionRespuesta}
  </p>
)}

      <button onClick={() => {

  setModo("menu")

  setIIntermedio(0)

}}>
        ← volver
      </button>

    </div>
  </div>
)}
        {/* 🎓 ACADEMIA */}
{modo === "academia" && (
  <div className="game-container">

    <div className="game-main">

      <h1>🎓 Academia</h1>

      <p>Selecciona una profesión</p>

   <div className="grid">

<div
 className="card" onClick={() => {
  setProfesion("mesero")
  setModo("mesero")
}}>
  <img src="/mesero.png" />
  <span>🍽️ Mesero</span>
</div>

<div
className="card"
onClick={()=>{
setModo("barista")
}}
>

<img src="/barista.png"/>

<span>☕ Barista</span>

</div>
<div
className="card"
onClick={()=>setModo("bartender")}
>
<img src="/bartender.png"/>
<span>🍸 Bartender</span>
</div>

<div
className="card"
onClick={()=>setModo("peluquero")}
>
<img src="/peluquero.png"/>
<span>💇 Peluquero</span>
</div>

<div
className="card"
onClick={()=>{

setModo("hotel")

}}
>
<img src="/hotel.png"/>
<span>🏨 Hotel</span>
</div>

<div
className="card"
onClick={()=>setModo("uber")}
>
<img src="/uber.png"/>
<span>🚕 Uber</span>
</div>

<div
className="card"
onClick={()=>setModo("cajero")}
>
<img src="/cajero.png"/>
<span>🛒 Cajero</span>
</div>

<div
className="card"
onClick={()=>setModo("delivery")}
>
<img src="/delivery.png"/>
<span>📦 Delivery</span>

</div>





</div>

      <button onClick={() => setModo("menu")}>
        ← volver
      </button>

    </div>
  </div>
)}
{/* 🍸 BARTENDER */}

{modo==="bartender"&&(

<div className="game-container">

<div className="game-main">

<h1>
🍸 Academia Bartender
</h1>

<h2>
Primer día en el bar
</h2>

<p>
Aprende bebidas y atiende clientes
</p>

<div className="grid">

<div
className="card"
onClick={()=>{

setModo("bartenderJuego")
setIBarista(0)

}}
>

<img src="/entrenamiento.png"/>

<p>Entrenamiento</p>

</div>

<div
className="card"
onClick={()=>{

setModo("procesoBartender")

}}
>

<img src="/proceso.png"/>

<p>Mi proceso</p>

</div>

<div
className="card"
onClick={()=>{

setModo("dineroBartender")

}}
>

<img src="/dinero.png"/>

<p>Dinero</p>

</div>

<div
className="card"
onClick={()=>{

setModo("vozBartender")

}}
>

<img src="/voz.png"/>

<p>Modo Voz</p>

</div>

</div>

<button
onClick={()=>
setModo(
"academia"
)
}
>

← volver

</button>

</div>

</div>

)}
{/* ☕ BARISTA */}

{modo==="barista"&&(

<div className="game-container">

<div className="game-main">

<h1>

☕ Academia Barista

</h1>

<h2>

Primer día en cafetería

</h2>

<p>

Aprende pedidos y bebidas

</p>

<div className="grid">

<div
className="card"
onClick={()=>{

setModo("baristaJuego")
setIBarista(0)

}}
>

<img src="/entrenamiento.png"/>

<p>Entrenamiento</p>

</div>

<div
className="card"
onClick={()=>{

setModo("procesoBarista")

}}
>

<img src="/proceso.png"/>

<p>Mi proceso</p>

</div>

<div
className="card"
onClick={()=>{

setModo("dineroBarista")

}}
>

<img src="/dinero.png"/>

<p>Dinero</p>

</div>

<div
className="card"
onClick={()=>{

setModo("vozBarista")

}}
>

<img src="/voz.png"/>

<p>Modo Voz</p>

</div>





</div>

<button
onClick={()=>
setModo(
"academia"
)
}
>

← volver

</button>

</div>

</div>

)}
{/* 💇 PELUQUERO */}

{modo==="peluquero"&&(

<div className="game-container">

<div className="game-main">

<h1>💇 Academia Peluquero</h1>

<h2>Primer día en la barbería</h2>

<p>Aprende estilos y habla con clientes</p>

<div className="grid">

<div
className="card"
onClick={()=>{

setModo("peluqueroJuego")
setIBarista(0)

}}
>

<img src="/entrenamiento.png"/>

<p>Entrenamiento</p>

</div>

<div
className="card"
onClick={()=>{

setModo("procesoPeluquero")

}}
>

<img src="/proceso.png"/>

<p>Mi proceso</p>

</div>

<div
className="card"
onClick={()=>{

setModo("dineroPeluquero")

}}
>

<img src="/dinero.png"/>

<p>Dinero</p>

</div>

<div
className="card"
onClick={()=>{

setModo("vozPeluquero")

}}
>

<img src="/voz.png"/>

<p>Modo Voz</p>

</div>

</div>

<div
style={{
display:"flex",
gap:"10px",
justifyContent:"center"
}}
>

<button
onClick={()=>setModo("academia")}
>
← volver
</button>


</div>

</div>

</div>

)}
{/* 👤 PERFIL */}

{/* 👤 PERFIL */}

{/* 👤 PERFIL */}

{/* 👤 PERFIL */}

{/* 👤 PERFIL */}

{/* 👤 PERFIL */}

{modo==="perfil" && (

<div className="game-container">

<div className="game-main">

<div
style={{
position:"relative",
width:"100%",
maxWidth:"700px",
margin:"auto"
}}
>

{/* FONDO */}

<img
src="/perfil-portada.png"
style={{
width:"100%",
borderRadius:"35px",
boxShadow:"0 0 35px rgba(132,0,255,.7)"
}}
/>


{/* AVATAR */}

<div
style={{
position:"absolute",
top:"40px",
left:"50%",
transform:"translateX(-50%)",
textAlign:"center"
}}
>

<div
style={{
width:"140px",
height:"140px",
borderRadius:"50%",
overflow:"hidden",
border:"5px solid gold",
boxShadow:"0 0 30px gold"
}}
>

<label
style={{
width:"140px",
height:"140px",
borderRadius:"50%",
overflow:"hidden",
border:"5px solid gold",
boxShadow:"0 0 30px gold",
display:"block",
cursor:"pointer"
}}
>

<img
src={
usuario.foto
? usuario.foto
: "/perfil.png"
}

style={{
width:"100%",
height:"100%",
objectFit:"cover"
}}
/>

<input
type="file"
accept="image/*"

style={{
display:"none"
}}

onChange={(e)=>{

const archivo=e.target.files[0]

if(!archivo)return

const reader=new FileReader()

reader.onload=(evento)=>{

const nuevoUsuario={

...usuario,

foto:evento.target.result

}

setUsuario(nuevoUsuario)

localStorage.setItem(
"usuario",
JSON.stringify(nuevoUsuario)
)

}

reader.readAsDataURL(archivo)

}}

/>

</label>

</div>

<h2
style={{
color:"white",
marginTop:"10px",
textShadow:"0 0 20px black",
fontSize:"36px"
}}
>
{usuario.nombre}
</h2>

</div>


{/* BARRA XP */}

<div
style={{
position:"absolute",
top:"240px",
left:"50%",
transform:"translateX(-50%)",
width:"60%"
}}
>

<div
style={{
height:"22px",
background:"#222",
borderRadius:"30px",
overflow:"hidden",
border:"3px solid #4d00ff",
boxShadow:"0 0 20px rgba(0,255,255,.6)"
}}
>

<div
style={{
width:`${(puntos%10)*10}%`,
height:"100%",
background:
"linear-gradient(90deg,#00e5ff,#0066ff)"
}}
>
</div>

</div>

<div
style={{
textAlign:"center",
color:"white",
fontWeight:"bold",
marginTop:"8px",
fontSize:"20px",
marginBottom:"25px"
}}
>

⭐ XP {puntos}

</div>

</div>


{/* ESTADISTICAS */}

<div
style={{
position:"absolute",
top:"380px",
left:"50%",
transform:"translateX(-50%)",
display:"flex",
gap:"18px",
background:"rgba(0,0,0,.28)",
padding:"18px",
borderRadius:"30px",
backdropFilter:"blur(10px)",
boxShadow:"0 0 20px rgba(0,255,255,.15)"
}}
>

<div className="perfilStat">
💎
<span>{gemas}</span>
</div>

<div className="perfilStat">
💰
<span>${dinero}</span>
</div>

<div className="perfilStat">
📚
<span>{cartas.length}</span>
</div>

<div className="perfilStat">
❤️
<span>{vidas}</span>
</div>

<div className="perfilStat">
🔥
<span>{racha}</span>
</div>

<div className="perfilStat">
🏆
<span>{logros.length}</span>
</div>

</div>


{/* MENU INFERIOR */}

<div
style={{
position:"absolute",
bottom:"25px",
left:"50%",
transform:"translateX(-50%)",
display:"flex",
gap:"18px",
background:"rgba(0,0,0,.35)",
padding:"15px 25px",
borderRadius:"35px",
backdropFilter:"blur(12px)",
boxShadow:"0 0 25px rgba(0,255,255,.25)"
}}
>

{/* INICIO */}

<button
className="menuBtn"
onClick={()=>setModo("menu")}
>
🏠
</button>


{/* PERFIL */}

<button
className="menuBtn"
>
👤
</button>


{/* ACADEMIA */}

<button
className="menuBtn"
onClick={()=>setModo("academia")}
>
🎓
</button>


{/* COFRE */}

<button
className="menuBtn"
onClick={()=>setModo("tienda")}
>
🎁
</button>


{/* AJUSTES */}

<button
className="menuBtn"

onClick={()=>{

const nuevoNombre=prompt(
"Nuevo nombre:",
usuario.nombre
)

const nuevoCorreo=prompt(
"Nuevo correo:",
usuario.correo || ""
)

if(nuevoNombre){

const nuevoUsuario={

...usuario,
nombre:nuevoNombre,
correo:nuevoCorreo

}

setUsuario(nuevoUsuario)

localStorage.setItem(
"usuario",
JSON.stringify(nuevoUsuario)
)

}

}}

>
⚙️
</button>

</div>

</div>

</div>

</div>

)}
{/* 🛒 CAJERO */}

{modo==="cajero"&&(

<div className="game-container">

<div className="game-main">

<h1>🛒 Academia Cajero</h1>

<h2>Primer día en caja</h2>

<p>Aprende pagos y atención al cliente</p>

<div className="grid">

<div
className="card"
onClick={()=>{

setModo("cajeroJuego")
setIBarista(0)

}}
>

<img src="/entrenamiento.png"/>

<p>Entrenamiento</p>

</div>

<div
className="card"
onClick={()=>{

setModo("procesoCajero")

}}
>

<img src="/proceso.png"/>

<p>Mi proceso</p>

</div>

<div
className="card"
onClick={()=>{

setModo("dineroCajero")

}}
>

<img src="/dinero.png"/>

<p>Dinero</p>

</div>

<div
className="card"
onClick={()=>{

setModo("vozCajero")

}}
>

<img src="/voz.png"/>

<p>Modo Voz</p>

</div>

</div>

<button
onClick={()=>setModo("academia")}
>
← volver
</button>
<button
onClick={()=>setModo("tienda")}
>
👑 PRO
</button>
</div>

</div>

)}
{/* 📦 DELIVERY */}

{modo==="delivery"&&(

<div className="game-container">

<div className="game-main">

<h1>
📦 Academia Delivery
</h1>

<h2>
Primer día entregando pedidos
</h2>

<p>
Aprende direcciones y habla con clientes
</p>

<div className="grid">

<div
className="card"
onClick={()=>{

setModo("deliveryJuego")
setIBarista(0)

}}
>

<img src="/entrenamiento.png"/>

<p>Entrenamiento</p>

</div>

<div
className="card"
onClick={()=>{

setModo("procesoDelivery")

}}
>

<img src="/proceso.png"/>

<p>Mi proceso</p>

</div>

<div
className="card"
onClick={()=>{

setModo("dineroDelivery")

}}
>

<img src="/dinero.png"/>

<p>Dinero</p>

</div>

<div
className="card"
onClick={()=>{

setModo("vozDelivery")

}}
>

<img src="/voz.png"/>

<p>Modo Voz</p>

</div>

</div>

<button
onClick={()=>
setModo("academia")
}
>

← volver

</button>

</div>

</div>

)}
{/* 🚕 UBER */}

{modo==="uber"&&(

<div className="game-container">

<div className="game-main">

<h1>
🚕 Academia Uber
</h1>

<h2>
Primer día manejando
</h2>

<p>
Aprende rutas y habla con pasajeros
</p>

<div className="grid">

<div
className="card"
onClick={()=>{

setModo("uberJuego")
setIBarista(0)

}}
>

<img src="/entrenamiento.png"/>

<p>Entrenamiento</p>

</div>

<div
className="card"
onClick={()=>{

setModo("procesoUber")

}}
>

<img src="/proceso.png"/>

<p>Mi proceso</p>

</div>

<div
className="card"
onClick={()=>{

setModo("dineroUber")

}}
>

<img src="/dinero.png"/>

<p>Dinero</p>

</div>

<div
className="card"
onClick={()=>{

setModo("vozUber")

}}
>

<img src="/voz.png"/>

<p>Modo Voz</p>

</div>

</div>

<button
onClick={()=>
setModo("academia")
}
>

← volver

</button>

</div>

</div>

)}
{/* 🏨 HOTEL */}

{modo==="hotel"&&(

<div className="game-container">

<div className="game-main">

<h1>

🏨 Academia Hotel

</h1>

<h2>

Primer día en recepción

</h2>

<p>

Aprende a recibir huéspedes

</p>

<div className="grid">

<div
className="card"
onClick={()=>{

setModo("hotelJuego")
setIBarista(0)

}}
>

<img src="/entrenamiento.png"/>

<p>Entrenamiento</p>

</div>

<div
className="card"
onClick={()=>{

setModo("procesoHotel")

}}
>

<img src="/proceso.png"/>

<p>Mi proceso</p>

</div>

<div
className="card"
onClick={()=>{

setModo("dineroHotel")

}}
>

<img src="/dinero.png"/>

<p>Dinero</p>

</div>

<div
className="card"
onClick={()=>{

setModo("vozHotel")

}}
>

<img src="/voz.png"/>

<p>Modo Voz</p>

</div>

</div>

<button
onClick={()=>
setModo("academia")
}
>

← volver

</button>

</div>

</div>

)}
{/* 🍽️ MESERO */}
{modo === "mesero" && (
  <div className="game-container">

    <div className="game-main">

      <h1>🍽️ Academia Mesero</h1>

      <h2>Tu primer día</h2>

      <p>
        Bienvenido al restaurante.
        Hoy aprenderás a sobrevivir tu primer turno.
      </p>

     <div className="grid">

<div className="card"
onClick={()=>{
setModo("meseroJuego")
setIMesero(0)
setTiempo(30)
}}>
<img src="/entrenamiento.png"/>
<p>Entrenamiento</p>
</div>

<div className="card"
onClick={()=>{
setModo("procesoMesero")
}}>
<img src="/proceso.png"/>
<p>Mi proceso</p>
</div>

<div className="card"
onClick={()=>{
setModo("dineroMesero")
}}>
<img src="/dinero.png"/>
<p>Dinero</p>
</div>

<div className="card"
onClick={()=>{
setModo("vozMesero")
}}>
<img src="/voz.png"/>
<p>Modo Voz</p>
</div>

</div>
      <button onClick={() => setModo("academia")}>
        ← volver
      </button>

    </div>

  </div>
)}
{/* 💇 JUEGO PELUQUERO */}

{modo==="peluqueroJuego"&&(

<div className="game-container">

<div className="sidebar">

<h3>❤️ {vidas}</h3>
<h3>⭐ {puntos}</h3>
<h3>💵 ${dinero}</h3>
<h3>💎 {gemas}</h3>
<h3>🔥 {racha}</h3>

</div>

<div className="game-main">

<h1>💇 Barber Shop</h1>

<h2>
{academiaPeluquero[0]?.titulo}
</h2>

<p>
{academiaPeluquero[0]?.historia}
</p>

<h2>
{academiaPeluquero[0]?.frases[iBarista]?.personaje}
</h2>

<div className="pregunta-box">

<div className="pregunta-header">
💇 Cliente
</div>

<div className="pregunta-texto">
{academiaPeluquero[0]?.frases[iBarista]?.pregunta}
</div>

</div>

<button
onClick={()=>{

hablar(
academiaPeluquero[0]?.frases[iBarista]?.pregunta
)

}}
>

🔊 Repetir

</button>

<p>

{academiaPeluquero[0]?.frases[iBarista]?.traduccion}

</p>

{opcionesBarista.map((op,idx)=>(

<button
key={idx}

onClick={()=>{

if(
op===
academiaPeluquero[0]
?.frases[iBarista]
?.correcta
){

playCorrect()

setDinero(prev=>prev+10)
playCoin()
setPuntos(prev=>prev+1)
setGemas(prev=>prev+1)

setMensajeBarista(
"💇 Corte terminado"
)

setTimeout(()=>{

console.log("IA INICIADA")

let movimientos=[]
const next=iBarista+1
desbloquearCarta(
"uberJuego",
next
)
desbloquearCarta(
modo,
next
)
if(
next>=academiaPeluquero?.[0]?.frases?.length
){

setMensajeBarista(
"🏆 Turno completado"
)

return

}

setIBarista(next)

},1500)

}else{

playWrong()

setMensajeBarista(
"❌ incorrecto"
)

}

}}
>

{op}

</button>

))}

<p>{mensajeBarista}</p>

<button
onClick={()=>
setModo("peluquero")
}
>

← volver

</button>

</div>

</div>

)}
{/* 🛒 JUEGO CAJERO */}

{modo==="cajeroJuego"&&(

<div className="game-container">

<div className="sidebar">

<h3>❤️ {vidas}</h3>
<h3>⭐ {puntos}</h3>
<h3>💵 ${dinero}</h3>
<h3>💎 {gemas}</h3>
<h3>🔥 {racha}</h3>

</div>

<div className="game-main">

<h1>🛒 Super Market</h1>

<h2>
{academiaCajero[0]?.titulo}
</h2>

<p>
{academiaCajero[0]?.historia}
</p>

<h2>
{academiaCajero[0]?.frases[iBarista]?.personaje}
</h2>

<div className="pregunta-box">

<div className="pregunta-header">
🛒 Cliente
</div>

<div className="pregunta-texto">
{academiaCajero[0]?.frases[iBarista]?.pregunta}
</div>

</div>

<button
onClick={()=>{

hablar(
academiaCajero[0]?.frases[iBarista]?.pregunta
)

}}
>

🔊 Repetir

</button>

<p>

{academiaCajero[0]?.frases[iBarista]?.traduccion}

</p>

{opcionesBarista.map((op,idx)=>(

<button
key={idx}

onClick={()=>{

if(
op===
academiaCajero[0]
?.frases[iBarista]
?.correcta
){

playCorrect()

setDinero(prev=>prev+10)
setPuntos(prev=>prev+1)
setGemas(prev=>prev+1)

setMensajeBarista(
"🛒 Compra completada"
)

setTimeout(()=>{

const next=iBarista+1
desbloquearCarta(
"deliveryJuego",
next
)

if(
next>=academiaCajero?.[0]?.frases?.length
){

setMensajeBarista(
"🏆 Turno completado"
)

return

}

setIBarista(next)

},1500)

}else{

playWrong()

setMensajeBarista(
"❌ incorrecto"
)

}

}}
>

{op}

</button>

))}

<p>{mensajeBarista}</p>

<button
onClick={()=>
setModo("cajero")
}
>

← volver

</button>

</div>

</div>

)}
{/* 📦 JUEGO DELIVERY */}

{modo==="deliveryJuego"&&(

<div className="game-container">

<div className="sidebar">

<h3>❤️ {vidas}</h3>
<h3>⭐ {puntos}</h3>
<h3>💵 ${dinero}</h3>
<h3>💎 {gemas}</h3>
<h3>🔥 {racha}</h3>

</div>

<div className="game-main">

<h1>📦 Fast Delivery</h1>

<h2>
{academiaDelivery[0]?.titulo}
</h2>

<p>
{academiaDelivery[0]?.historia}
</p>

<h2>
{academiaDelivery[0]?.frases[iBarista]?.personaje}
</h2>

<div className="pregunta-box">

<div className="pregunta-header">
📦 Cliente
</div>

<div className="pregunta-texto">
{academiaDelivery[0]?.frases[iBarista]?.pregunta}
</div>

</div>

<button
onClick={()=>{

hablar(
academiaDelivery[0]?.frases[iBarista]?.pregunta
)

}}
>

🔊 Repetir

</button>

<p>

{academiaDelivery[0]?.frases[iBarista]?.traduccion}

</p>

{opcionesBarista.map((op,idx)=>(

<button
key={idx}

onClick={()=>{

if(
op===
academiaDelivery[0]
?.frases[iBarista]
?.correcta
){

playCorrect()

setDinero(prev=>prev+10)
setPuntos(prev=>prev+1)
setGemas(prev=>prev+1)

setMensajeBarista(
"📦 Entrega completada"
)

setTimeout(()=>{

const next=iBarista+1
desbloquearCarta(
"cajeroJuego",
next
)

if(
next>=academiaDelivery?.[0]?.frases?.length
){

setMensajeBarista(
"🏆 Turno completado"
)

return

}

setIBarista(next)

},1500)

}else{

playWrong()

setMensajeBarista(
"❌ incorrecto"
)

}

}}
>

{op}

</button>

))}

<p>{mensajeBarista}</p>

<button
onClick={()=>
setModo("delivery")
}
>

← volver

</button>

</div>

</div>

)}
{/* 🚕 JUEGO UBER */}

{modo==="uberJuego"&&(

<div className="game-container">

<div className="sidebar">

<h3>❤️ {vidas}</h3>
<h3>⭐ {puntos}</h3>
<h3>💵 ${dinero}</h3>
<h3>💎 {gemas}</h3>
<h3>🔥 {racha}</h3>

</div>

<div className="game-main">

<h1>🚕 City Driver</h1>

<h2>
{academiaUber[0]?.titulo}
</h2>

<p>
{academiaUber[0]?.historia}
</p>

<h2>
{academiaUber[0]?.frases[iBarista]?.personaje}
</h2>

<div className="pregunta-box">

<div className="pregunta-header">
🚕 Pasajero
</div>

<div className="pregunta-texto">
{academiaUber[0]?.frases[iBarista]?.pregunta}
</div>

</div>

<button
onClick={()=>{

hablar(
academiaUber[0]?.frases[iBarista]?.pregunta
)

}}
>

🔊 Repetir

</button>

<p>

{academiaUber[0]?.frases[iBarista]?.traduccion}

</p>

{opcionesBarista.map((op,idx)=>(

<button
key={idx}

onClick={()=>{

if(
op===
academiaUber[0]
?.frases[iBarista]
?.correcta
){

playCorrect()

setDinero(prev=>prev+10)
setPuntos(prev=>prev+1)
setGemas(prev=>prev+1)

setMensajeBarista(
"🚕 Viaje exitoso"
)

setTimeout(()=>{

const next=iBarista+1
desbloquearCarta(
"hotelJuego",
next
)

if(
next>=academiaUber?.[0]?.frases?.length
){

setMensajeBarista(
"🏆 Turno completado"
)

return

}

setIBarista(next)

},1500)

}else{

playWrong()

setMensajeBarista(
"❌ incorrecto"
)

}

}}
>

{op}

</button>

))}

<p>{mensajeBarista}</p>

<button
onClick={()=>
setModo("uber")
}
>

← volver

</button>

</div>

</div>

)}
{/* 🏨 JUEGO HOTEL */}

{modo==="hotelJuego"&&(

<div className="game-container">

<div className="sidebar">

<h3>❤️ {vidas}</h3>
<h3>⭐ {puntos}</h3>
<h3>💵 ${dinero}</h3>
<h3>💎 {gemas}</h3>
<h3>🔥 {racha}</h3>

</div>

<div className="game-main">

<h1>🏨 Grand Hotel</h1>

<h2>
{academiaHotel[0]?.titulo}
</h2>

<p>
{academiaHotel[0]?.historia}
</p>

<h2>
{academiaHotel[0]?.frases[iBarista]?.personaje}
</h2>

<div className="pregunta-box">

<div className="pregunta-header">
🏨 Huésped
</div>

<div className="pregunta-texto">
{academiaHotel[0]?.frases[iBarista]?.pregunta}
</div>

</div>

<button
onClick={()=>{

hablar(
academiaHotel[0]?.frases[iBarista]?.pregunta
)

}}
>

🔊 Repetir

</button>

<p>

{academiaHotel[0]?.frases[iBarista]?.traduccion}

</p>

{opcionesBarista.map((op,idx)=>(

<button
key={idx}

onClick={()=>{

if(
op===
academiaHotel[0]
?.frases[iBarista]
?.correcta
){

playCorrect()

setDinero(prev=>prev+10)
setPuntos(prev=>prev+1)
setGemas(prev=>prev+1)

setMensajeBarista(
"🏨 Huésped feliz"
)

setTimeout(()=>{

const next=iBarista+1
desbloquearCarta(
"bartenderJuego",
next
)

if(
next>=academiaHotel?.[0]?.frases?.length
){

setMensajeBarista(
"🏆 Turno completado"
)

return

}

setIBarista(next)

},1500)

}else{

playWrong()

setMensajeBarista(
"❌ incorrecto"
)

}

}}
>

{op}

</button>

))}

<p>{mensajeBarista}</p>

<button
onClick={()=>
setModo("hotel")
}
>

← volver

</button>

</div>

</div>

)}
{/* 🍸 JUEGO BARTENDER */}

{modo==="bartenderJuego"&&(

<div className="game-container">

<div className="sidebar">

<h3>❤️ {vidas}</h3>
<h3>⭐ {puntos}</h3>
<h3>💵 ${dinero}</h3>
<h3>💎 {gemas}</h3>
<h3>🔥 {racha}</h3>

</div>

<div className="game-main">

<h1>🍸 Night Bar</h1>

<h2>
{academiaBartender[0]?.titulo}
</h2>

<p>
{academiaBartender[0]?.historia}
</p>

<h2>
{academiaBartender[0]?.frases[iBarista]?.personaje}
</h2>

<div className="pregunta-box">

<div className="pregunta-header">
🍸 Cliente
</div>

<div className="pregunta-texto">
{academiaBartender[0]?.frases[iBarista]?.pregunta}
</div>

</div>

<button
onClick={()=>{

hablar(
academiaBartender[0]?.frases[iBarista]?.pregunta
)

}}
>

🔊 Repetir pedido

</button>

<p>

{academiaBartender[0]?.frases[iBarista]?.traduccion}

</p>

{opcionesBarista.map((op,idx)=>(

<button
key={idx}

onClick={()=>{

if(
op===
academiaBartender[0]
?.frases[iBarista]
?.correcta
){

playCorrect()

setDinero(prev=>prev+10)
setPuntos(prev=>prev+1)
setGemas(prev=>prev+1)
setRacha(prev=>prev+1)

setMensajeBarista(
"🍸 Cliente feliz"
)
const eventoRandom=[

"💵 Gran propina",
"🍸 Cliente VIP llegó",
"🎵 Música muy alta",
"🔥 Hora pico",
"🥤 Bebida derramada",
"👮 Inspección sorpresa"

]

setEvento(

eventoRandom[
Math.floor(
Math.random()*eventoRandom.length
)
]

)
if ((iBarista + 1) % 15 === 0) {

setMostrarCofre(true)

const nuevaCarta = {

animal:
"Entrenamiento " +
(iBarista + 1),

deseo:
"Checkpoint bartender",

imagen: imgUrl || "/cards.png",

id: Date.now(),

checkpoint: iBarista + 1,

tipo: "entrenamientoBartender"

}

setCartas(prev => {

const nuevas = [
...prev,
nuevaCarta
]

localStorage.setItem(
"cartas",
JSON.stringify(nuevas)
)

return nuevas

})

}
setTimeout(()=>{

const next=iBarista+1

if(
next>=academiaBartender?.[0]?.frases?.length
){

setMensajeBarista(
"🏆 Turno completado"
)

return

}

setIBarista(next)

},1500)

}else{

playWrong()

setMensajeBarista(
"❌ incorrecto"
)

}

}}
>

{op}

</button>

))}

<p>{mensajeBarista}</p>
{evento && (

<div className="feedback-box">

{evento}

</div>

)}
<button
onClick={()=>
setModo("bartender")
}
>

← volver

</button>

</div>

</div>

)}
{/* ☕ JUEGO BARISTA */}

{modo==="baristaJuego"&&(

<div className="game-container">

<div className="sidebar">

<h3>❤️ {vidas}</h3>

<h3>⭐ {puntos}</h3>

<h3>💵 ${dinero}</h3>

<h3>💎 {gemas}</h3>

<h3>🔥 {racha}</h3>

</div>

<div className="game-main">

<h1>☕ Coffee Rush</h1>

<h2>

{academiaBarista[0]?.titulo}

</h2>

<p>

{academiaBarista[0]?.historia}

</p>



<h2>

{academiaBarista[0]?.frases[iBarista]?.personaje}

</h2>

<div className="pregunta-box">

<div className="pregunta-header">

☕ Pedido

</div>

<div className="pregunta-texto">

{academiaBarista[0]?.frases[iBarista]?.pregunta}

</div>

</div>

<button
onClick={()=>{

hablar(
academiaBarista[0]?.frases[iBarista]?.pregunta
)

}}
>

🔊 Repetir pedido

</button>

<p>

{academiaBarista[0]?.frases[iBarista]?.traduccion}

</p>

{opcionesBarista.map((op,idx)=>(

<button

key={idx}

onClick={()=>{

if(
op===
academiaBarista[0]
?.frases[iBarista]
?.correcta
){

playCorrect()

setDinero(
prev=>prev+10
)

setPuntos(
prev=>prev+1
)

setGemas(
prev=>prev+1
)

setRacha(
prev=>prev+1
)

const mensajes=[

"☕ Café perfecto",

"🔥 Cliente feliz",

"⭐ Gran servicio",

"💰 Buena propina",

"👑 Excelente"

]

setMensajeBarista(

mensajes[
Math.floor(
Math.random()*mensajes.length
)
]

)

setTimeout(()=>{

const next=
iBarista+1
desbloquearCarta(
"baristaJuego",
next
)
if(
next>=academiaBarista?.[0]?.frases?.length
){

setMensajeBarista(
"🏆 Turno completado"
)

return

}

setIBarista(next)

},1500)

}else{

playWrong()

setRacha(1)

setMensajeBarista(
"❌ incorrecto"
)

}

}}

>

{op}

</button>

))}

{mensajeBarista&&(

<div className="feedback-box">

{mensajeBarista}

</div>

)}


<button
onClick={()=>
setModo("barista")
}
>

← volver

</button>
</div>

</div>

)}
{/* 🎤 VOZ PELUQUERO */}

{modo === "vozPeluquero" && (

<div className="game-container">

<div className="game-main">

<h1>🎤 Voz Peluquero</h1>

<h2>

💇 {academiaPeluquero[0]?.frases[iBarista]?.personaje}

</h2>

<p>

Escucha y pronuncia correctamente

</p>

<button
onClick={()=>{

hablar(
academiaPeluquero[0]?.frases[iBarista]?.pregunta
)

}}
>

🔊 Escuchar

</button>

<div
style={{
marginTop:"20px",
display:"grid",
gap:"10px"
}}
>

{academiaPeluquero[0]?.frases[iBarista]?.opciones?.map((op,idx)=>(

<button
key={idx}
onClick={()=>{

escucharRespuesta(op)

}}
>

🎤 {op}

</button>

))}

</div>

<p>{mensajeBarista}</p>

<p
style={{
color:"#00ff88",
fontWeight:"bold"
}}
>

🇪🇸 {
academiaPeluquero[0]
?.frases[iBarista]
?.traduccionRespuesta
}

</p>

<button
onClick={()=>
setModo("peluquero")
}
>

← volver

</button>

</div>

</div>

)}
{/* 🎤 VOZ CAJERO */}

{modo === "vozCajero" && (

<div className="game-container">

<div className="game-main">

<h1>🎤 Voz Cajero</h1>

<h2>

🛒 {academiaCajero[0]?.frases[iBarista]?.personaje}

</h2>

<p>

Escucha y pronuncia correctamente

</p>

<button
onClick={()=>{

hablar(
academiaCajero[0]?.frases[iBarista]?.pregunta
)

}}
>

🔊 Escuchar

</button>

<div
style={{
marginTop:"20px",
display:"grid",
gap:"10px"
}}
>

{academiaCajero[0]?.frases[iBarista]?.opciones?.map((op,idx)=>(

<button
key={idx}
onClick={()=>{

escucharRespuesta(op)

}}
>

🎤 {op}

</button>

))}

</div>

<p>{mensajeBarista}</p>

<p
style={{
color:"#00ff88",
fontWeight:"bold"
}}
>

🇪🇸 {
academiaCajero[0]
?.frases[iBarista]
?.traduccionRespuesta
}

</p>

<button
onClick={()=>
setModo("cajero")
}
>

← volver

</button>

</div>

</div>

)}
{/* 🎤 VOZ DELIVERY */}

{modo === "vozDelivery" && (

<div className="game-container">

<div className="game-main">

<h1>🎤 Voz Delivery</h1>

<h2>

📦 {academiaDelivery[0]?.frases[iBarista]?.personaje}

</h2>

<p>

Escucha y pronuncia correctamente

</p>

<button
onClick={()=>{

hablar(
academiaDelivery[0]?.frases[iBarista]?.pregunta
)

}}
>

🔊 Escuchar

</button>

<div
style={{
marginTop:"20px",
display:"grid",
gap:"10px"
}}
>

{academiaDelivery[0]?.frases[iBarista]?.opciones?.map((op,idx)=>(

<button
key={idx}
onClick={()=>{

escucharRespuesta(op)

}}
>

🎤 {op}

</button>

))}

</div>

<p>{mensajeBarista}</p>

<p
style={{
color:"#00ff88",
fontWeight:"bold"
}}
>

🇪🇸 {
academiaDelivery[0]
?.frases[iBarista]
?.traduccionRespuesta
}

</p>

<button
onClick={()=>
setModo("delivery")
}
>

← volver

</button>

</div>

</div>

)}
{/* 🎤 VOZ UBER */}

{modo === "vozUber" && (

<div className="game-container">

<div className="game-main">

<h1>🎤 Voz Uber</h1>

<h2>

🚕 {academiaUber[0]?.frases[iBarista]?.personaje}

</h2>

<p>

Escucha y pronuncia correctamente

</p>

<button
onClick={()=>{

hablar(
academiaUber[0]?.frases[iBarista]?.pregunta
)

}}
>

🔊 Escuchar

</button>

<div
style={{
marginTop:"20px",
display:"grid",
gap:"10px"
}}
>

{academiaUber[0]?.frases[iBarista]?.opciones?.map((op,idx)=>(

<button
key={idx}
onClick={()=>{

escucharRespuesta(op)

}}
>

🎤 {op}

</button>

))}

</div>

<p>{mensajeBarista}</p>

<p
style={{
color:"#00ff88",
fontWeight:"bold"
}}
>

🇪🇸 {
academiaUber[0]
?.frases[iBarista]
?.traduccionRespuesta
}

</p>

<button
onClick={()=>
setModo("uber")
}
>

← volver

</button>

</div>

</div>

)}
{/* 🎤 VOZ HOTEL */}

{modo === "vozHotel" && (

<div className="game-container">

<div className="game-main">

<h1>🎤 Voz Hotel</h1>

<h2>

🏨 {academiaHotel?.[0]?.frases?.[iBarista]?.personaje}

</h2>

<p>

Escucha y pronuncia correctamente

</p>

<button
onClick={()=>{

hablar(
academiaHotel[0]?.frases[iBarista]?.pregunta
)

}}
>

🔊 Escuchar

</button>

<div
style={{
marginTop:"20px",
display:"grid",
gap:"10px"
}}
>

{academiaHotel[0]?.frases[iBarista]?.opciones?.map((op,idx)=>(

<button
key={idx}
onClick={()=>{

escucharRespuesta(op)

}}
>

🎤 {op}

</button>

))}

</div>

<p>{mensajeBarista}</p>

<p
style={{
color:"#00ff88",
fontWeight:"bold"
}}
>

🇪🇸 {
academiaHotel[0]
?.frases[iBarista]
?.traduccionRespuesta
}

</p>

<button
onClick={()=>
setModo("hotel")
}
>

← volver

</button>

</div>

</div>

)}
{/* 🎤 VOZ BARTENDER */}

{modo === "vozBartender" && (

<div className="game-container">

<div className="game-main">

<h1>🎤 Voz Bartender</h1>

<h2>

🍸 {academiaBartender[0]?.frases[iBarista]?.personaje}

</h2>

<p>

Escucha y pronuncia correctamente

</p>

<button
onClick={()=>{

hablar(
academiaBartender[0]?.frases[iBarista]?.pregunta
)

}}
>

🔊 Escuchar

</button>

<div
style={{
marginTop:"20px",
display:"grid",
gap:"10px"
}}
>

{academiaBartender[0]?.frases[iBarista]?.opciones?.map((op,idx)=>(

<button
key={idx}

onClick={()=>{

escucharRespuesta(op)

}}
>

🎤 {op}

</button>

))}

</div>

<p>{mensajeBarista}</p>

<p
style={{
color:"#00ff88",
fontWeight:"bold"
}}
>

🇪🇸 {

academiaBartender[0]
?.frases[iBarista]
?.traduccionRespuesta

}

</p>

<button
onClick={()=>
setModo("bartender")
}
>

← volver

</button>

</div>

</div>

)}
{/* 🎤 VOZ BARISTA */}

{modo === "vozBarista" && (

<div className="game-container">

<div className="game-main">

<h1>🎤 Voz Barista</h1>

<h2>

☕ {academiaBarista[0]?.frases[iBarista]?.personaje}

</h2>

<p>

Escucha y pronuncia correctamente

</p>

<button
onClick={()=>{

hablar(
academiaBarista[0]?.frases[iBarista]?.pregunta
)

}}
>

🔊 Escuchar

</button>

<div
style={{
marginTop:"20px",
display:"grid",
gap:"10px"
}}
>

{academiaBarista[0]?.frases[iBarista]?.opciones?.map((op,idx)=>(

<button
key={idx}

onClick={()=>{

escucharRespuesta(op)

}}
>
🎤 {op}
</button>

))}

</div>

<p>{mensajeBarista}</p>
<p
style={{
color:"#00ff88",
fontWeight:"bold"
}}
>
🇪🇸 {
academiaBarista[0]
?.frases[iBarista]
?.traduccionRespuesta
}
</p>

<button
onClick={()=>setModo("barista")}
>

← volver

</button>

</div>

</div>

)}
      {/* 🍽️ JUEGO MESERO */}
{modo === "meseroJuego" && (
  <div className="game-container">

 <div className="sidebar">

<h3>❤️ {vidas}</h3>

<h3>⭐ {puntos}</h3>

<h3>💵 ${dinero}</h3>

<h3>💎 {gemas}</h3>

<h3>🔥 {racha}</h3>

</div>


    <div className="game-main">

 <h1>🍽️ Manhattan Restaurant</h1>

<h2>

{academiaMesero[0]?.titulo}

</h2>

<p>

{academiaMesero[0]?.historia}

</p>


   
      <div className="estado-top">

<div className="cliente-card">

{cliente}

</div>

<div className="clima-card">

{clima}

</div>

</div>
      <h2>
 {academiaMesero[0]?.frases?.[iMesero]?.personaje}
</h2>
      
 <div className="pregunta-box">

  <div className="pregunta-header">
    🎯 Cliente preguntando
  </div>

  <div className="pregunta-texto">
   {academiaMesero[0]?.frases[iMesero]?.pregunta}
  </div>

</div>
        <button
  onClick={() =>
   hablar(
academiaMesero[0]?.frases[iMesero]?.pregunta
)
  }
>
  🔊 Repetir pregunta
</button>
      <p style={{ opacity: 0.7 }}>
        {academiaMesero[0]?.frases[iMesero]?.traduccion}
      </p>

      {opcionesMesero.map((op, idx) => (
        <button

  style={{
    padding: "13px",
    margin: "12px",
    borderRadius: "20px",
    fontSize: "16px",
    minWidth: "220px"
  }}

  key={idx}

  onClick={() => {

            if (
op===
academiaMesero[0]
?.frases[iMesero]
?.correcta
){
             setTiempo(30)
             if ((iMesero + 1) % 15 === 0) {

  setMostrarCofre(true)

  const nuevaCarta = {

    animal:
      "Entrenamiento " +
      (iMesero + 1),

    deseo:
      "Checkpoint entrenamiento",

   imagen: imgUrl || "/cards.png",

    id: Date.now(),

    checkpoint: iMesero + 1,

    tipo: "entrenamientoMesero"

  }

  setCartas(prev => {

    const nuevas = [
      ...prev,
      nuevaCarta
    ]

    localStorage.setItem(
      "cartas",
      JSON.stringify(nuevas)
    )

    return nuevas

  })

}
             const eventos = [
  "💰 Cliente dejó gran propina",
  "🔥 La cocina está colapsando",
  "🎉 Cumpleaños en mesa 4",
  "🚨 Cliente muy enojado",
  "☕ Café derramado",
  "👮 Inspección sorpresa",
  "⚡ Se fue la luz por segundos",
  "💵 Cliente VIP llegó",
  "🤒 Un compañero faltó",
  "🧹 Necesitan limpiar rápido"
]

const aleatorio = eventos[
  Math.floor(Math.random() * eventos.length)
]

setEvento(aleatorio)     
              playCorrect()



           setMensajeMesero(
"✅ correcto"
)
            hablar(
academiaMesero[0]
?.frases[iMesero]
?.correcta
)
              const next =
modo==="vozBarista"
? iBarista + 1
: iMesero + 1
              desbloquearCarta(
"meseroJuego",
next
)
              const tip = Math.floor(Math.random() * 15) + 5

              setDinero(prev => prev + tip)
              setGemas(prev=>prev+1)

             playCoin()

setTimeout(() => {

const siguiente = iMesero + 1

if (
  siguiente >=
  academiaMesero[0]?.frases.length
){

  setMensajeMesero(
    "🏆 Capítulo completado"
  )

  playLevelUp()

  const capituloActual =
    academiaMesero[0]?.capitulo || 1

  const siguienteCapitulo =
    capituloActual + 1

  setCapitulosComprados(prev=>{

    const nuevos=[
      ...new Set([
        ...prev,
        siguienteCapitulo
      ])
    ]

    localStorage.setItem(
      "capitulosComprados",
      JSON.stringify(nuevos)
    )

    return nuevos

  })

  setTimeout(()=>{

    setIMesero(0)
    setMensajeMesero("")
    setModo("mesero")

    alert(
      "🎉 Capítulo desbloqueado: " +
      siguienteCapitulo
    )

  },2000)

}else{

  setIMesero(siguiente)

}

setMensajeMesero("")

},1500)

            } else {

              playWrong()

              setMensajeMesero("❌ incorrecto")
            }

          }}
        >
          {op}
        </button>
      ))}

    {mensajeMesero && (

<div className="feedback-box">

{mensajeMesero}

</div>

)}
      
      {mensajeMesero && mensajeMesero !== "❌ incorrecto" && (
  <p
    style={{
      color:"#00ff88",
      fontWeight:"bold",
      marginTop:"10px"
    }}
  >
   🇪🇸 {
academiaMesero[0]
?.frases[iMesero]
?.traduccionRespuesta
}
  </p>
)}

      <button onClick={() => setModo("mesero")}>
        ← volver
      </button>

    </div>
  </div>
)}
          {/* 🎤 VOZ MESERO */}
{modo === "vozMesero" && (

  <div className="game-container">

    <div className="game-main">

      <h1>🎤 Modo Voz</h1>

    <h2>
{academiaMesero[0]?.frases?.[iMesero]?.personaje}
</h2>

      <p>
        Escucha y pronuncia correctamente
      </p>

      <button
        onClick={() =>
   hablar(
academiaMesero[0]?.frases[iMesero]?.pregunta
)
        }
      >
        🔊 Escuchar
      </button>

      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gap: "10px"
        }}
      >

       {academiaMesero[0]?.frases?.[iMesero]?.opciones?.map((op, idx) => (

          <button
            key={idx}

            onClick={() => {

              escucharRespuesta(op)

            }}
          >
            🎤 {op}
          </button>

        ))}

      </div>

      <p>{mensajeMesero}</p>

    <div
  style={{
    marginTop: "20px"
  }}
>

  {resultadoVoz.map((palabra, idx) => (

    <span
      key={idx}

      style={{

        color:
          palabra.correcta
            ? "lime"
            : "red",

        fontWeight: "bold",

        marginRight: "8px",

        fontSize: "22px"

      }}
    >
      {palabra.texto}
    </span>

  ))}

</div>

      {escuchando && (
        <p style={{ color: "#00ff88" }}>
          🎙️ escuchando...
        </p>
      )}

      <button
        onClick={() => setModo("mesero")}
      >
        ← volver
      </button>

    </div>

  </div>

)}
      {/* 💰 DINERO MESERO */}

{modo==="dineroMesero"&&(

<div className="game-container">

<div className="game-main">

<h1>💰 Dinero Mesero</h1>

<h2>${dinero}</h2>

<p>Desbloquea capítulos</p>

{academiaMesero.map((cap,index)=>{

const precio=
(index + 1) * 100

const comprado=

capitulosComprados.includes(
cap.capitulo
)

return(

<div
key={cap.capitulo}

style={{
background:"#222",
padding:"15px",
margin:"10px",
borderRadius:"20px"
}}
>

<h3>

{cap.titulo}

</h3>
<p>

💵 ${precio}

</p>

<button

onClick={()=>{

if(comprado){

alert(
"Ya desbloqueado"
)

return

}

if(
dinero<precio
){

alert(
"Dinero insuficiente"
)

return

}

setDinero(
prev=>prev-precio
)

setCapitulosComprados(
prev=>[
...prev,
cap.capitulo
]
)

}}

>

{

comprado
?
"✅ Desbloqueado"
:
"Comprar"

}

</button>

</div>

)

})}

<button
onClick={()=>
setModo(
"mesero"
)
}
>

← volver

</button>

</div>

</div>

)}
{/* 💰 DINERO PELUQUERO */}

{modo==="dineroPeluquero"&&(

<div className="game-container">

<div className="game-main">

<h1>

💰 Dinero Peluquero

</h1>

<h2>

${dinero}

</h2>

<p>

Desbloquea capítulos

</p>

{academiaPeluquero.map((cap,index)=>{

const precio=
(index+1)*100

const comprado=

capitulosComprados.includes(
cap.capitulo
)

return(

<div
key={cap.capitulo}

style={{

background:"#222",
padding:"15px",
margin:"10px",
borderRadius:"20px"

}}
>

<h3>
{cap.titulo}
</h3>

<p>
💵 ${precio}
</p>

<button

onClick={()=>{

if(comprado){

alert("Ya comprado")
return

}

if(dinero<precio){

alert(
"Dinero insuficiente"
)

return

}

setDinero(
prev=>prev-precio
)

setCapitulosComprados(
prev=>[
...prev,
cap.capitulo
]
)

}}

>

{
comprado
?
"✅ Desbloqueado"
:
"Comprar"
}

</button>

</div>

)

})}

<button
onClick={()=>
setModo("peluquero")
}
>

← volver

</button>

</div>

</div>

)}
{/* 💰 DINERO CAJERO */}

{modo==="dineroCajero"&&(

<div className="game-container">

<div className="game-main">

<h1>

💰 Dinero Cajero

</h1>

<h2>

${dinero}

</h2>

<p>

Desbloquea capítulos

</p>

{academiaCajero.map((cap,index)=>{

const precio=
(index+1)*100

const comprado=

capitulosComprados.includes(
cap.capitulo
)

return(

<div
key={cap.capitulo}

style={{

background:"#222",
padding:"15px",
margin:"10px",
borderRadius:"20px"

}}
>

<h3>
{cap.titulo}
</h3>

<p>
💵 ${precio}
</p>

<button

onClick={()=>{

if(comprado){

alert("Ya comprado")
return

}

if(dinero<precio){

alert(
"Dinero insuficiente"
)

return

}

setDinero(
prev=>prev-precio
)

setCapitulosComprados(
prev=>[
...prev,
cap.capitulo
]
)

}}

>

{
comprado
?
"✅ Desbloqueado"
:
"Comprar"
}

</button>

</div>

)

})}

<button
onClick={()=>
setModo("cajero")
}
>

← volver

</button>

</div>

</div>

)}
{/* 💰 DINERO DELIVERY */}

{modo==="dineroDelivery"&&(

<div className="game-container">

<div className="game-main">

<h1>

💰 Dinero Delivery

</h1>

<h2>

${dinero}

</h2>

<p>

Desbloquea capítulos

</p>

{academiaDelivery.map((cap,index)=>{

const precio=
(index+1)*100

const comprado=

capitulosComprados.includes(
cap.capitulo
)

return(

<div
key={cap.capitulo}

style={{

background:"#222",
padding:"15px",
margin:"10px",
borderRadius:"20px"

}}
>

<h3>
{cap.titulo}
</h3>

<p>
💵 ${precio}
</p>

<button

onClick={()=>{

if(comprado){

alert("Ya comprado")
return

}

if(dinero<precio){

alert(
"Dinero insuficiente"
)

return

}

setDinero(
prev=>prev-precio
)

setCapitulosComprados(
prev=>[
...prev,
cap.capitulo
]
)

}}

>

{
comprado
?
"✅ Desbloqueado"
:
"Comprar"
}

</button>

</div>

)

})}

<button
onClick={()=>
setModo("delivery")
}
>

← volver

</button>

</div>

</div>

)}
{/* 💰 DINERO UBER */}

{modo==="dineroUber"&&(

<div className="game-container">

<div className="game-main">

<h1>

💰 Dinero Uber

</h1>

<h2>

${dinero}

</h2>

<p>

Desbloquea capítulos

</p>

{academiaUber.map((cap,index)=>{

const precio=
(index+1)*100

const comprado=

capitulosComprados.includes(
cap.capitulo
)

return(

<div
key={cap.capitulo}

style={{

background:"#222",
padding:"15px",
margin:"10px",
borderRadius:"20px"

}}
>

<h3>
{cap.titulo}
</h3>

<p>
💵 ${precio}
</p>

<button

onClick={()=>{

if(comprado){

alert("Ya comprado")
return

}

if(dinero<precio){

alert(
"Dinero insuficiente"
)

return

}

setDinero(
prev=>prev-precio
)

setCapitulosComprados(
prev=>[
...prev,
cap.capitulo
]
)

}}

>

{
comprado
?
"✅ Desbloqueado"
:
"Comprar"
}

</button>

</div>

)

})}

<button
onClick={()=>
setModo("uber")
}
>

← volver

</button>

</div>

</div>

)}
{/* 💰 DINERO HOTEL */}

{modo==="dineroHotel"&&(

<div className="game-container">

<div className="game-main">

<h1>

💰 Dinero Hotel

</h1>

<h2>

${dinero}

</h2>

<p>

Desbloquea capítulos

</p>

{academiaHotel.map((cap,index)=>{

const precio=
(index+1)*100

const comprado=

capitulosComprados.includes(
cap.capitulo
)

return(

<div
key={cap.capitulo}

style={{

background:"#222",
padding:"15px",
margin:"10px",
borderRadius:"20px"

}}
>

<h3>
{cap.titulo}
</h3>

<p>
💵 ${precio}
</p>

<button

onClick={()=>{

if(comprado){

alert("Ya comprado")
return

}

if(dinero<precio){

alert(
"Dinero insuficiente"
)

return

}

setDinero(
prev=>prev-precio
)

setCapitulosComprados(
prev=>[
...prev,
cap.capitulo
]
)

}}

>

{
comprado
?
"✅ Desbloqueado"
:
"Comprar"
}

</button>

</div>

)

})}

<button
onClick={()=>
setModo("hotel")
}
>

← volver

</button>

</div>

</div>

)}
{/* 💰 DINERO BARTENDER */}

{modo==="dineroBartender"&&(

<div className="game-container">

<div className="game-main">

<h1>

💰 Dinero Bartender

</h1>

<h2>

${dinero}

</h2>

<p>

Desbloquea capítulos

</p>

{academiaBartender.map((cap,index)=>{

const precio=
(index+1)*100

const comprado=

capitulosComprados.includes(
cap.capitulo
)

return(

<div
key={cap.capitulo}

style={{

background:"#222",
padding:"15px",
margin:"10px",
borderRadius:"20px"

}}
>

<h3>

{cap.titulo}

</h3>

<p>

💵 ${precio}

</p>

<button

onClick={()=>{

if(comprado){

alert(
"Ya comprado"
)

return
}

if(
dinero<precio
){

alert(
"Dinero insuficiente"
)

return
}

setDinero(
prev=>
prev-precio
)

setCapitulosComprados(
prev=>[

...prev,
cap.capitulo

]
)

}}

>

{

comprado

?

"✅ Desbloqueado"

:

"Comprar"

}

</button>

</div>

)

})}

<button
onClick={()=>
setModo(
"bartender"
)
}
>

← volver

</button>

</div>

</div>

)}
{/* 💾 PROCESO BARTENDER */}

{modo === "procesoBartender" && (

<div className="game-container">

<div className="game-main">

<h1>💾 Mi proceso</h1>

<p>Selecciona dónde continuar</p>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit, 200px)",
gap:"20px",
justifyContent:"center"
}}
>

{cartas

.filter(carta=>

carta.tipo==="vozBartender"

||

carta.tipo==="bartenderJuego"

)

.map((carta)=>(

<div
key={carta.id}
className="carta"

onClick={()=>{

setIBarista(
carta.checkpoint || 0
)

if(
carta.tipo==="vozBartender"
){

setModo("vozBartender")

}else{

setModo("bartenderJuego")

}

}}

>

<img
src={carta.imagen || "/cards.png"}
/>

<h3>{carta.animal}</h3>

<p>{carta.deseo}</p>

</div>

))}

</div>

<button
onClick={()=>
setModo("bartender")
}
>

← volver

</button>

</div>

</div>

)}
{/* 💾 PROCESO BARISTA */}

{modo === "procesoBarista" && (

<div className="game-container">

<div className="game-main">

<h1>💾 Mi proceso</h1>

<p>Selecciona dónde continuar</p>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit, 200px)",
gap:"20px",
justifyContent:"center"
}}
>

{cartas

.filter(carta=>

carta.tipo==="vozBarista"

||

carta.tipo==="baristaJuego"

)

.map((carta)=>(

<div
key={carta.id}
className="carta"

onClick={()=>{

setIBarista(
carta.checkpoint || 0
)

if(
carta.tipo==="vozBarista"
){

setModo("vozBarista")

}else{

setModo("baristaJuego")

}

}}

>

<img
src={carta.imagen || "/cards.png"}
/>

<h3>{carta.animal}</h3>

<p>{carta.deseo}</p>

</div>

))}

</div>

<button
onClick={()=>
setModo("barista")
}
>

← volver

</button>

</div>

</div>

)}
{/* 💾 PROCESO PELUQUERO */}

{modo === "procesoPeluquero" && (

<div className="game-container">

<div className="game-main">

<h1>💾 Mi proceso</h1>

<p>Selecciona dónde continuar</p>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit, 200px)",
gap:"20px",
justifyContent:"center"
}}
>

{cartas

.filter(carta=>

carta.tipo==="vozPeluquero"

||

carta.tipo==="entrenamientoPeluquero"

)

.map((carta)=>(

<div
key={carta.id}
className="carta"

onClick={()=>{

setIBarista(
carta.checkpoint || 0
)

if(
carta.tipo==="vozPeluquero"
){

setModo("vozPeluquero")

}else{

setModo("peluqueroJuego")

}

}}

>

<img
src={
carta.imagen
?
carta.imagen
:
"/cards.png"
}
/>

<h3>{carta.animal}</h3>

<p>{carta.deseo}</p>

</div>

))}

</div>

<button
onClick={()=>
setModo("peluquero")
}
>

← volver

</button>

</div>

</div>

)}
{/* 💾 PROCESO CAJERO */}

{modo === "procesoCajero" && (

<div className="game-container">

<div className="game-main">

<h1>💾 Mi proceso</h1>

<p>Selecciona dónde continuar</p>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit, 200px)",
gap:"20px",
justifyContent:"center"
}}
>

{cartas

.filter(carta=>

carta.tipo==="vozCajero"

||

carta.tipo==="entrenamientoCajero"

)

.map((carta)=>(

<div
key={carta.id}
className="carta"

onClick={()=>{

setIBarista(
carta.checkpoint || 0
)

if(
carta.tipo==="vozCajero"
){

setModo("vozCajero")

}else{

setModo("cajeroJuego")

}

}}

>

<img
src={
carta.imagen
?
carta.imagen
:
"/cards.png"
}
/>

<h3>{carta.animal}</h3>

<p>{carta.deseo}</p>

</div>

))}

</div>

<button
onClick={()=>
setModo("cajero")
}
>

← volver

</button>

</div>

</div>

)}
{/* 💾 PROCESO DELIVERY */}

{modo === "procesoDelivery" && (

<div className="game-container">

<div className="game-main">

<h1>💾 Mi proceso</h1>

<p>Selecciona dónde continuar</p>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit, 200px)",
gap:"20px",
justifyContent:"center"
}}
>

{cartas

.filter(carta=>

carta.tipo==="vozDelivery"

||

carta.tipo==="entrenamientoDelivery"

)

.map((carta)=>(

<div
key={carta.id}
className="carta"

onClick={()=>{

setIBarista(
carta.checkpoint || 0
)

if(
carta.tipo==="vozDelivery"
){

setModo("vozDelivery")

}else{

setModo("deliveryJuego")

}

}}

>

<img
src={
carta.imagen
?
carta.imagen
:
"/cards.png"
}
/>

<h3>
{carta.animal}
</h3>

<p>
{carta.deseo}
</p>

</div>

))}

</div>

<button
onClick={()=>
setModo("delivery")
}
>

← volver

</button>

</div>

</div>

)}
{/* 💾 PROCESO UBER */}

{modo === "procesoUber" && (

<div className="game-container">

<div className="game-main">

<h1>💾 Mi proceso</h1>

<p>Selecciona dónde continuar</p>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit, 200px)",
gap:"20px",
justifyContent:"center"
}}
>

{cartas

.filter(carta=>

carta.tipo==="vozUber"

||

carta.tipo==="entrenamientoUber"

)

.map((carta)=>(

<div
key={carta.id}
className="carta"

onClick={()=>{

setIBarista(
carta.checkpoint || 0
)

if(
carta.tipo==="vozUber"
){

setModo("vozUber")

}else{

setModo("uberJuego")

}

}}

>

<img
src={
carta.imagen
?
carta.imagen
:
"/cards.png"
}
/>

<h3>
{carta.animal}
</h3>

<p>
{carta.deseo}
</p>

</div>

))}

</div>

<button
onClick={()=>
setModo("uber")
}
>

← volver

</button>

</div>

</div>

)}
{/* 💾 PROCESO HOTEL */}

{modo === "procesoHotel" && (

<div className="game-container">

<div className="game-main">

<h1>💾 Mi proceso</h1>

<p>Selecciona dónde continuar</p>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit, 200px)",
gap:"20px",
justifyContent:"center"
}}
>

{cartas

.filter(carta=>

carta.tipo==="vozHotel"

||

carta.tipo==="entrenamientoHotel"

)

.map((carta)=>(

<div
key={carta.id}
className="carta"

onClick={()=>{

setIBarista(
carta.checkpoint || 0
)

if(
carta.tipo==="vozHotel"
){

setModo("vozHotel")

}else{

setModo("hotelJuego")

}

}}

>

<img
src={
carta.imagen
?
carta.imagen
:
"/cards.png"
}
/>

<h3>
{carta.animal}
</h3>

<p>
{carta.deseo}
</p>

</div>

))}

</div>

<button
onClick={()=>
setModo("hotel")
}
>

← volver

</button>

</div>

</div>

)}
{/* 💾 PROCESO BARTENDER */}

{modo === "procesoBartender" && (

<div className="game-container">

<div className="game-main">

<h1>💾 Mi proceso</h1>

<p>Selecciona dónde continuar</p>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit, 200px)",
gap:"20px",
justifyContent:"center"
}}
>

{cartas

.filter(carta=>

carta.tipo==="vozBartender"

||

carta.tipo==="entrenamientoBartender"

)

.map((carta)=>(

<div
key={carta.id}
className="carta"

onClick={()=>{

setIBarista(
carta.checkpoint || 0
)

if(
carta.tipo==="vozBartender"
){

setModo("vozBartender")

}else{

setModo("bartenderJuego")

}

}}

>

<img
src={
carta.imagen
?
carta.imagen
:
"/cards.png"
}
/>

<h3>
{carta.animal}
</h3>

<p>
{carta.deseo}
</p>

</div>

))}

</div>

<button
onClick={()=>
setModo("bartender")
}
>

← volver

</button>

</div>

</div>

)}
      {/* 💾 PROCESO MESERO */}
      {/* 💰 DINERO */}
      {/* 💰 DINERO BARISTA */}

{modo==="dineroBarista"&&(

<div className="game-container">

<div className="game-main">

<h1>

💰 Dinero Barista

</h1>

<h2>

${dinero}

</h2>

<p>

Desbloquea capítulos

</p>

{academiaBarista.map((cap,index)=>{

const precio=
(index+1)*100

const comprado=

capitulosComprados.includes(
cap.capitulo
)

return(

<div
key={cap.capitulo}

style={{

background:"#222",
padding:"15px",
margin:"10px",
borderRadius:"20px"

}}
>

<h3>

{cap.titulo}

</h3>

<p>

💵 ${precio}

</p>

<button

onClick={()=>{

if(comprado){

alert(
"Ya comprado"
)

return
}

if(
dinero<precio
){

alert(
"Dinero insuficiente"
)

return
}

setDinero(
prev=>
prev-precio
)

setCapitulosComprados(
prev=>[

...prev,
cap.capitulo

]
)

}}

>

{

comprado

?

"✅ Desbloqueado"

:

"Comprar"

}

</button>

</div>

)

})}

<button
onClick={()=>
setModo(
"barista"
)
}
>

← volver

</button>

</div>

</div>

)}
{modo === "dinero" && (

  <div className="game-container">

    <div className="game-main">

      <h1>🏦 Cofre del Reino</h1>

      <div
        style={{
          fontSize: "120px",
          marginBottom: "20px"
        }}
      >
        💰
      </div>

      <h2>${dinero}</h2>

      <p>
        Dinero acumulado de
        todos tus juegos y niveles.
      </p>

      <div
        style={{
          background: "#1e1e1e",
          padding: "20px",
          borderRadius: "20px",
          marginTop: "20px",
          display: "grid",
          gap: "15px"
        }}
      >

        <button
          onClick={() => {

            if (dinero >= 50) {

              setDinero(prev => prev - 50)

              setVidas(prev => prev + 1)

              alert("❤️ vida comprada")

            } else {

              alert("❌ dinero insuficiente")

            }

          }}
        >
          ❤️ Comprar vida ($50)
        </button>

        <button
          onClick={() => {

            if (dinero >= 75) {

              setDinero(prev => prev - 75)

              setTiempo(prev => prev + 15)

              alert("⏰ +15 segundos")

            } else {

              alert("❌ dinero insuficiente")

            }

          }}
        >
          ⏰ Comprar tiempo ($75)
        </button>

        <button
          onClick={() => {

            if (dinero >= 100) {

              setDinero(prev => prev - 100)

              setIMesero(prev => prev + 1)

              alert("⚡ pregunta saltada")

            } else {

              alert("❌ dinero insuficiente")

            }

          }}
        >
          ⚡ Saltar pregunta ($100)
        </button>

      </div>

      <button
        onClick={() => setModo("mesero")}
      >
        ← volver
      </button>

    </div>

  </div>

)}
{modo === "procesoMesero" && (

  <div className="game-container">

    <div className="game-main">

      <h1>💾 Mi proceso</h1>

      <p>Selecciona dónde continuar</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 200px)",
          gap: "20px",
          justifyContent: "center"
        }}
      >

        {cartas
  .filter(carta =>

    carta.tipo === "vozMesero"

    ||

    carta.tipo === "entrenamientoMesero"

  )

  .map((carta) => (

          <div
  key={carta.id}
  className="carta"

  onClick={() => {

    setIMesero(
      carta.checkpoint || 0
    )

  if (
      carta.tipo === "vozMesero"
    ) {

     setModo("vozMesero")

    } else {

      setModo("meseroJuego")

    }

  }}
>

            <img
              src={
                carta.imagen
                  ? carta.imagen
                  : "/cards.png"
              }

              alt="carta"
            />

            <h3>{carta.animal}</h3>

            <p>{carta.deseo}</p>

          </div>

        ))}

      </div>

      <button
        onClick={() => setModo("mesero")}
      >
        ← volver
      </button>

    </div>

  </div>

)}
      {/* 🃏 CARTAS */}
      {modo === "cartas" && (
        <div className="game-container">
          <div className="game-main">

            <h1>🃏 Mis Cartas</h1>
            <h2>📖 Cartas de la Historia</h2>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",
gap:"20px",
marginBottom:"40px"
}}
>

{cartasHistoria.map(carta => {

const desbloqueada =
cartas.some(
c => c.imagen === carta.imagen
)

return (

<div
key={carta.id}
className="carta"
style={{
position:"relative"
}}
>

<img
src={carta.imagen}
alt={carta.nombre}
style={{
width:"220px",
height:"320px",
objectFit:"cover",
borderRadius:"15px",
display:"block"
}}
/>

{!desbloqueada && (

<div
style={{
position:"absolute",
top:"50%",
left:"50%",
transform:"translate(-50%,-50%)",
fontSize:"60px",
textShadow:"0 0 20px black"
}}
>
🔒
</div>

)}

<h3
style={{
minHeight:"90px",
display:"flex",
alignItems:"center",
justifyContent:"center",
textAlign:"center",
margin:"10px 0",
color: desbloqueada
? "white"
: "#777"
}}
>
{desbloqueada
? carta.nombre
: "Carta Misteriosa"}
</h3>

</div>

)

})}

</div>
                 <p>Total cartas: {cartas.length}</p>
            {cartas.length === 0 && <p>No tienes cartas todavía</p>}
<div className="shopStats">

<div>📚 {cartas.length}</div>

<div>
🏆 {
cartas.filter(
c=>c.tipo==="legendaria"
).length
}
</div>

<div>
💎 {
cartas.filter(
c=>c.tipo==="epica"
).length
}
</div>

</div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, 200px)",
              gap: "20px",
              justifyContent: "center"
            }}>
              {cartas.map((carta) => (
              <div
  key={carta.id}
  className={`carta ${carta.tipo}`}
onClick={() => {

  if (carta.tipo === "aprender") {

    const pos = carta.checkpoint || 0

    setI(pos)

    setRespuesta([])

    setMezcladas(
      [...frases[pos][0].split(" ")]
      .sort(() => Math.random() - 0.5)
    )

    setModo("aprender")

    hablar(frases[pos][0])

  }

}}
>
                  <img
                    src={
  carta.imagen
    ? carta.imagen
    : "/cards.png"
}
                    loading="lazy"
                  />
                  <h3>{carta.animal}</h3>
                  <p>

{
carta.tipo==="legendaria"
? "👑 Legendaria"

: carta.tipo==="epica"
? "💎 Épica"

: "⭐ Común"
}

</p>
                  <p>{carta.deseo}</p>
                </div>
              ))}
            </div>

            <button onClick={() => setModo("menu")}>
              ← volver
            </button>

          </div>
        </div>
      )}
      {modo==="mazo"&&(

<div className="game-container">

<div className="game-main">

<h1>🎴 Constructor de Mazo</h1>

<h2>
Cartas seleccionadas:
{mazoBatalla.length}/10
</h2>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,200px)",
gap:"10px"
}}
>

{coleccionCartas
.slice(0, cartas.length)
.map((carta)=>(

<button
key={carta.id}

onClick={()=>{

if(mazoBatalla.length>=10){
alert("Máximo 10 cartas")
return
}

if(
mazoBatalla.some(
c=>c.id===carta.id
)
){
return
}

setMazoBatalla(prev=>[
...prev,
carta
])

}}

>

{carta.nombre}

⚡ {carta.energia}

</button>

))}

</div>

<h3>
Mazo actual
</h3>

{mazoBatalla.map((carta)=>(

<div
key={carta.id}
style={{
margin:"5px"
}}
>

{carta.nombre}

<button
onClick={()=>{

setMazoBatalla(

mazoBatalla.filter(
c=>c.id!==carta.id
)

)

}}
>

❌

</button>

</div>

))}

<button

disabled={
mazoBatalla.length===0
}

onClick={()=>{

setModoAjedrez("ia")
setModo("ajedrez")

}}

>

🤖 VS IA

</button>

<button

disabled={
mazoBatalla.length===0
}

onClick={()=>{

setModoAjedrez("humano")
setModo("ajedrez")

}}

>

👥 2 JUGADORES

</button>

<button
onClick={()=>
setModo("menu")
}
>

← volver

</button>

</div>

</div>

)}
{modo==="ajedrez"&&(

<div className="game-container">

<div className="game-main">

<h1>♟️ AJEDREZ</h1>

<h2>
Turno:
{
turno==="azul"
? " 🔵 Azul"
: " 🔴 Rojo"
}
</h2>
<div
style={{
fontSize:"22px",
fontWeight:"bold",
marginBottom:"10px"
}}
>
⚡ Energía: {energia}
</div>
<div
style={{

display:"grid",

gridTemplateColumns:
"repeat(8,60px)",

gap:"2px",

justifyContent:"center",

marginTop:"20px"

}}
>

{tablero.map((fila,f)=>

fila.map((pieza,c)=>(

<button

key={f+"-"+c}

onClick={()=>
clickCelda(f,c)
}

style={{

width:"60px",

height:"60px",

fontSize:"28px",

fontWeight:"bold",

border:"none",

cursor:"pointer",

background:

seleccion &&
seleccion[0]===f &&
seleccion[1]===c

?

"#00e676"

:

ultimaJugada && (

(
ultimaJugada[0][0]===f &&
ultimaJugada[0][1]===c
)

||

(
ultimaJugada[1][0]===f &&
ultimaJugada[1][1]===c
)

)

?

"#ffd54f"

:

movimientoPosible(f,c)

?

"#81c784"

:

(f+c)%2===0
? "#f0d9b5"
: "#b58863",

color:
esAzul(pieza)
? "#2196f3"
: "#ff4444"

}}

>

{piezasUnicode[pieza] || ""}

</button>

))

)}

</div>

<div
style={{
display:"flex",
flexWrap:"wrap",
justifyContent:"center",
gap:"10px",
marginTop:"20px"
}}
>

<div
style={{
display:"flex",
justifyContent:"center",
gap:"10px",
marginTop:"20px"
}}
>



</div>
<h2
style={{
textAlign:"center",
marginTop:"20px"
}}
>
🎴 TUS CARTAS
</h2>
<div
style={{
display:"flex",
flexWrap:"wrap",
justifyContent:"center",
gap:"15px",
marginTop:"20px"
}}
>

{mazoBatalla.map(carta=>(

<div
key={carta.id}

onClick={()=>
setCartaSeleccionada(carta)
}

style={{
cursor:"pointer",
border:
cartaSeleccionada?.id===carta.id
? "4px solid gold"
: "2px solid #555",
borderRadius:"15px",
padding:"10px",
background:"#111",
width:"150px",
textAlign:"center"
}}
>

<img
src={carta.imagen}
alt={carta.nombre}
style={{
width:"100%",
height:"200px",
objectFit:"cover",
borderRadius:"10px"
}}
/>

<h4>
{carta.nombre}
</h4>

</div>

))}

</div>

</div>


<h3
style={{
textAlign:"center",
marginTop:"20px"
}}
>

<h3>
🎴 Carta activa:
{
cartaSeleccionada
? cartaSeleccionada.nombre
: " Ninguna"
}
</h3>

{cartaSeleccionada && (

<div
style={{
background:"#111",
padding:"15px",
borderRadius:"15px",
marginTop:"10px"
}}
>

<img
src={cartaSeleccionada.imagen}
style={{
width:"1500px",
maxWidth:"90%",
borderRadius:"20px",
borderRadius:"20px"
}}
/>

<h2>
✨ Poder Especial
</h2>

<p>

{cartaSeleccionada.descripcion}

</p>

<p
style={{
color:"#FFD700",
fontWeight:"bold"
}}
>

Selecciona una pieza para activar el poder.

</p>
<button
onClick={()=>{

setModoCarta(true)

alert(
"Selecciona una pieza para usar el poder"
)

}}
>

⚡ Usar Carta

</button>

</div>

)}

{
cartaSeleccionada
? cartaSeleccionada.nombre
: " Ninguna"
}

</h3>
<div
style={{
marginTop:"20px",
display:"flex",
gap:"10px",
justifyContent:"center"
}}
>

<button

onClick={()=>{

setTablero([
["r","n","b","q","k","b","n","r"],
["p","p","p","p","p","p","p","p"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["P","P","P","P","P","P","P","P"],
["R","N","B","Q","K","B","N","R"]
])

setTurno("azul")
setTurno("azul")
setSeleccion(null)
setUltimaJugada(null)
}}

>

🔄 Reiniciar partida

</button>

<button
onClick={()=>{

setModoCarta(true)

alert(
"Selecciona una pieza para usar el poder"
)

}}
>

← volver

</button>

</div>



</div>

</div>

)}
{modo === "tienda" && (

<div className="game-container">

<div className="game-main">

<h1>👑 TIENDA DEL REINO</h1>

<div className="shopStats">

<div>💰 {dinero}</div>
<div>💎 {gemas}</div>
<div>❤️ {vidas}</div>

</div>

<div className="shopGrid">

<div className="shopCard">
<h2>❤️ Vida Extra</h2>
<p>Recupera una vida</p>

<button
onClick={()=>{
if(dinero < 50){
alert("Dinero insuficiente")
return
}

setDinero(prev=>prev-50)
setVidas(prev=>prev+1)
}}
>
Comprar $50
</button>

</div>

<div className="shopCard">
<h2>💎 Gemas</h2>
<p>5 Gemas mágicas</p>

<button
onClick={()=>{
if(dinero < 100){
alert("Dinero insuficiente")
return
}

setDinero(prev=>prev-100)
setGemas(prev=>prev+5)
}}
>
Comprar $100
</button>

</div>

<div className="shopCard epic">
<h2>🐉 Carta Épica</h2>
<p>Animal legendario</p>

<button
onClick={()=>{
if(gemas < 10){
alert("Gemas insuficientes")
return
}

setGemas(prev=>prev-10)
console.log("CARTA NUEVA", nuevaCarta)
const nuevaCarta={
animal:"🐉 Dragón Épico",
poder:"+50 XP",
deseo:"Carta exclusiva",
imagen:"/cards.png",
id:Date.now(),
tipo:"epica"
}

setCartas(prev=>{

const nuevas=[...prev,nuevaCarta]

localStorage.setItem(
"cartas",
JSON.stringify(nuevas)
)

return nuevas
})

}}
>
10 💎
</button>

</div>

<div className="shopCard legendary">
<h2>👑 Sobre Legendario</h2>
<p>Garantiza carta rara</p>

<button
onClick={()=>{
alert("Próximamente")
}}
>
25 💎
</button>

</div>

</div>

<button
onClick={()=>setModo("menu")}
>
← volver
</button>

</div>

</div>

)}
      {/* 🏠 MENU */}
      {modo === "menu" && (
        <>
    <button
onClick={reiniciarJuego}
style={{
position:"fixed",
top:"15px",
left:"35px",
zIndex:"9999"
}}
>
🔄 Reiniciar
</button>
          <div className="cards-top">
            <img src="/capricornio.png" />
            <img src="/caprican.png" />
            <img src="/torricorn.png" />
            <img src="/hippo.png" />
          </div>

          <h1 className="title">
            INGLÉS <span>PRO 👑</span>
          </h1>

          <p className="subtitle">Aprende • Juega • Progresa</p>

          <div className="grid">
            <div className="card" onClick={iniciarAprender}>
              <img src="/book.png" />
            </div>

            {/* 🔥 NUEVO: intermedio */}
            <div className="card" onClick={iniciarIntermedio}>
              <img src="/book2.png" />
            </div>

            <div className="card" onClick={() => playSound()}>
              <div
className="card"
onClick={() => setModo("mazo")}
>

<img src="/game.png" />

</div>
           
            </div>

            <div className="card" onClick={() => setModo("academia")}>
            <img src="/academy.png" />
            </div>

            <div className="card" onClick={() => playSound()}>
              <img src="/exit.png" />
            </div>

            <div className="card" onClick={() => setModo("cartas")}>
              <img src="/cards.png" />
            </div>

            <div
  className="card"
  onClick={() => setModo("tienda")}
>
  <img src="/pack.png" />
</div>

<div
className="card"
onClick={()=>{
setModo("perfil")
}}
>

<img

src={
usuario.foto
? usuario.foto
: "/perfil.png"
}

style={{
width:"100%",
height:"100%",
objectFit:"cover",
borderRadius:"20px"
}}

/>

<span>
👤 PERFIL
</span>

</div>
            <button
onClick={()=>setModo("tienda")}
style={{
position:"fixed",
top:"15px",
right:"35px",
zIndex:"9999",
width:"90px",
height:"90px",
borderRadius:"25px",
fontSize:"32px",
border:"none",
cursor:"pointer",
background:
"linear-gradient(135deg,#FFD700,#FFA500)",
boxShadow:
"0 6px 18px rgba(255,215,0,.5)"
}}
>
👑
</button>
          </div>
        </>
      )}

    </div>
  )
}



export default App










