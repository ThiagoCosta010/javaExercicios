let cxNota1 = document.querySelector('#nota1')
let cxNota2 = document.querySelector('#nota2')
let cxMedia = document.querySelector('#media')
let btnCalcular = document.querySelector('#btnCalcular')
let btnLimpar = document.querySelector('#btnLimpar')
let aviso = document.querySelector('#aviso')
let cxSituacao = document.querySelector('#situacao')
let formulario = document.querySelector('form')

function calcularMedia(n1,n2){
    return (n1 + n2) / 2
}
function situacaoFinal(nota){
    let situacaoFinal = ''
    if(nota >= 7){
        situacaoFinal = 'Aprovado(a)'
    }else if(nota <= 3){
        situacaoFinal = 'Reprovado(a)'
    }else{
        situacaoFinal = 'Recuperação'
    }
    return situacaoFinal
}
function formatarSituacao(situacaoFinal){
    switch(situacaoFinal){
        case 'Aprovado(a)':
            cxSituacao.classList.remove('reprovado')
            cxSituacao.classList.remove('recuperacao')
            cxSituacao.classList.add('aprovado')
            break
        case 'Reprovado(a)':
            cxSituacao.classList.remove('aprovado')
            cxSituacao.classList.remove('recuperacao')
            cxSituacao.classList.add('reprovado')
            break
        case 'Recuperação':
            cxSituacao.classList.remove('reprovado')
            cxSituacao.classList.remove('aprovado')
            cxSituacao.classList.add('recuperacao')
            break        
        default:
            console.log('situação indefinida')   
    }
}
function validarNumero(numero){
    let num1 = cxNota1.value
    let num2 = cxNota2.value
    if(num1 < 0 || num1 > 10 || num2 < 0 || num2 > 10){
        cxSituacao.value = ''
        aviso.classList.add('alerta')
        aviso.textContent = 'Digite um número entre 1 e 10'
        setTimeout(function() {
            aviso.classList.remove('alerta')
            aviso.textContent = ''
        },2000)
    }
}
btnCalcular.addEventListener('click', function(e) {
    let nota1 = parseFloat(cxNota1.value)
    let nota2 = parseFloat(cxNota2.value)
    let media = calcularMedia(nota1,nota2)
    if(isNaN(media) || media < 0){
        cxSituacao.value = ''
    }else{
        cxMedia.value = parseFloat(media)
        cxSituacao.value = situacaoFinal(media)
        formatarSituacao(situacaoFinal(media))
    }
    e.preventDefault()
})
btnLimpar.addEventListener('click',function(){
    cxSituacao.classList.remove('aprovado')
    cxSituacao.classList.remove('recuperacao')
    cxSituacao.classList.remove('reprovado')
})