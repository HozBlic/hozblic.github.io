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

const directions = ['north', 'east', 'south', 'west']
const seasons = ['spring', 'summer', 'fall', 'winter']

class SpriteStore {
    textures
    singleTextureData = {}
    spriteSheetData
    tileSize = 20
    tilePadding = 2

    constructor(test) {
        if (test !== "I know what I'm doing") { throw new Error('use static initializer await SpriteStore.getInstance()')}
    }

    static async getInstance() {
        const instance = new SpriteStore("I know what I'm doing")
        await instance.loadTextures()
        return instance 
    }

    setSingleObjectData({name, sheet: sheetKey, h, w, x, y, targetX, targetY, originX, originY, itemOriginX, itemOriginY, children, ...meta}) {
        this.spriteSheetData[sheetKey].frames[name] = { frame: { h, w, x, y } }      // populate spritesheet frames
        this.singleTextureData[name] = { 
            sheetKey, 
            meta: meta
        }

        if ((targetX || targetY) !== undefined) {
            this.singleTextureData[name].pivot = {x: targetX, y: targetY}
        }
        if ((originX || originY) !== undefined) {
            this.singleTextureData[name].origin = {x: originX, y: originY}
        }
        if ((itemOriginX || itemOriginY) !== undefined) {
            this.singleTextureData[name].itemOrigin = {x: itemOriginX, y: itemOriginY}
        }

        if (children) {
            this.singleTextureData[name].children = []

            children.forEach(child => {
                this.singleTextureData[name].children.push({name: child.name, offset: child.offset})
                this.setSingleObjectData(child)
            })
        }
    }

    #findVariations(object) {
        const variations = []
        
        directions.forEach(direction => {
            const selectedDirection = object[direction]
            if (selectedDirection) {
                if (selectedDirection.sprite) variations.push(selectedDirection.sprite)
                
                seasons.forEach(season => {
                    console.log(season, direction, selectedDirection[`${season}_sprite`])
                    if (selectedDirection[`${season}_sprite`]) variations.push(selectedDirection[`${season}_sprite`])
                })
            }
        })

        if (object.sprites) {
            seasons.forEach(season => {
                console.log(season, object.sprites[season])
                if (object.sprites[season]) variations.push(object.sprites[season])
            })
        }
        
        return variations.length ? variations : null
    }

    #mapCrops({default: defaults, ...crops}, spriteMapping) {
        Object.entries(crops).forEach(([cropKey, cropData]) => {            
            let [itemOriginX, itemOriginY] = defaults.offset

            const sprite = spriteMapping[cropData.sprites.at(-1)]['0']

            this.setSingleObjectData({name: cropKey, itemOriginX, itemOriginY, ...defaults, ...sprite, ...cropData})
        })
    }

    #mapFurniture({default: defaults, ...furniture}, spriteMapping) {
        Object.entries(furniture).forEach(([furnitureKey, furnitureData]) => {
            const variations = this.#findVariations(furnitureData)

            if (variations) console.log(variations, variations.length)

            if (furnitureData.fence) {
                const fenceSprites = spriteMapping[furnitureData.south.sprite]

                let itemOriginX = 0, itemOriginY = 0
                if (furnitureData.south.offset) {
                    itemOriginX = furnitureData.south.offset[0]
                    itemOriginY = furnitureData.south.offset[1]
                }
                

                Object.entries(fenceSprites).forEach(([fenceOrd, sprite]) => {
                    const fenceKey = `${furnitureKey}_${fenceOrd}`

                    this.setSingleObjectData({name: fenceKey, itemOriginX, itemOriginY, ...defaults, ...sprite, ...furnitureData})
                })
            } else  {
                const sprite = spriteMapping[(furnitureData.south || furnitureData.east).sprite]["0"]
                let topSprite
                                
                let itemOriginX, itemOriginY
                if (!(furnitureData.south || furnitureData.east).offset) {
                    console.log(furnitureData)
                }
                if ((furnitureData.south || furnitureData.east).offset) {
                    itemOriginX = (furnitureData.south || furnitureData.east).offset[0]
                    itemOriginY = (furnitureData.south || furnitureData.east).offset[1]
                }

                let spriteBasics = {...defaults}

                if (itemOriginX || itemOriginY) spriteBasics = {...spriteBasics, itemOriginX, itemOriginY,}

                if ((furnitureData.south || furnitureData.east).top_sprite) {
                    topSprite = {
                        ...spriteBasics,
                        name: (furnitureData.south || furnitureData.east).top_sprite,
                        ...spriteMapping[(furnitureData.south || furnitureData.east).top_sprite]["0"],
                        ...furnitureData,
                        // offset: [0, (furnitureData.south || furnitureData.east).top_sprite_depth_offset]
                    }
                }
                
                this.setSingleObjectData({
                    name: furnitureKey, ...spriteBasics, ...sprite, ...furnitureData, 
                    children: topSprite ? [topSprite] : undefined
                })
            }
        })
    }

    #mapTiles(tileMeta) {
        Object.entries(tileMeta).forEach(([tileSheetKey, {'0': tileData}]) => {
            const origin = { x: tileData.x, y: tileData.y }

            if (tileSheetKey.includes('exteriors')) {
                const x = 0 // only get the basic exterior tile
                const y = 1

                this.setSingleObjectData({
                    name: tileSheetKey,
                    h: this.tileSize,
                    w: this.tileSize,
                    x: origin.x + x * this.tileSize,
                    y: origin.y + y * this.tileSize,
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

                this.setSingleObjectData({
                    name: tileKey,
                    h: this.tileSize - this.tilePadding * 2,
                    w: this.tileSize - this.tilePadding * 2,
                    x: origin.x + x * this.tileSize + this.tilePadding,
                    y: origin.y + y * this.tileSize + this.tilePadding,
                    sheet: tileData.sheet, 
                    size: [2,2]
                })
            }))
        })
    }

    async loadTextures() {
        this.#logStage('LOADING DATA')
        const spriteMapping = await (await fetch('textures/planner_sprites.json')).json()
        const spriteSheetMeta = await (await fetch('textures/sheet_sprites.json')).json()
        const objectData = await (await fetch('textures/fiddle_sprites.json')).json()
        const tileSpriteMeta = await (await fetch('textures/tiles_sprites.json')).json()

        this.#logStage('INITIALIZING DATA')

        this.spriteSheetData = this.#initializeSheetData(spriteSheetMeta)
        const parsedSheets = {}

        this.#logStage('TILESHEET TEXTURES')

        // CROPS

        this.#mapCrops(objectData.crop, spriteMapping)
        
        // TODO BREAKABLE

        let [itemOriginX, itemOriginY] = [8, 8]
        const sprite = spriteMapping['spr_wilted_plant_1_stage1']['0']

        this.setSingleObjectData({name: 'wilted_plant', itemOriginX, itemOriginY, ...objectData.breakable.default, ...sprite})       
        
        // FURNITURE

        this.#mapFurniture(objectData.furniture, spriteMapping)

        // TILES

        this.#mapTiles(tileSpriteMeta)

        // LOAD SPRITES TO MEMORY
        this.#logStage('LOADING SPRITES')
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
    
        this.#logStage('SPRITE LOADING DONE')

        this.textures = this.singleTextureData
        
        // DEBUG: DRAW ALL SPRITES IN PILE
        // Object.values(this.singleTextureData).forEach(({sprite}) => {
        //     objPIXIapp.stage.addChild(sprite)
        // })
    }

    #getTile(tileSheet, neighbors, isGrass) {
        let [
            d1, o1, d2,
            o2,     o3,
            d3, o4, d4
        ] = neighbors

    
        if (isGrass) {
            // treating orthogonals as a full line
            if (o1) {d1=1; d2=1}
            if (o2) {d1=1; d3=1}
            if (o3) {d2=1; d4=1}
            if (o4) {d3=1; d4=1}
        } else {
            // un-neighbored diagonals have no separate case
            if (!o1 || !o2) {d1 = 0}
            if (!o1 || !o3) {d2 = 0}
            if (!o2 || !o4) {d3 = 0}
            if (!o3 || !o4) {d4 = 0}
        }

        const combinedNeighbors = [d1, o1, d2, o2, o3, d3, o4, d4]

        return this.get(`${tileSheet}_${combinedNeighbors}`)}

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

        // Fences are ordered with orthogonals as bits
        let fenceOrd = parseInt(`${o4}${o3}${o2}${o1}`, 2)

        return this.get(`${fenceType}_${fenceOrd}`)}

    getCrop(textureKey) {
        if (objMistriaDataPlanner.options.has('mode_offseason') || objSpriteCategories[`crops_${objMistriaDataPlanner.season}`].includes(objItemKeyDict[textureKey][0])) {
            return this.get(textureKey)
        } else {
            return this.get('wilted_plant')
        }
    }

    get(textureKey, {direction, season} = {}) {
        const foundTexture = this.textures[textureKey]

        if (!foundTexture) {
            return this.get('snow_peas')
        }

        const {sprite: { texture }, pivot, origin, itemOrigin, children, meta} = foundTexture

        let container = new PIXI.Container()
        const baseSprite = new PIXI.Sprite(texture)

        container.addChild(baseSprite)
        
        if (pivot && origin) {
            const { x, y } = pivot
            const { x: originX, y: originY } = origin
            const { x: itemOriginX, y: itemOriginY } = itemOrigin || {x: 0, y: 0}

            baseSprite.pivot.set(originX - itemOriginX - x, originY - itemOriginY - y)
        } else if (pivot) {
            const { x, y } = pivot
            baseSprite.pivot.set(intGridCellSize/2 - x*2, intGridCellSize/2 - y*2)
        }

        if (meta) { container.meta = meta }
        
        if (children) {
            children.forEach(child => {
                const childSprite = this.get(child.name)

                container.addChild(childSprite)
            })
        }

        return container
}

    #initializeSheetData(spriteSheetMeta) {
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

    #logStage(text) {
        console.log(`%c${text}`, 'font-size: 1.5em;color: #62893e;padding: 0 5px;margin: 0 10px;border: 5px ridge #22c813;background: #444444')
    }
}
