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
    pizzas2Sabores: [
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
        /* img.style.width = "100px"; // Ajuste de tamanho (opcional)
        img.style.height = "auto"; // Ajuste de tamanho (opcional) */

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

    adicionarItensPizzas2Sabores();
}

// Função para adicionar Pizzas de Dois Sabore
function adicionarItensPizzas2Sabores() {
    const pizzas2SaboresDiv = document.getElementById("pizzas2Sabores");
    const maxSabores = 2;
    let saboresSelecionados = [];

    // Usando o array pizzas2Sabores
    itensCardapio.pizzas2Sabores.forEach((pizza, index) => {
        const div = document.createElement("div");
        div.classList.add("pizza-item");

        // Criando imagem
        const img = document.createElement("img");
        img.src = pizza.imagem;
        img.alt = pizza.nome;
        /* img.style.width = "100px"; // Ajuste de tamanho (opcional)
        img.style.height = "auto"; // Ajuste de tamanho (opcional) */

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `pizza2Sabor${index}`;
        checkbox.name = `pizza2Sabor${index}`;
        checkbox.value = pizza.nome;
        checkbox.dataset.preco = pizza.preco;

        const label = document.createElement("label");
        label.htmlFor = `pizza2Sabor${index}`;
        label.textContent = `${pizza.nome} - R$${pizza.preco.toFixed(2)}`;

        // Adicionando elementos ao div
        div.appendChild(img);
        div.appendChild(checkbox);
        div.appendChild(label);
        pizzas2SaboresDiv.appendChild(div);

        // Controle de seleção de sabores
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                if (saboresSelecionados.length < maxSabores) {
                    saboresSelecionados.push(this);
                } else {
                    this.checked = false;
                    alert("Você só pode selecionar no máximo dois sabores.");
                }
            } else {
                const index = saboresSelecionados.indexOf(this);
                if (index > -1) {
                    saboresSelecionados.splice(index, 1);
                }
            }
        });
    });

    const botao = document.createElement("button");
    botao.textContent = "Adicionar ao Carrinho";
    botao.onclick = function () {
        let totalPreco = 0;
        saboresSelecionados.forEach((checkbox) => {
            totalPreco += parseFloat(checkbox.dataset.preco);
        });

        const nomePizza = saboresSelecionados
            .map((checkbox) => checkbox.value)
            .join(" e ");
        adicionarAoCarrinho(nomePizza, totalPreco);

        saboresSelecionados.length = 0;
        const checkboxes = document.querySelectorAll(".pizza-item input");
        checkboxes.forEach((checkbox) => (checkbox.checked = false));
    };
    pizzas2SaboresDiv.appendChild(botao);
}

let carrinho = [];
let total = 0;

// Adicionar item ao carrinho
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    total += preco;
    atualizarCarrinho();
    atualizarContador();
}

// Remover item do carrinho
function removerDoCarrinho(index) {
    total -= carrinho[index].preco;
    carrinho.splice(index, 1);
    atualizarCarrinho();
    atualizarContador();
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

// Atualizar contador de itens
function atualizarContador() {
    const itemCount = carrinho.length;
    document.getElementById("item-count").textContent = itemCount;
}

// Alternar visibilidade do carrinho
document
    .getElementById("toggle-carrinho-lateral")
    .addEventListener("click", function () {
        const carrinho = document.getElementById("carrinho");
        if (
            carrinho.style.display === "none" ||
            carrinho.style.display === ""
        ) {
            carrinho.style.display = "block";
        } else {
            carrinho.style.display = "none";
        }
    });

// Atualizar contador de itens
function atualizarContador() {
    const itemCount = carrinho.length;
    document.getElementById("item-count").textContent = itemCount;
}

// Alternar visibilidade do carrinho
document
    .getElementById("toggle-carrinho-lateral")
    .addEventListener("click", function () {
        const carrinho = document.getElementById("carrinho");
        if (
            carrinho.style.display === "none" ||
            carrinho.style.display === ""
        ) {
            carrinho.style.display = "block";
        } else {
            carrinho.style.display = "none";
        }
    });

//botão lateral para ocultar e visualizar carrinho
document
    .getElementById("toggle-carrinho-lateral")
    .addEventListener("click", function () {
        const carrinho = document.getElementById("carrinho");
        if (
            carrinho.style.display === "none" ||
            carrinho.style.display === ""
        ) {
            carrinho.style.display = "block";
        } else {
            carrinho.style.display = "none";
        }
    });

// Finalizar pedido via WhatsApp
function finalizarPedido() {
    let mensagem = "Olá, gostaria de fazer o seguinte pedido:\n";
    carrinho.forEach((item) => {
        mensagem += `- ${item.nome}: R$ ${item.preco.toFixed(2)}\n`;
    });
    mensagem += `Total: R$ ${total.toFixed(2)}`;
    const linkWhatsApp = `https://wa.me/5564992303504?text=${encodeURIComponent(
        mensagem
    )}`;
    window.open(linkWhatsApp, "_blank");
}

// Carregar o cardápio ao carregar a página
window.onload = carregarCardapio;
