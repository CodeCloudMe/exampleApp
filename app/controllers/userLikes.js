
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load like
 */

exports.load = function (req, res, next, id) {
  var user = req.user;
  utils.findByParam(user.likes, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.like = comment;
    next();
  });
};

/**
 * Create like
 */

exports.create = function (req, res) {
  var user = req.user;
  var user = req.user;
  console.log(req.body);
  if (!req.body.like) return res.redirect('/users/'+ user.id);

  user.addLike(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/users/'+ user.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var user = req.user;
  user.removeLike(req.params.userLikeId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed like');
    }
    res.redirect('/users/' + user.id);
  });
};
