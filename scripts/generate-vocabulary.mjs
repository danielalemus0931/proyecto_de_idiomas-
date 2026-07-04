import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const WORDS_PER_LESSON = 10
const LESSONS_PER_LEVEL = 6
const LEVEL_COUNT = 5

const LEVEL_ORDER = ['Principiante', 'Elemental', 'Intermedio', 'Avanzado', 'Experto']
const LEVEL_META = {
  Principiante: { difficulty: 'A1', description: 'Saludos, números y vocabulario esencial.' },
  Elemental: { difficulty: 'A2', description: 'Compras, casa, comida y rutinas.' },
  Intermedio: { difficulty: 'B1', description: 'Viajes, trabajo, salud y conversación.' },
  Avanzado: { difficulty: 'B2', description: 'Opiniones, tecnología y situaciones formales.' },
  Experto: { difficulty: 'C1', description: 'Negocios, cultura y expresiones avanzadas.' },
}

const TITLES = [
  ['Saludos básicos', 'Presentaciones', 'Números y tiempo', 'Familia', 'Colores', 'Preguntas útiles'],
  ['En la tienda', 'Comida y bebida', 'En casa', 'Ropa y cuerpo', 'Transporte', 'Clima'],
  ['Viajes', 'En el hotel', 'Salud', 'Trabajo', 'Hobbies', 'Sentimientos'],
  ['Medios y tecnología', 'Medio ambiente', 'Opiniones', 'Eventos', 'Educación', 'Comunicación'],
  ['Negocios', 'Cultura', 'Sociedad', 'Ciencia', 'Arte', 'Debate avanzado'],
]

const TOPICS = [
  ['Conversación', 'Conversación', 'Gramática', 'Familia', 'Descripción', 'Conversación'],
  ['Compras', 'Comida', 'Hogar', 'Descripción', 'Movilidad', 'Naturaleza'],
  ['Viajes', 'Viajes', 'Salud', 'Trabajo', 'Ocio', 'Emociones'],
  ['Tecnología', 'Medio ambiente', 'Opinión', 'Eventos', 'Estudios', 'Comunicación'],
  ['Negocios', 'Cultura', 'Sociedad', 'Ciencia', 'Arte', 'Debate'],
]

/** @type {Record<string, Record<string, string>>} */
const LEXICON = {
  en: {
    Hello: 'Hola', Goodbye: 'Adiós', Please: 'Por favor', Thanks: 'Gracias', Yes: 'Sí', No: 'No',
    Sorry: 'Perdón', Welcome: 'Bienvenido', Good: 'Bueno', Morning: 'Mañana', Night: 'Noche',
    Name: 'Nombre', Age: 'Edad', Country: 'País', City: 'Ciudad', Job: 'Trabajo', Student: 'Estudiante',
    Teacher: 'Profesor/a', Friend: 'Amigo/a', Language: 'Idioma', Address: 'Dirección', Phone: 'Teléfono',
    One: 'Uno', Two: 'Dos', Three: 'Tres', Four: 'Cuatro', Five: 'Cinco', Six: 'Seis', Seven: 'Siete',
    Eight: 'Ocho', Nine: 'Nueve', Ten: 'Diez', Today: 'Hoy', Tomorrow: 'Mañana', Week: 'Semana',
    Month: 'Mes', Year: 'Año', Hour: 'Hora', Minute: 'Minuto', Second: 'Segundo', Time: 'Tiempo',
    Mother: 'Madre', Father: 'Padre', Sister: 'Hermana', Brother: 'Hermano', Baby: 'Bebé', Family: 'Familia',
    Son: 'Hijo', Daughter: 'Hija', Uncle: 'Tío', Aunt: 'Tía', Cousin: 'Primo/a', Grandmother: 'Abuela',
    Grandfather: 'Abuelo', Parents: 'Padres', Children: 'Hijos', Husband: 'Esposo', Wife: 'Esposa',
    Red: 'Rojo', Blue: 'Azul', Green: 'Verde', Yellow: 'Amarillo', Black: 'Negro', White: 'Blanco',
    Pink: 'Rosa', Brown: 'Marrón', Orange: 'Naranja', Purple: 'Morado', Gray: 'Gris', Gold: 'Dorado',
    What: 'Qué', Where: 'Dónde', When: 'Cuándo', Why: 'Por qué', How: 'Cómo', Who: 'Quién',
    Which: 'Cuál', 'How much': 'Cuánto', 'How many': 'Cuántos', Always: 'Siempre', Never: 'Nunca',
    Shop: 'Tienda', Price: 'Precio', Bread: 'Pan', Water: 'Agua', House: 'Casa', Bus: 'Autobús',
    Sun: 'Sol', Rain: 'Lluvia', Market: 'Mercado', Money: 'Dinero', Cheap: 'Barato', Expensive: 'Caro',
    Coffee: 'Café', Milk: 'Leche', Sugar: 'Azúcar', Salt: 'Sal', Rice: 'Arroz', Meat: 'Carne',
    Fish: 'Pescado', Fruit: 'Fruta', Vegetable: 'Verdura', Breakfast: 'Desayuno', Lunch: 'Almuerzo',
    Dinner: 'Cena', Kitchen: 'Cocina', Bedroom: 'Dormitorio', Bathroom: 'Baño', Window: 'Ventana',
    Door: 'Puerta', Table: 'Mesa', Chair: 'Silla', Shirt: 'Camisa', Pants: 'Pantalón', Shoes: 'Zapatos',
    Hat: 'Sombrero', Body: 'Cuerpo', Head: 'Cabeza', Hand: 'Mano', Foot: 'Pie', Heart: 'Corazón',
    Train: 'Tren', Taxi: 'Taxi', Airport: 'Aeropuerto', Ticket: 'Boleto', Road: 'Carretera', Bridge: 'Puente',
    Cloud: 'Nube', Wind: 'Viento', Snow: 'Nieve', Hot: 'Caliente', Cold: 'Frío', Weather: 'Clima',
    Passport: 'Pasaporte', Hotel: 'Hotel', Doctor: 'Médico', Office: 'Oficina', Music: 'Música', Happy: 'Feliz',
    Map: 'Mapa', Luggage: 'Equipaje', Nurse: 'Enfermera', Medicine: 'Medicina', Pain: 'Dolor', Hospital: 'Hospital',
    Meeting: 'Reunión', Salary: 'Salario', Boss: 'Jefe', Team: 'Equipo', Project: 'Proyecto', Email: 'Correo',
    Guitar: 'Guitarra', Sport: 'Deporte', Book: 'Libro', Movie: 'Película', Dance: 'Baile', Game: 'Juego',
    Sad: 'Triste', Angry: 'Enojado', Love: 'Amor', Fear: 'Miedo', Hope: 'Esperanza', Joy: 'Alegría',
    Internet: 'Internet', Nature: 'Naturaleza', Think: 'Pensar', Party: 'Fiesta', University: 'Universidad',
    Message: 'Mensaje', News: 'Noticias', Computer: 'Computadora', Software: 'Software', Website: 'Sitio web',
    Pollution: 'Contaminación', Forest: 'Bosque', River: 'Río', Ocean: 'Océano', Energy: 'Energía', Climate: 'Clima',
    Opinion: 'Opinión', Agree: 'De acuerdo', Disagree: 'En desacuerdo', Perhaps: 'Quizás', Certainly: 'Ciertamente',
    Wedding: 'Boda', Festival: 'Festival', Concert: 'Concierto', Birthday: 'Cumpleaños', Holiday: 'Vacaciones',
    History: 'Historia', Science: 'Ciencia', Math: 'Matemáticas', Exam: 'Examen', Homework: 'Tarea', Class: 'Clase',
    Conversation: 'Conversación', Letter: 'Carta', Call: 'Llamada', Answer: 'Respuesta', Question: 'Pregunta',
    Company: 'Empresa', Tradition: 'Tradición', Policy: 'Política', Experiment: 'Experimento', Poetry: 'Poesía',
    Argument: 'Argumento', Culture: 'Cultura', Society: 'Sociedad', Economy: 'Economía', Law: 'Ley', Freedom: 'Libertad',
    Research: 'Investigación', Discovery: 'Descubrimiento', Laboratory: 'Laboratorio', Theory: 'Teoría', Data: 'Datos',
    Painting: 'Pintura', Sculpture: 'Escultura', Novel: 'Novela', Theater: 'Teatro', Artist: 'Artista', Literature: 'Literatura',
    Debate: 'Debate', Negotiation: 'Negociación', Strategy: 'Estrategia', Leadership: 'Liderazgo', Innovation: 'Innovación',
    Global: 'Global', Challenge: 'Desafío', Achievement: 'Logro', Perspective: 'Perspectiva', Analysis: 'Análisis',
  },
  fr: {
    Bonjour: 'Hola', 'Au revoir': 'Adiós', Merci: 'Gracias', "S'il vous plaît": 'Por favor', Oui: 'Sí', Non: 'No',
    Pardon: 'Perdón', Bienvenue: 'Bienvenido', Bon: 'Bueno', Matin: 'Mañana', Nuit: 'Noche',
    Nom: 'Nombre', Âge: 'Edad', Pays: 'País', Ville: 'Ciudad', Travail: 'Trabajo', Étudiant: 'Estudiante',
    Professeur: 'Profesor/a', Ami: 'Amigo/a', Langue: 'Idioma', Adresse: 'Dirección', Téléphone: 'Teléfono',
    Un: 'Uno', Deux: 'Dos', Trois: 'Tres', Quatre: 'Cuatro', Cinq: 'Cinco', Six: 'Seis', Sept: 'Siete',
    Huit: 'Ocho', Neuf: 'Nueve', Dix: 'Diez', "Aujourd'hui": 'Hoy', Demain: 'Mañana', Semaine: 'Semana',
    Mois: 'Mes', Année: 'Año', Heure: 'Hora', Minute: 'Minuto', Seconde: 'Segundo', Temps: 'Tiempo',
    Mère: 'Madre', Père: 'Padre', Sœur: 'Hermana', Frère: 'Hermano', Bébé: 'Bebé', Famille: 'Familia',
    Fils: 'Hijo', Fille: 'Hija', Oncle: 'Tío', Tante: 'Tía', Cousin: 'Primo/a', Grandmère: 'Abuela',
    Grandpère: 'Abuelo', Parents: 'Padres', Enfants: 'Hijos', Mari: 'Esposo', Femme: 'Esposa',
    Rouge: 'Rojo', Bleu: 'Azul', Vert: 'Verde', Jaune: 'Amarillo', Noir: 'Negro', Blanc: 'Blanco',
    Rose: 'Rosa', Marron: 'Marrón', Orange: 'Naranja', Violet: 'Morado', Gris: 'Gris', Or: 'Dorado',
    Quoi: 'Qué', Où: 'Dónde', Quand: 'Cuándo', Pourquoi: 'Por qué', Comment: 'Cómo', Qui: 'Quién',
    Quel: 'Cuál', Combien: 'Cuánto', Toujours: 'Siempre', Jamais: 'Nunca', Peut: 'Puede', Doit: 'Debe',
    Magasin: 'Tienda', Prix: 'Precio', Pain: 'Pan', Eau: 'Agua', Maison: 'Casa', Bus: 'Autobús',
    Soleil: 'Sol', Pluie: 'Lluvia', Marché: 'Mercado', Argent: 'Dinero', Bon: 'Barato', Cher: 'Caro',
    Café: 'Café', Lait: 'Leche', Sucre: 'Azúcar', Sel: 'Sal', Riz: 'Arroz', Viande: 'Carne',
    Poisson: 'Pescado', Fruit: 'Fruta', Légume: 'Verdura', Petit: 'Desayuno', Déjeuner: 'Almuerzo',
    Dîner: 'Cena', Cuisine: 'Cocina', Chambre: 'Dormitorio', Salle: 'Baño', Fenêtre: 'Ventana',
    Porte: 'Puerta', Table: 'Mesa', Chaise: 'Silla', Chemise: 'Camisa', Pantalon: 'Pantalón', Chaussures: 'Zapatos',
    Chapeau: 'Sombrero', Corps: 'Cuerpo', Tête: 'Cabeza', Main: 'Mano', Pied: 'Pie', Cœur: 'Corazón',
    Train: 'Tren', Taxi: 'Taxi', Aéroport: 'Aeropuerto', Billet: 'Boleto', Route: 'Carretera', Pont: 'Puente',
    Nuage: 'Nube', Vent: 'Viento', Neige: 'Nieve', Chaud: 'Caliente', Froid: 'Frío', Météo: 'Clima',
    Passeport: 'Pasaporte', Hôtel: 'Hotel', Médecin: 'Médico', Bureau: 'Oficina', Musique: 'Música', Heureux: 'Feliz',
    Carte: 'Mapa', Bagage: 'Equipaje', Infirmière: 'Enfermera', Médicament: 'Medicina', Douleur: 'Dolor', Hôpital: 'Hospital',
    Réunion: 'Reunión', Salaire: 'Salario', Chef: 'Jefe', Équipe: 'Equipo', Projet: 'Proyecto', Courriel: 'Correo',
    Guitare: 'Guitarra', Sport: 'Deporte', Livre: 'Libro', Film: 'Película', Danse: 'Baile', Jeu: 'Juego',
    Triste: 'Triste', Fâché: 'Enojado', Amour: 'Amor', Peur: 'Miedo', Espoir: 'Esperanza', Joie: 'Alegría',
    Internet: 'Internet', Nature: 'Naturaleza', Penser: 'Pensar', Fête: 'Fiesta', Université: 'Universidad',
    Message: 'Mensaje', Nouvelles: 'Noticias', Ordinateur: 'Computadora', Logiciel: 'Software', Site: 'Sitio web',
    Pollution: 'Contaminación', Forêt: 'Bosque', Rivière: 'Río', Océan: 'Océano', Énergie: 'Energía', Climat: 'Clima',
    Opinion: 'Opinión', Accord: 'De acuerdo', Désaccord: 'En desacuerdo', Peut: 'Quizás', Certainement: 'Ciertamente',
    Mariage: 'Boda', Festival: 'Festival', Concert: 'Concierto', Anniversaire: 'Cumpleaños', Vacances: 'Vacaciones',
    Histoire: 'Historia', Science: 'Ciencia', Maths: 'Matemáticas', Examen: 'Examen', Devoir: 'Tarea', Classe: 'Clase',
    Conversation: 'Conversación', Lettre: 'Carta', Appel: 'Llamada', Réponse: 'Respuesta', Question: 'Pregunta',
    Entreprise: 'Empresa', Tradition: 'Tradición', Politique: 'Política', Expérience: 'Experimento', Poésie: 'Poesía',
    Argument: 'Argumento', Culture: 'Cultura', Société: 'Sociedad', Économie: 'Economía', Loi: 'Ley', Liberté: 'Libertad',
    Recherche: 'Investigación', Découverte: 'Descubrimiento', Laboratoire: 'Laboratorio', Théorie: 'Teoría', Données: 'Datos',
    Peinture: 'Pintura', Sculpture: 'Escultura', Roman: 'Novela', Théâtre: 'Teatro', Artiste: 'Artista', Littérature: 'Literatura',
    Débat: 'Debate', Négociation: 'Negociación', Stratégie: 'Estrategia', Leadership: 'Liderazgo', Innovation: 'Innovación',
    Global: 'Global', Défi: 'Desafío', Réussite: 'Logro', Perspective: 'Perspectiva', Analyse: 'Análisis',
  },
  pt: {
    Olá: 'Hola', Adeus: 'Adiós', Obrigado: 'Gracias', 'Por favor': 'Por favor', Sim: 'Sí', Não: 'No',
    Desculpe: 'Perdón', 'Bem-vindo': 'Bienvenido', Bom: 'Bueno', Manhã: 'Mañana', Noite: 'Noche',
    Nome: 'Nombre', Idade: 'Edad', País: 'País', Cidade: 'Ciudad', Trabalho: 'Trabajo', Estudante: 'Estudiante',
    Professor: 'Profesor/a', Amigo: 'Amigo/a', Língua: 'Idioma', Endereço: 'Dirección', Telefone: 'Teléfono',
    Um: 'Uno', Dois: 'Dos', Três: 'Tres', Quatro: 'Cuatro', Cinco: 'Cinco', Seis: 'Seis', Sete: 'Siete',
    Oito: 'Oito', Nove: 'Nueve', Dez: 'Diez', Hoje: 'Hoy', Amanhã: 'Mañana', Semana: 'Semana',
    Mês: 'Mes', Ano: 'Año', Hora: 'Hora', Minuto: 'Minuto', Segundo: 'Segundo', Tempo: 'Tiempo',
    Mãe: 'Madre', Pai: 'Padre', Irmã: 'Hermana', Irmão: 'Hermano', Bebê: 'Bebé', Família: 'Familia',
    Filho: 'Hijo', Filha: 'Hija', Tio: 'Tío', Tia: 'Tía', Primo: 'Primo/a', Avó: 'Abuela',
    Avô: 'Abuelo', Pais: 'Padres', Filhos: 'Hijos', Marido: 'Esposo', Esposa: 'Esposa',
    Vermelho: 'Rojo', Azul: 'Azul', Verde: 'Verde', Amarelo: 'Amarillo', Preto: 'Negro', Branco: 'Blanco',
    Rosa: 'Rosa', Marrom: 'Marrón', Laranja: 'Naranja', Roxo: 'Morado', Cinza: 'Gris', Ouro: 'Dorado',
    'O que': 'Qué', Onde: 'Dónde', Quando: 'Cuándo', 'Por que': 'Por qué', Como: 'Cómo', Quem: 'Quién',
    Qual: 'Cuál', Quanto: 'Cuánto', Sempre: 'Siempre', Nunca: 'Nunca', Pode: 'Puede', Deve: 'Debe',
    Loja: 'Tienda', Preço: 'Precio', Pão: 'Pan', Água: 'Agua', Casa: 'Casa', Ônibus: 'Autobús',
    Sol: 'Sol', Chuva: 'Lluvia', Mercado: 'Mercado', Dinheiro: 'Dinero', Barato: 'Barato', Caro: 'Caro',
    Café: 'Café', Leite: 'Leche', Açúcar: 'Azúcar', Sal: 'Sal', Arroz: 'Arroz', Carne: 'Carne',
    Peixe: 'Pescado', Fruta: 'Fruta', Legume: 'Verdura', Café: 'Desayuno', Almoço: 'Almuerzo',
    Jantar: 'Cena', Cozinha: 'Cocina', Quarto: 'Dormitorio', Banheiro: 'Baño', Janela: 'Ventana',
    Porta: 'Puerta', Mesa: 'Mesa', Cadeira: 'Silla', Camisa: 'Camisa', Calça: 'Pantalón', Sapatos: 'Zapatos',
    Chapéu: 'Sombrero', Corpo: 'Cuerpo', Cabeça: 'Cabeza', Mão: 'Mano', Pé: 'Pie', Coração: 'Corazón',
    Trem: 'Tren', Táxi: 'Taxi', Aeroporto: 'Aeropuerto', Bilhete: 'Boleto', Estrada: 'Carretera', Ponte: 'Puente',
    Nuvem: 'Nube', Vento: 'Viento', Neve: 'Nieve', Quente: 'Caliente', Frio: 'Frío', Clima: 'Clima',
    Passaporte: 'Pasaporte', Hotel: 'Hotel', Médico: 'Médico', Escritório: 'Oficina', Música: 'Música', Feliz: 'Feliz',
    Mapa: 'Mapa', Bagagem: 'Equipaje', Enfermeira: 'Enfermera', Remédio: 'Medicina', Dor: 'Dolor', Hospital: 'Hospital',
    Reunião: 'Reunión', Salário: 'Salario', Chefe: 'Jefe', Equipe: 'Equipo', Projeto: 'Proyecto', Email: 'Correo',
    Guitarra: 'Guitarra', Esporte: 'Deporte', Livro: 'Libro', Filme: 'Película', Dança: 'Baile', Jogo: 'Juego',
    Triste: 'Triste', Bravo: 'Enojado', Amor: 'Amor', Medo: 'Miedo', Esperança: 'Esperanza', Alegria: 'Alegría',
    Internet: 'Internet', Natureza: 'Naturaleza', Pensar: 'Pensar', Festa: 'Fiesta', Universidade: 'Universidad',
    Mensagem: 'Mensaje', Notícias: 'Noticias', Computador: 'Computadora', Software: 'Software', Site: 'Sitio web',
    Poluição: 'Contaminación', Floresta: 'Bosque', Rio: 'Río', Oceano: 'Océano', Energia: 'Energía', Clima: 'Clima',
    Opinião: 'Opinión', Concordo: 'De acuerdo', Discordo: 'En desacuerdo', Talvez: 'Quizás', Certamente: 'Ciertamente',
    Casamento: 'Boda', Festival: 'Festival', Concerto: 'Concierto', Aniversário: 'Cumpleaños', Férias: 'Vacaciones',
    História: 'Historia', Ciência: 'Ciencia', Matemática: 'Matemáticas', Prova: 'Examen', Tarefa: 'Tarea', Aula: 'Clase',
    Conversa: 'Conversación', Carta: 'Carta', Chamada: 'Llamada', Resposta: 'Respuesta', Pergunta: 'Pregunta',
    Empresa: 'Empresa', Tradição: 'Tradición', Política: 'Política', Experimento: 'Experimento', Poesia: 'Poesía',
    Argumento: 'Argumento', Cultura: 'Cultura', Sociedade: 'Sociedad', Economia: 'Economía', Lei: 'Ley', Liberdade: 'Libertad',
    Pesquisa: 'Investigación', Descoberta: 'Descubrimiento', Laboratório: 'Laboratorio', Teoria: 'Teoría', Dados: 'Datos',
    Pintura: 'Pintura', Escultura: 'Escultura', Romance: 'Novela', Teatro: 'Teatro', Artista: 'Artista', Literatura: 'Literatura',
    Debate: 'Debate', Negociação: 'Negociación', Estratégia: 'Estrategia', Liderança: 'Liderazgo', Inovação: 'Innovación',
    Global: 'Global', Desafio: 'Desafío', Conquista: 'Logro', Perspectiva: 'Perspectiva', Análise: 'Análisis',
  },
  it: {
    Ciao: 'Hola', Arrivederci: 'Adiós', Grazie: 'Gracias', 'Per favore': 'Por favor', Sì: 'Sí', No: 'No',
    Scusa: 'Perdón', Benvenuto: 'Bienvenido', Buono: 'Bueno', Mattina: 'Mañana', Notte: 'Noche',
    Nome: 'Nombre', Età: 'Edad', Paese: 'País', Città: 'Ciudad', Lavoro: 'Trabajo', Studente: 'Estudiante',
    Insegnante: 'Profesor/a', Amico: 'Amigo/a', Lingua: 'Idioma', Indirizzo: 'Dirección', Telefono: 'Teléfono',
    Uno: 'Uno', Due: 'Dos', Tre: 'Tres', Quattro: 'Cuatro', Cinque: 'Cinco', Sei: 'Seis', Sette: 'Siete',
    Otto: 'Ocho', Nove: 'Nueve', Dieci: 'Diez', Oggi: 'Hoy', Domani: 'Mañana', Settimana: 'Semana',
    Mese: 'Mes', Anno: 'Año', Ora: 'Hora', Minuto: 'Minuto', Secondo: 'Segundo', Tempo: 'Tiempo',
    Madre: 'Madre', Padre: 'Padre', Sorella: 'Hermana', Fratello: 'Hermano', Bambino: 'Bebé', Famiglia: 'Familia',
    Figlio: 'Hijo', Figlia: 'Hija', Zio: 'Tío', Zia: 'Tía', Cugino: 'Primo/a', Nonna: 'Abuela',
    Nonno: 'Abuelo', Genitori: 'Padres', Figli: 'Hijos', Marito: 'Esposo', Moglie: 'Esposa',
    Rosso: 'Rojo', Blu: 'Azul', Verde: 'Verde', Giallo: 'Amarillo', Nero: 'Negro', Bianco: 'Blanco',
    Rosa: 'Rosa', Marrone: 'Marrón', Arancione: 'Naranja', Viola: 'Morado', Grigio: 'Gris', Oro: 'Dorado',
    Cosa: 'Qué', Dove: 'Dónde', Quando: 'Cuándo', Perché: 'Por qué', Come: 'Cómo', Chi: 'Quién',
    Quale: 'Cuál', Quanto: 'Cuánto', Sempre: 'Siempre', Mai: 'Nunca', Può: 'Puede', Deve: 'Debe',
    Negozio: 'Tienda', Prezzo: 'Precio', Pane: 'Pan', Acqua: 'Agua', Casa: 'Casa', Autobus: 'Autobús',
    Sole: 'Sol', Pioggia: 'Lluvia', Mercato: 'Mercado', Soldi: 'Dinero', Economico: 'Barato', Costoso: 'Caro',
    Caffè: 'Café', Latte: 'Leche', Zucchero: 'Azúcar', Sale: 'Sal', Riso: 'Arroz', Carne: 'Carne',
    Pesce: 'Pescado', Frutta: 'Fruta', Verdura: 'Verdura', Colazione: 'Desayuno', Pranzo: 'Almuerzo',
    Cena: 'Cena', Cucina: 'Cocina', Camera: 'Dormitorio', Bagno: 'Baño', Finestra: 'Ventana',
    Porta: 'Puerta', Tavolo: 'Mesa', Sedia: 'Silla', Camicia: 'Camisa', Pantaloni: 'Pantalón', Scarpe: 'Zapatos',
    Cappello: 'Sombrero', Corpo: 'Cuerpo', Testa: 'Cabeza', Mano: 'Mano', Piede: 'Pie', Cuore: 'Corazón',
    Treno: 'Tren', Taxi: 'Taxi', Aeroporto: 'Aeropuerto', Biglietto: 'Boleto', Strada: 'Carretera', Ponte: 'Puente',
    Nuvola: 'Nube', Vento: 'Viento', Neve: 'Nieve', Caldo: 'Caliente', Freddo: 'Frío', Meteo: 'Clima',
    Passaporto: 'Pasaporte', Hotel: 'Hotel', Medico: 'Médico', Ufficio: 'Oficina', Musica: 'Música', Felice: 'Feliz',
    Mappa: 'Mapa', Bagaglio: 'Equipaje', Infermiera: 'Enfermera', Medicina: 'Medicina', Dolore: 'Dolor', Ospedale: 'Hospital',
    Riunione: 'Reunión', Stipendio: 'Salario', Capo: 'Jefe', Squadra: 'Equipo', Progetto: 'Proyecto', Email: 'Correo',
    Chitarra: 'Guitarra', Sport: 'Deporte', Libro: 'Libro', Film: 'Película', Danza: 'Baile', Gioco: 'Juego',
    Triste: 'Triste', Arrabbiato: 'Enojado', Amore: 'Amor', Paura: 'Miedo', Speranza: 'Esperanza', Gioia: 'Alegría',
    Internet: 'Internet', Natura: 'Naturaleza', Pensare: 'Pensar', Festa: 'Fiesta', Università: 'Universidad',
    Messaggio: 'Mensaje', Notizie: 'Noticias', Computer: 'Computadora', Software: 'Software', Sito: 'Sitio web',
    Inquinamento: 'Contaminación', Foresta: 'Bosque', Fiume: 'Río', Oceano: 'Océano', Energia: 'Energía', Clima: 'Clima',
    Opinione: 'Opinión', Concordo: 'De acuerdo', Discordo: 'En desacuerdo', Forse: 'Quizás', Certamente: 'Ciertamente',
    Matrimonio: 'Boda', Festival: 'Festival', Concerto: 'Concierto', Compleanno: 'Cumpleaños', Vacanza: 'Vacaciones',
    Storia: 'Historia', Scienza: 'Ciencia', Matematica: 'Matemáticas', Esame: 'Examen', Compiti: 'Tarea', Classe: 'Clase',
    Conversazione: 'Conversación', Lettera: 'Carta', Chiamata: 'Llamada', Risposta: 'Respuesta', Domanda: 'Pregunta',
    Azienda: 'Empresa', Tradizione: 'Tradición', Politica: 'Política', Esperimento: 'Experimento', Poesia: 'Poesía',
    Argomento: 'Argumento', Cultura: 'Cultura', Società: 'Sociedad', Economia: 'Economía', Legge: 'Ley', Libertà: 'Libertad',
    Ricerca: 'Investigación', Scoperta: 'Descubrimiento', Laboratorio: 'Laboratorio', Teoria: 'Teoría', Dati: 'Datos',
    Pittura: 'Pintura', Scultura: 'Escultura', Romanzo: 'Novela', Teatro: 'Teatro', Artista: 'Artista', Letteratura: 'Literatura',
    Dibattito: 'Debate', Negoziazione: 'Negociación', Strategia: 'Estrategia', Leadership: 'Liderazgo', Innovazione: 'Innovación',
    Globale: 'Global', Sfida: 'Desafío', Risultato: 'Logro', Prospettiva: 'Perspectiva', Analisi: 'Análisis',
  },
}

const LESSON_KEYS = {
  en: [
    ['Hello', 'Goodbye', 'Please', 'Thanks', 'Yes', 'No', 'Sorry', 'Welcome', 'Good', 'Morning'],
    ['Name', 'Age', 'Country', 'City', 'Job', 'Student', 'Teacher', 'Friend', 'Language', 'Address'],
    ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'],
    ['Mother', 'Father', 'Sister', 'Brother', 'Baby', 'Family', 'Son', 'Daughter', 'Uncle', 'Aunt'],
    ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Pink', 'Brown', 'Orange', 'Purple'],
    ['What', 'Where', 'When', 'Why', 'How', 'Who', 'Which', 'How much', 'How many', 'Always'],
    ['Shop', 'Price', 'Bread', 'Water', 'Market', 'Money', 'Cheap', 'Expensive', 'Coffee', 'Milk'],
    ['Sugar', 'Salt', 'Rice', 'Meat', 'Fish', 'Fruit', 'Vegetable', 'Breakfast', 'Lunch', 'Dinner'],
    ['Kitchen', 'Bedroom', 'Bathroom', 'Window', 'Door', 'Table', 'Chair', 'House', 'Sun', 'Rain'],
    ['Shirt', 'Pants', 'Shoes', 'Hat', 'Body', 'Head', 'Hand', 'Foot', 'Heart', 'Bus'],
    ['Train', 'Taxi', 'Airport', 'Ticket', 'Road', 'Bridge', 'Cloud', 'Wind', 'Snow', 'Weather'],
    ['Hot', 'Cold', 'Passport', 'Hotel', 'Map', 'Luggage', 'Doctor', 'Nurse', 'Medicine', 'Hospital'],
    ['Pain', 'Meeting', 'Salary', 'Boss', 'Team', 'Project', 'Email', 'Office', 'Music', 'Happy'],
    ['Guitar', 'Sport', 'Book', 'Movie', 'Dance', 'Game', 'Sad', 'Angry', 'Love', 'Fear'],
    ['Hope', 'Joy', 'Internet', 'Computer', 'Software', 'Website', 'News', 'Message', 'Phone', 'Think'],
    ['Nature', 'Pollution', 'Forest', 'River', 'Ocean', 'Energy', 'Climate', 'Party', 'University', 'Conversation'],
    ['Opinion', 'Agree', 'Disagree', 'Perhaps', 'Certainly', 'Wedding', 'Festival', 'Concert', 'Birthday', 'Holiday'],
    ['History', 'Science', 'Math', 'Exam', 'Homework', 'Class', 'Letter', 'Call', 'Answer', 'Question'],
    ['Company', 'Tradition', 'Policy', 'Culture', 'Society', 'Economy', 'Law', 'Freedom', 'Market', 'Argument'],
    ['Research', 'Discovery', 'Laboratory', 'Theory', 'Data', 'Experiment', 'Poetry', 'Painting', 'Sculpture', 'Novel'],
    ['Theater', 'Artist', 'Literature', 'Debate', 'Negotiation', 'Strategy', 'Leadership', 'Innovation', 'Global', 'Challenge'],
    ['Achievement', 'Perspective', 'Analysis', 'Today', 'Tomorrow', 'Week', 'Month', 'Year', 'Hour', 'Minute'],
    ['Grandmother', 'Grandfather', 'Parents', 'Children', 'Husband', 'Wife', 'Cousin', 'Ten', 'Second', 'Time'],
    ['Gray', 'Gold', 'Never', 'Bonjour', 'Train', 'Taxi', 'Email', 'News', 'Policy', 'Culture'],
    ['Bonjour', 'Train', 'Taxi', 'Email', 'News', 'Policy', 'Culture', 'Research', 'Discovery', 'Analysis'],
    ['Bonjour', 'Train', 'Taxi', 'Email', 'News', 'Policy', 'Culture', 'Research', 'Discovery', 'Analysis'],
    ['Bonjour', 'Train', 'Taxi', 'Email', 'News', 'Policy', 'Culture', 'Research', 'Discovery', 'Analysis'],
    ['Bonjour', 'Train', 'Taxi', 'Email', 'News', 'Policy', 'Culture', 'Research', 'Discovery', 'Analysis'],
    ['Bonjour', 'Train', 'Taxi', 'Email', 'News', 'Policy', 'Culture', 'Research', 'Discovery', 'Analysis'],
    ['Bonjour', 'Train', 'Taxi', 'Email', 'News', 'Policy', 'Culture', 'Research', 'Discovery', 'Analysis'],
  ],
  fr: [
    ['Bonjour', 'Au revoir', 'Merci', "S'il vous plaît", 'Oui', 'Non', 'Pardon', 'Bienvenue', 'Bon', 'Matin'],
    ['Nom', 'Âge', 'Pays', 'Ville', 'Travail', 'Étudiant', 'Professeur', 'Ami', 'Langue', 'Adresse'],
    ['Un', 'Deux', 'Trois', 'Quatre', 'Cinq', 'Six', 'Sept', 'Huit', 'Neuf', 'Dix'],
    ['Mère', 'Père', 'Sœur', 'Frère', 'Bébé', 'Famille', 'Fils', 'Fille', 'Oncle', 'Tante'],
    ['Rouge', 'Bleu', 'Vert', 'Jaune', 'Noir', 'Blanc', 'Rose', 'Marron', 'Orange', 'Violet'],
    ['Quoi', 'Où', 'Quand', 'Pourquoi', 'Comment', 'Qui', 'Quel', 'Combien', 'Toujours', 'Jamais'],
    ['Magasin', 'Prix', 'Pain', 'Eau', 'Marché', 'Argent', 'Bon', 'Cher', 'Café', 'Lait'],
    ['Sucre', 'Sel', 'Riz', 'Viande', 'Poisson', 'Fruit', 'Légume', 'Petit', 'Déjeuner', 'Dîner'],
    ['Cuisine', 'Chambre', 'Salle', 'Fenêtre', 'Porte', 'Table', 'Chaise', 'Maison', 'Soleil', 'Pluie'],
    ['Chemise', 'Pantalon', 'Chaussures', 'Chapeau', 'Corps', 'Tête', 'Main', 'Pied', 'Cœur', 'Bus'],
    ['Train', 'Taxi', 'Aéroport', 'Billet', 'Route', 'Pont', 'Nuage', 'Vent', 'Neige', 'Météo'],
    ['Chaud', 'Froid', 'Passeport', 'Hôtel', 'Carte', 'Bagage', 'Médecin', 'Infirmière', 'Médicament', 'Hôpital'],
    ['Douleur', 'Réunion', 'Salaire', 'Chef', 'Équipe', 'Projet', 'Courriel', 'Bureau', 'Musique', 'Heureux'],
    ['Guitare', 'Sport', 'Livre', 'Film', 'Danse', 'Jeu', 'Triste', 'Fâché', 'Amour', 'Peur'],
    ['Espoir', 'Joie', 'Internet', 'Ordinateur', 'Logiciel', 'Site', 'Nouvelles', 'Message', 'Téléphone', 'Penser'],
    ['Nature', 'Pollution', 'Forêt', 'Rivière', 'Océan', 'Énergie', 'Climat', 'Fête', 'Université', 'Conversation'],
    ['Opinion', 'Accord', 'Désaccord', 'Peut', 'Certainement', 'Mariage', 'Festival', 'Concert', 'Anniversaire', 'Vacances'],
    ['Histoire', 'Science', 'Maths', 'Examen', 'Devoir', 'Classe', 'Lettre', 'Appel', 'Réponse', 'Question'],
    ['Entreprise', 'Tradition', 'Politique', 'Culture', 'Société', 'Économie', 'Loi', 'Liberté', 'Marché', 'Argument'],
    ['Recherche', 'Découverte', 'Laboratoire', 'Théorie', 'Données', 'Expérience', 'Poésie', 'Peinture', 'Sculpture', 'Roman'],
    ['Théâtre', 'Artiste', 'Littérature', 'Débat', 'Négociation', 'Stratégie', 'Leadership', 'Innovation', 'Global', 'Défi'],
    ['Réussite', 'Perspective', 'Analyse', "Aujourd'hui", 'Demain', 'Semaine', 'Mois', 'Année', 'Heure', 'Minute'],
    ['Grandmère', 'Grandpère', 'Parents', 'Enfants', 'Mari', 'Femme', 'Cousin', 'Dix', 'Seconde', 'Temps'],
    ['Gris', 'Or', 'Doit', 'Peut', 'Train', 'Taxi', 'Courriel', 'Nouvelles', 'Politique', 'Culture'],
    ['Bonjour', 'Train', 'Taxi', 'Courriel', 'Nouvelles', 'Politique', 'Culture', 'Recherche', 'Découverte', 'Analyse'],
    ['Bonjour', 'Train', 'Taxi', 'Courriel', 'Nouvelles', 'Politique', 'Culture', 'Recherche', 'Découverte', 'Analyse'],
    ['Bonjour', 'Train', 'Taxi', 'Courriel', 'Nouvelles', 'Politique', 'Culture', 'Recherche', 'Découverte', 'Analyse'],
    ['Bonjour', 'Train', 'Taxi', 'Courriel', 'Nouvelles', 'Politique', 'Culture', 'Recherche', 'Découverte', 'Analyse'],
    ['Bonjour', 'Train', 'Taxi', 'Courriel', 'Nouvelles', 'Politique', 'Culture', 'Recherche', 'Découverte', 'Analyse'],
    ['Bonjour', 'Train', 'Taxi', 'Courriel', 'Nouvelles', 'Politique', 'Culture', 'Recherche', 'Découverte', 'Analyse'],
  ],
  pt: [
    ['Olá', 'Adeus', 'Obrigado', 'Por favor', 'Sim', 'Não', 'Desculpe', 'Bem-vindo', 'Bom', 'Manhã'],
    ['Nome', 'Idade', 'País', 'Cidade', 'Trabalho', 'Estudante', 'Professor', 'Amigo', 'Língua', 'Endereço'],
    ['Um', 'Dois', 'Três', 'Quatro', 'Cinco', 'Seis', 'Sete', 'Oito', 'Nove', 'Dez'],
    ['Mãe', 'Pai', 'Irmã', 'Irmão', 'Bebê', 'Família', 'Filho', 'Filha', 'Tio', 'Tia'],
    ['Vermelho', 'Azul', 'Verde', 'Amarelo', 'Preto', 'Branco', 'Rosa', 'Marrom', 'Laranja', 'Roxo'],
    ['O que', 'Onde', 'Quando', 'Por que', 'Como', 'Quem', 'Qual', 'Quanto', 'Sempre', 'Nunca'],
    ['Loja', 'Preço', 'Pão', 'Água', 'Mercado', 'Dinheiro', 'Barato', 'Caro', 'Café', 'Leite'],
    ['Açúcar', 'Sal', 'Arroz', 'Carne', 'Peixe', 'Fruta', 'Legume', 'Café', 'Almoço', 'Jantar'],
    ['Cozinha', 'Quarto', 'Banheiro', 'Janela', 'Porta', 'Mesa', 'Cadeira', 'Casa', 'Sol', 'Chuva'],
    ['Camisa', 'Calça', 'Sapatos', 'Chapéu', 'Corpo', 'Cabeça', 'Mão', 'Pé', 'Coração', 'Ônibus'],
    ['Trem', 'Táxi', 'Aeroporto', 'Bilhete', 'Estrada', 'Ponte', 'Nuvem', 'Vento', 'Neve', 'Clima'],
    ['Quente', 'Frio', 'Passaporte', 'Hotel', 'Mapa', 'Bagagem', 'Médico', 'Enfermeira', 'Remédio', 'Hospital'],
    ['Dor', 'Reunião', 'Salário', 'Chefe', 'Equipe', 'Projeto', 'Email', 'Escritório', 'Música', 'Feliz'],
    ['Guitarra', 'Esporte', 'Livro', 'Filme', 'Dança', 'Jogo', 'Triste', 'Bravo', 'Amor', 'Medo'],
    ['Esperança', 'Alegria', 'Internet', 'Computador', 'Software', 'Site', 'Notícias', 'Mensagem', 'Telefone', 'Pensar'],
    ['Natureza', 'Poluição', 'Floresta', 'Rio', 'Oceano', 'Energia', 'Clima', 'Festa', 'Universidade', 'Conversa'],
    ['Opinião', 'Concordo', 'Discordo', 'Talvez', 'Certamente', 'Casamento', 'Festival', 'Concerto', 'Aniversário', 'Férias'],
    ['História', 'Ciência', 'Matemática', 'Prova', 'Tarefa', 'Aula', 'Carta', 'Chamada', 'Resposta', 'Pergunta'],
    ['Empresa', 'Tradição', 'Política', 'Cultura', 'Sociedade', 'Economia', 'Lei', 'Liberdade', 'Mercado', 'Argumento'],
    ['Pesquisa', 'Descoberta', 'Laboratório', 'Teoria', 'Dados', 'Experimento', 'Poesia', 'Pintura', 'Escultura', 'Romance'],
    ['Teatro', 'Artista', 'Literatura', 'Debate', 'Negociação', 'Estratégia', 'Liderança', 'Inovação', 'Global', 'Desafio'],
    ['Conquista', 'Perspectiva', 'Análise', 'Hoje', 'Amanhã', 'Semana', 'Mês', 'Ano', 'Hora', 'Minuto'],
    ['Avó', 'Avô', 'Pais', 'Filhos', 'Marido', 'Esposa', 'Primo', 'Dez', 'Segundo', 'Tempo'],
    ['Cinza', 'Ouro', 'Deve', 'Pode', 'Trem', 'Táxi', 'Email', 'Notícias', 'Política', 'Cultura'],
    ['Olá', 'Trem', 'Táxi', 'Email', 'Notícias', 'Política', 'Cultura', 'Pesquisa', 'Descoberta', 'Análise'],
    ['Olá', 'Trem', 'Táxi', 'Email', 'Notícias', 'Política', 'Cultura', 'Pesquisa', 'Descoberta', 'Análise'],
    ['Olá', 'Trem', 'Táxi', 'Email', 'Notícias', 'Política', 'Cultura', 'Pesquisa', 'Descoberta', 'Análise'],
    ['Olá', 'Trem', 'Táxi', 'Email', 'Notícias', 'Política', 'Cultura', 'Pesquisa', 'Descoberta', 'Análise'],
    ['Olá', 'Trem', 'Táxi', 'Email', 'Notícias', 'Política', 'Cultura', 'Pesquisa', 'Descoberta', 'Análise'],
    ['Olá', 'Trem', 'Táxi', 'Email', 'Notícias', 'Política', 'Cultura', 'Pesquisa', 'Descoberta', 'Análise'],
  ],
  it: [
    ['Ciao', 'Arrivederci', 'Grazie', 'Per favore', 'Sì', 'No', 'Scusa', 'Benvenuto', 'Buono', 'Mattina'],
    ['Nome', 'Età', 'Paese', 'Città', 'Lavoro', 'Studente', 'Insegnante', 'Amico', 'Lingua', 'Indirizzo'],
    ['Uno', 'Due', 'Tre', 'Quattro', 'Cinque', 'Sei', 'Sette', 'Otto', 'Nove', 'Dieci'],
    ['Madre', 'Padre', 'Sorella', 'Fratello', 'Bambino', 'Famiglia', 'Figlio', 'Figlia', 'Zio', 'Zia'],
    ['Rosso', 'Blu', 'Verde', 'Giallo', 'Nero', 'Bianco', 'Rosa', 'Marrone', 'Arancione', 'Viola'],
    ['Cosa', 'Dove', 'Quando', 'Perché', 'Come', 'Chi', 'Quale', 'Quanto', 'Sempre', 'Mai'],
    ['Negozio', 'Prezzo', 'Pane', 'Acqua', 'Mercato', 'Soldi', 'Economico', 'Costoso', 'Caffè', 'Latte'],
    ['Zucchero', 'Sale', 'Riso', 'Carne', 'Pesce', 'Frutta', 'Verdura', 'Colazione', 'Pranzo', 'Cena'],
    ['Cucina', 'Camera', 'Bagno', 'Finestra', 'Porta', 'Tavolo', 'Sedia', 'Casa', 'Sole', 'Pioggia'],
    ['Camicia', 'Pantaloni', 'Scarpe', 'Cappello', 'Corpo', 'Testa', 'Mano', 'Piede', 'Cuore', 'Autobus'],
    ['Treno', 'Taxi', 'Aeroporto', 'Biglietto', 'Strada', 'Ponte', 'Nuvola', 'Vento', 'Neve', 'Meteo'],
    ['Caldo', 'Freddo', 'Passaporto', 'Hotel', 'Mappa', 'Bagaglio', 'Medico', 'Infermiera', 'Medicina', 'Ospedale'],
    ['Dolore', 'Riunione', 'Stipendio', 'Capo', 'Squadra', 'Progetto', 'Email', 'Ufficio', 'Musica', 'Felice'],
    ['Chitarra', 'Sport', 'Libro', 'Film', 'Danza', 'Gioco', 'Triste', 'Arrabbiato', 'Amore', 'Paura'],
    ['Speranza', 'Gioia', 'Internet', 'Computer', 'Software', 'Sito', 'Notizie', 'Messaggio', 'Telefono', 'Pensare'],
    ['Natura', 'Inquinamento', 'Foresta', 'Fiume', 'Oceano', 'Energia', 'Clima', 'Festa', 'Università', 'Conversazione'],
    ['Opinione', 'Concordo', 'Discordo', 'Forse', 'Certamente', 'Matrimonio', 'Festival', 'Concerto', 'Compleanno', 'Vacanza'],
    ['Storia', 'Scienza', 'Matematica', 'Esame', 'Compiti', 'Classe', 'Lettera', 'Chiamata', 'Risposta', 'Domanda'],
    ['Azienda', 'Tradizione', 'Politica', 'Cultura', 'Società', 'Economia', 'Legge', 'Libertà', 'Mercato', 'Argomento'],
    ['Ricerca', 'Scoperta', 'Laboratorio', 'Teoria', 'Dati', 'Esperimento', 'Poesia', 'Pittura', 'Scultura', 'Romanzo'],
    ['Teatro', 'Artista', 'Letteratura', 'Dibattito', 'Negoziazione', 'Strategia', 'Leadership', 'Innovazione', 'Globale', 'Sfida'],
    ['Risultato', 'Prospettiva', 'Analisi', 'Oggi', 'Domani', 'Settimana', 'Mese', 'Anno', 'Ora', 'Minuto'],
    ['Nonna', 'Nonno', 'Genitori', 'Figli', 'Marito', 'Moglie', 'Cugino', 'Dieci', 'Secondo', 'Tempo'],
    ['Grigio', 'Oro', 'Deve', 'Può', 'Treno', 'Taxi', 'Email', 'Notizie', 'Politica', 'Cultura'],
    ['Ciao', 'Treno', 'Taxi', 'Email', 'Notizie', 'Politica', 'Cultura', 'Ricerca', 'Scoperta', 'Analisi'],
    ['Ciao', 'Treno', 'Taxi', 'Email', 'Notizie', 'Politica', 'Cultura', 'Ricerca', 'Scoperta', 'Analisi'],
    ['Ciao', 'Treno', 'Taxi', 'Email', 'Notizie', 'Politica', 'Cultura', 'Ricerca', 'Scoperta', 'Analisi'],
    ['Ciao', 'Treno', 'Taxi', 'Email', 'Notizie', 'Politica', 'Cultura', 'Ricerca', 'Scoperta', 'Analisi'],
    ['Ciao', 'Treno', 'Taxi', 'Email', 'Notizie', 'Politica', 'Cultura', 'Ricerca', 'Scoperta', 'Analisi'],
    ['Ciao', 'Treno', 'Taxi', 'Email', 'Notizie', 'Politica', 'Cultura', 'Ricerca', 'Scoperta', 'Analisi'],
  ],
}

const LANGS = [
  { id: 'en', name: 'Inglés', flag: '🇬🇧', code: 'gb', desc: 'Ruta completa de principiante a experto en inglés.' },
  { id: 'fr', name: 'Francés', flag: '🇫🇷', code: 'fr', desc: 'Ruta completa de principiante a experto en francés.' },
  { id: 'pt', name: 'Portugués', flag: '🇵🇹', code: 'pt', desc: 'Ruta completa de principiante a experto en portugués.' },
  { id: 'it', name: 'Italiano', flag: '🇮🇹', code: 'it', desc: 'Ruta completa de principiante a experto en italiano.' },
]

function lessonPairs(langId, lessonIndex) {
  const keys = LESSON_KEYS[langId][lessonIndex]
  const lex = LEXICON[langId]
  return keys.map((word) => [word, lex[word] ?? word])
}

function buildQuiz(items) {
  const c = items[0]
  const opts = items.slice(1, 4).map((w, i) => ({
    id: String.fromCharCode(98 + i),
    text: w.translation,
    correct: false,
  }))
  while (opts.length < 3) opts.push({ id: String.fromCharCode(98 + opts.length), text: 'Otra opción', correct: false })
  return [{ id: 'a', text: c.translation, correct: true }, ...opts]
}

function buildLang(lang) {
  const levels = []
  const lessons = []
  const vocabulary = {}
  const quizQuestions = {}
  const quizPrompts = {}

  for (let li = 0; li < LEVEL_COUNT; li += 1) {
    const levelId = `${lang.id}-lv${li + 1}`
    levels.push({
      id: levelId,
      languageId: lang.id,
      order: li + 1,
      name: LEVEL_ORDER[li],
      difficulty: LEVEL_META[LEVEL_ORDER[li]].difficulty,
      description: LEVEL_META[LEVEL_ORDER[li]].description,
    })

    for (let ti = 0; ti < LESSONS_PER_LEVEL; ti += 1) {
      const lessonIndex = li * LESSONS_PER_LEVEL + ti
      const lessonId = `${levelId}-le${ti + 1}`
      const pairs = lessonPairs(lang.id, lessonIndex)

      const items = pairs.map(([word, translation]) => ({
        word,
        translation,
        example: `Ejemplo con "${word}".`,
      }))

      lessons.push({
        id: lessonId,
        levelId,
        order: ti + 1,
        title: TITLES[li][ti],
        topic: TOPICS[li][ti],
        duration: `${5 + li} min`,
        words: items.length,
      })

      vocabulary[lessonId] = items
      quizPrompts[lessonId] = `¿Qué significa "${items[0].word}"?`
      quizQuestions[lessonId] = buildQuiz(items)
    }
  }

  return { levels, lessons, vocabulary, quizQuestions, quizPrompts }
}

const built = LANGS.map((l) => ({ lang: l, data: buildLang(l) }))
const vocabulary = Object.assign({}, ...built.map((b) => b.data.vocabulary))
const total = Object.values(vocabulary).reduce((s, l) => s + l.length, 0)

const output = `// AUTO-GENERATED — ${total} palabras. Regenerar: node scripts/generate-vocabulary.mjs
import type { Language, LanguageLevel, Lesson, QuizOption, VocabularyItem } from '../types'

export const TOTAL_VOCABULARY_WORDS = ${total}
export const LESSONS_PER_LEVEL = ${LESSONS_PER_LEVEL}
export const LEVEL_COUNT = ${LEVEL_COUNT}

export const languages: Language[] = ${JSON.stringify(
  built.map((b) => ({
    id: b.lang.id,
    name: b.lang.name,
    flag: b.lang.flag,
    code: b.lang.code,
    description: b.lang.desc,
    level: 'Multi-nivel',
  })),
  null,
  2,
)}

export const languageLevels: Record<string, LanguageLevel[]> = ${JSON.stringify(
  Object.fromEntries(built.map((b) => [b.lang.id, b.data.levels])),
  null,
  2,
)}

export const lessons: Record<string, Lesson[]> = ${JSON.stringify(
  Object.fromEntries(built.map((b) => [b.lang.id, b.data.lessons])),
  null,
  2,
)}

export const vocabulary: Record<string, VocabularyItem[]> = ${JSON.stringify(vocabulary, null, 2)}

export const quizQuestions: Record<string, QuizOption[]> = ${JSON.stringify(
  Object.assign({}, ...built.map((b) => b.data.quizQuestions)),
  null,
  2,
)}

export const quizPrompts: Record<string, string> = ${JSON.stringify(
  Object.assign({}, ...built.map((b) => b.data.quizPrompts)),
  null,
  2,
)}

export const defaultVocabulary: VocabularyItem[] = [
  { word: 'Welcome', translation: 'Bienvenida', example: 'Welcome to Langflow!' },
  { word: 'Learn', translation: 'Aprender', example: 'Learn every day.' },
  { word: 'Practice', translation: 'Practicar', example: 'Practice makes perfect.' },
]
`

writeFileSync(resolve(root, 'src/data/generatedContent.ts'), output, 'utf8')
console.log(`Generated ${total} vocabulary words (${LEVEL_COUNT} niveles × ${LESSONS_PER_LEVEL} lecciones × ${WORDS_PER_LESSON} palabras × ${LANGS.length} idiomas).`)
