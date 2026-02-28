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
                let cleaned = decodedText.replaceAll(/[^\x20-\x7E]/g, "\u1337");

                $("#json_button_popup").removeClass("loading");

                if (cleaned) {

                    let jsonBlocks = extractJsonBlocksFromMixedText(cleaned);
                    console.log(jsonBlocks);
                    let objMistriaDataExtracted = {
                        gifts: extractGiftKeys(objNPC(jsonBlocks)) || false,
                        museum: objMUSEUM(jsonBlocks) || false,
                        almanac: extractAlmanacKeys(objPLAYER(jsonBlocks)['items_acquired']) || false,
                        scrolls: objPLAYER(jsonBlocks)['morning_recipe_unlocks'] || false,
                        animals: extractAnimalData(objPLAYER(jsonBlocks)) || false,
                        customization: objPLAYER(jsonBlocks)['seen_cosmetics'] || false,
                        perks: extractPerksData(objPLAYER(jsonBlocks)) || false,
                        perks_disabled: extractPerksData(objPLAYER(jsonBlocks), true) || false,
                    }

                    let objOldData = {};
                    arrTabs.forEach(function (strTab) {
                        if (strTab in objMistriaData) {
                            objOldData[strTab] = [...objMistriaData[strTab]];
                        }
                    });
                    objOldData.options = [...objMistriaData.options];
                    if ('sort' in objMistriaData) {
                        objOldData.sort = objMistriaData.sort;
                    }
                    if ('tab' in objMistriaData) {
                        objOldData.tab = objMistriaData.tab;
                    }

                    let arrFound = [];
                    let bolShowError = false;
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

                    if (bolShowError) {
                        showParsingError();
                    }

                    if (typeof jsonBlocks === 'object') {
                        $("#output").show().text(JSON.stringify(jsonBlocks, null, 2));
                    }

                    if (arrFound.length) {
                        $('#json_alert .info').html(`Data extraction was ${arrFound.length == arrTabs.length ? '' : 'partly'} succesful. Click "Save" to store changes:</br>
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
                showParsingError()
            }
        };
        reader.readAsArrayBuffer(file);
    });
});