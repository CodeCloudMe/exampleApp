
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load like
 */

exports.load = function (req, res, next, id) {
  var recentlySearched = req.recentlySearched;
  utils.findByParam(recentlySearched.likes, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.like = comment;
    next();
  });
};

/**
 * Create like
 */

exports.create = function (req, res) {
  var recentlySearched = req.recentlySearched;
  var user = req.user;
  console.log(req.body);
  if (!req.body.like) return res.redirect('/recentlySearcheds/'+ recentlySearched.id);

  recentlySearched.addLike(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/recentlySearcheds/'+ recentlySearched.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var recentlySearched = req.recentlySearched;
  recentlySearched.removeLike(req.params.recentlySearchedLikeId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed like');
    }
    res.redirect('/recentlySearcheds/' + recentlySearched.id);
  });
};
