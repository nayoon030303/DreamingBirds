// 프로필 이미지 변경 시 미리보기
document.getElementById("upload_img").addEventListener("change", function (e) {
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#profile_img').attr('src', e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
    }
});

// 꿈을 꾼 시간
function updateTime() {
    let sum = 0;
    for (var i = 0; i < user.subjects.length; i++) {
        sum += user.subjects[i].time;
    }
    let time = parseInt(sum / (3600 * 24)) + "일 ";
    time += parseInt((sum % (3600 * 24)) / 3600) + "시간 ";
    time += parseInt((sum / 60) % 60) + "분 ";
    time += parseInt(sum % 60) + "초";
    document.getElementById("dream-time").textContent = time;
}

// 과목 리스트
let button = document.getElementById("subject-add").getElementsByTagName("button")[0];
let list = document.getElementById("subject-list");

let count = document.getElementsByClassName("subject-box").length;

let number = document.getElementById("subject-number");
number.textContent = count;

button.addEventListener('click', addSubject);

function addSubject() {
    location.href = '/addSubject/' + user.id + '?mypage=true';
}

function deleteSubject(id) {
    let box = document.getElementById(id);
    list.removeChild(box);

    number.textContent--;
    // console.log("delete " + id);

    fetch('/deleteSubject/' + user.id + '/' + id, { method: 'POST' })
        .then(function (response) {
            if (response.ok) {
                // console.log('click was recorded');
                return;
            }
            throw new Error('Request failed.');
        })
        .catch(function (error) {
            console.log(error);
        });

    updateTime();
}

function updateSubject() {
    for (var i = 0; i < user.subjects.length; i++) {
        let box = document.createElement("div");
        let content = document.createElement("span");
        let btn = document.createElement("button");

        box.className = "subject-box";
        box.id = "box-" + user.subjects[i]._id;
        content.textContent = user.subjects[i].name.replace("&nbsp;", " ");
        btn.textContent = "×";
        btn.style.cursor = "pointer";
        btn.addEventListener("click", function () {
            deleteSubject(box.id);
        });

        box.appendChild(content);
        box.appendChild(btn);
        list.appendChild(box);

        count++;

        number.textContent++;
        // console.log("add " + (box.id));
    }
}

updateSubject();
updateTime();