
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load rating
 */

exports.load = function (req, res, next, id) {
  var learnMore = req.learnMore;
  utils.findByParam(learnMore.ratings, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.rating = comment;
    next();
  });
};

/**
 * Create rating
 */

exports.create = function (req, res) {
  var learnMore = req.learnMore;
  var user = req.user;
  console.log(req.body);
  if (!req.body.rating) return res.redirect('/learnMores/'+ learnMore.id);

  learnMore.addRating(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/learnMores/'+ learnMore.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var learnMore = req.learnMore;
  learnMore.removeRating(req.params.learnMoreRatingId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed rating');
    }
    res.redirect('/learnMores/' + learnMore.id);
  });
};
