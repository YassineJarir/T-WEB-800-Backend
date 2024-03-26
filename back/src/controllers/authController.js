const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// secret key from .env
dotenv.config();
const secretKey = process.env.SECRET_KEY;

/**
 * Fonction de connexion des utilisateurs.
 * Elle vérifie si l'adresse e-mail et le mot de passe fournis correspondent à un utilisateur enregistré.
 * Si les informations sont valides, génère un jeton JWT pour l'utilisateur.
 *
 * @param {*} req - La requête HTTP entrante avec les informations de connexion.
 * @param {*} res - La réponse HTTP à renvoyer.
 * @returns {Object} - L'identifiant de l'utilisateur et le jeton JWT en cas de succès.
 */

exports.login = async (req, res) => {
  const { mail, password } = req.body;

  try {
    const user = await User.findOne({ mail });

    if (!user || !bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    jwt.sign(
      { user_id: user._id },
      secretKey,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.json({
            user_id: user._id,
            token,
          });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.register = async (req, res) => {
  const { firstname, lastname, mail, password } = req.body;

  try {
    const existingUser = await User.findOne({ mail });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const newUser = new User({ firstname, lastname, mail, password });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    const savedUser = await newUser.save();

    // Sign a JWT token with the newly created user's ID
    jwt.sign(
      { user_id: savedUser._id},
      secretKey,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.json({
            user_id: savedUser._id,
            token,
          });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};