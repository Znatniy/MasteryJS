window.onload = initMp3Player;

//получение файла с локальной машины
function uploadFile(files) {
    let file = files[0];
    console.log(file.name); //имя файла
    console.log(file.size); //размер файла
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

function initMp3Player() {
    document.getElementById('audio_box').appendChild(audio);
}

var audio = new Audio();
audio.src = 'Limp Bizkit - Take A Look Around.mp3';
audio.controls = true;

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//отрисовка сетки по параметрам
function draw() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height); не работает, какого хуя? 
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

