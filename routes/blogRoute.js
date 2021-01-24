const express = require('express');
const blogController = require('../controllers/blogController');
const userController = require('../controllers/userController');


const router = express.Router();

router.use(userController.isLoggedIn);

// root routes
router.route("/").get(blogController.getHome);
router.route("/about").get(blogController.getAbout);
router.route("/contact").get(blogController.getContact);
router.route("/error").get(blogController.getError);

router.use(userController.isLoggedIn);

// User Routes
router.route("/login")
    .get(userController.getUserForm)
    .post(userController.login);

router.route("/logout")
    .get(userController.logout);


// CRUD routes
router.route('/menu/:subject').get(blogController.getPage);

router.route('/menu/:subject/:slug')
    .get(blogController.getPost)
    .delete(blogController.removePost)
    .patch(blogController.updatePost);


router.use(userController.userCheck);

router.route("/compose")
    .get(blogController.getCompose)
    .post(blogController.createPost);


module.exports = router;
