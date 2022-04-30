const jwt = require("jsonwebtoken");
const User = require("../models/users");
const FavList = require("../models/favsLists");

exports.createUser = async ({ email, password }) => {
  return User.create({ email, password });
};

exports.generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 365,
  });
};

exports.createFavList = async ({ nombre, favoritos, user }) => {
  return FavList.create({ nombre, favoritos, user });
};
