let audio = new Audio();
audio.src = 'Limp Bizkit - Take A Look Around.mp3';
audio.controls = true;

window.onload = initMp3Player;

let cols = document.getElementById('nCols').value;
let rows = document.getElementById('nRows').value;
let cellSize = Math.floor(1350 / cols);

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const audioCtx = new window.AudioContext();
const source = audioCtx.createMediaElementSource(audio);
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 512;
const dataArray = new Uint8Array(analyser.frequencyBinCount);

analyser.connect(audioCtx.destination);
source.connect(analyser);



//init
function initMp3Player() {
    document.getElementById('audio_box').appendChild(audio);
    draw();
}

//получение файла с локальной машины
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
 
//отрисовка сетки по параметрам
function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.beginPath();
    let cols = document.getElementById('nCols').value;
    let rows = document.getElementById('nRows').value;
    let cellSize = Math.floor(1350 / cols);
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols * cellSize; i = i + cellSize) {
            ctx.rect(i, j * cellSize, cellSize, cellSize);
            ctx.strokeStyle = "white";
            ctx.lineWidth = "1";
            ctx.stroke();
        }
    }
}

function getColor(freq) {
    const normalFreq = (freq * 50) / 100;
    return `hsl(${Math.floor(normalFreq)}, 100%, 20%)`;
}

