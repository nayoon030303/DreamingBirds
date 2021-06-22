var time = 0;
var n_time = 0;
var s_time = 0;
var starFlag = true;

var subject_second = 0;

$(document).ready(function () {
  stopwatchinit();
  buttonEvt();
});

function stopwatchinit() {
  document.getElementById("now-focus-time").innerHTML = "00:00:00";
  document.getElementById("all-focus-time").value = ("0" + user.timer[0].hour).slice(-2) + ":" + ("0" + user.timer[0].min).slice(-2) + ":" + ("0" + user.timer[0].sec).slice(-2);
  for (var i = 0; i < user.subjects.length; i++) {
    if (user.subjects[i]._id === $("#subject-id").data("subject_id").slice(1, -1)) {
      subject_second = user.subjects[i].time;
      break;
    }
  }
  let subject_time = ("0" + parseInt((subject_second % (3600 * 24)) / 3600)).slice(-2) + ":" + ("0" + parseInt((subject_second / 60) % 60)).slice(-2) + ":" + ("0" + parseInt(subject_second % 60)).slice(-2);
  document.getElementById("sub-time").value = subject_time;
}

function buttonEvt() {
  var n_hour = 0;
  var n_min = 0;
  var n_sec = 0;

  var s_hour = 0;
  var s_min = 0;
  var s_sec = 0;

  console.log(user);

  var hour = user.timer[0].hour;
  var min = user.timer[0].min;
  var sec = user.timer[0].sec;

  var subtime = document.getElementById("sub-time").value.split(":");
  var sub_hour = subtime[0];
  var sub_min = subtime[1];
  var sub_sec = subtime[2];

  var timer;
  time = (hour * 3600) + (min * 60) + sec;
  s_time = subject_second;

  // start btn
  $("#startbtn").click(function () {
    if (this.textContent == "시작") {
      this.textContent = "휴식";
      timer = setInterval(function () {
        time++;
        n_time++;
        s_time++;

        min = Math.floor(time / 60);
        hour = Math.floor(min / 60);
        sec = time % 60;
        min = min % 60;

        n_min = Math.floor(n_time / 60);
        n_hour = Math.floor(n_min / 60);
        n_sec = n_time % 60;
        n_min = n_min % 60;

        s_min = Math.floor(s_time / 60);
        s_hour = Math.floor(s_time / 60);
        s_sec = s_time % 60;
        s_min = s_min % 60;

        var th = hour;
        var tm = min;
        var ts = sec;

        var n_th = n_hour;
        var n_tm = n_min;
        var n_ts = n_sec;

        var s_th = s_hour;
        var s_tm = s_min;
        var s_ts = s_sec;

        if (th < 10) th = "0" + hour;
        if (tm < 10) tm = "0" + min;
        if (ts < 10) ts = "0" + sec;

        if (n_th < 10) n_th = "0" + n_hour;
        if (n_tm < 10) n_tm = "0" + n_min;
        if (n_ts < 10) n_ts = "0" + n_sec;

        if (s_th < 10) s_th = "0" + s_hour;
        if (s_tm < 10) s_tm = "0" + s_min;
        if (s_ts < 10) s_ts = "0" + s_sec;

        document.getElementById("now-focus-time").innerHTML = n_th + ":" + n_tm + ":" + n_ts;
        document.getElementById("all-focus-time").value = th + ":" + tm + ":" + ts;
        document.getElementById("sub-time").value = s_th + ":" + s_tm + ":" + s_ts;
      }, 1000);

      fetch('/study/timeline?sid=' + $("#subject-id").data("subject_id") + "&status=start", { method: 'POST' })
      .then(function (response) {
          if (response.ok) {
              return;
          }
          throw new Error('Request failed.');
      })
      .catch(function (error) {
          console.log(error);
      });
    } else if (this.textContent == "휴식") {
      this.textContent = "시작";
      if (time != 0) {
        clearInterval(timer);
        n_time = 0;
        n_hour = 0;
        n_min = 0;
        n_sec = 0;
        document.getElementById("now-focus-time").innerHTML = "00:00:00";
      }

      fetch('/study/timeline?sid=' + $("#subject-id").data("subject_id") + "&status=pause", { method: 'POST' })
      .then(function (response) {
          if (response.ok) {
              return;
          }
          throw new Error('Request failed.');
      })
      .catch(function (error) {
          console.log(error);
      });
    }
  });

  // stop btn
  $("#stopbtn").click(function () {
    if (time != 0) {
      clearInterval(timer);
      time = 0;
    }
  });
}