const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   error: err.message,
    // });

    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    // return res
    //   .status(400)
    //   .json({ success: false, error: 'Please provide email and password' });

    return next(new ErrorResponse('Please provide email and password', 400));
  }

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      // return res
      //   .status(401)
      //   .json({ success: false, error: 'Invalid Credentials' });

      return next(new ErrorResponse('Invalid Credentials', 401));
    }

    // Compare password
    const isMatch = await user.comparePasswords(password);

    if (!isMatch) {
      // return res
      //   .status(401)
      //   .json({ success: false, error: 'Invalid Credentials - Not match' });

      return next(new ErrorResponse('Invalid Credentials', 401));
    }

    res.status(200).json({
      success: true,
      token: '4fdf4543fdfa',
    });
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   error: err.message,
    // });

    next(err);
  }
};

exports.forgotPassword = (req, res, next) => {
  res.send('Forgot Password Route');
};

exports.resetPassword = (req, res, next) => {
  res.send('Reset Password Route');
};
