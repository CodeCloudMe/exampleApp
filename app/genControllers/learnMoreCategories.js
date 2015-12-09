
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load category
 */

exports.load = function (req, res, next, id) {
  var learnMore = req.learnMore;
  utils.findByParam(learnMore.categorys, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.category = comment;
    next();
  });
};

/**
 * Create category
 */

exports.create = function (req, res) {
  var learnMore = req.learnMore;
  var user = req.user;
  console.log(req.body);
  if (!req.body.category) return res.redirect('/learnMores/'+ learnMore.id);

  learnMore.addCategory(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/learnMores/'+ learnMore.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var learnMore = req.learnMore;
  learnMore.removeCategory(req.params.learnMoreCategoryId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed category');
    }
    res.redirect('/learnMores/' + learnMore.id);
  });
};
