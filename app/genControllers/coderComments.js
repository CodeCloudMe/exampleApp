
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load comment
 */

exports.load = function (req, res, next, id) {
  var coder = req.coder;
  utils.findByParam(coder.comments, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.comment = comment;
    next();
  });
};

/**
 * Create comment
 */

exports.create = function (req, res) {
  var coder = req.coder;
  var user = req.user;
  console.log(req.body);
  if (!req.body.body) return res.redirect('/coders/'+ coder.id);

  coder.addComment(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/coders/'+ coder.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var coder = req.coder;
  coder.removeComment(req.params.coderCommentId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed comment');
    }
    res.redirect('/coders/' + coder.id);
  });
};
