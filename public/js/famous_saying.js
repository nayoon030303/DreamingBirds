let famous_saying = [
    {saying: "낭비한 시간에 대한 후회는 더 큰 시간 낭비다.", person: "메이슨 쿨리"},
    {saying: "행동의 가치는 그 행동을 끝까지 이루는 데 있다.", person: "칭기즈칸"},
    {saying: "성공은 열심히 노력하며 기다리는 사람에게 찾아온다.", person: "토마스 A. 에디슨"},
    {saying: "실패한 자가 패배하는 것이 아니라 포기한 자가 패배하는 것이다.", person: "장 파울"},
    {saying: "가장 유능한 사람은 가장 배우기 힘쓰는 사람이다.", person: "요한 볼프강 폰 괴테"}
];

let index = Math.floor(Math.random() * (famous_saying.length));

document.getElementById("famous-saying").getElementsByTagName("p")[0].textContent = famous_saying[index].saying;
document.getElementById("famous-saying").getElementsByTagName("p")[1].textContent = "- " + famous_saying[index].person + " -";