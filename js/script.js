var objMistriaData;
var objWakatimeCharts = {
    'donate': {},
    'changelog': {},
};

var objMistriaDataDefault = objBuild.objMistriaDataDefault;
// close menu on mobile by default
if ($(window).width() < 700) {
    objMistriaDataDefault.options.push('mode_collapse');
}
var arrTabs = objBuild.tabsOrder;

const minutesToTime = (minutes) => {
    if (!minutes) {
        return '0min'
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const arrTime = [
        hours ? hours + 'h' : '',
        mins ? mins + 'min' : ''
    ];
    return arrTime.join(' ');
    // return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('/');
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}`;
};

const getMondaysSince = (startDateStr) => {
    const start = new Date(startDateStr);
    const today = new Date();

    const result = [];

    // move to next day (exclude start day)
    start.setDate(start.getDate() + 1);

    // move to first Monday after start
    const day = start.getDay();
    const offset = (8 - day) % 7;
    start.setDate(start.getDate() + offset);

    if (start > today) return [];

    const msPerWeek = 7 * 24 * 60 * 60 * 1000;
    const current = new Date(start);

    const format = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}/${m}/${d}`;
    };

    while (current <= today) {
        result.push(format(current));
        current.setTime(current.getTime() + msPerWeek);
    }

    return result;
};

const verticalLinePlugin = {
    getLinePosition(chart, pointIndex) {
        const meta = chart.getDatasetMeta(0);
        return meta.data[pointIndex].x;
    },

    renderVerticalLineBetween(chart, startIndex, endIndex, text) {
        const ctx = chart.ctx;
        const yScale = chart.scales.y;

        const startX = this.getLinePosition(chart, startIndex);
        const endX = this.getLinePosition(chart, endIndex);

        const middleX = (startX + endX) / 2;

        ctx.save();

        // line
        ctx.beginPath();
        ctx.setLineDash([2, 2]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#b6b6b6';

        ctx.moveTo(middleX, yScale.top);
        ctx.lineTo(middleX, yScale.bottom);

        ctx.stroke();

        // text
        ctx.fillStyle = '#b6b6b6';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';

        ctx.fillText(
            text,
            middleX,
            yScale.top - 7
        );

        ctx.restore();
    },

    beforeDatasetsDraw(chart) {
        const config = chart.config._config;

        if (config.lineBetweenIndexes) {
            config.lineBetweenIndexes.forEach(item => {
                this.renderVerticalLineBetween(
                    chart,
                    item.start,
                    item.end,
                    item.text
                );
            });
        }
    }
};

function createChartConfig(objData) {
    // const lastDate = objData.labels.at(-1).split(" - ")[0];
    // const arrWeeks = getMondaysSince(lastDate);
    // const intWeeks = arrWeeks.length
    // if (intWeeks) {
    //     objData.labels = objData.labels.concat(arrWeeks);

    //     objData.datasets.forEach(function (objData) {
    //         objData.data = objData.data.concat(Array(intWeeks).fill(0));
    //     });
    // }

    const index = objData.labels.findIndex(str => str.startsWith('2026/05/11'));
    let arrLineBetweenIndexes = [];

    if (index !== -1) {
        arrLineBetweenIndexes.push({
            start: index,
            end: index,
            text: 'Planner v1'
        },)
    }

    return {
        type: 'line',
        data: objData,
        lineBetweenIndexes: arrLineBetweenIndexes,
        plugins: [verticalLinePlugin],
        options: {
            clip: false,
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            tension: 0.2,
            borderWidth: 2,
            maxBarThickness: 30,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            elements: {
                point: {
                    radius: 0
                },
            },
            layout: {
                padding: {
                    top: 25,
                }
            },
            plugins: {
                legend: {
                    position: "right",
                    align: "middle",
                    maxWidth: ({ chart }) => chart.width * 0.9,
                    labels: {
                        font: {
                            size: 10
                        },
                        boxWidth: 30,
                        boxHeight: 10,
                    }
                },
                colorschemes: {
                    scheme: ["#ce5070", "#6b9080", "#fcab10", "#b6b6b650"]
                },
                tooltip: {
                    filter: function (tooltipItem) {
                        return tooltipItem.raw !== 0;
                    },
                    callbacks: {
                        title: ctx => {
                            return ctx[0].label;
                        },
                        label: ctx => {
                            return `${ctx.dataset.label}: ${minutesToTime(ctx.raw)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 10
                        },
                        callback: function (value, index, ticks) {
                            const dateStr = this.chart.data.labels[value].split(" - ")[0];
                            return formatDate(dateStr);
                        }
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        stepSize: 60,
                        font: {
                            size: 10
                        },
                        callback: function (value, index, ticks) {
                            return minutesToTime(value);
                        }
                    }
                },
            },
        }
    }
}

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

    const existingChart = Chart.getChart('spent_time_chart_donate');
    if ($('.spent_time_total').length && !existingChart) {
        objWakatimeCharts.donate = new Chart(
            document.getElementById('spent_time_chart_donate').getContext('2d'),
            createChartConfig(objBuild.spent_time));
        objWakatimeCharts.changelog = new Chart(
            document.getElementById('spent_time_chart_changelog').getContext('2d'),
            createChartConfig(objBuild.spent_time));

        $('.spent_time_total span').html(`${minutesToTime((objBuild.spent_time_total + 120 * 60))}`);

        tippy('.wakatime_icon', {
            content: `
            <p class="save_file">
                I began tracking time in March 2026, and since then <span style="white-space: nowrap;">${minutesToTime((objBuild.spent_time_total))}</span> has been recorded. 
                Before that, I had already spent ~120 hours on the project.
            </p>
            <p class="save_file with_icon">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="48" height="44" viewBox="0 0 48 44">
                    <path d="M0 0 C7.92 0 15.84 0 24 0 C24 1.32 24 2.64 24 4 C25.32 4 26.64 4 28 4 C28 6.64 28 9.28 28 12 C29.32 12 30.64 12 32 12 C32 18.6 32 25.2 32 32 C30.68 32 29.36 32 28 32 C28 33.32 28 34.64 28 36 C17.44 36 6.88 36 -4 36 C-4 34.68 -4 33.36 -4 32 C-5.32 32 -6.64 32 -8 32 C-8 25.4 -8 18.8 -8 12 C-6.68 12 -5.36 12 -4 12 C-4 9.36 -4 6.72 -4 4 C-2.68 4 -1.36 4 0 4 C0 2.68 0 1.36 0 0 Z " fill="#62A1BD" transform="translate(12,4)"/>
                    <path d="M0 0 C7.92 0 15.84 0 24 0 C24 1.32 24 2.64 24 4 C25.32 4 26.64 4 28 4 C28 9.28 28 14.56 28 20 C17.44 20 6.88 20 -4 20 C-4 14.72 -4 9.44 -4 4 C-2.68 4 -1.36 4 0 4 C0 2.68 0 1.36 0 0 Z " fill="#FA87BC" transform="translate(12,4)"/>
                    <path d="M0 0 C1.32 0 2.64 0 4 0 C4 2.64 4 5.28 4 8 C14.56 8 25.12 8 36 8 C36 5.36 36 2.72 36 0 C37.32 0 38.64 0 40 0 C40 6.6 40 13.2 40 20 C38.68 20 37.36 20 36 20 C36 17.36 36 14.72 36 12 C25.44 12 14.88 12 4 12 C4 14.64 4 17.28 4 20 C2.68 20 1.36 20 0 20 C0 13.4 0 6.8 0 0 Z " fill="#A53A60" transform="translate(4,16)"/>
                    <path d="M0 0 C7.92 0 15.84 0 24 0 C24 1.32 24 2.64 24 4 C25.32 4 26.64 4 28 4 C28 6.64 28 9.28 28 12 C26.68 12 25.36 12 24 12 C24 10.68 24 9.36 24 8 C16.08 8 8.16 8 0 8 C0 9.32 0 10.64 0 12 C-1.32 12 -2.64 12 -4 12 C-4 9.36 -4 6.72 -4 4 C-2.68 4 -1.36 4 0 4 C0 2.68 0 1.36 0 0 Z " fill="#E0AA47" transform="translate(12,4)"/>
                    <path d="M0 0 C10.56 0 21.12 0 32 0 C32 1.32 32 2.64 32 4 C21.44 4 10.88 4 0 4 C0 2.68 0 1.36 0 0 Z " fill="#010100" transform="translate(8,36)"/>
                    <path d="M0 0 C10.56 0 21.12 0 32 0 C32 1.32 32 2.64 32 4 C21.44 4 10.88 4 0 4 C0 2.68 0 1.36 0 0 Z " fill="#FEDCC4" transform="translate(8,28)"/>
                    <path d="M0 0 C7.92 0 15.84 0 24 0 C24 1.32 24 2.64 24 4 C16.08 4 8.16 4 0 4 C0 2.68 0 1.36 0 0 Z " fill="#7CBDDB" transform="translate(12,12)"/>
                    <path d="M0 0 C7.92 0 15.84 0 24 0 C24 1.32 24 2.64 24 4 C16.08 4 8.16 4 0 4 C0 2.68 0 1.36 0 0 Z " fill="#000100" transform="translate(12,4)"/>
                    <path d="M0 0 C1.32 0 2.64 0 4 0 C4 6.6 4 13.2 4 20 C2.68 20 1.36 20 0 20 C0 13.4 0 6.8 0 0 Z " fill="#010101" transform="translate(40,16)"/>
                    <path d="M0 0 C1.32 0 2.64 0 4 0 C4 6.6 4 13.2 4 20 C2.68 20 1.36 20 0 20 C0 13.4 0 6.8 0 0 Z " fill="#010101" transform="translate(4,16)"/>
                    <path d="M0 0 C1.32 0 2.64 0 4 0 C4 2.64 4 5.28 4 8 C2.68 8 1.36 8 0 8 C0 5.36 0 2.72 0 0 Z " fill="#010101" transform="translate(36,8)"/>
                    <path d="M0 0 C1.32 0 2.64 0 4 0 C4 2.64 4 5.28 4 8 C2.68 8 1.36 8 0 8 C0 5.36 0 2.72 0 0 Z " fill="#010101" transform="translate(8,8)"/>
                </svg>
                December 28, 2024.
            </p>`,
            allowHTML: true,
        });
    }
}

function openDonatePopup() {
    $('#popup_donate').show();

    setTimeout(function () {
        objWakatimeCharts.donate.config.options.animation = true;
        objWakatimeCharts.donate.update()
    }, 1000);
}

function openChangelogPopup() {
    $('#popup_changelog').show();

    setTimeout(function () {
        objWakatimeCharts.changelog.config.options.animation = true;
        objWakatimeCharts.changelog.update()
    }, 1000);
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

function loadChangelog() {

    $('.changelog_tab').on('click', function () {
        loadChangelogTab($(this).attr('data-tab'));
    });

    Object.keys(objChangelog).forEach(function (strTab) {
        let $divWrapper = $(`#changelog_tab_${strTab} .plan_section_list`);

        objChangelog[strTab].forEach(function (objPlan) {
            let $divPlanItem = $('<li>', { 'class': 'plan_section' });

            $divPlanItem.append(`<div class="plan_section_date">${objPlan.date}<div class="icons"></div></div>`);

            if (objPlan.date == "Future") {
                $divPlanItem.addClass('bold');
            }

            if ('tags' in objPlan) {
                objPlan.tags.forEach(function (strTag) {
                    switch (strTag) {
                        case "feedback":
                            $divPlanItem.find('.plan_section_date .icons').append(`
                                <div class="icon changelog_${strTag}">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" id="Message-Circle-Heart--Streamline-Lucide" height="24" width="24">
                                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" stroke-width="2"></path>
                                        <path d="M15.8 9.2a2.5 2.5 0 0 0 -3.5 0l-0.3 0.4 -0.35 -0.3a2.42 2.42 0 1 0 -3.2 3.6l3.6 3.5 3.6 -3.5c1.2 -1.2 1.1 -2.7 0.2 -3.7" stroke-width="2"></path>
                                    </svg>
                                </div>`);
                            break;
                        case "star":
                            $divPlanItem.addClass('bold');
                            $divPlanItem.find('.plan_section_date .icons').append(`
                                <div class="icon changelog_${strTag}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none"  stroke="#000000" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="feather feather-star">
                                        <polygon
                                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                                        </polygon>
                                    </svg>
                                </div>`);
                            break;
                    }
                });
            }

            $divPlanItem.append(`<ul class="plan_section_items"></ul>`);

            objPlan.info.forEach(function (strPlan) {
                strPlan = strPlan.replace('{{feedback}}', `
                    <div class="icon changelog_feedback">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" id="Message-Circle-Heart--Streamline-Lucide" height="24" width="24">
                            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" stroke-width="2"></path>
                            <path d="M15.8 9.2a2.5 2.5 0 0 0 -3.5 0l-0.3 0.4 -0.35 -0.3a2.42 2.42 0 1 0 -3.2 3.6l3.6 3.5 3.6 -3.5c1.2 -1.2 1.1 -2.7 0.2 -3.7" stroke-width="2"></path>
                        </svg>
                    </div>`);
                $divPlanItem.find('.plan_section_items').append(`<li class="plan_section_item">${strPlan}</li>`);
            });

            $divWrapper.append($divPlanItem);
        });
    });
}

function loadChangelogTab(strTabKey) {
    if ($('#changelog_content').hasClass(strTabKey)) {
        return;
    }

    $('#changelog_content').removeClass(['tracker', 'planner'].join(' '));
    $('#changelog_content').addClass(strTabKey);
}

$(function () {
    loadData();
    loadChangelog();

    tippy('#triangle img', {
        content: 'Red bull, please?',
    });

    tippy('.changelog_star', {
        content: 'Milestone',
    });

    tippy('.changelog_feedback', {
        content: 'Based on feedback',
    });

    //remove trailing slash
    if (window.location.pathname.length > 1 && window.location.pathname.endsWith('/')) {
        const newPath = window.location.pathname.replace(/\/+$/, '');
        window.history.replaceState({}, '', newPath + window.location.search + window.location.hash);
    }
});