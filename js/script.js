let objPresets = {
    'season': 'spring',
    'grid': true,
    'collision': true,
}

let strSeason = 'spring';

let containerBackground = null;

let elemGrid = null;
let elemCollision = null;
let bolSelection = true;
let elemSelection = null;
let elemBackground = null;


let containerSprites = null;

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
    if (containerBackground !== null) {
        containerBackground.scale = intMultiplierCanvas;
    }
    if (elemSelection !== null) {
        elemSelection.scale = intMultiplierCanvas;
    }

    if (containerSprites !== null) {
        containerSprites.scale = intMultiplierCanvas;
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
    if (elemGrid !== null && !objPresets['grid']) {
        containerBackground.removeChild(elemGrid);
        elemGrid.destroy();
        elemGrid = null;
    }

    if (elemGrid === null && objPresets['grid']) {
        elemGrid = buildGrid().stroke({ color: 0x808080, pixelLine: true, width: 1 });
        containerBackground.addChild(elemGrid);
    }

    if (objPresets['grid']) {
        elemGrid.zIndex = 2;
    }
}

function drawCollision() {
    if (elemCollision !== null && !objPresets['collision']) {
        containerBackground.removeChild(elemCollision);
        elemCollision.destroy();
        elemCollision = null;
    }

    if (elemCollision === null && objPresets['collision']) {
        elemCollision = new PIXI.Container();
        let intCellSize = intGridCellSize / 2;

        for (var y = 0; y < arrCollision.length; y++) {
            for (var x = 0; x < arrCollision[y].length; x++) {
                if (arrCollision[y][x]) {
                    let elemCollisionChild = new PIXI.Graphics();
                    elemCollisionChild.rect(x * intCellSize, y * intCellSize, intCellSize, intCellSize);

                    switch (arrCollision[y][x]) {
                        // case 2:
                        //     elemCollisionChild.fill(`rgba(255, 165,0,0.3)`);
                        //     break;
                        // case 4:
                        //     elemCollisionChild.fill(`rgba(0,0,255,0.3)`);
                        //     break;
                        // case 6:
                        //     elemCollisionChild.fill(`rgba(168, 0, 255, 0.3)`);
                        //     break;
                        default:
                            elemCollisionChild.fill(`rgba(255,0,0,0.3)`);
                    }
                    elemCollision.addChild(elemCollisionChild);
                }
            }
        }

        containerBackground.addChild(elemCollision);
    }

    if (objPresets['collision']) {

        elemCollision.zIndex = 1;
    }
}

async function addBackground() {

    if (elemBackground !== null) {
        containerBackground.removeChild(elemBackground);
        elemBackground.destroy();
        elemBackground = null;
    }

    if (elemBackground === null) {

        let backgroundTexture = await PIXI.Assets.load(`images/rooms/rm_farm_${objPresets['season']}.png`);
        backgroundTexture.source.scaleMode = 'nearest';

        elemBackground = new PIXI.Sprite(backgroundTexture);
        containerBackground.addChild(elemBackground);


        elemBackground.zIndex = 0;
    }
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
        elemSelection.scale = intMultiplierCanvas

    }
}


$(document).ready(function () {

    //TODO: add throttling
    window.addEventListener("resize", () => resize(false));


    //select checkboxes according to preset
    //detect changes to checkboxes
    $('#seasons').on('change', function (e) {
        objPresets['season'] = this.value;
        addBackground();
    });

    $("#chb_grid").change(function () {
        objPresets['grid'] = this.checked;
        drawGrid();
    });
    $("#chb_collision").change(function () {
        objPresets['collision'] = this.checked;
        drawCollision()
    });

    (async () => {
        containerDiv = document.querySelector('#game-container');

        // Create a new application
        app = new PIXI.Application();

        // Initialize the application
        await app.init({ backgroundAlpha: 0, antialias: false, resizeTo: containerDiv });

        // Append the application canvas to the document body
        containerDiv.appendChild(app.canvas);


        app.stage.eventMode = 'static';
        app.stage.hitArea = app.screen;

        app.sortableChildren = true;

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

        app.stage.on('pointerupoutside', (e) => {
            bolIsDragging = false;
            // drawMap();
            objStartCell = {
                x: 0,
                y: 0
            };
            drawSelection();
        });

        // let count = 0;
        // // Listen for animate update
        // app.ticker.add((time) => {
        //     count += 0.01;
        //     elemGrid.scale = 1 + (Math.sin(count) + 1) * 2;
        // });


        containerBackground = new PIXI.Container();
        app.stage.addChild(containerBackground);


        addBackground();
        drawGrid();
        drawCollision();


        const sprites = await loadSprites();

        console.log(sprites)
        console.log(sprites['snow_peas'])


        if (containerSprites === null) {
            containerSprites = new PIXI.Container();

            let elemSprite = sprites['snow_peas'].sprite;
            containerSprites.addChild(elemSprite);
            // elemSprite.scale = 1

            app.stage.addChild(containerSprites);
        }

        resize();
        app.resize();
    })();

});