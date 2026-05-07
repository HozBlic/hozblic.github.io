var objMistriaData;
var objWakatimeChart;

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

    if ($('#spent_time_total').length) {
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

        let objData = objBuild.spent_time;
        const lastDate = objBuild.spent_time.labels.at(-1).split(" - ")[0];
        const arrWeeks = getMondaysSince(lastDate);
        const intWeeks = arrWeeks.length
        if (intWeeks) {
            objData.labels = objData.labels.concat(arrWeeks);

            objData.datasets.forEach(function (objData) {
                objData.data = objData.data.concat(Array(intWeeks).fill(0));
            });
        }

        var ctx = document.getElementById("spent_time_chart").getContext('2d');
        objWakatimeChart = new Chart(ctx, {
            type: 'line',
            data: objBuild.spent_time,
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
                }
            }
        });

        $('#spent_time_total span').html(`${minutesToTime((objBuild.spent_time_total + 120 * 60))}`);

        tippy('#wakatime_icon', {
            content: `
            <p class="save_file">
                I began tracking time in March 2026, and since then <span style="white-space: nowrap;">${minutesToTime((objBuild.spent_time_total))}</span> has been recorded. 
                Before that, I had already spent ~120 hours on the project.
            </p>
            <p class="save_file">
                The project was originally created on December 28, 2024.
            </p>`,
            allowHTML: true,
        });
    }
}

function openDonatePopup() {
    $('#popup_donate').show();

    setTimeout(function () {
        objWakatimeChart.config.options.animation = true;
        objWakatimeChart.update()
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

$(function () {
    loadData();

    tippy('#triangle img', {
        content: 'Red bull, please?',
    });
});