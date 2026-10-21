import blogArticles from './articles.json';

export type Product = {
  slug: string; family: string; title: string; eyebrow: string; intro: string;
  description: string; sourceParagraphs?: string[]; applications: string[]; benefits: string[]; options: string[];
  quote: string; related: string[]; note?: string; image?: string; imageAlt?: string;
  sections?: { title: string; paragraphs: string[]; bullets?: string[] }[];
  alert?: { title: string; paragraphs: string[] };
};

export type BlogArticle = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  date: string;
  dateDisplay: string;
  intro: string;
  sections: { heading: string; body: string }[];
  checklist: { title: string; items: string[] };
  note: string;
};

const common = 'A especificação final deve considerar projeto, aplicação, medidas, espessura, acabamento e condições de uso. A equipe comercial pode apoiar a identificação do item, sem substituir o dimensionamento técnico.';

export const products: Product[] = [
  { slug:'telhas-pir', family:'Telhas e coberturas', title:'Telhas PIR', eyebrow:'Coberturas termoisolantes', intro:'Uma solução para coberturas que pedem controle térmico e montagem racionalizada.', description:'A telha PIR combina faces metálicas e núcleo rígido de poliisocianurato. No portfólio ABR, a solução é fornecida pela MBP; documentos do fabricante podem manter a denominação EasyRoof.', applications:['Galpões industriais e logísticos','Centros de distribuição','Edificações comerciais','Projetos agroindustriais'], benefits:['Núcleo isolante integrado à cobertura','Solução industrializada','Opções de acabamento conforme fornecimento','Apoio comercial para definir a configuração'], options:['Perfil e espessura conforme documentação do fabricante','Face inferior e acabamento a definir','Comprimento e quantidade conforme projeto'], quote:'telhas PIR', related:['telhas-sanduiche-eps','telhas-metalicas-trapezoidais'], image:'/images/products/telha-pir.png', imageAlt:'Telha PIR branca com núcleo isolante aparente', note:common },
  { slug:'telhas-sanduiche-eps', family:'Telhas e coberturas', title:'Telhas sanduíche EPS', eyebrow:'Conforto para coberturas', intro:'Telhas com núcleo de EPS para projetos que buscam uma cobertura com isolamento integrado.', description:'A composição combina chapas metálicas e núcleo de poliestireno expandido. A geometria, a espessura e os acabamentos precisam ser definidos de acordo com o projeto.', applications:['Galpões','Comércio e serviços','Coberturas residenciais','Fechamentos especificados em projeto'], benefits:['Isolamento integrado','Montagem racionalizada','Possibilidades de acabamento','Cotação sob medida'], options:['Modelos TP 25, TP 35 e TP 40 conforme disponibilidade','Uma ou duas faces metálicas','Acabamento inferior conforme configuração'], quote:'telhas sanduíche EPS', related:['telhas-pir','telhas-termoacusticas-tipo-forro'], note:common },
  { slug:'telhas-metalicas-trapezoidais', family:'Telhas e coberturas', title:'Telhas metálicas trapezoidais', eyebrow:'Geometrias para diferentes projetos', intro:'Perfis metálicos para coberturas e fechamentos, definidos conforme vão, inclinação e carregamentos.', description:'As telhas trapezoidais são conformadas a partir de aço plano revestido. TP 25, TP 40 e TP 100 representam geometrias distintas — não materiais ou núcleos isolantes.', applications:['Coberturas industriais','Fechamentos laterais','Fachadas técnicas','Galpões e estruturas metálicas'], benefits:['Variedade de geometrias','Comprimentos definidos na cotação','Compatibilidade com diferentes acabamentos','Aplicação em cobertura ou fechamento'], options:['TP 25','TP 40','TP 100'], quote:'telhas metálicas trapezoidais', related:['telhas-onduladas','telhas-sanduiche-eps'], note:common },
  { slug:'telhas-onduladas', family:'Telhas e coberturas', title:'Telhas onduladas', eyebrow:'Perfil contínuo e versátil', intro:'Telhas metálicas com geometria ondulada para coberturas e fechamentos previstos em projeto.', description:'O perfil ondulado deve ser especificado considerando apoios, curvatura quando aplicável, inclinação e sistema de fixação.', applications:['Coberturas curvas previstas em projeto','Fechamentos laterais','Edificações comerciais e rurais'], benefits:['Geometria contínua','Uso em cobertura e fechamento','Comprimento sob consulta'], options:['Material e revestimento sob consulta','Espessura conforme projeto','Acabamento conforme disponibilidade'], quote:'telhas onduladas', related:['telhas-metalicas-trapezoidais','telhas-translucidas-leitosas'], note:common },
  { slug:'telhas-translucidas-leitosas', family:'Telhas e coberturas', title:'Telhas translúcidas e leitosas', eyebrow:'Aproveitamento de luz natural', intro:'Peças para compor faixas de iluminação em coberturas, compatibilizadas com o perfil metálico.', description:'A seleção exige conferir compatibilidade geométrica, transmissão luminosa, exposição e sistema de fixação. O projeto deve avaliar conforto visual e carga térmica.', applications:['Galpões','Áreas produtivas','Depósitos','Coberturas com iluminação zenital'], benefits:['Entrada planejada de luz natural','Integração com perfis compatíveis','Versões translúcidas ou leitosas'], options:['Perfil compatível sob consulta','Material e espessura conforme fornecimento','Quantidade definida pelo projeto'], quote:'telhas translúcidas ou leitosas', related:['telhas-metalicas-trapezoidais','telhas-onduladas'], note:common },
  { slug:'telhas-termoacusticas-tipo-forro', family:'Telhas e coberturas', title:'Telhas termoacústicas tipo forro', eyebrow:'Acabamento inferior integrado', intro:'Configuração de telha sanduíche com acabamento inferior pensado para permanecer aparente.', description:'O termo “tipo forro” descreve o acabamento inferior da composição. Núcleo, faces, perfil e espessuras devem ser discriminados separadamente na cotação.', applications:['Áreas comerciais','Coberturas residenciais','Espaços com face inferior aparente'], benefits:['Acabamento inferior integrado','Isolamento conforme núcleo especificado','Composição sob medida'], options:['Núcleo EPS conforme oferta','Perfil e faces a definir','Cor e acabamento sob consulta'], quote:'telhas termoacústicas tipo forro', related:['telhas-sanduiche-eps','telhas-pir'], note:common },
  { slug:'bobina-slitada', family:'Bobinas e chapas', title:'Bobina Slitada', eyebrow:'Corte longitudinal de aço', intro:'Bobinas cortadas longitudinalmente nas larguras adequadas ao processo de cada cliente.', description:'A bobina slitada é produzida em processo contínuo de corte longitudinal (slitter/rolo), em espessuras de 0,41 mm a 6,30 mm.', applications:['Produção de tubos','Perfis e estruturas em aço','Móveis e peças','Autopeças e indústria metalúrgica'], benefits:['Larguras alinhadas ao processo','Melhor aproveitamento da matéria-prima','Fornecimento conforme especificação'], options:['Laminado a frio','Laminado a quente','Galvanizado','Galvalume'], quote:'bobina slitada', related:['bobininha-slitada','chapas-de-aco'], image:'/images/products/bobininha-slitada-web.jpg', imageAlt:'Bobinas slitadas de aço galvanizado na operação do Grupo ABR', note:common },
  { slug:'bobininha-slitada', family:'Bobinas e chapas', title:'Bobininha Slitada', eyebrow:'Bobina galvanizada e Galvalume', intro:'Também conhecida como bobininha ou rolinho calheiro, é uma solução versátil para instalações internas e externas.', description:'Produzidas sob medida em materiais com acabamento em zinco ou alumínio, as bobininhas combinam durabilidade, versatilidade e economia. Podem pesar até 150 kg.', applications:['Calhas','Rufos','Dutos','Condutores'], benefits:['Corte em medidas personalizadas','Formato adequado ao manuseio','Uso interno ou externo'], options:['Espessuras de 0,35 mm a 0,65 mm','Aço galvanizado','Galvalume','Peso de até 150 kg'], quote:'bobininha slitada', related:['bobina-slitada','chapas-de-aco'], image:'/images/products/bobininha-slitada-web.jpg', imageAlt:'Bobininhas slitadas de aço galvanizado prontas para transformação', note:common },
  { slug:'chapas-de-aco', family:'Bobinas e chapas', title:'Chapas de Aço', eyebrow:'Corte transversal sob medida', intro:'Chapas lisas, xadrez e blanks para diferentes processos de fabricação e aplicações estruturais.', description:'As chapas são produzidas por corte transversal, com espessuras de 0,41 mm a 51 mm e larguras de 1.200 mm a 1.500 mm. Os blanks podem ser cortados sob medida na largura e no comprimento, em espessuras de 0,41 mm a 12,5 mm.', applications:['Indústria automobilística','Utilidades domésticas','Motores e compressores','Móveis e construção civil'], benefits:['Corte sob medida','Variedade de materiais e acabamentos','Opções para fabricação e uso estrutural'], options:['Chapas finas a frio','Chapas finas a quente','Chapas zincadas','Chapas grossas','Blanks'], quote:'chapas de aço', related:['bobina-slitada','laminados'], note:common, sections:[{title:'Chapas finas a frio',paragraphs:['Produzidas pelo processo de corte transversal em diversos comprimentos e larguras.']},{title:'Chapas finas a quente',paragraphs:['Obtidas por laminação a quente e utilizadas em aplicações estruturais.']},{title:'Chapas zincadas',paragraphs:['Também conhecidas como chapas galvanizadas, recebem revestimento à base de zinco para ampliar a durabilidade e a resistência superficial.']},{title:'Chapas grossas',paragraphs:['Opções destinadas a aplicações que exigem maiores espessuras e desempenho compatível com o projeto.']}] },
  { slug:'laminados', family:'Aços longos', title:'Laminados', eyebrow:'Resistência e versatilidade', intro:'Produtos para construção civil e indústria de transformação, disponíveis em diferentes formatos.', description:'Os laminados são aplicados em estruturas metálicas, coberturas, pisos industriais, máquinas, veículos, embalagens e outros projetos que exigem qualidade e desempenho.', applications:['Construção civil','Indústria mecânica','Implementos agrícolas','Grades, portões e esquadrias'], benefits:['Resistência e durabilidade','Diversidade de formatos','Versatilidade de aplicação'], options:['Barra chata','Barra quadrada','Barra redonda','Cantoneira','Ferro T'], quote:'aços laminados', related:['tubos-e-metalons','perfil-estrutural'], note:common, sections:[{title:'Barra chata',paragraphs:['Com superfícies lisas e sem cantos vivos, pode ser utilizada em grades, portões, esquadrias, máquinas e na indústria mecânica. Fornecida em barras de 6.000 mm.']},{title:'Barra quadrada',paragraphs:['Possui comprimento definido e é utilizada em implementos agrícolas, indústria mecânica e produtos para construção civil.']},{title:'Barra redonda',paragraphs:['Disponível em diferentes bitolas para fabricação de eixos, ferramentas, máquinas e peças forjadas.']},{title:'Cantoneira',paragraphs:['Perfil laminado em L fornecido em barras de 6.000 mm.']},{title:'Ferro T',paragraphs:['Perfil laminado em formato T para aplicações de fabricação e construção.']}] },
  { slug:'vergalhao', family:'Construção civil', title:'Vergalhão', eyebrow:'Reforço para concreto armado', intro:'Vergalhões CA-50 e CA-60 para diferentes necessidades estruturais da construção civil.', description:'O Grupo ABR trabalha com dois tipos de vergalhão beneficiado para reforçar estruturas de concreto conforme as especificações do projeto.', applications:['Lajes','Vigas e colunas','Estruturas de concreto armado','Telas eletrossoldadas e treliças'], benefits:['Superfície nervurada para aderência','Resistência estrutural','Opções CA-50 e CA-60'], options:['Vergalhão CA-50','Vergalhão CA-60','Diâmetros e comprimentos sob consulta'], quote:'vergalhão', related:['malha','trelica'], note:common, sections:[{title:'Vergalhão CA-50',paragraphs:['Indicado para estruturas de concreto armado, como lajes, vigas e colunas. Sua superfície nervurada favorece a aderência ao concreto.']},{title:'Vergalhão CA-60',paragraphs:['Possui alta resistência e soldabilidade, sendo utilizado na construção civil e na fabricação de telas eletrossoldadas e treliças.']}] },
  { slug:'viga-w-e-i', family:'Aços longos', title:'Viga W e I', eyebrow:'Perfis para estruturas metálicas', intro:'Vigas para casas, galpões, quadras, pontes, ferrovias e outros projetos estruturais.', description:'A viga W possui abas paralelas que facilitam ligações, encaixes e acabamentos estruturais. A viga I oferece encaixe preciso entre as peças e acabamento adequado ao sistema projetado.', applications:['Casas e galpões','Quadras e pontes','Ferrovias','Estruturas industriais'], benefits:['Ligações e encaixes eficientes','Perfis para diferentes projetos','Acabamento estrutural preciso'], options:['Viga W','Viga I','Comprimentos e seções sob consulta'], quote:'vigas W e I', related:['perfil-estrutural','laminados'], image:'/images/products/viga-w-web.jpg', imageAlt:'Vigas de aço com perfis W e I em estoque', note:common },
  { slug:'perfil-estrutural', family:'Perfis e tubos', title:'Perfil Estrutural', eyebrow:'Rapidez, economia e segurança', intro:'Perfis para estruturas leves, regulares e de fácil execução em empreendimentos industriais, comerciais e residenciais.', description:'Disponíveis em diferentes espessuras e medidas, os perfis estruturais oferecem acabamento e planicidade adequados ao revestimento, alinhamento e dimensionamento do projeto.', applications:['Estruturas metálicas','Esquadrias','Instalações industriais','Construção civil'], benefits:['Estruturas leves e regulares','Facilidade de execução','Diversidade de medidas e espessuras'], options:['Perfil U simples','Perfil de encaixe','Perfil U enrijecido'], quote:'perfil estrutural', related:['viga-w-e-i','tubos-e-metalons'], image:'/images/products/perfil-enrijecido-web.jpg', imageAlt:'Perfis estruturais de aço enrijecidos', note:common, sections:[{title:'Perfil simples',paragraphs:['Produto com seção transversal em forma de U, fabricado a partir de tiras de aço plano laminado a quente.']},{title:'Perfil de encaixe',paragraphs:['Fornecido em ampla gama de bitolas, é utilizado em esquadrias, estruturas metálicas e instalações industriais.']},{title:'Perfil U enrijecido',paragraphs:['Produto amplamente utilizado na construção civil, com dimensões e tamanhos adequados à aplicação especificada.']}] },
  { slug:'tubos-e-metalons', family:'Perfis e tubos', title:'Tubos e Metalons', eyebrow:'Versatilidade para construir e fabricar', intro:'Seções tubulares para construção civil, agronegócio, serralheria e indústria.', description:'Tubos e metalons podem compor estruturas e produtos variados, desde obras de grande porte até grades, portas, janelas, móveis e elementos decorativos.', applications:['Estruturas metálicas','Portões, cercas e grades','Móveis e suportes','Corrimões, postes e equipamentos'], benefits:['Alta resistência mecânica','Diversidade de formatos','Ampla variedade de aplicações'], options:['Tubo redondo','Metalon quadrado','Metalon elíptico','Metalon retangular','Tubo oblongo'], quote:'tubos e metalons', related:['laminados','perfil-estrutural'], note:common, sections:[{title:'Tubo redondo',paragraphs:['Utilizado na construção civil, no agronegócio e na indústria, incluindo portões, cercas, corrimões, postes, grades, bancos e suportes.']},{title:'Metalon quadrado',paragraphs:['Perfil tubular resistente e versátil para estruturas metálicas, portões, grades, móveis, suportes e elementos decorativos.']},{title:'Metalon elíptico',paragraphs:['Perfil tubular de formato elíptico, disponível conforme medidas e aplicação consultadas.']},{title:'Metalon retangular',paragraphs:['Indicado para estruturas metálicas, portões, grades, móveis, suportes e projetos de serralheria.']},{title:'Tubo oblongo',paragraphs:['Perfil tubular de seção oblonga, fornecido conforme disponibilidade e especificação.']}] },
  { slug:'malha', family:'Construção civil', title:'Malha', eyebrow:'Aço CA-60 nervurado', intro:'Malha beneficiada para lajes de concreto armado, pisos industriais e estruturas pré-moldadas.', description:'Com formato semelhante a uma tela, a malha é soldada em todos os pontos de cruzamento para favorecer a ancoragem. Sua especificação deve seguir o projeto estrutural.', applications:['Lajes de concreto armado','Pisos industriais','Estruturas pré-moldadas'], benefits:['Solda nos pontos de cruzamento','Boa ancoragem','Praticidade na aplicação'], options:['Aço CA-60 nervurado','Painéis conforme especificação','Modelos sob consulta'], quote:'malha de aço', related:['vergalhao','trelica'], note:common },
  { slug:'trelica', family:'Construção civil', title:'Treliça', eyebrow:'Aço nervurado para construção', intro:'Componente resistente e versátil para dar sustentação a lajes e elementos construtivos.', description:'Fabricada em aço nervurado, a treliça possui geometria que distribui cargas e integra sistemas construtivos. O modelo deve ser definido conforme o projeto.', applications:['Lajes treliçadas','Elementos pré-moldados','Sistemas de concreto'], benefits:['Geometria industrializada','Distribuição de cargas','Resistência e praticidade'], options:['Alturas sob consulta','Comprimentos sob consulta','Modelos conforme projeto'], quote:'treliça', related:['malha','vergalhao'], image:'/images/products/trelica-web.jpg', imageAlt:'Treliças de aço armazenadas na operação do Grupo ABR', note:common },
  { slug:'telhas', family:'Telhas', title:'Telhas', eyebrow:'Coberturas e fechamentos', intro:'Telhas produzidas conforme os padrões e normas aplicáveis, com opções para diferentes projetos.', description:'O Grupo ABR oferece telhas metálicas, onduladas, translúcidas ou leitosas e soluções termoacústicas para coberturas e fechamentos.', applications:['Coberturas industriais e comerciais','Fechamentos laterais','Fachadas','Projetos residenciais e agroindustriais'], benefits:['Diversidade de modelos','Opções de isolamento','Soluções para iluminação natural','Configuração conforme projeto'], options:['Telha metálica trapezoidal','Telha ondulada','Telha translúcida ou leitosa','Telha termoacústica','Telha termoacústica tipo forro'], quote:'telhas', related:['telhas-pir','telhas-sanduiche-eps'], note:common, alert:{title:'Atenção na instalação de telhas pré-pintadas',paragraphs:['O lado primer não pode ficar exposto ou voltado para o lado externo, pois não possui resistência às intempéries.','A instalação incorreta pode causar oxidação e invalidar a garantia.']}, sections:[{title:'Telha metálica trapezoidal',paragraphs:['TP 25 e TP 40 são utilizadas em coberturas e fechamentos laterais. A TP 100 atende obras com baixa inclinação e permite maior vão entre terças, conforme o projeto.']},{title:'Telha ondulada',paragraphs:['Indicada para coberturas em arco por sua flexibilidade e também utilizada em fechamentos laterais.']},{title:'Telha translúcida ou leitosa',paragraphs:['Permite aproveitar a iluminação natural. Produzida em polipropileno, possui versões translúcida e leitosa.']},{title:'Telha termoacústica',paragraphs:['As telhas com núcleo de EPS contribuem para o isolamento térmico e acústico de obras comerciais, industriais e residenciais.'],bullets:['Isolamento térmico e redução de ruídos','Boa vedação e acabamento','Não absorve água','Material autoextinguível conforme especificação']},{title:'Telha termoacústica tipo forro',paragraphs:['Configuração termoacústica com acabamento inferior destinado a permanecer aparente.']}] },
  { slug:'slitamento-e-corte', family:'Serviços', title:'Slitamento e corte', eyebrow:'Transformação de aço plano', intro:'Preparação de bobinas, fitas, chapas e blanks nas dimensões necessárias ao processo seguinte.', description:'O Grupo ABR realiza slitamento e corte. Para avaliar a viabilidade, informe material, espessura, largura de entrada e saída, dimensões, tolerâncias e volume.', applications:['Adequação de matéria-prima','Preparação para perfilação','Corte de chapas e blanks','Abastecimento industrial'], benefits:['Material preparado para a próxima etapa','Aproveitamento orientado pela especificação','Atendimento técnico-comercial'], options:['Slitamento longitudinal','Corte de chapas','Blanks conforme análise'], quote:'slitamento e corte de aço', related:['bobina-slitada','chapas-de-aco'], note:common }
];

const originalProductContent: Record<string, Partial<Product>> = {
  'bobininha-slitada': {
    image: '/images/products/legacy/bobininha-slitada.jpg',
    imageAlt: 'Bobininhas slitadas galvanizadas armazenadas na operação do Grupo ABR',
    sourceParagraphs: [
      'Bobina galvanizada e Galvalume, também conhecida como Bobininha ou Rolinho Calheiro, é uma solução versátil para quem busca qualidade e durabilidade em instalações externas e internas.',
      'O Grupo ABR produz bobina galvanizada e Galvalume sob medida. Os materiais recebem acabamento em zinco e alumínio, proporcionando longevidade e estética para o projeto.',
      'As bobinas são cortadas em medidas personalizadas e podem pesar até 150 kg. São utilizadas na fabricação de calhas, rufos, dutos e condutores, entre outros. Espessuras disponíveis de 0,35 mm a 0,65 mm.'
    ]
  },
  'bobina-slitada': {
    image: '/images/products/legacy/bobina-slitada.png',
    imageAlt: 'Bobinas de aço utilizadas no processo de corte longitudinal',
    sourceParagraphs: [
      'Um processo contínuo de corte longitudinal (Slitter/Rolo), produzido em espessuras de 0,41 mm a 6,30 mm, em materiais laminados a frio, laminados a quente, galvanizados ou Galvalume.',
      'Esta solução pode ser aplicada na indústria metalúrgica para a produção de tubos, perfis, estruturas em aço, móveis, peças e autopeças, entre outros.'
    ]
  },
  'chapas-de-aco': {
    image: '/images/products/legacy/chapas-de-aco.png',
    imageAlt: 'Medição de espessura em uma chapa de aço',
    sourceParagraphs: [
      'Chapas produzidas por corte transversal, com espessuras de 0,41 mm a 51 mm, lisas ou xadrez, em materiais laminados a quente, laminados a frio, galvanizados e Galvalume. Podem ser cortadas sob medida, com larguras de 1.200 mm a 1.500 mm.',
      'Blanks são chapas cortadas sob medida tanto na largura quanto no comprimento. Os cortes são produzidos em espessuras de 0,41 mm a 12,5 mm, em materiais laminados a quente, laminados a frio, galvanizados e Galvalume.'
    ],
    sections: [
      { title:'Chapas finas a frio', paragraphs:['Produzidas pelo processo de corte transversal em espessuras de 0,35 mm a 12,50 mm, disponíveis em diversos comprimentos e larguras.'] },
      { title:'Chapas finas a quente', paragraphs:['Obtidas pelo processo de laminação a quente e utilizadas em aplicações estruturais.'] },
      { title:'Chapas zincadas', paragraphs:['Também conhecidas como chapas galvanizadas, possuem revestimento à base de zinco, que amplia a durabilidade e a resistência superficial. São fornecidas em larguras e comprimentos padrão.'] },
      { title:'Chapas grossas', paragraphs:['Produtos destinados a uma ampla variedade de aplicações industriais e à construção civil, conforme espessura, acabamento e especificação do projeto.'] }
    ]
  },
  laminados: {
    image: '/images/products/legacy/laminados.png',
    imageAlt: 'Cantoneiras de aço laminado empilhadas',
    sourceParagraphs: [
      'Os laminados são amplamente utilizados na construção civil e na indústria de transformação por sua resistência, durabilidade e versatilidade.',
      'Na construção civil, destacam-se em estruturas metálicas, coberturas, revestimentos e pisos industriais, em obras como edifícios, galpões e pontes. Na indústria de transformação, são aplicados em máquinas, veículos, embalagens e no setor naval.',
      'Os laminados do Grupo ABR passam por um processo de compactação para melhorar qualidade, acabamento e outras propriedades, com formatos de aço específicos para diferentes necessidades.'
    ],
    sections: [
      { title:'Barra chata', paragraphs:['Com superfícies lisas e sem cantos vivos, é versátil e pode ser utilizada na indústria mecânica, em grades, portões, esquadrias e máquinas. Fornecida em barras de 6.000 mm.'] },
      { title:'Barra quadrada', paragraphs:['Tem comprimento definido, reduzindo perdas de material. É utilizada em implementos agrícolas, indústria mecânica e produtos da construção civil.'] },
      { title:'Barra redonda', paragraphs:['Possui variedade de bitolas, facilitando ajustes e encaixes. É empregada na fabricação de eixos, ferramentas, máquinas e peças forjadas.'] },
      { title:'Cantoneira', paragraphs:['Fornecida em barras de 6.000 mm.'] },
      { title:'Ferro T', paragraphs:['Perfil laminado em formato T, disponível sob consulta para aplicações de fabricação e construção.'] }
    ]
  },
  malha: {
    image: '/images/products/legacy/malha.jpg',
    imageAlt: 'Malhas de aço nervurado empilhadas',
    sourceParagraphs: [
      'A Malha Beneficiada do Grupo ABR é produzida em aço CA-60 nervurado, com formato semelhante a uma tela. É utilizada na construção de lajes em concreto armado, pisos industriais e estruturas pré-moldadas.',
      'Resistente e prática, é soldada em todos os pontos de cruzamento para proporcionar melhor ancoragem e segurança ao projeto.'
    ]
  },
  'perfil-estrutural': {
    image: '/images/products/legacy/perfil-estrutural.jpg',
    imageAlt: 'Perfis estruturais simples e enrijecidos',
    sourceParagraphs: [
      'O Perfil Estrutural oferece rapidez, economia e segurança para o empreendimento.',
      'É amplamente utilizado na construção civil, em empreendimentos industriais, comerciais ou residenciais, proporcionando acabamento superficial e planicidade adequados ao revestimento, alinhamento, cálculo e dimensionamento do projeto. Forma estruturas leves, regulares, amplas e de fácil execução.',
      'Está disponível em diversas espessuras e medidas, nas versões simples e enrijecida.'
    ],
    sections: [
      { title:'Perfil simples', paragraphs:['Produto com seção transversal em forma de U, fabricado a partir de tiras de aço plano laminado a quente.'] },
      { title:'Perfil de encaixe', paragraphs:['Fornecido em ampla variedade de bitolas, é utilizado em esquadrias, estruturas metálicas e instalações industriais.'] },
      { title:'Perfil U enrijecido', paragraphs:['Produto amplamente utilizado na construção civil, com dimensões, tamanhos e ensaios de resistência adequados às aplicações do setor.'] }
    ]
  },
  telhas: {
    image: '/images/works/telhas-metalicas-2.png',
    imageAlt: 'Cobertura metálica instalada em uma edificação',
    sourceParagraphs: ['As Telhas do Grupo ABR são produzidas de acordo com os padrões e as normas vigentes, com qualidade e durabilidade.'],
    alert: {
      title:'Atenção: instalação de telhas pré-pintadas',
      paragraphs:[
        'Nas telhas pré-pintadas, o lado primer não pode ficar exposto ou voltado para o lado externo, pois não possui resistência às intempéries e há risco de oxidação.',
        'A instalação incorreta invalida a garantia. Caso os produtos já estejam instalados, a desinstalação e a reinstalação ficam sob responsabilidade do cliente.'
      ]
    },
    sections: [
      { title:'Telha metálica trapezoidal', paragraphs:['A TP 25 é recomendada para coberturas que exigem resistência a sobrecargas e também para fechamentos laterais e fachadas. A TP 40 atende coberturas com sobrecargas concentradas e fechamentos laterais. A TP 100 é usada em obras de baixa inclinação, por sua capacidade de vazão de água, e permite maior vão entre terças.'] },
      { title:'Telha ondulada', paragraphs:['É especialmente recomendada para coberturas em forma de arco, por sua flexibilidade, e também pode ser utilizada em fechamentos laterais.'] },
      { title:'Telha translúcida ou leitosa', paragraphs:['Permite a entrada de até 70% da luz que incide sobre o telhado e distribui a luminosidade natural pelo ambiente. Produzida em PP (polipropileno), é durável, resistente aos raios solares e prática de instalar. A versão leitosa é menos transparente, mas ainda permite a entrada de luz natural.'] },
      { title:'Telha termoacústica', paragraphs:['As telhas com núcleo de EPS são indicadas para o isolamento térmico e acústico de obras comerciais, industriais e residenciais. Podem ser utilizadas em ambientes com altas ou baixas temperaturas e ajudam a reduzir ruídos externos.'], bullets:['Isolamento térmico eficiente','Maior resistência mecânica','Economia com refrigeração e energia elétrica','Redução da emissão sonora','Vedação e acabamento','Não absorve água','Material autoextinguível','Resistência a impactos e exposição ao sol'] },
      { title:'Telha termoacústica tipo forro', paragraphs:['Configuração termoacústica com acabamento inferior destinado a permanecer aparente. Consulte as opções disponíveis.'] }
    ]
  },
  trelica: {
    image: '/images/products/legacy/trelica.jpg',
    imageAlt: 'Treliça de aço nervurado para construção civil',
    sourceParagraphs: ['Fabricada em aço nervurado, a Treliça do Grupo ABR é resistente e utilizada para dar sustentação às obras. Seu formato versátil distribui a carga e permite absorver impactos e o peso das construções com segurança.']
  },
  'tubos-e-metalons': {
    image: '/images/products/legacy/tubos-e-metalons.jpg',
    imageAlt: 'Tubos e metalons em diferentes formatos e dimensões',
    sourceParagraphs: ['Muito utilizados em obras de grande porte, tubos e metalons são conhecidos pela versatilidade. Sua composição com outros elementos cria possibilidades que vão da construção à fabricação de grades, portas e janelas.'],
    sections: [
      { title:'Tubo redondo', paragraphs:['Conhecido pela alta resistência mecânica e durabilidade, é utilizado na construção civil, no agronegócio e na indústria, em portões, cercas, corrimões, postes, grades, bancos, estruturas metálicas, suportes e pontos de ônibus.'] },
      { title:'Tubo / metalon quadrado', paragraphs:['Material versátil e resistente, usado na construção civil, serralheria e indústria para fabricar estruturas metálicas, portões, grades, móveis, suportes e elementos decorativos.'] },
      { title:'Tubo / metalon elíptico', paragraphs:['Formato disponível sob consulta, conforme medidas e aplicação.'] },
      { title:'Tubo / metalon retangular', paragraphs:['Sua forma retangular é indicada para estruturas metálicas, portões, grades, móveis, suportes e elementos decorativos na construção civil, serralheria e indústria.'] },
      { title:'Tubo oblongo', paragraphs:['Formato disponível sob consulta, conforme medidas e aplicação.'] }
    ]
  },
  vergalhao: {
    image: '/images/products/legacy/vergalhao.jpg',
    imageAlt: 'Vergalhões nervurados em diferentes diâmetros',
    sourceParagraphs: ['O Grupo ABR possui dois tipos de vergalhão beneficiado para levar à construção qualidade e o reforço estrutural adequado às necessidades do projeto.'],
    sections: [
      { title:'Vergalhão CA-50', paragraphs:['Indicado para estruturas de concreto armado, como lajes, vigas e colunas, em pequenas construções, indústrias e empreendimentos. Sua superfície nervurada amplia a aderência ao concreto e proporciona resistência à obra.'] },
      { title:'Vergalhão CA-60', paragraphs:['Possui alta resistência e soldabilidade, permitindo a fabricação de telas eletrossoldadas e treliças. Também é usado na estruturação da construção civil e contribui para a segurança da obra.'] }
    ]
  },
  'viga-w-e-i': {
    image: '/images/products/legacy/viga-w-e-i.jpeg',
    imageAlt: 'Vigas estruturais de aço com perfis W e I',
    sourceParagraphs: ['A Viga W é utilizada principalmente em casas, galpões, quadras, pontes, ferrovias e outros projetos. Possui abas paralelas que permitem melhores ligações, encaixes e acabamentos estruturais. Já a Viga I proporciona encaixe preciso entre as peças e bom acabamento.']
  }
};

products.forEach((product) => Object.assign(product, originalProductContent[product.slug]));

export const productRouteSlug = (slug: string) => slug;

export const families = [
  ['Bobininha Slitada','/produtos/bobininha-slitada/','Bobinas menores para calhas, rufos, dutos e condutores.','layers'],
  ['Bobina Slitada','/produtos/bobina-slitada/','Aço cortado longitudinalmente para processos industriais.','layers'],
  ['Chapas de Aço','/produtos/chapas-de-aco/','Chapas lisas, xadrez e blanks cortados sob medida.','frame'],
  ['Laminados','/produtos/laminados/','Barras chatas, quadradas, redondas, cantoneiras e ferro T.','ruler'],
  ['Malha','/produtos/malha/','Malha CA-60 para lajes, pisos e estruturas pré-moldadas.','grid-3x3'],
  ['Perfil Estrutural','/produtos/perfil-estrutural/','Perfis simples, de encaixe e U enrijecido.','frame'],
  ['Telhas','/produtos/telhas/','Modelos metálicos, ondulados, translúcidos e termoacústicos.','panels-top-left'],
  ['Treliça','/produtos/trelica/','Componentes em aço nervurado para sistemas construtivos.','grid-3x3'],
  ['Tubos e Metalons','/produtos/tubos-e-metalons/','Seções redondas, quadradas, elípticas, retangulares e oblongas.','circle'],
  ['Vergalhão','/produtos/vergalhao/','Vergalhões CA-50 e CA-60 para concreto armado.','ruler'],
  ['Viga W e I','/produtos/viga-w-e-i/','Perfis para estruturas metálicas e obras de diferentes portes.','frame']
];

export const articles: BlogArticle[] = blogArticles;
