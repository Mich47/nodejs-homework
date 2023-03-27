const { asyncWrapper } = require("../helpers");
const authService = require("../services/authService");

const signupUser = asyncWrapper(async (req, res) => {
  const user = await authService.signup(req.body);

  res.status(201).json({ user });
});

const loginUser = asyncWrapper(async (req, res) => {
  const { _id } = req.user;

  const user = await authService.login(_id);

  res.status(200).json(user);
});

const logoutUser = asyncWrapper(async (req, res) => {
  const { _id } = req.user;

  await authService.logout(_id);

  res.sendStatus(204);
});

const getCurrentUser = asyncWrapper(async (req, res) => {
  const { _id } = req.user;

  const currentUser = await authService.getUser(_id);

  res.status(200).json(currentUser);
});

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
