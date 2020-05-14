//variavel serve para a função poder ser movida apenas uma vez a cada chamada da função 'move'
let count = 0;

//variavel serve para contabilizar os pontos
let points = 1;

//variavel serve para inicializar a contagem dos pontos
let initialPoint = 0;

//variavel serve para fazer a contagem dos espaços em brancos
let blankSpaces = 0;

//variavel serve para gravar os movimentos feitos
let moves = []

//as funções de movimento funcionam da seguinte forma:
//ex: o programa encontra um espaço em branco 'A4'
//o programa vai verificar se 'A2' e 'A3' contém peças, se eles contém peças, é possivel fazer o movimento.
//o programa irá fazer a mesma verificação para 'A5'-'A6'; 'B4'-'C4'
//quando ele for verificar as posiçoes em cima, ele irá pular a instrução pois não existe 'td' disponível

//função que faz o movimento vertical de cima para baixo
function moveTopToBotton(letra, numero) {
    if (count == 0 && $(`#${letra}${numero - 1}`).find('.Piece').length && $(`#${letra}${numero - 2}`).find('.Piece').length) {
        $(`#${letra}${numero - 1 + 0}`).find('.Piece').remove()
        $(this).append("<div class='bodyOfPiece Piece'></div>")
        $(`#${letra}${numero - 2}`).find('.Piece').remove()
        count++;
        points++;
        moves.push(letra + (numero - 2) + '-' + letra + (numero - 1) + '-' + letra + numero)
    }
}

//função que faz o movimento vertical de baixo para cima
function moveBottonToTop(letra, numero) {
    if (count == 0 && $(`#${letra}${numero - 1 + 2}`).find('.Piece').length && $(`#${letra}${numero - 1 + 3}`).find('.Piece').length) {
        $(`#${letra}${numero - 1 + 3}`).find('.Piece').remove()
        $(this).append("<div class='bodyOfPiece Piece'></div>")
        $(`#${letra}${numero - 1 + 2}`).find('.Piece').remove()
        count++;
        points++;
        moves.push(letra + (numero - 1 + 3) + '-' + letra + (numero - 1 + 2) + '-' + letra + numero)
    }
}

//função que faz o movimento horizontal da esquerda para direita
function moveLeftToRight(letra, numero, letra2) {
    if (count == 0 && $(`#${String.fromCharCode(letra2 - 1 + 2)}${numero}`).find('.Piece').length && $(`#${String.fromCharCode(letra2 - 1 + 3)}${numero}`).find('.Piece').length) {
        $(`#${String.fromCharCode(letra2 - 1 + 3)}${numero}`).find('.Piece').remove()
        $(this).append("<div class='bodyOfPiece Piece'></div>")
        $(`#${String.fromCharCode(letra2 - 1 + 2)}${numero}`).find('.Piece').remove()
        count++;
        points++;
        if (letra) {
            const letraAnterior = String.fromCharCode(letra2 - 1 + 2)
            const letra2Anterior = String.fromCharCode(letra2 - 1 + 3)
            moves.push(letra2Anterior + numero + '-' + letraAnterior + numero + '-' + letra + numero)
        }
    }
}

let functions = [moveTopToBotton, moveBottonToTop, moveRigthToLeft, moveLeftToRight]
//função que faz o movimento horizontal da direita para esquerda
function moveRigthToLeft(letra, numero, letra2) {
    if (count == 0 && $(`#${String.fromCharCode(letra2 - 1).replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '')}${numero}`).find('.Piece').length && $(`#${String.fromCharCode(letra2 - 2).replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-')}${numero}`).find('.Piece').length) {
        $(`#${String.fromCharCode(letra2 - 1 + 0)}${numero}`).find('.Piece').remove()
        $(this).append("<div class='bodyOfPiece Piece'></div>")
        $(`#${String.fromCharCode(letra2 - 2)}${numero}`).find('.Piece').remove()
        count++;
        points++;
        if (letra) {
            const letraAnterior = String.fromCharCode(letra2 - 1)
            const letra2Anterior = String.fromCharCode(letra2 - 2)
            moves.push(letra2Anterior + numero + '-' + letraAnterior + numero + '-' + letra + numero)
        }
    }
}

//função que vertifica todas as 'td's e chama as funções de movimento
function move() {
    $('table').find('tr').each(function (indice) {
        $(this).find('td').each(function (indice) {
            if (!($(this).find('.Piece').length) && !($(this).hasClass('blankSpace'))) {
                let [letra, numero] = this.id
                //Como foi utilizado as letras A,B,C,D,E,F,G eu transformei as letras em numeros da tabela ASCII
                //para ser possivel manipular as letras
                // A variavel 'letra2' serve para transformar a letra e um numero da tabela ASCII
                let letra2 = letra.charCodeAt()
                const randonNumber = Math.floor(Math.random() * 4);
                // funçoes para se mover
                if(randonNumber == 0){
                    moveTopToBotton.call(this, letra, numero)
                    moveBottonToTop.call(this, letra, numero)
                    moveLeftToRight.call(this, letra, numero, letra2)
                    moveRigthToLeft.call(this, letra, numero, letra2)
                }
                if(randonNumber == 1){
                    moveBottonToTop.call(this, letra, numero)
                    moveTopToBotton.call(this, letra, numero)
                    moveLeftToRight.call(this, letra, numero, letra2)
                    moveRigthToLeft.call(this, letra, numero, letra2)
                }
                if(randonNumber == 2){
                    moveRigthToLeft.call(this, letra, numero, letra2)
                    moveLeftToRight.call(this, letra, numero, letra2)
                    moveTopToBotton.call(this, letra, numero)
                    moveBottonToTop.call(this, letra, numero)
                }
                if(randonNumber == 3){
                    moveLeftToRight.call(this, letra, numero, letra2)
                    moveRigthToLeft.call(this, letra, numero, letra2)
                    moveBottonToTop.call(this, letra, numero)
                    moveTopToBotton.call(this, letra, numero)
                }

            }
        });
    });
}

// temporizador que faz com que a funçao seja inicializado de acordo com o tempo que for definido
start = () => {
    const temporazidor = setInterval(() => {
        move()

        //se não puder mais movimentar irá entrar na condição
        if (points > 0 && initialPoint == points) {
            $('table').find('tr').each(function (indice) {
                $(this).find('td').each(function (indice) {
                    if (!($(this).find('.Piece').length) && !($(this).hasClass('blankSpace'))) {
                        blankSpaces = blankSpaces + 1;
                    }
                })
            })

            // Só vai entrar na condiçao se tiver 32 espaços em branco, assim finalizando o jogo
            if (blankSpaces == 32) {
                console.log('\n\n\n\n\n', moves)
                alert('Finalizou')
            }

            //reinicia o jogo
            location.reload();
        }
        initialPoint++;
        count = 0;
    }, 100);// tempo em milisegundo do temporizador
}
start()