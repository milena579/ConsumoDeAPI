const { Router } = require("express");
const ContactController = require("./controllers/ContactController");

const routes = Router();

routes.get("/contacts", ContactController.index)
routes.get("/contacts/:id", ContactController.show)
routes.get("/contacts", ContactController.store)
routes.get("/contacts/:id", ContactController.update)
routes.get("/contacts/:id", ContactController.delete)


module.exports = routes;
