export interface FraseMotivacional {
  texto: string
  autor: string
}

export const FRASES_MOTIVACIONAIS: FraseMotivacional[] = [
  // Saúde e Bem-estar
  { texto: "Saúde não é tudo, mas sem ela, tudo é nada.", autor: "Arthur Schopenhauer" },
  { texto: "O corpo é seu templo. Cuide dele com carinho.", autor: "Jim Rohn" },
  { texto: "Uma maçã por dia mantém o médico longe.", autor: "Provérbio Popular" },
  { texto: "A maior riqueza é a saúde.", autor: "Virgílio" },
  { texto: "Cuidar de si mesmo não é egoísmo, é amor próprio.", autor: "Anônimo" },
  { texto: "Seu corpo consegue quase tudo. É a mente que precisa convencer.", autor: "Anônimo" },
  { texto: "Saúde é a união do corpo e da mente.", autor: "Hipócrates" },
  { texto: "Movimento é medicina para criar mudança física e emocional.", autor: "Carol Welch" },
  { texto: "Água é vida. Hidrate-se sempre.", autor: "Anônimo" },
  { texto: "Durma bem, acorde melhor.", autor: "Anônimo" },

  // Alimentação Saudável
  { texto: "Que o alimento seja teu remédio.", autor: "Hipócrates" },
  { texto: "Comer bem é um ato de amor próprio.", autor: "Anônimo" },
  { texto: "Comida de verdade vem da terra, não de fábrica.", autor: "Michael Pollan" },
  { texto: "Você é o que você come.", autor: "Ludwig Feuerbach" },
  { texto: "Nutrição adequada pode curar doenças que remédios não curam.", autor: "Charlotte Gerson" },
  { texto: "Coma comida de verdade, não muito, principalmente plantas.", autor: "Michael Pollan" },
  { texto: "Um prato colorido é um prato saudável.", autor: "Anônimo" },
  { texto: "Açúcar é doce, mas saúde é melhor.", autor: "Anônimo" },
  { texto: "Cada refeição é uma oportunidade de nutrir seu corpo.", autor: "Anônimo" },
  { texto: "Cozinhar é amor feito comida.", autor: "Anônimo" },

  // Dinheiro e Prosperidade
  { texto: "A riqueza não está em ter muito, mas em precisar de pouco.", autor: "Epicuro" },
  { texto: "Não trabalhe por dinheiro, faça o dinheiro trabalhar por você.", autor: "Robert Kiyosaki" },
  { texto: "Economizar hoje é prosperar amanhã.", autor: "Anônimo" },
  { texto: "Investir em conhecimento rende os melhores juros.", autor: "Benjamin Franklin" },
  { texto: "Dinheiro não traz felicidade, mas ajuda a conquistá-la.", autor: "Anônimo" },
  { texto: "Poupe dinheiro e o dinheiro irá poupar você.", autor: "Anônimo" },
  { texto: "A prosperidade é consequência de boas escolhas.", autor: "Anônimo" },
  { texto: "Não gaste o que ainda não ganhou.", autor: "Thomas Jefferson" },
  { texto: "Pequenos gastos afundam grandes navios.", autor: "Benjamin Franklin" },
  { texto: "Riqueza é ter o suficiente, não acumular demais.", autor: "Lao Tzu" },

  // Planejamento e Organização
  { texto: "Uma lista bem feita é meio caminho andado.", autor: "Anônimo" },
  { texto: "Planejar é transformar sonhos em ações.", autor: "Anônimo" },
  { texto: "Organização é a chave do sucesso.", autor: "Brian Tracy" },
  { texto: "Quem falha em planejar, planeja falhar.", autor: "Benjamin Franklin" },
  { texto: "Um objetivo sem planejamento é apenas um desejo.", autor: "Antoine de Saint-Exupéry" },
  { texto: "Organize sua vida, organize sua mente.", autor: "Anônimo" },
  { texto: "Pequenos passos levam a grandes conquistas.", autor: "Anônimo" },
  { texto: "Comece de onde você está, use o que você tem.", autor: "Arthur Ashe" },
  { texto: "A jornada de mil milhas começa com um passo.", autor: "Lao Tzu" },
  { texto: "Faça hoje o que outros não querem, tenha amanhã o que outros não têm.", autor: "Anônimo" },

  // Auto-estima e Motivação
  { texto: "Você é mais forte do que imagina.", autor: "Anônimo" },
  { texto: "Acredite em você, sempre.", autor: "Anônimo" },
  { texto: "Seja a mudança que você quer ver no mundo.", autor: "Mahatma Gandhi" },
  { texto: "Seu único limite é você mesmo.", autor: "Anônimo" },
  { texto: "Não espere oportunidades, crie-as.", autor: "Anônimo" },
  { texto: "A confiança em si mesmo é o primeiro segredo do sucesso.", autor: "Ralph Waldo Emerson" },
  { texto: "Você é capaz de coisas incríveis.", autor: "Anônimo" },
  { texto: "O sucesso é a soma de pequenos esforços repetidos.", autor: "Robert Collier" },
  { texto: "Sonhe grande, comece pequeno, aja agora.", autor: "Robin Sharma" },
  { texto: "Seja gentil consigo mesmo.", autor: "Anônimo" },

  // Gratidão e Positividade
  { texto: "Gratidão transforma o que temos em suficiente.", autor: "Melody Beattie" },
  { texto: "Seja grato pelo hoje, ontem já foi, amanhã virá.", autor: "Anônimo" },
  { texto: "Um dia feliz é um dia de gratidão.", autor: "Anônimo" },
  { texto: "Agradeça sempre, reclame nunca.", autor: "Anônimo" },
  { texto: "Felicidade não é ter muito, é apreciar o que se tem.", autor: "Anônimo" },
  { texto: "Cada dia é uma nova chance de ser feliz.", autor: "Anônimo" },
  { texto: "Sorria, a vida é bela.", autor: "Anônimo" },
  { texto: "Pense positivo, viva positivo.", autor: "Anônimo" },
  { texto: "A atitude positiva muda tudo.", autor: "Anônimo" },
  { texto: "Escolha a felicidade todos os dias.", autor: "Anônimo" },

  // Família e Lar
  { texto: "Lar é onde o coração está.", autor: "Provérbio Popular" },
  { texto: "Família é tudo.", autor: "Anônimo" },
  { texto: "O amor começa em casa.", autor: "Madre Teresa" },
  { texto: "Casa organizada, mente tranquila.", autor: "Anônimo" },
  { texto: "Pequenos momentos criam grandes memórias.", autor: "Anônimo" },
  { texto: "Cozinhar para quem amamos é uma demonstração de carinho.", autor: "Anônimo" },
  { texto: "Um lar feliz é um tesouro inestimável.", autor: "Anônimo" },
  { texto: "Família: onde a vida começa e o amor nunca acaba.", autor: "Anônimo" },
  { texto: "Tempo em família é tempo bem investido.", autor: "Anônimo" },
  { texto: "Lar doce lar.", autor: "Provérbio Popular" },

  // Economia Doméstica
  { texto: "Desperdício zero, vida plena.", autor: "Anônimo" },
  { texto: "Reaproveitar é economizar e cuidar do planeta.", autor: "Anônimo" },
  { texto: "Compre menos, escolha melhor.", autor: "Vivienne Westwood" },
  { texto: "Qualidade supera quantidade sempre.", autor: "Anônimo" },
  { texto: "Lista de compras evita desperdício.", autor: "Anônimo" },
  { texto: "Economizar nas pequenas coisas faz grande diferença.", autor: "Anônimo" },
  { texto: "Consuma consciente, viva melhor.", autor: "Anônimo" },
  { texto: "Menos é mais quando se trata de gastos.", autor: "Anônimo" },
  { texto: "Planeje suas compras, economize seu dinheiro.", autor: "Anônimo" },
  { texto: "Cada centavo economizado é um centavo ganho.", autor: "Benjamin Franklin" },

  // Sustentabilidade
  { texto: "Cuide do planeta, ele é nossa única casa.", autor: "Anônimo" },
  { texto: "Pequenas ações, grandes impactos.", autor: "Anônimo" },
  { texto: "Reduza, reutilize, recicle.", autor: "Anônimo" },
  { texto: "O futuro é verde.", autor: "Anônimo" },
  { texto: "Consumo consciente é responsabilidade de todos.", autor: "Anônimo" },
  { texto: "Preserve a natureza, preserve a vida.", autor: "Anônimo" },
  { texto: "Cada escolha sustentável faz diferença.", autor: "Anônimo" },
  { texto: "Planeta saudável, pessoas saudáveis.", autor: "Anônimo" },
  { texto: "Menos plástico, mais vida.", autor: "Anônimo" },
  { texto: "A Terra não é herança, é empréstimo dos filhos.", autor: "Provérbio Indígena" },

  // Produtividade
  { texto: "Faça uma coisa de cada vez, e faça bem feito.", autor: "Anônimo" },
  { texto: "Ação é o remédio para o medo.", autor: "Brian Tracy" },
  { texto: "Não deixe para amanhã o que pode fazer hoje.", autor: "Benjamin Franklin" },
  { texto: "Foco é a chave da produtividade.", autor: "Anônimo" },
  { texto: "Termine o que começou.", autor: "Anônimo" },
  { texto: "Disciplina é a ponte entre metas e realizações.", autor: "Jim Rohn" },
  { texto: "Começar é a parte mais importante.", autor: "Anônimo" },
  { texto: "Progresso, não perfeição.", autor: "Anônimo" },
  { texto: "Cada dia é uma nova oportunidade de fazer melhor.", autor: "Anônimo" },
  { texto: "O segredo é começar.", autor: "Mark Twain" },

  // Sabedoria
  { texto: "Conhecimento é poder.", autor: "Francis Bacon" },
  { texto: "Aprenda com o passado, viva o presente, planeje o futuro.", autor: "Anônimo" },
  { texto: "Experiência é o nome que damos aos nossos erros.", autor: "Oscar Wilde" },
  { texto: "A paciência é amarga, mas seus frutos são doces.", autor: "Aristóteles" },
  { texto: "Quem tem paciência tem tudo.", autor: "Provérbio Popular" },
  { texto: "Sabedoria é saber o que fazer, habilidade é saber como fazer.", autor: "David Starr Jordan" },
  { texto: "A simplicidade é o último grau da sofisticação.", autor: "Leonardo da Vinci" },
  { texto: "Menos pressa, mais perfeição.", autor: "Provérbio Chinês" },
  { texto: "O silêncio é a melhor resposta para muitas perguntas.", autor: "Anônimo" },
  { texto: "Tempo é o bem mais precioso.", autor: "Anônimo" },
]

// Função para obter uma frase aleatória
export function obterFraseAleatoria(): FraseMotivacional {
  const indice = Math.floor(Math.random() * FRASES_MOTIVACIONAIS.length)
  return FRASES_MOTIVACIONAIS[indice]
}
