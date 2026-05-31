# Plus Viver - Dignidade para Pessoas com Obesidade

## Sobre o Projeto

Plus Viver é um aplicativo mobile desenvolvido para resolver um problema real e urgente: a discriminação que pessoas com obesidade enfrentam diariamente em todos os aspectos da vida.

Este projeto foi criado como parte do Projeto Extensionista IV, com o objetivo de desenvolver uma solução digital funcional que gere impacto social real, validada junto à comunidade.

## O Problema Real

No Brasil, 25.9 por cento da população tem obesidade, e 62.1 por cento tem excesso de peso, segundo dados do IBGE. Estes números representam milhões de pessoas que enfrentam diariamente:

- Médicos que atribuem todas as suas doenças ao peso, sem realizar exames adequados
- Empresas que descartam seus currículos pela chamada falta de imagem profissional
- Assentos de ônibus e avião que machucam ou não fecham o cinto de segurança
- Universidades sem cadeiras largas, forçando alunos a passarem horas em desconforto
- Aplicativos de relacionamento que rejeitam fotos de corpos gordos
- Cinemas e clubes que os excluem por falta de estrutura
- Funerárias que cobram até oito mil reais por um caixão plus size

Uma pesquisa realizada com cinquenta pessoas com obesidade mostrou que noventa e quatro por cento já sofreram discriminação na saúde, oitenta e oito por cento foram humilhadas no transporte público, e setenta e seis por cento sofreram preconceito em entrevistas de emprego. Noventa e dois por cento dos entrevistados afirmaram que usariam um aplicativo que resolvesse todos estes problemas em um só lugar.

## A Solução

Plus Viver ataca a discriminação em sete cenários críticos da vida de uma pessoa com obesidade:

### Saude
Conecta o usuário com médicos especialistas que realmente escutam, mapeia hospitais com macas e equipamentos adequados, e informa sobre o tempo de espera para cirurgia bariátrica pelo SUS.

### Trabalho
Lista empresas com vagas afirmativas e selo de inclusão, e fornece modelos para denunciar discriminação em processos seletivos com base na Lei 14.532/2023.

### Transporte
Mapeia empresas de avião e ônibus que oferecem cinto extensor de forma discreta, e fornece modelos de processo por humilhação pública.

### Educacao
Oferece um ranking de universidades com cadeiras largas, um modelo de requerimento para solicitar adaptações, e canal de denúncia ao Ministério da Educação.

### Amor
Apresenta um aplicativo de relacionamento exclusivo para pessoas com obesidade, grupos de apoio para autoestima, e orientação para denunciar aplicativos preconceituosos.

### Lazer
Mapeia cinemas, clubes e parques com assentos adaptados, e oferece um botão para denunciar discriminação com foto e geolocalização.

### Dignidade na Morte
Apresenta um mutirão de caixões plus size a preço popular de oitocentos reais, planos funerários inclusivos, e canal para denunciar cobranças abusivas.

## Impacto Social Esperado

Com o uso do Plus Viver, espera-se:

- Reduzir em quarenta e cinco por cento o número de pessoas que evitam ir ao médico por medo de gordofobia
- Aumentar em vinte e cinco por cento o número de empresas com programas de inclusão para obesos
- Aumentar em cinquenta e cinco por cento o número de transportes públicos com assentos adaptados
- Aumentar em quarenta e três por cento o número de universidades com cadeiras largas
- Reduzir em oitenta e nove por cento o custo médio de funeral para pessoas com obesidade
- Aumentar em mais de dois mil e quinhentos por cento o número de processos judiciais ganhos por discriminação

## Tecnologias Utilizadas

- React Native para desenvolvimento mobile
- Firebase para autenticação e banco de dados
- Expo para desenvolvimento e testes
- React Navigation para navegação entre telas
- Linear Gradient para efeitos visuais

## Funcionalidades Implementadas

O aplicativo conta com quatro telas principais:

Tela de Login onde o usuário pode se cadastrar com nome, peso, altura, idade, cidade e gênero, ou fazer login se já tiver conta. Inclui funcionalidade de recuperação de senha por e-mail.

Tela Dashboard que exibe dados personalizados do usuário, estatísticas de impacto, conquistas desbloqueadas, histórico de atividades, dados reais do IBGE sobre obesidade, e os sete botões de acesso aos cenários.

Tela de Cenário que apresenta três soluções específicas para cada um dos sete cenários, além de informações sobre leis que protegem a pessoa com obesidade e dados sobre hospitais ou empresas parceiras.

Tela de Denúncia onde o usuário pode registrar uma discriminação com tipo, local e descrição detalhada. O sistema gera automaticamente um protocolo e orienta sobre os próximos passos legais.

Tela de Comunidade que exibe estatísticas globais do aplicativo, depoimentos reais de usuários, e incentiva o compartilhamento de histórias de superação.

## Como Executar o Projeto

Para executar o Plus Viver em seu ambiente local, siga os passos abaixo.

Pré-requisitos:
- Node.js instalado no computador
- Expo CLI instalado globalmente ou npx disponível
- Celular com aplicativo Expo Go instalado ou emulador Android

Passos:

Clone o repositório:
git clone https://github.com/7elprado/plus-viver.git

Entre na pasta do projeto:
cd plus-viver

Instale as dependências:
npm install

Inicie o servidor de desenvolvimento:
npx expo start

Para testar no celular, escaneie o QR code com o aplicativo Expo Go. Para testar no navegador, pressione a tecla W no terminal.

## Estrutura do Projeto

plus-viver/

├── src/

│   ├── screens/

│   │   ├── LoginScreen.js

│   │   ├── DashboardScreen.js

│   │   ├── CenarioDetailScreen.js

│   │   ├── DenunciaScreen.js

│   │   └── ComunidadeScreen.js

│   ├── services/

│   │   └── firebase.js

│   └── styles/

│       └── global.js

├── App.js

├── package.json

└── README.md

## Evidências de Validação

O projeto foi validado com a comunidade através de um formulário aplicado a cinquenta pessoas com obesidade em grupos de apoio no Facebook e WhatsApp. Os principais resultados foram:

- Noventa e quatro por cento sofreram discriminação na saúde
- Oitenta e oito por cento foram humilhadas no transporte
- Setenta e seis por cento sofreram preconceito no trabalho
- Sessenta e oito por cento foram excluídas na educação
- Oitenta e dois por cento sofreram discriminação no lazer
- Noventa e dois por cento usariam o aplicativo

Um depoimento real coletado durante a pesquisa:

"Já fui humilhada em médico, em ônibus, em entrevista de emprego, em cinema, em aplicativo de namoro. E semana passada meu tio obeso morreu e a funerária pediu oito mil reais pelo caixão especial. Minha tia não tinha dinheiro. Enterramos em caixão normal, com o corpo forçado. Eu jurei que isso não aconteceria comigo. Um aplicativo que resolve tudo isso seria minha salvação."

Carla S., quarenta e sete anos, grupo Obesidade e Dignidade no Facebook.

## Lições Aprendidas

Durante o desenvolvimento deste projeto, enfrentamos desafios técnicos como conflitos de dependências do Expo, problemas de conexão em redes compartilhadas, e a curva de aprendizado do React Native. No entanto, a maior lição foi compreender o poder da tecnologia para resolver problemas reais de pessoas reais.

Aprendemos que um simples aplicativo pode empoderar pessoas a lutarem por seus direitos, a se sentirem menos sozinhas, e a encontrarem soluções para problemas que antes pareciam sem saída. A tecnologia não é apenas código. É uma ferramenta de transformação social.

## O que Fariamos Diferente

Em uma próxima versão, implementaríamos uma integração completa com APIs reais do IBGE e DATASUS, adicionaríamos um chat em tempo real na comunidade, e publicaríamos o aplicativo na Google Play Store para alcançar mais pessoas.

## Licença

Este projeto foi desenvolvido para fins acadêmicos como parte do Projeto Extensionista IV.

## Contato

Para mais informações, dúvidas ou sugestões, entre em contato através do e-mail: plusviver@plusviver.com.br

## Agradecimentos

Agradecemos a todas as pessoas que participaram da pesquisa e compartilharam suas histórias. Vocês são a razão deste projeto existir.

Plus Viver. Da humilhação à dignidade. Em cada cenário da sua vida.