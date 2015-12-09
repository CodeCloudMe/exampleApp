
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load rating
 */

exports.load = function (req, res, next, id) {
  var recentlyViewed = req.recentlyViewed;
  utils.findByParam(recentlyViewed.ratings, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.rating = comment;
    next();
  });
};

/**
 * Create rating
 */

exports.create = function (req, res) {
  var recentlyViewed = req.recentlyViewed;
  var user = req.user;
  console.log(req.body);
  if (!req.body.rating) return res.redirect('/recentlyVieweds/'+ recentlyViewed.id);

  recentlyViewed.addRating(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/recentlyVieweds/'+ recentlyViewed.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var recentlyViewed = req.recentlyViewed;
  recentlyViewed.removeRating(req.params.recentlyViewedRatingId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed rating');
    }
    res.redirect('/recentlyVieweds/' + recentlyViewed.id);
  });
};
