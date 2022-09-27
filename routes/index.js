const router = require('express').Router();
const { indexController } = require('../controllers/indexController');
const { loginGetController } = require('../controllers/loginController');
const { loginPostController } = require('../controllers/loginController');
const { covuaquandoiController } = require('../controllers/covuaquandoiController');
const { playController } = require('../controllers/playController');
const { homeController } = require('../controllers/homeController');
const { registerGetController } = require('../controllers/registerController');
const { registerPostController } = require('../controllers/registerController');

router.get('/login', loginGetController);
router.post('/login', loginPostController);
router.get('/covuaquandoi', covuaquandoiController);
router.get('/play', playController);
router.get('/register', registerGetController);
router.post('/register', registerPostController);
router.get('/home', homeController);
router.get('/', indexController);
module.exports = router;