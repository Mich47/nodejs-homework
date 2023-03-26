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

const currentUser = asyncWrapper(async (req, res) => {
  const { _id } = req.user;

  const currentUser = await authService.current(_id);

  res.status(200).json(currentUser);
});

module.exports = { signupUser, loginUser, logoutUser, currentUser };
