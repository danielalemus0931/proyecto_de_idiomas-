import type { GrammarBlock, Lesson, StudentGrade, VocabularyItem } from '../types'
import {
  enrichGrammarBlocks,
  EXTRA_BLOCKS,
  topicContextBlock,
  type RawGrammarBlock,
} from './grammarEnrichment'

type LangPack = Record<number, RawGrammarBlock[]>

const PACKS: Record<string, LangPack> = {
  en: {
    1: [
      {
        title: 'Presente simple: to be',
        kind: 'verb',
        explanation: 'Usa am / is / are para describir quién eres o cómo estás.',
        pattern: 'I am · You are · He/She is',
        examples: [
          { phrase: 'I am a student.', translation: 'Soy estudiante.' },
          { phrase: 'She is happy.', translation: 'Ella está feliz.' },
        ],
        practice: 'Completa: I ___ from Colombia.',
      },
      {
        title: 'Saludos y cortesía',
        kind: 'structure',
        explanation: 'Las frases fijas van al inicio o final de la conversación.',
        pattern: 'Hello / Good morning + Please / Thank you',
        examples: [
          { phrase: 'Good morning, please.', translation: 'Buenos días, por favor.' },
          { phrase: 'Thank you very much.', translation: 'Muchas gracias.' },
        ],
        practice: 'Responde con cortesía: Can you help me?',
      },
    ],
    2: [
      {
        title: 'Presente continuo',
        kind: 'verb',
        explanation: 'Describe acciones en este momento con am/is/are + verbo-ing.',
        pattern: 'Subject + am/is/are + verb-ing',
        examples: [
          { phrase: 'I am studying English.', translation: 'Estoy estudiando inglés.' },
          { phrase: 'They are eating lunch.', translation: 'Están almorzando.' },
        ],
        practice: 'Escribe: Ella está leyendo un libro.',
      },
      {
        title: 'Hay / existencia',
        kind: 'structure',
        explanation: 'There is (singular) y There are (plural) indican que algo existe.',
        pattern: 'There is + singular · There are + plural',
        examples: [
          { phrase: 'There is a shop near my house.', translation: 'Hay una tienda cerca de mi casa.' },
          { phrase: 'There are two buses.', translation: 'Hay dos autobuses.' },
        ],
        practice: 'Traduce: Hay agua en la mesa.',
      },
    ],
    3: [
      {
        title: 'Pasado simple regular',
        kind: 'verb',
        explanation: 'Acciones terminadas. Regulares: verbo + -ed.',
        pattern: 'Subject + verb-ed (+ yesterday / last week)',
        examples: [
          { phrase: 'I studied yesterday.', translation: 'Estudié ayer.' },
          { phrase: 'We visited the museum.', translation: 'Visitamos el museo.' },
        ],
        practice: 'Conjuga: walk → ayer',
      },
      {
        title: 'Preguntas con Wh-',
        kind: 'structure',
        explanation: 'What, Where, When, Why, How van al inicio de la pregunta.',
        pattern: 'Wh-word + do/does + subject + verb?',
        examples: [
          { phrase: 'Where do you live?', translation: '¿Dónde vives?' },
          { phrase: 'What did you buy?', translation: '¿Qué compraste?' },
        ],
        practice: 'Formula: ¿Cuándo llegaste?',
      },
    ],
    4: [
      {
        title: 'Futuro con will',
        kind: 'verb',
        explanation: 'Predicciones y decisiones espontáneas con will + verbo base.',
        pattern: 'Subject + will + verb',
        examples: [
          { phrase: 'I will travel next month.', translation: 'Viajaré el próximo mes.' },
          { phrase: 'It will rain tomorrow.', translation: 'Lloverá mañana.' },
        ],
        practice: 'Escribe: Nosotros estudiaremos esta noche.',
      },
      {
        title: 'Primer condicional',
        kind: 'conditional',
        explanation: 'Situación real en el futuro: If + presente, will + verbo.',
        pattern: 'If + present simple, subject + will + verb',
        examples: [
          { phrase: 'If I study, I will pass.', translation: 'Si estudio, aprobaré.' },
          { phrase: 'If it rains, we will stay home.', translation: 'Si llueve, nos quedaremos en casa.' },
        ],
        practice: 'Completa: If you ___ (work), you will succeed.',
      },
    ],
    5: [
      {
        title: 'Segundo condicional',
        kind: 'conditional',
        explanation: 'Hipótesis poco probable o irreal en presente.',
        pattern: 'If + past simple, subject + would + verb',
        examples: [
          { phrase: 'If I were rich, I would travel.', translation: 'Si fuera rico, viajaría.' },
          { phrase: 'If she studied more, she would improve.', translation: 'Si estudiara más, mejoraría.' },
        ],
        practice: 'Escribe una frase con If I were...',
      },
      {
        title: 'Modales avanzados',
        kind: 'verb',
        explanation: 'Must, should, might expresan obligación, consejo y posibilidad.',
        pattern: 'Subject + must/should/might + verb',
        examples: [
          { phrase: 'You must finish the project.', translation: 'Debes terminar el proyecto.' },
          { phrase: 'It might rain later.', translation: 'Podría llover más tarde.' },
        ],
        practice: 'Traduce: Deberías descansar.',
      },
    ],
  },
  fr: {
    1: [
      {
        title: 'Verbe être (presente)',
        kind: 'verb',
        explanation: 'Je suis, tu es, il/elle est — identidad y estado.',
        pattern: 'Je suis · Tu es · Il/Elle est',
        examples: [
          { phrase: 'Je suis étudiant.', translation: 'Soy estudiante.' },
          { phrase: 'Elle est contente.', translation: 'Ella está contenta.' },
        ],
        practice: 'Completa: Nous ___ français.',
      },
      {
        title: 'Formulas de cortesía',
        kind: 'structure',
        explanation: 'Bonjour, merci y s\'il vous plaît son esenciales.',
        pattern: 'Bonjour + s\'il vous plaît / merci',
        examples: [
          { phrase: 'Bonjour, merci beaucoup.', translation: 'Hola, muchas gracias.' },
          { phrase: 'Au revoir et bonne journée.', translation: 'Adiós y buen día.' },
        ],
        practice: 'Responde con cortesía en francés.',
      },
    ],
    2: [
      {
        title: 'Présent en -er',
        kind: 'verb',
        explanation: 'Verbos como parler, aimer: radical + terminación.',
        pattern: 'je -e · tu -es · il/elle -e',
        examples: [
          { phrase: 'Je parle français.', translation: 'Hablo francés.' },
          { phrase: 'Ils aiment la musique.', translation: 'Les gusta la música.' },
        ],
        practice: 'Conjuga: parler (je)',
      },
      {
        title: 'Il y a',
        kind: 'structure',
        explanation: 'Equivalente de "there is/are".',
        pattern: 'Il y a + sustantivo',
        examples: [
          { phrase: 'Il y a un magasin ici.', translation: 'Hay una tienda aquí.' },
          { phrase: 'Il y a des étudiants.', translation: 'Hay estudiantes.' },
        ],
        practice: 'Traduce: Hay dos libros.',
      },
    ],
    3: [
      {
        title: 'Passé composé',
        kind: 'verb',
        explanation: 'Pasado con auxiliar avoir/être + participio.',
        pattern: 'avoir/être + participio passé',
        examples: [
          { phrase: 'J\'ai étudié hier.', translation: 'Estudié ayer.' },
          { phrase: 'Elle est allée au marché.', translation: 'Ella fue al mercado.' },
        ],
        practice: 'Conjuga: manger (passé composé, je)',
      },
      {
        title: 'Questions',
        kind: 'structure',
        explanation: 'Est-ce que o inversión para preguntar.',
        pattern: 'Est-ce que + sujeto + verbo?',
        examples: [
          { phrase: 'Est-ce que tu parles anglais?', translation: '¿Hablas inglés?' },
          { phrase: 'Où est la gare?', translation: '¿Dónde está la estación?' },
        ],
        practice: 'Formula: ¿Qué quieres?',
      },
    ],
    4: [
      {
        title: 'Futur simple',
        kind: 'verb',
        explanation: 'Futuro con terminaciones -ai, -as, -a...',
        pattern: 'infinitivo + terminación futura',
        examples: [
          { phrase: 'Je voyagerai demain.', translation: 'Viajaré mañana.' },
          { phrase: 'Nous étudierons ce soir.', translation: 'Estudiaremos esta noche.' },
        ],
        practice: 'Escribe: Ellos comprarán pan.',
      },
      {
        title: 'Premier conditionnel',
        kind: 'conditional',
        explanation: 'Si + présent → futur / impératif de resultado.',
        pattern: 'Si + présent, futur',
        examples: [
          { phrase: 'Si tu travailles, tu réussiras.', translation: 'Si trabajas, tendrás éxito.' },
          { phrase: 'Si il pleut, nous resterons.', translation: 'Si llueve, nos quedaremos.' },
        ],
        practice: 'Completa: Si j\'étudie, je ___ (réussir).',
      },
    ],
    5: [
      {
        title: 'Conditionnel présent',
        kind: 'conditional',
        explanation: 'Hipótesis y cortesía con -ais, -ait...',
        pattern: 'Si + imparfait, conditionnel',
        examples: [
          { phrase: 'Si j\'étais riche, je voyagerais.', translation: 'Si fuera rico, viajaría.' },
          { phrase: 'Je voudrais un café.', translation: 'Quisiera un café.' },
        ],
        practice: 'Escribe con Si j\'avais...',
      },
      {
        title: 'Verbes modaux',
        kind: 'verb',
        explanation: 'Devoir, pouvoir, vouloir en contextos formales.',
        pattern: 'devoir / pouvoir / vouloir + infinitif',
        examples: [
          { phrase: 'Tu dois finir tes devoirs.', translation: 'Debes terminar tu tarea.' },
          { phrase: 'Je peux t\'aider.', translation: 'Puedo ayudarte.' },
        ],
        practice: 'Traduce: Podríamos intentarlo.',
      },
    ],
  },
  pt: {
    1: [
      {
        title: 'Verbo ser/estar',
        kind: 'verb',
        explanation: 'Ser (identidad) y estar (estado/ubicación).',
        pattern: 'Eu sou · Eu estou · Você é',
        examples: [
          { phrase: 'Eu sou estudante.', translation: 'Soy estudiante.' },
          { phrase: 'Ela está feliz.', translation: 'Ella está feliz.' },
        ],
        practice: 'Completa: Nós ___ brasileiros.',
      },
      {
        title: 'Cumprimentos',
        kind: 'structure',
        explanation: 'Olá, obrigado, por favor en situaciones diarias.',
        pattern: 'Olá + por favor / obrigado',
        examples: [
          { phrase: 'Olá, por favor.', translation: 'Hola, por favor.' },
          { phrase: 'Muito obrigado!', translation: '¡Muchas gracias!' },
        ],
        practice: 'Responde con cortesía en portugués.',
      },
    ],
    2: [
      {
        title: 'Presente regular -ar',
        kind: 'verb',
        explanation: 'Verbos como falar, estudar en presente.',
        pattern: 'eu -o · você -a · eles -am',
        examples: [
          { phrase: 'Eu falo português.', translation: 'Hablo portugués.' },
          { phrase: 'Eles estudam muito.', translation: 'Estudian mucho.' },
        ],
        practice: 'Conjuga: falar (eu)',
      },
      {
        title: 'Haver / existir',
        kind: 'structure',
        explanation: 'Tem / Há para indicar existencia.',
        pattern: 'Há + sustantivo · Tem + sustantivo',
        examples: [
          { phrase: 'Há uma loja aqui.', translation: 'Hay una tienda aquí.' },
          { phrase: 'Tem dois livros.', translation: 'Hay dos libros.' },
        ],
        practice: 'Traduce: Hay agua.',
      },
    ],
    3: [
      {
        title: 'Pretérito perfeito',
        kind: 'verb',
        explanation: 'Acciones completadas en el pasado.',
        pattern: 'sujeito + verbo no pretérito',
        examples: [
          { phrase: 'Eu estudei ontem.', translation: 'Estudié ayer.' },
          { phrase: 'Nós visitamos o museu.', translation: 'Visitamos el museo.' },
        ],
        practice: 'Conjuga: comprar (eu, ontem)',
      },
      {
        title: 'Perguntas',
        kind: 'structure',
        explanation: 'O que, onde, quando al inicio.',
        pattern: 'Palavra interrogativa + verbo + sujeito?',
        examples: [
          { phrase: 'Onde você mora?', translation: '¿Dónde vives?' },
          { phrase: 'O que você comprou?', translation: '¿Qué compraste?' },
        ],
        practice: 'Formula: ¿Cuándo llegaste?',
      },
    ],
    4: [
      {
        title: 'Futuro do presente',
        kind: 'verb',
        explanation: 'Futuro con terminación en -ei, -á...',
        pattern: 'sujeito + futuro',
        examples: [
          { phrase: 'Eu viajarei amanhã.', translation: 'Viajaré mañana.' },
          { phrase: 'Choverá hoje.', translation: 'Lloverá hoy.' },
        ],
        practice: 'Escribe: Nós estudaremos.',
      },
      {
        title: 'Primeiro condicional',
        kind: 'conditional',
        explanation: 'Se + presente → futuro.',
        pattern: 'Se + presente, futuro',
        examples: [
          { phrase: 'Se eu estudar, passarei.', translation: 'Si estudio, aprobaré.' },
          { phrase: 'Se chover, ficaremos em casa.', translation: 'Si llueve, nos quedaremos en casa.' },
        ],
        practice: 'Completa: Se você ___ (trabalhar), terá sucesso.',
      },
    ],
    5: [
      {
        title: 'Condicional / hipótese',
        kind: 'conditional',
        explanation: 'Se + imperfecto/subjuntivo → condicional.',
        pattern: 'Se + imperfecto, condicional',
        examples: [
          { phrase: 'Se eu fosse rico, viajaria.', translation: 'Si fuera rico, viajaría.' },
          { phrase: 'Se ela estudasse, melhoraria.', translation: 'Si estudiara, mejoraría.' },
        ],
        practice: 'Escribe con Se eu fosse...',
      },
      {
        title: 'Verbos modais',
        kind: 'verb',
        explanation: 'Dever, poder, querer en contextos formales.',
        pattern: 'dever / poder / querer + infinitivo',
        examples: [
          { phrase: 'Você deve terminar a lição.', translation: 'Debes terminar la lección.' },
          { phrase: 'Posso ajudar?', translation: '¿Puedo ayudar?' },
        ],
        practice: 'Traduce: Deberíamos intentar.',
      },
    ],
  },
  it: {
    1: [
      {
        title: 'Verbo essere / avere',
        kind: 'verb',
        explanation: 'Essere (ser/estar) y avere (tener) en presente.',
        pattern: 'Io sono · Tu sei · Lui/Lei è',
        examples: [
          { phrase: 'Io sono studente.', translation: 'Soy estudiante.' },
          { phrase: 'Lei è felice.', translation: 'Ella está feliz.' },
        ],
        practice: 'Completa: Noi ___ italiani.',
      },
      {
        title: 'Formule di cortesia',
        kind: 'structure',
        explanation: 'Ciao, grazie, per favore.',
        pattern: 'Ciao + per favore / grazie',
        examples: [
          { phrase: 'Buongiorno, per favore.', translation: 'Buenos días, por favor.' },
          { phrase: 'Grazie mille!', translation: '¡Muchas gracias!' },
        ],
        practice: 'Responde con cortesía en italiano.',
      },
    ],
    2: [
      {
        title: 'Presente -are',
        kind: 'verb',
        explanation: 'Verbos como parlare, amare.',
        pattern: 'io -o · tu -i · lui/lei -a',
        examples: [
          { phrase: 'Io parlo italiano.', translation: 'Hablo italiano.' },
          { phrase: 'Loro amano la musica.', translation: 'Aman la música.' },
        ],
        practice: 'Conjuga: parlare (io)',
      },
      {
        title: 'C\'è / Ci sono',
        kind: 'structure',
        explanation: 'Existencia singular y plural.',
        pattern: 'C\'è + singolare · Ci sono + plurale',
        examples: [
          { phrase: 'C\'è un negozio qui.', translation: 'Hay una tienda aquí.' },
          { phrase: 'Ci sono due libri.', translation: 'Hay dos libros.' },
        ],
        practice: 'Traduce: Hay agua.',
      },
    ],
    3: [
      {
        title: 'Passato prossimo',
        kind: 'verb',
        explanation: 'Auxiliar avere/essere + participio.',
        pattern: 'avere/essere + participio',
        examples: [
          { phrase: 'Ho studiato ieri.', translation: 'Estudié ayer.' },
          { phrase: 'Siamo andati al mercato.', translation: 'Fuimos al mercado.' },
        ],
        practice: 'Conjuga: mangiare (passato, io)',
      },
      {
        title: 'Domande',
        kind: 'structure',
        explanation: 'Cosa, dove, quando al inicio.',
        pattern: 'Parola interrogativa + verbo + soggetto?',
        examples: [
          { phrase: 'Dove abiti?', translation: '¿Dónde vives?' },
          { phrase: 'Cosa hai comprato?', translation: '¿Qué compraste?' },
        ],
        practice: 'Formula: ¿Cuándo llegaste?',
      },
    ],
    4: [
      {
        title: 'Futuro semplice',
        kind: 'verb',
        explanation: 'Futuro con terminaciones en -ò, -ai...',
        pattern: 'soggetto + futuro',
        examples: [
          { phrase: 'Viaggerò domani.', translation: 'Viajaré mañana.' },
          { phrase: 'Studieremo stasera.', translation: 'Estudiaremos esta noche.' },
        ],
        practice: 'Escribe: Lloverà domani.',
      },
      {
        title: 'Primo condizionale',
        kind: 'conditional',
        explanation: 'Se + presente → futuro.',
        pattern: 'Se + presente, futuro',
        examples: [
          { phrase: 'Se studio, passerò.', translation: 'Si estudio, aprobaré.' },
          { phrase: 'Se piove, resteremo a casa.', translation: 'Si llueve, nos quedaremos en casa.' },
        ],
        practice: 'Completa: Se lavori, ___ (riuscire).',
      },
    ],
    5: [
      {
        title: 'Condizionale presente',
        kind: 'conditional',
        explanation: 'Ipotesi con Se + imperfetto.',
        pattern: 'Se + imperfetto, condizionale',
        examples: [
          { phrase: 'Se fossi ricco, viaggerei.', translation: 'Si fuera rico, viajaría.' },
          { phrase: 'Vorrei un caffè.', translation: 'Quisiera un café.' },
        ],
        practice: 'Escribe con Se fossi...',
      },
      {
        title: 'Verbi modali',
        kind: 'verb',
        explanation: 'Dovere, potere, volere.',
        pattern: 'dovere / potere / volere + infinito',
        examples: [
          { phrase: 'Devi finire i compiti.', translation: 'Debes terminar la tarea.' },
          { phrase: 'Posso aiutarti?', translation: '¿Puedo ayudarte?' },
        ],
        practice: 'Traduce: Dovremmo provare.',
      },
    ],
  },
}

function levelOrderFromLesson(lesson: Lesson): number {
  const match = lesson.levelId.match(/-lv(\d+)$/)
  return match ? Number.parseInt(match[1], 10) : 1
}

export function getGrammarForLesson(
  languageId: string,
  lesson: Lesson,
  grade: StudentGrade,
): GrammarBlock[] {
  const levelOrder = levelOrderFromLesson(lesson)
  const basePack =
    PACKS[languageId]?.[levelOrder] ??
    (languageId === 'en' ? PACKS.en[levelOrder] ?? PACKS.en[1] : [])
  const extras = EXTRA_BLOCKS[languageId]?.[levelOrder] ?? []
  const rawBlocks: RawGrammarBlock[] = [
    ...basePack,
    ...extras,
    topicContextBlock(lesson.title, lesson.topic, languageId),
  ]

  if (grade >= 10 && levelOrder >= 4) {
    const conditional = rawBlocks.find((b) => b.kind === 'conditional')
    if (conditional) {
      rawBlocks.push({
        title: `Profundización: ${conditional.title}`,
        kind: 'conditional',
        explanation: `Repaso avanzado del condicional para curso ${grade}°. Analiza cada cláusula por separado antes de unirlas.`,
        pattern: conditional.pattern,
        examples: conditional.examples,
        practice: 'Escribe dos variantes: una real (1.er cond.) y otra hipotética (2.º cond.).',
      })
    }
  }

  return enrichGrammarBlocks(rawBlocks, languageId, levelOrder, lesson.id)
}

export function enrichVocabularyExamples(
  words: VocabularyItem[],
  languageId: string,
  grade: StudentGrade,
): VocabularyItem[] {
  const templates: Record<string, string[]> = {
    en: [
      'I use "{word}" every day.',
      'She said "{word}" in class.',
      'Can you repeat "{word}", please?',
    ],
    fr: ['J\'utilise « {word} » chaque jour.', 'Elle a dit « {word} » en classe.'],
    pt: ['Eu uso "{word}" todos os dias.', 'Ela disse "{word}" na aula.'],
    it: ['Uso "{word}" ogni giorno.', 'Ha detto "{word}" in classe.'],
  }
  const list = templates[languageId] ?? templates.en
  return words.map((item, index) => {
    const template = list[(index + grade) % list.length]
    return {
      ...item,
      example: template.replace('{word}', item.word),
    }
  })
}
