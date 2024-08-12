// Definição do endereço do servidor
const url = 'http://127.0.0.1:3000/videos';

// Modelo de cada dado gravado no arquivo json
export interface Video {
    "id": number,
    "titulo": string,
    "descricao": string,
    "url": string,
    "imagem": string,
    "categoria": string
}

// EXTRA: criei essa variável para tentar novamente em 5 segundos se houver algum erro na conexão

let nuncaDesista = null;

// Função para carregar os vídeos do servidor

const containerVideos: HTMLElement = document.querySelector('.videos__container');

async function carregarVideos() {
    try {
        const busca = await fetch(url);
        const videos = await busca.json();

        containerVideos.innerHTML = '';

        videos.forEach((video: Video) => {
            if (video.categoria == '') {
                throw new Error(`Vídeo '${video.titulo}' não tem categoria!`);
            }
            containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="1" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p>
                </div>
            </li>
            `;
        })
        // EXTRA: se tudo der certo depois de um erro, evita que a função seja chamada novamente
        if (nuncaDesista) {
            clearInterval(nuncaDesista);
            nuncaDesista = null;
        }
    } catch (error) {
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}</p>`;
        // EXTRA: se houve um erro, chama a função novamente a cada 5 segundos
        if (!nuncaDesista) {
            nuncaDesista = setInterval(carregarVideos, 5000);
        }
    }
}

carregarVideos();

// Criação do filtro de pesquisa

const barraDePesquisa: HTMLInputElement = document.querySelector('.pesquisar__input');

barraDePesquisa.oninput = () => {
    const videos = document.querySelectorAll('.videos__item');
    videos.forEach((video: HTMLElement) => {
        const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
        const valorFiltro = barraDePesquisa.value.toLowerCase();
        video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
    });
}

// Criação do filtro de categoria

const botaoCategoria = document.querySelectorAll('.superior__item');

botaoCategoria.forEach((botao: HTMLElement) => {
    let filtroCategoria = botao.getAttribute('name');
    botao.onclick = () => {
        filtrarPorCategoria(filtroCategoria);
    }
});

function filtrarPorCategoria(filtroCategoria) {
    const valorFiltro = filtroCategoria.toLowerCase();
    const videos = document.querySelectorAll('.videos__item');
    videos.forEach((video: HTMLElement) => {
        const categoria = video.querySelector('.categoria').textContent.toLowerCase();
        video.style.display = categoria.includes(valorFiltro) || valorFiltro == 'tudo' ? 'block' : 'none';
    });
}