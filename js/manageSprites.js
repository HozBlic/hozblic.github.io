async function loadSprites() {
    logStage('loading data')
    const spriteMapping = await (await fetch('textures/planner_sprites.json')).json()
    const spriteSheetMeta = await (await fetch('textures/sheet_sprites.json')).json()
    const objectData = await (await fetch('textures/fiddle_sprites.json')).json()
    const tileSpriteMeta = await (await fetch('textures/tiles_sprites.json')).json()

    logStage('initializing data')

    const spriteSheetData = initializeSheetData(spriteSheetMeta)
    const singleSpriteData = {}
    const parsedSheets = {}

    logStage('mapping sprites')


    // CROPS

    Object.entries(objectData.crop).forEach(([cropKey, cropData]) => {
        const { sheet: sheetKey, ...frameCoords } = spriteMapping[cropData.sprites.at(-1)]["0"]

        spriteSheetData[sheetKey].frames[cropKey] = { frame: { ...frameCoords } } // populate spritesheet frames
        singleSpriteData[cropKey] = { sheetKey }                                // map sprite to sheet
    })

    // TILES

    const tileSize = 20
    const tilePadding = 2

    const tileMaskSoil = [
        [null             , [0,1,0,0,0,0,0,0], [0,0,0,1,0,0,0,0], [0,1,0,1,0,0,0,0], [1,1,0,1,0,0,0,0], [0,0,0,0,1,0,0,0], [0,1,0,0,1,0,0,0]], 
        [[0,1,1,0,1,0,0,0], [0,0,0,1,1,0,0,0], [0,1,0,1,1,0,0,0], [1,1,0,1,1,0,0,0], [0,1,1,1,1,0,0,0], [1,1,1,1,1,0,0,0], [0,0,0,0,0,0,1,0]], 
        [[0,1,0,0,0,0,1,0], [0,0,0,1,0,0,1,0], [0,1,0,1,0,0,1,0], [1,1,0,1,0,0,1,0], [0,0,0,0,1,0,1,0], [0,1,0,0,1,0,1,0], [0,1,1,0,1,0,1,0]], 
        [[0,0,0,1,1,0,1,0], [0,1,0,1,1,0,1,0], [1,1,0,1,1,0,1,0], [0,1,1,1,1,0,1,0], [1,1,1,1,1,0,1,0], [0,0,0,1,0,1,1,0], [0,1,0,1,0,1,1,0]], 
        [[1,1,0,1,0,1,1,0], [0,0,0,1,1,1,1,0], [0,1,0,1,1,1,1,0], [1,1,0,1,1,1,1,0], [0,1,1,1,1,1,1,0], [1,1,1,1,1,1,1,0], [0,0,0,0,1,0,1,1]], 
        [[0,1,0,0,1,0,1,1], [0,1,1,0,1,0,1,1], [0,0,0,1,1,0,1,1], [0,1,0,1,1,0,1,1], [1,1,0,1,1,0,1,1], [0,1,1,1,1,0,1,1], [1,1,1,1,1,0,1,1]], 
        [[0,0,0,1,1,1,1,1], [0,1,0,1,1,1,1,1], [1,1,0,1,1,1,1,1], [0,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1], [0,0,0,0,0,0,0,0], null,            ]
    ]

    const tileMaskGrass = [
        [null             , [1,0,0,0,0,0,0,0], [1,1,1,0,0,0,0,0], [0,0,1,0,0,0,0,0], [0,0,1,0,1,0,0,1], [0,0,0,0,0,0,0,1], [0,0,0,0,0,1,1,1]],
        [[0,0,0,0,0,1,0,0], [1,0,0,1,0,1,0,0], [1,0,1,0,0,0,0,0], [0,0,1,0,0,0,0,1], [0,0,0,0,0,1,0,1], [1,0,0,0,0,1,0,0], [1,1,1,0,1,0,0,1]],
        [[0,0,1,0,1,1,1,1], [1,0,0,1,0,1,1,1], [1,1,1,1,0,1,0,0], [1,1,1,1,1,1,0,1], [1,1,1,0,1,1,1,1], [1,0,1,1,1,1,1,1], [1,1,1,1,0,1,1,1]],
        [[1,1,1,0,1,1,0,1], [1,0,1,0,1,1,1,1], [1,0,1,1,0,1,1,1], [1,1,1,1,0,1,0,1], [1,1,1,0,0,1,0,0], [1,0,1,0,1,0,0,1], [0,0,1,0,0,1,1,1]],
        [[1,0,0,1,0,1,0,1], [1,1,1,0,0,0,0,1], [0,0,1,0,1,1,0,1], [1,0,0,0,0,1,1,1], [1,0,1,1,0,1,0,0], [1,1,1,0,0,1,0,1], [1,0,1,0,1,1,0,1]],
        [[1,0,1,0,0,1,1,1], [1,0,1,1,0,1,0,1], [1,1,1,0,0,1,1,1], [1,0,1,1,1,1,0,1], [1,0,0,0,0,0,0,1], [0,0,1,0,0,1,0,0], [1,0,1,0,0,1,0,0]],
        [[1,0,1,0,0,0,0,1], [0,0,1,0,0,1,0,1], [1,0,0,0,0,1,0,1], [1,0,1,0,0,1,0,1], [0,0,0,0,0,0,0,0], [1,1,1,1,1,1,1,1], null,            ]
    ]

    Object.entries(tileSpriteMeta).forEach(([tileSheetKey, {"0": tileData}]) => {
        const origin = { x: tileData.x, y: tileData.y }

        if (tileSheetKey.includes('exteriors')) {

            console.log(tileSheetKey)
            const x = 0; // only get the basic exterior tile
            const y = 1;

            spriteSheetData[tileData.sheet].frames[tileSheetKey] = { frame: {
                h: tileSize,
                w: tileSize,
                x: origin.x + x * tileSize,
                y: origin.y + y * tileSize,
            }}
            singleSpriteData[tileSheetKey] = { sheetKey: tileData.sheet }

            return
        }

        let tileMask = tileMaskSoil

        if (tileSheetKey.includes('grass')) {
            tileMask = tileMaskGrass
        }

        tileMask.forEach((row, y) => row.forEach((coords, x) => {
            if (!coords) {
                return
            }

            const tileKey = `${tileSheetKey}_${coords}`

            spriteSheetData[tileData.sheet].frames[tileKey] = { frame: {
                h: tileSize - tilePadding * 2,
                w: tileSize - tilePadding * 2,
                x: origin.x + x * tileSize + tilePadding,
                y: origin.y + y * tileSize + tilePadding,
            }}
            singleSpriteData[tileKey] = { sheetKey: tileData.sheet }
        }))
    })

    logStage('loading sprites')

    await Promise.all(Object.entries(spriteSheetData).map(async ([sheetKey, sheetData]) => {
        const sheetTexture = await PIXI.Assets.load(`textures/sheets/${sheetKey}.png`)
        sheetTexture.source.scaleMode = PIXI.SCALE_MODES.NEAREST
        const sheet = new PIXI.Spritesheet(sheetTexture, sheetData)
        await sheet.parse()
        parsedSheets[sheetKey] = sheet

        console.log({sheetKey, sheetData})

        Object.entries(sheet.textures).forEach(([textureKey, texture]) => {
            const sprite = new PIXI.Sprite(texture)
            singleSpriteData[textureKey].sprite = sprite
        })
    }))

    // DRAW ALL SPRITES IN PILE
    // Object.values(singleSpriteData).forEach(({sprite}) => {
    //     app.stage.addChild(sprite)
    // })

    objSprite_Background = new PIXI.Sprite(singleSpriteData["tile_main_exteriors_fall"].sprite);
    objPIXIapp.stage.addChild(objSprite_Background);
    objSprite_Background.scale = 0.01

    objSprite_Background.zIndex = 1000;

   
    logStage('sprite loading done')

    return singleSpriteData
}

function getTileTex(tileSheet, neighbors, isGrass) {
    let [
        d1, o1, d2,
        o2,     o3,
        d3, o4, d4
    ] = neighbors

   
    if (isGrass) {
        // treating otrhogonals as a full line
        if (o1) {d1=1; d2=1}
        if (o2) {d1=1; d3=1}
        if (o3) {d2=1; d4=1}
        if (o4) {d3=1; d4=1}
    } else {
        // un-neighbored diagnonals have no separate case
        if (!o1 || !o2) {d1 = 0}
        if (!o1 || !o3) {d2 = 0}
        if (!o2 || !o4) {d3 = 0}
        if (!o3 || !o4) {d4 = 0}
    }

    const combinedNeighbors = [d1, o1, d2, o2, o3, d3, o4, d4]

    if (!(objSprites[`tile_${tileSheet}_${Object.values(combinedNeighbors)}`])) {
        console.log(combinedNeighbors)
    }

    return (objSprites[`tile_${tileSheet}_${Object.values(combinedNeighbors)}`] || objSprites[`snow_peas`]).sprite.texture;
}

function getGrassTex(...args) {
    return getTileTex(...args, true)
}

function getSoilTex(...args) {
    return getTileTex(...args, false)
}

function initializeSheetData(spriteSheetMeta) {
    const initialized = {}

    Object.entries(spriteSheetMeta).forEach(([sheetKey, sheetData]) => (
        initialized[sheetKey] = {
            frames: {},
            meta: {
                size: { w: sheetData.sheetW, h: sheetData.sheetH },
                scale: 1
            },
        }
    ))

    return initialized
}

function logStage(text) {
    console.log(`%c${text}`, 'font-size: 1.5em;color: #62893e;padding: 0 5px;margin: 0 10px;border: 5px ridge #22c813;background: #444444')
}