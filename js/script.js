
var objMistriaData;

var objMistriaDataDefault = objBuild.objMistriaDataDefault;
// close menu on mobile by default
if ($(window).width() < 700) {
    objMistriaDataDefault.options.push('mode_collapse');
}
var arrTabs = objBuild.tabsOrder;


function loadData() {
    objMistriaData = JSON.parse(localStorage.getItem('mistria_data'));

    if (objMistriaData === null) {
        objMistriaData = JSON.parse(JSON.stringify(objMistriaDataDefault));
    }

    $('#settings_json').val(JSON.stringify(objMistriaData, undefined, 4));

    // convert arrays to sets for to remove duplicates 
    arrTabs.forEach(function (strTab) {
        if (strTab in objMistriaData) {
            objMistriaData[strTab] = new Set(objMistriaData[strTab]);
        } else {
            objMistriaData[strTab] = new Set(objMistriaDataDefault[strTab]);
        }
    });
    objMistriaData.options = ('options' in objMistriaData ? new Set(objMistriaData.options) : new Set(objMistriaDataDefault.options));
    objMistriaData.favorites = ('favorites' in objMistriaData ? new Set(objMistriaData.favorites) : new Set());


    // for backward compatibility with old data structure
    if (objMistriaData.tab === 'gift') {
        objMistriaData.tab = 'gifts';
    }
}

function saveData() {
    // convert to array since JSON.stringify does not work on sets
    arrTabs.forEach(function (strTab) {
        if (strTab in objMistriaData) {
            objMistriaData[strTab] = [...objMistriaData[strTab]];
        }
    });
    objMistriaData.options = [...objMistriaData.options];
    objMistriaData.favorites = [...objMistriaData.favorites];

    localStorage.setItem('mistria_data', JSON.stringify(objMistriaData));
    loadData();
}

$(function () {
    loadData();

    tippy('#triangle img', {
        content: 'Red bull, please?',
    });
});