let bolGrid = true;
let elemGrid = null;
let bolCollision = true;
let elemCollision = null;
let bolSelection = true;
let elemSelection = null;
let backgroundTexture;
let elemBackground = null;


const objGrid = {
    x: 138,
    y: 103
}
const intGridCellSize = 16;

const objCanvasDefault = {
    width: objGrid.x * intGridCellSize,
    height: objGrid.y * intGridCellSize
}

let intMultiplierCanvas = 1;


let bolIsDragging = false;
let objStartCell = {
    x: 0,
    y: 0
};

let app;
let containerDiv;

function getMousePosition(event) {

    const rect = app.canvas.getBoundingClientRect();

    let scaleX = app.screen.width / rect.width;
    let scaleY = app.screen.height / rect.height;

    let x = (event.clientX - rect.left) * scaleX / intMultiplierCanvas;
    let y = (event.clientY - rect.top) * scaleY / intMultiplierCanvas;

    return { x: x, y: y };
}

function calculateMultiplier(intForcedMultiplier = false) {
    if (intForcedMultiplier) {
        intMultiplierCanvas = intForcedMultiplier;
        return;
    }

    const intContainerWidth = document.querySelector('#app').offsetWidth;
    const intContainerHeight = document.querySelector('#app').offsetHeight;

    intMultiplierCanvas = Math.min(intContainerWidth / objCanvasDefault.width, intContainerHeight / objCanvasDefault.height);
}

function resize(intForcedMultiplier = false) {
    calculateMultiplier(intForcedMultiplier);

    containerDiv.style.width = `${objCanvasDefault.width * intMultiplierCanvas}px`;
    containerDiv.style.height = `${objCanvasDefault.height * intMultiplierCanvas}px`;

    resizeElements();
}

function resizeElements() {
    if (elemBackground !== null) {
        elemBackground.scale = intMultiplierCanvas;
    }

    if (elemGrid !== null) {
        elemGrid.scale = intMultiplierCanvas;
    }
    if (elemCollision !== null) {
        elemCollision.scale = intMultiplierCanvas;
    }

    if (elemSelection !== null) {
        elemSelection.scale = intMultiplierCanvas;
    }
}

function buildGrid() {
    const graphics = new PIXI.Graphics();

    // Draw vertical lines spaced 16 pixels apart
    for (var i = 0; i < objGrid.x; i++) {
        graphics
            .moveTo(i * intGridCellSize, 0)
            .lineTo(i * intGridCellSize, objGrid.y * intGridCellSize);
    }

    graphics
        .moveTo(objGrid.x * intGridCellSize, 0)
        .lineTo(objGrid.x * intGridCellSize, objGrid.y * intGridCellSize);

    // Draw horizontal lines spaced 16 pixels apart
    for (var i = 0; i < objGrid.y; i++) {
        graphics
            .moveTo(0, i * intGridCellSize)
            .lineTo(objGrid.x * intGridCellSize, i * intGridCellSize);
    }

    graphics
        .moveTo(0, objGrid.y * intGridCellSize)
        .lineTo(objGrid.x * intGridCellSize, objGrid.y * intGridCellSize);

    return graphics;
}

function drawGrid() {
    if (elemGrid !== null && !bolGrid) {
        app.stage.removeChild(elemGrid);
        elemGrid.destroy();
        elemGrid = null;
    }

    if (elemGrid === null && bolGrid) {
        elemGrid = buildGrid().stroke({ color: 0x808080, pixelLine: true, width: 1 });
        app.stage.addChild(elemGrid);
    }

    if (bolGrid) {
        elemGrid.scale = intMultiplierCanvas;
    }
}

function drawCollision() {
    if (elemCollision !== null && !bolCollision) {
        app.stage.removeChild(elemCollision);
        elemCollision.destroy();
        elemCollision = null;
    }

    if (elemCollision === null && bolCollision) {
        elemCollision = new PIXI.Container();
        let intCellSize = intGridCellSize / 2;

        for (var y = 0; y < arrCollision.length; y++) {
            for (var x = 0; x < arrCollision[y].length; x++) {
                if (arrCollision[y][x]) {
                    let elemCollisionChild = new PIXI.Graphics();
                    elemCollisionChild.rect(x * intCellSize, y * intCellSize, intCellSize, intCellSize);

                    switch (arrCollision[y][x]) {
                        case 2:
                            elemCollisionChild.fill(`rgba(255, 165,0,0.3)`);
                            break;
                        case 4:
                            elemCollisionChild.fill(`rgba(0,0,255,0.3)`);
                            break;
                        case 6:
                            elemCollisionChild.fill(`rgba(168, 0, 255, 0.3)`);
                            break;
                        default:
                            elemCollisionChild.fill(`rgba(255,0,0,0.3)`);
                    }
                    elemCollision.addChild(elemCollisionChild);
                }
            }
        }

        app.stage.addChild(elemCollision);
    }

    if (bolCollision) {
        elemCollision.scale = intMultiplierCanvas;
    }
}

function addBackground() {
    if (elemBackground === null) {
        elemBackground = new PIXI.Sprite(backgroundTexture);
        app.stage.addChild(elemBackground);
    }

    elemBackground.scale = intMultiplierCanvas;
}

function drawSelection(x, y) {
    //might be useful new Rectangle(100, 100, 200, 150);

    if (bolSelection) {
        if (elemSelection !== null) {
            app.stage.removeChild(elemSelection);
            elemSelection.destroy();
            elemSelection = null;

            if (!bolIsDragging) return;
        }

        elemSelection = new PIXI.Graphics();

        let objCurrentCell = {
            x: Math.floor(x / intGridCellSize) * intGridCellSize,
            y: Math.floor(y / intGridCellSize) * intGridCellSize,
        }

        let objSelectionCell = {
            x1: Math.min(objStartCell.x, objCurrentCell.x),
            y1: Math.min(objStartCell.y, objCurrentCell.y),
            x2: Math.max(objStartCell.x, objCurrentCell.x),
            y2: Math.max(objStartCell.y, objCurrentCell.y),
        }

        elemSelection.rect(objSelectionCell.x1, objSelectionCell.y1, objSelectionCell.x2 - objSelectionCell.x1 + intGridCellSize, objSelectionCell.y2 - objSelectionCell.y1 + intGridCellSize);
        elemSelection.fill(`rgba(255, 174, 0, 0.3)`);
        elemSelection.stroke({ color: `rgba(255, 174, 0, 0.8)`, width: 2, alignment: 1 });
        app.stage.addChild(elemSelection);

        elemSelection.scale = intMultiplierCanvas;
    }
}


$(document).ready(function () {

    //TODO: add throttling
    window.addEventListener("resize", () => resize(false));

    (async () => {
        containerDiv = document.querySelector('#game-container');

        // Create a new application
        app = new PIXI.Application();

        // Initialize the application
        await app.init({ backgroundAlpha: 0, antialias: false, resizeTo: containerDiv });

        // Append the application canvas to the document body
        containerDiv.appendChild(app.canvas);

        backgroundTexture = await PIXI.Assets.load('images/rm_farm.png');
        backgroundTexture.source.scaleMode = 'nearest';

        app.stage.eventMode = 'static';
        app.stage.hitArea = app.screen;

        app.stage.on('pointerdown', (e) => {
            bolIsDragging = true;
            let objMouseLocation = getMousePosition(e);

            objStartCell = {
                x: Math.floor(objMouseLocation.x / intGridCellSize) * intGridCellSize,
                y: Math.floor(objMouseLocation.y / intGridCellSize) * intGridCellSize,
            }

            drawSelection(objMouseLocation.x, objMouseLocation.y)
        });

        app.stage.on('pointermove', (e) => {

            if (bolIsDragging) {
                let objMouseLocation = getMousePosition(e);

                drawSelection(objMouseLocation.x, objMouseLocation.y)
            }
        });

        app.stage.on('pointerup', (e) => {
            bolIsDragging = false;
            // drawMap();
            objStartCell = {
                x: 0,
                y: 0
            };
             drawSelection();
        });




        // app.view.style.width = `${objCanvasSize.width}px`;
        // app.view.style.height = `${objCanvasSize.height}px`;

        // Create and add a container to the stage
        const container = new PIXI.Container();

        app.stage.addChild(container);


        // Load the bunny texture
        const texture = await PIXI.Assets.load('https://pixijs.com/assets/bunny.png');
        texture.source.scaleMode = 'nearest';

        // Create a 5x5 elemGrid of bunnies in the container
        for (let i = 0; i < 25; i++) {
            const bunny = new PIXI.Sprite(texture);

            bunny.x = (i % 5) * 40;
            bunny.y = Math.floor(i / 5) * 40;
            container.addChild(bunny);
        }

        // Move the container to the center
        container.x = app.screen.width / 2;
        container.y = app.screen.height / 2;

        // Center the bunny sprites in local container coordinates
        container.pivot.x = container.width / 2;
        container.pivot.y = container.height / 2;

        //   let count = 0;
        // Listen for animate update
        app.ticker.add((time) => {
            // Continuously rotate the container!
            // * use delta to create frame-independent transform *
            container.rotation -= 0.01 * time.deltaTime;

            container.x = app.screen.width / 2;
            container.y = app.screen.height / 2;

            // count += 0.01;
            // container.scale = 1 + (Math.sin(count) + 1) * 2;

        });


        addBackground();
        drawGrid();
        drawCollision();

        resize();
        app.resize();

    })();

});