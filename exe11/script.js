let ulsElis = document.querySelectorAll('ul li')

let qtdDeItems = ulsElis.length
console.log('Quantidade videos ' +qtdDeItems)

let numDeItems = 6

let lista1 = document.querySelectorAll('#lista1 li')
let lista2 = document.querySelectorAll('#lista2 li')
let lista3 = document.querySelectorAll('#lista3 li')
let lista4 = document.querySelectorAll('#lista4 li')
let lista5 = document.querySelectorAll('#lista5 li')

let numDeVideos = document.querySelectorAll('.numDeVideos')

numDeVideos[0].textContent = lista1.length
numDeVideos[1].textContent = lista2.length
numDeVideos[2].textContent = lista3.length
numDeVideos[3].textContent = lista4.length
numDeVideos[4].textContent = lista5.length

function show(indice, indiceLista){
    let n = indice
    numDeItems = indice + numDeItems
    console.log(n+ ' ' +numDeItems)

    let listaUl = document.querySelector('#lista' + indiceLista)
    let mover = 100

    let posicaoXDireita = mover
    let posicaoXEsquerda = -mover

    if(indice == + 1){
        listaUl.scrollBy(posicaoXDireita, 0)
    }
    if(indice == - 1){
        listaUl.scrollBy(posicaoXEsquerda, 0)
    }
}
