function timer() {
    let timer = 0;

    alert('Aperte o OK para iniciar o jogo!');
    const countTime = document.getElementById('timer'); //temporizador  
    setInterval(() => {
        timer++;
        countTime.textContent = timer;
    }, 1000);
}

function countTry() {
    let count = 0;
    const countClick = document.getElementById('tryCount'); //conta o número de tentativas

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('card')) {
            count++;
            countClick.textContent = count;
        }
    });
}

let points = 0;
let chosen1 = null;
let chosen2 = null;
function createImg(container, pathImage) { //cria um div para cada imagem  
    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.src = pathImage;
    image.alt = 'cartas de baralho';
    image.classList.add('image', 'hidden');

    card.appendChild(image); //adiciona a imagem no div  
    container.appendChild(card); //adiciona as imagens no container principal  

    card.addEventListener('click', () => { //vira as cartas  
        image.classList.remove('hidden');

        if (chosen1 === null) {
            chosen1 = image;
        }
        else if (chosen2 === null) {
            chosen2 = image;

            if (chosen1.src === chosen2.src) {
                chosen1 = null;
                chosen2 = null;
                points++;
                if (points === 6) {
                    setTimeout(() => {
                        alert('Parabéns, você completou o jogo!');
                    }, 500);
                }
            }
            else {
                setTimeout(() => {
                    chosen1.classList.add('hidden');
                    chosen2.classList.add('hidden');
                    chosen1 = null;
                    chosen2 = null;
                }, 500);

            }
        }

    });

}

function shuffled(array) {
    return array.sort(() => Math.random() - 0.5); //função recomendada pelo professor  
}


function loadImages() {
    const images = [];

    for (let i = 1; i < 7; i++) {
        images.push(`/images/card${i}.png`);
    }
    return images;
}

function main(paths) {
    const memoryGame = document.getElementById('memoryGame');
    memoryGame.innerHTML = '';
    const cards = shuffled([...paths, ...paths]); // duplica as imagens e embaralha  

    cards.forEach(path => {
        createImg(memoryGame, path); // cria as cartas
    });
    timer();
    countTry();
}

// Chame a função main com os caminhos das imagens  
main(loadImages());