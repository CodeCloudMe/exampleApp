
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load following
 */

exports.load = function (req, res, next, id) {
  var user = req.user;
  utils.findByParam(user.followings, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.following = comment;
    next();
  });
};

/**
 * Create following
 */

exports.create = function (req, res) {
  var user = req.user;
  var userId = req.userId;
  console.log(req.body);
  if (!req.body.following) return res.redirect('/users/'+ user.id);

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
      req.flash('info', 'Removed following');
    }
    res.redirect('/users/' + user.id);
  });
};
