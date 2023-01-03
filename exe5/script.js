let moedaSelecionada = document.getElementsByName('moedaEstrangeira')
let btnConverter = document.querySelector('#btnConverter')
let valorDigitado = document.querySelector('#valorEmReal')
let btnLimpar = document.querySelector('#btnLimpar')
let aviso = document.querySelector('#aviso')
let moedaConvertida = ''
let moedaEstrangeira = ''
let valorDoDolar   = 5.31 
let valorDoEuro    = 6.23       
let valorDaLibra   = 7.26       
let valorDoBitcoin = 229762.85  
let valorEmReal    = 0

function mensagemFormatada(moedaConvertida){
    isNaN(valorEmReal) ? valorEmReal = 0 : ''
    aviso.textContent = `O valor ` +(valorEmReal).toLocaleString('pt-BR',{style:'currency', currency: 'BRL'})
    + ' o convertido em '+moedaEstrangeira+' é '+moedaConvertida
}
function bloquearBotao() {
    if(valorDigitado.value == 0 || valorDigitado == '' || valorDigitado == null) {
        btnConverter.setAttribute('disabled', 'disabled')
        btnConverter.style.background = '#ccc'
        btnConverter.style.cursor = 'not-allowed'
    }
}

function ativarBotao() {
    if(valorDigitado.value > 0) {
        btnConverter.removeAttribute('disabled')
        btnConverter.style.background = '#ffc107'
        btnConverter.style.cursor = 'pointer'
    } else {
        console.log('Nao ativou')
    }
}
btnConverter.addEventListener('click',() => {
    valorEmReal = parseFloat(valorDigitado.value)
    for(let i = 0; i < moedaSelecionada.length; i++){
        if(moedaSelecionada[i].checked){
            moedaEstrangeira = moedaSelecionada[i].value
        }
    }
    switch(moedaEstrangeira){
        case 'Dólar':
            moedaConvertida = valorEmReal / valorDoDolar
            mensagemFormatada(moedaConvertida.toLocaleString('en-US',{style: 'currency', currency: 'USD'}))
            break
        case 'Euro':
            moedaConvertida = valorEmReal / valorDoEuro
            mensagemFormatada(moedaConvertida.toLocaleString('de-DE',{style: 'currency', currency: 'EUR'}))
            break
        case 'Libra':
            moedaConvertida = valorEmReal / valorDaLibra
            mensagemFormatada(moedaConvertida.toLocaleString('en-GB',{style: 'currency', currency: 'GBP'}))
            break
        case 'Bitcoins':
            moedaConvertida = valorEmReal / valorDoBitcoin
            mensagemFormatada(parseFloat(moedaConvertida).toFixed(5))
            break
        default:
            return
    }
    isNaN(moedaConvertida) ? moedaConvertida = 0 : ''
})
btnLimpar.addEventListener('click',() => {
    bloquearBotao()
    valorDigitado.focus()
    valorDigitado.value = ''
    aviso.textContent = 'Clique no botão para converter'
    moedaSelecionada[0].checked = false
    moedaSelecionada[1].checked = false
    moedaSelecionada[2].checked = false
    moedaSelecionada[3].checked = false
})