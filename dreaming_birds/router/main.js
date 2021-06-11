module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index.html');
    });
    app.get('/select', function (req, res) {
        res.render('selectSubjectPage.html');
    });
    app.get('/home', function (req, res) {
        res.render('homePage.html');
    });
    app.get('/my', function (req, res) {
        res.render('mypage.html');
    });
    app.get('/study', function (req, res) {
        res.render('studyPage.html');
    });
}