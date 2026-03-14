let objMistriaDataPlanner;
let objMistriaDataPlannerDefault = {
    'season': 'spring',
    'house_upgrade': 0,
    'zoom': 100,
    'offsetCanvas': { x: 0, y: 0 },
    'options': ['mode_grid', 'mode_collision'] // mode_wet
}

let strMode = 'dragging_mode'; // drawing_mode, selection_mode
let strCurrentlyDrawing = false;
let bolIsDragging = false;

const intGridCellSize = 16;
const objGrid = {
    x: 138,
    y: 103
}
const objCanvasDefault = {
    width: objGrid.x * intGridCellSize,
    height: objGrid.y * intGridCellSize
}
const objMinimapWrapperSize = {
    w: 230,
    h: objGrid.y * 230 / objGrid.x
}

let objStartCellCoord = { x: 0, y: 0 };
let objPrevCellCoord = { x: 0, y: 0 };
let intMultiplierCanvas = 1;

let arrGrid_Soil = [...Array(objGrid.y)].map(e => Array(objGrid.x).fill(0));
let arrGrid_Crop = [...Array(objGrid.y)].map(e => Array(objGrid.x).fill(0));
let arrGrid_Collision = null;
let arrGrid_Diggable = null;
let arrFenceCoord = null;

let objPlannerDiv;
let objPIXIapp;
let sprites = null;
let objGraphics_Grid = null;
let objContainer_Wrapper = null;
let objContainers = {
    'background': null,
    'collision': null,
    'ground': null,
    'soil': null,
    'soilWet': null,
    'grass': null,
    'grid': null,
    'fence': null,
    'crops': null,
    'selection': null,
}
const arrGroundContainers = ['ground', 'soil', 'soilWet', 'grass'];
const objZindexes = {
    'background': 0,
    'ground': 2,
    'soil': 3,
    'soilWet': 4,
    'grass': 5,
    'collision': 6,
    'grid': 7,
    'fence': 8,
    'crops': 9,
    'selection': 99,
}

function addTestData(intTest) {

    switch (intTest) {
        case 1: //add test soil in front of the house

            var intRows = 7;
            var intColumns = 9;

            var intStartX = 46;
            var intStartY = 23;

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
                            arrGrid_Soil[intStartY + y][intStartX + x] = objMistriaDataPlanner.options.has('mode_wet') ? 3 : 2;
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
                            arrGrid_Soil[intStartY + y][intStartX + x] = objMistriaDataPlanner.options.has('mode_wet') ? 3 : 2;
                            arrGrid_Crop[intStartY + y][intStartX + x] = 'snow_peas';
                            break;
                    }
                }
            }
            break;
        case 3:
            //add patch of peas and tea
            var intRows = 2;
            var intColumns = 2

            var intStartX = 11;
            var intStartY = 14;

            for (let y = 0; y < intRows; y++) {
                // let arrFilledGrid_Row = [];
                for (let x = 0; x < intColumns; x++) {
                    arrGrid_Soil[intStartY + y][intStartX + x] = objMistriaDataPlanner.options.has('mode_wet') ? 3 : 2;
                    arrGrid_Crop[intStartY + y][intStartX + x] = 'snow_peas';
                }
            }

            intStartX = 14;

            for (let y = 0; y < intRows; y++) {
                // let arrFilledGrid_Row = [];
                for (let x = 0; x < intColumns; x++) {
                    arrGrid_Soil[intStartY + y][intStartX + x] = objMistriaDataPlanner.options.has('mode_wet') ? 3 : 2;
                    arrGrid_Crop[intStartY + y][intStartX + x] = 'tea';
                }
            }

            break;
    }
}

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
                        //checking for wet tilled soil - sprite will change only with another wet soil sprite
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

function calculateMultiplier() {
    intMultiplierCanvas = getMultiplierFitScreen() * (objMistriaDataPlanner.zoom / 100);
}

function getMultiplierFitScreen() {
    const intContainerWidth = document.querySelector('#game-container').offsetWidth;
    const intContainerHeight = document.querySelector('#game-container').offsetHeight;
    return Math.min(intContainerWidth / objCanvasDefault.width, intContainerHeight / objCanvasDefault.height);
}
function getMultiplierCoverScreen() {
    const intContainerWidth = document.querySelector('#game-container').offsetWidth;
    const intContainerHeight = document.querySelector('#game-container').offsetHeight;
    return Math.max(intContainerWidth / objCanvasDefault.width, intContainerHeight / objCanvasDefault.height);
}

function resize() {
    verifyZoomParameters();
    calculateMultiplier();
    resizeContainers();
}

function resizeContainers() {
    objContainer_Wrapper.scale = intMultiplierCanvas;
    objContainer_Wrapper.position = new PIXI.Point(objMistriaDataPlanner.offsetCanvas.x * intMultiplierCanvas, objMistriaDataPlanner.offsetCanvas.y * intMultiplierCanvas);
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
    if (objContainers.grid === null) {
        objContainers.grid = new PIXI.Container();
        objContainer_Wrapper.addChild(objContainers.grid);
        objContainers.grid.zIndex = objZindexes.grid;
    }

    if (objGraphics_Grid === null && objMistriaDataPlanner.options.has('mode_grid')) {
        objGraphics_Grid = buildGrid().stroke({ color: 0x808080, pixelLine: true, width: 1 });
        objContainers.grid.addChild(objGraphics_Grid);
    }

    if (objGraphics_Grid !== null && !objMistriaDataPlanner.options.has('mode_grid')) {
        objContainers.grid.removeChild(objGraphics_Grid);
        objGraphics_Grid.destroy();
        objGraphics_Grid = null;
    }
}

function drawCollision(bolUseDiggableGrid = true) {
    if (objMistriaDataPlanner.options.has('mode_collision')) {

        //create if does not exist
        if (objContainers.collision === null) {
            objContainers.collision = new PIXI.Container();

            let intCellSize = intGridCellSize / 2;
            if (bolUseDiggableGrid) {

                for (var y = 0; y < arrGrid_Diggable.length; y++) {
                    for (var x = 0; x < arrGrid_Diggable[y].length; x++) {
                        if (!arrGrid_Diggable[y][x]) {
                            let elemCollisionChild = new PIXI.Graphics();
                            elemCollisionChild.rect(x * intCellSize, y * intCellSize, intCellSize, intCellSize);

                            switch (arrGrid_Diggable[y][x]) {
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
                            objContainers.collision.addChild(elemCollisionChild);
                        }
                    }
                }
            } else {
                arrCollisionUpgradeGrid.forEach((objCoord) => {
                    arrGrid_Collision[objCoord.y][objCoord.x] = objMistriaDataPlanner.house_upgrade ? 1 : 0;
                });

                for (var y = 0; y < arrGrid_Collision.length; y++) {
                    for (var x = 0; x < arrGrid_Collision[y].length; x++) {
                        if (arrGrid_Collision[y][x]) {
                            let elemCollisionChild = new PIXI.Graphics();
                            elemCollisionChild.rect(x * intCellSize, y * intCellSize, intCellSize, intCellSize);

                            switch (arrGrid_Collision[y][x]) {
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
                            objContainers.collision.addChild(elemCollisionChild);
                        }
                    }
                }
            }
        }

        objContainer_Wrapper.addChild(objContainers.collision);
        objContainers.collision.zIndex = objZindexes.grid;
        resizeContainers();
    } else {
        //remove if exists
        if (objContainers.collision !== null) {
            objContainer_Wrapper.removeChild(objContainers.collision);
            //do not destroy - can be used again
        }
    }
}

function drawFence() {
    if (objContainers.fence === null) {
        objContainers.fence = new PIXI.Container();

        arrFenceCoord.forEach((objCoord) => {
            const elemSprite = sprites.get('snow_peas');
            elemSprite.position.set(objCoord.x * intGridCellSize, objCoord.y * intGridCellSize);
            objContainers.fence.addChild(elemSprite);
        });
        objContainer_Wrapper.addChild(objContainers.fence);
        objContainers.fence.zIndex = objZindexes.fence;
        resizeContainers();
    }
}

async function addBackground() {
    if (objContainers.background === null) {
        objContainers.background = new PIXI.Container();
        objContainer_Wrapper.addChild(objContainers.background);
        objContainers.background.zIndex = objZindexes.background;
    }

    if (objContainers.background.children.length) {
        objContainers.background.removeChildAt(0);
    }

    let backgroundTexture = await PIXI.Assets.load(`textures/rooms/rm_farm_${objMistriaDataPlanner.season}_${objMistriaDataPlanner.house_upgrade}.png`);
    backgroundTexture.source.scaleMode = 'nearest';

    objSprite_Background = new PIXI.Sprite(backgroundTexture);
    objContainers.background.addChild(objSprite_Background);

    objSprite_Background.zIndex = objZindexes.background;

    $('#minimap').css('background-image', `url(textures/rooms/rm_farm_${objMistriaDataPlanner.season}_${objMistriaDataPlanner.house_upgrade}.png)`)
}

function drawSelection(objCellCoord = false) {
    if (strMode != 'selection_mode' && strMode != 'drawing_mode') return;

    //destroy previously drawn elements
    if (objContainers.selection !== null) {
        objContainer_Wrapper.removeChild(objContainers.selection);
        objContainers.selection.destroy();
        objContainers.selection = null
    }

    if (!bolIsDragging) return;
    if (!objCellCoord) return;

    //init container
    objContainers.selection = new PIXI.Graphics();
    objContainer_Wrapper.addChild(objContainers.selection);
    objContainers.selection.zIndex = objZindexes.selection;

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

    objContainers.selection.rect(objRectanglePx.x, objRectanglePx.y, objRectanglePx.w, objRectanglePx.h);
    objContainers.selection.fill(`rgba(255, 174, 0, 0.3)`);
    objContainers.selection.stroke({ color: `rgba(255, 174, 0, 0.8)`, width: 2, alignment: 1 });

    resizeContainers();
    //might be useful new Rectangle(100, 100, 200, 150);
    //highlight elements
}

function dragMap(objCellCoord) {
    if (strMode != 'dragging_mode') return;
    if (!bolIsDragging) return;

    objMistriaDataPlanner.offsetCanvas = {
        x: objMistriaDataPlanner.offsetCanvas.x - ((objStartCellCoord.x - objCellCoord.x) * intMultiplierCanvas),
        y: objMistriaDataPlanner.offsetCanvas.y - ((objStartCellCoord.y - objCellCoord.y) * intMultiplierCanvas),
    };
    resize();
}

function drawSoil() {
    arrGroundContainers.forEach(function (strContainerKey) {
        //destroy previously drawn elements
        if (objContainers[strContainerKey] !== null) {
            objContainer_Wrapper.removeChild(objContainers[strContainerKey]);
            objContainers[strContainerKey].destroy();
            objContainers[strContainerKey] = null
        }

        //init container
        objContainers[strContainerKey] = new PIXI.Container();
        objContainer_Wrapper.addChild(objContainers[strContainerKey]);
        objContainers[strContainerKey].zIndex = objZindexes[strContainerKey];
    });

    let arrGridNeighbours = convertGridToNeighbours(arrGrid_Soil)
    let arrGridNeighbours_Soil = convertGridToNeighbours(arrGrid_Soil, 2)
    let arrGridNeighbours_Wet = convertGridToNeighbours(arrGrid_Soil, 3)

    for (let y = 0; y < arrGrid_Soil.length; y++) {
        for (let x = 0; x < arrGrid_Soil[0].length; x++) {

            if (arrGrid_Soil[y][x]) {
                switch (arrGrid_Soil[y][x]) {
                    case 1: //ground
                        const elemSpriteGround = sprites.get(`tile_main_exteriors_${objMistriaDataPlanner.season}`);
                        elemSpriteGround.position.set(x * intGridCellSize, y * intGridCellSize);
                        objContainers.ground.addChild(elemSpriteGround);
                        break;
                    case 2: //tilled
                        const elemSpriteTilled = sprites.getSoil(`soil_${objMistriaDataPlanner.season === 'fall' ? 'autumn' : objMistriaDataPlanner.season}`, arrGridNeighbours_Soil[y][x])
                        elemSpriteTilled.position.set(x * intGridCellSize, y * intGridCellSize);
                        objContainers.soil.addChild(elemSpriteTilled);
                        break;
                    case 3: //tilled wet
                        const elemSprite = sprites.getSoil(`soil_${objMistriaDataPlanner.season === 'fall' ? 'autumn' : objMistriaDataPlanner.season}`, arrGridNeighbours_Soil[y][x])
                        // elemSprite.anchor.set(0.5)
                        elemSprite.position.set(x * intGridCellSize, y * intGridCellSize);
                        objContainers.soil.addChild(elemSprite);

                        const textureWet = sprites.getSoil(`soil_wet_${objMistriaDataPlanner.season === 'fall' ? 'autumn' : objMistriaDataPlanner.season}`, arrGridNeighbours_Wet[y][x])
                        const elemSpriteWet = new PIXI.Sprite(textureWet);
                        elemSpriteWet.position.set(x * intGridCellSize, y * intGridCellSize);
                        objContainers.soilWet.addChild(elemSpriteWet);
                        break;
                }
            } else if (!checkTileHasCollision({ x: x, y: y }, false)) {

                if (!arrGridNeighbours[y][x].includes(1)) {
                    continue;
                }
                const texture = sprites.getGrass(`grassautotile_${objMistriaDataPlanner.season === 'fall' ? 'autumn' : objMistriaDataPlanner.season}`, arrGridNeighbours[y][x])
                const elemSprite = new PIXI.Sprite(texture);
                elemSprite.position.set(x * intGridCellSize, y * intGridCellSize);
                objContainers.grass.addChild(elemSprite);
            }
        }
    }

    resizeContainers();
}

function drawCrops() {
    //destroy previously drawn elements
    if (objContainers.crops !== null) {
        objContainer_Wrapper.removeChild(objContainers.crops);
        objContainers.crops.destroy();
        objContainers.crops = null
    }

    //init container
    objContainers.crops = new PIXI.Container();
    objContainer_Wrapper.addChild(objContainers.crops);
    objContainers.crops.zIndex = objZindexes.crops;

    for (let y = 0; y < arrGrid_Crop.length; y++) {
        for (let x = arrGrid_Crop[0].length - 1; x >= 0; x--) {
            const strCropSpriteKey = arrGrid_Crop[y][x];

            if (strCropSpriteKey && !checkTileHasCollision({ x: x, y: y })) {

                const elemSprite = sprites.get(strCropSpriteKey);

                elemSprite.position.set(x * intGridCellSize, y * intGridCellSize);
                objContainers.crops.addChild(elemSprite);
            }
        }
    }

    resizeContainers();
}

const slice2D = (arr, startX, endX, startY, endY) => {
    return arr.slice(startY, endY).map(subArr => subArr.slice(startX, endX))
}

function updateSoilGrid(objCellCoord) {

    if (strMode != 'drawing_mode') return;
    if (!['soil', 'soil_tilled', 'soil_wet'].includes(strCurrentlyDrawing)) return;
    //can be usef dor crops too, then dragging is not needed, but  const bolWet is needed

    if (!bolIsDragging) return;

    const bolWet = strCurrentlyDrawing == 'soil_wet' || (!['soil', 'soil_tilled', 'soil_wet'].includes(strCurrentlyDrawing) && objMistriaDataPlanner.options.has('mode_wet'));
    const bolTilled = strCurrentlyDrawing == 'soil_tilled';

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

function updateCurrentlyDrawing(strItemKey = false) {
    strCurrentlyDrawing = strItemKey;
    updateCursorMode('drawing_mode')

    //update cursor with transparent element
}

function updateCursorMode(strModeTemp = false) {
    // let strMode = 'dragging_mode'; // drawing_mode, selection_mode
    strMode = strModeTemp;
    $('.tab').removeClass('active');
    $(`.tab[data-tab="${strMode}"]`).addClass('active');
    if (strMode == 'dragging_mode') {
        $('#page').addClass('dragging_mode');
    } else {
        $('#page').removeClass('dragging_mode');
    }
}
function checkTileHasCollision(objCell, bolUseDiggableGrid = true) {
    const objSelection = {
        x0: objCell.x * 2,
        y0: objCell.y * 2,
        x1: objCell.x * 2 + 1,
        y1: objCell.y * 2 + 1,
    }

    if (bolUseDiggableGrid) {
        const arrGrid_DiggableSlice = slice2D(arrGrid_Diggable, objSelection.x0, objSelection.x1 + 1, objSelection.y0, objSelection.y1 + 1);
        const setGrid_DiggableSliceValues = new Set(arrGrid_DiggableSlice.flat())
        return (!setGrid_DiggableSliceValues.has(0)) ? false : true;
    } else {
        const arrGrid_CollisionSlice = slice2D(arrGrid_Collision, objSelection.x0, objSelection.x1 + 1, objSelection.y0, objSelection.y1 + 1);
        const setGrid_CollisionSliceValues = new Set(arrGrid_CollisionSlice.flat())
        return (setGrid_CollisionSliceValues.size === 1 && setGrid_CollisionSliceValues.has(0)) ? false : true;
    }
}

function getClickedCell(event) {

    const rect = objPIXIapp.canvas.getBoundingClientRect();

    let scaleX = objPIXIapp.screen.width / rect.width;
    let scaleY = objPIXIapp.screen.height / rect.height;

    let x = (event.clientX - rect.left) * scaleX / intMultiplierCanvas;
    let y = (event.clientY - rect.top) * scaleY / intMultiplierCanvas;

    let objCell = {
        x: Math.floor((x - objMistriaDataPlanner.offsetCanvas.x) / intGridCellSize),
        y: Math.floor((y - objMistriaDataPlanner.offsetCanvas.y) / intGridCellSize),
    }

    // console.log( objCell)

    return objCell;
}


function checkDropdownVisibility(searchDiv) {
    // $('#page').removeClass('completed'); //no items found instead of competed
    //potentionally add class to force open
    $('#page .dropdown > .dropdown-section .dropdown-section').css('display', '');
    $('#page .dropdown > .dropdown-section').css('display', '');

    $(searchDiv).parent().parent().find('#page .dropdown > .dropdown-section .dropdown-section').each(function () {
        if (!$(this).find('.dropdown-item:visible').length) {
            $(this).hide();
        }
    });

    $(searchDiv).parent().parent().find('#page .dropdown > .dropdown-section').each(function () {
        if (!$(this).find('.dropdown-section:visible').length) {
            $(this).hide();
        }
    });




    // if (!$('#page .dropdown > .dropdown-section:visible').length && $('#search_items').val() === '' && !$('input.obtain_cbx:checked').length) {
    //     $('#page').addClass('completed');
    // }
}


async function loadMenuItems() {

    let bolScrolled = false;
    let intPrevScrollPos = 0;

    $('.tab_content').on('scroll', function () {
        bolScrolled = true;
    })

    setInterval(function () {
        if (bolScrolled) {
            bolScrolled = false;
            var intCurrentScrollPos = $('.tab_content:visible').scrollTop();
            if (intPrevScrollPos < intCurrentScrollPos && intCurrentScrollPos > 500) {
                if (intCurrentScrollPos - intPrevScrollPos > 30) {
                    $('#header').addClass('hidden');
                }
            } else {
                $('#header').removeClass('hidden');
            }
            intPrevScrollPos = intCurrentScrollPos;
        }
    }, 150);
    $('#side_menu #title .version').text(`v${objBuild.version}`);

    $('.search_items').on('keyup', function () {
        //remove value fron any other inputs
        $('#page').removeHighlight();
        $('.hide_search').removeClass('hide_search');
        $('#page .dropdown').removeClass('searching');

        const value = $(this).val().toLowerCase();

        if (value !== '') {
            $(this).parent().parent().find('.dropdown ').addClass('searching');
            const keywords = value.split('+').map(s => s.trim()).filter(Boolean);

            $(this).parent().parent().find('.dropdown-item').filter(function () {
                const text = $(this).text().trim().toLowerCase();
                const matchesAll = keywords.some(word => text.includes(word));

                if (matchesAll) {
                    $(this).removeClass('hide_search');
                } else {
                    $(this).addClass('hide_search');
                }
            });

            keywords.forEach(word => {
                $(this).parent().parent().find('.dropdown > .dropdown-section ').highlight(word);
            });

        }

        $(this).parent().parent().find('.dropdown > .dropdown-section .dropdown-section').each(function () {
            if (value !== '') {
                if ($(this).find('.dropdown-section-item').html().includes('highlight')) {
                    $(this).find('.dropdown-item').removeClass('hide_search');
                }
            }
            $(this).hide()
        });

        $(this).parent().parent().find('.dropdown > .dropdown-section').each(function () {
            if (value !== '') {
                if ($(this).find('.dropdown-section-item').html().includes('highlight')) {
                    $(this).find('.dropdown-item').removeClass('hide_search');
                }
            }

            if (!$(this).find('.dropdown-item:not(.spoiler_placeholder):visible').length) {
                $(this).hide()
            }
        });

        checkDropdownVisibility(this);
    });


    var arrModes = ['mode_dark', 'mode_collapse'];
    arrModes.forEach(function (strMode) {
        $(`#${strMode}`).prop('checked', false);
        $(`#${strMode}`).change(function () {
            let bolChecked = $(this).is(':checked');
            if (bolChecked) {
                $('#page').addClass(strMode);
                objMistriaData.options.add(strMode);
            } else {
                $('#page').removeClass(strMode);
                objMistriaData.options.delete(strMode);
            }

            if (strMode === 'mode_collapse') {
                resize()
                // setTimeout(function () { resize() }, 50);

            }
            saveData();
        });
    })

    objMistriaData.options.forEach(key => {
        $(`#${key}`).prop('checked', true);
        $('#page').addClass(key);
    })

    $(`.tab[data-tab="${strMode}"]`).addClass('active');
    if (strMode == 'dragging_mode') {
        $('#page').addClass('dragging_mode');
    } else {
        $('#page').removeClass('dragging_mode');
    }


    var arrModes = ['mode_dark'];
    arrModes.forEach(function (strMode) {
        $(`#${strMode}`).prop('checked', false);
        $(`#${strMode}`).change(function () {
            let bolChecked = $(this).is(':checked');
            if (bolChecked) {
                $('#page').addClass(strMode);
                objMistriaData.options.add(strMode);
            } else {
                $('#page').removeClass(strMode);
                objMistriaData.options.delete(strMode);
            }
            saveData();
        });
    })

    objMistriaData.options.forEach(key => {
        $(`#${key}`).prop('checked', true);
        $('#page').addClass(key);
    })


    arrModes = ['mode_grid', 'mode_collision', 'mode_soil', 'mode_wet']
    arrModes.forEach(function (strMode) {
        $(`#${strMode}`).prop('checked', false);
        $(`#${strMode}`).change(function () {
            let bolChecked = $(this).is(':checked');
            if (bolChecked) {
                $('#page').addClass(strMode);
                objMistriaDataPlanner.options.add(strMode);
            } else {
                $('#page').removeClass(strMode);
                objMistriaDataPlanner.options.delete(strMode);
            }
            saveDataPlanner();

            if (strMode === 'mode_grid') {
                drawGrid();
            }

            if (strMode === 'mode_collision') {
                drawCollision();
            }
        });
    })
    objMistriaDataPlanner.options.forEach(key => {
        $(`#${key}`).prop('checked', true);
    })

    $('.dropdown-item.season').removeClass('selected');
    $(`.dropdown-item.season[data-value="${objMistriaDataPlanner.season}"]`).addClass('selected');

    $('.dropdown-item.house_upgrade').removeClass('selected');
    $(`.dropdown-item.house_upgrade[data-value="${objMistriaDataPlanner.house_upgrade}"]`).addClass('selected');

    const objTabs = await (await fetch('json/tabs_planner.json')).json();
    const objItemsPlanner = await (await fetch('json/items_planner.json')).json();

    let $divDropdownSearch = $('<div>', { 'class': 'dropdown' });
    Object.entries(objTabs).forEach(([tabKey, tabData]) => {

        let $divDropdownSearchSection = $('<div>', { 'class': 'dropdown-section' });
        let $divDropdownSearchSectionHeader = $('<div>', { 'class': 'dropdown-item dropdown-section-item' });
        $divDropdownSearchSectionHeader.append(` 
                <div class="icon"><img src="images/${tabData.info.icon}"></div>
                <span class="dropdown-section-name">${tabData.info.name}</span>
            `);
        $divDropdownSearchSection.append($divDropdownSearchSectionHeader);
        let $divDropdownSearchSectionItems = $('<div>', { 'class': 'dropdown-section-items' });


        let $divDropdownWrapper = $('<div>', { 'class': 'dropdown_wrap', 'id': `tab_dropdown_${tabKey}` });
        $divDropdownWrapper.append(` 
            <div class="button_item dropdown_button">
                <div class="icon">
                    <img src="images/${tabData.info.icon}">
                </div>
               <span class="dropdown-section-name">${tabData.info.name}</span>
            </div>
        `);
        // $divDropdown.append(` 
        //     <div class="dropdown_search">

        //     </div>
        // `);
        let $divDropdown = $('<div>', { 'class': 'dropdown' });
        Object.entries(tabData.categories).forEach(([categoryKey, categoryData]) => {

            let $divDropdownSection = $('<div>', { 'class': 'dropdown-section' });

            let $divDropdownSectionHeader = $('<div>', { 'class': 'dropdown-item dropdown-section-item' });
            $divDropdownSectionHeader.append(` 
                <div class="icon"><img src="images/${categoryData.info.img_item_section_path}${categoryData.info.img}.png"></div>
                <span class="dropdown-section-name">${categoryData.info.name}</span>
            `);
            $divDropdownSection.append($divDropdownSectionHeader);

            let $divDropdownSectionItems = $('<div>', { 'class': 'dropdown-section-items' });

            categoryData.items.forEach(function (strItemKey) {
                let strName;
                let strImage;
                if (strItemKey in objItemsPlanner) {
                    strName = objItemsPlanner[strItemKey].name;
                    strImage = `images/${objItemsPlanner[strItemKey].img}.png`;
                } else {
                    strName = objItems[strItemKey].name;
                    strImage = `images/${categoryData.info.img_item_path}${strItemKey}.png`;
                }
                $divDropdownSectionItems.append(` 
                    <div class="dropdown-item dropdown-item-drawable" data-key="${strItemKey}">
                        <div class="icon"><img src="${strImage}"></div>
                        <span class="dropdown-section-name">${strName}</span>
                    </div>
                `);
                $divDropdownSection.append($divDropdownSectionItems);
            });

            $divDropdownSearchSectionItems.append($divDropdownSection.clone());

            $divDropdown.append($divDropdownSection);

        });

        $divDropdownSearchSection.append($divDropdownSearchSectionItems);
        $divDropdownSearch.append($divDropdownSearchSection);

        $divDropdownWrapper.append($divDropdown);
        $('#tabs').append($divDropdownWrapper);
    });

    $('#search_items_wrapper').append($divDropdownSearch);

    $('.dropdown-item-drawable').on('click', function (e) {
        const strItemKeySelected = $(this).attr('data-key');
        updateCurrentlyDrawing(strItemKeySelected);
        $('#page .dropdown').removeClass('searching');
    });

    //hide dropdowns on outside click
    $(document).on('click', function (e) {

        if ($(e.target).hasClass('dropdown-section-item')) {
            var jqDropdownSectionWrap = $(e.target).closest('.dropdown-section');

            if (jqDropdownSectionWrap.length === 0) {
                if ($(window).width() > 550) {
                    $('.dropdown-section').removeClass('open');
                }
            } else {
                if ($(window).width() > 550) {
                    $('.dropdown-section').not(jqDropdownSectionWrap).not(jqDropdownSectionWrap.parents('.dropdown-section')).removeClass('open');
                }
                $(jqDropdownSectionWrap).toggleClass('open');
            }
        } else {
            var jqDropdownWrap = $(e.target).closest('.dropdown_wrap');

            if ($(jqDropdownWrap).closest('#tabs').length) {
                if ($(window).width() > 550) {
                    $(jqDropdownWrap).find('.dropdown').css({
                        // 'top': $(jqDropdownWrap)[0].getBoundingClientRect().bottom + 10 + 'px',
                        'left': $(jqDropdownWrap)[0].getBoundingClientRect().right - $(jqDropdownWrap).outerWidth() + 'px',
                    })
                } else {
                    $(jqDropdownWrap).find('.dropdown').css('left', '')
                }

            }

            if (jqDropdownWrap.length === 0) {
                $('.dropdown_wrap').removeClass('open');
            } else {
                $('.dropdown_wrap').not(jqDropdownWrap).removeClass('open');
                //for mobile, if clicked outside mobile dropdown
                if (!$(e.target).hasClass('dropdown-item') && $(e.target).closest('#tabs').length && $(e.target).closest('.dropdown').length) {
                    return;
                } else {
                    if ($(e.target).is('input')) {
                        $(jqDropdownWrap).addClass('open');
                    } else {
                        $(jqDropdownWrap).toggleClass('open');
                    }
                }
            }
        }
    });

    tippy('#wet_soil', {
        content: 'When placing crops on the map, automatically place wet soil underneath them',
    });
}

function changeHouseUpgrade(objElem) {
    if ($(objElem).hasClass('selected')) return;

    objMistriaDataPlanner.house_upgrade = parseInt($(objElem).attr('data-value'));

    saveDataPlanner();

    $('.dropdown-item.house_upgrade').removeClass('selected');
    $(`.dropdown-item.house_upgrade[data-value="${objMistriaDataPlanner.house_upgrade}"]`).addClass('selected');

    addBackground();
    drawCollision();
}

function changeSeason(objElem) {
    if ($(objElem).hasClass('selected')) return;

    objMistriaDataPlanner.season = $(objElem).attr('data-value');

    saveDataPlanner();

    $('.dropdown-item.season').removeClass('selected');
    $(`.dropdown-item.season[data-value="${objMistriaDataPlanner.season}"]`).addClass('selected');

    addBackground();
    drawSoil();
}

function resetZoom(strDirection) {
    const objCanvasSize = {
        w: $('#game-container').width(),
        h: $('#game-container').height()
    }

    const intMultiplierFit = getMultiplierFitScreen();
    const intMultiplierCover = getMultiplierCoverScreen();

    let intZoom = (intMultiplierCover * 100 / intMultiplierFit).toFixed();

    if (strDirection === 'vertical') {
        if (objCanvasSize.w > objCanvasSize.h) {
            intZoom = 100;
        }
    } else if (strDirection === 'horizontal') {
        if (objCanvasSize.w < objCanvasSize.h) {
            intZoom = 100;
        }
    } else {
        intZoom = 100;
    }

    $('#zoomSlider').val(intZoom);
    objMistriaDataPlanner.zoom = intZoom;
    resize();
}

function verifyZoomParameters() {
    if (objMistriaDataPlanner.zoom > 100) {
        const intOffsetX = objMistriaDataPlanner.offsetCanvas.x * -1
        const intViewportWidth = $('#game-container').width() / intMultiplierCanvas;
        if (intOffsetX + intViewportWidth > objCanvasDefault.width) {
            objMistriaDataPlanner.offsetCanvas.x = (objCanvasDefault.width - intViewportWidth) * -1
        }
        if (objMistriaDataPlanner.offsetCanvas.x > 0) {
            objMistriaDataPlanner.offsetCanvas.x = 0;
        }

        const intOffsetY = objMistriaDataPlanner.offsetCanvas.y * -1
        const intViewportHeight = $('#game-container').height() / intMultiplierCanvas;
        if (intOffsetY + intViewportHeight > objCanvasDefault.height) {
            objMistriaDataPlanner.offsetCanvas.y = (objCanvasDefault.height - intViewportHeight) * -1
        }
        if (objMistriaDataPlanner.offsetCanvas.y > 0) {
            objMistriaDataPlanner.offsetCanvas.y = 0;
        }
    } else {
        objMistriaDataPlanner.offsetCanvas = {
            x: 0,
            y: 0,
        }
    }

    saveDataPlanner();
    updateMinimap();
}

function fitSize(container, content) {
    const scale = Math.min(
        container.w / content.w,
        container.h / content.h
    );

    return {
        w: content.w * scale,
        h: content.h * scale,
    };
}

function updateMinimap() {
    const objCanvasSize = {
        w: $('#game-container').width(),
        h: $('#game-container').height()
    }

    let objSelectionSize = fitSize(objMinimapWrapperSize, objCanvasSize);
    let objMinimapSize = fitSize({ w: objSelectionSize.w, h: objSelectionSize.h }, objMinimapWrapperSize);
    let intMapScale = objMistriaDataPlanner.zoom / 100;

    let intSelectionScale = 1;

    let intMinimapRatio;

    if (objCanvasSize.w > objCanvasSize.h) {
        intMinimapRatio = objMinimapSize.h * intMapScale / objMinimapWrapperSize.h
    } else {
        intMinimapRatio = objMinimapSize.w * intMapScale / objMinimapWrapperSize.w;
    }

    if (intMinimapRatio > 1) {
        objMinimapSize = objMinimapWrapperSize;
        intMapScale = 1;
        intSelectionScale = 1 / intMinimapRatio;
    }

    const objZoomSelectionSize = {
        w: objSelectionSize.w * intSelectionScale,
        h: objSelectionSize.h * intSelectionScale,
    }

    $('#minimap').css({
        width: objMinimapSize.w * intMapScale + 'px',
        height: objMinimapSize.h * intMapScale + 'px'
    });

    $('#zoom_selection').css({
        width: objZoomSelectionSize.w,
        height: objZoomSelectionSize.h,
        left: objMistriaDataPlanner.offsetCanvas.x * -objMinimapWrapperSize.w / (objGrid.x * intGridCellSize),
        top: objMistriaDataPlanner.offsetCanvas.y * -objMinimapWrapperSize.h / (objGrid.y * intGridCellSize)
    })

    $('#zoom_precent').html(objMistriaDataPlanner.zoom + '%')
}

function getTopLeftCorner(objCellCoord) {
    const objCanvasSize = {
        w: $('#game-container').width(),
        h: $('#game-container').height()
    }
    const objCanvasCellCount = {
        x: objCanvasSize.w / intMultiplierCanvas / intGridCellSize,
        y: objCanvasSize.h / intMultiplierCanvas / intGridCellSize
    }

    return { x: objCellCoord.x - objCanvasCellCount.x / 2, y: objCellCoord.y - objCanvasCellCount.y / 2 }
}

function minimapInit() {

    let bolDraggingMinimap = false
    let dragOffsetX = 0
    let dragOffsetY = 0

    $('#zoomSlider').val(objMistriaDataPlanner.zoom);
    updateMinimap();

    $('#minimap_wrapper').css({
        width: objMinimapWrapperSize.w + 'px',
        height: objMinimapWrapperSize.h + 'px'
    });

    $('#minimap').on('click', function (e) {
        let objMinimapOffset = $(this).offset()

        let objClickedCellCoord = {
            x: Math.floor((e.pageX - objMinimapOffset.left) * objGrid.x / objMinimapWrapperSize.w),
            y: Math.floor((e.pageY - objMinimapOffset.top) * objGrid.y / objMinimapWrapperSize.h),
        };

        let objTopLeftCellCoord = getTopLeftCorner(objClickedCellCoord)

        objMistriaDataPlanner.offsetCanvas = {
            x: objTopLeftCellCoord.x * intGridCellSize * -1,
            y: objTopLeftCellCoord.y * intGridCellSize * -1,
        };
        resize();
    })
    $('#zoomSlider').on('input', function () {
        objMistriaDataPlanner.zoom = parseInt($(this).val());
        resize();
    })

    $('#zoom_selection').on('pointerdown', function (e) {
        bolDraggingMinimap = true;
        let rectOffset = $(this).offset();
        dragOffsetX = e.pageX - rectOffset.left;
        dragOffsetY = e.pageY - rectOffset.top;
    })

    $(document).on('pointerup', function (e) {
        bolDraggingMinimap = false;
    })

    // $('#minimap_wrapper').on('pointerleave', function (e) {
    //     if (!bolDraggingMinimap) return;
    //     bolDraggingMinimap = false
    // })

    $('#zoom_selection').on('pointermove', function (e) {
        if (!bolDraggingMinimap) return;

        let objMinimapOffset = $('#minimap').offset()

        let intDraggedToX = e.pageX - objMinimapOffset.left - dragOffsetX;
        let intDraggedToY = e.pageY - objMinimapOffset.top - dragOffsetY;

        //from minimap size to full size
        objMistriaDataPlanner.offsetCanvas = {
            x: intDraggedToX * objGrid.x * intGridCellSize / objMinimapWrapperSize.w * -1,
            y: intDraggedToY * objGrid.y * intGridCellSize / objMinimapWrapperSize.h * -1,
        };
        resize();
    })

    document.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });
}

function loadDataPlanner() {
    objMistriaDataPlanner = JSON.parse(localStorage.getItem('mistria_data_planner'));

    objMistriaDataPlanner.zoom = parseInt(objMistriaDataPlanner.zoom);

    if (objMistriaDataPlanner === null) {
        objMistriaDataPlanner = objMistriaDataPlannerDefault;
    }

    // convert arrays to sets for to remove duplicates 
    objMistriaDataPlanner.options = ('options' in objMistriaDataPlanner ? new Set(objMistriaDataPlanner.options) : new Set(objMistriaDataPlannerDefault.options));
}

function saveDataPlanner() {
    // convert to array since JSON.stringify does not work on sets
    objMistriaDataPlanner.options = [...objMistriaDataPlanner.options];

    localStorage.setItem('mistria_data_planner', JSON.stringify(objMistriaDataPlanner));
    loadDataPlanner();
}


function throttle(fn, time) {
    let timeout = null;
    return function () {
        if (timeout) return;
        const context = this;
        const args = arguments;
        const later = () => {
            fn.call(context, ...args);
            timeout = null;
        }
        timeout = setTimeout(later, time);
    }
}
const handleResize = () => {
    resize();
    objPIXIapp.resize();
}
const handleResizeThrottled = throttle(handleResize, 250);
const resizeObserver = new ResizeObserver((entries) => {
    handleResizeThrottled();
});

$(function () {
    loadDataPlanner();
    loadMenuItems();
    minimapInit();
    addTestData(3);

    (async () => {

        arrGrid_Collision = await (await fetch('textures/collision.json')).json()
        arrCollisionUpgradeGrid = await (await fetch('textures/collision_houseupgrade.json')).json()
        arrGrid_Diggable = await (await fetch('textures/diggable.json')).json()

        arrFenceCoord = await (await fetch('textures/fences.json')).json()

        objPlannerDiv = document.getElementById('game-container');

        // Create a new application
        objPIXIapp = new PIXI.Application();

        // Initialize the application
        await objPIXIapp.init({ backgroundAlpha: 0, antialias: false, resizeTo: objPlannerDiv });

        // Append the application canvas to the document body
        objPlannerDiv.appendChild(objPIXIapp.canvas);

        //create wrapper container
        objContainer_Wrapper = new PIXI.Container();
        objPIXIapp.stage.addChild(objContainer_Wrapper);

        //load textures
        sprites = await SpriteStore.getInstance();

        objPIXIapp.stage.eventMode = 'static';
        objPIXIapp.stage.hitArea = objPIXIapp.screen;

        objPIXIapp.sortableChildren = true;
        objContainer_Wrapper.interactiveChildren = false;


        // clicking and dragging
        objPIXIapp.stage.on('pointerdown', (e) => {

            if ($('#tabs .dropdown_wrap.open').length) {
                return;
            }
            bolIsDragging = true;

            objStartCellCoord = getClickedCell(e);
            objPrevCellCoord = objStartCellCoord
            drawSelection(objStartCellCoord);
        });

        objPIXIapp.stage.on('pointermove', (e) => {
            if (bolIsDragging) {
                const objCurrentCellCoord = getClickedCell(e);
                if (objPrevCellCoord.x !== objCurrentCellCoord.x || objPrevCellCoord.y !== objCurrentCellCoord.y) {
                    objPrevCellCoord = objCurrentCellCoord
                    drawSelection(objCurrentCellCoord);
                    dragMap(objCurrentCellCoord);
                }
            }
        });

        objPIXIapp.stage.on('pointerup', (e) => {
            const objCurrentCellCoord = getClickedCell(e);
            updateSoilGrid(objCurrentCellCoord)

            if (strMode === 'dragging_mode') {
                const objSelection = {
                    x0: Math.min(objStartCellCoord.x, objCurrentCellCoord.x),
                    y0: Math.min(objStartCellCoord.y, objCurrentCellCoord.y),
                    x1: Math.max(objStartCellCoord.x, objCurrentCellCoord.x),
                    y1: Math.max(objStartCellCoord.y, objCurrentCellCoord.y),
                }

                if (objSelection.x0 == objSelection.x1 && objSelection.y0 == objSelection.y1) {
                    let objTopLeftCellCoord = getTopLeftCorner(objStartCellCoord)

                    objMistriaDataPlanner.offsetCanvas = {
                        x: objTopLeftCellCoord.x * intGridCellSize * -1,
                        y: objTopLeftCellCoord.y * intGridCellSize * -1,
                    };
                    resize();
                }
            }

            bolIsDragging = false;
            objStartCellCoord = { x: 0, y: 0 };
            objPrevCellCoord = { x: 0, y: 0 };
            drawSelection();

        });

        objPIXIapp.stage.on('pointerupoutside', (e) => {
            bolIsDragging = false;
            objStartCellCoord = { x: 0, y: 0 };
            objPrevCellCoord = { x: 0, y: 0 };
            drawSelection();
        });

        objPIXIapp.stage.on('wheel', (e) => {
            const intMultiplierFit = getMultiplierFitScreen();
            const intMultiplierZoomMax = (5 / intMultiplierFit) * 100;

            let intZoom = objMistriaDataPlanner.zoom + e.deltaY * -0.5;
            intZoom = Math.round(intZoom)

            if (intZoom < 50) {
                intZoom = 50;
            }

            if (intZoom > intMultiplierZoomMax) {
                intZoom = Math.round(intMultiplierZoomMax);
            }

            objMistriaDataPlanner.zoom = intZoom;
            $('#zoomSlider').val(intZoom);

            // center against cursor location
            // const objCurrentCellCoord = getClickedCell(e);
            // let objTopLeftCellCoord = getTopLeftCorner(objCurrentCellCoord)

            // objMistriaDataPlanner.offsetCanvas = {
            //     x: objTopLeftCellCoord.x * intGridCellSize * -1,
            //     y: objTopLeftCellCoord.y * intGridCellSize * -1,
            // };
            resize();
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
        drawFence();

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


        resizeObserver.observe(document.getElementById('app'));

        setTimeout(() => {
            handleResize();
            // $('#zoomSlider').trigger('input');
        }, 150);

    })();

});