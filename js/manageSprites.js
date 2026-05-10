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

const directions = ['south', 'east', 'west', 'north']
const seasons = ['spring', 'winter', 'summer', 'fall']
const directionSeasonCombos = [...directions, ...seasons]

const fruits = [
    'apple',
    'cherry',
    'lemon',
    'acorn',
    'peach',
    'pear',
    'pinecone',
    'pomegranate',
    'orange'
]
const buildingColors = ['black', 'red', 'white', 'wood']
const childCategories = ['top_sprite', 'door_closed', 'farm_plate', 'floor_sprite']

directions.forEach(direction => {
    seasons.forEach(season => {
        directionSeasonCombos.push(`${direction}_${season}`)
    })
})

const lastSprite = (data) => {
    if (Array.isArray(data)) {
        return data.at(-1)
    }

    return data
}

class SpriteStore {
    textures
    singleTextureData = {}
    spriteSheetData
    spriteMapping
    spriteSheetMeta
    objectData
    tileSpriteMeta
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
        let variations = {}
        
        directions.forEach(direction => {
            const selectedDirection = object[direction]
            if (selectedDirection) {
                if (selectedDirection.sprite) variations[direction] = selectedDirection
                
                seasons.forEach(season => {
                    if (selectedDirection[`${season}_sprite`] || selectedDirection[`${season}_sprites`]) {
                        variations[[`${direction}_${season}`]] = {
                            ...selectedDirection, 
                            sprite: selectedDirection[`${season}_sprite`] || selectedDirection[`${season}_sprites`], 
                            top_sprite: selectedDirection[`${season}_top_sprite`],
                            floor_sprite: selectedDirection[`${season}_floor_sprite`],
                        }
                    }
                })
            }
        })

        seasons.forEach(season => {
            if (object[`${season}_sprites`]) variations[`south_${season}`] = object[`${season}_sprites`]
        })

        if (object.sprites) {
            if (typeof object.sprites === "string" || Array.isArray(object.sprites)) {
                variations[`south`] = object.sprites
            } else {
                if (object.sprites.spring) { // likely a building
                    const matchedColors = buildingColors.reduce(
                        (found, color) => {
                            const index = object.sprites.spring?.findIndex(sprite => sprite.includes(`_${color}_`));
                            return index !== -1 ? [...found, [color, index]] : found
                        }
                    ,[])

                    seasons.forEach(season => {
                        if (object.sprites[season] && matchedColors.length) {
                            matchedColors.forEach(([color, index]) => {
                                variations[`${color}_south_${season}`] = {
                                    sprite: object.sprites[season][index],
                                    door_closed: object.door_closed[index],
                                    farm_plate: object.farm_plate.sprite,
                                }
                            })
                        } else {
                            seasons.forEach(season => {
                                if (object.sprites[season]) {
                                    variations[`south_${season}`] = object.sprites[season]
                                }
                            })
                        }
                    })
                } else {
                    seasons.forEach(season => {
                        if (object.sprites[season]) {
                            variations[`south_${season}`] = object.sprites[season]
                        }
                    })
                }
            }
        }

        if (object.sprite) {
            variations[`south`] = object.sprite
        }

        if (object.chest) {
            variations[`south`] = object.chest.closed_sprite
        }
        
        return variations
    }

    #mapSingleGeneric(variations, objectKey, objectData, defaults) {
        Object.entries(variations).forEach(([variationKey, variation]) => {
            const sprite = this.spriteMapping[variation.sprite ? variation.sprite : lastSprite(variation)]["0"]
            let topSprite
                            
            let itemOriginX, itemOriginY
            if (variation.offset) {
                itemOriginX = variation.offset[0]
                itemOriginY = variation.offset[1]
            } else {
                itemOriginX = 8
                itemOriginY = 8
            }

            let spriteBasics = {...defaults}

            if (itemOriginX || itemOriginY) spriteBasics = {...spriteBasics, itemOriginX, itemOriginY}

            const children = []

            childCategories.forEach(category => {
                if (variation[category]) {
                    children.push({
                        ...spriteBasics,
                        ...this.spriteMapping[variation[category]]["0"],
                        ...objectData,
                        name: variation[category],
                        // offset: [0, variation.top_sprite_depth_offset] /// Z-INDEXES, NOT NEEDED CURRENTLY
                    })
                }
            })
            
            this.setSingleObjectData({
                ...spriteBasics, ...sprite, ...objectData,
                name: `${objectKey}_${variationKey}`,
                children: children.length ? children : undefined
            })
        })
    }

    #mapSingleFence(variations, furnitureKey, furnitureData, defaults) {
        Object.entries(variations).forEach(([variationKey, variation]) => {
            const fenceSprites = this.spriteMapping[variation.sprite]

            let itemOriginX = 0, itemOriginY = 0
            if (variation.offset) {
                itemOriginX = variation.offset[0]
                itemOriginY = variation.offset[1]
            }

            Object.entries(fenceSprites).forEach(([fenceOrd, sprite]) => {
                const fenceKey = `${furnitureKey}_${fenceOrd}`
                this.setSingleObjectData({name: `${fenceKey}_${variationKey}`, itemOriginX, itemOriginY, ...defaults, ...sprite, ...furnitureData})
            })
        })
    }

    #mapGeneric({default: defaults, ...genericObjects}) {
        Object.entries(genericObjects).forEach(([genericObjectsKey, genericObjectsData]) => {
            const variations = this.#findVariations(genericObjectsData)

            this.#mapSingleGeneric(variations, genericObjectsKey, genericObjectsData, defaults)
        })
    }

    #mapDigSites() {
        this.#mapGeneric(this.objectData.dig_site)
    }

    #mapRocks() {
        this.#mapGeneric(this.objectData.rock)
    }

    #mapStumps() {
        this.#mapGeneric(this.objectData.stump)
    }

    #mapBreakables() {
        this.#mapGeneric(this.objectData.breakable)
    }

    #mapCrops() {
        this.#mapGeneric(this.objectData.crop)
    }

    #mapGrass() {
        this.#mapGeneric(this.objectData.grass)
    }

    #mapTrees() {
        const {default: defaults, ...trees} = this.objectData.tree
        Object.entries(trees).forEach(([treeKey, treeData]) => {
            const variations = seasons.reduce((acc, season) => ({...acc, [season]: treeData.sprites.stage5[season]}), {})

            this.#mapSingleGeneric(variations, treeKey, treeData, defaults)
        })

        fruits.forEach(fruit => { // adding produce sprites manually
            this.setSingleObjectData({name: `${fruit}_produce`, ...this.spriteMapping[`spr_ui_item_${fruit}`]["0"]})
        })
    }

    #mapBuildings() {
        const {default: defaults, ...buildings} = this.objectData.building

        Object.entries(buildings).forEach(([buildingKey, buildingData]) => {
            const matchedColors = buildingColors.filter(color => buildingData.sprites.spring.find(sprite => sprite.includes(`_${color}_`)))
            const variations = this.#findVariations(buildingData)

            this.#mapSingleGeneric(variations, buildingKey, buildingData, defaults)
        })
    }

    #mapFurniture() {
        const {default: defaults, ...furniture} = this.objectData.furniture
        Object.entries(furniture).forEach(([furnitureKey, furnitureData]) => {
            const variations = this.#findVariations(furnitureData)

            if (furnitureData.fence) {
                this.#mapSingleFence(variations, furnitureKey, furnitureData, defaults)
            } else {
                this.#mapSingleGeneric(variations, furnitureKey, furnitureData, defaults)
            }
        })
    }

    #mapTiles() {
        Object.entries(this.tileSpriteMeta).forEach(([tileSheetKey, {'0': tileData}]) => {
            const origin = { x: tileData.x, y: tileData.y }

            if (tileSheetKey.includes('exteriors')) {
                const x = 0 // only get the basic exterior tile
                const y = 1

                this.setSingleObjectData({
                    name: tileSheetKey,
                    h: this.tileSize - this.tilePadding * 2,
                    w: this.tileSize - this.tilePadding * 2,
                    x: origin.x + x * this.tileSize + this.tilePadding,
                    y: origin.y + y * this.tileSize + this.tilePadding,
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
        this.spriteMapping = await (await fetch('textures/planner_sprites.json')).json()
        this.spriteSheetMeta = await (await fetch('textures/sheet_sprites.json')).json()
        this.objectData = await (await fetch('textures/fiddle_sprites.json')).json()
        this.tileSpriteMeta = await (await fetch('textures/tiles_sprites.json')).json()

        this.#logStage('INITIALIZING DATA')

        this.spriteSheetData = this.#initializeSheetData(this.spriteSheetMeta)
        const parsedSheets = {}

        this.#logStage('TILESHEET TEXTURES')

        this.#mapCrops()
        this.#mapFurniture()
        this.#mapGrass()
        this.#mapTrees()
        this.#mapDigSites()
        this.#mapRocks()
        this.#mapStumps()
        this.#mapBreakables()
        this.#mapBuildings()

        // TILES

        this.#mapTiles()

        this.setSingleObjectData({name: 'illegal', ...this.spriteMapping['spr_cast_cursor_tile_blocked_tick']["0"]})

        // LOAD SPRITES TO MEMORY
        this.#logStage('LOADING SPRITES')
        await Promise.all(Object.entries(this.spriteSheetData).map(async ([sheetKey, sheetData]) => {
            const sheetTexture = await PIXI.Assets.load(`textures/sheets/${sheetKey}.png`)
            sheetTexture.source.scaleMode = PIXI.SCALE_MODES.NEAREST
            const sheet = new PIXI.Spritesheet(sheetTexture, sheetData)
            await sheet.parse()
            parsedSheets[sheetKey] = sheet

            Object.entries(sheet.textures).forEach(([textureKey, texture]) => {
                this.singleTextureData[textureKey].texture = texture
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

    getFence(fenceType, neighbors, season) {
        let [
            d1, o1, d2,
            o2,     o3,
            d3, o4, d4
        ] = neighbors

        // Fences are ordered with orthogonals as bits
        let fenceOrd = parseInt(`${o4}${o3}${o2}${o1}`, 2)

        return this.get(`${fenceType}_${fenceOrd}`, {season, direction: "south"})}

    getCrop(textureKey) {
        const crop = this.get(textureKey)
        if (!objMistriaDataPlanner.options.has('mode_offseason') && !crop.meta.seasons.includes(objMistriaDataPlanner.season)) {
            return this.get('wilted_plant')
        }

        return crop
    }

    get(textureKey, {direction, season, color} = {}) {
        // if (textureKey === 'tree_apple') {
        //     textureKey = 'large_greenhouse'
        //     color = 'wood'
        //     season = 'spring'
        // }
        
        // Build possible keys from most specific to least
        let possibleKeys = []

        if (color && season) possibleKeys.push(`${textureKey}_${color}_south_${season}`)
        if (direction && season) possibleKeys.push(`${textureKey}_${direction}_${season}`)
        if (direction === "west" && season) possibleKeys.push(`${textureKey}_east_${season}`)
        if (direction) possibleKeys.push(`${textureKey}_${direction}`)
        if (direction === "west") possibleKeys.push(`${textureKey}_east`)
        if (season) possibleKeys.push(`${textureKey}_${season}`)
        if (season) possibleKeys.push(`${textureKey}_south_${season}`)

        // TODO remove fallback
        possibleKeys = Array.from(new Set([textureKey, ...possibleKeys, ...directionSeasonCombos.map(combo => `${textureKey}_${combo}`)])) // dedupe

        const foundKey = possibleKeys.find(key => this.textures[key])

        if (!foundKey) {
            return this.get('illegal')
        }

        const foundTexture = this.textures[foundKey]

        const {texture, pivot, origin, itemOrigin, children, meta} = foundTexture

        let container = new PIXI.Container()
        const baseSprite = new PIXI.Sprite(texture)

        container.sortableChildren = true
        container.addChild(baseSprite)
        
        if (pivot && origin) {
            const { x, y } = pivot
            const { x: originX, y: originY } = origin
            const { x: itemOriginX, y: itemOriginY } = itemOrigin || {x: 0, y: 0}

            baseSprite.pivot.set(originX - itemOriginX - x, originY - itemOriginY - y)
        } /* else if (pivot) { 
            const { x, y } = pivot
            baseSprite.pivot.set(intGridCellSize/2 - x*2, intGridCellSize/2 - y*2)
        } PROBABLY NOT NEEDED ANYMORE? */

        if (meta) {
            if (direction === "west" && meta.mirror_west && foundKey.includes('east')) {
                baseSprite.anchor.x = 1
                baseSprite.scale.x *= -1
            }

            container.meta = {...meta}
            if (foundKey.includes('east') || foundKey.includes('west') ) {
                container.meta.size = [container.meta.size[1], container.meta.size[0]]
            }

            if (meta.stump_id) {
                const stumpSprite = this.get(meta.stump_id)
                stumpSprite.zIndex = -1;

                container.meta.size = [2, 2];

                container.addChild(stumpSprite)
            }

            if (meta.fruit_data?.harvest && objMistriaDataPlanner.options.has('mode_treefruit') && (objMistriaDataPlanner.options.has('mode_offseason') || meta.fruit_data.seasons.includes(objMistriaDataPlanner.season))) {
                meta.fruit_data.positions.forEach(([x, y]) => {
                    const fruit = this.get(`${meta.fruit_data.harvest}_produce`)
                    fruit.pivot.set(x - 8, -y)

                    container.addChild(fruit)
                })
            }
        }
        
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
