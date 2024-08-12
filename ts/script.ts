export interface Video {
    "id": number,
    "titulo": string,
    "descricao": string,
    "url": string,
    "imagem": string,
    "categoria": string
}

const containerVideos: HTMLElement = document.querySelector('.videos__container');

const url = 'http://127.0.0.1:3000/videos';

async function carregarVideos() {
    try {
        const busca = await fetch(url);
        const videos = await busca.json();

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
                </div>
            </li>
            `;
        })
    } catch (error) {
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}</p>`;
    } finally {
        console.log('Fim da requisiçcão de carregamento.');
    }
}

carregarVideos();