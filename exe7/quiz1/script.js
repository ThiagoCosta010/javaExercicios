let titulo = document.querySelector('h1')
let instrucoes = document.querySelector('#instrucoes')
let aviso = document.querySelector('#aviso')
let pontos = 0
let placar = 0

let numQuestao = document.querySelector('#numQuestao')
let pergunta   = document.querySelector('#pergunta')

let a = document.querySelector('#a')
let b = document.querySelector('#b')
let c = document.querySelector('#c')

let articleQuestoes = document.querySelector('.questoes')
let alternativas = document.querySelector('#alternativas')

const q0= {
    numQuestao : 0,
    pergunta : 'Pergunta',
    alternativaA : 'Alternativa A',
    alternativaB : 'Alternativa B',
    alternativaC : "Alternativa C",
    correta      : "0",
}
const q1 = {
    numQuestao   : 1,
    pergunta     : "Boreal é o mesmo que...",
    alternativaA : "Sul",
    alternativaB : "Leste",
    alternativaC : "Norte",
    correta      : "Norte",
}

const q2 = {
    numQuestao   : 2,
    pergunta     : "Austral é o mesmo que...",
    alternativaA : "Oeste",
    alternativaB : "Sul",
    alternativaC : "Norte",
    correta      : "Sul",
}

const q3 = {
    numQuestao   : 3,
    pergunta     : "Nascente é o mesmo que...",
    alternativaA : "Sul",
    alternativaB : "Leste",
    alternativaC : "Oeste",
    correta      : "Leste",
}

const q4 = {
    numQuestao   : 4,
    pergunta     : "Poente é o mesmo que...",
    alternativaA : "Norte",
    alternativaB : "Leste",
    alternativaC : "Oeste",
    correta      : "Oeste",
}

const q5 = {
    numQuestao   : 5,
    pergunta     : "O Brasil se localiza em qual continente?",
    alternativaA : "África",
    alternativaB : "Europa",
    alternativaC : "América",
    correta      : "América",
}

const questoes = [q0,q1,q2,q3,q4,q5]

let total = document.querySelector('#total')
let numero = document.querySelector('#numero')

numero.textContent = q1.numQuestao
let totalDeQuestoes = (questoes.length) - 1
total.textContent = totalDeQuestoes

numQuestao.textContent = q1.numQuestao
pergunta.textContent = q1.pergunta
a.textContent = q1.alternativaA
b.textContent = q1.alternativaB
c.textContent = q1.alternativaC
a.setAttribute('value','1A')
b.setAttribute('value','1B')
c.setAttribute('value','1C')

function proximaQuestao(nQuestao){
    numero.textContent = nQuestao
    numQuestao.textContent = questoes[nQuestao].numQuestao
    pergunta.textContent = questoes[nQuestao].pergunta
    a.textContent = questoes[nQuestao].alternativaA
    b.textContent = questoes[nQuestao].alternativaB
    c.textContent = questoes[nQuestao].alternativaC
    a.setAttribute('value',nQuestao+'A')
    b.setAttribute('value',nQuestao+'B')
    c.setAttribute('value',nQuestao+'C')
}
function bloquearAlternativas(){
    a.classList.add('bloqueado')
    b.classList.add('bloqueado')
    c.classList.add('bloqueado')
}
function desbloquearAlternativas(){
    a.classList.remove('bloqueado')
    b.classList.remove('bloqueado')
    c.classList.remove('bloqueado')
}
function verificarSeAcertou(nQuestao, resposta){
    let numeroDaQuestao = nQuestao.value
    let respostaEscolhida = resposta.textContent
    let chute = questoes[numeroDaQuestao].correta
    if(respostaEscolhida == chute){
        pontos += 10
    }
    placar = pontos
    instrucoes.textContent = 'Pontos '+placar
    bloquearAlternativas()
    setTimeout(() => {
        proxima = numeroDaQuestao+1
        if(proxima > totalDeQuestoes){
            fimDoJogo()
        }else{
            proximaQuestao(proxima)
        }
    }, 150)
    desbloquearAlternativas()
}
function fimDoJogo(){
    instrucoes.textContent = 'Fim do jogo!'
    numQuestao.textContent = ''
    let ponto = ''
    pontos === 0 ? ponto = 'ponto' : ponto = 'pontos'

    aviso.textContent = 'Fim do jogo! Você terminou com '+pontos+ ' '+ponto
    pergunta.textContent = 'Fim do jogo! Você terminou com '+pontos+ ' '+ponto

    a.textContent = ''
    b.textContent = ''
    c.textContent = ''

    a.setAttribute('value' , '')
    b.setAttribute('value' , '')
    c.setAttribute('value' , '')

    articleQuestoes.style.display = 'none'

    setTimeout(() => {
        pontos = 0
        location.reload()
    }, 2000)
}