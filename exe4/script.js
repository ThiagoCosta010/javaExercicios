let musica = document.querySelector('#musicaDeFundo')
let aviso = document.querySelector('#aviso')
let btnChutar = document.querySelector('#btnChutar')
let inputNumero = document.querySelector('#inputNumero')
let min = 1
let max = 10
let contador = 1
let numeroSecreto = 0
let situacao = ''

function gerarNumeroSecreto(){
    numeroSecreto = Math.floor(Math.random()*(max - min + 1)) + min
    console.log(numeroSecreto)
}
function bloquearBtnChutar(){
    btnChutar.setAttribute('disabled','disabled')
    btnChutar.style.background = '#ccc'
    btnChutar.style.cursor = 'not-allowed'
}
function ativarBtnChutar(){
    btnChutar.removeAttribute('disabled')
    btnChutar.style.background = '#222'
    btnChutar.style.cursor = 'pointer'
}
function validarNumeroDigitado(numero){
    if(numero <= 0 || numero > 10){
        aviso.classList.add('errou')
        mensagemRapida('Digite um valor entre 1 e 10')
        inputNumero.value = ''
        bloquearBtnChutar()
    }else{
        console.log('numero valido')
    }
}
function jogar(){
    verificarSeAcertou()
}
function tocarMusicaDeFundo() {
    musica.play()
}
function ativarDesativarMusica() {
    if(musica.muted){
        musica.muted = false
    }else{
        musica.muted = true
    }
}
function pausarAtivarMusica(){
    musica.pause()
    musica.currentTime = 0
}
function mensagemRapida(mensagem){
    aviso.textContent = mensagem
    setTimeout(function(){
        aviso.textContent = ''
        aviso.classList.remove('errou')
        aviso.classList.remove('acertou')
        inputNumero.value = ''
    },3000)
}
function gameOver(situacao){
    switch(situacao){
        case 'Acertou':
            aviso.classList.add('acertou')
            mensagemRapida('Você acertou o número secreto é: '+numeroSecreto)
            break
        case 'Chute maior':
            aviso.classList.add('errou')
            mensagemRapida('Chute maior que o número secreto')  
            break
        case 'Chute menor':
            aviso.classList.add('errou')     
            mensagemRapida('Chute menor que o número secreto')
            break
        default:
            console.log('situação indefinida')     
    }
}
function verificarSeAcertou(){
    chute = parseInt(document.querySelector('#inputNumero').value)
    if(chute == numeroSecreto){
        situacao = 'Acertou'
        gameOver(situacao)
        gerarNumeroSecreto()
    }else if(chute > numeroSecreto){
        situacao = 'Chute maior'
        gameOver(situacao)
    }else if(chute < numeroSecreto){
        situacao = 'Chute menor'
        gameOver(situacao)
    }else{
        console.log('Impossível saber se acertou')
    }
}