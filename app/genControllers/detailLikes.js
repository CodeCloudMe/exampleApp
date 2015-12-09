
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load like
 */

exports.load = function (req, res, next, id) {
  var detail = req.detail;
  utils.findByParam(detail.likes, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.like = comment;
    next();
  });
};

/**
 * Create like
 */

exports.create = function (req, res) {
  var detail = req.detail;
  var user = req.user;
  console.log(req.body);
  if (!req.body.like) return res.redirect('/details/'+ detail.id);

  detail.addLike(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/details/'+ detail.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var detail = req.detail;
  detail.removeLike(req.params.detailLikeId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed like');
    }
    res.redirect('/details/' + detail.id);
  });
};
