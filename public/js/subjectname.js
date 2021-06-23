// console.log(user);

var sub_id = getParam('id');
for (var i = 0; i < user.subjects.length; i++) {
    if(user.subjects[i]._id == sub_id) {
        document.getElementsByClassName("sub-name")[0].textContent = user.subjects[i].name;
        break;
    }
}


function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");
    for (var i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }
    return sval;
}