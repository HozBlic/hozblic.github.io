class SpriteStore {
    textures
    singleTextureData = {}
    spriteSheetData
    constructor(test) {
        if (test !== "I know what I'm doing") { throw new Error('use static initializer await SpriteStore.getInstance()')}
    }

    static async getInstance() {
        const instance = new SpriteStore("I know what I'm doing")
        await instance.loadTextures()
        return instance 
    }

    setSingleSpriteData({name, sheet: sheetKey, h, w, x, y, targetX, targetY, originX, originY, itemOriginX, itemOriginY, ...meta}, children) {
        this.spriteSheetData[sheetKey].frames[name] = { frame: { h, w, x, y } }      // populate spritesheet frames
        this.singleTextureData[name] = { 
            sheetKey, 
            meta: meta
        }

        if (targetX || targetY) {
            this.singleTextureData[name].pivot = {x: targetX, y: targetY}
        }
        if (originX || originY) {
            this.singleTextureData[name].origin = {x: originX, y: originY}
        }
        if (itemOriginX || itemOriginY) {
            this.singleTextureData[name].itemOrigin = {x: itemOriginX, y: itemOriginY}
        }

        if (children) {
            this.singleTextureData[name].children = []

            children.forEach(child => {
                this.singleTextureData[name].children.push({name: child.name, offset: child.offset})
                this.setSingleSpriteData(child)
            })
        }
    }

    async loadTextures() {
        this.logStage('loading data')
        const spriteMapping = await (await fetch('textures/planner_sprites.json')).json()
        const spriteSheetMeta = await (await fetch('textures/sheet_sprites.json')).json()
        const objectData = await (await fetch('textures/fiddle_sprites.json')).json()
        const tileSpriteMeta = await (await fetch('textures/tiles_sprites.json')).json()

        this.logStage('initializing data')

        this.spriteSheetData = this.initializeSheetData(spriteSheetMeta)
        const parsedSheets = {}

        this.logStage('tilesheet textures')

        // CROPS

        Object.entries(objectData.crop).forEach(([cropKey, cropData]) => {
            if (cropKey === 'default') return
            
            let [itemOriginX, itemOriginY] = objectData.crop.default.offset

            const sprite = spriteMapping[cropData.sprites.at(-1)]['0']

            this.setSingleSpriteData({name: cropKey, itemOriginX, itemOriginY, ...objectData.crop.default, ...sprite})
        })
        

        let [itemOriginX, itemOriginY] = [8, 8]
        const sprite = spriteMapping['spr_wilted_plant_1_stage1']['0']

        this.setSingleSpriteData({name: 'wilted_plant', itemOriginX, itemOriginY, ...objectData.breakable.default, ...sprite})       
        
        // FURNITURE

        Object.entries(objectData.furniture).forEach(([furnitureKey, furnitureData]) => {
            if (furnitureData.fence) {
                const fenceSprites = spriteMapping[furnitureData.south.sprite]

                let itemOriginX = 0, itemOriginY = 0
                if (furnitureData.south.offset) {
                    itemOriginX = furnitureData.south.offset[0]
                    itemOriginY = furnitureData.south.offset[1]
                }
                

                Object.entries(fenceSprites).forEach(([fenceOrd, sprite]) => {
                    const fenceKey = `${furnitureKey}_${fenceOrd}`

                    this.setSingleSpriteData({name: fenceKey, itemOriginX, itemOriginY, ...objectData.furniture.default, ...sprite})
                })
            } else  {
                if (furnitureKey === "default") return

                const sprite = spriteMapping[(furnitureData.south || furnitureData.east).sprite]["0"]
                let topSprite
                                
                let itemOriginX = 0, itemOriginY = 0
                if ((furnitureData.south || furnitureData.east).offset) {
                    itemOriginX = (furnitureData.south || furnitureData.east).offset[0]
                    itemOriginY = (furnitureData.south || furnitureData.east).offset[1]
                }

                const spriteBasics = {itemOriginX, itemOriginY, ...objectData.furniture.default}

                if ((furnitureData.south || furnitureData.east).top_sprite) {
                    topSprite = {
                        ...spriteBasics,
                        name: (furnitureData.south || furnitureData.east).top_sprite,
                        ...spriteMapping[(furnitureData.south || furnitureData.east).top_sprite]["0"], 
                        offset: [0, (furnitureData.south || furnitureData.east).top_sprite_depth_offset]
                    }
                }
                
                this.setSingleSpriteData({name: furnitureKey, ...spriteBasics, ...sprite}, topSprite ? [topSprite] : undefined)
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

                this.setSingleSpriteData({
                    name: tileSheetKey,
                    h: tileSize,
                    w: tileSize,
                    x: origin.x + x * tileSize,
                    y: origin.y + y * tileSize,
                    sheet: tileData.sheet, 
                    size: [2,2]
                })

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

                this.setSingleSpriteData({
                    name: tileKey,
                    h: tileSize - tilePadding * 2,
                    w: tileSize - tilePadding * 2,
                    x: origin.x + x * tileSize + tilePadding,
                    y: origin.y + y * tileSize + tilePadding,
                    sheet: tileData.sheet, 
                    size: [2,2]
                })
            }))
        })

        this.logStage('loading sprites')

        await Promise.all(Object.entries(this.spriteSheetData).map(async ([sheetKey, sheetData]) => {
            const sheetTexture = await PIXI.Assets.load(`textures/sheets/${sheetKey}.png`)
            sheetTexture.source.scaleMode = PIXI.SCALE_MODES.NEAREST
            const sheet = new PIXI.Spritesheet(sheetTexture, sheetData)
            await sheet.parse()
            parsedSheets[sheetKey] = sheet

            console.log({sheetKey, sheetData})

            Object.entries(sheet.textures).forEach(([textureKey, texture]) => {
                const sprite = new PIXI.Sprite(texture)
                this.singleTextureData[textureKey].sprite = sprite
            })
        }))

        // DRAW ALL SPRITES IN PILE
        // Object.values(this.singleTextureData).forEach(({sprite}) => {
        //     app.stage.addChild(sprite)
        // })
    
        this.logStage('sprite loading done')

        this.textures = this.singleTextureData
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

        // Fences are ordered with otrhogonals as bits
        let fenceOrd = parseInt(`${o4}${o3}${o2}${o1}`, 2)

        return this.get(`${fenceType}_${fenceOrd}`)}

    getCrop(textureKey) {
        let foundTexture = this.textures[textureKey]

        if (objMistriaDataPlanner.options.has('mode_offseason') || objSpriteCategories[`crops_${objMistriaDataPlanner.season}`].includes( getIndexBySpriteKey(textureKey))) {
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

        const {sprite: { texture }, pivot, origin, itemOrigin, children, meta} = foundTexture

        let container = new PIXI.Container()
        const baseSprite = new PIXI.Sprite(texture)

        container.addChild(baseSprite)
        
        if (pivot && origin && itemOrigin) {
            const { x, y } = pivot
            const { x: originX, y: originY } = origin
            const { x: itemOriginX, y: itemOriginY } = itemOrigin

            baseSprite.pivot.set(originX - itemOriginX - x, originY - itemOriginY - y)
        } else if (pivot) {
            const { x, y } = pivot
            baseSprite.pivot.set(intGridCellSize/2 - x, intGridCellSize - y)
        }

        if (meta) {
            container.meta = meta
        }

        if (children) {
            children.forEach(child => {
                const childSprite = this.get(child.name)

                container.addChild(childSprite)
            })
        }

        return container
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


