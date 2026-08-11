const tileMaskSoil = [
    [null             , [0,1,0,0,0,0,0,0], [0,0,0,1,0,0,0,0], [0,1,0,1,0,0,0,0], [1,1,0,1,0,0,0,0], [0,0,0,0,1,0,0,0], [0,1,0,0,1,0,0,0], [0,1,1,0,1,0,0,0]], 
    [[0,0,0,1,1,0,0,0], [0,1,0,1,1,0,0,0], [1,1,0,1,1,0,0,0], [0,1,1,1,1,0,0,0], [1,1,1,1,1,0,0,0], [0,0,0,0,0,0,1,0], [0,1,0,0,0,0,1,0], [0,0,0,1,0,0,1,0]], 
    [[0,1,0,1,0,0,1,0], [1,1,0,1,0,0,1,0], [0,0,0,0,1,0,1,0], [0,1,0,0,1,0,1,0], [0,1,1,0,1,0,1,0], [0,0,0,1,1,0,1,0], [0,1,0,1,1,0,1,0], [1,1,0,1,1,0,1,0]], 
    [[0,1,1,1,1,0,1,0], [1,1,1,1,1,0,1,0], [0,0,0,1,0,1,1,0], [0,1,0,1,0,1,1,0], [1,1,0,1,0,1,1,0], [0,0,0,1,1,1,1,0], [0,1,0,1,1,1,1,0], [1,1,0,1,1,1,1,0]], 
    [[0,1,1,1,1,1,1,0], [1,1,1,1,1,1,1,0], [0,0,0,0,1,0,1,1], [0,1,0,0,1,0,1,1], [0,1,1,0,1,0,1,1], [0,0,0,1,1,0,1,1], [0,1,0,1,1,0,1,1], [1,1,0,1,1,0,1,1]], 
    [[0,1,1,1,1,0,1,1], [1,1,1,1,1,0,1,1], [0,0,0,1,1,1,1,1], [0,1,0,1,1,1,1,1], [1,1,0,1,1,1,1,1], [0,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1], [0,0,0,0,0,0,0,0]], 
]

const tileMaskGrass = [
    [null             , [1,0,0,0,0,0,0,0], [1,1,1,0,0,0,0,0], [0,0,1,0,0,0,0,0], [0,0,1,0,1,0,0,1], [0,0,0,0,0,0,0,1], [0,0,0,0,0,1,1,1], [0,0,0,0,0,1,0,0]],
    [[1,0,0,1,0,1,0,0], [1,0,1,0,0,0,0,0], [0,0,1,0,0,0,0,1], [0,0,0,0,0,1,0,1], [1,0,0,0,0,1,0,0], [1,1,1,0,1,0,0,1], [0,0,1,0,1,1,1,1], [1,0,0,1,0,1,1,1]],
    [[1,1,1,1,0,1,0,0], [1,1,1,1,1,1,0,1], [1,1,1,0,1,1,1,1], [1,0,1,1,1,1,1,1], [1,1,1,1,0,1,1,1], [1,1,1,0,1,1,0,1], [1,0,1,0,1,1,1,1], [1,0,1,1,0,1,1,1]],
    [[1,1,1,1,0,1,0,1], [1,1,1,0,0,1,0,0], [1,0,1,0,1,0,0,1], [0,0,1,0,0,1,1,1], [1,0,0,1,0,1,0,1], [1,1,1,0,0,0,0,1], [0,0,1,0,1,1,0,1], [1,0,0,0,0,1,1,1]],
    [[1,0,1,1,0,1,0,0], [1,1,1,0,0,1,0,1], [1,0,1,0,1,1,0,1], [1,0,1,0,0,1,1,1], [1,0,1,1,0,1,0,1], [1,1,1,0,0,1,1,1], [1,0,1,1,1,1,0,1], [1,0,0,0,0,0,0,1]],
    [[0,0,1,0,0,1,0,0], [1,0,1,0,0,1,0,0], [1,0,1,0,0,0,0,1], [0,0,1,0,0,1,0,1], [1,0,0,0,0,1,0,1], [1,0,1,0,0,1,0,1], [0,0,0,0,0,0,0,0], [1,1,1,1,1,1,1,1]],
]

const directions = ['south', 'east', 'west', 'north']
const seasons = ['spring', 'winter', 'summer', 'fall']
const directionSeasonCombos = [...directions, ...seasons]

const fruits = [
    'acorn',
    'apple',
    'cherry',
    'lemon',
    // 'orange',
    'peach',
    'pear',
    'pinecone',
    'pomegranate',
]
const buildingColors = ['black', 'red', 'white', 'wood']
const childCategories = ['top_sprite', 'door_closed', 'farm_plate', 'floor_sprite', 'farm_bell', 'ramp', 'on_sprite', 'animal_toy']
const childOffsetKey = {
    door_closed: 'door_offset',
    ramp: 'ramp_offset',
}
const childZIndexes = {
    floor_sprite: -1
}

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
    textureSheet
    textures
    singleObjectData = {}
    spriteSheetData
    spriteMapping
    spriteSheetMeta
    objectData
    tileSpriteMeta
    tileSheetData = {frames: {}}
    tileSize = 16
    tilePadding = 0

    constructor(test) {
        if (test !== "I know what I'm doing") { throw new Error('use static initializer await SpriteStore.getInstance()')}
    }

    static async getInstance() {
        const instance = new SpriteStore("I know what I'm doing")
        await instance.loadTextures()
        return instance 
    }

    setSingleObjectData(objectData) {
        const {
            name, texture, sheet: sheetKey, h, w, x, y, targetX = 0, targetY = 0, originX = 0, originY = 0, children, isBuilding, isChild, parent, isTile, ...meta
        } = objectData
        const textureData = texture ? this.textureSheet._frames[texture.label] : {}
        if (isTile) {
            this.tileSheetData.frames[name] = { frame: { h, w, x, y } }
        }
        this.singleObjectData[name] = {
            sheetKey,
            texture,
            meta: meta
        }

        let pivot

        const origin = {x: originX - targetX, y: originY - targetY}

        if (isChild){
            pivot = {
                x: parent.pivot.x - (parent?.textureData?.offset?.[0] || 0) + (textureData?.offset?.[0] || 0 ) - (meta?.offset?.[0] || 0),
                y: parent.pivot.y - (parent?.textureData?.offset?.[1] || 0) + (textureData?.offset?.[1] || 0) - (meta?.offset?.[1] || 0),
            }

        } else { // is a base object
            pivot = {
                // x: 0, y: 0,
                x: (textureData?.offset?.[0] || 0) - (meta?.offset?.[0] || 0),
                y: (textureData?.offset?.[1] || 0) - (meta?.offset?.[1] || 0) 
            }
        }

        this.singleObjectData[name].pivot = { x: pivot.x, y: pivot.y }

        if (children) {
            this.singleObjectData[name].children = []

            children.forEach(child => {
                this.singleObjectData[name].children.push(child)
                this.setSingleObjectData({...child, isChild: true, parent: {...objectData, pivot, origin, textureData}, texture: this.textures[child.sprite]})
            })
        }
    }

    #findVariations(object) {
        let variations = {}

        /* WEIRD EXCEPTIONS */
        if (object.factory) {
            return { south: {sprite: object.factory.full_sprite, offset: object.south.offset} }
        }
        if (object.animal_toy?.extra_renderer) {
            return { south: {...object.south, animal_toy: {sprite: object.animal_toy.extra_renderer.inactive}} }
        }
        /* WEIRD EXCEPTIONS END */
        
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
                                    farm_plate: object.farm_plate,
                                    farm_bell: object.stable?.farm_bell ? {sprite: object.stable.farm_bell.idle, offset: object.stable.farm_bell.offset} : null,
                                    ramp: Array.isArray(object?.ramps) && object.ramps[index]
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

        if (!variations.length && object?.sprites?.biome_1) {
            variations[`south`] = object?.sprites?.biome_1
        }
        
        return variations
    }

    #mapSingleGeneric(variations, objectKey, objectData, defaults) {
        Object.entries(variations).forEach(([variationKey, variation]) => {
            const variationName = `${objectKey}_${variationKey}`
            const texture = this.textures[variation.sprite ? variation.sprite : lastSprite(variation)]
            let topSprite
                            
            let spriteBasics = {...defaults}

            const children = []

            childCategories.forEach(category => {
                const childCategory = variation[category]
                if (childCategory) {
                    let childSpriteName, childOffset
                    if (typeof childCategory === "string") {
                        childSpriteName = childCategory
                    } else {
                        childSpriteName = childCategory.sprite
                        childOffset = childCategory.offset
                    }

                    const offsetLookup = childOffsetKey[category]
                    const zIndex = childZIndexes[category]

                    if (offsetLookup && objectData[offsetLookup]) {
                        childOffset = objectData[offsetLookup]
                    }
                    
                    const child = {
                        ...defaults,
                        ...objectData[category],
                        ...this.spriteMapping[childSpriteName]["0"],
                        name: `${variationName}_${childSpriteName}`,
                        sprite: childSpriteName,
                        zIndex
                    }

                    child.offset = childOffset

                    children.push(child)
                }
            })

            const variationData = typeof variation === "string" ? {} : variation
            
            this.setSingleObjectData({
                ...variationData, ...spriteBasics, ...objectData,
                texture: texture,
                name: `${objectKey}_${variationKey}`,
                children: children.length ? children : undefined
            })
        })
    }

    #mapSingleFence(variations, furnitureKey, furnitureData, defaults) {
        Object.entries(variations).forEach(([variationKey, variation]) => {
            const fenceSpriteBase = variation.sprite

            for(let ord = 0; ord <= 15; ord++) {
                const fenceKey = `${furnitureKey}_${ord}`
                const fenceSprite = `${fenceSpriteBase}_${ord}`
                this.setSingleObjectData(
                    {name: `${fenceKey}_${variationKey}`, ...defaults, ...furnitureData, ...variation, texture: this.textures[fenceSprite]
                })
            }
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

            this.#mapSingleGeneric(variations, treeKey, {...treeData, offset: [8, 9]}, defaults)
        })

        fruits.forEach(fruit => { // adding produce sprites manually
            this.setSingleObjectData({name: `${fruit}_produce`, texture: this.textures[`spr_fruit_${fruit}_produce`]})
        })
        this.setSingleObjectData({name: 'orange_produce', texture: this.textures['spr_ui_item_orange']})
    }

    #mapBuildings() {
        const {default: defaults, ...buildings} = this.objectData.building

        Object.entries(buildings).forEach(([buildingKey, buildingData]) => {
            const matchedColors = buildingColors.filter(color => buildingData.sprites.spring.find(sprite => sprite.includes(`_${color}_`)))
            const variations = this.#findVariations(buildingData)

            this.#mapSingleGeneric(variations, buildingKey, {...buildingData, isBuilding: true}, defaults)
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
        Object.entries(this.tileSpriteMeta.frames).forEach(([tileSheetKey, tileData]) => {

            if (tileSheetKey.includes('exteriors')) {
                const x = 0 // only get the basic exterior tile
                const y = 1

                this.setSingleObjectData({
                    name: tileSheetKey,
                    h: this.tileSize - this.tilePadding * 2,
                    w: this.tileSize - this.tilePadding * 2,
                    x: tileData.frame.x + x * this.tileSize + this.tilePadding,
                    y: tileData.frame.y + y * this.tileSize + this.tilePadding,
                    isTile: true,
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
                    x: tileData.frame.x + x * this.tileSize + this.tilePadding,
                    y: tileData.frame.y + y * this.tileSize + this.tilePadding,
                    isTile: true,
                    size: [2,2]
                })
            }))
        })
    }

    async loadTextures() {
        this.#logStage('LOADING DATA')
        this.spriteMapping = (await (await fetch('../sprites/sheet_items.json?v=2')).json()).frames
        this.objectData = await (await fetch('../sprites/fiddle_sprites.json?v=2')).json()
        // this.spriteSheetMeta = await (await fetch('../json/sheet_sprites.json')).json()
        this.tileSpriteMeta = await (await fetch('../sprites/sheet_exterior.json?v=2')).json()
        this.tileSheetData.meta = this.tileSpriteMeta.meta
        this.textureSheet = (await PIXI.Assets.load('../sprites/sheet_items.json?v=2'));
        this.textureSheet.textureSource.scaleMode = PIXI.SCALE_MODES.NEAREST
        this.textures = this.textureSheet.textures;

        this.#logStage('INITIALIZING DATA')

        // this.spriteSheetData = this.#initializeSheetData(this.spriteSheetMeta)
        const parsedSheets = {}

        this.#logStage('SPRITE MAPPING')

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

        const tileSheet = await PIXI.Assets.load('../sprites/sheet_exterior.png?v=2')
        tileSheet.source.scaleMode = PIXI.SCALE_MODES.NEAREST
        const sheet = new PIXI.Spritesheet(tileSheet, this.tileSheetData)
        await sheet.parse()

        this.textures = {...this.textures, ...sheet.textures}

        this.setSingleObjectData({name: 'illegal', texture: this.textures['spr_cast_cursor_tile_blocked_tick']})
    
        this.#logStage('SPRITE LOADING DONE')
        
        // DEBUG: DRAW ALL SPRITES IN PILE
        // Object.values(this.singleObjectData).forEach(({sprite}) => {
        //     objPIXIapp.stage.addChild(sprite)
        // })
    }

    #getTile(tile, neighbors, isGrass) {
        let foundTexture
        
        if (neighbors) {
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

            const textureLookup = `${tile}_${combinedNeighbors}`

            foundTexture = this.textures[`${tile}_${combinedNeighbors}`]
        } else {
            foundTexture = this.textures[tile]
        }

        if (!foundTexture) {
            this.#logBroken(`Tile not found: ${textureLookup}`)
            return this.get('illegal')
        }

        const sprite = new PIXI.Sprite(foundTexture)
        sprite.meta = { size: [2,2] }

        return sprite
    }

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
        if (textureKey.includes('exteriors')) {return this.#getTile(textureKey)}
        // Build possible keys from most specific to least
        let possibleKeys = []

        if (color && season) possibleKeys.push(`${textureKey}_${color}_south_${season}`)
        if (color) possibleKeys.push(...seasons.map(testSeason => `${textureKey}_${color}_south_${testSeason}`))
        if (direction && season) possibleKeys.push(`${textureKey}_${direction}_${season}`)
        if (direction === "west" && season) possibleKeys.push(`${textureKey}_east_${season}`)
        if (direction) possibleKeys.push(`${textureKey}_${direction}`)
        if (direction === "west") possibleKeys.push(`${textureKey}_east`)
        if (season) possibleKeys.push(`${textureKey}_${season}`)
        if (season) possibleKeys.push(`${textureKey}_south_${season}`)

        // TODO remove fallback
        possibleKeys = Array.from(new Set([textureKey, ...possibleKeys, ...directionSeasonCombos.map(combo => `${textureKey}_${combo}`)])) // dedupe

        const foundKey = possibleKeys.find(key => this.singleObjectData[key])
        const foundObject = this.singleObjectData[foundKey]
        const foundTexture = foundObject?.texture

        if (!foundKey || !foundObject || !foundTexture) {
            this.#logBroken(`Sprite not found: ${textureKey}`)
            return this.get('illegal')
        }

        const {texture, pivot, children, meta} = foundObject

        let container = new PIXI.Container()
        const baseSprite = new PIXI.Sprite(foundTexture)

        container.sortableChildren = true
        container.addChild(baseSprite)
        
        if (pivot) {
            const { x, y } = pivot

            baseSprite.pivot.set(x, y)
        }

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
                stumpSprite.zIndex = -1

                container.meta.size = [2, 2]

                container.addChild(stumpSprite)
            }

            if (meta.fruit_data?.harvest && objMistriaDataPlanner.options.has('mode_treefruit') && (objMistriaDataPlanner.options.has('mode_offseason') || meta.fruit_data.seasons.includes(objMistriaDataPlanner.season))) {
                meta.fruit_data.positions.forEach(([x, y]) => {
                    const fruit = this.get(`${meta.fruit_data.harvest}_produce`)
                    fruit.pivot.set(x - 8, -y - 8)

                    container.addChild(fruit)
                })
            }
        }

        if (!Object.keys(container.meta).length) container.meta = { size: [2,2] }
        
        if (children) {
            children.forEach(child => {
                const childSprite = this.get(child.name)
                childSprite.zIndex = child.zIndex || 1

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
    #logBroken(text) {
        console.error(`%c${text}`, 'font-size: 1.5em;color: #c81313;padding: 0 5px;margin: 0 10px;border: 5px ridge #893e3e;background: #444444')
    }
}
