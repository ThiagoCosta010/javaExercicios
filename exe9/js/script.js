let imgFoto       = document.querySelector('#foto')
let nome          = document.querySelector('#nome')
let nacionalidade = document.querySelector('#nacionalidade')
let idade         = document.querySelector('#idade')
let peso          = document.querySelector('#peso')
let altura        = document.querySelector('#altura')

let sectionConteudos = document.querySelector('.conteudos')

const url = 'cards.json'

function pegarDados(i){
    fetch(url)
    .then(response => response.json())
    .then(dados => {
        if(dados.erro){
            console.log('Erro ao acessar arquivo JSON')
            return
        }
        let qtdDeLutadores = (dados.lutadores.length)
        console.log('Número de lutadores '+qtdDeLutadores)
        atribuirDados2(dados, i)
    })
}
function atribuirDados(dados, i){
    imgFoto.setAttribute('src', 'img/'+dados.lutadores[i].foto)
    nome.textContent = dados.lutadores[i].nome
    nacionalidade.textContent = dados.lutadores[i].nacionalidade
    idade.textContent = dados.lutadores[i].idade + ' anos'
    peso.textContent = (dados.lutadores[i].peso).toString(2) + ' kg'
    altura.textContent = (dados.lutadores[i].altura).toString(2) + ' m'
}
let imgsFoto = document.getElementsByClassName('foto')
let nomeLutadores = document.getElementsByClassName('nome')
let nacionalidadeLutadores = document.getElementsByClassName('nacionalidade')
let idadeLutadores = document.getElementsByClassName('idade')
let pesoLutadores = document.getElementsByClassName('peso')
let alturaLutadores = document.getElementsByClassName('altura')

function atribuirDados2(dados, i){
    imgsFoto[i].setAttribute('src','img/'+dados.lutadores[i].foto)
    nomeLutadores[i].textContent = dados.lutadores[i].nome
    nacionalidadeLutadores[i].textContent = dados.lutadores[i].nacionalidade
    idadeLutadores[i].textContent = dados.lutadores[i].idade + ' anos'
    pesoLutadores[i].textContent = dados.lutadores[i].peso + ' kg'
    alturaLutadores[i].textContent = dados.lutadores[i].altura + ' m'
}
function desenharCarta(id){
    let carta = document.createElement('article')
    carta.setAttribute('class', 'card')
    sectionConteudos.appendChild(carta)

    let imagem = document.createElement('img')
    imagem.setAttribute('src','img/pride_fc.jpg')
    imagem.setAttribute('class','foto')
    carta.appendChild(imagem)

    let nomeLutador = document.createElement('h2')
    nomeLutador.setAttribute('class','nome')
    carta.appendChild(nomeLutador)
    nomeLutador.textContent = 'nome' 

    let nacionalidadeLutador = document.createElement('h3')
    nacionalidadeLutador.setAttribute('class','nacionalidade')
    carta.appendChild(nacionalidadeLutador)
    nacionalidadeLutador.textContent =  'nacionalidade'

    let idadeLutador = document.createElement('h3')
    idadeLutador.setAttribute('class','idade')
    carta.appendChild(idadeLutador)
    idadeLutador.textContent =  'idade anos'

    let pesoLutador = document.createElement('h3')
    pesoLutador.setAttribute('class','peso')
    carta.appendChild(pesoLutador)
    pesoLutador.textContent =  'peso kg'

    let alturaLutador = document.createElement('h3')
    alturaLutador.setAttribute('class','altura')
    carta.appendChild(alturaLutador)
    alturaLutador.textContent =  'altura m'

    pegarDados(id)
}
pegarDados(0)

desenharCarta(1)
desenharCarta(2)
desenharCarta(3)
desenharCarta(4)
desenharCarta(5)
desenharCarta(6)
desenharCarta(7)
desenharCarta(8)
desenharCarta(9)