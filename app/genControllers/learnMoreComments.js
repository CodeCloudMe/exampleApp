
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load comment
 */

exports.load = function (req, res, next, id) {
  var learnMore = req.learnMore;
  utils.findByParam(learnMore.comments, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.comment = comment;
    next();
  });
};

/**
 * Create comment
 */

exports.create = function (req, res) {
  var learnMore = req.learnMore;
  var user = req.user;
  console.log(req.body);
  if (!req.body.body) return res.redirect('/learnMores/'+ learnMore.id);

  learnMore.addComment(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/learnMores/'+ learnMore.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var learnMore = req.learnMore;
  learnMore.removeComment(req.params.learnMoreCommentId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed comment');
    }
    res.redirect('/learnMores/' + learnMore.id);
  });
};
