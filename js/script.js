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

var objMistriaData;
var objMistriaDataDefault = {
    gifts: [],
    museum: [],
    options: ['mode_dark']
};

var objTabs = {
    'gift': false,
    'museum': false,
    'animal': false
}

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

function createGiftItem(arrGifts, strCharacterKey, $objParent) {
    arrGifts.forEach(function (strGiftKey) {
        strID = strCharacterKey + '_' + strGiftKey;
        strDataCbx = $($.parseHTML(objItems[strGiftKey]['source'])).text().trim();

        $objParent.append(`<div class="item ${objItems[strGiftKey]['spoiler'] || objItems[strGiftKey]['nodata'] ? 'spoiler' : ''}" data-cbx="${!arrObtainEasy.some(v => strDataCbx.includes(v)) ? 'Difficult to obtain' : ''} ${strDataCbx}">
                                <input class="gift_chb" ${objMistriaData.gifts.has(strID) ? 'checked' : ''} type="checkbox" id="${strID}" name="gifts" value="${strID}">
                                <label for="${strID}" class="has_tip" id="label_${strID}">
                                    <div class="image ${objItems[strGiftKey]['imageName'] == '' && objItems[strGiftKey]['nodata'] ? 'nodata' : ''}" style="background-image: url(images/items/${objItems[strGiftKey]['imageName']})"></div>
                                    <div class="name">${objItems[strGiftKey]['name']}</div>
                                </label>
                                <div id="tip_${strID}" class="tip_wrap">
                                    <div class="tip">
                                        <a target="_blank" href="https://fieldsofmistria.wiki.gg/wiki/${objItems[strGiftKey]['link']}" class="tip_name">${objItems[strGiftKey]['name']}</a>
                                        <div class="tip_info"><div>${objItems[strGiftKey]['source']}</div></div>
                                        ${objItems[strGiftKey]['nodata'] ? 'No data available' : ''}
                                    </div>
                                </div>
                            </div>`);

        $(`#tip_${strID} .no-wrap`).each(function () {
            $(this).html($(this).html().replaceAll(',', 'comma'))
        });
        $(`#tip_${strID}`).html($(`#tip_${strID}`).html().replaceAll(',', '<br>'))
        $(`#tip_${strID} .no-wrap`).each(function () {
            $(this).html($(this).html().replaceAll('comma', ','))
        });

        const template = $(`#tip_${strID}`)[0];
        template.style.display = 'block';
        tippy(`#label_${strID}`, {
            content: template,
            interactive: true,
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

    $('.character').css('order', '');

    var sortedEntries = Object.entries(objCharacters);
    if (objMistriaData.sort === 'az') {
        sortedEntries.sort((a, b) => a[1].name.localeCompare(b[1].name));
    } else if (objMistriaData.sort === 'za') {
        sortedEntries.sort((a, b) => b[1].name.localeCompare(a[1].name));
    }

    var intIndex = 0;

    sortedEntries.forEach(([strCharacterKey, objCharacter]) => {
        $divCharacter = $(`#character_${strCharacterKey}`);

        if (!('sort' in objMistriaData)) {
            if (strCharacterKey in objCharOrder) {
                $divCharacter.css('order', objCharOrder[strCharacterKey]);
            }
            else {
                $divCharacter.css('order', 99);
            }
        }
        else {
            $divCharacter.css('order', intIndex);
            intIndex++;
        }
    });


    var sortedEntriesWings = Object.entries(objMuseum);
    if (objMistriaData.sort === 'az') {
        sortedEntriesWings.sort((a, b) => a[1].name.localeCompare(b[1].name));
    } else if (objMistriaData.sort === 'za') {
        sortedEntriesWings.sort((a, b) => b[1].name.localeCompare(a[1].name));
    }

    var intIndex = 0;

    sortedEntriesWings.forEach(([strWingKey, objWing]) => {

        $divWing = $(`#wing_${strWingKey}`);

        if (!('sort' in objMistriaData)) {
            $divWing.css('order', '');
        }
        else {
            $divWing.css('order', intIndex);
            intIndex++;
        }

        var sortedEntriesSets = Object.entries(objWing['sets']);
        if (objMistriaData.sort === 'az') {
            sortedEntriesSets.sort((a, b) => a[1].name.localeCompare(b[1].name));
        } else if (objMistriaData.sort === 'za') {
            sortedEntriesSets.sort((a, b) => b[1].name.localeCompare(a[1].name));
        }

        var intIndexInner = 0;
        sortedEntriesSets.forEach(([strSetKey, objSet]) => {
            $divSet = $(`#set_${strWingKey}_${strSetKey}`);

            if (!('sort' in objMistriaData)) {
                $divSet.css('order', '');
            }
            else {
                $divSet.css('order', intIndexInner);
                intIndexInner++;
            }
        });
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

    // remove duplicates
    objOldData.gifts = [...new Set(objOldData.gifts)];
    objNewData.gifts = [...new Set(objNewData.gifts)];
    objOldData.museum = [...new Set(objOldData.museum)];
    objNewData.museum = [...new Set(objNewData.museum)];
    objOldData.options = [...new Set(objOldData.options)];
    objNewData.options = [...new Set(objNewData.options)];

    // Compare old and new data
    const intOldGiftCount = Array.isArray(objOldData.gifts) ? objOldData.gifts.length : 0;
    const intNewGiftCount = Array.isArray(objNewData.gifts) ? objNewData.gifts.length : 0;
    const intOldMuseumCount = Array.isArray(objOldData.museum) ? objOldData.museum.length : 0;
    const intNewMuseumCount = Array.isArray(objNewData.museum) ? objNewData.museum.length : 0;
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
        $('#characters .character').css('display', '');
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

        checkGiftVisibility();
    });

    $('#search_items').on('keyup', function () {
        $('#page').removeHighlight();
        $('.hide_search').removeClass('hide_search');

        $('#characters .character').css('display', '');
        $('#museum .wing').css('display', '');
        $('#museum .set').css('display', '');

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
                $('#page').highlight(word);
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

        checkGiftVisibility();
        checkMuseumVisibility();
    });

    var arrModes = ['mode_dark', 'mode_name', 'mode_gift', 'mode_collapse', 'mode_chbexpand', 'mode_spoilers', 'mode_mini'];
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
                checkGiftVisibility();
                checkMuseumVisibility();
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
    if (objTabs.gift) {
        if ($('#search_items').val() != '') {
            $('#search_items').keyup();
        }
        return;
    }
    objTabs.gift = true;
    let sortedEntries = Object.entries(objCharacters);
    if (objMistriaData.sort === 'az') {
        sortedEntries.sort((a, b) => a[1].name.localeCompare(b[1].name));
    } else if (objMistriaData.sort === 'za') {
        sortedEntries.sort((a, b) => b[1].name.localeCompare(a[1].name));
    }

    sortedEntries.forEach(([strCharacterKey, objCharacter]) => {
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
        saveData();
    });

    if ($('#search_items').val() != '') {
        $('#search_items').keyup();
    }

    checkGiftVisibility();
}

function loadMuseumTab() {
    if (objTabs.museum) {
        if ($('#search_items').val() != '') {
            $('#search_items').keyup();
        }
        return;
    }
    objTabs.museum = true;
    let sortedEntriesWings = Object.entries(objMuseum);
    if (objMistriaData.sort === 'az') {
        sortedEntriesWings.sort((a, b) => a[1].name.localeCompare(b[1].name));
    } else if (objMistriaData.sort === 'za') {
        sortedEntriesWings.sort((a, b) => b[1].name.localeCompare(a[1].name));
    }

    sortedEntriesWings.forEach(([strWingKey, objWing]) => {

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

            var strCleanedName = objSet['name']
                .replace('Artifact Set', '')
                .replace('Fish Set', '')
                .replace('Material Set', '')
                .replace('Flower Set', '')
                .replace('Forage Set', '')
                .replace('Crop Set', '')
                .replace('Insect Set', '')
                .replace('Set', '')

            var strLinkHash = strCleanedName.trim().replaceAll(' ', '_');;

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
                strDataCbx = $($.parseHTML(objItems[item]['source'])).text().trim();

                $divitems.append(`<div class="item ${objItems[item]['spoiler'] || objItems[item]['nodata'] ? 'spoiler' : ''}" data-cbx="${!arrObtainEasy.some(v => strDataCbx.includes(v)) ? 'Difficult to obtain' : ''} ${strDataCbx}">
                                <input class="museum_chb" ${objMistriaData.museum.has(strID) ? 'checked' : ''} type="checkbox" id="${strID}" name="museum" value="${strID}">
                                <label for="${strID}" class="has_tip" id="label_${strID}">
                                    <div class="image ${objItems[item]['imageName'] == '' && objItems[item]['nodata'] ? 'nodata' : ''}" style="background-image: url(images/items/${objItems[item]['imageName']})"></div>
                                    <div class="name">${objItems[item]['name']}</div>
                                </label>
                                <div id="tip_${strID}" class="tip_wrap">
                                    <div class="tip">
                                        <a target="_blank" href="https://fieldsofmistria.wiki.gg/wiki/${objItems[item]['link']}" class="tip_name">${objItems[item]['name']}</a>
                                        <div class="tip_info"><div>${objItems[item]['source']}</div></div>
                                        ${objItems[item]['nodata'] ? 'No data available' : ''}
                                    </div>
                                </div>
                            </div>`);

                $(`#tip_${strID} .no-wrap`).each(function () {
                    $(this).html($(this).html().replaceAll(',', 'comma'))
                });
                $(`#tip_${strID}`).html($(`#tip_${strID}`).html().replaceAll(',', '<br>'))
                $(`#tip_${strID} .no-wrap`).each(function () {
                    $(this).html($(this).html().replaceAll('comma', ','))
                });

                const template = $(`#tip_${strID}`)[0];
                template.style.display = 'block';
                tippy(`#label_${strID}`, {
                    content: template,
                    interactive: true,
                });
            });
        });
    });

    $('.museum_chb:checkbox').change(function () {
        if ($(this).is(':checked')) {
            objMistriaData.museum.add($(this).val())
        } else {
            objMistriaData.museum.delete($(this).val())
        }
        saveData();
    });

    if ($('#search_items').val() != '') {
        $('#search_items').keyup();
    }

    checkMuseumVisibility();
}
function checkGiftVisibility() {
    $('#characters .character').each(function () {
        $(this).css('display', '');
        if (!$(this).find('.item:visible').length) {
            $(this).hide()
        }
    });
}

function checkMuseumVisibility() {
    $('#museum .wing .set').each(function () {
        $(this).css('display', '');
        if (!$(this).find('.item:visible').length) {
            $(this).hide()
        }
    });

    $('#museum .wing').each(function () {
        $(this).css('display', '');
        if (!$(this).find('.set:visible').length) {
            $(this).hide()
        }
    });
}


$(function () {
    loadData();
    loadMenuItems();

    tippy('#triangle img', {
        content: 'Red bull, please?',
    });

    var strTabKey = objMistriaData.tab ? objMistriaData.tab : 'gift';
    $('#page').addClass(strTabKey)

    switch (strTabKey) {
        case "gift":
            loadGiftTab();
            checkGiftVisibility();
            break;
        case "museum":
            loadMuseumTab();
            checkMuseumVisibility();
            break;
        case "animals":

        default:
    }

    $('.tab').on('click', function () {
        var strTabKey = $(this).attr('data-tab')

        $('#page').removeClass(Object.keys(objTabs).join(' '))
        $('#page').addClass(strTabKey)

        switch (strTabKey) {
            case "gift":
                loadGiftTab();
                checkGiftVisibility();
                break;
            case "museum":
                loadMuseumTab();
                checkMuseumVisibility();
                break;
            case "animals":
            default:
        }

        objMistriaData.tab = strTabKey;
        saveData();
    });
});