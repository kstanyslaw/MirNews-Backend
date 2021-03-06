var express = require('express');
var router = express.Router();

const News = require('../../models/news');

// Get All News
router.get('/', function(req, res, next) {
    var limit = req.query.limit ? +req.query.limit : 20;
    var page = req.query.page ? +req.query.page : 1;
    var query = req.query.component === 'dashboard' ? {} : { date: {$lte: new Date}};
    if(req.query.category) {
        query['category.en'] = req.query.category;
    }
    if(req.query.archives) {
        var date = new Date(req.query.archives);
        query['date'] = {
            $lte: date,
            $gt: new Date(date.getTime() - 24 * 3600 * 1000)
        }
    }
    News.paginate(query, {
        select: '_id author date title preview category',
        sort: { date: -1 },
        page: page,
        limit: limit
    }, function(err, news) {
        if (err) {
            return error(500, "An error occured. Can't get any news from DataBase:(", err, res);
        }
        res.status(200).json(news)
    })
})


// Get one news by id
router.get('/:id', function(req, res, next) {
    News.findById(req.params.id)
        .select({ author: 1, date: 1, title: 1, article: 1, category: 1 })
        .exec(function(err, news) {
            if (err) {
                return error(500, 'An error occured while getting news by id:(', err, res);
            }
            if (!news) {
                return error(404, 'No news found with such id:(', ('id: ' + req.params.id), res);
            }
            return res.status(200).json(news);
        })
})

// Save one news
router.post('/', function(req, res, next) {
    const news = new News({
        author: req.body.author,
        date: req.body.date,
        title: req.body.title,
        article: req.body.article,
        preview: req.body.preview,
        category: req.body.category,
        img: req.body.img
    });

    news.save(function(err, result) {
        if (err) {
            return error(500, "An error occured. Can't save the news to DataBase:(", err, res);
        }
        res.status(201).json(result)
    })
})

// Delete One News
router.delete('/:id', function(req, res, next) {
    News.deleteOne({ _id: req.params.id }, function(err, result) {
        if (err) {
            return error(500, "An error occured. Can't delete news by id in DataBase:(", err, res);
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