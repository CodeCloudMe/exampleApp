
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load comment
 */

exports.load = function (req, res, next, id) {
  var photo = req.photo;
  utils.findByParam(photo.comments, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.comment = comment;
    next();
  });
};

/**
 * Create comment
 */

exports.create = function (req, res) {
  var photo = req.photo;
  var user = req.user;
  console.log(req.body);
  if (!req.body.body) return res.redirect('/photos/'+ photo.id);

  photo.addComment(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/photos/'+ photo.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var photo = req.photo;
  photo.removeComment(req.params.photoCommentId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed comment');
    }
    res.redirect('/photos/' + photo.id);
  });
};
