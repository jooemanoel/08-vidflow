const containerVideos = document.querySelector('.videos__container');
const url = 'http://127.0.0.1:3000/videos';
const api = fetch(url)
    .then(res => res.json())
    .then(videos => videos.forEach((video) => {
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
}))
    .catch((error) => {
    containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}</p>`;
});
export {};
