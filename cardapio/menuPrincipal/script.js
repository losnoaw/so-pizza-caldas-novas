// Array de dados contendo as informações de cada item, os itens estão recolhidos...
const itensCardapio = {
    pizzas: [
        {
            nome: "Pizza Margherita",
            preco: 30,
            imagem: "pizza-sabores/pizza1.jpeg",
        },
        {
            nome: "Pizza Margherita",
            preco: 30,
            imagem: "pizza-sabores/pizza1.jpeg",
        },
        {
            nome: "Pizza Margherita",
            preco: 30,
            imagem: "pizza-sabores/pizza1.jpeg",
        },
        {
            nome: "Pizza Calabresa",
            preco: 35,
            imagem: "pizza-sabores/pizza1.jpeg",
        },
        {
            nome: "Pizza Calabresa",
            preco: 35,
            imagem: "pizza-sabores/pizza1.jpeg",
        },
        {
            nome: "Pizza Calabresa",
            preco: 35,
            imagem: "pizza-sabores/pizza1.jpeg",
        },
        {
            nome: "Pizza Calabresa",
            preco: 35,
            imagem: "pizza-sabores/pizza1.jpeg",
        },
        {
            nome: "Pizza Calabresa",
            preco: 35,
            imagem: "pizza-sabores/pizza1.jpeg",
        },
        {
            nome: "Pizza Calabresa",
            preco: 35,
            imagem: "pizza-sabores/pizza1.jpeg",
        },
    ],
    refrigerantes: [
        {
            nome: "Coca-Cola",
            preco: 10,
            imagem: "Refrigerantes/coca-cola2l.png",
        },
        {
            nome: "Guaraná",
            preco: 4.5,
            imagem: "Refrigerantes/guaraná-Antarctica-2l.png",
        },
    ],
    sucos: [
        { nome: "Suco de Laranja", preco: 6, imagem: "Sucos/laranja.png" },
        { nome: "Suco de Uva", preco: 6.5, imagem: "Sucos/laranja.png" },
    ],
};

// Função para adicionar dinamicamente os itens ao cardápio
function adicionarItens(categoria, itens) {
    const categoriaDiv = document.getElementById(categoria); // Seleciona a categoria correspondente

    itens.forEach((item) => {
        // Cria um novo div para cada item
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        // Cria a imagem
        const img = document.createElement("img");
        img.src = item.imagem;
        img.alt = item.nome;

        // Cria um título com o nome do item
        const titulo = document.createElement("h4");
        titulo.textContent = item.nome;

        // Cria um parágrafo para o preço
        const preco = document.createElement("p");
        preco.textContent = `R$ ${item.preco.toFixed(2)}`;

        // Botão para adicionar ao carrinho
        const botao = document.createElement("button");
        botao.textContent = "Adicionar ao Carrinho";
        botao.onclick = () => adicionarAoCarrinho(item.nome, item.preco);

        // Adiciona imagem, título, preço e botão ao div do item
        itemDiv.appendChild(img);
        itemDiv.appendChild(titulo);
        itemDiv.appendChild(preco);
        itemDiv.appendChild(botao);

        // Adiciona o item à categoria
        categoriaDiv.appendChild(itemDiv);
    });
}

// Função para carregar os itens dinamicamente
function carregarCardapio() {
    adicionarItens("pizzas", itensCardapio.pizzas);
    adicionarItens("refrigerantes", itensCardapio.refrigerantes);
    adicionarItens("sucos", itensCardapio.sucos);
}

// Carrinho e controle de pedido
let carrinho = [];
let total = 0;

// Adicionar item ao carrinho
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    total += preco;
    atualizarCarrinho();
}

// Remover item do carrinho
function removerDoCarrinho(index) {
    total -= carrinho[index].preco;
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Atualizar exibição do carrinho
function atualizarCarrinho() {
    const listaCarrinho = document.getElementById("itens-carrinho");
    listaCarrinho.innerHTML = "";
    carrinho.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        const removerBtn = document.createElement("button");
        removerBtn.textContent = "Remover";
        removerBtn.onclick = () => removerDoCarrinho(index);
        li.appendChild(removerBtn);
        listaCarrinho.appendChild(li);
    });
    document.getElementById("total").textContent = total.toFixed(2);
}

// Finalizar pedido via WhatsApp
function finalizarPedido() {
    let mensagem = "Olá, gostaria de fazer o seguinte pedido:\n";
    carrinho.forEach((item) => {
        mensagem += `- ${item.nome}: R$ ${item.preco.toFixed(2)}\n`;
    });
    mensagem += `Total: R$ ${total.toFixed(2)}`;
    const linkWhatsApp = `https://wa.me/seu-numero-whatsapp?text=${encodeURIComponent(
        mensagem
    )}`;
    window.open(linkWhatsApp, "_blank");
}

// Carregar o cardápio ao carregar a página
window.onload = carregarCardapio;
