
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load rating
 */

exports.load = function (req, res, next, id) {
  var search = req.search;
  utils.findByParam(search.ratings, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.rating = comment;
    next();
  });
};

/**
 * Create rating
 */

exports.create = function (req, res) {
  var search = req.search;
  var user = req.user;
  console.log(req.body);
  if (!req.body.rating) return res.redirect('/searchs/'+ search.id);

  search.addRating(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/searchs/'+ search.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var search = req.search;
  search.removeRating(req.params.searchRatingId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed rating');
    }
    res.redirect('/searchs/' + search.id);
  });
};
