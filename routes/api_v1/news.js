var express = require('express');
var router = express.Router();

const News = require('../../models/news');

// Get All News
router.get('/', function(req, res, next) {
  News.find()
    .exec(function(err, news) {
      if(err) {
        return error(500, "An error occured. Can't get any news from DataBase:(", err, res);
      }
      res.status(200).json(news)
    })
})


// Get one news by id
router.get('/:id', function(req, res, next) {
  News.findById(req.params.id)
    .exec(function(err, news) {
      if(err) {
        return error(500, 'An error occured while getting news by id:(', err, res);
      }
      if(!news) {
        return error(500, 'No news found with such id:(', ('id: ' + req.params.id), res);
      }
      return res.status(200).json(news);
    })
})

// Save one news
router.post('/', function(req, res, next) {
  const news = new News({
    author: req.body.author,
    date: req.body.date,
    body: req.body.body,
    categories: req.body.categories,
  });

  news.save(function(err, result) {
    if(err) {
      return error(500, "An error occured. Can't save the news to DataBase:(", err, res);
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