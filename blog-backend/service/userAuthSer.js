const { Cookie } = require("express-session");
const User = require("../model/AuthDoc");
const express = require("express");
const router = express.Router();

// To check login through Cookies
const checkLogin = async (req, res) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId).select("username");
    if (!user) {
      return res.json({ redirect: "/login", message: "Invalid Session" });
    }
    return res.json({ redirect: "/profile", message: user.username });
  } else {
    return res
      .status(401)
      .json({ redirect: "/login", message: "Not authenticated" });
  }
};

// To Login
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || user.password !== password) {
    return res.status(404).json({ message: "Invalid Credentials" });
  }

  req.session.userId = user.id;
  res.json(user, { message: "Login successful", redirect: "/profile" });
};

// For Sign Up
const register = async (req, res) => {
  const { username, name, surname, password } = req.body;

  const newUser = new User({ username, name, surname, password });
  const userAdded = await newUser.save();

  res.json(userAdded);
};

// To Logout
const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ message: " Failed Logout" });
    }
    res.clearCookie("connect.sid");
    res.json("Logged out");
  });
};

module.exports = { checkLogin, login, register, logout };
