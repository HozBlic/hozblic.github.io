let intSaveSlot = 0;
let objMistriaDataPlanner;
let objMistriaDataPlannerDefault = {
    'season': 'spring',
    'house_upgrade': 0,
    'zoom': 100,
    'offsetCanvas': { x: 0, y: 0 },
    'options': ['mode_grid', 'mode_collision'], // mode_wet, mode_offseason
    'layout': {
        0: {
            'farm': {
                1: [[94, 46], [96, 46], [98, 46], [100, 46], [102, 46], [104, 46], [106, 46], [92, 48], [94, 48], [96, 48], [98, 48], [100, 48], [102, 48], [104, 48], [106, 48], [108, 48], [92, 50], [94, 50], [96, 50], [98, 50], [100, 50], [102, 50], [104, 50], [106, 50], [108, 50], [92, 52], [94, 52], [96, 52], [98, 52], [100, 52], [102, 52], [104, 52], [106, 52], [108, 52], [92, 54], [94, 54], [96, 54], [98, 54], [100, 54], [102, 54], [104, 54], [106, 54], [108, 54], [92, 56], [94, 56], [96, 56], [98, 56], [100, 56], [102, 56], [104, 56], [106, 56], [108, 56], [94, 58], [96, 58], [98, 58], [100, 58], [102, 58], [104, 58], [106, 58], [128, 26], [126, 28], [128, 28], [130, 28], [124, 30], [126, 30], [128, 30], [122, 32], [124, 32], [126, 32], [124, 34]],
                5: [[180, 24], [256, 24], [180, 26], [256, 26], [18, 28], [180, 28], [256, 28], [18, 30], [180, 30], [256, 30], [18, 32], [180, 32], [256, 32], [18, 34], [180, 34], [256, 34], [18, 36], [180, 36], [256, 36], [18, 38], [178, 38], [180, 38], [256, 38], [18, 40], [178, 40], [256, 40], [18, 42], [178, 42], [256, 42], [0, 44], [2, 44], [4, 44], [6, 44], [8, 44], [10, 44], [12, 44], [14, 44], [16, 44], [18, 44], [178, 44], [256, 44], [178, 46], [256, 46], [178, 48], [180, 48], [256, 48], [180, 50], [256, 50], [180, 52], [256, 52], [0, 54], [2, 54], [4, 54], [6, 54], [8, 54], [10, 54], [12, 54], [14, 54], [16, 54], [18, 54], [180, 54], [256, 54], [18, 56], [180, 56], [256, 56], [18, 58], [180, 58], [256, 58], [18, 60], [180, 60], [256, 60], [18, 62], [180, 62], [256, 62], [18, 64], [180, 64], [256, 64], [18, 66], [180, 66], [256, 66], [18, 68], [180, 68], [182, 68], [256, 68], [18, 70], [182, 70], [256, 70], [18, 72], [182, 72], [256, 72], [18, 74], [182, 74], [256, 74], [18, 76], [182, 76], [256, 76], [18, 78], [182, 78], [256, 78], [18, 80], [182, 80], [256, 80], [18, 82], [182, 82], [256, 82], [18, 84], [182, 84], [256, 84], [18, 86], [182, 86], [256, 86], [18, 88], [182, 88], [256, 88], [18, 90], [182, 90], [256, 90], [18, 92], [182, 92], [256, 92], [18, 94], [182, 94], [256, 94], [18, 96], [182, 96], [256, 96], [18, 98], [182, 98], [256, 98], [18, 100], [182, 100], [256, 100], [18, 102], [182, 102], [256, 102], [18, 104], [182, 104], [256, 104], [18, 106], [182, 106], [256, 106], [18, 108], [180, 108], [182, 108], [256, 108], [18, 110], [180, 110], [256, 110], [18, 112], [180, 112], [256, 112], [18, 114], [180, 114], [204, 114], [206, 114], [208, 114], [210, 114], [212, 114], [214, 114], [216, 114], [218, 114], [220, 114], [222, 114], [224, 114], [226, 114], [228, 114], [230, 114], [256, 114], [2, 116], [4, 116], [6, 116], [8, 116], [10, 116], [12, 116], [14, 116], [16, 116], [18, 116], [180, 116], [182, 116], [184, 116], [186, 116], [188, 116], [190, 116], [192, 116], [194, 116], [196, 116], [198, 116], [200, 116], [202, 116], [204, 116], [230, 116], [232, 116], [234, 116], [236, 116], [238, 116], [240, 116], [242, 116], [244, 116], [246, 116], [248, 116], [250, 116], [252, 116], [254, 116], [256, 116], [258, 116], [260, 116], [262, 116], [264, 116], [266, 116], [268, 116], [270, 116], [272, 116], [22, 130], [24, 130], [26, 130], [28, 130], [30, 130], [32, 130], [34, 130], [36, 130], [38, 130], [40, 130], [210, 130], [212, 130], [214, 130], [216, 130], [218, 130], [220, 130], [222, 130], [224, 130], [2, 132], [4, 132], [6, 132], [8, 132], [10, 132], [12, 132], [14, 132], [16, 132], [18, 132], [20, 132], [22, 132], [40, 132], [42, 132], [44, 132], [46, 132], [48, 132], [50, 132], [52, 132], [54, 132], [56, 132], [58, 132], [60, 132], [62, 132], [64, 132], [66, 132], [68, 132], [70, 132], [72, 132], [74, 132], [76, 132], [78, 132], [80, 132], [120, 132], [122, 132], [124, 132], [126, 132], [128, 132], [130, 132], [146, 132], [148, 132], [150, 132], [152, 132], [154, 132], [156, 132], [158, 132], [160, 132], [162, 132], [164, 132], [166, 132], [168, 132], [170, 132], [172, 132], [174, 132], [176, 132], [178, 132], [180, 132], [182, 132], [184, 132], [186, 132], [188, 132], [190, 132], [192, 132], [194, 132], [196, 132], [198, 132], [200, 132], [202, 132], [204, 132], [206, 132], [208, 132], [210, 132], [224, 132], [226, 132], [228, 132], [230, 132], [232, 132], [234, 132], [236, 132], [238, 132], [240, 132], [242, 132], [244, 132], [246, 132], [248, 132], [250, 132], [252, 132], [254, 132], [256, 132], [258, 132], [260, 132], [262, 132], [264, 132], [266, 132], [268, 132], [270, 132], [272, 132], [18, 134], [80, 134], [82, 134], [84, 134], [86, 134], [88, 134], [90, 134], [112, 134], [114, 134], [116, 134], [118, 134], [120, 134], [130, 134], [146, 134], [256, 134], [18, 136], [90, 136], [92, 136], [94, 136], [96, 136], [98, 136], [100, 136], [102, 136], [104, 136], [106, 136], [108, 136], [110, 136], [112, 136], [130, 136], [146, 136], [256, 136], [18, 138], [130, 138], [146, 138], [256, 138], [18, 140], [130, 140], [146, 140], [256, 140], [18, 142], [130, 142], [146, 142], [256, 142], [18, 144], [130, 144], [146, 144], [256, 144], [18, 146], [130, 146], [146, 146], [256, 146], [18, 148], [130, 148], [146, 148], [256, 148], [18, 150], [130, 150], [146, 150], [256, 150], [18, 152], [130, 152], [146, 152], [256, 152], [18, 154], [130, 154], [146, 154], [256, 154], [18, 156], [130, 156], [146, 156], [256, 156], [18, 158], [130, 158], [146, 158], [256, 158], [18, 160], [130, 160], [146, 160], [256, 160], [18, 162], [130, 162], [146, 162], [256, 162], [18, 164], [130, 164], [146, 164], [256, 164], [18, 166], [130, 166], [146, 166], [256, 166], [18, 168], [130, 168], [146, 168], [256, 168], [18, 170], [130, 170], [146, 170], [256, 170], [18, 172], [130, 172], [146, 172], [256, 172], [18, 174], [130, 174], [146, 174], [256, 174], [18, 176], [130, 176], [146, 176], [256, 176], [18, 178], [130, 178], [146, 178], [256, 178], [18, 180], [130, 180], [146, 180], [256, 180], [18, 182], [20, 182], [22, 182], [24, 182], [26, 182], [28, 182], [30, 182], [32, 182], [34, 182], [36, 182], [38, 182], [40, 182], [42, 182], [44, 182], [46, 182], [48, 182], [50, 182], [52, 182], [54, 182], [56, 182], [58, 182], [60, 182], [62, 182], [64, 182], [66, 182], [68, 182], [70, 182], [72, 182], [74, 182], [76, 182], [78, 182], [80, 182], [82, 182], [84, 182], [86, 182], [88, 182], [90, 182], [92, 182], [94, 182], [96, 182], [98, 182], [100, 182], [102, 182], [104, 182], [106, 182], [108, 182], [110, 182], [112, 182], [114, 182], [116, 182], [118, 182], [120, 182], [122, 182], [124, 182], [126, 182], [128, 182], [130, 182], [146, 182], [148, 182], [150, 182], [152, 182], [154, 182], [156, 182], [158, 182], [160, 182], [162, 182], [164, 182], [166, 182], [168, 182], [170, 182], [172, 182], [174, 182], [176, 182], [178, 182], [180, 182], [182, 182], [184, 182], [186, 182], [188, 182], [190, 182], [192, 182], [194, 182], [196, 182], [198, 182], [200, 182], [202, 182], [204, 182], [206, 182], [208, 182], [210, 182], [212, 182], [214, 182], [216, 182], [218, 182], [220, 182], [222, 182], [224, 182], [226, 182], [228, 182], [230, 182], [232, 182], [234, 182], [236, 182], [238, 182], [240, 182], [242, 182], [244, 182], [246, 182], [248, 182], [250, 182], [252, 182], [254, 182], [256, 182]],
                6: [[124, 0], [124, 2], [124, 4], [124, 6], [124, 8], [124, 10], [124, 12], [132, 0], [132, 2], [132, 4], [132, 6], [132, 8], [132, 10], [132, 12]],
            }
        }
    }
}

let arrVersions = [];
let intCurrentVersion = 0;
const intAllowedVersions = 10;
let strMode = 'dragging_mode'; // drawing_mode, selection_mode
let intCurrentlyDrawing = false;
let bolIsDragging = false;
let bolIsDraggingMap = false;
let bolIsDraggingSection = false;

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

let objStartCellCoord = { x: 0, y: 0 };
let objStartOffset = { x: 0, y: 0 };
let objPrevCellCoord = { x: 0, y: 0 };
let objSelectionSection = false
let intMultiplierCanvas = 1;

let objSpriteKeyDict = null;
let arrGrid_Collision = null;
let arrGrid_Diggable = null;
let arrGrassFixCoord = [[94, 46], [96, 46], [98, 46], [100, 46], [102, 46], [104, 46], [106, 46], [92, 48], [94, 48], [96, 48], [98, 48], [100, 48], [102, 48], [104, 48], [106, 48], [108, 48], [92, 50], [94, 50], [96, 50], [98, 50], [100, 50], [102, 50], [104, 50], [106, 50], [108, 50], [92, 52], [94, 52], [96, 52], [98, 52], [100, 52], [102, 52], [104, 52], [106, 52], [108, 52], [92, 54], [94, 54], [96, 54], [98, 54], [100, 54], [102, 54], [104, 54], [106, 54], [108, 54], [92, 56], [94, 56], [96, 56], [98, 56], [100, 56], [102, 56], [104, 56], [106, 56], [108, 56], [94, 58], [96, 58], [98, 58], [100, 58], [102, 58], [104, 58], [106, 58], [126, 24], [128, 24], [130, 24], [124, 26], [126, 26], [128, 26], [130, 26], [132, 26], [122, 28], [124, 28], [126, 28], [128, 28], [130, 28], [132, 28], [120, 30], [122, 30], [124, 30], [126, 30], [128, 30], [130, 30], [132, 30], [120, 32], [122, 32], [124, 32], [126, 32], [128, 32], [130, 32], [120, 34], [122, 34], [124, 34], [126, 34], [128, 34], [122, 36], [124, 36], [126, 36]];

let objPlannerDiv;
let objPIXIapp;
let sprites = null;
let objGraphics_Grid = null;
let objGraphics_subGrid = null;
let objContainer_Wrapper = null;

let objGridCombined = {
    'main': Array.from({ length: objGrid.y }, () => Array.from({ length: objGrid.x }, () => [])),
    'move': false,
    'cursor': Array.from({ length: objGrid.y }, () => Array.from({ length: objGrid.x }, () => [])),
    'rules': Array.from({ length: objGrid.y }, () => Array.from({ length: objGrid.x }, () => ({}))),
    'main_extend': Array.from({ length: objGrid.y }, () => Array.from({ length: objGrid.x }, () => [])),
}

let objGridCombinedPrev = {
    'main': Array.from({ length: objGrid.y }, () => Array.from({ length: objGrid.x }, () => [])),
    'move': false,
    'cursor': Array.from({ length: objGrid.y }, () => Array.from({ length: objGrid.x }, () => [])),
}

let objContainers = {
    'background': null,
    'grassFix': null,
    'collision': null,
    'ground': null,
    'soil': null,
    'soilWet': null,
    'grass': null,
    'rug': null,
    'grid': null,
    'fences': null,
    'crops': null,
    'cursor': null,
    'selection': null,

}
const arrGroundContainers = ['ground', 'soil', 'soilWet', 'grass'];
const objZindexes = {
    'background': 0,
    'grassFix': 1,
    'ground': 2,
    'soil': 3,
    'soilWet': 4,
    'grass': 5,
   
    'collision': 7,
    'grid': 8,
     'rug': 9,
    'fences': 10,
    'crops': 11,
    'cursor': 98,
    'selection': 97,
}

function addTestData(intTest) {
    switch (intTest) {
        case 1: //add test soil in front of the house
            var intRows = 7;
            var intColumns = 9;

            var intStartX = 46;
            var intStartY = 23;

            var intCurrentlyDrawingSoil = objMistriaDataPlanner.options.has('mode_wet') ? 3 : 2;
            if (!(intCurrentlyDrawingSoil in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingSoil] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
            }
            if (intCurrentlyDrawingSoil === 3) {
                if (!(2 in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                    objMistriaDataPlanner.layout[intSaveSlot].farm[2] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
                }
            }


            var intCurrentlyDrawingTemp = objSpriteKeyDict['snow_peas'];
            if (!(intCurrentlyDrawingTemp in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
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
                            objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp][intStartY * 2 + y * 2][intStartX * 2 + x * 2] = 1;
                            objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingSoil][intStartY * 2 + y * 2][intStartX * 2 + x * 2] = 1;
                            objMistriaDataPlanner.layout[intSaveSlot].farm[2][intStartY * 2 + y * 2][intStartX * 2 + x * 2] = 1;
                            break;
                    }
                }
            }
            break;
        case 2: //add test soil top left corner
            var intRows = 7;
            var intColumns = 9

            var intStartX = 11;
            var intStartY = 14;

            var intCurrentlyDrawingSoil = objMistriaDataPlanner.options.has('mode_wet') ? 3 : 2;
            if (!(intCurrentlyDrawingSoil in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingSoil] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
            }
            if (intCurrentlyDrawingSoil === 3) {
                if (!(2 in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                    objMistriaDataPlanner.layout[intSaveSlot].farm[2] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
                }
            }

            var intCurrentlyDrawingTemp = objSpriteKeyDict['snow_peas'];
            if (!(intCurrentlyDrawingTemp in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
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
                            objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp][intStartY * 2 + y * 2][intStartX * 2 + x * 2] = 1;
                            objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingSoil][intStartY * 2 + y * 2][intStartX * 2 + x * 2] = 1;
                            objMistriaDataPlanner.layout[intSaveSlot].farm[2][intStartY * 2 + y * 2][intStartX * 2 + x * 2] = 1;
                            break;
                    }
                }
            }
            break;
        case 3: //add patch of peas and tea
            var intRows = 2;
            var intColumns = 2

            var intStartX = 11;
            var intStartY = 14;

            var intCurrentlyDrawingSoil = objMistriaDataPlanner.options.has('mode_wet') ? 3 : 2;
            if (!(intCurrentlyDrawingSoil in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingSoil] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
            }
            if (intCurrentlyDrawingSoil === 3) {
                if (!(2 in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                    objMistriaDataPlanner.layout[intSaveSlot].farm[2] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
                }
            }

            var intCurrentlyDrawingTemp = objSpriteKeyDict['snow_peas'];
            if (!(intCurrentlyDrawingTemp in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
            }

            for (let y = 0; y < intRows; y++) {
                for (let x = 0; x < intColumns; x++) {
                    objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp][intStartY * 2 + y * 2][intStartX * 2 + x * 2] = 1;
                    objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingSoil][intStartY * 2 + y * 2][intStartX * 2 + x * 2] = 1;
                    objMistriaDataPlanner.layout[intSaveSlot].farm[2][intStartY * 2 + y * 2][intStartX * 2 + x * 2] = 1;
                }
            }

            intStartX = 14;
            intCurrentlyDrawingTemp = objSpriteKeyDict['tea'];
            if (!(intCurrentlyDrawingTemp in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
            }

            for (let y = 0; y < intRows; y++) {
                for (let x = 0; x < intColumns; x++) {
                    objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp][intStartY * 2 + y * 2][intStartX * 2 + x * 2] = 1;
                    objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingSoil][intStartY * 2 + y * 2][intStartX * 2 + x * 2] = 1;
                    objMistriaDataPlanner.layout[intSaveSlot].farm[2][intStartY * 2 + y * 2][intStartX * 2 + x * 2] = 1;
                }
            }

            break;
        case 4: //add all crops
            let arrCrops = [...objSpriteCategories.crops];
            arrCrops = arrCrops.reverse();
            let intCropsSide = Math.round(Math.sqrt(arrCrops.length)) * 2 + 1;

            var intCurrentlyDrawingSoil = objMistriaDataPlanner.options.has('mode_wet') ? 3 : 2;
            if (!(intCurrentlyDrawingSoil in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingSoil] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
            }
            if (intCurrentlyDrawingSoil === 3) {
                if (!(2 in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                    objMistriaDataPlanner.layout[intSaveSlot].farm[2] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
                }
            }

            var intStartX = 11;
            var intStartY = 14;

            for (let y = 0; y < intCropsSide; y = y + 2) {
                for (let x = 0; x < intCropsSide; x = x + 2) {
                    if (arrCrops.length) {
                        let intCurrentlyDrawingTemp = arrCrops.pop();

                        //should remove crop from the area..

                        if (!(intCurrentlyDrawingTemp in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                            objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
                        }
                        objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp][intStartY * 2 + y * 2][intStartX * 2 + x * 2] = 1;
                        objMistriaDataPlanner.layout[intSaveSlot].farm[2][intStartY * 2 + y * 2][intStartX * 2 + x * 2] = 1;
                        objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingSoil][intStartY * 2 + y * 2][intStartX * 2 + x * 2] = 1;
                    }
                }
            }

            break;
    }
    populateItemGrids(true);
}

const hasCommonElement = (arr1, arr2) => arr1.some(v => arr2.indexOf(v) !== -1);
const getCommonElements = (arr1, arr2) => arr1.filter(v => arr2.includes(v));
function convertGridToNeighbours(intItemIndex = null) {
    //clockwise NOT
    const directions = [
        [-1, -1], [0, -1], [1, -1],
        [-1, 0], [1, 0],
        [-1, 1], [0, 1], [1, 1]
    ];
    const bolTwosOnly = (objSpriteCategories.soil.includes(intItemIndex) || objSpriteCategories.crops.includes(intItemIndex) || objSpriteCategories.fences.includes(intItemIndex)) ? true : false;

    let arrNeighbourGrid = [];
    for (let row = 0; row < objGridCombined.main.length; row++) {
        let arrNeighbourGrid_row = [];

        if (bolTwosOnly && row % 2) {
            //skip this row
            arrNeighbourGrid.push([...Array(objGrid.x)].map(e => Array(8).fill(0)));
            continue;
        }
        for (let col = 0; col < objGridCombined.main[0].length; col++) {

            if (bolTwosOnly && col % 2) {
                //skip this column
                arrNeighbourGrid_row.push(Array(8).fill(0))
                continue;
            }

            let arrNeighbourGrid_current = [];

            directions.forEach(([dx, dy]) => {
                const newRow = row + (dy * 2); //item size instead of 2?
                const newCol = col + (dx * 2);

                const arrCurrentValues = objGridCombined.main[newRow]?.[newCol] || [];

                switch (intItemIndex) {
                    case 2:
                        //checking for tilled soil - will use the same sprite regardless of whether there is soil or wet soil nearby
                        arrNeighbourGrid_current.push(hasCommonElement(arrCurrentValues, [2, 3]) ? 1 : 0)
                        break;
                    case 3:
                        //checking for wet tilled soil - sprite will change only with another wet soil sprite
                        arrNeighbourGrid_current.push(arrCurrentValues.includes(3) ? 1 : 0)
                        break;
                    case 4:
                        //checking for grass - ground or any type of soil must be nearby
                        arrNeighbourGrid_current.push(hasCommonElement(arrCurrentValues, [1, 2, 3]) ? 1 : 0)
                        break;
                    default:
                        //checking if same tile is in neighbors
                        arrNeighbourGrid_current.push(arrCurrentValues.includes(intItemIndex) ? 1 : 0)
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

function getSpriteKeyByIndex(intIndex) {
    return Object.keys(objSpriteKeyDict).find(k => objSpriteKeyDict[k] === intIndex);
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

function populateItemGrids(bolUpdateGrids) {

    if (!bolUpdateGrids) {
        return;
    }

    const objFarmLayout = objMistriaDataPlanner.layout[intSaveSlot].farm;

    objGridCombined.main = Array.from({ length: objGrid.y }, () =>
        Array.from({ length: objGrid.x }, () => [])
    );
    objGridCombined.main_extend = Array.from({ length: objGrid.y }, () =>
        Array.from({ length: objGrid.x }, () => [])
    );
    objGridCombined.rules = Array.from({ length: objGrid.y }, () =>
        Array.from({ length: objGrid.x }, () => ({}))
    );

    Object.keys(objFarmLayout).forEach(function (strItemKey) {
        const intItemKey = parseInt(strItemKey);
        for (var y = 0; y < objFarmLayout[intItemKey].length; y++) {
            for (var x = 0; x < objFarmLayout[intItemKey][y].length; x++) {
                if (objFarmLayout[intItemKey][y][x]) {
                    const sprite = getSprite(intItemKey);
                    const arrSize = sprite.meta.size;
                    //size will depend on direction
                    objGridCombined.main[y][x].push(intItemKey);
                    const objSection = {
                        x0: x,
                        x1: x + arrSize[0],
                        y0: y,
                        y1: y + arrSize[1],
                    }
                    for (var y1 = objSection.y0; y1 < objSection.y1; y1++) {
                        for (var x1 = objSection.x0; x1 < objSection.x1; x1++) {
                            objGridCombined.main_extend[y1][x1].push(intItemKey);
                        }
                    }
                }
            }
        }
    });
}

function clearOverlays() {
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
    if (objContainers.selection !== null && strMode === 'selection_mode' &&
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

function getSprite(intItemIndex, arrNeighbours = [0, 0, 0, 0, 0, 0, 0, 0]) {
    let sprite;
    if (objSpriteCategories.soil.includes(intItemIndex)) {
        switch (intItemIndex) {
            case 1: //ground
                sprite = sprites.get(`${getSpriteKeyByIndex(intItemIndex)}_${objMistriaDataPlanner.season}`);
                break;
            case 3: //tilled wet
                sprite = sprites.getSoil(`${getSpriteKeyByIndex(intItemIndex)}_${objMistriaDataPlanner.season === 'fall' ? 'autumn' : objMistriaDataPlanner.season}`, arrNeighbours)
                break;
            case 2: //tilled
                sprite = sprites.getSoil(`tile_soil_${objMistriaDataPlanner.season === 'fall' ? 'autumn' : objMistriaDataPlanner.season}`, arrNeighbours)
                break;
            case 4: //grass
                sprite = sprites.getGrass(`tile_grassautotile_${objMistriaDataPlanner.season === 'fall' ? 'autumn' : objMistriaDataPlanner.season}`, arrNeighbours)
                break;
        }
    } else if (objSpriteCategories.crops.includes(intItemIndex)) {
        sprite = sprites.getCrop(getSpriteKeyByIndex(intItemIndex));
    } else if (objSpriteCategories.fences.includes(intItemIndex)) {
        sprite = sprites.getFence(getSpriteKeyByIndex(intItemIndex), arrNeighbours);
    } else {
        console.log(getSpriteKeyByIndex(intItemIndex));
        sprite = sprites.get(getSpriteKeyByIndex(intItemIndex));
    }

    return sprite;
}

function getTopLeftCornerItem(objCellCoord) {
    //snap to grid
    const bolTwosOnly = (objSpriteCategories.soil.includes(intCurrentlyDrawing) || objSpriteCategories.crops.includes(intCurrentlyDrawing) || objSpriteCategories.fences.includes(intCurrentlyDrawing)) ? true : false;
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
    $('#game-container').css('cursor', '');

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
        } else if (strMode === 'selection_mode') {
            elemSelection.fill(`rgba(255, 174, 0, 0.3)`);
        }
        elemSelection.stroke({ color: `rgba(255, 174, 0, 0.8)`, width: 2, alignment: 1 });
        elemSelection.position.set(objSelectionTemp.x0 * intGridCellSize, objSelectionTemp.y0 * intGridCellSize);
        objContainers.selection.addChild(elemSelection);
    }

    let objNeighbors = {};
    if (arrGrids[0] == 'main') {
        let setItems;
        setItems = new Set(
            objGridCombined.main.flatMap(layer =>
                layer.flatMap(row =>
                    row.flat()
                )
            )
        );

        const arrItems = [...setItems];
        const arrSeenFences = getCommonElements(arrItems, objSpriteCategories.fences)
        const arrSeenGround = getCommonElements(arrItems, objSpriteCategories.soil)
        let arrNeighborItems = getCommonElements(arrItems, [...arrSeenGround, ...arrSeenFences]);
        arrNeighborItems.push(4);

        arrNeighborItems.forEach((intIdx) => {
            objNeighbors[intIdx] = convertGridToNeighbours(intIdx, 'main');
        });
    }

    arrGrids.forEach((strGridKey) => {
        let objContainersChanged = {};

        if (strGridKey === 'cursor') {
            objContainersChanged.cursor = [];
        } else {
            objContainersChanged.crops = objSpriteCategories.crops;
            objContainersChanged.fences = objSpriteCategories.fences;
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
                        let bolTint = false

                        if (strGridKey !== 'cursor') {
                            arrItems = getCommonElements(objGridCombined[strGridKey][y][x], objContainersChanged[strContainerKey])
                        } else {
                            if ('tint' in objGridCombined.rules[y][x]) {
                                bolTint = true;
                            }
                        }

                        arrItems.forEach((intItemIndex) => {
                            const sprite = getSprite(intItemIndex, (intItemIndex in objNeighbors ? objNeighbors[intItemIndex][y][x] : [0, 0, 0, 0, 0, 0, 0, 0]));
                            sprite.position.set(x * intGridCellSize, y * intGridCellSize);
                            if (bolTint) {
                                sprite.tint = `rgba(255, 0, 0, 1)`;
                            }
                            objContainers[strContainerKey].addChild(sprite);
                        });
                    }
                }
            }
        });
    });

    if (arrGrids[0] == 'main') {
        // objGridCombinedPrev = JSON.parse(JSON.stringify(objGridCombined));
    }


    resizeContainers();
}

function updateGrid(objCellCoord, bolChange = false) {

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
        //  "ornate_rug_large_rectangle_red": 71
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

                        setGrid_CoveredSliceValues.delete(objSpriteCategories.soil);

                        if (setGrid_CoveredSliceValues.size) {
                            bolHitsElement = true;
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
                            objGridCombined['rules'][y][x]['tint'] = '';
                        }

                        objGridCombined['cursor'][y][x].push(intCurrentlyDrawing);
                    }
                }
            }
        }

        if (bolChange) {
            if (bolAddedNew) {
                saveDataPlanner(true);
                drawContainers(['main']);
            }
        } else {
            drawContainers(['cursor']);
        }
    }

    if (strMode === 'selection_mode') {

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
            if (selectionHovered(objCellCoord)) {
                bolHighlight = true;
            }
            if (objSelectionSection !== false) {
                objSelection = objSelectionSection;
            }
            drawContainers([], objSelection, bolHighlight);
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



function updateCurrentlyDrawing(intItemKey = false) {
    intCurrentlyDrawing = intItemKey;
    updateCursorMode('drawing_mode');
}

function updateCursorMode(strModeTemp = false) {
    // let strMode = 'dragging_mode'; // drawing_mode, selection_mode
    strMode = strModeTemp;
    clearOverlays();
    $('.tab').removeClass('active');
    $(`.tab[data-tab="${strMode}"]`).addClass('active');
    if (strMode == 'dragging_mode') {
        $('#page').addClass('dragging_mode');
    } else {
        $('#page').removeClass('dragging_mode');

        if (strMode !== 'drawing_mode') {
            intCurrentlyDrawing = false;
        }
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


    arrModes = ['mode_grid', 'mode_collision', 'mode_soil', 'mode_wet', 'mode_offseason']
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
            if (strMode === 'mode_offseason') {
                drawCrops();
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
                let strName;
                let strImage;
                let strItemKey = getSpriteKeyByIndex(intIndex);
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
        const intItemKeySelected = objSpriteKeyDict[$(this).attr('data-key')];
        updateCurrentlyDrawing(intItemKeySelected);
        $('#page .dropdown').removeClass('searching');
    });

    //hide dropdowns on outside click
    $(document).on('click', function (e) {
        let jqTarget = e.target;
        if (($(e.target).closest('.dropdown-section-name').length || $(e.target).closest('.icon').length)) {
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
    tippy('[data-tab="dragging_mode"]', {
        content: 'Drag map',
    });
    tippy('[data-tab="selection_mode"]', {
        content: 'Select item or area',
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
    drawContainers(['main']);
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
    drawContainers(['main']);
}
function loadDataPlanner(bolUpdateGrids = false, bolVersionChange = false) {

    objMistriaDataPlanner = JSON.parse(localStorage.getItem('mistria_data_planner'));

    if (objMistriaDataPlanner === null) {
        objMistriaDataPlanner = objMistriaDataPlannerDefault;
    }

    if (bolUpdateGrids) {
        if (!bolVersionChange) {
            //if current version is not latest, split array
            if (intCurrentVersion < arrVersions.length - 1) {
                arrVersions = arrVersions.slice(0, intCurrentVersion + 1);
            }

            arrVersions.push(JSON.parse(JSON.stringify(objMistriaDataPlanner.layout[intSaveSlot].farm)));
            if (arrVersions.length > intAllowedVersions) {
                arrVersions.shift();
            }

            intCurrentVersion = arrVersions.length - 1;
        }

        $('#undo').addClass('disabled');
        $('#redo').addClass('disabled');

        if (intCurrentVersion) {
            $('#undo').removeClass('disabled');
        }

        if (intCurrentVersion < arrVersions.length - 1) {
            $('#redo').removeClass('disabled');
        }
    }
    $('#delete').removeClass('disabled');


    const objFarmLayout = objMistriaDataPlanner.layout[intSaveSlot].farm;
    Object.keys(objFarmLayout).forEach(function (strItemKey) {
        const intItemKey = parseInt(strItemKey);
        let arrTemp = [...Array(objGrid.y)].map(e => Array(objGrid.x));
        objFarmLayout[intItemKey].forEach(function (arrTileCoord) {
            const x = arrTileCoord[0];
            const y = arrTileCoord[1];
            arrTemp[y][x] = intItemKey;
        });
        objMistriaDataPlanner.layout[intSaveSlot].farm[intItemKey] = arrTemp;
    });

    objMistriaDataPlanner.zoom = parseInt(objMistriaDataPlanner.zoom);

    // convert arrays to sets for to remove duplicates 
    objMistriaDataPlanner.options = ('options' in objMistriaDataPlanner ? new Set(objMistriaDataPlanner.options) : new Set(objMistriaDataPlannerDefault.options));

    populateItemGrids(bolUpdateGrids);
}

function saveDataPlanner(bolUpdateGrids = false, bolVersionChange = false) {

    // convert to array since JSON.stringify does not work on sets
    objMistriaDataPlanner.options = [...objMistriaDataPlanner.options];

    if (!bolVersionChange) {
        const objFarmLayout = objMistriaDataPlanner.layout[intSaveSlot].farm;
        Object.keys(objFarmLayout).forEach(function (strItemKey) {
            const intItemKey = parseInt(strItemKey);
            let arrTemp = [];
            for (var y = 0; y < objFarmLayout[intItemKey].length; y++) {
                for (var x = 0; x < objFarmLayout[intItemKey][y].length; x++) {
                    if (objFarmLayout[intItemKey][y][x]) {
                        arrTemp.push([x, y]);
                    }
                }
            }

            if (arrTemp.length) {
                objMistriaDataPlanner.layout[intSaveSlot].farm[intItemKey] = arrTemp;
            } else {
                delete objMistriaDataPlanner.layout[intSaveSlot].farm[intItemKey];
            }
        });
    } else {
        // console.log(intCurrentVersion, bolUpdateGrids)
        objMistriaDataPlanner.layout[intSaveSlot].farm = arrVersions[intCurrentVersion];
    }

    localStorage.setItem('mistria_data_planner', JSON.stringify(objMistriaDataPlanner));
    loadDataPlanner(bolUpdateGrids, bolVersionChange);
}

function clearMap() {
    if ($(`#delete`).hasClass('disabled')) {
        return;
    }

    // convert to array since JSON.stringify does not work on sets
    objMistriaDataPlanner.options = [...objMistriaDataPlanner.options];

    objMistriaDataPlanner.layout[intSaveSlot].farm = objMistriaDataPlannerDefault.layout[intSaveSlot].farm;

    // do not draw default dugged up patch anymore
    delete objMistriaDataPlanner.layout[intSaveSlot].farm[1];

    localStorage.setItem('mistria_data_planner', JSON.stringify(objMistriaDataPlanner));
    loadDataPlanner(true);

    drawContainers(['main']);
    $('#delete').addClass('disabled');
}

function drawAllItems() {
    drawFence();
    drawSoil();
    drawCrops();
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

        objSpriteKeyDict = await (await fetch('textures/dict.json')).json();
        objSpriteCategories = await (await fetch('textures/categories.json')).json();

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


        document.addEventListener('mousedown', (e) => {
            if (e.button === 2 && (e.buttons & 1) && bolIsDragging && (strMode === 'drawing_mode' || strMode === 'selection_mode')) {
                const objCurrentCellCoord = getClickedCell(e);

                bolIsDragging = false;
                objStartCellCoord = { x: 0, y: 0 };
                objStartOffset = { x: 0, y: 0 };
                objPrevCellCoord = { x: 0, y: 0 };
                drawSelection();
                updateCursorGrid(objCurrentCellCoord);
            }
        });

        // clicking and dragging
        objPIXIapp.stage.on('pointerdown', (e) => {
            if ($('#tabs .dropdown_wrap.open').length) {
                return;
            }

            bolIsDragging = true;
            objStartCellCoord = getClickedCell(e);
            objStartOffset = { x: objMistriaDataPlanner.offsetCanvas.x, y: objMistriaDataPlanner.offsetCanvas.y };
            objPrevCellCoord = objStartCellCoord

            if (e.data.originalEvent.button === 0 && selectionHovered(objStartCellCoord)) {  // left click
                bolIsDraggingSection = true;
            }

            updateGrid(objStartCellCoord);
        });

        objPIXIapp.stage.on('pointermove', (e) => {
            const objCurrentCellCoord = getClickedCell(e);
            const buttons = e.data.originalEvent.buttons;
            if (buttons === 4 || strMode === 'dragging_mode') { // dragging with middle button or drag mode activated
                dragMap(objCurrentCellCoord);
            } else {
                updateGrid(objCurrentCellCoord);
            }
        });

        objPIXIapp.stage.on('pointerup', (e) => {
            const objCurrentCellCoord = getClickedCell(e);

            // if (bolIsDragging && e.data.originalEvent.button === 0) {
            //     updateSoilGrid(objCurrentCellCoord)
            //     updateCropGrid(objCurrentCellCoord)
            // }

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
                updateGrid(objCurrentCellCoord, true);
            }

            bolIsDragging = false;
            bolIsDraggingMap = false;
            bolIsDraggingSection = false;
            objStartCellCoord = { x: 0, y: 0 };
            objStartOffset = { x: 0, y: 0 };
            objPrevCellCoord = { x: 0, y: 0 };
        });

        objPIXIapp.stage.on('pointerupoutside', (e) => {
            bolIsDragging = false;
            bolIsDraggingMap = false;
            bolIsDraggingSection = false;
            objStartCellCoord = { x: 0, y: 0 };
            objStartOffset = { x: 0, y: 0 };
            objPrevCellCoord = { x: 0, y: 0 };
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

        // addTestData(4);
        updateCurrentlyDrawing(71);

        drawContainers(['main']);

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