const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { query } = require("express");

const getUsers = async (req = request, res = response) => {
  // url/api/users/?name=Sergio&date=2022-01-25  -> query
  try {
    let { from = 0, lot = 5 } = req.query;
    from = from <= 0 || isNaN(from) ? 0 : from - 1;

    const query = { status: true };

    const [users, total] = await Promise.all([
      User.find(query).skip(from).limit(lot),
      User.countDocuments(query),
    ]);

    req.res.status(200).json({
      total,
      users,
      from: from + 1,
      lot: Number(lot),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const getUserById = (req = request, res = response) => {
  // url/api/users/25 -> Segmento: El 25 entra en el id
  const id = req.params.id;
  res.json({
    msg: "Usuario por id - controller",
    id,
  });
};

const createUser = async (req = request, res = response) => {
  // url/api/users/ -> Body: Es el objeto en JSON
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // verificar si el correo ya existe en la BD

    user.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync());

    await user.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const updateUser = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const { password, google, ...data } = req.body;

    if (password) {
      data.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync());
    }

    const user = await User.findByIdAndUpdate(id, data, { new: true });

    res.json({
      user,
    });

    res.json({
      msg: "put API - controller",
      id,
      body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const deleteUser = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    // Borrar fisico de la DB
    // const deletedUSer =  await User.findByIdAndDelete(id)

    // Borrado suave
    const deletedUSer = await User.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    res.json({
      msg: "delete API - Controller",
      deletedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
