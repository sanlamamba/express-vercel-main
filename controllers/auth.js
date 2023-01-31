const User = require("../models/user");
const auth = require("../utils/auth/auth");
const { hashPassword, comparePassword } = auth;
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { nom, prenom = "", email, password } = req.body;
    if (!nom || !email || !password) {
      return res.status(400).json({
        message: "Veuillez remplir tout les champs requis",
      });
    }
    const userExists = await User.findOne({ email }).exec();
    if (userExists) {
      return res.status(400).json({
        message: "L'utilisateur existe deja",
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "Utilisateur créé avec succès",
      data: newUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Error lors de la création de l'utilisateur",
      error: err,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Veuillez remplir tout les champs",
      });
    }
    const userExists = await User.findOne({ email }).exec();
    if (!userExists) {
      return res.status(400).json({
        message: "L'utilisateur n'existe pas",
      });
    }
    const isPasswordValid = await comparePassword(
      password,
      userExists.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Mot de passe invalide",
      });
    }
    const token = jwt.sign(
      {
        _id: userExists._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    userExists.password = undefined;
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(200).json({
      message: "Connexion réussie",
      data: userExists,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Erreur lors de la connexion",
      error: err,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({
      message: "Deconnexion réussie",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Erreur lors de la deconnexion",
      error: err,
    });
  }
};

const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").exec();
    // console.log("current user", user);
    return res.json({
      message: "Liste des utilisateurs",
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Error lors de la récupération de l'utilisateur",
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  currentUser,
};
