const models = require("../db/models");
const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  models.Customer.findAll().then(customers => {
    if (customers === null) {
      res.status(404).send("No customers!");
    } else {
      res.json(customers);
    }
  });
});

router.get("/:id", function(req, res) {
  models.Customer
    .findById(req.params.id)
    .then(customer => {
      if (customer === null) {
        res.status(404).send("Invalid ID!");
      } else {
        res.json(customer);
      }
    });
});

router.post("/", function(req, res) {
  models.Customer
    .create(req.body)
    .then(customer => res.json(req.body))
    .catch(err => res.status(404).send(err));
});

router.put("/:id", function(req, res) {
  models.Customer
    .update(req.body, { where: { id: req.params.id } })
    .then(() => res.status(200).send("Update Successful!"))
    .catch(err => res.status(404).send(err));
});

router.delete("/:id", function(req, res) {
  models.Customer
    .update(req.body, { where: { id: req.params.id } })
    .then(customerDel => res.json(customerDel))
    .catch(err => res.status(404).send(err));
});

module.exports = router;
