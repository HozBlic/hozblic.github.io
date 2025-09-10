function extractJsonBlocksFromMixedText(input) {
    const result = {};
    const regex = /([a-zA-Z0-9_]+).*?({[^\u1337]*})/g;
    let match;

    while ((match = regex.exec(input)) !== null) {
        try {
            result[match[1]] = JSON.parse(match[2]);
        } catch (e) {
            $("#output").text(`Failed to parse JSON for label: ${match[1]}`, e);
        }
    }

    return result;
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
function removeNonAlmanacKeys(arrKeys) {
    var arrAlmanacTags = Object.values(objAlmanac).map(item => item['tags'][0]);
    if (!arrKeys) return false;
    arrKeys = arrKeys.filter(strItemKey => {
        if (strItemKey in objItems) {
            if ('tags' in objItems[strItemKey]) {
                if (objItems[strItemKey]['tags'].includes('furniture')) {
                    if (objTagItems.furniture.includes(strItemKey)) { return true; }
                } else {
                    return arrAlmanacTags.some(r => objItems[strItemKey]['tags'].includes(r));
                }
            }
        };
    });
    return arrKeys;
}

$(function () {
    $("#save_input").on("change", function (event) {

        $('#extracting_alert').removeClass('show').removeClass('green').removeClass('yellow');

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
                    $('#extracting_alert').addClass('show');
                    $('#extracting_alert .info').html(utf8Error.message);
                    return;
                }

                // Remove unprintable characters
                let cleaned = decodedText.replaceAll(/[^\x20-\x7E]/g, "\u1337");

                $("#json_button_popup").removeClass("loading");

                if (cleaned) {
                    let jsonBlocks = extractJsonBlocksFromMixedText(cleaned);
                    let objNpcs = objNPC(jsonBlocks);
                    let objMuseumData = objMUSEUM(jsonBlocks);
                    let objAquiredData = removeNonAlmanacKeys(objPLAYER(jsonBlocks)['items_acquired']);
                    let objOldData = JSON.parse(localStorage.getItem('mistria_data'));
                    let arrFound = [];

                    if (objOldData === null) {
                        objOldData = JSON.parse(JSON.stringify(objMistriaDataDefault));
                    }

                    if (typeof objNpcs === 'object') {
                        let arrGivenGifts = [];
                        for (const [npcname, value] of Object.entries(objNpcs)) {
                            for (const [key, strItemKey] of Object.entries(objNpcs[npcname]['gifts_given'])) {
                                if (objCharacters[npcname]['liked'].includes(strItemKey) || objCharacters[npcname]['loved'].includes(strItemKey)) {
                                    arrGivenGifts.push(`${npcname}_${strItemKey}`);
                                }
                            }
                        }

                        objOldData.gifts = [...new Set(arrGivenGifts)];

                        $('#settings_json').val(JSON.stringify(objOldData, undefined, 4));

                        arrFound.push(`${arrGivenGifts.length} gifts were found`);

                    } else {
                        $('#extracting_alert').addClass('show');
                        $('#extracting_alert .info').append("Couldn't find gift data");
                        $('#extracting_alert .info').append("</br>");
                    }

                    if (typeof objMuseumData === 'object') {
                        let arrDonatedItems = [];
                        for (const key in objMuseumData) {
                            arrDonatedItems.push(objMuseumData[key]);
                        }

                        objOldData.museum = [...new Set(arrDonatedItems)];

                        $('#settings_json').val(JSON.stringify(objOldData, undefined, 4));

                        arrFound.push(`${arrDonatedItems.length} donated items were found `);

                    } else {
                        $('#extracting_alert').addClass('show');
                        $('#extracting_alert .info').append("Couldn't find musuem data");
                        $('#extracting_alert .info').append("</br>");
                    }

                    if (typeof objAquiredData === 'object') {

                        objOldData.almanac = [...new Set(objAquiredData)];

                        $('#settings_json').val(JSON.stringify(objOldData, undefined, 4));

                        arrFound.push(`${objAquiredData.length} almanac items were found `);

                    } else {
                        $('#extracting_alert').addClass('show');
                        $('#extracting_alert .info').append("Couldn't find almanac data");
                        $('#extracting_alert .info').append("</br>");
                    }

                    if (typeof jsonBlocks === 'object') {
                        $("#output").text(JSON.stringify(jsonBlocks, null, 2));
                    }

                    if (arrFound.length) {
                        $('#json_alert .info').html(`Data extraction was ${arrFound.length == 3 ? '' : 'partly'} succesful. Click "Save" to store changes:</br>
                            ${arrFound.join('</br>')}`
                        );
                        $('#json_alert').addClass('show').addClass('yellow');
                    }
                    else {
                        $('#json_alert .info').html('Couldn\'t retrieve data')
                        $('#json_alert').addClass('show')
                    }
                } else {
                    $('#extracting_alert').addClass('show');
                    $('#extracting_alert .info').html("Failed to decode file");
                }

            } catch (err) {
                $('#extracting_alert').addClass('show');
                $('#extracting_alert .info').html("Failed to decode file:\n" + err);
            }
        };

        reader.readAsArrayBuffer(file);
    });

});
