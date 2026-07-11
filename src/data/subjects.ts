import type { StudentGrade } from '../types'

export type SchoolSubjectId = 'math' | 'spanish' | 'science'

export type SchoolSubject = {
  id: SchoolSubjectId
  name: string
  icon: string
  description: string
  accent: string
}

export type SubjectLesson = {
  id: string
  title: string
  topic: string
  summary: string
  concepts: string[]
  practice: string
  terms: { term: string; meaning: string }[]
  /** Referencia curricular MEN (DBA / EBC). */
  source: string
}

export const SCHOOL_SUBJECTS: SchoolSubject[] = [
  {
    id: 'math',
    name: 'Matemáticas',
    icon: '🔢',
    description: 'Temas según DBA y Estándares Básicos de Competencias del MEN.',
    accent: '#0984e3',
  },
  {
    id: 'spanish',
    name: 'Español',
    icon: '📚',
    description: 'Lenguaje según DBA del MEN: comunicación, lectura, escritura y literatura.',
    accent: '#e17055',
  },
  {
    id: 'science',
    name: 'Ciencias naturales',
    icon: '🔬',
    description: 'Entorno vivo, físico y ciencia-tecnología-sociedad según DBA del MEN.',
    accent: '#00b894',
  },
]

type LessonSeed = Omit<SubjectLesson, 'id'>

const SRC = {
  dba: 'MEN · Derechos Básicos de Aprendizaje (DBA)',
  ebc: 'MEN · Estándares Básicos de Competencias',
  trans: 'MEN · DBA Grado Transición',
}

/** Contenido alineado a DBA MEN (Transición–11°) y EBC por grupos de grados. */
const MATH_BY_GRADE: Record<StudentGrade, LessonSeed[]> = {
  0: [
    {
      title: 'Conteo y cantidades',
      topic: 'Pensamiento numérico',
      summary: 'Explora cantidades, compara “más / menos / igual” y cuenta objetos del entorno.',
      concepts: ['Conteo oral', 'Correspondencia uno a uno', 'Cantidades pequeñas'],
      practice: 'Cuenta 10 objetos de tu casa y di cuál montón tiene más.',
      terms: [
        { term: 'Cantidad', meaning: 'Cuántos hay de algo' },
        { term: 'Contar', meaning: 'Decir números en orden' },
        { term: 'Comparar', meaning: 'Ver qué es más o menos' },
      ],
      source: SRC.trans,
    },
    {
      title: 'Espacio, tiempo y medida',
      topic: 'Pensamiento métrico y espacial',
      summary: 'Usa nociones de arriba/abajo, cerca/lejos, antes/después y medidas sencillas.',
      concepts: ['Ubicación espacial', 'Secuencias temporales', 'Medir con el cuerpo'],
      practice: 'Describe el camino de tu cuarto a la cocina usando cerca, lejos, izquierda y derecha.',
      terms: [
        { term: 'Espacio', meaning: 'Dónde están las cosas' },
        { term: 'Tiempo', meaning: 'Antes, ahora y después' },
        { term: 'Medir', meaning: 'Comparar tamaños o longitudes' },
      ],
      source: SRC.trans,
    },
    {
      title: 'Formas del entorno',
      topic: 'Pensamiento espacial',
      summary: 'Reconoce formas redondas, con puntas y objetos del entorno por su forma.',
      concepts: ['Círculo y cuadrado', 'Grande y pequeño', 'Clasificar por forma'],
      practice: 'Busca 3 objetos redondos y 3 con puntas en tu casa.',
      terms: [
        { term: 'Forma', meaning: 'Cómo se ve el contorno de un objeto' },
        { term: 'Clasificar', meaning: 'Agrupar por una característica' },
        { term: 'Tamaño', meaning: 'Grande, mediano o pequeño' },
      ],
      source: SRC.trans,
    },
  ],
  1: [
    {
      title: 'Usos de los números y operaciones',
      topic: 'Pensamiento numérico',
      summary: 'Identifica números como código, cardinal, ordinal y medida; suma y resta en contextos cotidianos.',
      concepts: ['Cardinal y ordinal', 'Suma y resta', 'Problemas de juntar y quitar'],
      practice: 'Con facturas o etiquetas, señala números que indican cantidad, orden o medida.',
      terms: [
        { term: 'Cardinal', meaning: 'Indica cuántos hay' },
        { term: 'Ordinal', meaning: 'Indica el orden (1.º, 2.º…)' },
        { term: 'Adición', meaning: 'Operación de sumar' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Estrategias para contar y calcular',
      topic: 'Pensamiento numérico',
      summary: 'Cuenta de 1 en 1, 2 en 2 o 5 en 5 y resuelve sumas/restas con distintas estrategias.',
      concepts: ['Conteos regulares', 'Paso por el diez', 'Estimación'],
      practice: 'Resuelve: 8 + ? = 12 y explica cómo lo pensaste.',
      terms: [
        { term: 'Estrategia', meaning: 'Camino para resolver un cálculo' },
        { term: 'Estimación', meaning: 'Aproximar un resultado' },
        { term: 'Equivalencia', meaning: 'Misma cantidad expresada de otra forma' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Medición y formas',
      topic: 'Pensamiento métrico y espacial',
      summary: 'Compara longitud, peso y capacidad; describe formas bidimensionales y trayectorias.',
      concepts: ['Atributos medibles', 'Unidades no estandarizadas', 'Posición y recorrido'],
      practice: 'Ordena 5 objetos por tamaño y luego por peso. ¿Cambia el orden?',
      terms: [
        { term: 'Longitud', meaning: 'Qué tan largo es algo' },
        { term: 'Capacidad', meaning: 'Cuánto cabe en un recipiente' },
        { term: 'Trayectoria', meaning: 'Camino que se recorre' },
      ],
      source: SRC.dba,
    },
  ],
  2: [
    {
      title: 'Números hasta 1000 y valor posicional',
      topic: 'Pensamiento numérico',
      summary: 'Comprende centenas, decenas y unidades; suma y resta con descomposición.',
      concepts: ['Valor posicional', 'Composición y descomposición', 'Problemas aditivos'],
      practice: 'Escribe 347 como centenas, decenas y unidades de tres formas distintas.',
      terms: [
        { term: 'Centena', meaning: 'Grupo de 100' },
        { term: 'Decena', meaning: 'Grupo de 10' },
        { term: 'Descomponer', meaning: 'Separar un número en partes' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Multiplicación como suma repetida',
      topic: 'Pensamiento numérico',
      summary: 'Relaciona grupos iguales con la multiplicación y resuelve problemas sencillos.',
      concepts: ['Grupos iguales', 'Tablas iniciales', 'Situaciones multiplicativas'],
      practice: 'Representa 4 × 3 con dibujos de grupos y escribe la suma repetida.',
      terms: [
        { term: 'Factor', meaning: 'Número que se multiplica' },
        { term: 'Producto', meaning: 'Resultado de multiplicar' },
        { term: 'Grupo', meaning: 'Conjunto con la misma cantidad' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Figuras, simetría y datos',
      topic: 'Espacial y aleatorio',
      summary: 'Clasifica figuras, reconoce simetrías y organiza datos en pictogramas simples.',
      concepts: ['Polígonos', 'Eje de simetría', 'Pictogramas'],
      practice: 'Haz un pictograma de las frutas favoritas de 8 compañeros.',
      terms: [
        { term: 'Simetría', meaning: 'Partes que coinciden al doblar' },
        { term: 'Pictograma', meaning: 'Gráfico con dibujos' },
        { term: 'Dato', meaning: 'Información que se recoge' },
      ],
      source: SRC.dba,
    },
  ],
  3: [
    {
      title: 'Multiplicación y división',
      topic: 'Pensamiento numérico',
      summary: 'Resuelve problemas de agrupación, reparto y comparación multiplicativa.',
      concepts: ['Tablas de multiplicar', 'División exacta', 'Relación × y ÷'],
      practice: 'Reparte 24 lápices en 6 cajas iguales. ¿Cuántos van en cada una?',
      terms: [
        { term: 'Dividendo', meaning: 'Cantidad que se reparte' },
        { term: 'Divisor', meaning: 'En cuántas partes se reparte' },
        { term: 'Cociente', meaning: 'Resultado de la división' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Fracciones como parte de un todo',
      topic: 'Pensamiento numérico',
      summary: 'Representa mitades, tercios y cuartos en contextos concretos y gráficos.',
      concepts: ['Parte-todo', 'Numerador y denominador', 'Comparar fracciones unitarias'],
      practice: 'Dibuja una barra y marca 1/2, 1/3 y 1/4. ¿Cuál es mayor?',
      terms: [
        { term: 'Fracción', meaning: 'Parte de un entero' },
        { term: 'Numerador', meaning: 'Partes que se toman' },
        { term: 'Denominador', meaning: 'Partes en que se divide el todo' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Perímetro y patrones',
      topic: 'Métrico y variacional',
      summary: 'Calcula perímetros de figuras y describe patrones numéricos o geométricos.',
      concepts: ['Perímetro', 'Patrones de crecimiento', 'Unidades de longitud'],
      practice: 'Mide el contorno de tu cuaderno en cm y calcula su perímetro.',
      terms: [
        { term: 'Perímetro', meaning: 'Suma de los lados' },
        { term: 'Patrón', meaning: 'Secuencia que se repite o crece con regla' },
        { term: 'Centímetro', meaning: 'Unidad de longitud' },
      ],
      source: SRC.dba,
    },
  ],
  4: [
    {
      title: 'Números naturales y operaciones combinadas',
      topic: 'Pensamiento numérico',
      summary: 'Opera con números grandes y respeta el orden de las operaciones en problemas.',
      concepts: ['Jerarquía de operaciones', 'Estimación', 'Problemas multi-paso'],
      practice: 'Resuelve: 25 × 4 + 18 y explica el orden usado.',
      terms: [
        { term: 'Operación', meaning: 'Cálculo entre números' },
        { term: 'Estimar', meaning: 'Aproximar antes de calcular exacto' },
        { term: 'Algoritmo', meaning: 'Procedimiento paso a paso' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Fracciones y decimales iniciales',
      topic: 'Pensamiento numérico',
      summary: 'Relaciona fracciones con decimales sencillos (décimas y centésimas) en medidas.',
      concepts: ['Equivalencias', 'Décimas', 'Recta numérica'],
      practice: 'Ubica 0,5 y 1/2 en una recta del 0 al 1. ¿Coinciden?',
      terms: [
        { term: 'Decimal', meaning: 'Número con parte entera y decimal' },
        { term: 'Equivalente', meaning: 'Misma cantidad con otra escritura' },
        { term: 'Décima', meaning: 'Una de diez partes iguales' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Área, ángulos y gráficos',
      topic: 'Métrico, espacial y aleatorio',
      summary: 'Calcula áreas de rectángulos, reconoce ángulos y lee diagramas de barras.',
      concepts: ['Área', 'Ángulo recto', 'Diagramas de barras'],
      practice: 'Construye un diagrama de barras con las horas de sueño de tu familia.',
      terms: [
        { term: 'Área', meaning: 'Superficie interior de una figura' },
        { term: 'Ángulo', meaning: 'Apertura entre dos rayos' },
        { term: 'Frecuencia', meaning: 'Cuántas veces aparece un dato' },
      ],
      source: SRC.dba,
    },
  ],
  5: [
    {
      title: 'Números racionales en contexto',
      topic: 'Pensamiento numérico',
      summary: 'Usa fracciones, decimales y porcentajes para interpretar situaciones cotidianas.',
      concepts: ['Porcentaje', 'Comparar racionales', 'Problemas de parte-todo'],
      practice: 'Si un producto de $20.000 tiene 25% de descuento, ¿cuánto pagas?',
      terms: [
        { term: 'Porcentaje', meaning: 'Parte de cada 100' },
        { term: 'Racional', meaning: 'Número que puede escribirse como fracción' },
        { term: 'Descuento', meaning: 'Cantidad que se resta al precio' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Proporcionalidad directa',
      topic: 'Pensamiento variacional',
      summary: 'Identifica magnitudes directamente proporcionales y aplica regla de tres simple.',
      concepts: ['Razón', 'Proporción', 'Tablas de variación'],
      practice: 'Si 3 cuadernos cuestan $9.000, ¿cuánto cuestan 7?',
      terms: [
        { term: 'Proporción', meaning: 'Igualdad entre dos razones' },
        { term: 'Razón', meaning: 'Comparación entre dos cantidades' },
        { term: 'Constante', meaning: 'Valor que no cambia en la relación' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Volumen, media y probabilidad',
      topic: 'Métrico y aleatorio',
      summary: 'Estima volúmenes, calcula media aritmética y analiza eventos posibles.',
      concepts: ['Volumen', 'Media', 'Eventos seguros/imposibles/posibles'],
      practice: 'Con las notas 3, 4, 5, 4 calcula la media y explica qué significa.',
      terms: [
        { term: 'Media', meaning: 'Promedio de los datos' },
        { term: 'Volumen', meaning: 'Espacio que ocupa un cuerpo' },
        { term: 'Probabilidad', meaning: 'Qué tan posible es un evento' },
      ],
      source: SRC.dba,
    },
  ],
  6: [
    {
      title: 'Números enteros y operaciones',
      topic: 'Pensamiento numérico',
      summary: 'Interpreta enteros en contextos de deuda, temperatura y ubicación; opera con ellos.',
      concepts: ['Recta numérica', 'Suma y resta de enteros', 'Valor absoluto'],
      practice: 'Representa −3 + 8 en la recta y explica el resultado.',
      terms: [
        { term: 'Entero', meaning: 'Número sin parte decimal' },
        { term: 'Negativo', meaning: 'Menor que cero' },
        { term: 'Valor absoluto', meaning: 'Distancia al cero' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Álgebra introductoria',
      topic: 'Pensamiento variacional',
      summary: 'Usa letras para representar cantidades desconocidas y plantea expresiones.',
      concepts: ['Variable', 'Expresión algebraica', 'Patrones generalizados'],
      practice: 'Si un paquete cuesta n pesos, escribe el costo de 5 paquetes.',
      terms: [
        { term: 'Variable', meaning: 'Símbolo que representa un valor' },
        { term: 'Expresión', meaning: 'Combinación de números y letras' },
        { term: 'Generalizar', meaning: 'Encontrar una regla para todos los casos' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Geometría y estadística',
      topic: 'Espacial y aleatorio',
      summary: 'Clasifica triángulos y cuadriláteros; organiza datos en tablas y gráficos.',
      concepts: ['Clasificación de triángulos', 'Área de figuras', 'Diagramas circulares básicos'],
      practice: 'Clasifica 5 triángulos de tu entorno por lados y por ángulos.',
      terms: [
        { term: 'Triángulo', meaning: 'Polígono de 3 lados' },
        { term: 'Cuadrilátero', meaning: 'Polígono de 4 lados' },
        { term: 'Muestra', meaning: 'Conjunto de datos recolectados' },
      ],
      source: SRC.dba,
    },
  ],
  7: [
    {
      title: 'Números racionales y potencias',
      topic: 'Pensamiento numérico',
      summary: 'Opera con racionales y comprende potencias y raíces cuadradas sencillas.',
      concepts: ['Operaciones con fracciones', 'Potencias', 'Notación científica inicial'],
      practice: 'Calcula (2/3) + (1/6) y 3². Explica cada paso.',
      terms: [
        { term: 'Potencia', meaning: 'Multiplicar un número por sí mismo' },
        { term: 'Exponente', meaning: 'Indica las veces que se multiplica' },
        { term: 'Raíz', meaning: 'Operación inversa de la potencia' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Ecuaciones e inecuaciones simples',
      topic: 'Pensamiento variacional',
      summary: 'Resuelve ecuaciones lineales sencillas y representa desigualdades en la recta.',
      concepts: ['Igualdad', 'Despeje', 'Inecuación'],
      practice: 'Resuelve x − 4 = 9 y representa x > 3 en la recta.',
      terms: [
        { term: 'Ecuación', meaning: 'Igualdad con incógnita' },
        { term: 'Despejar', meaning: 'Aislar la incógnita' },
        { term: 'Inecuación', meaning: 'Desigualdad con incógnita' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Proporcionalidad y probabilidad',
      topic: 'Variacional y aleatorio',
      summary: 'Analiza proporcionalidad directa/inversa y calcula probabilidades simples.',
      concepts: ['Proporción inversa', 'Espacio muestral', 'Probabilidad clásica'],
      practice: 'Al lanzar un dado, ¿cuál es la probabilidad de obtener un número par?',
      terms: [
        { term: 'Espacio muestral', meaning: 'Todos los resultados posibles' },
        { term: 'Evento', meaning: 'Resultado o conjunto de resultados' },
        { term: 'Inversa', meaning: 'Cuando una magnitud sube y la otra baja' },
      ],
      source: SRC.dba,
    },
  ],
  8: [
    {
      title: 'Números reales y radicales',
      topic: 'Pensamiento numérico',
      summary: 'Diferencia racionales e irracionales; simplifica expresiones con radicales.',
      concepts: ['Números reales', 'Irracionales', 'Propiedades de radicales'],
      practice: 'Clasifica √9, √2 y 0,75 como racional o irracional y justifica.',
      terms: [
        { term: 'Irracional', meaning: 'No se puede escribir como fracción exacta' },
        { term: 'Radical', meaning: 'Expresión con raíz' },
        { term: 'Real', meaning: 'Racionales e irracionales juntos' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Álgebra: factorización y sistemas',
      topic: 'Pensamiento variacional',
      summary: 'Factoriza expresiones algebraicas y resuelve sistemas lineales 2×2.',
      concepts: ['Factor común', 'Diferencia de cuadrados', 'Método de sustitución/igualación'],
      practice: 'Factoriza x² − 9 y resuelve el sistema: x + y = 5 ; x − y = 1.',
      terms: [
        { term: 'Factorizar', meaning: 'Escribir como producto de factores' },
        { term: 'Sistema', meaning: 'Varias ecuaciones con las mismas variables' },
        { term: 'Solución', meaning: 'Valores que cumplen todas las ecuaciones' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Geometría analítica inicial y estadística',
      topic: 'Espacial y aleatorio',
      summary: 'Ubica puntos en el plano cartesiano y analiza medidas de tendencia central.',
      concepts: ['Plano cartesiano', 'Distancia entre puntos', 'Media, mediana y moda'],
      practice: 'Grafica A(2,3) y B(−1,4) y calcula la distancia aproximada.',
      terms: [
        { term: 'Coordenada', meaning: 'Par (x, y) que ubica un punto' },
        { term: 'Mediana', meaning: 'Valor central de datos ordenados' },
        { term: 'Moda', meaning: 'Valor que más se repite' },
      ],
      source: SRC.dba,
    },
  ],
  9: [
    {
      title: 'Funciones y relaciones',
      topic: 'Pensamiento variacional',
      summary: 'Identifica funciones, dominio, rango y representa relaciones en tablas y gráficas.',
      concepts: ['Función', 'Dominio y rango', 'Función lineal'],
      practice: 'Para y = 2x + 1 completa una tabla con x = −2, 0, 3 y grafica.',
      terms: [
        { term: 'Función', meaning: 'Relación que asigna una salida a cada entrada' },
        { term: 'Dominio', meaning: 'Valores posibles de entrada' },
        { term: 'Rango', meaning: 'Valores posibles de salida' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Sistemas de ecuaciones y desigualdades',
      topic: 'Pensamiento variacional',
      summary: 'Modela situaciones con sistemas e interpreta soluciones gráficas.',
      concepts: ['Método gráfico', 'Solución única/infinita/ninguna', 'Regiones en el plano'],
      practice: 'Grafica x + y = 4 y x − y = 0. ¿Cuál es la intersección?',
      terms: [
        { term: 'Intersección', meaning: 'Punto común a dos gráficas' },
        { term: 'Modelo', meaning: 'Representación matemática de una situación' },
        { term: 'Par ordenado', meaning: 'Solución (x, y)' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Probabilidad y combinatoria básica',
      topic: 'Pensamiento aleatorio',
      summary: 'Cuenta posibilidades con diagramas de árbol y calcula probabilidades compuestas simples.',
      concepts: ['Diagrama de árbol', 'Principio multiplicativo', 'Eventos independientes'],
      practice: 'Con 3 camisetas y 2 pantalones, ¿cuántos outfits distintos hay?',
      terms: [
        { term: 'Combinatoria', meaning: 'Conteo de posibilidades' },
        { term: 'Independiente', meaning: 'Un evento no afecta al otro' },
        { term: 'Árbol', meaning: 'Diagrama de opciones por etapas' },
      ],
      source: SRC.dba,
    },
  ],
  10: [
    {
      title: 'Funciones trigonométricas',
      topic: 'Pensamiento espacial y métrico',
      summary: 'Relaciona seno, coseno y tangente en triángulos rectángulos y resuelve problemas.',
      concepts: ['Razones trigonométricas', 'Teorema de Pitágoras', 'Ángulos de elevación'],
      practice: 'En un triángulo 3-4-5, calcula sen, cos y tan del ángulo opuesto al 3.',
      terms: [
        { term: 'Seno', meaning: 'Cateto opuesto / hipotenusa' },
        { term: 'Coseno', meaning: 'Cateto adyacente / hipotenusa' },
        { term: 'Tangente', meaning: 'Cateto opuesto / cateto adyacente' },
      ],
      source: SRC.ebc,
    },
    {
      title: 'Funciones polinómicas y racionales',
      topic: 'Pensamiento variacional',
      summary: 'Analiza comportamiento de funciones cuadráticas y racionales simples.',
      concepts: ['Parábola', 'Vértice', 'Asíntotas básicas'],
      practice: 'Para y = x² − 4x + 3 halla el vértice y los cortes con el eje x.',
      terms: [
        { term: 'Parábola', meaning: 'Gráfica de una función cuadrática' },
        { term: 'Vértice', meaning: 'Punto máximo o mínimo de la parábola' },
        { term: 'Raíz', meaning: 'Valor donde la función vale cero' },
      ],
      source: SRC.ebc,
    },
    {
      title: 'Estadística inferencial introductoria',
      topic: 'Pensamiento aleatorio',
      summary: 'Interpreta muestras, medidas de dispersión y gráficos estadísticos.',
      concepts: ['Desviación', 'Muestra vs población', 'Interpretación crítica de datos'],
      practice: 'Explica por qué una muestra pequeña puede no representar a toda la población.',
      terms: [
        { term: 'Población', meaning: 'Conjunto total de interés' },
        { term: 'Muestra', meaning: 'Parte seleccionada de la población' },
        { term: 'Dispersión', meaning: 'Qué tanto se alejan los datos del centro' },
      ],
      source: SRC.ebc,
    },
  ],
  11: [
    {
      title: 'Límites y nociones de cálculo',
      topic: 'Pensamiento variacional',
      summary: 'Introduce la idea de límite, tasa de variación y pendiente de la tangente.',
      concepts: ['Límite intuitivo', 'Derivada como tasa', 'Aplicaciones de variación'],
      practice: 'Explica qué pasa con (x² − 1)/(x − 1) cuando x se acerca a 1.',
      terms: [
        { term: 'Límite', meaning: 'Valor al que se acerca una función' },
        { term: 'Derivada', meaning: 'Tasa de cambio instantánea' },
        { term: 'Tangente', meaning: 'Recta que toca la curva en un punto' },
      ],
      source: SRC.ebc,
    },
    {
      title: 'Modelación matemática',
      topic: 'Resolución de problemas',
      summary: 'Modela situaciones reales con funciones y evalúa la pertinencia del modelo.',
      concepts: ['Modelar', 'Validar', 'Comunicar resultados'],
      practice: 'Propón un modelo lineal o cuadrático para el crecimiento de una planta en 4 semanas.',
      terms: [
        { term: 'Modelo', meaning: 'Representación simplificada de la realidad' },
        { term: 'Validar', meaning: 'Comprobar si el modelo sirve' },
        { term: 'Parámetro', meaning: 'Constante que ajusta el modelo' },
      ],
      source: SRC.ebc,
    },
    {
      title: 'Probabilidad avanzada y decisión',
      topic: 'Pensamiento aleatorio',
      summary: 'Usa probabilidad condicional y analiza decisiones con incertidumbre.',
      concepts: ['Probabilidad condicional', 'Tablas de contingencia', 'Riesgo'],
      practice: 'Con una tabla de datos, calcula la probabilidad de un evento dado otro.',
      terms: [
        { term: 'Condicional', meaning: 'Probabilidad dado que ocurrió algo' },
        { term: 'Riesgo', meaning: 'Posibilidad de un resultado no deseado' },
        { term: 'Decisión', meaning: 'Elección informada con datos' },
      ],
      source: SRC.ebc,
    },
  ],
}

const SPANISH_BY_GRADE: Record<StudentGrade, LessonSeed[]> = {
  0: [
    {
      title: 'Comunicadores activos',
      topic: 'Comunicación oral',
      summary: 'Expresa ideas, sentimientos y emociones; escucha a otros en juegos y rutinas.',
      concepts: ['Turnos de habla', 'Vocabulario cotidiano', 'Gestos y palabras'],
      practice: 'Cuenta a alguien qué hiciste hoy en 4 oraciones cortas.',
      terms: [
        { term: 'Escuchar', meaning: 'Prestar atención a lo que dicen' },
        { term: 'Expresar', meaning: 'Decir lo que sientes o piensas' },
        { term: 'Turno', meaning: 'Momento de hablar respetando a otros' },
      ],
      source: SRC.trans,
    },
    {
      title: 'Literatura y juego con palabras',
      topic: 'Literatura',
      summary: 'Disfruta cuentos, canciones, retahílas y rimas de la tradición oral.',
      concepts: ['Cuento', 'Rima', 'Imaginación'],
      practice: 'Aprende una retahíla o canción corta y repítela en voz alta.',
      terms: [
        { term: 'Cuento', meaning: 'Historia breve' },
        { term: 'Rima', meaning: 'Sonidos parecidos al final' },
        { term: 'Personaje', meaning: 'Quién actúa en la historia' },
      ],
      source: SRC.trans,
    },
    {
      title: 'Exploración de la escritura',
      topic: 'Escritura emergente',
      summary: 'Explora trazos, dibujos y primeras letras para comunicar mensajes.',
      concepts: ['Trazos', 'Nombre propio', 'Dibujo como texto'],
      practice: 'Escribe o dibuja tu nombre y el de un familiar.',
      terms: [
        { term: 'Letra', meaning: 'Símbolo del alfabeto' },
        { term: 'Nombre', meaning: 'Palabra que te identifica' },
        { term: 'Mensaje', meaning: 'Lo que quieres comunicar' },
      ],
      source: SRC.trans,
    },
  ],
  1: [
    {
      title: 'Medios y mensajes del entorno',
      topic: 'Comunicación',
      summary: 'Identifica radio, TV, afiches e internet como formas de informarse y participar.',
      concepts: ['Medios de comunicación', 'Mensaje', 'Propósito'],
      practice: 'Elige un comercial o afiche y di qué quiere comunicar.',
      terms: [
        { term: 'Medio', meaning: 'Canal para informar (radio, TV…)' },
        { term: 'Mensaje', meaning: 'Información que se transmite' },
        { term: 'Audiencia', meaning: 'A quién va dirigido' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Lectura de palabras e imágenes',
      topic: 'Comprensión lectora',
      summary: 'Interpreta textos cortos apoyándose en imágenes y palabras sencillas.',
      concepts: ['Relación texto-imagen', 'Palabras frecuentes', 'Propósito del texto'],
      practice: 'Lee un cuento corto y explica qué pasó con ayuda de las ilustraciones.',
      terms: [
        { term: 'Ilustración', meaning: 'Imagen que acompaña el texto' },
        { term: 'Título', meaning: 'Nombre del texto' },
        { term: 'Comprender', meaning: 'Entender el sentido' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Escritura de palabras y textos cortos',
      topic: 'Producción escrita',
      summary: 'Escribe palabras y oraciones simples para comunicar ideas y peticiones.',
      concepts: ['Correspondencia sonido-letra', 'Oración simple', 'Listas de palabras'],
      practice: 'Escribe una invitación corta a un amigo (lugar, día y hora).',
      terms: [
        { term: 'Oración', meaning: 'Idea completa con sentido' },
        { term: 'Palabra', meaning: 'Unidad con significado' },
        { term: 'Grafema', meaning: 'Letra o letras de un sonido' },
      ],
      source: SRC.dba,
    },
  ],
  2: [
    {
      title: 'Comprensión de textos narrativos',
      topic: 'Lectura',
      summary: 'Identifica personajes, lugares y acciones en cuentos y relatos cortos.',
      concepts: ['Personaje', 'Escenario', 'Secuencia de eventos'],
      practice: 'Resume un cuento en inicio, nudo y desenlace.',
      terms: [
        { term: 'Narración', meaning: 'Texto que cuenta hechos' },
        { term: 'Secuencia', meaning: 'Orden de los acontecimientos' },
        { term: 'Desenlace', meaning: 'Cómo termina la historia' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Tradición oral y poesía infantil',
      topic: 'Literatura',
      summary: 'Disfruta adivinanzas, retahílas y poemas; reconoce juegos de sonido.',
      concepts: ['Rima', 'Repetición', 'Creatividad verbal'],
      practice: 'Inventa una adivinanza de 3 versos sobre un objeto del salón.',
      terms: [
        { term: 'Adivinanza', meaning: 'Acertijo en verso o prosa' },
        { term: 'Verso', meaning: 'Cada línea de un poema' },
        { term: 'Oralidad', meaning: 'Comunicación hablada' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Producción de textos descriptivos',
      topic: 'Escritura',
      summary: 'Describe personas, animales u objetos con adjetivos y orden claro.',
      concepts: ['Descripción', 'Adjetivos', 'Organización de ideas'],
      practice: 'Describe tu mascota o un animal favorito en 5 oraciones.',
      terms: [
        { term: 'Describir', meaning: 'Explicar cómo es algo' },
        { term: 'Adjetivo', meaning: 'Palabra que califica al sustantivo' },
        { term: 'Sustantivo', meaning: 'Nombre de persona, animal o cosa' },
      ],
      source: SRC.dba,
    },
  ],
  3: [
    {
      title: 'Tipos de texto y propósitos',
      topic: 'Lectura',
      summary: 'Distingue textos narrativos, instructivos e informativos según su propósito.',
      concepts: ['Propósito comunicativo', 'Estructura', 'Palabras clave'],
      practice: 'Clasifica: receta, noticia y cuento. Justifica cada elección.',
      terms: [
        { term: 'Instructivo', meaning: 'Indica pasos a seguir' },
        { term: 'Informativo', meaning: 'Da datos o noticias' },
        { term: 'Propósito', meaning: 'Para qué se escribió el texto' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Ortografía y acentuación básica',
      topic: 'Sistema de la lengua',
      summary: 'Aplica mayúsculas, punto y reglas iniciales de tilde en palabras frecuentes.',
      concepts: ['Mayúsculas', 'Punto', 'Agudas y graves frecuentes'],
      practice: 'Corrige: "ayer maria fue a bogota con su mama"',
      terms: [
        { term: 'Tilde', meaning: 'Signo de acentuación (´)' },
        { term: 'Aguda', meaning: 'Acento en la última sílaba' },
        { term: 'Grave', meaning: 'Acento en la penúltima sílaba' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Exposición oral',
      topic: 'Comunicación oral',
      summary: 'Presenta un tema corto con claridad, volumen adecuado y respeto de turnos.',
      concepts: ['Ideas principales', 'Apoyo visual', 'Escucha activa'],
      practice: 'Prepara una exposición de 1 minuto sobre tu libro favorito.',
      terms: [
        { term: 'Exponer', meaning: 'Explicar un tema ante otros' },
        { term: 'Idea principal', meaning: 'Lo más importante del mensaje' },
        { term: 'Argumento', meaning: 'Razón que apoya una idea' },
      ],
      source: SRC.dba,
    },
  ],
  4: [
    {
      title: 'Inferencias en la lectura',
      topic: 'Comprensión lectora',
      summary: 'Saca conclusiones a partir de pistas del texto y del contexto.',
      concepts: ['Inferencia', 'Pistas textuales', 'Predicción'],
      practice: 'Lee un párrafo sin final y predice qué pasará; justifica con pistas.',
      terms: [
        { term: 'Inferir', meaning: 'Concluir con base en pistas' },
        { term: 'Contexto', meaning: 'Situación alrededor del texto' },
        { term: 'Evidencia', meaning: 'Prueba tomada del texto' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Párrafo y conectores',
      topic: 'Escritura',
      summary: 'Escribe párrafos coherentes usando conectores de adición, causa y contraste.',
      concepts: ['Idea principal', 'Conectores', 'Coherencia'],
      practice: 'Escribe un párrafo de 5 oraciones sobre el recreo usando además, porque y pero.',
      terms: [
        { term: 'Párrafo', meaning: 'Conjunto de oraciones sobre una idea' },
        { term: 'Conector', meaning: 'Palabra que une ideas' },
        { term: 'Coherencia', meaning: 'Que el texto tenga sentido global' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Medios y publicidad',
      topic: 'Medios de comunicación',
      summary: 'Analiza anuncios: a quién van dirigidos y qué estrategias usan.',
      concepts: ['Publicidad', 'Emisor y receptor', 'Estrategias persuasivas'],
      practice: 'Elige un anuncio y explica qué emoción busca provocar.',
      terms: [
        { term: 'Persuadir', meaning: 'Convencer a alguien' },
        { term: 'Emisor', meaning: 'Quien produce el mensaje' },
        { term: 'Eslogan', meaning: 'Frase corta publicitaria' },
      ],
      source: SRC.dba,
    },
  ],
  5: [
    {
      title: 'Textos explicativos',
      topic: 'Lectura y escritura',
      summary: 'Comprende y produce textos que explican un fenómeno o proceso.',
      concepts: ['Explicación', 'Causa-efecto', 'Vocabulario técnico sencillo'],
      practice: 'Explica por escrito cómo se forma la lluvia en 6–8 oraciones.',
      terms: [
        { term: 'Explicar', meaning: 'Hacer entender un proceso o idea' },
        { term: 'Causa', meaning: 'Por qué ocurre algo' },
        { term: 'Efecto', meaning: 'Qué resulta de una causa' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Figuras literarias iniciales',
      topic: 'Literatura',
      summary: 'Reconoce símil, metáfora e hipérbole en poemas y relatos.',
      concepts: ['Símil', 'Metáfora', 'Sentido figurado'],
      practice: 'Crea una metáfora sobre la noche y un símil sobre el viento.',
      terms: [
        { term: 'Metáfora', meaning: 'Comparación implícita' },
        { term: 'Símil', meaning: 'Comparación con "como"' },
        { term: 'Hipérbole', meaning: 'Exageración intencional' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Debate respetuoso',
      topic: 'Oralidad',
      summary: 'Defiende una opinión con razones y respeta turnos e ideas contrarias.',
      concepts: ['Opinión vs hecho', 'Argumento', 'Contraargumento'],
      practice: 'Prepara 2 razones a favor y 1 en contra de usar celular en clase.',
      terms: [
        { term: 'Hecho', meaning: 'Información comprobable' },
        { term: 'Opinión', meaning: 'Punto de vista personal' },
        { term: 'Debate', meaning: 'Intercambio argumentado de ideas' },
      ],
      source: SRC.dba,
    },
  ],
  6: [
    {
      title: 'Estructura narrativa',
      topic: 'Literatura',
      summary: 'Analiza trama, narrador y conflicto en cuentos y novelas cortas.',
      concepts: ['Narrador', 'Conflicto', 'Punto de vista'],
      practice: 'Identifica el narrador y el conflicto central de un cuento leído en clase.',
      terms: [
        { term: 'Narrador', meaning: 'Voz que cuenta la historia' },
        { term: 'Conflicto', meaning: 'Problema que mueve la trama' },
        { term: 'Trama', meaning: 'Organización de los hechos' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Textos argumentativos cortos',
      topic: 'Escritura',
      summary: 'Escribe un texto con tesis, argumentos y conclusión.',
      concepts: ['Tesis', 'Argumentos', 'Ejemplos'],
      practice: 'Escribe 120 palabras defendiendo la lectura diaria en casa.',
      terms: [
        { term: 'Tesis', meaning: 'Idea que se defiende' },
        { term: 'Argumento', meaning: 'Razón que apoya la tesis' },
        { term: 'Conclusión', meaning: 'Cierre que retoma la idea' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Variedades del español',
      topic: 'Sistema de la lengua',
      summary: 'Reconoce diferencias regionales y registros formales/informales.',
      concepts: ['Registro', 'Variedad dialectal', 'Contexto de uso'],
      practice: 'Escribe el mismo mensaje en registro formal e informal.',
      terms: [
        { term: 'Registro', meaning: 'Nivel de formalidad del lenguaje' },
        { term: 'Dialecto', meaning: 'Variedad regional de la lengua' },
        { term: 'Norma', meaning: 'Uso convencional aceptado' },
      ],
      source: SRC.dba,
    },
  ],
  7: [
    {
      title: 'Comprensión crítica de medios',
      topic: 'Medios',
      summary: 'Analiza sesgos, fuentes e intención en noticias y redes.',
      concepts: ['Fuente', 'Sesgo', 'Verificación'],
      practice: 'Compara dos noticias del mismo hecho y señala diferencias de enfoque.',
      terms: [
        { term: 'Sesgo', meaning: 'Inclinación que distorsiona la información' },
        { term: 'Fuente', meaning: 'Origen de la información' },
        { term: 'Verificar', meaning: 'Comprobar si es cierto' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Géneros literarios',
      topic: 'Literatura',
      summary: 'Diferencia lírico, narrativo y dramático con ejemplos.',
      concepts: ['Lírica', 'Narrativa', 'Drama'],
      practice: 'Clasifica: soneto, cuento y obra de teatro. Justifica.',
      terms: [
        { term: 'Lírico', meaning: 'Expresa sentimientos (poesía)' },
        { term: 'Dramático', meaning: 'Texto para representar' },
        { term: 'Género', meaning: 'Categoría literaria' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Cohesión y corrección textual',
      topic: 'Escritura',
      summary: 'Revisa concordancia, puntuación y cohesión en textos propios.',
      concepts: ['Revisión', 'Concordancia', 'Puntuación'],
      practice: 'Reescribe un párrafo tuyo corrigiendo 5 errores de forma.',
      terms: [
        { term: 'Cohesión', meaning: 'Conexión entre oraciones' },
        { term: 'Concordancia', meaning: 'Acuerdo de género y número' },
        { term: 'Revisión', meaning: 'Mejora del texto borrador' },
      ],
      source: SRC.dba,
    },
  ],
  8: [
    {
      title: 'Análisis de textos argumentativos',
      topic: 'Comprensión',
      summary: 'Identifica tesis, argumentos, contraargumentos y estrategias persuasivas.',
      concepts: ['Estructura argumentativa', 'Falacias simples', 'Evidencias'],
      practice: 'Subraya la tesis y 2 argumentos de un artículo de opinión.',
      terms: [
        { term: 'Falacia', meaning: 'Argumento engañoso' },
        { term: 'Evidencia', meaning: 'Dato que sostiene un argumento' },
        { term: 'Refutación', meaning: 'Respuesta a un contraargumento' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Literatura latinoamericana',
      topic: 'Literatura',
      summary: 'Lee relatos y poemas latinoamericanos reconociendo contexto cultural.',
      concepts: ['Contexto histórico', 'Tema', 'Estilo'],
      practice: 'Elige un cuento latinoamericano y explica su tema central en un párrafo.',
      terms: [
        { term: 'Contexto', meaning: 'Circunstancias de la obra' },
        { term: 'Tema', meaning: 'Idea central' },
        { term: 'Estilo', meaning: 'Manera particular de escribir' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Producción de ensayo breve',
      topic: 'Escritura',
      summary: 'Escribe un ensayo corto con introducción, desarrollo y cierre.',
      concepts: ['Planteamiento', 'Desarrollo', 'Cierre reflexivo'],
      practice: 'Escribe un ensayo de 150–200 palabras sobre el uso de la IA en el estudio.',
      terms: [
        { term: 'Ensayo', meaning: 'Texto reflexivo que desarrolla una idea' },
        { term: 'Introducción', meaning: 'Presenta el tema' },
        { term: 'Desarrollo', meaning: 'Amplía argumentos y ejemplos' },
      ],
      source: SRC.dba,
    },
  ],
  9: [
    {
      title: 'Intertextualidad y géneros híbridos',
      topic: 'Literatura y medios',
      summary: 'Reconoce relaciones entre textos, adaptaciones y formatos multimodales.',
      concepts: ['Intertextualidad', 'Adaptación', 'Multimodalidad'],
      practice: 'Compara un cuento y su versión en cortometraje: ¿qué cambia y por qué?',
      terms: [
        { term: 'Intertextualidad', meaning: 'Relación entre textos' },
        { term: 'Multimodal', meaning: 'Combina imagen, sonido y escritura' },
        { term: 'Adaptación', meaning: 'Versión en otro formato' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Discurso oral formal',
      topic: 'Oralidad',
      summary: 'Prepara intervenciones orales formales con estructura y lenguaje adecuado.',
      concepts: ['Discurso', 'Conectores orales', 'Lenguaje no verbal'],
      practice: 'Grábate 2 minutos presentando una propuesta para mejorar tu colegio.',
      terms: [
        { term: 'Discurso', meaning: 'Exposición oral estructurada' },
        { term: 'Muletilla', meaning: 'Palabra repetida sin necesidad' },
        { term: 'Prosodia', meaning: 'Ritmo y entonación al hablar' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Gramática para la escritura',
      topic: 'Sistema de la lengua',
      summary: 'Usa subordinación, cohesión léxica y puntuación avanzada en textos propios.',
      concepts: ['Oración compuesta', 'Pronombres', 'Puntuación'],
      practice: 'Une 4 oraciones simples en 2 compuestas sin perder claridad.',
      terms: [
        { term: 'Subordinada', meaning: 'Oración que depende de otra' },
        { term: 'Cohesión léxica', meaning: 'Repetición/sinónimos que unen el texto' },
        { term: 'Claridad', meaning: 'Facilidad para entender el mensaje' },
      ],
      source: SRC.dba,
    },
  ],
  10: [
    {
      title: 'Literatura universal y contexto',
      topic: 'Literatura',
      summary: 'Analiza obras representativas relacionando forma, tema y contexto histórico.',
      concepts: ['Movimientos literarios', 'Símbolos', 'Crítica literaria básica'],
      practice: 'Elige un poema o fragmento y analiza un símbolo recurrente.',
      terms: [
        { term: 'Símbolo', meaning: 'Elemento que representa otra idea' },
        { term: 'Canon', meaning: 'Obras consideradas representativas' },
        { term: 'Crítica', meaning: 'Análisis fundamentado de una obra' },
      ],
      source: SRC.ebc,
    },
    {
      title: 'Argumentación académica',
      topic: 'Escritura',
      summary: 'Produce textos académicos con citas, coherencia y postura crítica.',
      concepts: ['Citar', 'Postura', 'Contraargumentación'],
      practice: 'Escribe un texto de 200 palabras citando una fuente confiable (formato simple).',
      terms: [
        { term: 'Cita', meaning: 'Palabras tomadas de otra fuente' },
        { term: 'Plagio', meaning: 'Usar ideas ajenas sin reconocerlas' },
        { term: 'Postura', meaning: 'Posición que se asume frente al tema' },
      ],
      source: SRC.ebc,
    },
    {
      title: 'Semiótica de la imagen',
      topic: 'Otros sistemas simbólicos',
      summary: 'Interpreta imágenes, memes e infografías como textos culturales.',
      concepts: ['Significante/significado', 'Retórica visual', 'Intención'],
      practice: 'Analiza una infografía: qué informa, qué omite y a quién convence.',
      terms: [
        { term: 'Semiótica', meaning: 'Estudio de los signos' },
        { term: 'Infografía', meaning: 'Información visual organizada' },
        { term: 'Retórica visual', meaning: 'Estrategias persuasivas de la imagen' },
      ],
      source: SRC.ebc,
    },
  ],
  11: [
    {
      title: 'Ensayo crítico',
      topic: 'Producción escrita',
      summary: 'Elabora un ensayo crítico con tesis sólida, evidencias y estilo formal.',
      concepts: ['Tesis compleja', 'Marco teórico breve', 'Conclusión crítica'],
      practice: 'Escribe un ensayo de 250–300 palabras sobre ciudadanía digital.',
      terms: [
        { term: 'Ensayo crítico', meaning: 'Texto que evalúa y toma postura' },
        { term: 'Marco', meaning: 'Ideas de referencia para analizar' },
        { term: 'Implicación', meaning: 'Consecuencia de una idea' },
      ],
      source: SRC.ebc,
    },
    {
      title: 'Literatura colombiana contemporánea',
      topic: 'Literatura',
      summary: 'Lee autores colombianos contemporáneos y relaciona obra, sociedad e identidad.',
      concepts: ['Identidad', 'Memoria', 'Voces regionales'],
      practice: 'Elige un cuento o poema colombiano y relaciona un tema con tu contexto.',
      terms: [
        { term: 'Memoria', meaning: 'Recuerdo colectivo o personal' },
        { term: 'Identidad', meaning: 'Cómo se define un sujeto o comunidad' },
        { term: 'Contemporáneo', meaning: 'De la época actual' },
      ],
      source: SRC.ebc,
    },
    {
      title: 'Comunicación para la ciudadanía',
      topic: 'Comunicación',
      summary: 'Produce mensajes éticos para participar en debates públicos escolares o locales.',
      concepts: ['Ética comunicativa', 'Participación', 'Responsabilidad'],
      practice: 'Redacta una carta abierta de 150 palabras sobre un problema de tu comunidad.',
      terms: [
        { term: 'Ciudadanía', meaning: 'Participación responsable en lo público' },
        { term: 'Ética', meaning: 'Criterios de lo correcto en la comunicación' },
        { term: 'Carta abierta', meaning: 'Texto público dirigido a una audiencia' },
      ],
      source: SRC.ebc,
    },
  ],
}

const SCIENCE_BY_GRADE: Record<StudentGrade, LessonSeed[]> = {
  0: [
    {
      title: 'Exploro mi entorno',
      topic: 'Exploración del medio',
      summary: 'Observa seres vivos, objetos y fenómenos cotidianos con curiosidad y cuidado.',
      concepts: ['Observar', 'Preguntar', 'Cuidar el entorno'],
      practice: 'Observa una planta 3 días y dibuja lo que cambia.',
      terms: [
        { term: 'Observar', meaning: 'Mirar con atención' },
        { term: 'Entorno', meaning: 'Lo que te rodea' },
        { term: 'Cuidado', meaning: 'Acciones para proteger' },
      ],
      source: SRC.trans,
    },
    {
      title: 'Mi cuerpo y mis sentidos',
      topic: 'Cuerpo humano',
      summary: 'Reconoce partes del cuerpo y usa los sentidos para explorar el mundo.',
      concepts: ['Sentidos', 'Cuidado personal', 'Diferencias y similitudes'],
      practice: 'Nombra 5 partes del cuerpo y un sentido que usas para cada exploración.',
      terms: [
        { term: 'Sentido', meaning: 'Vista, oído, olfato, gusto, tacto' },
        { term: 'Cuerpo', meaning: 'Organismo humano' },
        { term: 'Higiene', meaning: 'Hábitos para la salud' },
      ],
      source: SRC.trans,
    },
    {
      title: 'Seres vivos y no vivos',
      topic: 'Entorno vivo',
      summary: 'Diferencia seres vivos de objetos inertes por características observables.',
      concepts: ['Nacer y crecer', 'Alimentarse', 'Objetos inertes'],
      practice: 'Haz dos listas: 5 seres vivos y 5 objetos no vivos de tu casa.',
      terms: [
        { term: 'Ser vivo', meaning: 'Nace, crece, se alimenta…' },
        { term: 'Inerte', meaning: 'Sin vida' },
        { term: 'Característica', meaning: 'Rasgo que permite identificar' },
      ],
      source: SRC.trans,
    },
  ],
  1: [
    {
      title: 'Los sentidos y los materiales',
      topic: 'Entorno físico',
      summary: 'Usa los sentidos para describir objetos y clasifica materiales por sus propiedades.',
      concepts: ['Propiedades sensoriales', 'Usos de materiales', 'Clasificación'],
      practice: 'Clasifica 8 objetos en duro/blando y flexible/rígido.',
      terms: [
        { term: 'Material', meaning: 'Sustancia de la que está hecho un objeto' },
        { term: 'Propiedad', meaning: 'Característica de un material' },
        { term: 'Textura', meaning: 'Cómo se siente al tacto' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Plantas y animales',
      topic: 'Entorno vivo',
      summary: 'Reconoce características comunes de seres vivos y los diferencia de lo inerte.',
      concepts: ['Partes de la planta', 'Ciclo de vida', 'Cuidado de seres vivos'],
      practice: 'Dibuja una planta y señala raíz, tallo y hojas.',
      terms: [
        { term: 'Raíz', meaning: 'Parte que fija y absorbe' },
        { term: 'Ciclo de vida', meaning: 'Etapas de desarrollo' },
        { term: 'Hábitat', meaning: 'Lugar donde vive un organismo' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Mi cuerpo cambia',
      topic: 'Cuerpo humano',
      summary: 'Reconoce cambios del crecimiento y similitudes/diferencias con otros.',
      concepts: ['Crecimiento', 'Rasgos heredados', 'Cuidado de la salud'],
      practice: 'Compara tu estatura actual con una foto antigua y describe 2 cambios.',
      terms: [
        { term: 'Crecimiento', meaning: 'Aumento de tamaño con el tiempo' },
        { term: 'Herencia', meaning: 'Rasgos que vienen de la familia' },
        { term: 'Salud', meaning: 'Estado de bienestar del cuerpo' },
      ],
      source: SRC.dba,
    },
  ],
  2: [
    {
      title: 'Estados de la materia',
      topic: 'Entorno físico',
      summary: 'Comprende sólido, líquido y gas con ejemplos del entorno.',
      concepts: ['Forma y volumen', 'Aire como material', 'Cambios observables'],
      practice: 'Clasifica: hielo, jugo y vapor de una olla. Justifica.',
      terms: [
        { term: 'Sólido', meaning: 'Forma y volumen fijos' },
        { term: 'Líquido', meaning: 'Volumen fijo, forma variable' },
        { term: 'Gas', meaning: 'Sin forma ni volumen fijos' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Fuerzas y deformaciones',
      topic: 'Entorno físico',
      summary: 'Explora cómo empujar, estirar o comprimir cambia objetos según el material.',
      concepts: ['Fuerza', 'Deformación', 'Resistencia de materiales'],
      practice: 'Prueba estirar plastilina, papel y una liga. ¿Cuál se deforma más?',
      terms: [
        { term: 'Fuerza', meaning: 'Acción de empujar o jalar' },
        { term: 'Deformar', meaning: 'Cambiar la forma' },
        { term: 'Resistencia', meaning: 'Qué tanto se opone a deformarse' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Seres vivos y su ambiente',
      topic: 'Entorno vivo',
      summary: 'Relaciona características de plantas y animales con el lugar donde viven.',
      concepts: ['Necesidades básicas', 'Adaptaciones observables', 'Ciclos de vida'],
      practice: 'Elige un animal y explica 2 características que le ayudan a vivir donde vive.',
      terms: [
        { term: 'Adaptación', meaning: 'Característica que ayuda a sobrevivir' },
        { term: 'Ambiente', meaning: 'Condiciones del entorno' },
        { term: 'Nutriente', meaning: 'Sustancia necesaria para vivir' },
      ],
      source: SRC.dba,
    },
  ],
  3: [
    {
      title: 'Luz y sombra',
      topic: 'Entorno físico',
      summary: 'Comprende cómo se propaga la luz y cómo se forman las sombras.',
      concepts: ['Materiales opacos/transparentes', 'Propagación en línea recta', 'Tamaño de la sombra'],
      practice: 'Con una linterna, cambia la distancia al objeto y observa la sombra.',
      terms: [
        { term: 'Opaco', meaning: 'No deja pasar la luz' },
        { term: 'Transparente', meaning: 'Deja pasar la luz' },
        { term: 'Sombra', meaning: 'Zona sin luz por un objeto interpuesto' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Sonido',
      topic: 'Entorno físico',
      summary: 'Reconoce el sonido como vibración y compara altura e intensidad.',
      concepts: ['Vibración', 'Grave/agudo', 'Propagación en distintos medios'],
      practice: 'Produce sonido con una regla o vaso y describe si es fuerte/débil y grave/agudo.',
      terms: [
        { term: 'Vibración', meaning: 'Movimiento rápido de ida y vuelta' },
        { term: 'Intensidad', meaning: 'Qué tan fuerte es el sonido' },
        { term: 'Altura', meaning: 'Grave o agudo' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Factores bióticos y abióticos',
      topic: 'Entorno vivo',
      summary: 'Explica cómo luz, agua, suelo y aire influyen en plantas y animales.',
      concepts: ['Biótico/abiótico', 'Ecosistema local', 'Alteraciones del entorno'],
      practice: 'Dibuja un ecosistema cercano y etiqueta 3 factores bióticos y 3 abióticos.',
      terms: [
        { term: 'Biótico', meaning: 'Relacionado con seres vivos' },
        { term: 'Abiótico', meaning: 'Factores no vivos (luz, agua…)' },
        { term: 'Ecosistema', meaning: 'Seres vivos + ambiente' },
      ],
      source: SRC.dba,
    },
  ],
  4: [
    {
      title: 'Cambios de estado del agua',
      topic: 'Entorno físico',
      summary: 'Relaciona temperatura con evaporación, condensación y congelación.',
      concepts: ['Temperatura', 'Cambios de estado', 'Medición'],
      practice: 'Explica por qué se empañan los vidrios de un baño caliente.',
      terms: [
        { term: 'Evaporación', meaning: 'Líquido a gas' },
        { term: 'Condensación', meaning: 'Gas a líquido' },
        { term: 'Fusión', meaning: 'Sólido a líquido' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Cadenas alimenticias',
      topic: 'Entorno vivo',
      summary: 'Representa flujos de energía entre productores y consumidores.',
      concepts: ['Productor', 'Consumidor', 'Descomponedor'],
      practice: 'Construye una cadena de 4 eslabones de tu región.',
      terms: [
        { term: 'Productor', meaning: 'Organismo que produce su alimento (plantas)' },
        { term: 'Consumidor', meaning: 'Se alimenta de otros seres vivos' },
        { term: 'Descomponedor', meaning: 'Degrada materia orgánica' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Sistema digestivo',
      topic: 'Cuerpo humano',
      summary: 'Explica el recorrido del alimento y hábitos de alimentación saludable.',
      concepts: ['Órganos digestivos', 'Nutrientes', 'Hábitos saludables'],
      practice: 'Ordena: masticar → tragar → digerir → absorber. Explica cada paso.',
      terms: [
        { term: 'Digestión', meaning: 'Transformación del alimento' },
        { term: 'Absorción', meaning: 'Paso de nutrientes al organismo' },
        { term: 'Nutriente', meaning: 'Sustancia útil para el cuerpo' },
      ],
      source: SRC.dba,
    },
  ],
  5: [
    {
      title: 'Fuerza, movimiento y máquinas simples',
      topic: 'Entorno físico',
      summary: 'Relaciona fuerzas con movimiento y reconoce palancas y poleas en la vida diaria.',
      concepts: ['Fuerza y movimiento', 'Fricción', 'Máquinas simples'],
      practice: 'Identifica 3 máquinas simples en tu casa y explica qué fuerza facilitan.',
      terms: [
        { term: 'Fricción', meaning: 'Fuerza que se opone al deslizamiento' },
        { term: 'Palanca', meaning: 'Barra que gira sobre un punto de apoyo' },
        { term: 'Polea', meaning: 'Rueda que ayuda a levantar cargas' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Celula: unidad de la vida',
      topic: 'Entorno vivo',
      summary: 'Comprende que los seres vivos están formados por células y reconoce partes básicas.',
      concepts: ['Célula', 'Microscopio', 'Tejidos'],
      practice: 'Compara en una tabla célula animal y vegetal (2 diferencias).',
      terms: [
        { term: 'Célula', meaning: 'Unidad básica de la vida' },
        { term: 'Núcleo', meaning: 'Controla funciones celulares' },
        { term: 'Tejido', meaning: 'Grupo de células similares' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Recursos naturales y cuidado',
      topic: 'Ciencia, tecnología y sociedad',
      summary: 'Analiza el uso de recursos y propone acciones de cuidado ambiental.',
      concepts: ['Recurso renovable', 'Contaminación', 'Acciones sostenibles'],
      practice: 'Propón 3 acciones concretas para ahorrar agua en tu colegio.',
      terms: [
        { term: 'Recurso', meaning: 'Bien de la naturaleza usado por humanos' },
        { term: 'Sostenible', meaning: 'Uso que no agota el recurso' },
        { term: 'Contaminación', meaning: 'Daño al aire, agua o suelo' },
      ],
      source: SRC.dba,
    },
  ],
  6: [
    {
      title: 'Organización de la materia',
      topic: 'Entorno físico',
      summary: 'Introduce partículas, mezclas y separación de sustancias.',
      concepts: ['Mezcla', 'Sustancia', 'Métodos de separación'],
      practice: 'Diseña cómo separar arena y limaduras de hierro. Explica el método.',
      terms: [
        { term: 'Mezcla', meaning: 'Combinación de materiales' },
        { term: 'Filtración', meaning: 'Separar sólido de líquido con filtro' },
        { term: 'Sustancia', meaning: 'Material con propiedades definidas' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Sistemas del cuerpo humano',
      topic: 'Entorno vivo',
      summary: 'Relaciona sistemas (circulatorio, respiratorio, digestivo) y su función.',
      concepts: ['Sistemas', 'Órganos', 'Salud integral'],
      practice: 'Explica cómo se relacionan respiración y circulación al correr.',
      terms: [
        { term: 'Sistema', meaning: 'Conjunto de órganos con función común' },
        { term: 'Órgano', meaning: 'Estructura con función específica' },
        { term: 'Homeostasis', meaning: 'Equilibrio interno del cuerpo' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Energía en la vida diaria',
      topic: 'Entorno físico',
      summary: 'Identifica formas de energía y transformaciones cotidianas.',
      concepts: ['Energía cinética/potencial', 'Transformación', 'Ahorro energético'],
      practice: 'Describe 3 transformaciones de energía en tu casa (ej. plancha, bombillo).',
      terms: [
        { term: 'Energía', meaning: 'Capacidad de producir cambios' },
        { term: 'Transformación', meaning: 'Paso de una forma de energía a otra' },
        { term: 'Conservación', meaning: 'La energía no se crea ni se destruye' },
      ],
      source: SRC.dba,
    },
  ],
  7: [
    {
      title: 'Reacciones químicas cotidianas',
      topic: 'Entorno físico',
      summary: 'Diferencia cambios físicos y químicos; identifica evidencias de reacción.',
      concepts: ['Reactivo/producto', 'Indicadores de reacción', 'Seguridad en el lab'],
      practice: 'Clasifica: derretir hielo vs oxidar un clavo. Justifica.',
      terms: [
        { term: 'Reacción', meaning: 'Proceso que forma nuevas sustancias' },
        { term: 'Oxidación', meaning: 'Reacción con oxígeno (ej. óxido)' },
        { term: 'Producto', meaning: 'Sustancia obtenida' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Ecosistemas y biodiversidad',
      topic: 'Entorno vivo',
      summary: 'Analiza biodiversidad colombiana y amenazas a los ecosistemas.',
      concepts: ['Biodiversidad', 'Nicho', 'Conservación'],
      practice: 'Investiga una especie de tu región y una amenaza que enfrenta.',
      terms: [
        { term: 'Biodiversidad', meaning: 'Variedad de seres vivos' },
        { term: 'Especie', meaning: 'Grupo de organismos similares' },
        { term: 'Conservación', meaning: 'Protección de ecosistemas y especies' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Sexualidad y reproducción humana',
      topic: 'Cuerpo humano',
      summary: 'Comprende cambios de la adolescencia y reproducción con enfoque de cuidado.',
      concepts: ['Pubertad', 'Sistema reproductor', 'Cuidado y respeto'],
      practice: 'Elabora un decálogo de autocuidado y respeto en la adolescencia.',
      terms: [
        { term: 'Pubertad', meaning: 'Etapa de cambios hacia la madurez' },
        { term: 'Hormona', meaning: 'Sustancia que regula funciones' },
        { term: 'Autocuidado', meaning: 'Acciones para proteger la salud' },
      ],
      source: SRC.dba,
    },
  ],
  8: [
    {
      title: 'Tabla periódica y átomos',
      topic: 'Química',
      summary: 'Comprende estructura atómica básica y organización periódica de elementos.',
      concepts: ['Protón, neutrón, electrón', 'Elemento', 'Grupos y periodos'],
      practice: 'Ubica 5 elementos de uso cotidiano y di su símbolo.',
      terms: [
        { term: 'Átomo', meaning: 'Unidad básica de un elemento' },
        { term: 'Elemento', meaning: 'Sustancia formada por un solo tipo de átomo' },
        { term: 'Símbolo', meaning: 'Representación del elemento (O, Fe…)' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Genética mendeliana introductoria',
      topic: 'Biología',
      summary: 'Explica herencia con genes dominantes/recesivos en casos simples.',
      concepts: ['Gen', 'Alelo', 'Fenotipo/genotipo'],
      practice: 'Con un cruce simple (A/a), predice proporciones de una generación.',
      terms: [
        { term: 'Gen', meaning: 'Unidad de información hereditaria' },
        { term: 'Fenotipo', meaning: 'Rasgo observable' },
        { term: 'Genotipo', meaning: 'Composición genética' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Fuerzas y leyes de Newton',
      topic: 'Física',
      summary: 'Aplica las leyes de Newton a situaciones cotidianas de movimiento.',
      concepts: ['Inercia', 'F = m·a', 'Acción-reacción'],
      practice: 'Explica con la 1.ª ley por qué usamos cinturón de seguridad.',
      terms: [
        { term: 'Inercia', meaning: 'Tendencia a mantener el estado de movimiento' },
        { term: 'Aceleración', meaning: 'Cambio de velocidad' },
        { term: 'Masa', meaning: 'Cantidad de materia' },
      ],
      source: SRC.dba,
    },
  ],
  9: [
    {
      title: 'Estequiometría básica',
      topic: 'Química',
      summary: 'Balancea ecuaciones simples y relaciona moles con cantidades de sustancia.',
      concepts: ['Ecuación química', 'Balanceo', 'Mol'],
      practice: 'Balancea: H₂ + O₂ → H₂O y explica por qué se balancea.',
      terms: [
        { term: 'Mol', meaning: 'Cantidad de sustancia (6,022×10²³ entidades)' },
        { term: 'Balancear', meaning: 'Igualar átomos en ambos lados' },
        { term: 'Coeficiente', meaning: 'Número delante de una fórmula' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Evolución y selección natural',
      topic: 'Biología',
      summary: 'Explica variación, adaptación y selección natural con ejemplos.',
      concepts: ['Variación', 'Selección natural', 'Evidencias de evolución'],
      practice: 'Explica un ejemplo de adaptación en un animal colombiano.',
      terms: [
        { term: 'Evolución', meaning: 'Cambio de poblaciones a lo largo del tiempo' },
        { term: 'Selección natural', meaning: 'Supervivencia diferencial de rasgos' },
        { term: 'Variación', meaning: 'Diferencias entre individuos' },
      ],
      source: SRC.dba,
    },
    {
      title: 'Electricidad y circuitos',
      topic: 'Física',
      summary: 'Analiza circuitos simples: corriente, voltaje y resistencia.',
      concepts: ['Circuito serie/paralelo', 'Corriente', 'Seguridad eléctrica'],
      practice: 'Dibuja un circuito serie con pila, interruptor y bombillo. Explica el flujo.',
      terms: [
        { term: 'Corriente', meaning: 'Flujo de carga eléctrica' },
        { term: 'Voltaje', meaning: 'Diferencia de potencial' },
        { term: 'Resistencia', meaning: 'Oposición al paso de corriente' },
      ],
      source: SRC.dba,
    },
  ],
  10: [
    {
      title: 'Química orgánica introductoria',
      topic: 'Química',
      summary: 'Reconoce hidrocarburos, grupos funcionales y su presencia en la vida diaria.',
      concepts: ['Carbono', 'Hidrocarburos', 'Grupos funcionales'],
      practice: 'Investiga un compuesto orgánico de uso diario (etanol, ácido acético…) y su función.',
      terms: [
        { term: 'Orgánico', meaning: 'Compuesto basado en carbono' },
        { term: 'Hidrocarburo', meaning: 'Compuesto de C e H' },
        { term: 'Grupo funcional', meaning: 'Parte que determina propiedades químicas' },
      ],
      source: SRC.ebc,
    },
    {
      title: 'Ecología y sostenibilidad',
      topic: 'Ciencia, tecnología y sociedad',
      summary: 'Analiza problemas ambientales y propone soluciones sostenibles.',
      concepts: ['Huella ecológica', 'Cambio climático', 'Economía circular'],
      practice: 'Diseña un plan escolar de 5 acciones para reducir residuos.',
      terms: [
        { term: 'Huella ecológica', meaning: 'Impacto de nuestras actividades' },
        { term: 'Sostenibilidad', meaning: 'Desarrollo sin agotar recursos' },
        { term: 'Mitigación', meaning: 'Reducir efectos negativos' },
      ],
      source: SRC.ebc,
    },
    {
      title: 'Ondas y sonido/luz',
      topic: 'Física',
      summary: 'Comprende propiedades ondulatorias y aplicaciones tecnológicas.',
      concepts: ['Longitud de onda', 'Frecuencia', 'Espectro electromagnético básico'],
      practice: 'Relaciona frecuencia y tono de un sonido con un ejemplo musical.',
      terms: [
        { term: 'Onda', meaning: 'Perturbación que transporta energía' },
        { term: 'Frecuencia', meaning: 'Oscilaciones por segundo' },
        { term: 'Amplitud', meaning: 'Máximo desplazamiento de la onda' },
      ],
      source: SRC.ebc,
    },
  ],
  11: [
    {
      title: 'Equilibrio químico y pH',
      topic: 'Química',
      summary: 'Interpreta equilibrio, ácidos-bases y pH en contextos biológicos e industriales.',
      concepts: ['Equilibrio', 'Ácido/base', 'pH'],
      practice: 'Mide o investiga el pH de 3 sustancias caseras y clasifícalas.',
      terms: [
        { term: 'pH', meaning: 'Escala de acidez/basicidad' },
        { term: 'Ácido', meaning: 'Sustancia con pH menor a 7' },
        { term: 'Equilibrio', meaning: 'Velocidades directa e inversa iguales' },
      ],
      source: SRC.ebc,
    },
    {
      title: 'Biotecnología y bioética',
      topic: 'Biología y CTS',
      summary: 'Analiza aplicaciones biotecnológicas y dilemas éticos asociados.',
      concepts: ['ADN recombinante', 'Vacunas', 'Bioética'],
      practice: 'Elige un caso (OGM o terapia génica) y escribe pros, contras y tu postura.',
      terms: [
        { term: 'Biotecnología', meaning: 'Uso de seres vivos en procesos útiles' },
        { term: 'Bioética', meaning: 'Reflexión ética sobre biología y salud' },
        { term: 'OGM', meaning: 'Organismo genéticamente modificado' },
      ],
      source: SRC.ebc,
    },
    {
      title: 'Física moderna y sociedad',
      topic: 'Física',
      summary: 'Introduce nociones de relatividad/cuántica a nivel conceptual y su impacto tecnológico.',
      concepts: ['Energía-masa (idea)', 'Semiconductores', 'Responsabilidad científica'],
      practice: 'Investiga una tecnología (GPS, LED, resonancia) y explica qué principio físico usa.',
      terms: [
        { term: 'Cuántica', meaning: 'Física de lo muy pequeño' },
        { term: 'Semiconductor', meaning: 'Material clave en electrónica' },
        { term: 'Innovación', meaning: 'Aplicación nueva de conocimiento' },
      ],
      source: SRC.ebc,
    },
  ],
}

const BANK: Record<SchoolSubjectId, Record<StudentGrade, LessonSeed[]>> = {
  math: MATH_BY_GRADE,
  spanish: SPANISH_BY_GRADE,
  science: SCIENCE_BY_GRADE,
}

export function getSchoolSubject(id: SchoolSubjectId): SchoolSubject {
  return SCHOOL_SUBJECTS.find((s) => s.id === id) ?? SCHOOL_SUBJECTS[0]
}

export function getSubjectLessons(subjectId: SchoolSubjectId, grade: StudentGrade): SubjectLesson[] {
  const seeds = BANK[subjectId][grade] ?? BANK[subjectId][1]
  return seeds.map((seed, index) => ({
    ...seed,
    id: `${subjectId}-g${grade}-le${index + 1}`,
  }))
}

export type GradeSyllabusSection = {
  subject: SchoolSubject
  lessons: SubjectLesson[]
}

/** Temario completo del grado: todas las materias y temas a ver. */
export function getGradeSyllabus(grade: StudentGrade): GradeSyllabusSection[] {
  return SCHOOL_SUBJECTS.map((subject) => ({
    subject,
    lessons: getSubjectLessons(subject.id, grade),
  }))
}

export function countGradeTopics(grade: StudentGrade): number {
  return getGradeSyllabus(grade).reduce((sum, section) => sum + section.lessons.length, 0)
}
