var express = require('express');
var router = express.Router();
const { image } = require('../utils/multer');
const { register, currentUser } = require('../controllers/auth.controllers');
const { editProfile, editImage } = require('../controllers/profile.controllers');

router.post('/register', register);
router.put('/users/:id/profile', editProfile);
router.put('/users/:id/avatar', image.single('file'), editImage);

// See User
router.get('/user/:id/current', currentUser);

module.exports = router;