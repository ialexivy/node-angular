function initHome(app) {
    app.get('/', function(req, res) {
        res.render('home/home')
    });

}

module.exports = initHome;