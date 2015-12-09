
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load like
 */

exports.load = function (req, res, next, id) {
  var recentlyViewed = req.recentlyViewed;
  utils.findByParam(recentlyViewed.likes, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.like = comment;
    next();
  });
};

/**
 * Create like
 */

exports.create = function (req, res) {
  var recentlyViewed = req.recentlyViewed;
  var user = req.user;
  console.log(req.body);
  if (!req.body.like) return res.redirect('/recentlyVieweds/'+ recentlyViewed.id);

  recentlyViewed.addLike(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/recentlyVieweds/'+ recentlyViewed.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var recentlyViewed = req.recentlyViewed;
  recentlyViewed.removeLike(req.params.recentlyViewedLikeId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed like');
    }
    res.redirect('/recentlyVieweds/' + recentlyViewed.id);
  });
};
