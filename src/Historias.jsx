import { useEffect, useMemo, useRef, useState } from "react";

import "./Historias.css";



const temas = [

  ["Saludos y nuevas amistades", "Vida diaria"],

  ["Conociendo a un vecino", "Vida diaria"],

  ["Una conversación en el parque", "Vida diaria"],

  ["Hablar sobre la familia", "Familia"],

  ["Una llamada a mamá", "Familia"],

  ["Planes para el fin de semana", "Vida diaria"],

  ["Preparando el desayuno", "Comida"],

  ["Pidiendo café", "Restaurantes"],

  ["Ordenando en un restaurante", "Restaurantes"],

  ["Pidiendo la cuenta", "Restaurantes"],

  ["En el supermercado", "Compras"],

  ["Preguntando por un precio", "Compras"],

  ["Devolviendo un producto", "Compras"],

  ["Comprando ropa", "Compras"],

  ["Buscando zapatos", "Compras"],

  ["Tomando el metro", "Transporte"],

  ["Preguntando por una dirección", "Transporte"],

  ["Tomando un taxi", "Transporte"],

  ["En el aeropuerto", "Viajes"],

  ["Registrándose en un hotel", "Viajes"],

  ["Perdiendo una maleta", "Viajes"],

  ["Reservando una habitación", "Viajes"],

  ["Conociendo una ciudad", "Viajes"],

  ["Pidiendo ayuda", "Vida diaria"],

  ["Hablando con un compañero", "Trabajo"],

  ["La primera entrevista de trabajo", "Trabajo"],

  ["Preguntas en una entrevista", "Trabajo"],

  ["El primer día de trabajo", "Trabajo"],

  ["Hablando con el jefe", "Trabajo"],

  ["Organizando una reunión", "Trabajo"],

  ["Llegando tarde al trabajo", "Trabajo"],

  ["Explicando un problema", "Trabajo"],

  ["Pidiendo vacaciones", "Trabajo"],

  ["Buscando empleo", "Trabajo"],

  ["Una llamada profesional", "Trabajo"],

  ["Trabajando en equipo", "Trabajo"],

  ["Resolviendo un desacuerdo", "Trabajo"],

  ["Haciendo una presentación", "Trabajo"],

  ["Hablando de un proyecto", "Trabajo"],

  ["Despidiéndose de un compañero", "Trabajo"],

  ["En una cafetería", "Restaurantes"],

  ["Pidiendo comida para llevar", "Restaurantes"],

  ["Una alergia alimentaria", "Salud"],

  ["Cocinando con un amigo", "Comida"],

  ["Una receta familiar", "Comida"],

  ["Invitando a cenar", "Familia"],

  ["Organizando una fiesta", "Eventos"],

  ["Comprando un regalo", "Compras"],

  ["En una tienda de tecnología", "Compras"],

  ["Preguntando por una oferta", "Compras"],

  ["En la farmacia", "Salud"],

  ["Pidiendo una cita médica", "Salud"],

  ["Describiendo síntomas", "Salud"],

  ["En el consultorio del dentista", "Salud"],

  ["Hablando sobre el ejercicio", "Salud"],

  ["En el gimnasio", "Salud"],

  ["Conociendo a un entrenador", "Salud"],

  ["Hablando sobre el sueño", "Salud"],

  ["Buscando una dirección médica", "Salud"],

  ["Llamando a emergencias", "Emergencias"],

  ["En una estación de gasolina", "Transporte"],

  ["Problemas con el automóvil", "Transporte"],

  ["Alquilando un carro", "Viajes"],

  ["Hablando con un mecánico", "Transporte"],

  ["Buscando estacionamiento", "Transporte"],

  ["Conduciendo en otra ciudad", "Transporte"],

  ["Pidiendo indicaciones en carretera", "Transporte"],

  ["Tomando un autobús", "Transporte"],

  ["Comprando un boleto de tren", "Transporte"],

  ["Perdiendo el tren", "Transporte"],

  ["Conociendo a un compañero de clase", "Estudios"],

  ["Preguntando al profesor", "Estudios"],

  ["Estudiando para un examen", "Estudios"],

  ["Trabajando en un proyecto escolar", "Estudios"],

  ["Aprendiendo inglés", "Estudios"],

  ["Practicando la pronunciación", "Estudios"],

  ["Pidiendo que repitan algo", "Estudios"],

  ["Haciendo una pregunta en clase", "Estudios"],

  ["Inscribiéndose en un curso", "Estudios"],

  ["Hablando sobre una carrera", "Estudios"],

  ["Haciendo nuevos amigos", "Amistad"],

  ["Invitando a salir", "Relaciones"],

  ["Organizando una cita", "Relaciones"],

  ["Hablando de sentimientos", "Relaciones"],

  ["Pidiendo disculpas", "Relaciones"],

  ["Resolviendo un malentendido", "Relaciones"],

  ["Hablando de confianza", "Relaciones"],

  ["Conociendo a los padres de alguien", "Familia"],

  ["Celebrando un aniversario", "Eventos"],

  ["Dando las gracias", "Vida diaria"],

  ["Hablando del clima", "Vida diaria"],

  ["Planeando un día de playa", "Viajes"],

  ["En un parque nacional", "Viajes"],

  ["Reservando una excursión", "Viajes"],

  ["Alquilando una bicicleta", "Transporte"],

  ["Haciendo senderismo", "Viajes"],

  ["Preguntando por una actividad", "Viajes"],

  ["Comprando entradas para un concierto", "Eventos"],

  ["En el cine", "Entretenimiento"],

  ["Hablando sobre una película", "Entretenimiento"],

  ["Comprando entradas para un partido", "Deportes"],

  ["Hablando de fútbol", "Deportes"],

  ["Jugando al baloncesto", "Deportes"],

  ["En una piscina", "Deportes"],

  ["Organizando un viaje con amigos", "Viajes"],

  ["Haciendo una reserva por teléfono", "Viajes"],

  ["Cambiando una reserva", "Viajes"],

  ["Preguntando por el desayuno del hotel", "Viajes"],

  ["Solicitando una habitación diferente", "Viajes"],

  ["Usando el servicio de lavandería", "Viajes"],

  ["Pidiendo una recomendación", "Viajes"],

  ["Hablando con el recepcionista", "Viajes"],

  ["En una oficina de correos", "Servicios"],

  ["Enviando un paquete", "Servicios"],

  ["Abriendo una cuenta bancaria", "Dinero"],

  ["Preguntando por una transferencia", "Dinero"],

  ["Pagando con tarjeta", "Compras"],

  ["Retirando dinero de un cajero", "Dinero"],

  ["Haciendo un presupuesto", "Dinero"],

  ["Hablando sobre el alquiler", "Vivienda"],

  ["Buscando un apartamento", "Vivienda"],

  ["Visitando una vivienda", "Vivienda"],

  ["Hablando con el propietario", "Vivienda"],

  ["Reportando una reparación", "Vivienda"],

  ["Compartiendo un apartamento", "Vivienda"],

  ["Comprando muebles", "Vivienda"],

  ["Decorando una habitación", "Vivienda"],

  ["Haciendo una mudanza", "Vivienda"],

  ["Conociendo a los nuevos vecinos", "Vivienda"],

  ["Una videollamada", "Tecnología"],

  ["Problemas con el internet", "Tecnología"],

  ["Configurando un teléfono", "Tecnología"],

  ["Olvidando una contraseña", "Tecnología"],

  ["Pidiendo soporte técnico", "Tecnología"],

  ["Comprando una computadora", "Tecnología"],

  ["Hablando por mensajes", "Tecnología"],

  ["Organizando una reunión virtual", "Trabajo"],

  ["Protegiendo información personal", "Tecnología"],

  ["Aprendiendo a usar una aplicación", "Tecnología"],

  ["Cuidando una mascota", "Animales"],

  ["En una clínica veterinaria", "Animales"],

  ["Paseando al perro", "Animales"],

  ["Adoptando un animal", "Animales"],

  ["Hablando sobre mascotas", "Animales"],

  ["Pidiendo ayuda a un desconocido", "Vida diaria"],

  ["Devolviendo una cartera encontrada", "Vida diaria"],

  ["Perdiendo las llaves", "Vida diaria"],

  ["Quedándose sin batería", "Tecnología"],

  ["Haciendo una denuncia", "Servicios"],

  ["Hablando con un policía", "Servicios"],

  ["Buscando un objeto perdido", "Servicios"],

  ["En una oficina de atención al cliente", "Servicios"],

  ["Presentando una queja", "Servicios"],

  ["Resolviendo un cobro incorrecto", "Dinero"],

  ["Haciendo una compra por internet", "Compras"],

  ["Recibiendo una entrega", "Compras"],

  ["Cambiando la fecha de entrega", "Compras"],

  ["Hablando con el repartidor", "Servicios"],

  ["Preparando una celebración", "Eventos"],

  ["Organizando una boda", "Eventos"],

  ["Dando un discurso", "Eventos"],

  ["Felicitar a un amigo", "Eventos"],

  ["Celebrando un cumpleaños", "Eventos"],

  ["Hablando de tradiciones", "Cultura"],

  ["Conociendo otra cultura", "Cultura"],

  ["Explicando una costumbre", "Cultura"],

  ["Hablando sobre música", "Entretenimiento"],

  ["Recomendando una canción", "Entretenimiento"],

  ["Visitando un museo", "Cultura"],

  ["Comprando un recuerdo", "Viajes"],

  ["Preguntando sobre una obra de arte", "Cultura"],

  ["Hablando de libros", "Entretenimiento"],

  ["En una biblioteca", "Estudios"],

  ["Hablando de metas personales", "Vida diaria"],

  ["Organizando la semana", "Vida diaria"],

  ["Haciendo una lista de tareas", "Vida diaria"],

  ["Administrando el tiempo", "Trabajo"],

  ["Tomando una decisión", "Vida diaria"],

  ["Expresando una opinión", "Conversación"],

  ["No estar de acuerdo con respeto", "Conversación"],

  ["Debatiendo una idea", "Conversación"],

  ["Explicando una experiencia", "Conversación"],

  ["Contando una anécdota", "Conversación"],

  ["Hablando de recuerdos de infancia", "Familia"],

  ["Conversando sobre el futuro", "Conversación"],

  ["Hablando de tecnología futura", "Conversación"],

  ["Conversando sobre el medio ambiente", "Conversación"],

  ["Ahorrando energía en casa", "Vivienda"],

  ["Reciclando con los vecinos", "Vivienda"],

  ["Participando en voluntariado", "Comunidad"],

  ["Ayudando en un refugio", "Comunidad"],

  ["Organizando una actividad comunitaria", "Comunidad"],

  ["Conociendo a un nuevo compañero", "Trabajo"],

  ["Negociando un horario", "Trabajo"],

  ["Explicando un error", "Trabajo"],

  ["Pidiendo retroalimentación", "Trabajo"],

  ["Preparándose para una promoción", "Trabajo"],

  ["Atendiendo a un cliente difícil", "Trabajo"],

  ["Ofreciendo un servicio", "Negocios"],

  ["Hablando de un emprendimiento", "Negocios"],

  ["Negociando un precio", "Negocios"],

  ["Presentando una idea de negocio", "Negocios"],

  ["Hablando con un proveedor", "Negocios"],

  ["Programando una entrega", "Negocios"],

  ["Organizando un equipo", "Negocios"],

  ["Hablando de objetivos de ventas", "Negocios"],

  ["Resolviendo un problema con un cliente", "Negocios"],

  ["Cerrando un acuerdo", "Negocios"],

  ["Haciendo una llamada de seguimiento", "Negocios"],

  ["Preparando una entrevista importante", "Trabajo"],

  ["Practicando respuestas profesionales", "Trabajo"],

  ["Hablando de experiencia laboral", "Trabajo"],

  ["Explicando habilidades personales", "Trabajo"],

  ["Buscando oportunidades de crecimiento", "Trabajo"],

  ["Hablando de hábitos saludables", "Salud"],

  ["Preparando comidas para la semana", "Comida"],

  ["Comprando ingredientes frescos", "Comida"],

  ["Pidiendo una opción vegetariana", "Restaurantes"],

  ["Explicando una preferencia alimentaria", "Comida"],

  ["Planeando unas vacaciones", "Viajes"],

  ["Comparando destinos turísticos", "Viajes"],

  ["Haciendo el registro de un vuelo", "Viajes"],

  ["Pasando por seguridad del aeropuerto", "Viajes"],

  ["Preguntando por una conexión", "Viajes"],

  ["Cambiando dinero en otro país", "Viajes"],

  ["Hablando con un guía turístico", "Viajes"],

  ["Pidiendo ayuda en otro idioma", "Viajes"],

  ["Conociendo a alguien en un evento", "Amistad"],

  ["Manteniendo una conversación informal", "Conversación"],

  ["Cambiando de tema con naturalidad", "Conversación"],

  ["Haciendo preguntas abiertas", "Conversación"],

  ["Terminando una conversación educadamente", "Conversación"]

];




// Biblioteca ampliada estilo streaming: 10.000 capítulos buscables y clasificados.
const escenarios = [
  ["en casa", "Vida diaria"], ["con un amigo", "Amistad"], ["con la familia", "Familia"],
  ["en el trabajo", "Trabajo"], ["con un cliente", "Negocios"], ["durante un viaje", "Viajes"],
  ["en una tienda", "Compras"], ["en una cafetería", "Restaurantes"], ["en una clase", "Estudios"],
  ["por teléfono", "Tecnología"], ["en una oficina", "Servicios"], ["en la ciudad", "Vida diaria"],
  ["en el vecindario", "Comunidad"], ["en el aeropuerto", "Viajes"], ["en un hotel", "Viajes"],
  ["en una clínica", "Salud"], ["en un restaurante", "Restaurantes"], ["en una reunión", "Trabajo"],
  ["en una entrevista", "Trabajo"], ["durante una emergencia", "Emergencias"], ["en el gimnasio", "Salud"],
  ["en el banco", "Dinero"], ["en el supermercado", "Compras"], ["en el transporte público", "Transporte"],
  ["en carretera", "Transporte"], ["en una cita", "Relaciones"], ["en una fiesta", "Eventos"],
  ["en un concierto", "Entretenimiento"], ["en el cine", "Entretenimiento"], ["en un museo", "Cultura"],
  ["en la universidad", "Estudios"], ["con un vecino", "Comunidad"], ["con un desconocido", "Vida diaria"],
  ["en una videollamada", "Tecnología"], ["en una aplicación", "Tecnología"], ["con el propietario", "Vivienda"],
  ["en un apartamento", "Vivienda"], ["en una boda", "Eventos"], ["en un cumpleaños", "Eventos"],
  ["en la playa", "Viajes"], ["en la montaña", "Viajes"], ["en un parque", "Viajes"],
  ["en una farmacia", "Salud"], ["con un médico", "Salud"], ["con un mecánico", "Transporte"],
  ["con un repartidor", "Servicios"], ["en atención al cliente", "Servicios"], ["con un proveedor", "Negocios"],
  ["en una negociación", "Negocios"], ["en una presentación", "Trabajo"], ["en una entrevista de trabajo", "Trabajo"],
  ["en una mudanza", "Vivienda"], ["cuidando una mascota", "Animales"], ["en una veterinaria", "Animales"],
  ["en una biblioteca", "Estudios"], ["en una clase de inglés", "Estudios"], ["en una oficina de correos", "Servicios"],
  ["en una estación de tren", "Transporte"], ["en el metro", "Transporte"], ["en un taxi", "Transporte"],
  ["en un vuelo", "Viajes"], ["en una excursión", "Viajes"], ["en una tienda de ropa", "Compras"],
  ["en una tienda de tecnología", "Compras"], ["en una cocina", "Comida"], ["preparando una receta", "Comida"],
  ["en una cena formal", "Restaurantes"], ["en una entrevista de radio", "Entretenimiento"], ["en un partido", "Deportes"],
  ["jugando al baloncesto", "Deportes"], ["jugando al fútbol", "Deportes"], ["en una actividad comunitaria", "Comunidad"],
  ["haciendo voluntariado", "Comunidad"], ["en una oficina de gobierno", "Servicios"], ["al resolver un trámite", "Servicios"],
  ["en una conversación difícil", "Relaciones"], ["al pedir disculpas", "Relaciones"], ["al hacer nuevos amigos", "Amistad"],
  ["hablando de sentimientos", "Relaciones"], ["hablando del futuro", "Conversación"], ["debatiendo una idea", "Conversación"],
  ["compartiendo un recuerdo", "Familia"], ["planeando el fin de semana", "Vida diaria"], ["organizando unas vacaciones", "Viajes"],
  ["buscando una vivienda", "Vivienda"], ["haciendo un presupuesto", "Dinero"], ["pagando una factura", "Dinero"],
  ["en una entrevista de podcast", "Entretenimiento"], ["hablando de una serie", "Entretenimiento"], ["hablando de una película", "Entretenimiento"],
  ["hablando de música", "Entretenimiento"], ["aprendiendo una habilidad", "Estudios"], ["en un curso profesional", "Estudios"],
  ["con un entrenador", "Salud"], ["en una situación inesperada", "Vida diaria"], ["cuando algo sale mal", "Vida diaria"],
  ["al celebrar una buena noticia", "Eventos"], ["al tomar una decisión", "Conversación"], ["al resolver un conflicto", "Relaciones"],
  ["al organizar un negocio", "Negocios"], ["al negociar un contrato", "Negocios"], ["al buscar empleo", "Trabajo"]
];
const acciones = [
  "Saludos y presentación", "Conocer a alguien", "Pedir información", "Explicar una situación", "Hacer una pregunta",
  "Buscar una solución", "Organizar los planes", "Confirmar los detalles", "Cambiar una cita", "Resolver un problema",
  "Dar una recomendación", "Compartir una experiencia", "Expresar una preferencia", "Hacer una comparación", "Pedir una aclaración",
  "Ofrecer ayuda", "Aceptar una invitación", "Rechazar con educación", "Llegar a un acuerdo", "Explicar una demora",
  "Solicitar un servicio", "Agradecer la ayuda", "Hablar de los planes", "Describir un lugar", "Contar lo que pasó",
  "Prepararse para algo importante", "Hacer una compra", "Verificar una reserva", "Pedir instrucciones", "Expresar una opinión",
  "Hablar de metas", "Aprender algo nuevo", "Presentar a otra persona", "Dar una actualización", "Hacer seguimiento",
  "Negociar una solución", "Compartir buenas noticias", "Dar una noticia difícil", "Pedir permiso", "Hacer una sugerencia",
  "Aclarar un malentendido", "Preparar una actividad", "Celebrar un logro", "Hablar de un cambio", "Explicar las reglas",
  "Aprender a usar algo", "Buscar una alternativa", "Pedir una devolución", "Confirmar una dirección", "Hablar de costos",
  "Organizar el tiempo", "Describir un inconveniente", "Contar una historia divertida", "Resolver una discusión", "Dar consejos",
  "Pedir una opinión", "Compartir una preocupación", "Hacer planes de última hora", "Hablar sobre el clima", "Recordar la infancia",
  "Hablar de cultura", "Explicar una costumbre", "Comparar opciones", "Hacer una reserva", "Cambiar una reserva",
  "Presentar una queja", "Responder a una queja", "Pedir una oportunidad", "Preparar una entrevista", "Hablar de experiencia",
  "Explicar habilidades", "Pedir retroalimentación", "Dar retroalimentación", "Coordinar un equipo", "Repartir tareas",
  "Explicar un error", "Pedir disculpas", "Aceptar una disculpa", "Hablar de confianza", "Expresar emociones",
  "Hacer una invitación", "Organizar una celebración", "Elegir un regalo", "Contar una anécdota", "Hablar de una meta futura",
  "Resolver una urgencia", "Pedir ayuda profesional", "Dar indicaciones", "Seguir instrucciones", "Explicar un procedimiento",
  "Aprender una expresión nueva", "Practicar una conversación", "Hablar con naturalidad", "Terminar una conversación", "Despedirse con amabilidad"
];
// Biblioteca amplia: aprendizaje, cultura, información, pensamiento, historias y ocio.
const colecciones = [
  ["Inglés y comunicación", ["Saludos y presentaciones", "Conversaciones cotidianas", "Pronunciación y acento", "Gramática sin complicaciones", "Vocabulario práctico", "Expresiones idiomáticas", "Inglés para el trabajo", "Inglés para viajar", "Comprensión auditiva", "Cómo contar una historia"]],
  ["Ciencia y naturaleza", ["El sistema solar", "Cómo funciona el cerebro", "El cuerpo humano", "El océano profundo", "Los volcanes", "El cambio climático", "Los animales y sus sentidos", "La evolución", "La electricidad", "La física cotidiana", "La química en casa", "El origen de la vida", "Los agujeros negros", "El agua en la Tierra", "Los ecosistemas"]],
  ["Historia y civilizaciones", ["El antiguo Egipto", "La antigua Grecia", "El Imperio romano", "La Ruta de la Seda", "La Edad Media", "El Renacimiento", "La Revolución Industrial", "La historia de Nueva York", "La historia de Colombia", "Las grandes exploraciones", "La invención de la imprenta", "La historia de la medicina", "Civilizaciones precolombinas", "La historia de la música", "Grandes descubrimientos"]],
  ["Filosofía y pensamiento", ["Qué significa vivir bien", "Cómo pensar críticamente", "La ética en la vida diaria", "Libertad y responsabilidad", "Cómo reconocer falacias", "El arte de hacer preguntas", "La lógica de los argumentos", "Diferentes ideas de felicidad", "Qué es la justicia", "Cómo cambiar de opinión", "El conocimiento y la duda", "Dilemas morales", "La mente y la conciencia", "El sentido del tiempo", "Cómo tomar mejores decisiones"]],
  ["Matemáticas y lógica", ["Matemáticas cotidianas", "Probabilidad y azar", "Acertijos de lógica", "Patrones y secuencias", "Estadística para todos", "Cómo leer gráficos", "Porcentajes y descuentos", "Pensamiento espacial", "Estrategias para resolver problemas", "Números sorprendentes"]],
  ["Tecnología e innovación", ["Cómo funciona internet", "Inteligencia artificial", "Robots en la vida diaria", "Ciberseguridad básica", "Privacidad digital", "Cómo funcionan los videojuegos", "La historia de las computadoras", "Exploración espacial moderna", "Energías renovables", "Tecnologías del futuro", "Cómo crear una aplicación", "Redes sociales y atención"]],
  ["Arte y literatura", ["Cómo apreciar una pintura", "Grandes novelas del mundo", "Poesía para principiantes", "Cómo se crea una película", "La historia del teatro", "Fotografía y composición", "Arquitectura alrededor del mundo", "Mitos y leyendas", "Cómo escribir un cuento", "Símbolos en el arte", "La música clásica", "La evolución del cine"]],
  ["Entretenimiento y cultura pop", ["Misterios para resolver", "Aventura en una ciudad desconocida", "Historias de detectives", "Comedia de situaciones", "Ciencia ficción", "Fantasía y mundos imaginarios", "Historias de amistad", "Leyendas urbanas", "Un viaje inesperado", "El secreto del museo", "El caso de la llave perdida", "Supervivencia en la naturaleza", "Un concurso sorprendente", "Detrás de cámaras", "Curiosidades del cine"]],
  ["Sociedad y cultura", ["Costumbres de distintos países", "Cómo funcionan las ciudades", "Tradiciones familiares", "Idiomas del mundo", "Comida y cultura", "Festivales internacionales", "Cómo se forman las comunidades", "Comunicación entre culturas", "La vida en otros países", "Cómo cambian las sociedades"]],
  ["Vida práctica y bienestar", ["Organizar el tiempo", "Hábitos y rutinas", "Comunicación asertiva", "Resolver conflictos", "Cocina sencilla", "Nutrición básica", "Dormir mejor", "Ejercicio y movimiento", "Primeros auxilios informativos", "Administrar un presupuesto", "Cómo comparar productos", "Seguridad al viajar", "Cuidar el medio ambiente", "Aprender una habilidad", "Planear objetivos"]],
  ["Negocios y finanzas", ["Cómo funciona una empresa", "Presupuestos personales", "Ahorro e interés compuesto", "Marketing básico", "Negociación respetuosa", "Emprendimiento desde cero", "Servicio al cliente", "Liderazgo y equipos", "Economía en la vida diaria", "Cómo leer una factura", "Conceptos básicos de impuestos", "Planear un proyecto"]],
  ["Geografía y viajes", ["Maravillas naturales", "Capitales del mundo", "Montañas famosas", "Desiertos y oasis", "Islas sorprendentes", "Viajar con poco presupuesto", "Cómo leer un mapa", "Parques nacionales", "Climas del planeta", "Rutas históricas", "Ciudades subterráneas", "Pueblos y tradiciones"]],
  ["Mente y aprendizaje", ["Cómo funciona la memoria", "Técnicas de estudio", "Aprender con repetición", "Cómo concentrarse", "Creatividad y resolución", "Cómo evaluar una fuente", "Detectar información falsa", "Tomar apuntes útiles", "Aprendizaje durante toda la vida", "Cómo explicar ideas difíciles"]]
];
// ============================================================================
// ZONA FÁCIL DE EDITAR: AGREGA AQUÍ TUS HISTORIAS EN ESPAÑOL
// ---------------------------------------------------------------------------
// Para agregar una lectura, pega un objeto dentro de "historias" de la
// categoría correspondiente. Puedes copiar el ejemplo comentado más abajo.
// Cada línea lleva: personaje, texto en inglés (en) y traducción al español (es).
// IMPORTANTE: escribe las categorías exactamente como aparecen aquí.
// ============================================================================
const bibliotecaEditable = [
  { categoria: "Inglés y comunicación", historias: [
    {
      titulo: "Saludos y presentaciones: conoce a alguien nuevo",
      nivel: "Principiante",
      dialogo: [
        { personaje: "Daniel", ingles: 'Good morning! How are you today?', espanol: '¡Buenos días! ¿Cómo estás hoy?' },
        { personaje: "Sofia", ingles: "I'm doing well, thank you. And you?", espanol: 'Estoy bien, gracias. ¿Y tú?' },
        { personaje: "Daniel", ingles: "I'm great. It's nice to see you again.", espanol: 'Estoy muy bien. Qué gusto verte de nuevo.' },
        { personaje: "Sofia", ingles: "It's nice to see you, too. How have you been?", espanol: 'También me alegra verte. ¿Cómo has estado?' },
        { personaje: "Daniel", ingles: "I've been busy, but everything is going well.", espanol: 'He estado ocupado, pero todo va bien.' },
        { personaje: "Sofia", ingles: "That's good to hear. My name is Daniel.", espanol: 'Me alegra escuchar eso. Me llamo Daniel.' },
        { personaje: "Daniel", ingles: "Hi, Daniel. I'm Sofia. It's a pleasure to meet you.", espanol: 'Hola, Daniel. Soy Sofía. Mucho gusto en conocerte.' },
        { personaje: "Sofia", ingles: 'The pleasure is mine, Sofia. Are you new here?', espanol: 'El gusto es mío, Sofía. ¿Eres nueva aquí?' },
        { personaje: "Daniel", ingles: 'Yes, I started working here on Monday.', espanol: 'Sí, empecé a trabajar aquí el lunes.' },
        { personaje: "Sofia", ingles: 'Welcome to the team! How are you finding the place?', espanol: '¡Bienvenida al equipo! ¿Qué te parece el lugar?' },
        { personaje: "Daniel", ingles: 'Everyone has been very friendly so far.', espanol: 'Hasta ahora, todos han sido muy amables.' },
        { personaje: "Sofia", ingles: "I'm glad. Let me introduce you to my coworker.", espanol: 'Me alegra. Déjame presentarte a mi compañero de trabajo.' },
        { personaje: "Daniel", ingles: 'This is Michael. He works in customer service.', espanol: 'Él es Michael. Trabaja en atención al cliente.' },
        { personaje: "Sofia", ingles: "Hello, Michael. I'm Sofia, the new assistant.", espanol: 'Hola, Michael. Soy Sofía, la nueva asistente.' },
        { personaje: "Daniel", ingles: 'Welcome, Sofia. Please let me know if you need anything.', espanol: 'Bienvenida, Sofía. Avísame si necesitas algo.' },
        { personaje: "Sofia", ingles: 'Thank you. I appreciate your help.', espanol: 'Gracias. Aprecio tu ayuda.' },
        { personaje: "Daniel", ingles: 'Where are you from, Sofia?', espanol: '¿De dónde eres, Sofía?' },
        { personaje: "Sofia", ingles: "I'm from Colombia, but I live nearby now.", espanol: 'Soy de Colombia, pero ahora vivo cerca de aquí.' },
        { personaje: "Daniel", ingles: 'Really? Which city are you from?', espanol: '¿En serio? ¿De qué ciudad eres?' },
        { personaje: "Sofia", ingles: "I'm from Medellín. Have you ever visited Colombia?", espanol: 'Soy de Medellín. ¿Alguna vez has visitado Colombia?' },
        { personaje: "Daniel", ingles: "Not yet, but I'd love to go someday.", espanol: 'Todavía no, pero me encantaría ir algún día.' },
        { personaje: "Sofia", ingles: 'You should visit. The people are warm and welcoming.', espanol: 'Deberías visitarla. La gente es cálida y acogedora.' },
        { personaje: "Daniel", ingles: 'What languages do you speak?', espanol: '¿Qué idiomas hablas?' },
        { personaje: "Sofia", ingles: "I speak Spanish, and I'm learning English.", espanol: 'Hablo español y estoy aprendiendo inglés.' },
        { personaje: "Daniel", ingles: 'Your English is clear. Keep practicing every day.', espanol: 'Tu inglés es claro. Sigue practicando todos los días.' },
        { personaje: "Sofia", ingles: 'Thank you. Sometimes I feel nervous when I speak.', espanol: 'Gracias. A veces me pongo nerviosa cuando hablo.' },
        { personaje: "Daniel", ingles: "That's normal. You don't need to be perfect.", espanol: 'Es normal. No necesitas ser perfecta.' },
        { personaje: "Sofia", ingles: 'I just want people to understand me.', espanol: 'Solo quiero que la gente me entienda.' },
        { personaje: "Daniel", ingles: "They will. Speak slowly and don't be afraid to ask questions.", espanol: 'Lo harán. Habla despacio y no tengas miedo de hacer preguntas.' },
        { personaje: "Sofia", ingles: 'By the way, how do you spell your last name?', espanol: 'Por cierto, ¿cómo se escribe tu apellido?' },
        { personaje: "Daniel", ingles: "It's Ramirez: R-A-M-I-R-E-Z.", espanol: 'Es Ramírez: R-A-M-I-R-E-Z.' },
        { personaje: "Sofia", ingles: 'Thanks. I want to make sure I write it correctly.', espanol: 'Gracias. Quiero asegurarme de escribirlo correctamente.' },
        { personaje: "Daniel", ingles: 'No problem. People often ask me to spell it.', espanol: 'No hay problema. La gente suele pedirme que lo deletree.' },
        { personaje: "Sofia", ingles: 'Do you prefer Sofia or Sofi?', espanol: '¿Prefieres Sofía o Sofi?' },
        { personaje: "Daniel", ingles: 'Sofia is fine, but my friends call me Sofi.', espanol: 'Sofía está bien, pero mis amigos me llaman Sofi.' },
        { personaje: "Sofia", ingles: "I'll call you Sofia until I know you better.", espanol: 'Te llamaré Sofía hasta que te conozca mejor.' },
        { personaje: "Daniel", ingles: 'That sounds good. What should I call you?', espanol: 'Me parece bien. ¿Cómo debería llamarte?' },
        { personaje: "Sofia", ingles: 'Daniel is perfect. My family calls me Dan.', espanol: 'Daniel está perfecto. Mi familia me llama Dan.' },
        { personaje: "Daniel", ingles: 'Nice to know. Is this your first job in this city?', espanol: 'Qué bueno saberlo. ¿Este es tu primer trabajo en esta ciudad?' },
        { personaje: "Sofia", ingles: "Yes, and I'm excited to meet new people.", espanol: 'Sí, y me entusiasma conocer gente nueva.' },
        { personaje: "Daniel", ingles: "You'll meet plenty of people here.", espanol: 'Aquí conocerás a muchísima gente.' },
        { personaje: "Sofia", ingles: 'I hope so. I would like to make some friends.', espanol: 'Eso espero. Me gustaría hacer algunos amigos.' },
        { personaje: "Daniel", ingles: 'We sometimes have lunch together. You can join us.', espanol: 'A veces almorzamos juntos. Puedes acompañarnos.' },
        { personaje: "Sofia", ingles: "I'd love to. What time do you usually go?", espanol: 'Me encantaría. ¿A qué hora suelen ir?' },
        { personaje: "Daniel", ingles: "Around twelve thirty, depending on the day's schedule.", espanol: 'Alrededor de las doce y media, según el horario del día.' },
        { personaje: "Sofia", ingles: "Great. I'll ask you about it later.", espanol: 'Perfecto. Te preguntaré más tarde.' },
        { personaje: "Daniel", ingles: 'Are you from a big family?', espanol: '¿Vienes de una familia grande?' },
        { personaje: "Sofia", ingles: 'Yes, I have two brothers and one sister.', espanol: 'Sí, tengo dos hermanos y una hermana.' },
        { personaje: "Daniel", ingles: 'That sounds lively. Are they living nearby?', espanol: 'Parece una familia animada. ¿Viven cerca?' },
        { personaje: "Sofia", ingles: 'My sister lives here, but my brothers live abroad.', espanol: 'Mi hermana vive aquí, pero mis hermanos viven en el extranjero.' },
        { personaje: "Daniel", ingles: 'Do you get to see them often?', espanol: '¿Puedes verlos con frecuencia?' },
        { personaje: "Sofia", ingles: 'We call every weekend and visit when we can.', espanol: 'Hablamos por teléfono cada fin de semana y nos visitamos cuando podemos.' },
        { personaje: "Daniel", ingles: "That's a lovely way to stay connected.", espanol: 'Es una manera muy bonita de mantenerse en contacto.' },
        { personaje: "Sofia", ingles: 'What do you like to do in your free time?', espanol: '¿Qué te gusta hacer en tu tiempo libre?' },
        { personaje: "Daniel", ingles: 'I enjoy cooking, walking, and watching movies.', espanol: 'Disfruto cocinar, caminar y ver películas.' },
        { personaje: "Sofia", ingles: 'What kind of movies do you like?', espanol: '¿Qué tipo de películas te gustan?' },
        { personaje: "Daniel", ingles: 'I like comedies because they help me relax.', espanol: 'Me gustan las comedias porque me ayudan a relajarme.' },
        { personaje: "Sofia", ingles: 'I prefer documentaries, especially about history.', espanol: 'Prefiero los documentales, especialmente los de historia.' },
        { personaje: "Daniel", ingles: 'Maybe you can recommend one to me.', espanol: 'Quizás puedas recomendarme uno.' },
        { personaje: "Sofia", ingles: "Of course. I'll send you a title this afternoon.", espanol: 'Claro. Te enviaré un título esta tarde.' },
        { personaje: "Daniel", ingles: 'Thanks! Do you live far from the office?', espanol: '¡Gracias! ¿Vives lejos de la oficina?' },
        { personaje: "Sofia", ingles: 'No, I take the bus and it takes twenty minutes.', espanol: 'No, tomo el autobús y tardo veinte minutos.' },
        { personaje: "Daniel", ingles: "That's convenient. I usually drive to work.", espanol: 'Qué conveniente. Yo normalmente voy al trabajo en carro.' },
        { personaje: "Sofia", ingles: 'Is traffic bad in the morning?', espanol: '¿Hay mucho tráfico por la mañana?' },
        { personaje: "Daniel", ingles: 'Sometimes, so I leave home a little early.', espanol: 'A veces, así que salgo de casa un poco temprano.' },
        { personaje: "Sofia", ingles: "That's smart. Arriving on time makes the day easier.", espanol: 'Es una buena idea. Llegar a tiempo facilita el día.' },
        { personaje: "Daniel", ingles: 'Do you know everyone in the department yet?', espanol: '¿Ya conoces a todos en el departamento?' },
        { personaje: "Sofia", ingles: "Not yet. I'm still learning everyone's names.", espanol: 'Todavía no. Aún estoy aprendiendo los nombres de todos.' },
        { personaje: "Daniel", ingles: "Don't worry. It took me a few weeks, too.", espanol: 'No te preocupes. A mí también me tomó unas semanas.' },
        { personaje: "Sofia", ingles: 'I may ask you to remind me of some names.', espanol: 'Quizás te pida que me recuerdes algunos nombres.' },
        { personaje: "Daniel", ingles: "Anytime. It's easier when you connect a name with a face.", espanol: 'Cuando quieras. Es más fácil asociar un nombre con un rostro.' },
        { personaje: "Sofia", ingles: "That's a helpful tip. I'll try to remember it.", espanol: 'Es un consejo útil. Intentaré recordarlo.' },
        { personaje: "Daniel", ingles: 'Would you like some coffee before the meeting?', espanol: '¿Te gustaría tomar café antes de la reunión?' },
        { personaje: "Sofia", ingles: 'Yes, please. I usually drink coffee in the morning.', espanol: 'Sí, por favor. Normalmente tomo café por la mañana.' },
        { personaje: "Daniel", ingles: 'How do you take it, with milk or black?', espanol: '¿Cómo lo tomas, con leche o negro?' },
        { personaje: "Sofia", ingles: 'With a little milk and no sugar, please.', espanol: 'Con un poco de leche y sin azúcar, por favor.' },
        { personaje: "Daniel", ingles: "Got it. I'll bring you a cup.", espanol: 'Entendido. Te traeré una taza.' },
        { personaje: "Sofia", ingles: 'Thank you for making me feel welcome.', espanol: 'Gracias por hacerme sentir bienvenida.' },
        { personaje: "Daniel", ingles: "You're welcome. Starting somewhere new can feel strange.", espanol: 'De nada. Empezar en un lugar nuevo puede sentirse extraño.' },
        { personaje: "Sofia", ingles: 'It does, but everyone has made it easier.', espanol: 'Sí, pero todos lo han hecho más fácil.' },
        { personaje: "Daniel", ingles: "I'm happy to hear that. You'll settle in soon.", espanol: 'Me alegra escucharlo. Pronto te adaptarás.' },
        { personaje: "Sofia", ingles: 'I already feel more comfortable talking with you.', espanol: 'Ya me siento más cómoda hablando contigo.' },
        { personaje: "Daniel", ingles: "That's great. Good communication starts with a simple hello.", espanol: 'Qué bien. La buena comunicación comienza con un simple saludo.' },
        { personaje: "Sofia", ingles: "You're right. A friendly greeting can change the whole day.", espanol: 'Tienes razón. Un saludo amable puede cambiar todo el día.' },
        { personaje: "Daniel", ingles: 'Before we go, would you like my phone number?', espanol: 'Antes de irnos, ¿quieres mi número de teléfono?' },
        { personaje: "Sofia", ingles: 'Yes, please. We can coordinate lunch sometime.', espanol: 'Sí, por favor. Podemos coordinar un almuerzo algún día.' },
        { personaje: "Daniel", ingles: "Sure. I'll send you a message so you have my number.", espanol: 'Claro. Te enviaré un mensaje para que tengas mi número.' },
        { personaje: "Sofia", ingles: "Perfect. I'll save your contact right away.", espanol: 'Perfecto. Guardaré tu contacto de inmediato.' },
        { personaje: "Daniel", ingles: 'If you need help, just send me a text.', espanol: 'Si necesitas ayuda, simplemente envíame un mensaje.' },
        { personaje: "Sofia", ingles: 'I will. And please tell me if I speak too quickly.', espanol: 'Lo haré. Y dime, por favor, si hablo demasiado rápido.' },
        { personaje: "Daniel", ingles: 'Of course. We can practice English together during breaks.', espanol: 'Por supuesto. Podemos practicar inglés juntos durante los descansos.' },
        { personaje: "Sofia", ingles: 'That would be wonderful. Practice helps me gain confidence.', espanol: 'Sería maravilloso. Practicar me ayuda a ganar confianza.' },
        { personaje: "Daniel", ingles: "Then let's make it a habit, even for ten minutes a day.", espanol: 'Entonces hagamos de eso un hábito, aunque sean diez minutos al día.' },
        { personaje: "Sofia", ingles: "Deal. I'll bring a few questions tomorrow.", espanol: 'Trato hecho. Mañana traeré algunas preguntas.' },
        { personaje: "Daniel", ingles: "I'm looking forward to it. Have a wonderful afternoon!", espanol: 'Me alegra. ¡Que tengas una tarde maravillosa!' },
        { personaje: "Sofia", ingles: 'You too, Daniel. Thanks again for everything.', espanol: 'Igualmente, Daniel. Gracias de nuevo por todo.' },
        { personaje: "Daniel", ingles: "You're very welcome, Sofia. See you tomorrow morning.", espanol: 'Con mucho gusto, Sofía. Nos vemos mañana por la mañana.' },
        { personaje: "Sofia", ingles: 'See you tomorrow! It was lovely meeting you all.', espanol: '¡Hasta mañana! Fue un gusto conocerlos a todos.' },
        { personaje: "Daniel", ingles: 'And remember, every new friendship begins with an introduction.', espanol: 'Y recuerda: toda nueva amistad comienza con una presentación.' },
        { personaje: "Sofia", ingles: 'A smile, a name, and a question can open a conversation.', espanol: 'Una sonrisa, un nombre y una pregunta pueden iniciar una conversación.' },
        { personaje: "Daniel", ingles: 'So take a breath, say hello, and be yourself.', espanol: 'Así que respira, saluda y sé tú misma.' },
        { personaje: "Sofia", ingles: "You don't need perfect English to make a real connection.", espanol: 'No necesitas un inglés perfecto para crear una conexión real.' },
        { personaje: "Daniel", ingles: 'You only need patience, curiosity, and a willingness to practice.', espanol: 'Solo necesitas paciencia, curiosidad y disposición para practicar.' },
        { personaje: "Sofia", ingles: 'Every conversation is a chance to learn something new.', espanol: 'Cada conversación es una oportunidad para aprender algo nuevo.' },
        { personaje: "Daniel", ingles: "Tomorrow, we'll greet someone new and introduce ourselves again.", espanol: 'Mañana saludaremos a alguien nuevo y volveremos a presentarnos.' },
        { personaje: "Sofia", ingles: 'Little by little, these words will begin to feel natural.', espanol: 'Poco a poco, estas palabras empezarán a sentirse naturales.' },
        { personaje: "Daniel", ingles: 'And soon, saying hello will be the easiest part of your day.', espanol: 'Y pronto, decir hola será la parte más fácil de tu día.' }
      ]
    }
    // EJEMPLO PARA COPIAR:
    // {
    //   titulo: "Una conversación en una cafetería",
    //   nivel: "Principiante", // "Principiante", "Intermedio" o "Avanzado"
    //   dialogo: [
    //     { personaje: "Ana", ingles: "Good morning. Can I have a coffee, please?", espanol: "Buenos días. ¿Me puede dar un café, por favor?" },
    //     { personaje: "Barista", ingles: "Of course. Would you like milk or sugar?", espanol: "Por supuesto. ¿Quiere leche o azúcar?" },
    //     { personaje: "Ana", ingles: "Just a little milk, please.", espanol: "Solo un poco de leche, por favor." }
    //   ]
    // }
  ]},
  { categoria: "Ciencia y naturaleza", historias: [] },
  { categoria: "Historia y civilizaciones", historias: [] },
  { categoria: "Filosofía y pensamiento", historias: [] },
  { categoria: "Matemáticas y lógica", historias: [] },
  { categoria: "Tecnología e innovación", historias: [] },
  { categoria: "Arte y literatura", historias: [] },
  { categoria: "Entretenimiento y cultura pop", historias: [] },
  { categoria: "Sociedad y cultura", historias: [] },
  { categoria: "Vida práctica y bienestar", historias: [] },
  { categoria: "Negocios y finanzas", historias: [] },
  { categoria: "Geografía y viajes", historias: [] },
  { categoria: "Mente y aprendizaje", historias: [] },
  { categoria: "Vida diaria", historias: [] },
  { categoria: "Familia", historias: [] },
  { categoria: "Comida", historias: [] },
  { categoria: "Restaurantes", historias: [] },
  { categoria: "Compras", historias: [] },
  { categoria: "Transporte", historias: [] },
  { categoria: "Viajes", historias: [] },
  { categoria: "Trabajo", historias: [] },
  { categoria: "Salud", historias: [] },
  { categoria: "Emergencias", historias: [] },
  { categoria: "Estudios", historias: [] },
  { categoria: "Amistad", historias: [] },
  { categoria: "Relaciones", historias: [] },
  { categoria: "Eventos", historias: [] }
];

// Convierte los datos fáciles de editar al formato que utiliza el reproductor.
const capitulosPersonalizados = bibliotecaEditable.flatMap((grupo) =>
  grupo.historias.map((historia) => ({
    title: historia.titulo,
    category: grupo.categoria,
    level: historia.nivel || "Intermedio",
    dialogue: (historia.dialogo || []).map((linea) => ({
      speaker: linea.personaje || "Narrador",
      en: linea.ingles || "",
      es: linea.espanol || ""
    }))
  }))
);

const formatos = ["Introducción a", "Curiosidades sobre", "Una historia sobre", "Preguntas y respuestas sobre", "Mitos y realidades de", "Aprende paso a paso:", "Un reto intelectual sobre", "Una conversación sobre", "Un caso para analizar:", "Ideas esenciales de", "Explorando", "Lo que conviene saber de", "Un episodio para descubrir", "Ejemplos prácticos de", "Debate y reflexión sobre", "Un misterio relacionado con", "Guía para principiantes:", "Nivel intermedio:", "Nivel avanzado:", "Datos sorprendentes de"];
const temasUnicos = new Map();
for (const [categoria, asuntos] of colecciones) {
  for (const asunto of asuntos) temasUnicos.set(asunto, categoria);
}
for (const tema of temas) temasUnicos.set(tema[0], tema[1]);
for (const accion of acciones) for (const [escenario, categoria] of escenarios) {
  const titulo = `${accion} ${escenario}`;
  if (!temasUnicos.has(titulo)) temasUnicos.set(titulo, categoria || "Vida práctica y bienestar");
}
const temasFinales = [...temasUnicos.entries()].map(([titulo, categoria]) => [titulo, categoria]);
for (const formato of formatos) {
  for (const [titulo, categoria] of [...temasFinales]) {
    if (temasFinales.length >= 10000) break;
    const nombre = `${formato} ${titulo}`;
    if (!temasUnicos.has(nombre)) { temasUnicos.set(nombre, categoria); temasFinales.push([nombre, categoria]); }
  }
  if (temasFinales.length >= 10000) break;
}
let serie = 2;
while (temasFinales.length < 10000) {
  for (const [titulo, categoria] of [...temasUnicos.entries()]) {
    const nombre = `Especial ${serie}: ${titulo}`;
    if (!temasUnicos.has(nombre)) { temasUnicos.set(nombre, categoria); temasFinales.push([nombre, categoria]); }
    if (temasFinales.length >= 10000) break;
  }
  serie++;
}


const conversacionesBase = [

  [

    ["Alex", "Hi! How are you doing today?", "¡Hola! ¿Cómo estás hoy?"],

    ["Sam", "I'm doing well, thanks. How about you?", "Estoy bien, gracias. ¿Y tú?"],

    ["Alex", "Pretty good. It's nice to see you.", "Bastante bien. Me alegra verte."],

    ["Sam", "You too! How has your week been?", "¡Igualmente! ¿Cómo ha estado tu semana?"],

    ["Alex", "Busy, but I can't complain.", "Ocupada, pero no me puedo quejar."],

    ["Sam", "I know what you mean. Have a great day!", "Sé a qué te refieres. ¡Que tengas un buen día!"]

  ],

  [

    ["Customer", "Excuse me, could you help me, please?", "Disculpe, ¿podría ayudarme, por favor?"],

    ["Worker", "Of course. What do you need?", "Por supuesto. ¿Qué necesita?"],

    ["Customer", "I'm looking for something, but I can't find it.", "Estoy buscando algo, pero no lo encuentro."],

    ["Worker", "No problem. Let me show you.", "No hay problema. Déjeme mostrarle."],

    ["Customer", "Thank you. I really appreciate your help.", "Gracias. Aprecio mucho su ayuda."],

    ["Worker", "You're welcome. Let me know if you need anything else.", "De nada. Avíseme si necesita algo más."]

  ],

  [

    ["Jamie", "Do you have a minute to talk?", "¿Tienes un minuto para hablar?"],

    ["Taylor", "Sure. What's going on?", "Claro. ¿Qué pasa?"],

    ["Jamie", "I wanted to ask you about something.", "Quería preguntarte algo."],

    ["Taylor", "Go ahead. I'm listening.", "Adelante. Te escucho."],

    ["Jamie", "Thanks for taking the time.", "Gracias por tomarte el tiempo."],

    ["Taylor", "Of course. I'm happy to help.", "Por supuesto. Con gusto te ayudo."]

  ],

  [

    ["Guest", "Hello, I have a reservation under my name.", "Hola, tengo una reserva a mi nombre."],

    ["Host", "Welcome! Could I have your name, please?", "¡Bienvenido! ¿Me dice su nombre, por favor?"],

    ["Guest", "Yes, it's Taylor Morgan.", "Sí, Taylor Morgan."],

    ["Host", "Thank you. I'll check that for you.", "Gracias. Voy a comprobarlo."],

    ["Guest", "Great. Please let me know if you need anything else.", "Perfecto. Dígame si necesita algo más."],

    ["Host", "Everything is ready. Right this way, please.", "Todo está listo. Por aquí, por favor."]

  ],

  [

    ["Morgan", "I think we need to make a plan.", "Creo que necesitamos hacer un plan."],

    ["Riley", "I agree. What should we do first?", "Estoy de acuerdo. ¿Qué deberíamos hacer primero?"],

    ["Morgan", "Let's list the most important things.", "Hagamos una lista de las cosas más importantes."],

    ["Riley", "Good idea. I'll write everything down.", "Buena idea. Voy a anotarlo todo."],

    ["Morgan", "Then we can decide who does each task.", "Después podemos decidir quién hace cada tarea."],

    ["Riley", "Perfect. That sounds much easier.", "Perfecto. Eso parece mucho más fácil."]

  ],

  [

    ["Chris", "I'm sorry, but I think there's been a mistake.", "Lo siento, pero creo que ha habido un error."],

    ["Jordan", "I'm sorry to hear that. Can you explain what happened?", "Lamento escucharlo. ¿Puedes explicar qué pasó?"],

    ["Chris", "This isn't what I expected.", "Esto no es lo que esperaba."],

    ["Jordan", "I understand. Let's see how we can fix it.", "Entiendo. Veamos cómo podemos solucionarlo."],

    ["Chris", "Thank you for listening to me.", "Gracias por escucharme."],

    ["Jordan", "Of course. We'll do our best to help.", "Por supuesto. Haremos todo lo posible por ayudar."]

  ],

  [

    ["Avery", "What do you think about this idea?", "¿Qué piensas de esta idea?"],

    ["Casey", "I like it, but I have one question.", "Me gusta, pero tengo una pregunta."],

    ["Avery", "Sure, go ahead.", "Claro, adelante."],

    ["Casey", "Have you thought about the cost?", "¿Has pensado en el costo?"],

    ["Avery", "That's a good point. We should compare our options.", "Es un buen punto. Deberíamos comparar nuestras opciones."],

    ["Casey", "Great. Then we can make a better decision.", "Genial. Así podremos tomar una mejor decisión."]

  ],

  [

    ["Employee", "Could we talk about my schedule?", "¿Podríamos hablar de mi horario?"],

    ["Manager", "Certainly. What would you like to discuss?", "Por supuesto. ¿Qué te gustaría conversar?"],

    ["Employee", "I'd like to ask if a change is possible.", "Quisiera preguntar si es posible hacer un cambio."],

    ["Manager", "Let me check the schedule first.", "Déjame revisar primero el horario."],

    ["Employee", "I appreciate your time.", "Aprecio tu tiempo."],

    ["Manager", "I'll get back to you as soon as I can.", "Te responderé tan pronto como pueda."]

  ],

  [

    ["Pat", "Have you ever tried this before?", "¿Alguna vez has probado esto?"],

    ["Lee", "No, not yet. What is it like?", "No, todavía no. ¿Cómo es?"],

    ["Pat", "It's easier than it looks.", "Es más fácil de lo que parece."],

    ["Lee", "Really? Maybe you can show me.", "¿En serio? Tal vez puedas enseñarme."],

    ["Pat", "Absolutely. Let's try it together.", "Por supuesto. Intentémoslo juntos."],

    ["Lee", "Thanks! I'm excited to learn.", "¡Gracias! Estoy emocionado por aprender."]

  ],

  [

    ["Drew", "I have some good news!", "¡Tengo buenas noticias!"],

    ["Sky", "Really? What happened?", "¿En serio? ¿Qué pasó?"],

    ["Drew", "Something I've been working on finally worked out.", "Algo en lo que he estado trabajando finalmente salió bien."],

    ["Sky", "That's wonderful! You must be happy.", "¡Qué maravilloso! Debes estar feliz."],

    ["Drew", "I am. Thanks for always encouraging me.", "Lo estoy. Gracias por animarme siempre."],

    ["Sky", "You deserve it. Let's celebrate soon!", "Te lo mereces. ¡Celebremos pronto!"]

  ]

];



const crearCapitulo = (tema, index) => {
  const [title, category] = tema;
  const level = index < 3334 ? "Principiante" : index < 6667 ? "Intermedio" : "Avanzado";
  const prompts = [
    ["Host", `Today we're exploring ${title.toLowerCase()}. What should we know first?`, `Hoy exploraremos ${title.toLowerCase()}. ¿Qué deberíamos saber primero?`],
    ["Guest", "Let's begin with the main idea and explain it in simple terms.", "Empecemos con la idea principal y expliquémosla de forma sencilla."],
    ["Host", "Can you give us a concrete example?", "¿Puedes darnos un ejemplo concreto?"],
    ["Guest", "Of course. Imagine a real-life situation where this idea is useful.", "Claro. Imagina una situación real en la que esta idea sea útil."],
    ["Host", "What is a common mistake or surprising detail people should remember?", "¿Cuál es un error común o un detalle sorprendente que deberíamos recordar?"],
    ["Guest", "The key is to stay curious, check reliable information, and keep asking questions.", "La clave es mantener la curiosidad, comprobar información confiable y seguir haciendo preguntas."]
  ];
  const funPrompts = [
    ["Narrator", `Welcome to this episode: ${title}.`, `Bienvenidos a este episodio: ${title}.`],
    ["Alex", "I have a feeling this is going to be more surprising than we expect.", "Tengo la sensación de que esto será más sorprendente de lo que esperamos."],
    ["Sam", "Look carefully at the clues. One small detail may change everything.", "Mira las pistas con atención. Un pequeño detalle puede cambiarlo todo."],
    ["Alex", "That makes sense now. I hadn't noticed that before.", "Ahora tiene sentido. No me había fijado en eso antes."],
    ["Sam", "Let's compare our ideas and see what we can discover.", "Comparemos nuestras ideas y veamos qué podemos descubrir."],
    ["Narrator", "Every answer opens the door to another question.", "Cada respuesta abre la puerta a otra pregunta."]
  ];
  const learningCategories = ["Ciencia y naturaleza", "Historia y civilizaciones", "Filosofía y pensamiento", "Matemáticas y lógica", "Tecnología e innovación", "Arte y literatura", "Sociedad y cultura", "Negocios y finanzas", "Geografía y viajes", "Mente y aprendizaje"];
  const base = learningCategories.includes(category) ? prompts : funPrompts;
  const dialogue = base.map(([speaker, en, es]) => ({ speaker, en, es }));
  return { id: index + 1, title, category, level, dialogue };
};


// Las historias que agregues en "bibliotecaEditable" aparecen primero.
// Después se muestran los capítulos generados que ya tenía la biblioteca.
const capitulosGenerados = temasFinales
  .filter(([titulo]) => !capitulosPersonalizados.some((c) => c.title === titulo))
  .slice(0, 10000)
  .map((tema, index) => crearCapitulo(tema, index + capitulosPersonalizados.length));
const capitulos = [...capitulosPersonalizados, ...capitulosGenerados]
  .map((capitulo, index) => ({ ...capitulo, id: index + 1 }));

const limpiarTexto = (texto) =>

  String(texto ?? "").replace(/\s*\/\s*/g, ", ").replace(/\s+/g, " ").trim();





// Conversaciones exclusivas por categoría. Cada tema adapta la situación al capítulo elegido.
const escenariosProfesor = {
  "Vida diaria": { lugar:"una actividad cotidiana del vecindario", persona:"Alex", items:[
    ["Hi! How is your day going?","¡Hola! ¿Cómo va tu día?","Quieres decir que va bien.","My day is going well, thanks.","Mi día va bien, gracias."],
    ["What are you doing today?","¿Qué estás haciendo hoy?","Vas a hacer unas compras.","I'm going shopping today.","Hoy voy a hacer compras."],
    ["Do you need anything from the store?","¿Necesitas algo de la tienda?","Quieres pedir leche.","Yes, I need some milk.","Sí, necesito leche."],
    ["How do you usually get around?","¿Cómo te desplazas normalmente?","Normalmente caminas.","I usually walk.","Normalmente camino."],
    ["What time do you start your day?","¿A qué hora empiezas tu día?","Empiezas a las siete.","I start at seven.","Empiezo a las siete."],
    ["Do you have plans for this evening?","¿Tienes planes para esta tarde?","Vas a descansar en casa.","I'm going to relax at home.","Voy a descansar en casa."],
    ["Would you like some help?","¿Te gustaría recibir ayuda?","Agradeces la ayuda.","Yes, that would be great.","Sí, eso estaría muy bien."],
    ["Is there anything else you need?","¿Necesitas algo más?","Dices que no, gracias.","No, that's everything. Thank you.","No, eso es todo. Gracias."],
    ["It was nice talking to you.","Fue agradable hablar contigo.","Te despides amablemente.","It was nice talking to you, too.","También fue agradable hablar contigo."],
    ["Have a good rest of your day!","¡Que tengas un buen resto del día!","Le deseas lo mismo.","You too. Take care!","Igualmente. ¡Cuídate!"]]},
  "Familia": { lugar:"una reunión familiar", persona:"Laura", items:[
    ["How is your family doing?","¿Cómo está tu familia?","Dices que todos están bien.","Everyone is doing well, thank you.","Todos están bien, gracias."],
    ["Do you have any brothers or sisters?","¿Tienes hermanos?","Dices que tienes dos hermanos.","I have two brothers.","Tengo dos hermanos."],
    ["What are their names?","¿Cómo se llaman?","Dices que se llaman Mateo y Andrés.","Their names are Mateo and Andres.","Se llaman Mateo y Andrés."],
    ["Do you see them often?","¿Los ves a menudo?","Hablas con ellos cada semana.","We talk every week.","Hablamos cada semana."],
    ["What do you usually do together?","¿Qué hacen juntos normalmente?","Les gusta compartir comidas.","We enjoy having meals together.","Disfrutamos comer juntos."],
    ["Are you visiting your parents soon?","¿Vas a visitar pronto a tus padres?","Esperas visitarlos el próximo mes.","I hope to visit them next month.","Espero visitarlos el próximo mes."],
    ["What is your favorite family memory?","¿Cuál es tu recuerdo familiar favorito?","Recuerdas una celebración.","My favorite memory is a family celebration.","Mi recuerdo favorito es una celebración familiar."],
    ["Do you have family traditions?","¿Tienen tradiciones familiares?","Se reúnen los domingos.","We get together on Sundays.","Nos reunimos los domingos."],
    ["Please say hello to your family for me.","Por favor, saluda a tu familia de mi parte.","Dices que lo harás.","Of course. I'll tell them.","Claro. Se lo diré."],
    ["It was lovely catching up.","Fue muy bonito ponerse al día.","Te despides con cariño.","It was lovely seeing you, too.","También fue muy bonito verte."]]},
  "Comida": { lugar:"una cocina donde preparan una comida", persona:"Chris", items:[
    ["What are you making today?","¿Qué estás preparando hoy?","Preparas una pasta sencilla.","I'm making a simple pasta dish.","Estoy preparando un plato sencillo de pasta."],
    ["What ingredients do we need?","¿Qué ingredientes necesitamos?","Necesitan tomates y queso.","We need tomatoes and cheese.","Necesitamos tomates y queso."],
    ["Could you wash the vegetables?","¿Puedes lavar las verduras?","Aceptas ayudar.","Sure, I'll wash them.","Claro, las lavaré."],
    ["How much salt should I add?","¿Cuánta sal debo agregar?","Dices que solo un poco.","Just a little, please.","Solo un poco, por favor."],
    ["Should we cook the pasta now?","¿Cocinamos la pasta ahora?","Dices que sí.","Yes, let's cook it now.","Sí, cocinémosla ahora."],
    ["Does it need more time?","¿Necesita más tiempo?","Dices que cinco minutos.","It needs five more minutes.","Necesita cinco minutos más."],
    ["Would you like to taste the sauce?","¿Quieres probar la salsa?","Aceptas probarla.","Yes, let me try it.","Sí, déjame probarla."],
    ["What do you think?","¿Qué te parece?","Dices que está deliciosa.","It's delicious. I love it.","Está deliciosa. Me encanta."],
    ["Can you set the table?","¿Puedes poner la mesa?","Dices que sí, ahora mismo.","Of course. I'll do it now.","Por supuesto. Lo hago ahora."],
    ["Dinner is ready!","¡La cena está lista!","Invitas a todos a sentarse.","Great! Let's eat together.","¡Genial! Comamos juntos."]]},
  "Restaurantes": { lugar:"un restaurante", persona:"el camarero y una persona de tu mesa", items:[
    ["Good evening! Do you have a reservation?","¡Buenas noches! ¿Tiene una reservación?","Dices que sí, a nombre de García.","Yes, under Garcia.","Sí, a nombre de García."],
    ["How many people are in your party?","¿Cuántas personas vienen?","Son dos personas.","A table for two, please.","Una mesa para dos, por favor."],
    ["Would you like to see the menu?","¿Desea ver el menú?","Pides el menú amablemente.","Could I see the menu, please?","¿Podría ver el menú, por favor?"],
    ["Can I get you something to drink?","¿Le traigo algo de beber?","Pides agua.","Water, please.","Agua, por favor."],
    ["Are you ready to order?","¿Está listo para ordenar?","Pides pollo con arroz.","I'd like the chicken with rice.","Quisiera el pollo con arroz."],
    ["Would you like anything else?","¿Desea algo más?","Dices que no, gracias.","No, that's all for now.","No, eso es todo por ahora."],
    ["How is your meal?","¿Qué tal está su comida?","Dices que está muy buena.","It's very good, thank you.","Está muy buena, gracias."],
    ["Would you like dessert?","¿Desea un postre?","Pides ver las opciones.","Could I see the dessert menu?","¿Podría ver el menú de postres?"],
    ["Would you like the check?","¿Desea la cuenta?","Pides la cuenta.","Yes, could we have the check, please?","Sí, ¿nos trae la cuenta, por favor?"],
    ["Thank you for coming. Have a nice evening!","Gracias por venir. ¡Que tenga buena noche!","Agradeces y te despides.","Thank you. We had a great time.","Gracias. La pasamos muy bien."]]},
  "Compras": { lugar:"una tienda de ropa", persona:"la dependienta", items:[
    ["Hello! Can I help you find something?","¡Hola! ¿Puedo ayudarle a encontrar algo?","Buscas una camisa.","Yes, I'm looking for a shirt.","Sí, estoy buscando una camisa."],
    ["What size do you need?","¿Qué talla necesita?","Necesitas talla mediana.","I need a medium.","Necesito una mediana."],
    ["What color would you like?","¿Qué color le gustaría?","Prefieres azul.","I'd like a blue one.","Me gustaría una azul."],
    ["Would you like to try it on?","¿Quiere probársela?","Aceptas.","Yes, where is the fitting room?","Sí, ¿dónde está el probador?"],
    ["How does it fit?","¿Cómo le queda?","Dices que queda bien.","It fits well, thank you.","Me queda bien, gracias."],
    ["Would you like to see another style?","¿Quiere ver otro estilo?","Pides ver uno más sencillo.","Yes, something more simple, please.","Sí, algo más sencillo, por favor."],
    ["This one is on sale today.","Este está en oferta hoy.","Preguntas cuánto cuesta.","How much is it?","¿Cuánto cuesta?"],
    ["It's twenty dollars.","Cuesta veinte dólares.","Dices que te parece bien.","That sounds good. I'll take it.","Me parece bien. Me lo llevo."],
    ["Would you like a bag?","¿Quiere una bolsa?","Aceptas una bolsa.","Yes, please. Thank you.","Sí, por favor. Gracias."],
    ["You can pay at the register.","Puede pagar en la caja.","Preguntas si puedes pagar con tarjeta.","Can I pay by card?","¿Puedo pagar con tarjeta?"]]},
  "Transporte": { lugar:"una estación de transporte público", persona:"un empleado de la estación", items:[
    ["Where are you trying to go?","¿A dónde intenta llegar?","Vas al centro.","I'm going downtown.","Voy al centro."],
    ["Are you taking the train or the bus?","¿Vas en tren o en autobús?","Prefieres el tren.","I'm taking the train.","Voy a tomar el tren."],
    ["Do you have a ticket?","¿Tienes un boleto?","Todavía no lo tienes.","Not yet. Where can I buy one?","Todavía no. ¿Dónde puedo comprar uno?"],
    ["You can use the machine over there.","Puedes usar la máquina de allí.","Preguntas cuánto cuesta.","How much is a ticket?","¿Cuánto cuesta un boleto?"],
    ["Which line do you need?","¿Qué línea necesitas?","Preguntas por la línea azul.","Do I need the blue line?","¿Necesito la línea azul?"],
    ["Yes, change at the next station.","Sí, haz transbordo en la próxima estación.","Pides que repita más despacio.","Could you say that more slowly, please?","¿Podría decirlo más despacio, por favor?"],
    ["The platform is downstairs.","El andén está abajo.","Agradeces la indicación.","Thank you for your help.","Gracias por su ayuda."],
    ["The train arrives in five minutes.","El tren llega en cinco minutos.","Confirmas el andén.","Is this the right platform?","¿Este es el andén correcto?"],
    ["Yes, you're in the right place.","Sí, estás en el lugar correcto.","Dices que ya entendiste.","Great, I understand now.","Genial, ahora entiendo."],
    ["Have a safe trip!","¡Buen viaje!","Te despides.","Thanks. Have a nice day!","Gracias. ¡Que tenga buen día!"]]},
  "Viajes": { lugar:"el aeropuerto y la llegada a una ciudad nueva", persona:"un agente de viajes", items:[
    ["Good morning. May I see your passport?","Buenos días. ¿Puedo ver su pasaporte?","Entregas tu pasaporte.","Of course. Here you are.","Por supuesto. Aquí tiene."],
    ["What is the purpose of your visit?","¿Cuál es el motivo de su visita?","Vienes de vacaciones.","I'm here on vacation.","Estoy aquí de vacaciones."],
    ["How long will you be staying?","¿Cuánto tiempo se quedará?","Te quedarás una semana.","I'll be staying for one week.","Me quedaré una semana."],
    ["Where will you be staying?","¿Dónde se hospedará?","En un hotel del centro.","At a hotel downtown.","En un hotel del centro."],
    ["Do you have any bags to check?","¿Tiene maletas para facturar?","Tienes una maleta.","Yes, I have one suitcase.","Sí, tengo una maleta."],
    ["Here is your boarding pass.","Aquí está su tarjeta de embarque.","Preguntas por la puerta.","Which gate should I go to?","¿A qué puerta debo ir?"],
    ["Your flight boards at six.","Su vuelo aborda a las seis.","Confirmas la hora.","So, boarding starts at six?","Entonces, ¿el abordaje empieza a las seis?"],
    ["Do you need help finding the gate?","¿Necesita ayuda para encontrar la puerta?","Dices que sí, por favor.","Yes, please. That would help.","Sí, por favor. Eso ayudaría."],
    ["The gate is just around the corner.","La puerta está a la vuelta de la esquina.","Agradeces.","Thank you. I appreciate it.","Gracias. Se lo agradezco."],
    ["Enjoy your trip!","¡Disfrute su viaje!","Te despides.","Thank you. Have a great day!","Gracias. ¡Que tenga un gran día!"]]},
  "Trabajo": { lugar:"tu primer día en una nueva oficina", persona:"tu compañero Jordan", items:[
    ["Good morning! Are you the new team member?","¡Buenos días! ¿Eres el nuevo miembro del equipo?","Te presentas.","Yes, I'm Alex. Nice to meet you.","Sí, soy Alex. Mucho gusto."],
    ["What will your role be?","¿Cuál será tu puesto?","Trabajarás en atención al cliente.","I'll be working in customer service.","Trabajaré en atención al cliente."],
    ["Have you worked here before?","¿Has trabajado aquí antes?","Es tu primer día.","No, today is my first day.","No, hoy es mi primer día."],
    ["Would you like a quick tour?","¿Quieres un recorrido rápido?","Aceptas agradecido.","Yes, that would be helpful. Thank you.","Sí, eso sería útil. Gracias."],
    ["Do you know how to use this system?","¿Sabes cómo usar este sistema?","Necesitas que te lo expliquen.","Not yet. Could you show me?","Todavía no. ¿Podrías mostrarme?"],
    ["When is the team meeting?","¿Cuándo es la reunión del equipo?","Preguntas si es a las diez.","Is it at ten o'clock?","¿Es a las diez?"],
    ["Yes. Please bring your notes.","Sí. Por favor, trae tus notas.","Confirmas que las llevarás.","Sure, I'll bring them.","Claro, las llevaré."],
    ["Do you have any questions about the project?","¿Tienes preguntas sobre el proyecto?","Preguntas cuál es la prioridad.","What should I focus on first?","¿En qué debo concentrarme primero?"],
    ["Start with the customer report.","Empieza con el informe de clientes.","Dices que entendiste.","Got it. I'll start with that.","Entendido. Empezaré con eso."],
    ["Welcome to the team!","¡Bienvenido al equipo!","Agradeces la bienvenida.","Thanks. I'm happy to be here.","Gracias. Estoy feliz de estar aquí."]]},
  "Salud": { lugar:"una consulta en una clínica", persona:"la recepcionista y el médico", items:[
    ["Hello. Do you have an appointment?","Hola. ¿Tiene una cita?","Tienes una cita a las diez.","Yes, I have an appointment at ten.","Sí, tengo una cita a las diez."],
    ["What is your full name?","¿Cuál es su nombre completo?","Dices tu nombre.","My name is Alex Rivera.","Me llamo Alex Rivera."],
    ["What brings you in today?","¿Qué le trae por aquí hoy?","Te duele la cabeza.","I have a headache.","Tengo dolor de cabeza."],
    ["When did it start?","¿Cuándo comenzó?","Comenzó ayer.","It started yesterday.","Comenzó ayer."],
    ["Do you have a fever?","¿Tiene fiebre?","Dices que no.","No, I don't.","No, no tengo."],
    ["Are you taking any medication?","¿Está tomando algún medicamento?","Dices que no tomas ninguno.","No, I'm not taking any medication.","No, no estoy tomando ningún medicamento."],
    ["Does anything make the pain worse?","¿Algo empeora el dolor?","Dices que la luz fuerte.","Bright light makes it worse.","La luz fuerte lo empeora."],
    ["I'll examine you now.","Voy a examinarle ahora.","Aceptas.","Okay, thank you.","Está bien, gracias."],
    ["Do you understand the instructions?","¿Entiende las instrucciones?","Pides que las repita.","Could you explain that again, please?","¿Podría explicarlo otra vez, por favor?"],
    ["Of course. Take care.","Por supuesto. Cuídese.","Agradeces la atención.","Thank you for your help.","Gracias por su ayuda."]]},
  "Estudios": { lugar:"el primer día de clases", persona:"tu compañera Emma", items:[
    ["Hi! Are you in this class?","¡Hola! ¿Estás en esta clase?","Confirmas que sí.","Yes, this is my first class.","Sí, esta es mi primera clase."],
    ["What are you studying?","¿Qué estás estudiando?","Estudias inglés.","I'm studying English.","Estoy estudiando inglés."],
    ["Why are you learning it?","¿Por qué lo estás aprendiendo?","Lo necesitas para trabajar y viajar.","I need it for work and travel.","Lo necesito para trabajar y viajar."],
    ["How do you practice at home?","¿Cómo practicas en casa?","Escuchas y repites frases.","I listen and repeat sentences.","Escucho y repito oraciones."],
    ["Would you like to study together?","¿Te gustaría estudiar juntos?","Aceptas.","Sure, that sounds like a good idea.","Claro, me parece una buena idea."],
    ["Which day works for you?","¿Qué día te viene bien?","El sábado.","Saturday works for me.","El sábado me viene bien."],
    ["Should we meet at the library?","¿Nos encontramos en la biblioteca?","Te parece perfecto.","Perfect. I'll meet you there.","Perfecto. Nos vemos allí."],
    ["Do you have the homework?","¿Tienes la tarea?","La tienes en tu cuaderno.","Yes, I have it in my notebook.","Sí, la tengo en mi cuaderno."],
    ["Can you help me with this question?","¿Puedes ayudarme con esta pregunta?","Ofreces ayuda.","Of course. Let's do it together.","Por supuesto. Hagámoslo juntos."],
    ["See you in class!","¡Nos vemos en clase!","Te despides.","See you. Have a great day!","Nos vemos. ¡Que tengas un gran día!"]]},
  "Amistad": { lugar:"un encuentro con un nuevo amigo", persona:"Sam", items:[
    ["What do you enjoy doing on weekends?","¿Qué disfrutas hacer los fines de semana?","Te gusta salir a caminar.","I like going for walks.","Me gusta salir a caminar."],
    ["Do you prefer movies or concerts?","¿Prefieres películas o conciertos?","Prefieres películas.","I prefer watching movies.","Prefiero ver películas."],
    ["Have you seen any good movies lately?","¿Has visto buenas películas últimamente?","Viste una comedia.","I watched a funny comedy.","Vi una comedia divertida."],
    ["Would you like to try a new café?","¿Te gustaría probar una cafetería nueva?","Aceptas la invitación.","Sure, I'd love to try it.","Claro, me encantaría probarla."],
    ["What kind of coffee do you like?","¿Qué tipo de café te gusta?","Te gusta el café con leche.","I like coffee with milk.","Me gusta el café con leche."],
    ["Do you play any sports?","¿Practicas algún deporte?","Juegas fútbol a veces.","I play soccer sometimes.","Juego fútbol a veces."],
    ["Are you free next weekend?","¿Estás libre el próximo fin de semana?","Crees que sí y preguntas el plan.","I think so. What's the plan?","Creo que sí. ¿Cuál es el plan?"],
    ["Let's go to the park.","Vamos al parque.","Te parece una buena idea.","That sounds like fun.","Eso suena divertido."],
    ["I'll text you the details.","Te enviaré los detalles por mensaje.","Agradeces.","Great. Thanks for inviting me.","Genial. Gracias por invitarme."],
    ["I'm glad we became friends.","Me alegra que nos hayamos hecho amigos.","Respondes con amabilidad.","Me too. See you soon!","A mí también. ¡Hasta pronto!"]]},
  "Eventos": { lugar:"una fiesta donde conoces a los invitados", persona:"Taylor", items:[
    ["Hi! How do you know the host?","¡Hola! ¿Cómo conoces al anfitrión?","Dices que es un amigo del trabajo.","He's a friend from work.","Es un amigo del trabajo."],
    ["Have you been to this event before?","¿Has venido antes a este evento?","Es tu primera vez.","No, this is my first time.","No, esta es mi primera vez."],
    ["Would you like something to drink?","¿Te gustaría algo de beber?","Pides agua con gas.","Sparkling water, please.","Agua con gas, por favor."],
    ["Do you know many people here?","¿Conoces a muchas personas aquí?","Conoces solo a unas pocas.","I only know a few people.","Solo conozco a unas pocas personas."],
    ["What do you do?","¿A qué te dedicas?","Dices que trabajas en un negocio pequeño.","I run a small business.","Tengo un pequeño negocio."],
    ["The music is great, isn't it?","La música está genial, ¿verdad?","Estás de acuerdo.","Yes, I really like it.","Sí, me gusta mucho."],
    ["Would you like to meet my friends?","¿Te gustaría conocer a mis amigos?","Aceptas.","Sure, I'd like that.","Claro, me gustaría."],
    ["Are you enjoying the party?","¿Estás disfrutando la fiesta?","Dices que sí, mucho.","Yes, I'm having a great time.","Sí, la estoy pasando muy bien."],
    ["We are taking a group photo.","Vamos a tomar una foto grupal.","Te unes a la foto.","Great! I'll join you.","¡Genial! Me uno a ustedes."],
    ["It was great meeting you tonight.","Fue genial conocerte esta noche.","Te despides.","You too. Enjoy the rest of the evening.","Igualmente. Disfruta el resto de la noche."]]},
  "Emergencias": { lugar:"una situación en la que necesitas ayuda urgente", persona:"una persona que puede ayudarte", items:[
    ["Are you okay? What happened?","¿Estás bien? ¿Qué pasó?","Dices que necesitas ayuda.","I need help, please.","Necesito ayuda, por favor."],
    ["Is anyone hurt?","¿Hay alguien herido?","Dices que una persona está herida.","Yes, someone is hurt.","Sí, alguien está herido."],
    ["Where are you right now?","¿Dónde estás ahora?","Das la ubicación.","I'm outside the main entrance.","Estoy afuera de la entrada principal."],
    ["Should I call emergency services?","¿Debo llamar a emergencias?","Pides que llamen ahora.","Yes, please call now.","Sí, por favor llame ahora."],
    ["Can you tell me your phone number?","¿Puedes decirme tu número de teléfono?","Ofreces tu número despacio.","Yes. I'll say it slowly.","Sí. Lo diré despacio."],
    ["Stay where you are. Help is coming.","Quédate donde estás. La ayuda viene en camino.","Confirmas que esperarás.","Okay. I'll stay here.","Está bien. Me quedaré aquí."],
    ["Do you know what caused the problem?","¿Sabes qué causó el problema?","Explicas que no lo sabes.","I'm not sure what happened.","No estoy seguro de lo que pasó."],
    ["Can you describe the person?","¿Puedes describir a la persona?","Das una descripción sencilla.","He is wearing a blue jacket.","Lleva una chaqueta azul."],
    ["The emergency team is here.","El equipo de emergencia está aquí.","Dices que gracias por ayudar.","Thank you for coming so quickly.","Gracias por venir tan rápido."],
    ["You're safe now. Take a deep breath.","Ahora estás a salvo. Respira profundo.","Respondes que lo harás.","Okay. Thank you for helping me.","Está bien. Gracias por ayudarme."]]},
  "Relaciones": { lugar:"una conversación honesta con alguien cercano", persona:"Jamie", items:[
    ["Can we talk for a moment?","¿Podemos hablar un momento?","Aceptas escuchar.","Of course. What's on your mind?","Por supuesto. ¿Qué tienes en mente?"],
    ["I've been feeling a little distant lately.","Últimamente me he sentido un poco distante.","Preguntas qué sucede.","Is something bothering you?","¿Hay algo que te preocupe?"],
    ["I think we need to spend more time together.","Creo que necesitamos pasar más tiempo juntos.","Dices que estás de acuerdo.","I understand. I feel the same way.","Entiendo. Siento lo mismo."],
    ["What could we do differently?","¿Qué podríamos hacer diferente?","Propones cenar juntos sin teléfonos.","We could have dinner without our phones.","Podríamos cenar sin nuestros teléfonos."],
    ["That sounds like a good idea.","Eso suena como una buena idea.","Propones hacerlo el viernes.","Let's try it on Friday.","Probémoslo el viernes."],
    ["Can we be honest with each other?","¿Podemos ser honestos el uno con el otro?","Dices que sí, es importante.","Yes. That's very important to me.","Sí. Eso es muy importante para mí."],
    ["I'm sorry if I hurt your feelings.","Lo siento si herí tus sentimientos.","Aceptas la disculpa.","Thank you for saying that.","Gracias por decirlo."],
    ["I want us to understand each other.","Quiero que nos entendamos.","Dices que tú también.","I want that too.","Yo también quiero eso."],
    ["Can we start again and take it slowly?","¿Podemos empezar de nuevo y tomarlo con calma?","Aceptas intentarlo.","Yes, let's take it one step at a time.","Sí, vayamos paso a paso."],
    ["Thank you for listening.","Gracias por escuchar.","Agradeces la conversación.","Thank you for being honest with me.","Gracias por ser sincero conmigo."]]},
  "Negocios y finanzas": { lugar:"una reunión para hablar de una oportunidad de negocio", persona:"Morgan", items:[
    ["What kind of business are you running?","¿Qué tipo de negocio tienes?","Explicas que tienes una pequeña empresa.","I run a small company.","Tengo una pequeña empresa."],
    ["Who are your main customers?","¿Quiénes son tus principales clientes?","Son clientes locales.","Most of our customers are local.","La mayoría de nuestros clientes son locales."],
    ["What are your goals for this year?","¿Cuáles son tus metas para este año?","Quieres aumentar las ventas.","We want to increase our sales.","Queremos aumentar nuestras ventas."],
    ["How much are you planning to invest?","¿Cuánto planeas invertir?","Aún estás calculando el presupuesto.","I'm still working on the budget.","Todavía estoy trabajando en el presupuesto."],
    ["Do you have a business plan?","¿Tienes un plan de negocio?","Dices que sí y lo puedes compartir.","Yes, I can share the plan with you.","Sí, puedo compartir el plan contigo."],
    ["When do you expect to start?","¿Cuándo esperas comenzar?","El próximo mes.","We expect to start next month.","Esperamos comenzar el próximo mes."],
    ["What are the biggest risks?","¿Cuáles son los mayores riesgos?","Mencionas los costos y el tiempo.","Costs and timing are the main risks.","Los costos y el tiempo son los principales riesgos."],
    ["How will you measure success?","¿Cómo medirás el éxito?","Revisarás ingresos y clientes.","We'll track revenue and new customers.","Seguiremos los ingresos y los nuevos clientes."],
    ["Can you send me the numbers?","¿Puedes enviarme las cifras?","Dices que las enviarás hoy.","Sure, I'll send them today.","Claro, las enviaré hoy."],
    ["It was good discussing this with you.","Fue bueno hablar de esto contigo.","Agradeces la reunión.","Thank you for your time. I'll follow up soon.","Gracias por tu tiempo. Haré seguimiento pronto."]]},
  "Tecnología e innovación": { lugar:"una tienda donde te ayudan con un teléfono nuevo", persona:"el asesor", items:[
    ["What seems to be the problem with your phone?","¿Cuál parece ser el problema con tu teléfono?","La batería se descarga rápido.","The battery runs out quickly.","La batería se descarga rápido."],
    ["When did you first notice it?","¿Cuándo lo notaste por primera vez?","Hace unos días.","A few days ago.","Hace unos días."],
    ["Have you tried restarting it?","¿Has intentado reiniciarlo?","Todavía no.","No, I haven't tried that yet.","No, todavía no lo he intentado."],
    ["Would you like us to check the settings?","¿Quieres que revisemos la configuración?","Sí, por favor.","Yes, please. That would be helpful.","Sí, por favor. Eso sería útil."],
    ["Do you have a backup of your photos?","¿Tienes una copia de seguridad de tus fotos?","Dices que sí, en la nube.","Yes, they're backed up in the cloud.","Sí, tienen copia en la nube."],
    ["The software needs an update.","El software necesita una actualización.","Preguntas cuánto tardará.","How long will the update take?","¿Cuánto tardará la actualización?"],
    ["About twenty minutes.","Unos veinte minutos.","Dices que puedes esperar.","That's fine. I can wait.","Está bien. Puedo esperar."],
    ["Would you like help setting up the new feature?","¿Quieres ayuda para configurar la nueva función?","Aceptas.","Yes, please show me how it works.","Sí, por favor muéstreme cómo funciona."],
    ["Is everything working now?","¿Todo funciona ahora?","Confirmas que sí.","Yes, everything is working. Thank you.","Sí, todo funciona. Gracias."],
    ["Let us know if you need anything else.","Avísanos si necesitas algo más.","Te despides.","I will. Thanks for your help.","Lo haré. Gracias por su ayuda."]]},
  "Geografía y viajes": { lugar:"una oficina de información turística en una ciudad nueva", persona:"un guía local", items:[
    ["Is this your first visit to the city?","¿Es tu primera visita a la ciudad?","Dices que sí.","Yes, it's my first visit.","Sí, es mi primera visita."],
    ["What would you like to see?","¿Qué te gustaría conocer?","Quieres visitar el centro histórico.","I'd like to visit the old town.","Me gustaría visitar el casco antiguo."],
    ["Are you interested in museums?","¿Te interesan los museos?","Sí, especialmente los de historia.","Yes, especially history museums.","Sí, especialmente los museos de historia."],
    ["How do you plan to get there?","¿Cómo planeas llegar?","En autobús.","I'll take the bus.","Tomaré el autobús."],
    ["Would you like a map?","¿Te gustaría un mapa?","Aceptas.","Yes, a map would be great.","Sí, un mapa estaría genial."],
    ["Do you want to try the local food?","¿Quieres probar la comida local?","Te gustaría probarla.","I'd love to try the local food.","Me encantaría probar la comida local."],
    ["How many days are you staying?","¿Cuántos días te quedarás?","Tres días.","I'm staying for three days.","Me quedaré tres días."],
    ["The best view is from the hill.","La mejor vista es desde la colina.","Preguntas cómo llegar.","How can I get there?","¿Cómo puedo llegar allí?"],
    ["You can walk there in fifteen minutes.","Puedes caminar hasta allí en quince minutos.","Agradeces el consejo.","Thanks for the recommendation.","Gracias por la recomendación."],
    ["Enjoy exploring our city!","¡Disfruta explorando nuestra ciudad!","Te despides.","Thank you. I'm excited to explore.","Gracias. Estoy emocionado por conocerla."]]},
  "Mente y aprendizaje": { lugar:"una sesión para aprender una habilidad nueva", persona:"la instructora", items:[
    ["What would you like to learn?","¿Qué te gustaría aprender?","Quieres mejorar tu inglés.","I'd like to improve my English.","Me gustaría mejorar mi inglés."],
    ["What is the hardest part for you?","¿Qué parte es la más difícil para ti?","Hablar te cuesta más.","Speaking is the hardest part for me.","Hablar es lo más difícil para mí."],
    ["How often do you practice?","¿Con qué frecuencia practicas?","Practicas todos los días.","I practice every day.","Practico todos los días."],
    ["Do you prefer listening or reading?","¿Prefieres escuchar o leer?","Prefieres escuchar.","I prefer listening.","Prefiero escuchar."],
    ["What helps you remember new words?","¿Qué te ayuda a recordar palabras nuevas?","Repetirlas en frases.","Repeating them in sentences helps me.","Repetirlas en oraciones me ayuda."],
    ["Would you like to try a short exercise?","¿Te gustaría intentar un ejercicio corto?","Aceptas.","Yes, let's try it.","Sí, intentémoslo."],
    ["Can you use this word in a sentence?","¿Puedes usar esta palabra en una oración?","Dices que vas a intentarlo.","I'll give it a try.","Lo intentaré."],
    ["What did you learn today?","¿Qué aprendiste hoy?","Aprendiste expresiones nuevas.","I learned some useful expressions.","Aprendí algunas expresiones útiles."],
    ["What will you practice tomorrow?","¿Qué practicarás mañana?","Practicarás preguntas.","I'll practice asking questions.","Practicaré hacer preguntas."],
    ["Small steps make a big difference.","Los pequeños pasos hacen una gran diferencia.","Agradeces el ánimo.","Thank you. I'll keep practicing.","Gracias. Seguiré practicando."]]},
  "Ciencia y naturaleza": { lugar:"una visita a un parque natural", persona:"la guía", items:[
    ["What kind of birds live here?","¿Qué tipo de aves viven aquí?","Preguntas por las aves de la zona.","What birds can we see here?","¿Qué aves podemos ver aquí?"],
    ["The lake is home to many species.","El lago es hogar de muchas especies.","Preguntas si podemos acercarnos.","Can we get closer to the lake?","¿Podemos acercarnos al lago?"],
    ["Please stay on the marked path.","Por favor, permanece en el sendero señalado.","Dices que seguirás las indicaciones.","Of course. I'll stay on the path.","Por supuesto. Me quedaré en el sendero."],
    ["Have you studied plants before?","¿Has estudiado plantas antes?","Dices que conoces algunas.","I've learned about a few plants.","He aprendido sobre algunas plantas."],
    ["Why are these trees important?","¿Por qué son importantes estos árboles?","Mencionas que dan sombra y hogar a animales.","They provide shade and shelter for animals.","Dan sombra y refugio a los animales."],
    ["Do you see the clouds moving?","¿Ves las nubes moverse?","Dices que parece que va a llover.","It looks like it's going to rain.","Parece que va a llover."],
    ["We should protect clean water.","Debemos proteger el agua limpia.","Estás de acuerdo.","I agree. Water is very important.","Estoy de acuerdo. El agua es muy importante."],
    ["Would you like to join the next nature walk?","¿Te gustaría unirte a la próxima caminata natural?","Preguntas cuándo será.","When is the next walk?","¿Cuándo es la próxima caminata?"],
    ["It's next Sunday morning.","Es el próximo domingo por la mañana.","Dices que intentarás asistir.","I'll try to be there.","Intentaré estar allí."],
    ["Thanks for exploring with us.","Gracias por explorar con nosotros.","Agradeces el recorrido.","Thank you. I learned a lot.","Gracias. Aprendí mucho."]]},
  "Historia y civilizaciones": { lugar:"un museo de historia", persona:"el guía", items:[
    ["What period are we looking at?","¿Qué período estamos viendo?","Preguntas por la época de la exposición.","Which historical period is this?","¿Qué período histórico es este?"],
    ["This city was an important trading center.","Esta ciudad fue un centro comercial importante.","Preguntas qué productos comerciaban.","What goods did people trade?","¿Qué productos comerciaba la gente?"],
    ["They traded food, cloth, and tools.","Comerciaban alimentos, telas y herramientas.","Preguntas cómo viajaban.","How did they travel between cities?","¿Cómo viajaban entre ciudades?"],
    ["Many people traveled by horse or boat.","Muchas personas viajaban a caballo o en barco.","Dices que debió ser difícil.","That must have been difficult.","Eso debió ser difícil."],
    ["What can this building tell us?","¿Qué puede contarnos este edificio?","Preguntas por su arquitectura.","Can you explain its architecture?","¿Puede explicar su arquitectura?"],
    ["It shows how people lived at that time.","Muestra cómo vivía la gente en esa época.","Preguntas si se puede tomar una foto.","Can I take a picture?","¿Puedo tomar una foto?"],
    ["Yes, but please do not use flash.","Sí, pero por favor no uses flash.","Aceptas la regla.","No problem. I won't use flash.","No hay problema. No usaré flash."],
    ["Which object interests you most?","¿Qué objeto te interesa más?","Eliges una herramienta antigua.","The old tool interests me the most.","La herramienta antigua es la que más me interesa."],
    ["What did you learn from the visit?","¿Qué aprendiste de la visita?","Dices que aprendiste cómo vivían.","I learned how people lived in the past.","Aprendí cómo vivía la gente en el pasado."],
    ["Thank you for joining the tour.","Gracias por unirte al recorrido.","Agradeces la explicación.","Thank you for explaining everything.","Gracias por explicarlo todo."]]},
  "Filosofía y pensamiento": { lugar:"un club de conversación sobre ideas", persona:"Casey", items:[
    ["What does happiness mean to you?","¿Qué significa la felicidad para ti?","Dices que es disfrutar las cosas sencillas.","Happiness means enjoying simple things.","La felicidad significa disfrutar las cosas sencillas."],
    ["Do you think money can buy happiness?","¿Crees que el dinero puede comprar la felicidad?","Dices que ayuda, pero no lo es todo.","Money helps, but it isn't everything.","El dinero ayuda, pero no lo es todo."],
    ["What makes someone trustworthy?","¿Qué hace que alguien sea digno de confianza?","Hablas de la honestidad.","Honesty makes someone trustworthy.","La honestidad hace que alguien sea digno de confianza."],
    ["Is failure always a bad thing?","¿Fracasar siempre es algo malo?","Dices que se puede aprender.","No. We can learn from failure.","No. Podemos aprender del fracaso."],
    ["How do you make an important decision?","¿Cómo tomas una decisión importante?","Piensas antes de decidir.","I take my time before deciding.","Me tomo mi tiempo antes de decidir."],
    ["Why should we respect different opinions?","¿Por qué debemos respetar opiniones diferentes?","Porque cada persona tiene otra experiencia.","Everyone has different experiences.","Cada persona tiene experiencias diferentes."],
    ["What would you change in the world?","¿Qué cambiarías del mundo?","Te gustaría más comprensión.","I'd like people to understand each other more.","Me gustaría que las personas se entendieran más."],
    ["Do you agree that learning never ends?","¿Estás de acuerdo en que aprender nunca termina?","Dices que sí.","Yes, we can always learn something new.","Sí, siempre podemos aprender algo nuevo."],
    ["That's a thoughtful answer.","Esa es una respuesta reflexiva.","Agradeces y preguntas su opinión.","Thank you. What's your opinion?","Gracias. ¿Cuál es tu opinión?"],
    ["I enjoyed hearing your ideas.","Disfruté escuchar tus ideas.","Te despides.","I enjoyed sharing them. See you soon.","Disfruté compartirlas. Hasta pronto."]]},
  "Matemáticas y lógica": { lugar:"una sesión de ejercicios de lógica", persona:"el instructor", items:[
    ["Can you find the pattern?","¿Puedes encontrar el patrón?","Dices que vas a observar los números.","Let me look at the numbers.","Déjame mirar los números."],
    ["What number comes next?","¿Qué número sigue?","Das tu respuesta.","I think the next number is twelve.","Creo que el siguiente número es doce."],
    ["How did you get that answer?","¿Cómo obtuviste esa respuesta?","Explicas que sumaste tres.","I added three each time.","Sumé tres cada vez."],
    ["Can you solve it another way?","¿Puedes resolverlo de otra manera?","Dices que lo intentarás.","I'll try another method.","Intentaré otro método."],
    ["Which information is missing?","¿Qué información falta?","Preguntas por el dato final.","We need the final number.","Necesitamos el número final."],
    ["Does this conclusion follow the clues?","¿Esta conclusión sigue las pistas?","Dices que sí, por esta razón.","Yes, because the clues support it.","Sí, porque las pistas lo respaldan."],
    ["What would happen if we changed the rule?","¿Qué pasaría si cambiáramos la regla?","El resultado sería diferente.","The result would be different.","El resultado sería diferente."],
    ["Can you explain your reasoning clearly?","¿Puedes explicar claramente tu razonamiento?","Dices que sí.","Yes. First, I checked the pattern.","Sí. Primero revisé el patrón."],
    ["Would you like one more challenge?","¿Te gustaría un reto más?","Aceptas.","Yes, I'm ready for another one.","Sí, estoy listo para otro."],
    ["Great thinking today.","Pensaste muy bien hoy.","Agradeces.","Thank you. I enjoyed the challenge.","Gracias. Disfruté el reto."]]},
  "Arte y literatura": { lugar:"una galería de arte", persona:"la curadora", items:[
    ["What do you think of this painting?","¿Qué piensas de esta pintura?","Dices que te gustan sus colores.","I love the colors in this painting.","Me encantan los colores de esta pintura."],
    ["What do you think the artist is showing?","¿Qué crees que muestra el artista?","Crees que muestra una ciudad.","I think it shows a city.","Creo que muestra una ciudad."],
    ["Do you enjoy visiting galleries?","¿Disfrutas visitar galerías?","Dices que sí, cuando tienes tiempo.","Yes, when I have time.","Sí, cuando tengo tiempo."],
    ["Which style do you prefer?","¿Qué estilo prefieres?","Prefieres el arte moderno.","I prefer modern art.","Prefiero el arte moderno."],
    ["Have you read this author's work?","¿Has leído la obra de este autor?","Todavía no.","Not yet. Is it a good book?","Todavía no. ¿Es un buen libro?"],
    ["It's a story about courage and friendship.","Es una historia sobre valentía y amistad.","Dices que te interesa leerla.","That sounds interesting. I'd like to read it.","Suena interesante. Me gustaría leerla."],
    ["Would you like a recommendation?","¿Te gustaría una recomendación?","Aceptas.","Yes, please recommend a book.","Sí, por favor recomiéndame un libro."],
    ["This one is a popular choice.","Esta es una opción popular.","Preguntas dónde puedes comprarlo.","Where can I find it?","¿Dónde puedo encontrarlo?"],
    ["The bookstore is across the street.","La librería está al otro lado de la calle.","Agradeces la información.","Thank you. I'll take a look.","Gracias. Iré a mirar."],
    ["Enjoy the exhibition!","¡Disfruta la exposición!","Te despides.","Thank you. Have a lovely day.","Gracias. Que tenga un lindo día."]]},
  "Sociedad y cultura": { lugar:"un encuentro multicultural", persona:"Avery", items:[
    ["Where did you grow up?","¿Dónde creciste?","Dices que creciste en Colombia.","I grew up in Colombia.","Crecí en Colombia."],
    ["What do you miss about your hometown?","¿Qué extrañas de tu ciudad?","Extrañas la comida y la familia.","I miss the food and my family.","Extraño la comida y a mi familia."],
    ["What is a typical celebration there?","¿Cuál es una celebración típica allí?","Mencionas las fiestas familiares.","Family celebrations are very common.","Las celebraciones familiares son muy comunes."],
    ["What would you recommend to a visitor?","¿Qué recomendarías a un visitante?","Recomiendas probar comida local.","I recommend trying the local food.","Recomiendo probar la comida local."],
    ["Do people have different customs here?","¿La gente tiene costumbres diferentes aquí?","Dices que sí, y sigues aprendiendo.","Yes, and I'm still learning about them.","Sí, y todavía estoy aprendiendo sobre ellas."],
    ["What do you enjoy about this community?","¿Qué disfrutas de esta comunidad?","Te gusta conocer gente.","I enjoy meeting new people.","Disfruto conocer gente nueva."],
    ["Would you like to join our cultural day?","¿Te gustaría participar en nuestro día cultural?","Aceptas con gusto.","I'd be happy to join.","Me gustaría participar."],
    ["Could you share a tradition from your country?","¿Podrías compartir una tradición de tu país?","Dices que sí, con mucho gusto.","Of course. I'd love to share one.","Por supuesto. Me encantaría compartir una."],
    ["Thank you for sharing your culture.","Gracias por compartir tu cultura.","Agradeces la invitación.","Thank you for making me feel welcome.","Gracias por hacerme sentir bienvenido."],
    ["See you at the next event!","¡Nos vemos en el próximo evento!","Te despides.","See you there. Take care!","Nos vemos allí. ¡Cuídate!"]]},
  "Vida práctica y bienestar": { lugar:"una conversación sobre organizar la semana", persona:"Robin", items:[
    ["How do you organize your week?","¿Cómo organizas tu semana?","Usas una lista.","I use a simple list.","Uso una lista sencilla."],
    ["What do you do first in the morning?","¿Qué haces primero por la mañana?","Preparas el desayuno.","I prepare breakfast first.","Primero preparo el desayuno."],
    ["Do you take breaks during the day?","¿Tomas descansos durante el día?","Sí, cada pocas horas.","Yes, every few hours.","Sí, cada pocas horas."],
    ["What helps you stay focused?","¿Qué te ayuda a concentrarte?","Apagar las notificaciones.","Turning off notifications helps me.","Apagar las notificaciones me ayuda."],
    ["Do you like walking outside?","¿Te gusta caminar al aire libre?","Sí, especialmente por la tarde.","Yes, especially in the afternoon.","Sí, especialmente por la tarde."],
    ["Would you like to take a short break?","¿Te gustaría tomar un descanso corto?","Aceptas.","Sure. A short break sounds good.","Claro. Un descanso corto suena bien."],
    ["What is one goal for this week?","¿Cuál es una meta para esta semana?","Quieres terminar un proyecto.","I want to finish a project.","Quiero terminar un proyecto."],
    ["How will you make time for it?","¿Cómo sacarás tiempo para eso?","Lo harás por las mañanas.","I'll work on it in the mornings.","Trabajaré en eso por las mañanas."],
    ["That sounds like a good plan.","Ese parece un buen plan.","Dices que lo intentarás.","I'll do my best. Thank you.","Haré lo mejor que pueda. Gracias."],
    ["Have a balanced week!","¡Que tengas una semana equilibrada!","Te despides.","You too. Take care.","Igualmente. Cuídate."]]},
  "Inglés y comunicación": { lugar:"una práctica de conversación en inglés", persona:"la profesora", items:[
    ["How do you ask someone to speak slowly?","¿Cómo le pides a alguien que hable despacio?","Pides que hable más despacio.","Could you speak more slowly, please?","¿Podría hablar más despacio, por favor?"],
    ["What do you say when you don't understand?","¿Qué dices cuando no entiendes?","Pides una explicación.","I don't understand. Could you explain?","No entiendo. ¿Podría explicarlo?"],
    ["How do you ask someone to repeat a word?","¿Cómo pides que repitan una palabra?","Pides que repita la palabra.","Could you repeat that word?","¿Podría repetir esa palabra?"],
    ["How do you spell your first name?","¿Cómo deletreas tu nombre?","Dices que lo deletrearás.","I'll spell it for you.","Te lo voy a deletrear."],
    ["What do you say when you need a moment?","¿Qué dices cuando necesitas un momento?","Pides un segundo.","Just a moment, please.","Un momento, por favor."],
    ["How do you check that you understood correctly?","¿Cómo confirmas que entendiste bien?","Repites lo que escuchaste.","So, you mean tomorrow, right?","Entonces, quiere decir mañana, ¿verdad?"],
    ["What do you say when someone helps you?","¿Qué dices cuando alguien te ayuda?","Agradeces la ayuda.","Thank you. I appreciate your help.","Gracias. Aprecio su ayuda."],
    ["How do you politely interrupt?","¿Cómo interrumpes amablemente?","Pides permiso para hablar.","Excuse me, may I ask something?","Disculpe, ¿puedo preguntar algo?"],
    ["What do you say when you need an example?","¿Qué dices cuando necesitas un ejemplo?","Pides un ejemplo.","Could you give me an example?","¿Podría darme un ejemplo?"],
    ["You're communicating more confidently.","Te estás comunicando con más confianza.","Agradeces y dices que seguirás practicando.","Thank you. I'll keep practicing.","Gracias. Seguiré practicando."]]},
  "Arte y literatura": { lugar:"una galería de arte", persona:"la curadora", items:[
    ["What do you think of this painting?","¿Qué piensas de esta pintura?","Dices que te gustan sus colores.","I love the colors in this painting.","Me encantan los colores de esta pintura."],
    ["What do you think the artist is showing?","¿Qué crees que muestra el artista?","Crees que muestra una ciudad.","I think it shows a city.","Creo que muestra una ciudad."],
    ["Do you enjoy visiting galleries?","¿Disfrutas visitar galerías?","Dices que sí, cuando tienes tiempo.","Yes, when I have time.","Sí, cuando tengo tiempo."],
    ["Which style do you prefer?","¿Qué estilo prefieres?","Prefieres el arte moderno.","I prefer modern art.","Prefiero el arte moderno."],
    ["Have you read this author's work?","¿Has leído la obra de este autor?","Todavía no.","Not yet. Is it a good book?","Todavía no. ¿Es un buen libro?"],
    ["It's a story about courage and friendship.","Es una historia sobre valentía y amistad.","Dices que te interesa leerla.","That sounds interesting. I'd like to read it.","Suena interesante. Me gustaría leerla."],
    ["Would you like a recommendation?","¿Te gustaría una recomendación?","Aceptas.","Yes, please recommend a book.","Sí, por favor recomiéndame un libro."],
    ["This one is a popular choice.","Esta es una opción popular.","Preguntas dónde puedes comprarlo.","Where can I find it?","¿Dónde puedo encontrarlo?"],
    ["The bookstore is across the street.","La librería está al otro lado de la calle.","Agradeces la información.","Thank you. I'll take a look.","Gracias. Iré a mirar."],
    ["Enjoy the exhibition!","¡Disfruta la exposición!","Te despides.","Thank you. Have a lovely day.","Gracias. Que tenga un lindo día."]]},
  "Sociedad y cultura": { lugar:"un encuentro multicultural", persona:"Avery", items:[
    ["Where did you grow up?","¿Dónde creciste?","Dices que creciste en Colombia.","I grew up in Colombia.","Crecí en Colombia."],
    ["What do you miss about your hometown?","¿Qué extrañas de tu ciudad?","Extrañas la comida y la familia.","I miss the food and my family.","Extraño la comida y a mi familia."],
    ["What is a typical celebration there?","¿Cuál es una celebración típica allí?","Mencionas las fiestas familiares.","Family celebrations are very common.","Las celebraciones familiares son muy comunes."],
    ["What would you recommend to a visitor?","¿Qué recomendarías a un visitante?","Recomiendas probar comida local.","I recommend trying the local food.","Recomiendo probar la comida local."],
    ["Do people have different customs here?","¿La gente tiene costumbres diferentes aquí?","Dices que sí, y sigues aprendiendo.","Yes, and I'm still learning about them.","Sí, y todavía estoy aprendiendo sobre ellas."],
    ["What do you enjoy about this community?","¿Qué disfrutas de esta comunidad?","Te gusta conocer gente.","I enjoy meeting new people.","Disfruto conocer gente nueva."],
    ["Would you like to join our cultural day?","¿Te gustaría participar en nuestro día cultural?","Aceptas con gusto.","I'd be happy to join.","Me gustaría participar."],
    ["Could you share a tradition from your country?","¿Podrías compartir una tradición de tu país?","Dices que sí, con mucho gusto.","Of course. I'd love to share one.","Por supuesto. Me encantaría compartir una."],
    ["Thank you for sharing your culture.","Gracias por compartir tu cultura.","Agradeces la invitación.","Thank you for making me feel welcome.","Gracias por hacerme sentir bienvenido."],
    ["See you at the next event!","¡Nos vemos en el próximo evento!","Te despides.","See you there. Take care!","Nos vemos allí. ¡Cuídate!"]]},
  "Vida práctica y bienestar": { lugar:"una conversación sobre organizar la semana", persona:"Robin", items:[
    ["How do you organize your week?","¿Cómo organizas tu semana?","Usas una lista.","I use a simple list.","Uso una lista sencilla."],
    ["What do you do first in the morning?","¿Qué haces primero por la mañana?","Preparas el desayuno.","I prepare breakfast first.","Primero preparo el desayuno."],
    ["Do you take breaks during the day?","¿Tomas descansos durante el día?","Sí, cada pocas horas.","Yes, every few hours.","Sí, cada pocas horas."],
    ["What helps you stay focused?","¿Qué te ayuda a concentrarte?","Apagar las notificaciones.","Turning off notifications helps me.","Apagar las notificaciones me ayuda."],
    ["Do you like walking outside?","¿Te gusta caminar al aire libre?","Sí, especialmente por la tarde.","Yes, especially in the afternoon.","Sí, especialmente por la tarde."],
    ["Would you like to take a short break?","¿Te gustaría tomar un descanso corto?","Aceptas.","Sure. A short break sounds good.","Claro. Un descanso corto suena bien."],
    ["What is one goal for this week?","¿Cuál es una meta para esta semana?","Quieres terminar un proyecto.","I want to finish a project.","Quiero terminar un proyecto."],
    ["How will you make time for it?","¿Cómo sacarás tiempo para eso?","Lo harás por las mañanas.","I'll work on it in the mornings.","Trabajaré en eso por las mañanas."],
    ["That sounds like a good plan.","Ese parece un buen plan.","Dices que lo intentarás.","I'll do my best. Thank you.","Haré lo mejor que pueda. Gracias."],
    ["Have a balanced week!","¡Que tengas una semana equilibrada!","Te despides.","You too. Take care.","Igualmente. Cuídate."]]},
  "Inglés y comunicación": { lugar:"una práctica de conversación en inglés", persona:"la profesora", items:[
    ["How do you ask someone to speak slowly?","¿Cómo le pides a alguien que hable despacio?","Pides que hable más despacio.","Could you speak more slowly, please?","¿Podría hablar más despacio, por favor?"],
    ["What do you say when you don't understand?","¿Qué dices cuando no entiendes?","Pides una explicación.","I don't understand. Could you explain?","No entiendo. ¿Podría explicarlo?"],
    ["How do you ask someone to repeat a word?","¿Cómo pides que repitan una palabra?","Pides que repita la palabra.","Could you repeat that word?","¿Podría repetir esa palabra?"],
    ["How do you spell your first name?","¿Cómo deletreas tu nombre?","Dices que lo deletrearás.","I'll spell it for you.","Te lo voy a deletrear."],
    ["What do you say when you need a moment?","¿Qué dices cuando necesitas un momento?","Pides un segundo.","Just a moment, please.","Un momento, por favor."],
    ["How do you check that you understood correctly?","¿Cómo confirmas que entendiste bien?","Repites lo que escuchaste.","So, you mean tomorrow, right?","Entonces, quiere decir mañana, ¿verdad?"],
    ["What do you say when someone helps you?","¿Qué dices cuando alguien te ayuda?","Agradeces la ayuda.","Thank you. I appreciate your help.","Gracias. Aprecio su ayuda."],
    ["How do you politely interrupt?","¿Cómo interrumpes amablemente?","Pides permiso para hablar.","Excuse me, may I ask something?","Disculpe, ¿puedo preguntar algo?"],
    ["What do you say when you need an example?","¿Qué dices cuando necesitas un ejemplo?","Pides un ejemplo.","Could you give me an example?","¿Podría darme un ejemplo?"],
    ["You're communicating more confidently.","Te estás comunicando con más confianza.","Agradeces y dices que seguirás practicando.","Thank you. I'll keep practicing.","Gracias. Seguiré practicando."]]},

};

const crearGuionEscucha = (capitulo) => {
  const base = escenariosProfesor[capitulo.category];
  // El modo escucha reutiliza el diálogo propio de la categoría, pero elimina
  // preguntas, opciones y explicaciones: solo conversación en inglés y traducción.
  if (base?.items?.length) {
    return base.items.map((item, index) => ({
      speaker: index % 2 === 0 ? base.persona : "Tú",
      en: item[0],
      es: item[1]
    }));
  }
  return (capitulo.dialogue || []).map((linea) => ({
    speaker: linea.speaker,
    en: linea.en,
    es: linea.es
  }));
};

const crearGuionProfesor = (capitulo) => {
  const base = escenariosProfesor[capitulo.category];
  const titulo = capitulo.title || "esta situación";
  // Si una categoría no tiene todavía un guion editorial propio, usa las líneas
  // del capítulo seleccionado como base. Así no cae en la conversación de saludos.
  const items = base?.items || (capitulo.dialogue || []).slice(0, 20).map((linea, index) => [
    linea.en,
    linea.es,
    `En esta parte de “${titulo}”, piensa cómo continuar la conversación.`,
    index % 2 === 0 ? "I understand. Thank you." : "Could you tell me more, please?",
    index % 2 === 0 ? "Entiendo. Gracias." : "¿Podría contarme un poco más, por favor?"
  ]);
  const interlocutor = base?.persona || "Tu interlocutor";
  return items.map((item, index) => ({
    speaker: index % 2 === 0 ? interlocutor : "Tú escuchas",
    en: item[0], es: item[1],
    prompt: `${item[2]} Tema de hoy: ${titulo}. ¿Cómo responderías en esta situación?`,
    answers: [[item[3], item[4]], [
      index % 2 === 0 ? "Yes, please. Thank you." : "I understand. Thank you.",
      index % 2 === 0 ? "Sí, por favor. Gracias." : "Entiendo. Gracias."
    ], [
      index % 2 === 0 ? "Could you help me, please?" : "That sounds good to me.",
      index % 2 === 0 ? "¿Podría ayudarme, por favor?" : "Eso me parece bien."
    ]], focus: 0
  }));
};

export default function Historias({ volver = () => {} }) {

  const [busqueda, setBusqueda] = useState("");

  const [categoria, setCategoria] = useState("Todas");

  const [nivel, setNivel] = useState("Todos");

  const [capituloId, setCapituloId] = useState(1);

  const [linea, setLinea] = useState(0);

  const [idioma, setIdioma] = useState("en");

  const [velocidad, setVelocidad] = useState(0.70);
  const [superLento, setSuperLento] = useState(false);

  const [reproduciendo, setReproduciendo] = useState(false);

  const [modo, setModo] = useState("dialogo");

  const [cantidadVisible, setCantidadVisible] = useState(100);

  const stopRef = useRef(false);
  const audioIARef = useRef(null);



  const capitulo = capitulos.find((c) => c.id === capituloId) || capitulos[0];
  const guionProfesorActual = useMemo(() => crearGuionProfesor(capitulo), [capitulo]);
  const guionEscuchaActual = useMemo(() => crearGuionEscucha(capitulo), [capitulo]);

  const categorias = useMemo(

    () => ["Todas", ...new Set(capitulos.map((c) => c.category))],

    []

  );



  const filtrados = useMemo(() => capitulos.filter((c) => {

    const termino = busqueda.trim().toLowerCase();
    const coincideBusqueda = !termino || c.title.toLowerCase().includes(termino) || c.category.toLowerCase().includes(termino) || c.level.toLowerCase().includes(termino);

    const coincideCategoria = categoria === "Todas" || c.category === categoria;

    const coincideNivel = nivel === "Todos" || c.level === nivel;

    return coincideBusqueda && coincideCategoria && coincideNivel;

  }), [busqueda, categoria, nivel]);



  useEffect(() => {

    return () => window.speechSynthesis?.cancel();

  }, []);



  // Primero intenta usar una voz neuronal real desde el servidor seguro de TTS.
  // Si el servicio no está configurado, utiliza la voz disponible del navegador.
 
  // Selecciona la mejor voz disponible en el dispositivo y siempre mantiene
  // una alternativa local para que inglés y español puedan reproducirse.
  const hablar = async (texto, lang = "en-US", rate = velocidad) => {
    const textoLimpio = limpiarTexto(texto);
    if (!textoLimpio) return;

    const esIngles = String(lang).toLowerCase().startsWith("en");
    const synth = window.speechSynthesis;

    const hablarConNavegador = () => new Promise((resolve) => {
      if (!synth || typeof SpeechSynthesisUtterance === "undefined") {
        console.error("Este navegador no ofrece síntesis de voz.");
        resolve();
        return;
      }

      let terminado = false;
      let temporizador;
      const finalizar = () => {
        if (terminado) return;
        terminado = true;
        if (temporizador) clearTimeout(temporizador);
        resolve();
      };

      const elegirVoz = (voces) => {
        const base = esIngles ? "en" : "es";
        const disponibles = voces.filter(v => (v.lang || "").toLowerCase().startsWith(base));
        if (!disponibles.length) return undefined;

        const nombre = (v) => `${v.name || ""} ${v.lang || ""}`.toLowerCase();
        const puntuacion = (v) => {
          const n = nombre(v);
          let puntos = 0;
          if (v.default) puntos += 2;
          if (/natural|neural|premium|enhanced|online/.test(n)) puntos += 8;
          if (/siri|samantha|ava|allison|jenny|aria|june|karen|moira|serena|alex/.test(n) && esIngles) puntos += 5;
          if (/monica|mónica|paulina|lucia|lucía|sofia|sofía|helena|sabina|elena|isabela|isabella|laura|paloma|dalia|marisol/.test(n) && !esIngles) puntos += 5;
          if (esIngles) {
            if (/en-us/.test(n)) puntos += 7;
            else if (/en-gb|en-ca|en-au/.test(n)) puntos += 3;
          } else {
            if (/es-co|es-mx|es-us|es-419/.test(n)) puntos += 8;
            else if (/es-es/.test(n)) puntos += 4;
          }
          if (/compact|novelty|whisper/.test(n)) puntos -= 4;
          return puntos;
        };
        return [...disponibles].sort((a, b) => puntuacion(b) - puntuacion(a))[0];
      };

      const reproducir = () => {
        if (terminado) return;
        const voz = elegirVoz(synth.getVoices());
        const mensaje = new SpeechSynthesisUtterance(textoLimpio);
        mensaje.lang = esIngles ? "en-US" : (voz?.lang || "es-419");
        mensaje.rate = Math.max(0.72, Math.min(1.15, Number(rate) || 0.95));
        mensaje.pitch = 1;
        mensaje.volume = 1;
        if (voz) mensaje.voice = voz;
        mensaje.onend = finalizar;
        mensaje.onerror = (evento) => {
          console.warn("La voz del navegador no pudo reproducirse:", evento?.error || "error");
          finalizar();
        };
        synth.speak(mensaje);
      };

      const voces = synth.getVoices();
      if (voces.length) {
        reproducir();
      } else {
        const alCargarVoces = () => {
          synth.removeEventListener?.("voiceschanged", alCargarVoces);
          if (temporizador) clearTimeout(temporizador);
          reproducir();
        };
        synth.addEventListener?.("voiceschanged", alCargarVoces);
        temporizador = setTimeout(() => {
          synth.removeEventListener?.("voiceschanged", alCargarVoces);
          reproducir();
        }, 1200);
      }
    });

    synth?.cancel();
    if (audioIARef.current) {
      audioIARef.current.pause();
      audioIARef.current.currentTime = 0;
      audioIARef.current.src = "";
      audioIARef.current = null;
    }

    // Primero intenta la voz neuronal de ElevenLabs para inglés. Si falla
    // (por plan, ID o conexión), usa automáticamente la mejor voz local.
    if (esIngles) {
      try {
        const respuesta = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ texto: textoLimpio, idioma: lang, velocidad: rate }),
        });
        if (!respuesta.ok) throw new Error(`ElevenLabs no disponible (${respuesta.status})`);

        const audioBlob = await respuesta.blob();
        if (!audioBlob.size) throw new Error("Audio vacío");

        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.playbackRate = Math.max(0.72, Math.min(1.15, Number(rate) || 0.95));
        audio.preservesPitch = true;
        audioIARef.current = audio;

        await new Promise((resolve, reject) => {
          let finalizado = false;
          const limpiarAudio = () => {
            if (finalizado) return;
            finalizado = true;
            URL.revokeObjectURL(audioUrl);
            if (audioIARef.current === audio) audioIARef.current = null;
          };
          audio.onended = () => { limpiarAudio(); resolve(); };
          audio.onerror = () => { limpiarAudio(); reject(new Error("No se pudo reproducir el audio de inglés")); };
          audio.play().catch(error => { limpiarAudio(); reject(error); });
        });
        return;
      } catch (error) {
        console.warn("ElevenLabs no disponible; se usará la mejor voz local:", error);
      }
    }

    // Español siempre usa la mejor voz local disponible; inglés llega aquí
    // como respaldo cuando ElevenLabs no puede generar el audio.
    await hablarConNavegador();
  };

  const detener = () => {

    stopRef.current = true;

    window.speechSynthesis?.cancel();
    if (audioIARef.current) {
      audioIARef.current.pause();
      audioIARef.current.currentTime = 0;
      audioIARef.current = null;
    }

    setReproduciendo(false);

  };



  const reproducirLinea = async (i, idiomaElegido = idioma) => {

    detener();

    setLinea(i);

    const d = capitulo.dialogue[i];

    await hablar(

      idiomaElegido === "en" ? d.en : d.es,

      idiomaElegido === "en" ? "en-US" : "es-ES"

    );

  };



  // En modo súper lento, cada bloque llega hasta la siguiente coma.
  // Si no hay comas, se reproduce la oración completa como un solo bloque.
  const dividirPorComas = (texto) => {
    return limpiarTexto(texto)
      .split(/,(?![^()]*\))/)
      .map((parte) => parte.trim())
      .filter(Boolean);
  };

  // Modo Profesor: historia continua, pausas para pensar y respuestas fáciles de recordar.
  const obtenerExplicaciones = (ingles, espanol) => {
    const dic = {
      i: "yo", im: "yo soy / yo estoy", am: "soy / estoy", my: "mi", name: "nombre", is: "es / está",
      are: "eres / estás / son / están", you: "tú / usted", your: "tu / su", what: "qué", how: "cómo",
      where: "dónde", from: "de", the: "el / la", a: "un / una", to: "a / para", meet: "conocer",
      nice: "agradable; en esta expresión significa ‘mucho gusto’", hello: "hola", hi: "hola", hey: "hola (informal)",
      thank: "agradecer", thanks: "gracias", and: "y", yes: "sí", no: "no", please: "por favor", do: "hacer / auxiliar de pregunta",
      like: "gustar", live: "vivir", work: "trabajar", for: "para / por", few: "unos pocos", months: "meses",
      learning: "aprendiendo", learn: "aprender", english: "inglés", good: "bien / bueno", well: "bien", doing: "haciendo; en ‘doing well’, encontrarse bien",
      it: "eso", here: "aquí", this: "esto / este", time: "tiempo / vez", first: "primero / primera", from: "de", colombia: "Colombia",
      sure: "claro / seguro", love: "encantar / amar", would: "auxiliar de cortesía; con ‘love’ significa ‘me encantaría’", free: "libre", on: "en", saturday: "sábado", see: "ver", later: "más tarde", talk: "hablar", to: "a", you: "tú", soon: "pronto"
    };
    return (limpiarTexto(ingles).match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g) || []).map((p) => {
      const key = p.toLowerCase().replace(/[’']/g, "");
      const special = { im: "yo soy / yo estoy (I am)", ive: "yo he / llevo (I have)", dont: "no (do not)", thats: "eso es / esa es", youre: "tú eres / estás", id: "yo haría / me gustaría", ill: "yo haré", itd: "eso sería" };
      return [p, special[key] || dic[key] || `en esta frase aporta significado a la idea: “${espanol}”`];
    });
  };

  const reproducirGuionProfesorLargo = async () => {
    const pausa = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const decir = async (texto, idioma = "es-ES", ritmo = 0.86) => {
      if (!stopRef.current) await hablar(texto, idioma, ritmo);
    };
    await decir(`Bienvenido al Modo Profesor. Hoy practicaremos una conversación completa sobre ${capitulo.title}, dentro de la categoría ${capitulo.category}. Lee el diálogo en pantalla. En cada turno piensa tu respuesta antes de escuchar tres opciones.`);
    await decir("No necesitas memorizar frases difíciles. Vamos a practicar respuestas cortas que puedes usar en la vida real. Empezamos.");
    for (let i = 0; i < guionProfesorActual.length; i++) {
      if (stopRef.current) return;
      const t = guionProfesorActual[i];
      await decir(`Parte ${i + 1}. ${t.speaker} dice:`, "es-ES");
      await decir(t.en, "en-US", Math.min(0.82, velocidad));
      await decir(`En español: ${t.es}`, "es-ES");
      await decir(t.prompt, "es-ES");
      await decir("Haz una pausa. Piensa tu respuesta antes de continuar.", "es-ES");
      await pausa(5000);
      if (stopRef.current) return;
      await decir("Puedes responder de estas tres maneras. Escucha y elige la que más te guste.");
      for (let j = 0; j < t.answers.length; j++) {
        if (stopRef.current) return;
        await decir(`Respuesta ${j + 1} en inglés.`, "es-ES");
        await decir(t.answers[j][0], "en-US", Math.min(0.82, velocidad));
        await decir(`Significa: ${t.answers[j][1]}`, "es-ES");
        await pausa(350);
      }
      await decir(`Si respondiste diciendo “${t.answers[t.focus || 0][0]}”, ¡muy bien! Es una respuesta sencilla y natural.`, "es-ES");
      const elegida = t.answers[t.focus || 0];
      await decir("Vamos a aprender esta respuesta palabra por palabra.", "es-ES");
      for (const [palabra, significado] of obtenerExplicaciones(elegida[0], elegida[1])) {
        if (stopRef.current) return;
        await decir(palabra, "en-US", 0.72);
        await decir(`${palabra} significa ${significado}.`, "es-ES", 0.84);
        await pausa(180);
      }
      await decir(`En conjunto, “${elegida[0]}” significa: ${elegida[1]}.`, "es-ES");
      await decir("Repite la respuesta en voz alta. No importa si necesitas intentarlo más de una vez.", "es-ES");
      await pausa(3000);
    }
    if (stopRef.current) return;
    await decir(`¡Excelente trabajo! Has terminado la conversación sobre ${capitulo.title}. Practica estas frases sencillas y úsalas en situaciones reales.`);
  };

  const reproducirTodo = async () => {

    stopRef.current = false;

    setReproduciendo(true);

    if (modo === "profesor") {
      try {
        await reproducirGuionProfesorLargo();
      } finally {
        setReproduciendo(false);
      }
      return;
    }

    if (modo === "escucha") {
      try {
        for (let i = linea; i < guionEscuchaActual.length; i++) {
          if (stopRef.current) break;
          const d = guionEscuchaActual[i];
          setLinea(i);
          await hablar(d.en, "en-US", velocidad);
          if (stopRef.current) break;
          await new Promise((resolve) => setTimeout(resolve, 300));
          await hablar(d.es, "es-ES", 0.92);
          if (stopRef.current) break;
          await new Promise((resolve) => setTimeout(resolve, 550));
        }
      } finally {
        setReproduciendo(false);
      }
      return;
    }

    for (let i = linea; i < capitulo.dialogue.length; i++) {

      if (stopRef.current) break;

      setLinea(i);

      const d = capitulo.dialogue[i];



      if (modo === "profesor") {

        await reproducirModoProfesor(d);

      } else if (modo === "espanol") {

        await hablar(d.es, "es-ES", 0.92);

        if (stopRef.current) break;

        await hablar(d.en, "en-US", velocidad);

      } else if (modo === "pensar") {

        await hablar(d.en, "en-US", 0.65);

        if (stopRef.current) break;

        await new Promise((resolve) => setTimeout(resolve, 1800));

      } else if (superLento) {

        const bloquesEn = dividirPorComas(d.en);
        const bloquesEs = dividirPorComas(d.es);
        for (let b = 0; b < bloquesEn.length; b++) {
          if (stopRef.current) break;
          // Lee el fragmento en inglés hasta la coma y luego su traducción.
          await hablar(bloquesEn[b], "en-US", Math.min(0.58, velocidad));
          if (stopRef.current) break;
          await new Promise((resolve) => setTimeout(resolve, 550));
          // Empareja los fragmentos por posición; si las comas no coinciden,
          // usa la traducción completa para no omitir contenido en español.
          const traduccion = bloquesEs.length === bloquesEn.length
            ? bloquesEs[b]
            : (b === bloquesEn.length - 1 ? d.es : bloquesEs[Math.min(b, bloquesEs.length - 1)]);
          await hablar(traduccion || d.es, "es-ES", 0.78);
          if (stopRef.current) break;
          await new Promise((resolve) => setTimeout(resolve, 750));
        }

      } else {

        await hablar(d.en, "en-US", velocidad);

        if (stopRef.current) break;

        await new Promise((resolve) => setTimeout(resolve, 350));

        await hablar(d.es, "es-ES", 0.92);

      }

      if (stopRef.current) break;

      await new Promise((resolve) => setTimeout(resolve, 450));

    }

    setReproduciendo(false);

  };



  const seleccionarCapitulo = (id) => {

    detener();

    setCapituloId(id);

    setLinea(0);

  };



  return (

    <main className="historias-page">

      <header className="historias-header">

        <button className="hist-btn secondary" onClick={() => { detener(); volver(); }}>

          ← Volver

        </button>

        <div>

          <p className="historias-kicker">INGLÉS PRO · LEARNING STUDIO</p>

          <h1>Historias y conversaciones</h1>

          <p>Aprende, descubre, piensa y disfruta: explora miles de episodios en inglés y español.</p>

        </div>

        <span className="historias-count">10.000 capítulos</span>

      </header>



      <section className="historias-layout">

        <aside className="historias-library">

          <h2>Biblioteca</h2>

          <input

            className="hist-input"

            placeholder="Buscar por título o categoría..."

            value={busqueda}

            onChange={(e) => { setBusqueda(e.target.value); setCantidadVisible(100); }}

          />

          <select className="hist-input" value={categoria} onChange={(e) => { setCategoria(e.target.value); setCantidadVisible(100); }}>

            {categorias.map((c) => <option key={c}>{c}</option>)}

          </select>

          <select className="hist-input" value={nivel} onChange={(e) => { setNivel(e.target.value); setCantidadVisible(100); }}>

            {["Todos", "Principiante", "Intermedio", "Avanzado"].map((n) => <option key={n}>{n}</option>)}

          </select>

          <div className="historias-list">

            {filtrados.slice(0, cantidadVisible).map((c) => (

              <button

                key={c.id}

                className={`hist-chapter ${c.id === capituloId ? "active" : ""}`}

                onClick={() => seleccionarCapitulo(c.id)}

              >

                <span className="hist-chapter-number">{String(c.id).padStart(3, "0")}</span>

                <span className="hist-chapter-text">

                  <strong>{c.title}</strong>

                  <small>{c.category} · {c.level}</small>

                </span>

              </button>

            ))}

            {filtrados.length === 0 && <p>No se encontraron capítulos.</p>}
            {filtrados.length > cantidadVisible && (
              <button className="hist-btn secondary" onClick={() => setCantidadVisible((v) => v + 100)}>Mostrar más ({Math.min(100, filtrados.length - cantidadVisible)} de {filtrados.length})</button>
            )}

          </div>

        </aside>



        <section className="historias-player">

          <div className="hist-player-top">

            <span className="hist-pill">{capitulo.level}</span>

            <span className="hist-pill muted">{capitulo.category}</span>

          </div>

          <h2>{String(capitulo.id).padStart(3, "0")} · {capitulo.title}</h2>

          <p className="hist-subtitle">Elige cómo practicar: escucha el diálogo completo en inglés y español, o activa el Modo Profesor para responder preguntas y aprender frase por frase.</p>



          <div className="hist-mode-row">

            <button className={modo === "escucha" ? "selected" : ""} onClick={() => setModo("escucha")}>🎧 Modo escucha</button>
            <button className={modo === "dialogo" ? "selected" : ""} onClick={() => setModo("dialogo")}>🇺🇸 Inglés + español</button>

            <button className={modo === "espanol" ? "selected" : ""} onClick={() => setModo("espanol")}>🇪🇸 Español primero</button>

            <button className={modo === "pensar" ? "selected" : ""} onClick={() => setModo("pensar")}>🧠 Pensar en inglés</button>
            <button className={modo === "profesor" ? "selected" : ""} onClick={() => setModo("profesor")}>🎓 Modo profesor</button>

          </div>



          <div className="hist-speed">

            <label htmlFor="hist-speed">Velocidad del inglés: {velocidad.toFixed(2)}×</label>

            <input

              id="hist-speed"

              type="range"

              min="0.5"

              max="1.1"

              step="0.05"

              value={velocidad}

              onChange={(e) => setVelocidad(Number(e.target.value))}

            />

          </div>



                    <label style={{ display: "flex", alignItems: "center", gap: "10px", margin: "12px 0", fontWeight: 600 }}>
            <input type="checkbox" checked={superLento} onChange={(e) => setSuperLento(e.target.checked)} />
            Modo súper lento: lee hasta cada coma en inglés, traduce al español y continúa (el Modo profesor guía frase por frase)
          </label>

          <div className="hist-controls">

            <button className="hist-btn primary" onClick={reproducirTodo}>▶ Escuchar conversación</button>

            <button className="hist-btn secondary" onClick={detener}>■ Detener</button>

          </div>



          <div className="hist-dialogue">
            {modo === "escucha" ? (
              <>
                <h3>Diálogo para escuchar: {capitulo.title}</h3>
                <p className="hist-spanish">Escucha cada intervención en inglés y luego su traducción al español. Sin preguntas ni interrupciones.</p>
                {guionEscuchaActual.map((d, i) => (
                  <article key={`escucha-${capitulo.id}-${i}`} className={`hist-line ${linea === i ? "current" : ""}`}>
                    <div className="hist-speaker">{d.speaker}</div>
                    <p className="hist-english">{d.en}</p>
                    <p className="hist-spanish">{d.es}</p>
                  </article>
                ))}
              </>
            ) : modo === "profesor" ? (
              <>
                <h3>Conversación completa: {capitulo.title}</h3>
                <p className="hist-spanish">Lee el diálogo completo de esta categoría. En el audio, el profesor hace una pausa para que pienses, ofrece tres respuestas y explica una frase sencilla palabra por palabra.</p>
                {guionProfesorActual.map((t, i) => (
                  <article key={`profesor-largo-${i}`} className="hist-line">
                    <div className="hist-speaker">{i + 1}. {t.speaker}</div>
                    <p className="hist-english">{t.en}</p>
                    <p className="hist-spanish">{t.es}</p>
                    <p><strong>Ahora tú:</strong> {t.prompt}</p>
                    <ol>{t.answers.map((a, j) => <li key={j}><span className="hist-english">{a[0]}</span><br/><span className="hist-spanish">{a[1]}</span>{j === (t.focus || 0) ? <p><strong>Expresión para recordar:</strong> {a[0]}</p> : null}</li>)}</ol>
                  </article>
                ))}
              </>
            ) : capitulo.dialogue.map((d, i) => (
              <article key={`${capitulo.id}-${i}`} className={`hist-line ${linea === i ? "current" : ""}`}>
                <div className="hist-speaker">{d.speaker}</div>
                <p className="hist-english">{d.en}</p>
                <p className="hist-spanish">{d.es}</p>
                <button className="hist-small-play" onClick={() => reproducirLinea(i, "en")}>🔊 Inglés</button>
                <button className="hist-small-play" onClick={() => reproducirLinea(i, "es")}>🔊 Español</button>
              </article>
            ))}
          </div>



          <footer className="hist-navigation">

            <button className="hist-btn secondary" disabled={capitulo.id === 1} onClick={() => seleccionarCapitulo(capitulo.id - 1)}>← Anterior</button>

            <span>Capítulo {capitulo.id} de 10000</span>

            <button className="hist-btn primary" disabled={capitulo.id === 10000} onClick={() => seleccionarCapitulo(capitulo.id + 1)}>Siguiente →</button>

          </footer>

        </section>

      </section>

    </main>

  );

}