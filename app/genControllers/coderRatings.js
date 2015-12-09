
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load rating
 */

exports.load = function (req, res, next, id) {
  var coder = req.coder;
  utils.findByParam(coder.ratings, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.rating = comment;
    next();
  });
};

/**
 * Create rating
 */

exports.create = function (req, res) {
  var coder = req.coder;
  var user = req.user;
  console.log(req.body);
  if (!req.body.rating) return res.redirect('/coders/'+ coder.id);

  coder.addRating(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/coders/'+ coder.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var coder = req.coder;
  coder.removeRating(req.params.coderRatingId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed rating');
    }
    res.redirect('/coders/' + coder.id);
  });
};
