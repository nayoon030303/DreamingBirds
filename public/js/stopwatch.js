var time = 0;
var n_time = 0;
var starFlag = true;

$(document).ready(function(){
  buttonEvt();
});

function init(){
  document.getElementById("now-focus-time").innerHTML = "00:00:00";
  document.getElementById("all-focus-time").innerHTML = user.timer[0].hour+":"+user.timer[0].min+":"+user.timer[0].sec;
}

function buttonEvt(){

    var n_hour = 0;
    var n_min = 0;
    var n_sec = 0;

    var hour = user.timer[0].hour;
    var min = user.timer[0].min;
    var sec = user.timer[0].sec;
    var timer;
  
    // start btn
    $("#startbtn").click(function(){
        console.log(`stopwatch start`)
        timer = setInterval(function(){
            time++;
            n_time++;

            min = Math.floor(time/60);
            hour = Math.floor(min/60);
            sec = time%60;
            min = min%60;

            n_min = Math.floor(n_time/60);
            n_hour = Math.floor(n_min/60);
            n_sec = n_time%60;
            n_min = n_min%60;

            var th = hour;
            var tm = min;
            var ts = sec;

            var n_th = n_hour;
            var n_tm = n_min;
            var n_ts = n_sec;

            if(th < 10) th = "0" + hour;
            if(tm < 10) tm = "0" + min;
            if(ts < 10) ts = "0" + sec;

            if(n_th < 10) n_th = "0" + n_hour;
            if(n_tm < 10) n_tm = "0" + n_min;
            if(n_ts < 10) n_ts = "0" + n_sec;

        document.getElementById("now-focus-time").innerHTML = n_th + ":" + n_tm + ":" + n_ts;
        document.getElementById("all-focus-time").innerHTML = th + ":" + tm + ":" + ts;
        }, 1000);
    });

    // pause btn
    $("#pausebtn").click(function(){
        if(time != 0){
            clearInterval(timer);
            n_time = 0;
            n_hour = 0;
            n_min = 0;
            n_sec = 0;
            document.getElementById("now-focus-time").innerHTML = "00:00:00";
        }
    });

    // stop btn
    $("#stopbtn").click(function(){
        if(time != 0){
        clearInterval(timer);
        time = 0;
        init();
        }
  });
}