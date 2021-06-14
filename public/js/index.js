$(function () {
    let day_count = hour_count = minute_count = 0;
    let day = 99, hour = 88, minute = 77;

    timeCounter();

    function timeCounter() {

        id0 = setInterval(count_day, 35);

        function count_day() {
            day_count++;
            if (day_count > day) {
                clearInterval(id0);
            } else {
                $(".time").eq(0).text(day_count + "일");
            }

        }

        id1 = setInterval(count_hour, 35);

        function count_hour() {
            hour_count++;
            if (hour_count > hour) {
                clearInterval(id1);
            } else {
                $(".time").eq(1).text(hour_count + "시간");
            }
        }

        id2 = setInterval(count_minute, 35);

        function count_minute() {
            minute_count++;
            if (minute_count > minute) {
                clearInterval(id2);
            } else {
                $(".time").eq(2).text(minute_count + "분");
            }
        }
    }
});


$(".hover").mouseleave(
    function () {
        $(this).removeClass("hover");
    }
);