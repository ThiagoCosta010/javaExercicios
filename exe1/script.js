let formulario = document.querySelector('form')
let cxNome = document.querySelector('#nome')
let cxIdade = document.querySelector('#idade')
let cxPeso = document.querySelector('#peso')
let cxAltura = document.querySelector('#altura')
let cxImc = document.querySelector('#resultadoImc')
let aviso = document.querySelector('#aviso')
let dados = document.querySelectorAll('.pessoa')
let btnEnviar = document.querySelector('#btnEnviar')
let btnLimpar = document.querySelector('#btnLimpar')

btnEnviar.addEventListener('click',(e) => {
    let nome = cxNome.value
    let idade = cxIdade.value
    let peso = cxPeso.value
    let altura = cxAltura.value
    let imc = (peso / (altura * altura)).toFixed(2)

    cxImc.value = imc
    let sit = situacaoDoPeso(imc)
    aviso.textContent = sit

    let pessoa = {
        nome : nome,
        idade : idade,
        peso : peso,
        altura : altura,
        imc : imc,
        sit : sit
    }
    dados[0].textContent = `${pessoa.nome}`
    dados[1].textContent = `${pessoa.idade} anos`
    dados[2].textContent = `${pessoa.peso} kg`
    dados[3].textContent = `${pessoa.altura} m`
    dados[4].textContent = `${pessoa.imc} ${pessoa.sit}`

    e.preventDefault()
})
function situacaoDoPeso(imc){
    let situacao = ''
    if(imc < 18.5){
        situacao = 'Baixo peso'
    }else if(imc >= 18.5 && imc <= 24.9){
        situacao = 'Peso normal'
    }else if(imc >= 25 && imc <= 29.9){
        situacao = 'Sobrepeso'
    }else if(imc >= 30 && imc <= 34.9){
        situacao = 'Obesidade I'
    }else if(imc >= 35 && imc <= 39.9){
        situacao = 'Obesidade II'
    }else if(imc >= 40){
        situacao = 'Obesidade III'
    }else{
        situacao = 'Informe seu peso corretamente'
    }
    return situacao
}
btnLimpar.addEventListener('click', function() {
    location.reload()
})