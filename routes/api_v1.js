var express = require('express');
var router = express.Router();

var news = require('./api_v1/news');
var category = require('./api_v1/category');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'api_v1' });
});

router.use('/news', news);
router.use('/category', category);

module.exports = router;