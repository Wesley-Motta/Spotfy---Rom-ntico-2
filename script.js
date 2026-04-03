const audio = document.getElementById("main-audio");
const playPauseBtn = document.getElementById("play-pause-btn");
const progressBar = document.getElementById("progress-bar");
const progressArea = document.getElementById("progress-area");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("total-duration");

// Tocar ou Pausar
playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = "⏸";
    } else {
        audio.pause();
        playPauseBtn.innerHTML = "▶";
    }
});

// Atualizar tempo e barra
audio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    
    // Move a barra
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    // Formatar minutos e segundos
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10) currentSec = `0${currentSec}`;
    currentTimeEl.innerText = `${currentMin}:${currentSec}`;
});

// Definir duração total quando o áudio carregar
audio.addEventListener("loadeddata", () => {
    let mainDuration = audio.duration;
    let totalMin = Math.floor(mainDuration / 60);
    let totalSec = Math.floor(mainDuration % 60);
    if(totalSec < 10) totalSec = `0${totalSec}`;
    durationEl.innerText = `${totalMin}:${totalSec}`;
});

// Clicar na barra para mudar a música
progressArea.addEventListener("click", (e) => {
    let progressWidthVal = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = audio.duration;
    
    audio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;
    audio.play();
    playPauseBtn.innerHTML = "⏸";
});
audio.addEventListener('error', function() {
    alert("Erro ao carregar a música! Verifique se o arquivo está na mesma pasta.");
});
