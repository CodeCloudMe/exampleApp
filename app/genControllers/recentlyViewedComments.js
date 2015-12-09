
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load comment
 */

exports.load = function (req, res, next, id) {
  var recentlyViewed = req.recentlyViewed;
  utils.findByParam(recentlyViewed.comments, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.comment = comment;
    next();
  });
};

/**
 * Create comment
 */

exports.create = function (req, res) {
  var recentlyViewed = req.recentlyViewed;
  var user = req.user;
  console.log(req.body);
  if (!req.body.body) return res.redirect('/recentlyVieweds/'+ recentlyViewed.id);

  recentlyViewed.addComment(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/recentlyVieweds/'+ recentlyViewed.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var recentlyViewed = req.recentlyViewed;
  recentlyViewed.removeComment(req.params.recentlyViewedCommentId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed comment');
    }
    res.redirect('/recentlyVieweds/' + recentlyViewed.id);
  });
};
