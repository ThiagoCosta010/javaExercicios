let telogio = document.querySelector('#relogio')
let h = document.querySelector('#h')
let m = document.querySelector('#m')
let s = document.querySelector('#s')

let hSmart = document.querySelector('#hSmart')
let mSmart = document.querySelector('#mSmart')
let sSmart = document.querySelector('#sSmart')

let data = document.querySelector('#data')
let semana = document.querySelector('#semana')

let dataSemanal = new Date()

function moveRelogio(){
    let horasAtual = new Date()
    let hora = horasAtual.getHours()
    let minutos = horasAtual.getMinutes()
    let segundos = horasAtual.getSeconds()

    let strHora = new String(hora)
    let strMinuto = new String(minutos)
    let strSegundo = new String(segundos)

    if(strHora.length === 1) hora = '0' + hora 
    if(strMinuto.length === 1) hora = '0' + minutos 
    if(strSegundo.length === 1) hora = '0' + segundos
    
    h.textContent = hora
    m.textContent = minutos
    s.textContent = segundos

    hSmart.textContent = hora
    mSmart.textContent = minutos
    sSmart.textContent = segundos

    setTimeout(moveRelogio, 1000)
}
function pegarData(){
    let diaSemana = dataSemanal.getDay()
    let dia = dataSemanal.getDate()
    let mes = dataSemanal.getMonth() + 1
    let ano = dataSemanal.getFullYear()

    let strDia = new String(dia)
    let strMes = new String(mes)

    if(strDia.length === 1) dia = '0' + dia
    if(strMes.length === 1) mes = '0' + mes

    switch(diaSemana){
        case 0:
            diaSemana = 'DOM'
            break
        case 1:
            diaSemana = 'SEG'
            break
        case 2:
            diaSemana = 'TER'
            break
        case 3:
            diaSemana = 'QUA'
            break
        case 4:
            diaSemana = 'QUI'
            break
        case 5:
            diaSemana = 'SEX'
            break
        case 6:
            diaSemana = 'SAB'
            break
    }
    let dataFormatada = dia+ '/' +mes+ '/' +ano
    semana.textContent = dataFormatada
    data.textContent = diaSemana
}
pegarData()
function getUserPosition(){
    navigator.geolocation.getCurrentPosition((pos) => {
        let url = ''
        let lat = pos.coords.latitude
        let long = pos.coords.longitude
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=56dcb9ce9559149ad636a6d45e5f633b`
        fetchApi(url)
        .then((data) => {
            return data.json()
        })
    })
}
function fetchApi(url){
    let city = document.querySelector('.city')
    let temp = document.querySelector('#temp')
    let humidity = document.querySelector('#umidad')
    fetch(url)
    .then((data) => {
        return data.json()
    })
    .then((data) => {
        let tempInCelsius = ((5/9) * (data.main.temp-32)).toFixed(1)

        city.textContent = data.name
        humidity.textContent = data.main.humidity
        temp.textContent = tempInCelsius
    })
    .catch((err) => {
        city.textContent = 'Erro ao acessar Open Weather'
        temp.textContent = '-'
    })
}
getUserPosition()
/* url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=56dcb9ce9559149ad636a6d45e5f633b`*/
