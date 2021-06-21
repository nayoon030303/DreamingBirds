$(function () {
    let time = $("#time").data("time");

    let sum = 0;

    if(typeof(time) == "number") {
        sum = time;
    } else {
        for(var i  = 0; i < time.length; i++) {
            sum += time[i].time;
        }
    }

    // console.log(time);
    // console.log(typeof(time));
    // console.log(sum);

    let day_count = hour_count = minute_count = 0;
    let day = sum / (3600 * 24), hour = (sum % (3600 * 24)) / 3600, minute = (sum / 60) % 60;

    setTimeout(function() {
        id0 = setInterval(count_day, 1000 / day);
        function count_day() {
            day_count++;
            if (day_count > day) {
                clearInterval(id0);
            } else {
                $(".time").eq(0).text(day_count + "일");
            }

        }

        id1 = setInterval(count_hour, 1000 / hour);
        function count_hour() {
            hour_count++;
            if (hour_count > hour) {
                clearInterval(id1);
            } else {
                $(".time").eq(1).text(hour_count + "시간");
            }
        }

        id2 = setInterval(count_minute, 1000 / minute);
        function count_minute() {
            minute_count++;
            if (minute_count > minute) {
                clearInterval(id2);
            } else {
                $(".time").eq(2).text(minute_count + "분");
            }
        }
    }, 1500);
});