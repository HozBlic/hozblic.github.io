let objMistriaDataPlanner;
let objMistriaDataPlannerDefault = objBuild.objMistriaDataPlannerDefault;
let arrDefaultElements = []

const arrGrassFixCoord = objBuild.arrGrassFixCoord
let objItemsPlanner = {}

let strMode = 'selection_mode'; // drawing_mode, dragging_mode, selection_mode
let intCurrentlyDrawing = false;
let strCurrentDirection = false;
let strCurrentColor = false;

let intSaveSlot = 0;
let arrVersions = [];
let intCurrentVersion = 0;
const intAllowedVersions = 15;

let bolIsDragging = false;
let bolIsDraggingSection = false;
let objDraggingSectionOffset = { x: 0, y: 0 };
let bolPreventDrawing = false;
let bolPickup = false;
let objStartCellCoord = { x: 0, y: 0 };
let objStartOffset = { x: 0, y: 0 };
let objPrevCellCoord = { x: 0, y: 0 };
let objSelectionSection = false;
let objSelectionItems = false;
let objNameDict = {};
let arrChecklistItems = [];

let lastMousePosition = { x: 0, y: 0 };

const intGridCellSize = 16 / 2;
const objGrid = {
    x: 138 * 2,
    y: 103 * 2
}
const objCanvasDefault = {
    width: objGrid.x * intGridCellSize,
    height: objGrid.y * intGridCellSize
}
const objMinimapWrapperSize = {
    w: 230,
    h: objGrid.y * 230 / objGrid.x
}
let objSpriteCategories;


let intMultiplierCanvas = 1;
const intMaxSize = 5; //5 times the original picture

let objKeyItemDict = null;
let objItemKeyDict = null;

let objSoilIndex = {}


let objZindex_Items = null;
let arrGrid_Collision = null;
let arrGrid_Diggable = null;

let objPlannerDiv;
let objPIXIapp;
let sprites = null;
let objGraphics_Grid = null;
let objGraphics_subGrid = null;
let objContainer_Wrapper = null;

let objGridCombined = {
    'main_corner': Array.from({ length: objGrid.y }, () => Array.from({ length: objGrid.x }, () => [])),
    'main_extend': Array.from({ length: objGrid.y }, () => Array.from({ length: objGrid.x }, () => [])),
    'cursor_corner': false,
}

let objContainers = {
    'background': null,
    'grassFix': null,
    'collision': null,

    'ee': null,
    'grid': null,

    'cursor': null,
}

const objZindex_Containers = {
    'background': 0,
    'grassFix': 1,

    'ee': 2,

    'collision': 3,
    'grid': 4,

    'cursor': 5,
}

function testAllItems() {
    Object.keys(objKeyItemDict).forEach(function (strItemIndex) {
        const intItemIndex = parseInt(strItemIndex);
        if (
            objSpriteCategories.building.includes(intItemIndex) ||
            objSpriteCategories.flooring.includes(intItemIndex) ||
            objSpriteCategories.wallpaper.includes(intItemIndex)
        ) {
            return;
        }

        try {
            const sprite = getSprite(intItemIndex);
            if (typeof sprite.meta.size === 'undefined') {
                console.log(objKeyItemDict[intItemIndex][0], 'no size')
            }
        } catch (e) {
            console.log(objKeyItemDict[intItemIndex][0], e)
        }
    });
}

function addTestData(intTest) {
    const intCurrentlyDrawingSoil = objMistriaDataPlanner.options.has('mode_wet') ? objSoilIndex.wetSoil : objSoilIndex.soil;
    let objSection = {}
    switch (intTest) {
        case 1: //add test soil in front of the house
            var intRows = 7;
            var intColumns = 9;

            var intStartX = 46;
            var intStartY = 23;

            var intCurrentlyDrawingTemp = objItemKeyDict['snow_peas'][0];

            objSection = {
                x0: intStartX * 2 + 0 * 2,
                x1: intStartX * 2 + (intColumns - 1) * 2,
                y0: intStartY * 2 + 0 * 2,
                y1: intStartY * 2 + (intRows - 1) * 2,
            }

            for (let y = 0; y < intRows; y++) {
                for (let x = 0; x < intColumns; x++) {
                    switch (true) {
                        case (y == 0 && x == 0):
                        case (y == 0 && x == intColumns - 1):
                        case (y == intRows - 1 && x == 0):
                        case (y == intRows - 1 && x == intColumns - 1):
                            break;
                        default:
                            const tempX = intStartX * 2 + x * 2;
                            const tempY = intStartY * 2 + y * 2;

                            const objSectionCell = { x0: tempX, y0: tempY, x1: tempX + 2, y1: tempY + 2 };
                            const spriteCrop = getSprite(intCurrentlyDrawingTemp, [0, 0, 0, 0, 0, 0, 0, 0]);
                            sprite.eventMode = 'static';
                            // sprite.on('pointerover', () => {
                            //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                            // });
                            // sprite.on('pointerleave', () => {
                            //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                            // });

                            spriteCrop.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                            spriteCrop.zIndex = getZindexbySpriteIndex(intCurrentlyDrawingTemp);

                            clearSection(objSectionCell);
                            objGridCombined.main_corner[tempY][tempX][intCurrentlyDrawingTemp] = { 'sprite': spriteCrop };
                            for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                                for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                    objGridCombined.main_extend[y1][x1][intCurrentlyDrawingTemp] = { 'coord': [tempX, tempY] };
                                }
                            }

                            const spriteSoil = getSprite(objSoilIndex.soil, [0, 0, 0, 0, 0, 0, 0, 0]);
                            spriteSoil.eventMode = 'static';
                            // spriteSoil.on('pointerover', () => {
                            //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                            // });
                            // spriteSoil.on('pointerleave', () => {
                            //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                            // });

                            spriteSoil.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                            spriteSoil.zIndex = getZindexbySpriteIndex(objSoilIndex.soil);

                            objGridCombined.main_corner[tempY][tempX][objSoilIndex.soil] = { 'sprite': spriteSoil };
                            for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                                for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                    objGridCombined.main_extend[y1][x1][objSoilIndex.soil] = { 'coord': [tempX, tempY] };
                                }
                            }
                            if (intCurrentlyDrawingSoil === objSoilIndex.wetSoil) {
                                const spriteSoilWet = getSprite(objSoilIndex.wetSoil, [0, 0, 0, 0, 0, 0, 0, 0]);
                                spriteSoilWet.eventMode = 'static';
                                // spriteSoilWet.on('pointerover', () => {
                                //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                                // });
                                // spriteSoilWet.on('pointerleave', () => {
                                //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                                // });

                                spriteSoilWet.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                                spriteSoilWet.zIndex = getZindexbySpriteIndex(objSoilIndex.wetSoil);

                                objGridCombined.main_corner[tempY][tempX][objSoilIndex.wetSoil] = { 'sprite': spriteSoilWet };
                                for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                                    for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                        objGridCombined.main_extend[y1][x1][objSoilIndex.wetSoil] = { 'coord': [tempX, tempY] };
                                    }
                                }
                            }

                            break;
                    }
                }
            }

            recalculateNeigborSprites(objSection);
            break;
        case 2: //add test soil top left corner
            var intRows = 7;
            var intColumns = 9

            var intStartX = 11;
            var intStartY = 14;

            var intCurrentlyDrawingTemp = objItemKeyDict['snow_peas'][0];

            objSection = {
                x0: intStartX * 2 + 0 * 2,
                x1: intStartX * 2 + (intColumns - 1) * 2,
                y0: intStartY * 2 + 0 * 2,
                y1: intStartY * 2 + (intRows - 1) * 2,
            }

            for (let y = 0; y < intRows; y++) {
                for (let x = 0; x < intColumns; x++) {
                    switch (true) {
                        case (y == 0 && x == 0):
                        case (y == 0 && x == intColumns - 1):
                        case (y == intRows - 1 && x == 0):
                        case (y == intRows - 1 && x == intColumns - 1):
                            break;
                        default:
                            const tempX = intStartX * 2 + x * 2;
                            const tempY = intStartY * 2 + y * 2;

                            const objSectionCell = { x0: tempX, y0: tempY, x1: tempX + 2, y1: tempY + 2 };
                            const spriteCrop = getSprite(intCurrentlyDrawingTemp, [0, 0, 0, 0, 0, 0, 0, 0]);

                            spriteCrop.eventMode = 'static';
                            // spriteCrop.on('pointerover', () => {
                            //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                            // });
                            // spriteCrop.on('pointerleave', () => {
                            //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                            // });
                            spriteCrop.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                            spriteCrop.zIndex = getZindexbySpriteIndex(intCurrentlyDrawingTemp);

                            clearSection(objSectionCell);
                            objGridCombined.main_corner[tempY][tempX][intCurrentlyDrawingTemp] = { 'sprite': spriteCrop };
                            for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                                for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                    objGridCombined.main_extend[y1][x1][intCurrentlyDrawingTemp] = { 'coord': [tempX, tempY] };
                                }
                            }

                            const spriteSoil = getSprite(objSoilIndex.soil, [0, 0, 0, 0, 0, 0, 0, 0]);
                            spriteSoil.eventMode = 'static';
                            // spriteSoil.on('pointerover', () => {
                            //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                            // });
                            // spriteSoil.on('pointerleave', () => {
                            //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                            // });
                            spriteSoil.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                            spriteSoil.zIndex = getZindexbySpriteIndex(objSoilIndex.soil);

                            objGridCombined.main_corner[tempY][tempX][objSoilIndex.soil] = { 'sprite': spriteSoil };
                            for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                                for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                    objGridCombined.main_extend[y1][x1][objSoilIndex.soil] = { 'coord': [tempX, tempY] };
                                }
                            }

                            if (intCurrentlyDrawingSoil === objSoilIndex.wetSoil) {
                                const spriteSoilWet = getSprite(objSoilIndex.wetSoil, [0, 0, 0, 0, 0, 0, 0, 0]);
                                objSoilIndex.wetSoil.eventMode = 'static';
                                // objSoilIndex.wetSoil.on('pointerover', () => {
                                //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                                // });
                                // objSoilIndex.wetSoil.on('pointerleave', () => {
                                //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                                // });
                                spriteSoilWet.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                                spriteSoilWet.zIndex = getZindexbySpriteIndex(objSoilIndex.wetSoil);

                                objGridCombined.main_corner[tempY][tempX][objSoilIndex.wetSoil] = { 'sprite': spriteSoilWet };
                                for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                                    for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                        objGridCombined.main_extend[y1][x1][objSoilIndex.wetSoil] = { 'coord': [tempX, tempY] };
                                    }
                                }
                            }

                            break;
                    }
                }
            }
            recalculateNeigborSprites(objSection);
            break;
        case 3: //add patch of peas and tea

            var intRows = 2;
            var intColumns = 2

            var intStartX = 11;
            var intStartY = 14;

            var intCurrentlyDrawingTemp = objItemKeyDict['snow_peas'][0];

            objSection = {
                x0: intStartX * 2 + 0 * 2,
                x1: intStartX * 2 + (intColumns - 1) * 2,
                y0: intStartY * 2 + 0 * 2,
                y1: intStartY * 2 + (intRows - 1) * 2,
            }

            for (let y = 0; y < intRows; y++) {
                for (let x = 0; x < intColumns; x++) {
                    const tempX = intStartX * 2 + x * 2;
                    const tempY = intStartY * 2 + y * 2;

                    const objSectionCell = { x0: tempX, y0: tempY, x1: tempX + 2, y1: tempY + 2 };
                    const spriteCrop = getSprite(intCurrentlyDrawingTemp, [0, 0, 0, 0, 0, 0, 0, 0]);
                    spriteCrop.eventMode = 'static';
                    // spriteCrop.on('pointerover', () => {
                    //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                    // });
                    // spriteCrop.on('pointerleave', () => {
                    //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                    // });
                    spriteCrop.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                    spriteCrop.zIndex = getZindexbySpriteIndex(intCurrentlyDrawingTemp);

                    clearSection(objSectionCell);
                    objGridCombined.main_corner[tempY][tempX][intCurrentlyDrawingTemp] = { 'sprite': spriteCrop };
                    for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                        for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                            objGridCombined.main_extend[y1][x1][intCurrentlyDrawingTemp] = { 'coord': [tempX, tempY] };
                        }
                    }

                    const spriteSoil = getSprite(objSoilIndex.soil, [0, 0, 0, 0, 0, 0, 0, 0]);

                    spriteSoil.eventMode = 'static';
                    // spriteSoil.on('pointerover', () => {
                    //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                    // });
                    // spriteSoil.on('pointerleave', () => {
                    //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                    // });
                    spriteSoil.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                    spriteSoil.zIndex = getZindexbySpriteIndex(objSoilIndex.soil);

                    objGridCombined.main_corner[tempY][tempX][objSoilIndex.soil] = { 'sprite': spriteSoil };
                    for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                        for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                            objGridCombined.main_extend[y1][x1][objSoilIndex.soil] = { 'coord': [tempX, tempY] };
                        }
                    }

                    if (intCurrentlyDrawingSoil === objSoilIndex.wetSoil) {
                        const spriteSoilWet = getSprite(objSoilIndex.wetSoil, [0, 0, 0, 0, 0, 0, 0, 0]);

                        spriteSoilWet.eventMode = 'static';
                        // spriteSoilWet.on('pointerover', () => {
                        //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                        // });
                        // spriteSoilWet.on('pointerleave', () => {
                        //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                        // });
                        spriteSoilWet.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                        spriteSoilWet.zIndex = getZindexbySpriteIndex(objSoilIndex.wetSoil);

                        objGridCombined.main_corner[tempY][tempX][objSoilIndex.wetSoil] = { 'sprite': spriteSoilWet };
                        for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                            for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                objGridCombined.main_extend[y1][x1][objSoilIndex.wetSoil] = { 'coord': [tempX, tempY] };
                            }
                        }
                    }
                }
            }

            intStartX = 14;
            objSection.x1 = intStartX * 2 + (intColumns - 1) * 2;

            intCurrentlyDrawingTemp = objItemKeyDict['tea'][0];

            for (let y = 0; y < intRows; y++) {
                for (let x = 0; x < intColumns; x++) {
                    const tempX = intStartX * 2 + x * 2;
                    const tempY = intStartY * 2 + y * 2;

                    const objSectionCell = { x0: tempX, y0: tempY, x1: tempX + 2, y1: tempY + 2 };
                    const spriteCrop = getSprite(intCurrentlyDrawingTemp, [0, 0, 0, 0, 0, 0, 0, 0]);
                    spriteCrop.eventMode = 'static';
                    // spriteCrop.on('pointerover', () => {
                    //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                    // });
                    // spriteCrop.on('pointerleave', () => {
                    //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                    // });
                    spriteCrop.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                    spriteCrop.zIndex = getZindexbySpriteIndex(intCurrentlyDrawingTemp);

                    clearSection(objSectionCell);
                    objGridCombined.main_corner[tempY][tempX][intCurrentlyDrawingTemp] = { 'sprite': spriteCrop };
                    for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                        for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                            objGridCombined.main_extend[y1][x1][intCurrentlyDrawingTemp] = { 'coord': [tempX, tempY] };
                        }
                    }

                    const spriteSoil = getSprite(objSoilIndex.soil, [0, 0, 0, 0, 0, 0, 0, 0]);
                    spriteSoil.eventMode = 'static';
                    // spriteSoil.on('pointerover', () => {
                    //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                    // });
                    // spriteSoil.on('pointerleave', () => {
                    //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                    // });
                    spriteSoil.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                    spriteSoil.zIndex = getZindexbySpriteIndex(objSoilIndex.soil);

                    objGridCombined.main_corner[tempY][tempX][objSoilIndex.soil] = { 'sprite': spriteSoil };
                    for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                        for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                            objGridCombined.main_extend[y1][x1][objSoilIndex.soil] = { 'coord': [tempX, tempY] };
                        }
                    }

                    if (intCurrentlyDrawingSoil === objSoilIndex.wetSoil) {
                        const spriteSoilWet = getSprite(objSoilIndex.wetSoil, [0, 0, 0, 0, 0, 0, 0, 0]);
                        spriteSoilWet.eventMode = 'static';
                        // spriteSoilWet.on('pointerover', () => {
                        //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                        // });
                        // spriteSoilWet.on('pointerleave', () => {
                        //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                        // });
                        spriteSoilWet.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                        spriteSoilWet.zIndex = getZindexbySpriteIndex(objSoilIndex.wetSoil);

                        objGridCombined.main_corner[tempY][tempX][objSoilIndex.wetSoil] = { 'sprite': spriteSoilWet };
                        for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                            for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                objGridCombined.main_extend[y1][x1][objSoilIndex.wetSoil] = { 'coord': [tempX, tempY] };
                            }
                        }
                    }
                }
            }


            recalculateNeigborSprites(objSection);
            break;
        case 4: //add all crops
            let arrCrops = [...objSpriteCategories.crops];
            arrCrops = arrCrops.reverse();
            let intCropsSqrRoot = Math.round(Math.sqrt(arrCrops.length)) * 2 + 1;

            var intStartX = 11;
            var intStartY = 14;

            objSection = {
                x0: intStartX * 2 + 0 * 2,
                x1: intStartX * 2 + (intCropsSqrRoot - 1) * 2,
                y0: intStartY * 2 + 0 * 2,
                y1: intStartY * 2 + (intCropsSqrRoot - 1) * 2,
            }

            for (let y = 0; y < intCropsSqrRoot; y = y + 2) {
                for (let x = 0; x < intCropsSqrRoot; x = x + 2) {
                    if (arrCrops.length) {
                        let intCurrentlyDrawingTemp = arrCrops.pop();

                        const tempX = intStartX * 2 + x * 2;
                        const tempY = intStartY * 2 + y * 2;

                        const objSectionCell = { x0: tempX, y0: tempY, x1: tempX + 2, y1: tempY + 2 };
                        const spriteCrop = getSprite(intCurrentlyDrawingTemp, [0, 0, 0, 0, 0, 0, 0, 0]);
                        spriteCrop.eventMode = 'static';
                        // spriteCrop.on('pointerover', () => {
                        //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                        // });
                        // spriteCrop.on('pointerleave', () => {
                        //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                        // });
                        spriteCrop.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                        spriteCrop.zIndex = getZindexbySpriteIndex(intCurrentlyDrawingTemp);
                        spriteCrop.eventMode = 'static';
                        // spriteCrop.on('pointerover', () => {
                        //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                        // });
                        // spriteCrop.on('pointerleave', () => {
                        //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                        // });

                        clearSection(objSectionCell);
                        objGridCombined.main_corner[tempY][tempX][intCurrentlyDrawingTemp] = { 'sprite': spriteCrop };
                        for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                            for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                objGridCombined.main_extend[y1][x1][intCurrentlyDrawingTemp] = { 'coord': [tempX, tempY] };
                            }
                        }

                        const spriteSoil = getSprite(objSoilIndex.soil, [0, 0, 0, 0, 0, 0, 0, 0]);
                        spriteSoil.eventMode = 'static';
                        // spriteSoil.on('pointerover', () => {
                        //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                        // });
                        // spriteSoil.on('pointerleave', () => {
                        //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                        // });
                        spriteSoil.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                        spriteSoil.zIndex = getZindexbySpriteIndex(objSoilIndex.soil);

                        objGridCombined.main_corner[tempY][tempX][objSoilIndex.soil] = { 'sprite': spriteSoil };
                        for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                            for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                objGridCombined.main_extend[y1][x1][objSoilIndex.soil] = { 'coord': [tempX, tempY] };
                            }
                        }

                        if (intCurrentlyDrawingSoil === objSoilIndex.wetSoil) {
                            const spriteSoilWet = getSprite(objSoilIndex.wetSoil, [0, 0, 0, 0, 0, 0, 0, 0]);
                            spriteSoilWet.eventMode = 'static';
                            // spriteSoilWet.on('pointerover', () => {
                            //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                            // });
                            // spriteSoilWet.on('pointerleave', () => {
                            //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                            // });
                            spriteSoilWet.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                            spriteSoilWet.zIndex = getZindexbySpriteIndex(objSoilIndex.wetSoil);

                            objGridCombined.main_corner[tempY][tempX][objSoilIndex.wetSoil] = { 'sprite': spriteSoilWet };
                            for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                                for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                    objGridCombined.main_extend[y1][x1][objSoilIndex.wetSoil] = { 'coord': [tempX, tempY] };
                                }
                            }
                        }
                    }
                }
            }
            recalculateNeigborSprites(objSection);
            break;
    }
}

const hasCommonElement = (arr1, arr2) => arr1.some(v => arr2.indexOf(v) !== -1);
const getCommonElements = (arr1, arr2) => arr1.filter(v => arr2.includes(v));
function convertGridToNeighbours(intItemIndex = null, objSelection = { x0: 0, y0: 0, x1: objGrid.x, y1: objGrid.y }) {
    const startTime = performance.now()

    //clockwise NOT
    const directions = [
        [-1, -1], [0, -1], [1, -1],
        [-1, 0], [1, 0],
        [-1, 1], [0, 1], [1, 1]
    ];
    const bolTwosOnly = (objSpriteCategories.soil.includes(intItemIndex) || objSpriteCategories.crops.includes(intItemIndex) || objSpriteCategories.on_twos_only.includes(intItemIndex)) ? true : false;

    let arrNeighbourGrid = [];
    for (let row = objSelection.y0; row <= objSelection.y1; row++) {
        let arrNeighbourGrid_row = [];

        if (bolTwosOnly && row % 2) {
            //skip this row
            arrNeighbourGrid.push([...Array((objSelection.x1 - objSelection.x0 + 1))].map(e => Array(8).fill(0)));
            continue;
        }
        for (let col = objSelection.x0; col <= objSelection.x1; col++) {

            if (bolTwosOnly && col % 2) {
                //skip this column
                arrNeighbourGrid_row.push(Array(8).fill(0))
                continue;
            }

            let arrNeighbourGrid_current = [];

            directions.forEach(([dx, dy]) => {
                const newRow = row + (dy * 2); //item size instead of 2?
                const newCol = col + (dx * 2);

                const objCurrentItems = objGridCombined.main_corner[newRow]?.[newCol] || {};
                const arrCellItems = Object.keys(objCurrentItems).map(strIndex => parseInt(strIndex));

                // console.log(arrCurrentValues)
                switch (intItemIndex) {
                    case 2:
                        //checking for tilled soil - will use the same sprite regardless of whether there is soil or wet soil nearby
                        arrNeighbourGrid_current.push(hasCommonElement(arrCellItems, [2, 3]) ? 1 : 0)
                        break;
                    case 3:
                        //checking for wet tilled soil - sprite will change only with another wet soil sprite
                        arrNeighbourGrid_current.push(arrCellItems.includes(3) ? 1 : 0)
                        break;
                    case 4:
                        //checking for grass - ground or any type of soil must be nearby
                        arrNeighbourGrid_current.push(hasCommonElement(arrCellItems, [1, 2, 3]) ? 1 : 0)
                        break;
                    default:
                        //checking if same tile is in neighbors
                        arrNeighbourGrid_current.push(arrCellItems.includes(intItemIndex) ? 1 : 0)
                        break;
                }
            });
            arrNeighbourGrid_row.push(arrNeighbourGrid_current)
        }
        arrNeighbourGrid.push(arrNeighbourGrid_row)
    }
    const endTime = performance.now()
    // console.log(`convertGridToNeighbours - ${endTime - startTime} milliseconds`)
    return arrNeighbourGrid;
}

function recalculateNeigborSprites(objSection = { x0: 0, y0: 0, x1: objGrid.x, y1: objGrid.y }) {
    const startTime = performance.now()

    //add 1 big cell (2x2) frame to section
    //all items that change their sprite depending on neighbors are 2x2 big

    objSection = {
        x0: Math.max(objSection.x0 - 2, 0),
        y0: Math.max(objSection.y0 - 2, 0),
        x1: Math.min(objSection.x1 + 2 + 1, objGrid.x),
        y1: Math.min(objSection.y1 + 2 + 1, objGrid.y),
    }

    const arrGrid_Slice2D = slice2D(objGridCombined.main_corner, objSection.x0, objSection.x1, objSection.y0, objSection.y1);
    const arrSeenItems = [...new Set(arrGrid_Slice2D.flat().flat().flatMap(obj => Object.keys(obj)).map(strIndex => parseInt(strIndex)))];

    const arrSeenFences = getCommonElements(arrSeenItems, objSpriteCategories.fences)
    const arrSeenGround = getCommonElements(arrSeenItems, objSpriteCategories.soil)
    const arrSeenCounters = getCommonElements(arrSeenItems, objSpriteCategories.counter)
    let arrNeighborItems = getCommonElements(arrSeenItems, [...arrSeenGround, ...arrSeenFences, ...arrSeenCounters]);
    arrNeighborItems.push(4);

    let objNeighbors = {}

    arrNeighborItems.forEach((intIdx) => {
        objNeighbors[intIdx] = convertGridToNeighbours(intIdx, objSection);
    });

    for (let y = objSection.y0; y < objSection.y1; y++) {
        for (let x = objSection.x0; x < objSection.x1; x++) {

            let bolHasGrass = false;
            let bolHasSoil = false;
            arrNeighborItems.forEach((intIdx) => {
                if (intIdx in objGridCombined.main_corner[y][x]) {
                    if (intIdx == objSoilIndex.grass) {
                        bolHasGrass = true;
                    }
                    if ([objItemKeyDict['tile_main_exteriors'][0], objItemKeyDict['tile_soil'][0], objItemKeyDict['tile_soil_wet'][0]].includes(intIdx)) {
                        bolHasSoil = true;
                    }

                    const arrNeigbors = objNeighbors[intIdx][y - objSection.y0][x - objSection.x0]
                    const sprite = getSprite(intIdx, arrNeigbors);
                    sprite.eventMode = 'static';
                    // sprite.on('pointerover', () => {
                    //     highlightSection({ x0: x, x1: x, y0: y, y1: y })
                    // });
                    // sprite.on('pointerleave', () => {
                    //     highlightSection({ x0: x, x1: x, y0: y, y1: y }, true)
                    // });
                    sprite.position.set(x * intGridCellSize, y * intGridCellSize);
                    sprite.zIndex = getZindexbySpriteIndex(intIdx);

                    //remove previous sprite if exists
                    if (intIdx in objGridCombined.main_corner[y][x] && 'sprite' in objGridCombined.main_corner[y][x][intIdx]) {
                        const spritePrev = objGridCombined.main_corner[y][x][intIdx].sprite;
                        if (spritePrev.parent !== null) {
                            spritePrev.parent.removeChild(spritePrev);
                        }
                    }
                    objGridCombined.main_corner[y][x][intIdx] = { 'sprite': sprite, 'neigbors': arrNeigbors };
                }
            });

            //outer layer might need grass
            if (!bolHasGrass && !bolHasSoil) {
                const arrNeigbors = objNeighbors[objSoilIndex.grass][y - objSection.y0][x - objSection.x0]
                if (arrNeigbors.includes(1)) {
                    const sprite = getSprite(objSoilIndex.grass, arrNeigbors);
                    sprite.eventMode = 'static';
                    // sprite.on('pointerover', () => {
                    //     highlightSection({ x0: x, x1: x, y0: y, y1: y })
                    // });
                    // sprite.on('pointerleave', () => {
                    //     highlightSection({ x0: x, x1: x, y0: y, y1: y }, true)
                    // });
                    sprite.position.set(x * intGridCellSize, y * intGridCellSize);
                    sprite.zIndex = getZindexbySpriteIndex(objSoilIndex.grass);

                    //remove previous sprite if exists
                    if (objSoilIndex.grass in objGridCombined.main_corner[y][x] && 'sprite' in objGridCombined.main_corner[y][x][objSoilIndex.grass]) {
                        const spritePrev = objGridCombined.main_corner[y][x][objSoilIndex.grass].sprite;
                        if (spritePrev.parent !== null) {
                            spritePrev.parent.removeChild(spritePrev);
                        }
                    }
                    objGridCombined.main_corner[y][x][objSoilIndex.grass] = { 'sprite': sprite, 'neigbors': arrNeigbors };
                }
            }

            if (bolHasGrass && bolHasSoil) {
                if (objSoilIndex.grass in objGridCombined.main_corner[y][x] && 'sprite' in objGridCombined.main_corner[y][x][objSoilIndex.grass]) {
                    const spriteGrass = objGridCombined.main_corner[y][x][objSoilIndex.grass].sprite;
                    if (spriteGrass.parent !== null) {
                        spriteGrass.parent.removeChild(spriteGrass);
                    }
                }
                delete objGridCombined.main_corner[y][x][objSoilIndex.grass];
            }
        }
    }

    const endTime = performance.now()
    // console.log(`recalculateNeigborSprites - ${endTime - startTime} milliseconds`)
}


function getMultiplierFitScreen() {
    const intContainerWidth = document.querySelector('#canvas_wrapper').offsetWidth;
    const intContainerHeight = document.querySelector('#canvas_wrapper').offsetHeight;
    return Math.min(intContainerWidth / objCanvasDefault.width, intContainerHeight / objCanvasDefault.height);
}
function getMultiplierCoverScreen() {
    const intContainerWidth = document.querySelector('#canvas_wrapper').offsetWidth;
    const intContainerHeight = document.querySelector('#canvas_wrapper').offsetHeight;
    return Math.max(intContainerWidth / objCanvasDefault.width, intContainerHeight / objCanvasDefault.height);
}

function resize() {
    verifyZoomParameters();
    resizeContainers();
}

function resizeContainers() {
    objContainer_Wrapper.scale = intMultiplierCanvas;
    objContainer_Wrapper.position = new PIXI.Point(objMistriaDataPlanner.offsetCanvas.x * intMultiplierCanvas, objMistriaDataPlanner.offsetCanvas.y * intMultiplierCanvas);
}

function buildGrid(bolDashed = false) {
    function drawLine(x1, y1, x2, y2) {
        if (!bolDashed) {
            graphics.moveTo(x1, y1).lineTo(x2, y2);
            return;
        }

        const dash = 1;
        const gap = 2;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);
        const step = dash + gap;

        for (let dist = 0; dist < length; dist += step) {
            const startX = x1 + Math.cos(angle) * dist;
            const startY = y1 + Math.sin(angle) * dist;

            const endDist = Math.min(dist + dash, length);
            const endX = x1 + Math.cos(angle) * endDist;
            const endY = y1 + Math.sin(angle) * endDist;

            graphics.moveTo(startX, startY);
            graphics.lineTo(endX, endY);
        }
    }

    const graphics = new PIXI.Graphics();
    const intVertical = objGrid.x / 2 + (bolDashed ? 1 : 0);
    const intHorizontal = objGrid.y / 2 + (bolDashed ? 1 : 0);
    const intCellSize = intGridCellSize * 2;

    // Vertical lines
    for (let i = 0; i < intVertical; i++) {
        const x = i * intCellSize;
        drawLine(x, 0, x, intHorizontal * intCellSize);
    }

    drawLine(
        intVertical * intCellSize,
        0,
        intVertical * intCellSize,
        intHorizontal * intCellSize
    );

    // Horizontal lines
    for (let i = 0; i < intHorizontal; i++) {
        const y = i * intCellSize;
        drawLine(0, y, intVertical * intCellSize, y);
    }

    drawLine(
        0,
        intHorizontal * intCellSize,
        intVertical * intCellSize,
        intHorizontal * intCellSize
    );

    return graphics;
}

function drawGrid() {
    if (objContainers.grid === null) {
        objContainers.grid = new PIXI.Container();
        objContainer_Wrapper.addChild(objContainers.grid);
        objContainers.grid.zIndex = objZindex_Containers.grid;
    }

    if (objGraphics_Grid === null && objMistriaDataPlanner.options.has('mode_grid')) {
        objGraphics_Grid = buildGrid().stroke({ color: 0x808080, alpha: 0.8, pixelLine: true });
        objGraphics_subGrid = buildGrid(true).stroke({ color: 0x808080, alpha: 0.5, pixelLine: true });
        objGraphics_subGrid.position.set(-intGridCellSize, -intGridCellSize);
        objContainers.grid.addChild(objGraphics_Grid);
        objContainers.grid.addChild(objGraphics_subGrid);
    }

    if (objGraphics_Grid !== null && !objMistriaDataPlanner.options.has('mode_grid')) {
        objContainers.grid.removeChild(objGraphics_Grid);
        objContainers.grid.removeChild(objGraphics_subGrid);
        objGraphics_Grid.destroy();
        objGraphics_Grid = null;
    }
}

function drawCollision(bolUseDiggableGrid = true) {
    if (objMistriaDataPlanner.options.has('mode_collision')) {

        //create if does not exist
        if (objContainers.collision === null) {
            objContainers.collision = new PIXI.Container();

            let intCellSize = intGridCellSize;
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
        objContainers.collision.zIndex = objZindex_Containers.grid;
        resizeContainers();
    } else {
        //remove if exists
        if (objContainers.collision !== null) {
            objContainer_Wrapper.removeChild(objContainers.collision);
            //do not destroy - can be used again
        }
    }
}

function getZindexbySpriteIndex(intItemIndex) {
    return Object.keys(objZindex_Items).find(k => objZindex_Items[k].includes(intItemIndex)) || "99";
}

async function addBackground() {
    if (objContainers.background === null) {
        objContainers.background = new PIXI.Container();
        objContainer_Wrapper.addChild(objContainers.background);
        objContainers.background.zIndex = objZindex_Containers.background;
    }

    if (objContainers.background.children.length) {
        objContainers.background.removeChildAt(0);
    }

    let backgroundTexture = await PIXI.Assets.load(`../images/rooms/rm_farm_${objMistriaDataPlanner.season}_${objMistriaDataPlanner.house_upgrade}.png`);
    backgroundTexture.source.scaleMode = 'nearest';

    objSprite_Background = new PIXI.Sprite(backgroundTexture);
    objContainers.background.addChild(objSprite_Background);

    objSprite_Background.zIndex = objZindex_Containers.background;

    $('#minimap').css('background-image', `url(../images/rooms/rm_farm_${objMistriaDataPlanner.season}_${objMistriaDataPlanner.house_upgrade}.png)`)
}

function moveSelection(objCellCoord = false) {
}

function dragMap(objCellCoord) {
    if (!bolIsDragging) return;
    if (objPrevCellCoord.x === objCellCoord.x && objPrevCellCoord.y === objCellCoord.y) {
        objPrevCellCoord = objCellCoord;
        return;
    }
    objPrevCellCoord = objCellCoord;

    objMistriaDataPlanner.offsetCanvas = {
        x: objStartOffset.x - (objStartCellCoord.eventX - objCellCoord.eventX),
        y: objStartOffset.y - (objStartCellCoord.eventY - objCellCoord.eventY),
    };
    resize();
}


function drawGrassFix() {
    //destroy previously drawn elements
    if (objContainers.grassFix !== null) {
        objContainer_Wrapper.removeChild(objContainers.grassFix);
        objContainers.grassFix.destroy();
        objContainers.grassFix = null
    }

    //init container
    objContainers.grassFix = new PIXI.Container();
    objContainer_Wrapper.addChild(objContainers.grassFix);
    objContainers.grassFix.zIndex = objZindex_Containers.grassFix;

    arrGrassFixCoord.forEach(function (arrTileCoord) {
        const x = arrTileCoord[0];
        const y = arrTileCoord[1];
        const texture = sprites.getGrass(`tile_grassautotile_${objMistriaDataPlanner.season === 'fall' ? 'autumn' : objMistriaDataPlanner.season}`, [0, 0, 0, 0, 0, 0, 0, 0])
        const elemSprite = new PIXI.Sprite(texture);
        elemSprite.position.set(x * intGridCellSize, y * intGridCellSize);
        objContainers.grassFix.addChild(elemSprite);
    });

    resizeContainers();
}

const slice2D = (arr, startX, endX, startY, endY) => {
    return arr.slice(startY, endY + 1).map(subArr => subArr.slice(startX, endX + 1))
}


function calculateOffsetSection(objCellCoord) {
    if (!objSelectionSection || strMode !== 'selection_mode') {
        return { x: 0, y: 0 };
    }

    const smallest = objSelectionItems.arrCoords
        .map(c => c.replace(/[\[\]\s]/g, "").split(",").map(Number))
        .sort((a, b) => a[0] - b[0] || a[1] - b[1])[0];

    return { x: smallest[0] - objCellCoord.x, y: smallest[1] - objCellCoord.y };
}

function toggleAdditionalControls() {
    if ((!objSelectionSection || strMode !== 'selection_mode' || bolIsDraggingSection) && strMode !== 'drawing_mode') {
        ;
        $('#section_controls').removeClass('has_section').removeClass('has_item');
    } else if (strMode === 'selection_mode') {
        $('#section_controls').addClass('has_section');
    } else if (strMode === 'drawing_mode') {
        $('#section_rotate_button').hide();
        $('#section_controls').addClass('has_item');

        const directions = ['east', 'north', 'west', 'south'];
        const arrAvailableDirections = [];
        directions.forEach((strDirection) => {
            if (objSpriteCategories[strDirection].includes(intCurrentlyDrawing)) {
                arrAvailableDirections.push(strDirection);
            }
        });

        const intAvailableDirectionsCount = arrAvailableDirections.length;
        if (intAvailableDirectionsCount > 1) {
            $('#section_rotate_button').show();
        }
    }
}
function selectionHovered(objCellCoord) {
    if (!objSelectionSection || strMode !== 'selection_mode') {
        return false;
    }

    if (objSelectionItems.arrCoords.includes(JSON.stringify([objCellCoord.x, objCellCoord.y]))) {
        return true;
    }

    // if (strMode === 'selection_mode' &&
    //     (
    //         objCellCoord.x >= objSelectionSection.x0 &&
    //         objCellCoord.x <= objSelectionSection.x1 &&
    //         objCellCoord.y >= objSelectionSection.y0 &&
    //         objCellCoord.y <= objSelectionSection.y1
    //     )
    // ) {
    //     return true;
    // }
    return false;
}

function getSprite(intItemIndex, arrNeighbours = [0, 0, 0, 0, 0, 0, 0, 0], strDirection = strCurrentDirection, strColor = strCurrentColor) {
    let sprite;
    const strSpriteKey = objKeyItemDict[intItemIndex].at(-1);

    if (objSpriteCategories.soil.includes(intItemIndex)) {
        switch (intItemIndex) {
            case 1: //ground
                sprite = sprites.get(`${strSpriteKey}_${objMistriaDataPlanner.season}`);
                break;
            case 3: //tilled wet
                sprite = sprites.getSoil(`${strSpriteKey}_${objMistriaDataPlanner.season === 'fall' ? 'autumn' : objMistriaDataPlanner.season}`, arrNeighbours)
                break;
            case 2: //tilled
                sprite = sprites.getSoil(`tile_soil_${objMistriaDataPlanner.season === 'fall' ? 'autumn' : objMistriaDataPlanner.season}`, arrNeighbours)
                break;
            case 4: //grass
                sprite = sprites.getGrass(`tile_grassautotile_${objMistriaDataPlanner.season === 'fall' ? 'autumn' : objMistriaDataPlanner.season}`, arrNeighbours)
                break;
        }
    } else if (objSpriteCategories.crops.includes(intItemIndex)) {
        sprite = sprites.getCrop(strSpriteKey);
    } else if (objSpriteCategories.fences.includes(intItemIndex) || objSpriteCategories.counter.includes(intItemIndex)) {
        sprite = sprites.getFence(strSpriteKey, arrNeighbours, objMistriaDataPlanner.season);
    } else {
        sprite = sprites.get(strSpriteKey, { season: objMistriaDataPlanner.season, direction: strDirection, color: strColor });
    }

    return sprite;
}

function getTopLeftCornerItem(objCellCoord, bolForceTwosOnly = false) {
    //snap to grid
    let bolTwosOnly = false;
    let arrSize = [0, 0];
    if (bolForceTwosOnly) {
        bolTwosOnly = true;
    }

    if (strMode === 'drawing_mode') {
        if (!bolForceTwosOnly) {
            bolTwosOnly = (objSpriteCategories.soil.includes(intCurrentlyDrawing) || objSpriteCategories.crops.includes(intCurrentlyDrawing) || objSpriteCategories.on_twos_only.includes(intCurrentlyDrawing)) ? true : false;
        }
        const sprite = getSprite(intCurrentlyDrawing, [0, 0, 0, 0, 0, 0, 0, 0], strCurrentDirection, strCurrentColor);
        arrSize = sprite.meta.size;
    }

    let objCoord = {
        x: objCellCoord.x,
        y: objCellCoord.y,
    };

    if (bolTwosOnly) {
        objCoord = {
            x: objCoord.x - (objCoord.x % 2),
            y: objCoord.y - (objCoord.y % 2)
        };
    }

    // do not allow out of bounds - top, left
    objCoord = {
        x: Math.max(0, objCoord.x),
        y: Math.max(0, objCoord.y),
    };

    // do not allow out of bounds - bottom, right
    if (objCoord.x + arrSize[0] > objGrid.x) {
        objCoord.x = objGrid.x - arrSize[0];
    }
    if (objCoord.y + arrSize[1] > objGrid.y) {
        objCoord.y = objGrid.y - arrSize[1];
    }

    return [objCoord, arrSize];
}

function getSelection(objCellCoord) {

    if (objSelectionSection) {
        return objSelectionSection;
    }

    let objSelectionStep = { x: 1, y: 1 }
    let coordStart = bolIsDragging ? objStartCellCoord : objCellCoord;

    if (strMode === 'drawing_mode') {
        const [coord, arrSize] = getTopLeftCornerItem(bolIsDragging ? objStartCellCoord : objCellCoord);
        coordStart = coord;
        objSelectionStep = {
            x: arrSize[0],
            y: arrSize[1]
        }
    }

    const dirX = (objCellCoord.x >= coordStart.x) ? +1 : -1
    const dirY = (objCellCoord.y >= coordStart.y) ? +1 : -1

    if (strMode === 'drawing_mode' && objSpriteCategories.soil.includes(intCurrentlyDrawing) || objSpriteCategories.crops.includes(intCurrentlyDrawing) || objSpriteCategories.fences.includes(intCurrentlyDrawing)) {
        if (dirX < 0) {
            coordStart.x = coordStart.x + 1;
        }
        if (dirY < 0) {
            coordStart.y = coordStart.y + 1;
        }
    }

    let objSelection = {
        x0: Math.min(coordStart.x, objCellCoord.x),
        y0: Math.min(coordStart.y, objCellCoord.y),
        x1: Math.max(coordStart.x, objCellCoord.x),
        y1: Math.max(coordStart.y, objCellCoord.y),
    }

    const intSelectionWidth = objSelection.x1 - objSelection.x0;
    const intSelectionHeight = objSelection.y1 - objSelection.y0;

    const cols = Math.floor(intSelectionWidth / objSelectionStep.x) + 1;
    const rows = Math.floor(intSelectionHeight / objSelectionStep.y) + 1;

    const intSeletctionWidthItem = cols * objSelectionStep.x;
    const intSeletctionHeightItem = rows * objSelectionStep.y;

    objCellCoord = {
        x: objCellCoord.x + (intSeletctionWidthItem - intSelectionWidth - 1) * dirX,
        y: objCellCoord.y + (intSeletctionHeightItem - intSelectionHeight - 1) * dirY
    }

    objSelection = {
        x0: Math.min(coordStart.x, objCellCoord.x),
        y0: Math.min(coordStart.y, objCellCoord.y),
        x1: Math.max(coordStart.x, objCellCoord.x),
        y1: Math.max(coordStart.y, objCellCoord.y),
    }

    return objSelection;
}

function compareGrids(arr1, arr2) {
    let setDifferences = new Set();

    for (let y = 0; y < arr1.length; y++) {
        for (let x = 0; x < arr1[y].length; x++) {
            const arrDifferences = [
                ...arr1[y][x].filter(v => !arr2[y][x].includes(v)),
                ...arr2[y][x].filter(v => !arr1[y][x].includes(v))
            ];

            if (arrDifferences.length) {
                arrDifferences.forEach(v => setDifferences.add(v));
            }
        }
    }

    return setDifferences;
}

function drawPlanner(objSize = objGrid, objTopCorner = { x: 0, y: 0 }, strGrid = 'main_corner', strContainer = 'ee') {
    const startTime = performance.now()

    if (objContainers[strContainer] === null) {
        //init container
        objContainers[strContainer] = new PIXI.Container();
        objContainer_Wrapper.addChild(objContainers[strContainer]);
        objContainers[strContainer].zIndex = objZindex_Containers[strContainer];
    }

    for (let y = objTopCorner.y; y < objSize.y; y++) {
        for (let x = objTopCorner.x; x < objSize.x; x++) {
            const objCell = objGridCombined[strGrid][y - objTopCorner.y][x - objTopCorner.x];
            Object.keys(objCell).forEach(function (strItemIndex) {
                const intItemIndex = parseInt(strItemIndex);
                const sprite = objCell[intItemIndex].sprite;
                objContainers[strContainer].addChild(sprite);
            });
        }
    }

    const endTime = performance.now()
    // console.log(`drawPlanner - ${endTime - startTime} milliseconds`)

    if (strContainer == 'ee') {
        testValidate();
    }
}

function resetDrawingVariables() {
    bolIsDragging = false;
    bolIsDraggingSection = false;
    objDraggingSectionOffset = { x: 0, y: 0 };
    bolPreventDrawing = false;
    bolPickup = false;

    objStartCellCoord = { x: 0, y: 0 };
    objStartOffset = { x: 0, y: 0 };
    objPrevCellCoord = { x: 0, y: 0 };
}

function updateCurrentlyDrawing(intItemIndex = false, strDirection = false, strColor = false) {
    intCurrentlyDrawing = intItemIndex;
    strCurrentDirection = strDirection;
    strCurrentColor = strColor;
    $(`[data-key]`).removeClass('selected');
    $(`[data-key="${intCurrentlyDrawing}"]${strColor ? '[data-color="' + strColor + '"]' : ''}`).addClass('selected');

    updateCursorMode('drawing_mode');
    generateTempSection();
    toggleAdditionalControls();
}

function updateCursorMode(strModeTemp = false) {
    // let strMode = 'dragging_mode'; // drawing_mode, selection_mode
    strMode = strModeTemp;

    clearTempSection();
    objSelectionSection = false;
    $('#canvas_wrapper').css('cursor', '');
    objSelectionItems = false;
    toggleAdditionalControls();


    $('.tab').removeClass('active');
    $(`.tab[data-tab="${strMode}"]`).addClass('active');
    if (strMode == 'dragging_mode') {
        $('#page').addClass('dragging_mode');
    } else {
        $('#page').removeClass('dragging_mode');

        if (strMode !== 'drawing_mode') {
            intCurrentlyDrawing = false;
            strCurrentDirection = false;
            strCurrentColor = false;
            $(`[data-key]`).removeClass('selected');
        }
    }

    if (strMode == 'selection_mode') {
        // objContainer_Wrapper.interactiveChildren = true;
        generateTempSection();
    } else {
        // objContainer_Wrapper.interactiveChildren = false;
    }

    updateChecklist();
}

function canPlaceBridge(objSelection) {

    const strBrigeGap = '[0,0,2,2,4,4,4,4,4,4,4,4,2,2,0,0]';

    const arrGrid_CollisionSlice = slice2D(arrGrid_Collision, objSelection.x0, objSelection.x1, objSelection.y0, objSelection.y1);
    const intBridgeWidth = arrGrid_CollisionSlice.length;

    if (strBrigeGap === JSON.stringify(arrGrid_CollisionSlice[0]) && strBrigeGap === JSON.stringify(arrGrid_CollisionSlice[intBridgeWidth - 1])) {
        return true;
    }
    return false;
}
function checkTileHasCollision(objSelection, bolUseDiggableGrid = true) {
    // return false;

    if (bolUseDiggableGrid) {
        const arrGrid_DiggableSlice = slice2D(arrGrid_Diggable, objSelection.x0, objSelection.x1, objSelection.y0, objSelection.y1);
        const setGrid_DiggableSliceValues = new Set(arrGrid_DiggableSlice.flat())
        return (!setGrid_DiggableSliceValues.has(0)) ? false : true;
    } else {
        const arrGrid_CollisionSlice = slice2D(arrGrid_Collision, objSelection.x0, objSelection.x1, objSelection.y0, objSelection.y1);
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

    // do not allow out of bounds
    objCell = {
        x: Math.min(objCell.x, objGrid.x - 1),
        y: Math.min(objCell.y, objGrid.y - 1),
        eventX: x,
        eventY: y,
    }

    // console.log(objCell)

    return objCell;
}

function generateTempSection(objSection = false, objCellCoord = false, bolHighlight = false) {
    const intCurrentlyDrawingSoil = objMistriaDataPlanner.options.has('mode_wet') ? objSoilIndex.wetSoil : objSoilIndex.soil;
    const bolGenerateSectionArrays = !objSelectionItems || bolIsDragging;
    let bolDraw = false;
    let objSize = {}
    let objSectionTemp = {};
    if (!objSection) {
        objSize = { x: 1, y: 1 };
    } else {
        objSize = {
            x: objSection.x1 - objSection.x0,
            y: objSection.y1 - objSection.y0
        };
    }
    objGridCombined.cursor_corner = Array.from({ length: objSize.y }, () => Array.from({ length: objSize.x }, () => ({})))

    // console.log(objCellCoord);
    if (strMode === 'drawing_mode') {
        bolDraw = true;
        // console.log(intCurrentlyDrawing, getSprite(intCurrentlyDrawing, [0, 0, 0, 0, 0, 0, 0, 0], strCurrentDirection, strCurrentColor))
        let arrSize = getSprite(intCurrentlyDrawing, [0, 0, 0, 0, 0, 0, 0, 0], strCurrentDirection, strCurrentColor).meta.size;

        if (objSpriteCategories.trees.includes(intCurrentlyDrawing)) {
            arrSize = [arrSize[0] * 3, arrSize[0] * 3];
        }

        for (let y = 0; y < objSize.y; y++) {
            for (let x = 0; x < objSize.x; x++) {
                if (y % arrSize[1] == 0 && x % arrSize[0] == 0) {
                    if (objSpriteCategories.fences.includes(intCurrentlyDrawing) || objSpriteCategories.counter.includes(intCurrentlyDrawing)) {
                        //draw fences and counters as border only 
                        const isEdge =
                            x === 0 ||
                            x === objSize.x - 1 ||
                            y === 0 ||
                            y === objSize.y - 1;
                        if (!isEdge) {
                            continue;
                        }
                    }

                    const sprite = getSprite(intCurrentlyDrawing);
                    sprite.alpha = 0.5;
                    sprite.position.set(x * intGridCellSize, y * intGridCellSize);
                    sprite.zIndex = getZindexbySpriteIndex(intCurrentlyDrawing);
                    objGridCombined.cursor_corner[y][x][intCurrentlyDrawing] = { 'sprite': sprite, 'direction': strCurrentDirection, 'color': strCurrentColor }

                    if (objSpriteCategories.crops.includes(intCurrentlyDrawing)) {
                        const spriteSoil = getSprite(objSoilIndex.soil, [0, 0, 0, 0, 0, 0, 0, 0]);
                        spriteSoil.alpha = 0.5;
                        spriteSoil.position.set(x * intGridCellSize, y * intGridCellSize);
                        spriteSoil.zIndex = getZindexbySpriteIndex(objSoilIndex.soil);

                        objGridCombined.cursor_corner[y][x][objSoilIndex.soil] = { 'sprite': spriteSoil };

                        if (intCurrentlyDrawingSoil === objSoilIndex.wetSoil) {
                            const spriteSoilWet = getSprite(objSoilIndex.wetSoil, [0, 0, 0, 0, 0, 0, 0, 0]);
                            spriteSoilWet.alpha = 0.5;
                            spriteSoilWet.position.set(x * intGridCellSize, y * intGridCellSize);
                            spriteSoilWet.zIndex = getZindexbySpriteIndex(objSoilIndex.wetSoil);

                            objGridCombined.cursor_corner[y][x][objSoilIndex.wetSoil] = { 'sprite': spriteSoilWet };
                        }
                    }

                    if (intCurrentlyDrawing === objSoilIndex.wetSoil) {
                        const spriteSoil = getSprite(objSoilIndex.soil, [0, 0, 0, 0, 0, 0, 0, 0]);
                        spriteSoil.alpha = 0.5;
                        spriteSoil.position.set(x * intGridCellSize, y * intGridCellSize);
                        spriteSoil.zIndex = getZindexbySpriteIndex(objSoilIndex.soil);

                        objGridCombined.cursor_corner[y][x][objSoilIndex.soil] = { 'sprite': spriteSoil };
                    }
                }
            }
        }
    } else if (strMode === 'selection_mode' && objCellCoord) {
        let arrCoordsX = [];
        let arrCoordsY = [];

        const arrGrid_CoveredSlice2D = slice2D(objGridCombined.main_extend, objSection.x0, objSection.x1, objSection.y0, objSection.y1);

        const objAllSeenItems = arrGrid_CoveredSlice2D
            .flat()
            .reduce((acc, obj) => (
                Object.entries(obj).forEach(([k, { coord }]) => {
                    const key = coord.join(','); // "x,y"
                    if (arrDefaultElements.includes(key)) {
                        return;
                    }

                    acc[k] ??= []; //questionable chatgpt stuff

                    if (!acc[k].some(c => c.join(',') === key)) {
                        acc[k].push(coord);
                        arrCoordsX.push(coord[0])
                        arrCoordsY.push(coord[1])
                    }
                }),
                acc
            ), {});

        if (Object.keys(objAllSeenItems).length) {
            bolDraw = true;
            objSectionTemp = {
                x0: Math.min(...arrCoordsX),
                y0: Math.min(...arrCoordsY),
                x1: Math.max(...arrCoordsX),
                y1: Math.max(...arrCoordsY),
            }

            objSize = {
                x: objSectionTemp.x1 - objSectionTemp.x0 + 1,
                y: objSectionTemp.y1 - objSectionTemp.y0 + 1
            };

            objGridCombined.cursor_corner = Array.from({ length: objSize.y }, () => Array.from({ length: objSize.x }, () => ({})))

            if (bolGenerateSectionArrays) {
                objSelectionItems = {
                    'arrCoords': [],
                    'objItemCounts': objAllSeenItems
                };
            }

            Object.keys(objAllSeenItems).forEach(function (strItemIndex) {
                const intItemIndex = parseInt(strItemIndex);
                if (bolGenerateSectionArrays) {
                    // objSelectionItems.objItemCounts[intItemIndex] = 0;
                }
                objAllSeenItems[intItemIndex].forEach(function (arrCoord) {

                    const objTempPosition = {
                        x: arrCoord[0] - objSectionTemp.x0,
                        y: arrCoord[1] - objSectionTemp.y0,
                    }

                    const strDirection = objGridCombined.main_corner[arrCoord[1]][arrCoord[0]][intItemIndex]?.direction;
                    const strColor = objGridCombined.main_corner[arrCoord[1]][arrCoord[0]][intItemIndex]?.color;

                    const sprite = getSprite(intItemIndex, [0, 0, 0, 0, 0, 0, 0, 0], strDirection, strColor);

                    if (bolGenerateSectionArrays) {

                        const arrSize = sprite.meta.size;

                        const objSectionCell = {
                            x0: objTempPosition.x + objSectionTemp.x0,
                            y0: objTempPosition.y + objSectionTemp.y0,
                            x1: objTempPosition.x + objSectionTemp.x0 + arrSize[0],
                            y1: objTempPosition.y + objSectionTemp.y0 + arrSize[1]
                        };
                        for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                            for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                objSelectionItems.arrCoords.push(JSON.stringify([x1, y1]))
                            }
                        }
                        // objSelectionItems.objItemCounts[intItemIndex]++;
                    }
                    const outline = new PIXI.filters.OutlineFilter({
                        thickness: 2,
                        color: 0xffffff,
                        // knockout: true,
                    });

                    const overlay = new PIXI.filters.ColorOverlayFilter({
                        color: 0xffffff,
                        alpha: bolHighlight ? 0.7 : 0.5
                    });

                    if (bolHighlight) {
                        $('#canvas_wrapper').css('cursor', 'pointer');
                    } else {
                        $('#canvas_wrapper').css('cursor', '');
                    }

                    // Apply it to the sprite
                    sprite.filters = [overlay, outline];

                    sprite.position.set(objTempPosition.x * intGridCellSize, objTempPosition.y * intGridCellSize);
                    sprite.zIndex = getZindexbySpriteIndex(intItemIndex);

                    objGridCombined.cursor_corner[objTempPosition.y][objTempPosition.x][intItemIndex] = { 'sprite': sprite, 'direction': strDirection, 'color': strColor };
                });
            });
        }
    }
    if (bolGenerateSectionArrays) {
        updateChecklist()
    }

    if (bolDraw) {
        drawPlanner(objSize, objTopCorner = { x: 0, y: 0 }, strGrid = 'cursor_corner', strContainer = 'cursor');

        if (strMode === 'selection_mode') {
            moveTempSection({ x: objSectionTemp.x0, y: objSectionTemp.y0 });

            // // draw square around drawn selection
            // let objRectangleCoord = objSection;
            // if (objSelectionSection) {
            //     objRectangleCoord = objSelectionSection;
            // }

            // if (
            //     objRectangleCoord.x1 - objRectangleCoord.x0 > 0 ||
            //     objRectangleCoord.y1 - objRectangleCoord.y0 > 0
            // ) {
            //     let elemSelection = new PIXI.Graphics();
            //     elemSelection.rect(0, 0, (objRectangleCoord.x1 - objRectangleCoord.x0 + 1) * intGridCellSize, (objRectangleCoord.y1 - objRectangleCoord.y0 + 1) * intGridCellSize);
            //     elemSelection.stroke({ color: `rgba(255, 174, 0, 0.8)`, width: 2, alignment: 1 });
            //     elemSelection.zIndex = 99;
            //     elemSelection.position.set(
            //         (objRectangleCoord.x0 - objSectionTemp.x0) * intGridCellSize,
            //         (objRectangleCoord.y0 - objSectionTemp.y0) * intGridCellSize
            //     );
            //     objContainers['cursor'].addChild(elemSelection);
            // }
        } else if (objCellCoord !== false) {
            moveTempSection(objCellCoord);
        }
    } else {
        objGridCombined.cursor_corner = false;
        objSelectionSection = false;
        objSelectionItems = false;
        $('#canvas_wrapper').css('cursor', '');
    }
}

function copyChecklist(objElem) {
    strText = arrChecklistItems.join('\n')

    var el = document.createElement('textarea');
    el.value = strText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    $(objElem).addClass('copied').delay(3000).queue(function (next) {
        $(this).removeClass('copied');
    });
}

function updateChecklist() {

    // console.log('update')
    $('.drawn_element_container').hide();
    $('#drawn_elements .copy_button').hide();

    arrChecklistItems = [];
    let objItemsForChecklist = {};
    let $elemChecklistWrapper = null;
    let bolShowCopyButton = true;
    if (strMode === 'selection_mode') {
        $elemChecklistWrapper = $('#drawn_elements_selected');
        if (objSelectionItems) {
            objItemsForChecklist = objSelectionItems.objItemCounts;
        }
        if (!objSelectionSection) {
            bolShowCopyButton = false;
        }

        // console.log(objSelectionSection)
    } else {
        $elemChecklistWrapper = $('#drawn_elements_all')
        objItemsForChecklist = {};

        Object.keys(arrVersions[intCurrentVersion]).forEach(function (strDirection_Color) {
            Object.keys(arrVersions[intCurrentVersion][strDirection_Color]).forEach(function (strItemIndex) {
                const intItemIndex = parseInt(strItemIndex);
                if (!(intItemIndex in objItemsForChecklist)) {
                    objItemsForChecklist[intItemIndex] = []
                }
                arrVersions[intCurrentVersion][strDirection_Color][intItemIndex].forEach((arrCoord) => {
                    const key = arrCoord.join(','); // "x,y"
                    if (arrDefaultElements.includes(key)) {
                        return;
                    }
                    objItemsForChecklist[intItemIndex].push(arrCoord)
                });
                if (!objItemsForChecklist[intItemIndex].length) {
                    delete objItemsForChecklist[intItemIndex];
                }
            });
        });
    }

    $elemChecklistWrapper.css('display', '');
    let $elemChecklistList = $elemChecklistWrapper.find('.drawn_elements_list');
    $elemChecklistList.html('')

    if (Object.keys(objItemsForChecklist).length) {
        Object.keys(objItemsForChecklist).forEach(function (strItemIndex) {
            //filter out elements behind collisions and soil?

            const intItemIndex = parseInt(strItemIndex);
            let strItemKey = objKeyItemDict[intItemIndex][0];

            let strName;
            let strImage;
            let bolImage = false;

            if (objSpriteCategories.building.includes(intItemIndex)) {
                let objColors = {};

                objItemsForChecklist[strItemIndex].forEach(function (arrCoords) {
                    if (bolIsDraggingSection) {
                        const strColor = 'all'
                        if (!(strColor in objColors)) {
                            objColors[strColor] = 0;
                        }
                        objColors[strColor] = objColors[strColor] + 1;
                    } else {
                        const strColor = objGridCombined.main_corner[arrCoords[1]][arrCoords[0]][intItemIndex]?.color
                        if (!(strColor in objColors)) {
                            objColors[strColor] = 0;
                        }
                        objColors[strColor] = objColors[strColor] + 1;
                    }
                });

                Object.keys(objColors).forEach(function (strColor) {
                    strName = `${objNameDict[strItemKey]} (${strColor})`;
                    const strSpriteKey = `${strItemKey}_${strColor}_blueprint`;

                    bolImage = true;
                    strImage = `../images/items/${strSpriteKey}.png`;
                    if (strColor == 'all') {
                        bolImage = false;
                    }

                    $elemChecklistList.append(`
                        <div class="drawn_elements_item">
                            ${bolImage ? '<div class="icon"><img src="' + strImage + '"></div>' : ''}
                            <span class="drawn_elements_name">${strName}:</span>
                            <div class="drawn_elements_count">${objColors[strColor]}</div>
                        </div>`);
                    arrChecklistItems.push(`${strName}: ${objColors[strColor]}`)
                });
            } else {

                strName = objNameDict[strItemKey];
                if (strItemKey in objItemsPlanner) {

                    if (typeof objItemsPlanner[strItemKey].img !== 'undefined') {
                        bolImage = true;
                        strImage = `../images/${objItemsPlanner[strItemKey].img}.png`;
                    }
                } else if (strItemKey in objItems) {
                    bolImage = true;
                    strImage = `../images/items/${strItemKey}.png`;
                } else {
                    // console.log(1, strItemKey);
                    return;
                }

                $elemChecklistList.append(`
                <div class="drawn_elements_item">
                    ${bolImage ? '<div class="icon"><img src="' + strImage + '"></div>' : ''}
                    <span class="drawn_elements_name">${strName}:</span>
                    <div class="drawn_elements_count">${objItemsForChecklist[intItemIndex].length}</div>
                </div>`);
                arrChecklistItems.push(`${strName}: ${objItemsForChecklist[intItemIndex].length}`)
            }
        });
    } else {
        $elemChecklistList.append(`
            <div class="drawn_elements_item">
               <span class="drawn_elements_name">none</span>
            </div>`);
        bolShowCopyButton = false;
    }

    if (bolShowCopyButton) {
        $('#drawn_elements .copy_button').css('display', '');
    }
}
function getSectionLocation(objCellCoord) {

    let arrSeenItems = [...new Set(objGridCombined.cursor_corner.flat().flat().flatMap(obj => Object.keys(obj)).map(strIndex => parseInt(strIndex)))]
    const arrSeenCrops = getCommonElements(arrSeenItems, objSpriteCategories.crops);
    const arrSeenGround = getCommonElements(arrSeenItems, objSpriteCategories.soil);
    const arrSeenTwos = getCommonElements(arrSeenItems, objSpriteCategories.on_twos_only);
    let arrTwos = [...arrSeenGround, ...arrSeenCrops, ...arrSeenTwos];
    const bolForceTwosOnly = (arrTwos.length) ? true : false;
    let [objPosition, arrSize] = getTopLeftCornerItem(bolIsDragging ? objStartCellCoord : objCellCoord, bolForceTwosOnly);

    if (bolIsDragging) {

        const objSize = {
            x: objGridCombined.cursor_corner[0].length,
            y: objGridCombined.cursor_corner.length
        }
        if (objStartCellCoord.x > objCellCoord.x) {
            objPosition.x = objPosition.x - objSize.x;

        }

        if (objStartCellCoord.y > objCellCoord.y) {
            objPosition.y = objPosition.y - objSize.y;
        }

        if (bolForceTwosOnly) {
            objPosition = {
                x: objPosition.x - (objPosition.x % 2),
                y: objPosition.y - (objPosition.y % 2)
            };
        }
    }

    return [objPosition, arrSize];
}
function testValidate() {
    if (objContainers['ee'] !== null) {
        const intSpritesDrawn = objContainers['ee'].children.length;
        const intSpritesGrid = objGridCombined.main_corner.flat().flat().flatMap(obj => Object.keys(obj)).length;
        console.log('all sprites accessable', intSpritesDrawn == intSpritesGrid ? true : false)
    }
}
function placeTempSection(objCellCoord, bolClearTemp = true) {
    const [objPosition, arrSize] = getSectionLocation(objCellCoord);

    const objSize = {
        x: objGridCombined.cursor_corner[0].length,
        y: objGridCombined.cursor_corner.length
    }

    let bolHasChanged = false;

    for (let y = 0; y < objSize.y; y++) {
        for (let x = 0; x < objSize.x; x++) {

            const objRealPosition = {
                x: objPosition.x + x,
                y: objPosition.y + y,
            }

            const objCell = objGridCombined.cursor_corner[y][x];

            Object.keys(objCell).forEach(function (strItemIndex) {
                const intItemIndex = parseInt(strItemIndex);
                const objSectionCell = {
                    x0: objRealPosition.x,
                    y0: objRealPosition.y,
                    x1: objRealPosition.x + arrSize[0],
                    y1: objRealPosition.y + arrSize[1]
                };

                if (!('coll' in objCell[intItemIndex])) {

                    const strDirection = objCell[intItemIndex]?.direction;
                    const strColor = objCell[intItemIndex]?.color;

                    bolHasChanged = true;

                    const sprite = getSprite(intItemIndex, [0, 0, 0, 0, 0, 0, 0, 0], strDirection, strColor);

                    // sprite.eventMode = 'static';
                    // sprite.on('pointerover', () => {
                    //     highlightSection({ x0: objRealPosition.x1, x1: objRealPosition.x, y0: objRealPosition.y1, y1: objRealPosition.y })
                    // });
                    // sprite.on('pointerleave', () => {
                    //     highlightSection({ x0: objRealPosition.x1, x1: objRealPosition.x, y0: objRealPosition.y1, y1: objRealPosition.y }, true)
                    // });

                    const arrSize = sprite.meta.size;
                    sprite.position.set(objRealPosition.x * intGridCellSize, objRealPosition.y * intGridCellSize);
                    sprite.zIndex = getZindexbySpriteIndex(intItemIndex);

                    //if placing soil, destroy other soil types
                    if (objSpriteCategories.soil.includes(intItemIndex)) {

                        const objSectionCellTemp = { x0: objRealPosition.x, y0: objRealPosition.y, x1: objRealPosition.x + arrSize[0], y1: objRealPosition.y + arrSize[1] };

                        let arrRemoveTiles = [];

                        //if placing soil, remove grass and ext
                        if ([objSoilIndex.soil, objSoilIndex.wetSoil].includes(intItemIndex)) {
                            arrRemoveTiles = [objSoilIndex.grass, objSoilIndex.exterior];

                            //if placing soil, remove wet soil
                            if (intItemIndex == objSoilIndex.soil) {
                                arrRemoveTiles.push(objSoilIndex.wetSoil);
                            }
                        }

                        //if placing grass, remove soil and ext
                        if (intItemIndex == objSoilIndex.grass) {
                            arrRemoveTiles = [objSoilIndex.exterior, objSoilIndex.soil, objSoilIndex.wetSoil];
                        }

                        //if placing ext, remove soil and grass
                        if (intItemIndex == objSoilIndex.exterior) {
                            arrRemoveTiles = [objSoilIndex.grass, objSoilIndex.soil, objSoilIndex.wetSoil];
                        }

                        clearSection(objSectionCellTemp, arrRemoveTiles)
                    }

                    //remove previous sprite if exists
                    if (intItemIndex in objGridCombined.main_corner[objRealPosition.y][objRealPosition.x] && 'sprite' in objGridCombined.main_corner[objRealPosition.y][objRealPosition.x][intItemIndex]) {
                        const spritePrev = objGridCombined.main_corner[objRealPosition.y][objRealPosition.x][intItemIndex].sprite;
                        if (spritePrev.parent !== null) {
                            spritePrev.parent.removeChild(spritePrev);
                        }
                    }

                    if (intItemIndex === objSoilIndex.grass) {
                        return;
                    }

                    objGridCombined.main_corner[objRealPosition.y][objRealPosition.x][intItemIndex] = { 'sprite': sprite, 'direction': strDirection, 'color': strColor };

                    if (objSpriteCategories.trees.includes(intItemIndex)) {
                        const intTreeSize = arrSize[0] * 3;
                        const objSectionCell = {
                            x0: objRealPosition.x - arrSize[0],
                            y0: objRealPosition.y - arrSize[0],
                            x1: objRealPosition.x - arrSize[0] + intTreeSize,
                            y1: objRealPosition.y - arrSize[0] + intTreeSize,
                        }

                        const edge = objSectionCell.x1 - objSectionCell.x0;
                        const k = arrSize[0];

                        for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                            for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                const localX = x1 - objSectionCell.x0;
                                const localY = y1 - objSectionCell.y0;

                                const inCorner =
                                    (localY < k && localX < k) ||
                                    (localY < k && localX >= edge - k) ||
                                    (localY >= edge - k && localX < k) ||
                                    (localY >= edge - k && localX >= edge - k);

                                if (inCorner) {
                                    continue;
                                }

                                objGridCombined.main_extend[y1][x1][intItemIndex] = { 'coord': [objRealPosition.x, objRealPosition.y] };
                            }
                        }
                    } else {
                        for (var y1 = objSectionCell.y0; y1 < objSectionCell.y0 + arrSize[1]; y1++) {
                            for (var x1 = objSectionCell.x0; x1 < objSectionCell.x0 + arrSize[0]; x1++) {
                                objGridCombined.main_extend[y1][x1][intItemIndex] = { 'coord': [objRealPosition.x, objRealPosition.y] };
                            }
                        }
                    }
                }
            });
        }
    }

    if (bolHasChanged) {
        const objSection = {
            x0: objPosition.x,
            y0: objPosition.y,
            x1: objPosition.x + objSize.x,
            y1: objPosition.y + objSize.y,
        }
        recalculateNeigborSprites(objSection);
        drawPlanner();
        saveDataPlanner(true);
        updateChecklist();
    }

    if (bolClearTemp) {
        clearTempSection();
    }

    if (strMode === 'drawing_mode') {
        generateTempSection();
    }
}
function clearTempSection() {
    objGridCombined.cursor_corner = false;

    //destroy previously drawn elements
    if (objContainers['cursor'] !== null) {
        objContainer_Wrapper.removeChild(objContainers['cursor']);
        objContainers['cursor'].destroy();
        objContainers['cursor'] = null
    }
}

function moveTempSection(objCellCoord) {
    if (objGridCombined.cursor_corner === false) {
        return;
    }
    if (strMode === 'drawing_mode' || bolIsDraggingSection) {
        const [objPosition, arrSize] = getSectionLocation(objCellCoord);
        objContainers['cursor'].position.set(objPosition.x * intGridCellSize, objPosition.y * intGridCellSize);
        updateTempCollisions(objPosition);
    } else {
        objContainers['cursor'].position.set(objCellCoord.x * intGridCellSize, objCellCoord.y * intGridCellSize);
    }
}

function getMaxZindexInCell(arrItems) {
    if (!arrItems.length) {
        return 0;
    }
    const lookup = {};

    for (const z in objZindex_Items) {
        for (const el of objZindex_Items[z]) {
            lookup[el] = Number(z);
        }
    }

    return Math.max(...arrItems.map(el => lookup[el] ?? 99));
}

function updateTempCollisions(objPosition = false) {
    const objSize = {
        x: objGridCombined.cursor_corner[0].length,
        y: objGridCombined.cursor_corner.length
    }
    let bolHasChanged = false;

    for (let y = 0; y < objSize.y; y++) {
        for (let x = 0; x < objSize.x; x++) {

            const objRealPosition = {
                x: objPosition.x + x,
                y: objPosition.y + y,
            }

            const objCell = objGridCombined.cursor_corner[y][x];

            let intMaxZindexTemp = getMaxZindexInCell(Object.keys(objCell));

            Object.keys(objCell).forEach(function (strItemIndex) {
                const intItemIndex = parseInt(strItemIndex);
                const strDirection = objGridCombined.cursor_corner[y][x][intItemIndex]?.direction
                const strColor = objGridCombined.cursor_corner[y][x][intItemIndex]?.color
                let sprite = objCell[intItemIndex].sprite;
                const arrSize = sprite.meta.size;

                let objItemArea = {
                    x0: objRealPosition.x,
                    y0: objRealPosition.y,
                    x1: objRealPosition.x + arrSize[0] - 1,
                    y1: objRealPosition.y + arrSize[1] - 1
                }
                if (objSpriteCategories.trees.includes(intItemIndex)) {
                    const intTreeSize = arrSize[0] * 3;
                    objItemArea = {
                        x0: objRealPosition.x - arrSize[0],
                        x1: objRealPosition.x - arrSize[0] + intTreeSize - 1,
                        y0: objRealPosition.y - arrSize[0],
                        y1: objRealPosition.y - arrSize[0] + intTreeSize - 1,
                    }
                }

                let bolHitsElement = false;
                if (objSpriteCategories.bridge.includes(intItemIndex)) {

                    if (!canPlaceBridge(objItemArea)) {
                        //bridge can not be placed
                        bolHitsElement = true;
                    }

                } else if (checkTileHasCollision(objItemArea)) {
                    //hits predefined untouchable cells
                    bolHitsElement = true;

                } else if (objRealPosition.x + arrSize[0] > objGrid.x || objRealPosition.y + arrSize[1] > objGrid.y) {
                    //goes out of bounds
                    bolHitsElement = true;
                } else {
                    const arrGrid_CoveredSlice2D = slice2D(objGridCombined.main_extend, objItemArea.x0, objItemArea.x1, objItemArea.y0, objItemArea.y1);
                    let setGrid_CoveredSliceValues = new Set(arrGrid_CoveredSlice2D.flat().flat().flatMap(obj => Object.keys(obj)).map(strIndex => parseInt(strIndex)))
                    let arrGrid_Crops = [...setGrid_CoveredSliceValues].filter((intItemIndex) => (objSpriteCategories.crops.includes(intItemIndex)));

                    let intMaxZindex = getMaxZindexInCell([...setGrid_CoveredSliceValues]);

                    //soil can be under anything, but if there are crops, it must be tilled soil
                    if (objSpriteCategories.soil.includes(intItemIndex)) {
                        if ([objSoilIndex.exterior, objSoilIndex.grass].includes(intItemIndex) && arrGrid_Crops.length) {
                            bolHitsElement = true;
                        }
                    } else if (arrGrid_Crops.length) {
                        //nothing can be placed on crops
                        bolHitsElement = true;
                    } else if (intMaxZindexTemp <= intMaxZindex) {
                        bolHitsElement = true;
                    }
                }

                if (bolHitsElement && !('coll' in objCell[intItemIndex]) ||
                    !bolHitsElement && ('coll' in objCell[intItemIndex])) {
                    bolHasChanged = true;

                    if (bolHitsElement) {
                        const overlay = new PIXI.filters.ColorOverlayFilter({
                            color: 0xff0000,
                            alpha: 1
                        });
                        // Apply it to the sprite
                        sprite.filters = [overlay];
                    } else {
                        sprite.filters = [];
                    }

                    objGridCombined.cursor_corner[y][x][intItemIndex] = { 'sprite': sprite, 'direction': strDirection, 'color': strColor };
                    if (bolHitsElement) {
                        objGridCombined.cursor_corner[y][x][intItemIndex].coll = true;
                    }
                }
            });
        }
    }

    if (bolHasChanged) {
        drawPlanner(objSize, objTopCorner = { x: 0, y: 0 }, strGrid = 'cursor_corner', strContainer = 'cursor');
    }
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
}

function createTipDirection(intItemIndex) {

    let strTipHTML = $(`
        <div id="tip_drawable_${intItemIndex}" class="tip_wrap">
            <div class="tip">
                <div class="direction_icons">
                    ${objSpriteCategories.east.includes(intItemIndex) ? `<div class="direction_icon dropdown-item-drawable" data-key="${intItemIndex}" data-direction="east"></div>` : ''}
                    ${objSpriteCategories.north.includes(intItemIndex) ? `<div class="direction_icon dropdown-item-drawable" data-key="${intItemIndex}" data-direction="north"></div>` : ''}
                    ${objSpriteCategories.west.includes(intItemIndex) ? `<div class="direction_icon dropdown-item-drawable" data-key="${intItemIndex}" data-direction="west"></div>` : ''}
                    ${objSpriteCategories.south.includes(intItemIndex) ? `<div class="direction_icon dropdown-item-drawable" data-key="${intItemIndex}" data-direction="south"></div>` : ''}
                </div>
            </div>
        </div>`);

    let $objTip = $(strTipHTML);

    return $objTip.prop('outerHTML');
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

    $('#cancel_search').on('click', function (e) {
        $('#search_items').val('');
        $('#search_items').trigger('keyup');
    });

    $('.search_items').on('keyup', function () {
        //remove value fron any other inputs
        $('#page').removeHighlight();
        $('.hide_search').removeClass('hide_search');
        $('#page .dropdown').removeClass('searching');
        $('#page #search_items_wrapper').removeClass('searching');

        const value = $(this).val().toLowerCase();

        if (value !== '') {
            $(this).parent().parent().find('.dropdown').addClass('searching');
            $(this).closest('#search_items_wrapper').addClass('searching');
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


    var arrModes = ['mode_dark', 'mode_stars', 'mode_collapse'];
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


    arrModes = ['mode_grid', 'mode_collision', 'mode_soil', 'mode_wet', 'mode_offseason', 'mode_treefruit', 'mode_byset']
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
            if (strMode === 'mode_offseason' || strMode === 'mode_treefruit') {
                changeSeasonInGrids(true);
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

    const objTabs = await (await fetch('json/tabs_planner.json?v=2')).json();
    objItemsPlanner = await (await fetch('json/items_planner.json')).json();

    var setTips = new Set();
    var setTipsHtml = new Set();
    let $divDropdownSearch = $('<div>', { 'class': 'dropdown' });
    Object.entries(objTabs).forEach(([tabKey, tabData]) => {

        let $divDropdownSearchSection = $('<div>', { 'class': 'dropdown-section' });
        $divDropdownSearchSection.attr('data-tab-dropdown', tabKey)
        let $divDropdownSearchSectionHeader = $('<div>', { 'class': 'dropdown-item dropdown-section-item' });
        $divDropdownSearchSectionHeader.append(` 
                <div class="icon"><img src="../images/${tabData.info.icon}"></div>
                <span class="dropdown-section-name">${tabData.info.name}</span>
            `);
        $divDropdownSearchSection.append($divDropdownSearchSectionHeader);
        let $divDropdownSearchSectionItems = $('<div>', { 'class': 'dropdown-section-items' });

        let $divDropdownWrapper = $('<div>', { 'class': 'dropdown_wrap', 'id': `tab_dropdown_${tabKey}` });
        $divDropdownWrapper.attr('data-tab-dropdown', tabKey)

        $divDropdownWrapper.append(` 
            <div class="tab button_item dropdown_button">
                <div class="icon">
                    <img src="../images/${tabData.info.icon}">
                </div>
               <span class="dropdown-section-name">${tabData.info.name}</span>
            </div>
        `);
        let $divDropdown = $('<div>', { 'class': 'dropdown' });
        const intCategoriesCount = Object.keys(tabData.categories).length;

        Object.entries(tabData.categories).forEach(([categoryKey, categoryData]) => {

            let $divDropdownSection = $('<div>', { 'class': 'dropdown-section' });
            let $divDropdownSectionHeader = $('<div>', { 'class': 'dropdown-item dropdown-section-item' });

            if (typeof categoryData.info.img !== 'undefined') {
                $divDropdownSectionHeader.append(`<div class="icon"><img src="../images/${categoryData.info.img_item_section_path}${categoryData.info.img}.png"></div>`);
            } else {
                $divDropdownSectionHeader.addClass('no_icon');
            }
            $divDropdownSectionHeader.append(`<span class="dropdown-section-name">${categoryData.info.name}</span>`);
            $divDropdownSection.append($divDropdownSectionHeader);

            let $divDropdownSectionItems = $('<div>', { 'class': 'dropdown-section-items' });

            categoryData.items.forEach(function (intIndex) {

                if (intIndex == 'divider') {
                    $divDropdownSectionItems.append(`<div class="divider"></div>`);
                    $divDropdownSection.append($divDropdownSectionItems);
                    return;
                }
                let strName;
                let strImage;
                let bolImage = false;
                let strItemKey = objKeyItemDict[intIndex][0];

                if (strItemKey in objItemsPlanner && 'colors' in objItemsPlanner[strItemKey]) {
                    objItemsPlanner[strItemKey].colors.forEach(function (strColor) {
                        strName = `${objItemsPlanner[strItemKey].name} (${strColor})`;
                        objNameDict[strItemKey] = objItemsPlanner[strItemKey].name;
                        const strSpriteKey = `${strItemKey}_${strColor}_blueprint`;

                        bolImage = true;
                        strImage = `../images/items/${strSpriteKey}.png`;

                        $divDropdownSectionItems.append(` 
                        <div class="dropdown-item dropdown-item-drawable" data-key="${intIndex}" data-color="${strColor}">
                            ${bolImage ? '<div class="icon"><img src="' + strImage + '"></div>' : ''}
                            <span class="dropdown-section-name">${strName}</span>
                        </div>
                    `);

                        setTips.add(intIndex);
                        setTipsHtml.add(createTipDirection(intIndex));

                        if (intCategoriesCount != 1) {
                            $divDropdownSection.append($divDropdownSectionItems);
                        } else {
                            $divDropdown.append($divDropdownSectionItems.children());
                        }
                    });
                } else {
                    if (strItemKey in objItemsPlanner) {
                        strName = objItemsPlanner[strItemKey].name;
                        objNameDict[strItemKey] = strName;
                        if (typeof objItemsPlanner[strItemKey].img !== 'undefined') {
                            bolImage = true;
                            strImage = `../images/${objItemsPlanner[strItemKey].img}.png`;
                        }
                    } else if (strItemKey in objItems) {
                        bolImage = true;
                        strName = objItems[strItemKey].name;
                        objNameDict[strItemKey] = strName;
                        strImage = `../images/${categoryData.info.img_item_path}${strItemKey}.png`;
                    } else {
                        // console.log(strItemKey);
                        return;
                    }
                    $divDropdownSectionItems.append(` 
                        <div class="dropdown-item dropdown-item-drawable" data-key="${intIndex}">
                            ${bolImage ? '<div class="icon"><img src="' + strImage + '"></div>' : ''}
                            <span class="dropdown-section-name">${strName}</span>
                        </div>
                    `);

                    setTips.add(intIndex);
                    setTipsHtml.add(createTipDirection(intIndex));

                    if (intCategoriesCount != 1) {
                        $divDropdownSection.append($divDropdownSectionItems);
                    } else {
                        $divDropdown.append($divDropdownSectionItems.children());
                    }
                }
            });

            if (intCategoriesCount != 1) {
                $divDropdownSearchSectionItems.append($divDropdownSection.clone());
                $divDropdown.append($divDropdownSection);
            } else {
                $divDropdownSearchSectionItems.append($divDropdown.clone().children());
            }
        });

        $divDropdownSearchSection.append($divDropdownSearchSectionItems);
        $divDropdownSearch.append($divDropdownSearchSection);

        $divDropdownWrapper.append($divDropdown);
        $('#tabs').append($divDropdownWrapper);
    });

    $('#search_items_wrapper').append($divDropdownSearch);

    setTipsHtml.forEach((strTipHtml) => {
        $('#planner').append(strTipHtml);
    });

    setTips.forEach((intItemIndex) => {
        if ($(`#tip_drawable_${intItemIndex}`).find('.direction_icon').length < 2) {
            return;
        }

        const template = $(`#tip_drawable_${intItemIndex}`)[0];

        tippy(`.dropdown-item[data-key="${intItemIndex}"]`, {
            content() {
                const clone = template.cloneNode(true);
                clone.style.display = 'block';
                return clone;
            },
            appendTo: () => document.body,
            interactive: true,
            maxWidth: 370,
            delay: [500, 50],
        });
    });

    $('body').on('click', '.dropdown-item-drawable', function (e) {
        const intItemIndexSelected = parseInt($(this).attr('data-key'));
        const strDirection = $(this).attr('data-direction');
        const strColor = $(this).attr('data-color');

        updateCurrentlyDrawing(intItemIndexSelected, strDirection, strColor);
    });

    // $('.dropdown-item-drawable').on('click', function (e) {
    //     const intItemIndexSelected = parseInt($(this).attr('data-key'));
    //     updateCurrentlyDrawing(intItemIndexSelected);
    // });

    //hide dropdowns on outside click
    $(document).on('click', function (e) {
        let jqTarget = e.target;
        if (($(e.target).closest('.dropdown-section-name').length || $(e.target).closest('.dropdown_button').length || $(e.target).closest('.icon').length)) {
            if ($(e.target).closest('.dropdown-section-item').length) {
                jqTarget = $(jqTarget).closest('.dropdown-section-item')
            } else if ($(e.target).closest('.dropdown_button').length) {
                jqTarget = $(jqTarget).closest('.dropdown_button')
            }
        }


        var jqDropdownWrap = $(jqTarget).closest('.dropdown_wrap');
        if ($(jqTarget).hasClass('dropdown-section-item')) {
            jqDropdownWrap = $(jqTarget).closest('.dropdown-section');
        }

        // close all other dropdowns
        $('.dropdown_wrap').not($(jqTarget).closest('.dropdown_wrap')).removeClass('open');

        // close all other subsections
        if ($(window).width() > 550) {
            const objParents = $('.dropdown-section').parents('.dropdown-section')
            $('.dropdown-section').not(jqDropdownWrap).not(objParents).removeClass('open');
        }

        // toggle current dropdown
        $(jqDropdownWrap).toggleClass('open');

        // close dropdown if item was selected
        if (!$(jqTarget).hasClass('dropdown-section-item') && !$(jqTarget).hasClass('dropdown_button') && !$(jqTarget).is('input')) {
            $(jqTarget).closest('.dropdown_wrap').removeClass('open');
        }
    });

    tippy('#wet_soil', {
        content: 'When placing crops on the map, automatically place wet soil underneath them',
    });
    tippy('#offseason', {
        content: 'Show healthy plant instead of a wilted one, even if that plant does not grow in chosen season',
    });
    tippy('#fruittrees', {
        content: 'Show trees with fruit. If off-season toggle is off, fruit appears only during the correct season',
    });
    tippy('#byset', {
        content: 'Show furniture items categorized by sets (Basic set, Bathroom Set...) instead of categories (Beds, Tables...)',
    });
    tippy('[data-tab="dragging_mode"]', {
        content: `<p style="text-align: center; font-size: 14px;" class="save_file">Drag map</p>
                  <p style="text-align: center;" class="save_file">drag with <code class="shortcut">wheel</code> in all modes</p>`,
        allowHTML: true,
    });
    tippy('[mode="dragging_mode"]', {
        content: 'Drag map',
    });
    tippy('[mode="selection_mode"]', {
        content: 'Select item or area',
    });
    tippy('[mode="drawing_mode"]', {
        content: 'Drawing mode',
    });
    tippy('#undo', {
        content: `<p style="text-align: center; font-size: 14px;" class="save_file">Undo, up to ${intAllowedVersions} changes</p>
                  <p style="display:flex; gap:5px; flex-wrap:wrap; align-items:center; justify-content: center;" class="save_file">Shortcut: <code class="shortcut">CTRL + Z</code></p>`,
        allowHTML: true,
    });
    tippy('#redo', {
        content: `<p style="text-align: center; font-size: 14px;" class="save_file">Redo, up to ${intAllowedVersions} changes</p>
                  <p style="display:flex; gap:5px; flex-wrap:wrap; align-items:center; justify-content: center;" class="save_file">Shortcut: <code class="shortcut">CTRL + Y</code>,<code class="shortcut">CTRL + SHIFT + Z</code></p>`,
        allowHTML: true,
    });
    tippy('#delete', {
        content: `<p style="text-align: center; font-size: 14px;" class="save_file">Clear map</p>
                  <p style="display:flex; gap:5px; flex-wrap:wrap; align-items:center; justify-content: center;" class="save_file">Shortcut: <code class="shortcut">del</code></p>`,
        allowHTML: true,
    });
    tippy('#save_image', {
        content: 'Save as image',
    });
    tippy('#upload_file', {
        content: 'Upload save file',
    });
    tippy('#section_copy_button', {
        content: `<p style="text-align: center; font-size: 14px;" class="save_file">Copy section</p>
                  <p style="display:flex; gap:5px; flex-wrap:wrap; align-items:center; justify-content: center;" class="save_file">Shortcut: <code class="shortcut">CTRL + C</code></p>`,
        allowHTML: true,
    });
    tippy('#section_cut_button', {
        content: `<p style="text-align: center; font-size: 14px;" class="save_file">Cut section</p>
                  <p style="display:flex; gap:5px; flex-wrap:wrap; align-items:center; justify-content: center;" class="save_file">Shortcut: <code class="shortcut">CTRL + X</code></p>`,
        allowHTML: true,
    });
    tippy('#section_delete_button', {
        content: `<p style="text-align: center; font-size: 14px;" class="save_file">Delete section</p>
                  <p style="display:flex; gap:5px; flex-wrap:wrap; align-items:center; justify-content: center;" class="save_file">Shortcut: <code class="shortcut">del</code></p>`,
        allowHTML: true,
    });
    tippy('#section_deselect_button', {
        content: `<p style="text-align: center; font-size: 14px;" class="save_file">Deselect</p>
                  <p style="display:flex; gap:5px; flex-wrap:wrap; align-items:center; justify-content: center;" class="save_file">Shortcut: <code class="shortcut">esc</code>, <code class="shortcut">right click</code></p>`,
        allowHTML: true,
    });
    tippy('#section_rotate_button', {
        content: `<p style="text-align: center; font-size: 14px;" class="save_file">Rotate</p>
                  <p style="display:flex; gap:5px; flex-wrap:wrap; align-items:center; justify-content: center;" class="save_file">Shortcut: <code class="shortcut">R</code></p>`,
        allowHTML: true,
    });
    tippy('#save_file_icon', {
        content: `<p class="save_file">Your save file is processed only in your browser and is never uploaded or sent anywhere else.</p>
                  <p class="save_file">Tested and should work on v.0.15.0 save files</p>`,
        allowHTML: true,
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
    drawGrassFix();
    changeSeasonInGrids();
}

function resetZoom(strZoomDirection) {
    const objCanvasSize = {
        w: $('#canvas_wrapper').width(),
        h: $('#canvas_wrapper').height()
    }

    const intMultiplierFit = getMultiplierFitScreen();
    const intMultiplierCover = getMultiplierCoverScreen();

    let intZoomPercent = (intMultiplierCover * 100 / intMultiplierFit).toFixed();

    if (strZoomDirection === 'vertical') {
        if (objCanvasSize.w > objCanvasSize.h) {
            intZoomPercent = 100;
        }
    } else if (strZoomDirection === 'horizontal') {
        if (objCanvasSize.w < objCanvasSize.h) {
            intZoomPercent = 100;
        }
    } else {
        intZoomPercent = 100;
    }

    $('#zoomSlider').val(intZoomPercent);

    objMistriaDataPlanner.multiplier = (intZoomPercent * getMultiplierFitScreen()) / 100;

    resize();
}

function verifyZoomParameters() {
    intMultiplierCanvas = objMistriaDataPlanner.multiplier;

    if (intMultiplierCanvas > getMultiplierFitScreen()) {
        const intOffsetX = objMistriaDataPlanner.offsetCanvas.x * -1
        const intViewportWidth = $('#canvas_wrapper').width() / intMultiplierCanvas;
        if (intOffsetX + intViewportWidth > objCanvasDefault.width) {
            objMistriaDataPlanner.offsetCanvas.x = (objCanvasDefault.width - intViewportWidth) * -1
        }
        if (objMistriaDataPlanner.offsetCanvas.x > 0) {
            objMistriaDataPlanner.offsetCanvas.x = 0;
        }

        const intOffsetY = objMistriaDataPlanner.offsetCanvas.y * -1
        const intViewportHeight = $('#canvas_wrapper').height() / intMultiplierCanvas;
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
        w: $('#canvas_wrapper').width(),
        h: $('#canvas_wrapper').height()
    }

    const intZoomPercent = (objMistriaDataPlanner.multiplier * 100) / getMultiplierFitScreen();
    let objSelectionSize = fitSize(objMinimapWrapperSize, objCanvasSize);
    let objMinimapSize = fitSize({ w: objSelectionSize.w, h: objSelectionSize.h }, objMinimapWrapperSize);
    let intMapScale = intZoomPercent / 100;

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
        left: objMistriaDataPlanner.offsetCanvas.x * -(objMinimapSize.w * intMapScale) / (objGrid.x * intGridCellSize),
        top: objMistriaDataPlanner.offsetCanvas.y * -(objMinimapSize.h * intMapScale) / (objGrid.y * intGridCellSize)
    })

    $('#zoom_precent').html(parseInt(intZoomPercent) + '%')


}

function getTopLeftCornerCanvas(objCellCoord) {
    const objCanvasSize = {
        w: $('#canvas_wrapper').width(),
        h: $('#canvas_wrapper').height()
    }
    const objCanvasCellCount = {
        x: objCanvasSize.w / intMultiplierCanvas / intGridCellSize,
        y: objCanvasSize.h / intMultiplierCanvas / intGridCellSize
    }

    return { x: objCellCoord.x - objCanvasCellCount.x / 2, y: objCellCoord.y - objCanvasCellCount.y / 2 }
}

function minimapInit() {
    let bolDraggingMinimap = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    const intZoomPercent = (objMistriaDataPlanner.multiplier * 100) / getMultiplierFitScreen();

    $('#zoomSlider').val(intZoomPercent);
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

        let objTopLeftCellCoord = getTopLeftCornerCanvas(objClickedCellCoord)

        objMistriaDataPlanner.offsetCanvas = {
            x: objTopLeftCellCoord.x * intGridCellSize * -1,
            y: objTopLeftCellCoord.y * intGridCellSize * -1,
        };
        resize();
    })
    $('#zoomSlider').on('input', function () {
        const intZoomPercent = parseInt($(this).val());
        objMistriaDataPlanner.multiplier = (intZoomPercent * getMultiplierFitScreen()) / 100;
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

function prepareGridsForSaving() {
    objMistriaDataPlanner.layout[intSaveSlot].farm = {}
    for (let y = 0; y < objGridCombined.main_corner.length; y++) {
        for (let x = 0; x < objGridCombined.main_corner[0].length; x++) {

            const objCurrentItems = objGridCombined.main_corner[y][x] || {};

            Object.keys(objCurrentItems).forEach(function (strItemIndex) {

                const intItemIndex = parseInt(strItemIndex);

                if (intItemIndex === objSoilIndex.grass) {
                    return;
                }

                let strDirection = objGridCombined.main_corner[y][x][intItemIndex]?.direction;
                let strColor = objGridCombined.main_corner[y][x][intItemIndex]?.color;

                if (typeof strDirection === 'undefined' || !strDirection) {
                    strDirection = 'none';
                }
                if (typeof strColor === 'undefined' || !strColor) {
                    strColor = 'none';
                }

                let strDirection_Color = 'none';

                if (strColor !== 'none' && strDirection !== 'none') {
                    strDirection_Color = strDirection + '_' + strColor;
                } else if (strColor !== 'none') {
                    strDirection_Color = strColor;
                } else if (strDirection !== 'none') {
                    strDirection_Color = strDirection;
                }

                if (!(strDirection_Color in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                    objMistriaDataPlanner.layout[intSaveSlot].farm[strDirection_Color] = {}
                }

                if (!(intItemIndex in objMistriaDataPlanner.layout[intSaveSlot].farm[strDirection_Color])) {
                    objMistriaDataPlanner.layout[intSaveSlot].farm[strDirection_Color][intItemIndex] = []
                }
                objMistriaDataPlanner.layout[intSaveSlot].farm[strDirection_Color][intItemIndex].push([x, y])
            });
        }
    }
}
function clearSection(objSection = { x0: 0, y0: 0, x1: objGrid.x, y1: objGrid.y }, arrItems = false) {
    let arrRemoveItems = arrItems;

    for (var y = objSection.y0; y < objSection.y1; y++) {
        for (var x = objSection.x0; x < objSection.x1; x++) {

            if (!arrItems) {
                const objCurrentItems = objGridCombined.main_corner[y][x] || {};
                arrRemoveItems = Object.keys(objCurrentItems).map(strIndex => parseInt(strIndex));
            }

            arrRemoveItems.forEach(function (strItemIndexTemp) {
                const intItemIndexTemp = parseInt(strItemIndexTemp);

                if (typeof objGridCombined.main_corner[y][x][intItemIndexTemp] === 'undefined') {
                    return;
                }
                if (intItemIndexTemp in objGridCombined.main_corner[y][x] && 'sprite' in objGridCombined.main_corner[y][x][intItemIndexTemp]) {
                    const spriteTemp = objGridCombined.main_corner[y][x][intItemIndexTemp].sprite;
                    if (spriteTemp.parent !== null) {
                        spriteTemp.parent.removeChild(spriteTemp);
                    }
                }

                const strColor = objGridCombined.main_corner[y][x][intItemIndexTemp]?.color;
                const strDirection = objGridCombined.main_corner[y][x][intItemIndexTemp]?.direction;

                delete objGridCombined.main_corner[y][x][intItemIndexTemp];

                const sprite = getSprite(intItemIndexTemp, [0, 0, 0, 0, 0, 0, 0, 0], strDirection, strColor);
                const arrSize = sprite.meta.size;
                const objSectionCell = {
                    x0: x,
                    y0: y,
                    x1: x + arrSize[0],
                    y1: y + arrSize[1]
                };

                if (objSpriteCategories.trees.includes(parseInt(intItemIndexTemp))) {
                    const intTreeSize = arrSize[0] * 3;
                    const objSectionCell = {
                        x0: x - arrSize[0],
                        x1: x - arrSize[0] + intTreeSize,
                        y0: y - arrSize[0],
                        y1: y - arrSize[0] + intTreeSize,
                    }

                    const edge = objSectionCell.x1 - objSectionCell.x0;
                    const k = arrSize[0];

                    for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                        for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                            const localX = x1 - objSectionCell.x0;
                            const localY = y1 - objSectionCell.y0;

                            const inCorner =
                                (localY < k && localX < k) ||
                                (localY < k && localX >= edge - k) ||
                                (localY >= edge - k && localX < k) ||
                                (localY >= edge - k && localX >= edge - k);

                            if (inCorner) {
                                continue;
                            }

                            if (typeof objGridCombined.main_extend[y1][x1][intItemIndexTemp] !== 'undefined') {
                                const arrCoord = objGridCombined.main_extend[y1][x1][intItemIndexTemp].coord;
                                if (arrCoord[0] == x && arrCoord[1] == y) {
                                    delete objGridCombined.main_extend[y1][x1][intItemIndexTemp];
                                }
                            }
                        }
                    }
                } else {
                    for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                        for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                            if (typeof objGridCombined.main_extend[y1][x1][intItemIndexTemp] !== 'undefined') {
                                const arrCoord = objGridCombined.main_extend[y1][x1][intItemIndexTemp].coord;
                                if (arrCoord[0] == x && arrCoord[1] == y) {
                                    delete objGridCombined.main_extend[y1][x1][intItemIndexTemp];
                                }
                            }
                        }
                    }
                }

            })
        }
    }
}
function changeSeasonInGrids(bolOnlyPlants = false) {
    for (let y = 0; y < objGridCombined.main_corner.length; y++) {
        for (let x = 0; x < objGridCombined.main_corner[0].length; x++) {
            const objCurrentItems = objGridCombined.main_corner[y][x] || {};
            const arrCellItems = Object.keys(objCurrentItems).map(strIndex => parseInt(strIndex));

            if (arrCellItems.length) {
                arrCellItems.forEach(function (intItemIndex) {

                    if (bolOnlyPlants && !(objSpriteCategories.crops.includes(intItemIndex) || objSpriteCategories.trees.includes(intItemIndex))) {
                        //skip if not crop or tree
                        return;
                    } else if (!bolOnlyPlants && objSpriteCategories.crops.includes(intItemIndex) && objMistriaDataPlanner.options.has('mode_offseason')) {
                        //skip if crop, but off seasonal ones are allowed
                        return;
                    }

                    const arrNeigbors = ('neigbors' in objGridCombined.main_corner[y][x][intItemIndex] ? objGridCombined.main_corner[y][x][intItemIndex].neigbors : [0, 0, 0, 0, 0, 0, 0, 0])
                    const strDirection = objGridCombined.main_corner[y][x][intItemIndex]?.direction;
                    const strColor = objGridCombined.main_corner[y][x][intItemIndex]?.color;

                    let sprite = objGridCombined.main_corner[y][x][intItemIndex].sprite;
                    objContainers['ee'].removeChild(sprite);

                    sprite = getSprite(intItemIndex, arrNeigbors, strDirection, strColor);
                    sprite.eventMode = 'static';

                    // sprite.on('pointerover', () => {
                    //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                    // });
                    // sprite.on('pointerleave', () => {
                    //     highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                    // });

                    sprite.position.set(x * intGridCellSize, y * intGridCellSize);
                    sprite.zIndex = getZindexbySpriteIndex(intItemIndex);
                    objGridCombined.main_corner[y][x][intItemIndex].sprite = sprite;
                    objContainers['ee'].addChild(sprite);
                });
            }
        }
    }
}
function populateItemGrids() {
    const matchColor = (colors, strDirection_Color) =>
        colors.find(color =>
            (strDirection_Color.includes(`_${color}`) || strDirection_Color == color)
        );

    const objFarmLayout = objMistriaDataPlanner.layout[intSaveSlot].farm;
    let setItems = new Set();
    let objNeighbors = {};
    objGridCombined.main_corner = Array.from({ length: objGrid.y }, () =>
        Array.from({ length: objGrid.x }, () => ({}))
    );
    objGridCombined.main_extend = Array.from({ length: objGrid.y }, () =>
        Array.from({ length: objGrid.x }, () => ({}))
    );

    Object.keys(objFarmLayout).forEach(function (strDirection_Color) {
        Object.keys(objFarmLayout[strDirection_Color]).forEach(function (strItemIndex) {
            const intItemIndex = parseInt(strItemIndex);
            const strColor = matchColor(buildingColors, strDirection_Color);
            let strDirection = '';

            if (typeof strColor === 'undefined') {
                strDirection = strDirection_Color;
            } else if (strDirection_Color.includes('_')) {
                strDirection = strDirection_Color.split('_')[0];
            } else {
                strDirection = 'none';
            }

            setItems.add(intItemIndex)
            const sprite = getSprite(intItemIndex, [0, 0, 0, 0, 0, 0, 0, 0], strDirection, strColor);
            const arrSize = sprite.meta.size;

            objFarmLayout[strDirection_Color][intItemIndex].forEach((arrCoord) => {
                const x = arrCoord[0];
                const y = arrCoord[1];

                objGridCombined.main_corner[y][x][intItemIndex] = {};
                if (strDirection !== 'none') {
                    objGridCombined.main_corner[y][x][intItemIndex].direction = strDirection;
                }

                if (typeof strColor !== 'undefined') {
                    objGridCombined.main_corner[y][x][intItemIndex].color = strColor;
                }

                if (objSpriteCategories.trees.includes(intItemIndex)) {
                    const intTreeSize = arrSize[0] * 3;
                    const objSection = {
                        x0: x - arrSize[0],
                        x1: x - arrSize[0] + intTreeSize,
                        y0: y - arrSize[0],
                        y1: y - arrSize[0] + intTreeSize,
                    }

                    const edge = objSection.x1 - objSection.x0;
                    const k = arrSize[0];

                    for (var y1 = objSection.y0; y1 < objSection.y1; y1++) {
                        for (var x1 = objSection.x0; x1 < objSection.x1; x1++) {
                            const localX = x1 - objSection.x0;
                            const localY = y1 - objSection.y0;

                            const inCorner =
                                (localY < k && localX < k) ||
                                (localY < k && localX >= edge - k) ||
                                (localY >= edge - k && localX < k) ||
                                (localY >= edge - k && localX >= edge - k);

                            if (inCorner) {
                                continue;
                            }

                            objGridCombined.main_extend[y1][x1][intItemIndex] = { 'coord': [x, y] };
                        }
                    }
                } else {
                    const objSection = {
                        x0: x,
                        x1: x + arrSize[0],
                        y0: y,
                        y1: y + arrSize[1],
                    }
                    for (var y1 = objSection.y0; y1 < objSection.y1; y1++) {
                        for (var x1 = objSection.x0; x1 < objSection.x1; x1++) {
                            objGridCombined.main_extend[y1][x1][intItemIndex] = { 'coord': [x, y] };
                        }
                    }
                }
            });
        });
    });


    const arrItems = [...setItems];

    const arrSeenFences = getCommonElements(arrItems, objSpriteCategories.fences)
    const arrSeenGround = getCommonElements(arrItems, objSpriteCategories.soil)
    const arrSeenCounters = getCommonElements(arrItems, objSpriteCategories.counter)

    const arrNeighborItems = [...arrSeenGround, ...arrSeenFences, ...arrSeenCounters];
    arrNeighborItems.push(objSoilIndex.grass);

    arrNeighborItems.forEach((intIdx) => {
        objNeighbors[intIdx] = convertGridToNeighbours(intIdx);
    });

    for (let y = 0; y < objGridCombined.main_corner.length; y++) {
        for (let x = 0; x < objGridCombined.main_corner[0].length; x++) {

            const objCurrentItems = objGridCombined.main_corner[y][x] || {};
            const arrCellItems = Object.keys(objCurrentItems).map(strIndex => parseInt(strIndex));

            if (arrCellItems.length) {
                arrCellItems.forEach(function (intItemIndex) {
                    // const intItemIndex = parseInt(strItemIndex);
                    const arrNeigbors = (intItemIndex in objNeighbors ? objNeighbors[intItemIndex][y][x] : [0, 0, 0, 0, 0, 0, 0, 0])
                    const strDirection = objGridCombined.main_corner[y][x][intItemIndex]?.direction;
                    const strColor = objGridCombined.main_corner[y][x][intItemIndex]?.color;

                    const sprite = getSprite(intItemIndex, arrNeigbors, strDirection, strColor);
                    sprite.eventMode = 'static';
                    // sprite.on('pointerover', () => {
                    //     highlightSection({ x0: x, x1: x, y0: y, y1: y })
                    // });
                    // sprite.on('pointerleave', () => {
                    //     highlightSection({ x0: x, x1: x, y0: y, y1: y }, true)
                    // });

                    sprite.position.set(x * intGridCellSize, y * intGridCellSize);
                    sprite.zIndex = getZindexbySpriteIndex(intItemIndex);
                    objGridCombined.main_corner[y][x][intItemIndex].sprite = sprite;
                    objGridCombined.main_corner[y][x][intItemIndex].neigbors = arrNeigbors;
                });
            }

            //add grass item
            if (!hasCommonElement(arrCellItems, [objItemKeyDict['tile_main_exteriors'][0], objItemKeyDict['tile_soil'][0], objItemKeyDict['tile_soil_wet'][0]]) && objNeighbors[objSoilIndex.grass][y][x].includes(1)) {
                const arrNeigbors = objNeighbors[objSoilIndex.grass][y][x];
                const sprite = getSprite(objSoilIndex.grass, arrNeigbors);
                sprite.eventMode = 'static';
                // sprite.on('pointerover', () => {
                //     highlightSection({ x0: x, x1: x, y0: y, y1: y })
                // });
                // sprite.on('pointerleave', () => {
                //     highlightSection({ x0: x, x1: x, y0: y, y1: y }, true)
                // });

                sprite.position.set(x * intGridCellSize, y * intGridCellSize);
                sprite.zIndex = getZindexbySpriteIndex(objSoilIndex.grass);
                objGridCombined.main_corner[y][x][objSoilIndex.grass] = { 'sprite': sprite, 'neigbors': arrNeigbors };
            }
        }
    }
}

function loadDataPlanner() {
    objMistriaDataPlanner = JSON.parse(localStorage.getItem('mistria_data_planner'));

    if (objMistriaDataPlanner === null) {
        objMistriaDataPlanner = objMistriaDataPlannerDefault;
        objMistriaDataPlanner.multiplier = getMultiplierFitScreen();
    }

    arrVersions = [objMistriaDataPlanner.layout[intSaveSlot].farm]
    intCurrentVersion = 0;

    objMistriaDataPlanner.multiplier = parseFloat(objMistriaDataPlanner.multiplier);
    intMultiplierCanvas = objMistriaDataPlanner.multiplier;

    // convert arrays to sets for to remove duplicates 
    objMistriaDataPlanner.options = ('options' in objMistriaDataPlanner ? new Set(objMistriaDataPlanner.options) : new Set(objMistriaDataPlannerDefault.options));

    //override script.js
    $('#settings_json').val(JSON.stringify(objMistriaDataPlanner, undefined, 4));
}

function versionControl(strAction = false) {

    if ($(`#${strAction}`).hasClass('disabled')) {
        return;
    }
    if (strAction === 'undo') {
        if (intCurrentVersion) {
            intCurrentVersion = intCurrentVersion - 1;
        }
    }

    if (strAction === 'redo') {
        if (intCurrentVersion < arrVersions.length - 1) {
            intCurrentVersion = intCurrentVersion + 1;
        }
    }

    clearTempSection();
    objSelectionSection = false;
    $('#canvas_wrapper').css('cursor', '');
    objSelectionItems = false;
    toggleAdditionalControls();

    saveDataPlanner(true, true);
    populateItemGrids();

    // destroy previously drawn elements
    if (objContainers['ee'] !== null) {
        objContainer_Wrapper.removeChild(objContainers['ee']);
        objContainers['ee'].destroy();
        objContainers['ee'] = null
    }

    drawPlanner();
    updateChecklist();
}

function saveDataPlanner(bolUpdateGrids = false, bolVersionChange = false) {

    // convert to array since JSON.stringify does not work on sets
    objMistriaDataPlanner.options = [...objMistriaDataPlanner.options];

    if (bolUpdateGrids) {
        if (!bolVersionChange) {
            prepareGridsForSaving();

            //if current version is not latest, split array
            if (intCurrentVersion < arrVersions.length - 1) {
                arrVersions = arrVersions.slice(0, intCurrentVersion + 1);
            }

            arrVersions.push(JSON.parse(JSON.stringify(objMistriaDataPlanner.layout[intSaveSlot].farm)));
            if (arrVersions.length > intAllowedVersions) {
                arrVersions.shift();
            }

            intCurrentVersion = arrVersions.length - 1;

        } else {
            objMistriaDataPlanner.layout[intSaveSlot].farm = arrVersions[intCurrentVersion];
        }

        $('#undo').addClass('disabled');
        $('#redo').addClass('disabled');

        if (intCurrentVersion) {
            $('#undo').removeClass('disabled');
        }

        if (intCurrentVersion < arrVersions.length - 1) {
            $('#redo').removeClass('disabled');
        }

        $('#delete').removeClass('disabled');
    }

    localStorage.setItem('mistria_data_planner', JSON.stringify(objMistriaDataPlanner));

    $('#settings_json').val(JSON.stringify(objMistriaDataPlanner, undefined, 4));

    objMistriaDataPlanner.options = ('options' in objMistriaDataPlanner ? new Set(objMistriaDataPlanner.options) : new Set(objMistriaDataPlannerDefault.options));
}

function clearMap() {
    if ($(`#delete`).hasClass('disabled')) {
        return;
    }

    clearTempSection();
    objSelectionSection = false;
    $('#canvas_wrapper').css('cursor', '');
    objSelectionItems = false;
    toggleAdditionalControls();

    objMistriaDataPlanner.layout[intSaveSlot].farm = objMistriaDataPlannerDefault.layout[intSaveSlot].farm;
    delete objMistriaDataPlanner.layout[intSaveSlot].farm['none']['1'];
    populateItemGrids();

    saveDataPlanner(true);

    // destroy previously drawn elements
    if (objContainers['ee'] !== null) {
        objContainer_Wrapper.removeChild(objContainers['ee']);
        objContainers['ee'].destroy();
        objContainers['ee'] = null
    }

    drawPlanner();
    updateChecklist();

    $('#delete').addClass('disabled');
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
    //make map stay the same size
    const intMultiplierFit = getMultiplierFitScreen();
    const intMultiplierZoomMax = (intMaxSize / intMultiplierFit) * 100;
    const intCurrentMultiplier = intMultiplierCanvas
    const intNewMultiplier = objMistriaDataPlanner.multiplier;

    let intZoomPercent = (intCurrentMultiplier * 100) / getMultiplierFitScreen();

    if (intCurrentMultiplier !== intNewMultiplier) {
        intZoomPercent = (intCurrentMultiplier * 100) / getMultiplierFitScreen();
        intZoomPercent = Math.round(intZoomPercent)
        if (intZoomPercent < 50) {
            intZoomPercent = 50;
        }
        if (intZoomPercent > intMultiplierZoomMax) {
            intZoomPercent = Math.round(intMultiplierZoomMax);
        }

        objMistriaDataPlanner.multiplier = (intZoomPercent * getMultiplierFitScreen()) / 100;
    }
    $('#zoomSlider').val(intZoomPercent);
    $('#zoomSlider').attr('max', Math.round(intMultiplierZoomMax));

    resize();
    objPIXIapp.resize();
}
const handleResizeThrottled = throttle(handleResize, 250);
const resizeObserver = new ResizeObserver((entries) => {
    handleResizeThrottled();
});

function preventAction() {
    resetDrawingVariables();
    bolPreventDrawing = true;
    objSelectionSection = false;
    $('#canvas_wrapper').css('cursor', '');
    objSelectionItems = false;
    toggleAdditionalControls();

    console.log('bolPreventDrawing')
    if (objGridCombined.cursor_corner !== false) {
        clearTempSection();

        if (strMode === 'drawing_mode') {
            generateTempSection();
        } else {
            objGridCombined.cursor_corner = [];
            clearTempSection();
            // generateTempSection();
        }
    }

}

function saveImage() {
    const canvas = objPIXIapp.renderer.extract.canvas(objPIXIapp.stage);

    canvas.toBlob((blob) => {
        if (!blob) {
            console.error("Blob creation failed");
            return;
        }

        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'canvas.png';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    });
}

function sectionActions(strAction) {
    switch (strAction) {
        case "copy":
        case "cut":
            bolIsDraggingSection = true;
            if (selectionHovered(lastMousePosition)) {
                objDraggingSectionOffset = calculateOffsetSection(lastMousePosition);
            }

            let objSelection = getSelection(lastMousePosition);
            clearTempSection();
            generateTempSection(objSelection, lastMousePosition, false);
            moveTempSection({
                x: lastMousePosition.x + objDraggingSectionOffset.x,
                y: lastMousePosition.y + objDraggingSectionOffset.y
            });

            if (strAction === 'cut') {
                const arrCoords = [...new Set(objSelectionItems.arrCoords)];
                arrCoords.forEach((strCoord) => {
                    arrCoord = strCoord.replace(/[\[\]\s]/g, "").split(",").map(Number);
                    clearSection({
                        x0: arrCoord[0],
                        x1: arrCoord[0] + 1,
                        y0: arrCoord[1],
                        y1: arrCoord[1] + 1

                    }, Object.keys(objSelectionItems.objItemCounts));
                });

                recalculateNeigborSprites();
                drawPlanner();

                saveDataPlanner(true);
                updateChecklist();
            }
            break;
        case "delete":
            const arrCoords = [...new Set(objSelectionItems.arrCoords)];
            arrCoords.forEach((strCoord) => {
                arrCoord = strCoord.replace(/[\[\]\s]/g, "").split(",").map(Number);
                clearSection({
                    x0: arrCoord[0],
                    x1: arrCoord[0] + 1,
                    y0: arrCoord[1],
                    y1: arrCoord[1] + 1

                }, Object.keys(objSelectionItems.objItemCounts));
            });

            recalculateNeigborSprites();
            drawPlanner();

            clearTempSection();
            objSelectionSection = false;
            $('#canvas_wrapper').css('cursor', '');
            objSelectionItems = false;
            toggleAdditionalControls();

            saveDataPlanner(true);
            updateChecklist();

            break;
        case "deselect":
            updateCursorMode('selection_mode');
            toggleAdditionalControls();
            break;
        case "rotate":
            const directions = ['east', 'north', 'west', 'south'];
            const arrAvailableDirections = [];
            directions.forEach((strDirection) => {
                if (objSpriteCategories[strDirection].includes(intCurrentlyDrawing)) {
                    arrAvailableDirections.push(strDirection);
                }
            });

            const intAvailableDirectionsCount = arrAvailableDirections.length;

            if (intAvailableDirectionsCount > 1) {
                const intCurrentIndex = arrAvailableDirections.indexOf(strCurrentDirection);
                let intNextDirectionIndex = intCurrentIndex + 1;

                if (intNextDirectionIndex === intAvailableDirectionsCount) {
                    intNextDirectionIndex = 0;
                }

                updateCurrentlyDrawing(intCurrentlyDrawing, arrAvailableDirections[intNextDirectionIndex], strCurrentColor);
                moveTempSection(lastMousePosition);
            }

            break;
    }
}

$(function () {

    (async () => {
        objKeyItemDict = await (await fetch('../json/dict.json')).json();
        objItemKeyDict = await (await fetch('../json/dict_reverse.json')).json();

        objSoilIndex = {
            'grass': objItemKeyDict['tile_grassautotile'][0],
            'soil': objItemKeyDict['tile_soil'][0],
            'wetSoil': objItemKeyDict['tile_soil_wet'][0],
            'exterior': objItemKeyDict['tile_main_exteriors'][0],
        }

        const intBorderFenceIndex = objItemKeyDict['border_fence'][0];
        const intStarterFenceIndex = objItemKeyDict['starter_wood_fence'][0];
        const objDefaultItems = objMistriaDataPlannerDefault.layout[0].farm.none;
        arrDefaultElements = objDefaultItems[intBorderFenceIndex].concat(objDefaultItems[intStarterFenceIndex]).map(arrCoord => arrCoord.join(","));

        objSpriteCategories = await (await fetch('../json/categories.json')).json();
        objZindex_Items = await (await fetch('../json/zindexes.json')).json();

        arrGrid_Collision = await (await fetch('../json/collision.json')).json();
        arrCollisionUpgradeGrid = await (await fetch('../json/collision_houseupgrade.json')).json();
        arrGrid_Diggable = await (await fetch('../json/diggable.json')).json();

        objPlannerDiv = document.getElementById('canvas_wrapper');

        await loadDataPlanner();
        await loadMenuItems();

        // return;

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

        populateItemGrids();
        minimapInit();

        $(document).keyup(function (e) {
            if (e.key === "Escape") {
                sectionActions('deselect');
            } if ((e.key === 'r' || e.key === 'R')) {
                sectionActions('rotate');
            } else if (e.key == "Delete" && strMode == "selection_mode" && objSelectionSection) {
                sectionActions('delete');
            } else if ((e.ctrlKey || e.metaKey)) {
                if (e.shiftKey && (e.key === 'z' || e.key === 'Z')) {
                    versionControl('redo');
                } else if (e.key === 'y') {
                    versionControl('redo');
                } else if ((e.key === 'z' || e.key === 'Z')) {
                    versionControl('undo');
                } else if ((e.key === 'c' || e.key === 'C')) {
                    sectionActions('copy');
                } else if ((e.key === 'x' || e.key === 'X')) {
                    sectionActions('cut');
                } else if (e.key === 'v') {
                    if (strMode == "selection_mode" && objSelectionSection && bolIsDraggingSection) {
                        placeTempSection({
                            x: lastMousePosition.x + objDraggingSectionOffset.x,
                            y: lastMousePosition.y + objDraggingSectionOffset.y
                        }, false);
                    }
                }
            }
        });

        document.addEventListener('mousedown', (e) => {
            if (e.button === 2 && (e.buttons & 1) && (bolIsDragging || bolIsDraggingSection) && (strMode === 'drawing_mode' || strMode === 'selection_mode')) {
                preventAction();
            }
        });

        // clicking and dragging
        objPIXIapp.stage.on('pointerdown', (e) => {
            if ($('#tabs .dropdown_wrap.open').length) {
                return;
            }
            objStartCellCoord = getClickedCell(e);
            objStartOffset = { x: objMistriaDataPlanner.offsetCanvas.x, y: objMistriaDataPlanner.offsetCanvas.y };
            objPrevCellCoord = objStartCellCoord

            if (strMode == "selection_mode" && e.data.originalEvent.button === 0) {
                if (bolIsDraggingSection) {

                    placeTempSection({
                        x: objStartCellCoord.x + objDraggingSectionOffset.x,
                        y: objStartCellCoord.y + objDraggingSectionOffset.y
                    })

                    resetDrawingVariables();
                    objSelectionSection = false;
                    $('#canvas_wrapper').css('cursor', '');
                    objSelectionItems = false;
                } else if (selectionHovered(objStartCellCoord) || (typeof objSelectionItems.objItemCounts !== 'undefined' && !objSelectionSection)) {
                    //if already has a selection and is hovered or is hovered but has not been selected
                    if (!selectionHovered(objStartCellCoord)) {
                        //clear out previous selection
                        clearTempSection();
                        objSelectionSection = false;
                        $('#canvas_wrapper').css('cursor', '');
                        objSelectionItems = false;
                        let objSelection = getSelection(objStartCellCoord);

                        generateTempSection(objSelection, objStartCellCoord);

                        objSelectionSection = getSelection(objStartCellCoord);
                        updateChecklist();
                    }

                    bolIsDraggingSection = true;
                    objDraggingSectionOffset = calculateOffsetSection(objStartCellCoord);

                    clearTempSection();
                    let objSelection = getSelection(objStartCellCoord);
                    generateTempSection(objSelection, objStartCellCoord, false);

                    const arrCoords = [...new Set(objSelectionItems.arrCoords)];
                    arrCoords.forEach((strCoord) => {
                        arrCoord = strCoord.replace(/[\[\]\s]/g, "").split(",").map(Number);
                        // console.log(arrCoord)
                        clearSection({
                            x0: arrCoord[0],
                            x1: arrCoord[0] + 1,
                            y0: arrCoord[1],
                            y1: arrCoord[1] + 1

                        }, Object.keys(objSelectionItems.objItemCounts));
                    });

                    recalculateNeigborSprites();
                    drawPlanner();

                    saveDataPlanner(true);
                    updateChecklist();
                } else {
                    if (objSelectionSection) {
                        //clear out previous selection
                        clearTempSection();
                        objSelectionSection = false;
                        $('#canvas_wrapper').css('cursor', '');
                        objSelectionItems = false;
                        let objSelection = getSelection(objStartCellCoord);
                        generateTempSection(objSelection, objStartCellCoord);
                    }

                    bolIsDragging = true;
                }
            } else if (e.data.originalEvent.button === 0 || e.data.originalEvent.button === 1) {  // left click or middle
                bolIsDragging = true;
                if (e.data.originalEvent.button === 1) { //if was dragged with middle click
                    $('#canvas_wrapper').css('cursor', 'move');

                    bolPreventDrawing = true;
                    if (strMode == "selection_mode") {
                        bolPickup = true;
                    }
                }
            } else {
                if (e.data.originalEvent.button === 2 && strMode == "drawing_mode") {
                    updateCursorMode('selection_mode');
                }
                preventAction();
                bolPreventDrawing = true;
            }
            toggleAdditionalControls();
        });

        objPIXIapp.stage.on('pointermove', (e) => {
            const objCurrentCellCoord = getClickedCell(e);
            lastMousePosition = objCurrentCellCoord;

            const buttons = e.data.originalEvent.buttons;
            if (buttons === 4 || strMode === 'dragging_mode') { // dragging with middle button or dragging mode activated
                if (objPrevCellCoord.x === objCurrentCellCoord.x && objPrevCellCoord.y === objCurrentCellCoord.y) {
                    return;
                }
                dragMap(objCurrentCellCoord);
                bolPickup = false;
            } else {
                if (objPrevCellCoord.x === objCurrentCellCoord.x && objPrevCellCoord.y === objCurrentCellCoord.y) {
                    return;
                }

                if (!bolPreventDrawing) {
                    let objSelection = getSelection(objCurrentCellCoord);

                    if (strMode == "drawing_mode" && bolIsDragging) {
                        clearTempSection();
                        generateTempSection(objSelection, objCurrentCellCoord);
                    } else if (strMode == "selection_mode") {

                        if (objSelectionSection) {
                            if (bolIsDraggingSection) {
                                moveTempSection({
                                    x: objCurrentCellCoord.x + objDraggingSectionOffset.x,
                                    y: objCurrentCellCoord.y + objDraggingSectionOffset.y
                                });
                            } else if (selectionHovered(objCurrentCellCoord) !== selectionHovered(objPrevCellCoord)) {
                                clearTempSection();
                                generateTempSection(objSelection, objCurrentCellCoord, selectionHovered(objCurrentCellCoord));
                            }
                        } else {
                            clearTempSection();
                            objSelectionSection = false;
                            $('#canvas_wrapper').css('cursor', '');
                            objSelectionItems = false;
                            generateTempSection(objSelection, objCurrentCellCoord);
                        }
                    } else {
                        moveTempSection(objCurrentCellCoord);
                    }
                }
                objPrevCellCoord = objCurrentCellCoord;
            }
        });

        objPIXIapp.stage.on('pointerup', (e) => {
            const objCurrentCellCoord = getClickedCell(e);

            if (strMode === 'dragging_mode') {
                //click on map to jump around

                const rect = objPIXIapp.canvas.getBoundingClientRect();

                let scaleX = objPIXIapp.screen.width / rect.width;
                let scaleY = objPIXIapp.screen.height / rect.height;

                const objMovement = {
                    x: (Math.max(objStartCellCoord.eventX, objCurrentCellCoord.eventX) - Math.min(objStartCellCoord.eventX, objCurrentCellCoord.eventX)) / scaleX * intMultiplierCanvas,
                    y: (Math.max(objStartCellCoord.eventY, objCurrentCellCoord.eventY) - Math.min(objStartCellCoord.eventY, objCurrentCellCoord.eventY)) / scaleY * intMultiplierCanvas,
                }

                // clicked with left click and was not dragged more than 5px
                if (e.data.originalEvent.button === 0 && (objMovement.x < 5 && objMovement.y < 5)) {
                    let objTopLeftCellCoord = getTopLeftCornerCanvas(objStartCellCoord)

                    objMistriaDataPlanner.offsetCanvas = {
                        x: objTopLeftCellCoord.x * intGridCellSize * -1,
                        y: objTopLeftCellCoord.y * intGridCellSize * -1,
                    };
                    resize();
                }
                resetDrawingVariables();
            } else {
                if (bolPickup) {
                    let objSelection = getSelection(objCurrentCellCoord);
                    const arrGrid_CoveredSlice2D = slice2D(objGridCombined.main_extend, objSelection.x0, objSelection.x1, objSelection.y0, objSelection.y1);

                    const objAllSeenItems = arrGrid_CoveredSlice2D
                        .flat()
                        .reduce((acc, obj) => (
                            Object.entries(obj).forEach(([k, { coord }]) => {
                                const key = coord.join(','); // "x,y"
                                if (arrDefaultElements.includes(key)) {
                                    return;
                                }

                                acc[k] ??= []; //questionable chatgpt stuff

                                if (!acc[k].some(c => c.join(',') === key)) {
                                    acc[k].push(coord);
                                }
                            }),
                            acc
                        ), {});

                    const arrAllSeenItems = Object.keys(objAllSeenItems).map(Number);
                    // const arrAllSeenItems = arrGrid_CoveredSlice2D
                    //     .flat()
                    //     .flatMap(obj => Object.keys(obj).map(Number));

                    const { id: highestId } = arrAllSeenItems.reduce((highestFound, itemId) => {
                        const checkZ = getZindexbySpriteIndex(itemId);
                        if (checkZ > highestFound.zIndex) { return { id: itemId, zIndex: checkZ } }
                        return highestFound;
                    }, { id: 0, zIndex: 0 });

                    if (highestId) {
                        // only one element of each type should be here
                        const arrCoord = objAllSeenItems[highestId][0];
                        const strDirection = objGridCombined.main_corner[arrCoord[1]][arrCoord[0]][highestId]?.direction;
                        const strColor = objGridCombined.main_corner[arrCoord[1]][arrCoord[0]][highestId]?.color;

                        resetDrawingVariables();
                        updateCurrentlyDrawing(highestId, strDirection, strColor);
                    }
                    $('#canvas_wrapper').css('cursor', '');
                } else if (!bolPreventDrawing && objGridCombined.cursor_corner !== false) {
                    if (strMode === 'drawing_mode') {
                        placeTempSection(objCurrentCellCoord);
                        resetDrawingVariables();
                        objSelectionSection = false;
                        $('#canvas_wrapper').css('cursor', '');
                        objSelectionItems = false;

                    } else if (strMode === 'selection_mode') {

                        if (bolIsDraggingSection) {
                            if (objStartCellCoord.x === objCurrentCellCoord.x && objStartCellCoord.y === objCurrentCellCoord.y) {
                                return;
                            }
                            placeTempSection({
                                x: objCurrentCellCoord.x + objDraggingSectionOffset.x,
                                y: objCurrentCellCoord.y + objDraggingSectionOffset.y
                            })
                            resetDrawingVariables();
                            objSelectionSection = false;
                            $('#canvas_wrapper').css('cursor', '');
                            objSelectionItems = false;
                        } else {
                            objSelectionSection = getSelection(objCurrentCellCoord);
                            updateChecklist();
                            $('#canvas_wrapper').css('cursor', '');

                            //go in hovered state
                            clearTempSection();
                            generateTempSection(objSelectionSection, objCurrentCellCoord, selectionHovered(objCurrentCellCoord));
                        }

                        bolIsDragging = false;
                    }
                } else {
                    $('#canvas_wrapper').css('cursor', '');
                    resetDrawingVariables();
                }
            }
            toggleAdditionalControls();
        });

        objPIXIapp.stage.on('pointerupoutside', (e) => {
            resetDrawingVariables();
            $('#canvas_wrapper').css('cursor', '');
            toggleAdditionalControls();
        });

        objPIXIapp.stage.on('wheel', (e) => {
            const intMultiplierFit = getMultiplierFitScreen();
            const intMultiplierZoomMax = (intMaxSize / intMultiplierFit) * 100;

            let intZoomPercent = objMistriaDataPlanner.multiplier * 100 / intMultiplierFit;

            intZoomPercent = intZoomPercent + e.deltaY * -0.5;
            intZoomPercent = Math.round(intZoomPercent);

            if (intZoomPercent < 50) {
                intZoomPercent = 50;
            }

            if (intZoomPercent > intMultiplierZoomMax) {
                intZoomPercent = Math.round(intMultiplierZoomMax);
            }

            objMistriaDataPlanner.multiplier = (intZoomPercent * getMultiplierFitScreen()) / 100;
            $('#zoomSlider').val(intZoomPercent);

            // center against cursor location
            // const objCurrentCellCoord = getClickedCell(e);
            // let objTopLeftCellCoord = getTopLeftCornerCanvas(objCurrentCellCoord)

            // objMistriaDataPlanner.offsetCanvas = {
            //     x: objTopLeftCellCoord.x * intGridCellSize * -1,
            //     y: objTopLeftCellCoord.y * intGridCellSize * -1,
            // };
            resize();
        });

        addBackground();
        drawGrassFix();

        drawGrid();
        drawCollision();

        // addTestData(4);
        // updateCurrentlyDrawing(416);
        // updateCursorMode('selection_mode');

        drawPlanner();
        updateChecklist();

        resizeObserver.observe(document.getElementById('canvas_wrapper'));

        $('#canvas_wrapper').removeClass('loading');

        setTimeout(() => {
            handleResize();
        }, 150);
    })();
});