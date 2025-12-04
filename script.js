const songs = [
    { title: "City Lights", artist: "Unknown Artist", src: "SoundHelix-Song-1.mp3", img: "City lights.jpg" },
    { title: "Dreamscape", artist: "Unknown Artist", src: "SoundHelix-Song-2.mp3", img: "Dreamscape.jpg" },
    { title: "Ocean Waves", artist: "Unknown Artist", src: "SoundHelix-Song-3.mp3", img: "Ocean waves.jpg" },
    { title: "Summer Vibes", artist: "Unknown Artist", src: "SoundHelix-Song-4.mp3", img: "Summer vibes.jpg" }
];

let songIndex = 0;
let audio = new Audio(songs[songIndex].src);

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const songImage = document.getElementById("songImage");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playlistDiv = document.getElementById("playlist");

function updatePlaylistUI() {
    playlistDiv.innerHTML = "";
    songs.forEach((song, index) => {
        const div = document.createElement("div");
        div.className = "playlist-item";
        if (index === songIndex) div.classList.add("active");
        div.textContent = `${song.title} — ${song.artist}`;
        div.addEventListener("click", () => {
            songIndex = index;
            loadSong(songIndex);
            audio.play();
            playBtn.textContent = "⏸";
            updatePlaylistUI();
        });
        playlistDiv.appendChild(div);
    });
}

function loadSong(index) {
    audio.src = songs[index].src;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    songImage.src = songs[index].img;
    audio.load();
    updatePlaylistUI();
}
loadSong(songIndex);

playBtn.addEventListener("click", () => {
    if (audio.paused) { audio.play(); playBtn.textContent = "⏸"; }
    else { audio.pause(); playBtn.textContent = "▶"; }
});

nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    audio.play();
    playBtn.textContent = "⏸";
});

prevBtn.addEventListener("click", () => {
    songIndex = (0 + songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    audio.play();
    playBtn.textContent = "⏸";
});

audio.addEventListener("timeupdate", () => {
    progress.value = audio.currentTime;
    progress.max = audio.duration;

    let m1 = Math.floor(audio.currentTime / 60);
    let s1 = Math.floor(audio.currentTime % 60);
    currentTimeEl.textContent = `${m1}:${s1 < 10 ? "0" + s1 : s1}`;

    let m2 = Math.floor(audio.duration / 60);
    let s2 = Math.floor(audio.duration % 60);
    durationEl.textContent = `${m2}:${s2 < 10 ? "0" + s2 : s2}`;
});

progress.addEventListener("input", () => audio.currentTime = progress.value);
volume.addEventListener("input", () => audio.volume = volume.value);
