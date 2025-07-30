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


$('.gift').each(function () {
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
        strDataCbx = $($.parseHTML(objGifts[strGiftKey]['source'])).text().trim();

        $objParent.append(`<div class="gift ${objGifts[strGiftKey]['spoiler'] || objGifts[strGiftKey]['nodata'] ? 'spoiler' : ''}" data-cbx="${!arrObtainEasy.some(v => strDataCbx.includes(v)) ? 'Difficult to obtain' : ''} ${strDataCbx}">
                                <input class="gift_chb" ${objMistriaData.gifts.has(strID) ? 'checked' : ''} type="checkbox" id="${strID}" name="gifts" value="${strID}">
                                <label for="${strID}" class="has_tip" id="label_${strID}">
                                    <div class="image ${objGifts[strGiftKey]['imageName'] == '' && objGifts[strGiftKey]['nodata'] ? 'nodata' : ''}" style="background-image: url(images/items/${objGifts[strGiftKey]['imageName']})"></div>
                                    <div class="name">${objGifts[strGiftKey]['giftName']}</div>
                                </label>
                                <div id="tip_${strID}" class="tip_wrap">
                                    <div class="tip">
                                        <a target="_blank" href="https://fieldsofmistria.wiki.gg/wiki/${objGifts[strGiftKey]['giftLink']}" class="tip_name">${objGifts[strGiftKey]['giftName']}</a>
                                        <div class="tip_info"><div>${objGifts[strGiftKey]['source']}</div></div>
                                        ${objGifts[strGiftKey]['nodata'] ? 'No data available' : ''}
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

    let sortedEntries = Object.entries(objCharacters);
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
    var objOldData = JSON.parse(localStorage.getItem('mistria_data')) || {};

    // remove duplicates
    objOldData.gifts = [...new Set(objOldData.gifts)];
    objNewData.gifts = [...new Set(objNewData.gifts)];
    objOldData.options = [...new Set(objOldData.options)];
    objNewData.options = [...new Set(objNewData.options)];

    // Compare old and new data
    const intOldGiftCount = Array.isArray(objOldData.gifts) ? objOldData.gifts.length : 0;
    const intNewGiftCount = Array.isArray(objNewData.gifts) ? objNewData.gifts.length : 0;
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
        objMistriaData = {
            gifts: new Set(),
            options: new Set()
        };
        objMistriaData.options.add('mode_dark');
        $('#settings_json').val(JSON.stringify(objMistriaData, undefined, 4));
    } else {
        $('#settings_json').val(JSON.stringify(objMistriaData, undefined, 4));
        objMistriaData.gifts = ('gifts' in objMistriaData ? new Set(objMistriaData.gifts) : new Set());
        objMistriaData.options = ('options' in objMistriaData ? new Set(objMistriaData.options) : new Set());
    }
}

function saveData() {
    // convert to array since JSON.stringify does not work on sets
    if ('gifts' in objMistriaData) {
        objMistriaData.gifts = [...objMistriaData.gifts];
    }
    if ('options' in objMistriaData) {
        objMistriaData.options = [...objMistriaData.options];
    }

    localStorage.setItem('mistria_data', JSON.stringify(objMistriaData));
    loadData();
}

function openJsonPopup() {
    $('#json_alert').removeClass('show').removeClass('green').removeClass('yellow');
    $('#json_button_popup').show();
}


$(function () {

    loadData();

    tippy('#triangle img', {
        content: 'Red bull, please?',
    });

    tippy('#older_browsers', {
        content: 'Does not work in older browsers',
    });

    arrObtain.forEach(function (strObtain, i) {
        if (strObtain === 'spacing') {
            $('#checkbox_filter_items').append(`<div class="spacing"></div>`)
        } else {
            $('#checkbox_filter_items').append(`<input value="${strObtain}" type='checkbox' class="styled obtain_cbx" id="chb_${i}"></input>
                <label for="chb_${i}">${strObtain}</label>`);
        }

    });

    $(document).on('click', function (e) {
        var jqTarget = $(e.target);

        if (
            jqTarget.parents('#sort_button').length == 0 &&
            jqTarget.attr('id') != 'sort_button'
        ) {
            $('#sort_button').parent().removeClass('open');
        }
    });

    $('#settings_json').on('input change', function () {
        $('#json_alert').removeClass('show').removeClass('green').removeClass('yellow');
    });

    $('.dropdown-item.sort').removeClass('selected');
    $(`.dropdown-item.sort[data-value="${objMistriaData.sort ? objMistriaData.sort : 'default'}"]`).addClass('selected');

    $('input.obtain_cbx').change(function () {
        $('#characters .character').css('display', '');
        $('.hide_checkbox').removeClass('hide_checkbox');

        if ($('input.obtain_cbx:checked').length) {
            var arrCheckedObtain = [];
            $('input.obtain_cbx:checked').each(function () {
                arrCheckedObtain.push(this.value)
            });

            $('.gift').each(function () {
                var strObtainAll = $(this).attr('data-cbx');
                if (!arrCheckedObtain.some(v => strObtainAll.includes(v))) {
                    $(this).addClass('hide_checkbox');
                }
            });
        }

        $('#characters .character').each(function () {
            if (!$(this).find('.gift:visible').length) {
                $(this).hide()
            }
        });
    });

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

            if (strMode === 'mode_spoilers') {
                $('#characters .character').each(function () {
                    $(this).css('display', '');
                    if (!$(this).find('.gift:visible').length) {
                        $(this).hide()
                    }
                });
            }
        });


    })

    objMistriaData.options.forEach(key => {
        $(`#${key}`).prop('checked', true);
        $('#page').addClass(key);
    })

    $('#search_items').on('keyup', function () {
        $('#characters').removeHighlight();
        $('#characters .character').removeClass('hide_search');
        $('#characters .character').css('display', '');
        var value = $(this).val().toLowerCase();

        $('#characters .gift').filter(function () {
            if ($(this).text().toLowerCase().indexOf(value) > -1) {
                $(this).removeClass('hide_search');
            } else {
                $(this).addClass('hide_search');
            }
        });

        $('#characters').highlight(value);


        $('#characters .character').each(function () {
            if (value !== '') {
                if ($(this).find('.char_name').html().includes('highlight')) {
                    $(this).find('.gift').removeClass('hide_search');
                }
            }

            if (!$(this).find('.gift:visible').length) {
                $(this).hide()
            }
        });

    });

    if ($('#search_items').val() != '') {
        $('#search_items').keyup();
    }

    $('#characters .character').each(function () {
        if (!$(this).find('.gift:visible').length) {
            $(this).hide()
        }
    });
});