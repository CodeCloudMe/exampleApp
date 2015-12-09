
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load rating
 */

exports.load = function (req, res, next, id) {
  var user = req.user;
  utils.findByParam(user.ratings, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.rating = comment;
    next();
  });
};

/**
 * Create rating
 */

exports.create = function (req, res) {
  var user = req.user;
  var user = req.user;
  console.log(req.body);
  if (!req.body.rating) return res.redirect('/users/'+ user.id);

  user.addRating(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/users/'+ user.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var user = req.user;
  user.removeRating(req.params.userRatingId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed rating');
    }
    res.redirect('/users/' + user.id);
  });
};
