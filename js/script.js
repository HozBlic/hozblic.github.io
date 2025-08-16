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

var objTagItems = {}
Object.entries(objItems).forEach(([key, value]) => {
    tags = value.tags ?? ['notag']
    tags.forEach(tag => {
        objTagItems[tag] = [...(objTagItems[tag] ?? []), key]
    })
})
Object.entries(objTagItems).forEach(([tag, keys]) => { objTagItems[tag] = keys.sort((a, b) => objItems[a].name.localeCompare(objItems[b].name)) })
names = []
objTagItems.furniture = objTagItems.furniture.filter(key => { const includes = names.includes(objItems[key].name); if (includes) { return false } names.push(objItems[key].name); return true })


var objMistriaData;
var objMistriaDataDefault = {
    gifts: [],
    museum: [],
    almanac: [],
    options: ['mode_dark']
};

var arrTabs = [
    'gift',
    'museum',
    'almanac',
    'cooking',
    'woodworking',
    'animal'
];

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

var objTips = {
    'museumSet': 'Museum Set',
    'recipeSource': 'Recipe Source',
    'ingredients': 'Ingredients',
    'size': 'Size',
    'rarity': 'Rarity',
    'location': 'Location',
    'season': 'Season',
    'weather': 'Weather',
    'time': 'Time',
    'fishing': 'Fishing pole',
    'diving': 'Diveable'
}

function createTip(strID, objInfo, bolMuseum = false, strItemKey) {
    var strTableHTML = '';
    var bolDonatable = false;
    if ('tip_extra' in objInfo) {

        strTableHTML = '<table>';
        Object.entries(objTips).forEach(([strTipKey, strTipValue]) => {


            if (strTipKey in objInfo['tip_extra']) {
                if (strTipKey == 'museumSet') {
                    bolDonatable = true;
                    if (bolMuseum) {
                        return;
                    }
                }
                strTableHTML += `<tr><td>${strTipValue}</td><td>${objInfo['tip_extra'][strTipKey]}</td></tr>`;
            }
        });
        strTableHTML += '</table>';
    }

    var strChecked = '';
    if (objMistriaData.museum.has(strItemKey)) {
        strChecked = 'checked';
    }

    var strTipHTML = $(`<div id="tip_${strID}" class="tip_wrap">
                        <div class="tip">
                            <div class="tip_name ${strChecked} ${bolDonatable ? 'donatable' : ''}">
                                <a target="_blank" href="https://fieldsofmistria.wiki.gg/wiki/${objInfo['url']}">${objInfo['name']}</a>
                                ${bolDonatable ? '<img src="images/museum.png">' : ''}
                            </div>
                            <div class="tip_info">${objInfo['tip']}</div>
                            ${objInfo['nodata'] ? 'No data available' : ''}
                            ${strTableHTML}
                        </div>
                    </div>`);


    var $objTip = $(strTipHTML);

    $objTip.find('.no-wrap').each(function () {
        $(this).html($(this).html().replaceAll(',', 'comma'))
    });
    $objTip.html($objTip.html().replaceAll(',', '<br>'))
    $objTip.find('.no-wrap').each(function () {
        $(this).html($(this).html().replaceAll('comma', ','))
    });

    return $objTip.prop('outerHTML');
}
function createGiftItem(arrGifts, strCharacterKey, $objParent) {
    arrGifts.forEach(function (strGiftKey) {
        strID = strCharacterKey + '_' + strGiftKey;
        strDataCbx = $($.parseHTML(objItems[strGiftKey]['tip'])).text().replace(/["'&<>]/g, '').trim();

        $objParent.append(`<div class="item ${objItems[strGiftKey]['spoiler'] || objItems[strGiftKey]['nodata'] ? 'spoiler' : ''}" data-cbx="${!arrObtainEasy.some(v => strDataCbx.includes(v)) ? 'Difficult to obtain' : ''} ${strDataCbx}">
                                <input class="gift_chb" ${objMistriaData.gifts.has(strID) ? 'checked' : ''} type="checkbox" id="${strID}" name="gifts" value="${strID}">
                                <label for="${strID}" class="has_tip" id="label_${strID}">
                                    <div class="image ${objItems[strGiftKey]['url_image'] == '' && objItems[strGiftKey]['nodata'] ? 'nodata' : ''}" style="background-image: url(images/items/${objItems[strGiftKey]['url_image']})"></div>
                                    <div class="name">${objItems[strGiftKey]['name']}</div>
                                </label>
                                ${createTip(strID, objItems[strGiftKey], false, strGiftKey)}
                            </div>`);


        const template = $(`#tip_${strID}`)[0];
        template.style.display = 'block';

        tippy(`#label_${strID}`, {
            content: template,
            interactive: true,
            maxWidth: 370
        });
    });
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

    changeSortForObject(objMistriaData, objCharacters, '.character', '#character_', objCharOrder);
    changeSortForObject(objMistriaData, objAlmanac, '.section', '#section_');
    changeSortForObject(objMistriaData, objMuseum, '.wing', '#wing_');
    Object.entries(objMuseum).forEach(([strWingKey, objWing]) => {
        changeSortForObject(objMistriaData, objWing['sets'], `.wing_${strWingKey} .set`, `#set_${strWingKey}_`);
    });
}

function changeSortForObject(objMistriaData, objForSort, strElemClass, strElemID, objDefaultOrder = false) {
    $(strElemClass).css('order', '');

    var sortedEntries = Object.entries(objForSort);
    if (objMistriaData.sort === 'az') {
        sortedEntries.sort((a, b) => a[1].name.localeCompare(b[1].name));
    } else if (objMistriaData.sort === 'za') {
        sortedEntries.sort((a, b) => b[1].name.localeCompare(a[1].name));
    }

    var intIndex = 0;
    sortedEntries.forEach(([strItemKey, objCharacter]) => {
        $divItem = $(strElemID + strItemKey);

        if (!('sort' in objMistriaData)) {
            if (objDefaultOrder) {
                if (strItemKey in objDefaultOrder) {
                    $divItem.css('order', objDefaultOrder[strItemKey]);
                }
                else {
                    $divItem.css('order', 99);
                }
            }
            else {
                $divItem.css('order', '');
            }
        }
        else {
            $divItem.css('order', intIndex);
            intIndex++;
        }
    });
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

    var objNewData = JSON.parse(strJson);
    var objOldData = JSON.parse(localStorage.getItem('mistria_data')) || JSON.parse(JSON.stringify(objMistriaDataDefault));

    if (! 'museum' in objOldData) {
        objOldData.museum = [];
    }
    if (! 'almanac' in objOldData) {
        objOldData.almanac = [];
    }

    // remove duplicates
    objOldData.gifts = [...new Set(objOldData.gifts)];
    objNewData.gifts = [...new Set(objNewData.gifts)];
    objOldData.museum = [...new Set(objOldData.museum)];
    objNewData.museum = [...new Set(objNewData.museum)];
    objOldData.almanac = [...new Set(objOldData.almanac)];
    objNewData.almanac = [...new Set(objNewData.almanac)];
    objOldData.options = [...new Set(objOldData.options)];
    objNewData.options = [...new Set(objNewData.options)];

    // Compare old and new data
    const intOldGiftCount = Array.isArray(objOldData.gifts) ? objOldData.gifts.length : 0;
    const intNewGiftCount = Array.isArray(objNewData.gifts) ? objNewData.gifts.length : 0;
    const intOldMuseumCount = Array.isArray(objOldData.museum) ? objOldData.museum.length : 0;
    const intNewMuseumCount = Array.isArray(objNewData.museum) ? objNewData.museum.length : 0;
    const intOldAlmanacCount = Array.isArray(objOldData.almanac) ? objOldData.almanac.length : 0;
    const intNewAlmanacCount = Array.isArray(objNewData.almanac) ? objNewData.almanac.length : 0;
    const intOldToggleCount = Array.isArray(objOldData.options) ? objOldData.options.length : 0;
    const intNewToggleCount = Array.isArray(objNewData.options) ? objNewData.options.length : 0;

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

    var bolChangesDetected = false;
    let arrChanges = [];

    if (JSON.stringify(objOldData.gifts) !== JSON.stringify(objNewData.gifts)) {
        bolChangesDetected = true;
        arrChanges.push(`<b>Given gifts: ${intOldGiftCount} -> ${intNewGiftCount}</b>`);
    } else {
        arrChanges.push(`Given gifts: ${intOldGiftCount} -> ${intNewGiftCount}`);
    }
    if (JSON.stringify(objOldData.museum) !== JSON.stringify(objNewData.museum)) {
        bolChangesDetected = true;
        arrChanges.push(`<b>Donated museum items: ${intOldMuseumCount} -> ${intNewMuseumCount}</b>`);
    } else {
        arrChanges.push(`Donated museum items: ${intOldMuseumCount} -> ${intNewMuseumCount}`);
    }
    if (JSON.stringify(objOldData.almanac) !== JSON.stringify(objNewData.almanac)) {
        bolChangesDetected = true;
        arrChanges.push(`<b>Obtained almanac items: ${intOldAlmanacCount} -> ${intNewAlmanacCount}</b>`);
    } else {
        arrChanges.push(`Obtained almanac items: ${intOldAlmanacCount} -> ${intNewAlmanacCount}`);
    }
    if (JSON.stringify(objOldData.options) !== JSON.stringify(objNewData.options)) {
        bolChangesDetected = true;
        arrChanges.push(`<b>Layout toggles: ${intOldToggleCount} -> ${intNewToggleCount}</b>`);
    } else {
        arrChanges.push(`Layout toggles: ${intOldToggleCount} -> ${intNewToggleCount}`);
    }
    if (strOldSort !== strNewSort) {
        bolChangesDetected = true;
        arrChanges.push(`<b>Sort settings: ${strOldSort} -> ${strNewSort}</b>`);
    } else {
        arrChanges.push(`Sort settings: ${strOldSort} -> ${strNewSort}`);
    }

    if (!bolChangesDetected) {
        return [false, [], []];
    } else {
        return [true, arrChanges, objNewData];
    }
}

function saveJson() {
    var strJson = $('#settings_json').val();
    if (isJsonString(strJson)) {
        const [bolChangesDetected, arrChanges, objNewData] = compareData(strJson);

        if (bolChangesDetected) {
            $('#accept_changes').show();

            $('#changes').html(
                arrChanges.map(c => `<li>${c}</li>`).join('')
            );

            $('#popup-accept').off('click').on('click', function () {
                objMistriaData = objNewData;
                objMistriaData.gifts = ('gifts' in objMistriaData ? new Set(objMistriaData.gifts) : new Set());
                objMistriaData.options = ('options' in objMistriaData ? new Set(objMistriaData.options) : new Set());
                objMistriaData.museum = ('museum' in objMistriaData ? new Set(objMistriaData.museum) : new Set());
                objMistriaData.almanac = ('almanac' in objMistriaData ? new Set(objMistriaData.almanac) : new Set());
                saveData();
                window.location.reload();
            });

        } else {
            $('#json_alert').addClass('show').addClass('yellow');
            $('#json_alert .info').html('No changes detected');
        }
    } else {
        $('#json_alert').addClass('show');
        $('#json_alert .info').html('JSON code is invalid');
    }
}

function saveAsJsonFile() {

    var strJson = $('#settings_json').val();
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

function copyClipboard(objElem) {
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
    objMistriaData.gifts = ('gifts' in objMistriaData ? new Set(objMistriaData.gifts) : new Set());
    objMistriaData.options = ('options' in objMistriaData ? new Set(objMistriaData.options) : new Set());
    objMistriaData.museum = ('museum' in objMistriaData ? new Set(objMistriaData.museum) : new Set());
    objMistriaData.almanac = ('almanac' in objMistriaData ? new Set(objMistriaData.almanac) : new Set());
}

function saveData() {
    // convert to array since JSON.stringify does not work on sets
    if ('gifts' in objMistriaData) {
        objMistriaData.gifts = [...objMistriaData.gifts];
    }
    if ('options' in objMistriaData) {
        objMistriaData.options = [...objMistriaData.options];
    }
    if ('museum' in objMistriaData) {
        objMistriaData.museum = [...objMistriaData.museum];
    }
    if ('almanac' in objMistriaData) {
        objMistriaData.almanac = [...objMistriaData.almanac];
    }

    localStorage.setItem('mistria_data', JSON.stringify(objMistriaData));
    loadData();
}

function openJsonPopup() {
    $('#json_alert').removeClass('show').removeClass('green').removeClass('yellow');
    $('#json_button_popup').show();
}

function loadMenuItems() {
    // create menu checkboxes
    arrObtain.forEach(function (strObtain, i) {
        if (strObtain === 'spacing') {
            $('#checkbox_filter_items').append(`<div class="spacing"></div>`)
        } else {
            $('#checkbox_filter_items').append(`<input value="${strObtain}" type='checkbox' class="styled obtain_cbx" id="chb_${i}"></input>
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

        checkAllVisibility();
    });

    $('#search_items').on('keyup', function () {
        $('#page').removeHighlight();
        $('.hide_search').removeClass('hide_search');

        const value = $(this).val().toLowerCase();

        if (value !== '') {
            const keywords = value.split('+').map(s => s.trim()).filter(Boolean);

            $('#characters .item').filter(function () {
                const text = $(this).text().trim().toLowerCase();
                const matchesAll = keywords.some(word => text.includes(word));

                if (matchesAll) {
                    $(this).removeClass('hide_search');
                } else {
                    $(this).addClass('hide_search');
                }
            });

            $('#almanac .item').filter(function () {
                const text = $(this).text().trim().toLowerCase();
                const matchesAll = keywords.some(word => text.includes(word));

                if (matchesAll) {
                    $(this).removeClass('hide_search');
                } else {
                    $(this).addClass('hide_search');
                }
            });

            $('#museum .item').filter(function () {
                const text = $(this).text().trim().toLowerCase();
                const matchesAll = keywords.some(word => text.includes(word));

                if (matchesAll) {
                    $(this).removeClass('hide_search');
                } else {
                    $(this).addClass('hide_search');
                }
            });

            keywords.forEach(word => {
                $('.tab_content').highlight(word);
            });

        }

        $('#characters .character').each(function () {
            if (value !== '') {
                if ($(this).find('.char_name').html().includes('highlight')) {
                    $(this).find('.item').removeClass('hide_search');
                }
            }

            if (!$(this).find('.item:visible').length) {
                $(this).hide()
            }
        });

        $('#almanac .section').each(function () {
            if (value !== '') {
                if ($(this).find('.section_name').html().includes('highlight')) {
                    $(this).find('.item').removeClass('hide_search');
                }
            }

            if (!$(this).find('.item:visible').length) {
                $(this).hide()
            }
        });

        $('#museum .wing .set').each(function () {
            if (value !== '') {
                if ($(this).find('.set_name').html().includes('highlight')) {
                    $(this).find('.item').removeClass('hide_search');
                }
            }

            if (!$(this).find('.item:visible').length) {
                $(this).hide()
            }
        });

        $('#museum .wing').each(function () {
            if (value !== '') {
                if ($(this).find('.wing_name').html().includes('highlight')) {
                    $(this).find('.item').removeClass('hide_search');
                }
            }

            if (!$(this).find('.item:visible').length) {
                $(this).hide()
            }
        });

        checkAllVisibility();
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

            if (strMode === 'mode_spoilers' || strMode === 'mode_gift') {
                checkAllVisibility();
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
    tippy('#beta_version', {
        content: 'Beta version, may not work correctly',
    });
}

function loadGiftTab() {
    Object.entries(objCharacters).forEach(([strCharacterKey, objCharacter]) => {
        var $divCharacter = $('<div>', { 'class': 'character', 'id': `character_${strCharacterKey}` });

        if (objCharacter['spoiler']) {
            $divCharacter.addClass('spoiler');
        }

        if (!('sort' in objMistriaData)) {
            if (strCharacterKey in objCharOrder) {
                $divCharacter.css('order', objCharOrder[strCharacterKey]);
            }
            else {
                $divCharacter.css('order', 99);
            }
        }

        $divCharacter.append(`  <div class="char_img"><img src="images/profiles/${objCharacter['name']}.png"></div>
                                <a class="char_name" href="https://fieldsofmistria.wiki.gg/wiki/${objCharacter['name']}" target="_blank">
                                    <img class="char_img_mini" src="images/mini_profiles/${objCharacter['name']}.png">
                                   ${objCharacter['name']}
                                </a>
                            ` );
        $('#characters').append($divCharacter);

        var $divLoved = $('<div>', { 'class': 'loved_gifts' });
        $divLoved.append('<div class="giftset">Loved</div>');
        $divCharacter.append($divLoved);
        createGiftItem(objCharacter['loved'], strCharacterKey, $divLoved)

        var $divLiked = $('<div>', { 'class': 'liked_gifts' });
        $divLiked.append('<div class="giftset">Liked</div>');
        $divCharacter.append($divLiked);
        createGiftItem(objCharacter['liked'], strCharacterKey, $divLiked)
    });

    $('.gift_chb:checkbox').change(function () {
        if ($(this).is(':checked')) {
            objMistriaData.gifts.add($(this).val())
        } else {
            objMistriaData.gifts.delete($(this).val())
        }
        updateStatistics();
        saveData();
    });

    if ($('#search_items').val() != '') {
        $('#search_items').keyup();
    }

    changeSortForObject(objMistriaData, objCharacters, '.character', '#character_', objCharOrder);
    checkGiftVisibility();
}

function loadMuseumTab() {
    Object.entries(objMuseum).forEach(([strWingKey, objWing]) => {

        var $divWing = $('<div>', { 'class': 'wing', 'id': `wing_${strWingKey}` });

        $divWing.append(` 
            <div class="wing_img"><img src="images/${objWing['name']}_wing.png"></div>
                                <a class="wing_name" href="https://fieldsofmistria.wiki.gg/wiki/${objWing['name']}_Wing" target="_blank">
                                   ${objWing['name']}
                                </a>
                            ` );
        $('#museum').append($divWing);

        var $divSets = $('<div>', { 'class': 'sets' });
        $divWing.append($divSets);



        let sortedEntriesSets = Object.entries(objWing['sets']);
        if (objMistriaData.sort === 'az') {
            sortedEntriesSets.sort((a, b) => a[1].name.localeCompare(b[1].name));
        } else if (objMistriaData.sort === 'za') {
            sortedEntriesSets.sort((a, b) => b[1].name.localeCompare(a[1].name));
        }

        sortedEntriesSets.forEach(([strSetKey, objSet]) => {
            strID = strWingKey + '_' + strSetKey;

            var strCleanedName = objSet['name'].replace('Set', '');

            var strLinkHash = strCleanedName
                .replace('Artifact', '')
                .replace('Fish', '')
                .replace('Material', '')
                .replace('Flower', '')
                .replace('Forage', '')
                .replace('Crop', '')
                .replace('Insect', '')
                .trim().replaceAll(' ', '_');

            var $divSet = $('<div>', { 'class': 'set', 'id': `set_${strWingKey}_${strSetKey}` });

            if (objSet['spoiler'] || objSet['nodata']) {
                $divSet.addClass('spoiler')
            }

            $divSets.append($divSet);

            var $divitems = $('<div>', { 'class': 'set_items' });
            $divSet.append($divitems);

            $divitems.append(` 
                                <a class="set_name" href="https://fieldsofmistria.wiki.gg/wiki/${objWing['name']}_Wing#${strLinkHash}" target="_blank">
                                   ${strCleanedName}
                                </a>
                            ` );


            objSet['items'].forEach((item) => {
                strID = item;
                strDataCbx = $($.parseHTML(objItems[item]['tip'])).text().replace(/["'&<>]/g, '').trim();

                $divitems.append(`<div class="item ${objItems[item]['spoiler'] || objItems[item]['nodata'] ? 'spoiler' : ''}" data-cbx="${!arrObtainEasy.some(v => strDataCbx.includes(v)) ? 'Difficult to obtain' : ''} ${strDataCbx}">
                                <input class="museum_chb" ${objMistriaData.museum.has(strID) ? 'checked' : ''} type="checkbox" id="set_${strID}" name="museum" value="${strID}">
                                <label for="set_${strID}" class="has_tip" id="label_${strID}">
                                    <div class="image ${objItems[item]['url_image'] == '' && objItems[item]['nodata'] ? 'nodata' : ''}" style="background-image: url(images/items/${objItems[item]['url_image']})"></div>
                                    <div class="name">${objItems[item]['name']}</div>
                                </label>
                                ${createTip(strID, objItems[item], true, strID)}
                               
                            </div>`);



                const template = $(`#tip_${strID}`)[0];
                template.style.display = 'block';
                tippy(`#label_${strID}`, {
                    content: template,
                    interactive: true,
                    maxWidth: 370
                });
            });
        });
    });

    $('.museum_chb:checkbox').change(function () {
        var bolAdd = true;
        if ($(this).is(':checked')) {
            objMistriaData.museum.add($(this).val());
        } else {
            objMistriaData.museum.delete($(this).val());
            bolAdd = false;
        }

        strItemKey = $(this).val();
        $(`[id^="label_"][id$="_${strItemKey}"]`).each(function (index) {
            var objLabel = $(this)[0];
            var objTippy = objLabel._tippy;
            if (bolAdd) {
                $(objTippy.props.content).find('.tip_name').addClass('checked');
            } else {
                $(objTippy.props.content).find('.tip_name').removeClass('checked');
            }
            objTippy.setContent($(objTippy.props.content)[0]);
        });

        updateStatistics();
        saveData();
    });

    if ($('#search_items').val() != '') {
        $('#search_items').keyup();
    }

    changeSortForObject(objMistriaData, objMuseum, '.wing', '#wing_');
    Object.entries(objMuseum).forEach(([strWingKey, objWing]) => {
        changeSortForObject(objMistriaData, objWing['sets'], `.wing_${strWingKey} .set`, `#set_${strWingKey}_`);
    });
    checkMuseumVisibility();
}

function loadAlmanacTab() {

    var strAlert = `
        <div class="alert show yellow" style="grid-column: 1/-1; height: min-content;">
            <div class="icon yellow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24.002" height="24" stroke="none"
                    viewBox="0 0 24.002 24">
                    <path id="notice"
                        d="M-1990-7434a12,12,0,0,1,12-12,12,12,0,0,1,12,12,12,12,0,0,1-12,12A12,12,0,0,1-1990-7434Zm2.5,0a9.51,9.51,0,0,0,9.5,9.5,9.51,9.51,0,0,0,9.5-9.5,9.511,9.511,0,0,0-9.5-9.5A9.511,9.511,0,0,0-1987.5-7434Zm8.181,4.414A1.3,1.3,0,0,1-1978-7430.9a1.325,1.325,0,0,1,1.3,1.315,1.342,1.342,0,0,1-1.3,1.315A1.317,1.317,0,0,1-1979.319-7429.585Zm.269-3c0-.938-.056-2.1-.11-3.223s-.11-2.293-.11-3.233a1.106,1.106,0,0,1,1.252-1.063,1.109,1.109,0,0,1,1.235,1.063c0,.942-.056,2.106-.11,3.233s-.11,2.285-.11,3.223c0,.578-.622.792-1.015.792C-1978.656-7431.792-1979.05-7432.1-1979.05-7432.585Z"
                        transform="translate(1990.001 7446)" fill="#242424"></path>
                </svg>
            </div>
            <div class="info" style="line-height: 18px;">
                <b>Try importing save file to get aquired items!</b> </br>
                <div style="font-size: 12px; line-height: 12px; padding-top: 2px;">
                    Data for Furniture section is incomplete, missing some items and images. All other sections should have correct data. </br> 
                    If you catch any other errors, feel free to <a style="color: inherit;" href="https://www.reddit.com/r/FieldsOfMistriaGame/comments/1mdf17v/interactive_gift_guide_v0140/">contact me</a>!
                </div>
            </div>
        </div>`;

    // $(strAlert).insertBefore('#almanac');
    $('#almanac').append(strAlert);


    Object.entries(objAlmanac).forEach(([strSectionKey, objSection]) => {
        strUsedTag = objSection['tags'][0];

        var $divSection = $('<div>', { 'class': 'section', 'id': `section_${strSectionKey}` });

        $divSection.append(` 
           
                <a class="section_name" href="https://fieldsofmistria.wiki.gg/wiki/${capitalizeFirstLetter(objSection['name'])}" target="_blank">
                    <img class="section_img_mini" src="images/almanac/${strSectionKey}.png">          
                    ${objSection['name']}
                </a>
            ` );
        $('#almanac').append($divSection);

        var $divitems = $('<div>', { 'class': 'set_items' });
        $divSection.append($divitems);

        objTagItems[strUsedTag].forEach((strItemKey) => {
            strID = strItemKey;
            strDataCbx = $($.parseHTML(objItems[strItemKey]['tip'])).text().replace(/["'&<>]/g, '').trim();


            if ('tags' in objItems[strItemKey]) {
                if (objItems[strItemKey]['tags'].includes('furniture')) {
                    strDataCbx = strDataCbx + ' ' + 'Furniture';
                }
            }

            $divitems.append(`<div class="item ${objItems[strItemKey]['spoiler'] || objItems[strItemKey]['nodata'] ? 'spoiler' : ''}" data-cbx="${!arrObtainEasy.some(v => strDataCbx.includes(v)) ? 'Difficult to obtain' : ''} ${strDataCbx}">
                                <input class="almanac_chb" ${objMistriaData.almanac.has(strID) ? 'checked' : ''} type="checkbox" id="set_${strID}" name="almanac" value="${strID}">
                                <label for="set_${strID}" class="has_tip" id="label_${strID}">
                                    <div class="image ${objItems[strItemKey]['url_image'] == '' || objItems[strItemKey]['nodata'] ? 'nodata' : ''}" style="background-image: url(images/items/${objItems[strItemKey]['url_image']})"></div>
                                    <div class="name">${objItems[strItemKey]['name']}</div>
                                </label>
                                ${createTip(strID, objItems[strItemKey], true, strID)}
                               
                            </div>`);

            if (objItems[strItemKey]['spoiler'] || objItems[strItemKey]['nodata']) {
                $divitems.append(`<div class="item spoiler_placeholder" data-cbx="${!arrObtainEasy.some(v => strDataCbx.includes(v)) ? 'Difficult to obtain' : ''} ${strDataCbx}"></div>`);
            }

            const template = $(`#tip_${strID}`)[0];
            template.style.display = 'block';
            tippy(`#label_${strID}`, {
                content: template,
                interactive: true,
                maxWidth: 370
            });
        });
    });


    $('.almanac_chb:checkbox').change(function () {
        var bolAdd = true;
        if ($(this).is(':checked')) {
            objMistriaData.almanac.add($(this).val());
        } else {
            objMistriaData.almanac.delete($(this).val());
            bolAdd = false;
        }

        updateStatistics();
        saveData();
    });

    if ($('#search_items').val() != '') {
        $('#search_items').keyup();
    }

    changeSortForObject(objMistriaData, objAlmanac, '.section', '#section_');
    checkAlmanacVisibility();
}
function loadCookingTab() {

}
function loadWoodworkingTab() {

}

function checkGiftVisibility() {
    $('#characters .character').css('display', '');
    $('#characters .character').each(function () {
        if (!$(this).find('.item:visible').length) {
            $(this).hide();
        }
    });
}

function checkMuseumVisibility() {

    $('#museum .wing .set').css('display', '');
    $('#museum .wing').css('display', '');

    $('#museum .wing .set').each(function () {
        if (!$(this).find('.item:visible').length) {
            $(this).hide();
        }
    });

    $('#museum .wing').each(function () {
        if (!$(this).find('.set:visible').length) {
            $(this).hide();
        }
    });
}

function checkAlmanacVisibility() {
    $('#almanac .section').css('display', '');
    $('#almanac .section').each(function () {
        if (!$(this).find('.item:visible').length) {
            $(this).hide();
        }
    });
}
function checkCookingVisibility() {
}
function checkWoodworkingVisibility() {
}

function updateStatistics() {

    var intItemsGiftable = 0;
    var intItemsGifted = 0;

    let sortedEntries = Object.entries(objCharacters);
    sortedEntries.forEach(([strCharacterKey, objCharacter]) => {
        if (objCharacter['spoiler'] && !objMistriaData.options.has('mode_spoilers')) {
            return;
        }

        objCharacter['loved'].forEach(function (strGiftKey) {
            strID = strCharacterKey + '_' + strGiftKey;

            if (objItems[strGiftKey]['spoiler'] && !objMistriaData.options.has('mode_spoilers')) {
                return;
            }
            intItemsGiftable++;
            if (objMistriaData.gifts.has(strID)) {
                intItemsGifted++;
            }
        });

        objCharacter['liked'].forEach(function (strGiftKey) {
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

    let sortedEntriesWings = Object.entries(objMuseum);
    sortedEntriesWings.forEach(([strWingKey, objWing]) => {
        let sortedEntriesSets = Object.entries(objWing['sets']);

        sortedEntriesSets.forEach(([strSetKey, objSet]) => {

            if (objSet['spoiler'] && !objMistriaData.options.has('mode_spoilers')) {
                return;
            }

            objSet['items'].forEach((item) => {
                if (objItems[item]['spoiler'] && !objMistriaData.options.has('mode_spoilers')) {
                    return;
                }
                intItemsDonatable++;
                if (objMistriaData.museum.has(item)) {
                    intItemsDonated++;
                }
            });
        });
    });

    var objItemsAlmanacable = {};
    var objItemsAlmanaced = {};

    let sortedEntriesSections = Object.entries(objAlmanac);
    sortedEntriesSections.forEach(([strSectionKey, objSection]) => {
        strUsedTag = objSection['tags'][0];
        objItemsAlmanacable[strSectionKey] = 0;
        objItemsAlmanaced[strSectionKey] = 0;
        objTagItems[strUsedTag].forEach((strItemKey) => {
            if (objItems[strItemKey]['spoiler'] && !objMistriaData.options.has('mode_spoilers')) {
                return;
            }

            objItemsAlmanacable[strSectionKey] = objItemsAlmanacable[strSectionKey] + 1;
            if (objMistriaData.almanac.has(strItemKey)) {

                objItemsAlmanaced[strSectionKey] = objItemsAlmanaced[strSectionKey] + 1;
            }
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

        strAlmanacedTippy += `<tr><td>${objAlmanac[strSectionKey]['name']}:</td><td>${objItemsAlmanaced[strSectionKey]} / ${intValue}</td></tr>`;

    });

    strAlmanacedTippy += '</table>';

    //  $(strAlmanacedTippy).prop('outerHTML');

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


$(function () {

    loadData();
    loadMenuItems();

    tippy('#triangle img', {
        content: 'Red bull, please?',
    });

    updateStatistics();

    loadTab(objMistriaData.tab ? objMistriaData.tab : 'gift');

    $('.tab').on('click', function () {
        loadTab($(this).attr('data-tab'));
    });

});

function loadTab(strTabKey) {
    if ($('#page').hasClass(strTabKey)) {
        return;
    }
    if (!arrTabs.includes(strTabKey)) {
        return;
    }

    let start = Date.now();

    if (!['animal', 'cooking', 'woodworking'].includes(strTabKey)) {
        $(`.tab_window.${strTabKey}_show .tab_content`).html('');
    }

    $('#page').removeClass(arrTabs.join(' '));
    $('#page').addClass(strTabKey);

    //break up execution stack
    setTimeout(() => {
        switch (strTabKey) {
            case "gift":
                loadGiftTab();
                break;
            case "museum":
                loadMuseumTab();
                break;
            case "almanac":
                loadAlmanacTab();
                break;
            case "cooking":
                loadCookingTab();
                break;
            case "woodworking":
                loadWoodworkingTab();
                break;
            case "animals":
            default:
        }

        objMistriaData.tab = strTabKey;
        saveData();

        if ($('#search_items').val() != '') {
            $('#search_items').keyup();
        }
        checkAllVisibility();

        let timeTaken = Date.now() - start;
        console.log(`Loaded ${strTabKey} tab in ${timeTaken} milliseconds`);

    }, 50);
}

function checkAllVisibility() {
    /* TODO: check only open tab visibility */
    checkGiftVisibility();
    checkMuseumVisibility();
    checkAlmanacVisibility();
    checkCookingVisibility();
    checkWoodworkingVisibility();
}