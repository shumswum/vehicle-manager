const models = require('../db/models');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    models.Vehicle
                .findAll()
                .then(vehicles => {
                    res.json(vehicles);
                });
});

router.get('/:id', function(req, res) {
    models.Vehicle
                .findById(req.params.id)
                .then(vehicle => {
                    if(vehicle === null) {
                        res.status(404).send('Invalid ID');
                    } else {
                        res.json(vehicle);
                    }
                })
                .catch(err => res.status(404).send(err));
});

router.post('/', function(req, res) {
    models.Vehicle
                .create(req.body)
                .then(vehicle => res.json(req.body))
                .catch(err => res.status(404).send(err));
});

router.put('/:id', function(req, res) {
    models.Vehicle
                .update(req.body, {where: {id: req.params.id}})
                .then(update => res.status(200).send("Successful update!"))
                .catch(err => res.status(404).send(err));
});

router.delete('/:id', function(req, res) {
    models.Vehicle
                .update(req.body, {where: {id: req.params.id}})
                .then(vehicle => res.json(vehicle))
                .catch(err => res.status(404).send(err));
});

module.exports = router;