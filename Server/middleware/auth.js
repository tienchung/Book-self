const { User } = require("./../models/user");

// bat tu file server - api/logout
let auth = (req, res, next) => {
  let token = req.cookies.auth;
  // console.log(req.cookies)
  // console.log(req.user)

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        error: true
      });

    req.token = token;
    req.user = user;
    next();
  });
 };

module.exports={auth}
