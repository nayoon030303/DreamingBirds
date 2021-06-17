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

// 과목 리스트
let button = document.getElementById("subject-add").getElementsByTagName("button")[0];
let list = document.getElementById("subject-list");

let count = document.getElementsByClassName("subject-box").length;

let number = document.getElementById("subject-number");
number.textContent = count;

button.addEventListener('click', addSubject);

function addSubject(){
    let box = document.createElement("div");
    let content = document.createElement("span");
    let btn = document.createElement("button");

    box.className = "subject-box";
    box.id = "box-" + count;
    content.textContent = "커뮤니케이션 문학";   // input.value;0
    btn.textContent = "×";
    btn.addEventListener("click", function() {
        deleteSubject(box.id);
    });

    box.appendChild(content);
    box.appendChild(btn);
    list.appendChild(box);

    count++;

    number.textContent++;
    // console.log("add " + (box.id));
}

function deleteSubject(id) {
    let box = document.getElementById(id);
    list.removeChild(box);

    number.textContent--;
    // console.log("delete " + id);
}