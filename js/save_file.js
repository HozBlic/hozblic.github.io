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
            $output.text(`Failed to parse JSON for label: ${label}`, e);
        }

        regex.lastIndex = endIdx; // Move regex search forward
    }

    return result;
}

// Recursively search for 'gifts_given' key in the object
function npcObject(obj) {
    if (obj && typeof obj === 'object') {
        if ('adeline' in obj && typeof obj['adeline'] === 'object' && 'gifts_given' in obj['adeline']) {
            return obj;
        }
        for (const key in obj) {
            if (npcObject(obj[key])) {
                return obj[key];
            }
        }
    }
    return false;
}

$(function () {
    $("#save_input").on("change", function (event) {
        var file = event.target.files[0];
        if (!file) return;

        var $output = $("#output");
        $output.text("Reading file...");

        var reader = new FileReader();
        reader.onload = function (e) {
            try {
                var arrayBuffer = e.target.result;
                var byteArray = new Uint8Array(arrayBuffer);

                // Try to decompress
                var inflated = pako.inflate(byteArray);

                // Decode as UTF-8 first
                var decodedText;
                try {
                    decodedText = new TextDecoder("utf-8", { fatal: false }).decode(inflated);
                } catch (utf8Error) {
                    // Fallback to Latin-1
                    decodedText = new TextDecoder("iso-8859-1").decode(inflated);
                }

                // Remove unprintable characters (except \n and \t)
                var cleaned = decodedText.replace(/[^\x20-\x7E\n\t]/g, "");

                if (cleaned) {
                    var jsonBlocks = extractJsonBlocksFromMixedText(cleaned);

                    var objNpcs = npcObject(jsonBlocks);

                    if (typeof objNpcs === 'object') {

                        $output.text(JSON.stringify(objNpcs, null, 2));

                        var arrGivenGifts = [];
                        for (const [npcname, value] of Object.entries(objNpcs)) {
                            for (const [key, value] of Object.entries(objNpcs[npcname]['gifts_given'])) {
                                arrGivenGifts.push(`${npcname}_${value}`);
                            }
                        }

                        var objOldData = JSON.parse(localStorage.getItem('mistria_data'));

                        if (objOldData === null) {
                            objOldData = JSON.parse(JSON.stringify(objMistriaDataDefault));
                        }
                        objOldData.gifts = [...new Set(arrGivenGifts)];

                        $('#settings_json').val(JSON.stringify(objOldData, undefined, 4));

                        $('#json_alert').addClass('show').addClass('yellow');
                        $('#json_alert .info').html(`Data extraction was succesful. ${arrGivenGifts.length} gifts were found </br>
                            Click "Save" to store changes`
                        );

                    } else {
                        $output.text("Couldn't find gift data");
                    }
                } else {
                    $output.text("Failed to decode file");
                }

            } catch (err) {
                $output.text("Failed to decode file:\n" + err);
            }
        };

        reader.readAsArrayBuffer(file);
    });
});
