let divAviso = document.querySelector('#aviso')
let ulsElis = document.querySelectorAll('ul li')
let numDeListas = document.querySelectorAll('.categoria').length
console.log('Núm de categorias '+numDeListas)
let numDeItems = 5
function show(indice, indiceLista){
    let listaUl = document.querySelector('#lista'+indiceLista)
    let mover = 100
    let posicaoXDireita = mover
    let posicaoXEsquerda = -mover
    if(indice == 1) listaUl.scrollBy(posicaoXDireita, 0)
    if(indice == -1) listaUl.scrollBy(posicaoXEsquerda, 0)
}
let iframeVideo = document.querySelector('#iframeVideo')

function abrirModal(videoId){
    location.href = '#abrirModal'
    iframeVideo.setAttribute('src',`https://www.youtube.com/embed/${videoId}`)
}
const url = 'videos.json'
function pegarDados(){
    fetch(url)
    .then(response => response.json())
    .then(dados => {
        console.log(dados)
        let quantDeVideosJson = dados.videos.length
        console.log('videos JSON '+quantDeVideosJson)
        let quantDeCategorias = dados.categorias.length
        console.log('quantidade de categoria '+quantDeCategorias)
    })
}
let ul1 = document.querySelector('#lista1')
let ul2 = document.querySelector('#lista2')
let ul3 = document.querySelector('#lista3')
let ul4 = document.querySelector('#lista4')
let ul5 = document.querySelector('#lista5')
let ul6 = document.querySelector('#lista6')

let titulosCategoria = document.querySelectorAll('.tituloCategoria')
function pegarDadosPorCategoria(categoriaId, lista){
    fetch(url)
    .then(response => response.json())
    .then(dados => {
        let qtdDeVideos = dados.videos.length
        let indiceAtual = categoriaId-1
        titulosCategoria[indiceAtual].textContent = dados.categorias[indiceAtual].titulo
        for(let y = 0; y < qtdDeVideos; y++){
            if(dados.videos[y].categoriaId == categoriaId){
                crirLiImg(categoriaId, dados.videos[y].videoId, lista)
            }
        }
    })
}
pegarDadosPorCategoria(1, ul1)
pegarDadosPorCategoria(2, ul2)
pegarDadosPorCategoria(3, ul3)
pegarDadosPorCategoria(4, ul4)
pegarDadosPorCategoria(5, ul5)
pegarDadosPorCategoria(6, ul6)

function dadosPorCategoria(categoria){
    console.log(categoria)
}
function crirLiImg(categoriaId, idVideo, nLista){
    let lista = nLista
    let item = document.createElement('li')
    lista.appendChild(item)
    let imagem = document.createElement('img')
    imagem.setAttribute('src', `https://img.youtube.com/vi/${idVideo}/maxresdefault.jpg`)
    imagem.setAttribute('class', `capa-thumb`)
    imagem.setAttribute('onClick', `abrirModal("${idVideo}")`)
    item.appendChild(imagem)
}