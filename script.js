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


$('.gift').each(function () {
    var strObtainAll = $(this).attr('data-cbx');
    if (arrObtainEasy.some(v => strObtainAll.includes(v))) {
        $(this).addClass('hide_checkbox');
    }
});

//get rid of old checkbox system
var arrOldCheckboxes = localStorage.getItem('mistria');
if (arrOldCheckboxes !== null) {
    arrOldCheckboxes = JSON.parse(arrOldCheckboxes);
    var setOldCheckboxes = new Set(arrOldCheckboxes);
    var setCheckboxes = new Set();

    setOldCheckboxes.forEach(function (strID) {
        setCheckboxes.add(objOldIDs[strID]);
    });

    localStorage.setItem('mistria_chb', JSON.stringify([...setCheckboxes]));
    localStorage.removeItem('mistria');
}

var arrCheckboxes = localStorage.getItem('mistria_chb');
if (arrCheckboxes === null) {
    var setCheckboxes = new Set();
} else {
    arrCheckboxes = JSON.parse(arrCheckboxes);
    var setCheckboxes = new Set(arrCheckboxes);
}

var arrOptions = localStorage.getItem('mistria_options');
if (arrOptions === null) {
    var setOptions = new Set();
} else {
    arrOptions = JSON.parse(arrOptions);
    var setOptions = new Set(arrOptions);
}

var strSort = localStorage.getItem('mistria_sort');

function createGiftItem(arrGifts, strCharacterKey, $objParent) {
    arrGifts.forEach(function (strGiftKey) {
        strID = strCharacterKey + '_' + strGiftKey;
        strDataCbx = $($.parseHTML(objGifts[strGiftKey]['source'])).text().trim();

        $objParent.append(`<div class="gift ${objGifts[strGiftKey]['spoiler'] || objGifts[strGiftKey]['nodata'] ? 'spoiler' : ''}" data-cbx="${!arrObtainEasy.some(v => strDataCbx.includes(v)) ? 'Difficult to obtain' : ''} ${strDataCbx}">
                                <input class="gift_chb" ${setCheckboxes.has(strID) ? 'checked' : ''} type="checkbox" id="${strID}" name="gifts" value="${strID}">
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

    strSort = $(objElem).attr('data-value');

    if (strSort !== 'default') {
        localStorage.setItem('mistria_sort', strSort);
    }
    else {
        localStorage.removeItem('mistria_sort');
        strSort = null;
    }

    $('.dropdown-item.sort').removeClass('selected');
    $(`.dropdown-item.sort[data-value="${strSort ? strSort : 'default'}"]`).addClass('selected');

    $('.character').css('order', '');

    let sortedEntries = Object.entries(objCharacters);
    if (strSort === 'az') {
        sortedEntries.sort((a, b) => a[1].name.localeCompare(b[1].name));
    } else if (strSort === 'za') {
        sortedEntries.sort((a, b) => b[1].name.localeCompare(a[1].name));
    }

    var intIndex = 0;

    sortedEntries.forEach(([strCharacterKey, objCharacter]) => {
        $divCharacter = $(`#character_${strCharacterKey}`);

        if (strSort === null) {
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

$(function () {

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

    $('.dropdown-item.sort').removeClass('selected');
    $(`.dropdown-item.sort[data-value="${strSort ? strSort : 'default'}"]`).addClass('selected');

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
    if (strSort === 'az') {
        sortedEntries.sort((a, b) => a[1].name.localeCompare(b[1].name));
    } else if (strSort === 'za') {
        sortedEntries.sort((a, b) => b[1].name.localeCompare(a[1].name));
    }

    sortedEntries.forEach(([strCharacterKey, objCharacter]) => {
        var $divCharacter = $('<div>', { 'class': 'character', 'id': `character_${strCharacterKey}` });

        if (objCharacter['spoiler']) {
            $divCharacter.addClass('spoiler');
        }

        if (strSort === null) {
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
            setCheckboxes.add($(this).val())
        } else {
            setCheckboxes.delete($(this).val())
        }
        localStorage.setItem('mistria_chb', JSON.stringify([...setCheckboxes]));
    });

    var arrModes = ['mode_dark', 'mode_name', 'mode_gift', 'mode_collapse', 'mode_chbexpand', 'mode_spoilers', 'mode_mini'];
    arrModes.forEach(function (strMode) {
        $(`#${strMode}`).prop('checked', false);
        $(`#${strMode}`).change(function () {
            if ($(this).is(':checked')) {
                $('#page').addClass(strMode);
                setOptions.add(strMode);
            } else {
                $('#page').removeClass(strMode);
                setOptions.delete(strMode);
            }
            localStorage.setItem('mistria_options', JSON.stringify([...setOptions]));

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

    setOptions.forEach(key => {
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