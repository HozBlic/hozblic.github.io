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
                1: [ // dugged up field in front of house and path
                    [47, 23], [48, 23], [49, 23], [50, 23], [51, 23], [52, 23], [53, 23],
                    [46, 24], [47, 24], [48, 24], [49, 24], [50, 24], [51, 24], [52, 24], [53, 24], [54, 24],
                    [46, 25], [47, 25], [48, 25], [49, 25], [50, 25], [51, 25], [52, 25], [53, 25], [54, 25],
                    [46, 26], [47, 26], [48, 26], [49, 26], [50, 26], [51, 26], [52, 26], [53, 26], [54, 26],
                    [46, 27], [47, 27], [48, 27], [49, 27], [50, 27], [51, 27], [52, 27], [53, 27], [54, 27],
                    [46, 28], [47, 28], [48, 28], [49, 28], [50, 28], [51, 28], [52, 28], [53, 28], [54, 28],
                    [47, 29], [48, 29], [49, 29], [50, 29], [51, 29], [52, 29], [53, 29],

                    [64, 13],
                    [63, 14], [64, 14], [65, 14],
                    [62, 15], [63, 15], [64, 15],
                    [61, 16], [62, 16], [63, 16],
                    [62, 17],
                ],
                5: [[90, 12], [128, 12], [90, 13], [128, 13], [9, 14], [90, 14], [128, 14], [9, 15], [90, 15], [128, 15], [9, 16], [90, 16], [128, 16], [9, 17], [90, 17], [128, 17], [9, 18], [90, 18], [128, 18], [9, 19], [89, 19], [90, 19], [128, 19], [9, 20], [89, 20], [128, 20], [9, 21], [89, 21], [128, 21], [0, 22], [1, 22], [2, 22], [3, 22], [4, 22], [5, 22], [6, 22], [7, 22], [8, 22], [9, 22], [89, 22], [128, 22], [89, 23], [128, 23], [89, 24], [90, 24], [128, 24], [90, 25], [128, 25], [90, 26], [128, 26], [0, 27], [1, 27], [2, 27], [3, 27], [4, 27], [5, 27], [6, 27], [7, 27], [8, 27], [9, 27], [90, 27], [128, 27], [9, 28], [90, 28], [128, 28], [9, 29], [90, 29], [128, 29], [9, 30], [90, 30], [128, 30], [9, 31], [90, 31], [128, 31], [9, 32], [90, 32], [128, 32], [9, 33], [90, 33], [128, 33], [9, 34], [90, 34], [91, 34], [128, 34], [9, 35], [91, 35], [128, 35], [9, 36], [91, 36], [128, 36], [9, 37], [91, 37], [128, 37], [9, 38], [91, 38], [128, 38], [9, 39], [91, 39], [128, 39], [9, 40], [91, 40], [128, 40], [9, 41], [91, 41], [128, 41], [9, 42], [91, 42], [128, 42], [9, 43], [91, 43], [128, 43], [9, 44], [91, 44], [128, 44], [9, 45], [91, 45], [128, 45], [9, 46], [91, 46], [128, 46], [9, 47], [91, 47], [128, 47], [9, 48], [91, 48], [128, 48], [9, 49], [91, 49], [128, 49], [9, 50], [91, 50], [128, 50], [9, 51], [91, 51], [128, 51], [9, 52], [91, 52], [128, 52], [9, 53], [91, 53], [128, 53], [9, 54], [90, 54], [91, 54], [128, 54], [9, 55], [90, 55], [128, 55], [9, 56], [90, 56], [128, 56], [9, 57], [90, 57], [102, 57], [103, 57], [104, 57], [105, 57], [106, 57], [107, 57], [108, 57], [109, 57], [110, 57], [111, 57], [112, 57], [113, 57], [114, 57], [115, 57], [128, 57], [1, 58], [2, 58], [3, 58], [4, 58], [5, 58], [6, 58], [7, 58], [8, 58], [9, 58], [90, 58], [91, 58], [92, 58], [93, 58], [94, 58], [95, 58], [96, 58], [97, 58], [98, 58], [99, 58], [100, 58], [101, 58], [102, 58], [115, 58], [116, 58], [117, 58], [118, 58], [119, 58], [120, 58], [121, 58], [122, 58], [123, 58], [124, 58], [125, 58], [126, 58], [127, 58], [128, 58], [129, 58], [130, 58], [131, 58], [132, 58], [133, 58], [134, 58], [135, 58], [136, 58], [11, 65], [12, 65], [13, 65], [14, 65], [15, 65], [16, 65], [17, 65], [18, 65], [19, 65], [20, 65], [105, 65], [106, 65], [107, 65], [108, 65], [109, 65], [110, 65], [111, 65], [112, 65], [1, 66], [2, 66], [3, 66], [4, 66], [5, 66], [6, 66], [7, 66], [8, 66], [9, 66], [10, 66], [11, 66], [20, 66], [21, 66], [22, 66], [23, 66], [24, 66], [25, 66], [26, 66], [27, 66], [28, 66], [29, 66], [30, 66], [31, 66], [32, 66], [33, 66], [34, 66], [35, 66], [36, 66], [37, 66], [38, 66], [39, 66], [40, 66], [60, 66], [61, 66], [62, 66], [63, 66], [64, 66], [65, 66], [73, 66], [74, 66], [75, 66], [76, 66], [77, 66], [78, 66], [79, 66], [80, 66], [81, 66], [82, 66], [83, 66], [84, 66], [85, 66], [86, 66], [87, 66], [88, 66], [89, 66], [90, 66], [91, 66], [92, 66], [93, 66], [94, 66], [95, 66], [96, 66], [97, 66], [98, 66], [99, 66], [100, 66], [101, 66], [102, 66], [103, 66], [104, 66], [105, 66], [112, 66], [113, 66], [114, 66], [115, 66], [116, 66], [117, 66], [118, 66], [119, 66], [120, 66], [121, 66], [122, 66], [123, 66], [124, 66], [125, 66], [126, 66], [127, 66], [128, 66], [129, 66], [130, 66], [131, 66], [132, 66], [133, 66], [134, 66], [135, 66], [136, 66], [9, 67], [40, 67], [41, 67], [42, 67], [43, 67], [44, 67], [45, 67], [56, 67], [57, 67], [58, 67], [59, 67], [60, 67], [65, 67], [73, 67], [128, 67], [9, 68], [45, 68], [46, 68], [47, 68], [48, 68], [49, 68], [50, 68], [51, 68], [52, 68], [53, 68], [54, 68], [55, 68], [56, 68], [65, 68], [73, 68], [128, 68], [9, 69], [65, 69], [73, 69], [128, 69], [9, 70], [65, 70], [73, 70], [128, 70], [9, 71], [65, 71], [73, 71], [128, 71], [9, 72], [65, 72], [73, 72], [128, 72], [9, 73], [65, 73], [73, 73], [128, 73], [9, 74], [65, 74], [73, 74], [128, 74], [9, 75], [65, 75], [73, 75], [128, 75], [9, 76], [65, 76], [73, 76], [128, 76], [9, 77], [65, 77], [73, 77], [128, 77], [9, 78], [65, 78], [73, 78], [128, 78], [9, 79], [65, 79], [73, 79], [128, 79], [9, 80], [65, 80], [73, 80], [128, 80], [9, 81], [65, 81], [73, 81], [128, 81], [9, 82], [65, 82], [73, 82], [128, 82], [9, 83], [65, 83], [73, 83], [128, 83], [9, 84], [65, 84], [73, 84], [128, 84], [9, 85], [65, 85], [73, 85], [128, 85], [9, 86], [65, 86], [73, 86], [128, 86], [9, 87], [65, 87], [73, 87], [128, 87], [9, 88], [65, 88], [73, 88], [128, 88], [9, 89], [65, 89], [73, 89], [128, 89], [9, 90], [65, 90], [73, 90], [128, 90], [9, 91], [10, 91], [11, 91], [12, 91], [13, 91], [14, 91], [15, 91], [16, 91], [17, 91], [18, 91], [19, 91], [20, 91], [21, 91], [22, 91], [23, 91], [24, 91], [25, 91], [26, 91], [27, 91], [28, 91], [29, 91], [30, 91], [31, 91], [32, 91], [33, 91], [34, 91], [35, 91], [36, 91], [37, 91], [38, 91], [39, 91], [40, 91], [41, 91], [42, 91], [43, 91], [44, 91], [45, 91], [46, 91], [47, 91], [48, 91], [49, 91], [50, 91], [51, 91], [52, 91], [53, 91], [54, 91], [55, 91], [56, 91], [57, 91], [58, 91], [59, 91], [60, 91], [61, 91], [62, 91], [63, 91], [64, 91], [65, 91], [73, 91], [74, 91], [75, 91], [76, 91], [77, 91], [78, 91], [79, 91], [80, 91], [81, 91], [82, 91], [83, 91], [84, 91], [85, 91], [86, 91], [87, 91], [88, 91], [89, 91], [90, 91], [91, 91], [92, 91], [93, 91], [94, 91], [95, 91], [96, 91], [97, 91], [98, 91], [99, 91], [100, 91], [101, 91], [102, 91], [103, 91], [104, 91], [105, 91], [106, 91], [107, 91], [108, 91], [109, 91], [110, 91], [111, 91], [112, 91], [113, 91], [114, 91], [115, 91], [116, 91], [117, 91], [118, 91], [119, 91], [120, 91], [121, 91], [122, 91], [123, 91], [124, 91], [125, 91], [126, 91], [127, 91], [128, 91]],
                6: [[62, 0], [62, 1], [62, 2], [62, 3], [62, 4], [62, 5], [62, 6], [66, 0], [66, 1], [66, 2], [66, 3], [66, 4], [66, 5], [66, 6]]
            }
        }

    }
}

let strMode = 'dragging_mode'; // drawing_mode, selection_mode
let intCurrentlyDrawing = false;
let bolIsDragging = false;
let bolIsDraggingSection = false;

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
let objSpriteCategories;

let objStartCellCoord = { x: 0, y: 0 };
let objStartOffset = { x: 0, y: 0 };
let objPrevCellCoord = { x: 0, y: 0 };
let objSelectionSection = false
let intMultiplierCanvas = 1;

let objSpriteKeyDict = null;
let arrGrid_Collision = null;
let arrGrid_Diggable = null;
let arrGrassFixCoord = [
    [47, 23], [48, 23], [49, 23], [50, 23], [51, 23], [52, 23], [53, 23],
    [46, 24], [47, 24], [48, 24], [49, 24], [50, 24], [51, 24], [52, 24], [53, 24], [54, 24],
    [46, 25], [47, 25], [48, 25], [49, 25], [50, 25], [51, 25], [52, 25], [53, 25], [54, 25],
    [46, 26], [47, 26], [48, 26], [49, 26], [50, 26], [51, 26], [52, 26], [53, 26], [54, 26],
    [46, 27], [47, 27], [48, 27], [49, 27], [50, 27], [51, 27], [52, 27], [53, 27], [54, 27],
    [46, 28], [47, 28], [48, 28], [49, 28], [50, 28], [51, 28], [52, 28], [53, 28], [54, 28],
    [47, 29], [48, 29], [49, 29], [50, 29], [51, 29], [52, 29], [53, 29],

    [63, 12], [64, 12], [65, 12],
    [62, 13], [63, 13], [64, 13], [65, 13], [66, 13],
    [61, 14], [62, 14], [63, 14], [64, 14], [65, 14], [66, 14],
    [60, 15], [61, 15], [62, 15], [63, 15], [64, 15], [65, 15], [66, 15],
    [60, 16], [61, 16], [62, 16], [63, 16], [64, 16], [65, 16],
    [60, 17], [61, 17], [62, 17], [63, 17], [64, 17],
    [61, 18], [62, 18], [63, 18]
];

let objPlannerDiv;
let objPIXIapp;
let sprites = null;
let objGraphics_Grid = null;
let objContainer_Wrapper = null;

let objGrids = {
    'cursor': [...Array(objGrid.y)].map(e => Array(objGrid.x).fill(0)),
    'soil': [...Array(objGrid.y)].map(e => Array(objGrid.x).fill(0)),
    'crops': [...Array(objGrid.y)].map(e => Array(objGrid.x).fill(0)),
    'fences': [...Array(objGrid.y)].map(e => Array(objGrid.x).fill(0)),
}

let objContainers = {
    'background': null,
    'grassFix': null,
    'collision': null,
    'ground': null,
    'soil': null,
    'soilWet': null,
    'grass': null,
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
    'collision': 6,
    'grid': 7,
    'fences': 8,
    'crops': 9,
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
                            objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp][intStartY + y][intStartX + x] = 1;
                            objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingSoil][intStartY + y][intStartX + x] = 1;
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
                            objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp][intStartY + y][intStartX + x] = 1;
                            objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingSoil][intStartY + y][intStartX + x] = 1;
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

            var intCurrentlyDrawingTemp = objSpriteKeyDict['snow_peas'];
            if (!(intCurrentlyDrawingTemp in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
            }

            for (let y = 0; y < intRows; y++) {
                for (let x = 0; x < intColumns; x++) {
                    objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp][intStartY + y][intStartX + x] = 1;
                    objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingSoil][intStartY + y][intStartX + x] = 1;
                }
            }

            intStartX = 14;
            intCurrentlyDrawingTemp = objSpriteKeyDict['tea'];
            if (!(intCurrentlyDrawingTemp in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
                objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
            }

            for (let y = 0; y < intRows; y++) {
                for (let x = 0; x < intColumns; x++) {
                    objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp][intStartY + y][intStartX + x] = 1;
                    objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingSoil][intStartY + y][intStartX + x] = 1;
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
                        objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp][intStartY + y][intStartX + x] = 1;
                        objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingSoil][intStartY + y][intStartX + x] = 1;
                    }
                }
            }

            break;
    }
    populateItemGrids();
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
                    default:
                        arrNeighbourGrid_current.push(intCurrentValue == intValue ? 1 : 0)
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

function getSpriteKeyByIndex(intIndex) {
    return Object.keys(objSpriteKeyDict).find(k => objSpriteKeyDict[k] === intIndex);
}

function drawFence() {
    //destroy previously drawn elements
    if (objContainers.fences !== null) {
        objContainer_Wrapper.removeChild(objContainers.fences);
        objContainers.fences.destroy();
        objContainers.fences = null
    }

    //init container
    objContainers.fences = new PIXI.Container();
    objContainer_Wrapper.addChild(objContainers.fences);
    objContainers.fences.zIndex = objZindexes.fences;

    //TODO: needs for loop all possible fences, to get all neigbours

    let objFenceNeighbors = {}

    objSpriteCategories.fences.forEach((intIdx) => {
        objFenceNeighbors[intIdx] = convertGridToNeighbours(objGrids.fences, intIdx)
    });

    for (let y = 0; y < objGrids.fences.length; y++) {
        for (let x = 0; x < objGrids.fences[0].length; x++) {
            if (objGrids.fences[y][x]) {
                const intIdx = objGrids.fences[y][x];

                let arrGridNeighbours = objFenceNeighbors[intIdx];

                const elemSprite = sprites.getFence(getSpriteKeyByIndex(intIdx), arrGridNeighbours[y][x]);
                elemSprite.position.set((x) * intGridCellSize, y * intGridCellSize);
                objContainers.fences.addChild(elemSprite);

                // const elemSpriteTilled = sprites.getSoil(`soil_fall`, arrGridNeighbours[y][x])
                // elemSpriteTilled.position.set(x * intGridCellSize, y * intGridCellSize);
                // objContainers.soil.addChild(elemSpriteTilled);
            }
        }
    }

    resizeContainers();
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

function drawSelection(objStartCellCoordTemp = false, objCellCoord = false, bolHighlight = false) {

    objSelectionSection = false;
    if (strMode != 'selection_mode' && strMode != 'drawing_mode') return;

    //destroy previously drawn elements
    if (objContainers.selection !== null) {
        objContainer_Wrapper.removeChild(objContainers.selection);
        objContainers.selection.destroy();
        objContainers.selection = null
    }

    if (!objCellCoord) return;

    //init container
    objContainers.selection = new PIXI.Graphics();
    objContainer_Wrapper.addChild(objContainers.selection);
    objContainers.selection.zIndex = objZindexes.selection;

    objSelectionSection = {
        x0: Math.min(objStartCellCoordTemp.x, objCellCoord.x),
        y0: Math.min(objStartCellCoordTemp.y, objCellCoord.y),
        x1: Math.max(objStartCellCoordTemp.x, objCellCoord.x),
        y1: Math.max(objStartCellCoordTemp.y, objCellCoord.y),
    }

    const objRectanglePx = {
        x: objSelectionSection.x0 * intGridCellSize,
        y: objSelectionSection.y0 * intGridCellSize,
        w: (objSelectionSection.x1 - objSelectionSection.x0) * intGridCellSize + intGridCellSize,
        h: (objSelectionSection.y1 - objSelectionSection.y0) * intGridCellSize + intGridCellSize,
    }

    objContainers.selection.rect(objRectanglePx.x, objRectanglePx.y, objRectanglePx.w, objRectanglePx.h);
    if (strMode === 'selection_mode') {
        if (bolHighlight) {
            objContainers.selection.fill(`rgba(255, 174, 0, 0.5)`);
        } else {
            objContainers.selection.fill(`rgba(255, 174, 0, 0.3)`);
        }

    } else {
        objContainers.selection.fill(`rgba(255, 174, 0, 0.1)`);
    }
    objContainers.selection.stroke({ color: `rgba(255, 174, 0, 0.8)`, width: 2, alignment: 1 });

    resizeContainers();

    //highlight elements
}

function moveSelection(objCellCoord = false) {
}

function dragMap(objCellCoord) {
    if (!bolIsDragging) return;

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

function populateItemGrids() {
    const objFarmLayout = objMistriaDataPlanner.layout[intSaveSlot].farm;

    Object.keys(objGrids).forEach(function (strGridKey) {
        objGrids[strGridKey] = [...Array(objGrid.y)].map(e => Array(objGrid.x).fill(0));
    });

    Object.keys(objFarmLayout).forEach(function (strItemKey) {
        const intItemKey = parseInt(strItemKey);
        const strGridKey = Object.entries(objSpriteCategories).find(([k, arr]) => arr.includes(intItemKey))?.[0];

        for (var y = 0; y < objFarmLayout[intItemKey].length; y++) {
            for (var x = 0; x < objFarmLayout[intItemKey][y].length; x++) {
                if (objFarmLayout[intItemKey][y][x]) {
                    objGrids[strGridKey][y][x] = intItemKey;
                }
            }
        }
    });
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

    let arrGridNeighbours = convertGridToNeighbours(objGrids.soil)
    let arrGridNeighbours_Soil = convertGridToNeighbours(objGrids.soil, 2)
    let arrGridNeighbours_Wet = convertGridToNeighbours(objGrids.soil, 3)

    for (let y = 0; y < objGrids.soil.length; y++) {
        for (let x = 0; x < objGrids.soil[0].length; x++) {
            const intIdx = objGrids.soil[y][x];

            if (objGrids.soil[y][x]) {
                switch (objGrids.soil[y][x]) {
                    case 1: //ground
                        const elemSpriteGround = sprites.get(`${getSpriteKeyByIndex(intIdx)}_${objMistriaDataPlanner.season}`);
                        elemSpriteGround.position.set(x * intGridCellSize, y * intGridCellSize);
                        objContainers.ground.addChild(elemSpriteGround);
                        break;
                    case 3: //tilled wet
                        const textureWet = sprites.getSoil(`${getSpriteKeyByIndex(intIdx)}_${objMistriaDataPlanner.season === 'fall' ? 'autumn' : objMistriaDataPlanner.season}`, arrGridNeighbours_Wet[y][x])
                        const elemSpriteWet = new PIXI.Sprite(textureWet);
                        elemSpriteWet.position.set(x * intGridCellSize, y * intGridCellSize);
                        objContainers.soilWet.addChild(elemSpriteWet);
                    //no break because it needs tilled soil underneath
                    case 2: //tilled
                        const elemSpriteTilled = sprites.getSoil(`tile_soil_${objMistriaDataPlanner.season === 'fall' ? 'autumn' : objMistriaDataPlanner.season}`, arrGridNeighbours_Soil[y][x])
                        elemSpriteTilled.position.set(x * intGridCellSize, y * intGridCellSize);
                        objContainers.soil.addChild(elemSpriteTilled);
                        break;
                }
            } else if (!checkTileHasCollision({ x: x, y: y })) {
                if (!arrGridNeighbours[y][x].includes(1)) {
                    continue;
                }
                const texture = sprites.getGrass(`tile_grassautotile_${objMistriaDataPlanner.season === 'fall' ? 'autumn' : objMistriaDataPlanner.season}`, arrGridNeighbours[y][x])
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

    for (let y = 0; y < objGrids.crops.length; y++) {
        for (let x = 0; x < objGrids.crops[0].length; x++) {
            const intIdx = objGrids.crops[y][x];

            if (objGrids.crops[y][x]) {
                const elemSprite = sprites.getCrop(`${getSpriteKeyByIndex(intIdx)}`);
                elemSprite.position.set(x * intGridCellSize, y * intGridCellSize);
                objContainers.crops.addChild(elemSprite);
            }
        }
    }

    resizeContainers();
}
function clearCursor() {
    //destroy previously drawn elements
    if (objContainers.cursor !== null) {
        objContainer_Wrapper.removeChild(objContainers.cursor);
        objContainers.cursor.destroy();
        objContainers.cursor = null
    }

}

function drawCursor() {
    clearCursor();

    //init container
    objContainers.cursor = new PIXI.Container();
    objContainer_Wrapper.addChild(objContainers.cursor);
    objContainers.cursor.zIndex = objZindexes.cursor;

    //might be useful new Rectangle(100, 100, 200, 150);

    for (let y = 0; y < objGrids.cursor.length; y++) {
        for (let x = 0; x < objGrids.cursor[0].length; x++) {
            if (objGrids.cursor[y][x]) {
                if (intCurrentlyDrawing) {
                    if (objSpriteCategories.soil.includes(intCurrentlyDrawing)) {
                        switch (intCurrentlyDrawing) {
                            case 1: //ground
                                const elemSpriteGround = sprites.get(`${getSpriteKeyByIndex(intCurrentlyDrawing)}_${objMistriaDataPlanner.season}`);
                                elemSpriteGround.position.set(x * intGridCellSize, y * intGridCellSize);
                                elemSpriteGround.alpha = 0.7;
                                objContainers.cursor.addChild(elemSpriteGround);
                                break;
                            case 3: //tilled wet
                                const textureWet = sprites.getSoil(`${getSpriteKeyByIndex(intCurrentlyDrawing)}_${objMistriaDataPlanner.season === 'fall' ? 'autumn' : objMistriaDataPlanner.season}`, [0, 0, 0, 0, 0, 0, 0, 0])
                                const elemSpriteWet = new PIXI.Sprite(textureWet);
                                elemSpriteWet.position.set(x * intGridCellSize, y * intGridCellSize);
                                elemSpriteWet.alpha = 0.7;
                                objContainers.cursor.addChild(elemSpriteWet);
                            case 2: //tilled
                                const elemSpriteTilled = sprites.getSoil(`tile_soil_${objMistriaDataPlanner.season === 'fall' ? 'autumn' : objMistriaDataPlanner.season}`, [0, 0, 0, 0, 0, 0, 0, 0])
                                elemSpriteTilled.position.set(x * intGridCellSize, y * intGridCellSize);
                                elemSpriteTilled.alpha = 0.7;
                                objContainers.cursor.addChild(elemSpriteTilled);
                                break;
                            case 4: //grass
                                const texture = sprites.getGrass(`tile_grassautotile_${objMistriaDataPlanner.season === 'fall' ? 'autumn' : objMistriaDataPlanner.season}`, [0, 0, 0, 0, 0, 0, 0, 0])
                                const elemSprite = new PIXI.Sprite(texture);
                                elemSprite.position.set(x * intGridCellSize, y * intGridCellSize);
                                elemSprite.alpha = 0.7;
                                objContainers.cursor.addChild(elemSprite);
                                break;
                        }
                    } else if (objSpriteCategories.crops.includes(intCurrentlyDrawing)) {
                        const elemSprite = sprites.getCrop(`${getSpriteKeyByIndex(intCurrentlyDrawing)}`);
                        elemSprite.position.set(x * intGridCellSize, y * intGridCellSize);
                        elemSprite.alpha = 0.7;
                        objContainers.cursor.addChild(elemSprite);
                    } else {
                        const elemSprite = sprites.get(`${getSpriteKeyByIndex(intCurrentlyDrawing)}`);
                        elemSprite.position.set(x * intGridCellSize, y * intGridCellSize);
                        elemSprite.alpha = 0.7;
                        objContainers.cursor.addChild(elemSprite);
                    }
                } else {
                    let elemSelection = new PIXI.Graphics();

                    elemSelection.rect(0, 0, intGridCellSize, intGridCellSize);
                    elemSelection.fill(`rgba(255, 174, 0, 0.3)`);
                    elemSelection.stroke({ color: `rgba(255, 174, 0, 0.8)`, width: 2, alignment: 1 });

                    elemSelection.position.set(x * intGridCellSize, y * intGridCellSize);
                    elemSelection.alpha = 0.7;
                    objContainers.cursor.addChild(elemSelection);
                }
            }
        }
    }

    resizeContainers();
}

const slice2D = (arr, startX, endX, startY, endY) => {
    return arr.slice(startY, endY).map(subArr => subArr.slice(startX, endX))
}

function updateSoilGrid(objCellCoord, bolUpdateCrops = false) {

    let intCurrentlyDrawingTemp = intCurrentlyDrawing;
    if (!bolUpdateCrops) {
        if (strMode != 'drawing_mode') return;
        if (!objSpriteCategories.soil.includes(intCurrentlyDrawingTemp)) return;
        if (!bolIsDragging) return;
    } else {
        intCurrentlyDrawingTemp = objMistriaDataPlanner.options.has('mode_wet') ? objSpriteKeyDict['tile_soil_wet'] : objSpriteKeyDict['tile_soil'];
    }

    const bolGrass = objSpriteKeyDict['tile_grassautotile'] == intCurrentlyDrawingTemp;
    const bolGround = objSpriteKeyDict['tile_main_exteriors'] == intCurrentlyDrawingTemp;

    const objSelection = {
        x0: Math.min(objStartCellCoord.x, objCellCoord.x),
        y0: Math.min(objStartCellCoord.y, objCellCoord.y),
        x1: Math.max(objStartCellCoord.x, objCellCoord.x),
        y1: Math.max(objStartCellCoord.y, objCellCoord.y),
    }

    if (!bolGrass && !(intCurrentlyDrawingTemp in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
        objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
    }

    for (let y = objSelection.y0; y <= objSelection.y1; y++) {
        for (let x = objSelection.x0; x <= objSelection.x1; x++) {
            if (!checkTileHasCollision({ x: x, y: y })) {
                if (checkTileHasCrop({ x: x, y: y }) && (bolGrass || bolGround)) continue;
                objSpriteCategories.soil.forEach((intIdx) => {
                    if (intIdx in objMistriaDataPlanner.layout[intSaveSlot].farm && intIdx !== intCurrentlyDrawingTemp) {
                        delete objMistriaDataPlanner.layout[intSaveSlot].farm[intIdx][y][x];
                    }
                });

                if (!bolGrass) {
                    objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp][y][x] = 1;
                }
            }
        }
    }

    saveDataPlanner();
    drawSoil();
    if (bolUpdateCrops) {
        drawCrops();
    }
}

function updateCropGrid(objCellCoord) {

    if (strMode != 'drawing_mode') return;
    if (!objSpriteCategories.crops.includes(intCurrentlyDrawing)) return;
    if (!bolIsDragging) return;

    let intCurrentlyDrawingTemp = intCurrentlyDrawing;

    const objSelection = {
        x0: Math.min(objStartCellCoord.x, objCellCoord.x),
        y0: Math.min(objStartCellCoord.y, objCellCoord.y),
        x1: Math.max(objStartCellCoord.x, objCellCoord.x),
        y1: Math.max(objStartCellCoord.y, objCellCoord.y),
    }

    if (!(intCurrentlyDrawingTemp in objMistriaDataPlanner.layout[intSaveSlot].farm)) {
        objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp] = [...Array(objGrid.y)].map(e => Array(objGrid.x));
    }

    for (let y = objSelection.y0; y <= objSelection.y1; y++) {
        for (let x = objSelection.x0; x <= objSelection.x1; x++) {
            if (!checkTileHasCollision({ x: x, y: y })) {

                objSpriteCategories.crops.forEach((intIdx) => {
                    if (intIdx in objMistriaDataPlanner.layout[intSaveSlot].farm && intIdx !== intCurrentlyDrawingTemp) {
                        delete objMistriaDataPlanner.layout[intSaveSlot].farm[intIdx][y][x];
                    }
                });

                objMistriaDataPlanner.layout[intSaveSlot].farm[intCurrentlyDrawingTemp][y][x] = 1;
            }
        }
    }

    updateSoilGrid(objCellCoord, true);
}

function updateCursorGrid(objCellCoord) {

    //reverse highlight
    if (objContainers.selection !== null && strMode === 'selection_mode') {
        $('#game-container').css('cursor', '');
        drawSelection({ x: objSelectionSection.x0, y: objSelectionSection.y0 }, { x: objSelectionSection.x1, y: objSelectionSection.y1 })
    }

    if (!(strMode === 'drawing_mode' || strMode === 'selection_mode')) return;
    objGrids.cursor = [...Array(objGrid.y)].map(e => Array(objGrid.x).fill(0));

    if (bolIsDragging && strMode === 'drawing_mode') {
        const objSelection = {
            x0: Math.min(objStartCellCoord.x, objCellCoord.x),
            y0: Math.min(objStartCellCoord.y, objCellCoord.y),
            x1: Math.max(objStartCellCoord.x, objCellCoord.x),
            y1: Math.max(objStartCellCoord.y, objCellCoord.y),
        }

        objGrids.cursor = [...Array(objGrid.y)].map(e => Array(objGrid.x).fill(0));
        for (let y = objSelection.y0; y <= objSelection.y1; y++) {
            for (let x = objSelection.x0; x <= objSelection.x1; x++) {
                if (!checkTileHasCollision({ x: x, y: y })) {
                    objGrids.cursor[y][x] = 1;
                }
            }
        }
    } else if (!bolIsDragging) {
        // highlight selection on hover
        if (selectionHovered(objCellCoord)) {
            $('#game-container').css('cursor', 'pointer');
            drawSelection({ x: objSelectionSection.x0, y: objSelectionSection.y0 }, { x: objSelectionSection.x1, y: objSelectionSection.y1 }, true)
        } else {
            objGrids.cursor[objCellCoord.y][objCellCoord.x] = 1;
        }
    }

    drawCursor();
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

function updateCurrentlyDrawing(intItemKey = false) {
    intCurrentlyDrawing = intItemKey;
    updateCursorMode('drawing_mode');
}

function updateCursorMode(strModeTemp = false) {
    // let strMode = 'dragging_mode'; // drawing_mode, selection_mode
    strMode = strModeTemp;
    $('.tab').removeClass('active');
    $(`.tab[data-tab="${strMode}"]`).addClass('active');
    if (strMode == 'dragging_mode') {
        $('#page').addClass('dragging_mode');
        clearCursor();
    } else {
        $('#page').removeClass('dragging_mode');

        if (strMode !== 'drawing_mode') {
            intCurrentlyDrawing = false;
        }
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

function checkTileHasCrop(objCell) {
    return (objGrids.crops[objCell.y][objCell.x]) ? true : false;
}

function getClickedCell(event) {

    const rect = objPIXIapp.canvas.getBoundingClientRect();

    let scaleX = objPIXIapp.screen.width / rect.width;
    let scaleY = objPIXIapp.screen.height / rect.height;

    let x = (event.clientX - rect.left) * scaleX / intMultiplierCanvas;
    let y = (event.clientY - rect.top) * scaleY / intMultiplierCanvas;

    // console.log('---')
    // console.log((event.clientX - rect.left), (event.clientY - rect.top))
    // console.log(x, y)

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
                let strItemKey = getSpriteKeyByIndex(intIndex)
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

    drawSoil();
    if (!objMistriaDataPlanner.options.has('mode_offseason')) {
        drawCrops();
    }
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

    if (objMistriaDataPlanner === null) {
        objMistriaDataPlanner = objMistriaDataPlannerDefault;
    }

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

    populateItemGrids();
}

function saveDataPlanner() {
    // convert to array since JSON.stringify does not work on sets
    objMistriaDataPlanner.options = [...objMistriaDataPlanner.options];

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

    localStorage.setItem('mistria_data_planner', JSON.stringify(objMistriaDataPlanner));
    loadDataPlanner();
}

function clearMap() {
    // convert to array since JSON.stringify does not work on sets
    objMistriaDataPlanner.options = [...objMistriaDataPlanner.options];

    objMistriaDataPlanner.layout[intSaveSlot].farm = objMistriaDataPlannerDefault.layout[intSaveSlot].farm;

    // do not draw default dugged up patch anymore
    delete objMistriaDataPlanner.layout[intSaveSlot].farm[1];

    localStorage.setItem('mistria_data_planner', JSON.stringify(objMistriaDataPlanner));
    loadDataPlanner();

    drawAllItems();
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
        objSpriteCategories['fences'] = [5, 6];

        arrGrid_Collision = await (await fetch('textures/collision.json')).json();
        arrCollisionUpgradeGrid = await (await fetch('textures/collision_houseupgrade.json')).json();
        arrGrid_Diggable = await (await fetch('textures/diggable.json')).json();

        loadDataPlanner();
        loadMenuItems();
        minimapInit();

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
            objMistriaDataPlanner.offsetCanvas.x
            objPrevCellCoord = objStartCellCoord

            if (e.data.originalEvent.button === 0) {  // left click
                if (selectionHovered(objStartCellCoord)) {
                    bolIsDraggingSection = true;
                } else {
                    drawSelection(objStartCellCoord, objStartCellCoord);
                }

            }
            if (e.data.originalEvent.button === 2) {  // right click
                drawSelection();
            }
        });

        objPIXIapp.stage.on('pointermove', (e) => {
            const objCurrentCellCoord = getClickedCell(e);
            if (bolIsDragging) {
                if (objPrevCellCoord.x !== objCurrentCellCoord.x || objPrevCellCoord.y !== objCurrentCellCoord.y) {
                    const buttons = e.data.originalEvent.buttons;
                    if (buttons === 4 ||
                        //  buttons === 2 || 
                        strMode === 'dragging_mode') { // dragging with middle button, right button or drag mode activated
                        dragMap(objCurrentCellCoord);
                    } else if (buttons === 1) {
                        if (bolIsDraggingSection) {
                            dragSelection(objStartCellCoord, objCurrentCellCoord);
                        } else {
                            drawSelection(objStartCellCoord, objCurrentCellCoord);
                            updateCursorGrid(objCurrentCellCoord);
                        }
                    }
                }
                objPrevCellCoord = objCurrentCellCoord;
            } else {
                updateCursorGrid(objCurrentCellCoord);
            }
        });

        objPIXIapp.stage.on('pointerup', (e) => {
            const objCurrentCellCoord = getClickedCell(e);

            if (bolIsDragging && e.data.originalEvent.button === 0) {
                updateSoilGrid(objCurrentCellCoord)
                updateCropGrid(objCurrentCellCoord)
            }

            if (strMode === 'dragging_mode') {

                const rect = objPIXIapp.canvas.getBoundingClientRect();

                let scaleX = objPIXIapp.screen.width / rect.width;
                let scaleY = objPIXIapp.screen.height / rect.height;

                const objMovement = {
                    x: (Math.max(objStartCellCoord.eventX, objCurrentCellCoord.eventX) - Math.min(objStartCellCoord.eventX, objCurrentCellCoord.eventX)) / scaleX * intMultiplierCanvas,
                    y: (Math.max(objStartCellCoord.eventY, objCurrentCellCoord.eventY) - Math.min(objStartCellCoord.eventY, objCurrentCellCoord.eventY)) / scaleY * intMultiplierCanvas,
                }

                // clicked with left click and was not dragged more than 5px
                if (e.data.originalEvent.button === 0 && (objMovement.x < 5 && objMovement.y < 5)) {
                    let objTopLeftCellCoord = getTopLeftCorner(objStartCellCoord)

                    objMistriaDataPlanner.offsetCanvas = {
                        x: objTopLeftCellCoord.x * intGridCellSize * -1,
                        y: objTopLeftCellCoord.y * intGridCellSize * -1,
                    };
                    resize();
                }
            }

            bolIsDragging = false;
            bolIsDraggingSection = false;
            objStartCellCoord = { x: 0, y: 0 };
            objStartOffset = { x: 0, y: 0 };
            objPrevCellCoord = { x: 0, y: 0 };

            if (strMode === 'drawing_mode') {
                drawSelection();
            }
        });

        objPIXIapp.stage.on('pointerupoutside', (e) => {
            bolIsDragging = false;
            bolIsDraggingSection = false;
            objStartCellCoord = { x: 0, y: 0 };
            objStartOffset = { x: 0, y: 0 };
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
        drawGrassFix();

        drawGrid();
        drawCollision();

        // addTestData(4);

        drawAllItems();



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