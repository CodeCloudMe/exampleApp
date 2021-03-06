
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load category
 */

exports.load = function (req, res, next, id) {
  var myAccount = req.myAccount;
  utils.findByParam(myAccount.categorys, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.category = comment;
    next();
  });
};

/**
 * Create category
 */

exports.create = function (req, res) {
  var myAccount = req.myAccount;
  var user = req.user;
  console.log(req.body);
  if (!req.body.category) return res.redirect('/myAccounts/'+ myAccount.id);

  myAccount.addCategory(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/myAccounts/'+ myAccount.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var myAccount = req.myAccount;
  myAccount.removeCategory(req.params.myAccountCategoryId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed category');
    }
    res.redirect('/myAccounts/' + myAccount.id);
  });
};
