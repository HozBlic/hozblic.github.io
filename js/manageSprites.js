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

    // Object.entries(objectData.crop).forEach(([cropKey, cropData]) => {
    //     const { sheet: sheetKey, ...frameCoords } = spriteMapping[cropData.sprites.at(-1)]["0"]

    //     spriteSheetData[sheetKey].frames[cropKey] = { frame: { ...frameCoords } } // populate spritesheet frames
    //     singleSpriteData[cropKey] = { sheetKey }                                // map sprite to sheet
    // })

    // TILES

    const tileSize = 20

    const tileMask = [
        [null             , [0,1,0,0,0,0,0,0], [0,0,0,0,0,0,0,1], [0,1,0,0,0,0,0,1], [1,1,0,0,0,0,0,1], [0,0,0,1,0,0,0,0], [0,1,0,1,0,0,0,0]], 
        [[0,1,1,1,0,0,0,0], [0,0,0,1,0,0,0,1], [0,1,0,1,0,0,0,1], [1,1,0,1,0,0,0,1], [0,1,1,1,0,0,0,1], [1,1,1,1,0,0,0,1], [0,0,0,0,0,1,0,0]], 
        [[0,1,0,0,0,1,0,0], [0,0,0,0,0,1,0,1], [0,1,0,0,0,1,0,1], [1,1,0,0,0,1,0,1], [0,0,0,1,0,1,0,0], [0,1,0,1,0,1,0,0], [0,1,1,1,0,1,0,0]], 
        [[0,0,0,1,0,1,0,1], [0,1,0,1,0,1,0,1], [1,1,0,1,0,1,0,1], [0,1,1,1,0,1,0,1], [1,1,1,1,0,1,0,1], [0,0,0,0,0,1,1,1], [0,1,0,0,0,1,1,1]], 
        [[1,1,0,0,0,1,1,1], [0,0,0,1,0,1,1,1], [0,1,0,1,0,1,1,1], [1,1,0,1,0,1,1,1], [0,1,1,1,0,1,1,1], [1,1,1,1,0,1,1,1], [0,0,0,1,1,1,0,0]], 
        [[0,1,0,1,1,1,0,0], [0,1,1,1,1,1,0,0], [0,0,0,1,1,1,0,1], [0,1,0,1,1,1,0,1], [1,1,0,1,1,1,0,1], [0,1,1,1,1,1,0,1], [1,1,1,1,1,1,0,1]], 
        [[0,0,0,1,1,1,1,1], [0,1,0,1,1,1,1,1], [1,1,0,1,1,1,1,1], [0,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1], [0,0,0,0,0,0,0,0], null,            ]
    ]

    Object.entries(tileSpriteMeta).forEach(([tileSheetKey, {"0": tileData}]) => {
        const origin = { x: tileData.x, y: tileData.y }

        tileMask.forEach((row, y) => row.forEach((coords, x) => {
            if (!coords) {
                return
            }

            const tileKey = `${tileSheetKey}_${coords.join()}`

            spriteSheetData[tileData.sheet].frames[tileKey] = { frame: {
                h: tileSize,
                w: tileSize,
                x: origin.x + x * tileSize,
                y: origin.y + y * tileSize,
            } }
            singleSpriteData[tileKey] = { sheetKey: tileData.sheet }   
        }))
    })

    console.log(singleSpriteData)

    logStage('loading sprites')

    await Promise.all(Object.entries(spriteSheetData).map(async ([sheetKey, sheetData]) => {
        const sheetTexture = await PIXI.Assets.load(`textures/sheets/${sheetKey}.png`)
        sheetTexture.source.scaleMode = PIXI.SCALE_MODES.NEAREST
        const sheet = new PIXI.Spritesheet(sheetTexture, sheetData)
        await sheet.parse()
        parsedSheets[sheetKey] = sheet

        Object.entries(sheet.textures).forEach(([textureKey, texture]) => {
            const sprite = new PIXI.Sprite(texture)
            singleSpriteData[textureKey].sprite = sprite
        })
    }))

    // DRAW ALL SPRITES IN PILE
    // Object.values(singleSpriteData).forEach(({sprite}) => {
    //     app.stage.addChild(sprite)
    // })

   
    logStage('sprite loading done')

    return singleSpriteData
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