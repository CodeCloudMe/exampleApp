
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load comment
 */

exports.load = function (req, res, next, id) {
  var myAccount = req.myAccount;
  utils.findByParam(myAccount.comments, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.comment = comment;
    next();
  });
};

/**
 * Create comment
 */

exports.create = function (req, res) {
  var myAccount = req.myAccount;
  var user = req.user;
  console.log(req.body);
  if (!req.body.body) return res.redirect('/myAccounts/'+ myAccount.id);

  myAccount.addComment(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/myAccounts/'+ myAccount.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var myAccount = req.myAccount;
  myAccount.removeComment(req.params.myAccountCommentId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed comment');
    }
    res.redirect('/myAccounts/' + myAccount.id);
  });
};
