var express = require('express');
var router = express.Router();

const News = require('../../models/news');

// Get All News
router.get('/', function(req, res, next) {
  News.find()
    .exec(function(err, news) {
      if(err) {
        error(500, "An error occured. Can't get any news from DataBase:(", err, res)
      }
      res.status(200).json(news)
    })
})

// Save one news
router.post('/', function(req, res, next) {
  const news = new News({
    title: req.body.title,
    author: req.body.author,
    date: req.body.date,
    article: req.body.article,
    categories: req.body.categories,
  });

  news.save(function(err, result) {
    if(err) {
      error(500, "An error occured. Can't save the news to DataBase:(", err, res);
    }
    res.status(201).json(result)
  })
})

function error(status, message, err, res) {
  console.error('\x1b[31m', message, '\n', '\x1b[0m', err);
  return res.status(status).json({
    title: message,
    error: err
  })
}

module.exports = router;