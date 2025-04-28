# Jogo da Memória de Cartas

## Descrição
Este é um jogo da memória de cartas simples desenvolvido com HTML, CSS e JavaScript. O jogo permite aos jogadores combinarem pares de cartas idênticas, com diferentes níveis de dificuldade (fácil, médio e difícil).

## Funcionalidades
- Três níveis de dificuldade:
  - Fácil: 6 pares de cartas
  - Médio: 8 pares de cartas
  - Difícil: 12 pares de cartas
- Contador de tempo
- Contador de tentativas
- Contador de pares encontrados
- Botão para reiniciar o jogo
- Modal de vitória com estatísticas finais

## Instalação

### Pré-requisitos
- Node.js instalado em seu sistema
- NPM (Node Package Manager)

### Passos para instalação
1. Clone o repositório ou baixe os arquivos para seu computador
2. Navegue até a pasta do projeto no terminal
3. Instale as dependências:
   ```
   npm install express
   ```
4. Inicie o servidor:
   ```
   node server.js
   ```
5. Acesse o jogo em seu navegador através do endereço: `http://localhost:3000`

## Estrutura de arquivos
- `index.html` - Estrutura principal da página
- `style.css` - Estilos da aplicação
- `script.js` - Lógica do jogo
- `server.js` - Servidor Express para hospedar o jogo
- `/images` - Pasta contendo as imagens das cartas (card1.png, card2.png, etc.)


## Como jogar
1. Selecione o nível de dificuldade desejado
2. Clique nas cartas para virá-las
3. Encontre todos os pares para vencer o jogo
4. O tempo e número de tentativas serão registrados
5. Tente completar o jogo com o menor tempo e número de tentativas possíveis

## Desenvolvido para
Curso de WEB_ÍÍ do IFMG/ Projeto pessoal 
