import type { Locale } from "@/i18n/config";

type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: { lead?: string; text: string }[] };

export type Noticia = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  /** AAAA-MM-DD. Si falta, la tarjeta muestra la categoría. */
  date?: string;
  image: string;
  imageAlt: string;
  body: Block[];
};

// TODO: agregar la fecha real de cada noticia (campo `date`, p. ej. "2026-03-10").
const es: Noticia[] = [
  {
    slug: "semana-seguridad-del-paciente",
    category: "Seguridad del paciente",
    title: "Celebración de la Semana de Seguridad del Paciente",
    excerpt:
      "Bajo el lema “Atención segura para toda la vida”, pacientes, familias y colaboradores participaron en actividades para fortalecer la cultura de la atención segura.",
    image: "/images/noticias/seguridad-del-paciente.jpg",
    imageAlt: "Médico acompañando a una paciente durante su sesión de diálisis",
    body: [
      {
        type: "p",
        text: "Bajo el lema “Atención segura para toda la vida”, NEFROUROS celebró con éxito la Semana de la Seguridad del Paciente entre el 14 y el 19 de septiembre. Durante toda la jornada, el personal médico, administrativo, los pacientes y sus familias participaron activamente en actividades lúdicas y educativas diseñadas para fortalecer la cultura de la atención segura y minimizar los riesgos en el entorno asistencial.",
      },
      {
        type: "p",
        text: "El objetivo principal de esta semana fue reforzar los objetivos internacionales de seguridad del paciente, pilares fundamentales que garantizan una atención médica con los más altos estándares de calidad científica y calidez humana. A continuación, destacamos las actividades principales desarrolladas en cada una de las áreas:",
      },
      {
        type: "list",
        items: [
          {
            lead: "Identificación correcta del paciente",
            text: "Se realizaron jornadas especiales de verificación de la lámina de identificación, enfatizando en la identificación de los riesgos.",
          },
          {
            lead: "Seguridad en medicamentos",
            text: "Con el acompañamiento del personal de farmacia se hicieron actividades dinámicas sobre el uso responsable de los medicamentos de alto riesgo y de los principales errores en torno a la medicación.",
          },
          {
            lead: "Comunicación efectiva",
            text: "Con el personal asistencial y los pacientes se realizaron actividades lúdicas donde se dejó entrever la importancia de una comunicación clara para brindar una atención segura.",
          },
          {
            lead: "Reducción del riesgo de infecciones",
            text: "Además de reforzar el cómo y el porqué del lavado de manos, se realizaron con los pacientes actividades lúdicas sobre cómo prevenir y detectar rápidamente las infecciones asociadas a la terapia dialítica.",
          },
          {
            lead: "Autocuidado del paciente renal",
            text: "Ayudados del personal asistencial, se hizo una actividad lúdica donde se instaba a los pacientes y familiares a comprender los mitos y las realidades con respecto a la enfermedad renal y la diálisis.",
          },
          {
            lead: "Prevención de caídas",
            text: "Desde la coordinación de enfermería se realizaron charlas de seguridad, enfatizando en la detección de riesgos para una caída de los pacientes, cómo prevenirla y qué hacer si se llega a presentar.",
          },
        ],
      },
      {
        type: "p",
        text: "Desde la dirección de calidad y la Gerencia de la institución agradecemos profundamente el compromiso y la dedicación de todos los colaboradores que hicieron posible esta semana de aprendizaje continuo. Recordamos a toda nuestra comunidad que la seguridad del paciente no es el esfuerzo de una sola semana, sino un compromiso diario y permanente que salva vidas.",
      },
    ],
  },
  {
    slug: "como-recibir-una-buena-dialisis",
    category: "Tratamiento",
    title: "¿Cómo recibir una buena diálisis?",
    excerpt:
      "Para lograr los mejores resultados en el tratamiento se deben realizar ajustes que van desde el filtro hasta el seguimiento mensual de tus exámenes.",
    image: "/images/noticias/buena-dialisis.jpg",
    imageAlt: "Enfermera conectando a una paciente a la máquina de diálisis",
    body: [
      {
        type: "p",
        text: "Para lograr los mejores resultados en el tratamiento se deben realizar ajustes que incluyen:",
      },
      {
        type: "list",
        items: [
          { text: "Ajuste del filtro según la necesidad del paciente." },
          { text: "Tiempo completo de tratamiento (4 horas durante 3 sesiones a la semana)." },
          { text: "Realizar un seguimiento del funcionamiento de las máquinas de diálisis." },
          {
            text: "Realizar un seguimiento mensual a los exámenes que se realizan de control durante cada mes o según las necesidades del paciente.",
          },
        ],
      },
    ],
  },
  {
    slug: "grasas-enfermedad-renal-cronica",
    category: "Nutrición",
    title: "¿Qué grasas puedo consumir con enfermedad renal crónica?",
    excerpt:
      "Queso fresco, pescado blanco, aguacate y frutos secos en la medida correcta: una guía práctica para elegir mejor tus grasas.",
    image: "/images/noticias/grasas-enfermedad-renal.jpg",
    imageAlt: "Salmón, aguacate, aceite de oliva, nueces y semillas sobre una mesa",
    body: [
      {
        type: "list",
        items: [
          { text: "Preferir el consumo de queso fresco, bajo en sal o amasado, tipo cuajada." },
          {
            text: "Pescados frescos de carne blanca, tan frecuente como sea posible si no tengo el fósforo alto, idealmente 2 o 3 veces a la semana.",
          },
          { text: "En cantidad moderada se recomienda consumir medio aguacate hasta 3 veces a la semana." },
          { text: "3 nueces completas o 10 almendras hasta 2 veces por semana." },
          { text: "Para cocinar se recomienda el aceite de girasol, canola u oliva." },
        ],
      },
    ],
  },
];

const en: Noticia[] = [
  {
    slug: "semana-seguridad-del-paciente",
    category: "Patient safety",
    title: "Celebrating Patient Safety Week",
    excerpt:
      "Under the motto “Safe care for life”, patients, families and staff took part in activities to strengthen a culture of safe care.",
    image: "/images/noticias/seguridad-del-paciente.jpg",
    imageAlt: "Doctor accompanying a patient during her dialysis session",
    body: [
      {
        type: "p",
        text: "Under the motto “Safe care for life”, NEFROUROS successfully celebrated Patient Safety Week from September 14 to 19. Throughout the week, medical and administrative staff, patients and their families took an active part in fun, educational activities designed to strengthen a culture of safe care and minimize risks in the care setting.",
      },
      {
        type: "p",
        text: "The main goal of the week was to reinforce the international patient safety goals, the core pillars that ensure medical care with the highest standards of scientific quality and human warmth. These are the main activities carried out in each area:",
      },
      {
        type: "list",
        items: [
          {
            lead: "Correct patient identification",
            text: "Special sessions were held to check identification cards, with an emphasis on recognizing risks.",
          },
          {
            lead: "Medication safety",
            text: "Together with the pharmacy team, interactive activities covered the responsible use of high-risk medications and the most common medication errors.",
          },
          {
            lead: "Effective communication",
            text: "Care staff and patients took part in games that highlighted how clear communication is essential for safe care.",
          },
          {
            lead: "Reducing the risk of infection",
            text: "Besides reinforcing how and why to wash hands, patients joined activities on how to prevent and quickly detect infections related to dialysis therapy.",
          },
          {
            lead: "Self-care for kidney patients",
            text: "With the help of the care team, an activity encouraged patients and families to tell the myths from the facts about kidney disease and dialysis.",
          },
          {
            lead: "Fall prevention",
            text: "The nursing coordination team held safety talks on spotting fall risks, how to prevent falls and what to do if one happens.",
          },
        ],
      },
      {
        type: "p",
        text: "The quality department and management sincerely thank every team member whose commitment and dedication made this week of continuous learning possible. We remind our whole community that patient safety is not a one-week effort, but a daily, ongoing commitment that saves lives.",
      },
    ],
  },
  {
    slug: "como-recibir-una-buena-dialisis",
    category: "Treatment",
    title: "How to get good dialysis",
    excerpt:
      "Getting the best results from treatment takes adjustments, from the filter to the monthly follow-up of your lab tests.",
    image: "/images/noticias/buena-dialisis.jpg",
    imageAlt: "Nurse connecting a patient to the dialysis machine",
    body: [
      {
        type: "p",
        text: "Getting the best results from treatment requires adjustments that include:",
      },
      {
        type: "list",
        items: [
          { text: "Adjusting the filter to each patient's needs." },
          { text: "Completing the full treatment time (4 hours, 3 sessions a week)." },
          { text: "Monitoring how the dialysis machines are working." },
          {
            text: "Following up every month on the control tests taken each month, or as the patient needs.",
          },
        ],
      },
    ],
  },
  {
    slug: "grasas-enfermedad-renal-cronica",
    category: "Nutrition",
    title: "Which fats can I eat with chronic kidney disease?",
    excerpt:
      "Fresh cheese, white fish, avocado and nuts in the right amounts: a practical guide to choosing your fats wisely.",
    image: "/images/noticias/grasas-enfermedad-renal.jpg",
    imageAlt: "Salmon, avocado, olive oil, walnuts and seeds on a table",
    body: [
      {
        type: "list",
        items: [
          { text: "Choose fresh, low-salt cheeses, such as farmer's cheese or curd cheese." },
          {
            text: "Eat fresh white fish as often as possible if your phosphorus is not high, ideally 2 or 3 times a week.",
          },
          { text: "In moderation, half an avocado up to 3 times a week is recommended." },
          { text: "3 whole walnuts or 10 almonds up to twice a week." },
          { text: "For cooking, sunflower, canola or olive oil is recommended." },
        ],
      },
    ],
  },
];

const pt: Noticia[] = [
  {
    slug: "semana-seguridad-del-paciente",
    category: "Segurança do paciente",
    title: "Celebração da Semana de Segurança do Paciente",
    excerpt:
      "Com o lema “Atendimento seguro para toda a vida”, pacientes, famílias e colaboradores participaram de atividades para fortalecer a cultura do atendimento seguro.",
    image: "/images/noticias/seguridad-del-paciente.jpg",
    imageAlt: "Médico acompanhando uma paciente durante a sessão de diálise",
    body: [
      {
        type: "p",
        text: "Com o lema “Atendimento seguro para toda a vida”, a NEFROUROS celebrou com sucesso a Semana da Segurança do Paciente entre 14 e 19 de setembro. Durante toda a semana, a equipe médica e administrativa, os pacientes e suas famílias participaram ativamente de atividades lúdicas e educativas pensadas para fortalecer a cultura do atendimento seguro e minimizar os riscos no ambiente assistencial.",
      },
      {
        type: "p",
        text: "O principal objetivo da semana foi reforçar as metas internacionais de segurança do paciente, pilares fundamentais que garantem um atendimento médico com os mais altos padrões de qualidade científica e calor humano. Estas foram as principais atividades realizadas em cada área:",
      },
      {
        type: "list",
        items: [
          {
            lead: "Identificação correta do paciente",
            text: "Foram realizadas jornadas especiais de verificação da ficha de identificação, com ênfase na identificação de riscos.",
          },
          {
            lead: "Segurança no uso de medicamentos",
            text: "Com o apoio da equipe de farmácia, foram feitas atividades dinâmicas sobre o uso responsável de medicamentos de alto risco e os principais erros de medicação.",
          },
          {
            lead: "Comunicação efetiva",
            text: "Com a equipe assistencial e os pacientes, foram realizadas atividades lúdicas que mostraram a importância de uma comunicação clara para oferecer um atendimento seguro.",
          },
          {
            lead: "Redução do risco de infecções",
            text: "Além de reforçar como e por que lavar as mãos, foram feitas com os pacientes atividades lúdicas sobre como prevenir e detectar rapidamente as infecções associadas à terapia dialítica.",
          },
          {
            lead: "Autocuidado do paciente renal",
            text: "Com a ajuda da equipe assistencial, uma atividade lúdica convidou pacientes e familiares a distinguir mitos e verdades sobre a doença renal e a diálise.",
          },
          {
            lead: "Prevenção de quedas",
            text: "A coordenação de enfermagem realizou palestras de segurança com ênfase em identificar os riscos de queda dos pacientes, como preveni-las e o que fazer se ocorrerem.",
          },
        ],
      },
      {
        type: "p",
        text: "A diretoria de qualidade e a gerência da instituição agradecem profundamente o compromisso e a dedicação de todos os colaboradores que tornaram possível esta semana de aprendizado contínuo. Lembramos a toda a nossa comunidade que a segurança do paciente não é o esforço de uma única semana, mas um compromisso diário e permanente que salva vidas.",
      },
    ],
  },
  {
    slug: "como-recibir-una-buena-dialisis",
    category: "Tratamento",
    title: "Como fazer uma boa diálise?",
    excerpt:
      "Para alcançar os melhores resultados no tratamento, são necessários ajustes que vão do filtro ao acompanhamento mensal dos seus exames.",
    image: "/images/noticias/buena-dialisis.jpg",
    imageAlt: "Enfermeira conectando uma paciente à máquina de diálise",
    body: [
      {
        type: "p",
        text: "Para alcançar os melhores resultados no tratamento, é preciso fazer ajustes que incluem:",
      },
      {
        type: "list",
        items: [
          { text: "Ajuste do filtro de acordo com a necessidade do paciente." },
          { text: "Tempo completo de tratamento (4 horas, em 3 sessões por semana)." },
          { text: "Acompanhar o funcionamento das máquinas de diálise." },
          {
            text: "Fazer o acompanhamento mensal dos exames de controle realizados a cada mês ou conforme as necessidades do paciente.",
          },
        ],
      },
    ],
  },
  {
    slug: "grasas-enfermedad-renal-cronica",
    category: "Nutrição",
    title: "Que gorduras posso consumir com doença renal crônica?",
    excerpt:
      "Queijo fresco, peixe branco, abacate e oleaginosas na medida certa: um guia prático para escolher melhor as suas gorduras.",
    image: "/images/noticias/grasas-enfermedad-renal.jpg",
    imageAlt: "Salmão, abacate, azeite de oliva, nozes e sementes sobre uma mesa",
    body: [
      {
        type: "list",
        items: [
          { text: "Prefira queijo fresco com pouco sal, como ricota ou coalhada." },
          {
            text: "Peixes frescos de carne branca, com a maior frequência possível se o fósforo não estiver alto, idealmente 2 ou 3 vezes por semana.",
          },
          { text: "Com moderação, recomenda-se consumir meio abacate até 3 vezes por semana." },
          { text: "3 nozes inteiras ou 10 amêndoas até 2 vezes por semana." },
          { text: "Para cozinhar, recomenda-se óleo de girassol, de canola ou azeite de oliva." },
        ],
      },
    ],
  },
];

export const noticias: Record<Locale, Noticia[]> = { es, en, pt };

export function getNoticias(locale: Locale) {
  return noticias[locale];
}

export function getNoticia(locale: Locale, slug: string) {
  return noticias[locale].find((n) => n.slug === slug);
}
