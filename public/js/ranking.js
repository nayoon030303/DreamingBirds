setInterval(function () {
    // console.log("update");
    var list = []
    var today = new Date();
    fetch('/ranking', { method: 'GET' })
        .then(function (response) {
            if (response.ok) return response.json();
            throw new Error('Request failed.');
        })
        .then(function (data) {
            for (var i = 0; i < data.length; i++) {
                // console.log(i, data[i].nickname, data[i].timer);
                var j = 0;
                for (var j = 0; j < data[i].timer.length; j++) {
                    if (data[i].timer[j].date ==`${today.getFullYear()}. ${today.getMonth()+1}. ${today.getDate()}.`) {
                        break;
                    }
                }
                if (j < data[i].timer.length) {
                    list.push({
                        name: data[i].nickname,
                        profile: data[i].profile_src,
                        time: (data[i].timer[j].hour * 3600) + (data[i].timer[j].min * 60) + data[i].timer[j].sec
                    });
                }
            }

            list.sort(function (a, b) {
                return parseInt(b.time) - parseInt(a.time);
            });

            // console.log(list);

            var ranking = document.getElementsByClassName("ranking")[0];
            ranking.innerHTML = "";
            list.forEach(element => {
                var user = document.createElement("div");
                user.className = "user";
                ranking.appendChild(user);

                var user_info = document.createElement("div");
                user_info.className = "user-info";
                user.appendChild(user_info);

                var user_profile = document.createElement("div")
                user_profile.className = "user-profile";
                user_info.appendChild(user_profile);

                var profile_img = document.createElement("img");
                profile_img.setAttribute("src", element.profile);
                user_profile.appendChild(profile_img);

                var user_name = document.createElement("div")
                user_name.className = "user-name";
                user_name.textContent = element.name;
                user_info.appendChild(user_name);

                var user_time = document.createElement("div");
                user_time.className = "user-time";
                user_time.textContent = hhmmss(element.time);
                user_info.appendChild(user_time);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}, 10000);


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
