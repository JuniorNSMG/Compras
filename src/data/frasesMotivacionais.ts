export interface FraseMotivacional {
  texto: string
  autor: string
}

export const FRASES_MOTIVACIONAIS: FraseMotivacional[] = [
  // Saúde e Bem-estar
  { texto: "Saúde não é tudo, mas sem ela, tudo é nada.", autor: "Arthur Schopenhauer" },
  { texto: "O corpo é seu templo. Cuide dele com carinho.", autor: "Jim Rohn" },
  { texto: "A maior riqueza é a saúde.", autor: "Virgílio" },
  { texto: "Saúde é a união do corpo e da mente.", autor: "Hipócrates" },
  { texto: "Movimento é medicina para criar mudança física e emocional.", autor: "Carol Welch" },

  // Alimentação Saudável
  { texto: "Que o alimento seja teu remédio.", autor: "Hipócrates" },
  { texto: "Comida de verdade vem da terra, não de fábrica.", autor: "Michael Pollan" },
  { texto: "Você é o que você come.", autor: "Ludwig Feuerbach" },
  { texto: "Nutrição adequada pode curar doenças que remédios não curam.", autor: "Charlotte Gerson" },
  { texto: "Coma comida de verdade, não muito, principalmente plantas.", autor: "Michael Pollan" },

  // Dinheiro e Prosperidade
  { texto: "A riqueza não está em ter muito, mas em precisar de pouco.", autor: "Epicuro" },
  { texto: "Não trabalhe por dinheiro, faça o dinheiro trabalhar por você.", autor: "Robert Kiyosaki" },
  { texto: "Investir em conhecimento rende os melhores juros.", autor: "Benjamin Franklin" },
  { texto: "Não gaste o que ainda não ganhou.", autor: "Thomas Jefferson" },
  { texto: "Pequenos gastos afundam grandes navios.", autor: "Benjamin Franklin" },
  { texto: "Riqueza é ter o suficiente, não acumular demais.", autor: "Lao Tzu" },

  // Planejamento e Organização
  { texto: "Organização é a chave do sucesso.", autor: "Brian Tracy" },
  { texto: "Quem falha em planejar, planeja falhar.", autor: "Benjamin Franklin" },
  { texto: "Um objetivo sem planejamento é apenas um desejo.", autor: "Antoine de Saint-Exupéry" },
  { texto: "Comece de onde você está, use o que você tem.", autor: "Arthur Ashe" },
  { texto: "A jornada de mil milhas começa com um passo.", autor: "Lao Tzu" },

  // Auto-estima e Motivação
  { texto: "Seja a mudança que você quer ver no mundo.", autor: "Mahatma Gandhi" },
  { texto: "A confiança em si mesmo é o primeiro segredo do sucesso.", autor: "Ralph Waldo Emerson" },
  { texto: "O sucesso é a soma de pequenos esforços repetidos.", autor: "Robert Collier" },
  { texto: "Sonhe grande, comece pequeno, aja agora.", autor: "Robin Sharma" },

  // Gratidão e Positividade
  { texto: "Gratidão transforma o que temos em suficiente.", autor: "Melody Beattie" },

  // Família e Lar
  { texto: "O amor começa em casa.", autor: "Madre Teresa" },

  // Economia Doméstica
  { texto: "Compre menos, escolha melhor.", autor: "Vivienne Westwood" },
  { texto: "Cada centavo economizado é um centavo ganho.", autor: "Benjamin Franklin" },

  // Sustentabilidade
  { texto: "A Terra não é herança, é empréstimo dos filhos.", autor: "Provérbio Indígena" },

  // Produtividade
  { texto: "Ação é o remédio para o medo.", autor: "Brian Tracy" },
  { texto: "Não deixe para amanhã o que pode fazer hoje.", autor: "Benjamin Franklin" },
  { texto: "Disciplina é a ponte entre metas e realizações.", autor: "Jim Rohn" },
  { texto: "O segredo é começar.", autor: "Mark Twain" },

  // Sabedoria
  { texto: "Conhecimento é poder.", autor: "Francis Bacon" },
  { texto: "Experiência é o nome que damos aos nossos erros.", autor: "Oscar Wilde" },
  { texto: "A paciência é amarga, mas seus frutos são doces.", autor: "Aristóteles" },
  { texto: "Sabedoria é saber o que fazer, habilidade é saber como fazer.", autor: "David Starr Jordan" },
  { texto: "A simplicidade é o último grau da sofisticação.", autor: "Leonardo da Vinci" },

  // Provérbios Famosos
  { texto: "Uma maçã por dia mantém o médico longe.", autor: "Provérbio Popular" },
  { texto: "Lar é onde o coração está.", autor: "Provérbio Popular" },
  { texto: "Quem tem paciência tem tudo.", autor: "Provérbio Popular" },
  { texto: "Menos pressa, mais perfeição.", autor: "Provérbio Chinês" },
  { texto: "Lar doce lar.", autor: "Provérbio Popular" },

  // Liderança e Sucesso
  { texto: "A educação é a arma mais poderosa que você pode usar.", autor: "Nelson Mandela" },
  { texto: "A única maneira de fazer um ótimo trabalho é amar o que faz.", autor: "Steve Jobs" },
  { texto: "No meio da dificuldade encontra-se a oportunidade.", autor: "Albert Einstein" },
  { texto: "O sucesso não é final, o fracasso não é fatal.", autor: "Winston Churchill" },
  { texto: "A persistência é o caminho do êxito.", autor: "Charles Chaplin" },

  // Filosofia Oriental
  { texto: "A jornada é a recompensa.", autor: "Provérbio Chinês" },
  { texto: "Escolha um trabalho que ame e não terá que trabalhar um dia.", autor: "Confúcio" },
  { texto: "Nossa maior glória não está em nunca cair, mas em levantar.", autor: "Confúcio" },
  { texto: "Onde há vontade, há um caminho.", autor: "Provérbio Chinês" },

  // Criatividade e Inovação
  { texto: "A criatividade é a inteligência se divertindo.", autor: "Albert Einstein" },
  { texto: "Toda conquista começa com a decisão de tentar.", autor: "Gail Devers" },
  { texto: "Se você pode sonhar, você pode fazer.", autor: "Walt Disney" },
  { texto: "A imaginação é mais importante que o conhecimento.", autor: "Albert Einstein" },

  // Empreendedorismo
  { texto: "Obstáculos não devem te parar. Se encontrar um muro, siga.", autor: "Michael Jordan" },
  { texto: "O caminho para o sucesso é sempre em construção.", autor: "Lily Tomlin" },
  { texto: "Não tenha medo de desistir do bom para buscar o ótimo.", autor: "John D. Rockefeller" },
  { texto: "Qualidade significa fazer certo quando ninguém está olhando.", autor: "Henry Ford" },

  // Resiliência
  { texto: "Caia sete vezes, levante-se oito.", autor: "Provérbio Japonês" },
  { texto: "A força não vem do corpo, vem da vontade.", autor: "Arnold Schwarzenegger" },
  { texto: "O maior erro é não tentar.", autor: "Desconhecido" },
  { texto: "Fracassos são degraus na escada do sucesso.", autor: "C.S. Lewis" },

  // Vida e Felicidade
  { texto: "A felicidade não é algo pronto. Vem de suas próprias ações.", autor: "Dalai Lama" },
  { texto: "Viva como se fosse morrer amanhã. Aprenda como se fosse viver.", autor: "Mahatma Gandhi" },
  { texto: "A vida é o que acontece enquanto você faz outros planos.", autor: "John Lennon" },
  { texto: "Seja você mesmo. Todos os outros já existem.", autor: "Oscar Wilde" },

  // Amor e Relacionamentos
  { texto: "Onde reina o amor, não há necessidade de poder.", autor: "Carl Jung" },
  { texto: "O amor é a única força capaz de transformar um inimigo.", autor: "Martin Luther King Jr." },
  { texto: "Amar não é olhar um para o outro, mas olhar na mesma direção.", autor: "Antoine de Saint-Exupéry" },

  // Tempo e Momento
  { texto: "O tempo é nossa moeda. Use-o sabiamente.", autor: "Carl Sandburg" },
  { texto: "O melhor momento para plantar uma árvore foi há 20 anos.", autor: "Provérbio Chinês" },
  { texto: "Ontem é história, amanhã é mistério, hoje é uma dádiva.", autor: "Eleanor Roosevelt" },

  // Coragem e Determinação
  { texto: "Coragem não é ausência de medo, é agir apesar dele.", autor: "Nelson Mandela" },
  { texto: "Você perde 100% dos tiros que não dá.", autor: "Wayne Gretzky" },
  { texto: "Acredite que você pode e você já está no meio do caminho.", autor: "Theodore Roosevelt" },
  { texto: "A coragem é a primeira das qualidades humanas.", autor: "Winston Churchill" },
]

// Função para obter uma frase aleatória
export function obterFraseAleatoria(): FraseMotivacional {
  const indice = Math.floor(Math.random() * FRASES_MOTIVACIONAIS.length)
  return FRASES_MOTIVACIONAIS[indice]
}
