
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load category
 */

exports.load = function (req, res, next, id) {
  var article = req.article;
  utils.findByParam(article.categorys, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.category = comment;
    next();
  });
};

/**
 * Create category
 */

exports.create = function (req, res) {
  var article = req.article;
  var user = req.user;
  console.log(req.body);
  if (!req.body.category) return res.redirect('/articles/'+ article.id);

  article.addCategory(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/articles/'+ article.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var article = req.article;
  article.removeCategory(req.params.articleCategoryId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed category');
    }
    res.redirect('/articles/' + article.id);
  });
};
