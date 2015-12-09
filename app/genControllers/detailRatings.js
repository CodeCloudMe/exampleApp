
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load rating
 */

exports.load = function (req, res, next, id) {
  var detail = req.detail;
  utils.findByParam(detail.ratings, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.rating = comment;
    next();
  });
};

/**
 * Create rating
 */

exports.create = function (req, res) {
  var detail = req.detail;
  var user = req.user;
  console.log(req.body);
  if (!req.body.rating) return res.redirect('/details/'+ detail.id);

  detail.addRating(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/details/'+ detail.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var detail = req.detail;
  detail.removeRating(req.params.detailRatingId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed rating');
    }
    res.redirect('/details/' + detail.id);
  });
};
