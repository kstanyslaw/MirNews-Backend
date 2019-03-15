var express = require('express');
var router = express.Router();

const Category = require('../../models/category');

router.get('/', function(req, res, next) {
    var select = {};
    var find = {};
    var sort = {};
    if(req.query.component) {
        if(req.query.component === 'navbar') {
            select = { en: 1, ru: 1, navColor: 1 };
            find = { navbar: true };
            sort = { _id: 1 };
        }
    }
    Category.find()
        .select(select)
        .sort(sort)
        .exec(function(err, category) {
            return res.status(200).json(category);
        })
})

router.post('/', function(req, res, next) {
    var category = new Category({
        en: req.body.en,
        ru: req.body.ru,
        navColor: req.body.color
    })

    category.save(function(err, result) {
        if (err) {
            return error(500, "can't save category", err, res);
        }
        res.status(201).json(result);
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