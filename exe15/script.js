// aula 05
// criar a variável modalKey sera global
let modalKey = 0

// variavel para controlar a quantidade inicial de pizzas na modal
let quantPizzas = 1

let cart = [] // carrinho
// /aula 05

// funcoes auxiliares ou uteis
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0 // transparente
    seleciona('.pizzaWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.pizzaWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0 // transparente
    setTimeout(() => seleciona('.pizzaWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
    // BOTOES FECHAR MODAL
    selecionaTodos('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach( (item) => item.addEventListener('click', fecharModal) )
}

const preencheDadosDasPizzas = (pizzaItem, item, index) => {
    // aula 05
    // setar um atributo para identificar qual elemento foi clicado
	pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = formatoReal(item.price[2])
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    seleciona('.pizzaBig img').src = item.img
    seleciona('.pizzaInfo h1').innerHTML = item.name
    seleciona('.pizzaInfo--desc').innerHTML = item.description
    seleciona('.pizzaInfo--actualPrice').innerHTML = formatoReal(item.price[2])
}

// aula 05
const pegarKey = (e) => {
    // .closest retorna o elemento mais proximo que tem a class que passamos
    // do .pizza-item ele vai pegar o valor do atributo data-key
    let key = e.target.closest('.pizza-item').getAttribute('data-key')
    console.log('Pizza clicada ' + key)
    console.log(pizzaJson[key])

    // garantir que a quantidade inicial de pizzas é 1
    quantPizzas = 1

    // Para manter a informação de qual pizza foi clicada
    modalKey = key

    return key
}

const preencherTamanhos = (key) => {
    // tirar a selecao de tamanho atual e selecionar o tamanho grande
    seleciona('.pizzaInfo--size.selected').classList.remove('selected')

    // selecionar todos os tamanhos
    selecionaTodos('.pizzaInfo--size').forEach((size, sizeIndex) => {
        // selecionar o tamanho grande
        (sizeIndex == 2) ? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key) => {
    // Ações nos botões de tamanho
    // selecionar todos os tamanhos
    selecionaTodos('.pizzaInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            // clicou em um item, tirar a selecao dos outros e marca o q vc clicou
            // tirar a selecao de tamanho atual e selecionar o tamanho grande
            seleciona('.pizzaInfo--size.selected').classList.remove('selected')
            // marcar o que vc clicou, ao inves de usar e.target use size, pois ele é nosso item dentro do loop
            size.classList.add('selected')

            // mudar o preço de acordo com o tamanho
            seleciona('.pizzaInfo--actualPrice').innerHTML = formatoReal(pizzaJson[key].price[sizeIndex])
        })
    })
}

const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    seleciona('.pizzaInfo--qtmais').addEventListener('click', () => {
        quantPizzas++
        seleciona('.pizzaInfo--qt').innerHTML = quantPizzas
    })

    seleciona('.pizzaInfo--qtmenos').addEventListener('click', () => {
        if(quantPizzas > 1) {
            quantPizzas--
            seleciona('.pizzaInfo--qt').innerHTML = quantPizzas	
        }
    })
}
// /aula 05

// aula 06
const adicionarNoCarrinho = () => {
    seleciona('.pizzaInfo--addButton').addEventListener('click', () => {
        let size = seleciona('.pizzaInfo--size.selected').getAttribute('data-key')
        let price = seleciona('.pizzaInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')
        let identificador = pizzaJson[modalKey].id+'t'+size
        let key = cart.findIndex((item) => item.identificador == identificador)
        if(key > -1){
            cart[key].qt += quantPizzas
        }else{
            let pizza = {
                identificador,
                id: pizzaJson[modalKey].id,
                size,
                qt: quantPizzas,
                price: parseFloat(price)
            }
            cart.push(pizza)
        }
        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}
const abrirCarrinho = () => {
    if(cart.length > 0){
        seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex'
    }
    seleciona('.menu-openner').addEventListener('click', () => {
        if(cart.length > 0){
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}
const fecharCarrinho = () => {
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}
const atualizarCarrinho = () => {
    seleciona('.menu-openner span').innerHTML = cart.length
    if(cart.length > 0){
        seleciona('aside').classList.add('show')
        seleciona('.cart').innerHTML = ''
        let subtotal = 0
        let desconto = 0
        let total = 0

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id)
            subtotal += cart[i].price * cart[i].qt
            let cartItem = seleciona('.models .cart--item').cloneNode(true)
            seleciona('.cart').append(cartItem)

            let pizzaSizeName = cart[i].size
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`
            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++
                atualizarCarrinho()
            })
            cartItem.querySelector('.cart--itemqtmenos').addEventListener('click', () => {
                if(cart[i].qt > 1){
                    cart[i].qt--
                }else{
                    cart.splice(i, 1)
                }
                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

                atualizarCarrinho()
            })
            seleciona('.cart').append(cartItem)
        }
        desconto = subtotal * 0
        total = subtotal - desconto

        seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
        seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
        seleciona('.total span:last-child').innerHTML = formatoReal(total)
    }else{
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
    }
}

const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}
// MAPEAR pizzaJson para gerar lista de pizzas
pizzaJson.map((item, index ) => {
    //console.log(item)
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)
    //console.log(pizzaItem)
    //document.querySelector('.pizza-area').append(pizzaItem)
    seleciona('.pizza-area').append(pizzaItem)

    // preencher os dados de cada pizza
    preencheDadosDasPizzas(pizzaItem, item, index)
    
    // pizza clicada
    pizzaItem.querySelector('.pizza-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou na pizza')

        // aula 05
        let chave = pegarKey(e)
        // /aula 05

        // abrir janela modal
        abrirModal()

        // preenchimento dos dados
        preencheDadosModal(item)

        // aula 05
        // pegar tamanho selecionado
        preencherTamanhos(chave)

		// definir quantidade inicial como 1
		seleciona('.pizzaInfo--qt').innerHTML = quantPizzas

        // selecionar o tamanho e preco com o clique no botao
        escolherTamanhoPreco(chave)
        // /aula 05

    })

    botoesFechar()

}) // fim do MAPEAR pizzaJson para gerar lista de pizzas

// aula 05
// mudar quantidade com os botoes + e -
mudarQuantidade()
// /aula 05

adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()