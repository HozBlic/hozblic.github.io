let objPresets = {
    'season': 'spring',
    'grid': true,
    'collision': true,
    'soil': false,
    'wet': false,
}

let arrCollisionGrid = null;
let bolSelection = true;


let objContainer_Background = null;
let objContainer_Grid = null;
let objSprite_Background = null;

let objGraphics_Grid = null;
let objContainer_Collision = null;

let objGraphics_Selection = null;


let objGroundContainers = {
    ground: null,
    soil: null,
    soilWet: null,
    grass: null,
}
let objContainer_Crops = null;

let sprites = null;

const objGrid = {
    x: 138,
    y: 103
}
const intGridCellSize = 16;
const objCanvasDefault = {
    width: objGrid.x * intGridCellSize,
    height: objGrid.y * intGridCellSize
}
const objZindexes = {
    'background': 0, // image 
    'collision': 1,
    'ground': 2,
    'soil': 3,
    'soilWet': 4,
    'grass': 5,

    'grid': 6,

    'crops': 7,

    'selection': 99,
}
let intMultiplierCanvas = 1;

let bolIsDragging = false;
let objStartCellCoord = {
    x: 0,
    y: 0
};

let objPIXIapp;
let objPlannerDiv;

let arrGrid_Soil = [...Array(objGrid.y)].map(e => Array(objGrid.x).fill(0));
let arrGrid_Crop = [...Array(objGrid.y)].map(e => Array(objGrid.x).fill(0));

function addTestData(intTest) {

    switch (intTest) {
        case 1: //add test soil in front of the house

            var intRows = 7;
            var intColumns = 9

            // starting point is {x: 736, y: 368} / 16
            var intStartX = 736 / intGridCellSize;
            var intStartY = 368 / intGridCellSize;

            for (let y = 0; y < intRows; y++) {
                // let arrFilledGrid_Row = [];
                for (let x = 0; x < intColumns; x++) {
                    switch (true) {
                        case (y == 0 && x == 0):
                        case (y == 0 && x == intColumns - 1):
                        case (y == intRows - 1 && x == 0):
                        case (y == intRows - 1 && x == intColumns - 1):
                            break;
                        default:
                            arrGrid_Soil[intStartY + y][intStartX + x] = 3;
                            arrGrid_Crop[intStartY + y][intStartX + x] = 'snow_peas';
                            break;
                    }
                }
            }
            break;
        case 2:
            //add test soil top left corner
            var intRows = 7;
            var intColumns = 9

            var intStartX = 11;
            var intStartY = 14;

            for (let y = 0; y < intRows; y++) {
                // let arrFilledGrid_Row = [];
                for (let x = 0; x < intColumns; x++) {
                    switch (true) {
                        case (y == 0 && x == 0):
                        case (y == 0 && x == intColumns - 1):
                        case (y == intRows - 1 && x == 0):
                        case (y == intRows - 1 && x == intColumns - 1):
                            break;
                        default:
                            arrGrid_Soil[intStartY + y][intStartX + x] = 3;
                            arrGrid_Crop[intStartY + y][intStartX + x] = 'snow_peas';
                            break;
                    }
                }
            }
            break;
        case 3:

            var intRows = 2;
            var intColumns = 2

            var intStartX = 11;
            var intStartY = 14;

            for (let y = 0; y < intRows; y++) {
                // let arrFilledGrid_Row = [];
                for (let x = 0; x < intColumns; x++) {
                    arrGrid_Soil[intStartY + y][intStartX + x] = 3;
                    arrGrid_Crop[intStartY + y][intStartX + x] = 'snow_peas';
                }
            }

            intStartX = 14;

            for (let y = 0; y < intRows; y++) {
                // let arrFilledGrid_Row = [];
                for (let x = 0; x < intColumns; x++) {
                    arrGrid_Soil[intStartY + y][intStartX + x] = 3;
                    arrGrid_Crop[intStartY + y][intStartX + x] = 'tea';
                }
            }

            break;
    }
}
addTestData(3);


function convertGridToNeighbours(arrGrid, intValue = null) {
    //clockwise NOT
    const directions = [
        [-1, -1], [0, -1], [1, -1],
        [-1, 0], [1, 0],
        [-1, 1], [0, 1], [1, 1]
    ];

    let arrNeighbourGrid = [];
    for (let row = 0; row < arrGrid.length; row++) {
        let arrNeighbourGrid_row = [];
        for (let col = 0; col < arrGrid[0].length; col++) {


            let arrNeighbourGrid_current = [];

            directions.forEach(([dx, dy]) => {
                const newRow = row + dy;
                const newCol = col + dx;

                const intCurrentValue = arrGrid[newRow]?.[newCol] || 0

                switch (intValue) {
                    case null:
                        //checking if any tile is in neighbors - used for grass
                        arrNeighbourGrid_current.push(arrGrid[newRow]?.[newCol] ? 1 : 0)
                        break;
                    case 1:
                        //checking for ground - will use the same sprite regardless of whether there is ground, soil or wet soil nearby
                        arrNeighbourGrid_current.push(arrGrid[newRow]?.[newCol] ? 1 : 0)
                        break;
                    case 2:
                        //checking for tilled soil - will use the same sprite regardless of whether there is soil or wet soil nearby
                        arrNeighbourGrid_current.push((intCurrentValue == 2 || intCurrentValue == 3) ? 1 : 0)
                        break;
                    case 3:
                        //checking for wet tilled soil - sptite will change only wor another wet soil sprite
                        arrNeighbourGrid_current.push((intCurrentValue == 3) ? 1 : 0)
                        break;
                }
            });
            arrNeighbourGrid_row.push(arrNeighbourGrid_current)
        }
        arrNeighbourGrid.push(arrNeighbourGrid_row)
    }
    return arrNeighbourGrid;
}

function getClickedCell(event) {

    const rect = objPIXIapp.canvas.getBoundingClientRect();

    let scaleX = objPIXIapp.screen.width / rect.width;
    let scaleY = objPIXIapp.screen.height / rect.height;

    let x = (event.clientX - rect.left) * scaleX / intMultiplierCanvas;
    let y = (event.clientY - rect.top) * scaleY / intMultiplierCanvas;

    let objCell = {
        x: Math.floor(x / intGridCellSize),
        y: Math.floor(y / intGridCellSize),
    }

    return objCell;
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

    objPlannerDiv.style.width = `${objCanvasDefault.width * intMultiplierCanvas}px`;
    objPlannerDiv.style.height = `${objCanvasDefault.height * intMultiplierCanvas}px`;

    resizeElements();
}

function resizeElements() {
    if (objContainer_Background !== null) {
        objContainer_Background.scale = intMultiplierCanvas;
    }
    if (objContainer_Grid !== null) {
        objContainer_Grid.scale = intMultiplierCanvas;
    }
    if (objGraphics_Selection !== null) {
        objGraphics_Selection.scale = intMultiplierCanvas;
    }

    Object.keys(objGroundContainers).forEach(function (strContainerKey) {
        if (objGroundContainers[strContainerKey] !== null) {
            objGroundContainers[strContainerKey].scale = intMultiplierCanvas;
        }
    });

    if (objContainer_Crops !== null) {
        objContainer_Crops.scale = intMultiplierCanvas;
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

    if (objContainer_Grid === null) {
        objContainer_Grid = new PIXI.Container();
        objPIXIapp.stage.addChild(objContainer_Grid);
        objContainer_Grid.zIndex = objZindexes.grid;
    }


    if (objGraphics_Grid !== null && !objPresets['grid']) {
        objContainer_Grid.removeChild(objGraphics_Grid);
        objGraphics_Grid.destroy();
        objGraphics_Grid = null;
    }

    if (objGraphics_Grid === null && objPresets['grid']) {
        objGraphics_Grid = buildGrid().stroke({ color: 0x808080, pixelLine: true, width: 1 });
        objContainer_Grid.addChild(objGraphics_Grid);
    }


}

function drawCollision() {

    if (objContainer_Collision !== null && !objPresets['collision']) {
        objContainer_Background.removeChild(objContainer_Collision);
        objContainer_Collision.destroy();
        objContainer_Collision = null;
    }

    if (objContainer_Collision === null && objPresets['collision']) {
        objContainer_Collision = new PIXI.Container();
        let intCellSize = intGridCellSize / 2;

        for (var y = 0; y < arrCollisionGrid.length; y++) {
            for (var x = 0; x < arrCollisionGrid[y].length; x++) {
                if (arrCollisionGrid[y][x]) {
                    let elemCollisionChild = new PIXI.Graphics();
                    elemCollisionChild.rect(x * intCellSize, y * intCellSize, intCellSize, intCellSize);

                    switch (arrCollisionGrid[y][x]) {
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
                    objContainer_Collision.addChild(elemCollisionChild);
                }
            }
        }

        objContainer_Background.addChild(objContainer_Collision);
    }

    if (objPresets['collision']) {

        objContainer_Collision.zIndex = objZindexes.collision;
    }
}

async function addBackground() {

    if (objContainer_Background === null) {
        objContainer_Background = new PIXI.Container();
        objPIXIapp.stage.addChild(objContainer_Background);
        objContainer_Background.zIndex = objZindexes.background;
    }

    if (objSprite_Background !== null) {
        objContainer_Background.removeChild(objSprite_Background);
        objSprite_Background.destroy();
        objSprite_Background = null;
    }

    if (objSprite_Background === null) {
        let backgroundTexture = await PIXI.Assets.load(`textures/rooms/rm_farm_${objPresets['season']}.png`);
        backgroundTexture.source.scaleMode = 'nearest';

        objSprite_Background = new PIXI.Sprite(backgroundTexture);
        objContainer_Background.addChild(objSprite_Background);

        objSprite_Background.zIndex = 0;
    }
}

function drawSelection(objCellCoord = false) {
    //might be useful new Rectangle(100, 100, 200, 150);

    if (!bolSelection) return;


    if (objGraphics_Selection !== null) {
        objPIXIapp.stage.removeChild(objGraphics_Selection);
        objGraphics_Selection.destroy();
        objGraphics_Selection = null;

        if (!bolIsDragging) return;
    }

    if (!objCellCoord) return;

    objGraphics_Selection = new PIXI.Graphics();

    const objSelection = {
        x0: Math.min(objStartCellCoord.x, objCellCoord.x),
        y0: Math.min(objStartCellCoord.y, objCellCoord.y),
        x1: Math.max(objStartCellCoord.x, objCellCoord.x),
        y1: Math.max(objStartCellCoord.y, objCellCoord.y),
    }

    const objRectanglePx = {
        x: objSelection.x0 * intGridCellSize,
        y: objSelection.y0 * intGridCellSize,
        w: (objSelection.x1 - objSelection.x0) * intGridCellSize + intGridCellSize,
        h: (objSelection.y1 - objSelection.y0) * intGridCellSize + intGridCellSize,
    }

    objGraphics_Selection.rect(objRectanglePx.x, objRectanglePx.y, objRectanglePx.w, objRectanglePx.h);
    objGraphics_Selection.fill(`rgba(255, 174, 0, 0.3)`);
    objGraphics_Selection.stroke({ color: `rgba(255, 174, 0, 0.8)`, width: 2, alignment: 1 });

    objPIXIapp.stage.addChild(objGraphics_Selection);
    objGraphics_Selection.scale = intMultiplierCanvas
    objGraphics_Selection.zIndex = objZindexes.selection;
}

const slice2D = (arr, startX, endX, startY, endY) => {
    return arr.slice(startY, endY).map(subArr => subArr.slice(startX, endX))
}

function updateSoilGrid(objCellCoord, bolTilled = false, bolWet = false) {

    if (!bolIsDragging) return;

    const objSelection = {
        x0: Math.min(objStartCellCoord.x, objCellCoord.x),
        y0: Math.min(objStartCellCoord.y, objCellCoord.y),
        x1: Math.max(objStartCellCoord.x, objCellCoord.x),
        y1: Math.max(objStartCellCoord.y, objCellCoord.y),
    }

    const arrGrid_SoilSlice = slice2D(arrGrid_Soil, objSelection.x0, objSelection.x1 + 1, objSelection.y0, objSelection.y1 + 1)
    const arrGrid_SoilSliceValues = arrGrid_SoilSlice.flat()

    if (1 || arrGrid_SoilSliceValues.includes(0)) {
        //add only
        for (let y = objSelection.y0; y <= objSelection.y1; y++) {
            for (let x = objSelection.x0; x <= objSelection.x1; x++) {
                if (!checkTileHasCollision({ x: x, y: y })) {
                    arrGrid_Soil[y][x] = bolTilled ? (bolWet ? 3 : 2) : 1
                }
            }
        }
    } else {
        //remove only
        for (let y = objSelection.y0; y <= objSelection.y1; y++) {
            arrGrid_Soil[y].fill(0, objSelection.x0, objSelection.x1 + 1)
        }
    }
    drawSoil();
}

function drawSoil() {
    Object.keys(objGroundContainers).forEach(function (strContainerKey) {
        if (objGroundContainers[strContainerKey] !== null) {
            objPIXIapp.stage.addChild(objGroundContainers[strContainerKey]);

            objGroundContainers[strContainerKey].destroy();
            objGroundContainers[strContainerKey] = null;
        }
        objGroundContainers[strContainerKey] = new PIXI.Container();
    });

    let arrGridNeighbours = convertGridToNeighbours(arrGrid_Soil)
    let arrGridNeighbours_Soil = convertGridToNeighbours(arrGrid_Soil, 2)
    let arrGridNeighbours_Wet = convertGridToNeighbours(arrGrid_Soil, 3)

    for (let y = 0; y < arrGrid_Soil.length; y++) {
        for (let x = 0; x < arrGrid_Soil[0].length; x++) {

            if (arrGrid_Soil[y][x]) {
                switch (arrGrid_Soil[y][x]) {
                    case 1: //ground
                        const elemSpriteGround = sprites.get('tile_main_exteriors_summer');
                        elemSpriteGround.position.set(x * intGridCellSize, y * intGridCellSize);
                        objGroundContainers['ground'].addChild(elemSpriteGround);
                        break;
                    case 2: //tilled
                        const elemSpriteTilled = sprites.getSoil('soil_summer', arrGridNeighbours_Soil[y][x])
                        elemSpriteTilled.position.set(x * intGridCellSize, y * intGridCellSize);
                        objGroundContainers['soil'].addChild(elemSpriteTilled);
                        break;
                    case 3: //tilled wet
                        const elemSprite = sprites.getSoil('soil_summer', arrGridNeighbours_Soil[y][x])
                        // elemSprite.anchor.set(0.5)
                        elemSprite.position.set(x * intGridCellSize, y * intGridCellSize);
                        objGroundContainers['soil'].addChild(elemSprite);

                        const textureWet = sprites.getSoil('soil_wet_summer', arrGridNeighbours_Wet[y][x])
                        const elemSpriteWet = new PIXI.Sprite(textureWet);
                        elemSpriteWet.position.set(x * intGridCellSize, y * intGridCellSize);
                        objGroundContainers['soilWet'].addChild(elemSpriteWet);
                        break;
                }
            } else if (!checkTileHasCollision({ x: x, y: y })) {

                if (!arrGridNeighbours[y][x].includes(1)) {
                    continue;
                }
                const texture = sprites.getGrass('grassautotile_summer', arrGridNeighbours[y][x])
                const elemSprite = new PIXI.Sprite(texture);
                elemSprite.position.set(x * intGridCellSize, y * intGridCellSize);
                objGroundContainers['grass'].addChild(elemSprite);
            }
        }
    }

    Object.keys(objGroundContainers).forEach(function (strContainerKey) {
        objPIXIapp.stage.addChild(objGroundContainers[strContainerKey]);
        objGroundContainers[strContainerKey].zIndex = objZindexes[strContainerKey];
        objGroundContainers[strContainerKey].scale = intMultiplierCanvas;
    });
}

function updateCropGrid(objCellCoord, strCropKey) {

    if (!bolIsDragging) return;

    const objSelection = {
        x0: Math.min(objStartCellCoord.x, objCellCoord.x),
        y0: Math.min(objStartCellCoord.y, objCellCoord.y),
        x1: Math.max(objStartCellCoord.x, objCellCoord.x),
        y1: Math.max(objStartCellCoord.y, objCellCoord.y),
    }

    const arrGrid_CropSlice = slice2D(arrGrid_Crop, objSelection.x0, objSelection.x1 + 1, objSelection.y0, objSelection.y1 + 1)
    const arrGrid_CropSliceValues = arrGrid_CropSlice.flat()

    if (1 || arrGrid_CropSliceValues.includes(0)) {
        //add only
        for (let y = objSelection.y0; y <= objSelection.y1; y++) {
            for (let x = objSelection.x0; x <= objSelection.x1; x++) {
                if (!checkTileHasCollision({ x: x, y: y })) {
                    arrGrid_Crop[y][x] = strCropKey

                    if (arrGrid_Crop[y][x] == 0) {
                        arrGrid_Crop[y][x] = 2; // or 3, if wet soil is needed underneath
                    }
                }
            }
        }
    } else {
        //remove only
        for (let y = objSelection.y0; y <= objSelection.y1; y++) {
            arrGrid_Crop[y].fill(0, objSelection.x0, objSelection.x1 + 1)
        }
    }

    drawSoil();
    drawCrops();
}

function drawCrops() {

    if (objContainer_Crops !== null) {
        objPIXIapp.stage.addChild(objContainer_Crops);

        objContainer_Crops.destroy();
        objContainer_Crops = null;
    }
    objContainer_Crops = new PIXI.Container();

    for (let y = 0; y < arrGrid_Crop.length; y++) {
        for (let x = arrGrid_Crop[0].length - 1; x >= 0; x--) {
            const strCropSpriteKey = arrGrid_Crop[y][x];

            if (strCropSpriteKey && !checkTileHasCollision({ x: x, y: y })) {

                const elemSprite = sprites.get(strCropSpriteKey);

                var intOffsetX = 0;
                var intOffsetY = 0;

                // if (strCropSpriteKey == 'tea') {
                //     intOffsetX = Math.ceil((elemSprite.getSize().width - intGridCellSize) / 2)
                //     intOffsetY = elemSprite.getSize().height - intGridCellSize + intGridCellSize / 2 - 2
                // } else {
                //     intOffsetX = Math.ceil((elemSprite.getSize().width - intGridCellSize) / 2) -1
                //     intOffsetY = elemSprite.getSize().height - intGridCellSize + intGridCellSize / 2 - 1
                // }


                console.log(strCropSpriteKey)
                console.log(elemSprite.getSize())
                console.log(intOffsetX, intOffsetY)

                elemSprite.position.set(x * intGridCellSize - intOffsetX, y * intGridCellSize - intOffsetY);
                objContainer_Crops.addChild(elemSprite);
            }
        }
    }

    objPIXIapp.stage.addChild(objContainer_Crops);
    objContainer_Crops.zIndex = objZindexes.crops;
    objContainer_Crops.scale = intMultiplierCanvas;

}


function checkTileHasCollision(objCell) {
    const objSelection = {
        x0: objCell.x * 2,
        y0: objCell.y * 2,
        x1: objCell.x * 2 + 1,
        y1: objCell.y * 2 + 1,
    }

    const arrGrid_CollisionSlice = slice2D(arrCollisionGrid, objSelection.x0, objSelection.x1 + 1, objSelection.y0, objSelection.y1 + 1);
    const setGrid_CollisionSliceValues = new Set(arrGrid_CollisionSlice.flat())

    return (setGrid_CollisionSliceValues.size === 1 && setGrid_CollisionSliceValues.has(0)) ? false : true;
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
    $("#chb_soil").change(function () {
        objPresets['soil'] = this.checked;
    });
    $("#chb_wet").change(function () {
        objPresets['wet'] = this.checked
    });

    (async () => {
        arrCollisionGrid = await (await fetch('textures/collision.json')).json()

        objPlannerDiv = document.querySelector('#game-container');

        // Create a new application
        objPIXIapp = new PIXI.Application();

        // Initialize the application
        await objPIXIapp.init({ backgroundAlpha: 0, antialias: false, resizeTo: objPlannerDiv });

        // Append the application canvas to the document body
        objPlannerDiv.appendChild(objPIXIapp.canvas);

        //load textures
        sprites = await SpriteStore.getInstance();

        objPIXIapp.stage.eventMode = 'static';
        objPIXIapp.stage.hitArea = objPIXIapp.screen;

        objPIXIapp.sortableChildren = true;


        // clicking and dragging
        objPIXIapp.stage.on('pointerdown', (e) => {
            bolIsDragging = true;


            objStartCellCoord = getClickedCell(e)
            drawSelection(objStartCellCoord)
            // updateSoilGrid(objStartCellCoord)
        });

        objPIXIapp.stage.on('pointermove', (e) => {
            if (bolIsDragging) {
                drawSelection(getClickedCell(e))
            }
        });

        objPIXIapp.stage.on('pointerup', (e) => {
            updateSoilGrid(getClickedCell(e), objPresets.soil, objPresets.wet)
            bolIsDragging = false;
            objStartCellCoord = {
                x: 0,
                y: 0
            };
            drawSelection();
        });

        objPIXIapp.stage.on('pointerupoutside', (e) => {
            bolIsDragging = false;
            objStartCellCoord = {
                x: 0,
                y: 0
            };
            drawSelection();
        });


        // let count = 0;
        // // Listen for animate update
        // objPIXIapp.ticker.add((time) => {
        //     count += 0.01;
        //     objGraphics_Grid.scale = 1 + (Math.sin(count) + 1) * 2;
        // });


        addBackground();
        drawGrid();
        drawCollision();

        drawSoil();
        drawCrops();


        // objPIXIapp.renderer.extract.log(image);


        // console.log(sprites)
        // console.log(sprites['snow_peas'])

        // if (objContainer_Soil === null) {
        //     objContainer_Soil = new PIXI.Container();

        //     let elemSprite = sprites['snow_peas'].sprite;
        //     objContainer_Soil.addChild(elemSprite);
        //     // elemSprite.scale = 1

        //     objPIXIapp.stage.addChild(objContainer_Soil);
        // }

        resize(3);
        objPIXIapp.resize();
    })();

});