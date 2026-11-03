// Idioma base: en.ts y pt.ts deben tener las mismas claves (TypeScript avisa si falta alguna).
const es = {
  meta: {
    title: "Cuidado renal integral",
    description:
      "Cuidado renal integral con calidad científica y calidez humana: diálisis, acompañamiento al paciente y educación en salud renal en Latinoamérica.",
    sedesTitle: "Nuestras Sedes",
    sedesDescription: "Encuentra la sede de Momentum Salud Renal más cercana en Colombia, Brasil, Ecuador, Guatemala, México y República Dominicana.",
    sobreTitle: "Sobre MoMentum",
    sobreDescription: "Momentum Salud Renal hace parte de MoMentum Holding, un grupo multisectorial que impulsa oportunidades en Latinoamérica.",
    contactoTitle: "Contacto",
    contactoDescription:
      "Escríbenos para solicitar una cita, recibir orientación sobre tratamientos o encontrar la sede de Momentum Salud Renal más cercana.",
  },

  nav: {
    label: "Principal",
    home: "Momentum Salud Renal, inicio",
    inicio: "Inicio",
    sedes: "Nuestras Sedes",
    sobre: "Sobre MoMentum",
    contacto: "Contacto",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    language: "Idioma",
  },

  hero: {
    title: "Siempre hay un MoMentum",
    titleEnd: "para seguir adelante.",
    description:
      "Acompañamos a las personas con enfermedad renal en cada paso, con atención de calidad, cercanía humana y un propósito que nos mueve: Servir con el alma.",
    imageAlt: "Enfermera de Momentum acompañando a un paciente durante su sesión de hemodiálisis",
  },

  stats: {
    titleHighlight: "MoMentum Salud Renal",
    title: "en cifras",
    pacientes: "Pacientes acompañados",
    sedes: "Sedes",
    sedesRegion: "Sedes en la región",
    paises: "Países",
    anios: "Años",
    red: "Red Multilatina",
  },

  presencia: {
    title: "Nuestra presencia en Latinoamérica",
    subtitle: "Llevamos nuestro propósito a más personas en la región.",
    mapLabel: "Mapa de países con sedes de Momentum",
  },

  countries: {
    colombia: { name: "Colombia", short: "Colombia", tagline: "Nuestra historia, nuestro origen.", sedesIn: "Sedes en Colombia" },
    mexico: { name: "México", short: "México", tagline: "Más cerca de las personas.", sedesIn: "Sedes en México" },
    guatemala: { name: "Guatemala", short: "Guatemala", tagline: "Nuevas oportunidades.", sedesIn: "Sedes en Guatemala" },
    ecuador: { name: "Ecuador", short: "Ecuador", tagline: "Compromiso en cada paso.", sedesIn: "Sedes en Ecuador" },
    brasil: { name: "Brasil", short: "Brasil", tagline: "Salud renal sin fronteras.", sedesIn: "Sedes en Brasil" },
    "republica-dominicana": {
      name: "República Dominicana",
      short: "Rep. Dominicana",
      tagline: "Cuidado renal especializado.",
      sedesIn: "Sedes en República Dominicana",
    },
  },

  historias: {
    title: "Historias que inspiran",
    subtitle: "Personas reales. Historias reales.",
    quotes: {
      "planear-futuro": "Volví a planear mi futuro",
      "dialisis-suenos": "La diálisis no detuvo mis sueños",
      "cuidar-avanzar": "Cuidar también es avanzar",
    },
    watch: "Ver la historia:",
    videoSoon: "El video de esta historia estará disponible muy pronto.",
    closeVideo: "Cerrar video",
  },

  actualidad: {
    title: "Actualidad MoMentum",
    subtitle: "Conocimiento para tu bienestar.",
    readMore: "Leer noticia:",
    ctaTitle: "¿Necesitas orientación?",
    ctaText: "Estamos listos para acompañarte",
    ctaButton: "Solicitar cita",
  },

  contacto: {
    title: "Contáctanos",
    subtitle: "Déjanos tus datos y te ayudamos a encontrar la sede y la atención que necesitas.",
    points: ["Te respondemos por correo", "Acompañamiento en 6 países", "Orientación para pacientes y familias"],
    emailDirect: "Escríbenos directo por correo",
    name: "Nombre completo",
    phone: "Teléfono",
    email: "Correo electrónico",
    optional: "opcional",
    country: "País",
    selectCountry: "Selecciona tu país",
    reason: "Motivo",
    reasons: {
      cita: "Solicitar una cita",
      tratamiento: "Información sobre tratamientos",
      sede: "Encontrar una sede",
      otro: "Otro",
    },
    message: "Mensaje",
    messagePlaceholder: "Cuéntanos en qué podemos ayudarte",
    consent: "Autorizo el tratamiento de mis datos personales para que me contacten.",
    submit: "Enviar por correo",
    // Va seguido de la dirección de correo.
    sent: "Abrimos tu correo con el mensaje listo: solo falta enviarlo. Si no se abrió, escríbenos a",
    // Asunto (va seguido del motivo) y primera línea del correo.
    subject: "Contacto desde la página web",
    greeting: "Hola, quiero recibir orientación de Momentum Salud Renal.",
  },

  sedesHero: {
    eyebrow: "Nuestras Sedes",
    title: "Más cerca de ti,",
    titleEnd: "en más lugares",
    description:
      "Llevamos nuestro propósito a más personas en Latinoamérica, con atención de calidad y un equipo humano que te acompaña.",
    imageAlt: "Sala de hemodiálisis de Momentum con sillones y máquinas de diálisis",
  },

  encuentra: {
    title: "Encuentra tu sede",
    subtitle: "Selecciona un país o usa el buscador para encontrar la sede más cercana.",
    sedesCount: { one: "sede", other: "sedes" },
    pickCountry: "Elige un país para ver sus sedes",
    allCountries: "Volver a todos los países",
    search: "Buscar sede, ciudad o dirección",
    cities: "Filtrar por ciudad",
    allCities: "Todas las ciudades",
    noResults: "No encontramos sedes que coincidan con tu búsqueda.",
    elsewhere: "Aquí no hay coincidencias. Estas sedes están en otro lugar:",
    openMap: "Ver en Google Maps",
    prevSede: "Sede anterior",
    nextSede: "Sede siguiente",
    page: "{current} de {total}",
    morePending: "Muy pronto publicaremos aquí el resto de sedes de este país.",
    contactUs: "Escríbenos y te indicamos la más cercana",
  },

  sobreHero: {
    eyebrow: "Sobre MoMentum",
    title: "Hay un MoMentum",
    titleEnd: "para todo.",
    description:
      "Somos parte de MoMentum Holding, un grupo empresarial multisectorial que impulsa oportunidades para miles de personas en Latinoamérica.",
    cta: "Conoce MoMentum Holding",
  },

  holdingBand: {
    title: "MoMentum Holding",
    text: "Movemos nuestras empresas donde la gente las necesita.",
  },

  holding: {
    title: "Somos parte de algo más grande",
    description:
      "MoMentum Salud Renal hace parte de MoMentum Holding, un grupo multisectorial que integra compañías especializadas en salud, servicios y soluciones financieras con un mismo propósito: mover oportunidades de vida para las personas y las comunidades en Latinoamérica.",
    health: "Salud que acompaña.",
    services: "Servicios que transforman.",
    financial: "Soluciones financieras.",
  },

  footer: {
    copyright: "© Copyright MoMentum Tech. Todos los derechos reservados.",
    social: "Redes sociales",
  },

  notFound: {
    title: "Página no encontrada",
    text: "La página que buscas no existe o cambió de dirección.",
    home: "Volver al inicio",
  },

  noticia: {
    back: "Volver a noticias",
    others: "Otras noticias",
    loading: "Cargando noticia",
  },
};

export default es;
export type Dictionary = typeof es;
