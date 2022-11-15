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
    aviso.textContent = 'o valor ' +(valorEmReal).toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})
    + ' convertido em ' +moedaEstrangeira+ ' é ' +moedaConvertida
}
function bloquearBotao(){
    if(valorDigitado.value == 0 || valorDigitado.value == '' || valorDigitado == null){
        btnConverter.setAttribute('disabled','disabled')
        btnConverter.style.background = '#ccc'
        btnConverter.style.cursor = 'not-allowed'
    }
}
function ativarBotao(){
    if(valorDigitado.value > 0){
        btnConverter.removeAttribute('disabled')
        btnConverter.style.background = '#ffc107'
        btnConverter.style.cursor = 'pointer'
    }else{
        console.log('número invalido')
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
            mensagemFormatada(parseFloat(valorDoBitcoin).toFixed(5))
            break    
    }

    isNaN(moedaConvertida) ? moedaConvertida = 0 : ''
})
btnLimpar.addEventListener('click',function() {
    bloquearBotao()
    valorDigitado.value = ''
    valorDigitado.focus()
    aviso.textContent = 'Selecione uma moeda e a converta'
    moedaSelecionada[0].checked = false
    moedaSelecionada[1].checked = false
    moedaSelecionada[2].checked = false
    moedaSelecionada[3].checked = false
})