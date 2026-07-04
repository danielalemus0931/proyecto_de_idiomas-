import type { GrammarBlock, Lesson, VocabularyItem } from '../types'

export type QuizPair = {
  spanish: string
  target: string
  requiredTerms: string[]
  minWords: number
  alternates?: string[]
  instruction?: string
}

export type GrammarMode =
  | 'to_be'
  | 'present_continuous'
  | 'past'
  | 'future'
  | 'conditional_first'
  | 'conditional_second'
  | 'questions'
  | 'courtesy'
  | 'existence'
  | 'generic'

export function detectGrammarMode(block: GrammarBlock): GrammarMode {
  const t = block.title.toLowerCase()
  if (t.includes('to be') || t.includes('être') || t.includes('ser ') || t.includes('estar')) return 'to_be'
  if (t.includes('continuo') || t.includes('continuous') || t.includes('progressif') || t.includes('gerúndio') || t.includes('progressivo')) {
    return 'present_continuous'
  }
  if (t.includes('pasado') || t.includes('past') || t.includes('passé') || t.includes('passato') || t.includes('pretérito')) {
    return 'past'
  }
  if (t.includes('futuro') || t.includes('future') || t.includes('futur')) return 'future'
  if (t.includes('segundo condicional') || t.includes('second conditional') || t.includes('condicionnel passé')) {
    return 'conditional_second'
  }
  if (t.includes('condicional') || t.includes('conditional') || t.includes('condicionnel')) return 'conditional_first'
  if (t.includes('pregunta') || t.includes('wh-') || t.includes('interrog')) return 'questions'
  if (t.includes('cortesía') || t.includes('saludo') || t.includes('politesse')) return 'courtesy'
  if (t.includes('hay') || t.includes('there is') || t.includes('existencia') || t.includes('il y a')) return 'existence'
  return 'generic'
}

function meaning(word: VocabularyItem): string {
  return (word.translation.split('/')[0] ?? word.translation).trim()
}

function topicIn(languageId: string, topic: string): string {
  const map: Record<string, Record<string, string>> = {
    en: {
      Conversación: 'conversation',
      Gramática: 'grammar',
      Viajes: 'travel',
      Familia: 'family',
      Descripción: 'description',
      Comida: 'food',
      Trabajo: 'work',
      Salud: 'health',
      Cultura: 'culture',
      Naturaleza: 'nature',
    },
    fr: {
      Conversación: 'conversation',
      Gramática: 'grammaire',
      Viajes: 'voyage',
      Familia: 'famille',
      Descripción: 'description',
      Comida: 'nourriture',
      Trabajo: 'travail',
      Salud: 'santé',
      Cultura: 'culture',
      Naturaleza: 'nature',
    },
    pt: {
      Conversación: 'conversação',
      Gramática: 'gramática',
      Viajes: 'viagem',
      Familia: 'família',
      Descripción: 'descrição',
      Comida: 'comida',
      Trabajo: 'trabalho',
      Salud: 'saúde',
      Cultura: 'cultura',
      Naturaleza: 'natureza',
    },
    it: {
      Conversación: 'conversazione',
      Gramática: 'grammatica',
      Viajes: 'viaggio',
      Familia: 'famiglia',
      Descripción: 'descrizione',
      Comida: 'cibo',
      Trabajo: 'lavoro',
      Salud: 'salute',
      Cultura: 'cultura',
      Naturaleza: 'natura',
    },
  }
  return map[languageId]?.[topic] ?? topic.toLowerCase()
}

/** Referencia al vocabulario en español (consigna). */
function vocabEs(word: VocabularyItem): string {
  return `«${word.word}» (${meaning(word)})`
}

/** Referencia al vocabulario en el idioma meta (respuesta). */
function vocabTarget(word: VocabularyItem): string {
  return `"${word.word}"`
}

type Subject = { es: string; en: string; beEs: string; beEn: string; has: string; hasEn: string }

const SUBJECTS: Record<string, Subject[]> = {
  en: [
    { es: 'Nosotros', en: 'We', beEs: 'somos', beEn: 'are', has: 'tenemos', hasEn: 'have' },
    { es: 'Ellos', en: 'They', beEs: 'son', beEn: 'are', has: 'tienen', hasEn: 'have' },
    { es: 'Ella', en: 'She', beEs: 'es', beEn: 'is', has: 'tiene', hasEn: 'has' },
    { es: 'Yo', en: 'I', beEs: 'soy', beEn: 'am', has: 'tengo', hasEn: 'have' },
  ],
  fr: [
    { es: 'Nous', en: 'Nous', beEs: 'sommes', beEn: 'sommes', has: 'avons', hasEn: 'avons' },
    { es: 'Ils', en: 'Ils', beEs: 'sont', beEn: 'sont', has: 'ont', hasEn: 'ont' },
    { es: 'Elle', en: 'Elle', beEs: 'est', beEn: 'est', has: 'a', hasEn: 'a' },
    { es: 'Je', en: 'Je', beEs: 'suis', beEn: 'suis', has: 'ai', hasEn: 'ai' },
  ],
  pt: [
    { es: 'Nós', en: 'Nós', beEs: 'somos', beEn: 'somos', has: 'temos', hasEn: 'temos' },
    { es: 'Eles', en: 'Eles', beEs: 'são', beEn: 'são', has: 'têm', hasEn: 'têm' },
    { es: 'Ela', en: 'Ela', beEs: 'é', beEn: 'é', has: 'tem', hasEn: 'tem' },
    { es: 'Eu', en: 'Eu', beEs: 'sou', beEn: 'sou', has: 'tenho', hasEn: 'tenho' },
  ],
  it: [
    { es: 'Noi', en: 'Noi', beEs: 'siamo', beEn: 'siamo', has: 'abbiamo', hasEn: 'abbiamo' },
    { es: 'Loro', en: 'Loro', beEs: 'sono', beEn: 'sono', has: 'hanno', hasEn: 'hanno' },
    { es: 'Lei', en: 'Lei', beEs: 'è', beEn: 'è', has: 'ha', hasEn: 'ha' },
    { es: 'Io', en: 'Io', beEs: 'sono', beEn: 'sono', has: 'ho', hasEn: 'ho' },
  ],
}

function pickSubject(languageId: string, variant: number): Subject {
  return (SUBJECTS[languageId] ?? SUBJECTS.en)[variant % 4]
}

function pairsToBe(
  languageId: string,
  s: Subject,
  word: VocabularyItem,
  lesson: Lesson,
): QuizPair[] {
  const topic = topicIn(languageId, lesson.topic)
  const v = vocabTarget(word)
  const vEs = vocabEs(word)

  if (languageId === 'en') {
    return [
      {
        spanish: `${s.es} ${s.beEs} estudiantes de ${lesson.topic} que hoy practican la expresión ${vEs}.`,
        target: `${s.en} ${s.beEn} ${topic} students who are practicing the expression ${v} today.`,
        requiredTerms: [s.en.toLowerCase(), word.word.toLowerCase()],
        minWords: 8,
        instruction: 'Usa el verbo to be y la expresión de vocabulario en contexto.',
      },
      {
        spanish: `Durante la clase de ${lesson.topic}, ${s.es.toLowerCase()} ${s.beEs} preparados para usar ${vEs}.`,
        target: `During the ${topic} class, ${s.en.toLowerCase()} ${s.beEn} ready to use ${v}.`,
        requiredTerms: [s.en.toLowerCase(), word.word.toLowerCase()],
        minWords: 8,
        alternates: [`In ${topic} class, ${s.en.toLowerCase()} ${s.beEn} ready to use ${v}.`],
      },
    ]
  }

  if (languageId === 'fr') {
    return [
      {
        spanish: `${s.es} ${s.beEs} des élèves de ${lesson.topic} qui pratiquent l'expression ${vEs} aujourd'hui.`,
        target: `${s.en} ${s.beEn} des élèves de ${topic} qui pratiquent l'expression ${v} aujourd'hui.`,
        requiredTerms: [word.word.toLowerCase(), 'aujourd'],
        minWords: 8,
      },
    ]
  }

  if (languageId === 'pt') {
    return [
      {
        spanish: `${s.es} ${s.beEs} alunos de ${lesson.topic} que praticam a expressão ${vEs} hoje.`,
        target: `${s.en} ${s.beEn} alunos de ${topic} que praticam a expressão ${v} hoje.`,
        requiredTerms: [word.word.toLowerCase(), 'hoje'],
        minWords: 8,
      },
    ]
  }

  return [
    {
      spanish: `${s.es} ${s.beEs} studenti di ${lesson.topic} che oggi praticano l'espressione ${vEs}.`,
      target: `${s.en} ${s.beEn} studenti di ${topic} che oggi praticano l'espressione ${v}.`,
      requiredTerms: [word.word.toLowerCase(), 'oggi'],
      minWords: 8,
    },
  ]
}

function pairsContinuous(
  languageId: string,
  s: Subject,
  word: VocabularyItem,
  lesson: Lesson,
): QuizPair[] {
  const topic = topicIn(languageId, lesson.topic)
  const v = vocabTarget(word)
  const vEs = vocabEs(word)

  if (languageId === 'en') {
    return [
      {
        spanish: `${s.es} ${s.es === 'Ella' || s.es === 'Yo' ? 'está' : 'están'} practicando ${vEs} en la lección de ${lesson.topic}.`,
        target: `${s.en} ${s.en === 'She' || s.en === 'I' ? 'is' : 'are'} practicing ${v} in the ${topic} lesson.`,
        requiredTerms: [word.word.toLowerCase(), 'practic'],
        minWords: 7,
      },
      {
        spanish: `En este momento yo estoy repitiendo ${vEs} con mi profesor.`,
        target: `Right now I am repeating ${v} with my teacher.`,
        requiredTerms: [word.word.toLowerCase(), 'am'],
        minWords: 7,
      },
    ]
  }

  if (languageId === 'fr') {
    return [
      {
        spanish: `${s.es} ${s.es === 'Elle' || s.es === 'Je' ? 'est en train de' : 'sont en train de'} pratiquer ${vEs} en classe.`,
        target: `${s.en} ${s.en === 'Elle' || s.en === 'Je' ? 'est en train de' : 'sont en train de'} pratiquer ${v} en classe.`,
        requiredTerms: [word.word.toLowerCase()],
        minWords: 7,
      },
    ]
  }

  if (languageId === 'pt') {
    return [
      {
        spanish: `${s.es} ${s.es === 'Ela' || s.es === 'Eu' ? 'está' : 'estão'} praticando ${vEs} na aula de ${lesson.topic}.`,
        target: `${s.en} ${s.en === 'Ela' || s.en === 'Eu' ? 'está' : 'estão'} praticando ${v} na aula de ${topic}.`,
        requiredTerms: [word.word.toLowerCase()],
        minWords: 7,
      },
    ]
  }

  return [
    {
      spanish: `${s.es} ${s.es === 'Lei' || s.es === 'Io' ? 'sta' : 'stanno'} praticando ${vEs} a lezione.`,
      target: `${s.en} ${s.en === 'Lei' || s.en === 'Io' ? 'sta' : 'stanno'} praticando ${v} a lezione.`,
      requiredTerms: [word.word.toLowerCase()],
      minWords: 7,
    },
  ]
}

function pairsPast(languageId: string, word: VocabularyItem, lesson: Lesson): QuizPair[] {
  const v = vocabTarget(word)
  const vEs = vocabEs(word)
  const topic = topicIn(languageId, lesson.topic)

  if (languageId === 'en') {
    return [
      {
        spanish: `Ayer practiqué ${vEs} durante la actividad de ${lesson.topic}.`,
        target: `Yesterday I practiced ${v} during the ${topic} activity.`,
        requiredTerms: ['yesterday', word.word.toLowerCase()],
        minWords: 6,
      },
      {
        spanish: `La semana pasada mis compañeros y yo usamos ${vEs} en una conversación guiada.`,
        target: `Last week my classmates and I used ${v} in a guided conversation.`,
        requiredTerms: ['last week', word.word.toLowerCase()],
        minWords: 8,
      },
    ]
  }

  if (languageId === 'fr') {
    return [
      {
        spanish: `Hier j'ai pratiqué ${vEs} pendant le cours de ${lesson.topic}.`,
        target: `Hier j'ai pratiqué ${v} pendant le cours de ${topic}.`,
        requiredTerms: ['hier', word.word.toLowerCase()],
        minWords: 7,
      },
    ]
  }

  if (languageId === 'pt') {
    return [
      {
        spanish: `Ontem pratiquei ${vEs} durante a aula de ${lesson.topic}.`,
        target: `Ontem pratiquei ${v} durante a aula de ${topic}.`,
        requiredTerms: ['ontem', word.word.toLowerCase()],
        minWords: 7,
      },
    ]
  }

  return [
    {
      spanish: `Ieri ho praticato ${vEs} durante la lezione di ${lesson.topic}.`,
      target: `Ieri ho praticato ${v} durante la lezione di ${topic}.`,
      requiredTerms: ['ieri', word.word.toLowerCase()],
      minWords: 7,
    },
  ]
}

function pairsFuture(languageId: string, s: Subject, word: VocabularyItem, lesson: Lesson): QuizPair[] {
  const v = vocabTarget(word)
  const vEs = vocabEs(word)
  const topic = topicIn(languageId, lesson.topic)

  if (languageId === 'en') {
    return [
      {
        spanish: `Mañana ${s.es.toLowerCase()} ${s.has} una exposición oral y usarán la expresión ${vEs}.`,
        target: `Tomorrow ${s.en.toLowerCase()} will have an oral presentation and will use ${v}.`,
        requiredTerms: ['tomorrow', 'will', word.word.toLowerCase()],
        minWords: 8,
        alternates: [`Tomorrow ${s.en.toLowerCase()} will use ${v} in an oral presentation about ${topic}.`],
      },
    ]
  }

  if (languageId === 'fr') {
    return [
      {
        spanish: `Demain ${s.es.toLowerCase()} ${s.has} une présentation et ${s.es === 'Je' ? 'utiliserai' : 'utiliseront'} ${vEs}.`,
        target: `Demain ${s.en.toLowerCase()} ${s.hasEn} une présentation et ${s.en === 'Je' ? 'utiliserai' : 'utiliseront'} ${v}.`,
        requiredTerms: ['demain', word.word.toLowerCase()],
        minWords: 7,
      },
    ]
  }

  if (languageId === 'pt') {
    return [
      {
        spanish: `Amanhã ${s.es.toLowerCase()} ${s.has} uma apresentação e ${s.es === 'Eu' ? 'usarei' : 'usarão'} ${vEs}.`,
        target: `Amanhã ${s.en.toLowerCase()} ${s.hasEn} uma apresentação e ${s.es === 'Eu' ? 'usarei' : 'usarão'} ${v}.`,
        requiredTerms: ['amanhã', word.word.toLowerCase()],
        minWords: 7,
      },
    ]
  }

  return [
    {
      spanish: `Domani ${s.es.toLowerCase()} ${s.has} una presentazione e ${s.es === 'Io' ? 'userò' : 'useranno'} ${vEs}.`,
      target: `Domani ${s.en.toLowerCase()} ${s.hasEn} una presentazione e ${s.es === 'Io' ? 'userò' : 'useranno'} ${v}.`,
      requiredTerms: ['domani', word.word.toLowerCase()],
      minWords: 7,
    },
  ]
}

function pairsConditionalFirst(languageId: string, word: VocabularyItem): QuizPair[] {
  const v = vocabTarget(word)
  const vEs = vocabEs(word)

  const bank: Record<string, QuizPair[]> = {
    en: [
      {
        spanish: `Si repaso todos los días, dominaré la expresión ${vEs} antes del examen.`,
        target: `If I review every day, I will master the expression ${v} before the exam.`,
        requiredTerms: ['if', 'will', word.word.toLowerCase()],
        minWords: 9,
      },
    ],
    fr: [
      {
        spanish: `Si je révise chaque jour, je maîtriserai l'expression ${vEs} avant l'examen.`,
        target: `Si je révise chaque jour, je maîtriserai l'expression ${v} avant l'examen.`,
        requiredTerms: ['si', word.word.toLowerCase()],
        minWords: 9,
      },
    ],
    pt: [
      {
        spanish: `Se eu revisar todos os dias, dominarei a expressão ${vEs} antes da prova.`,
        target: `Se eu revisar todos os dias, dominarei a expressão ${v} antes da prova.`,
        requiredTerms: ['se', word.word.toLowerCase()],
        minWords: 9,
      },
    ],
    it: [
      {
        spanish: `Se ripasso ogni giorno, padroneggerò l'espressione ${vEs} prima dell'esame.`,
        target: `Se ripasso ogni giorno, padroneggerò l'espressione ${v} prima dell'esame.`,
        requiredTerms: ['se', word.word.toLowerCase()],
        minWords: 9,
      },
    ],
  }
  return bank[languageId] ?? bank.en
}

function pairsConditionalSecond(languageId: string, word: VocabularyItem): QuizPair[] {
  const v = vocabTarget(word)
  const vEs = vocabEs(word)

  const bank: Record<string, QuizPair[]> = {
    en: [
      {
        spanish: `Si tuviera más tiempo libre, practicaría ${vEs} con hablantes nativos.`,
        target: `If I had more free time, I would practice ${v} with native speakers.`,
        requiredTerms: ['if', 'would', word.word.toLowerCase()],
        minWords: 10,
      },
    ],
    fr: [
      {
        spanish: `Si j'avais plus de temps libre, je pratiquerais ${vEs} avec des locuteurs natifs.`,
        target: `Si j'avais plus de temps libre, je pratiquerais ${v} avec des locuteurs natifs.`,
        requiredTerms: ['si', word.word.toLowerCase()],
        minWords: 10,
      },
    ],
    pt: [
      {
        spanish: `Se eu tivesse mais tempo livre, praticaria ${vEs} com falantes nativos.`,
        target: `Se eu tivesse mais tempo livre, praticaria ${v} com falantes nativos.`,
        requiredTerms: ['se', word.word.toLowerCase()],
        minWords: 10,
      },
    ],
    it: [
      {
        spanish: `Se avessi più tempo libre, praticerei ${vEs} con parlanti nativi.`,
        target: `Se avessi più tempo libre, praticerei ${v} con parlanti nativi.`,
        requiredTerms: ['se', word.word.toLowerCase()],
        minWords: 10,
      },
    ],
  }
  return bank[languageId] ?? bank.en
}

function pairsQuestions(languageId: string, word: VocabularyItem, lesson: Lesson): QuizPair[] {
  const v = vocabTarget(word)
  const vEs = vocabEs(word)
  const topic = topicIn(languageId, lesson.topic)

  const bank: Record<string, QuizPair[]> = {
    en: [
      {
        spanish: `¿En qué situaciones de ${lesson.topic} podemos usar ${vEs}? (escribe la pregunta en inglés)`,
        target: `In which ${topic} situations can we use ${v}?`,
        requiredTerms: ['which', word.word.toLowerCase()],
        minWords: 7,
        alternates: [`When can we use ${v} in ${topic}?`],
      },
      {
        spanish: `¿Con qué frecuencia deberíamos practicar ${vEs}? (escribe la pregunta en inglés)`,
        target: `How often should we practice ${v}?`,
        requiredTerms: ['how often', word.word.toLowerCase()],
        minWords: 6,
      },
    ],
    fr: [
      {
        spanish: `¿Cuándo usamos ${vEs} en contextos de ${lesson.topic}? (escribe la pregunta en francés)`,
        target: `Quand utilisons-nous ${v} dans des contextes de ${topic} ?`,
        requiredTerms: [word.word.toLowerCase()],
        minWords: 6,
      },
    ],
    pt: [
      {
        spanish: `¿Cuándo usamos ${vEs} en contextos de ${lesson.topic}? (escribe la pregunta en portugués)`,
        target: `Quando usamos ${v} em contextos de ${topic}?`,
        requiredTerms: [word.word.toLowerCase()],
        minWords: 6,
      },
    ],
    it: [
      {
        spanish: `¿Cuándo usamos ${vEs} en contextos de ${lesson.topic}? (escribe la pregunta en italiano)`,
        target: `Quando usiamo ${v} in contesti di ${topic}?`,
        requiredTerms: [word.word.toLowerCase()],
        minWords: 6,
      },
    ],
  }
  return bank[languageId] ?? bank.en
}

function pairsCourtesy(languageId: string, word: VocabularyItem): QuizPair[] {
  const v = vocabTarget(word)
  const vEs = vocabEs(word)

  const bank: Record<string, QuizPair[]> = {
    en: [
      {
        spanish: `Tu profesor te ayudó a pronunciar ${vEs}. Escríbele una respuesta cortés en inglés.`,
        target: `Thank you for helping me pronounce ${v}.`,
        requiredTerms: ['thank', word.word.toLowerCase()],
        minWords: 6,
        alternates: [
          `Thank you very much for correcting my pronunciation of ${v}.`,
          `Thanks a lot for your help with ${v}.`,
        ],
      },
    ],
    fr: [
      {
        spanish: `Ton professeur t'a aidé à prononcer ${vEs}. Réponds-lui poliment en francés.`,
        target: `Merci beaucoup de m'avoir aidé à prononcer ${v}.`,
        requiredTerms: ['merci', word.word.toLowerCase()],
        minWords: 6,
      },
    ],
    pt: [
      {
        spanish: `Seu professor ajudou você a pronunciar ${vEs}. Responda com educação em portugués.`,
        target: `Muito obrigado por me ajudar a pronunciar ${v}.`,
        requiredTerms: ['obrigado', word.word.toLowerCase()],
        minWords: 6,
      },
    ],
    it: [
      {
        spanish: `Il tuo professore ti ha aiutato a pronunciare ${vEs}. Rispondi con cortesia in italiano.`,
        target: `Grazie mille per avermi aiutato a pronunciare ${v}.`,
        requiredTerms: ['grazie', word.word.toLowerCase()],
        minWords: 6,
      },
    ],
  }
  return bank[languageId] ?? bank.en
}

function pairsExistence(languageId: string, word: VocabularyItem, lesson: Lesson): QuizPair[] {
  const v = vocabTarget(word)
  const vEs = vocabEs(word)
  const topic = topicIn(languageId, lesson.topic)

  if (languageId === 'en') {
    return [
      {
        spanish: `En nuestra clase de ${lesson.topic} hay un ejemplo útil con ${vEs}.`,
        target: `There is a useful example with ${v} in our ${topic} class.`,
        requiredTerms: ['there is', word.word.toLowerCase()],
        minWords: 8,
      },
    ]
  }

  if (languageId === 'fr') {
    return [
      {
        spanish: `Dans notre cours de ${lesson.topic} il y a un exemple utile avec ${vEs}.`,
        target: `Dans notre cours de ${topic} il y a un exemple utile avec ${v}.`,
        requiredTerms: ['il y a', word.word.toLowerCase()],
        minWords: 8,
      },
    ]
  }

  if (languageId === 'pt') {
    return [
      {
        spanish: `Na nossa aula de ${lesson.topic} há um exemplo útil com ${vEs}.`,
        target: `Na nossa aula de ${topic} há um exemplo útil com ${v}.`,
        requiredTerms: ['ha', word.word.toLowerCase()],
        minWords: 8,
      },
    ]
  }

  return [
    {
      spanish: `Nella nostra lezione di ${lesson.topic} c'è un esempio utile con ${vEs}.`,
      target: `Nella nostra lezione di ${topic} c'è un esempio utile con ${v}.`,
      requiredTerms: ["c'e", word.word.toLowerCase()],
      minWords: 8,
    },
  ]
}

function pairsGeneric(
  languageId: string,
  word: VocabularyItem,
  word2: VocabularyItem | undefined,
  lesson: Lesson,
): QuizPair[] {
  const v = vocabTarget(word)
  const vEs = vocabEs(word)
  const topic = topicIn(languageId, lesson.topic)

  if (word2) {
    const v2 = vocabTarget(word2)
    const v2Es = vocabEs(word2)
    const bank: Record<string, QuizPair[]> = {
      en: [
        {
          spanish: `En ${lesson.topic}, conecta ${vEs} y ${v2Es} en una sola oración natural.`,
          target: `In ${topic}, ${v} and ${v2} often appear together in the same sentence.`,
          requiredTerms: [word.word.toLowerCase(), word2.word.toLowerCase()],
          minWords: 9,
          alternates: [
            `When we talk about ${topic}, we can use ${v} and ${v2} in the same context.`,
          ],
        },
      ],
      fr: [
        {
          spanish: `En ${lesson.topic}, relie ${vEs} et ${v2Es} dans une seule phrase naturelle.`,
          target: `En ${topic}, ${v} et ${v2} apparaissent souvent dans la même phrase.`,
          requiredTerms: [word.word.toLowerCase(), word2.word.toLowerCase()],
          minWords: 8,
        },
      ],
      pt: [
        {
          spanish: `Em ${lesson.topic}, conecte ${vEs} e ${v2Es} em uma única frase natural.`,
          target: `Em ${topic}, ${v} e ${v2} aparecem juntos na mesma frase.`,
          requiredTerms: [word.word.toLowerCase(), word2.word.toLowerCase()],
          minWords: 8,
        },
      ],
      it: [
        {
          spanish: `In ${lesson.topic}, collega ${vEs} e ${v2Es} in una sola frase naturale.`,
          target: `In ${topic}, ${v} e ${v2} compaiono spesso nella stessa frase.`,
          requiredTerms: [word.word.toLowerCase(), word2.word.toLowerCase()],
          minWords: 8,
        },
      ],
    }
    return bank[languageId] ?? bank.en
  }

  const bank: Record<string, QuizPair[]> = {
    en: [
      {
        spanish: `Explica con una oración cómo usarías ${vEs} al hablar de ${lesson.topic}.`,
        target: `I would use ${v} when I talk about ${topic} with my classmates.`,
        requiredTerms: [word.word.toLowerCase(), topic.toLowerCase()],
        minWords: 8,
      },
    ],
    fr: [
      {
        spanish: `Explique en une phrase comment tu utiliserais ${vEs} en parlant de ${lesson.topic}.`,
        target: `J'utiliserais ${v} quand je parle de ${topic} avec mes camarades.`,
        requiredTerms: [word.word.toLowerCase()],
        minWords: 8,
      },
    ],
    pt: [
      {
        spanish: `Explique em uma frase como você usaria ${vEs} ao falar de ${lesson.topic}.`,
        target: `Eu usaria ${v} quando falo sobre ${topic} com meus colegas.`,
        requiredTerms: [word.word.toLowerCase()],
        minWords: 8,
      },
    ],
    it: [
      {
        spanish: `Spiega in una frase come useresti ${vEs} parlando di ${lesson.topic}.`,
        target: `Userei ${v} quando parlo di ${topic} con i miei compagni.`,
        requiredTerms: [word.word.toLowerCase()],
        minWords: 8,
      },
    ],
  }
  return bank[languageId] ?? bank.en
}

function pairsApplication(
  languageId: string,
  word: VocabularyItem,
  word2: VocabularyItem,
  block: GrammarBlock,
  lesson: Lesson,
): QuizPair[] {
  const mode = detectGrammarMode(block)
  const base = buildQuizPairs(mode, languageId, 0, word, word2, lesson)
  if (base) return [base]

  const v = vocabTarget(word)
  const v2 = vocabTarget(word2)
  const vEs = vocabEs(word)
  const v2Es = vocabEs(word2)
  const topic = topicIn(languageId, lesson.topic)

  return [
    {
      spanish: `Aplica ${block.title}: escribe una oración sobre ${lesson.topic} que incluya ${vEs} y ${v2Es}.`,
      target:
        languageId === 'en'
          ? `In our ${topic} lesson, we learned ${v} and ${v2} together.`
          : languageId === 'fr'
            ? `Dans notre leçon de ${topic}, nous avons appris ${v} et ${v2} ensemble.`
            : languageId === 'pt'
              ? `Na nossa aula de ${topic}, aprendemos ${v} e ${v2} juntos.`
              : `Nella nostra lezione di ${topic}, abbiamo imparato ${v} e ${v2} insieme.`,
      requiredTerms: [word.word.toLowerCase(), word2.word.toLowerCase()],
      minWords: 8,
      instruction: `Integra vocabulario y la estructura «${block.title}».`,
    },
  ]
}

export function buildQuizPairs(
  mode: GrammarMode,
  languageId: string,
  variant: number,
  word: VocabularyItem,
  word2: VocabularyItem | undefined,
  lesson: Lesson,
): QuizPair | null {
  const s = pickSubject(languageId, variant)
  let list: QuizPair[] = []

  switch (mode) {
    case 'to_be':
      list = pairsToBe(languageId, s, word, lesson)
      break
    case 'present_continuous':
      list = pairsContinuous(languageId, s, word, lesson)
      break
    case 'past':
      list = pairsPast(languageId, word, lesson)
      break
    case 'future':
      list = pairsFuture(languageId, s, word, lesson)
      break
    case 'conditional_first':
      list = pairsConditionalFirst(languageId, word)
      break
    case 'conditional_second':
      list = pairsConditionalSecond(languageId, word)
      break
    case 'questions':
      list = pairsQuestions(languageId, word, lesson)
      break
    case 'courtesy':
      list = pairsCourtesy(languageId, word)
      break
    case 'existence':
      list = pairsExistence(languageId, word, lesson)
      break
    default:
      list = pairsGeneric(languageId, word, word2, lesson)
  }

  return list[variant % list.length] ?? list[0] ?? null
}

export function buildApplicationPair(
  languageId: string,
  word: VocabularyItem,
  word2: VocabularyItem,
  block: GrammarBlock,
  lesson: Lesson,
  variant: number,
): QuizPair | null {
  const list = pairsApplication(languageId, word, word2, block, lesson)
  return list[variant % list.length] ?? null
}

export { pickSubject, meaning, topicIn, vocabEs, vocabTarget }
