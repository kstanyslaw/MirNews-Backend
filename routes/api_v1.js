var express = require('express');
var router = express.Router();

var news = require('./api_v1/news');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'api_v1' });
});

router.use('/news', news);

module.exports = router;