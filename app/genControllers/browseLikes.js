
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load like
 */

exports.load = function (req, res, next, id) {
  var browse = req.browse;
  utils.findByParam(browse.likes, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.like = comment;
    next();
  });
};

/**
 * Create like
 */

exports.create = function (req, res) {
  var browse = req.browse;
  var user = req.user;
  console.log(req.body);
  if (!req.body.like) return res.redirect('/browses/'+ browse.id);

  browse.addLike(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/browses/'+ browse.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var browse = req.browse;
  browse.removeLike(req.params.browseLikeId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed like');
    }
    res.redirect('/browses/' + browse.id);
  });
};
