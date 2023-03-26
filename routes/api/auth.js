const express = require("express");
const { authCtrl } = require("../../controllers");
const { authValidators } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  authValidators.checkRegistrationConflict,
  authCtrl.signupUser
);

router.post("/login", authValidators.checkLoginAuth, authCtrl.loginUser);

router.use("/", authValidators.checkUserToken);

router.post("/logout", authCtrl.logoutUser);

router.post("/current", authCtrl.currentUser);

module.exports = router;
