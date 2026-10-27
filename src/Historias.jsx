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



export default function Historias({ volver = () => {} }) {

  const [busqueda, setBusqueda] = useState("");

  const [categoria, setCategoria] = useState("Todas");

  const [nivel, setNivel] = useState("Todos");

  const [capituloId, setCapituloId] = useState(1);

  const [linea, setLinea] = useState(0);

  const [idioma, setIdioma] = useState("en");

  const [velocidad, setVelocidad] = useState(0.85);
  const [superLento, setSuperLento] = useState(false);

  const [reproduciendo, setReproduciendo] = useState(false);

  const [modo, setModo] = useState("dialogo");

  const [cantidadVisible, setCantidadVisible] = useState(100);

  const stopRef = useRef(false);



  const capitulo = capitulos.find((c) => c.id === capituloId) || capitulos[0];

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



  const hablar = (texto, lang = "en-US", rate = velocidad) =>
    new Promise((resolve) => {
      if (!("speechSynthesis" in window)) {
        alert("Tu navegador no permite reproducir voz.");
        resolve();
        return;
      }

      const synth = window.speechSynthesis;
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(limpiarTexto(texto));
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = 1;

      // Espera a que el navegador cargue las voces y selecciona una del idioma pedido.
      const seleccionarVoz = () => {
        const voces = synth.getVoices();
        const idiomaBase = lang.toLowerCase().startsWith("es") ? "es" : "en";
        const coincidentes = voces.filter((voz) =>
          (voz.lang || "").toLowerCase().startsWith(idiomaBase)
        );
        // Inglés: prioriza voces estadounidenses y después nombres habitualmente masculinos.
        // Español: conserva la lógica de selección en español, sin forzar una voz inglesa.
        const vocesUS = voces.filter((voz) => (voz.lang || "").toLowerCase() === "en-us");
        const preferida = idiomaBase === "en"
          ? (vocesUS.find((voz) => /guy|david|daniel|alex|fred|mark|tom|aaron|male/i.test(voz.name))
            || vocesUS.find((voz) => /natural|neural|premium|enhanced|google us english/i.test(voz.name))
            || coincidentes.find((voz) => /guy|david|daniel|alex|fred|mark|tom|aaron|male/i.test(voz.name))
            || coincidentes.find((voz) => /natural|neural|premium|enhanced|google us english/i.test(voz.name)))
          : coincidentes.find((voz) =>
              /natural|neural|premium|enhanced|samantha|monica|paulina|jorge|diego/i.test(voz.name)
            );
        const voz = preferida || coincidentes[0];
        if (voz) utterance.voice = voz;
        // Conserva explícitamente el idioma solicitado aunque no haya voz coincidente.
        utterance.lang = lang;
      };

      seleccionarVoz();
      if (synth.getVoices().length === 0) {
        synth.addEventListener("voiceschanged", seleccionarVoz, { once: true });
      }

      let terminado = false;
      const finalizar = () => {
        if (terminado) return;
        terminado = true;
        synth.removeEventListener("voiceschanged", seleccionarVoz);
        resolve();
      };
      utterance.onend = finalizar;
      utterance.onerror = finalizar;
      synth.speak(utterance);
    });


  const detener = () => {

    stopRef.current = true;

    window.speechSynthesis?.cancel();

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

  const reproducirTodo = async () => {

    stopRef.current = false;

    setReproduciendo(true);

    for (let i = linea; i < capitulo.dialogue.length; i++) {

      if (stopRef.current) break;

      setLinea(i);

      const d = capitulo.dialogue[i];



      if (modo === "espanol") {

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

          <p className="hist-subtitle">Conversación práctica de la vida real</p>



          <div className="hist-mode-row">

            <button className={modo === "dialogo" ? "selected" : ""} onClick={() => setModo("dialogo")}>🇺🇸 Inglés + español</button>

            <button className={modo === "espanol" ? "selected" : ""} onClick={() => setModo("espanol")}>🇪🇸 Español primero</button>

            <button className={modo === "pensar" ? "selected" : ""} onClick={() => setModo("pensar")}>🧠 Pensar en inglés</button>

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
            Modo súper lento: lee hasta cada coma en inglés, traduce al español y continúa
          </label>

          <div className="hist-controls">

            <button className="hist-btn primary" onClick={reproducirTodo}>▶ Escuchar conversación</button>

            <button className="hist-btn secondary" onClick={detener}>■ Detener</button>

          </div>



          <div className="hist-dialogue">

            {capitulo.dialogue.map((d, i) => (

              <article key={`${capitulo.id}-${i}`} className={`hist-line ${linea === i ? "current" : ""}`}>

                <div className="hist-speaker">{d.speaker}</div>

                <p className="hist-english">{d.en}</p>

                <p className="hist-spanish">{d.es}</p>

                <button className="hist-small-play" onClick={() => reproducirLinea(i, "en")}>

                  🔊 Inglés

                </button>

                <button className="hist-small-play" onClick={() => reproducirLinea(i, "es")}>

                  🔊 Español

                </button>

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