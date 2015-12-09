
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load like
 */

exports.load = function (req, res, next, id) {
  var myAccount = req.myAccount;
  utils.findByParam(myAccount.likes, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.like = comment;
    next();
  });
};

/**
 * Create like
 */

exports.create = function (req, res) {
  var myAccount = req.myAccount;
  var user = req.user;
  console.log(req.body);
  if (!req.body.like) return res.redirect('/myAccounts/'+ myAccount.id);

  myAccount.addLike(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/myAccounts/'+ myAccount.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var myAccount = req.myAccount;
  myAccount.removeLike(req.params.myAccountLikeId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed like');
    }
    res.redirect('/myAccounts/' + myAccount.id);
  });
};
