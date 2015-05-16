module.exports=function(app) {
    var Film = require('../models/films/SchemaFilms.js');

//GET
    findAllFilms = function (req, res) {
        Film.find(function (err, data) {
            if (!err) {
                res.send(data);
                console.log(data);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    };

//GET film by id
    findFilm = function (req, res) {
        Film.findOne({"_id": req.params._id}, function (err, data) {
            if (!err) {
                res.send(data);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    };

//DELETE
    deleteFilm = function (req, res) {
        //console.log('DELETE user');
        //console.log(req.params._id);

        Film.findOne({"_id": req.params._id}, function (err, film) {
            film.remove(function (err) {
                if (!err)
                    console.log('Object delete');
                else {
                    console.log('ERROR' + err);
                }
            })
        });
        res.status(200).send('Film deleted');
    };

//UPDATE
    updateFilm = function (req, res) {
        //console.log('UPDATE film');
        Film.findOneAndUpdate({"_id": req.params._id}, req.body, function (err, film) {
            //console.log(user._id);
            film.set(function (err) {
                if (!err) {
                    console.log('Updated');
                }
                else {
                    console.log('ERROR' + err);
                }

            })
        });
        console.log("golaaaasdfasd")
        res.send('Film Modified');
    };

//POST User
    newFilm = function (req, res) {
        // console.log('POST user');
        // console.log(req.body);

        Film.findOne({name: req.body.name},function(err, film){

            if (!film){

                var film = new Film({
                    name: req.body.name,
                    director: req.body.director,
                    language: req.body.language,
                    type: req.body.type,
                    description: req.body.description
                });
                film.save(function (err) {

                    if (!err) {
                        console.log('New film');
                    }
                    else {
                        console.log('ERROR', +err);
                    }
                })

                res.send(film);

            }
            else{
                res.status(400).send('Film exists!')
            }

        })
    };

//Get de user por username
    findByFilm = function (req, res) {
        User.findOne({"name": req.params.name}, function (err, film) {
            if (!err) {
             res.send(film);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    }


//endpoints
    app.get('/films', findAllFilms);
    app.get('/film/:_id', findFilm);
    app.post('/films', newFilm);
    app.put('/film/:_id', updateFilm);
    app.delete('/film/:_id', deleteFilm);
    app.get('/film/name/:name', findByFilm)

}