const User = require("../models/user");

exports.signUp = (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  User.findOne({ email: email }).then((us) => {
    if(us){
    return res.status(200).json({
      message: "User already exists",
    });
  }
  let user = new User({ name, email, password });
  user.save().then((user) => {
    return res.status(200).json({
      message: "success",
      user: user,
    });
  });
  });
};

exports.logIn = (req, res, next) => {
  console.log(req.body)
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user.password === password) {
      return res.status(200).json({
        message: "success",
        user : user
      });
    }
    return res.status(400).json({
      message: "please eneter the correct password",
    });
  });

};


