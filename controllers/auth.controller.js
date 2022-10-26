const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const generateJWT = require("../helpers/generate-jwt");

const login = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "Usuario/password incorrectos",
      });
    }

    if (!user.status) {
      return res.status(400).json({
        msg: "Usuario/password Incorrectos - status false",
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario/password incorrectos - password",
      });
    }

    // Generar el JWT
    const  token = await generateJWT(user.id)

    res.json({
      msg: "Login ok",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

module.exports = {
  login,
};
