class SpriteStore {
    textures
    constructor(test) {
        if (test !== "I know what I'm doing") { throw new Error('use static initializer await SpriteStore.getInstance()')}
    }

    static async getInstance() {
        const instance = new SpriteStore("I know what I'm doing")
        await instance.loadTextures()
        return instance 
    }

    async loadTextures() {
        this.logStage('loading data')
        const spriteMapping = await (await fetch('textures/planner_sprites.json')).json()
        const spriteSheetMeta = await (await fetch('textures/sheet_sprites.json')).json()
        const objectData = await (await fetch('textures/fiddle_sprites.json')).json()
        const tileSpriteMeta = await (await fetch('textures/tiles_sprites.json')).json()

        this.logStage('initializing data')

        const spriteSheetData = this.initializeSheetData(spriteSheetMeta)
        const singleTextureData = {}
        const parsedSheets = {}

        this.logStage('tilesheet textures')

        // CROPS

        Object.entries(objectData.crop).forEach(([cropKey, cropData]) => {
            let [itemOriginX, itemOriginY] = objectData.crop.default.offset

            const { sheet: sheetKey, h, w, x, y, targetX, targetY, originX, originY } = spriteMapping[cropData.sprites.at(-1)]['0']

            spriteSheetData[sheetKey].frames[cropKey] = { frame: { h, w, x, y } }      // populate spritesheet frames
            singleTextureData[cropKey] = { 
                sheetKey, 
                pivot: {x: targetX, y: targetY}, 
                origin: {x: originX, y: originY}, 
                itemOrigin: {x: itemOriginX, y: itemOriginY},
                meta: {...objectData.crop.default, ...cropData}
            } // map sprite to sheet
        })

        let [itemOriginX, itemOriginY] = [8, 8]
        const { sheet: sheetKey, h, w, x, y, targetX, targetY, originX, originY } = spriteMapping['spr_wilted_plant_1_stage1']['0']
        spriteSheetData[sheetKey].frames['wilted_plant'] = { frame: { h, w, x, y } }      // populate spritesheet frames
        singleTextureData['wilted_plant'] = { 
            sheetKey, 
            pivot: {x: targetX, y: targetY}, 
            origin: {x: originX, y: originY}, 
            itemOrigin: {x: itemOriginX, y: itemOriginY},
            meta: {...objectData.crop.default, ...objectData.breakable['wilted_plant']}
        } // map sprite to sheet
       

        
        // FURNITURE

        Object.entries(objectData.furniture).forEach(([furnitureKey, furnitureData]) => {
            if (furnitureData.fence) {
                const fenceSprites = spriteMapping[furnitureData.south.sprite]

                let itemOriginX = 0, itemOriginY = 0
                if (furnitureData.south.offset) {
                    itemOriginX = furnitureData.south.offset[0]
                    itemOriginY = furnitureData.south.offset[1]
                }
                

                Object.entries(fenceSprites).forEach(([fenceOrd, { sheet: sheetKey, h, w, x, y, targetX, targetY, originX, originY }]) => {
                    const fenceKey = `${furnitureKey}_${fenceOrd}`

                    spriteSheetData[sheetKey].frames[fenceKey] = { frame: { h, w, x, y } }      // populate spritesheet frames
                    singleTextureData[fenceKey] = { 
                        sheetKey, 
                        pivot: {x: targetX, y: targetY}, 
                        origin: {x: originX, y: originY}, 
                        itemOrigin: {x: itemOriginX, y: itemOriginY},
                        meta: {...objectData.furniture.default, ...furnitureData}
                    } // map sprite to sheet
                })
            }

            if (furnitureData.rug) {
                const rugSprite = spriteMapping[furnitureData.south.sprite]["0"]

                let itemOriginX = 0, itemOriginY = 0
                if (furnitureData.south.offset) {
                    itemOriginX = furnitureData.south.offset[0]
                    itemOriginY = furnitureData.south.offset[1]
                }
                
                const { sheet: sheetKey, h, w, x, y, targetX, targetY, originX, originY } = rugSprite

                spriteSheetData[sheetKey].frames[furnitureKey] = { frame: { h, w, x, y } }      // populate spritesheet frames
                singleTextureData[furnitureKey] = { 
                    sheetKey, 
                    pivot: {x: targetX, y: targetY}, 
                    origin: {x: originX, y: originY}, 
                    itemOrigin: {x: itemOriginX, y: itemOriginY},
                    meta: {...objectData.furniture.default, ...furnitureData}
                } // map sprite to sheet
            }
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

        Object.entries(tileSpriteMeta).forEach(([tileSheetKey, {'0': tileData}]) => {
            const origin = { x: tileData.x, y: tileData.y }

            if (tileSheetKey.includes('exteriors')) {
                const x = 0 // only get the basic exterior tile
                const y = 1
                spriteSheetData[tileData.sheet].frames[tileSheetKey] = { frame: {
                    h: tileSize,
                    w: tileSize,
                    x: origin.x + x * tileSize,
                    y: origin.y + y * tileSize,
                }}
                singleTextureData[tileSheetKey] = { sheetKey: tileData.sheet, meta: {size: [2,2]} }

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
                singleTextureData[tileKey] = { sheetKey: tileData.sheet, meta: {size: [2,2]} }
            }))
        })

        this.logStage('loading sprites')

        await Promise.all(Object.entries(spriteSheetData).map(async ([sheetKey, sheetData]) => {
            const sheetTexture = await PIXI.Assets.load(`textures/sheets/${sheetKey}.png`)
            sheetTexture.source.scaleMode = PIXI.SCALE_MODES.NEAREST
            const sheet = new PIXI.Spritesheet(sheetTexture, sheetData)
            await sheet.parse()
            parsedSheets[sheetKey] = sheet

            console.log({sheetKey, sheetData})

            Object.entries(sheet.textures).forEach(([textureKey, texture]) => {
                const sprite = new PIXI.Sprite(texture)
                singleTextureData[textureKey].sprite = sprite
            })
        }))

        // DRAW ALL SPRITES IN PILE
        // Object.values(singleTextureData).forEach(({sprite}) => {
        //     app.stage.addChild(sprite)
        // })
    
        this.logStage('sprite loading done')

        this.textures = singleTextureData
    }

    #getTile(tileSheet, neighbors, isGrass) {
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

        return this.get(`${tileSheet}_${Object.values(combinedNeighbors)}`)    }

    getGrass(...args) {
        return this.#getTile(...args, true)
    }

    getSoil(...args) {
        return this.#getTile(...args, false)
    }

    getFence(fenceType, neighbors) {
        let [
            d1, o1, d2,
            o2,     o3,
            d3, o4, d4
        ] = neighbors

        // Fences are ordered with ordinals as bits (times two for some reason)
        let fenceOrd = parseInt(`${o4}${o3}${o2}`, 2) * 2

        return this.get(`${fenceType}_${fenceOrd}`)}

    getCrop(textureKey) {
        let foundTexture = this.textures[textureKey]

        if (objMistriaDataPlanner.options.has('mode_offseason') || objSpriteCategories[`crops_${objMistriaDataPlanner.season}`].includes(objSpriteKeyDict[textureKey])) {
            foundTexture = this.textures[textureKey]
        } else {
            foundTexture = this.textures['wilted_plant']
        }

        if (!foundTexture) {
            return this.get('snow_peas')
        }

        const {sprite: { texture }, pivot, origin, itemOrigin, meta} = foundTexture
        const sprite = new PIXI.Sprite(texture)
         if (pivot && origin && itemOrigin) {
            const { x, y } = pivot
            const { x: originX, y: originY } = origin
            const { x: itemOriginX, y: itemOriginY } = itemOrigin

             
            sprite.pivot.set(...[originX - itemOriginX - x, originY - itemOriginY - y])

        } else if (pivot) {
            const { x, y } = pivot
            sprite.pivot.set(...[intGridCellSize/2 - x, intGridCellSize - y])
        }

        if (meta) {
            sprite.meta = meta
        }
        
        return sprite
    }

    get(textureKey) {
        const foundTexture = this.textures[textureKey]

        if (!foundTexture) {
            return this.get('snow_peas')
        }

        const {sprite: { texture }, pivot, origin, itemOrigin, meta} = foundTexture
        const sprite = new PIXI.Sprite(texture)
         if (pivot && origin && itemOrigin) {
            const { x, y } = pivot
            const { x: originX, y: originY } = origin
            const { x: itemOriginX, y: itemOriginY } = itemOrigin

             
            sprite.pivot.set(...[originX - itemOriginX - x, originY - itemOriginY - y])

        } else if (pivot) {
            const { x, y } = pivot
            sprite.pivot.set(...[intGridCellSize/2 - x, intGridCellSize - y])
        }

        if (meta) {
            sprite.meta = meta
        }
        
        return sprite
    }

    initializeSheetData(spriteSheetMeta) {
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

    logStage(text) {
        console.log(`%c${text}`, 'font-size: 1.5em;color: #62893e;padding: 0 5px;margin: 0 10px;border: 5px ridge #22c813;background: #444444')
    }
}


