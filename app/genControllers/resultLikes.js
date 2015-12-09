
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load like
 */

exports.load = function (req, res, next, id) {
  var result = req.result;
  utils.findByParam(result.likes, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.like = comment;
    next();
  });
};

/**
 * Create like
 */

exports.create = function (req, res) {
  var result = req.result;
  var user = req.user;
  console.log(req.body);
  if (!req.body.like) return res.redirect('/results/'+ result.id);

  result.addLike(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/results/'+ result.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var result = req.result;
  result.removeLike(req.params.resultLikeId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed like');
    }
    res.redirect('/results/' + result.id);
  });
};
