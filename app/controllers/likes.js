
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load like
 */

exports.load = function (req, res, next, id) {
  var article = req.article;
  utils.findByParam(article.likes, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.like = comment;
    next();
  });
};

/**
 * Create like
 */

exports.create = function (req, res) {
  var article = req.article;
  var user = req.user;
  console.log(req.body);
  if (!req.body.like) return res.redirect('/articles/'+ article.id);

  article.addLike(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/articles/'+ article.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var article = req.article;
  article.removeLike(req.params.articleLikeId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed like');
    }
    res.redirect('/articles/' + article.id);
  });
};
