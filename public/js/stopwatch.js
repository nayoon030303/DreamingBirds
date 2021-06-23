var time = 0;
var n_time = 0;
var s_time = 0;
var starFlag = true;

var subject_second = 0;

var level = "egg";

let isStudy = false;

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

  var image = document.getElementsByClassName("level-img")[0].getElementsByTagName("img")[0];
  var text = document.getElementsByClassName("level-name")[0];
  var rest = document.getElementsByClassName("level-info")[0];
  var rest_time = -1;
  var all_time = (user.timer[0].hour * 3600) + (user.timer[0].min * 60) + user.timer[0].sec;
  if (all_time > 18000) {
    level = "king";
    text.innerHTML = "4단계 왕비둘기";
  } else if (all_time > 10800) {
    level = "dove";
    text.innerHTML = "3단계 비둘기";
    rest_time = 18000 - all_time;
  } else if (all_time > 7200) {
    level = "chick";
    text.innerHTML = "2단계 병아리";
    rest_time = 10800 - all_time;
  } else {
    level = "egg";
    text.innerHTML = "1단계 새알";
    rest_time = 7200 - all_time;
  }

  if (rest_time == -1)
    rest.innerHTML = "최고 레벨에 도달했습니다.";
  else
    rest.innerHTML = hhmmss(rest_time);
  image.setAttribute("src", "../img/birds/" + level + ".png");
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
      isStudy = true;
      this.textContent = "휴식";
      var image = document.getElementsByClassName("level-img")[0].getElementsByTagName("img")[0];
      var text = document.getElementsByClassName("level-name")[0];
      var rest = document.getElementsByClassName("level-info")[0];
      timer = setInterval(function () {
        console.log("status : " + (current_status));
        if(current_status != "basic") {
          return;
        }
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
        s_hour = Math.floor(s_min / 60);
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

        var rest_time = -1;
        if (time > 18000) {
          level = "king";
          text.innerHTML = "4단계 왕비둘기";
        } else if (time > 10800) {
          level = "dove";
          text.innerHTML = "3단계 비둘기";
          rest_time = 18000 - time;
        } else if (time > 7200) {
          level = "chick";
          text.innerHTML = "2단계 병아리";
          rest_time = 10800 - time;
        } else {
          level = "egg";
          text.innerHTML = "1단계 새알";
          rest_time = 7200 - time;
        }
        // console.log(level);

        if (rest_time == -1)
          rest.innerHTML = "최고 레벨에 도달했습니다.";
        else
          rest.innerHTML = hhmmss(rest_time);
        image.setAttribute("src", "../img/birds/" + level + ".png");

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
      isStudy = false;
      this.textContent = "시작";
      if (time != 0) {
        clearInterval(timer);
        n_time = 0;
        n_hour = 0;
        n_min = 0;
        n_sec = 0;
        document.getElementById("now-focus-time").innerHTML = "00:00:00";
      }
    }
  });

  $("#chgbtn").click(function () {
    if (time != 0) {
      clearInterval(timer);
      time = 0;
    }

    fetch('/study/timeline?sid=' + $("#subject-id").data("subject_id") + "&status=chg", { method: 'POST' })
      .then(function (response) {
        if (response.ok) {
          return;
        }
        throw new Error('Request failed.');
      })
      .catch(function (error) {
        console.log(error);
      });
    location.href = '/selectSubject/' + user.id;
  });

  // stop btn
  $("#stopbtn").click(function () {
    if (time != 0) {
      clearInterval(timer);
      time = 0;
    }

    fetch('/study/timeline?sid=' + $("#subject-id").data("subject_id") + "&status=stop", { method: 'POST' })
      .then(function (response) {
        if (response.ok) {
          return;
        }
        throw new Error('Request failed.');
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}

function hhmmss(num) {
  var sec_num = parseInt(num, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return hours + ':' + minutes + ':' + seconds;
}
