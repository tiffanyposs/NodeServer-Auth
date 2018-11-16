const User = require('../models/user');

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(422).send({ error: 'You must provide email and password' });

  User.findOne({ email }, (error, existingUser) => {
    if (error) return next(error);
    // if it does exist, return an error
    if (existingUser) return res.status(422).send({ error: 'Email is in use' }); // couldn't process

    // if and email doesn not exist, create and save user
    const user = new User({ email, password });

    user.save((err) => {
      if (err) return next(err);
      // respond to request
      res.json({ success: true });
    });
  });
};
