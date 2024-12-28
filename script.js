$(function () {

    var arrCheckboxes = localStorage.getItem("mistria");

   

    if (arrCheckboxes === null) {
        var setCheckboxes = new Set();
    }
    else {
        arrCheckboxes = JSON.parse(arrCheckboxes);

        console.log(arrCheckboxes)
        var setCheckboxes  = new Set(arrCheckboxes);
    }


    console.log(setCheckboxes)



    arrCharacterGifts.forEach(function (objCharacter, i) {

        var $divCharacter = $("<div>", { "class": "character" });
        var $divLoved = $("<div>", { "class": "loved_gifts" });
        var $divLiked = $("<div>", { "class": "liked_gifts" });

     
        $divLoved.append('<div class="giftset">Loved</div>');
        $divLiked.append('<div class="giftset">Liked</div>');


        objCharacter['loved'].forEach(function (objGift, j) {
            $divLoved.append(`<div class="gift" title="${objGift['giftname']} - ${objGift['source']}">
                <input class="gift_chb" ${setCheckboxes.has(i + '_lo' + j) ? 'checked' : ''} type="checkbox" id="${i}_lo${j}" name="gifts" value="${i}_lo${j}">
                <label for="${i}_lo${j}">
                    <img src="images/items/${objGift['imagename']}">
                    <div class="name">${objGift['giftname']}</div>
                </label>
                </div>`)
        });

        objCharacter['liked'].forEach(function (objGift, j) {
            $divLiked.append(`<div class="gift"  title="${objGift['source']}">
                <input class="gift_chb" ${setCheckboxes.has(i + '_li' + j) ? 'checked' : ''} type="checkbox" id="${i}_li${j}" name="gifts" value="${i}_li${j}">
                <label for="${i}_li${j}">
                    <img src="images/items/${objGift['imagename']}">
                    <div class="name">${objGift['giftname']}</div>
                </label>
                </div>`)
        });



        $divCharacter.append(`<div class="char_img"><img src="images/profiles/${objCharacter['name']}.png"></div>`);
        $divCharacter.append(`<div class="char_name">${objCharacter['name']}</div>`);
        
        $divCharacter.append($divLoved);
        $divCharacter.append($divLiked);

        $("#characters").append($divCharacter);

        $('.gift_chb:checkbox').change(function () {

            if ($(this).is(':checked')) {
                setCheckboxes.add($(this).val())
            }
            else {
                setCheckboxes.delete($(this).val())
            }

            localStorage.setItem("mistria", JSON.stringify([...setCheckboxes]));
        });

    });

    // localStorage.removeItem("mistria");
});
