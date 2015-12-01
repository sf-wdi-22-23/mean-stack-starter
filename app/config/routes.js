var express = require('express');
var apiRouter = express.Router();
var criminalsController = require('../controllers/criminals');
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST

apiRouter.param('criminal_id', criminalsController.criminalById);

// configure router middleware
apiRouter.route('/criminals')

  //GET all criminals
  .get(criminalsController.getAll)

  //POST a new blob
  .post(criminalsController.createCriminal);

apiRouter.route('/criminals/:id')

  // GET return specific candy
  .get(criminalsController.getCriminal)

  // PATCH update existing candy
  .patch(criminalsController.updateCriminal)

  // DELETE remove specific candy from DB
  .delete(criminalsController.removeCriminal);

module.exports = apiRouter;

