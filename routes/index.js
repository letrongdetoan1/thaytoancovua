const router = require('express').Router();
const { indexController } = require('../controllers/indexController');
const { loginController } = require('../controllers/loginController');
const { covuaquandoiController } = require('../controllers/covuaquandoiController');
const { playController } = require('../controllers/playController');
const { homeController } = require('../controllers/homeController');
const { registerController } = require('../controllers/registerController');

router.get('/login',loginController);
router.get('/covuaquandoi',covuaquandoiController);
router.get('/play',playController);
router.get('/register',registerController);
router.get('/home',homeController);
router.get('/',indexController);
module.exports = router;