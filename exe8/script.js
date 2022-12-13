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
    let HorMinSeg = new Date()
    let hora = HorMinSeg.getHours()
    let minuto = HorMinSeg.getMinutes()
    let segundo = HorMinSeg.getSeconds()

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

    setInterval(moveRelogio, 1000)
}
function pegarData(){
    let diaSemana = dataSemanal.getDay()
    let dia = dataSemanal.getDate()
    let mes = dataSemanal.getMonth() + 1
    let ano = dataSemanal.getFullYear()

    let strDia = new String(dia)
    let strMes = new String(mes)

    if(strDia.length == 1) dia = '0' +dia
    if(strMes.length == 1) mes = '0' +mes

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
    let atualSemana = dia+ '/' +mes+ '/' +ano
    semana.textContent = atualSemana
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
    let humidity = document.querySelector('#umidad')
    let temperature = document.querySelector('#temp')
    fetch(url)
    .then((data) => {
        return data.json()
    })
    .then((data) => {
        let tempInCelsius = ((5/9) * (data.main.temp-32)).toFixed(1)

        city.textContent = data.name
        humidity.textContent = data.main.humidity
        temperature.textContent = tempInCelsius
    })
    .catch((err) => {
        city.textContent = 'Erro ao acessar Open Weather'
        temperature.textContent = '-'
    })
}
getUserPosition()
    
/* url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=56dcb9ce9559149ad636a6d45e5f633b`*/
