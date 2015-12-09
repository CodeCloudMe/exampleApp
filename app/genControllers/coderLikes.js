
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load like
 */

exports.load = function (req, res, next, id) {
  var coder = req.coder;
  utils.findByParam(coder.likes, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.like = comment;
    next();
  });
};

/**
 * Create like
 */

exports.create = function (req, res) {
  var coder = req.coder;
  var user = req.user;
  console.log(req.body);
  if (!req.body.like) return res.redirect('/coders/'+ coder.id);

  coder.addLike(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/coders/'+ coder.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var coder = req.coder;
  coder.removeLike(req.params.coderLikeId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed like');
    }
    res.redirect('/coders/' + coder.id);
  });
};
