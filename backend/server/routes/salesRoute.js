const models = require("../db/models");
const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  models.Sale
    .findAll({
      include: [{
        model: models.Vehicle
      },
    {
      model: models.Customer
    }]
    })
    .then(sales => res.json(sales));
});

router.get('/:id', function(req, res) {
  models.Sale
    .findById(req.params.id, {
      include: [{ model: models.Vehicle }, { model: models.Customer }]
    })
    .then(sale => {
      if(sale != null){
      res.json(sale);
      } else {
        res.status(404).send('Invalid ID!');
      }
    })
    .catch(err => res.status(404).send(err));
});

router.post("/", function(req, res) {
  models.Sale
    .create(req.body)
    .then(sale => res.json(sale))
    .catch(err => res.status(404).send(err));
});

router.put('/:id', function(req, res) {
  models.Sale
  .update(req.body, { where: { id: req.params.id } })
  .then(() => res.status(200).send("Update Successful!"))
  .catch(err => res.status(404).send(err));
});

router.delete('/:id',function(req, res) {
  models.Sale
  .update(req.body, { where: { id: req.params.id } })
  .then(saleDel => res.json(saleDel))
  .catch(err => res.status(404).send(err));
});

module.exports = router;
