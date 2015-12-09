
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load like
 */

exports.load = function (req, res, next, id) {
  var search = req.search;
  utils.findByParam(search.likes, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.like = comment;
    next();
  });
};

/**
 * Create like
 */

exports.create = function (req, res) {
  var search = req.search;
  var user = req.user;
  console.log(req.body);
  if (!req.body.like) return res.redirect('/searchs/'+ search.id);

  search.addLike(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/searchs/'+ search.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var search = req.search;
  search.removeLike(req.params.searchLikeId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed like');
    }
    res.redirect('/searchs/' + search.id);
  });
};
