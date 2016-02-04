(function ($) {
    $.fn.circularCalender = function (options) {
        var element = this;
        var dragStart = false;
        var dragSelector = 'daySelector';
        var defaultsOptions = {
            "centerX": 200,
            "centerY": 200,
            "dayPathRadius": 125,
            "monthPathRadius": 90,
            "yearPathRadius": 50,
            "daySelectorRadius": 15,
            "monthSelectorRadius": 17.5,
            "yearSelectorRadius": 18,
            "startYear": 2000,
            "onChange": function (calenderData) {
            },
            "onDragStop": function (calenderData) {
            },
            "onDrag": function (calenderData) {
            },
            "onCreate": function (calenderData) {
            }
        };
        var monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var calenderOptions = $.extend({}, defaultsOptions, options);
        var circularCalender = {
            calenderData: {
                "startYear": {},
                "endMonth": {},
                "startMonth": {},
                "endDay": {},
                "startDay": {}
            },
            init: function () {
                var d = new Date();
                circularCalender.createCalender();
                circularCalender.drawCircularDaysPath();
                circularCalender.drawCircularMonthPath();
                circularCalender.drawCircularYearPath();

                circularCalender.setEventHandler();
                circularCalender.setSelectorPositionByValue(d.getDate(), 'daySelector', true);
                circularCalender.setSelectorPositionByValue(d.getDate(), 'daySelector', false);
                circularCalender.setSelectorPositionByValue(d.getMonth() + 1, 'monthSelector', true);
                circularCalender.setSelectorPositionByValue(d.getMonth() + 1, 'monthSelector', false);
                circularCalender.setSelectorPositionByValue(d.getFullYear(), 'yearSelector', true);
                circularCalender.setSelectorPositionByValue(d.getFullYear(), 'yearSelector', false);

                circularCalender.setElementPosition();
                calenderOptions.onCreate(circularCalender.calenderData);
            },
            setElementPosition: function () {
                $('.calender-background').css({
                    top: calenderOptions.centerY - calenderOptions.dayPathRadius - 30,
                    left: calenderOptions.centerX - calenderOptions.dayPathRadius - 30,
                    height: calenderOptions.dayPathRadius * 2 + 50,
                    width: calenderOptions.dayPathRadius * 2 + 50,
                    "border-radius": (calenderOptions.dayPathRadius * 2 + 50) / 2
                });

                $('.indicater').css({
                    top: calenderOptions.centerY + calenderOptions.dayPathRadius + 50
                });

                $('.center-text-area').css({
                    top: calenderOptions.centerY - 32.5,
                    left: calenderOptions.centerX - 32.5
                });

                $('.day-selector').css({
                    height: calenderOptions.daySelectorRadius * 2,
                    width: calenderOptions.daySelectorRadius * 2,
                    "border-radius": calenderOptions.daySelectorRadius
                });

                $('.month-selector').css({
                    height: calenderOptions.monthSelectorRadius * 2,
                    width: calenderOptions.monthSelectorRadius * 2,
                    "border-radius": calenderOptions.monthSelectorRadius
                });

                $('.year-selector').css({
                    height: calenderOptions.yearSelectorRadius * 2,
                    width: calenderOptions.yearSelectorRadius * 2,
                    "border-radius": calenderOptions.yearSelectorRadius
                });
            },
            createCalender: function () {
                for (var i = 31; i >= 1; i--) {
                    $(element).append('<div class="point calendar-day">' + i + '</div>');
                }

                for (var i = 11; i >= 0; i--) {
                    $(element).append('<div class="point calendar-month">' + monthNamesShort[i] + '</div>');
                }

                for (var i = 8; i > 0; i--) {
                    $(element).append('<div class="point calendar-year">' + (calenderOptions.startYear + i - 1) + '</div>');
                }


                $(element).append('<div class="center-text-area"><span id="center-text"></span></div>');
                $(element).append('<div id="start-day-selector" class="day-selector start-selector"></div>');
                $(element).append('<div id="start-month-selector" class="month-selector start-selector"></div>');
                $(element).append('<div id="start-year-selector" class="year-selector start-selector"></div>');
                $(element).append('<div class="calender-background"></div>');
            },
            setEventHandler: function () {
                document.getElementById('circular-calendar').addEventListener('touchmove', function (event) {
                    if (dragStart == true) {
                        circularCalender.dragSelector(event);
                        calenderOptions.onChange(circularCalender.calenderData);
                    }
                    event.preventDefault();
                }, false);
                document.getElementById('circular-calendar').addEventListener('mousemove', function (event) {
                    if (dragStart == true) {
                        circularCalender.dragSelector(event);
                        calenderOptions.onChange(circularCalender.calenderData);
                    }
                    event.preventDefault();
                }, false);
                document.getElementById('start-day-selector').addEventListener('touchstart', function (event) {
                    dragStart = true;
                    dragSelector = 'daySelector';
                    calenderOptions.onDrag(circularCalender.calenderData);
                    event.preventDefault();
                }, false);
                document.getElementById('start-day-selector').addEventListener('mousedown', function (event) {
                    dragStart = true;
                    dragSelector = 'daySelector';
                    calenderOptions.onDrag(circularCalender.calenderData);
                    event.preventDefault();
                }, false);
                document.getElementById('start-month-selector').addEventListener('touchstart', function (event) {
                    dragStart = true;
                    dragSelector = 'monthSelector';
                    calenderOptions.onDrag(circularCalender.calenderData);
                    event.preventDefault();
                }, false);
                document.getElementById('start-month-selector').addEventListener('mousedown', function (event) {
                    dragStart = true;
                    dragSelector = 'monthSelector';
                    calenderOptions.onDrag(circularCalender.calenderData);
                    event.preventDefault();
                }, false);

                document.getElementById('start-year-selector').addEventListener('touchstart', function (event) {
                    dragStart = true;
                    dragSelector = 'yearSelector';
                    calenderOptions.onDrag(circularCalender.calenderData);
                    event.preventDefault();
                }, false);
                document.getElementById('start-year-selector').addEventListener('mousedown', function (event) {
                    dragStart = true;
                    dragSelector = 'yearSelector';
                    calenderOptions.onDrag(circularCalender.calenderData);
                    event.preventDefault();
                }, false);

                document.getElementById('circular-calendar').addEventListener('touchend', function (event) {
                    circularCalender.dragEnd();
                    event.preventDefault();
                }, false);
                document.getElementById('circular-calendar').addEventListener('mouseup', function (event) {
                    circularCalender.dragEnd();
                    event.preventDefault();
                }, false);
            },
            dragEnd: function () {
                if (dragSelector == 'daySelector') {
                    var startDayValue = circularCalender.calenderData.startDay.value;
                    var endDayValue = circularCalender.calenderData.endDay.value;
                    circularCalender.setSelectorPositionByValue(startDayValue, 'daySelector', true);
                    circularCalender.setSelectorPositionByValue(endDayValue, 'daySelector', false);
                    $('#center-text').text(startDayValue);
                } else if (dragSelector == 'monthSelector') {
                    var startMonthValue = circularCalender.calenderData.startMonth.value;
                    var endMonthValue = circularCalender.calenderData.endMonth.value;
                    circularCalender.setSelectorPositionByValue(startMonthValue, 'monthSelector', true);
                    circularCalender.setSelectorPositionByValue(endMonthValue, 'monthSelector', false);
                    $('#center-text').text(monthNamesShort[startMonthValue - 1]);
                } else {
                    var startYearValue = circularCalender.calenderData.startYear.value;
                    circularCalender.setSelectorPositionByValue(startYearValue, 'yearSelector', true);
                    $('#center-text').text(startYearValue);
                }

                dragStart = false;
                calenderOptions.onDragStop(circularCalender.calenderData);
            },
            dragSelector: function (event) {
                if (event.type == 'touchmove') {
                    var touchProp = event.changedTouches[0];
                    var angle = Math.atan2(touchProp.pageX - calenderOptions.centerX, touchProp.pageY - calenderOptions.centerY);
                } else {
                    angle = Math.atan2(event.pageX - calenderOptions.centerX, event.pageY - calenderOptions.centerY);
                }

                if (dragSelector == 'daySelector') {
                    circularCalender.setDaySelectorPosition(angle);
                } else if (dragSelector == 'monthSelector') {
                    circularCalender.setMonthSelectorPosition(angle);
                } else {
                    circularCalender.setYearSelectorPosition(angle);
                }

                circularCalender.setStartEndDate();
            },
            setDaySelectorPosition: function (angle) {
                var top = calenderOptions.centerY + Math.cos(angle) * calenderOptions.dayPathRadius - calenderOptions.daySelectorRadius;
                var left = calenderOptions.centerX + Math.sin(angle) * calenderOptions.dayPathRadius - calenderOptions.daySelectorRadius;
                var value = 31 - Math.round(((angle / Math.PI) * 15.5) + 15.5);
                if (value == 0) {
                    value = 31;
                }
                $('#center-text').text(value);
                var degree = (angle / Math.PI * 180) + (angle > 0 ? 0 : 360);
                circularCalender.calenderData.startDay = {
                    top: top,
                    left: left,
                    value: value,
                    degree: degree
                };
                $('#start-day-selector').css({
                    top: top,
                    left: left
                });
            },
            setMonthSelectorPosition: function (angle) {
                var top = calenderOptions.centerY + Math.cos(angle) * calenderOptions.monthPathRadius - calenderOptions.monthSelectorRadius;
                var left = calenderOptions.centerX + Math.sin(angle) * calenderOptions.monthPathRadius - calenderOptions.monthSelectorRadius;
                var value = 12 - Math.round(((angle / Math.PI) * 6) + 6);
                if (value == 0) {
                    value = 12;
                }
                $('#center-text').text(monthNamesShort[value - 1]);
                var degree = (angle / Math.PI * 180) + (angle > 0 ? 0 : 360);
                circularCalender.calenderData.startMonth = {
                    top: top,
                    left: left,
                    value: value,
                    degree: degree
                };
                $('#start-month-selector').css({
                    top: top,
                    left: left
                });
            },
            setYearSelectorPosition: function (angle) {
                var top = calenderOptions.centerY + Math.cos(angle) * calenderOptions.yearPathRadius - calenderOptions.yearSelectorRadius;
                var left = calenderOptions.centerX + Math.sin(angle) * calenderOptions.yearPathRadius - calenderOptions.yearSelectorRadius;
                var value = 7 - Math.round(((angle / Math.PI) * 4) + 4) + calenderOptions.startYear;
                if (value == calenderOptions.startYear - 1) {
                    value = calenderOptions.startYear + 7;
                }
                $('#center-text').text(value);
                var degree = (angle / Math.PI * 180) + (angle > 0 ? 0 : 360);
                circularCalender.calenderData.startYear = {
                    top: top,
                    left: left,
                    value: value,
                    degree: degree
                };
                $('#start-year-selector').css({
                    top: top,
                    left: left
                });
            },
            setSelectorPositionByValue: function (value, selectorType, setForStartSelector) {
                if (selectorType == 'daySelector') {
                    var index = 31 - value;
                    var angle = Math.PI * ((index - 15.5) / 15.5);
                    var top = calenderOptions.centerY + Math.cos(angle) * calenderOptions.dayPathRadius - calenderOptions.daySelectorRadius;
                    var left = calenderOptions.centerX + Math.sin(angle) * calenderOptions.dayPathRadius - calenderOptions.daySelectorRadius;
                    var degree = (angle / Math.PI * 180) + (angle > 0 ? 0 : 360);
                    circularCalender.calenderData.startDay = {
                        top: top,
                        left: left,
                        value: value,
                        degree: degree
                    };
                    $('#start-day-selector').css({
                        top: top,
                        left: left
                    });
                } else if (selectorType == 'monthSelector') {
                    index = 12 - value;
                    angle = Math.PI * ((index - 6) / 6);
                    top = calenderOptions.centerY + Math.cos(angle) * calenderOptions.monthPathRadius - calenderOptions.monthSelectorRadius;
                    left = calenderOptions.centerX + Math.sin(angle) * calenderOptions.monthPathRadius - calenderOptions.monthSelectorRadius;
                    degree = (angle / Math.PI * 180) + (angle > 0 ? 0 : 360);
                    circularCalender.calenderData.startMonth = {
                        top: top,
                        left: left,
                        value: value,
                        degree: degree
                    };
                    $('#start-month-selector').css({
                        top: top,
                        left: left
                    });

                } else {
                    index = 7 - (value - calenderOptions.startYear);
                    angle = Math.PI * ((index - 4) / 4);
                    top = calenderOptions.centerY + Math.cos(angle) * calenderOptions.yearPathRadius - calenderOptions.yearSelectorRadius;
                    left = calenderOptions.centerX + Math.sin(angle) * calenderOptions.yearPathRadius - calenderOptions.yearSelectorRadius;
                    degree = (angle / Math.PI * 180) + (angle > 0 ? 0 : 360);
                    circularCalender.calenderData.startYear = {
                        top: top,
                        left: left,
                        value: value,
                        degree: degree
                    };
                    $('#start-year-selector').css({
                        top: top,
                        left: left
                    });
                }

                circularCalender.setStartEndDate();
            },
            setStartEndDate: function () {
                var startDate = circularCalender.calenderData.startYear.value;
                if (typeof (startDate) == 'undefined') {
                    var d = new Date();
                    if (circularCalender.calenderData.startMonth.value > circularCalender.calenderData.endMonth.value) {
                        startDate = d.getFullYear();
                    } else {
                        startDate = d.getFullYear();
                    }
                }
                if (circularCalender.calenderData.startMonth.value < 10) {
                    startDate = startDate + '-0' + circularCalender.calenderData.startMonth.value;
                } else {
                    startDate = startDate + '-' + circularCalender.calenderData.startMonth.value;
                }

                if (circularCalender.calenderData.startDay.value < 10) {
                    startDate = startDate + '-0' + circularCalender.calenderData.startDay.value;
                } else {
                    startDate = startDate + '-' + circularCalender.calenderData.startDay.value;
                }

                circularCalender.calenderData.startDate = startDate;
            },
            drawCircularDaysPath: function () {
                $('.calendar-day').each(function (index) {
                    var angle = Math.PI * ((index - 15.5) / 15.5);
                    var degree = -11.25 * index;
                    $(this).css({
                        top: calenderOptions.centerY + Math.cos(angle) * calenderOptions.dayPathRadius - calenderOptions.daySelectorRadius,
                        left: calenderOptions.centerX + Math.sin(angle) * calenderOptions.dayPathRadius - calenderOptions.daySelectorRadius,
                        height: calenderOptions.daySelectorRadius * 2,
                        width: calenderOptions.daySelectorRadius * 2,
                        'border-radius': calenderOptions.daySelectorRadius,
                        'line-height': calenderOptions.daySelectorRadius * 2 + 'px',
                        '-webkit-transform': 'rotate(' + degree + 'deg)',
                        '-moz-transform': 'rotate(' + degree + 'deg)',
                        '-ms-transform': 'rotate(' + degree + 'deg)',
                        '-o-transform': 'rotate(' + degree + 'deg)',
                        'writing-mode': 'lr-tb'
                    });
                });
            },
            drawCircularMonthPath: function () {
                $('.calendar-month').each(function (index) {
                    var angle = Math.PI * ((index - 6) / 6);
                    var degree = -30 * index;
                    $(this).css({
                        top: calenderOptions.centerY + Math.cos(angle) * calenderOptions.monthPathRadius - calenderOptions.monthSelectorRadius,
                        left: calenderOptions.centerX + Math.sin(angle) * calenderOptions.monthPathRadius - calenderOptions.monthSelectorRadius,
                        height: calenderOptions.monthSelectorRadius * 2,
                        width: calenderOptions.monthSelectorRadius * 2,
                        'border-radius': calenderOptions.monthSelectorRadius,
                        'line-height': calenderOptions.monthSelectorRadius * 2 + 'px',
                        '-webkit-transform': 'rotate(' + degree + 'deg)',
                        '-moz-transform': 'rotate(' + degree + 'deg)',
                        '-ms-transform': 'rotate(' + degree + 'deg)',
                        '-o-transform': 'rotate(' + degree + 'deg)',
                        'writing-mode': 'lr-tb'
                    });
                });
            },
            drawCircularYearPath: function () {
                $('.calendar-year').each(function (index) {
                    var angle = Math.PI * ((index - 4) / 4);
                    var degree = -45 * index;
                    $(this).css({
                        top: calenderOptions.centerY + Math.cos(angle) * calenderOptions.yearPathRadius - calenderOptions.yearSelectorRadius,
                        left: calenderOptions.centerX + Math.sin(angle) * calenderOptions.yearPathRadius - calenderOptions.yearSelectorRadius,
                        height: calenderOptions.yearSelectorRadius * 2,
                        width: calenderOptions.yearSelectorRadius * 2,
                        'border-radius': calenderOptions.yearSelectorRadius,
                        'line-height': calenderOptions.yearSelectorRadius * 2 + 'px',
                        '-webkit-transform': 'rotate(' + degree + 'deg)',
                        '-moz-transform': 'rotate(' + degree + 'deg)',
                        '-ms-transform': 'rotate(' + degree + 'deg)',
                        '-o-transform': 'rotate(' + degree + 'deg)',
                        'writing-mode': 'lr-tb'
                    });
                });
            }
        };

        circularCalender.init();
        return this;
    };
})(jQuery);