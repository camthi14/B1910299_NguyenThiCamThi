const express = require("express");
const contactController = require("../controllers/contact.controller");

const router = express.Router();

router
  .route("/")
  .get(contactController.findAll)
  .post(contactController.create)
  .delete(contactController.deleteAll);

router.route("/favorite").get(contactController.findAllFavorite);

router
  .route("/:id")
  .get(contactController.findOne)
  .patch(contactController.update)
  .delete(contactController.delete);

module.exports = router;
