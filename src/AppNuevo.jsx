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
import './App.css'

function App() {

  const mezclarArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5)
}
  // 🔐 progreso seguro
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
    setCartas(JSON.parse(guardadas))
    
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
nivel:5,
animal:"📘 Primeras palabras",
poder:"+10 XP",
deseo:"Has aprendido frases básicas",
imagen:"/principiante1.png"
},

{
modo:"aprender",
nivel:10,
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

if(!recompensa)return

const existe=

cartas.some(

c=>

c.animal===recompensa.animal

)

if(existe)return

const nuevaCarta={

...recompensa,

id:Date.now(),

checkpoint:nivelActual,

tipo:modoActual



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
        setModo("mesero")
        return 3
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

<img
src={cartaNueva.imagen}
style={{
width:"200px",
borderRadius:"20px"
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
          </div>

          {/* MAIN */}
          <div className="game-main">

            <h1>Modo Principiante</h1>
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

playCoin()
  setI(next)
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

    const guardado = JSON.parse(
      localStorage.getItem("progreso")
    )

    if (guardado) {
      setI(guardado.i || 0)
      setPuntos(guardado.puntos || 0)
    }

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
                setModo("menu")
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

      {mensajeIntermedio === "✅ correcto" && (
        <p style={{ color: "#00ff88", fontWeight: "bold" }}>
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

{modo==="perfil" && (

<div className="game-container">

<div className="game-main">

<div
style={{
position:"relative",
display:"inline-block"
}}
>

<img
src="/perfil-portada.png"
style={{
width:"95%",
maxWidth:"700px",
height:"auto",
display:"block",
margin:"auto",
borderRadius:"30px"
}}
/>

{/* EDITAR PERFIL */}

<button
onClick={()=>{

const nuevoNombre=prompt(
"Nuevo nombre:",
usuario.nombre
)

if(nuevoNombre){

const nuevoUsuario={
...usuario,
nombre:nuevoNombre
}

setUsuario(nuevoUsuario)

localStorage.setItem(
"usuario",
JSON.stringify(nuevoUsuario)
)

}

}}

style={{
position:"absolute",
left:"50px",
top:"545px",
width:"170px",
height:"95px",
opacity:0,
border:"none",
background:"transparent",
cursor:"pointer"
}}
>
</button>


{/* CAMBIAR AVATAR */}

<button
onClick={()=>{
alert("Cambiar avatar")
}}

style={{
position:"absolute",
left:"235px",
top:"545px",
width:"220px",
height:"95px",
opacity:0,
border:"none",
background:"transparent",
cursor:"pointer"
}}
>
</button>


{/* INICIO */}

<button
onClick={()=>{
setModo("academia")
}}

style={{
position:"absolute",
left:"15px",
top:"650px",
width:"75px",
height:"70px",
opacity:0,
border:"none",
background:"transparent",
cursor:"pointer"
}}
>
</button>


{/* ACADEMIA */}

<button
onClick={()=>{
setModo("menu")
}}

style={{
position:"absolute",
left:"120px",
top:"650px",
width:"75px",
height:"70px",
opacity:0,
border:"none",
background:"transparent",
cursor:"pointer"
}}
>
</button>


{/* BATALLA */}

<button
onClick={()=>{
setModo("batalla")
}}

style={{
position:"absolute",
left:"225px",
top:"650px",
width:"75px",
height:"70px",
opacity:0,
border:"none",
background:"transparent",
cursor:"pointer"
}}
>
</button>


{/* TIENDA */}

<button
onClick={()=>{
setModo("tienda")
}}

style={{
position:"absolute",
left:"330px",
top:"650px",
width:"75px",
height:"70px",
opacity:0,
border:"none",
background:"transparent",
cursor:"pointer"
}}
>
</button>


{/* MÁS */}

<button
onClick={()=>{
alert("Más opciones")
}}

style={{
position:"absolute",
left:"435px",
top:"650px",
width:"75px",
height:"70px",
opacity:0,
border:"none",
background:"transparent",
cursor:"pointer"
}}
>
</button>

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
              const playCoin=()=>{

new Audio(
"/sounds/coin.mp3"
).play()

}

const playCard=()=>{

new Audio(
"/sounds/card.mp3"
).play()

}

const playLegendary=()=>{

new Audio(
"/sounds/legendary.mp3"
).play()

}

const playClick=()=>{

new Audio(
"/sounds/click.mp3"
).play()

}

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
if ((iBarista + 1) % 15 === 0) {

setMostrarCofre(true)

const nuevaCarta = {

animal:
"🍸 Bartender " +
(iBarista + 1),

deseo:
"Checkpoint bartender",

imagen:"/cards.png",

id:Date.now(),

checkpoint:iBarista+1,

tipo:"entrenamientoBartender"

}
playCard()
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

}
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
        academiaMesero[0]?.frases[iMesero]
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
                 <p>Total cartas: {cartas.length}</p>
            {cartas.length === 0 && <p>No tienes cartas todavía</p>}

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, 200px)",
              gap: "20px",
              justifyContent: "center"
            }}>
              {cartas.map((carta) => (
               <div
  key={carta.id}
  className={`carta ${carta.rareza}`}

  onClick={() => {

   setIIntermedio(
  Math.min(
    carta.checkpoint || 0,
    intermedio.length - 1
  )
)

    setModo("intermedio")

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
              <img src="/game.png" />
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

            <div className="card" onClick={() => playSound()}>
              <img src="/pack.png" />
            </div>

            <div
className="card"
onClick={()=>{
setModo("perfil")
}}
>

<img src="/perfil.png"/>

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










