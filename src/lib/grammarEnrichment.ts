import type { GrammarBlock } from '../types'

export type RawGrammarBlock = Omit<GrammarBlock, 'id' | 'detail' | 'points'>

const LANG_LABEL: Record<string, string> = {
  en: 'inglés',
  fr: 'francés',
  pt: 'portugués',
  it: 'italiano',
}

const LEVEL_LABELS = ['', 'Principiante', 'Elemental', 'Intermedio', 'Avanzado', 'Experto']

const KIND_POINTS: Record<GrammarBlock['kind'], string[]> = {
  verb: [
    'Identifica siempre el sujeto antes de elegir la forma verbal correcta.',
    'En preguntas, el auxiliar (do/does, est, avoir…) suele ir antes del sujeto.',
    'En negaciones usa la partícula negativa del idioma (not, ne…pas, não, non).',
    'Practica las tres personas: yo, tú y él/ella para fijar las terminaciones.',
    'Los adverbios de tiempo (ayer, mañana, siempre) ayudan a elegir el tiempo verbal.',
  ],
  structure: [
    'Memoriza el patrón como una “fórmula” reutilizable en distintas situaciones.',
    'Puedes sustituir solo una parte del patrón sin cambiar el resto de la estructura.',
    'Úsala primero en frases cortas; luego añade complementos (lugar, tiempo, motivo).',
    'En conversación real combina la estructura con gestos y entonación adecuada.',
    'Repite en voz alta cada ejemplo para automatizar el orden de las palabras.',
  ],
  conditional: [
    'La cláusula con “si / if / se” puede ir al inicio o al final de la oración.',
    'Si la cláusula condicional va al inicio, separa con coma la segunda parte.',
    'Primer condicional: situación posible en el futuro. Segundo: hipótesis irreal.',
    'No traduzcas palabra por palabra: respeta el tiempo verbal de cada cláusula.',
    'Practica variantes con distintos sujetos (I, we, they) para ganar fluidez.',
  ],
}

const LANG_KIND_TIPS: Record<string, Partial<Record<GrammarBlock['kind'], string>>> = {
  en: {
    verb: 'En inglés, la 3.ª persona singular lleva -s en presente (he works, she goes).',
    conditional: 'Con If al inicio no uses will en la misma cláusula: If it rains, we will stay.',
  },
  fr: {
    verb: 'Muchos verbos franceses usan avoir ou être en pasado compuesto; memoriza los irregulares.',
    conditional: 'El condicional de cortesía (Je voudrais) es esencial en tiendas y restaurantes.',
  },
  pt: {
    verb: 'Distingue ser (identidad) y estar (estado/ubicación) como en español.',
    conditional: 'Se + presente indica consecuencia probable: Se chover, ficaremos em casa.',
  },
  it: {
    verb: 'Los verbos en -are, -ere, -ire tienen conjugaciones distintas en presente.',
    conditional: 'Se + congiuntivo imperfecto aparece en hipótesis formales y literarias.',
  },
}

export const EXTRA_BLOCKS: Record<string, Record<number, RawGrammarBlock[]>> = {
  en: {
    1: [
      {
        title: 'Artículos y sustantivos básicos',
        kind: 'structure',
        explanation: 'A/an para singular indefinido; the para algo específico.',
        pattern: 'a + consonante · an + vocal · the + específico',
        examples: [
          { phrase: 'I have a book.', translation: 'Tengo un libro.' },
          { phrase: 'She is an engineer.', translation: 'Ella es ingeniera.' },
          { phrase: 'The teacher is here.', translation: 'El/la profesor(a) está aquí.' },
          { phrase: 'An apple a day.', translation: 'Una manzana al día.' },
        ],
        practice: 'Elige a, an o the: ___ student in ___ classroom.',
      },
    ],
    2: [
      {
        title: 'Comparativos simples',
        kind: 'structure',
        explanation: 'Compara dos cosas con -er / more + adjetivo.',
        pattern: 'adj-er + than · more + adj + than',
        examples: [
          { phrase: 'This shop is cheaper than that one.', translation: 'Esta tienda es más barata.' },
          { phrase: 'She is more tired than me.', translation: 'Ella está más cansada que yo.' },
          { phrase: 'It is bigger than my house.', translation: 'Es más grande que mi casa.' },
          { phrase: 'Better than yesterday.', translation: 'Mejor que ayer.' },
        ],
        practice: 'Compara dos objetos de la lección con cheaper / bigger.',
      },
    ],
    3: [
      {
        title: 'Conectores de secuencia',
        kind: 'structure',
        explanation: 'Enlaza ideas con because, so, but, although.',
        pattern: 'because + razón · although + contraste',
        examples: [
          { phrase: 'I stayed because I was tired.', translation: 'Me quedé porque estaba cansado.' },
          { phrase: 'Although it rained, we went out.', translation: 'Aunque llovió, salimos.' },
          { phrase: 'She studied, so she passed.', translation: 'Estudió, así que aprobó.' },
          { phrase: 'But I need help.', translation: 'Pero necesito ayuda.' },
        ],
        practice: 'Une dos ideas de la lección con because o although.',
      },
    ],
    4: [
      {
        title: 'Voz pasiva introductoria',
        kind: 'structure',
        explanation: 'Enfatiza la acción o el resultado, no quién la hace.',
        pattern: 'Subject + is/are + past participle',
        examples: [
          { phrase: 'The email was sent.', translation: 'El correo fue enviado.' },
          { phrase: 'English is spoken here.', translation: 'Aquí se habla inglés.' },
          { phrase: 'The project was finished.', translation: 'El proyecto fue terminado.' },
          { phrase: 'Tickets are sold online.', translation: 'Los boletos se venden en línea.' },
        ],
        practice: 'Transforma: They built the house → The house…',
      },
    ],
    5: [
      {
        title: 'Tercer condicional',
        kind: 'conditional',
        explanation: 'Arrepentimiento sobre el pasado: If + past perfect, would have + participio.',
        pattern: 'If + had + past participle, would have + past participle',
        examples: [
          { phrase: 'If I had studied, I would have passed.', translation: 'Si hubiera estudiado, habría aprobado.' },
          { phrase: 'If she had known, she would have come.', translation: 'Si hubiera sabido, habría venido.' },
          { phrase: 'We would have won if we had tried.', translation: 'Habríamos ganado si lo hubiéramos intentado.' },
          { phrase: 'If it had rained, we would have canceled.', translation: 'Si hubiera llovido, habríamos cancelado.' },
        ],
        practice: 'Escribe un arrepentimiento con If I had…',
      },
    ],
  },
  fr: {
    1: [{ title: 'Articles définis et indéfinis', kind: 'structure', explanation: 'le/la/les vs un/une/des.', pattern: 'un/une + nuevo · le/la + conocido', examples: [{ phrase: 'Un livre intéressant.', translation: 'Un libro interesante.' }, { phrase: 'Le professeur arrive.', translation: 'El profesor llega.' }, { phrase: 'Des amis français.', translation: 'Unos amigos franceses.' }, { phrase: 'La maison est grande.', translation: 'La casa es grande.' }], practice: 'Completa con un, une, le o la.' }],
    2: [{ title: 'Comparatif', kind: 'structure', explanation: 'plus…que, moins…que, aussi…que.', pattern: 'plus + adj + que', examples: [{ phrase: 'Plus grand que moi.', translation: 'Más grande que yo.' }, { phrase: 'Moins cher que ça.', translation: 'Menos caro que eso.' }, { phrase: 'Aussi bon que hier.', translation: 'Tan bueno como ayer.' }, { phrase: 'Plus intéressant que le film.', translation: 'Más interesante que la película.' }], practice: 'Compara deux mots de la leçon.' }],
    3: [{ title: 'Connecteurs', kind: 'structure', explanation: 'parce que, donc, mais, bien que.', pattern: 'parce que + cause · bien que + contraste', examples: [{ phrase: 'Je reste parce que je suis fatigué.', translation: 'Me quedo porque estoy cansado.' }, { phrase: 'Bien qu\'il pleuve, nous sortons.', translation: 'Aunque llueva, salimos.' }, { phrase: 'Il a étudié, donc il a réussi.', translation: 'Estudió, así que tuvo éxito.' }, { phrase: 'Mais j\'ai besoin d\'aide.', translation: 'Pero necesito ayuda.' }], practice: 'Relie deux idées avec parce que.' }],
    4: [{ title: 'Voix passive', kind: 'structure', explanation: 'être + participio pasé.', pattern: 'être + participio + par (opcional)', examples: [{ phrase: 'Le courriel a été envoyé.', translation: 'El correo fue enviado.' }, { phrase: 'Le français est parlé ici.', translation: 'Aquí se habla francés.' }, { phrase: 'Le projet est terminé.', translation: 'El proyecto está terminado.' }, { phrase: 'Les billets sont vendus en ligne.', translation: 'Los boletos se venden en línea.' }], practice: 'Transforme une phrase active en passive.' }],
    5: [{ title: 'Conditionnel passé', kind: 'conditional', explanation: 'Si + plus-que-parfait, conditionnel passé.', pattern: 'Si + avais/étais…, aurais/serais…', examples: [{ phrase: 'Si j\'avais su, je serais venu.', translation: 'Si hubiera sabido, habría venido.' }, { phrase: 'J\'aurais réussi si j\'avais travaillé.', translation: 'Habría aprobado si hubiera trabajado.' }, { phrase: 'Si nous avions essayé, nous aurions gagné.', translation: 'Habríamos ganado si lo hubiéramos intentado.' }, { phrase: 'Elle aurait voyagé si elle avait eu le temps.', translation: 'Habría viajado si hubiera tenido tiempo.' }], practice: 'Écris un regret avec Si j\'avais…' }],
  },
  pt: {
    1: [{ title: 'Artigos definidos e indefinidos', kind: 'structure', explanation: 'o/a/os/as vs um/uma.', pattern: 'um/uma + nuevo · o/a + conocido', examples: [{ phrase: 'Um livro interessante.', translation: 'Un libro interesante.' }, { phrase: 'O professor chega.', translation: 'El profesor llega.' }, { phrase: 'Umas amigas brasileiras.', translation: 'Unas amigas brasileñas.' }, { phrase: 'A casa é grande.', translation: 'La casa es grande.' }], practice: 'Complete com um, uma, o ou a.' }],
    2: [{ title: 'Comparativos', kind: 'structure', explanation: 'mais…que, menos…que, tão…quanto.', pattern: 'mais + adj + que', examples: [{ phrase: 'Mais barato que aquilo.', translation: 'Más barato que eso.' }, { phrase: 'Menos difícil que ontem.', translation: 'Menos difícil que ayer.' }, { phrase: 'Tão bom quanto antes.', translation: 'Tan bueno como antes.' }, { phrase: 'Mais interessante que o filme.', translation: 'Más interesante que la película.' }], practice: 'Compare duas palavras da lição.' }],
    3: [{ title: 'Conectores', kind: 'structure', explanation: 'porque, então, mas, embora.', pattern: 'porque + causa · embora + contraste', examples: [{ phrase: 'Fiquei porque estava cansado.', translation: 'Me quedé porque estaba cansado.' }, { phrase: 'Embora chova, saímos.', translation: 'Aunque llueva, salimos.' }, { phrase: 'Estudou, então passou.', translation: 'Estudió, así que aprobó.' }, { phrase: 'Mas preciso de ajuda.', translation: 'Pero necesito ayuda.' }], practice: 'Ligue duas ideias com porque.' }],
    4: [{ title: 'Voz passiva', kind: 'structure', explanation: 'ser + participio.', pattern: 'ser + particípio + por (opcional)', examples: [{ phrase: 'O email foi enviado.', translation: 'El correo fue enviado.' }, { phrase: 'Português é falado aqui.', translation: 'Aquí se habla portugués.' }, { phrase: 'O projeto foi terminado.', translation: 'El proyecto fue terminado.' }, { phrase: 'Os bilhetes são vendidos online.', translation: 'Los billetes se venden en línea.' }], practice: 'Transforme uma frase ativa em passiva.' }],
    5: [{ title: 'Condicional composto', kind: 'conditional', explanation: 'Se + mais-que-perfeito, condicional composto.', pattern: 'Se + tivesse…, teria/seria…', examples: [{ phrase: 'Se eu soubesse, teria ido.', translation: 'Si hubiera sabido, habría ido.' }, { phrase: 'Teria passado se tivesse estudado.', translation: 'Habría aprobado si hubiera estudiado.' }, { phrase: 'Se tivéssemos tentado, teríamos ganho.', translation: 'Habríamos ganado si lo hubiéramos intentado.' }, { phrase: 'Ela teria viajado se tivesse tempo.', translation: 'Habría viajado si hubiera tenido tiempo.' }], practice: 'Escreva um arrependimento com Se eu tivesse…' }],
  },
  it: {
    1: [{ title: 'Articoli determinativi e indeterminativi', kind: 'structure', explanation: 'il/la/i/le vs un/una.', pattern: 'un/una + nuevo · il/la + conocido', examples: [{ phrase: 'Un libro interessante.', translation: 'Un libro interesante.' }, { phrase: 'Il professore arriva.', translation: 'El profesor llega.' }, { phrase: 'Degli amici italiani.', translation: 'Unos amigos italianos.' }, { phrase: 'La casa è grande.', translation: 'La casa es grande.' }], practice: 'Completa con un, una, il o la.' }],
    2: [{ title: 'Comparativi', kind: 'structure', explanation: 'più…di, meno…di, tanto…quanto.', pattern: 'più + adj + di', examples: [{ phrase: 'Più economico di quello.', translation: 'Más económico que eso.' }, { phrase: 'Meno difficile di ieri.', translation: 'Menos difícil que ayer.' }, { phrase: 'Tanto buono quanto prima.', translation: 'Tan bueno como antes.' }, { phrase: 'Più interessante del film.', translation: 'Más interesante que la película.' }], practice: 'Confronta due parole della lezione.' }],
    3: [{ title: 'Connettori', kind: 'structure', explanation: 'perché, quindi, ma, benché.', pattern: 'perché + causa · benché + contraste', examples: [{ phrase: 'Sono rimasto perché ero stanco.', translation: 'Me quedé porque estaba cansado.' }, { phrase: 'Benché piova, usciamo.', translation: 'Aunque llueva, salimos.' }, { phrase: 'Ha studiato, quindi ha passato.', translation: 'Estudió, así que aprobó.' }, { phrase: 'Ma ho bisogno di aiuto.', translation: 'Pero necesito ayuda.' }], practice: 'Collega due idee con perché.' }],
    4: [{ title: 'Voce passiva', kind: 'structure', explanation: 'essere + participio passato.', pattern: 'essere + participio + da (opcional)', examples: [{ phrase: 'L\'email è stata inviata.', translation: 'El correo fue enviado.' }, { phrase: 'L\'italiano è parlato qui.', translation: 'Aquí se habla italiano.' }, { phrase: 'Il progetto è finito.', translation: 'El proyecto está terminado.' }, { phrase: 'I biglietti sono venduti online.', translation: 'Los boletos se venden en línea.' }], practice: 'Trasforma una frase attiva in passiva.' }],
    5: [{ title: 'Condizionale composto', kind: 'conditional', explanation: 'Se + trapassato, condizionale composto.', pattern: 'Se + avessi…, avrei/sarei…', examples: [{ phrase: 'Se avessi saputo, sarei venuto.', translation: 'Si hubiera sabido, habría venido.' }, { phrase: 'Avrei passato se avessi studiato.', translation: 'Habría aprobado si hubiera estudiado.' }, { phrase: 'Se avessimo provato, avremmo vinto.', translation: 'Habríamos ganado si lo hubiéramos intentado.' }, { phrase: 'Avrebbe viaggiato se avesse avuto tempo.', translation: 'Habría viajado si hubiera tenido tiempo.' }], practice: 'Scrivi un rimpianto con Se avessi…' }],
  },
}

function buildDetail(block: RawGrammarBlock, languageId: string, level: number): string {
  const lang = LANG_LABEL[languageId] ?? 'el idioma'
  const levelName = LEVEL_LABELS[level] ?? `nivel ${level}`
  const kindNote =
    block.kind === 'conditional'
      ? 'Los condicionales permiten expresar causas, hipótesis y consecuencias con matices distintos.'
      : block.kind === 'verb'
        ? 'Dominar esta conjugación te permite construir frases completas sin depender solo de vocabulario suelto.'
        : 'Esta estructura organiza las palabras en un orden fijo que los hablantes nativos reconocen al instante.'

  return `${block.explanation} En ${lang}, dentro del nivel ${levelName}, este patrón aparece con frecuencia en situaciones de ${level <= 2 ? 'la vida cotidiana' : level <= 4 ? 'estudios, trabajo y viajes' : 'contextos formales y académicos'}. ${kindNote} Dedica unos minutos a leer cada ejemplo en voz alta antes de pasar al quiz.`
}

function buildPoints(block: RawGrammarBlock, languageId: string, level: number): string[] {
  const base = [...KIND_POINTS[block.kind]]
  const langTip = LANG_KIND_TIPS[languageId]?.[block.kind]
  if (langTip) base.unshift(langTip)
  base.push(`Relaciona este contenido con el tema de la lección (nivel ${level}).`)
  base.push(`Antes del quiz, crea una oración original usando: ${block.pattern.split('·')[0]?.trim()}.`)
  return base.slice(0, 6)
}

function ensureExamples(block: RawGrammarBlock): GrammarBlock['examples'] {
  if (block.examples.length >= 4) return block.examples
  return block.examples
}

export function enrichGrammarBlocks(
  blocks: RawGrammarBlock[],
  languageId: string,
  level: number,
  lessonId: string,
): GrammarBlock[] {
  return blocks.map((block, index) => ({
    ...block,
    id: `${lessonId}-g${index + 1}`,
    detail: buildDetail(block, languageId, level),
    points: buildPoints(block, languageId, level),
    examples: ensureExamples(block),
  }))
}

const TOPIC_CONNECTORS: Record<string, { pattern: string; connectors: string; examples: { phrase: string; translation: string }[] }> = {
  en: {
    pattern: 'Subject + verb + complement + (and / but / because)',
    connectors: 'and, but, because',
    examples: [
      { phrase: 'I like {topic} and I practice every day.', translation: 'Me gusta {topic} y practico cada día.' },
      { phrase: 'She talks about {topic}, but she is shy.', translation: 'Habla de {topic}, pero es tímida.' },
      { phrase: 'We study {topic} because it is useful.', translation: 'Estudiamos {topic} porque es útil.' },
      { phrase: 'They always use {topic} in class.', translation: 'Siempre usan {topic} en clase.' },
    ],
  },
  fr: {
    pattern: 'Sujet + verbe + complément + (et / mais / parce que)',
    connectors: 'et, mais, parce que',
    examples: [
      { phrase: "J'aime {topic} et je pratique chaque jour.", translation: 'Me gusta {topic} y practico cada día.' },
      { phrase: 'Elle parle de {topic}, mais elle est timide.', translation: 'Habla de {topic}, pero es tímida.' },
      { phrase: 'Nous étudions {topic} parce que c\'est utile.', translation: 'Estudiamos {topic} porque es útil.' },
      { phrase: 'Ils utilisent toujours {topic} en classe.', translation: 'Siempre usan {topic} en clase.' },
    ],
  },
  pt: {
    pattern: 'Sujeito + verbo + complemento + (e / mas / porque)',
    connectors: 'e, mas, porque',
    examples: [
      { phrase: 'Eu gosto de {topic} e pratico todos os dias.', translation: 'Me gusta {topic} y practico cada día.' },
      { phrase: 'Ela fala sobre {topic}, mas é tímida.', translation: 'Habla de {topic}, pero es tímida.' },
      { phrase: 'Nós estudamos {topic} porque é útil.', translation: 'Estudiamos {topic} porque es útil.' },
      { phrase: 'Eles sempre usam {topic} na aula.', translation: 'Siempre usan {topic} en clase.' },
    ],
  },
  it: {
    pattern: 'Soggetto + verbo + complemento + (e / ma / perché)',
    connectors: 'e, ma, perché',
    examples: [
      { phrase: 'Mi piace {topic} e pratico ogni giorno.', translation: 'Me gusta {topic} y practico cada día.' },
      { phrase: 'Lei parla di {topic}, ma è timida.', translation: 'Habla de {topic}, pero es tímida.' },
      { phrase: 'Studiamo {topic} perché è utile.', translation: 'Estudiamos {topic} porque es útil.' },
      { phrase: 'Usano sempre {topic} in classe.', translation: 'Siempre usan {topic} en clase.' },
    ],
  },
}

export function topicContextBlock(lessonTitle: string, topic: string, languageId: string): RawGrammarBlock {
  const lang = LANG_LABEL[languageId] ?? 'el idioma'
  const ctx = TOPIC_CONNECTORS[languageId] ?? TOPIC_CONNECTORS.en
  const topicLabel = topic || lessonTitle
  return {
    title: `Aplicación: ${topicLabel}`,
    kind: 'structure',
    explanation: `Integra el vocabulario de "${lessonTitle}" en oraciones completas en ${lang}.`,
    pattern: ctx.pattern,
    examples: ctx.examples.map((ex) => ({
      phrase: ex.phrase.replace(/\{topic\}/g, topicLabel),
      translation: ex.translation.replace(/\{topic\}/g, topicLabel),
    })),
    practice: `Escribe 2 oraciones sobre ${topicLabel} usando conectores (${ctx.connectors}) y vocabulario de la lección.`,
  }
}
