const User = require("../models/userModel");
const bcrypt = require("bcrypt");


exports.getAll = (req, res, next) => {
    User.find().exec()
      .then(result => {
        return res.status(200).json(result);
      })
      .catch(err => {
        return res.status(500).json(err);
      })
};

exports.getById = (req, res, next) => {
    User.findById(req.params.id).exec()
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(err => {
      return res.status(500).json(err);
    })
};


exports.delete = async (req, res, next) => {
    try {
      // Supprimer l'utilisateur
      const result = await User.findOneAndDelete({ _id: req.params.id }).exec();

      if (!result) {
        return res
          .status(404)
          .json("User with id " + req.params.id + " is not found !");
      
    }
      return res.status(200).json("User deleted successfully !");
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.update = async (req, res) => {
    const userId = req.params.id;
    const { firstname, lastname, mail, password } = req.body;
  
    try {
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Mettre à jour les autres champs de l'utilisateur
      const updateFields = {};
      if (firstname) updateFields.firstname = firstname;
      if (lastname) updateFields.lastname = lastname;
      if (mail) updateFields.mail = mail;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updateFields.password = await bcrypt.hash(password, salt);
      }
  
      // Effectuer la mise à jour de l'utilisateur
      const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
        new: true, // Pour obtenir le document mis à jour plutôt que l'ancien
      });
  
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };