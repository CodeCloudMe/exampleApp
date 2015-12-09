
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load rating
 */

exports.load = function (req, res, next, id) {
  var result = req.result;
  utils.findByParam(result.ratings, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.rating = comment;
    next();
  });
};

/**
 * Create rating
 */

exports.create = function (req, res) {
  var result = req.result;
  var user = req.user;
  console.log(req.body);
  if (!req.body.rating) return res.redirect('/results/'+ result.id);

  result.addRating(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/results/'+ result.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var result = req.result;
  result.removeRating(req.params.resultRatingId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed rating');
    }
    res.redirect('/results/' + result.id);
  });
};
