var objErrors = {};

function extractJsonBlocksFromMixedText(input) {
    const result = {};
    const regex = /([a-zA-Z0-9_]+).*?({[^\u1337]*})/g;
    let match;

    while ((match = regex.exec(input)) !== null) {
        try {
            result[match[1]] = JSON.parse(match[2]);
        } catch (e) {
            objErrors[match[1]] = e
        }
    }

    return result;
}

function showParsingError() {
    if (Object.keys(objErrors).length) {
        $('#parsing_alert').addClass('show');
        $('#parsing_alert .info').append(`Failed to parse JSON:`);

        Object.entries(objErrors).forEach(([strLabel, strError]) => {
            $('#parsing_alert .info').append('</br>');
            $('#parsing_alert .info').append('</br>');
            $('#parsing_alert .info').append(`${strLabel}:`);
            $('#parsing_alert .info').append('</br>');
            $('#parsing_alert .info').append(strError);
        });
    }
}

// Recursively search for 'gifts_given' key in the object
function objNPC(obj) {
    if (obj && typeof obj === 'object') {
        if ('adeline' in obj && typeof obj['adeline'] === 'object' && 'gifts_given' in obj['adeline']) {
            return obj;
        }
        for (const key in obj) {
            if (objNPC(obj[key])) {
                return obj[key];
            }
        }
    }
    return false;
}

function objMUSEUM(obj) {
    if (obj && typeof obj === 'object') {
        if ('museum_progress' in obj && typeof obj['museum_progress'] === 'object') {
            return obj['museum_progress'];
        }
        for (const key in obj) {
            if (objMUSEUM(obj[key])) {
                return obj[key]['museum_progress'];
            }
        }
    }
    return false;
}

function objPLAYER(obj) {
    if (obj && typeof obj === 'object') {
        if ('skill_xp' in obj && typeof obj['skill_xp'] === 'object') {
            return obj;
        }
        for (const key in obj) {
            if (objPLAYER(obj[key])) {
                return obj[key];
            }
        }
    }
    return false;
}
function objGAMEDATA(obj) {

    if (obj && typeof obj === 'object') {
        if ('t2_world_facts' in obj && typeof obj['t2_world_facts'] === 'object') {
            return obj;
        }
        for (const key in obj) {
            if (objGAMEDATA(obj[key])) {
                return obj[key];
            }
        }
    }
    return false;
}
function objGAMESTATS(obj) {
    if (obj && typeof obj === 'object') {
        if ('cosmetic_worn' in obj && typeof obj['cosmetic_worn'] === 'object') {
            return obj;
        }
        for (const key in obj) {
            if (objGAMESTATS(obj[key])) {
                return obj[key];
            }
        }
    }
    return false;
}

function cleanForWrapped(jsonBlocks) {

    var objInfoPlayer = objPLAYER(jsonBlocks);
    var objInfoGameData = objGAMEDATA(jsonBlocks);
    var objInfoGameStats = objGAMESTATS(jsonBlocks);

    var arrPlayerKeys = ['birthday', 'name', 'farm_name', 'inbox', 'recipe_unlocks', 'recipes_created', 'skill_xp', 'items_sold', 'stats'];
    var arrPlayerStatsKeys = ['base_stamina', 'free_baths', 'perks_active'];
    var arrGamedataKeys = ['playtime', 'lost_items', 't2_world_facts'];
    var arrGamestatsKeys = ['animal_eod_statuses', 'chicken_statue_uses', 'bugs_missed', 'bugs_caught', 'cutscenes_skipped', 'enemies_killed', 'dives', 'fish_caught', 'fish_missed', 'forageable_harvests', 'furniture_placed', 'gifts_given', 'items_eaten', 'manual_saves', 'menu_opens', 'perk_acquirements', 'purchases', 'tree_harvests', 'wishing_well_uses', 'set_completions', 'renown_level_ups', 'faints', 'deaths', 'npcs_spoken_to', 'end_of_day_balance', 'end_of_day_stats', 'bedtimes', 'perks', 'items_sold_each_day', 'location_visits'];

    for (let key in objInfoPlayer) {
        if (!arrPlayerKeys.includes(key)) {
            delete objInfoPlayer[key];
        }
        if (key == 'stats') {
            for (let keyStats in objInfoPlayer[key]) {
                if (!arrPlayerStatsKeys.includes(keyStats)) {
                    delete objInfoPlayer[key][keyStats];
                }
            }
        }
    }

    for (let key in objInfoGameData) {
        if (!arrGamedataKeys.includes(key)) {
            delete objInfoGameData[key];
        }
        if (key == 't2_world_facts') {
            for (let keyFacts in objInfoGameData[key]) {
                if (!(keyFacts.endsWith("_level") || keyFacts.endsWith("_was_last_spoken_to") || keyFacts === 'date_time')) {
                    delete objInfoGameData[key][keyFacts];
                }
            }
        }
    }

    for (let key in objInfoGameStats) {
        if (!arrGamestatsKeys.includes(key)) {
            delete objInfoGameStats[key];
        }
    }

    var jsonWrapped = {
        'player': objInfoPlayer,
        'gamedata': objInfoGameData,
        'game_stats': objInfoGameStats,
    }

    localStorage.setItem('mistria_wrapped', JSON.stringify(jsonWrapped));
}

function extractAlmanacKeys(arrKeys) {
    if (!arrKeys) return false;
    return objBuild.almanacItems.filter(strItemKey => arrKeys.includes(strItemKey));
}

function extractGiftKeys(objNpcs) {
    if (typeof objNpcs === 'object') {
        let arrGivenGifts = [];
        for (const [npcname, value] of Object.entries(objNpcs)) {
            for (const [key, strItemKey] of Object.entries(objNpcs[npcname]['gifts_given'])) {
                if (objTabs.gifts.categories[npcname]['subcategories']['liked']['items'].includes(strItemKey) || objTabs.gifts.categories[npcname]['subcategories']['loved']['items'].includes(strItemKey)) {
                    arrGivenGifts.push(`${npcname}_${strItemKey}`);
                }
            }
        }
        return arrGivenGifts;
    } else {
        return false;
    }
}

function extractAnimalData(objAnimalsData) {
    if (typeof objAnimalsData === 'object') {
        var arrAnimalsData = [];
        Object.entries(objAnimalsData['animal_variant_unlocks']).forEach(([strItemKey, arrAnimals]) => {
            var arrVariants = arrAnimals.map(function (x) { return `${strItemKey}_${x}`; });
            arrAnimalsData.push(...arrVariants);
        });
        Object.entries(objAnimalsData['animal_cosmetic_unlocks']).forEach(([strItemKey, arrAnimals]) => {
            var arrVariants = arrAnimals.map(function (x) { return `${strItemKey}_${x}`; });
            arrAnimalsData.push(...arrVariants);
        });

        var arrVariants = objAnimalsData['pet_cosmetic_sets_unlocked'].map(function (x) { return `pets_${x}`; });
        arrAnimalsData.push(...arrVariants);

        var arrPetSkins = objAnimalsData['items_acquired'].filter(strItemKey => strItemKey.startsWith("pet_skin_"));
        arrAnimalsData.push(...arrPetSkins);
        return arrAnimalsData;
    } else {
        return false;
    }
}

function extractPerksData(objPlayerData, boolDisabled = false) {
    if (typeof objPlayerData === 'object') {
        var arrPerksData = [];

        Object.entries(objPlayerData['stats']['perks_active']).forEach(([strItemKey, bolActive]) => {
            if (boolDisabled && bolActive === false) {
                arrPerksData.push(strItemKey);
            }
            if (!boolDisabled && (bolActive === true || bolActive === false)) {
                arrPerksData.push(strItemKey);
            }
        });

        return arrPerksData;
    } else {
        return false;
    }
}

function objLOCATION(obj, strLocationID) {
    if (obj && typeof obj === 'object') {
        if ('size_x' in obj && 'location_id' in obj && typeof obj['location_id'] === 'string' && obj['location_id'] === strLocationID) {
            return obj;
        }
        for (const key in obj) {
            if (objLOCATION(obj[key], strLocationID)) {
                return obj[key];
            }
        }
    }
    return false;
}

function copyClipboard(objElem, strText) {
    var el = document.createElement('textarea');
    el.value = strText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    $(objElem).addClass('copied').delay(3000).queue(function (next) {
        $(this).removeClass('copied');
    });
}

function copyClipboardJSON(objElem) {
    var strJson = $('#settings_json').val();
    if (isJsonString(strJson)) {

        const [bolChangesDetected, arrChanges, objNewData] = compareData(strJson);

        if (bolChangesDetected) {
            $('#json_alert').addClass('show').addClass('yellow');
            $('#json_alert .info').html('You have copied JSON code that contains unsaved changes');
        }

        var el = document.createElement('textarea');
        el.value = strJson;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        $(objElem).addClass('copied').delay(3000).queue(function (next) {
            $(this).removeClass('copied');
        });

    } else {
        $('#json_alert').addClass('show');
        $('#json_alert .info').html('JSON code is invalid');
    }
}

function openJsonPopup() {
    $('#extracting_alert').removeClass('show').removeClass('green').removeClass('yellow');
    $('#json_alert').removeClass('show').removeClass('green').removeClass('yellow');
    $('#json_button_popup').show();
}

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function compareData(strJson) {

    const strPage = $('#json_button_popup').attr('data-page');

    let objNewData = JSON.parse(strJson);
    var bolChangesDetected = false;
    let arrChanges = [];
    let objOldData = {};

    switch (strPage) {
        case "tracker":
            arrTabs.forEach(function (strTab) {
                if (strTab in objMistriaData) {
                    objOldData[strTab] = [...objMistriaData[strTab]];
                }
            });
            objOldData.options = [...objMistriaData.options];
            objOldData.favorites = [...objMistriaData.favorites];
            if ('sort' in objMistriaData) {
                objOldData.sort = objMistriaData.sort;
            }
            if ('tab' in objMistriaData) {
                objOldData.tab = objMistriaData.tab;
            }

            //remove duplicates for new data
            arrTabs.forEach(function (strTab) {
                if (strTab in objMistriaData) {
                    objNewData[strTab] = [...new Set(objNewData[strTab])];
                }
            });
            objNewData.options = [...new Set(objNewData.options)];

            //sort arrays for comparison
            arrTabs.forEach(function (strTab) {
                if (strTab in objOldData) {
                    objOldData[strTab].sort();
                }
                if (strTab in objNewData) {
                    objNewData[strTab].sort();
                }
            });

            // Compare old and new data
            var strOldSort = '';
            var strNewSort = '';
            switch (objOldData.sort) {
                case 'az':
                    strOldSort = 'Alphabetical (A-Z)';
                    break;
                case 'za':
                    strOldSort = 'Alphabetical (Z-A)';
                    break;
                default:
                    strOldSort = 'In game';
            }

            switch (objNewData.sort) {
                case 'az':
                    strNewSort = 'Alphabetical (A-Z)';
                    break;
                case 'za':
                    strNewSort = 'Alphabetical (Z-A)';
                    break;
                default:
                    strNewSort = 'In game';
            }

            arrTabs.forEach(function (strTab) {
                if (objOldData[strTab].length === objNewData[strTab].length && objOldData[strTab].every((value, index) => value === objNewData[strTab][index])) {
                    arrChanges.push(`${capitalizeFirstLetter(strTab)}: ${objOldData[strTab].length} 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15.9"
                                    viewBox="0 0 16 15.9">
                                    <path id="arrow_right"
                                        d="M2985.922-7255h-.083l-.017,0h-.01l-.018,0h-.009l-.019,0h-.008l-.02,0h-.008l-.019,0-.009,0-.018,0-.01,0a.056.056,0,0,1-.016,0l-.012,0-.014,0-.014,0-.011,0-.017,0-.008,0-.02-.006-.006,0-.021-.009h0l-.023-.01h0l-.014-.005h0l-.01,0h0l-.012,0-.007,0a.072.072,0,0,1-.017-.008l-.014-.007-.009,0-.021-.012h0a1.147,1.147,0,0,1-.257-.194l-6.82-6.9a1.129,1.129,0,0,1,.008-1.6,1.129,1.129,0,0,1,1.6.009l4.888,4.943v-11a1.131,1.131,0,0,1,1.129-1.129,1.131,1.131,0,0,1,1.13,1.129v10.993l4.889-4.94a1.128,1.128,0,0,1,1.6-.009,1.129,1.129,0,0,1,.008,1.6l-6.8,6.88a1.235,1.235,0,0,1-.108.1l0,0-.012.009,0,0h0l-.008.005-.009.007,0,0-.011.008s0,0-.006,0l-.005,0-.013.009,0,0h0l0,0-.014.009h0l0,0,0,0a1.089,1.089,0,0,1-.135.072h0a.144.144,0,0,1-.022.01l0,0-.02.008-.009,0-.016.006-.013,0-.012,0-.016.005-.009,0-.019.006h-.006l-.021.006h0l-.023.005h0l-.024.005h0l-.024,0h0l-.024,0h0l-.024,0h0l-.022,0h-.007l-.02,0h-.137Z"
                                        transform="translate(7271.001 2993.899) rotate(-90)" fill="#242424" />
                                </svg>
                                ${objNewData[strTab].length}`);
                } else {
                    bolChangesDetected = true;
                    arrChanges.push(`<b>${capitalizeFirstLetter(strTab)}: ${objOldData[strTab].length} 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15.9"
                                    viewBox="0 0 16 15.9">
                                    <path id="arrow_right"
                                        d="M2985.922-7255h-.083l-.017,0h-.01l-.018,0h-.009l-.019,0h-.008l-.02,0h-.008l-.019,0-.009,0-.018,0-.01,0a.056.056,0,0,1-.016,0l-.012,0-.014,0-.014,0-.011,0-.017,0-.008,0-.02-.006-.006,0-.021-.009h0l-.023-.01h0l-.014-.005h0l-.01,0h0l-.012,0-.007,0a.072.072,0,0,1-.017-.008l-.014-.007-.009,0-.021-.012h0a1.147,1.147,0,0,1-.257-.194l-6.82-6.9a1.129,1.129,0,0,1,.008-1.6,1.129,1.129,0,0,1,1.6.009l4.888,4.943v-11a1.131,1.131,0,0,1,1.129-1.129,1.131,1.131,0,0,1,1.13,1.129v10.993l4.889-4.94a1.128,1.128,0,0,1,1.6-.009,1.129,1.129,0,0,1,.008,1.6l-6.8,6.88a1.235,1.235,0,0,1-.108.1l0,0-.012.009,0,0h0l-.008.005-.009.007,0,0-.011.008s0,0-.006,0l-.005,0-.013.009,0,0h0l0,0-.014.009h0l0,0,0,0a1.089,1.089,0,0,1-.135.072h0a.144.144,0,0,1-.022.01l0,0-.02.008-.009,0-.016.006-.013,0-.012,0-.016.005-.009,0-.019.006h-.006l-.021.006h0l-.023.005h0l-.024.005h0l-.024,0h0l-.024,0h0l-.024,0h0l-.022,0h-.007l-.02,0h-.137Z"
                                        transform="translate(7271.001 2993.899) rotate(-90)" fill="#242424" />
                                </svg>
                                ${objNewData[strTab].length}</b>`);
                }
            });

            if (objOldData.options.length === objNewData.options.length && objOldData.options.every((value, index) => value === objNewData.options[index])) {
                arrChanges.push(`Layout toggles: ${objOldData.options.length} 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15.9"
                                    viewBox="0 0 16 15.9">
                                    <path id="arrow_right"
                                        d="M2985.922-7255h-.083l-.017,0h-.01l-.018,0h-.009l-.019,0h-.008l-.02,0h-.008l-.019,0-.009,0-.018,0-.01,0a.056.056,0,0,1-.016,0l-.012,0-.014,0-.014,0-.011,0-.017,0-.008,0-.02-.006-.006,0-.021-.009h0l-.023-.01h0l-.014-.005h0l-.01,0h0l-.012,0-.007,0a.072.072,0,0,1-.017-.008l-.014-.007-.009,0-.021-.012h0a1.147,1.147,0,0,1-.257-.194l-6.82-6.9a1.129,1.129,0,0,1,.008-1.6,1.129,1.129,0,0,1,1.6.009l4.888,4.943v-11a1.131,1.131,0,0,1,1.129-1.129,1.131,1.131,0,0,1,1.13,1.129v10.993l4.889-4.94a1.128,1.128,0,0,1,1.6-.009,1.129,1.129,0,0,1,.008,1.6l-6.8,6.88a1.235,1.235,0,0,1-.108.1l0,0-.012.009,0,0h0l-.008.005-.009.007,0,0-.011.008s0,0-.006,0l-.005,0-.013.009,0,0h0l0,0-.014.009h0l0,0,0,0a1.089,1.089,0,0,1-.135.072h0a.144.144,0,0,1-.022.01l0,0-.02.008-.009,0-.016.006-.013,0-.012,0-.016.005-.009,0-.019.006h-.006l-.021.006h0l-.023.005h0l-.024.005h0l-.024,0h0l-.024,0h0l-.024,0h0l-.022,0h-.007l-.02,0h-.137Z"
                                        transform="translate(7271.001 2993.899) rotate(-90)" fill="#242424" />
                                </svg>
                                ${objNewData.options.length}`);
            } else {
                bolChangesDetected = true;
                arrChanges.push(`<b>Layout toggles: ${objOldData.options.length} 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15.9"
                                    viewBox="0 0 16 15.9">
                                    <path id="arrow_right"
                                        d="M2985.922-7255h-.083l-.017,0h-.01l-.018,0h-.009l-.019,0h-.008l-.02,0h-.008l-.019,0-.009,0-.018,0-.01,0a.056.056,0,0,1-.016,0l-.012,0-.014,0-.014,0-.011,0-.017,0-.008,0-.02-.006-.006,0-.021-.009h0l-.023-.01h0l-.014-.005h0l-.01,0h0l-.012,0-.007,0a.072.072,0,0,1-.017-.008l-.014-.007-.009,0-.021-.012h0a1.147,1.147,0,0,1-.257-.194l-6.82-6.9a1.129,1.129,0,0,1,.008-1.6,1.129,1.129,0,0,1,1.6.009l4.888,4.943v-11a1.131,1.131,0,0,1,1.129-1.129,1.131,1.131,0,0,1,1.13,1.129v10.993l4.889-4.94a1.128,1.128,0,0,1,1.6-.009,1.129,1.129,0,0,1,.008,1.6l-6.8,6.88a1.235,1.235,0,0,1-.108.1l0,0-.012.009,0,0h0l-.008.005-.009.007,0,0-.011.008s0,0-.006,0l-.005,0-.013.009,0,0h0l0,0-.014.009h0l0,0,0,0a1.089,1.089,0,0,1-.135.072h0a.144.144,0,0,1-.022.01l0,0-.02.008-.009,0-.016.006-.013,0-.012,0-.016.005-.009,0-.019.006h-.006l-.021.006h0l-.023.005h0l-.024.005h0l-.024,0h0l-.024,0h0l-.024,0h0l-.022,0h-.007l-.02,0h-.137Z"
                                        transform="translate(7271.001 2993.899) rotate(-90)" fill="#242424" />
                                </svg>
                                ${objNewData.options.length}</b>`);
            }

            if (strOldSort === strNewSort) {
                arrChanges.push(`Sort settings: ${strOldSort} 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15.9"
                                    viewBox="0 0 16 15.9">
                                    <path id="arrow_right"
                                        d="M2985.922-7255h-.083l-.017,0h-.01l-.018,0h-.009l-.019,0h-.008l-.02,0h-.008l-.019,0-.009,0-.018,0-.01,0a.056.056,0,0,1-.016,0l-.012,0-.014,0-.014,0-.011,0-.017,0-.008,0-.02-.006-.006,0-.021-.009h0l-.023-.01h0l-.014-.005h0l-.01,0h0l-.012,0-.007,0a.072.072,0,0,1-.017-.008l-.014-.007-.009,0-.021-.012h0a1.147,1.147,0,0,1-.257-.194l-6.82-6.9a1.129,1.129,0,0,1,.008-1.6,1.129,1.129,0,0,1,1.6.009l4.888,4.943v-11a1.131,1.131,0,0,1,1.129-1.129,1.131,1.131,0,0,1,1.13,1.129v10.993l4.889-4.94a1.128,1.128,0,0,1,1.6-.009,1.129,1.129,0,0,1,.008,1.6l-6.8,6.88a1.235,1.235,0,0,1-.108.1l0,0-.012.009,0,0h0l-.008.005-.009.007,0,0-.011.008s0,0-.006,0l-.005,0-.013.009,0,0h0l0,0-.014.009h0l0,0,0,0a1.089,1.089,0,0,1-.135.072h0a.144.144,0,0,1-.022.01l0,0-.02.008-.009,0-.016.006-.013,0-.012,0-.016.005-.009,0-.019.006h-.006l-.021.006h0l-.023.005h0l-.024.005h0l-.024,0h0l-.024,0h0l-.024,0h0l-.022,0h-.007l-.02,0h-.137Z"
                                        transform="translate(7271.001 2993.899) rotate(-90)" fill="#242424" />
                                </svg>
                                ${strNewSort}`);
            } else {
                bolChangesDetected = true;
                arrChanges.push(`<b>Sort settings: ${strOldSort} 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15.9"
                                    viewBox="0 0 16 15.9">
                                    <path id="arrow_right"
                                        d="M2985.922-7255h-.083l-.017,0h-.01l-.018,0h-.009l-.019,0h-.008l-.02,0h-.008l-.019,0-.009,0-.018,0-.01,0a.056.056,0,0,1-.016,0l-.012,0-.014,0-.014,0-.011,0-.017,0-.008,0-.02-.006-.006,0-.021-.009h0l-.023-.01h0l-.014-.005h0l-.01,0h0l-.012,0-.007,0a.072.072,0,0,1-.017-.008l-.014-.007-.009,0-.021-.012h0a1.147,1.147,0,0,1-.257-.194l-6.82-6.9a1.129,1.129,0,0,1,.008-1.6,1.129,1.129,0,0,1,1.6.009l4.888,4.943v-11a1.131,1.131,0,0,1,1.129-1.129,1.131,1.131,0,0,1,1.13,1.129v10.993l4.889-4.94a1.128,1.128,0,0,1,1.6-.009,1.129,1.129,0,0,1,.008,1.6l-6.8,6.88a1.235,1.235,0,0,1-.108.1l0,0-.012.009,0,0h0l-.008.005-.009.007,0,0-.011.008s0,0-.006,0l-.005,0-.013.009,0,0h0l0,0-.014.009h0l0,0,0,0a1.089,1.089,0,0,1-.135.072h0a.144.144,0,0,1-.022.01l0,0-.02.008-.009,0-.016.006-.013,0-.012,0-.016.005-.009,0-.019.006h-.006l-.021.006h0l-.023.005h0l-.024.005h0l-.024,0h0l-.024,0h0l-.024,0h0l-.022,0h-.007l-.02,0h-.137Z"
                                        transform="translate(7271.001 2993.899) rotate(-90)" fill="#242424" />
                                </svg>
                                ${strNewSort}</b>`);
            }
            break;
        case "planner":
            objOldData.options = [...objMistriaDataPlanner.options];

            if ('season' in objMistriaDataPlanner) {
                objOldData.season = objMistriaDataPlanner.season;
            }

            if ('house_upgrade' in objMistriaDataPlanner) {
                objOldData.house_upgrade = objMistriaDataPlanner.house_upgrade;
            }

            if ('multiplier' in objMistriaDataPlanner) {
                objOldData.multiplier = objMistriaDataPlanner.multiplier;
            }

            if ('offsetCanvas' in objMistriaDataPlanner) {
                objOldData.offsetCanvas = JSON.stringify(objMistriaDataPlanner.offsetCanvas);
            }

            if ('layout' in objMistriaDataPlanner) {
                objOldData.layout = JSON.stringify(objMistriaDataPlanner.layout);
            }

            if (objOldData.season === objNewData.season) {
                arrChanges.push(`Season: ${objOldData.season} 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15.9"
                                    viewBox="0 0 16 15.9">
                                    <path id="arrow_right"
                                        d="M2985.922-7255h-.083l-.017,0h-.01l-.018,0h-.009l-.019,0h-.008l-.02,0h-.008l-.019,0-.009,0-.018,0-.01,0a.056.056,0,0,1-.016,0l-.012,0-.014,0-.014,0-.011,0-.017,0-.008,0-.02-.006-.006,0-.021-.009h0l-.023-.01h0l-.014-.005h0l-.01,0h0l-.012,0-.007,0a.072.072,0,0,1-.017-.008l-.014-.007-.009,0-.021-.012h0a1.147,1.147,0,0,1-.257-.194l-6.82-6.9a1.129,1.129,0,0,1,.008-1.6,1.129,1.129,0,0,1,1.6.009l4.888,4.943v-11a1.131,1.131,0,0,1,1.129-1.129,1.131,1.131,0,0,1,1.13,1.129v10.993l4.889-4.94a1.128,1.128,0,0,1,1.6-.009,1.129,1.129,0,0,1,.008,1.6l-6.8,6.88a1.235,1.235,0,0,1-.108.1l0,0-.012.009,0,0h0l-.008.005-.009.007,0,0-.011.008s0,0-.006,0l-.005,0-.013.009,0,0h0l0,0-.014.009h0l0,0,0,0a1.089,1.089,0,0,1-.135.072h0a.144.144,0,0,1-.022.01l0,0-.02.008-.009,0-.016.006-.013,0-.012,0-.016.005-.009,0-.019.006h-.006l-.021.006h0l-.023.005h0l-.024.005h0l-.024,0h0l-.024,0h0l-.024,0h0l-.022,0h-.007l-.02,0h-.137Z"
                                        transform="translate(7271.001 2993.899) rotate(-90)" fill="#242424" />
                                </svg>
                                ${objNewData.season}`);
            } else {
                bolChangesDetected = true;
                arrChanges.push(`<b>Season: ${objOldData.season} 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15.9"
                                    viewBox="0 0 16 15.9">
                                    <path id="arrow_right"
                                        d="M2985.922-7255h-.083l-.017,0h-.01l-.018,0h-.009l-.019,0h-.008l-.02,0h-.008l-.019,0-.009,0-.018,0-.01,0a.056.056,0,0,1-.016,0l-.012,0-.014,0-.014,0-.011,0-.017,0-.008,0-.02-.006-.006,0-.021-.009h0l-.023-.01h0l-.014-.005h0l-.01,0h0l-.012,0-.007,0a.072.072,0,0,1-.017-.008l-.014-.007-.009,0-.021-.012h0a1.147,1.147,0,0,1-.257-.194l-6.82-6.9a1.129,1.129,0,0,1,.008-1.6,1.129,1.129,0,0,1,1.6.009l4.888,4.943v-11a1.131,1.131,0,0,1,1.129-1.129,1.131,1.131,0,0,1,1.13,1.129v10.993l4.889-4.94a1.128,1.128,0,0,1,1.6-.009,1.129,1.129,0,0,1,.008,1.6l-6.8,6.88a1.235,1.235,0,0,1-.108.1l0,0-.012.009,0,0h0l-.008.005-.009.007,0,0-.011.008s0,0-.006,0l-.005,0-.013.009,0,0h0l0,0-.014.009h0l0,0,0,0a1.089,1.089,0,0,1-.135.072h0a.144.144,0,0,1-.022.01l0,0-.02.008-.009,0-.016.006-.013,0-.012,0-.016.005-.009,0-.019.006h-.006l-.021.006h0l-.023.005h0l-.024.005h0l-.024,0h0l-.024,0h0l-.024,0h0l-.022,0h-.007l-.02,0h-.137Z"
                                        transform="translate(7271.001 2993.899) rotate(-90)" fill="#242424" />
                                </svg>
                                ${objNewData.season}</b>`);
            }
            if (objOldData.house_upgrade === objNewData.house_upgrade) {
                arrChanges.push(`House Upgrade: ${objOldData.house_upgrade} 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15.9"
                                    viewBox="0 0 16 15.9">
                                    <path id="arrow_right"
                                        d="M2985.922-7255h-.083l-.017,0h-.01l-.018,0h-.009l-.019,0h-.008l-.02,0h-.008l-.019,0-.009,0-.018,0-.01,0a.056.056,0,0,1-.016,0l-.012,0-.014,0-.014,0-.011,0-.017,0-.008,0-.02-.006-.006,0-.021-.009h0l-.023-.01h0l-.014-.005h0l-.01,0h0l-.012,0-.007,0a.072.072,0,0,1-.017-.008l-.014-.007-.009,0-.021-.012h0a1.147,1.147,0,0,1-.257-.194l-6.82-6.9a1.129,1.129,0,0,1,.008-1.6,1.129,1.129,0,0,1,1.6.009l4.888,4.943v-11a1.131,1.131,0,0,1,1.129-1.129,1.131,1.131,0,0,1,1.13,1.129v10.993l4.889-4.94a1.128,1.128,0,0,1,1.6-.009,1.129,1.129,0,0,1,.008,1.6l-6.8,6.88a1.235,1.235,0,0,1-.108.1l0,0-.012.009,0,0h0l-.008.005-.009.007,0,0-.011.008s0,0-.006,0l-.005,0-.013.009,0,0h0l0,0-.014.009h0l0,0,0,0a1.089,1.089,0,0,1-.135.072h0a.144.144,0,0,1-.022.01l0,0-.02.008-.009,0-.016.006-.013,0-.012,0-.016.005-.009,0-.019.006h-.006l-.021.006h0l-.023.005h0l-.024.005h0l-.024,0h0l-.024,0h0l-.024,0h0l-.022,0h-.007l-.02,0h-.137Z"
                                        transform="translate(7271.001 2993.899) rotate(-90)" fill="#242424" />
                                </svg>
                                ${objNewData.house_upgrade}`);
            } else {
                bolChangesDetected = true;
                arrChanges.push(`<b>House Upgrade: ${objOldData.house_upgrade} 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15.9"
                                    viewBox="0 0 16 15.9">
                                    <path id="arrow_right"
                                        d="M2985.922-7255h-.083l-.017,0h-.01l-.018,0h-.009l-.019,0h-.008l-.02,0h-.008l-.019,0-.009,0-.018,0-.01,0a.056.056,0,0,1-.016,0l-.012,0-.014,0-.014,0-.011,0-.017,0-.008,0-.02-.006-.006,0-.021-.009h0l-.023-.01h0l-.014-.005h0l-.01,0h0l-.012,0-.007,0a.072.072,0,0,1-.017-.008l-.014-.007-.009,0-.021-.012h0a1.147,1.147,0,0,1-.257-.194l-6.82-6.9a1.129,1.129,0,0,1,.008-1.6,1.129,1.129,0,0,1,1.6.009l4.888,4.943v-11a1.131,1.131,0,0,1,1.129-1.129,1.131,1.131,0,0,1,1.13,1.129v10.993l4.889-4.94a1.128,1.128,0,0,1,1.6-.009,1.129,1.129,0,0,1,.008,1.6l-6.8,6.88a1.235,1.235,0,0,1-.108.1l0,0-.012.009,0,0h0l-.008.005-.009.007,0,0-.011.008s0,0-.006,0l-.005,0-.013.009,0,0h0l0,0-.014.009h0l0,0,0,0a1.089,1.089,0,0,1-.135.072h0a.144.144,0,0,1-.022.01l0,0-.02.008-.009,0-.016.006-.013,0-.012,0-.016.005-.009,0-.019.006h-.006l-.021.006h0l-.023.005h0l-.024.005h0l-.024,0h0l-.024,0h0l-.024,0h0l-.022,0h-.007l-.02,0h-.137Z"
                                        transform="translate(7271.001 2993.899) rotate(-90)" fill="#242424" />
                                </svg>
                                ${objNewData.house_upgrade}</b>`);
            }
            if (objOldData.multiplier === objNewData.multiplier) {
                arrChanges.push(`Zoom: ${objOldData.multiplier} 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15.9"
                                    viewBox="0 0 16 15.9">
                                    <path id="arrow_right"
                                        d="M2985.922-7255h-.083l-.017,0h-.01l-.018,0h-.009l-.019,0h-.008l-.02,0h-.008l-.019,0-.009,0-.018,0-.01,0a.056.056,0,0,1-.016,0l-.012,0-.014,0-.014,0-.011,0-.017,0-.008,0-.02-.006-.006,0-.021-.009h0l-.023-.01h0l-.014-.005h0l-.01,0h0l-.012,0-.007,0a.072.072,0,0,1-.017-.008l-.014-.007-.009,0-.021-.012h0a1.147,1.147,0,0,1-.257-.194l-6.82-6.9a1.129,1.129,0,0,1,.008-1.6,1.129,1.129,0,0,1,1.6.009l4.888,4.943v-11a1.131,1.131,0,0,1,1.129-1.129,1.131,1.131,0,0,1,1.13,1.129v10.993l4.889-4.94a1.128,1.128,0,0,1,1.6-.009,1.129,1.129,0,0,1,.008,1.6l-6.8,6.88a1.235,1.235,0,0,1-.108.1l0,0-.012.009,0,0h0l-.008.005-.009.007,0,0-.011.008s0,0-.006,0l-.005,0-.013.009,0,0h0l0,0-.014.009h0l0,0,0,0a1.089,1.089,0,0,1-.135.072h0a.144.144,0,0,1-.022.01l0,0-.02.008-.009,0-.016.006-.013,0-.012,0-.016.005-.009,0-.019.006h-.006l-.021.006h0l-.023.005h0l-.024.005h0l-.024,0h0l-.024,0h0l-.024,0h0l-.022,0h-.007l-.02,0h-.137Z"
                                        transform="translate(7271.001 2993.899) rotate(-90)" fill="#242424" />
                                </svg>
                                ${objNewData.multiplier}`);
            } else {
                bolChangesDetected = true;
                arrChanges.push(`<b>Zoom: ${objOldData.multiplier} 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15.9"
                                    viewBox="0 0 16 15.9">
                                    <path id="arrow_right"
                                        d="M2985.922-7255h-.083l-.017,0h-.01l-.018,0h-.009l-.019,0h-.008l-.02,0h-.008l-.019,0-.009,0-.018,0-.01,0a.056.056,0,0,1-.016,0l-.012,0-.014,0-.014,0-.011,0-.017,0-.008,0-.02-.006-.006,0-.021-.009h0l-.023-.01h0l-.014-.005h0l-.01,0h0l-.012,0-.007,0a.072.072,0,0,1-.017-.008l-.014-.007-.009,0-.021-.012h0a1.147,1.147,0,0,1-.257-.194l-6.82-6.9a1.129,1.129,0,0,1,.008-1.6,1.129,1.129,0,0,1,1.6.009l4.888,4.943v-11a1.131,1.131,0,0,1,1.129-1.129,1.131,1.131,0,0,1,1.13,1.129v10.993l4.889-4.94a1.128,1.128,0,0,1,1.6-.009,1.129,1.129,0,0,1,.008,1.6l-6.8,6.88a1.235,1.235,0,0,1-.108.1l0,0-.012.009,0,0h0l-.008.005-.009.007,0,0-.011.008s0,0-.006,0l-.005,0-.013.009,0,0h0l0,0-.014.009h0l0,0,0,0a1.089,1.089,0,0,1-.135.072h0a.144.144,0,0,1-.022.01l0,0-.02.008-.009,0-.016.006-.013,0-.012,0-.016.005-.009,0-.019.006h-.006l-.021.006h0l-.023.005h0l-.024.005h0l-.024,0h0l-.024,0h0l-.024,0h0l-.022,0h-.007l-.02,0h-.137Z"
                                        transform="translate(7271.001 2993.899) rotate(-90)" fill="#242424" />
                                </svg>
                                ${objNewData.multiplier}</b>`);
            }
            if (objOldData.offsetCanvas === JSON.stringify(objNewData.offsetCanvas)) {
                arrChanges.push(`Map offset: ${objOldData.offsetCanvas} 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15.9"
                                    viewBox="0 0 16 15.9">
                                    <path id="arrow_right"
                                        d="M2985.922-7255h-.083l-.017,0h-.01l-.018,0h-.009l-.019,0h-.008l-.02,0h-.008l-.019,0-.009,0-.018,0-.01,0a.056.056,0,0,1-.016,0l-.012,0-.014,0-.014,0-.011,0-.017,0-.008,0-.02-.006-.006,0-.021-.009h0l-.023-.01h0l-.014-.005h0l-.01,0h0l-.012,0-.007,0a.072.072,0,0,1-.017-.008l-.014-.007-.009,0-.021-.012h0a1.147,1.147,0,0,1-.257-.194l-6.82-6.9a1.129,1.129,0,0,1,.008-1.6,1.129,1.129,0,0,1,1.6.009l4.888,4.943v-11a1.131,1.131,0,0,1,1.129-1.129,1.131,1.131,0,0,1,1.13,1.129v10.993l4.889-4.94a1.128,1.128,0,0,1,1.6-.009,1.129,1.129,0,0,1,.008,1.6l-6.8,6.88a1.235,1.235,0,0,1-.108.1l0,0-.012.009,0,0h0l-.008.005-.009.007,0,0-.011.008s0,0-.006,0l-.005,0-.013.009,0,0h0l0,0-.014.009h0l0,0,0,0a1.089,1.089,0,0,1-.135.072h0a.144.144,0,0,1-.022.01l0,0-.02.008-.009,0-.016.006-.013,0-.012,0-.016.005-.009,0-.019.006h-.006l-.021.006h0l-.023.005h0l-.024.005h0l-.024,0h0l-.024,0h0l-.024,0h0l-.022,0h-.007l-.02,0h-.137Z"
                                        transform="translate(7271.001 2993.899) rotate(-90)" fill="#242424" />
                                </svg>
                                ${JSON.stringify(objNewData.offsetCanvas)}`);
            } else {
                bolChangesDetected = true;
                arrChanges.push(`<b>Map offset: ${objOldData.offsetCanvas} 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15.9"
                                    viewBox="0 0 16 15.9">
                                    <path id="arrow_right"
                                        d="M2985.922-7255h-.083l-.017,0h-.01l-.018,0h-.009l-.019,0h-.008l-.02,0h-.008l-.019,0-.009,0-.018,0-.01,0a.056.056,0,0,1-.016,0l-.012,0-.014,0-.014,0-.011,0-.017,0-.008,0-.02-.006-.006,0-.021-.009h0l-.023-.01h0l-.014-.005h0l-.01,0h0l-.012,0-.007,0a.072.072,0,0,1-.017-.008l-.014-.007-.009,0-.021-.012h0a1.147,1.147,0,0,1-.257-.194l-6.82-6.9a1.129,1.129,0,0,1,.008-1.6,1.129,1.129,0,0,1,1.6.009l4.888,4.943v-11a1.131,1.131,0,0,1,1.129-1.129,1.131,1.131,0,0,1,1.13,1.129v10.993l4.889-4.94a1.128,1.128,0,0,1,1.6-.009,1.129,1.129,0,0,1,.008,1.6l-6.8,6.88a1.235,1.235,0,0,1-.108.1l0,0-.012.009,0,0h0l-.008.005-.009.007,0,0-.011.008s0,0-.006,0l-.005,0-.013.009,0,0h0l0,0-.014.009h0l0,0,0,0a1.089,1.089,0,0,1-.135.072h0a.144.144,0,0,1-.022.01l0,0-.02.008-.009,0-.016.006-.013,0-.012,0-.016.005-.009,0-.019.006h-.006l-.021.006h0l-.023.005h0l-.024.005h0l-.024,0h0l-.024,0h0l-.024,0h0l-.022,0h-.007l-.02,0h-.137Z"
                                        transform="translate(7271.001 2993.899) rotate(-90)" fill="#242424" />
                                </svg>
                                ${JSON.stringify(objNewData.offsetCanvas)}</b>`);
            }

            if (objOldData.layout === JSON.stringify(objNewData.layout)) {
                arrChanges.push(`Layout: unchanged`);
            } else {
                bolChangesDetected = true;
                arrChanges.push(`<b>Layout: changed</b>`);
            }

            if (objOldData.options.length === objNewData.options.length && objOldData.options.every((value, index) => value === objNewData.options[index])) {
                arrChanges.push(`Layout toggles: ${objOldData.options.length} 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15.9"
                                    viewBox="0 0 16 15.9">
                                    <path id="arrow_right"
                                        d="M2985.922-7255h-.083l-.017,0h-.01l-.018,0h-.009l-.019,0h-.008l-.02,0h-.008l-.019,0-.009,0-.018,0-.01,0a.056.056,0,0,1-.016,0l-.012,0-.014,0-.014,0-.011,0-.017,0-.008,0-.02-.006-.006,0-.021-.009h0l-.023-.01h0l-.014-.005h0l-.01,0h0l-.012,0-.007,0a.072.072,0,0,1-.017-.008l-.014-.007-.009,0-.021-.012h0a1.147,1.147,0,0,1-.257-.194l-6.82-6.9a1.129,1.129,0,0,1,.008-1.6,1.129,1.129,0,0,1,1.6.009l4.888,4.943v-11a1.131,1.131,0,0,1,1.129-1.129,1.131,1.131,0,0,1,1.13,1.129v10.993l4.889-4.94a1.128,1.128,0,0,1,1.6-.009,1.129,1.129,0,0,1,.008,1.6l-6.8,6.88a1.235,1.235,0,0,1-.108.1l0,0-.012.009,0,0h0l-.008.005-.009.007,0,0-.011.008s0,0-.006,0l-.005,0-.013.009,0,0h0l0,0-.014.009h0l0,0,0,0a1.089,1.089,0,0,1-.135.072h0a.144.144,0,0,1-.022.01l0,0-.02.008-.009,0-.016.006-.013,0-.012,0-.016.005-.009,0-.019.006h-.006l-.021.006h0l-.023.005h0l-.024.005h0l-.024,0h0l-.024,0h0l-.024,0h0l-.022,0h-.007l-.02,0h-.137Z"
                                        transform="translate(7271.001 2993.899) rotate(-90)" fill="#242424" />
                                </svg>
                                ${objNewData.options.length}`);
            } else {
                bolChangesDetected = true;
                arrChanges.push(`<b>Layout toggles: ${objOldData.options.length} 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15.9"
                                    viewBox="0 0 16 15.9">
                                    <path id="arrow_right"
                                        d="M2985.922-7255h-.083l-.017,0h-.01l-.018,0h-.009l-.019,0h-.008l-.02,0h-.008l-.019,0-.009,0-.018,0-.01,0a.056.056,0,0,1-.016,0l-.012,0-.014,0-.014,0-.011,0-.017,0-.008,0-.02-.006-.006,0-.021-.009h0l-.023-.01h0l-.014-.005h0l-.01,0h0l-.012,0-.007,0a.072.072,0,0,1-.017-.008l-.014-.007-.009,0-.021-.012h0a1.147,1.147,0,0,1-.257-.194l-6.82-6.9a1.129,1.129,0,0,1,.008-1.6,1.129,1.129,0,0,1,1.6.009l4.888,4.943v-11a1.131,1.131,0,0,1,1.129-1.129,1.131,1.131,0,0,1,1.13,1.129v10.993l4.889-4.94a1.128,1.128,0,0,1,1.6-.009,1.129,1.129,0,0,1,.008,1.6l-6.8,6.88a1.235,1.235,0,0,1-.108.1l0,0-.012.009,0,0h0l-.008.005-.009.007,0,0-.011.008s0,0-.006,0l-.005,0-.013.009,0,0h0l0,0-.014.009h0l0,0,0,0a1.089,1.089,0,0,1-.135.072h0a.144.144,0,0,1-.022.01l0,0-.02.008-.009,0-.016.006-.013,0-.012,0-.016.005-.009,0-.019.006h-.006l-.021.006h0l-.023.005h0l-.024.005h0l-.024,0h0l-.024,0h0l-.024,0h0l-.022,0h-.007l-.02,0h-.137Z"
                                        transform="translate(7271.001 2993.899) rotate(-90)" fill="#242424" />
                                </svg>
                                ${objNewData.options.length}</b>`);
            }
            break;
    }

    if (!bolChangesDetected) {
        return [false, [], objNewData];
    } else {
        return [true, arrChanges, objNewData];
    }
}

function deleteData() {
    $('#accept_delete_data').show();

    $('#popup-delete-data').off('click').on('click', function () {
        localStorage.clear();
        localStorage.setItem('mistria_planner', 1);
        window.location.reload();
    });
}
function saveJson() {
    const strPage = $('#json_button_popup').attr('data-page');
    var strJson = $('#settings_json').val();
    if (isJsonString(strJson)) {
        const [bolChangesDetected, arrChanges, objNewData] = compareData(strJson, strPage);
        $('#accept_changes').show();

        $('#changes').html(
            arrChanges.map(c => `<li>${c}</li>`).join('')
        );

        $('#popup-accept').off('click').on('click', function () {
            if (isJsonString($('#output').html())) {
                var jsonBlocks = JSON.parse($('#output').html());
                cleanForWrapped(jsonBlocks);
            }

            switch (strPage) {
                case "tracker":
                    objMistriaData = objNewData;

                    // convert arrays to sets for to remove duplicates 
                    arrTabs.forEach(function (strTab) {
                        if (strTab in objMistriaData) {
                            objMistriaData[strTab] = new Set(objMistriaData[strTab]);
                        } else {
                            objMistriaData[strTab] = new Set(objMistriaDataDefault[strTab]);
                        }
                    });
                    objMistriaData.options = ('options' in objMistriaData ? new Set(objMistriaData.options) : new Set(objMistriaDataDefault.options));
                    objMistriaData.favorites = ('favorites' in objMistriaData ? new Set(objMistriaData.favorites) : new Set());

                    saveData();
                    break;
                case "planner":
                    objMistriaDataPlanner = objNewData;
                    // convert arrays to sets for to remove duplicates
                    objMistriaDataPlanner.options = ('options' in objMistriaDataPlanner ? new Set(objMistriaDataPlanner.options) : new Set(objMistriaDataPlannerDefault.options));

                    saveDataPlanner();
                    break;
            }

            window.location.reload();
        });
    } else {
        $('#json_alert').addClass('show');
        $('#json_alert .info').html('JSON code is invalid');
    }
}

function saveAsJsonFile(strElemID) {

    const strPage = $('#json_button_popup').attr('data-page');

    var strJson = $('#' + strElemID).val();
    if (isJsonString(strJson)) {
        const [bolChangesDetected, arrChanges, objNewData] = compareData(strJson);

        if (bolChangesDetected) {
            $('#json_alert').addClass('show').addClass('yellow');
            $('#json_alert .info').html('You have saved JSON file that contains unsaved changes');
        }

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(objNewData, undefined, 4)));
        element.setAttribute('download', `mistria_${strPage}.json`);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);

    } else {
        $('#json_alert').addClass('show');
        $('#json_alert .info').html('JSON code is invalid');
    }
}

function extractPlannerData(jsonBlocks, strLocation) {

    const intCurrentlyDrawingSoil = objMistriaDataPlanner.options.has('mode_wet') ? objSoilIndex.wetSoil : objSoilIndex.soil;

    const directions = ['east', 'north', 'west', 'south'];
    const objLocation = objLOCATION(jsonBlocks, strLocation);
    let objLayout = {};
    let setItems = new Set();
    let intCountTotal = 0;

    if (objLocation) {
        objLocation['object_list'].forEach(function (objItem) {

            const strItemKey = objItem['object_id'];

            setItems.add(strItemKey)
            const intItemIndex = objItemKeyDict[strItemKey][0];

            let strDirection = false;
            let strColor = false;

            let x = objItem['top_left_x'];
            let y = objItem['top_left_y'];

            //draw soil underneath
            if (objSpriteCategories.crops.includes(intItemIndex)) {

                if (!('none' in objLayout)) {
                    objLayout['none'] = {}
                }

                if (!(objSoilIndex.soil in objLayout['none'])) {
                    objLayout['none'][objSoilIndex.soil] = []
                }
                objLayout['none'][objSoilIndex.soil].push([x, y]);

                if (intCurrentlyDrawingSoil === objSoilIndex.wetSoil) {
                    if (!(objSoilIndex.wetSoil in objLayout['none'])) {
                        objLayout['none'][objSoilIndex.wetSoil] = []
                    }
                    objLayout['none'][objSoilIndex.wetSoil].push([x, y]);
                }
            }

            if (objSpriteCategories.trees.includes(intItemIndex)) {
                //no clue why
                x = x + 2;
                y = y + 2;
            }

            if (typeof objItem["cardinal_index"] !== 'undefined') {
                strDirection = directions[objItem["cardinal_index"]];
            }
            if (typeof objItem["variant"] !== 'undefined') {
                strColor = objBuild.objVariants[strItemKey][objItem["variant"]];
            }

            if (typeof strDirection === 'undefined' || !strDirection) {
                strDirection = 'none';
            }
            if (typeof strColor === 'undefined' || !strColor) {
                strColor = 'none';
            }

            let strDirection_Color = 'none';

            if (strColor !== 'none' && strDirection !== 'none') {
                strDirection_Color = strDirection + '_' + strColor;
            } else if (strColor !== 'none') {
                strDirection_Color = strColor;
            } else if (strDirection !== 'none') {
                strDirection_Color = strDirection;
            }

            if (!(strDirection_Color in objLayout)) {
                objLayout[strDirection_Color] = {}
            }

            if (!(intItemIndex in objLayout[strDirection_Color])) {
                objLayout[strDirection_Color][intItemIndex] = []
            }
            objLayout[strDirection_Color][intItemIndex].push([x, y]);
            intCountTotal++;
        });

        return [objLayout, setItems.size, intCountTotal];
    }
    return [false, 0];
}

$(function () {
    $("#save_input").on("change", function (event) {
        $('#parsing_alert').removeClass('show');
        $('#parsing_alert .info').html('');
        $('#json_alert').removeClass('show').removeClass('green').removeClass('yellow');
        $('#json_alert .info').html('');
        $('#extracting_alert').removeClass('show').removeClass('green').removeClass('yellow');
        $('#extracting_alert .info').html('');
        $("#output").hide();
        let file = event.target.files[0];
        if (!file) return;

        $("#json_button_popup").addClass("loading");

        let reader = new FileReader();
        reader.onload = function (e) {
            try {
                let arrayBuffer = e.target.result;
                let byteArray = new Uint8Array(arrayBuffer);

                // Try to decompress
                let inflated = pako.inflate(byteArray);

                // Decode as UTF-8 first
                let decodedText;
                try {
                    decodedText = new TextDecoder("iso-8859-1").decode(inflated);
                } catch (utf8Error) {
                    $('#json_button_popup').removeClass('loading');
                    $('#extracting_alert').addClass('show');
                    $('#extracting_alert .info').html(utf8Error.message);
                    return;
                }

                // Remove unprintable characters
                let cleaned = decodedText.replaceAll(/[^\x20-\xFE]/g, "\u1337");

                $("#json_button_popup").removeClass("loading");

                if (cleaned) {
                    const strPage = $('#json_button_popup').attr('data-page');
                    let jsonBlocks = extractJsonBlocksFromMixedText(cleaned);
                    // console.log(jsonBlocks)

                    let objOldData = {};
                    let arrFound = [];
                    let bolShowError = false;

                    switch (strPage) {
                        case "tracker":
                            let objMistriaDataExtracted = {
                                gifts: extractGiftKeys(objNPC(jsonBlocks)) || false,
                                museum: objMUSEUM(jsonBlocks) || false,
                                almanac: extractAlmanacKeys(objPLAYER(jsonBlocks)['items_acquired']) || false,
                                scrolls: objPLAYER(jsonBlocks)['morning_recipe_unlocks'] || false,
                                animals: extractAnimalData(objPLAYER(jsonBlocks)) || false,
                                customization: objPLAYER(jsonBlocks)['cosmetic_unlocks'] || false,
                                perks: extractPerksData(objPLAYER(jsonBlocks)) || false,
                                perks_disabled: extractPerksData(objPLAYER(jsonBlocks), true) || false,
                            }

                            arrTabs.forEach(function (strTab) {
                                if (strTab in objMistriaData) {
                                    objOldData[strTab] = [...objMistriaData[strTab]];
                                }
                            });
                            objOldData.options = [...objMistriaData.options];
                            objOldData.favorites = [...objMistriaData.favorites];
                            if ('sort' in objMistriaData) {
                                objOldData.sort = objMistriaData.sort;
                            }
                            if ('tab' in objMistriaData) {
                                objOldData.tab = objMistriaData.tab;
                            }

                            arrTabs.forEach(function (strTab) {
                                if (objMistriaDataExtracted[strTab]) {
                                    arrFound.push(`${objMistriaDataExtracted[strTab].length} ${strTab} items were found`);
                                    objOldData[strTab] = [...new Set(objMistriaDataExtracted[strTab])];
                                    $('#settings_json').val(JSON.stringify(objOldData, undefined, 4));

                                } else {
                                    bolShowError = true;
                                    $('#extracting_alert').addClass('show');
                                    $('#extracting_alert .info').append(`Couldn't find ${strTab} data`);
                                    $('#extracting_alert .info').append('</br>');
                                }
                            });
                            break;
                        case "planner":
                            objOldData.options = [...objMistriaDataPlanner.options];

                            if ('season' in objMistriaDataPlanner) {
                                objOldData.season = objMistriaDataPlanner.season;
                            }

                            if ('house_upgrade' in objMistriaDataPlanner) {
                                objOldData.house_upgrade = objMistriaDataPlanner.house_upgrade;
                            }

                            if ('multiplier' in objMistriaDataPlanner) {
                                objOldData.multiplier = objMistriaDataPlanner.multiplier;
                            }

                            if ('offsetCanvas' in objMistriaDataPlanner) {
                                objOldData.offsetCanvas = JSON.parse(JSON.stringify(objMistriaDataPlanner.offsetCanvas));
                            }

                            if ('layout' in objMistriaDataPlanner) {
                                objOldData.layout = JSON.parse(JSON.stringify(objMistriaDataPlanner.layout));
                            }

                            const [objLayout, intCountItems, intCountTotal] = extractPlannerData(jsonBlocks, 'farm');
                            const objInfoGameData = objGAMEDATA(jsonBlocks);

                            const arrSeasons = ['spring', 'summer', 'fall', 'winter'];
                            const intSeason = objInfoGameData['t2_world_facts']['season'];
                            const intCurrentSeason = arrSeasons[Math.floor(((intSeason / 86400)) / 28)];
                            objOldData.season = intCurrentSeason;

                            if (objLayout) {
                                objOldData.layout[intSaveSlot].farm = objLayout;

                                arrFound.push(`${intCountItems} different items were found, ${intCountTotal} in total`);
                                // objOldData[strTab] = [...new Set(objMistriaDataExtracted[strTab])];
                                $('#settings_json').val(JSON.stringify(objOldData, undefined, 4));

                            } else {
                                bolShowError = true;
                                $('#extracting_alert').addClass('show');
                                $('#extracting_alert .info').append(`Couldn't find layout data`);
                                $('#extracting_alert .info').append('</br>');
                            }

                            break;
                    }

                    if (bolShowError) {
                        showParsingError();
                    }

                    if (typeof jsonBlocks === 'object') {
                        $("#output").show().text(JSON.stringify(jsonBlocks, null, 2));
                    }

                    if (arrFound.length) {
                        $('#json_alert .info').html(`Data extraction was ${strPage === 'planner' || arrFound.length == arrTabs.length ? '' : 'partly'} succesful. Click "Save" to store changes:</br>
                            ${arrFound.join('</br>')}`
                        );
                        $('#json_alert').addClass('show').addClass('yellow');
                    } else {
                        $('#json_alert .info').html('Couldn\'t retrieve data')
                        $('#json_alert').addClass('show')
                    }

                } else {
                    $('#extracting_alert').addClass('show');
                    $('#extracting_alert .info').html("Failed to decode file");
                    showParsingError()
                }

            } catch (err) {
                $('#json_button_popup').removeClass('loading');
                $('#extracting_alert').addClass('show');
                $('#extracting_alert .info').html("Failed to decode file:\n" + err);
                console.log(err)
                showParsingError()
            }
        };
        reader.readAsArrayBuffer(file);
    });
});