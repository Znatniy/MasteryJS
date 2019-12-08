let cols, rows, cellSize;
let audio = new Audio();
audio.src = 'The Neighbourhood - Sweater Weather.mp3';
audio.controls = true;

window.onload = initMp3Player;

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const audioCtx = new window.AudioContext();
const source = audioCtx.createMediaElementSource(audio);
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(analyser.frequencyBinCount);
let bufferRatio = bufferLength / (cols * rows);


analyser.connect(audioCtx.destination);
source.connect(analyser);

//init
function initMp3Player() {
    document.getElementById('audio_box').appendChild(audio);
    draw();
}

//получение файла с локального диска
function uploadFile(files) {
    let file = files[0];
    let info = document.getElementById('musicInfo');
    info.innerHTML = file.name;
    let fReader = new FileReader();
    fReader.readAsDataURL(file);
    fReader.onloadend = function (event) {
        var e = event || window.event;
        audio.src = e.target.result;
        audio.load();
    };
}

//отрисовка сетки по параметрам инпута
function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);

    cols = document.getElementById('nCols').value;
    rows = document.getElementById('nRows').value;
    cellSize = Math.floor(1350 / cols);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols * cellSize; i = i + cellSize) {
            const indexFreq = Math.floor(i * j);
            const freq = dataArray[indexFreq];
            ctx.rect(i, j * cellSize, cellSize, cellSize);
            ctx.strokeStyle = "black";
            ctx.lineWidth = "2";
            ctx.stroke();
            ctx.fillStyle = getColor(freq);
            ctx.fillRect(i, j * cellSize, cellSize, cellSize);
        }
    }
}

function getColor(freq) {
    const normalFreq = (freq * 300) / 200;
    return `hsl(${Math.floor(normalFreq)}, 100%, 50%)`;
}

