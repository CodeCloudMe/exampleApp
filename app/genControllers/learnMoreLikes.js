
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load like
 */

exports.load = function (req, res, next, id) {
  var learnMore = req.learnMore;
  utils.findByParam(learnMore.likes, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.like = comment;
    next();
  });
};

/**
 * Create like
 */

exports.create = function (req, res) {
  var learnMore = req.learnMore;
  var user = req.user;
  console.log(req.body);
  if (!req.body.like) return res.redirect('/learnMores/'+ learnMore.id);

  learnMore.addLike(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/learnMores/'+ learnMore.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var learnMore = req.learnMore;
  learnMore.removeLike(req.params.learnMoreLikeId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed like');
    }
    res.redirect('/learnMores/' + learnMore.id);
  });
};
