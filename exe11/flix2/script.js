let ulsElis = document.querySelectorAll('ul li')

let numDeLista = document.querySelectorAll('ul').length
console.log('numero de categorias: ' +numDeLista)

let qtdDeVideos = ulsElis.length
console.log('Quant. de videos = '+ qtdDeVideos)

let numDeItems = 5

let lista = []
for(let x = 1; x <= numDeLista; x++){
    lista[x] = document.querySelectorAll('#lista'+x+' li')
}
/*
let lista1 = document.querySelectorAll('#lista1 li')
let lista2 = document.querySelectorAll('#lista2 li')
let lista3 = document.querySelectorAll('#lista3 li')
let lista4 = document.querySelectorAll('#lista4 li')
let lista5 = document.querySelectorAll('#lista5 li')
*/
let numDeVideos = document.querySelectorAll('.numDeVideos')
for(let y = 0; y < numDeLista; y++){
    numDeVideos[y].textContent = lista[y+1].length
}
/*
numDeVideos[0].textContent = lista1.length
numDeVideos[1].textContent = lista2.length
numDeVideos[2].textContent = lista3.length
numDeVideos[3].textContent = lista4.length
numDeVideos[4].textContent = lista5.length
*/
function show(indice, indiceLista){
    let n = indice
    numDeItems = numDeItems + indice
    console.log(n+ '' +numDeItems)

    let listaUl = document.querySelector('#lista'+ indiceLista)

    let mover = 100
    let posicaoXDireita = mover
    let posicaoXEsquerda = -mover

    if(indice == +1){
        listaUl.scrollBy(posicaoXDireita, 0)
    }
    if(indice == -1){
        listaUl.scrollBy(posicaoXEsquerda, 0)
    }
}
// JANELA MODAL COM VIDEO
// EXIBE O VIDEO USANDO IFRAME DO YOUTUBE COM BASE NO CODIGO DO VIDEO
let iframeVideo = document.querySelector('#iframeVideo')

function abrirModal(videoId){
    location.href = '#abrirModal'
    iframeVideo.setAttribute('src', `https://www.youtube.com/embed/${videoId}`)
}