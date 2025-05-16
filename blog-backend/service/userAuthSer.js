const { Cookie } = require("express-session");
const User = require("../model/AuthDoc");
const express = require("express");
const jwt = require("jsonwebtoken");

// To check login through Cookies
const checkLogin = async (req, res) => {
  const Token = req.Cookie ? req.Cookie.token : null;

  // if (req.session.userId) {
  //   const user = await User.findById(req.session.userId).select("username");
  //   if (!user) {
  //     return res.json({ redirect: "/login", message: "Invalid Session" });
  //   }
  //   return res.json({ redirect: "/profile", message: user.username });

  if (Token) {
    jwt.verify(Token, "apikey", (err, decode) => {
      if (err) console.log("Invalid Token!");
      console.log(decode);
    });
    // return res.json({ redirect: "/profile", message: user.username });
  } else {
    return res
      .status(401)
      .json({ redirect: "/login", message: "Not authenticated" });
  }
};

// To Login
const login = async (req, res) => {
  let username, password;
  let token;

  // Check if token is present in headers or cookies
  if (
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")) ||
    req.cookies?.token
  ) {
    token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

    if (token) {
      try {
        const decoded = jwt.verify(token, "apikey");
        username = decoded.username;
        password = decoded.password;
        res.json(token, { message: "Authenticated successfully!" });
      } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
      }
    }
  } else {
    ({ username, password } = req.body);
  }

  const user = await User.findOne({ username });

  if (!user || user.password !== password) {
    return res.status(404).json({ message: "Invalid Credentials" });
  }

  const newToken = jwt.sign({ username, token }, "apikey", {
    expiresIn: "3d",
  });

  res.cookie("token", newToken, {
    maxAge: 1000 * 60 * 60 * 24 * 3,
    httpOnly: true,
    sameSite: "None",
  });

  res.json({
    user,
    message: "Login successful",
    token: newToken,
    redirect: "/profile",
  });
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
    res.clearCookie(token);
    res.json("Logged out");
  });
};

module.exports = { checkLogin, login, register, logout };
