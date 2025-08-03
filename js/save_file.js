function extractJsonBlocksFromMixedText(input) {
    const result = {};
    const regex = /([a-zA-Z0-9_]+)\s*({)/g;

    let match;
    let lastIndex = 0;

    while ((match = regex.exec(input)) !== null) {
        const label = match[1];
        const startIdx = match.index + label.length;
        const jsonStart = input.indexOf('{', startIdx);

        // Find the full JSON object using brace counting
        let braceCount = 0;
        let endIdx = jsonStart;

        while (endIdx < input.length) {
            const char = input[endIdx];
            if (char === '{') braceCount++;
            else if (char === '}') braceCount--;

            endIdx++;

            if (braceCount === 0) break;
        }

        const jsonString = input.slice(jsonStart, endIdx);
        try {
            result[label] = JSON.parse(jsonString);
        } catch (e) {
            $("#output").text(`Failed to parse JSON for label: ${label}`, e);
        }

        regex.lastIndex = endIdx; // Move regex search forward
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
                    decodedText = new TextDecoder("utf-8", { fatal: false }).decode(inflated);
                } catch (utf8Error) {
                    // Fallback to Latin-1
                    decodedText = new TextDecoder("iso-8859-1").decode(inflated);
                }

                // Remove unprintable characters (except \n and \t)
                let cleaned = decodedText.replace(/[^\x20-\x7E\n\t]/g, "");

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
                            for (const [key, value] of Object.entries(objNpcs[npcname]['gifts_given'])) {
                                arrGivenGifts.push(`${npcname}_${value}`);
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
