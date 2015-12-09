
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load comment
 */

exports.load = function (req, res, next, id) {
  var result = req.result;
  utils.findByParam(result.comments, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.comment = comment;
    next();
  });
};

/**
 * Create comment
 */

exports.create = function (req, res) {
  var result = req.result;
  var user = req.user;
  console.log(req.body);
  if (!req.body.body) return res.redirect('/results/'+ result.id);

  result.addComment(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/results/'+ result.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var result = req.result;
  result.removeComment(req.params.resultCommentId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed comment');
    }
    res.redirect('/results/' + result.id);
  });
};
