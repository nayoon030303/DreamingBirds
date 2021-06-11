module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index.html');
    });
    app.get('/select', function (req, res) {
        res.render('selectSubjectPage.html');
    });
}