const containerVideos = document.querySelector('.videos__container');

const url = 'http://127.0.0.1:3000/videos';

const api = fetch(url).then(res => res.json()).then(videos => {
    videos.forEach(video => {

    });
})