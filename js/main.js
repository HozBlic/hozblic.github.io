function drawGrid() {

    console.log("Drawing grid...");
    ctx.beginPath();
    let intLineWidth = 1 / 2;
    ctx.lineWidth = intLineWidth;
    ctx.strokeStyle = 'gray';

    for (var i = 0; i < objGrid.x; i++) {
        let x = i * intMultiplier;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, objCanvasSize.height);

        x = x + intMultiplier - intLineWidth;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, objCanvasSize.height);
    }

    for (var i = 0; i < objGrid.y; i++) {
        let y = i * intMultiplier;
        ctx.moveTo(0, y);
        ctx.lineTo(objCanvasSize.width, y);

        y = y + intMultiplier - intLineWidth;
        ctx.moveTo(0, y);
        ctx.lineTo(objCanvasSize.width, y);
    }

    ctx.stroke();
}

function drawCollision() {

    ctx.beginPath();
    let intCollisionMultiplier = objGrid.y / arrCollision.length;
    let intCollisionCellSize = intMultiplier * intCollisionMultiplier;

    for (var y = 0; y < arrCollision.length; y++) {
        for (var x = 0; x < arrCollision[y].length; x++) {
            if (arrCollision[y][x]) {
                ctx.fillStyle = `rgba(255,0,0,0.3)`;
                // if (arrCollision[y][x] === 2) {
                //     ctx.fillStyle = `rgba(255, 165,0,0.3)`;
                // } else if (arrCollision[y][x] === 4) {
                //     ctx.fillStyle = `rgba(0,0,255,0.3)`;
                // } else if (arrCollision[y][x] === 6) {
                //     ctx.fillStyle = `rgba(168, 0, 255, 0.3)`;
                // }
                ctx.fillRect(x * intCollisionCellSize, y * intCollisionCellSize, intCollisionCellSize, intCollisionCellSize);
            }
        }
    }

    ctx.stroke();
}

function drawMap() {
    ctx.clearRect(0, 0, objCanvasSize.width, objCanvasSize.height);
    drawGrid();
    drawCollision();
}

function getMousePosition(canvas, event) {
let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;
    let x = (event.clientX - rect.left) * scaleX;
    let y = (event.clientY - rect.top) * scaleY;
    console.log("Coordinate x: " + x,
        "Coordinate y: " + y);

    return { x: x, y: y };
}

function drawSelection(x, y) {

    //clear previous selection
    drawMap();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = `rgba(255, 174, 0, 0.8)`;
    ctx.fillStyle = `rgba(255, 174, 0, 0.3)`;

    // snap start and end to grid
    x = Math.floor(x / intMultiplier) * intMultiplier;
    y = Math.floor(y / intMultiplier) * intMultiplier;

    // if start and end are the same, draw a single cell
    if (x === objDragStart.x && y === objDragStart.y) {
        ctx.fillRect(x, y, intMultiplier, intMultiplier);
        ctx.rect(x, y, intMultiplier, intMultiplier);
        ctx.stroke();
        return;
    }
    
    ctx.fillRect(objDragStart.x, objDragStart.y, x - objDragStart.x, y - objDragStart.y);
    ctx.rect(objDragStart.x, objDragStart.y, x - objDragStart.x, y - objDragStart.y);
    ctx.stroke();
}


let objGrid = {
    x: 138,
    y: 103
}

let intMultiplier = 15;
let objCanvasSize = {
    width: objGrid.x * intMultiplier,
    height: objGrid.y * intMultiplier
}

let bolIsDragging = false;
let objDragStart = {
    x: 0,
    y: 0
};
let lastThrottleTime = 0;
const throttleDelay = 10; // milliseconds

let canvas = null;
let ctx = null;

$(function () {

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled= false;

    canvas.width = objCanvasSize.width;
    canvas.height = objCanvasSize.height;

    canvas.addEventListener("mousedown", function (e) {
        bolIsDragging = true;
        objDragStart = getMousePosition(canvas, e, objDragStart);
        objDragStart.x = Math.floor(objDragStart.x / intMultiplier) * intMultiplier;
        objDragStart.y = Math.floor(objDragStart.y / intMultiplier) * intMultiplier;

        drawSelection(objDragStart.x, objDragStart.y)
    });

    canvas.addEventListener("mousemove", function (e) {
        const now = Date.now();
        if (bolIsDragging && now - lastThrottleTime >= throttleDelay) {
            let objMouseLocation = getMousePosition(canvas, e);
            lastThrottleTime = now;
            drawSelection(objMouseLocation.x, objMouseLocation.y)
        }
    });

    canvas.addEventListener("mouseup", function (e) {
        bolIsDragging = false;
        drawMap();
        objDragStart = {
            x: 0,
            y: 0
        };

        //highlight selection
    });

    drawMap();
});