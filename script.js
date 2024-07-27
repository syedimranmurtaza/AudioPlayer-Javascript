const nohas = [
    { name: "Alam Ko Uncha Rakhna Hai", audio: "./audios/ns.mp3", img: "https://images110.b-cdn.net/19743_545474467.jpg", author: "Ali Jee and Nadeem Sarwar",duration: "9:05" },
    { name: "Baap Se Batain Karo Akbar", audio: "./audios/mir.mp3", img: "https://i.ytimg.com/vi/06JZxFZSIwQ/maxresdefault.jpg", author: "Mir Hasan Mir",duration: "7:54" },
    { name: "Jungle Main Bhare Ghar Ko Luta Ayi Hai Zainab", audio: "./audios/joan.mp3", img: "https://i.ytimg.com/vi/swt8F6RWm-Q/maxresdefault.jpg", author: "Joan Rizvi",duration: "9:37" },
    { name: "Ali Haider Ya-Karar", audio: "./audios/haider.mp3", img: "https://i.ytimg.com/vi/KWOR85zhbIg/maxresdefault.jpg", author: "Danial Bojbarah",duration: "9:30" }
];

const audio = new Audio();
let selectedAudio = 0;

const allnohas = document.querySelector("#allnohas");

function addingNohas() {
    let clutter = "";

    nohas.forEach((noha, index) => {
        clutter += `
        <div class="nohacard" data-index="${index}">
            <div class="part1">
                <img src="${noha.img}" alt="">
                <div class="details">
                    <h2>${noha.name}</h2>
                    <p>${noha.author}</p>
                </div>
            </div>
            <h3>${noha.duration}</h3>
        </div>`;
    });

    allnohas.innerHTML = clutter;
    audio.src = nohas[selectedAudio].audio;
}

let isPlaying = false;

const playButton = document.querySelector("#play");

playButton.addEventListener("click", () => {
    if (isPlaying) {
        playButton.innerHTML = `<i class="ri-play-line"></i>`;
        audio.pause();
    } else {
        playButton.innerHTML = `<i class="ri-pause-line"></i>`;
        audio.play();
    }
    isPlaying = !isPlaying;
});

allnohas.addEventListener("click", (event) => {
    const target = event.target.closest('.nohacard');
    if (!target) return;

    selectedAudio = parseInt(target.getAttribute('data-index'), 10);
    audio.src = nohas[selectedAudio].audio;
    audio.play();

    document.querySelector("#left").style.backgroundImage = `url(${nohas[selectedAudio].img})`;
    playButton.innerHTML = `<i class="ri-pause-line"></i>`;
    isPlaying = true;
});

document.querySelector("#forward").addEventListener("click", () => {
    selectedAudio = (selectedAudio + 1) % nohas.length;
    audio.src = nohas[selectedAudio].audio;
    audio.play();
    playButton.innerHTML = `<i class="ri-pause-line"></i>`;
    isPlaying = true;
    updateBackgroundImage();
});

document.querySelector("#backward").addEventListener("click", () => {
    selectedAudio = (selectedAudio - 1 + nohas.length) % nohas.length;
    audio.src = nohas[selectedAudio].audio;
    audio.play();
    playButton.innerHTML = `<i class="ri-pause-line"></i>`;
    isPlaying = true;
    updateBackgroundImage();
});

function updateBackgroundImage() {
    document.querySelector("#left").style.backgroundImage = `url(${nohas[selectedAudio].img})`;
}

addingNohas();
