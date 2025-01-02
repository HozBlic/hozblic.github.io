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


$('.gift').each(function () {
    var strObtainAll = $(this).attr('data-cbx');
    if (arrObtainEasy.some(v => strObtainAll.includes(v))) {
        $(this).addClass('hide_checkbox');
    }
});

var arrCheckboxes = localStorage.getItem("mistria");
if (arrCheckboxes === null) {
    var setCheckboxes = new Set();
} else {
    arrCheckboxes = JSON.parse(arrCheckboxes);
    var setCheckboxes = new Set(arrCheckboxes);
}

var arrOptions = localStorage.getItem("mistria_options");
if (arrOptions === null) {
    var setOptions = new Set();
} else {
    arrOptions = JSON.parse(arrOptions);
    var setOptions = new Set(arrOptions);
}

function createGiftItem(arrGifts, strAbbrv, $objParent, i) {
    arrGifts.forEach(function (objGift, j) {
        strID = i + '_' + strAbbrv + j;
        strDataCbx = $($.parseHTML(objGift['source'])).text().trim();

        $objParent.append(`<div class="gift" data-cbx="${!arrObtainEasy.some(v => strDataCbx.includes(v)) ? 'Difficult to obtain' : ''} ${strDataCbx}">
                                <input class="gift_chb" ${setCheckboxes.has(strID) ? 'checked' : ''} type="checkbox" id="${strID}" name="gifts" value="${strID}">
                                <label for="${strID}" class="has_tip" id="label_${strID}">
                                    <img src="images/items/${objGift['imagename']}">
                                    <div class="name">${objGift['giftname']}</div>
                                </label>
                                <div id="tip_${strID}" class="tip_wrap">
                                    <div class="tip">
                                        <a target="_blank" href="${objGift['giftlink']}" class="tip_name">${objGift['giftname']}</a>
                                        <div class="tip_info">${objGift['source']}</div>
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

$(function () {

    tippy("#triangle img", {
        content: "Red bull, please?",
    });

    tippy("#older_browsers", {
        content: "Does not work in older browsers",
    });

    arrObtain.forEach(function (strObtain, i) {
        if (strObtain === 'spacing') {
            $('#checkbox_filter_items').append(`<div class="spacing"></div>`)
        } else {
            $('#checkbox_filter_items').append(`<input value="${strObtain}" type='checkbox' class="styled obtain_cbx" id="chb_${i}"></input>
                <label for="chb_${i}">${strObtain}</label>`);
        }

    });

    $('input.obtain_cbx').change(function () {
        $('#characters .character').show();
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

    arrCharacterGifts.forEach(function (objCharacter, i) {
        var $divCharacter = $("<div>", { "class": "character" });

        $divCharacter.append(`  <div class="char_img"><img src="images/profiles/${objCharacter['name']}.png"></div>
                                <div class="char_name">${objCharacter['name']}</div>`);
        $("#characters").append($divCharacter);

        var $divLoved = $("<div>", { "class": "loved_gifts" });
        $divLoved.append('<div class="giftset">Loved</div>');
        $divCharacter.append($divLoved);
        createGiftItem(objCharacter['loved'], 'lo', $divLoved, i)

        var $divLiked = $("<div>", { "class": "liked_gifts" });
        $divLiked.append('<div class="giftset">Liked</div>');
        $divCharacter.append($divLiked);
        createGiftItem(objCharacter['liked'], 'li', $divLiked, i)
    });

    $('.gift_chb:checkbox').change(function () {
        if ($(this).is(':checked')) {
            setCheckboxes.add($(this).val())
        } else {
            setCheckboxes.delete($(this).val())
        }
        localStorage.setItem("mistria", JSON.stringify([...setCheckboxes]));
    });

    setOptions.forEach(key => {
        $(`#${key}`).prop("checked", true);
        $("#page").addClass(key);
    })

    var arrModes = ['mode_dark', 'mode_name', 'mode_gift', 'mode_expand', 'mode_chbexpand'];
    arrModes.forEach(function (strMode) {
        $(`#${strMode}`).change(function () {
            if ($(this).is(':checked')) {
                $('#page').addClass(strMode);
                setOptions.add(strMode);
            } else {
                $('#page').removeClass(strMode);
                setOptions.delete(strMode);
            }
            localStorage.setItem("mistria_options", JSON.stringify([...setOptions]));
        });
    })


    $("#search_items").on("keyup", function () {
        $('#characters').removeHighlight();
        $('#characters .character').removeClass('hide_search');
        $('#characters .character').show();
        var value = $(this).val().toLowerCase();

        $("#characters .gift").filter(function () {
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

    $('#characters .character').each(function () {
        if (!$(this).find('.gift:visible').length) {
            $(this).hide()
        }
    });
});