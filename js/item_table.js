let objDataTable;
const intSpoilerColumn = 4;

const arrPageLengthOptions = [
    { value: 50, label: '50' },
    { value: 100, label: '100' },
    { value: 500, label: '500' },
    { value: 1000, label: '1000' },
    { value: -1, label: 'All' },
];

function loadMenuItems() {

    $('#side_menu #title .version').text(`v${objBuild.version}`);

    var arrModes = ['mode_dark', 'mode_stars', 'mode_name', 'mode_gift', 'mode_collapse', 'mode_chbexpand', 'mode_spoilers', 'mode_lategame', 'mode_mini', 'mode_disable_tooltip', 'mode_mini_tooltip'];
    arrModes.forEach(function (strMode) {
        $(`#${strMode}`).prop('checked', false);
        $(`#${strMode}`).change(function () {
            let bolChecked = $(this).is(':checked');
            if (bolChecked) {
                $('#page').addClass(strMode);
                objMistriaData.options.add(strMode);
            } else {
                $('#page').removeClass(strMode);
                objMistriaData.options.delete(strMode);
            }

            if (strMode === 'mode_spoilers') {
                updateTableSpoilers();
            }
            saveData();
        });
    })

    objMistriaData.options.forEach(key => {
        $(`#${key}`).prop('checked', true);
        $('#page').addClass(key);
    })

    //hide dropdowns on outside click
    $(document).on('click', function (e) {
        var jqTarget = $(e.target).closest('.dropdown_wrap');

        if (jqTarget.length === 0) {
            $('.dropdown_wrap').removeClass('open');
        } else {
            $('.dropdown_wrap').not(jqTarget).removeClass('open');
            $(jqTarget).toggleClass('open');
        }
    });

    tippy('#sparkle', {
        content: 'Serves no purpose, just thought it was cute',
    });
    tippy('#unreleased_content', {
        content: `<p class="save_file">Content obtained via datamining, has not been implemented in the game yet</p>
                  <p class="save_file">Can also contain released content from latest update (if it has no information in Wiki yet)</p>`,
        allowHTML: true,
    });
}

function loadTable() {
    loadTableData();

    const $table = $(`
        <table  class="display">
            <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Tooltip</th>
                <th>Tip</th>
                <th>Spoiler</th>
                ${Object.entries(objTips).map(([strTipKey, strTipValue]) => `<th>${strTipValue}</th>`).join('')}
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    `);

    const $tbody = $table.find("tbody");

    Object.entries(objItems).forEach(([strItemKey, objItem]) => {
        const $row = $("<tr>").addClass('bigtable_row');

        $row.append($("<td>").html(`<div class="table_image" style="background-image: url(../images/items/${strItemKey}.png)"></div>`));

        let strNameLinkHTML = objItem['name'];
        if ('url' in objItem) {
            strNameLinkHTML = `<a target="_blank" href="https://fieldsofmistria.wiki.gg${objItem['url']}">${objItem['name']}</a>`;
        }
        $row.append($("<td>").html(`<div class="table_item_name"><span>${strNameLinkHTML}</span></div>`));

        if ('tip' in objItem || 'tip_extra' in objItem) {
            const strTipHTML = createTip(strItemKey, strItemKey, 'table')
            const strTipBoxHTML = `
            <div data-tippy-root>
                <div class="tippy-box" style="max-width: 370px;">
                    <div class="tippy-content"><div class="tip_wrap" style="display: block;">
                        <div class="tip">
                            ${strTipHTML}
                        </div>
                    </div>
                </div>
            </div>`;

            $row.append($("<td>").html(strTipBoxHTML));
        } else {
            $row.append($("<td>"));
        }

        if ('tip' in objItem) {
            $row.append($("<td>").html(`<div class="tip_info">${objItem['tip'].replaceAll('src="images/', 'src="../images/')}</div>`));
        } else {
            $row.append($("<td>"));
        }
        if ('spoiler' in objItem) {
            $row.addClass('spoiler_row');
            $row.append($("<td>").html('<div class="table_hidden">spoiler</div>Yes'));
        } else {
            $row.append($("<td>"));
        }

        if ('tip_extra' in objItem) {
            Object.entries(objTips).forEach(([strTipKey, strTipValue]) => {
                if (strTipKey in objItem['tip_extra']) {
                    if (strTipKey == 'ingredients') {
                        let strTableHTML = '<table>';
                        strTableHTML += `<tr><td>`;
                        objItem['tip_extra'][strTipKey].forEach(function (objItem, index) {
                            if ('item' in objItem) {
                                intCount = objItem['count'];
                                strItemKeyTemp = objItem['item'];
                                strItemName = objItems[strItemKeyTemp]['name'];
                                strItemUrl = objItems[strItemKeyTemp]['url'];
                                strTableHTML += `<a href="https://fieldsofmistria.wiki.gg${strItemUrl}" title="${strItemName}"><img alt="${strItemName}.png" src="../images/items/${strItemKeyTemp}.png"></a><a href="https://fieldsofmistria.wiki.gg${strItemUrl}" title="${strItemName}">${strItemName}</a> (${intCount})<br>`;
                            }
                        });
                        strTableHTML = strTableHTML.substring(0, strTableHTML.length - 4); // remove last <br>
                        strTableHTML += `</td></tr>`;
                        strTableHTML += `</table>`;
                        strTableHTML = strTableHTML.replaceAll('src="images/', 'src="../images/')
                        $row.append($("<td>").html(strTableHTML));

                        return;
                    }
                    if (strTipKey == 'fishable') {
                        $row.append($("<td>").html('<div class="table_hidden">fishing pole</div>' + objItem['tip_extra'][strTipKey].replaceAll('src="images/', 'src="../images/')));
                        return;
                    }
                    if (strTipKey == 'diveable') {
                        $row.append($("<td>").html('<div class="table_hidden">divable</div>' + objItem['tip_extra'][strTipKey].replaceAll('src="images/', 'src="../images/')));
                        return;
                    }
                    $row.append($("<td>").html(objItem['tip_extra'][strTipKey].replaceAll('src="images/', 'src="../images/')));

                } else {
                    $row.append($("<td>"));
                }
            });
        } else {
            Object.entries(objTips).forEach(([strTipKey, strTipValue]) => {
                $row.append($("<td>"));
            });
        }

        $tbody.append($row);
    });

    $("#table").append($table);

    objDataTable = $('#table > table').DataTable({
        scrollY: 'calc(100dvh - 50px - 8px - 50px - 75px )',
        scrollX: true,
        scrollCollapse: true,
        pageLength: getPageLength(),
        autoWidth: false,
        layout: {
            topStart: null,
            topEnd: null
        },
        language: {
            info: "#_START_ to #_END_ (_TOTAL_ total)",
            infoFiltered: '[hiding spoilers]'
        },
        columnDefs: [
            { width: "80px", targets: 0 }, // image
            { width: "150px", targets: 1 }, // name
            { width: "270px", targets: 2 }, // tooltip
            { width: "200px", targets: 3 }, // tip
            { width: "150px", targets: 7 }, // recipe source
            { width: "150px", targets: 8 }, // ingredients
            { width: "90px", targets: "_all" },
        ]
    });

    const table = objDataTable;

    $('#table table').on('page.dt', function () { $('.dt-scroll-body').animate({ scrollTop: 0 }, 300); });
    // highlight columns
    // $('#table table tbody').on('mouseenter', 'td', function () {
    //     var colIdx = table.cell(this).index().column;

    //     $(table.cells().nodes()).removeClass('highlight');
    //     $(table.column(colIdx).nodes()).addClass('highlight');
    // });

    // Hide rows tagged as spoilers unless spoiler mode is on
    table.search.fixed('spoilers', function (strSearch, arrData, intDataIndex) {
        if (objMistriaData.options.has('mode_spoilers')) {
            return true;
        }

        const bolIsSpoilerRow = $(table.row(intDataIndex).node()).hasClass('spoiler_row');
        return !bolIsSpoilerRow;
    });

    buildColumnToggle(table);
    buildPageLength(table);
    updateTableSpoilers();

    $('#search_items').on('keyup', function () {

        $('#page').removeHighlight();
        $('#cancel_search').hide();

        const value = $(this).val().toLowerCase();

        if (value !== '') {
            $('#cancel_search').show();
            const keywords = value.split('+').map(s => s.trim()).filter(Boolean);

            table.search(keywords.join('|'), true, false).draw();

            keywords.forEach(word => {
                $('#page .bigtable_row').highlight(word);
            });
        } else {
            table.search(this.value).draw();
        }
    });
    $('#cancel_search').on('click', function (e) {
        $('#search_items').val('');
        $('#search_items').trigger('keyup');
    });


}

const strTableDataKey = 'mistria_table';
const objMistriaTableDefault = {
    hiddenColumns: [],
    pageLength: 100,
};
let objMistriaTable;

function loadTableData() {
    let objStored;
    try {
        objStored = JSON.parse(localStorage.getItem(strTableDataKey)) || {};
    } catch (e) {
        objStored = {};
    }
    objMistriaTable = Object.assign({}, objMistriaTableDefault, objStored);
}

function saveTableData() {
    localStorage.setItem(strTableDataKey, JSON.stringify(objMistriaTable));
}

function getHiddenColumns() {
    return Array.isArray(objMistriaTable.hiddenColumns) ? objMistriaTable.hiddenColumns : [];
}

function setHiddenColumns(arrHidden) {
    objMistriaTable.hiddenColumns = arrHidden;
    saveTableData();
}

function buildColumnToggle(table) {
    const $list = $('#column_toggle_list');
    $list.empty();

    const $master = $(`
        <input type="checkbox" class="styled column_toggle_input" id="column_toggle_all">
        <label class="column_toggle_item column_toggle_all" for="column_toggle_all">Select all</label>`);
    $list.append($master);
    const $masterInput = $list.find('#column_toggle_all');

     $list.append('<div class="spacing"></div>');
  
    function syncMasterState() {
        const $boxes = $list.find('.column_toggle_input[data-column]');
        const intTotal = $boxes.length;
        const intChecked = $boxes.filter(':checked').length;

        $masterInput.prop('checked', intChecked === intTotal);
        $masterInput.prop('indeterminate', intChecked > 0 && intChecked < intTotal);
    }

    const arrHidden = getHiddenColumns();

    table.columns().every(function (intIndex) {
        const strTitle = $(this.header()).text().trim() || `Column ${intIndex + 1}`;
        const bolHidden = arrHidden.includes(strTitle);

        if (bolHidden) {
            this.visible(false, false);
        }

        const $item = $(`
            <input type="checkbox" class="styled column_toggle_input" id="coltgl_${intIndex}" data-column="${intIndex}" data-title="${strTitle}" ${bolHidden ? '' : 'checked'}>
            <label class="column_toggle_item ${strTitle == 'Spoiler' ? 'spoiler' : ''}" for="coltgl_${intIndex}">${strTitle}</label>`);

        $list.append($item);
    });

    table.columns.adjust();

    $list.on('click', function (e) {
        e.stopPropagation();
    });

    $masterInput.on('change', function () {
        const bolSelect = $(this).is(':checked');

        table.columns().every(function () {
            this.visible(bolSelect, false);
        });
        table.columns.adjust();

        $list.find('.column_toggle_input[data-column]').prop('checked', bolSelect);

        if (bolSelect) {
            setHiddenColumns([]);
        } else {
            const arrAllTitles = $list.find('.column_toggle_input[data-column]').map(function () {
                return String($(this).data('title'));
            }).get();
            setHiddenColumns(arrAllTitles);
        }

        updateTableSpoilers();
    });

    $list.on('change', '.column_toggle_input[data-column]', function () {
        const intColumn = $(this).data('column');
        const strTitle = String($(this).data('title'));
        const bolChecked = $(this).is(':checked');

        table.column(intColumn).visible(bolChecked);
        table.columns.adjust();

        let arrHiddenNow = getHiddenColumns();
        if (bolChecked) {
            arrHiddenNow = arrHiddenNow.filter(strItem => strItem !== strTitle);
        } else if (!arrHiddenNow.includes(strTitle)) {
            arrHiddenNow.push(strTitle);
        }
        setHiddenColumns(arrHiddenNow);

        syncMasterState();
        updateTableSpoilers();
    });

    syncMasterState();
}

function updateTableSpoilers() {
    if (!objDataTable) {
        return;
    }

    if (objMistriaData.options.has('mode_spoilers')) {
        const strTitle = $(objDataTable.column(intSpoilerColumn).header()).text().trim();
        const bolHidden = getHiddenColumns().includes(strTitle);
        objDataTable.column(intSpoilerColumn).visible(!bolHidden, false);
    } else {
        objDataTable.column(intSpoilerColumn).visible(false, false);
    }

    objDataTable.columns.adjust();
    objDataTable.draw();
}

function getPageLength() {
    const intStored = parseInt(objMistriaTable.pageLength, 10);
    if (!isNaN(intStored) && arrPageLengthOptions.some(objOption => objOption.value === intStored)) {
        return intStored;
    }
    return 100;
}

function setPageLength(intLength) {
    objMistriaTable.pageLength = intLength;
    saveTableData();
}

function buildPageLength(table) {
    const $list = $('#page_length_list');
    $list.empty();

    const intCurrent = getPageLength();

    arrPageLengthOptions.forEach(function (objOption) {
        const bolSelected = objOption.value === intCurrent;
        const $item = $(`
            <div class="dropdown-item page_length_item${bolSelected ? ' selected' : ''}" data-length="${objOption.value}">${objOption.label}</div>`);
        $list.append($item);
    });

    $list.on('click', '.page_length_item', function () {
        const intLength = parseInt($(this).data('length'), 10);
        setPageLength(intLength);
        table.page.len(intLength).draw();
        table.columns.adjust();

        $list.find('.page_length_item').removeClass('selected');
        $(this).addClass('selected');
    });
}

function loadGrid() {
    // test grid of all tooltips
    const $table = $(`<div id="tooltip_grid"></div>`);
    Object.entries(objItems).forEach(([strItemKey, objItem]) => {
        const strTipHTML = createTip(strItemKey, strItemKey, 'table')
        const strTipBoxHTML = `
            <div data-tippy-root>
                <div class="tippy-box" style="max-width: 370px;">
                    <div class="tippy-content"><div class="tip_wrap" style="display: block;">
                        <div class="tip">
                            ${strTipHTML}
                        </div>
                    </div>
                </div>
            </div>`;
        $table.append($(strTipBoxHTML));
    });

    $("#table").append($table);
}

$(function () {
    loadMenuItems();
    loadTable();
    updateTableSpoilers();
    // loadGrid();
});