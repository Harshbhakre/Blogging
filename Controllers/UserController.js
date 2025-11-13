import { UserModel } from "../models/UserModel.js";
import bcrypt from "bcrypt";

export let signupPage = (req, res) => {
  res.render("signup", { message: null });
};
export let loginPage = (req, res) => {
  res.render("login", { message: null });
};
export let signup = async (req, res) => {
  let { name, email, password } = req.body;
  if (name.length < 2 || email.length < 2 || password.length < 2)
    return res.status(400).json("please fill form with proper Information");
  let existingUser = await UserModel.findOne({ email: email });
  if (existingUser) {
    return res
      .status(400)
      .end("user already exist's, please use different email");
  }
  let hashedPass = await bcrypt.hash(password, 10);
  let newUser = new UserModel({
    name: name,
    email: email,
    password: hashedPass,
  });
  newUser
    .save()
    .then((response) => {
      res.status(200).render("login", { message: "user created successfully" });
    })
    .catch((error) => {
      res.status(400).render("signup", { message: "failed to Create User" });
    });
};
export let login = async (req, res) => {
  let { email, password } = req.body;
  if (email.length < 2 || password.length < 2)
    return res.status(400).json("please fill form with proper Information");
  let existingUser = await UserModel.findOne({ email: email });
  if (!existingUser) {
    return res.status(400).end("user not found");
  }
  let passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (passwordMatch) {
    req.session.userId = existingUser._id;
    res.status(200).redirect("/");
  } else {
    res.status(400).render("login", { message: "check email or password" });
  }
};

export const allUsers = (req, res) => {
  UserModel.find()
    .then((Response) => res.status(200).json(Response))
    .catch((err) => res.status(400).json(err));
};
export const logout = (req, res) => {
  req.session.userId=null;
  return res.redirect("/loginPage");
};

