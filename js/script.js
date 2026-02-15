const arrObtain = [
    "Difficult to obtain",
    "spacing",

    "Chicken Statue",
    "Treasure Box",
    "Treasure Chests",
    "Wishing Well",
    "spacing",

    "Birthday gift",
    "Quest",
    "Request",
    "Spring Festival",
    "Pet Job",
    "Date Reward",
    "spacing",

    "Balor's Wagon",
    "Blacksmith",
    "Carpenter",
    "Vera's Stall",
    "Wheedle's Stall",
    "Darcy's Stall",
    "General Store",
    "Hayden's Shop",
    "Tackle Shop",
    "The Inn",
    "spacing",

    "Cooking",
    "Milling",
    "spacing",

    "Farming",
    "Foraging",
    "Harvesting",
    "Ranching",
    "spacing",

    "Breaking objects",
    "Destroying crystals",
    "Mimics",
    "Mining",
    "Slaying",
    "spacing",

    "Archaeology",
    "Bug Catching",
    "Diving",
    "Fishing",
    "spacing",

    "Cutting Grass",
    "Cutting trees/branches",
    "Large Stumps",
    "Regular Stumps and Trees",
    "spacing",
]

const arrObtainEasy = [
    "Archaeology",
    "Balor's Wagon",
    "Blacksmith",
    "Breaking objects",
    "Bug Catching",
    "Carpenter",
    "Cooking",
    "Cutting Grass",
    "Cutting trees/branches",
    "Vera's Stall",
    "Wheedle's Stall",
    "Darcy's Stall",
    "Destroying crystals",
    "Diving",
    "Farming",
    "Fishing",
    "Foraging",
    "General Store",
    "Harvesting",
    "Hayden's Shop",
    "Large Stumps",
    "Milling",
    "Mining",
    "Ranching",
    "Regular Stumps and Trees",
    "Slaying",
    "Tackle Shop",
    "The Inn",
    "Pet Job",
    "Breaking",
    "Dig Spots",
    "Shaking",
    "Refining",
    "Furniture",
    "Cutting"
]

const objCharOrder = {
    'celine': 0,
    'juniper': 1,
    'reina': 2,
    'valen': 3,
    'adeline': 4,
    'balor': 5,
    'march': 6,
    'hayden': 7,
    'ryis': 8,
    'eiland': 9,
    'dell': 10,
    'dozy': 11,
    'elsie': 12,
    'errol': 13,
    'hemlock': 14,
    'holt': 15,
    'henrietta': 16,
    'josephine': 17,
    'landen': 18,
    'luc': 19,
    'maple': 20,
    'nora': 21,
    'olric': 22,
    'terithia': 23,
    'darcy': 24,
    'louis': 25,
    'merri': 26,
    'vera': 27,
    'caldarus': 28,
    'seridia': 29
}

var objLocations = {
    // 'abandoned_mines': { x: 0, y: 0 },
    // 'abandoned_pit': { x: 0, y: 0 },
    'adelines_bedroom': { x: 84, y: 52 },
    'adelines_office': { x: 84, y: 51 },
    // 'aldaria': { x: 0, y: 0 },
    'balors_room': { x: 82, y: 41 },
    'bathhouse': { x: 88, y: 48 },
    'bathhouse_bath': { x: 89, y: 48 },
    'bathhouse_bedroom': { x: 88, y: 49 },
    'bathhouse_change_room': { x: 90, y: 48 },
    'beach': { x: 52, y: 10 },
    'beach_secret': { x: 61, y: 13 },
    'blacksmith_room_left': { x: 78, y: 48 },
    'blacksmith_room_right': { x: 79, y: 45 },
    'blacksmith_store': { x: 78, y: 44 },
    'caldarus_house': { x: 126, y: 70 },
    'celines_room': { x: 88, y: 38 },
    'clinic_b1': { x: 88, y: 44 },
    'clinic_f1': { x: 87, y: 45 },
    'clinic_f2': { x: 88, y: 45 },
    'deep_woods': { x: 117, y: 56 },
    'dells_bedroom': { x: 86, y: 42 },
    'dragonsworn_glade': { x: 112, y: 70 },
    'dungeon': { x: 49, y: 50 },
    'earth_seal': { x: 48, y: 49 },
    'eastern_road': { x: 112, y: 47 },
    'eilands_bedroom': { x: 86, y: 52 },
    'eilands_office': { x: 86, y: 51 },
    'elsies_bedroom': { x: 85, y: 52 },
    'errols_bedroom': { x: 52, y: 43 },
    'farm': { x: 82, y: 30 },
    'fire_seal': { x: 48, y: 50 },
    'general_store_home': { x: 87, y: 42 },
    'general_store_store': { x: 87, y: 41 },
    'haydens_bedroom': { x: 56, y: 32 },
    'haydens_farm': { x: 56, y: 29 },
    'haydens_house': { x: 56, y: 31 },
    'holt_and_noras_bedroom': { x: 88, y: 42 },
    'inn': { x: 83, y: 41 },
    'jo_and_hemlocks_room': { x: 82, y: 42 },
    'landens_house_f1': { x: 88, y: 41 },
    'landens_house_f2': { x: 88, y: 42 },
    'large_barn': { x: 79, y: 30 },
    'large_coop': { x: 76, y: 30 },
    'large_greenhouse': { x: 73, y: 30 },
    'lucs_room': { x: 83, y: 42 },
    'manor_house_dining_room': { x: 85, y: 51 },
    'manor_house_entry': { x: 85, y: 50 },
    'maples_room': { x: 84, y: 42 },
    'medium_barn': { x: 79, y: 28 },
    'medium_coop': { x: 76, y: 28 },
    'mill': { x: 90, y: 41 },
    'mines_entry': { x: 49, y: 49 },
    'museum_entry': { x: 57, y: 47 },
    'narrows': { x: 56, y: 44 },
    'narrows_secret': { x: 51, y: 44 },
    'player_home': { x: 82, y: 32 },
    'player_home_east': { x: 83, y: 32 },
    'player_home_north': { x: 82, y: 33 },
    'player_home_upper_central': { x: 82, y: 33 },
    'player_home_upper_east': { x: 83, y: 33 },
    'player_home_upper_west': { x: 81, y: 33 },
    'player_home_west': { x: 81, y: 32 },
    'reinas_room': { x: 84, y: 41 },
    'ruins_seal': { x: 50, y: 49 },
    'seridias_chamber': { x: 49, y: 48 },
    'small_barn': { x: 79, y: 26 },
    'small_coop': { x: 76, y: 26 },
    'small_greenhouse': { x: 73, y: 28 },
    'summit': { x: 51, y: 58 },
    'terithias_house': { x: 49, y: 13 },
    'town': { x: 85, y: 43 },
    'water_seal': { x: 50, y: 50 },
    'western_ruins': { x: 19, y: 44 },
}

Object.filter = (obj, predicate) =>
    Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => (res[key] = obj[key], res), {});

const eqSet = (xs, ys) =>
    xs.size === ys.size &&
    [...xs].every((x) => ys.has(x));

var objMistriaData;

var objMistriaDataDefault = objBuild.objMistriaDataDefault;
// close menu on mobile by default
if ($(window).width() < 700) {
    objMistriaDataDefault.options.push('mode_collapse');
}
var arrTabs = objBuild.tabsOrder;
var allCharts = {};

$('.item').each(function () {
    var strObtainAll = $(this).attr('data-cbx');
    if (arrObtainEasy.some(v => strObtainAll.includes(v))) {
        $(this).addClass('hide_checkbox');
    }
});

//get rid of old data storing system
var arrCheckboxes = localStorage.getItem('mistria_chb');
var arrOptions = localStorage.getItem('mistria_options');
var strSort = localStorage.getItem('mistria_sort');
if (arrCheckboxes !== null || arrOptions !== null || strSort !== null) {
    var objMistriaDataTemp = {};

    if (arrCheckboxes !== null) {
        objMistriaDataTemp.gifts = [...new Set(JSON.parse(arrCheckboxes))];
        localStorage.removeItem("mistria_chb");
    }
    if (arrOptions !== null) {
        objMistriaDataTemp.options = [...new Set(JSON.parse(arrOptions))];
        localStorage.removeItem('mistria_options');
    }
    if (strSort !== null) {
        objMistriaDataTemp.sort = strSort;
        localStorage.removeItem('mistria_sort');
    }
    localStorage.setItem('mistria_data', JSON.stringify(objMistriaDataTemp));
}

var objDataWrapped = JSON.parse(localStorage.getItem('mistria_wrapped'));
if (objDataWrapped === null) {
    objDataWrapped = objDataWrappedDummy;
}

var objTips = {
    'price': 'Price',
    'museumSet': 'Museum Set',
    'recipeSource': 'Recipe Source',
    'ingredients': 'Ingredients',
    'size': 'Size',
    'rarity': 'Rarity',
    'location': 'Location',
    'season': 'Season',
    'weather': 'Weather',
    'time': 'Time',
    'spawnCondition': 'Spawn condition',
    'fishing': 'Fishing pole',
    'diving': 'Diveable'
}

function createTip(strID, strItemKey, strTab, objItemsTemp, strBuff = false) {

    let strTableHTML = '';
    let bolDonatable = false;
    let objItemTemp = objItemsTemp[strItemKey];

    if ('tip_extra' in objItemTemp) {
        strTableHTML = '<table>';

        Object.entries(objTips).forEach(([strTipKey, strTipValue]) => {
            if (strTipKey in objItemTemp['tip_extra']) {
                if (strTipKey == 'ingredients') {
                    strTableHTML += `<tr><td>${strTipValue}</td><td>`;
                    objItemTemp['tip_extra'][strTipKey].forEach(function (objItem, index) {
                        if ('item' in objItem) {
                            intCount = objItem['count'];
                            strItemKeyTemp = objItem['item'];
                            strItemName = objItems[strItemKeyTemp]['name'];
                            strItemUrl = objItems[strItemKeyTemp]['url'];
                            strTableHTML += `<a href="https://fieldsofmistria.wiki.gg${strItemUrl}" title="${strItemName}"><img alt="${strItemName}.png" src="images/items/${strItemKeyTemp}.png"></a><a href="https://fieldsofmistria.wiki.gg${strItemUrl}" title="${strItemName}">${strItemName}</a> (${intCount})<br>`;
                        }
                    });
                    strTableHTML = strTableHTML.substring(0, strTableHTML.length - 4); // remove last <br>
                    strTableHTML += `</td></tr>`;
                    return;
                }
                if (strTipKey === 'museumSet') {
                    bolDonatable = true;
                    if (strTab === 'museum') {
                        return;
                    }
                }
                strTableHTML += `<tr><td>${strTipValue}</td><td>${objItemTemp['tip_extra'][strTipKey]}</td></tr>`;
            }
        });
        strTableHTML += '</table>';
    }

    let strChecked = '';
    if (objMistriaData.museum.has(strItemKey)) {
        strChecked = 'checked';
    }

    let strDisabled = '';
    if (strTab === 'perks') {
        if (objMistriaData.perks.has(strItemKey)) {
            strChecked = 'checked';
        }

        if (objMistriaData.perks_disabled.has(strItemKey)) {
            strDisabled = 'disabled';
        }
    }

    let strTipHTML = $(`
        <div id="tip_${strID}" class="tip_wrap">
            <div class="tip">
                <div class="tip_name ${strChecked} ${strTab === 'perks' ? 'is_perk' : ''} ${strDisabled} ${bolDonatable ? 'donatable' : ''}">
                    ${strTab === 'customization' ? objItemTemp['name'] : `<a target="_blank" href="https://fieldsofmistria.wiki.gg${objItemTemp['url']}">${objItemTemp['name']}</a>`}
                    ${strTab === 'perks' ? '<img src="images/fake_essence.png">' : ''}
                    ${bolDonatable ? '<img src="images/museum.png">' : ''}
                </div>
                ${strBuff ? `<div class="tip_buff">${strBuff}</div>` : ''}
                <div class="tip_info">${objItemTemp['tip']}</div>
                ${objItemTemp['nodata'] ? 'No data available' : ''}
                ${strTableHTML}
            </div>
        </div>`);

    let $objTip = $(strTipHTML);

    return $objTip.prop('outerHTML');
}

function changeSort(objElem) {
    if ($(objElem).hasClass('selected')) return;

    if ($(objElem).attr('data-value') !== 'default') {
        objMistriaData.sort = $(objElem).attr('data-value');
    } else {
        delete objMistriaData.sort;
    }

    saveData();

    $('.dropdown-item.sort').removeClass('selected');
    $(`.dropdown-item.sort[data-value="${objMistriaData.sort ? objMistriaData.sort : 'default'}"]`).addClass('selected');

    sortItems()
}

function sortItems() {
    $(`#scraped .sortable`).css('order', '');

    if (typeof (objMistriaData.sort) !== undefined && $(`#scraped .sortable[data-sort-${objMistriaData.sort}]`).length) {
        $(`#scraped .sortable[data-sort-${objMistriaData.sort}]`).each(function () {
            let intSortIndex = $(this).attr(`data-sort-${objMistriaData.sort}`);
            $(this).css('order', intSortIndex);
        });
    }
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

    let objNewData = JSON.parse(strJson);

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
    var bolChangesDetected = false;
    let arrChanges = [];
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
            arrChanges.push(`${capitalizeFirstLetter(strTab)}: ${objOldData[strTab].length} -> ${objNewData[strTab].length}`);
        } else {
            bolChangesDetected = true;
            arrChanges.push(`<b>${capitalizeFirstLetter(strTab)}: ${objOldData[strTab].length} -> ${objNewData[strTab].length}</b>`);
        }
    });

    if (objOldData.options.length === objNewData.options.length && objOldData.options.every((value, index) => value === objNewData.options[index])) {
        arrChanges.push(`Layout toggles: ${objOldData.options.length} -> ${objNewData.options.length}`);
    } else {
        bolChangesDetected = true;
        arrChanges.push(`<b>Layout toggles: ${objOldData.options.length} -> ${objNewData.options.length}</b>`);
    }

    if (strOldSort === strNewSort) {
        arrChanges.push(`Sort settings: ${strOldSort} -> ${strNewSort}`);
    } else {
        bolChangesDetected = true;
        arrChanges.push(`<b>Sort settings: ${strOldSort} -> ${strNewSort}</b>`);
    }

    if (!bolChangesDetected) {
        return [false, [], objNewData];
    } else {
        return [true, arrChanges, objNewData];
    }
}

function saveJson() {
    var strJson = $('#settings_json').val();
    if (isJsonString(strJson)) {
        const [bolChangesDetected, arrChanges, objNewData] = compareData(strJson);
        $('#accept_changes').show();

        $('#changes').html(
            arrChanges.map(c => `<li>${c}</li>`).join('')
        );

        $('#popup-accept').off('click').on('click', function () {
            if (isJsonString($('#output').html())) {
                var jsonBlocks = JSON.parse($('#output').html());
                cleanForWrapped(jsonBlocks);
            }

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

            saveData();
            window.location.reload();
        });


    } else {
        $('#json_alert').addClass('show');
        $('#json_alert .info').html('JSON code is invalid');
    }
}

function saveAsJsonFile(strElemID) {

    var strJson = $('#' + strElemID).val();
    if (isJsonString(strJson)) {
        const [bolChangesDetected, arrChanges, objNewData] = compareData(strJson);

        if (bolChangesDetected) {
            $('#json_alert').addClass('show').addClass('yellow');
            $('#json_alert .info').html('You have saved JSON file that contains unsaved changes');
        }

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(objNewData, undefined, 4)));
        element.setAttribute('download', 'mistria_data.json');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);

    } else {
        $('#json_alert').addClass('show');
        $('#json_alert .info').html('JSON code is invalid');
    }
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

function loadData() {
    objMistriaData = JSON.parse(localStorage.getItem('mistria_data'));

    if (objMistriaData === null) {
        objMistriaData = JSON.parse(JSON.stringify(objMistriaDataDefault));
    }

    $('#settings_json').val(JSON.stringify(objMistriaData, undefined, 4));

    // convert arrays to sets for to remove duplicates 
    arrTabs.forEach(function (strTab) {
        if (strTab in objMistriaData) {
            objMistriaData[strTab] = new Set(objMistriaData[strTab]);
        } else {
            objMistriaData[strTab] = new Set(objMistriaDataDefault[strTab]);
        }
    });
    objMistriaData.options = ('options' in objMistriaData ? new Set(objMistriaData.options) : new Set(objMistriaDataDefault.options));

    // for backward compatibility with old data structure
    if (objMistriaData.tab === 'gift') {
        objMistriaData.tab = 'gifts';
    }
}

function saveData() {
    // convert to array since JSON.stringify does not work on sets
    arrTabs.forEach(function (strTab) {
        if (strTab in objMistriaData) {
            objMistriaData[strTab] = [...objMistriaData[strTab]];
        }
    });
    objMistriaData.options = [...objMistriaData.options];

    localStorage.setItem('mistria_data', JSON.stringify(objMistriaData));
    loadData();
}

function openJsonPopup() {
    $('#extracting_alert').removeClass('show').removeClass('green').removeClass('yellow');
    $('#json_alert').removeClass('show').removeClass('green').removeClass('yellow');
    $('#json_button_popup').show();
}

function loadMenuItems() {

    let bolScrolled = false;
    let intPrevScrollPos = 0;

    $('.tab_content').on('scroll', function () {
        bolScrolled = true;
    })

    setInterval(function () {
        if (bolScrolled) {
            bolScrolled = false;
            var intCurrentScrollPos = $('.tab_content:visible').scrollTop();
            if (intPrevScrollPos < intCurrentScrollPos && intCurrentScrollPos > 500) {
                if (intCurrentScrollPos - intPrevScrollPos > 30) {
                    $('#header').addClass('hidden');
                }
            } else {
                $('#header').removeClass('hidden');
            }
            intPrevScrollPos = intCurrentScrollPos;
        }
    }, 150);

    $('#side_menu #title .version').text(`v ${objBuild.version}`);

    if (!$('#tutorial').length) {
        objBuild.tabsOrder.forEach(function (strTab) {
            if (!(strTab in objTabs)) return;
            let objTabInfo = objTabs[strTab].info;
            $('#tabs').append(`<div class="tab" data-tab="${strTab}"><img src="images/${objTabInfo.icon}">${objTabInfo.name}</div>`)
        });
        $('#tabs').append(` 
            <div class="tab" data-tab="wrapped">
                <div class="icon">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20,7H18a2,2,0,0,0-2,2V20H15V12a2,2,0,0,0-2-2H11a2,2,0,0,0-2,2v8H8V16a2,2,0,0,0-2-2H4a2,2,0,0,0-2,2v5a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V9A2,2,0,0,0,20,7ZM4,20V16H6v4Zm7,0V12h2v8Zm7,0V9h2V20Z" />
                        <path
                            d="M3.81,12.58l4.57-6.4L13.68,8a1,1,0,0,0,.82-.08l7-4a1,1,0,0,0-1-1.74L13.89,5.91,8.32,4.05a1,1,0,0,0-1.13.37l-5,7a1,1,0,0,0,.23,1.39A1,1,0,0,0,3,13,1,1,0,0,0,3.81,12.58Z" />
                    </svg>
                </div>
                Mistria Wrapped
            </div>
        `);
    }

    // create menu checkboxes
    arrObtain.forEach(function (strObtain, i) {
        if (strObtain === 'spacing') {
            $('#checkbox_filter_items').append(`<div class="spacing"></div>`)
        } else {
            $('#checkbox_filter_items').append(`<input value="${strObtain.replace('\'', '')}" type='checkbox' class="styled obtain_cbx" id="chb_${i}"></input>
                <label for="chb_${i}">${strObtain}</label>`);
        }
    });

    //hide sort dropdown on outside click
    $(document).on('click', function (e) {
        var jqTarget = $(e.target);
        if (
            jqTarget.parents('#sort_button').length == 0 &&
            jqTarget.attr('id') != 'sort_button'
        ) {
            $('#sort_button').parent().removeClass('open');
        }
    });

    //select saved sorting option
    $('.dropdown-item.sort').removeClass('selected');
    $(`.dropdown-item.sort[data-value="${objMistriaData.sort ? objMistriaData.sort : 'default'}"]`).addClass('selected');


    //backup popup - hide alerts on json change
    $('#settings_json').on('input change', function () {
        $('#json_alert').removeClass('show').removeClass('green').removeClass('yellow');
        $('#extracting_alert').removeClass('show').removeClass('green').removeClass('yellow');
    });

    //checkbox functionality
    $('input.obtain_cbx').change(function () {
        $('.hide_checkbox').removeClass('hide_checkbox');

        if ($('input.obtain_cbx:checked').length) {
            var arrCheckedObtain = [];
            $('input.obtain_cbx:checked').each(function () {
                arrCheckedObtain.push(this.value)
            });

            $('.item').each(function () {
                var strObtainAll = $(this).attr('data-cbx');
                if (!arrCheckedObtain.some(v => strObtainAll.includes(v))) {
                    $(this).addClass('hide_checkbox');
                }
            });
        }

        checkScrapedTabVisibility();
    });

    $('#search_items').on('keyup', function () {
        $('#page').removeHighlight();
        $('.hide_search').removeClass('hide_search');

        const value = $(this).val().toLowerCase();

        if (value !== '') {
            const keywords = value.split('+').map(s => s.trim()).filter(Boolean);

            $('#scraped .item').filter(function () {
                const text = $(this).text().trim().toLowerCase();
                const matchesAll = keywords.some(word => text.includes(word));

                if (matchesAll) {
                    $(this).removeClass('hide_search');
                } else {
                    $(this).addClass('hide_search');
                }
            });

            keywords.forEach(word => {
                $('#scraped .category').highlight(word);
            });

        }

        $('#scraped .category .subcategory').each(function () {
            if (value !== '') {
                if ($(this).find('.subcategory_name').length && $(this).find('.subcategory_name').html().includes('highlight')) {
                    $(this).find('.item').removeClass('hide_search');
                }
            }

            if (!$(this).find('.item:not(.spoiler_placeholder):visible').length) {
                $(this).hide()
            }
        });

        $('#scraped .category').each(function () {
            if (value !== '') {
                if ($(this).find('.category_name').html().includes('highlight')) {
                    $(this).find('.item').removeClass('hide_search');
                }
            }

            if (!$(this).find('.item:not(.spoiler_placeholder):visible').length) {
                $(this).hide()
            }
        });

        checkScrapedTabVisibility();
    });

    var arrModes = ['mode_dark', 'mode_name', 'mode_gift', 'mode_collapse', 'mode_chbexpand', 'mode_spoilers', 'mode_mini', 'mode_mini_tooltip'];
    arrModes.forEach(function (strMode) {
        $(`#${strMode}`).prop('checked', false);
        $(`#${strMode}`).change(function () {
            if ($(this).is(':checked')) {
                $('#page').addClass(strMode);
                objMistriaData.options.add(strMode);
            } else {
                $('#page').removeClass(strMode);
                objMistriaData.options.delete(strMode);
            }
            saveData();

            if (strMode === 'mode_dark') {

                const color = objMistriaData.options.has('mode_dark') ? "#00000050" : Chart.defaults.borderColor;

                if ('chartMap' in allCharts) {
                    allCharts['chartMap'].data.datasets = generateMapChartData()
                }

                for (const [key, chart] of Object.entries(allCharts)) {
                    if (typeof chart.options.scales.r !== 'undefined') {
                        chart.options.scales.r.grid.color = color;
                    }
                    if (typeof chart.options.scales.x !== 'undefined') {
                        chart.options.scales.x.grid.color = color;
                    }
                    if (typeof chart.options.scales.y !== 'undefined') {
                        chart.options.scales.y.grid.color = color;
                    }

                    chart.update('none');
                }
            }


            if (strMode === 'mode_spoilers' || strMode === 'mode_gift') {
                checkScrapedTabVisibility();
                if (strMode === 'mode_spoilers') {
                    updateStatistics();
                }
            }
        });
    })

    objMistriaData.options.forEach(key => {
        $(`#${key}`).prop('checked', true);
        $('#page').addClass(key);
    })


    tippy('#older_browsers', {
        content: 'Does not work in older browsers',
    });
    tippy('#save_file_icon', {
        content: `<p class="save_file">AppData is a hidden folder, you must turn on "show hidden files" manually, if you haven't already done so.</p>
                  <p class="save_file">Your save file is processed only in your browser and is never uploaded or sent anywhere else.</p>
                  <p class="save_file">Tested and should work on v.0.14.0 save files</p>`,
        allowHTML: true,
    });
}

function loadScrapedTab(strTab) {
    let arrAllItems = [];

    let objCategories = objTabs[strTab].categories;

    let strImagePath = `images/${objTabs[strTab].info.img_path}`;
    let strImageMiniPath = `images/${objTabs[strTab].info.img_mini_path}`;
    let strImageItemPath = `images/${objTabs[strTab].info.img_item_path}`;
    let objItemsTemp = {};

    switch (objTabs[strTab].info.item_json) {
        case 'accessories':
            objItemsTemp = objItemsAccessories;
            break;
        case 'animals':
            objItemsTemp = objItemsAnimals;
            break;
        case 'perks':
            objItemsTemp = objItemsPerks;
            break;
        default:
            objItemsTemp = objItems;
    }

    let arrCategoryKeys = Object.keys(objCategories);
    let arrCategoryKeysAlphabetical = arrCategoryKeys.sort((a, b) => objCategories[a].info.name.localeCompare(objCategories[b].info.name));

    let objCategoriesSorted = {
        'az': arrCategoryKeysAlphabetical,
        'za': arrCategoryKeysAlphabetical.toReversed()
    }

    Object.entries(objCategories).forEach(([strCatgoryKey, objCategory]) => {
        var $divCategory = $('<div>', { 'class': 'category', 'id': `category_${strCatgoryKey}` });

        $divCategory.addClass('sortable');
        $divCategory.attr('data-sort-az', objCategoriesSorted.az.indexOf(strCatgoryKey));
        $divCategory.attr('data-sort-za', objCategoriesSorted.za.indexOf(strCatgoryKey));

        if (objCategory.info.spoiler || objCategory.info.nodata || objCategory.info.noimage) {
            $divCategory.addClass('spoiler')
        }

        if ('img' in objCategory.info) {
            $divCategory.append(` 
                <div class="category_img">
                    <img src="${strImagePath}${objCategory.info.img}.png">
                </div>
            `);
        }

        if ('wikilink' in objCategory.info) {
            $divCategory.append(` 
                <a class="category_name" href="https://fieldsofmistria.wiki.gg/wiki/${objCategory.info.wikilink}" target="_blank">
                    ${objCategory.info.name}
                </a>
            `);
        } else {
            $divCategory.append(` 
                <div class="category_name" >
                    ${objCategory.info.name}
                </div>
            `);
        }


        if ('img_mini' in objCategory.info) {
            $divCategory.find('.category_name').prepend(`
                <div class="category_img_mini">
                    <img src="${strImageMiniPath}${objCategory.info.img_mini}.png">
                </div>
            `)
        }

        $('#scraped').append($divCategory);

        var $divSubcategories = $('<div>', { 'class': 'subcategories' });
        $divCategory.append($divSubcategories);


        let arrSubcategoryKeys = Object.keys(objCategory.subcategories);
        let arrSubcategoryKeysAlphabetical = arrSubcategoryKeys.sort((a, b) => objCategory.subcategories[a].info.name.localeCompare(objCategory.subcategories[b].info.name));

        let objSubcategoriesSorted = {
            'az': arrSubcategoryKeysAlphabetical,
            'za': arrSubcategoryKeysAlphabetical.toReversed()
        }

        Object.entries(objCategory.subcategories).forEach(([strSubcategoryKey, objSubcategory]) => {

            let $divSubcategory = $('<div>', { 'class': 'subcategory', 'id': `subcategory_${strCatgoryKey}_${strSubcategoryKey}` });

            $divSubcategory.addClass('sortable');

            if (strCatgoryKey !== 'gifts' && strCatgoryKey !== 'animals') {
                $divSubcategory.attr('data-sort-az', objSubcategoriesSorted.az.indexOf(strSubcategoryKey));
                $divSubcategory.attr('data-sort-za', objSubcategoriesSorted.za.indexOf(strSubcategoryKey));
            }

            if (objSubcategory.info.spoiler || objSubcategory.info.nodata) {
                $divSubcategory.addClass('spoiler')
            }

            $divSubcategories.append($divSubcategory);

            let $divItems = $('<div>', { 'class': 'subcategory_items' });
            $divSubcategory.append($divItems);

            if ('name' in objSubcategory.info) {

                if ('wikilink' in objSubcategory.info) {
                    $divItems.append(` 
                        <a class="subcategory_name" href="https://fieldsofmistria.wiki.gg/wiki/${objSubcategory.info.wikilink}" target="_blank">
                            ${objSubcategory.info.name}
                        </a>
                    `);
                } else {
                    $divItems.append(` 
                        <div class="subcategory_name">
                            ${objSubcategory.info.name}
                        </div>
                    `);
                }
            }

            objSubcategory['items'].forEach((strItemKey) => {
                let strLocalstorageKey = strItemKey;
                if (strTab === 'gifts') {
                    strLocalstorageKey = `${strCatgoryKey}_${strItemKey}`;
                }
                arrAllItems.push(strLocalstorageKey);

                let strCbxID = `${strCatgoryKey}_${strSubcategoryKey}_${strItemKey}`;
                let strDataCbx = $($.parseHTML(objItemsTemp[strItemKey]['tip'])).text().replace(/["'&<>]/g, '').trim();

                let bolAdditionalSpoiler = false;
                if (strTab === 'scrolls') {
                    bolAdditionalSpoiler = (("tip_extra" in objItems[strItemKey] && (!("recipeSource" in objItems[strItemKey]["tip_extra"]) || objItems[strItemKey]["tip_extra"]['recipeSource'] == "Available From Start")) || !("tip_extra" in objItems[strItemKey]));
                }
                $divItems.append(`
                    <div class="item ${objItemsTemp[strItemKey]['spoiler'] || objItemsTemp[strItemKey]['nodata'] || bolAdditionalSpoiler ? 'spoiler' : ''}" data-cbx="${!arrObtainEasy.some(v => strDataCbx.includes(v)) ? 'Difficult to obtain' : ''} ${strDataCbx}">
                        <input class="item_cbx" ${objMistriaData[strTab].has(strLocalstorageKey) ? 'checked' : ''} type="checkbox" id="${strCbxID}" name="${strTab}" value="${strLocalstorageKey}">
                        <label for="${strCbxID}" class="has_tip" id="label_${strCbxID}">
                            <div class="image ${objItemsTemp[strItemKey]['noimage'] ? 'noimage' : ''}" style="background-image: url(${strImageItemPath}${strItemKey}.png)"></div>
                            <div class="name">${objItemsTemp[strItemKey]['name']}</div>
                        </label>
                    </div>
                `);

                if (strTab === 'scrolls' || strTab === 'almanac') {
                    if (objItemsTemp[strItemKey]['spoiler'] || objItemsTemp[strItemKey]['nodata'] || bolAdditionalSpoiler) {
                        $divItems.append(`<div class="item spoiler_placeholder" data-cbx="${!arrObtainEasy.some(v => strDataCbx.includes(v)) ? 'Difficult to obtain' : ''} ${strDataCbx}"></div>`);
                    }
                }

                if (!(strTab === 'animals' && objSubcategory.info.name !== 'Cosmetics')) {
                    $divItems.append(`${createTip(`${strCbxID}`, strItemKey, strTab, (strTab === 'animals' ? objItemsAnimals : objItemsTemp), (strTab === 'buffs' && 'buff' in objItemsTemp[strItemKey] ? objItemsTemp[strItemKey]['buff'] : false))}`);
                    const template = $(`#tip_${strCbxID}`)[0];
                    template.style.display = 'block';
                    tippy(`#label_${strCbxID}`, {
                        content: template,
                        interactive: true,
                        maxWidth: 370
                    });
                }

            });
        });
    });

    addSelectAllAndAlert(strTab, arrAllItems);

    $('.item_cbx:checkbox').change(function () {
        let bolChecked = $(this).is(':checked');
        let bolAdd = true;
        let strItemKey = $(this).val();

        if (bolChecked) {
            objMistriaData[strTab].add($(this).val());
        } else {
            objMistriaData[strTab].delete($(this).val());
            bolAdd = false;
        }

        // check all the checkboxes with same value, for example almanact has 2 pink scallops
        $(`.item_cbx:checkbox[value=${strItemKey}]`).prop('checked', bolChecked);

        $(`[id^="label_"][id$="_${strItemKey}"]`).each(function (index) {
            let objLabel = $(this)[0];
            let objTippy = objLabel._tippy;
            if (bolAdd) {
                $(objTippy.props.content).find('.tip_name').addClass('checked');
            } else {
                $(objTippy.props.content).find('.tip_name').removeClass('checked');
            }
            objTippy.setContent($(objTippy.props.content)[0]);
        });

        if ($(`.item_cbx`).length == $(`.item_cbx:checked`).length) {
            $('#selectAll').prop('checked', true);
        } else {
            $('#selectAll').prop('checked', false);
        }

        $('.alert_import').remove();

        updateStatistics();
        saveData();
    });

    if ($('#search_items').val() != '') {
        $('#search_items').keyup();
    }
    if ($('input.obtain_cbx:checked').length) {
        $('input.obtain_cbx').change()
    }
    sortItems()

    checkScrapedTabVisibility();

}

function addSelectAllAndAlert(strTab, arrAllItems) {

    var strSelectAll = `
        <div id="selectAllWrapper">
            <div class="choice">
                <input value="selectAll" type="checkbox" class="styled" id="selectAll">
                <label for="selectAll">Select all</label>
            </div>
            <div>|</div>
            <div class="choice">
                <a href="javascript:void(0)" target="_self" style="color: inherit; text-decoration: unset;" onclick="openJsonPopup();"><b>Import save file</b></a>
            </div>
        </div>`;

    $(`#scraped`).prepend(strSelectAll);

    if (objMistriaData[strTab].size === 0 || (strTab === 'customization' && eqSet(objMistriaData['customization'], new Set(objMistriaDataDefault.customization)))) {
        var strAlert = `
        <div class="alert show yellow alert_import" style="grid-column: 1/-1; height: min-content;">
            <div class="icon yellow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24.002" height="24" stroke="none"
                    viewBox="0 0 24.002 24">
                    <path
                        d="M-1990-7434a12,12,0,0,1,12-12,12,12,0,0,1,12,12,12,12,0,0,1-12,12A12,12,0,0,1-1990-7434Zm2.5,0a9.51,9.51,0,0,0,9.5,9.5,9.51,9.51,0,0,0,9.5-9.5,9.511,9.511,0,0,0-9.5-9.5A9.511,9.511,0,0,0-1987.5-7434Zm8.181,4.414A1.3,1.3,0,0,1-1978-7430.9a1.325,1.325,0,0,1,1.3,1.315,1.342,1.342,0,0,1-1.3,1.315A1.317,1.317,0,0,1-1979.319-7429.585Zm.269-3c0-.938-.056-2.1-.11-3.223s-.11-2.293-.11-3.233a1.106,1.106,0,0,1,1.252-1.063,1.109,1.109,0,0,1,1.235,1.063c0,.942-.056,2.106-.11,3.233s-.11,2.285-.11,3.223c0,.578-.622.792-1.015.792C-1978.656-7431.792-1979.05-7432.1-1979.05-7432.585Z"
                        transform="translate(1990.001 7446)" fill="#242424"></path>
                </svg>
            </div>
            <div class="info" style="line-height: 18px;">
                <a href="javascript:void(0)" target="_self" style="color: inherit; text-decoration: unset;" onclick="openJsonPopup();"><b>Import save file</b></a> to get aquired items! </br>
            </div>
        </div>`;

        $(`#scraped`).prepend(strAlert);
    }

    if ($(`.item_cbx`).length == $(`.item_cbx:checked`).length) {
        $('#selectAll').prop('checked', true);
    }

    $('#selectAll').off('change').change(function () {
        $('.alert_import').remove();

        let bolChecked = $(this).is(':checked');
        $(`.item_cbx`).prop('checked', bolChecked);


        if (bolChecked) {
            arrAllItems.forEach(strItemKey => objMistriaData[strTab].add(strItemKey))
        } else {
            arrAllItems.forEach(strItemKey => objMistriaData[strTab].delete(strItemKey))
        }
        updateStatistics();
        saveData();
    });
}

var arrPalette = ["#4a4e69", "#726d81", "#b0a4ab", "#c6bbbe", "#e7dedb"];
// var objSetsColorCodes = {
//     'archaeology': "#d0c3be",
//     'fish': "#bac8db",
//     'flora': "#b6cdcf",
//     'insect': "#d0bdd9",
// };
var objSetsColorCodes = {
    'archaeology': arrPalette[0],
    'fish': arrPalette[1],
    'flora': arrPalette[2],
    'insect': arrPalette[3],
};
var arrTips = [];
var arrTipsHtml = [];
var intDataAvailable;
var intDataSkip = 0;
var intDayCountCharts;
const getFlexChildren = function (strText) {
    return strText.toString().split("").map((strChar) => strChar === ' ' ? `<span style="min-width: 0.5ch"></span>` : `<span>${strChar}</span>`).join('');
};

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

function loadWrappedTab() {

    // if update charts, update dummy data as well
    if (JSON.parse(localStorage.getItem('mistria_wrapped')) === null) {
        // load dummy data

        var strAlert = `
                <div class="alert show yellow" style="width: 100%;">
                    <div class="icon yellow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24.002" height="24" stroke="none"
                            viewBox="0 0 24.002 24">
                            <path
                                d="M-1990-7434a12,12,0,0,1,12-12,12,12,0,0,1,12,12,12,12,0,0,1-12,12A12,12,0,0,1-1990-7434Zm2.5,0a9.51,9.51,0,0,0,9.5,9.5,9.51,9.51,0,0,0,9.5-9.5,9.511,9.511,0,0,0-9.5-9.5A9.511,9.511,0,0,0-1987.5-7434Zm8.181,4.414A1.3,1.3,0,0,1-1978-7430.9a1.325,1.325,0,0,1,1.3,1.315,1.342,1.342,0,0,1-1.3,1.315A1.317,1.317,0,0,1-1979.319-7429.585Zm.269-3c0-.938-.056-2.1-.11-3.223s-.11-2.293-.11-3.233a1.106,1.106,0,0,1,1.252-1.063,1.109,1.109,0,0,1,1.235,1.063c0,.942-.056,2.106-.11,3.233s-.11,2.285-.11,3.223c0,.578-.622.792-1.015.792C-1978.656-7431.792-1979.05-7432.1-1979.05-7432.585Z"
                                transform="translate(1990.001 7446)" fill="#242424"></path>
                        </svg>
                    </div>
                    <div class="info" style="line-height: 18px;">
                        <a href="javascript:void(0)" target="_self" style="color: inherit; text-decoration: unset;" onclick="openJsonPopup();"><b>Import save file</b></a> to generate charts! </br>
                        <div style="font-size: 12px; line-height: 12px; padding-top: 2px;">
                            If you had previously uploaded your file, please do it again. </br>
                            If you catch any errors, feel free to <a style="color: inherit;" href="https://www.reddit.com/r/FieldsOfMistriaGame/comments/1mdf17v/interactive_gift_guide_v0140/">contact me</a>!
                        </div>
                    </div>
                </div>`;


        $('#wrapped').append(strAlert);


        $('#wrapped').css('overflow', 'hidden');
        $('#wrapped').append('<div id="wrapped_charts"></div>');

    } else {
        $('#wrapped').append('<div id="wrapped_charts"></div>');
    }


    Chart.defaults.plugins.colorschemes.scheme = arrPalette;
    if (objMistriaData.options.has('mode_dark')) {
        Chart.defaults.scale.grid.color = "#00000050";
    }


    var arrSeasons = ['Spring', 'Summer', 'Fall', 'Winter'];

    // 36 font size / 122px width
    var strFarmerSVG = `
        <svg width="42" height="122" viewBox="0 0 42 122" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33 114.67V117.922H11.9766C10.6055 117.922 9.45117 117.676 8.51367 117.184C7.56445 116.68 6.84961 115.959 6.36914 115.021C5.87695 114.084 5.63086 112.971 5.63086 111.682C5.63086 111.307 5.6543 110.932 5.70117 110.557C5.74805 110.17 5.81836 109.795 5.91211 109.432L8.56641 109.607C8.50781 109.854 8.4668 110.135 8.44336 110.451C8.41992 110.756 8.4082 111.061 8.4082 111.365C8.4082 112.057 8.54883 112.654 8.83008 113.158C9.09961 113.65 9.49805 114.025 10.0254 114.283C10.5527 114.541 11.2031 114.67 11.9766 114.67H33ZM13.9805 110.627H16.4766V120.928H13.9805V110.627ZM29.748 92.911H19.957C19.207 92.911 18.5566 93.0634 18.0059 93.368C17.4434 93.661 17.0098 94.1063 16.7051 94.704C16.4004 95.3016 16.248 96.0399 16.248 96.9188C16.248 97.7391 16.3887 98.4598 16.6699 99.0809C16.9512 99.6903 17.3203 100.171 17.7773 100.522C18.2344 100.862 18.7266 101.032 19.2539 101.032V104.284C18.5742 104.284 17.9004 104.108 17.2324 103.757C16.5645 103.405 15.9609 102.901 15.4219 102.245C14.8711 101.577 14.4375 100.78 14.1211 99.8544C13.793 98.9169 13.6289 97.8739 13.6289 96.7255C13.6289 95.3427 13.8633 94.1239 14.332 93.0692C14.8008 92.0028 15.5098 91.1708 16.459 90.5731C17.3965 89.9637 18.5742 89.6591 19.9922 89.6591H28.8516C29.4844 89.6591 30.1582 89.6063 30.873 89.5009C31.5879 89.3837 32.2031 89.2137 32.7188 88.9911H33V92.3837C32.625 92.5477 32.127 92.6766 31.5059 92.7704C30.873 92.8641 30.2871 92.911 29.748 92.911ZM21.4688 92.3485L23.7539 92.3134L23.7539 95.6005C23.7539 96.5262 23.8301 97.3524 23.9824 98.079C24.123 98.8055 24.3398 99.4149 24.6328 99.9071C24.9258 100.399 25.2949 100.774 25.7402 101.032C26.1738 101.29 26.6836 101.419 27.2695 101.419C27.8672 101.419 28.4121 101.284 28.9043 101.015C29.3965 100.745 29.7891 100.341 30.082 99.8016C30.3633 99.2509 30.5039 98.577 30.5039 97.7802C30.5039 96.7841 30.293 95.9052 29.8711 95.1434C29.4492 94.3817 28.9336 93.7782 28.3242 93.3329C27.7148 92.8759 27.123 92.6298 26.5488 92.5946L28.1133 91.2059C28.6055 91.288 29.1504 91.5106 29.748 91.8739C30.3457 92.2372 30.9199 92.7235 31.4707 93.3329C32.0098 93.9305 32.4609 94.6454 32.8242 95.4774C33.1758 96.2977 33.3516 97.2235 33.3516 98.2548C33.3516 99.5438 33.0996 100.675 32.5957 101.647C32.0918 102.608 31.418 103.358 30.5742 103.897C29.7188 104.425 28.7637 104.688 27.709 104.688C26.6895 104.688 25.793 104.489 25.0195 104.091C24.2344 103.692 23.584 103.118 23.0684 102.368C22.541 101.618 22.1426 100.716 21.873 99.661C21.6035 98.6063 21.4688 97.4286 21.4688 96.1278L21.4688 92.3485ZM16.9688 78.4119H33V81.6638H13.9805V78.4998L16.9688 78.4119ZM13.875 72.4705L16.8984 72.488C16.8398 72.7576 16.8047 73.0154 16.793 73.2615C16.7695 73.4959 16.7578 73.7654 16.7578 74.0701C16.7578 74.8201 16.875 75.4822 17.1094 76.0564C17.3438 76.6306 17.6719 77.117 18.0938 77.5154C18.5156 77.9138 19.0195 78.2302 19.6055 78.4646C20.1797 78.6873 20.8125 78.8337 21.5039 78.9041L22.0313 79.8181C20.8828 79.8181 19.8047 79.7068 18.7969 79.4841C17.7891 79.2498 16.8984 78.8923 16.125 78.4119C15.3398 77.9314 14.7305 77.322 14.2969 76.5837C13.8516 75.8337 13.6289 74.9431 13.6289 73.9119C13.6289 73.6775 13.6582 73.408 13.7168 73.1033C13.7637 72.7986 13.8164 72.5877 13.875 72.4705ZM17.7598 63.3502H33L33 66.6198H13.9805V63.526L17.7598 63.3502ZM22.7695 64.0182L22.7168 65.5299C21.416 65.5182 20.2148 65.3483 19.1133 65.0202C18 64.692 17.0332 64.2057 16.2129 63.5612C15.3926 62.9166 14.7598 62.1139 14.3145 61.153C13.8574 60.192 13.6289 59.0788 13.6289 57.8131C13.6289 56.9225 13.7578 56.1022 14.0156 55.3522C14.2617 54.6022 14.6543 53.9518 15.1934 53.401C15.7324 52.8502 16.4238 52.4225 17.2676 52.1178C18.1113 51.8131 19.1309 51.6608 20.3262 51.6608H33V54.9127H20.4844C19.4883 54.9127 18.6914 55.0827 18.0938 55.4225C17.4961 55.7506 17.0625 56.2194 16.793 56.8288C16.5117 57.4381 16.3711 58.153 16.3711 58.9733C16.3711 59.9342 16.541 60.737 16.8809 61.3815C17.2207 62.026 17.6895 62.5416 18.2871 62.9284C18.8848 63.3151 19.5703 63.5963 20.3438 63.7721C21.1055 63.9362 21.9141 64.0182 22.7695 64.0182ZM20.9766 51.6959L21.6445 53.8756C20.6016 53.8639 19.5996 53.694 18.6387 53.3659C17.6777 53.026 16.8223 52.5397 16.0723 51.9069C15.3223 51.2623 14.7305 50.4713 14.2969 49.5338C13.8516 48.5963 13.6289 47.5241 13.6289 46.317C13.6289 45.2975 13.7637 44.3952 14.0332 43.61C14.3027 42.8131 14.7188 42.1452 15.2813 41.6061C15.832 41.0553 16.541 40.6393 17.4082 40.358C18.2754 40.0768 19.3066 39.9362 20.502 39.9362H33V43.2057H20.4668C19.4004 43.2057 18.5742 43.3756 17.9883 43.7155C17.3906 44.0436 16.9746 44.5123 16.7402 45.1217C16.4941 45.7194 16.3711 46.4342 16.3711 47.2663C16.3711 47.9811 16.4941 48.6139 16.7402 49.1647C16.9863 49.7155 17.3262 50.1784 17.7598 50.5534C18.1816 50.9284 18.668 51.2155 19.2188 51.4147C19.7695 51.6022 20.3555 51.6959 20.9766 51.6959ZM33.3516 24.2417C33.3516 25.5659 33.1289 26.7671 32.6836 27.8452C32.2266 28.9116 31.5879 29.8316 30.7676 30.605C29.9473 31.3667 28.9746 31.9527 27.8496 32.3628C26.7246 32.773 25.4941 32.978 24.1582 32.978H23.4199C21.873 32.978 20.4961 32.7495 19.2891 32.2925C18.0703 31.8355 17.0391 31.2144 16.1953 30.4292C15.3516 29.6441 14.7129 28.7534 14.2793 27.7573C13.8457 26.7612 13.6289 25.73 13.6289 24.6636C13.6289 23.3042 13.8633 22.1323 14.332 21.148C14.8008 20.1519 15.457 19.3374 16.3008 18.7046C17.1328 18.0718 18.1172 17.603 19.2539 17.2984C20.3789 16.9937 21.6094 16.8413 22.9453 16.8413H24.4043V31.0444H21.75V20.0933H21.5039C20.6602 20.1402 19.8398 20.3159 19.043 20.6206C18.2461 20.9136 17.5898 21.3823 17.0742 22.0269C16.5586 22.6714 16.3008 23.5503 16.3008 24.6636C16.3008 25.4019 16.459 26.0816 16.7754 26.7027C17.0801 27.3237 17.5371 27.8569 18.1465 28.3023C18.7559 28.7476 19.5 29.0933 20.3789 29.3394C21.2578 29.5855 22.2715 29.7085 23.4199 29.7085H24.1582C25.0605 29.7085 25.9102 29.5855 26.707 29.3394C27.4922 29.0816 28.1836 28.7124 28.7813 28.2319C29.3789 27.7398 29.8477 27.148 30.1875 26.4566C30.5273 25.7534 30.6973 24.9566 30.6973 24.0659C30.6973 22.9175 30.4629 21.9448 29.9941 21.148C29.5254 20.3511 28.8984 19.6538 28.1133 19.0562L29.6777 17.0874C30.2988 17.4976 30.8906 18.0191 31.4531 18.6519C32.0156 19.2847 32.4727 20.064 32.8242 20.9898C33.1758 21.9038 33.3516 22.9878 33.3516 24.2417ZM16.9688 6.9125H33V10.1645H13.9805V7.00039L16.9688 6.9125ZM13.875 0.971092L16.8984 0.98867C16.8398 1.2582 16.8047 1.51601 16.793 1.76211C16.7695 1.99648 16.7578 2.26601 16.7578 2.5707C16.7578 3.3207 16.875 3.98281 17.1094 4.55703C17.3438 5.13125 17.6719 5.61758 18.0938 6.01601C18.5156 6.41445 19.0195 6.73086 19.6055 6.96523C20.1797 7.18789 20.8125 7.33437 21.5039 7.40469L22.0313 8.31875C20.8828 8.31875 19.8047 8.20742 18.7969 7.98476C17.7891 7.75039 16.8984 7.39297 16.125 6.9125C15.3398 6.43203 14.7305 5.82265 14.2969 5.08437C13.8516 4.33437 13.6289 3.44375 13.6289 2.4125C13.6289 2.17812 13.6582 1.90859 13.7168 1.6039C13.7637 1.29922 13.8164 1.08828 13.875 0.971092Z" fill="black"/>
        </svg>`;
    var strFarmSVG = `
        <svg width="42" height="123" viewBox="0 0 42 123" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33 115.67V118.922H11.9766C10.6055 118.922 9.45117 118.676 8.51367 118.184C7.56445 117.68 6.84961 116.959 6.36914 116.021C5.87695 115.084 5.63086 113.971 5.63086 112.682C5.63086 112.307 5.6543 111.932 5.70117 111.557C5.74805 111.17 5.81836 110.795 5.91211 110.432L8.56641 110.607C8.50781 110.854 8.4668 111.135 8.44336 111.451C8.41992 111.756 8.4082 112.061 8.4082 112.365C8.4082 113.057 8.54883 113.654 8.83008 114.158C9.09961 114.65 9.49805 115.025 10.0254 115.283C10.5527 115.541 11.2031 115.67 11.9766 115.67H33ZM13.9805 111.627H16.4766V121.928H13.9805V111.627ZM29.748 81.311H19.957C19.207 81.311 18.5566 81.4634 18.0059 81.768C17.4434 82.061 17.0098 82.5063 16.7051 83.104C16.4004 83.7016 16.248 84.4399 16.248 85.3188C16.248 86.1391 16.3887 86.8598 16.6699 87.4809C16.9512 88.0903 17.3203 88.5708 17.7773 88.9223C18.2344 89.2622 18.7266 89.4321 19.2539 89.4321V92.6841C18.5742 92.6841 17.9004 92.5083 17.2324 92.1567C16.5645 91.8052 15.9609 91.3013 15.4219 90.645C14.8711 89.977 14.4375 89.1802 14.1211 88.2544C13.793 87.3169 13.6289 86.2739 13.6289 85.1255C13.6289 83.7427 13.8633 82.5239 14.332 81.4692C14.8008 80.4028 15.5098 79.5708 16.459 78.9731C17.3965 78.3638 18.5742 78.0591 19.9922 78.0591H28.8516C29.4844 78.0591 30.1582 78.0063 30.873 77.9009C31.5879 77.7837 32.2031 77.6138 32.7188 77.3911H33V80.7837C32.625 80.9477 32.127 81.0766 31.5059 81.1704C30.873 81.2641 30.2871 81.311 29.748 81.311ZM21.4688 80.7485L23.7539 80.7134V84.0005C23.7539 84.9263 23.8301 85.7524 23.9824 86.479C24.123 87.2055 24.3398 87.8149 24.6328 88.3071C24.9258 88.7993 25.2949 89.1743 25.7402 89.4321C26.1738 89.6899 26.6836 89.8188 27.2695 89.8188C27.8672 89.8188 28.4121 89.6841 28.9043 89.4145C29.3965 89.145 29.7891 88.7407 30.082 88.2016C30.3633 87.6509 30.5039 86.977 30.5039 86.1802C30.5039 85.1841 30.293 84.3052 29.8711 83.5434C29.4492 82.7817 28.9336 82.1782 28.3242 81.7329C27.7148 81.2759 27.123 81.0298 26.5488 80.9946L28.1133 79.6059C28.6055 79.688 29.1504 79.9106 29.748 80.2739C30.3457 80.6372 30.9199 81.1235 31.4707 81.7329C32.0098 82.3305 32.4609 83.0454 32.8242 83.8774C33.1758 84.6977 33.3516 85.6235 33.3516 86.6548C33.3516 87.9438 33.0996 89.0747 32.5957 90.0473C32.0918 91.0083 31.418 91.7583 30.5742 92.2973C29.7188 92.8247 28.7637 93.0884 27.709 93.0884C26.6895 93.0884 25.793 92.8891 25.0195 92.4907C24.2344 92.0923 23.584 91.518 23.0684 90.768C22.541 90.018 22.1426 89.1157 21.873 88.061C21.6035 87.0063 21.4688 85.8286 21.4688 84.5278V80.7485ZM16.9688 54.2119H33V57.4638H13.9805V54.2998L16.9688 54.2119ZM13.875 48.2705L16.8984 48.288C16.8398 48.5576 16.8047 48.8154 16.793 49.0615C16.7695 49.2959 16.7578 49.5654 16.7578 49.8701C16.7578 50.6201 16.875 51.2822 17.1094 51.8564C17.3438 52.4306 17.6719 52.917 18.0938 53.3154C18.5156 53.7138 19.0195 54.0302 19.6055 54.2646C20.1797 54.4873 20.8125 54.6338 21.5039 54.7041L22.0313 55.6181C20.8828 55.6181 19.8047 55.5068 18.7969 55.2841C17.7891 55.0498 16.8984 54.6923 16.125 54.2119C15.3398 53.7314 14.7305 53.122 14.2969 52.3838C13.8516 51.6338 13.6289 50.7431 13.6289 49.7119C13.6289 49.4775 13.6582 49.208 13.7168 48.9033C13.7637 48.5986 13.8164 48.3877 13.875 48.2705ZM17.7598 26.5502H33V29.8198H13.9805V26.726L17.7598 26.5502ZM22.7695 27.2182L22.7168 28.7299C21.416 28.7182 20.2148 28.5483 19.1133 28.2202C18 27.892 17.0332 27.4057 16.2129 26.7612C15.3926 26.1166 14.7598 25.3139 14.3145 24.353C13.8574 23.392 13.6289 22.2787 13.6289 21.0131C13.6289 20.1225 13.7578 19.3022 14.0156 18.5522C14.2617 17.8022 14.6543 17.1518 15.1934 16.601C15.7324 16.0502 16.4238 15.6225 17.2676 15.3178C18.1113 15.0131 19.1309 14.8608 20.3262 14.8608H33V18.1127H20.4844C19.4883 18.1127 18.6914 18.2827 18.0938 18.6225C17.4961 18.9506 17.0625 19.4194 16.793 20.0287C16.5117 20.6381 16.3711 21.353 16.3711 22.1733C16.3711 23.1342 16.541 23.937 16.8809 24.5815C17.2207 25.226 17.6895 25.7416 18.2871 26.1284C18.8848 26.5151 19.5703 26.7963 20.3438 26.9721C21.1055 27.1362 21.9141 27.2182 22.7695 27.2182ZM20.9766 14.8959L21.6445 17.0756C20.6016 17.0639 19.5996 16.894 18.6387 16.5659C17.6777 16.226 16.8223 15.7397 16.0723 15.1069C15.3223 14.4623 14.7305 13.6713 14.2969 12.7338C13.8516 11.7963 13.6289 10.7241 13.6289 9.51703C13.6289 8.4975 13.7637 7.59515 14.0332 6.81C14.3027 6.01312 14.7188 5.34515 15.2813 4.80609C15.832 4.25531 16.541 3.83929 17.4082 3.55804C18.2754 3.27679 19.3066 3.13617 20.502 3.13617H33V6.4057H20.4668C19.4004 6.4057 18.5742 6.57562 17.9883 6.91547C17.3906 7.24359 16.9746 7.71234 16.7402 8.32172C16.4941 8.91937 16.3711 9.63422 16.3711 10.4662C16.3711 11.1811 16.4941 11.8139 16.7402 12.3647C16.9863 12.9155 17.3262 13.3784 17.7598 13.7534C18.1816 14.1284 18.668 14.4155 19.2188 14.6147C19.7695 14.8022 20.3555 14.8959 20.9766 14.8959Z" fill="black"/>
        </svg>`;
    var strBirthdaySVG = `
        <svg width="42" height="123" viewBox="0 0 42 123" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 120.539V117.27H29.3086L33 117.551V120.539H6ZM23.332 104.42H23.7012C25.084 104.42 26.3672 104.584 27.5508 104.912C28.7227 105.24 29.7422 105.721 30.6094 106.354C31.4766 106.986 32.1504 107.76 32.6309 108.674C33.1113 109.588 33.3516 110.637 33.3516 111.82C33.3516 113.027 33.1465 114.088 32.7363 115.002C32.3145 115.904 31.7109 116.666 30.9258 117.287C30.1406 117.908 29.1914 118.406 28.0781 118.781C26.9648 119.145 25.7109 119.396 24.3164 119.537H22.6992C21.293 119.396 20.0332 119.145 18.9199 118.781C17.8066 118.406 16.8574 117.908 16.0723 117.287C15.2754 116.666 14.6719 115.904 14.2617 115.002C13.8398 114.1 13.6289 113.051 13.6289 111.855C13.6289 110.66 13.8633 109.6 14.332 108.674C14.7891 107.748 15.4453 106.975 16.3008 106.354C17.1562 105.721 18.1816 105.24 19.377 104.912C20.5605 104.584 21.8789 104.42 23.332 104.42ZM23.7012 107.689H23.332C22.3828 107.689 21.4922 107.777 20.6602 107.953C19.8164 108.129 19.0781 108.41 18.4453 108.797C17.8008 109.184 17.2969 109.693 16.9336 110.326C16.5586 110.959 16.3711 111.738 16.3711 112.664C16.3711 113.484 16.5117 114.199 16.793 114.809C17.0742 115.406 17.4551 115.916 17.9355 116.338C18.4043 116.76 18.9434 117.105 19.5527 117.375C20.1504 117.633 20.7715 117.826 21.416 117.955H25.6523C26.4727 117.768 27.2637 117.463 28.0254 117.041C28.7754 116.607 29.3906 116.033 29.8711 115.318C30.3516 114.592 30.5918 113.695 30.5918 112.629C30.5918 111.75 30.416 111 30.0645 110.379C29.7012 109.746 29.2031 109.236 28.5703 108.85C27.9375 108.451 27.2051 108.158 26.373 107.971C25.541 107.783 24.6504 107.689 23.7012 107.689ZM13.9805 97.8534H33V101.123H13.9805V97.8534ZM8.93555 101.369C8.4082 101.369 7.96289 101.211 7.59961 100.894C7.23633 100.566 7.05469 100.086 7.05469 99.453C7.05469 98.832 7.23633 98.3573 7.59961 98.0292C7.96289 97.6894 8.4082 97.5195 8.93555 97.5195C9.43945 97.5195 9.87305 97.6894 10.2363 98.0292C10.5879 98.3573 10.7637 98.832 10.7637 99.453C10.7637 100.086 10.5879 100.566 10.2363 100.894C9.87305 101.211 9.43945 101.369 8.93555 101.369ZM16.9688 90.4608H33V93.7127H13.9805V90.5487L16.9688 90.4608ZM13.875 84.5194L16.8984 84.537C16.8398 84.8065 16.8047 85.0643 16.793 85.3104C16.7695 85.5448 16.7578 85.8143 16.7578 86.119C16.7578 86.869 16.875 87.5311 17.1094 88.1053C17.3438 88.6795 17.6719 89.1659 18.0938 89.5643C18.5156 89.9627 19.0195 90.2791 19.6055 90.5135C20.1797 90.7362 20.8125 90.8827 21.5039 90.953L22.0313 91.867C20.8828 91.867 19.8047 91.7557 18.7969 91.533C17.7891 91.2987 16.8984 90.9412 16.125 90.4608C15.3398 89.9803 14.7305 89.3709 14.2969 88.6327C13.8516 87.8827 13.6289 86.992 13.6289 85.9608C13.6289 85.7264 13.6582 85.4569 13.7168 85.1522C13.7637 84.8475 13.8164 84.6366 13.875 84.5194ZM13.9805 73.7517H16.4766V84.0349H13.9805L13.9805 73.7517ZM9.35742 80.5545L9.35742 77.3025H28.2891C28.9336 77.3025 29.4199 77.2029 29.748 77.0037C30.0762 76.8045 30.293 76.5466 30.3984 76.2302C30.5039 75.9138 30.5566 75.574 30.5566 75.2107C30.5566 74.9412 30.5332 74.6599 30.4863 74.367C30.4277 74.0623 30.3809 73.8338 30.3457 73.6814L33 73.6638C33.082 73.9216 33.1582 74.2615 33.2285 74.6834C33.3105 75.0935 33.3516 75.5916 33.3516 76.1775C33.3516 76.9744 33.1934 77.7068 32.877 78.3748C32.5605 79.0427 32.0332 79.5759 31.2949 79.9744C30.5449 80.3611 29.5371 80.5545 28.2715 80.5545H9.35742ZM6 67.7653H33V71.0173H6V67.7653ZM22.7695 68.5387L22.7168 69.8923C21.416 69.8805 20.2148 69.6872 19.1133 69.3122C18 68.9372 17.0332 68.4098 16.2129 67.7302C15.3926 67.0505 14.7598 66.2419 14.3145 65.3044C13.8574 64.3552 13.6289 63.3063 13.6289 62.1579C13.6289 61.2204 13.7578 60.3766 14.0156 59.6266C14.2617 58.8766 14.6602 58.238 15.2109 57.7106C15.7617 57.1716 16.4766 56.7614 17.3555 56.4802C18.2227 56.1989 19.2832 56.0583 20.5371 56.0583H33V59.3278H20.502C19.5059 59.3278 18.709 59.4743 18.1113 59.7673C17.502 60.0602 17.0625 60.488 16.793 61.0505C16.5117 61.613 16.3711 62.3044 16.3711 63.1247C16.3711 63.9333 16.541 64.6716 16.8809 65.3395C17.2207 65.9958 17.6895 66.5641 18.2871 67.0446C18.8848 67.5134 19.5703 67.8825 20.3438 68.152C21.1055 68.4098 21.9141 68.5387 22.7695 68.5387ZM29.3086 40.2809H6V37.0113H33V39.9996L29.3086 40.2809ZM23.7012 53.0777H23.332C21.8789 53.0777 20.5605 52.902 19.377 52.5504C18.1816 52.1871 17.1563 51.6773 16.3008 51.0211C15.4453 50.3531 14.7891 49.5621 14.332 48.648C13.8633 47.7223 13.6289 46.691 13.6289 45.5543C13.6289 44.359 13.8398 43.316 14.2617 42.4254C14.6719 41.523 15.2754 40.7613 16.0723 40.1402C16.8574 39.5074 17.8066 39.0094 18.9199 38.6461C20.0332 38.2828 21.293 38.0309 22.6992 37.8902H24.3164C25.7109 38.0191 26.9648 38.2711 28.0781 38.6461C29.1914 39.0094 30.1406 39.5074 30.9258 40.1402C31.7109 40.7613 32.3145 41.523 32.7363 42.4254C33.1465 43.3277 33.3516 44.3824 33.3516 45.5895C33.3516 46.7027 33.1113 47.7223 32.6309 48.648C32.1504 49.5621 31.4766 50.3531 30.6094 51.0211C29.7422 51.6773 28.7227 52.1871 27.5508 52.5504C26.3672 52.902 25.084 53.0777 23.7012 53.0777ZM23.332 49.8082H23.7012C24.6504 49.8082 25.541 49.7145 26.373 49.527C27.2051 49.3277 27.9375 49.023 28.5703 48.6129C29.2031 48.2027 29.7012 47.6813 30.0645 47.0484C30.416 46.4156 30.5918 45.6598 30.5918 44.7809C30.5918 43.7027 30.3633 42.818 29.9063 42.1266C29.4492 41.4234 28.8457 40.8609 28.0957 40.4391C27.3457 40.0172 26.5313 39.6891 25.6523 39.4547H21.416C20.7715 39.5953 20.1504 39.8004 19.5527 40.0699C18.9434 40.3277 18.4043 40.6676 17.9355 41.0895C17.4551 41.4996 17.0742 42.0094 16.793 42.6188C16.5117 43.2164 16.3711 43.9254 16.3711 44.7457C16.3711 45.6363 16.5586 46.4039 16.9336 47.0484C17.2969 47.6813 17.8008 48.2027 18.4453 48.6129C19.0781 49.023 19.8164 49.3277 20.6602 49.527C21.4922 49.7145 22.3828 49.8082 23.332 49.8082ZM29.748 21.814H19.957C19.207 21.814 18.5566 21.9663 18.0059 22.271C17.4434 22.564 17.0098 23.0093 16.7051 23.607C16.4004 24.2046 16.248 24.9429 16.248 25.8218C16.248 26.6421 16.3887 27.3628 16.6699 27.9839C16.9512 28.5933 17.3203 29.0738 17.7773 29.4253C18.2344 29.7652 18.7266 29.9351 19.2539 29.9351V33.187C18.5742 33.187 17.9004 33.0113 17.2324 32.6597C16.5645 32.3081 15.9609 31.8042 15.4219 31.148C14.8711 30.48 14.4375 29.6831 14.1211 28.7573C13.793 27.8198 13.6289 26.7769 13.6289 25.6284C13.6289 24.2456 13.8633 23.0269 14.332 21.9722C14.8008 20.9058 15.5098 20.0738 16.459 19.4761C17.3965 18.8667 18.5742 18.562 19.9922 18.562H28.8516C29.4844 18.562 30.1582 18.5093 30.873 18.4038C31.5879 18.2866 32.2031 18.1167 32.7188 17.8941H33V21.2866C32.625 21.4507 32.127 21.5796 31.5059 21.6734C30.873 21.7671 30.2871 21.814 29.748 21.814ZM21.4688 21.2515L23.7539 21.2163V24.5034C23.7539 25.4292 23.8301 26.2554 23.9824 26.982C24.123 27.7085 24.3398 28.3179 24.6328 28.8101C24.9258 29.3023 25.2949 29.6773 25.7402 29.9351C26.1738 30.1929 26.6836 30.3218 27.2695 30.3218C27.8672 30.3218 28.4121 30.187 28.9043 29.9175C29.3965 29.648 29.7891 29.2437 30.082 28.7046C30.3633 28.1538 30.5039 27.48 30.5039 26.6831C30.5039 25.687 30.293 24.8081 29.8711 24.0464C29.4492 23.2847 28.9336 22.6812 28.3242 22.2359C27.7148 21.7788 27.123 21.5327 26.5488 21.4976L28.1133 20.1089C28.6055 20.1909 29.1504 20.4136 29.748 20.7769C30.3457 21.1402 30.9199 21.6265 31.4707 22.2359C32.0098 22.8335 32.4609 23.5484 32.8242 24.3804C33.1758 25.2007 33.3516 26.1265 33.3516 27.1577C33.3516 28.4468 33.0996 29.5777 32.5957 30.5503C32.0918 31.5113 31.418 32.2613 30.5742 32.8003C29.7188 33.3277 28.7637 33.5913 27.709 33.5913C26.6895 33.5913 25.793 33.3921 25.0195 32.9937C24.2344 32.5952 23.584 32.021 23.0684 31.271C22.541 30.521 22.1426 29.6187 21.873 28.564C21.6035 27.5093 21.4688 26.3316 21.4688 25.0308V21.2515ZM31.0313 9.46429L13.9805 4.17328V0.69281L35.9355 8.32172C36.4043 8.4975 36.9082 8.73187 37.4473 9.02484C37.998 9.30609 38.5195 9.66937 39.0117 10.1147C39.5039 10.56 39.9023 11.0991 40.207 11.7319C40.5234 12.353 40.6816 13.0971 40.6816 13.9643C40.6816 14.2221 40.6465 14.5502 40.5762 14.9487C40.5059 15.3471 40.4473 15.6284 40.4004 15.7924L37.7637 15.81C37.7754 15.7162 37.7871 15.5698 37.7988 15.3705C37.8223 15.1596 37.834 15.0131 37.834 14.9311C37.834 14.1928 37.7344 13.5659 37.5352 13.0502C37.3477 12.5346 37.0254 12.101 36.5684 11.7495C36.123 11.3862 35.5078 11.0756 34.7227 10.8178L31.0313 9.46429ZM13.9805 13.3491L28.7461 8.40961L32.1738 7.56586L33.3691 9.90375L13.9805 16.8998V13.3491Z" fill="black"/>
        </svg>`;

    var objInfoPlayer = objDataWrapped['player'];

    var objInfoGameData = objDataWrapped['gamedata'];

    var objInfoGameDataFacts = objDataWrapped['gamedata']['t2_world_facts'];
    var objInfoGameStats = objDataWrapped['game_stats'];


    intDataAvailable = objInfoGameStats['end_of_day_balance'].length;
    var intDataAvailableLastDay = objInfoGameStats['end_of_day_balance'][intDataAvailable - 1]['day'];
    intDayCountCharts = objInfoGameStats['end_of_day_balance'].length;


    if (intDataAvailable >= 100) {
        intDayCountCharts = 100;
        intDataSkip = intDataAvailable - intDayCountCharts;
    }
    var arrDaysLabels = [...Array(intDayCountCharts).keys()].map(i => intDataAvailableLastDay - i).reverse();


    /* Basic stats */

    var $divInfoBlockWrap = getBlock(9, 6, true, null, true);
    const intDay = Math.round((objInfoGameDataFacts['date_time'] / 86400) + 1);
    const intBirthday = objInfoPlayer['birthday'];
    const intBirthdaySeason = arrSeasons[Math.floor(((intBirthday / 86400)) / 28)];
    const intBirthdayDay = ((intBirthday / 86400)) % 28 + 1;

    // Name
    var $divInfoBlockWrap2 = getBlock(9, 2, true);
    var $divInfoBlock = $('<div>', { 'class': 'info' });
    $divInfoBlock.append(`<div class="info_vertical"><div class="info_desc">${strFarmerSVG}</div><div class="info_value">${objInfoPlayer['name']}</div></div>`);
    $($divInfoBlockWrap2).append($divInfoBlock);
    $($divInfoBlockWrap).append($divInfoBlockWrap2);

    // Farm name
    var $divInfoBlockWrap2 = getBlock(9, 2, true);
    var $divInfoBlock = $('<div>', { 'class': 'info' });
    $divInfoBlock.append(`<div class="info_vertical"><div class="info_desc">${strFarmSVG}</div><div class="info_value">${objInfoPlayer['farm_name']}</div></div>`);
    $($divInfoBlockWrap2).append($divInfoBlock);
    $($divInfoBlockWrap).append($divInfoBlockWrap2);

    // Birthday
    var $divInfoBlockWrap2 = getBlock(9, 2, true);
    var $divInfoBlock = $('<div>', { 'class': 'info' });
    $divInfoBlock.append(`<div class="info_vertical"><div class="info_desc">${strBirthdaySVG}</div><div class="info_value">${intBirthdaySeason} ${intBirthdayDay}</div></div>`);
    $($divInfoBlockWrap2).append($divInfoBlock);
    $($divInfoBlockWrap).append($divInfoBlockWrap2);

    $('#wrapped_charts').append($divInfoBlockWrap);
    /* END: Basic stats */



    /* Game time */
    var $divInfoBlockWrap = getBlock(4, 6, true, null, true);
    const strPlaytime = Math.round(objInfoGameData['playtime'] / 60 / 60);
    // hours irl
    var $divInfoBlockWrap2 = getBlock(4, 4, true);
    var $divInfoBlock = $('<div>', { 'class': 'info' });
    $divInfoBlock.append(`<div class="info_horizontal">
                            <div class="info_value calculate_spacing">${getFlexChildren(strPlaytime)}</div>
                            <div class="info_desc calculate_spacing">${getFlexChildren('hours played')}</div>
                        </div>`);
    $($divInfoBlockWrap2).append($divInfoBlock);
    $($divInfoBlockWrap).append($divInfoBlockWrap2);
    $('#wrapped_charts').append($divInfoBlockWrap);

    // days in game
    var $divInfoBlockWrap2 = getBlock(2, 2, true);
    var $divInfoBlock = $('<div>', { 'class': 'info' });
    $divInfoBlock.append(`<div class="info_horizontal">
                            <div class="info_value calculate_spacing">${getFlexChildren(intDay)}</div>
                            <div class="info_desc calculate_spacing">${getFlexChildren('days')}</div>
                        </div>`);
    $($divInfoBlockWrap2).append($divInfoBlock);
    $($divInfoBlockWrap).append($divInfoBlockWrap2);
    $('#wrapped_charts').append($divInfoBlockWrap);

    // years in game
    var $divInfoBlockWrap2 = getBlock(2, 2, true);
    var $divInfoBlock = $('<div>', { 'class': 'info' });
    $divInfoBlock.append(`<div class="info_horizontal">
                            <div class="info_value calculate_spacing">${getFlexChildren((intDay / (28 * 4) + 1).toFixed(1))}</div>
                            <div class="info_desc calculate_spacing">${getFlexChildren('years')}</div>
                        </div>`);
    $($divInfoBlockWrap2).append($divInfoBlock);
    $($divInfoBlockWrap).append($divInfoBlockWrap2);

    $('#wrapped_charts').append($divInfoBlockWrap);
    /* END: Game time */


    /* Inbox, bath, recipes */
    var $divInfoBlockWrapMiniGrid = getBlock(4, 6, true, null, true);

    // Inbox
    var $divInfoBlockWrap2 = getBlock(2, 2, true);
    var $divInfoBlock = $('<div>', { 'class': 'info' });
    $divInfoBlock.append(`<div class="info_horizontal">
                            <div class="info_value calculate_spacing">${getFlexChildren(objInfoPlayer['inbox'].length)}</div>
                            <div class="info_desc calculate_spacing">${getFlexChildren('inbox')}</div>
                        </div>`);

    $($divInfoBlockWrap2).append($divInfoBlock);
    $($divInfoBlockWrapMiniGrid).append($divInfoBlockWrap2);
    $('#wrapped_charts').append($divInfoBlockWrapMiniGrid);

    // Free baths
    var $divInfoBlockWrap2 = getBlock(2, 2, true);
    var $divInfoBlock = $('<div>', { 'class': 'info' });
    $divInfoBlock.append(`<div class="info_horizontal">
                            <div class="info_desc calculate_spacing">${getFlexChildren('available')}</div>
                            <div class="info_value calculate_spacing">${getFlexChildren(objInfoPlayer['stats']['free_baths'])}</div>
                            <div class="info_desc calculate_spacing">${getFlexChildren('free baths')}</div>
                        </div>`);
    $($divInfoBlockWrap2).append($divInfoBlock);
    $($divInfoBlockWrapMiniGrid).append($divInfoBlockWrap2);
    $('#wrapped_charts').append($divInfoBlockWrapMiniGrid);

    // Recipe unlocked
    var $divInfoBlockWrap2 = getBlock(2, 2, true);
    var $divInfoBlock = $('<div>', { 'class': 'info' });
    $divInfoBlock.append(`<div class="info_horizontal">
                            <div class="info_desc calculate_spacing">${getFlexChildren('unlocked')}</div>
                            <div class="info_value calculate_spacing ${objInfoPlayer['recipe_unlocks'].length > 9999 ? 'big_number' : ''}">${getFlexChildren(objInfoPlayer['recipe_unlocks'].length)}</div>
                            <div class="info_desc calculate_spacing">${getFlexChildren('recipes')}</div>
                        </div>`);
    $($divInfoBlockWrap2).append($divInfoBlock);
    $($divInfoBlockWrapMiniGrid).append($divInfoBlockWrap2);
    $('#wrapped_charts').append($divInfoBlockWrapMiniGrid);

    // Recipe created
    var $divInfoBlockWrap2 = getBlock(2, 2, true);
    var $divInfoBlock = $('<div>', { 'class': 'info' });
    $divInfoBlock.append(`<div class="info_horizontal">
                            <div class="info_desc calculate_spacing">${getFlexChildren('created')}</div>
                            <div class="info_value calculate_spacing" ${objInfoPlayer['recipes_created'].length > 9999 ? 'big_number' : ''}>${getFlexChildren(objInfoPlayer['recipes_created'].length)}</div>
                            <div class="info_desc calculate_spacing">${getFlexChildren('recipes')}</div>
                        </div>`);
    $($divInfoBlockWrap2).append($divInfoBlock);
    $($divInfoBlockWrapMiniGrid).append($divInfoBlockWrap2);

    $('#wrapped_charts').append($divInfoBlockWrapMiniGrid);
    /* END: Inbox, bath, recipes */



    /* Chart - XP */
    var arrAspectRatio = [6, 6];
    var $divInfoBlockWrap = getBlock(arrAspectRatio[0], arrAspectRatio[1], true);
    $('#wrapped_charts').append($divInfoBlockWrap);
    var objSkillLEvel = {}
    Object.entries(objInfoPlayer['skill_xp']).forEach(([key, value]) => {
        objSkillLEvel[key] = objInfoGameDataFacts[key + '_level']

    });
    $divInfoBlockWrap.append(`<div class="info_title">Skill level</div>`);

    $($divInfoBlockWrap).append(`<div class="chart-container">
                            <canvas id="chart_skill"></canvas>
                        </div>
                        `);
    const chartSkill = new Chart('chart_skill', {
        data: {
            labels: Object.keys(objSkillLEvel),
            datasets: [
                {
                    label: 'XP level',
                    data: Object.values(objSkillLEvel),
                }
            ]
        },
        type: 'radar',
        options: {
            aspectRatio: arrAspectRatio[0] / (arrAspectRatio[1] - (arrAspectRatio[1] * 0.25)),
            scales: {
                r: {
                    min: 0,
                    max: objBuild.maxSkillLevel,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 20,
                        backdropColor: 'transparent'
                    },
                    pointLabels: {
                    },
                }
            },
            plugins: {
                tooltip: {
                    displayColors: false,
                    callbacks: {
                        title: () => null,
                        label: function (context) {
                            let label = `${capitalizeFirstLetter(context.label)}: ${context.raw} (${objInfoPlayer['skill_xp'][context.label]} XP)`;
                            return label;
                        }
                    }
                },
                legend: {
                    display: false,
                },
            }
        },
    });
    allCharts['chartSkill'] = chartSkill;

    $('#wrapped_charts').append($divInfoBlockWrap);
    /* END: Chart - XP */



    /* Chart - Stamina */
    var arrAspectRatio = [12, 6];
    var $divInfoBlockWrap = getBlock(arrAspectRatio[0], arrAspectRatio[1]);
    var objCharactersSpokenAgo = {};

    // const arrInfoGameDataFactsKeys = Object.entries(objInfoGameDataFacts);
    // const objCutscenesOnly = arrInfoGameDataFactsKeys.filter(([key, value]) => key.includes("cutscene_seen_"));
    // const arrCutscenesKeys = Object.fromEntries(objCutscenesOnly);
    // var objCharactersCutscenes = {};

    Object.entries(objTabs.gifts.categories).forEach(([strCharKey, value]) => {
        var intLastSpoken = objInfoGameDataFacts[strCharKey + '_was_last_spoken_to'];
        if (!intLastSpoken) {
            return;
        }

        if (strCharKey == 'seridia' || strCharKey == 'seridia') {
            return;
        }
        var intDayLastSpoken = Math.round((intLastSpoken / 86400) + 1);
        objCharactersSpokenAgo[strCharKey] = intDay - intDayLastSpoken + 1;

        // var [totalCutscenes, seenCutscenes] = Object.entries(arrCutscenesKeys).reduce(([total, seen], [key, value]) => {
        //     const matches = key.includes("cutscene_seen_" + strCharKey)
        //     return matches ? [total + 1, seen + value] : [total, seen];
        // }, [0, 0])
        // objCharactersCutscenes[strCharKey] = [seenCutscenes, totalCutscenes];
    });

    var objItemsSold = {};
    var arrBalance = [];
    var arrStamina = [];
    var arrHealth = [];
    var arrSleeptime = [];

    for (let i = 0; i < intDataAvailable; i++) {
        if (intDataSkip && i < intDataSkip) {
            continue;
        }

        if (typeof (objInfoGameStats['end_of_day_balance'][i]) !== 'undefined') {
            arrBalance.push(objInfoGameStats['end_of_day_balance'][i]['balance'])
            arrStamina.push(objInfoGameStats['end_of_day_stats'][i]['stamina'])
            arrHealth.push(objInfoGameStats['end_of_day_stats'][i]['health'])
            arrSleeptime.push({ x: i, y: timetoint(objInfoGameStats['bedtimes'][i]) })
        }
    }

    var datasets = [
        {
            label: "Stamina",
            data: arrStamina,
            yAxisID: 'y',
        },
        {
            label: "Health",
            data: arrHealth,
            yAxisID: 'y',
        },
        {
            label: "Bedtime",
            data: arrSleeptime,
            yAxisID: 'y1',
        }
    ];

    $divInfoBlockWrap.append(`<div class="info_title">Stamina, HP and bedtime</div>`);
    $divInfoBlockWrap.append(`<div class="info_desc">last ${intDayCountCharts} days</div>`);
    $($divInfoBlockWrap).append(`<div class="chart-container">
                            <canvas id="Stamina"></canvas>
                        </div>
                        `);
    $('#wrapped_charts').append($divInfoBlockWrap);
    var data = {
        labels: arrDaysLabels,
        datasets: datasets
    };
    const chartStamina = new Chart('Stamina', {
        type: 'line',
        options: {
            clip: false,
            tension: 0.05,
            aspectRatio: arrAspectRatio[0] / (arrAspectRatio[1] - (arrAspectRatio[1] * 0.25)),
            interaction: {
                mode: 'index',
                intersect: false,
            },
            elements: {
                point: {
                    radius: 0
                }
            },
            layout: {
                padding: {
                    bottom: 15
                }
            },
            stacked: false,
            plugins: {
                legend: {
                    position: "bottom",
                    align: "middle",
                },
                colorschemes: {
                    scheme: ["#6b9080", "#ce5070", "#b6b6b6"]
                },
                tooltip: {
                    callbacks: {
                        title: ctx => {
                            return `Day ${ctx[0].label}`;
                        },
                        label: ctx => {
                            return `${ctx.dataset.label}: ${ctx.dataset.label == 'Bedtime' ? inttotime(ctx.raw.y) : ctx.raw}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        display: false
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    min: 0,
                    max: objInfoPlayer['stats']['base_stamina'],

                },
                y1: {
                    min: timetoint("6:00am"),
                    max: timetoint("2:00am"),
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        stepSize: 2 * 60 * 60 * 1000,
                        callback: function (value, index, ticks) {
                            return inttotime(value);
                        }
                    }
                }
            }
        },
        data: data
    });
    allCharts['chartStamina'] = chartStamina;
    /* END: Chart - Stamina */



    /* Tables - Days spoken since */
    var arrDaysSpoken = Object.values(objCharactersSpokenAgo);
    const setDaysSpoken = new Set(arrDaysSpoken);
    arrDaysSpoken = arrDaysSpoken.sort((a, b) => b - a);

    if (setDaysSpoken.size > 6) {
        var $divInfoBlockWrap = getBlock(8, 6, null, null, true);
    } else if (setDaysSpoken.size > 3) {
        var $divInfoBlockWrap = getBlock(4, 6, null, null, true);
    }

    if (setDaysSpoken.size > 3) {
        var $divInfoBlockWrap2 = getBlock(4, 6, null, true);
        var $divInfoBlock = $('<div>', { 'class': 'info' });

        const intThirdLargest = [...setDaysSpoken].sort((a, b) => b - a)[2]; // the third largest value

        var $divTableWrap = $('<div>', { 'class': 'table_wrap' });
        $divTableWrap.append('<div class="info_title">They miss you!</div>');
        $divTableWrap.append('<div class="info_desc">days since last spoken</div>');
        var strTableSpokenTo = '<table class="statistics_table">';

        objCharactersSpokenAgo = Object.fromEntries(
            Object.entries(objCharactersSpokenAgo).sort(([, a], [, b]) => b - a)
        );
        var i = 1;
        var prevValue = 0;
        Object.entries(objCharactersSpokenAgo).forEach(([strCharacterKey, intValue]) => {
            if (intValue < intThirdLargest) {
                return;
            }
            if (i > 3 && prevValue !== intValue) {
                return;
            }
            prevValue = intValue;
            i++;
            let objCharInfo = objTabs.gifts.categories[strCharacterKey].info;
            strTableSpokenTo += `<tr>
                                <td><img data-tippy-content="${objCharInfo.name}" src="images/${objTabs.gifts.info.img_mini_path}${objCharInfo.img_mini}.png"></td>
                                <td>${intValue}</td>
                            </tr>`;
        });
        strTableSpokenTo += '</table>';
        $divTableWrap.append(strTableSpokenTo);

        $($divInfoBlock).append($divTableWrap);
        $($divInfoBlockWrap2).append($divInfoBlock);
        $($divInfoBlockWrap).append($divInfoBlockWrap2);
        $('#wrapped_charts').append($divInfoBlockWrap);
    }

    if (setDaysSpoken.size > 6) {
        var $divInfoBlockWrap2 = getBlock(4, 6, null, true);
        var $divInfoBlock = $('<div>', { 'class': 'info' });

        const intThirdSmallest = [...setDaysSpoken].sort((a, b) => a - b)[2]; // the third smallest value

        var $divTableWrap = $('<div>', { 'class': 'table_wrap' });
        $divTableWrap.append('<div class="info_title">Gossiping about something fun?</div>');
        $divTableWrap.append('<div class="info_desc">days since last spoken</div>');
        var strTableSpokenTo = '<table class="statistics_table">';

        objCharactersSpokenAgo = Object.fromEntries(
            Object.entries(objCharactersSpokenAgo).sort(([, a], [, b]) => a - b)
        );

        var i = 1;
        var prevValue = 0;
        Object.entries(objCharactersSpokenAgo).forEach(([strCharacterKey, intValue]) => {
            if (intValue > intThirdSmallest) {
                return;
            }
            if (i > 3 && prevValue !== intValue) {
                return;
            }
            prevValue = intValue;
            i++;
            let objCharInfo = objTabs.gifts.categories[strCharacterKey].info;
            strTableSpokenTo += `<tr>
                                <td><img data-tippy-content="${objCharInfo.name}" src="images/${objTabs.gifts.info.img_mini_path}${objCharInfo.img_mini}.png"></td>
                                <td>${intValue}</td>
                            </tr>`;
        });
        strTableSpokenTo += '</table>';
        $divTableWrap.append(strTableSpokenTo);
        $($divInfoBlock).append($divTableWrap);
        $($divInfoBlockWrap2).append($divInfoBlock);
        $($divInfoBlockWrap).append($divInfoBlockWrap2);
    }
    /* END: Tables - Days spoken since */



    /* Chart - spoken to count */

    var arrAspectRatio = [12, 6];
    var $divInfoBlockWrap = getBlock(arrAspectRatio[0], arrAspectRatio[1]);
    $divInfoBlockWrap.css('display', 'none');

    var objSpokenCount = objInfoGameStats['npcs_spoken_to'];
    delete objSpokenCount['seridia'];
    delete objSpokenCount['zorel'];

    objSpokenCount = Object.fromEntries(
        Object.entries(objSpokenCount).sort(([, a], [, b]) => b - a)
    );

    var intSpokenTo = Object.keys(objSpokenCount).filter(el => objSpokenCount[el] > 0).length;
    var data = {
        labels: Object.keys(objSpokenCount).map((x) => objTabs.gifts.categories[x].info.name),
        datasets: [{
            data: Object.values(objSpokenCount),
        }]
    };
    var intSpokenCount = Object.values(objSpokenCount).reduce((a, b) => a + b, 0);
    $divInfoBlockWrap.append(`<div class="info_title">You have spoken ${intSpokenCount} times in total with ${intSpokenTo} npcs</div>`);
    var $divDesc = $('<div>', { 'class': 'info_desc' }).text(`last ${intDataAvailable} days`);
    if (intDataSkip) {
        $divDesc.append(`<svg data-tippy-content="Showing all available data, extracting data for only last ${intDayCountCharts} days was not possible"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>`);
    }
    $divInfoBlockWrap.append($divDesc)
    $($divInfoBlockWrap).append(`<div class="chart-container">
                            <canvas id="chart_spoken_count"></canvas>
                        </div>
                        `);
    $('#wrapped_charts').append($divInfoBlockWrap);

    var chart = new Chart('chart_spoken_count', {
        data: data,
        type: 'bar',
        options: {
            aspectRatio: arrAspectRatio[0] / (arrAspectRatio[1] - (arrAspectRatio[1] * 0.25)),
            indexAxis: 'y',
            elements: {
                bar: {
                    borderWidth: 2,
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    displayColors: false,

                    callbacks: {

                        label: function (context) {
                            return `Spoken ${context.raw} times`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    });
    allCharts['chartSpokenCount'] = chart;
    /* END: Chart - spoken to count */


    /* Chart - gifts given */

    var objCharacetsGivenGiftCount = {};
    var objCharacetsGivenGiftCleaned = {};
    var objItemsObtainedTableData = {};

    var arrAspectRatio = [14, 6];
    var $divInfoBlockWrap = getBlock(arrAspectRatio[0], arrAspectRatio[1]);

    for (const [i, objGiftsGiven] of Object.entries(objInfoGameStats['gifts_given'])) {
        if (objGiftsGiven['day'] < arrDaysLabels[0] || objGiftsGiven['day'] > arrDaysLabels[intDayCountCharts - 1]) {
            continue;
        }

        var strNPCKey = objGiftsGiven['npc'];

        var strItemKey = objGiftsGiven['gift'];

        if (!(strItemKey in objItemsObtainedTableData)) {
            objItemsObtainedTableData[strItemKey] = 0;
        }
        objItemsObtainedTableData[strItemKey]++;

        if (!(strNPCKey in objCharacetsGivenGiftCount)) {
            objCharacetsGivenGiftCount[strNPCKey] = 0;
            objCharacetsGivenGiftCleaned[strNPCKey] = {
                'loved': 0,
                'loved_buff': 0,
                'liked': 0,
                'liked_buff': 0,
                'neutral': 0,
                'disliked': 0,
                'hated': 0,
            };
        }

        objCharacetsGivenGiftCount[strNPCKey]++;

        if (objGiftsGiven['gift'].includes('&lt;loveable&gt;')) {
            objCharacetsGivenGiftCleaned[strNPCKey]['loved_buff']++;
        } else if (objGiftsGiven['gift'].includes('&lt;likable&gt;')) {
            objCharacetsGivenGiftCleaned[strNPCKey]['liked_buff']++;
        } else {
            objCharacetsGivenGiftCleaned[strNPCKey][objGiftsGiven['desire']]++;
        }
    }

    objCharacetsGivenGiftCount = Object.fromEntries(
        Object.entries(objCharacetsGivenGiftCount).sort(([, a], [, b]) => b - a)
    );

    objCharacetsGivenGiftCleaned = Object.fromEntries(
        Object.entries(objCharacetsGivenGiftCleaned).sort(([, a], [, b]) => Object.values(b).reduce((a1, b1) => a1 + b1, 0) - Object.values(a).reduce((a1, b1) => a1 + b1, 0))
    );


    var arrDatasets = []
    var arrDatasetItems = ['loved', 'loved_buff', 'liked', 'liked_buff', 'neutral', 'disliked', 'hated'];

    arrDatasetItems.forEach((item) => {
        arrDatasets.push({
            label: capitalizeFirstLetter(item).replace('_buff', ' (with buff)'),
            data: Object.values(objCharacetsGivenGiftCleaned).map(a => a[item])
        })
    });

    var data = {
        labels: Object.keys(objCharacetsGivenGiftCount).map((x) => objTabs.gifts.categories[x].info.name),
        datasets: arrDatasets
    };

    var intGiftCount = Object.values(objCharacetsGivenGiftCount).reduce((a, b) => a + b, 0);
    $divInfoBlockWrap.append(`<div class="info_title">You have gifted ${intGiftCount} items for ${Object.keys(objCharacetsGivenGiftCount).length} npcs</div>`);
    $divInfoBlockWrap.append(`<div class="info_desc">last ${intDayCountCharts} days</div>`);
    $($divInfoBlockWrap).append(`<div class="chart-container">
                            <canvas id="chart_gifts_given"></canvas>
                        </div>
                        `);
    $('#wrapped_charts').append($divInfoBlockWrap);

    var chart = new Chart('chart_gifts_given', {
        data: data,
        type: 'bar',
        options: {
            aspectRatio: arrAspectRatio[0] / (arrAspectRatio[1] - (arrAspectRatio[1] * 0.25)),
            indexAxis: 'y',
            elements: {
                bar: {
                    borderWidth: 2,
                }
            },
            interaction: {
                mode: 'index',
            },
            plugins: {
                colorschemes: {
                    scheme: ["#ce5070", "#da778c", "#fcab10", "#ffc857", "#b6b6b6", "#9d0208", "#6a040f"]
                },
                legend: {
                    // display: false,
                    position: "right",
                    align: "middle",
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            if (!context.raw) {
                                return null;
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            },
            ticks: {
                precision: 0
            }
        }
    });
    allCharts['chartGiftsGiven'] = chart;
    /* END: Chart - gifts given */

    /* Table - gifts given */
    generateGenericTableGrid(
        objItemsObtainedTableData,
        'Gifts given',
    );
    /* END: Table - gifts given */


    /* Chart - lost items */
    var arrAspectRatio = [12, 6];
    var $divInfoBlockWrap = getBlock(arrAspectRatio[0], arrAspectRatio[1]);

    const objLost = objInfoGameData['lost_items'];
    var objLostCleaned = {};
    var setLost = new Set();
    const intLost = Object.keys(objLost).length;
    Object.entries(objLost).forEach(([strKeyLocation, arrLostItems]) => {
        strKeyLocation = capitalizeFirstLetter(strKeyLocation.replaceAll('_', ' '));
        objLostCleaned[strKeyLocation] = [];
        arrLostItems.forEach((arrItemCluster) => {
            if (arrItemCluster !== null) {
                if (Array.isArray(arrItemCluster)) {
                    arrItemCluster.forEach((objItemData) => {
                        var arrItems = objItemData['items'].map(a => a.item_id);
                        objLostCleaned[strKeyLocation] = objLostCleaned[strKeyLocation].concat(arrItems)
                    });
                } else {
                    var arrItems = arrItemCluster['items'].map(a => a.item_id);
                    objLostCleaned[strKeyLocation] = objLostCleaned[strKeyLocation].concat(arrItems)
                }
            }
        });
        objLostCleaned[strKeyLocation].forEach(strItemKey => setLost.add(strItemKey))
    });

    Object.keys(objLostCleaned).forEach((k) => !objLostCleaned[k].length && delete objLostCleaned[k]);

    const intLostDistinct = setLost.size;
    const arrLost = Array.from(setLost)
    const objLostPerLocation = [...Array(intLostDistinct).keys()].map(i => ({
        label: arrLost[i],
    }));

    i = 0;
    Object.entries(objLostPerLocation).forEach(([key, value]) => {
        data = [];
        Object.keys(objLostCleaned).forEach(strItemKey => {
            const intCount = countOccurrences(objLostCleaned[strItemKey], value.label);
            data.push(intCount)
        });
        objLostPerLocation[i]['data'] = data;
        i++;
    });

    var data = {
        labels: Object.keys(objLostCleaned),
        datasets: objLostPerLocation
    };
    var intLostCount = Object.values(objLostCleaned).reduce((a, b) => a + b.length, 0);
    $divInfoBlockWrap.append(`<div class="info_title">You have dropped ${intLostCount} items across ${intLost} locations</div>`);
    $divInfoBlockWrap.append(`<div class="info_desc">.. or your animals have!</div>`);

    $($divInfoBlockWrap).append(`<div class="chart-container">
                            <canvas id="chart_lost"></canvas>
                        </div>
                        `);
    $('#wrapped_charts').append($divInfoBlockWrap);

    var chartLost = new Chart('chart_lost', {
        data: data,
        type: 'bar',
        options: {
            aspectRatio: arrAspectRatio[0] / (arrAspectRatio[1] - (arrAspectRatio[1] * 0.25)),
            indexAxis: 'y',
            elements: {
                bar: {
                    borderWidth: 2,
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: false,
                    external: externalTooltipItem
                }
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            },
            ticks: {
                precision: 0
            }
        }
    });
    allCharts['chartLost'] = chartLost;

    /* END: Chart - lost items */



    /* Chart and table - perks */

    var $divInfoBlockWrap = getBlock(12, 6, null, null, true);

    // Chart - perks 
    var arrAspectRatio = [6, 6];
    var $divInfoBlockWrap2 = getBlock(arrAspectRatio[0], arrAspectRatio[1], null, true);
    var $divInfoBlock = $('<div>', { 'class': 'info' });

    const objPerks = objInfoPlayer['stats']['perks_active']
    const objPerksActivated = Object.keys(objPerks).reduce((p, c) => {
        if (objPerks[c]) p[c] = objPerks[c];
        return p;
    }, {});
    const objPerksDisbled = Object.keys(objPerks).reduce((p, c) => {
        if (objPerks[c] == false) p[c] = objPerks[c];
        return p;
    }, {});
    const objPerksUnobtained = Object.keys(objPerks).reduce((p, c) => {
        if (objPerks[c] == null) p[c] = objPerks[c];
        return p;
    }, {});
    var data = {
        labels: [
            'Activated',
            'Disabled',
            'Not obtained'
        ],
        datasets: [{
            data: [Object.keys(objPerksActivated).length, Object.keys(objPerksDisbled).length, Object.keys(objPerksUnobtained).length],
        }]
    };


    $($divInfoBlock).append(`<div class="info_title">Perks</div>`);
    $($divInfoBlock).append(`<div class="chart-container">
                            <canvas id="chart_perks"></canvas>
                        </div>
                        `);
    $($divInfoBlockWrap2).append($divInfoBlock);
    $($divInfoBlockWrap).append($divInfoBlockWrap2);
    $('#wrapped_charts').append($divInfoBlockWrap);

    const chartPerks = new Chart('chart_perks', {
        type: 'doughnut',
        data: data,
        options: {
            aspectRatio: arrAspectRatio[0] / (arrAspectRatio[1] - (arrAspectRatio[1] * 0.25)),
            layout: {
                padding: 10
            },
            plugins: {
                tooltip: {
                    displayColors: false,
                    callbacks: {
                        title: () => null,
                        label: function (context) {
                            return `${context.label}: ${context.raw}`;
                        }
                    }
                },
                legend: {
                    position: "bottom",
                    align: "middle",
                }
            }
        }
    });
    // bar
    // var data = {
    //     labels: [
    //         'Perks'
    //     ],
    //     datasets: [{
    //         label: 'Activated',
    //         data: [Object.keys(objPerksActivated).length],
    //         stack: 'Stack 0',
    //     }, {
    //         label: 'Disabled',
    //         data: [Object.keys(objPerksDisbled).length],
    //         stack: 'Stack 0',
    //     }, {
    //         label: 'Not obtained',
    //         data: [Object.keys(objPerksUnobtained).length],
    //         stack: 'Stack 0',
    //     }]
    // };
    // const chartPerks = new Chart('chart_perks', {
    //     type: 'bar',
    //     data: data,
    //     options: {
    //         aspectRatio: arrAspectRatio[0] / (arrAspectRatio[1] - (arrAspectRatio[1] * 0.25)),
    //         indexAxis: 'y',
    //         layout: {
    //             padding: 10
    //         },
    //         plugins: {
    //             tooltip: {
    //                 displayColors: false,
    //                 callbacks: {
    //                     title: () => null,
    //                 }
    //             },
    //             legend: {
    //                 position: "right",
    //                 align: "middle",
    //             },
    //             scales: {
    //                 x: {
    //                     stacked: true,
    //                 },
    //                 y: {
    //                     stacked: true,
    //                 }
    //             }
    //         },
    //         scales: {
    //             x: {
    //                 min: 0,
    //                 max: Object.keys(objPerksActivated).length + Object.keys(objPerksDisbled).length + Object.keys(objPerksUnobtained).length,
    //             },
    //             y: {
    //                 ticks: {
    //                     display: false
    //                 }
    //             },
    //         }
    //     }
    // });
    allCharts['chartPerks'] = chartPerks;


    // Table - top used perks 
    var $divInfoBlockWrap2 = getBlock(6, 6, null, true);
    var $divInfoBlock = $('<div>', { 'class': 'info' });

    var $divTableWrap = $('<div>', { 'class': 'table_wrap' });
    $divTableWrap.append('<div class="info_title">Top used perks (times used)</div>');

    var $divTableDesc = $('<div>', { 'class': 'info_desc' }).text(`last ${intDataAvailable} days`);
    if (intDataSkip) {
        $divTableDesc.append(`<svg data-tippy-content="Showing all available data, extracting data for only last ${intDayCountCharts} days was not possible"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>`);
    }
    $divTableWrap.append($divTableDesc)
    var strTableSold = '<table class="statistics_table" style="width: calc(100% - 10px);">';

    const objPerksStats = objInfoGameStats['perks'];
    var objPerksSorted = Object.keys(objPerksStats).reduce((p, c) => {
        p[c.replace('_two', '2').replace('_three', '3').replace('_four', '4')] = objPerksStats[c];
        return p;
    }, {});
    objPerksSorted = Object.fromEntries(
        Object.entries(objPerksSorted).sort(([, a], [, b]) => b - a)
    );

    // if peec kaartas ir vienaadas keys (bez cipara)
    // atstāt tikai vienu no keys, ar augstaako numuru
    // ['time_to_eat3', 'time_to_eat', 'time_to_eat2'].sort().reverse()
    var arrCleaned = [];
    Object.entries(objPerksSorted).forEach(([key, value]) => {
        if (arrCleaned.length) {
            if (key.replace(/[0-9]/g, '') == arrCleaned.at(-1).replace(/[0-9]/g, '') && value == objPerksSorted[arrCleaned.at(-1)]) {
                var strKeyToKeep = [key, arrCleaned.at(-1)].sort().reverse()[0];
                if (strKeyToKeep == key) {
                    arrCleaned.pop();
                    arrCleaned.push(key);
                }
            } else {
                arrCleaned.push(key);
            }
        } else {
            arrCleaned.push(key);
        }
    });
    const objTopPerks = arrCleaned.slice(0, 3).reduce((acc, curr) => (acc[curr.replace('2', '_two').replace('3', '_three').replace('4', '_four')] = objPerksSorted[curr], acc), {});

    Object.entries(objTopPerks).forEach(([strPerkKey, intValue]) => {
        strTableSold += `<tr>
                                <td>${capitalizeFirstLetter(strPerkKey.replaceAll('_', ' '))}</td>
                                <td>${intValue}</td>
                            </tr>`;
    });
    strTableSold += '</table>';
    $divTableWrap.append(strTableSold);

    $($divInfoBlock).append($divTableWrap);
    $($divInfoBlockWrap2).append($divInfoBlock);
    $($divInfoBlockWrap).append($divInfoBlockWrap2);

    /* END: Chart and table - perks */


    /* Blocks and table - sold total */

    var objItemsSoldData = objInfoPlayer['items_sold']
    var intSoldCount = Object.values(objItemsSoldData).reduce((a, b) => a + b, 0);
    var objSold = Object.filter(objItemsSoldData, count => count > 0);
    var intSoldDistinct = Object.keys(objSold).length;
    var objSoldSorted = Object.fromEntries(
        Object.entries(objSold).sort(([, a], [, b]) => b - a)
    );
    var objSoldSortedFirst = Object.fromEntries(
        Object.entries(objSoldSorted).slice(0, 3)
    );

    // Sold total
    var $divInfoBlockWrap2 = getBlock(2, 2, true);
    var $divInfoBlock = $('<div>', { 'class': 'info' });
    $divInfoBlock.append(`<div class="info_horizontal">
                            <div class="info_desc calculate_spacing">${getFlexChildren('total')}</div>
                            <div class="info_value calculate_spacing ${intSoldCount > 9999 ? 'big_number' : ''}">${getFlexChildren(intSoldCount)}</div>
                            <div class="info_desc calculate_spacing">${getFlexChildren('items sold')}</div>
                        </div>`);
    $($divInfoBlockWrap2).append($divInfoBlock);
    $($divInfoBlockWrapMiniGrid).append($divInfoBlockWrap2);

    // Sold distinct
    var $divInfoBlockWrap2 = getBlock(2, 2, true);
    var $divInfoBlock = $('<div>', { 'class': 'info' });
    $divInfoBlock.append(`<div class="info_horizontal">
                            <div class="info_desc calculate_spacing">${getFlexChildren('distinct')}</div>
                            <div class="info_value calculate_spacing">${getFlexChildren(intSoldDistinct)}</div>
                            <div class="info_desc calculate_spacing">${getFlexChildren('items sold')}</div>
                        </div>`);
    $($divInfoBlockWrap2).append($divInfoBlock);
    $($divInfoBlockWrapMiniGrid).append($divInfoBlockWrap2);

    // Table - most sold
    var $divInfoBlockWrap = getBlock(8, 6, null, null, true);
    var $divInfoBlockWrap2 = getBlock(4, 6, null, true);
    var $divInfoBlock = $('<div>', { 'class': 'info' });
    var $divTableWrap = $('<div>', { 'class': 'table_wrap' });
    $divTableWrap.append('<div class="info_title">Top sold items</div>');
    $divTableWrap.append('<div class="info_desc">all time</div>');
    var strTableSold = '<table class="statistics_table">';

    Object.entries(objSoldSortedFirst).forEach(([strItemKey, intValue]) => {

        strID = 'most_sold_' + strItemKey;
        var strBuff = false;
        if (strItemKey.includes('&lt;')) {
            [strItemKey, strBuff] = strItemKey.split('&lt;');
            strBuff = strBuff.replace('&gt;', '')
        }
        if (strBuff) {
            strID = strID + '_' + strBuff;
        }

        arrTips.push(strID);
        arrTipsHtml.push(createTip(strID, strItemKey, 'wrapped', objItems));
        if (strItemKey in objItems) {
            strTableSold += `<tr>
                                <td><img id="item_${strID}" src="images/items/${strItemKey}.png"></td>
                                <td>${intValue}</td>
                            </tr>`;
        }
        else {
            strTableSold += `<tr>
                                <td>${strItemKey}</td>
                                <td>${intValue}</td>
                            </tr>`;
        }
    });
    strTableSold += '</table>';
    $divTableWrap.append(strTableSold);
    $($divInfoBlock).append($divTableWrap);
    $($divInfoBlockWrap2).append($divInfoBlock);
    $($divInfoBlockWrap).append($divInfoBlockWrap2);
    $('#wrapped_charts').append($divInfoBlockWrap);



    // Info prep - table and chart (sold last ${intDayCountCharts})
    var objItemsSoldPerDay = objInfoGameStats['items_sold_each_day'];
    var objItemsSold = {};

    var arrSoldCountPerDay = [...Array(intDayCountCharts).keys()].fill(0);

    Object.entries(objItemsSoldPerDay).forEach(([i, value]) => {

        if (intDataSkip && i < intDataSkip) {
            return;
        }

        if (value.length) {

            value.forEach(function (item, index) {
                var strItemKey = item['item'].split('&lt;')[0];
                if (!(strItemKey in objItemsSold)) {
                    objItemsSold[strItemKey] = 0
                }
                objItemsSold[strItemKey] = objItemsSold[strItemKey] + item['count']
                arrSoldCountPerDay[i - intDataSkip] = arrSoldCountPerDay[i - intDataSkip] + item['count']
            });
        }
    });

    var intSoldCount = Object.values(objItemsSold).reduce((a, b) => a + b, 0);
    var intSoldDistinct = Object.keys(objItemsSold).length;
    var objSoldSorted = Object.fromEntries(
        Object.entries(objItemsSold).sort(([, a], [, b]) => b - a)
    );
    var objSoldSortedFirst = Object.fromEntries(
        Object.entries(objSoldSorted).slice(0, 3)
    );

    // Table - most sold last ${intDayCountCharts}
    var $divInfoBlockWrap2 = getBlock(4, 6, null, true);
    var $divInfoBlock = $('<div>', { 'class': 'info' });
    var $divTableWrap = $('<div>', { 'class': 'table_wrap' });
    $divTableWrap.append('<div class="info_title">Top sold items</div>');
    $divTableWrap.append(`<div class="info_desc">last ${intDayCountCharts} days</div>`);
    var strTableSold = '<table class="statistics_table wrap">';

    Object.entries(objSoldSortedFirst).forEach(([strItemKey, intValue]) => {

        strID = 'most_sold_last_' + strItemKey;
        var strBuff = false;
        if (strItemKey.includes('&lt;')) {
            [strItemKey, strBuff] = strItemKey.split('&lt;');
            strBuff = strBuff.replace('&gt;', '')
        }
        if (strBuff) {
            strID = strID + '_' + strBuff;
        }

        arrTips.push(strID);

        arrTipsHtml.push(createTip(strID, strItemKey, 'wrapped', objItems));

        if (strItemKey in objItems) {
            strTableSold += `<tr>
                                <td><img id="item_${strID}" src="images/items/${strItemKey}.png"></td>
                                <td>${intValue}</td>
                            </tr>`;
        }
        else {
            strTableSold += `<tr>
                                <td>${strItemKey}</td>
                                <td>${intValue}</td>
                            </tr>`;
        }
    });
    strTableSold += '</table>';
    $divTableWrap.append(strTableSold);
    $($divInfoBlock).append($divTableWrap);
    $($divInfoBlockWrap2).append($divInfoBlock);
    $($divInfoBlockWrap).append($divInfoBlockWrap2);

    // Chart - sold last ${intDayCountCharts}
    var arrAspectRatio = [12, 6];
    var $divInfoBlockWrap = getBlock(arrAspectRatio[0], arrAspectRatio[1]);

    var datasets = [{
        data: arrSoldCountPerDay,
    }];
    $divInfoBlockWrap.append(`<div class="info_title">Sold items</div>`);
    $divInfoBlockWrap.append(`<div class="info_desc">You have sold ${intSoldCount} items, from which ${intSoldDistinct} are distinct (last ${intDayCountCharts} days)</div>`);

    $($divInfoBlockWrap).append(`<div class="chart-container">
                            <canvas id="chart_sold"></canvas>
                        </div>
                        `);
    $('#wrapped_charts').append($divInfoBlockWrap);
    var data = {
        labels: arrDaysLabels,
        datasets: datasets
    };
    const chartSold = new Chart('chart_sold', {
        type: 'line',
        options: {
            clip: false,
            tension: 0.05,
            aspectRatio: arrAspectRatio[0] / (arrAspectRatio[1] - (arrAspectRatio[1] * 0.25)),
            interaction: {
                mode: 'index',
                intersect: false,
            },
            elements: {
                point: {
                    radius: 0
                }
            },
            layout: {
                padding: {
                    bottom: 15
                }
            },
            stacked: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    displayColors: false,
                    callbacks: {
                        title: ctx => {
                            return `Day ${ctx[0].label}`;

                        },
                        label: ctx => {
                            return `Sold items: ${ctx.raw}`;
                        },
                    },
                }
            },

            scales: {
                x: {
                    ticks: {
                        display: false
                    }
                },
            },
            ticks: {
                precision: 0
            }

        },
        data: data
    });
    allCharts['chartSold'] = chartSold;
    /* END: Blocks and table - sold total */



    /* Chart - location visits */

    var $divInfoBlockWrap = getBlock(14, 8);

    var datasets = generateMapChartData();

    const image = new window.Image();
    image.src = 'images/V0.13_map_unlocked.png';
    const plugin = {
        id: 'customCanvasBackgroundImage',
        beforeDraw: (chart) => {
            if (image.complete) {
                var ctx = chart.ctx;
                ctx.save();
                if (objMistriaData.options.has('mode_dark')) {
                    ctx.globalAlpha = 0.5;
                } else {
                    ctx.globalAlpha = 0.8;
                }

                ctx.drawImage(image, chart.chartArea.left, chart.chartArea.top, chart.chartArea.width, chart.chartArea.height);
                ctx.globalAlpha = 1;
                ctx.restore();
            } else {
                image.onload = () => chart.draw();
            }
        }
    };



    $divInfoBlockWrap.append('<div class="info_title">Location visits</div>');
    var $divDesc = $('<div>', { 'class': 'info_desc' }).text(`last ${intDataAvailable} days`);
    if (intDataSkip) {
        $divDesc.append(`<svg data-tippy-content="Showing all available data, extracting data for only last ${intDayCountCharts} days was not possible"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>`);
    }
    $divInfoBlockWrap.append($divDesc)
    $($divInfoBlockWrap).append(`<div class="chart-container">
                            <canvas id="chart_map"></canvas>
                        </div>
                        `);

    $('#wrapped_charts').append($divInfoBlockWrap);
    var data = {
        datasets: datasets
    };
    const chartMap = new Chart('chart_map', {
        type: 'bubble',
        options: {
            layout: {
                autoPadding: false,
                padding: {
                    left: -10,
                    bottom: 15
                }
            },

            aspectRatio: 5426 / 2866,
            clip: false,

            gridLines: {
                display: false
            },

            plugins: {
                tooltip: {
                    displayColors: false,
                    callbacks: {
                        title: function (ctx) {
                            var strLocationKey = ctx[0].dataset.label;
                            return capitalizeFirstLetter(strLocationKey.replaceAll('_', ' '));
                        },
                        label: function (ctx) {
                            var strLocationKey = ctx.dataset.label;
                            return `Visited ${objInfoGameStats['location_visits'][strLocationKey]} times`;
                        }
                    }
                },
                legend: { display: false },
                title: { display: false }
            },
            scales: {
                x: {
                    min: 0,
                    max: 136,
                    grid: {
                        display: false
                    },
                    ticks: {
                        display: false,
                    }
                },
                y: {
                    min: 0,
                    max: 72,
                    grid: {
                        display: false
                    },
                    ticks: {
                        display: false
                    }
                }
            },
        },

        plugins: [plugin],
        data: data
    });
    allCharts['chartMap'] = chartMap;

    /* END: Chart - location visits */



    /* Chart - animal EOD */
    var arrAspectRatio = [12, 6];
    var $divInfoBlockWrap = getBlock(arrAspectRatio[0], arrAspectRatio[1]);


    var arrAnimalCount = [];
    var arrPet = [];
    var arrFed = [];
    var arrInside = [];

    for (const [i, objAnimalData] of Object.entries(objInfoGameStats['animal_eod_statuses'])) {
        if (objAnimalData['day'] < arrDaysLabels[0] || objAnimalData['day'] > arrDaysLabels[intDayCountCharts - 1]) {
            continue;
        }
        arrAnimalCount.push(objAnimalData['fed'] + objAnimalData['not_fed'])
        arrPet.push(objAnimalData['pet'])
        arrFed.push(objAnimalData['fed'])
        arrInside.push(objAnimalData['inside'])
    }

    var datasets = [
        {
            type: 'line',
            label: "Fed",
            data: arrPet,
            yAxisID: 'y',
        },
        {
            type: 'line',
            label: "Pet",
            data: arrPet,
            yAxisID: 'y',
        },
        {
            type: 'line',
            label: "Slept inside",
            data: arrInside,
            yAxisID: 'y',
        },
        {
            type: 'bar',
            label: "Animal count",
            data: arrAnimalCount,
            yAxisID: 'y',
        }
    ];

    $divInfoBlockWrap.append(`<div class="info_title">Animal EOD statuses</div>`);
    $divInfoBlockWrap.append(`<div class="info_desc">last ${intDayCountCharts} days</div>`);
    $($divInfoBlockWrap).append(`<div class="chart-container">
                            <canvas id="chart_animalEOD"></canvas>
                        </div>
                        `);
    $('#wrapped_charts').append($divInfoBlockWrap);
    var data = {
        labels: arrDaysLabels,
        datasets: datasets
    };
    const chartAnimalEOD = new Chart('chart_animalEOD', {
        type: 'line',
        options: {
            clip: false,
            tension: 0.05,
            aspectRatio: arrAspectRatio[0] / (arrAspectRatio[1] - (arrAspectRatio[1] * 0.25)),
            interaction: {
                mode: 'index',
                intersect: false,
            },
            elements: {
                point: {
                    radius: 0
                }
            },
            layout: {
                padding: {
                    bottom: 15
                }
            },
            stacked: false,
            plugins: {
                legend: {
                    position: "bottom",
                    align: "middle",
                },
                colorschemes: {
                    scheme: [arrPalette[0], arrPalette[1], arrPalette[2], "#b6b6b607"]
                },
                tooltip: {
                    callbacks: {
                        title: ctx => {
                            return `Day ${ctx[0].label}`;
                        },
                        label: ctx => {
                            return `${ctx.dataset.label}: ${ctx.raw}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        display: false
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    min: 0,
                },
            },
            ticks: {
                precision: 0
            }
        },
        data: data
    });
    allCharts['chartAnimalEOD'] = chartAnimalEOD;

    /* END: Chart - animal EOD */


    /* Chart - fish */
    generateGenericGameStatsChart(
        objInfoGameStats['fish_caught'],
        'fish',
        'chart_fish',
        arrDaysLabels,
        'Fish caught',
        `You have caught {intItemsObtainedCount} fish, from which {intItemsObtainedDistinct} are distinct (last ${intDayCountCharts} days)`,
        null,
        null,
        null,
        null,
        false,
        true
    );

    /* Chart - dives */
    generateGenericGameStatsChart(
        objInfoGameStats['dives'],
        'item',
        'chart_dives',
        arrDaysLabels,
        'Dives',
        `You have dived {intItemsObtainedCount}  times, and you have gotten {intItemsObtainedDistinct} distinct items (last ${intDayCountCharts} days)`,

    );

    /* Chart - bugs */
    generateGenericGameStatsChart(
        objInfoGameStats['bugs_caught'],
        'bug',
        'chart_bugs',
        arrDaysLabels,
        'Bugs caught',
        `You have caught {intItemsObtainedCount} bugs, from which {intItemsObtainedDistinct} are distinct (last ${intDayCountCharts} days)`,
        null,
        null,
        null,
        null,
        false,
        true
    );


    /*  Mini blocks - fish and bugs missed */

    var intBugsMissed = objInfoGameStats['bugs_missed'];
    var intFishMissed = objInfoGameStats['fish_missed'];
    if (intBugsMissed && intFishMissed) {
        var $divInfoBlockWrap = getBlock(2, 4, true, null, true);
    }
    else {
        var $divInfoBlockWrap = getBlock(2, 2, true, null, true);
    }

    // bugs missed
    if (intBugsMissed) {
        $($divInfoBlockWrap).append(getMiniBlock(intBugsMissed, 'bugs missed'))
    }

    // fish missed
    if (intFishMissed) {
        $($divInfoBlockWrap).append(getMiniBlock(intFishMissed, 'fish missed'))
    }

    if (intBugsMissed || intFishMissed) {
        $('#wrapped_charts').append($divInfoBlockWrap);
    }


    /* END: Mini blocks - fish and bugs missed */


    /* Chart - Chicken statue */
    generateGenericGameStatsChart(
        objInfoGameStats['chicken_statue_uses'],
        'prize',
        'chart_chicken_statue',
        arrDaysLabels,
        'Chicken statue uses',
        `You have gotten {intItemsObtainedCount} items, from which {intItemsObtainedDistinct} are distinct (last ${intDayCountCharts} days)`,
        'currency',
        'animal beads',
        'Chicken statue',
        `currency used (last ${intDayCountCharts} days)`,
    );

    /* Chart - Wishing well */
    generateGenericGameStatsChart(
        objInfoGameStats['wishing_well_uses'],
        'prize',
        'chart_wishing_well',
        arrDaysLabels,
        'Wishing well uses',
        `You have gotten {intItemsObtainedCount} items, from which {intItemsObtainedDistinct} are distinct (last ${intDayCountCharts} days)`,
        'cost',
        'tesserae',
        'Wishing well',
        `currency used (last ${intDayCountCharts} days)`,
    );

    /* Chart - forageable harvests */
    generateGenericGameStatsChart(
        objInfoGameStats['forageable_harvests'],
        'forageable',
        'chart_forageable',
        arrDaysLabels,
        'Forageable harvests',
        `You have harvested {intItemsObtainedCount} forageables, from which {intItemsObtainedDistinct} are distinct (last ${intDayCountCharts} days)`,
        null,
        null,
        null,
        null,
        false,
        true
    );

    /* Chart - tree harvests */
    generateGenericGameStatsChart(
        objInfoGameStats['tree_harvests'],
        'item',
        'chart_trees',
        arrDaysLabels,
        'Tree harvests',
        `You have harvested {intItemsObtainedCount} trees, and gotten distinct {intItemsObtainedDistinct} items (last ${intDayCountCharts} days)`
    );

    /* Chart - items eaten */
    generateGenericGameStatsChart(
        objInfoGameStats['items_eaten'],
        'item',
        'chart_eaten',
        arrDaysLabels,
        'Items eaten',
        `You have eaten {intItemsObtainedCount} items, from which {intItemsObtainedDistinct} are distinct (last ${intDayCountCharts} days)`,
        'hour',
        'hour',
        'Eating habits',
        `times eaten per hour (last ${intDayCountCharts} days)`,
        true
    );

    /* Mini blocks and table - furniture placed */
    generateGenericTableGrid(
        objInfoGameStats['furniture_placed'],
        'Furniture placed',
        true
    );


    /* Chart - purchases */
    generateGenericGameStatsChart(
        objInfoGameStats['purchases'],
        'item',
        'chart_purchases',
        arrDaysLabels,
        'Purchases',
        `You have bought {intItemsObtainedCount} items, from which {intItemsObtainedDistinct} are distinct (last ${intDayCountCharts} days)`
    );


    /* Chart - renown level up */
    var arrAspectRatio = [12, 6];
    var $divInfoBlockWrap = getBlock(arrAspectRatio[0], arrAspectRatio[1]);
    $divInfoBlockWrap.css('display', 'none');

    var arrRenownLevel = [...Array(intDayCountCharts).keys()].fill(0);

    for (const [i, objRenownLevel] of Object.entries(objInfoGameStats['renown_level_ups'])) {
        if (objRenownLevel['day'] < arrDaysLabels[0] || objRenownLevel['day'] > arrDaysLabels[intDayCountCharts - 1]) {
            continue;
        }
        arrRenownLevel[arrDaysLabels.indexOf(objRenownLevel['day'])] = objRenownLevel['level']
    }
    var lastValue = arrRenownLevel.find(v => v) - 1;
    arrRenownLevel = arrRenownLevel.map(v => { if (v) { lastValue = v; return v } return lastValue })

    if (!isNaN(lastValue)) {
        var datasets = [
            {
                type: 'line',
                label: "level",
                data: arrRenownLevel,
                yAxisID: 'y',
            }
        ];

        $divInfoBlockWrap.append(`<div class="info_title">Renown level</div>`);
        $divInfoBlockWrap.append(`<div class="info_desc">last ${intDayCountCharts} days</div>`);
        $($divInfoBlockWrap).append(`<div class="chart-container">
                            <canvas id="chart_level"></canvas>
                        </div>
                        `);
        $('#wrapped_charts').append($divInfoBlockWrap);
        var data = {
            labels: arrDaysLabels,
            datasets: datasets
        };
        const chartLevel = new Chart('chart_level', {
            type: 'line',
            options: {
                clip: false,
                tension: 0.05,
                aspectRatio: arrAspectRatio[0] / (arrAspectRatio[1] - (arrAspectRatio[1] * 0.25)),
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                layout: {
                    padding: {
                        bottom: 15
                    }
                },
                stacked: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    colorschemes: {
                        scheme: [arrPalette[0], arrPalette[1], arrPalette[2], "#b6b6b607"]
                    },
                    tooltip: {
                        displayColors: false,
                        callbacks: {
                            title: ctx => {
                                return `Day ${ctx[0].label}`;
                            },
                            label: ctx => {
                                return `${ctx.dataset.label}: ${ctx.raw}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            display: false
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        min: 0,
                    },
                },
                ticks: {
                    precision: 0
                }
            },
            data: data
        });
        allCharts['chartLevel'] = chartLevel;
    }
    /* END: Chart - renown level up */


    /* Chart - perks obtained */
    generateGenericGameStatsChart(
        objInfoGameStats['perk_acquirements'],
        'perk',
        'chart_perks_obtained',
        arrDaysLabels,
        'Obtained perks',
        `You have obtained {intItemsObtainedCount} perks (last ${intDayCountCharts} days)`
    );



    /* Chart - sets completed */
    var intSetsCompletedCount = 0;
    var objSetsCompletedCleaned = {};
    var arrSetsCompletedColorScheme = [];
    var arrDatasets = [];
    arrDaysLabels.forEach((intDay) => {
        objSetsCompletedCleaned[intDay] = []
    });

    var arrAspectRatio = [12, 6];
    var $divInfoBlockWrap = getBlock(arrAspectRatio[0], arrAspectRatio[1]);
    $divInfoBlockWrap.css('display', 'none');

    for (const [i, objSetCompletion] of Object.entries(objInfoGameStats['set_completions'])) {
        if (objSetCompletion['day'] < arrDaysLabels[0] || objSetCompletion['day'] > arrDaysLabels[intDayCountCharts - 1]) {
            continue;
        }

        strDay = objSetCompletion['day'];

        var strWingKey = objSetCompletion['wing'];
        var strSetKey = objSetCompletion['set'];
        var strColorCode = objSetsColorCodes[strWingKey];

        var intDayIndex = arrDaysLabels.indexOf(strDay);
        var arrSetsPerDay = [...Array(intDayCountCharts).keys()].fill(0);
        arrSetsPerDay[intDayIndex] = 1;

        arrDatasets.push({
            label: strSetKey,
            data: arrSetsPerDay
        })

        arrSetsCompletedColorScheme.push(strColorCode);
        intSetsCompletedCount++;
    }


    if (intSetsCompletedCount) {
        var data = {
            labels: arrDaysLabels,
            datasets: arrDatasets
        };

        $divInfoBlockWrap.append(`<div class="info_title">You have completed ${intSetsCompletedCount} sets</div>`);
        $divInfoBlockWrap.append(`<div class="info_desc">last ${intDayCountCharts} days</div>`);
        $($divInfoBlockWrap).append(`<div class="chart-container">
                            <canvas id="chart_sets_completed"></canvas>
                        </div>
                        `);

        $('#wrapped_charts').append($divInfoBlockWrap);
        $('#chart_sets_completed').after(`<div id="chart_sets_completed_legend_container" class="chart-legend-container"></div>`);

        var chart = new Chart('chart_sets_completed', {
            data: data,
            type: 'bar',
            plugins: [htmlLegendPlugin],
            options: {
                aspectRatio: arrAspectRatio[0] / (arrAspectRatio[1] - (arrAspectRatio[1] * 0.25)),
                elements: {
                    bar: {
                        borderWidth: 2,
                    }
                },
                interaction: {
                    mode: 'index',
                },
                layout: {
                    padding: {
                        right: 110,
                        bottom: 15
                    }
                },
                plugins: {
                    colorschemes: {
                        scheme: arrSetsCompletedColorScheme
                    },

                    htmlLegend: {
                        containerID: 'chart_sets_completed_legend_container',
                    },
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            title: ctx => {
                                return `Day ${ctx[0].label}`;
                            },
                            label: function (context) {
                                let label = capitalizeFirstLetter(context.dataset.label.replaceAll('_', ' '));
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        display: false
                    },
                    y: {
                        stacked: true
                    }
                },
                ticks: {
                    precision: 0
                }
            }
        });
        allCharts['chartSetsCompleted'] = chart;
    }

    /* END: Chart - sets completed */


    /* Chart - Menu opens */
    var arrAspectRatio = [12, 6];
    var $divInfoBlockWrap = getBlock(arrAspectRatio[0], arrAspectRatio[1]);
    $divInfoBlockWrap.css('display', 'none');

    var objMenuOpenCount = objInfoGameStats['menu_opens'];
    delete objMenuOpenCount['popup'];
    objMenuOpenCount = Object.fromEntries(
        Object.entries(objMenuOpenCount).sort(([, a], [, b]) => b - a)
    );

    var intDistinctMenu = Object.keys(objMenuOpenCount).filter(el => objMenuOpenCount[el] > 0).length;
    var data = {
        labels: Object.keys(objMenuOpenCount).map((x) => capitalizeFirstLetter(x.replaceAll('_', ' '))),
        datasets: [{
            data: Object.values(objMenuOpenCount),
        }]
    };
    var intMenuOpenCount = Object.values(objMenuOpenCount).reduce((a, b) => a + b, 0);
    $divInfoBlockWrap.append(`<div class="info_title">You have opened ${intDistinctMenu} different menus ${intMenuOpenCount} times</div>`);
    var $divDesc = $('<div>', { 'class': 'info_desc' }).text(`last ${intDataAvailable} days`);
    if (intDataSkip) {
        $divDesc.append(`<svg data-tippy-content="Showing all available data, extracting data for only last ${intDayCountCharts} days was not possible"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>`);
    }
    $divInfoBlockWrap.append($divDesc)
    $($divInfoBlockWrap).append(`<div class="chart-container">
                            <canvas id="chart_menu_opens"></canvas>
                        </div>
                        `);
    $('#wrapped_charts').append($divInfoBlockWrap);

    var chart = new Chart('chart_menu_opens', {
        data: data,
        type: 'bar',
        options: {
            aspectRatio: arrAspectRatio[0] / (arrAspectRatio[1] - (arrAspectRatio[1] * 0.25)),
            indexAxis: 'y',
            elements: {
                bar: {
                    borderWidth: 2,
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    displayColors: false,

                    callbacks: {

                        label: function (context) {
                            return `Opened ${context.raw} times`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    });
    allCharts['chartMenuOpens'] = chart;
    /* END: Chart - Menu opens */



    /*  Mini block - cutscenes skipped */
    var intValue = objInfoGameStats['cutscenes_skipped'];
    if (intValue) {
        $('#wrapped_charts').append(getMiniBlock(intValue, 'cutscenes skipped', true))
    }

    /*  Mini block - manual saves */
    var intValue = objInfoGameStats['manual_saves'];
    if (intValue) {
        $('#wrapped_charts').append(getMiniBlock(intValue, 'manual saves', true, 3))
    }

    /*  Mini block - enemies killed */
    var intValue = objInfoGameStats['enemies_killed'];
    if (intValue) {
        $('#wrapped_charts').append(getMiniBlock(intValue, 'enemies killed', true))
    }

    /*  Mini block - faints */
    var intValue = objInfoGameStats['faints'];
    if (intValue) {
        $('#wrapped_charts').append(getMiniBlock(intValue, 'faints'))
    }

    /*  Mini block - deaths */
    var intValue = objInfoGameStats['deaths'];
    if (intValue) {
        $('#wrapped_charts').append(getMiniBlock(intValue, 'deaths'))
    }



    var $divMoreButtonWrap = $('<div>', { 'class': 'more_charts' });
    var $divMoreButton = $('<div>', { 'class': 'button_item more_charts_button accent' });
    $divMoreButton.append(` <div class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-square">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="12" y1="8" x2="12" y2="16"></line>
                                    <line x1="8" y1="12" x2="16" y2="12"></line>
                                </svg>
                            </div>`);
    $divMoreButton.append(`<div class="text">Generate more charts</div>`);
    $divMoreButton.click(function () {
        (this).remove()
        $('#wrapped_charts .block').css('display', '');

        setTimeout(() => {
            for (const [key, chart] of Object.entries(allCharts)) {
                chart.resize();
            }
        }, 50);
    });
    $divMoreButtonWrap.append($divMoreButton);
    $('#wrapped_charts').append($divMoreButtonWrap);



    arrTipsHtml.forEach((strTipHtml) => {
        $('#wrapped_charts').append(strTipHtml);
    });

    arrTips.forEach((strID) => {
        const template = $(`#tip_${strID}`)[0];
        template.style.display = 'block';

        tippy(`#item_${strID}`, {
            content: template,
            interactive: true,
            maxWidth: 370
        });
    });
    tippy('[data-tippy-content]');

    setTimeout(() => {
        getCellWidth();
        recalculateWidths();
    }, 150);
}

function base64ToArrayBuffer(base64) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

function getMiniBlock(intValue, strTitle, bolSmaller = false, intSize = 2, bolAllData = false) {
    var $divInfoBlockWrap2 = getBlock(intSize, intSize, true);
    var $divInfoBlock = $('<div>', { 'class': 'info' });
    $divInfoBlock.append(`<div class="info_horizontal">
                            <div class="info_value calculate_spacing">${getFlexChildren(intValue)}</div>
                            <div class="info_desc ${bolSmaller ? 'smaller' : ''} calculate_spacing">${getFlexChildren(strTitle)}</div>
                        </div>`);

    if (bolAllData && intDataSkip) {
        var $divDataInfo = $('<div>', { 'class': 'info_desc' }).text(`last ${intDataAvailable} days`);

        $divDataInfo.append(`<svg data-tippy-content="Showing all available data, extracting data for only last ${intDayCountCharts} days was not possible"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>`);

    } else {
        var $divDataInfo = $('<div>', { 'class': 'info_desc' }).text(`last ${intDayCountCharts} days`);
    }

    $($divInfoBlock).prepend($divDataInfo);
    $($divInfoBlockWrap2).append($divInfoBlock);
    return $divInfoBlockWrap2;

}
function generateGenericTableGrid(objData, strTitle, bolAllData = false) {
    var arrItemsObtained = Object.values(objData);
    const setItemsObtained = new Set(arrItemsObtained);
    arrItemsObtained = arrItemsObtained.sort((a, b) => b - a);

    var $divInfoBlockWrap = getBlock(5, 4, null, null, true, true);

    if (setItemsObtained.size > 3) {
        var $divInfoBlockWrap2 = getBlock(3, 4, null, true);
        var $divInfoBlock = $('<div>', { 'class': 'info' });

        const intThirdLargest = [...setItemsObtained].sort((a, b) => b - a)[2]; // the third largest value

        var $divTableWrap = $('<div>', { 'class': 'table_wrap' });
        $divTableWrap.append(`<div class="info_title">${strTitle}</div>`);

        if (bolAllData && intDataSkip) {
            var $divDataInfo = $('<div>', { 'class': 'info_desc' }).text(`last ${intDataAvailable} days`);

            $divDataInfo.append(`<svg data-tippy-content="Showing all available data, extracting data for only last ${intDayCountCharts} days was not possible"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>`);

        } else {
            var $divDataInfo = $('<div>', { 'class': 'info_desc' }).text(`last ${intDayCountCharts} days`);
        }


        $($divTableWrap).append($divDataInfo);

        var strTable = '<table class="statistics_table">';

        objData = Object.fromEntries(
            Object.entries(objData).sort(([, a], [, b]) => b - a)
        );
        var i = 1;
        var prevValue = 0;
        Object.entries(objData).forEach(([strItemKey, intValue]) => {
            if (intValue < intThirdLargest) {
                return;
            }
            if (i > 3 && prevValue !== intValue) {
                return;
            }

            var strBuff = false;
            if (strItemKey.includes('&lt;')) {
                [strItemKey, strBuff] = strItemKey.split('&lt;');
                strBuff = strBuff.replace('&gt;', '')
            }
            var strID = strTitle.replaceAll(' ', '') + strItemKey;
            if (strBuff) {
                strID = strID + '_' + strBuff;
            }

            arrTips.push(strID);

            arrTipsHtml.push(createTip(strID, strItemKey, 'wrapped', objItems, strBuff));


            prevValue = intValue;
            i++;
            strTable += `<tr>
                                <td><img id="item_${strID}"  src="images/items/${strItemKey}.png"></td>
                                <td>${intValue}</td>
                            </tr>`;
        });
        strTable += '</table>';
        $divTableWrap.append(strTable);

        $($divInfoBlock).append($divTableWrap);
        $($divInfoBlockWrap2).append($divInfoBlock);
        $($divInfoBlockWrap).append($divInfoBlockWrap2);
        $('#wrapped_charts').append($divInfoBlockWrap);


        var intItemsObtained = arrItemsObtained.reduce((acc, x) => acc + x, 0,);
        var intItemsObtainedDistinct = Object.keys(objData).length;

        $($divInfoBlockWrap).append(getMiniBlock(intItemsObtained, 'total items', false, 2, bolAllData))
        $($divInfoBlockWrap).append(getMiniBlock(intItemsObtainedDistinct, 'distinct items', false, 2, bolAllData))

    }
}
function generateGenericGameStatsChart(objData, strItemKey, strChartID, arrDaysLabels, strTitle, strSubtitle, strAdditionalKey = false, strAdditionalLabel, strTitleMini, strSubTitleMini, bolLineChart = false, bolTableGrid = false) {
    var objItemsObtainedCleaned = {};

    arrDaysLabels.forEach((intDay) => {
        objItemsObtainedCleaned[intDay] = []
    });

    var objItemsObtainedTableData = {};
    var setItemsObtained = new Set();
    if (strAdditionalKey) {
        var objItemsObtainedAdditional = {};
    }

    for (const [i, objItemsObtained] of Object.entries(objData)) {
        if (objItemsObtained['day'] < arrDaysLabels[0] || objItemsObtained['day'] > arrDaysLabels[intDayCountCharts - 1]) {
            continue;
        }

        strDay = objItemsObtained['day'];

        // if (!(strDay in objItemsObtainedCleaned)) {
        //     objItemsObtainedCleaned[strDay] = [];
        // }

        if (strAdditionalKey) {
            intAdditional = objItemsObtained[strAdditionalKey];
            if (!(intAdditional in objItemsObtainedAdditional)) {
                objItemsObtainedAdditional[intAdditional] = 0;
            }
            objItemsObtainedAdditional[intAdditional]++;
        }

        if (strItemKey in objItemsObtained) {
            setItemsObtained.add(objItemsObtained[strItemKey])
            objItemsObtainedCleaned[strDay].push(objItemsObtained[strItemKey])
            if (!(objItemsObtained[strItemKey] in objItemsObtainedTableData)) {
                objItemsObtainedTableData[objItemsObtained[strItemKey]] = 0;
            }
            objItemsObtainedTableData[objItemsObtained[strItemKey]]++;
        } else if ('animal_kind' in objItemsObtained) {
            setItemsObtained.add(objItemsObtained['animal_kind'])
            objItemsObtainedCleaned[strDay].push(objItemsObtained['animal_kind'])
            if (!(objItemsObtained['animal_kind'] in objItemsObtainedTableData)) {
                objItemsObtainedTableData[objItemsObtained['animal_kind']] = 0;
            }
            objItemsObtainedTableData[objItemsObtained['animal_kind']]++;
        }
    }

    const intItemsObtainedDistinct = setItemsObtained.size;
    const arrItemsObtained = Array.from(setItemsObtained)
    const objItemsObtainedPerDay = [...Array(intItemsObtainedDistinct).keys()].map(i => ({
        label: arrItemsObtained[i],
    }));

    i = 0;
    Object.entries(objItemsObtainedPerDay).forEach(([key, value]) => {
        data = [];
        Object.keys(objItemsObtainedCleaned).forEach(strItemKey => {
            const intCount = countOccurrences(objItemsObtainedCleaned[strItemKey], value.label);
            data.push(intCount)
        });
        objItemsObtainedPerDay[i]['data'] = data;
        i++;
    });

    var data = {
        labels: Object.keys(objItemsObtainedCleaned),
        datasets: objItemsObtainedPerDay
    };
    var intItemsObtainedCount = Object.values(objItemsObtainedCleaned).reduce((a, b) => a + b.length, 0);

    if (intItemsObtainedCount) {
        var arrAspectRatio = [12, 6];
        var intReduceWidthBy = 0;

        if (strAdditionalKey && !bolLineChart) {
            intReduceWidthBy = 3;
        }

        var $divInfoBlockWrap = getBlock(arrAspectRatio[0], arrAspectRatio[1], true, null, true);
        var $divInfoBlockWrap2 = getBlock(arrAspectRatio[0] - intReduceWidthBy, arrAspectRatio[1]);

        // chart - main data
        strSubtitle = strSubtitle.replace('{intItemsObtainedCount}', intItemsObtainedCount).replace('{intItemsObtainedDistinct}', intItemsObtainedDistinct)
        $divInfoBlockWrap2.append(`<div class="info_title">${strTitle}</div>`);
        $divInfoBlockWrap2.append(`<div class="info_desc">${strSubtitle}</div>`);

        $($divInfoBlockWrap2).append(`<div class="chart-container">
                            <canvas id="${strChartID}"></canvas>
                        </div>
                        `);

        if (strAdditionalKey && !bolLineChart) {
            $($divInfoBlockWrap).append($divInfoBlockWrap2);
            $('#wrapped_charts').append($divInfoBlockWrap);
        }
        else {
            $('#wrapped_charts').append($divInfoBlockWrap2);
            $divInfoBlockWrap2.css('display', 'none');
        }

        var chart = new Chart(strChartID, {
            data: data,
            type: 'bar',
            options: {
                aspectRatio: (arrAspectRatio[0] - intReduceWidthBy) / (arrAspectRatio[1] - (arrAspectRatio[1] * 0.25)),
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                layout: {
                    padding: {
                        bottom: 15
                    }
                },
                elements: {
                    bar: {
                        borderWidth: 2,
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: false,
                        external: externalTooltipItem
                    }
                },
                scales: {
                    x: {
                        display: false,
                        stacked: true,
                    },
                    y: {
                        stacked: true
                    }
                },
                ticks: {
                    precision: 0
                }
            }
        });
        allCharts[strChartID] = chart;

        if (strAdditionalKey && !bolLineChart) {
            // chart - additional
            var $divInfoBlockWrap2 = getBlock(intReduceWidthBy, arrAspectRatio[1]);
            $divInfoBlockWrap2.append(`<div class="info_title">${strTitleMini}</div>`);
            $divInfoBlockWrap2.append(`<div class="info_desc">${strSubTitleMini}</div>`);

            $($divInfoBlockWrap2).append(`<div class="chart-container">
                            <canvas id="${strChartID}_additional"></canvas>
                        </div>
                        `);

            $($divInfoBlockWrap).append($divInfoBlockWrap2);
            $('#wrapped_charts').append($divInfoBlockWrap);

            var objItemsObtainedAdditionalDataset = [];

            for (const [additional, times] of Object.entries(objItemsObtainedAdditional)) {
                var data =
                    objItemsObtainedAdditionalDataset.push({
                        label: additional,
                        data: [times]
                    });
            }

            var data = {
                labels: 'a',
                datasets: objItemsObtainedAdditionalDataset
            };
            var chart = new Chart(`${strChartID}_additional`, {
                data: data,
                type: 'bar',
                options: {
                    aspectRatio: (3) / (arrAspectRatio[1] - (arrAspectRatio[1] * 0.25)),
                    layout: {
                        padding: {
                            bottom: 15
                        }
                    },
                    elements: {

                        bar: {
                            borderWidth: 2,
                        }
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            displayColors: false,
                            callbacks: {
                                title: (context) => `${context[0].dataset.label} ${strAdditionalLabel}`,
                                label: function (context) {
                                    let label = `paid ${context.raw} times`;
                                    return label;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            stacked: true,
                            ticks: {
                                display: false
                            }
                        },
                        y: {
                            max: intItemsObtainedCount,
                            stacked: true
                        }
                    },
                    ticks: {
                        precision: 0
                    }
                }
            });
            allCharts[`${strChartID}_additional`] = chart;
        }

        if (strAdditionalKey && bolLineChart) {
            // chart - additional
            var arrAspectRatio = [12, 6];
            var $divInfoBlockWrap2 = getBlock(arrAspectRatio[0], arrAspectRatio[1]);
            $divInfoBlockWrap2.append(`<div class="info_title">${strTitleMini}</div>`);
            $divInfoBlockWrap2.append(`<div class="info_desc">${strSubTitleMini}</div>`);

            $($divInfoBlockWrap2).append(`<div class="chart-container">
                            <canvas id="${strChartID}_additional"></canvas>
                        </div>
                        `);


            $('#wrapped_charts').append($divInfoBlockWrap2);

            var arrItemsObtainedAdditionalPerDay = ['06:00 am', '07:00 am', '08:00 am', '09:00 am', '10:00 am', '11:00 am', '12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm', '06:00 pm', '07:00 pm', '08:00 pm', '09:00 pm', '10:00 pm', '11:00 pm', '12:00 am', '01:00 am', '02:00 am', '03:00 am', '04:00 am', '05:00 am'];
            var arrData = [];
            arrItemsObtainedAdditionalPerDay.forEach((strTime) => {
                var intHours = new Date(timetoint(strTime)).getHours()
                if (intHours in objItemsObtainedAdditional) {
                    arrData.push(objItemsObtainedAdditional[intHours])
                }
                else {
                    arrData.push(0)
                }
            });

            var data = {
                labels: arrItemsObtainedAdditionalPerDay,
                datasets: [{

                    data: arrData,

                    tension: 0.05,
                }]
            };
            var chart = new Chart(`${strChartID}_additional`, {
                data: data,
                type: 'line',
                options: {
                    aspectRatio: arrAspectRatio[0] / (arrAspectRatio[1] - (arrAspectRatio[1] * 0.25)),

                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            displayColors: false,
                            callbacks: {
                                title: (context) => `${(context[0].label)}`,

                                label: function (context) {
                                    let label = `eaten ${context.raw} times`;
                                    return label;
                                }
                            }
                        }
                    },

                    ticks: {
                        precision: 0
                    }
                }
            });
            allCharts[`${strChartID}_additional`] = chart;
        }


        if (bolTableGrid) {
            generateGenericTableGrid(
                objItemsObtainedTableData,
                strTitle
            );
        }
    } else {
        var $divInfoBlockWrap = getBlock(2, 2, true);
        var $divInfoBlock = $('<div>', { 'class': 'info' });
        $($divInfoBlock).append(` <div class="info_desc">last ${intDayCountCharts} days</div>`);
        $divInfoBlock.append(`<div class="info_horizontal">
                                <div class="info_value calculate_spacing">${0}</div>
                                <div class="info_desc smaller calculate_spacing">${getFlexChildren(strTitle.toLowerCase())}</div
                            </div>`);

        $($divInfoBlockWrap).append($divInfoBlock);
        $('#wrapped_charts').append($divInfoBlockWrap);
    }
}

function generateMapChartData() {
    if (objMistriaData.options.has('mode_dark')) {
        var strColor = arrPalette[0];
    } else {
        var strColor = arrPalette[1];
    }

    const intBiggestSize = 25;
    const intSmallestSize = 4;
    const arrLocationVisitCount = Object.values(objDataWrapped['game_stats']['location_visits']);
    const intHighestLocationVisitCount = Math.max(...arrLocationVisitCount);
    const getRadius = function (intVisits) {
        var intRadius = intVisits * intBiggestSize / intHighestLocationVisitCount;
        intRadius = intRadius > intSmallestSize ? intRadius : intSmallestSize;
        return intRadius
    };
    const getOpacity = function (intVisits) {
        // opacity goes from 0.33 to 1, the smaller circle, the bigger opacity
        var intDecreaseBy = intVisits / intHighestLocationVisitCount / 1.5;
        return 1 - intDecreaseBy;
    };
    var datasets = [];
    Object.entries(objDataWrapped['game_stats']['location_visits']).forEach(([strLocationKey, intVisits]) => {
        if (strLocationKey in objLocations && intVisits > 0) {
            datasets.push({
                label: strLocationKey,
                data: [{
                    x: objLocations[strLocationKey]['x'],
                    y: objLocations[strLocationKey]['y'],
                    r: getRadius(intVisits)
                }],
                backgroundColor: `rgba(${parseInt(strColor.slice(1, 3), 16)}, ${parseInt(strColor.slice(3, 5), 16)}, ${parseInt(strColor.slice(5, 7), 16)}, ${getOpacity(intVisits)})`,
                borderColor: objMistriaData.options.has('mode_dark') ? '#ffffff' : strColor,
                borderWidth: 0.3
            })
        }
    });

    return datasets;
}

function getBlock(intW, intH, bolOverflowVisible = false, bolHasTable = false, bolInnerGrid = false, bolFullBackground = false) {

    var $divInfoBlockWrap = $('<div>', { 'class': `block` }).css({
        '--multiplier-height': intH,
        '--multiplier-width': intW,
    });

    if (bolOverflowVisible) {
        $divInfoBlockWrap.css('overflow', 'visible');
    }
    if (bolHasTable) {
        $divInfoBlockWrap.addClass('has_table');
    }
    if (bolInnerGrid) {
        $divInfoBlockWrap.addClass('inner_grid');
    }
    if (bolFullBackground) {
        $divInfoBlockWrap.addClass('full_background');
    }

    return $divInfoBlockWrap;
}
const getOrCreateTooltip = (chart) => {
    let $parent = $(chart.canvas).parent();
    let $tooltipEl = $parent.find('div.chart-tooltip');

    if ($tooltipEl.length === 0) {
        $tooltipEl = $('<div class="chart-tooltip"></div>');
        $parent.append($tooltipEl);
    }

    return $tooltipEl[0];
};
const getClarification = function (strText) {
    return strText.substring(strText.indexOf("&lt;") + 4, strText.lastIndexOf("&gt;"))
};
const externalTooltipItem = (context) => {
    const { chart, tooltip } = context;
    const $tooltipEl = $(getOrCreateTooltip(chart));

    if (tooltip.opacity === 0) {
        $tooltipEl.css('opacity', 0);
        return;
    }

    const $tooltipBody = $('<div>').addClass('chart-tooltip-body');

    if (tooltip.body) {

        var strTitle = tooltip.title[0];
        var bolTitleNumber = !isNaN(strTitle);

        if (bolTitleNumber) {
            $tooltipBody.append(`<div class="chart-tooltip-title">Day ${strTitle}</div>`);
        }

        const bodyLines = tooltip.body.map(b => b.lines);
        bodyLines.forEach((body, i) => {

            const intCount = tooltip.dataPoints[i].raw;
            if (!intCount) {
                return;
            }

            const strItemKey = tooltip.dataPoints[i].dataset.label;

            const $tooltipItem = $('<div>').addClass('chart-tooltip-item');
            var $colorBox;
            if (bolTitleNumber) {
                $colorBox = $('<div>').addClass('chart-tooltip-color').css({
                    'background': tooltip.labelColors[i].backgroundColor,
                    'border-color': tooltip.labelColors[i].borderColor,
                });

            }

            let strItemName;
            if (strItemKey in objItems) {
                strItemName = `<img src="images/items/${strItemKey}.png" >`;
                strItemName += objItems[strItemKey].name;
                strItemName += ': ';
                $tooltipItem.append($colorBox).append(strItemName).append(intCount);
            } else {
                if (strItemKey.includes('purse')) {
                    strItemName = `<img src="images/items/purse.png" >`;
                    strItemName += getClarification(strItemKey);
                    strItemName += ': ';
                    $tooltipItem.append($colorBox).append(strItemName).append(intCount);
                } else if (strItemKey.includes('RecipeLearner')) {
                    if (getClarification(strItemKey) in objItems) {
                        strItemName = `<img src="images/items/recipe_scroll.png" >`;
                        strItemName += `<img src="images/items/${getClarification(strItemKey)}.png">`;
                        strItemName += objItems[getClarification(strItemKey)].name;
                        strItemName += ' scroll';
                        strItemName += ': ';
                        $tooltipItem.append($colorBox).append(strItemName).append(intCount);
                    } else {
                        strItemName = `<img src="images/items/scroll.png">`;
                        strItemName += getClarification(strItemKey);
                        strItemName += ': ';
                        $tooltipItem.append($colorBox).append(strItemName).append(intCount);
                    }
                } else if (strItemKey.includes('AnimalCosmetic')) {
                    var strClarification = getClarification(strItemKey);
                    var arrClarification = strClarification.split("/");
                    strItemName = `Animal cosmetic - `;
                    strItemName += `${arrClarification[1].replaceAll('_', ' ')} (${arrClarification[0]})`;
                    strItemName += ': ';
                    $tooltipItem.append($colorBox).append(strItemName).append(intCount);

                } else if (strItemKey.includes('PetCosmetic')) {
                    strItemName = `Pet cosmetic - ${getClarification(strItemKey).replaceAll('_', ' ')}`;
                    strItemName += ': ';
                    $tooltipItem.append($colorBox).append(strItemName).append(intCount);
                } else if (strItemKey.includes("&lt;")) {
                    var strClarification = getClarification(strItemKey).replaceAll('_', ' ');
                    var strItemKeyPart = strItemKey.split("&lt;")[0];

                    if (strItemKeyPart in objItems) {
                        strItemName = `<img src="images/items/${strItemKeyPart}.png">`;
                        strItemName += objItems[strItemKeyPart].name + ' (' + strClarification + ')';
                        strItemName += ': ';
                        $tooltipItem.append($colorBox).append(strItemName).append(intCount);
                    } else if (strItemKeyPart == 'Cosmetic') {
                        strItemName = `Cosmetic - ${getClarification(strItemKey).replaceAll('_', ' ')}`;
                        strItemName += ': ';
                        $tooltipItem.append($colorBox).append(strItemName).append(intCount);
                    } else {

                        strItemName += capitalizeFirstLetter(strItemKeyPart.replaceAll('_', ' '));
                        strItemName += ': ';
                        $tooltipItem.append($colorBox).append(strItemName).append(intCount);
                    }

                } else {
                    strItemName = capitalizeFirstLetter(strItemKey.replaceAll('_', ' ')) + ': ';
                    $tooltipItem.text(strItemName).prepend($colorBox).append(intCount);
                }
            }
            $tooltipBody.append($tooltipItem);

        });

        $tooltipEl.empty().append($tooltipBody);
    }
    const positionX = chart.canvas.offsetLeft;
    const positionY = chart.canvas.offsetTop;

    var intPositionLeft = positionX + tooltip.caretX;
    var intPositionTop = positionY + tooltip.caretY;

    if (intPositionLeft + tooltip.width / 2 > chart.width) {
        intPositionLeft = chart.width - tooltip.width / 2;
    }
    if (intPositionLeft - tooltip.width / 2 + 20 < 0) {
        intPositionLeft = tooltip.width / 2 + 20;
    }

    if (intPositionTop + tooltip.height > chart.height) {
        intPositionTop = chart.height - tooltip.height;
    }
    if (intPositionTop < 0) {
        intPositionTop = 0;
    }

    $tooltipEl.css({
        opacity: 1,
        left: intPositionLeft + 'px',
        top: intPositionTop + 'px',
        font: tooltip.options.bodyFont.string,
        padding: tooltip.options.padding + 'px ' + tooltip.options.padding + 'px'
    });
};
const getOrCreateLegendList = (chart, id) => {

    const $container = $('#' + id);
    let $listContainer = $container.find('ul');

    if ($listContainer.length === 0) {
        $listContainer = $('<ul class="chart-legend"></ul>');
        $container.append($listContainer);
    }

    return $listContainer;
};

const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
        var setWings = new Set();

        const $ul = getOrCreateLegendList(chart, options.containerID);

        // Remove old legend items
        $ul.empty();

        // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart);

        items.forEach(item => {
            var strWing = Object.keys(objSetsColorCodes).find(key => objSetsColorCodes[key] === item['strokeStyle']);

            if (setWings.has(strWing)) {
                return;
            }
            setWings.add(strWing);

            const $li = $('<li>');

            $li.on('click', function () {
                var strCurrColor = item['strokeStyle'];
                const matchedIndexes = items.reduce((acc, testItem) => {
                    return testItem.strokeStyle === strCurrColor ? [...acc, testItem.datasetIndex] : acc;
                }, []);

                matchedIndexes.forEach((intIndex) => {
                    chart.setDatasetVisibility(intIndex, !chart.isDatasetVisible(intIndex));
                });

                chart.update();
            });

            // Color box
            const $boxSpan = $('<div>').addClass('chart-tooltip-color').css({
                'background': item.fillStyle,
                'border-color': item.strokeStyle,
            });

            // Text
            const $textContainer = $('<span>').css({
                'text-decoration': item.hidden ? 'line-through' : ''
            }).text(capitalizeFirstLetter(strWing) + ' wing');

            $li.append($boxSpan).append($textContainer);
            $ul.append($li);
        });
    }
};
function recalculateWidths() {
    $(".calculate_spacing").each(function (index) {
        $(this).children().css('margin-left', '');

        var intElementWidth = $(this).width();
        var intChildrenWidth = 0;

        $(this).children().each(function () {
            intChildrenWidth += $(this).outerWidth();
        });

        if (intElementWidth < intChildrenWidth) {
            var intMargin = (intChildrenWidth - intElementWidth) / $(this).children().length;
        }

        $(this).children().css('margin-left', -intMargin);
    });
}
function createTestMap() {
    var $divInfoBlock = $('<div>', { 'class': 'grid-container' }).css({
        'width': '100%',
        'display': 'inline-grid',
        'grid-template-columns': 'repeat(136, 1fr)',
        'grid-template-rows': 'repeat(72, 1fr)',
        'aspect-ratio': '5426 / 2866',
        'border-top': '1px solid black',
        'border-left': '1px solid black',
        'background-image': 'url("images/V0.13_map_unlocked.png")',
        'background-size': 'contain',
        'background-repeat': 'no-repeat',
        'box-sizing': 'border-box',
    });

    for (let y = 71; y >= 0; y--) {
        for (let x = 0; x < 136; x++) {
            var $divGridElem = $('<div>', { 'title': `${x},${y}` }).css({
                'border-bottom': '1px solid black',
                'border-right': '1px solid black',
                'height': '100%',
                'width': '100%',
                'box-sizing': 'border-box',
            });
            $($divInfoBlock).append($divGridElem);
        }
    }

    $('#wrapped').prepend($divInfoBlock);
}

function checkScrapedTabVisibility() {
    $('#scraped').removeClass('completed');
    $('#scraped .category .subcategory').css('display', '');
    $('#scraped .category').css('display', '');

    $('#scraped .category .subcategory').each(function () {
        if (!$(this).find('.item:not(.spoiler_placeholder):visible').length) {
            $(this).hide();
        }
    });

    $('#scraped .category').each(function () {
        if (!$(this).find('.subcategory:visible').length) {
            $(this).hide();
        }
    });

    if (!$('#scraped .category:visible').length && $('#search_items').val() === '' && !$('input.obtain_cbx:checked').length) {
        $('#scraped').addClass('completed');
    }
}


function updateStatistics() {

    var intItemsGiftable = 0;
    var intItemsGifted = 0;

    let sortedEntries = Object.entries(objTabs.gifts.categories);
    sortedEntries.forEach(([strCharacterKey, objCharacter]) => {
        if ((objCharacter.info.spoiler || objCharacter.info.noimage) && !objMistriaData.options.has('mode_spoilers')) {
            return;
        }

        objCharacter.subcategories.loved.items.forEach(function (strGiftKey) {
            strID = strCharacterKey + '_' + strGiftKey;

            if (objItems[strGiftKey]['spoiler'] && !objMistriaData.options.has('mode_spoilers')) {
                return;
            }
            intItemsGiftable++;
            if (objMistriaData.gifts.has(strID)) {
                intItemsGifted++;
            }
        });

        objCharacter.subcategories.liked.items.forEach(function (strGiftKey) {
            strID = strCharacterKey + '_' + strGiftKey;

            if (objItems[strGiftKey]['spoiler'] && !objMistriaData.options.has('mode_spoilers')) {
                return;
            }
            intItemsGiftable++;
            if (objMistriaData.gifts.has(strID)) {
                intItemsGifted++;
            }
        });
    });


    var intItemsDonatable = 0;
    var intItemsDonated = 0;

    let sortedEntriesWings = Object.entries(objTabs.museum.categories);
    sortedEntriesWings.forEach(([strWingKey, objWing]) => {
        let sortedEntriesSets = Object.entries(objWing.subcategories);

        sortedEntriesSets.forEach(([strSetKey, objSet]) => {

            if (objSet.info.spoiler && !objMistriaData.options.has('mode_spoilers')) {
                return;
            }

            objSet['items'].forEach((strItemKey) => {
                if (objItems[strItemKey]['spoiler'] && !objMistriaData.options.has('mode_spoilers')) {
                    return;
                }
                intItemsDonatable++;
                if (objMistriaData.museum.has(strItemKey)) {
                    intItemsDonated++;
                }
            });
        });
    });


    var objItemsAlmanacable = {};
    var objItemsAlmanaced = {};

    let sortedEntriesSections = Object.entries(objTabs.almanac.categories);
    sortedEntriesSections.forEach(([strSectionKey, objSection]) => {

        objItemsAlmanacable[strSectionKey] = 0;
        objItemsAlmanaced[strSectionKey] = 0;
        let sortedEntriesSets = Object.entries(objSection.subcategories);

        sortedEntriesSets.forEach(([strSetKey, objSet]) => {


            if (objSet.info.spoiler && !objMistriaData.options.has('mode_spoilers')) {
                return;
            }


            objSet['items'].forEach((strItemKey) => {
                if (objItems[strItemKey]['spoiler'] && !objMistriaData.options.has('mode_spoilers')) {
                    return;
                }

                objItemsAlmanacable[strSectionKey] = objItemsAlmanacable[strSectionKey] + 1;
                if (objMistriaData.almanac.has(strItemKey)) {
                    objItemsAlmanaced[strSectionKey] = objItemsAlmanaced[strSectionKey] + 1;
                }
            });


        });
    });

    var strGiftedPercent = Math.floor(intItemsGifted / intItemsGiftable * 100) + '%';
    var strGiftedTippy = `${intItemsGifted} / ${intItemsGiftable}`;
    $('#gift_statistics div').css('width', strGiftedPercent);
    $('#gift_statistics span').html(strGiftedPercent)

    var objLabel = $('#gift_statistics')[0];
    var objTippy = objLabel._tippy;

    if (typeof objTippy === 'undefined') {
        tippy('#gift_statistics', {
            content: strGiftedTippy,
        });
    } else {
        objTippy.setContent(strGiftedTippy);
    }

    var strDonatedPercent = Math.floor(intItemsDonated / intItemsDonatable * 100) + '%';
    var strDonatedTippy = `${intItemsDonated} / ${intItemsDonatable}`;
    $('#museum_statistics div').css('width', strDonatedPercent);
    $('#museum_statistics span').html(strDonatedPercent);

    objLabel = $('#museum_statistics')[0];
    objTippy = objLabel._tippy;

    if (typeof objTippy === 'undefined') {
        tippy('#museum_statistics', {
            content: strDonatedTippy,
        });
    } else {
        objTippy.setContent(strDonatedTippy);
    }

    var intItemsAlmanaced = Object.values(objItemsAlmanaced).reduce((a, b) => a + b, 0);
    var intItemsAlmanacable = Object.values(objItemsAlmanacable).reduce((a, b) => a + b, 0);
    var strAlmanacedPercent = Math.floor(intItemsAlmanaced / intItemsAlmanacable * 100) + '%';

    var strAlmanacedTippy = `<div class="statistics_header">${intItemsAlmanaced} / ${intItemsAlmanacable}</div>`;
    strAlmanacedTippy += '<table class="statistics_table">';

    Object.entries(objItemsAlmanacable).forEach(([strSectionKey, intValue]) => {
        strAlmanacedTippy += `<tr><td>${objTabs.almanac.categories[strSectionKey]['info']['name']}:</td><td>${objItemsAlmanaced[strSectionKey]} / ${intValue}</td></tr>`;
    });

    strAlmanacedTippy += '</table>';

    $('#almanac_statistics div').css('width', strAlmanacedPercent);
    $('#almanac_statistics span').html(strAlmanacedPercent);

    objLabel = $('#almanac_statistics')[0];
    objTippy = objLabel._tippy;

    if (typeof objTippy === 'undefined') {
        tippy('#almanac_statistics', {
            content: strAlmanacedTippy,
            allowHTML: true,
        });
    } else {
        objTippy.setContent(strAlmanacedTippy);
    }
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1).toLowerCase();
}

function timetoint(strTime) {

    var arrTime = strTime.split(":")
    var hours = parseInt(arrTime[0]);
    var minutes = parseInt(arrTime[1]);
    var strAmPM = strTime.slice(-2);

    var date = new Date(`${hours}:${minutes} ${strAmPM} 1970`)

    if (date.getHours() < 6) {
        date.setHours(date.getHours() + 24)
    }
    return date.getTime();
}


function inttotime(intTime) {
    const date = new Date(intTime)
    const hours = date.getHours()
    return `${String(hours % 12).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")} ${hours >= 12 ? "pm" : "am"}`
}

function getCellWidth() {
    const $objWrapped = $('#wrapped_charts');
    const intGap = parseInt($objWrapped.css("--intGap"));
    const intCell = parseInt($objWrapped.css("--intCellBase"));
    var intGridWidth = $objWrapped.width();// removes padding
    var intColumnCount = Math.floor((intGridWidth + intGap) / (intCell + intGap));
    var intCellActual = (intGridWidth - intGap * (intColumnCount - 1)) / intColumnCount;
    $objWrapped.css('--intCell', intCellActual);
}


$(function () {

    loadData();
    loadMenuItems();

    tippy('#triangle img', {
        content: 'Red bull, please?',
    });

    if ($('#tutorial').length) {
        return;
    }

    updateStatistics();

    loadTab(objMistriaData.tab ? objMistriaData.tab : 'gifts');

    $('.tab').on('click', function () {
        loadTab($(this).attr('data-tab'));
    });

    setTimeout(() => {
        handleResize();
    }, 150);

    const handleResize = () => {
        getCellWidth();
        recalculateWidths();

        for (const [key, chart] of Object.entries(allCharts)) {
            chart.resize();
        }
    }
    const handleResizeThrottled = throttle(handleResize, 250);
    const resizeObserver = new ResizeObserver((entries) => {
        handleResizeThrottled();
    });
    resizeObserver.observe(document.getElementById("wrapped"));

});

function throttle(fn, time) {
    let timeout = null;
    return function () {
        if (timeout) return;
        const context = this;
        const args = arguments;
        const later = () => {
            fn.call(context, ...args);
            timeout = null;
        }
        timeout = setTimeout(later, time);
    }
}

function loadTab(strTabKey) {
    if ($('#page').hasClass(strTabKey)) {
        return;
    }

    allCharts = {};
    let start = Date.now();

    $(`.tab_content`).html('');
    $(`.tab_content`).hide();
    $(`#tabs .tab`).removeClass('active');
    $(`#tabs .tab[data-tab="${strTabKey}"]`).addClass('active');

    $('#page').removeClass(arrTabs.join(' '));
    $('#page').removeClass('wrapped');
    $('#header').removeClass('hidden');

    $('#page').addClass(strTabKey);

    switch (strTabKey) {
        case "wrapped":
            $('#wrapped').css('display', '');
            break;
        default:
            $('#scraped').removeClass('completed');
            $('#scraped').css('display', '');
            break;
    }

    // break up execution stack
    setTimeout(() => {
        switch (strTabKey) {
            case "wrapped":
                loadWrappedTab();
                break;
            default:
                loadScrapedTab(strTabKey);
                break;
        }

        objMistriaData.tab = strTabKey;
        saveData();

        if ($('#search_items').val() != '') {
            $('#search_items').keyup();
        }
        checkScrapedTabVisibility();

        let timeTaken = Date.now() - start;
        console.log(`Loaded ${strTabKey} tab in ${timeTaken} ms`);

    }, 50);
}