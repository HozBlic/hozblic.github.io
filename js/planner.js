let objMistriaDataPlanner;
let objMistriaDataPlannerDefault = objBuild.objMistriaDataPlannerDefault;
const arrGrassFixCoord = objBuild.arrGrassFixCoord

let strMode = 'dragging_mode'; // drawing_mode, selection_area_mode
let intCurrentlyDrawing = false;

let intSaveSlot = 0;
let arrVersions = [];
let intCurrentVersion = 0;
const intAllowedVersions = 10;

let bolIsDragging = false;
let bolIsDraggingMap = false;
let bolIsDraggingSection = false;
let bolIsDraggingItem = false;
let bolPreventDrawing = false;
let objStartCellCoord = { x: 0, y: 0 };
let objStartOffset = { x: 0, y: 0 };
let objPrevCellCoord = { x: 0, y: 0 };
let objSelectionSection = false;

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

let objItemKeyDict = null;
let objZindexDict = null;
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


    'move': false,
    'cursor': Array.from({ length: objGrid.y }, () => Array.from({ length: objGrid.x }, () => [])),
    'rules': Array.from({ length: objGrid.y }, () => Array.from({ length: objGrid.x }, () => ({}))),

}

let objGridCombinedPrev = {
    'main_corner': Array.from({ length: objGrid.y }, () => Array.from({ length: objGrid.x }, () => [])),
    'move': false,
    'cursor': Array.from({ length: objGrid.y }, () => Array.from({ length: objGrid.x }, () => [])),
}

let objContainers = {
    'background': null,
    'grassFix': null,
    'collision': null,

    'ee': null,
    'grid': null,

    'cursor': null,


}
const arrGroundContainers = ['ground', 'soil', 'soilWet', 'grass'];
const objZindexes = {
    'background': 0,
    'grassFix': 1,



    'ee': 13,

    'collision': 14,
    'grid': 15,


    'cursor': 98,
}

function addTestData(intTest) {
    const intSoilIndex = getIndexBySpriteKey('tile_soil');
    const intWetSoilIndex = getIndexBySpriteKey('tile_soil_wet');
    const intCurrentlyDrawingSoil = objMistriaDataPlanner.options.has('mode_wet') ? intWetSoilIndex : intSoilIndex;
    let objSection = {}
    switch (intTest) {
        case 1: //add test soil in front of the house
            var intRows = 7;
            var intColumns = 9;

            var intStartX = 46;
            var intStartY = 23;

            var intCurrentlyDrawingTemp = getIndexBySpriteKey('snow_peas');

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
                            sprite.on('pointerover', () => {
                                highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                            });
                            sprite.on('pointerleave', () => {
                                highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                            });

                            spriteCrop.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                            spriteCrop.zIndex = getZindexbySpriteIndex(intCurrentlyDrawingTemp);

                            clearSection(objSectionCell);
                            objGridCombined.main_corner[tempY][tempX][intCurrentlyDrawingTemp] = { 'sprite': spriteCrop };
                            for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                                for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                    objGridCombined.main_extend[y1][x1][intCurrentlyDrawingTemp] = { 'coord': [tempX, tempY] };
                                }
                            }

                            const spriteSoil = getSprite(intSoilIndex, [0, 0, 0, 0, 0, 0, 0, 0]);
                            spriteSoil.eventMode = 'static';
                            spriteSoil.on('pointerover', () => {
                                highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                            });
                            spriteSoil.on('pointerleave', () => {
                                highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                            });

                            spriteSoil.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                            spriteSoil.zIndex = getZindexbySpriteIndex(intSoilIndex);

                            objGridCombined.main_corner[tempY][tempX][intSoilIndex] = { 'sprite': spriteSoil };
                            for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                                for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                    objGridCombined.main_extend[y1][x1][intSoilIndex] = { 'coord': [tempX, tempY] };
                                }
                            }
                            if (intCurrentlyDrawingSoil === intWetSoilIndex) {
                                const spriteSoilWet = getSprite(intWetSoilIndex, [0, 0, 0, 0, 0, 0, 0, 0]);
                                spriteSoilWet.eventMode = 'static';
                                spriteSoilWet.on('pointerover', () => {
                                    highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                                });
                                spriteSoilWet.on('pointerleave', () => {
                                    highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                                });

                                spriteSoilWet.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                                spriteSoilWet.zIndex = getZindexbySpriteIndex(intWetSoilIndex);

                                objGridCombined.main_corner[tempY][tempX][intWetSoilIndex] = { 'sprite': spriteSoilWet };
                                for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                                    for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                        objGridCombined.main_extend[y1][x1][intWetSoilIndex] = { 'coord': [tempX, tempY] };
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

            var intCurrentlyDrawingTemp = getIndexBySpriteKey('snow_peas');

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
                            spriteCrop.on('pointerover', () => {
                                highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                            });
                            spriteCrop.on('pointerleave', () => {
                                highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                            });
                            spriteCrop.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                            spriteCrop.zIndex = getZindexbySpriteIndex(intCurrentlyDrawingTemp);

                            clearSection(objSectionCell);
                            objGridCombined.main_corner[tempY][tempX][intCurrentlyDrawingTemp] = { 'sprite': spriteCrop };
                            for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                                for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                    objGridCombined.main_extend[y1][x1][intCurrentlyDrawingTemp] = { 'coord': [tempX, tempY] };
                                }
                            }

                            const spriteSoil = getSprite(intSoilIndex, [0, 0, 0, 0, 0, 0, 0, 0]);
                            spriteSoil.eventMode = 'static';
                            spriteSoil.on('pointerover', () => {
                                highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                            });
                            spriteSoil.on('pointerleave', () => {
                                highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                            });
                            spriteSoil.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                            spriteSoil.zIndex = getZindexbySpriteIndex(intSoilIndex);

                            objGridCombined.main_corner[tempY][tempX][intSoilIndex] = { 'sprite': spriteSoil };
                            for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                                for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                    objGridCombined.main_extend[y1][x1][intSoilIndex] = { 'coord': [tempX, tempY] };
                                }
                            }

                            if (intCurrentlyDrawingSoil === intWetSoilIndex) {
                                const spriteSoilWet = getSprite(intWetSoilIndex, [0, 0, 0, 0, 0, 0, 0, 0]);
                                intWetSoilIndex.eventMode = 'static';
                                intWetSoilIndex.on('pointerover', () => {
                                    highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                                });
                                intWetSoilIndex.on('pointerleave', () => {
                                    highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                                });
                                spriteSoilWet.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                                spriteSoilWet.zIndex = getZindexbySpriteIndex(intWetSoilIndex);

                                objGridCombined.main_corner[tempY][tempX][intWetSoilIndex] = { 'sprite': spriteSoilWet };
                                for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                                    for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                        objGridCombined.main_extend[y1][x1][intWetSoilIndex] = { 'coord': [tempX, tempY] };
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

            var intCurrentlyDrawingTemp = getIndexBySpriteKey('snow_peas');

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
                    spriteCrop.on('pointerover', () => {
                        highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                    });
                    spriteCrop.on('pointerleave', () => {
                        highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                    });
                    spriteCrop.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                    spriteCrop.zIndex = getZindexbySpriteIndex(intCurrentlyDrawingTemp);

                    clearSection(objSectionCell);
                    objGridCombined.main_corner[tempY][tempX][intCurrentlyDrawingTemp] = { 'sprite': spriteCrop };
                    for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                        for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                            objGridCombined.main_extend[y1][x1][intCurrentlyDrawingTemp] = { 'coord': [tempX, tempY] };
                        }
                    }

                    const spriteSoil = getSprite(intSoilIndex, [0, 0, 0, 0, 0, 0, 0, 0]);

                    spriteSoil.eventMode = 'static';
                    spriteSoil.on('pointerover', () => {
                        highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                    });
                    spriteSoil.on('pointerleave', () => {
                        highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                    });
                    spriteSoil.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                    spriteSoil.zIndex = getZindexbySpriteIndex(intSoilIndex);

                    objGridCombined.main_corner[tempY][tempX][intSoilIndex] = { 'sprite': spriteSoil };
                    for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                        for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                            objGridCombined.main_extend[y1][x1][intSoilIndex] = { 'coord': [tempX, tempY] };
                        }
                    }

                    if (intCurrentlyDrawingSoil === intWetSoilIndex) {
                        const spriteSoilWet = getSprite(intWetSoilIndex, [0, 0, 0, 0, 0, 0, 0, 0]);

                        spriteSoilWet.eventMode = 'static';
                        spriteSoilWet.on('pointerover', () => {
                            highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                        });
                        spriteSoilWet.on('pointerleave', () => {
                            highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                        });
                        spriteSoilWet.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                        spriteSoilWet.zIndex = getZindexbySpriteIndex(intWetSoilIndex);

                        objGridCombined.main_corner[tempY][tempX][intWetSoilIndex] = { 'sprite': spriteSoilWet };
                        for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                            for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                objGridCombined.main_extend[y1][x1][intWetSoilIndex] = { 'coord': [tempX, tempY] };
                            }
                        }
                    }
                }
            }

            intStartX = 14;
            objSection.x1 = intStartX * 2 + (intColumns - 1) * 2;

            intCurrentlyDrawingTemp = getIndexBySpriteKey('tea');

            for (let y = 0; y < intRows; y++) {
                for (let x = 0; x < intColumns; x++) {
                    const tempX = intStartX * 2 + x * 2;
                    const tempY = intStartY * 2 + y * 2;

                    const objSectionCell = { x0: tempX, y0: tempY, x1: tempX + 2, y1: tempY + 2 };
                    const spriteCrop = getSprite(intCurrentlyDrawingTemp, [0, 0, 0, 0, 0, 0, 0, 0]);
                    spriteCrop.eventMode = 'static';
                    spriteCrop.on('pointerover', () => {
                        highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                    });
                    spriteCrop.on('pointerleave', () => {
                        highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                    });
                    spriteCrop.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                    spriteCrop.zIndex = getZindexbySpriteIndex(intCurrentlyDrawingTemp);

                    clearSection(objSectionCell);
                    objGridCombined.main_corner[tempY][tempX][intCurrentlyDrawingTemp] = { 'sprite': spriteCrop };
                    for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                        for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                            objGridCombined.main_extend[y1][x1][intCurrentlyDrawingTemp] = { 'coord': [tempX, tempY] };
                        }
                    }

                    const spriteSoil = getSprite(intSoilIndex, [0, 0, 0, 0, 0, 0, 0, 0]);
                    spriteSoil.eventMode = 'static';
                    spriteSoil.on('pointerover', () => {
                        highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                    });
                    spriteSoil.on('pointerleave', () => {
                        highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                    });
                    spriteSoil.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                    spriteSoil.zIndex = getZindexbySpriteIndex(intSoilIndex);

                    objGridCombined.main_corner[tempY][tempX][intSoilIndex] = { 'sprite': spriteSoil };
                    for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                        for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                            objGridCombined.main_extend[y1][x1][intSoilIndex] = { 'coord': [tempX, tempY] };
                        }
                    }

                    if (intCurrentlyDrawingSoil === intWetSoilIndex) {
                        const spriteSoilWet = getSprite(intWetSoilIndex, [0, 0, 0, 0, 0, 0, 0, 0]);
                        spriteSoilWet.eventMode = 'static';
                        spriteSoilWet.on('pointerover', () => {
                            highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                        });
                        spriteSoilWet.on('pointerleave', () => {
                            highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                        });
                        spriteSoilWet.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                        spriteSoilWet.zIndex = getZindexbySpriteIndex(intWetSoilIndex);

                        objGridCombined.main_corner[tempY][tempX][intWetSoilIndex] = { 'sprite': spriteSoilWet };
                        for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                            for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                objGridCombined.main_extend[y1][x1][intWetSoilIndex] = { 'coord': [tempX, tempY] };
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
                        spriteCrop.on('pointerover', () => {
                            highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                        });
                        spriteCrop.on('pointerleave', () => {
                            highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                        });
                        spriteCrop.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                        spriteCrop.zIndex = getZindexbySpriteIndex(intCurrentlyDrawingTemp);
                        spriteCrop.eventMode = 'static';
                        spriteCrop.on('pointerover', () => {
                            highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                        });
                        spriteCrop.on('pointerleave', () => {
                            highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                        });

                        clearSection(objSectionCell);
                        objGridCombined.main_corner[tempY][tempX][intCurrentlyDrawingTemp] = { 'sprite': spriteCrop };
                        for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                            for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                objGridCombined.main_extend[y1][x1][intCurrentlyDrawingTemp] = { 'coord': [tempX, tempY] };
                            }
                        }

                        const spriteSoil = getSprite(intSoilIndex, [0, 0, 0, 0, 0, 0, 0, 0]);
                        spriteSoil.eventMode = 'static';
                        spriteSoil.on('pointerover', () => {
                            highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                        });
                        spriteSoil.on('pointerleave', () => {
                            highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                        });
                        spriteSoil.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                        spriteSoil.zIndex = getZindexbySpriteIndex(intSoilIndex);

                        objGridCombined.main_corner[tempY][tempX][intSoilIndex] = { 'sprite': spriteSoil };
                        for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                            for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                objGridCombined.main_extend[y1][x1][intSoilIndex] = { 'coord': [tempX, tempY] };
                            }
                        }

                        if (intCurrentlyDrawingSoil === intWetSoilIndex) {
                            const spriteSoilWet = getSprite(intWetSoilIndex, [0, 0, 0, 0, 0, 0, 0, 0]);
                            spriteSoilWet.eventMode = 'static';
                            spriteSoilWet.on('pointerover', () => {
                                highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                            });
                            spriteSoilWet.on('pointerleave', () => {
                                highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                            });
                            spriteSoilWet.position.set(tempX * intGridCellSize, tempY * intGridCellSize);
                            spriteSoilWet.zIndex = getZindexbySpriteIndex(intWetSoilIndex);

                            objGridCombined.main_corner[tempY][tempX][intWetSoilIndex] = { 'sprite': spriteSoilWet };
                            for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                                for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                    objGridCombined.main_extend[y1][x1][intWetSoilIndex] = { 'coord': [tempX, tempY] };
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
    console.log(`convertGridToNeighbours - ${endTime - startTime} milliseconds`)
    return arrNeighbourGrid;
}

function recalculateNeigborSprites(objSection = { x0: 0, y0: 0, x1: objGrid.x, y1: objGrid.y }) {
    const startTime = performance.now()

    const intGrassIndex = getIndexBySpriteKey('tile_grassautotile');

    //add 1 big cell (2x2) frame to section
    //all items that change their sprite depending on neighbors are 2x2 big

    //TODO: delete old sprites (clear cell want called in outer ring)

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
                    if (intIdx == intGrassIndex) {
                        bolHasGrass = true;
                    }
                    if ([getIndexBySpriteKey('tile_main_exteriors'), getIndexBySpriteKey('tile_soil'), getIndexBySpriteKey('tile_soil_wet')].includes(intIdx)) {
                        bolHasSoil = true;
                    }

                    const arrNeigbors = objNeighbors[intIdx][y - objSection.y0][x - objSection.x0]
                    const sprite = getSprite(intIdx, arrNeigbors);
                    sprite.eventMode = 'static';
                    sprite.on('pointerover', () => {
                        highlightSection({ x0: x, x1: x, y0: y, y1: y })
                    });
                    sprite.on('pointerleave', () => {
                        highlightSection({ x0: x, x1: x, y0: y, y1: y }, true)
                    });
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
                const arrNeigbors = objNeighbors[intGrassIndex][y - objSection.y0][x - objSection.x0]
                if (arrNeigbors.includes(1)) {
                    const sprite = getSprite(intGrassIndex, arrNeigbors);
                    sprite.eventMode = 'static';
                    sprite.on('pointerover', () => {
                        highlightSection({ x0: x, x1: x, y0: y, y1: y })
                    });
                    sprite.on('pointerleave', () => {
                        highlightSection({ x0: x, x1: x, y0: y, y1: y }, true)
                    });
                    sprite.position.set(x * intGridCellSize, y * intGridCellSize);
                    sprite.zIndex = getZindexbySpriteIndex(intGrassIndex);

                    //remove previous sprite if exists
                    if (intGrassIndex in objGridCombined.main_corner[y][x] && 'sprite' in objGridCombined.main_corner[y][x][intGrassIndex]) {
                        const spritePrev = objGridCombined.main_corner[y][x][intGrassIndex].sprite;
                        if (spritePrev.parent !== null) {
                            spritePrev.parent.removeChild(spritePrev);
                        }
                    }
                    objGridCombined.main_corner[y][x][intGrassIndex] = { 'sprite': sprite, 'neigbors': arrNeigbors };
                }
            }

            if (bolHasGrass && bolHasSoil) {
                if (intGrassIndex in objGridCombined.main_corner[y][x] && 'sprite' in objGridCombined.main_corner[y][x][intGrassIndex]) {
                    const spriteGrass = objGridCombined.main_corner[y][x][intGrassIndex].sprite;
                    if (spriteGrass.parent !== null) {
                        spriteGrass.parent.removeChild(spriteGrass);
                    }
                }
                delete objGridCombined.main_corner[y][x][intGrassIndex];
            }
        }
    }

    const endTime = performance.now()
    console.log(`recalculateNeigborSprites - ${endTime - startTime} milliseconds`)
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
        objContainers.grid.zIndex = objZindexes.grid;
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

function getZindexbySpriteIndex(intItemIndex) {
    return Object.keys(objZindexDict).find(k => objZindexDict[k].includes(intItemIndex)) || "99";
}

function getIndexBySpriteKey(strItemKey) {
    const entry = Object.entries(objItemKeyDict).find(([k, v]) => {
        if (!v || v.length === 0) return false;
        // check 2nd element first
        if (v.length > 1 && v[1] === strItemKey) return true;
        // fallback to first element
        if (v[0] === strItemKey) return true;
        return false;
    });
    return entry ? parseInt(entry[0]) : null;
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
    bolIsDraggingMap = true;
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
    objContainers.grassFix.zIndex = objZindexes.grassFix;

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


function clearOverlays() {
    return;
    objGridCombined.cursor = Array.from({ length: objGrid.y }, () => Array.from({ length: objGrid.x }, () => []));
    objGridCombined.selection = Array.from({ length: objGrid.y }, () => Array.from({ length: objGrid.x }, () => []));

    //destroy previously drawn elements
    if (objContainers.cursor !== null) {
        objContainer_Wrapper.removeChild(objContainers.cursor);
        objContainers.cursor.destroy();
        objContainers.cursor = null
    }

    //destroy previously drawn elements
    if (objContainers.selection !== null) {
        objContainer_Wrapper.removeChild(objContainers.selection);
        objContainers.selection.destroy();
        objContainers.selection = null
    }
}


const slice2D = (arr, startX, endX, startY, endY) => {
    return arr.slice(startY, endY + 1).map(subArr => subArr.slice(startX, endX + 1))
}

function selectionHovered(objCellCoord) {
    if (objContainers.selection !== null && strMode === 'selection_area_mode' &&
        (
            objCellCoord.x >= objSelectionSection.x0 &&
            objCellCoord.x <= objSelectionSection.x1 &&
            objCellCoord.y >= objSelectionSection.y0 &&
            objCellCoord.y <= objSelectionSection.y1
        )
    ) {
        return true;
    }
    return false;
}

function itemHovered(objCellCoord) {
    if (strMode !== 'selection_mode') {
        return false;
    }

    const objItemArea = { x0: objCellCoord.x, y0: objCellCoord.y, x1: objCellCoord.x, y1: objCellCoord.y }

    if (checkTileHasCollision(objItemArea)) {
        return false;
    } else {
        const arrGrid_CoveredSlice2D = slice2D(objGridCombined.main_extend, objItemArea.x0, objItemArea.x1, objItemArea.y0, objItemArea.y1);
        let setGrid_CoveredSliceValues = new Set(arrGrid_CoveredSlice2D.flat().flat())

        // objSpriteCategories.soil.forEach(intItemIndex => setGrid_CoveredSliceValues.delete(intItemIndex));

        // if (objSpriteCategories.soil.includes(intCurrentlyDrawing)) {
        //     //soil can be under anything, but if there are crops, it must be tilled soil
        //     if ([1, 4].includes(intCurrentlyDrawing)) {
        //         let arrGrid_CoveredSliceValues = [...setGrid_CoveredSliceValues].filter((intItemIndex) => (objSpriteCategories.crops.includes(intItemIndex)));
        //         setGrid_CoveredSliceValues = new Set(arrGrid_CoveredSliceValues);
        //         if (setGrid_CoveredSliceValues.size) {
        //             bolHitsElement = true;
        //         }
        //     }
        // } else {
        //     if (objSpriteCategories.depth_to_floor.includes(intCurrentlyDrawing)) {
        //         //rugs and stuff can be under other elements, but can not hit other rugs
        //         let arrGrid_CoveredSliceValues = [...setGrid_CoveredSliceValues].filter((intItemIndex) => (objSpriteCategories.depth_to_floor.includes(intItemIndex) || objSpriteCategories.crops.includes(intItemIndex)));
        //         setGrid_CoveredSliceValues = new Set(arrGrid_CoveredSliceValues);
        //     } else {
        //         //elements can be over rugs
        //         objSpriteCategories.depth_to_floor.forEach(intItemIndex => setGrid_CoveredSliceValues.delete(intItemIndex));
        //     }
        //     if (setGrid_CoveredSliceValues.size) {
        //         bolHitsElement = true;
        //     }
        // }
    }
    return false;

}

function getSprite(intItemIndex, arrNeighbours = [0, 0, 0, 0, 0, 0, 0, 0]) {
    let sprite;
    const strSpriteKey = objItemKeyDict[intItemIndex][1] ?? objItemKeyDict[intItemIndex][0];
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
        sprite = sprites.getFence(strSpriteKey, arrNeighbours);
    } else {
        sprite = sprites.get(strSpriteKey);
    }

    return sprite;
}

function getTopLeftCornerItem(objCellCoord, bolForceTwosOnly = false) {
    //snap to grid
    let bolTwosOnly = false;

    if (bolForceTwosOnly) {
        bolTwosOnly = true;

    } else {
        bolTwosOnly = (objSpriteCategories.soil.includes(intCurrentlyDrawing) || objSpriteCategories.crops.includes(intCurrentlyDrawing) || objSpriteCategories.on_twos_only.includes(intCurrentlyDrawing)) ? true : false;
    }
    const sprite = getSprite(intCurrentlyDrawing);
    const arrSize = sprite.meta.size;

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
    let objSelectionStep = { x: 1, y: 1 }
    let coordStart = objCellCoord;

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

function drawContainers(arrGrids = false, objSelection = false, bolHighlight = false) {
    return;
    $('#game-container').css('cursor', '');
    console.log("draw")
    let objSelectionTemp = {
        x0: 0,
        y0: 0,
        x1: objGrid.x,
        y1: objGrid.y,
    }
    if (objSelection !== false) {
        objSelectionTemp = objSelection;
    }

    //draw yellow selection rectangle
    if (!arrGrids.length) {

        //destroy previously drawn elements
        if (objContainers.selection !== null) {
            objContainer_Wrapper.removeChild(objContainers.selection);
            objContainers.selection.destroy();
            objContainers.selection = null
        }

        //init container
        objContainers.selection = new PIXI.Container();
        objContainer_Wrapper.addChild(objContainers.selection);
        objContainers.selection.zIndex = objZindexes.selection;

        let elemSelection = new PIXI.Graphics();

        elemSelection.rect(0, 0, (objSelectionTemp.x1 - objSelectionTemp.x0 + 1) * intGridCellSize, (objSelectionTemp.y1 - objSelectionTemp.y0 + 1) * intGridCellSize);
        if (bolHighlight) {
            elemSelection.fill(`rgba(255, 174, 0, 0.5)`);
            $('#game-container').css('cursor', 'pointer');
        } else if (strMode === 'selection_area_mode') {
            elemSelection.fill(`rgba(255, 174, 0, 0.3)`);
        }
        elemSelection.stroke({ color: `rgba(255, 174, 0, 0.8)`, width: 2, alignment: 1 });
        elemSelection.position.set(objSelectionTemp.x0 * intGridCellSize, objSelectionTemp.y0 * intGridCellSize);
        objContainers.selection.addChild(elemSelection);
    }

    let objNeighbors = {};
    if (arrGrids[0] == 'main_corner') {
        let setItems;
        setItems = new Set(
            objGridCombined.main_corner.flatMap(layer =>
                layer.flatMap(row =>
                    row.flat()
                )
            )
        );

        const arrItems = [...setItems];
        const arrSeenFences = getCommonElements(arrItems, objSpriteCategories.fences)
        const arrSeenGround = getCommonElements(arrItems, objSpriteCategories.soil)
        const arrSeenCounters = getCommonElements(arrItems, objSpriteCategories.counter)
        let arrNeighborItems = getCommonElements(arrItems, [...arrSeenGround, ...arrSeenFences, ...arrSeenCounters]);
        arrNeighborItems.push(4);

        arrNeighborItems.forEach((intIdx) => {
            objNeighbors[intIdx] = convertGridToNeighbours(intIdx, 'main_corner');
        });
    }

    arrGrids.forEach((strGridKey) => {
        let objContainersChanged = {};

        if (strGridKey === 'cursor') {
            objContainersChanged.cursor = [];
        } else {
            objContainersChanged.crops = objSpriteCategories.crops;
            objContainersChanged.fences = objSpriteCategories.fences;
            objContainersChanged.counter = objSpriteCategories.counter;
            objContainersChanged.ground = [1];
            objContainersChanged.soil = [2];
            objContainersChanged.soilWet = [3];
            objContainersChanged.grass = [4];
            objContainersChanged.rug = objSpriteCategories.rug;
        }

        Object.keys(objContainersChanged).forEach(function (strContainerKey) {

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

            if (strContainerKey === 'cursor') {
                objContainers[strContainerKey].alpha = 0.5;
            }

            const bolTwosOnly = ['crops', 'fences', 'ground', 'soil', 'soilWet', 'grass'].includes(strContainerKey);

            for (let y = objSelectionTemp.y0; y < objSelectionTemp.y1; (bolTwosOnly ? y += 2 : y++)) {
                for (let x = objSelectionTemp.x0; x < objSelectionTemp.x1; (bolTwosOnly ? x += 2 : x++)) {
                    if (strContainerKey == 'grass') {
                        if (checkTileHasCollision({ x0: x, y0: y, x1: x + 1, y1: y + 1 })) {
                            continue;
                        }
                        if (!hasCommonElement(objGridCombined[strGridKey][y][x], [1, 2, 3]) && objNeighbors[4][y][x].includes(1)) {
                            const sprite = getSprite(4, objNeighbors[4][y][x]);
                            sprite.position.set(x * intGridCellSize, y * intGridCellSize);
                            objContainers[strContainerKey].addChild(sprite);
                        }
                    }
                    else if (objGridCombined[strGridKey][y][x].length) {
                        let arrItems = objGridCombined[strGridKey][y][x];
                        let bolCollision = false;
                        let bolHovered = false;

                        if (strGridKey !== 'cursor') {
                            arrItems = getCommonElements(objGridCombined[strGridKey][y][x], objContainersChanged[strContainerKey])
                            if ('hovered' in objGridCombined.rules[y][x]) {
                                bolHovered = true;
                            }
                        } else {
                            if ('collision' in objGridCombined.rules[y][x]) {
                                bolCollision = true;
                            }
                        }

                        arrItems.forEach((intItemIndex) => {
                            const sprite = getSprite(intItemIndex, (intItemIndex in objNeighbors ? objNeighbors[intItemIndex][y][x] : [0, 0, 0, 0, 0, 0, 0, 0]));
                            sprite.position.set(x * intGridCellSize, y * intGridCellSize);
                            if (bolCollision) {
                                const overlay = new PIXI.filters.ColorOverlayFilter({
                                    color: 0xff0000,
                                    alpha: 1
                                });
                                // Apply it to the sprite
                                sprite.filters = [overlay];
                            }
                            if (bolHovered) {
                                console.log('j')
                                const outline = new PIXI.filters.OutlineFilter({
                                    thickness: 3,
                                    color: 0xff0000,
                                    // quality: 0.5
                                });

                                // Apply it to the sprite
                                sprite.filters = [outline];
                            }
                            if (strGridKey !== 'cursor') {
                                sprite.eventMode = 'static';
                                sprite.on('pointerover', () => {
                                    selectSprite({ x0: x, y0: y, x1: x, y1: y }, true)
                                });
                            } else {
                                sprite.eventMode = 'none';
                            }

                            objContainers[strContainerKey].addChild(sprite);
                        });
                    }
                }
            }
        });
    });

    if (arrGrids[0] == 'main_corner') {
        // objGridCombinedPrev = JSON.parse(JSON.stringify(objGridCombined));
    }


    resizeContainers();
}

function drawPlanner(objSize = objGrid, objTopCorner = { x: 0, y: 0 }, strGrid = 'main_corner', strContainer = 'ee') {


    //destroy previously drawn elements
    // if (objContainers['ee'] !== null) {
    //     objContainer_Wrapper.removeChild(objContainers['ee']);
    //     objContainers['ee'].destroy();
    //     objContainers['ee'] = null
    // }

    if (objContainers[strContainer] === null) {
        //init container
        objContainers[strContainer] = new PIXI.Container();
        objContainer_Wrapper.addChild(objContainers[strContainer]);
        objContainers[strContainer].zIndex = objZindexes[strContainer];

        if (strContainer === 'cursor') {
            objContainers[strContainer].alpha = 0.5;
        }
    }

    for (let y = objTopCorner.y; y < objSize.y; y++) {
        for (let x = objTopCorner.x; x < objSize.x; x++) {
            const objCell = objGridCombined[strGrid][y - objTopCorner.y][x - objTopCorner.x];
            Object.keys(objCell).forEach(function (strItemKey) {
                const intItemKey = parseInt(strItemKey);
                const sprite = objCell[intItemKey].sprite;
                objContainers[strContainer].addChild(sprite);
            });
        }
    }

    return;
    const arrGrids = ['main_corner'];
    arrGrids.forEach((strGridKey) => {
        let objContainersChanged = {};

        if (strGridKey === 'cursor') {
            objContainersChanged.cursor = [];
        } else {
            objContainersChanged.crops = objSpriteCategories.crops;
            objContainersChanged.fences = objSpriteCategories.fences;
            objContainersChanged.counter = objSpriteCategories.counter;
            objContainersChanged.ground = [1];
            objContainersChanged.soil = [2];
            objContainersChanged.soilWet = [3];
            objContainersChanged.grass = [4];
            objContainersChanged.rug = objSpriteCategories.rug;
        }

        Object.keys(objContainersChanged).forEach(function (strContainerKey) {

            // //destroy previously drawn elements
            // if (objContainers[strContainerKey] !== null) {
            //     objContainer_Wrapper.removeChild(objContainers[strContainerKey]);
            //     objContainers[strContainerKey].destroy();
            //     objContainers[strContainerKey] = null
            // }

            // //init container
            // objContainers[strContainerKey] = new PIXI.Container();
            // objContainer_Wrapper.addChild(objContainers[strContainerKey]);
            // objContainers[strContainerKey].zIndex = objZindexes[strContainerKey];

            // if (strContainerKey === 'cursor') {
            //     objContainers[strContainerKey].alpha = 0.5;
            // }

            const bolTwosOnly = ['crops', 'fences', 'ground', 'soil', 'soilWet', 'grass'].includes(strContainerKey);

            for (let y = objSelection.y0; y < objSelection.y1; (bolTwosOnly ? y += 2 : y++)) {
                for (let x = objSelection.x0; x < objSelection.x1; (bolTwosOnly ? x += 2 : x++)) {
                    if (strContainerKey == 'grass') {
                        if (checkTileHasCollision({ x0: x, y0: y, x1: x + 1, y1: y + 1 })) {
                            continue;
                        }
                        if (!hasCommonElement(objGridCombined[strGridKey][y][x], [1, 2, 3]) && objNeighbors[4][y][x].includes(1)) {
                            const sprite = getSprite(4, objNeighbors[4][y][x]);
                            sprite.position.set(x * intGridCellSize, y * intGridCellSize);
                            objContainers[strContainerKey].addChild(sprite);
                        }
                    }
                    else if (objGridCombined[strGridKey][y][x].length) {
                        let arrItems = objGridCombined[strGridKey][y][x];
                        let bolCollision = false;
                        let bolHovered = false;

                        if (strGridKey !== 'cursor') {
                            arrItems = getCommonElements(objGridCombined[strGridKey][y][x], objContainersChanged[strContainerKey])
                            if ('hovered' in objGridCombined.rules[y][x]) {
                                bolHovered = true;
                            }
                        } else {
                            if ('collision' in objGridCombined.rules[y][x]) {
                                bolCollision = true;
                            }
                        }

                        arrItems.forEach((intItemIndex) => {
                            const sprite = getSprite(intItemIndex, (intItemIndex in objNeighbors ? objNeighbors[intItemIndex][y][x] : [0, 0, 0, 0, 0, 0, 0, 0]));
                            sprite.position.set(x * intGridCellSize, y * intGridCellSize);
                            if (bolCollision) {
                                const overlay = new PIXI.filters.ColorOverlayFilter({
                                    color: 0xff0000,
                                    alpha: 1
                                });
                                // Apply it to the sprite
                                sprite.filters = [overlay];
                            }
                            if (bolHovered) {
                                console.log('j')
                                const outline = new PIXI.filters.OutlineFilter({
                                    thickness: 3,
                                    color: 0xff0000,
                                    // quality: 0.5
                                });

                                // Apply it to the sprite
                                sprite.filters = [outline];
                            }
                            if (strGridKey !== 'cursor') {
                                sprite.eventMode = 'static';
                                sprite.on('pointerover', () => {
                                    selectSprite({ x0: x, y0: y, x1: x, y1: y }, true)
                                });
                            } else {
                                sprite.eventMode = 'none';
                            }

                            objContainers[strContainerKey].addChild(sprite);
                        });
                    }
                }
            }
        });
    });

    resizeContainers();
}

function selectSprite(objSection) {
    if (strMode !== 'selection_mode') {
        return
    }

    if ('hovered' in objGridCombined.rules[objSection.y0][objSection.x0]) {
        return;
    }

    objGridCombined.rules = Array.from({ length: objGrid.y }, () =>
        Array.from({ length: objGrid.x }, () => ({}))
    );
    objGridCombined['rules'][objSection.y0][objSection.x0]['hovered'] = '';
    drawContainers(['main_corner']);

}

function updateGrid(objCellCoord, bolChange = false) {
    return;
    if (bolPreventDrawing) {
        return;
    }
    if (objSpriteCategories.soil.includes(intCurrentlyDrawing) || objSpriteCategories.crops.includes(intCurrentlyDrawing) || objSpriteCategories.fences.includes(intCurrentlyDrawing)) {
        objCellCoord = {
            x: objCellCoord.x - objCellCoord.x % 2,
            y: objCellCoord.y - objCellCoord.y % 2,
        }
    }

    if (!bolChange && objPrevCellCoord.x === objCellCoord.x && objPrevCellCoord.y === objCellCoord.y) {
        objPrevCellCoord = objCellCoord;
        return;
    }
    objPrevCellCoord = objCellCoord;
    let bolAddedNew = false;

    if (strMode === 'drawing_mode' && (!bolChange || (bolChange && bolIsDragging && !bolIsDraggingMap))) {
        objGridCombined.cursor = Array.from({ length: objGrid.y }, () => Array.from({ length: objGrid.x }, () => []))

        const objSelection = getSelection(objCellCoord);
        const sprite = getSprite(intCurrentlyDrawing);
        const arrSize = sprite.meta.size;

        for (let y = objSelection.y0; y < objSelection.y1; y++) {
            if (y < 0 || y + arrSize[1] > objGrid.y) continue;
            for (let x = objSelection.x0; x < objSelection.x1; x++) {
                if (x < 0 || x + arrSize[0] > objGrid.x) continue;
                if ((y - objSelection.y0) % arrSize[1] == 0 && (x - objSelection.x0) % arrSize[0] == 0) {

                    const objItemArea = { x0: x, y0: y, x1: x + arrSize[0] - 1, y1: y + arrSize[1] - 1 }
                    let bolHitsElement = false;
                    if (checkTileHasCollision(objItemArea)) {
                        bolHitsElement = true;
                    } else {
                        const arrGrid_CoveredSlice2D = slice2D(objGridCombined.main_extend, objItemArea.x0, objItemArea.x1, objItemArea.y0, objItemArea.y1);
                        let setGrid_CoveredSliceValues = new Set(arrGrid_CoveredSlice2D.flat().flat())
                        objSpriteCategories.soil.forEach(intItemIndex => setGrid_CoveredSliceValues.delete(intItemIndex));

                        if (objSpriteCategories.soil.includes(intCurrentlyDrawing)) {
                            //soil can be under anything, but if there are crops, it must be tilled soil
                            if ([1, 4].includes(intCurrentlyDrawing)) {
                                let arrGrid_CoveredSliceValues = [...setGrid_CoveredSliceValues].filter((intItemIndex) => (objSpriteCategories.crops.includes(intItemIndex)));
                                setGrid_CoveredSliceValues = new Set(arrGrid_CoveredSliceValues);
                                if (setGrid_CoveredSliceValues.size) {
                                    bolHitsElement = true;
                                }
                            }
                        } else {
                            if (objSpriteCategories.depth_to_floor.includes(intCurrentlyDrawing)) {
                                //rugs and stuff can be under other elements, but can not hit other rugs
                                let arrGrid_CoveredSliceValues = [...setGrid_CoveredSliceValues].filter((intItemIndex) => (objSpriteCategories.depth_to_floor.includes(intItemIndex) || objSpriteCategories.crops.includes(intItemIndex)));
                                setGrid_CoveredSliceValues = new Set(arrGrid_CoveredSliceValues);
                            } else {
                                //elements can be over rugs
                                objSpriteCategories.depth_to_floor.forEach(intItemIndex => setGrid_CoveredSliceValues.delete(intItemIndex));
                            }
                            if (setGrid_CoveredSliceValues.size) {
                                bolHitsElement = true;
                            }
                        }
                    }

                    if (objSpriteCategories.fences.includes(intCurrentlyDrawing) || objSpriteCategories.counter.includes(intCurrentlyDrawing)) {
                        //draw fences as border only for selection
                        const isEdge =
                            x === objSelection.x0 ||
                            x === objSelection.x1 - 1 ||
                            y === objSelection.y0 ||
                            y === objSelection.y1 - 1;
                        if (!isEdge) {
                            continue;
                        }
                    }

                    if (bolChange) {
                        if (bolHitsElement) {
                            continue;
                        }
                        let intSoil = false;
                        if (objSpriteCategories.crops.includes(intCurrentlyDrawing)) {

                            //clear out crops in current tile
                            objSpriteCategories.crops.forEach((intIdx) => {
                                if (intIdx in objMistriaDataPlanner.layout[intSaveSlot].farm) {
                                    objMistriaDataPlanner.layout[intSaveSlot].farm[intIdx][y][x] = 0;
                                }
                            });

                            intSoil = objMistriaDataPlanner.options.has('mode_wet') ? 3 : 2;
                        }

                        if (intSoil || objSpriteCategories.soil.includes(intCurrentlyDrawing)) {
                            if (objSpriteCategories.soil.includes(intCurrentlyDrawing)) {
                                intSoil = intCurrentlyDrawing;
                            }
                            //clear out soil in current tile
                            objSpriteCategories.soil.forEach((intIdx) => {
                                if (intIdx in objMistriaDataPlanner.layout[intSaveSlot].farm) {
                                    objMistriaDataPlanner.layout[intSaveSlot].farm[intIdx][y][x] = 0;
                                }
                            });
                            //if doesnt have array for current soil type, create
                            if (!(intSoil in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                                objMistriaDataPlanner.layout[intSaveSlot].farm[intSoil] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
                            }
                            //is soil is wet, dry soil needs to be drawn under anyways
                            if (intSoil === 3) {
                                if (!(2 in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                                    objMistriaDataPlanner.layout[intSaveSlot].farm[2] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
                                }
                                objMistriaDataPlanner.layout[intSaveSlot].farm[2][y][x] = 1;
                            }
                            objMistriaDataPlanner.layout[intSaveSlot].farm[intSoil][y][x] = 1;
                        }

                        if (!(intCurrentlyDrawing in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                            objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawing] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
                        }
                        objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawing][y][x] = 1;
                        bolAddedNew = true;
                    } else {

                        if (bolHitsElement) {
                            objGridCombined['rules'][y][x]['collision'] = '';
                        }

                        objGridCombined['cursor'][y][x].push(intCurrentlyDrawing);
                    }
                }
            }
        }

        if (bolChange) {
            if (bolAddedNew) {
                saveDataPlanner(true);
                drawContainers(['main_corner']);
            }
        } else {
            drawContainers(['cursor']);
        }
    }

    if (strMode === 'selection_mode') {

        if (bolIsDraggingItem && bolIsDragging) {

        } else {
            let objSelection = {
                x0: objCellCoord.x,
                y0: objCellCoord.y,
                x1: objCellCoord.x,
                y1: objCellCoord.y,
            }
            let bolHighlight = false;
            itemHovered(objCellCoord)

            // if (objSelectionSection !== false) {
            //     objSelection = objSelectionSection;
            //     if (itemHovered(objCellCoord)) {
            //         bolHighlight = true;
            //     }
            //     drawContainers([], objSelection, bolHighlight);
            // }
        }
    }

    if (strMode === 'selection_area_mode') {

        if (bolIsDraggingSection && bolIsDragging) {

        } else if (bolIsDragging) {
            const objSelection = {
                x0: Math.min(objStartCellCoord.x, objCellCoord.x),
                y0: Math.min(objStartCellCoord.y, objCellCoord.y),
                x1: Math.max(objStartCellCoord.x, objCellCoord.x),
                y1: Math.max(objStartCellCoord.y, objCellCoord.y),
            }

            drawContainers([], objSelection);
            objSelectionSection = objSelection;
        } else {
            let objSelection = {
                x0: objCellCoord.x,
                y0: objCellCoord.y,
                x1: objCellCoord.x,
                y1: objCellCoord.y,
            }
            let bolHighlight = false;

            if (objSelectionSection !== false) {
                objSelection = objSelectionSection;
                if (selectionHovered(objCellCoord)) {
                    bolHighlight = true;
                }
                drawContainers([], objSelection, bolHighlight);
            }
        }
    }


    //  objGridCombined.move = Array.from({ length: objGrid.y }, () => Array.from({ length: objGrid.x }, () => []))

    //moving mouse and drawing mode - update cursor, one object snaps to place (check if ittakestwo)
    //draggong and drawing mode -update cursor (selection with repeat strcurrent)

    //selection move - update cursor, one object snaps to place (
    //selection drag - update cursor, (selection)
    // selection item id - s?

    //add -check if temp grid was used :
    // get which is selection from cursor grid, update main grid with temp grid and coordinates, clear cursor grid, set temp grid t false
    // else : get which is selection from cursor grid, update main grid with coordinates, clear cursor grid, set temp grid t false

    //move - save start selection, get which is selection from cursor grid, fill temp grid with (main grid minus start selection ) update cursor grid with selection
}

function resetDrawingVariables() {
    bolIsDragging = false;
    bolIsDraggingMap = false;
    bolIsDraggingSection = false;
    bolIsDraggingItem = false;
    bolPreventDrawing = false;

    objStartCellCoord = { x: 0, y: 0 };
    objStartOffset = { x: 0, y: 0 };
    objPrevCellCoord = { x: 0, y: 0 };
}

function updateCurrentlyDrawing(intItemKey = false) {
    intCurrentlyDrawing = intItemKey;
    $(`[data-key]`).removeClass('selected');
    $(`[data-key="${intCurrentlyDrawing}"]`).addClass('selected');

    updateCursorMode('drawing_mode');
    generateTempSection();
}

function updateCursorMode(strModeTemp = false) {
    // let strMode = 'dragging_mode'; // drawing_mode, selection_area_mode
    strMode = strModeTemp;
    // clearOverlays();
    clearTempSection();
    $('.tab').removeClass('active');
    $(`.tab[data-tab="${strMode}"]`).addClass('active');
    if (strMode == 'dragging_mode') {
        $('#page').addClass('dragging_mode');
    } else {
        $('#page').removeClass('dragging_mode');

        if (strMode !== 'drawing_mode') {
            intCurrentlyDrawing = false;
            $(`[data-key]`).removeClass('selected');

        }
    }

    if (strMode == 'selection_mode') {
        // objContainer_Wrapper.interactiveChildren = true;

        generateTempSection();
    } else {
        // objContainer_Wrapper.interactiveChildren = false;
    }
}

function checkTileHasCollision(objSelection, bolUseDiggableGrid = true) {
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

function generateTempSection(objSection = false, objCellCoord = false) {
    console.log('generate')

    const intSoilIndex = getIndexBySpriteKey('tile_soil');
    const intWetSoilIndex = getIndexBySpriteKey('tile_soil_wet');
    const intCurrentlyDrawingSoil = objMistriaDataPlanner.options.has('mode_wet') ? intWetSoilIndex : intSoilIndex;

    let objSize = {}
    if (!objSection) {
        objSize = { x: 1, y: 1 };
    } else {
        objSize = {
            x: objSection.x1 - objSection.x0,
            y: objSection.y1 - objSection.y0
        };
    }
    objGridCombined.cursor_corner = Array.from({ length: objSize.y }, () => Array.from({ length: objSize.x }, () => ({})))

    if (strMode === 'drawing_mode') {
        const arrSize = getSprite(intCurrentlyDrawing).meta.size;
        console.log(arrSize)
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
                    sprite.position.set(x * intGridCellSize, y * intGridCellSize);
                    sprite.zIndex = getZindexbySpriteIndex(intCurrentlyDrawing);
                    objGridCombined.cursor_corner[y][x][intCurrentlyDrawing] = { 'sprite': sprite }

                    if (objSpriteCategories.crops.includes(intCurrentlyDrawing)) {
                        const spriteSoil = getSprite(intSoilIndex, [0, 0, 0, 0, 0, 0, 0, 0]);
                        spriteSoil.position.set(x * intGridCellSize, y * intGridCellSize);
                        spriteSoil.zIndex = getZindexbySpriteIndex(intSoilIndex);

                        objGridCombined.cursor_corner[y][x][intSoilIndex] = { 'sprite': spriteSoil };

                        if (intCurrentlyDrawingSoil === intWetSoilIndex) {
                            const spriteSoilWet = getSprite(intWetSoilIndex, [0, 0, 0, 0, 0, 0, 0, 0]);
                            spriteSoilWet.position.set(x * intGridCellSize, y * intGridCellSize);
                            spriteSoilWet.zIndex = getZindexbySpriteIndex(intWetSoilIndex);

                            objGridCombined.cursor_corner[y][x][intWetSoilIndex] = { 'sprite': spriteSoilWet };
                        }
                    }

                    if (intCurrentlyDrawing === intWetSoilIndex) {
                        const spriteSoil = getSprite(intSoilIndex, [0, 0, 0, 0, 0, 0, 0, 0]);
                        spriteSoil.position.set(x * intGridCellSize, y * intGridCellSize);
                        spriteSoil.zIndex = getZindexbySpriteIndex(intSoilIndex);

                        objGridCombined.cursor_corner[y][x][intSoilIndex] = { 'sprite': spriteSoil };
                    }
                }
            }
        }
    } else if (strMode === 'selection_mode') {
        for (let y = 0; y < objSize.y; y++) {
            for (let x = 0; x < objSize.x; x++) {
            }
        }
    }

    drawPlanner(objSize, objTopCorner = { x: 0, y: 0 }, strGrid = 'cursor_corner', strContainer = 'cursor');

    if (objCellCoord !== false) {
        moveTempSection(objCellCoord);
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
function placeTempSection(objCellCoord) {

    const [objPosition, arrSize] = getSectionLocation(objCellCoord);

    const intGrassIndex = getIndexBySpriteKey('tile_grassautotile');
    const intSoilIndex = getIndexBySpriteKey('tile_soil');
    const intWetSoilIndex = getIndexBySpriteKey('tile_soil_wet');
    const intExtIndex = getIndexBySpriteKey('tile_main_exteriors');

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

            Object.keys(objCell).forEach(function (strItemKey) {
                const intItemKey = parseInt(strItemKey);
                const objSectionCell = { x0: objRealPosition.x, y0: objRealPosition.y, x1: objRealPosition.x + arrSize[0], y1: objRealPosition.y + arrSize[1] };

                if (!('coll' in objCell[intItemKey])) {

                    bolHasChanged = true;

                    const sprite = getSprite(intItemKey, [0, 0, 0, 0, 0, 0, 0, 0]);

                    sprite.eventMode = 'static';
                    sprite.on('pointerover', () => {
                        highlightSection({ x0: objRealPosition.x1, x1: objRealPosition.x, y0: objRealPosition.y1, y1: objRealPosition.y })
                    });
                    sprite.on('pointerleave', () => {
                        highlightSection({ x0: objRealPosition.x1, x1: objRealPosition.x, y0: objRealPosition.y1, y1: objRealPosition.y }, true)
                    });
                    const arrSize = sprite.meta.size;
                    sprite.position.set(objRealPosition.x * intGridCellSize, objRealPosition.y * intGridCellSize);
                    sprite.zIndex = getZindexbySpriteIndex(intItemKey);

                    //if placing soil, destroy other soil types
                    if (objSpriteCategories.soil.includes(intItemKey)) {
                        const objSectionCell = { x0: objRealPosition.x, y0: objRealPosition.y, x1: objRealPosition.x + arrSize[0], y1: objRealPosition.y + arrSize[1] };

                        let arrRemoveTiles = [];

                        //if placing soil, remove grass and ext
                        if ([intSoilIndex, intWetSoilIndex].includes(intItemKey)) {
                            arrRemoveTiles = [intGrassIndex, intExtIndex];
                        }

                        //if placing grass, remove soil and ext
                        if (intItemKey == intGrassIndex) {
                            arrRemoveTiles = [intExtIndex, intSoilIndex, intWetSoilIndex];
                        }

                        //if placing ext, remove soil and grass
                        if (intItemKey == intExtIndex) {
                            arrRemoveTiles = [intGrassIndex, intSoilIndex, intWetSoilIndex];
                        }

                        //change to clearCell?
                        arrRemoveTiles.forEach(function (intItemKeyTemp) {
                            if (intItemKeyTemp in objGridCombined.main_corner[objRealPosition.y][objRealPosition.x] && 'sprite' in objGridCombined.main_corner[objRealPosition.y][objRealPosition.x][intItemKeyTemp]) {
                                const spriteTemp = objGridCombined.main_corner[objRealPosition.y][objRealPosition.x][intItemKeyTemp].sprite;
                                if (spriteTemp.parent !== null) {
                                    spriteTemp.parent.removeChild(spriteTemp);
                                }
                            }
                            delete objGridCombined.main_corner[objRealPosition.y][objRealPosition.x][intItemKeyTemp];
                            for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                                for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                                    delete objGridCombined.main_extend[y1][x1][intItemKeyTemp];
                                }
                            }
                        })
                    }

                    //remove previous sprite if exists
                    if (intItemKey in objGridCombined.main_corner[objRealPosition.y][objRealPosition.x] && 'sprite' in objGridCombined.main_corner[objRealPosition.y][objRealPosition.x][intItemKey]) {
                        const spritePrev = objGridCombined.main_corner[objRealPosition.y][objRealPosition.x][intItemKey].sprite;
                        if (spritePrev.parent !== null) {
                            spritePrev.parent.removeChild(spritePrev);
                        }
                    }
                    objGridCombined.main_corner[objRealPosition.y][objRealPosition.x][intItemKey] = { 'sprite': sprite };

                    for (var y1 = objSectionCell.y0; y1 < objSectionCell.y1; y1++) {
                        for (var x1 = objSectionCell.x0; x1 < objSectionCell.x1; x1++) {
                            objGridCombined.main_extend[y1][x1][intItemKey] = { 'coord': [objRealPosition.x, objRealPosition.y] };
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
    }

    clearTempSection();
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
    const [objPosition, arrSize] = getSectionLocation(objCellCoord);
    objContainers['cursor'].position.set(objPosition.x * intGridCellSize, objPosition.y * intGridCellSize);
    updateTempCollisions(objPosition);
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
            Object.keys(objCell).forEach(function (strItemKey) {
                const intItemKey = parseInt(strItemKey);
                let sprite = objCell[intItemKey].sprite;
                const arrSize = sprite.meta.size;

                const objItemArea = {
                    x0: objRealPosition.x,
                    y0: objRealPosition.y,
                    x1: objRealPosition.x + arrSize[0] - 1,
                    y1: objRealPosition.y + arrSize[1] - 1
                }
                let bolHitsElement = false;
                if (checkTileHasCollision(objItemArea)) {
                    bolHitsElement = true;

                } else if (objRealPosition.x + arrSize[0] > objGrid.x || objRealPosition.y + arrSize[1] > objGrid.y) {
                    bolHitsElement = true;
                } else {
                    const arrGrid_CoveredSlice2D = slice2D(objGridCombined.main_extend, objItemArea.x0, objItemArea.x1, objItemArea.y0, objItemArea.y1);
                    let setGrid_CoveredSliceValues = new Set(arrGrid_CoveredSlice2D.flat().flat().flatMap(obj => Object.keys(obj)).map(strIndex => parseInt(strIndex)))
                    objSpriteCategories.soil.forEach(intItemIndex => setGrid_CoveredSliceValues.delete(intItemIndex));

                    if (objSpriteCategories.soil.includes(intItemKey)) {
                        //soil can be under anything, but if there are crops, it must be tilled soil
                        if ([1, 4].includes(intItemKey)) {
                            let arrGrid_CoveredSliceValues = [...setGrid_CoveredSliceValues].filter((intItemIndex) => (objSpriteCategories.crops.includes(intItemIndex)));
                            setGrid_CoveredSliceValues = new Set(arrGrid_CoveredSliceValues);
                            if (setGrid_CoveredSliceValues.size) {
                                bolHitsElement = true;
                            }
                        }
                    } else {
                        if (objSpriteCategories.depth_to_floor.includes(intItemKey)) {
                            //rugs and stuff can be under other elements, but can not hit other rugs
                            let arrGrid_CoveredSliceValues = [...setGrid_CoveredSliceValues].filter((intItemIndex) => (objSpriteCategories.depth_to_floor.includes(intItemIndex) || objSpriteCategories.crops.includes(intItemIndex)));
                            setGrid_CoveredSliceValues = new Set(arrGrid_CoveredSliceValues);
                        } else {
                            //elements can be over rugs
                            objSpriteCategories.depth_to_floor.forEach(intItemIndex => setGrid_CoveredSliceValues.delete(intItemIndex));
                        }
                        if (setGrid_CoveredSliceValues.size) {
                            bolHitsElement = true;
                        }
                    }
                }

                if (bolHitsElement && !('coll' in objCell[intItemKey]) ||
                    !bolHitsElement && ('coll' in objCell[intItemKey])) {
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

                    objGridCombined.cursor_corner[y][x][intItemKey] = { 'sprite': sprite };
                    if (bolHitsElement) {
                        objGridCombined.cursor_corner[y][x][intItemKey].coll = true;
                    }
                }
            });
        }
    }

    if (bolHasChanged) {
        drawPlanner(objSize, objTopCorner = { x: 0, y: 0 }, strGrid = 'cursor_corner', strContainer = 'cursor');
    }
}

function highlightSection(objSection, bolReverse = false) {


    if (strMode !== 'selection_mode') {
        return false;
    }

    // copy cell to temp selectionHovered, add outline filter and place directly on top



    // const intGrassIndex = getIndexBySpriteKey('tile_grassautotile');
    // console.log("jhi")
    // for (let y = objSection.y0; y <= objSection.y1; y++) {
    //     for (let x = objSection.x0; x <= objSection.x1; x++) {
    //         const objCell = objGridCombined.main_corner[y][x];
    //         Object.keys(objCell).forEach(function (strItemKey) {

    //             if (intGrassIndex === parseInt(strItemKey)) {
    //                 return;
    //             }
    //             const sprite = objGridCombined.main_corner[y][x][strItemKey].sprite;
    //             objContainers['ee'].removeChild(sprite);
    //             if (bolReverse) {
    //                 // sprite.filters = [];
    //             } else {
    //                 const outline = new PIXI.filters.OutlineFilter({
    //                     thickness: 3,
    //                     color: 0xff0000,
    //                     // quality: 0.5
    //                 });

    //                 // Apply it to the sprite
    //                 sprite.filters = [outline];
    //             }
    //             objContainers['ee'].addChild(sprite);
    //         });
    //     }
    // }

    // drawPlanner(objSize, objTopCorner = { x: objSection.x0, y: objSection.y1 });
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


    arrModes = ['mode_grid', 'mode_collision', 'mode_soil', 'mode_wet', 'mode_offseason', 'mode_byset']
    arrModes.forEach(function (strMode) {
        $(`#${strMode}`).prop('checked', false);
        $(`#${strMode}`).change(function () {
            let bolChecked = $(this).is(':checked');
            if (bolChecked) {
                $('#page').addClass(strMode);
                console.log(objMistriaDataPlanner.options)
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
            if (strMode === 'mode_offseason') {
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

    const objTabs = await (await fetch('json/tabs_planner.json')).json();
    const objItemsPlanner = await (await fetch('json/items_planner.json')).json();

    let $divDropdownSearch = $('<div>', { 'class': 'dropdown' });
    Object.entries(objTabs).forEach(([tabKey, tabData]) => {

        let $divDropdownSearchSection = $('<div>', { 'class': 'dropdown-section' });
        $divDropdownSearchSection.attr('data-tab-dropdown', tabKey)
        let $divDropdownSearchSectionHeader = $('<div>', { 'class': 'dropdown-item dropdown-section-item' });
        $divDropdownSearchSectionHeader.append(` 
                <div class="icon"><img src="images/${tabData.info.icon}"></div>
                <span class="dropdown-section-name">${tabData.info.name}</span>
            `);
        $divDropdownSearchSection.append($divDropdownSearchSectionHeader);
        let $divDropdownSearchSectionItems = $('<div>', { 'class': 'dropdown-section-items' });

        let $divDropdownWrapper = $('<div>', { 'class': 'dropdown_wrap', 'id': `tab_dropdown_${tabKey}` });
        $divDropdownWrapper.attr('data-tab-dropdown', tabKey)

        $divDropdownWrapper.append(` 
            <div class="tab button_item dropdown_button">
                <div class="icon">
                    <img src="images/${tabData.info.icon}">
                </div>
               <span class="dropdown-section-name">${tabData.info.name}</span>
            </div>
        `);
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

            categoryData.items.forEach(function (intIndex) {

                if (intIndex == 'divider') {
                    $divDropdownSectionItems.append(`<div class="divider"></div>`);
                    $divDropdownSection.append($divDropdownSectionItems);
                    return;
                }
                let strName;
                let strImage;
                let strItemKey = objItemKeyDict[intIndex][0];

                if (strItemKey in objItemsPlanner) {
                    strName = objItemsPlanner[strItemKey].name;
                    strImage = `images/${objItemsPlanner[strItemKey].img}.png`;
                } else if (strItemKey in objItems) {
                    strName = objItems[strItemKey].name;
                    strImage = `images/${categoryData.info.img_item_path}${strItemKey}.png`;
                } else {
                    // console.log(strItemKey);
                    return;
                }
                $divDropdownSectionItems.append(` 
                    <div class="dropdown-item dropdown-item-drawable" data-key="${intIndex}">
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
        const intItemKeySelected = parseInt($(this).attr('data-key'));
        updateCurrentlyDrawing(intItemKeySelected);
        // $('#page .dropdown').removeClass('searching');
        //   $('#page #search_items_wrapper').removeClass('searching');
    });

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
    tippy('#byset', {
        content: 'Show furniture items categorized by sets (Basic set, Bathroom Set...) instead of categories (Beds, Tables...)',
    });
    tippy('[data-tab="dragging_mode"]', {
        content: `<p style="text-align: center; font-size: 14px;" class="save_file">Drag map</p>
                  <p style="text-align: center;" class="save_file">You can also drag map with </br>scroll wheel in any other mode</p>`,
        allowHTML: true,
    });
    tippy('[mode="dragging_mode"]', {
        content: 'Drag map',
    });
    tippy('[mode="selection_mode"]', {
        content: 'Select item',
    });
    tippy('[mode="selection_area_mode"]', {
        content: 'Select area',
    });
    tippy('[mode="drawing_mode"]', {
        content: 'Drawing mode',
    });
    tippy('#undo', {
        content: 'Undo, up to 20 changes',
    });
    tippy('#redo', {
        content: 'Redo',
    });
    tippy('#save_image', {
        content: 'Save as image',
    });
    tippy('#upload_file', {
        content: 'Upload save file',
    });
    tippy('#delete', {
        content: 'Clear map',
    });
}

function openDonatePopup() {
    $('#popup_donate').show();
}
function openControlsPopup() {
    $('#popup_controls').show();
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
    calculateMultiplier();

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
        left: objMistriaDataPlanner.offsetCanvas.x * -(objMinimapSize.w * intMapScale) / (objGrid.x * intGridCellSize),
        top: objMistriaDataPlanner.offsetCanvas.y * -(objMinimapSize.h * intMapScale) / (objGrid.y * intGridCellSize)
    })

    $('#zoom_precent').html(objMistriaDataPlanner.zoom + '%')
}

function getTopLeftCornerCanvas(objCellCoord) {
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

        let objTopLeftCellCoord = getTopLeftCornerCanvas(objClickedCellCoord)

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

    saveDataPlanner(true, true);
    drawContainers(['main_corner']);
}
function prepareGridsForSaving() {
    objMistriaDataPlanner.layout[intSaveSlot].farm = {}
    for (let y = 0; y < objGridCombined.main_corner.length; y++) {
        for (let x = 0; x < objGridCombined.main_corner[0].length; x++) {

            const arrCurrentValues = objGridCombined.main_corner[y][x].map(item => item.itemIndex);
            arrCurrentValues.forEach((strItemKey) => {
                const intItemKey = parseInt(strItemKey);

                if (intItemKey === getIndexBySpriteKey('tile_grassautotile')) {
                    return;
                }

                if (!(intItemKey in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                    objMistriaDataPlanner.layout[intSaveSlot].farm[intItemKey] = []
                }
                objMistriaDataPlanner.layout[intSaveSlot].farm[intItemKey].push([x, y])
            });
        }
    }
}
function clearSection(objSection) {
    //needs to grab items that end in the cll as well, clear extend array..
}
function recalculateSectionNeighbors() {
}
function changeSeasonInGrids(bolOnlyCrops = false) {
    for (let y = 0; y < objGridCombined.main_corner.length; y++) {
        for (let x = 0; x < objGridCombined.main_corner[0].length; x++) {
            const objCurrentItems = objGridCombined.main_corner[y][x] || {};
            const arrCellItems = Object.keys(objCurrentItems).map(strIndex => parseInt(strIndex));

            if (arrCellItems.length) {
                arrCellItems.forEach(function (intItemIndex) {
                    if (bolOnlyCrops && !objSpriteCategories.crops.includes(intItemIndex)) {
                        //skip if not crop
                        return;
                    } else if (!bolOnlyCrops && objSpriteCategories.crops.includes(intItemIndex) && objMistriaDataPlanner.options.has('mode_offseason')) {
                        //skip if crop, but off seasonal ones are allowed
                        return;
                    } else if (0) { //TODO: skip if not seasonal sprite

                    }

                    const arrNeigbors = ('neigbors' in objGridCombined.main_corner[y][x][intItemIndex] ? objGridCombined.main_corner[y][x][intItemIndex].neigbors : [0, 0, 0, 0, 0, 0, 0, 0])

                    let sprite = objGridCombined.main_corner[y][x][intItemIndex].sprite

                    objContainers['ee'].removeChild(sprite);

                    sprite = getSprite(intItemIndex, arrNeigbors);
                    sprite.eventMode = 'static';
                    sprite.on('pointerover', () => {
                        highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY })
                    });
                    sprite.on('pointerleave', () => {
                        highlightSection({ x0: tempX, x1: tempX, y0: tempY, y1: tempY }, true)
                    });

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

    const objFarmLayout = objMistriaDataPlanner.layout[intSaveSlot].farm;
    let setItems = new Set();
    let objNeighbors = {};
    objGridCombined.main_corner = Array.from({ length: objGrid.y }, () =>
        Array.from({ length: objGrid.x }, () => ({}))
    );
    objGridCombined.main_extend = Array.from({ length: objGrid.y }, () =>
        Array.from({ length: objGrid.x }, () => ({}))
    );
    // objGridCombined.rules = Array.from({ length: objGrid.y }, () =>
    //     Array.from({ length: objGrid.x }, () => ({}))
    // );

    Object.keys(objFarmLayout).forEach(function (strItemKey) {
        const intItemKey = parseInt(strItemKey);
        setItems.add(intItemKey)
        const sprite = getSprite(intItemKey);
        const arrSize = sprite.meta.size;

        objFarmLayout[intItemKey].forEach((arrCoord) => {
            const x = arrCoord[0];
            const y = arrCoord[1];

            objGridCombined.main_corner[y][x][intItemKey] = {};
            const objSection = {
                x0: x,
                x1: x + arrSize[0],
                y0: y,
                y1: y + arrSize[1],
            }
            for (var y1 = objSection.y0; y1 < objSection.y1; y1++) {
                for (var x1 = objSection.x0; x1 < objSection.x1; x1++) {
                    objGridCombined.main_extend[y1][x1][intItemKey] = { 'coord': [x, y] };
                }
            }
        });
    });


    const arrItems = [...setItems];

    const intGrassIndex = getIndexBySpriteKey('tile_grassautotile');
    const arrSeenFences = getCommonElements(arrItems, objSpriteCategories.fences)
    const arrSeenGround = getCommonElements(arrItems, objSpriteCategories.soil)
    const arrSeenCounters = getCommonElements(arrItems, objSpriteCategories.counter)

    const arrNeighborItems = [...arrSeenGround, ...arrSeenFences, ...arrSeenCounters];
    arrNeighborItems.push(intGrassIndex);

    arrNeighborItems.forEach((intIdx) => {
        objNeighbors[intIdx] = convertGridToNeighbours(intIdx);
    });

    for (let y = 0; y < objGridCombined.main_corner.length; y++) {
        for (let x = 0; x < objGridCombined.main_corner[0].length; x++) {

            const objCurrentItems = objGridCombined.main_corner[y][x] || {};
            const arrCellItems = Object.keys(objCurrentItems).map(strIndex => parseInt(strIndex));

            // wont draw default fences then
            // if (checkTileHasCollision({ x0: x, y0: y, x1: x + 1, y1: y + 1 })) {
            //     if (arrCellItems.length) {
            //         console.log(arrCellItems)
            //     }
            //     continue;
            // }

            if (arrCellItems.length) {
                arrCellItems.forEach(function (intItemIndex) {
                    // const intItemIndex = parseInt(strItemIndex);
                    const arrNeigbors = (intItemIndex in objNeighbors ? objNeighbors[intItemIndex][y][x] : [0, 0, 0, 0, 0, 0, 0, 0])
                    const sprite = getSprite(intItemIndex, arrNeigbors);
                    sprite.eventMode = 'static';
                    sprite.on('pointerover', () => {
                        highlightSection({ x0: x, x1: x, y0: y, y1: y })
                    });
                    sprite.on('pointerleave', () => {
                        highlightSection({ x0: x, x1: x, y0: y, y1: y }, true)
                    });

                    sprite.position.set(x * intGridCellSize, y * intGridCellSize);
                    sprite.zIndex = getZindexbySpriteIndex(intItemIndex);
                    objGridCombined.main_corner[y][x][intItemIndex].sprite = sprite;
                    objGridCombined.main_corner[y][x][intItemIndex].neigbors = arrNeigbors;
                });
            }

            //add grass item
            if (!hasCommonElement(arrCellItems, [getIndexBySpriteKey('tile_main_exteriors'), getIndexBySpriteKey('tile_soil'), getIndexBySpriteKey('tile_soil_wet')]) && objNeighbors[intGrassIndex][y][x].includes(1)) {
                const arrNeigbors = objNeighbors[intGrassIndex][y][x];
                const sprite = getSprite(intGrassIndex, arrNeigbors);
                sprite.eventMode = 'static';
                sprite.on('pointerover', () => {
                    highlightSection({ x0: x, x1: x, y0: y, y1: y })
                });
                sprite.on('pointerleave', () => {
                    highlightSection({ x0: x, x1: x, y0: y, y1: y }, true)
                });

                sprite.position.set(x * intGridCellSize, y * intGridCellSize);
                sprite.zIndex =  getZindexbySpriteIndex(intGrassIndex);
                objGridCombined.main_corner[y][x][intGrassIndex] = { 'sprite': sprite, 'neigbors': arrNeigbors };
            }
        }
    }
}

function loadDataPlanner(bolUpdateGrids = false, bolVersionChange = false) {

    objMistriaDataPlanner = JSON.parse(localStorage.getItem('mistria_data_planner'));

    if (objMistriaDataPlanner === null) {
        objMistriaDataPlanner = objMistriaDataPlannerDefault;
    }

    arrVersions = [objMistriaDataPlanner.layout[intSaveSlot].farm]
    intCurrentVersion = 0;

    // if (bolUpdateGrids) {
    //     if (!bolVersionChange) {
    //         //if current version is not latest, split array
    //         if (intCurrentVersion < arrVersions.length - 1) {
    //             arrVersions = arrVersions.slice(0, intCurrentVersion + 1);
    //         }

    //         arrVersions.push(JSON.parse(JSON.stringify(objMistriaDataPlanner.layout[intSaveSlot].farm)));
    //         if (arrVersions.length > intAllowedVersions) {
    //             arrVersions.shift();
    //         }

    //         intCurrentVersion = arrVersions.length - 1;
    //     }

    //     $('#undo').addClass('disabled');
    //     $('#redo').addClass('disabled');

    //     if (intCurrentVersion) {
    //         $('#undo').removeClass('disabled');
    //     }

    //     if (intCurrentVersion < arrVersions.length - 1) {
    //         $('#redo').removeClass('disabled');
    //     }
    // }
    // $('#delete').removeClass('disabled');


    //     const objFarmLayout = objMistriaDataPlanner.layout[intSaveSlot].farm;

    //     console.log(objFarmLayout)
    //     Object.keys(objFarmLayout).forEach(function (strItemKey) {
    //         const intItemKey = parseInt(strItemKey);
    //         let arrTemp = [...Array(objGrid.y)].map(e => Array(objGrid.x));
    //         objFarmLayout[intItemKey].forEach(function (arrTileCoord) {
    //             const x = arrTileCoord[0];
    //             const y = arrTileCoord[1];
    //             arrTemp[y][x] = intItemKey;
    //         });
    //         objMistriaDataPlanner.layout[intSaveSlot].farm[intItemKey] = arrTemp;
    //     });
    //  console.log( objMistriaDataPlanner.layout[intSaveSlot].farm)
    objMistriaDataPlanner.zoom = parseInt(objMistriaDataPlanner.zoom);

    // convert arrays to sets for to remove duplicates 

    objMistriaDataPlanner.options = ('options' in objMistriaDataPlanner ? new Set(objMistriaDataPlanner.options) : new Set(objMistriaDataPlannerDefault.options));
    populateItemGrids(bolUpdateGrids);
}

function saveDataPlanner(bolUpdateGrids = false, bolVersionChange = false) {

    // convert to array since JSON.stringify does not work on sets
    objMistriaDataPlanner.options = [...objMistriaDataPlanner.options];

    // objMistriaDataPlanner.layout[intSaveSlot].farm = arrVersions[intCurrentVersion];

    localStorage.setItem('mistria_data_planner', JSON.stringify(objMistriaDataPlanner));
    objMistriaDataPlanner.options = ('options' in objMistriaDataPlanner ? new Set(objMistriaDataPlanner.options) : new Set(objMistriaDataPlannerDefault.options));

    // loadDataPlanner(bolUpdateGrids, bolVersionChange);
}

function clearMap() {
    if ($(`#delete`).hasClass('disabled')) {
        return;
    }

    // convert to array since JSON.stringify does not work on sets
    objMistriaDataPlanner.options = [...objMistriaDataPlanner.options];

    objMistriaDataPlanner.layout[intSaveSlot].farm = objMistriaDataPlannerDefault.layout[intSaveSlot].farm;

    // do not draw default dugged up patch anymore
    // delete objMistriaDataPlanner.layout[intSaveSlot].farm[1];

    localStorage.setItem('mistria_data_planner', JSON.stringify(objMistriaDataPlanner));
    loadDataPlanner(true);

    drawContainers(['main_corner']);
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
    resize();
    objPIXIapp.resize();
}
const handleResizeThrottled = throttle(handleResize, 250);
const resizeObserver = new ResizeObserver((entries) => {
    handleResizeThrottled();
});

$(function () {
    (async () => {

        objItemKeyDict = await (await fetch('textures/dict.json')).json();
        objSpriteCategories = await (await fetch('textures/categories.json')).json();
        objZindexDict =  await (await fetch('textures/zindexes.json')).json();

        arrGrid_Collision = await (await fetch('textures/collision.json')).json();
        arrCollisionUpgradeGrid = await (await fetch('textures/collision_houseupgrade.json')).json();
        arrGrid_Diggable = await (await fetch('textures/diggable.json')).json();

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

        loadDataPlanner(true);
        loadMenuItems();
        minimapInit();

        objPIXIapp.stage.eventMode = 'static';
        objPIXIapp.stage.hitArea = objPIXIapp.screen;

        objPIXIapp.sortableChildren = true;
        objContainer_Wrapper.interactiveChildren = false;


        $(document).keyup(function (e) {

            if (e.key === "Escape") {
                resetDrawingVariables();
                objSelectionSection = false;
                clearOverlays();

                //will need to be updated if there are highligt effects
                updateGrid(objPrevCellCoord, true);
            } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'z' || e.key === 'Z')) {
                versionControl('redo');
            } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
                versionControl('redo');
            } else if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
                versionControl('undo');
            }
        });

        document.addEventListener('mousedown', (e) => {
            if (e.button === 2 && (e.buttons & 1) && bolIsDragging && (strMode === 'drawing_mode' || strMode === 'selection_area_mode')) {
                resetDrawingVariables();
                bolPreventDrawing = true;
                // objSelectionSection = false;
                // clearOverlays();

                console.log('bolPreventDrawing')
                if (objGridCombined.cursor_corner !== false) {
                    clearTempSection();

                    if (strMode === 'drawing_mode') {
                        generateTempSection();
                    }
                }
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

            if (e.data.originalEvent.button === 0 && selectionHovered(objStartCellCoord)) {  // left click
                bolIsDraggingSection = true;
            } else if (e.data.originalEvent.button === 0 && itemHovered(objStartCellCoord)) {  // left click
                bolIsDraggingItem = true;
            } else if (e.data.originalEvent.button === 0 || e.data.originalEvent.button === 1) {  // left click or middle
                bolIsDragging = true;
                if (e.data.originalEvent.button === 1) {
                    bolPreventDrawing = true;
                }
            } else {
                bolPreventDrawing = true;
            }
        });

        objPIXIapp.stage.on('pointermove', (e) => {
            const objCurrentCellCoord = getClickedCell(e);
            const buttons = e.data.originalEvent.buttons;
            if (buttons === 4 || strMode === 'dragging_mode') { // dragging with middle button or drag mode activated
                dragMap(objCurrentCellCoord);
            } else {
                if (objGridCombined.cursor_corner !== false) {
                    if ((bolIsDragging && !bolPreventDrawing) || strMode == "selection_mode") {

                        const objSelection = getSelection(objCurrentCellCoord);

                        if (objPrevCellCoord.x === objCurrentCellCoord.x && objPrevCellCoord.y === objCurrentCellCoord.y) {
                            objPrevCellCoord = objCurrentCellCoord;
                            return;
                        }
                        objPrevCellCoord = objCurrentCellCoord;

                        clearTempSection();
                        generateTempSection(objSelection, objCurrentCellCoord);
                        // console.log(objSelection)
                    }
                    else {
                        moveTempSection(objCurrentCellCoord);
                    }
                }

                // updateGrid(objCurrentCellCoord);

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
            } else {
                if (!bolPreventDrawing && objGridCombined.cursor_corner !== false) {

                    placeTempSection(objCurrentCellCoord);
                    // objSelectionSection = false;
                    // clearOverlays();
                    // if (objGridCombined.cursor_corner !== false) {
                    //     clearTempSection();
                    //     generateTempSection();

                    //     console.log('clear,', objGridCombined.cursor_corner)
                    // }
                }
                // updateGrid(objCurrentCellCoord, true);
            }

            resetDrawingVariables();
        });

        objPIXIapp.stage.on('pointerupoutside', (e) => {
            resetDrawingVariables();
        });

        objPIXIapp.stage.on('wheel', (e) => {
            const intMultiplierFit = getMultiplierFitScreen();
            const intMultiplierZoomMax = (3 / intMultiplierFit) * 100;

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
            // let objTopLeftCellCoord = getTopLeftCornerCanvas(objCurrentCellCoord)

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
        drawGrassFix();

        drawGrid();
        drawCollision();

        addTestData(4);
        updateCurrentlyDrawing(416);

        drawPlanner();

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
        }, 150);

    })();

});