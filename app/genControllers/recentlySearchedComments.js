
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load comment
 */

exports.load = function (req, res, next, id) {
  var recentlySearched = req.recentlySearched;
  utils.findByParam(recentlySearched.comments, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.comment = comment;
    next();
  });
};

/**
 * Create comment
 */

exports.create = function (req, res) {
  var recentlySearched = req.recentlySearched;
  var user = req.user;
  console.log(req.body);
  if (!req.body.body) return res.redirect('/recentlySearcheds/'+ recentlySearched.id);

  recentlySearched.addComment(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/recentlySearcheds/'+ recentlySearched.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var recentlySearched = req.recentlySearched;
  recentlySearched.removeComment(req.params.recentlySearchedCommentId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed comment');
    }
    res.redirect('/recentlySearcheds/' + recentlySearched.id);
  });
};
