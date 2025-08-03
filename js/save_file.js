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

$(function () {
    $("#save_input").on("change", function (event) {
        let file = event.target.files[0];
        if (!file) return;

        $("#output").text("Reading file...");

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
                    $("#output").text(utf8Error.message);
                }

                // Remove unprintable characters
                let cleaned = decodedText.replaceAll(/[^\x20-\x7E]/g, "\u1337");

                if (cleaned) {
                    let jsonBlocks = extractJsonBlocksFromMixedText(cleaned);
                    let objNpcs = objNPC(jsonBlocks);
                    let objMuseumData = objMUSEUM(jsonBlocks);
                    let objOldData = JSON.parse(localStorage.getItem('mistria_data'));
                    let arrFound = [];

                    if (objOldData === null) {
                        objOldData = JSON.parse(JSON.stringify(objMistriaDataDefault));
                    }

                    if (typeof objNpcs === 'object') {

                        $("#output").text(JSON.stringify(objNpcs, null, 2));

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
                        $("#output").text("Couldn't find gift data");
                    }

                    if (typeof objMuseumData === 'object') {

                        $("#output").text($("#output").text() + '\n' + JSON.stringify(objMuseumData, null, 2));

                        let arrDonatedItems = [];
                        for (const key in objMuseumData) {
                            arrDonatedItems.push(objMuseumData[key]);
                        }

                        objOldData.museum = [...new Set(arrDonatedItems)];

                        $('#settings_json').val(JSON.stringify(objOldData, undefined, 4));


                        arrFound.push(`${arrDonatedItems.length} donated items were found `);

                    } else {
                        $("#output").text($("#output").text() + '\n' + "Couldn't find musuem data");
                    }

                    if (arrFound.length) {
                        $('#json_alert .info').html(`Data extraction was ${arrFound.length == 2 ? '' : 'partly'} succesful. Click "Save" to store changes:</br>
                            ${arrFound.join('</br>')}`
                        );
                        $('#json_alert').addClass('show').addClass('yellow');
                    }
                    else {
                        $('#json_alert .info').html('Couldn\'t retrieve data')
                        $('#json_alert').addClass('show')
                    }
                } else {
                    $("#output").text("Failed to decode file");
                }

            } catch (err) {
                $("#output").text("Failed to decode file:\n" + err);
            }
        };

        reader.readAsArrayBuffer(file);
    });
});
