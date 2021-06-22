let famous_saying = [
    { saying: "낭비한 시간에 대한 후회는 더 큰 시간 낭비다.", person: "메이슨 쿨리" },
    { saying: "행동의 가치는 그 행동을 끝까지 이루는 데 있다.", person: "칭기즈 칸" },
    { saying: "성공은 열심히 노력하며 기다리는 사람에게 찾아온다.", person: "토머스 에디슨" },
    { saying: "실패한 자가 패배하는 것이 아니라 포기한 자가 패배하는 것이다.", person: "장 파울" },
    { saying: "가장 유능한 사람은 가장 배우기 힘쓰는 사람이다.", person: "요한 볼프강 폰 괴테" },
    { saying: "할 수 있다고 생각하는 사람은 할 수 있고, 할 수 없다고 생각하는 사람은 할 수 없다. 이것은 불변의 진리이다.", person: "파블로 피카소" },
    { saying: "오늘 할 수 있는 것에 온힘을 쏟으면 내일은 한발 짝 더 나아가 있을 것이다. ", person: "아이작 뉴턴" }
];

let index = Math.floor(Math.random() * (famous_saying.length));

let saying = document.getElementById("famous-saying").getElementsByTagName("p")[0];
let person = document.getElementById("famous-saying").getElementsByTagName("p")[1];
saying.textContent = famous_saying[index].saying;
person.textContent = "- " + famous_saying[index].person + " -";

let view_saying = setInterval(test, 5000);
async function test() {
    index = (index + 1) % famous_saying.length;
    console.log(index);
    saying.textContent = famous_saying[index].saying;
    person.textContent = "- " + famous_saying[index].person + " -";
}