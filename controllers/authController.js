const { asyncWrapper } = require("../helpers");
const authService = require("../services/authService");

/**
 * Controller. Create new user
 */
const signupUser = asyncWrapper(async (req, res) => {
  const user = await authService.signup(req.body);

  res.status(201).json({ user });
});

/**
 * Controller. Login user
 */
const loginUser = asyncWrapper(async (req, res) => {
  const { _id } = req.user;

  const user = await authService.login(_id);

  res.status(200).json(user);
});

/**
 * Controller. Logout user
 */
const logoutUser = asyncWrapper(async (req, res) => {
  const { _id } = req.user;

  await authService.logout(_id);

  res.sendStatus(204);
});

/**
 * Controller. Get current user data
 */
const getCurrentUser = asyncWrapper(async (req, res) => {
  const { _id } = req.user;

  const currentUser = await authService.getUser(_id);

  res.status(200).json(currentUser);
});

/**
 * Controller. Update current user subscription.
 * Must be one of ["starter", "pro", "business"]
 */
const updateSubscription = asyncWrapper(async (req, res) => {
  const { _id } = req.user;
  const { body } = req;

  const userSubscription = await authService.updateUserSubscription(_id, body);

  res.status(200).json(userSubscription);
});

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
};
