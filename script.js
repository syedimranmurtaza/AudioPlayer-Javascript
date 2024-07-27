const nohas = [
    { name: "Alam Ko Uncha Rakhna Hai", audio: "./audios/noha1.mp3", img: "https://images110.b-cdn.net/19743_545474467.jpg", author: "Ali Jee and Nadeem Sarwar" },
    { name: "Baap Se Batain Karo Akbar", audio: "./audios/noha2.mp3", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5oUrinoDg5E5hDAkdcozmrOdNfSBta6sPDQ&s", author: "Mir Hasan Mir" }
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
            <h3>10:32</h3>
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
