
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load rating
 */

exports.load = function (req, res, next, id) {
  var photo = req.photo;
  utils.findByParam(photo.ratings, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.rating = comment;
    next();
  });
};

/**
 * Create rating
 */

exports.create = function (req, res) {
  var photo = req.photo;
  var user = req.user;
  console.log(req.body);
  if (!req.body.rating) return res.redirect('/photos/'+ photo.id);

  photo.addRating(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/photos/'+ photo.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var photo = req.photo;
  photo.removeRating(req.params.photoRatingId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed rating');
    }
    res.redirect('/photos/' + photo.id);
  });
};
