const { Router } = require("express");
const { login, addUser } = require("../controllers/userController");
const { authenticate, checkLoging } = require("../middlewares/userMiddleware")
const userRouter = Router();

userRouter.get("/get_message", authenticate, checkLoging);
userRouter.post("/login", login);
userRouter.post("/register", addUser);

module.exports = { userRouter };