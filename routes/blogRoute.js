const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const userController = require('../controllers/userController');


// root routes
router.route("/").get(blogController.getHome);
router.route("/about").get(blogController.getAbout);
router.route("/contact").get(blogController.getContact);
router.route("/error").get(blogController.getError);

// User Routes
router.route("/login")
    .get(userController.getUserForm)
    .post(userController.login);


// CRUD routes
router.route('/menu/:subject').get(blogController.getPage);
router.route('/menu/:subject/:slug').get(blogController.getPost('get'));

router.use(userController.userCheck);

router.route("/compose")
    .get(blogController.getCompose)
    .post(blogController.createPost);

router.route("/menu/:subject/remove/:slug").delete(blogController.removePost);
router.route("/menu/:subject/update/:slug").patch(blogController.updatePost);
router.route("/menu/:subject/edit/:slug").get(blogController.getPost('edit'));


module.exports = router;
