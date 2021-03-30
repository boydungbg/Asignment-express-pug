var userService = require('../services/user.js');
const { use } = require('../routes/login.js');

module.exports.loginGet = (req, res) => {
  res.render('cozastore/login', {
    title: 'Login',
  });
};

module.exports.loginPost = async (req, res) => {
  var user = await userService
    .findUserByEmail(req.body.email)
    .then((result) => result)
    .catch((err) => console.log(err));
  if (user == null) {
    res.render('cozastore/login', {
      title: 'Login',
      err: 'Email or password wrong',
      valueUser: req.body,
    });
    return;
  } else {
    if (user.password === req.body.password) {
      req.session._user = user._id;
      if (req.body.remember === 'on') {
        res.cookie('_user', user._id, {
          signed: true,
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });
      } else {
        req.session._user = user._id;
      }
      if (user.isUser === 2) {
        res.redirect('/admin/index');
      } else {
        console.log(user);
        res.redirect('/cozastore/index');
      }
      return;
    } else {
      res.render('cozastore/login', {
        title: 'Login',
        err: 'Email or password wrong',
        valueUser: req.body,
      });
    }
  }
};

module.exports.logOut = (req, res) => {
  res.clearCookie('_user');
  req.session.destroy();
  res.redirect('/cozastore/index');
};
