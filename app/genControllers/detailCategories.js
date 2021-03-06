
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load category
 */

exports.load = function (req, res, next, id) {
  var detail = req.detail;
  utils.findByParam(detail.categorys, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.category = comment;
    next();
  });
};

/**
 * Create category
 */

exports.create = function (req, res) {
  var detail = req.detail;
  var user = req.user;
  console.log(req.body);
  if (!req.body.category) return res.redirect('/details/'+ detail.id);

  detail.addCategory(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/details/'+ detail.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var detail = req.detail;
  detail.removeCategory(req.params.detailCategoryId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed category');
    }
    res.redirect('/details/' + detail.id);
  });
};
