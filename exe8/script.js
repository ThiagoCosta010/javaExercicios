let telogio = document.querySelector('#relogio')
let h = document.querySelector('#h')
let m = document.querySelector('#m')
let s = document.querySelector('#s')

let hSmart = document.querySelector('#hSmart')
let mSmart = document.querySelector('#mSmart')
let sSmart = document.querySelector('#sSmart')

let data = document.querySelector('#data')
let semana = document.querySelector('#semana')

let dataHora = new Date()

function moveRelogio(){

    let momentoAtual = new Date()

    let hora = momentoAtual.getHours()
    let minuto = momentoAtual.getMinutes()
    let segundo = momentoAtual.getSeconds()

    let strHora = new String(hora)
    let strMinuto = new String(minuto)
    let strSegundo = new String(segundo)

    if(strHora.length == 1) hora = '0' + hora
    if(strMinuto.length == 1) minuto = '0' + minuto
    if(strSegundo.length == 1) segundo = '0' + segundo

    h.textContent = hora
    m.textContent = minuto
    s.textContent = segundo

    hSmart.textContent = hora
    mSmart.textContent = minuto
    sSmart.textContent = segundo

    setInterval('moveRelogio()', 1000)
}
function pegarData(){

    let dataSemana = dataHora.getDay()
    let dia = dataHora.getDate()
    let mes = dataHora.getMonth() + 1
    let ano = dataHora.getFullYear()

    let strDia = new String(dia)
    let strMes = new String(mes)

    if(strDia.length == 1) dia = '0' + dia
    if(strMes.length == 1) mes = '0' + mes

    switch(dataSemana){
        case 0:
            dataSemana = 'DOM'
            break
        case 1:
            dataSemana = 'SEG'
            break
        case 2:
            dataSemana = 'TER'
            break   
        case 3:
            dataSemana = 'QUA'
            break
        case 4:
            dataSemana = 'QUI'
            break
        case 5:
            dataSemana = 'SEX'
            break   
        case 6:
            dataSemana = 'SAB'
            break               
    }

    let dataAtual = dia + '/' + mes + '/' + ano
    data.textContent = dataAtual
    semana.textContent = dataSemana
    
}
pegarData()

function getUserPosition(){
    let url = ''
    navigator.geolocation.getCurrentPosition((pos) => {
        let lat = pos.coords.latitude
        let long = pos.coords.longitude
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=56dcb9ce9559149ad636a6d45e5f633b`
        fetchApi(url)
        console.log(url)
    })
}
function fetchApi(url){
    let city = document.querySelector('.city')
    let temperature = document.querySelector('#temp')
    let huminaty = document.querySelector('#umidad')
    fetch(url)
    .then((data) => {
        return data.json()
    })
    .then((data) => {
        let tempInCelsius = ((5/9) * (data.main.temp-32)).toFixed(1)

        city.textContent = data.name
        temperature.textContent = tempInCelsius
        huminaty.textContent = data.main.huminaty
    })
    .catch((err) => {
        city.innerHTML = 'Erro ao acessar o Open Weather'
        temperature.textContent = '-'
        huminaty.textContent = '-'
    })
}
getUserPosition()
/* url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=56dcb9ce9559149ad636a6d45e5f633b`*/
