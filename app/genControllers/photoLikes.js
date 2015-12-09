
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load like
 */

exports.load = function (req, res, next, id) {
  var photo = req.photo;
  utils.findByParam(photo.likes, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.like = comment;
    next();
  });
};

/**
 * Create like
 */

exports.create = function (req, res) {
  var photo = req.photo;
  var user = req.user;
  console.log(req.body);
  if (!req.body.like) return res.redirect('/photos/'+ photo.id);

  photo.addLike(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/photos/'+ photo.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var photo = req.photo;
  photo.removeLike(req.params.photoLikeId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed like');
    }
    res.redirect('/photos/' + photo.id);
  });
};
